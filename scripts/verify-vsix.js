#!/usr/bin/env node
/**
 * verify-vsix.js — Verify a packaged vsix contains EXACTLY what .vscodeignore allows.
 *
 * Usage: node scripts/verify-vsix.js <vsix-path>
 * Exit 0 = PASS (vsix has one entry per allowlisted source file, no more, no less)
 * Exit 1 = FAIL (missing expected entry, extra entry, or unreadable vsix)
 *
 * .vscodeignore is an allowlist: `**` excludes everything, `!pattern` re-includes.
 * vsce normalizes asset names on pack: README.md -> readme.md, CHANGELOG.md ->
 * changelog.md, LICENSE -> LICENSE.txt, and stores everything under extension/.
 * [Content_Types].xml and extension.vsixmanifest are structural files vsce always
 * emits and are expected in every vsix.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const vsixArg = process.argv[2] || autoDetectVsix();
if (!vsixArg) {
  console.error(
    'Usage: node scripts/verify-vsix.js <vsix-path> ' +
      '(or run from the project root; it detects funky-theme-vscode-<version>.vsix)'
  );
  process.exit(1);
}

/**
 * Read package.json, tolerating a BOM.
 *
 * JSON.parse throws on a leading U+FEFF, and an editor that saves with a BOM
 * would otherwise fail this script for a reason unrelated to packaging.
 */
function readPackageJson() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8');
  return JSON.parse(raw.replace(/^﻿/, ''));
}

/** Detect the vsix matching the current package.json version. */
function autoDetectVsix() {
  try {
    const pkg = readPackageJson();
    const candidate = path.join(process.cwd(), `funky-theme-vscode-${pkg.version}.vsix`);
    return fs.existsSync(candidate) ? candidate : null;
  } catch (_) {
    return null;
  }
}

const vsixPath = path.resolve(vsixArg);
if (!fs.existsSync(vsixPath)) {
  console.error(`FAIL: vsix not found: ${vsixPath}`);
  process.exit(1);
}

// --- 1. Parse .vscodeignore allowlisted source patterns ---------------------
const ignorePath = path.join(process.cwd(), '.vscodeignore');
if (!fs.existsSync(ignorePath)) {
  console.error('FAIL: .vscodeignore not found in the current working directory');
  process.exit(1);
}

const allowList = fs
  .readFileSync(ignorePath, 'utf8')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#') && line.startsWith('!'))
  .map((line) => line.replace(/^!\s*/, '').replace(/^\.\//, ''))
  // Directory rules (trailing slash) don't materialize as zip entries — only
  // the file globs inside them (e.g. !themes/*.json) define actual entries.
  .filter((pattern) => !pattern.endsWith('/'));

if (allowList.length === 0) {
  console.error('FAIL: .vscodeignore contains no allowlisted (!) entries');
  process.exit(1);
}

// --- 2. Expand allowlist patterns against the filesystem --------------------
/** Minimal glob supporting `*` in a single path segment (e.g. themes/*.json). */
function expandPattern(pattern) {
  if (!pattern.includes('*')) {
    return fs.existsSync(pattern) ? [pattern] : [];
  }
  const star = pattern.indexOf('*');
  const prefix = pattern.slice(0, star); // e.g. 'themes/'
  const suffix = pattern.slice(star + 1); // e.g. '.json'
  const slash = prefix.lastIndexOf('/');
  const dir = slash >= 0 ? prefix.slice(0, slash) : '.';
  const basePattern = slash >= 0 ? prefix.slice(slash + 1) : prefix;
  const esc = (s) => s.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`^${esc(basePattern)}.*${esc(suffix)}$`);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => re.test(name) && fs.statSync(path.join(dir, name)).isFile())
    .map((name) => path.posix.join(dir.replace(/\\/g, '/'), name))
    .sort();
}

const expectedSources = allowList.flatMap(expandPattern).sort();

// --- 3. Map source paths to vsix entry names (vsce conventions) -------------
function toVsixEntry(source) {
  const normalized = source.replace(/\\/g, '/');
  const base = path.posix.basename(normalized);
  const mapping = {
    'README.md': 'readme.md',
    'CHANGELOG.md': 'changelog.md',
    LICENSE: 'LICENSE.txt',
  };
  const fileName = mapping[base] || base;
  const dir = path.posix.dirname(normalized);
  return dir === '.' ? `extension/${fileName}` : `extension/${dir}/${fileName}`;
}

const expectedEntries = [
  '[Content_Types].xml',
  'extension.vsixmanifest',
  ...expectedSources.map(toVsixEntry).sort(),
];

// --- 4. Read the vsix entries ------------------------------------------------
/** List zip entries via PowerShell's System.IO.Compression (no npm deps; the
 *  release flow is Windows-first and the skill targets PowerShell). */
