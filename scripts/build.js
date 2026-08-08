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
      // Backgrounds del config original (#24212e, #211e2b, #2e2a3a)
      if (theme.colors[k].toLowerCase() === '#24212e') theme.colors[k] = '#181520';
      if (theme.colors[k].toLowerCase() === '#211e2b') theme.colors[k] = '#121018';
      if (theme.colors[k].toLowerCase() === '#2e2a3a') theme.colors[k] = '#201d2a';
    });
  }
  
  // Perfil: High Contrast (Accesibilidad visual)
  if (variant.profile === 'high-contrast') {
    theme.colors['contrastBorder'] = '#ffffff25';
    theme.colors['activityBar.border'] = '#ffffff25';
    theme.colors['sideBar.border'] = '#ffffff25';
    theme.colors['editorGroup.border'] = '#ffffff25';
    
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
      if (scope.match(/comment/i)) styles.push('italic');
      if (scope.match(/entity\.other\.attribute-name\.(jsx|tsx)/i)) styles.push('italic');
      if (scope.match(/variable\.language\.(this|self|super)/i)) styles.push('italic');

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
