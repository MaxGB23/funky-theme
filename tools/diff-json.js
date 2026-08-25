const fs = require('fs');
const JSON5 = require('json5');

const origPath = 'M:/vscode-themes/funky-theme-vscode/themes/maxiano-dark.json';
const copyPath = 'M:/vscode-themes/funky-theme-vscode/themes/maxiano-dark-copy.json';

function parseJsonc(path) {
    const raw = fs.readFileSync(path, 'utf8');
    try {
        return JSON5.parse(raw);
    } catch (e) {
        console.error("Error parsing JSON in " + path);
        console.error(e.message);
        process.exit(1);
    }
}

const orig = parseJsonc(origPath);
const copy = parseJsonc(copyPath);

console.log("=== COLORS DIFF ===");
for (let key in copy.colors) {
    if (orig.colors[key] !== copy.colors[key]) {
        if (!orig.colors.hasOwnProperty(key)) {
            console.log(`[ADDED COLOR] ${key}: ${copy.colors[key]}`);
        } else {
            console.log(`[CHANGED COLOR] ${key}: ${orig.colors[key]} -> ${copy.colors[key]}`);
        }
    }
}
for (let key in orig.colors) {
    if (!copy.colors.hasOwnProperty(key)) {
        console.log(`[DELETED COLOR] ${key}`);
    }
}

console.log("\n=== TOKEN COLORS DIFF ===");
function indexTokenColors(tc) {
    const map = {};
    tc.forEach((t, i) => {
        const scopeKey = Array.isArray(t.scope) ? t.scope.join(',') : t.scope;
        if (!scopeKey) return;
        map[scopeKey] = t;
    });
    return map;
}

const origTc = indexTokenColors(orig.tokenColors);
const copyTc = indexTokenColors(copy.tokenColors);

for (let key in copyTc) {
    if (!origTc.hasOwnProperty(key)) {
        console.log(`\n[ADDED SCOPE] ${key}`);
        console.log(JSON.stringify(copyTc[key].settings, null, 2));
    } else {
        const oSet = origTc[key].settings;
        const cSet = copyTc[key].settings;
        if (JSON.stringify(oSet) !== JSON.stringify(cSet)) {
            console.log(`\n[CHANGED SCOPE] ${key}`);
            console.log(`Original: ${JSON.stringify(oSet)}`);
            console.log(`New:      ${JSON.stringify(cSet)}`);
        }
    }
}
for (let key in origTc) {
    if (!copyTc.hasOwnProperty(key)) {
        console.log(`\n[DELETED SCOPE] ${key}`);
    }
}
