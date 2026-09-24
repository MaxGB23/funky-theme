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

/** Detect the vsix matching the current package.json version. */
function autoDetectVsix() {
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8'));
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

if (missing.length === 0 && extra.length === 0) {
  console.log(
    `PASS: vsix contains exactly the ${expectedEntries.length} allowed entries (.vscodeignore allowlist)`
  );
  process.exit(0);
}

if (missing.length > 0) {
  console.error('FAIL: expected entries missing from vsix:');
  missing.forEach((entry) => console.error(`  - ${entry}`));
}
if (extra.length > 0) {
  console.error('FAIL: unexpected entries in vsix (not allowlisted):');
  extra.forEach((entry) => console.error(`  + ${entry}`));
}
process.exit(1);