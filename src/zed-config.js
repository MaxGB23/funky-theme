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
    'editor.wrap_guide': 'guideRuler',
    'editor.active_wrap_guide': 'greyLight',
    'editor.indent_guide': 'guideDim',
    'editor.indent_guide_active': 'guideMidDim',
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
    // Wash de matches: mismo rol que el findMatchHighlight de VS Code 3.2.0 (searchMatch).
    // El match activo va opaco a proposito: Zed no tiene key de borde para el search, asi
    // que el relleno (el mismo color que VS Code usa como borde) es lo que lo identifica
    // de un vistazo frente a los demas matches.
    'search.match_background': 'searchMatch',
    'search.active_match_background': 'matchBorder',
    'panel.background': 'bgDeep',
    'panel.focused_border': 'uiAccentStrong',
    'panel.indent_guide': 'guideDim',
    'panel.indent_guide_active': 'guideMidDim',
    'panel.indent_guide_hover': 'guideMidDim',
    'pane.focused_border': 'uiAccentStrong',
    'scrollbar.thumb.background': 'colors:scrollbarSlider.background',
    'scrollbar.thumb.hover_background': 'colors:scrollbarSlider.hoverBackground',
    'scrollbar.thumb.border': 'colors:scrollbar.background',
    'scrollbar.track.background': 'colors:scrollbar.background',
    'scrollbar.track.border': 'colors:scrollbar.background',

    // ── Terminal (16 ANSI derivados del JSON de VS Code; dim_* se omiten = default de Zed) ──
    // Las 16 keys se resuelven via `colors:` (no por token propio) para que el bloque ANSI de
    // theme-config.js sea la unica fuente de la paleta de terminal y los dos canales no puedan
    // divergir: antes derivaba solo bright_black, asi que cualquier cambio en VS Code dejaba
    // Zed medio-alineado (1 slot nuevo y 15 viejos), peor que no tocarlo.
    // bright_foreground se queda en el token: es el texto en negrita del terminal, no una key ANSI.
    'terminal.background': 'colors:terminal.background',
    'terminal.foreground': 'colors:terminal.foreground',
    'terminal.bright_foreground': 'fgWhite',
    'terminal.dim_foreground': 'uiInactive',
    'terminal.ansi.black': 'colors:terminal.ansiBlack',
    'terminal.ansi.red': 'colors:terminal.ansiRed',
    'terminal.ansi.green': 'colors:terminal.ansiGreen',
    'terminal.ansi.yellow': 'colors:terminal.ansiYellow',
    'terminal.ansi.blue': 'colors:terminal.ansiBlue',
    'terminal.ansi.magenta': 'colors:terminal.ansiMagenta',
    'terminal.ansi.cyan': 'colors:terminal.ansiCyan',
    'terminal.ansi.white': 'colors:terminal.ansiWhite',
    'terminal.ansi.bright_black': 'colors:terminal.ansiBrightBlack',
    'terminal.ansi.bright_red': 'colors:terminal.ansiBrightRed',
    'terminal.ansi.bright_green': 'colors:terminal.ansiBrightGreen',
    'terminal.ansi.bright_yellow': 'colors:terminal.ansiBrightYellow',
    'terminal.ansi.bright_blue': 'colors:terminal.ansiBrightBlue',
    'terminal.ansi.bright_magenta': 'colors:terminal.ansiBrightMagenta',
    'terminal.ansi.bright_cyan': 'colors:terminal.ansiBrightCyan',
    'terminal.ansi.bright_white': 'colors:terminal.ansiBrightWhite',

    // ── Git / diagnosticos ──
    // El popover de diagnostico de Zed pinta status.<sev>_background/_border y
    // escribe encima con editor.foreground: si faltan, Zed NO hereda el color del
    // tema. Solo deriva <x>_background (25% del propio fg) para deleted/created/
    // modified/conflict/error/hidden (theme::apply_status_color_defaults); el resto
    // de las familias cae al default de Zed a opacidad total (ilegible) y ningun
    // _border se deriva nunca. Fondo = superficie elevada comun; borde = color del
    // propio estado.
    'link_text.hover': 'linkPurple',
    'version_control.added': 'greenBase',
    'version_control.modified': 'cyanVibrant',
    'version_control.deleted': 'pinkAccent',
    // conflict: sin esta key Zed cae a status.ignored y el conflicto sale rosa, igual
    // que los ignorados (VS Code usa orangeBase en gitDecoration.conflictingResource).
    // renamed queda sin mapear a proposito: VS Code tampoco define decoracion de rename
    // y el fallback de Zed (status.modified = cyanVibrant) ya coincide con la nuestra.
    'version_control.conflict': 'orangeBase',
    'version_control.word_added': 'colors:diffEditor.insertedTextBackground',
    'version_control.word_deleted': 'colors:diffEditor.removedTextBackground',
    'created': 'greenBase',
    'modified': 'cyanVibrant',
    'deleted': 'pinkTerminal',
    'conflict': 'orangeBase',
    'renamed': 'cyanAccent',
    'ignored': 'pinkLight',
    'ignored.background': 'bgElevated',
    'ignored.border': 'pinkLight',
    'hidden': 'uiMuted',
    'info': 'uiAccent',
    'info.background': 'bgElevated',
    'info.border': 'uiAccent',
    'success': 'greenBase',
    'warning': 'yellowBase',
    'warning.background': 'bgElevated',
    'warning.border': 'yellowBase',
    'error': 'errorFg',
    'error.background': 'bgElevated',
    'error.border': 'errorFg',
    'hint': 'purpleBright',
    'hint.background': 'bgElevated',
    'hint.border': 'purpleBright',
    'predictive': 'uiMuted',
    'unreachable': 'uiInactive',
    // El bloque de salida de `:!cmd` (vim) se pinta con la superficie de los paneles
    // de terminal (mismo token que terminal.background y panel.background); sin esto
    // caia al gris claro opaco de Zed y tapaba el texto del buffer.
    'unreachable.background': 'bgDeep',
    'unreachable.border': 'uiInactive',
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
    // VS Code separa la familia: numeros/lenguaje/character en rosa, y las constantes
    // NOMBRADAS (variable.other.constant) caen a `variable` -> fgBase (#f8f8f2).
    // Zed tiene un solo token `constant`, asi que toma el rol nombrado, y el builtin
    // (None/nil/undefined/NaN, en VS Code constant.language) queda pinneado en rosa:
    // un nombre punteado que no exista se registra como capture propio (SyntaxTheme::merge).
    'constant': 'fgBase',
    'constant.builtin': 'pinkLight',
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
    // Keys JSON (capture property.json_key del inspector): amarillo fuerte,
    // igual que support.type.property-name.json en VS Code; no toca property generico
    'property.json_key': 'yellowBase',
    'punctuation': 'cyanDim',
    // Brackets en el azul del nivel 3 de VS Code (testeado: el cyan chocaba
    // con functions en `function()`, el amarillo/rosa saturaban); via colors
    // para no duplicar el literal, igual que accents[] con foreground2/3
    'punctuation.bracket': 'colors:editorBracketHighlight.foreground3',
    // <> de HTML (capture punctuation.bracket.html en highlights.scm de Zed):
    // blancos como punctuation.definition.tag en VS Code; el prefix matching
    // de Zed lo limita a HTML sin tocar el amarillo generico
    'punctuation.bracket.html': 'fgWhite',
    // <> de JSX/TSX (capture punctuation.bracket.jsx en crates/grammars de
    // Zed, tsx y javascript): blancos igual que en VS Code
    'punctuation.bracket.jsx': 'fgWhite',
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
  // Entradas por PREFIJO (no hex completo) para las guias: conservan el alpha de cada
  // key, asi que los alphas nuevos de Zed viajan solos (ruler opaco, indent atenuados)
  // y si mañana cambian, no hay que tocar el valor de aca.
  '#464254': '#3a374a',
  '#625e74': '#544f64',
  // El wash del search baja un paso en Darker (35 -> 30), como el resto de los fondos
  [palette.searchMatch]: '#c792ea30',
};

module.exports = { zedMap, zedDarkerBackgrounds };
