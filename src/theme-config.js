// ==========================================
// MAXIANO THEME CONFIGURATION (Source of Truth)
// ==========================================
// Este archivo genera el JSON final.
// Acá SÍ POUDÉS usar comentarios eternamente y cambiar variables sin miedo.

const palette = {
  // === Fondos Oscuros (Reemplaza la locura de 6 fondos grises distintos) ===
  bgBase: "#24212e",       // bg-base (Reemplaza a '#282433', '#292d3e') - Editor, activity bar y sidebars
  bgDeep: "#211e2b",       // bg-deep (Reemplaza a '#211e2c', '#21222c') - Terminal y paneles fijos
  bgElevated: "#2e2a3a",   // bg-elevated (Reemplaza a '#2e2e2e', '#312c3f') - Tabs activas y hover de listas

  // === Claros (Foreground principal) ===
  fgBase: "#f8f8f2",       // fg-base (Reemplaza los 5 "blancos cian": '#eeffff', '#f7f7f7', '#eefcfe', etc.)
  fgWhite: "#ffffff",      // fg-white - Blanco puro para meta tags, clases, html tags y terminal.ansiBrightWhite
  textTui: "#eff0eb",      // text-tui - Cuerpo del terminal (terminal.foreground + ansiWhite). Es el #eff0eb testeado en terminal por funky-theme-tui, un paso por debajo de fgBase a propósito: el texto del agente no compite con el de identificadores
  textDim: "#8e8ea7",      // text-dim - Texto tenue del terminal de Zed (terminal.dim_foreground): 5.1:1 sobre bgDeep, el mismo piso que uiInactive. El dim del TUI (uiMuted #606685) cae a 2.9:1 y por eso no puede ser texto tenue
  fgMuted: "#d8d8d8",      // fg-muted - SIN USOS (0 referencias). Los comentarios usan literal alfa #d8d8d8f1; mantener solo si se decide reactivarlo

  // === Grises de UI e Invisibles ===
  uiMuted: "#606685",      // ui-muted (Reemplaza a '#5a657c','#65737e','#546e7a') - Bordes, guías y tokens secundarios
  uiInactive: "#8b8f9e",   // ui-inactive - Texto UI inactivo: panelTitle y tabs inactivos
  guideMid: "#625e74",     // guide-mid - Guías del árbol y bordes de tabla; en HC, guía base del editor (la activa y las del árbol pasan a fgBase, y los bordes de tabla a uiAccentStrong)
  // Alphas de las guías en Zed: mismo hex base que guideMid y #464254, pero
  // atenuados porque se repiten en cada nivel del editor y del árbol. VS Code tiene
  // sus propios alphas (#46425470 / #625e74c1, más opacos en Darker): cada canal los
  // calibra aparte porque el trazo no se aprecia igual.
  guideDim: "#46425490",     // editor.indent_guide + panel.indent_guide
  guideRuler: "#464254ff",   // editor.wrap_guide (ruler de columna: una sola linea, sin alpha)
  guideMidDim: "#625e74d1",  // editor.indent_guide_active + panel.indent_guide_active/hover
  greyLight: "#cbcbcb",    // grey-light - Delimitadores de code blocks de Markdown
  purpleGrey: "#a9b1de",   // purple-grey - Puntuación y meta de Markdown
  linkPurple: "#b2b3ff",   // link-purple - Links y pickerGroup foreground

  // === Colores de Sintaxis (Accents Tiered Palette) ===

  // Cyans (Attributes, Numbers)
  cyanDim: "#80ecff",      // cyan-dim (Reemplaza a '#8ceaff') - Puntuación general, constant.other.color y literales (umbrella `punctuation`); group punctuation de regex cae aquí. También terminal.ansiBrightCyan
  cyanAccent: "#96e7ff",   // cyan-accent - Functions, git modified, regex, escapes y terminal.ansiCyan
  cyanVibrant: "#6df5fa",  // cyan-vibrant - Markdown bold, italic e interfaces

  // Rojos (Errors, Tags de cierre, Variables mutadas)
  redBase: "#ff5555",      // red-base (Reemplaza a '#ff6e6e', '#f07178', '#ff5370')
  redSoft: "#f38ba9",      // red-soft - Alerta de declaración: CSS !important (css/scss/less/sass/stylus). NO es color de error (para eso están errorFg/errorTui): es el rojo desaturado que avisa que una declaración rompe la cascada sin leerse como falla. Vive en la familia roja a propósito — es un code smell, no estructura — y más apagado que errorTui (81% de saturación vs 100%) para que no compita con el rojo de terminal

  // Rosas (Keywords, Control Flow, Parameters)
  pinkBase: "#ff8bee",     // pink-base (Reemplaza la masacre de 5 rosas: '#ffacf5', '#feb3e8', '#ffa6f9', '#ff92df', '#ff78f8') - SIN USOS: aguarda un nuevo rol (decidido 2026-09-11)
  pinkLight: "#ffa8e6",    // pink-light - Git ignored, constantes numéricas, parámetros y terminal.ansiMagenta
  pinkAccent: "#ff87c5",   // pink-accent - Tags HTML/SGM y git deleted markers
  pinkVibrant: "#ff8ddb",  // pink-vibrant - Headings de Markdown
  pinkTerminal: "#ff55a4", // pink-terminal - Solo decoraciones de git deleted (sin rol ANSI: el rojo del terminal es errorFg/errorTui)

  // Rojo de errores (squiggly, gutter markers, error markers)
  errorFg: "#ff8282",      // error-foreground - list.errorForeground, editorError.foreground y terminal.ansiRed
  errorTui: "#ff718f",     // error-tui - terminal.ansiBrightRed: el rojo testeado en terminal por funky-theme-tui (más rosado que errorFg, que lee distinto sobre fondo oscuro)

  // Morados (Operators, Support Classes, Flujo/Control)
  purpleDim: "#c792ea",    // purple-dim (Reemplaza a '#d6acff') - keyword genérico, editorLineNumber activa y markup.changed (los operadores viven en operatorBlue; el azul del terminal, en blueMethod/operatorBlue)
  purpleBase: "#bd93f9",   // purple-base (Reemplaza a '#cca2e8') - SIN USOS desde 2026-10-19: el terminal.ansiBlue pasó a blueMethod; aguarda un nuevo rol
  purpleBright: "#eaa9fc", // purple-bright - support.class, variable.language (this), keyword.control (flujo) y terminal.ansiBrightMagenta
  purpleSoft: "#b7b5ff",   // purple-soft - SIN USOS: aguarda un nuevo rol (lavanda liberada 2026-09-15 al mover storage.modifier a operatorBlue)

  // Naranjas & Amarillos (Strings, Functions, Warnings)
  orangeBase: "#ffb86c",   // orange-base (Reemplaza a '#ffcb6b') - HTML y CSS attribute names, git conflicting/changed y sublimelinter warning (los warnings del editor son yellowBase)
  orangeAccent: "#ffd089", // orange-accent - keyword.operator/other/control.new y constant.other.reference.link.markdown (naranja compartido: new y md link consistente, claro y de baja fatiga)
  orangeSoft: "#ffb488",   // orange-soft - keyword.other (extends, package, auxiliares). Candidato a más usos
  yellowBase: "#f7ffa1",   // yellow-base - Markdown (links y listas), warnings del editor y terminal.ansiYellow (en Darker bajan a #e8f09a)
  yellowLight: "#fff9b7",  // yellow-light - Entity types, classes, support types, attribute names y terminal.ansiBrightYellow (en Darker bajan a #fff9ba)
  yellowVibrant: "#ffde25", // yellow-vibrant - editorCursor, extensionIcon.starForeground y editorBracketHighlight.foreground1 (amarillo dorado, fuerza de icono)
  bracketGold: "#ffd700",  // bracket-gold - SIN USOS: aguarda un nuevo rol (fallback meta.brace movido a yellowVibrant 2026-09-18)

  // Verdes (Classes, RegEx, Strings exitosos)
  greenBase: "#8bffa8",    // green-base (Reemplaza a '#8affc4', '#c7ffc8', '#b9ffba') y terminal.ansiBrightGreen
  greenAccent: "#b9ffba",  // green-accent - Strings, unquoted labels, git untracked y terminal.ansiGreen

  // === UI Accent & Surfaces ===
  uiAccent: "#8c8eff",     // ui-accent - Botones, focusBorder y activityBarBadge
  bgScrollbar: "#4e4b59",  // bg-scrollbar - SIN USOS como token: solo es la base de los sliders alfa literales #4e4b5980/a0/c0 (scrollbarSlider.*)

  // === Azules de Métodos ===
  blueMethod: "#82aaff",    // blue-method - Métodos JS/CS/Go, source.json values, decorators (azul de métodos) y terminal.ansiBlue
  operatorBlue: "#9abfff",  // operator-blue - keyword.operator (símbolos) y terminal.ansiBrightBlue. storage.modifier y cuantificadores regex usan blueSoft (variante más clara)
  blueSoft: "#a1caff",      // blue-soft - storage.modifier y keyword.operator.quantifier.regexp (variante clara del azul operador; antes literal)
  cyanTerminal: "#a4ffff",  // cyan-terminal - Token legacy: fue el cyan del terminal (ansiCyan/ansiBrightCyan) hasta 2026-10-19, cuando pasó a cyanAccent/cyanDim. Se conserva por su único uso actual: meta.disable-markdown punctuation

  // === Verdes Material / Naranjas / Terracota ===
  greenMaterial: "#c3e88d", // green-material - Git insertions, find-in-files filename y algunos strings (verde Material)
  orangeScarlet: "#f78c6c", // orange-scarlet - markup.underline y un source.json value (naranja cortical Material)
  terracotta: "#c17e70",    // terracotta - constant.numeric.line-number.find-in-files y un source.json value (marrón terracota)

  // === Alphas compartidos (MISMA opacidad repetida ≥2 usos con misma semántica) ===
  // Regla: un MISMO alpha repetido con la MISMA semántica SÍ es token. Cada opacidad
  // DISTINTA del mismo base sigue literal (cada mezcla es deliberada) y los alphas NO
  // se derivan de tokens base (el render depende del fondo). Coincidencias de valor
  // entre familias distintas se dejan literales para no acoplarlas (ver docs).
  uiAccentStrong: "#8c8effd2", // accent fuerte al 82% — selection, statusBarItem.remote, inputOption, botones, focus, badge, keybindings, settings
  accentSelection: "#8c8eff45", // familia selección — selectionBackground, selectionHighlightBackground, overviewRuler findMatch, minimap
  guideAccent: "#8c8eff73", // SIN USOS (0 referencias): tree indent guides y table column borders pasaron a guideMid. Mantener solo si se decide reactivar el guide en accent
  accentFaint: "#8c8eff2a", // fondos tenues — wordHighlight(Strong)Background, bracketMatch.background
  controlBorder: "#8c8eff33", // overviewRuler rangeHighlightForeground (base variants), textPreformat y HC literal
  searchBackground: "#5f569580", // búsqueda/hover — hoverHighlight, findMatchBackground
  searchMatch: "#c792ea35", // search-match wash - Zed lo usa en 35 (en Darker baja a #c792ea30; 40 era mucho); VS Code sigue en su par #c792ea30/#c792ea20 hasta que se decida el valor final
  scrollbarTrack: "#24212eea", // track del scrollbar — 1 uso: scrollbar.shadow (token de infraestructura tras el fondo transparente, como bgScrollbar)
  matchBorder: "#a599efff", // bordes de match — bracketMatch.border, findMatch.border
  hoverSurface: "#2e2a3a80", // superficies hover — toolbar.hoverBackground, list.hoverBackground
  highlightBorder: "#8c8eff5e", // borde de highlights (wordHighlight/selectionHighlight/wordHighlightStrong borders)
};

