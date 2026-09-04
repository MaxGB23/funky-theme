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
    
    // Bajar opacidad de diffs aún más porque el fondo es más oscuro
    theme.colors['diffEditor.insertedLineBackground'] = '#8c8eff18';
    theme.colors['diffEditor.removedLineBackground'] = '#ff000018';
    theme.colors['diffEditor.insertedTextBackground'] = '#8c8eff28';
    theme.colors['diffEditor.removedTextBackground'] = '#ff000028';
    // QuickInput (Command Palette / Quick Open) Darker
    theme.colors['quickInput.foreground'] = '#ffffff';
    theme.colors['quickInputTitle.background'] = '#121018';
  }
  
  // Perfil: Dark & Italic (QuickInput con fondo profundo y texto blanco)
  if (variant.profile === 'flat' || variant.profile === 'expressive') {
    theme.colors['quickInput.foreground'] = '#ffffff';
    theme.colors['quickInputTitle.background'] = '#211e2b';
  }
  
  // Perfil: High Contrast (Accesibilidad visual)
  if (variant.profile === 'high-contrast') {
    theme.colors['contrastBorder'] = '#8c8effd2';
    theme.colors['activityBar.border'] = '#8c8effd2';
    theme.colors['sideBar.border'] = '#8c8effd2';
    theme.colors['editorGroup.border'] = '#8c8effd2';
    theme.colors['titleBar.border'] = '#8c8effd2';
    theme.colors['statusBar.border'] = '#8c8effd2';
    
    theme.colors['editor.selectionBackground'] = '#8c8effd2';
    theme.colors['editor.selectionForeground'] = '#ffffff';
    theme.colors['editorLineNumber.foreground'] = '#ffffff';
    theme.colors['editorLineNumber.activeForeground'] = '#eaa9fc';
    // Bordes de la línea actual: todos los bordes del editor visibles en HC
    theme.colors['editor.lineHighlightBackground'] = '#24212ed3';
    theme.colors['editor.lineHighlightBorder'] = '#8c8effd2';
    // Find Match: resaltado fuerte y distinguible en HC
    theme.colors['editor.findMatchBackground'] = '#a599efff';
    theme.colors['editor.findMatchBorder'] = '#a599efff';
    theme.colors['editor.findMatchForeground'] = '#ffffff';
    theme.colors['editor.findMatchHighlightBackground'] = '#5f569580';
    theme.colors['editor.findMatchHighlightForeground'] = '#ffffff';
    // Diffs: borde de línea/texto insertado (magenta) solo en HC
    theme.colors['diffEditor.insertedTextBorder'] = '#e881ff';
    theme.colors['diffEditor.insertedLineBorder'] = '#e881ff';
    // Suggest widget HC: borde, fondo e item seleccionado (icono hereda el compartido #ffa8e6)
    theme.colors['editorSuggestWidget.border'] = '#8c8effd2';
    theme.colors['editorSuggestWidget.selectedBackground'] = '#8c8eff33';
    theme.colors['editorSuggestWidget.selectedForeground'] = '#ffffff';
    // Hover widget HC: borde con el accent del tema
    theme.colors['editorHoverWidget.border'] = '#8c8effd2';
    // Sticky Scroll HC: bordes y resaltado de hover
    theme.colors['editorStickyScroll.border'] = '#8c8effd2';
    theme.colors['terminalStickyScroll.background'] = '#211e2b';
    theme.colors['terminalStickyScrollHover.background'] = '#2e2a3a';
    theme.colors['terminalStickyScroll.border'] = '#8c8effd2';
    // Guías de indentación de árbol claras en HC
    theme.colors['tree.indentGuidesStroke'] = '#8c8effd2';

    theme.colors['welcomePage.tileBackground'] = '#2e2a3a';
    theme.colors['welcomePage.tileHoverBackground'] = '#383347';
    theme.colors['welcomePage.tileBorder'] = '#ffffff15';
    theme.colors['welcomePage.progress.background'] = '#8c8effd2';

    theme.colors['textPreformat.background'] = '#8c8effd2';
    theme.colors['textPreformat.foreground'] = '#ffffff';

    // QuickInput (Command Palette / Quick Open) HC — fondo profundo, texto blanco
    theme.colors['quickInput.foreground'] = '#ffffff';
    theme.colors['quickInputTitle.background'] = '#211e2b';
    // Picker Group: separadores y bordes HC
    theme.colors['pickerGroup.border'] = '#8c8effd2';
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
      // JS: variable alias — el italic se aplica SOLO en la variante Italic (abajo), normal en el resto

      // Reglas Expresivas (Solamente en la variante Italic)
      if (variant.profile === 'expressive') {
        // Comments -> italic (solo en la variante Italic)
        if (scope.match(/^(comment|.*\.comment)[,\s$]/i) || scope === 'comment, punctuation.definition.comment') styles.push('italic');
        // JS: variable alias -> italic
        if (scope.match(/variable\.other\.readwrite\.alias\.js/i)) styles.push('italic');
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
