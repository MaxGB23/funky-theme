const fs = require('fs');
const path = require('path');

// 1. Cargamos el Source of Truth
const baseTheme = require('../src/theme-config.js');

const THEMES_DIR = path.join(__dirname, '..', 'themes');

// Asegurarse de que exista la carpeta
if (!fs.existsSync(THEMES_DIR)){
    fs.mkdirSync(THEMES_DIR);
}

const variants = [
  { file: 'maxiano-dark.json', name: 'Maxiano Dark', profile: 'flat' },
  { file: 'maxiano-dark-italic.json', name: 'Maxiano Dark Italic', profile: 'expressive' },
  { file: 'maxiano-darker.json', name: 'Maxiano Darker', profile: 'ultra-nocturno' },
  { file: 'maxiano-high-contrast.json', name: 'Maxiano High Contrast', profile: 'high-contrast' }
];

variants.forEach(variant => {
  // Clonamos el objeto base para no mutar la referencia original
  const theme = JSON.parse(JSON.stringify(baseTheme));
  
  theme.name = variant.name;
  theme.type = "dark";
  
  // Perfil: Darker (Oscurecer fondos drásticamente)
  if (variant.profile === 'ultra-nocturno') {
    Object.keys(theme.colors || {}).forEach(k => {
      let color = theme.colors[k].toLowerCase();
      // Backgrounds del config original (#24212e, #211e2b, #2e2a3a)
      if (color.startsWith('#24212e')) theme.colors[k] = '#181520' + color.slice(7);
      if (color.startsWith('#211e2b')) theme.colors[k] = '#121018' + color.slice(7);
      if (color.startsWith('#2e2a3a')) theme.colors[k] = '#201d2a' + color.slice(7);
    });
  }
  
  // Perfil: High Contrast (Accesibilidad visual)
  if (variant.profile === 'high-contrast') {
    theme.colors['contrastBorder'] = '#ffffff25';
    theme.colors['activityBar.border'] = '#ffffff25';
    theme.colors['sideBar.border'] = '#ffffff25';
    theme.colors['editorGroup.border'] = '#ffffff25';
    theme.colors['titleBar.border'] = '#ffffff25';
    theme.colors['statusBar.border'] = '#ffffff25';
    
    if (theme.tokenColors) {
      theme.tokenColors.forEach(token => {
        if (token.settings && token.settings.foreground === '#555555') {
          token.settings.foreground = '#A0AAB0'; 
        }
      });
    }
  }

  // Perfiles Tipográficos (FontStyles)
  if (theme.tokenColors) {
    theme.tokenColors.forEach(token => {
      if (!token.settings) return;
      delete token.settings.fontStyle; 
      
      const scope = Array.isArray(token.scope) ? token.scope.join(',') : (token.scope || '');
      let styles = [];
      
      // Reglas Globales
      // Comments: sin italic (fontStyle: "" explícito en theme-config)
      if (scope.match(/entity\.other\.attribute-name\.(jsx|tsx)/i)) styles.push('italic');
      if (scope.match(/variable\.language\.(this|self|super)/i)) styles.push('italic');
      // Markdown: Headings siempre en bold (solo scopes dedicados, no los combinados de strings)
      const isOnlyHeadingScope = scope.match(/^markup\.heading/) || scope.match(/^markdown\.heading/) || scope.match(/^entity\.name\.section\.markdown/) || scope.match(/markup\.heading\.markdown[, $]/);
      if (isOnlyHeadingScope) {
        if (!styles.includes('bold')) styles.push('bold');
      }
      if (scope.match(/^punctuation\.definition\.heading\.markdown/)) {
        if (!styles.includes('bold')) styles.push('bold');
      }
      // Markdown: Bold y su puntuación
      if (scope.match(/markup\.bold\.markdown/i) || scope.match(/^markup\.bold[, $]/i) || scope.match(/punctuation\.definition\.bold\.markdown/i)) {
        if (!styles.includes('bold')) styles.push('bold');
      }
      // Markdown: Italic y su puntuación
      if (scope.match(/markup\.italic\.markdown/i) || scope.match(/^markup\.italic[, $]/i) || scope.match(/punctuation\.definition\.italic\.markdown/i)) {
        if (!styles.includes('italic')) styles.push('italic');
      }
      // Markdown: Inline code e items con fontStyle italic
      if (scope.match(/markup\.inline\.raw\.string\.markdown/i)) styles.push('italic');
      if (scope.match(/markup\.underline\.link/i)) styles.push('italic');
      // JS: variable alias en italic
      if (scope.match(/variable\.other\.readwrite\.alias\.js/i)) styles.push('italic');

      // Reglas Expresivas (Solamente en la variante Italic)
      if (variant.profile === 'expressive') {
        if (scope.match(/variable\.parameter/i) || 
            scope.match(/storage\.type/i) || 
            scope.match(/meta\.decorator/i) || 
            (scope.match(/entity\.other\.attribute-name/i) && !scope.match(/jsx|tsx/i))
            ) {
          if (!styles.includes('italic')) styles.push('italic');
        }
        if (scope.match(/keyword\.control/i) || scope.match(/keyword\.operator\.new/i)) {
          styles.push('bold');
        }
      }

      if (styles.length > 0) {
        token.settings.fontStyle = styles.join(' ');
      }
    });
  }

  // Guardar en la carpeta /themes
  fs.writeFileSync(path.join(THEMES_DIR, variant.file), JSON.stringify(theme, null, 2));
  console.log(`✅ ${variant.name} construido en /themes/${variant.file}`);
});