// ==========================================
// EXPORTACIÓN DEL THEME FINAL
// ==========================================
module.exports = {
  "name": "Maxiano Dark",
  "colors": {
    // ── Editor ───────────────────────────────────────────────────────────────────────
    "editor.background": palette.bgBase,
    "editorCursor.foreground": palette.yellowVibrant,
    "editor.lineHighlightBackground": palette.bgElevated,
    "editor.lineHighlightBorder": palette.bgElevated,
    // Guías de indentación: base #46425470 y activa #625e74c1 (literales con alpha;
    // Darker fija los suyos en build.js porque necesita más opacidad)
    "editorIndentGuide.background1": "#46425470",
    "editorIndentGuide.activeBackground1": "#625e74c1",
    "editor.selectionBackground": palette.accentSelection,
    "selection.background": palette.uiAccentStrong,
    // Highlights de selección/palabras: alpha sobre el accent para distinguirlos del selection real (#8c8eff45) y de brackets/tags (#8c8eff2a); Darker sube los fdos a #8c8eff30 (build.js)
    "editor.selectionHighlightBackground": palette.accentSelection,
    "editor.selectionHighlightBorder": palette.highlightBorder,
    "editor.wordHighlightBackground": palette.accentFaint,
    "editor.wordHighlightBorder": palette.highlightBorder,
    "editor.wordHighlightStrongBackground": palette.accentFaint,
    "editor.wordHighlightStrongBorder": palette.highlightBorder,
    "editorBracketMatch.background": palette.accentFaint,
    "editorBracketMatch.border": palette.matchBorder,
    // Bracket Pair Colorization (nativa de VS Code): 3 niveles de color propios + transparentes
    // del nivel 4 en adelante. Los niveles 4-6 quedan #00000000 para no saturar (los guides siguen
    // visibles); el fallback TextMate meta.brace (amarillo del nivel 1) solo aplica donde no hay
    // bracket colorization (p.ej. capturas con CodeSnap).
    "editorBracketHighlight.foreground1": palette.yellowVibrant,
    "editorBracketHighlight.foreground2": "#da70d6",
    "editorBracketHighlight.foreground3": "#47b2ff",
    "editorBracketHighlight.foreground4": "#00000000",
    "editorBracketHighlight.foreground5": "#00000000",
    "editorBracketHighlight.foreground6": "#00000000",
    "editor.hoverHighlightBackground": palette.searchBackground,
    "editor.rangeHighlightBackground": palette.hoverSurface,
    // Transparente: la palabra matcheada se distingue por su borde (#a599efff compartido),
    // no por rellenar el fondo. HC lo sube a fondo sólido vía build.js.
    "editor.findMatchBackground": "#00000000",
    "editor.findMatchBorder": palette.matchBorder,
    "editor.findMatchForeground": palette.fgWhite,
    "editor.findMatchHighlightBackground": "#c792ea30",
    "editor.findMatchHighlightBorder": "#c792ea30",
    "editor.findMatchHighlightForeground": palette.fgWhite,
    // Minimap / Overview Ruler: resaltados consistentes entre editores basados en VS Code (HC los sube a d2 vía build.js)
    "minimap.findMatchHighlight": "#8c8eff80",
    "editorOverviewRuler.findMatchForeground": palette.accentSelection,
    "editorOverviewRuler.rangeHighlightForeground": palette.controlBorder,
    "minimap.selectionHighlight": palette.accentSelection,
    "editorGroupHeader.tabsBackground": palette.bgDeep,
    // ── Editor Errors / Warnings (squiggly underline + gutter markers) ─────────────────
    "editorError.foreground": palette.errorFg,
    "editorWarning.foreground": palette.yellowBase,
    "editorHint.foreground": palette.purpleBright,

    // ── Activity Bar / Sidebar / Tree ─────────────────────────────────────────────────
    "activityBar.background": palette.bgDeep,
    "activityBar.foreground": palette.fgWhite,
    "sideBar.background": palette.bgBase,
    "sideBar.foreground": palette.fgWhite,
    "sideBar.border": palette.bgBase,
    "sideBarSectionHeader.background": palette.bgBase,
    "sideBarSectionHeader.foreground": palette.fgWhite,
    "sideBarSectionHeader.border": palette.bgBase,
    // Guías del árbol y bordes de tabla en guideMid: la guía activa del editor
    // comparte el mismo hex base con su propio alpha (#625e74c1), para que indent,
    // árbol y tablas se lean como una sola estructura. HC sube la guía activa y las
    // del árbol a fgBase y los bordes de tabla a uiAccentStrong; Darker los oscurece
    // vía darkerBackgrounds.
    "tree.indentGuidesStroke": palette.guideMid,
    "tree.tableColumnsBorder": palette.guideMid,
    "tree.tableOddRowsBackground": palette.bgElevated,

    // ── Tabs ──────────────────────────────────────────────────────────────────────────
    "tab.activeBackground": palette.bgElevated,
    "tab.activeForeground": palette.fgWhite,
    "tab.inactiveBackground": palette.bgBase,
    "tab.inactiveForeground": palette.uiInactive,
    "tab.hoverBackground": palette.bgElevated,
    "tab.hoverForeground": palette.fgWhite,

    // ── Panels / Panel Title ───────────────────────────────────────────────────────────
    "panel.background": palette.bgDeep,
    "panel.border": palette.bgElevated,
    "panelTitle.activeForeground": palette.fgWhite,
    "panelTitle.inactiveForeground": palette.uiInactive,

    // ── Git (decoraciones) ────────────────────────────────────────────────────────────
    "gitDecoration.modifiedResourceForeground": palette.cyanVibrant,
    "gitDecoration.deletedResourceForeground": palette.pinkTerminal,
    "gitDecoration.untrackedResourceForeground": palette.greenBase,
    "gitDecoration.ignoredResourceForeground": palette.pinkLight,
    "gitDecoration.conflictingResourceForeground": palette.orangeBase,

    // ── Editor Gutter (Git decorations) ───────────────────────────────────────────────
    "editorGutter.addedBackground": palette.greenBase,
    "editorGutter.modifiedBackground": palette.cyanVibrant,
    "editorGutter.deletedBackground": palette.pinkAccent,

    // ── Terminal (ANSI) ───────────────────────────────────────────────────────────────
    // Las 16 keys siguen el vocabulario de funky-theme-tui para que los agentes que caen a
    // los slots ANSI (git, fzf, prompts, CLIs sin truecolor) pinten el mismo color que el TUI.
    // El par normal/brillante queda del mismo valor que el TUI en cada familia; la inversión
    // de luminancia en red/green es deliberada (probada en vivo, no es un descuido).
    // black/brightBlack son literales propios (el TUI no tiene rol para ellos): antes ansiBlack
    // era el fondo del terminal, así que el texto "negro" salía invisible.
    "terminal.background": palette.bgDeep,
    "terminal.foreground": palette.textTui,
    "terminal.ansiBrightBlack": "#c2c2c2",
    "terminal.ansiBrightRed": palette.errorTui,
    "terminal.ansiBrightGreen": palette.greenBase,
    "terminal.ansiBrightYellow": palette.yellowLight,
    "terminal.ansiBrightBlue": palette.operatorBlue,
    "terminal.ansiBrightMagenta": palette.purpleBright,
    "terminal.ansiBrightCyan": palette.cyanDim,
    "terminal.ansiBrightWhite": palette.fgWhite,
    "terminal.ansiBlack": "#8e8e8e",
    "terminal.ansiRed": palette.errorFg,
    "terminal.ansiGreen": palette.greenAccent,
    "terminal.ansiYellow": palette.yellowBase,
    "terminal.ansiBlue": palette.blueMethod,
    "terminal.ansiMagenta": palette.pinkLight,
    "terminal.ansiCyan": palette.cyanAccent,
    "terminal.ansiWhite": palette.textTui,

    // ── Title Bar / Menubar ───────────────────────────────────────────────────────────
    "titleBar.activeBackground": palette.bgDeep,
    "titleBar.activeForeground": palette.fgWhite,
    "titleBar.inactiveBackground": "#211e2bd9",
    "titleBar.inactiveForeground": "#ffffff99",
    "menubar.selectionForeground": palette.fgWhite,
    "menubar.selectionBackground": palette.bgElevated,
    "toolbar.hoverBackground": palette.hoverSurface,

    // ── Status Bar ────────────────────────────────────────────────────────────────────
    "statusBar.background": palette.bgDeep,
    "statusBar.foreground": palette.fgWhite,
    "statusBar.border": palette.bgDeep,
    // Foco por teclado en la status bar — base se oscurece solo en Darker (bgDeep es token
    // del mapa darkerBackgrounds); HC lo sube a uiAccentStrong vía build.js.
    "statusBar.focusBorder": palette.bgDeep,
    "statusBar.noFolderBackground": palette.bgDeep,
    "statusBar.debuggingBackground": palette.redBase,
    "statusBar.debuggingForeground": palette.fgWhite,
    "statusBarItem.prominentBackground": palette.bgDeep,
    "statusBarItem.prominentHoverBackground": palette.bgElevated,
    "statusBarItem.hoverBackground": palette.bgElevated,
    "statusBarItem.activeBackground": "#8c8eff5e",
    "statusBarItem.remoteBackground": palette.uiAccentStrong,
    "statusBarItem.remoteForeground": palette.fgWhite,
    "statusBarItem.warningBackground": palette.bgDeep,
    "statusBarItem.warningHoverBackground": palette.bgElevated,
    "statusBarItem.errorBackground": palette.bgDeep,
    "statusBarItem.errorHoverBackground": palette.bgElevated,
    "statusBarItem.compactHoverBackground": "#363143",

    // ── Widgets / Find ─────────────────────────────────────────────────────────────────
    "editorWidget.background": palette.bgBase,
    "editorWidget.border": palette.bgBase,
    "editorSuggestWidget.selectedIconForeground": palette.pinkLight,
    "widget.shadow": "#00000000",
    "widget.border": palette.bgElevated,
    "editorFindWidget.background": palette.bgBase,
    "editorFindWidget.foreground": palette.fgWhite,
    "editorFindWidget.border": palette.bgDeep,

    // ── PeekView ──────────────────────────────────────────────────────────────────────
    "peekView.border": palette.bgDeep,
    "peekViewEditor.background": palette.bgDeep,
    "peekViewEditor.matchHighlightBackground": palette.searchBackground,
    "peekViewResult.background": palette.bgDeep,
    "peekViewResult.fileForeground": palette.fgWhite,
    "peekViewResult.lineForeground": palette.fgWhite,
    "peekViewResult.matchHighlightBackground": palette.searchBackground,
    "peekViewResult.selectionBackground": "#2e3250",
    "peekViewResult.selectionForeground": palette.fgWhite,
    "peekViewTitle.background": palette.bgDeep,
    "peekViewTitleDescription.foreground": "#ffffff90",
    "peekViewTitleLabel.foreground": palette.fgWhite,

    // ── Notifications ──────────────────────────────────────────────────────────────────
    "notifications.border": palette.bgBase,
    "notifications.background": palette.bgBase,
    "notificationCenterHeader.background": palette.bgDeep,
    "notificationCenterHeader.foreground": palette.fgWhite,

    // ── Inputs ────────────────────────────────────────────────────────────────────────
    "input.background": palette.bgElevated,
    "input.foreground": palette.fgWhite,
    "input.border": palette.bgElevated,
    "inputOption.activeBorder": palette.uiAccentStrong,
    "inputValidation.infoBackground": palette.uiAccentStrong,
    "inputValidation.infoBorder": palette.uiAccentStrong,

    // ── Checkbox / Dropdown ───────────────────────────────────────────────────────────
    "checkbox.background": palette.bgElevated,
    "checkbox.foreground": palette.fgWhite,
    "checkbox.border": palette.bgElevated,
    "dropdown.background": palette.bgElevated,
    "dropdown.foreground": palette.fgWhite,
    "dropdown.listBackground": palette.bgElevated,
    "dropdown.border": palette.bgElevated,

    // ── Menús y Listas ─────────────────────────────────────────────────────────────────
    "menu.background": palette.bgBase,
    "menu.foreground": palette.fgWhite,
    "menu.selectionForeground": palette.fgWhite,
    "menu.separatorBackground": "#444156", // separador de menús — gris propio (Darker lo oscurece via build.js; HC lo conserva en accent)
    "list.activeSelectionBackground": "#8c8eff1e",
    "list.activeSelectionForeground": palette.fgWhite,
    "list.hoverBackground": palette.hoverSurface,
    "list.inactiveSelectionBackground": palette.bgElevated,
    "list.inactiveSelectionForeground": palette.fgWhite,
    "list.warningForeground": palette.yellowBase,
    "list.errorForeground": palette.errorFg,
    "list.highlightForeground": palette.pinkLight,
    "pickerGroup.foreground": palette.linkPurple,

    // ── Scrollbar ─────────────────────────────────────────────────────────────────────
    "scrollbar.background": "#00000000",
    "scrollbar.shadow": palette.scrollbarTrack,
    "scrollbarSlider.background": "#4e4b5980",
    "scrollbarSlider.hoverBackground": "#4e4b59a0",
    "scrollbarSlider.activeBackground": "#4e4b59c0",

    // ── Diff Editor ───────────────────────────────────────────────────────────────────
    // Opacidades reducidas para evitar stacking en diffs inline de Antigravity AI.
    // Valores previos: inserted 46/8e, removed 49/52.
    "diffEditor.insertedLineBackground": "#8c8eff25",
    "diffEditor.removedLineBackground": "#ff000025",
    "diffEditor.insertedTextBackground": "#8c8eff40",
    "diffEditor.removedTextBackground": "#ff000040",

    // ── Botones / Focus / Badges ──────────────────────────────────────────────────────
    "button.background": palette.uiAccentStrong,
    "button.foreground": palette.fgWhite,
    "button.hoverBackground": "#8c8effb6",
    "button.secondaryBackground": "#313244",
    "button.secondaryForeground": palette.fgWhite,
    "button.secondaryHoverBackground": "#3f3c4f",
    "focusBorder": palette.uiAccentStrong,
    "activityBarBadge.background": palette.uiAccentStrong,
    "badge.background": palette.uiAccentStrong,
    "badge.foreground": palette.fgWhite,

    // ── Links ─────────────────────────────────────────────────────────────────────────
    "textLink.foreground": palette.linkPurple,
    "textLink.activeForeground": palette.uiAccent,
    // Link activo del editor (cmd+click): cyan compartido en todas las variantes, incluido HC
    "editorLink.activeForeground": palette.cyanAccent,

    // ── Markdown Preview (Blockquotes / Preformatted) ─────────────────────────────────
    // textPreformat: compartido; High Contrast maneja los suyos (build.js los sobreescribe)
    "textBlockQuote.background": palette.bgBase,
    "textBlockQuote.border": palette.uiAccent,
    "textPreformat.background": "#8c8eff33",
    "textPreformat.foreground": "#cacbff",

    // ── Symbol Icons ──────────────────────────────────────────────────────────────────
    "symbolIcon.propertyForeground": palette.fgWhite,
    "symbolIcon.classForeground": palette.fgWhite,
    "symbolIcon.functionForeground": palette.fgWhite,
    "symbolIcon.methodForeground": palette.fgWhite,
    "symbolIcon.variableForeground": palette.fgWhite,
    "symbolIcon.typeParameterForeground": palette.fgWhite,
    "symbolIcon.snippetForeground": palette.fgWhite,
    "symbolIcon.eventForeground": palette.fgWhite,
    "symbolIcon.fieldForeground": palette.fgWhite,
    "symbolIcon.keywordForeground": palette.fgWhite,
    "symbolIcon.valueForeground": palette.fgWhite,
    "symbolIcon.constantForeground": palette.fgWhite,
    "symbolIcon.interfaceForeground": palette.fgWhite,

    // ── Extension Marketplace ──────────────────────────────────────────────────────────
    // Estrella de valoración de extensiones — compartido en todas las variantes
    "extensionIcon.starForeground": palette.yellowVibrant,

    // ── Keybinding Labels ─────────────────────────────────────────────────────────────
    "keybindingLabel.background": "#1e1a29",
    "keybindingLabel.foreground": palette.fgWhite,
    "keybindingLabel.border": palette.uiAccentStrong,
    "keybindingLabel.bottomBorder": palette.uiAccentStrong,

    // ── Settings Editor ────────────────────────────────────────────────────────────────
    // Indicador de configuración modificada (punto junto al setting). Alpha literal:
    // es una mezcla de opacidad sobre el fondo, no un color puro de paleta.
    "settings.modifiedItemIndicator": palette.uiAccentStrong,

    // ── Sticky Scroll ─────────────────────────────────────────────────────────────────
    "editorStickyScroll.background": palette.bgDeep,
    "editorStickyScrollHover.background": palette.bgElevated,
    // Terminal sticky: background elevado (#201d2a en Darker vía build ultra-nocturno)
    "terminalStickyScrollHover.background": palette.bgElevated,

    // ── Editor Line Numbers ───────────────────────────────────────────────────────────
    "editorLineNumber.foreground": "#707381",
    "editorLineNumber.activeForeground": palette.purpleDim,
  },
  "tokenColors": [
    // ── Comentarios ────────────────────────────────────────────────────────────────────
    // Comentarios apagados: alfa f1 para que no resalten pero sigan siendo legibles
    {
      "scope": "comment, punctuation.definition.comment",
      "settings": {
        "foreground": "#d8d8d8f1",
        "fontStyle": ""
      }
    },

    // ── Variables y constantes ─────────────────────────────────────────────────────────
    {
      "scope": "variable",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    {
      "scope": "string constant.other.placeholder",
      "settings": {
        "foreground": palette.blueSoft
      }
    },
    // constant.other.color NO está aquí: la lista de L404 (cyanDim) gana por orden de aparición
    // a igual especificidad, y es el comportamiento que se ve reflejado (no reportado como bug).
    {
      "scope": "support.other.variable, string.other.link",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "meta.property-name, variable.object.property",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "meta.object-literal.key",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "variable.language",
      "settings": {
        "foreground": palette.purpleBright
      }
    },
    {
      "scope": "source.js constant.other.object.key.js string.unquoted.label.js",
      "settings": {
        "foreground": palette.redBase
      }
    },
    // variable.other.readwrite.alias.js — foreground compartido; el italic lo pone build.js (bloque expressive y bloque mix)
    {
      "scope": "variable.other.readwrite.alias.js",
      "settings": {
        "foreground": palette.fgWhite,
        "fontStyle": ""
      }
    },

    // ── Keywords / control / imports ───────────────────────────────────────────────────
    {
      "scope": "keyword",
      "settings": {
        "foreground": palette.purpleDim
      }
    },
    {
      // keyword.type / keyword.other.type son scopes TextMate GENÉRICOS, no exclusivos de C#:
      // la gramática oficial de C# emite keyword.type.$1.cs para sus primitivos (int, string,
      // bool, void…), así que el paraguas los cubre todos a la vez. Tipos = púrpura en toda
      // gramática que emita keyword.type.* (p.ej. typeof en TS, type en Rust).
      "scope": "storage.type, keyword.type, keyword.other.type",
      "settings": {
        "foreground": palette.purpleDim
      }
    },
    {
      "scope": "storage.modifier",
      "settings": {
        // Variante ligeramente más clara del azul de operadores (#9abfff -> #a1caff),
        // comparte palette.blueSoft con los cuantificadores de regex.
        "foreground": palette.blueSoft
      }
    },
    {
      "scope": "constant.other.color, punctuation, punctuation.separator.inheritance.php, punctuation.section.embedded, keyword.other.template, keyword.other.substitution",
      "settings": {
        "foreground": palette.cyanDim
      }
    },
    {
      // Fallback de brackets para renderers sin Bracket Pair Colorization (p.ej. capturas con
      // CodeSnap): pinta los braces TextMate con el amarillo del nivel 1 (yellowVibrant). En el
      // editor real VS Code usa editorBracketHighlight.* (nativa) y esta regla casi no se ve —
      // salvo si se desactiva.
      "scope": "meta.brace",
      "settings": {
        "foreground": palette.yellowVibrant
      }
    },
    {
      "scope": "keyword.operator",
      "settings": {
        "foreground": palette.operatorBlue
      }
    },
    // Creatión (new): naranja. Los scopes de "new" varían por lenguaje — C# usa
    // keyword.operator.expression.new (prefijo distinto, confirmado en testeo 2026-09-12),
    // PHP keyword.other.new (keyword.other.new.php) y Java keyword.control.new.java.
    // Go usa new() como builtin → cyan (soporte).
    // Si otro lenguaje tiene su propio scope, agregarlo aquí (mismo criterio: prefijo del stack).
    {
      "scope": "keyword.operator.new, keyword.operator.new.tsx, keyword.operator.expression.new, keyword.other.new, keyword.control.new.java",
      "settings": {
        "foreground": palette.orangeAccent
      }
    },
    {
      "scope": "entity.name.module.js, variable.import.parameter.js, variable.other.class.js",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "keyword.control.import, keyword.control.from, keyword.control.export",
      "settings": {

      }
    },
    // Estrategia cromática: flujo (if/for/while/return/import…) en morado claro,
    // separado de la declaración (storage.* en morado base) — ver docs/how-to-modify-theme.md
    {
      "scope": "keyword.control",
      "settings": {
        "foreground": palette.purpleBright
      }
    },
    {
      "scope": "source.sass keyword.control",
      "settings": {
        "foreground": palette.purpleBright
      }
    },
    // Candidato genérico keyword.other (extends, mod/pub, auxiliares) →
    // coral suave. Los sub-scopes específicos (new/template/special-method/unit y la
    // parte superior import/use/namespace/…) ganan por especificidad y mantienen sus colores.
    {
      "scope": "keyword.other",
      "settings": {
        "foreground": palette.orangeSoft
      }
    },
    // Excepción al mapa cromático: CSS `!important` no es un keyword.other auxiliar.
    // Rompe la cascada de forma explícita, así que tiene semántica propia (alerta, no
    // estructura) y sale de la familia naranja, donde se confundía con los attribute names
    // vecinos (orangeBase). El prefijo cubre css/scss/less/sass/stylus. `!default` de SCSS
    // se queda en coral: escribe un valor por defecto de módulo, no rompe ninguna cascada.
    {
      "scope": "keyword.other.important",
      "settings": {
        "foreground": palette.redSoft
      }
    },
    // Parte superior del archivo (imports, namespaces): los sub-scopes estructurales de
    // keyword.other van en cyan (mismo tinte que funciones) — combinan con la paleta de
    // morados del tema; el keyword.other genérico auxiliar se queda en coral.
    // directive (C/C++ #define/typedef), using (C#), use (Rust) → imports (import) e
    // include (PHP/C++): la parte superior estructural comparte cyan.
    {
      "scope": "keyword.other.import, keyword.other.directive, keyword.other.using, keyword.other.use, keyword.other.namespace, keyword.other.package, keyword.other.include, keyword.other.require, keyword.other.module",
      "settings": {
        "foreground": palette.cyanAccent
      }
    },

    // ── Funciones y métodos ────────────────────────────────────────────────────────────
    {
      "scope": "entity.name.function, variable.function, support.function, keyword.other.special-method, meta.block-level",
      "settings": {
        "foreground": palette.cyanAccent
      }
    },
    // Definición de función (no llamada): el bold de Mix marca dónde se define algo.
    // Definición y llamada comparten cyanAccent, el bold separa ambas sin tocar la paleta.
    {
      "scope": "meta.function entity.name.function",
      "settings": {
        "foreground": palette.cyanAccent
      }
    },
    {
      "scope": "entity.name.method.js",
      "settings": {
        "foreground": palette.blueMethod
      }
    },
    {
      "scope": "meta.class-method.js entity.name.function.js, variable.function.constructor",
      "settings": {
        "foreground": palette.blueMethod
      }
    },

    // ── Classes / tipos / soporte ──────────────────────────────────────────────────────
    // support.class (clases externas/builtin: Exception, DateTime en PHP; React en TSX):
    // EXCEPCIÓN deliberada — se queda en morado claro #eaa9fc como referencia activa
    // (viene de afuera, no se define aquí). Casi no aparece (solo PHP y a veces JSX/TSX),
    // aprueba visualmente; NO moverlo a la familia de tipos (se confundiría con el código propio).
    {
      "scope": "support.class",
      "settings": {
        "foreground": palette.purpleBright
      }
    },
    {
      // Podado en auditoría: se fueron entity.name.class (gana L513 fgWhite),
      // markup.changed.git_gutter (gana orangeBase en la sección git) y el typo
      // support.orther. Los scopes restantes son los que realmente matchean aquí.
      "scope": "entity.name.type.class, support.type, meta.use.php, support.other.namespace.php, support.type.sys-types",
      "settings": {
        "foreground": palette.yellowLight
      }
    },
    {
      "scope": "source.css support.type, source.sass support.type, source.scss support.type, source.less support.type, source.stylus support.type",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "entity.name.type",
      "settings": {
        "foreground": palette.yellowLight
      }
    },
    // entity.name.class
    {
      "scope": "entity.name.class",
      "settings": {
        "foreground": palette.fgWhite
      }
    },

    // ── Strings / regex / escapes ──────────────────────────────────────────────────────
    {
      "scope": "string, constant.other.symbol, constant.other.key, entity.other.inherited-class, markup.heading, markup.inserted.git_gutter, meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js",
      "settings": {
        "foreground": palette.greenAccent
      }
    },
    {
      "scope": "string.regexp",
      "settings": {
        "foreground": palette.greenAccent
      }
    },
    {
      "scope": "keyword.operator.quantifier.regexp",
      "settings": {
        "foreground": palette.blueSoft
      }
    },
    {
      "scope": "constant.character.escape",
      "settings": {
        "foreground": palette.cyanAccent
      }
    },

    // ── Números y constantes numéricas / parámetros ────────────────────────────────────
    {
      "scope": "constant.numeric, constant.language, support.constant, constant.character, keyword.other.unit",
      "settings": {
        "foreground": palette.pinkLight
      }
    },
    {
      "scope": "variable.parameter, entity.name.variable.parameter, meta.record.identifier",
      "settings": {
        "foreground": palette.pinkLight
      }
    },

    // ── Atributos (HTML/JSX/CSS) ───────────────────────────────────────────────────────
    {
      "scope": "entity.other.attribute-name.class.css",
      "settings": {
        "foreground": palette.yellowLight
      }
    },
    {
      "scope": "entity.other.attribute-name",
      "settings": {
        "foreground": palette.yellowLight
      }
    },

    // ── Tags / meta (HTML/XML) ─────────────────────────────────────────────────────────
    {
      "scope": "entity.name.tag, meta.tag.sgml, markup.deleted.git_gutter",
      "settings": {
        "foreground": palette.pinkAccent
      }
    },
    {
      "scope": "meta.tag",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "text.html, meta.tag.inline.any.html, source, text.xml",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    {
      "scope": "punctuation.definition.tag",
      "settings": {
        "foreground": palette.fgWhite
      }
    },

    // ── JSON (dictionary keys/values) ─────────────────────────────────────────────────
    // Nombres de propiedad JSON: amarillo fuerte (aprobado en testeo directo al JSON)
    {
      "scope": "support.type.property-name.json",
      "settings": {
        "foreground": palette.yellowBase
      }
    },

    // ── Markdown ───────────────────────────────────────────────────────────────────────
    {
      "scope": "text.html.markdown, punctuation.definition.list_item.markdown",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    {
      "scope": "punctuation.definition.constant.markdown",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    // ── Markdown: Headings ──
    {
      "scope": "markup.heading.markdown, entity.name.section.markdown, markdown.heading, markup.heading, markup.heading entity.name",
      "settings": {
        "foreground": palette.pinkVibrant,
        "fontStyle": "bold"
      }
    },
    {
      "scope": "markup.heading.markdown punctuation.definition.heading.markdown",
      "settings": {
        "foreground": palette.pinkVibrant,
        "fontStyle": "bold"
      }
    },
    // ── Markdown: Bold & Italic ──
    {
      "scope": "markup.bold.markdown, markup.bold, markup.bold string",
      "settings": {
        "foreground": palette.cyanVibrant,
        "fontStyle": "bold"
      }
    },
    {
      "scope": "punctuation.definition.bold.markdown",
      "settings": {
        "foreground": palette.cyanVibrant,
        "fontStyle": "bold"
      }
    },
    {
      "scope": "markup.italic.markdown, markup.italic",
      "settings": {
        "foreground": palette.cyanVibrant,
        "fontStyle": "italic"
      }
    },
    {
      "scope": "punctuation.definition.italic.markdown",
      "settings": {
        "foreground": palette.cyanVibrant,
        "fontStyle": "italic"
      }
    },
    // ── Markdown: Inline code ──
    {
      "scope": "markup.inline.raw.string.markdown, text.html.markdown markup.raw.inline",
      "settings": {
        "foreground": palette.greenAccent,
        "fontStyle": "italic"
      }
    },
    {
      "scope": "text.html.markdown punctuation.definition.raw.markdown",
      "settings": {
        "foreground": palette.greenAccent
      }
    },
    // ── Markdown: Links ──
    {
      "scope": "meta.link.inline.markdown, meta.link.inline.markdown punctuation.definition.link.title.end.markdown, meta.link.inline.markdown punctuation.definition.metadata.markdown, punctuation.definition.link.title.begin.markdown, punctuation.definition.link.title.end.markdown, punctuation.definition.metadata.markdown",
      "settings": {
        "foreground": palette.cyanVibrant
      }
    },
    {
      "scope": "string.other.link.title.markdown",
      "settings": {
        "foreground": palette.yellowBase
      }
    },
    {
      "scope": "markup.underline.link.markdown, markup.underline.link",
      "settings": {
        "foreground": palette.greenAccent,
        "fontStyle": "italic"
      }
    },
    {
      "scope": "string.other.link.description.title.markdown",
      "settings": {
        "foreground": palette.yellowBase
      }
    },
    {
      "scope": "constant.other.reference.link.markdown",
      "settings": {
        "foreground": palette.orangeAccent
      }
    },
    // ── Markdown: Blockquotes ──
    {
      "scope": "markup.quote.markdown, punctuation.definition.quote.begin.markdown, markup.quote",
      "settings": {
        "foreground": palette.greenAccent
      }
    },
    {
      "scope": "markup.quote punctuation.definition.blockquote.markdown",
      "settings": {
        "foreground": palette.greenAccent
      }
    },
    // ── Markdown: Lists ──
    {
      "scope": "beginning.punctuation.definition.list, punctuation.definition.list.begin.markdown",
      "settings": {
        "foreground": palette.yellowBase
      }
    },
    {
      "scope": "markup.list.numbered.markdown, markup.list.unnumbered.markdown",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    // ── Markdown: Code blocks (fenced) ──
    {
      "scope": "markup.raw.block",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    {
      "scope": "markup.raw.block.fenced.markdown, markup.fenced_code.block.markdown, markup.raw.block.markdown, punctuation.section.class.end",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    {
      "scope": "variable.language.fenced.markdown",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    {
      "scope": "markup.fenced_code.block.markdown punctuation.definition.markdown, markup.fenced_code.block.markdown punctuation, punctuation.definition.fenced.markdown, markup.raw.block.fenced.markdown punctuation",
      "settings": {
        "foreground": palette.greyLight
      }
    },
    // ── Markdown: Underline / misc ──
    {
      "scope": "markup.underline",
      "settings": {
        "foreground": palette.orangeScarlet
      }
    },
    // ── Markdown: Punctuation & separators ──
    {
      "scope": "text.html.markdown punctuation.definition",
      "settings": {
        "foreground": palette.purpleGrey
      }
    },
    {
      "scope": "text.html.markdown meta.disable-markdown punctuation.definition",
      "settings": {
        "foreground": palette.cyanTerminal
      }
    },
    {
      "scope": "meta.separator, meta.separator.markdown",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    // ── Markdown: Tables ──
    {
      "scope": "markup.table",
      "settings": {
        "foreground": palette.fgBase
      }
    },

    // ── Git gutter / diff markers ──────────────────────────────────────────────────────
    {
      "scope": "markup.inserted",
      "settings": {
        "foreground": palette.greenMaterial
      }
    },
    {
      "scope": "markup.deleted",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "markup.changed",
      "settings": {
        "foreground": palette.purpleDim
      }
    },
    {
      "scope": "markup.ignored.git_gutter",
      "settings": {
        "foreground": palette.uiMuted
      }
    },
    {
      "scope": "markup.untracked.git_gutter",
      "settings": {
        "foreground": palette.uiMuted
      }
    },
    {
      "scope": "markup.inserted.git_gutter",
      "settings": {
        "foreground": palette.greenMaterial
      }
    },
    {
      "scope": "markup.changed.git_gutter",
      "settings": {
        "foreground": palette.orangeBase
      }
    },
    {
      "scope": "markup.deleted.git_gutter",
      "settings": {
        "foreground": palette.redBase
      }
    },

    // ── Llamadas de función según gramática (p. ej. Python/C#) ─────────────────────────
    // Contenedor de llamada: pinkAccent como base (rosa propio, distinto del pinkLight
    // de params) para que las llamadas no se confundan con los parámetros en lenguajes
    // llenos de funciones; las gramáticas que emiten meta.function-call.generic
    // (p. ej. Python) ganan cyan por especificidad.
    {
      "scope": "meta.function-call",
      "settings": {
        "foreground": palette.pinkAccent
      }
    },
    {
      "scope": "meta.function-call.generic",
      "settings": {
        "foreground": palette.cyanAccent
      }
    },

    // ── Utilidades / extensiones (acejump, sublimelinter, brackets) ────────────────────
    {
      "scope": "invalid, invalid.illegal, invalid.broken",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "invalid.unimplemented",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "invalid.deprecated",
      "settings": {
        "foreground": palette.orangeAccent
      }
    },
    // find-in-files
    {
      "scope": "constant.numeric.line-number.find-in-files - match",
      "settings": {
        "foreground": palette.terracotta
      }
    },
    {
      "scope": "entity.name.filename.find-in-files",
      "settings": {
        "foreground": palette.greenMaterial
      }
    },
    {
      "scope": "acejump.label.blue",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "acejump.label.green",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "acejump.label.orange",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "acejump.label.purple",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "sublimelinter.mark.warning",
      "settings": {
        "foreground": palette.orangeBase
      }
    },
    {
      "scope": "sublimelinter.gutter-mark",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "sublimelinter.mark.error",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "brackethighlighter.default",
      "settings": {
        "foreground": "#b2ccd6"
      }
    },
    {
      "scope": "brackethighlighter.quote",
      "settings": {
        "foreground": palette.greenMaterial
      }
    },
    {
      "scope": "brackethighlighter.unmatched",
      "settings": {
        "foreground": palette.redBase
      }
    }
  ],
  "type": "dark",
  palette
};
