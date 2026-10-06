// ==========================================
// FUNKY THEME — ZED MAPPING (Zed target)
// ==========================================
// Tabla curada a mano VS Code -> Zed (plan §D4: el importer oficial aplana
// los tiers; el prefix matching de Zed preserva keyword + keyword.control).
//
// REGLA: todo valor resuelve a un token de `palette` (nombre directo) o a
// una key de `colors` de theme-config.js (prefijo `colors:`). El build
// (scripts/build-zed.js) FALLA ante referencia invalida (plan §D2).
// Sin variantes HC ni Mix en Zed (decisiones Q2/Q5 del plan).
//
// Referencia de claves: assets/themes/one/one.json de Zed (style plano +
// players[] + syntax{}; sin additionalProperties -> claves ausentes usan
// defaults de Zed y se validan cargando en Zed, no contra el schema).

const { palette } = require('./theme-config.js');

const zedMap = {
  // ── UI planas (style) ──────────────────────────────────────────────
  style: {
    // Editor
    'editor.background': 'bgBase',
    'editor.foreground': 'fgBase',
    'editor.gutter.background': 'bgBase',
    'editor.subheader.background': 'bgDeep',
    'editor.active_line.background': 'bgElevated',
    'editor.highlighted_line.background': 'bgElevated',
    // Literal de un solo uso via colors: el numero de linea apagado no es token
    'editor.line_number': 'colors:editorLineNumber.foreground',
    'editor.active_line_number': 'purpleDim',
    'editor.hover_line_number': 'uiInactive',
    'editor.invisible': 'uiMuted',
    'editor.wrap_guide': 'colors:editorIndentGuide.background1',
    'editor.active_wrap_guide': 'greyLight',
    'editor.indent_guide': 'colors:editorIndentGuide.background1',
    'editor.indent_guide_active': 'guideMid',
    'editor.document_highlight.read_background': 'accentFaint',
    'editor.document_highlight.write_background': 'accentSelection',

    // Chrome: bordes / superficies / elementos
    'border': 'bgElevated',
    'border.variant': 'bgDeep',
    'border.focused': 'uiAccentStrong',
    'border.selected': 'uiAccentStrong',
    'border.transparent': 'colors:scrollbar.background',
    'border.disabled': 'uiMuted',
    'elevated_surface.background': 'bgElevated',
    'surface.background': 'bgElevated',
    'background': 'bgDeep',
    'element.background': 'bgElevated',
    'element.hover': 'colors:list.hoverBackground',
    'element.active': 'bgElevated',
    'element.selected': 'colors:list.activeSelectionBackground',
    'element.disabled': 'bgDeep',
    'drop_target.background': 'accentSelection',
    'ghost_element.background': 'colors:scrollbar.background',
    'ghost_element.hover': 'colors:list.hoverBackground',
    'ghost_element.active': 'bgElevated',
    'ghost_element.selected': 'colors:list.activeSelectionBackground',
    'ghost_element.disabled': 'bgDeep',

    // Texto e iconos
    'text': 'fgWhite',
    'text.muted': 'uiInactive',
    'text.placeholder': 'uiMuted',
    'text.disabled': 'uiMuted',
    'text.accent': 'pinkLight',
    'icon': 'fgWhite',
    'icon.muted': 'uiInactive',
    'icon.disabled': 'uiMuted',
    'icon.placeholder': 'uiMuted',
    'icon.accent': 'uiAccent',

    // Status / titulo / tabs
    'status_bar.background': 'bgDeep',
    'title_bar.background': 'bgDeep',
    'title_bar.inactive_background': 'colors:titleBar.inactiveBackground',
    'toolbar.background': 'bgDeep',
    'tab_bar.background': 'bgDeep',
    'tab.inactive_background': 'bgBase',
    'tab.active_background': 'bgElevated',

    // Busqueda / paneles / scrollbar
    'search.match_background': 'searchBackground',
    'search.active_match_background': 'matchBorder',
    'panel.background': 'bgDeep',
    'panel.focused_border': 'uiAccentStrong',
    'panel.indent_guide': 'colors:editorIndentGuide.background1',
    'panel.indent_guide_active': 'guideMid',
    'panel.indent_guide_hover': 'guideMid',
    'pane.focused_border': 'uiAccentStrong',
    'scrollbar.thumb.background': 'colors:scrollbarSlider.background',
    'scrollbar.thumb.hover_background': 'colors:scrollbarSlider.hoverBackground',
    'scrollbar.thumb.border': 'colors:scrollbar.background',
    'scrollbar.track.background': 'colors:scrollbar.background',
    'scrollbar.track.border': 'colors:scrollbar.background',

    // ── Terminal (16 ANSI via tokens; dim_* se omiten = default de Zed) ──
    'terminal.background': 'bgDeep',
    'terminal.foreground': 'fgBase',
    'terminal.bright_foreground': 'fgWhite',
    'terminal.dim_foreground': 'uiInactive',
    'terminal.ansi.black': 'bgDeep',
    'terminal.ansi.red': 'errorFg',
    'terminal.ansi.green': 'greenAccent',
    'terminal.ansi.yellow': 'yellowBase',
    'terminal.ansi.blue': 'purpleBase',
    'terminal.ansi.magenta': 'pinkLight',
    'terminal.ansi.cyan': 'cyanTerminal',
    'terminal.ansi.white': 'fgBase',
    // Literal de un solo uso via colors (gris propio del ANSI brillante)
    'terminal.ansi.bright_black': 'colors:terminal.ansiBrightBlack',
    'terminal.ansi.bright_red': 'errorFg',
    'terminal.ansi.bright_green': 'pinkLight',
    'terminal.ansi.bright_yellow': 'yellowBase',
    'terminal.ansi.bright_blue': 'purpleDim',
    'terminal.ansi.bright_magenta': 'pinkLight',
    'terminal.ansi.bright_cyan': 'cyanTerminal',
    'terminal.ansi.bright_white': 'fgWhite',

    // ── Git / diagnosticos (solo base; .background/.border usan defaults) ──
    'link_text.hover': 'linkPurple',
    'version_control.added': 'greenBase',
    'version_control.modified': 'cyanVibrant',
    'version_control.deleted': 'pinkAccent',
    'version_control.word_added': 'colors:diffEditor.insertedTextBackground',
    'version_control.word_deleted': 'colors:diffEditor.removedTextBackground',
    'created': 'greenBase',
    'modified': 'cyanVibrant',
    'deleted': 'pinkTerminal',
    'conflict': 'orangeBase',
    'renamed': 'cyanAccent',
    'ignored': 'pinkLight',
    'hidden': 'uiMuted',
    'info': 'uiAccent',
    'success': 'greenBase',
    'warning': 'yellowBase',
    'error': 'errorFg',
    'hint': 'purpleBright',
    'predictive': 'uiMuted',
    'unreachable': 'uiInactive',
  },

  // ── Sintaxis (tiers preservados: keyword vs keyword.control, etc.) ──
  // Valor string = solo color; objeto = color + font_style/font_weight.
  syntax: {
    'attribute': 'yellowLight',
    'boolean': 'pinkLight',
    'character': 'pinkLight',
    // fgMuted reactiva su rol: base sin alpha del comentario VS Code (#d8d8d8f1)
    'comment': 'fgMuted',
    'comment.doc': 'fgMuted',
    'constant': 'pinkLight',
    'constructor': 'blueMethod',
    'embedded': 'fgBase',
    'emphasis': { color: 'cyanVibrant', font_style: 'italic' },
    'emphasis.strong': { color: 'cyanVibrant', font_weight: 700 },
    'enum': 'yellowLight',
    'function': 'cyanAccent',
    'hint': 'uiMuted',
    'keyword': 'purpleDim',
    'keyword.control': 'purpleBright',
    'label': 'greenAccent',
    'link_text': 'yellowBase',
    'link_uri': { color: 'greenAccent', font_style: 'italic' },
    'namespace': 'yellowLight',
    'number': 'pinkLight',
    'operator': 'operatorBlue',
    'predictive': { color: 'uiMuted', font_style: 'italic' },
    'preproc': 'cyanAccent',
    'primary': 'fgBase',
    'property': 'fgWhite',
    'punctuation': 'cyanDim',
    // Sin amarillo meta.brace aqui: el rainbow de Zed vive en accents[]
    'punctuation.bracket': 'cyanDim',
    'punctuation.delimiter': 'cyanDim',
    'punctuation.list_marker': 'yellowBase',
    'punctuation.markup': 'purpleGrey',
    'punctuation.special': 'blueSoft',
    'selector': 'yellowLight',
    'selector.pseudo': 'cyanAccent',
    'string': 'greenAccent',
    'string.escape': 'cyanAccent',
    'string.regex': 'greenAccent',
    'string.special': 'greenAccent',
    'string.special.symbol': 'greenAccent',
    'tag': 'pinkAccent',
    // Componentes TSX/JSX (capture tag.component.jsx del inspector) en lila, igual que support.class en VS Code
    'tag.component': 'purpleBright',
    'text.literal': 'greenAccent',
    'title': { color: 'pinkVibrant', font_weight: 700 },
    'type': 'yellowLight',
    // Primitivos (int/string/...) vs tipos propios: igual que keyword.type en VS Code
    'type.builtin': 'purpleDim',
    'variable': 'fgBase',
    'variable.parameter': 'pinkLight',
    'variable.special': 'purpleBright',
    'variant': 'yellowLight',
    'diff.plus': 'greenMaterial',
    'diff.minus': 'redBase',
  },

  // ── Players (solo local; remotos usan defaults de Zed en v0.1) ──
  players: [
    { cursor: 'yellowVibrant', background: 'yellowVibrant', selection: 'accentSelection' },
  ],

  // ── Accents (rainbow brackets: niveles 1-3 = VS Code, resto tiers) ──
  // Los dos literales de un solo uso van via colors (mismo criterio AGENTS.md)
  accents: [
    'yellowVibrant',
    'colors:editorBracketHighlight.foreground2',
    'colors:editorBracketHighlight.foreground3',
    'cyanAccent',
    'pinkAccent',
    'greenAccent',
    'purpleBright',
  ],
};

// Transform Darker para Zed: MISMO mecanismo que darkerBackgrounds de
// build.js (keyed por valor resuelto, conserva sufijo alpha). Subset aplicable
// a las keys Zed mapeadas arriba. NO se trasladan las entradas '#363143'
// (compactHover, sin destino Zed) ni '#444156' (separador de menu, sin destino
// Zed): el build nunca las matchearia y serian peso muerto.
const zedDarkerBackgrounds = {
  [palette.bgBase]: '#181520',
  [palette.bgDeep]: '#121018',
  [palette.bgElevated]: '#201d2a',
  '#464254': '#3a374a',
  [palette.guideMid]: '#544f64',
};

module.exports = { zedMap, zedDarkerBackgrounds };