function listZipEntries(zipPath) {
  try {
    const script =
      `Add-Type -AssemblyName System.IO.Compression.FileSystem; ` +
      `[System.IO.Compression.ZipFile]::OpenRead('${zipPath.replace(/'/g, "''")}').Entries ` +
      `| ForEach-Object { $_.FullName }`;
    const output = execFileSync(
      'powershell',
      ['-NoProfile', '-Command', script],
      { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }
    );
    return output
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .sort();
  } catch (err) {
    console.error(`FAIL: could not read vsix entries: ${err.message}`);
    process.exit(1);
  }
}

const actualEntries = listZipEntries(vsixPath);

// --- 5. Compare ---------------------------------------------------------------
const missing = expectedEntries.filter((entry) => !actualEntries.includes(entry));
const extra = actualEntries.filter((entry) => !expectedEntries.includes(entry));

if (missing.length > 0) {
  console.error('FAIL: expected entries missing from vsix:');
  missing.forEach((entry) => console.error(`  - ${entry}`));
}
if (extra.length > 0) {
  console.error('FAIL: unexpected entries in vsix (not allowlisted):');
  extra.forEach((entry) => console.error(`  + ${entry}`));
}
if (missing.length > 0 || extra.length > 0) {
  process.exit(1);
}

console.log(
  `PASS: vsix contains exactly the ${expectedEntries.length} allowed entries (.vscodeignore allowlist)`
);

// --- 6. Verify the packaged CHANGELOG content ---------------------------------
// The entry-set comparison above only proves the changelog ENTRY exists. It says
// nothing about its content, and the release skill promises that step 6 verifies
// the packaged changelog. Reached only when the entry set already matched.
/**
 * Read one zip entry as UTF-8 text.
 *
 * The payload round-trips as base64: the changelog contains em dashes and the
 * PowerShell host's console encoding is not guaranteed to be UTF-8, so decoding
 * raw text straight out of execFileSync risks silent mojibake. Base64 is ASCII,
 * so the transport cannot corrupt it.
 */
function readZipEntry(zip, entryName) {
  const script =
    `Add-Type -AssemblyName System.IO.Compression.FileSystem; ` +
    `$z = [System.IO.Compression.ZipFile]::OpenRead('${zip.replace(/'/g, "''")}'); ` +
    `try { $e = $z.GetEntry('${entryName.replace(/'/g, "''")}'); ` +
    `if ($null -eq $e) { '' } else { ` +
    `$s = $e.Open(); $m = New-Object System.IO.MemoryStream; $s.CopyTo($m); $s.Close(); ` +
    `[Convert]::ToBase64String($m.ToArray()) } } finally { $z.Dispose() }`;
  const out = execFileSync('powershell', ['-NoProfile', '-Command', script], {
    encoding: 'utf8'
  }).trim();
  return out ? Buffer.from(out, 'base64').toString('utf8') : null;
}

/** Release categories a versioned section may use. Anything else is not a change. */
const RELEASE_CATEGORIES = ['Added', 'Changed', 'Fixed', 'Docs', 'Removed'];
const CHANGELOG_ENTRY = 'extension/changelog.md';

const packagedChangelog = readZipEntry(vsixPath, CHANGELOG_ENTRY);
if (packagedChangelog === null) {
  console.error(`FAIL: ${CHANGELOG_ENTRY} present in the entry set but not readable in the vsix`);
  process.exit(1);
}

const pkgVersion = readPackageJson().version;
// `[Unreleased]` is the accumulator slot and always sits at the top, so it is
// skipped: the newest RELEASED section must be the version being packaged.
const versionHeadings = [...packagedChangelog.matchAll(/^## \[([^\]]+)\]/gm)].map((m) => m[1]);
const [newestReleased] = versionHeadings.filter((v) => v !== 'Unreleased');
if (newestReleased !== pkgVersion) {
  console.error(
    `FAIL: newest released changelog section is [${newestReleased}] but package.json is ${pkgVersion} ` +
    `— the vsix would ship the wrong release notes`
  );
  process.exit(1);
}

const strayHeadings = [...packagedChangelog.matchAll(/^### (.+)$/gm)]
  .map((m) => m[1].trim())
  .filter((h) => !RELEASE_CATEGORIES.includes(h));
if (strayHeadings.length > 0) {
  console.error('FAIL: packaged changelog has non-release heading(s):');
  strayHeadings.forEach((h) => console.error(`  - ${h}`));
  console.error(`      allowed categories: ${RELEASE_CATEGORIES.join(', ')}`);
  process.exit(1);
}

console.log(
  `PASS: packaged changelog tops at released [${newestReleased}] and uses only release categories`
);