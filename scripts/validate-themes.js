// CI validation: every theme declared in package.json must exist after build
// and parse as valid JSON. Fails with a non-zero exit code otherwise.
const fs = require('fs');
const path = require('path');

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const themes = pkg.contributes.themes;

if (!Array.isArray(themes) || themes.length === 0) {
  console.error('FAIL: no themes declared in package.json contributes.themes');
  process.exit(1);
}

const errors = [];
for (const { label, path: themePath } of themes) {
  const full = path.join(__dirname, '..', themePath);
  if (!fs.existsSync(full)) {
    errors.push(`${label}: missing file ${themePath}`);
    continue;
  }
  try {
    const theme = JSON.parse(fs.readFileSync(full, 'utf8'));
    if (!theme.name) {
      errors.push(`${label}: missing "name" field in ${themePath}`);
    }
  } catch (err) {
    errors.push(`${label}: invalid JSON in ${themePath} — ${err.message}`);
  }
}

if (errors.length > 0) {
  console.error('FAIL: theme validation errors:');
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`OK: ${themes.length} theme variants validated`);