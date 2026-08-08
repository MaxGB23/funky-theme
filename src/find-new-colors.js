// Uso: node src/find-new-colors.js
// Este script encuentra los colores que están en el tema pero no están en el archivo de configuración.

const fs = require('fs');
const path = require('path');

const hexRegex = /#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{3})\b/g;

function extractColors(filePath) {
    if (!fs.existsSync(filePath)) return new Set();
    const content = fs.readFileSync(filePath, 'utf-8');
    const matches = content.match(hexRegex) || [];
    return new Set(matches.map(c => c.toLowerCase()));
}

const themeFile = 'M:/vscode-themes/funky-theme-vscode/themes/maxiano-dark-copy.json';
const configFiles = [
    'M:/vscode-themes/funky-theme-vscode/src/theme-config.js',
    'M:/vscode-themes/funky-theme-vscode/scripts/build.js'
];

const themeColors = extractColors(themeFile);
const configColors = new Set();
configFiles.forEach(file => {
    extractColors(file).forEach(color => configColors.add(color));
});

const newColors = [...themeColors].filter(c => !configColors.has(c));

console.log(JSON.stringify(newColors, null, 2));