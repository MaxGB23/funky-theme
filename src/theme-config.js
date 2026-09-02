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
  fgWhite: "#ffffff",      // fg-white - Blanco puro para meta tags, clases y html tags
  fgMuted: "#d8d8d8",      // fg-muted - Comentarios en el nuevo estilo sin cursiva

  // === Grises de UI e Invisibles ===
  comments: "#555555",     // comment (Reemplaza a '#666666') - Exclusivo para código comentado en cursiva
  uiMuted: "#606685",      // ui-muted (Reemplaza a '#5a657c','#65737e','#546e7a') - Bordes, guías y tokens secundarios
  greyLight: "#cbcbcb",    // grey-light - Delimitadores de code blocks de Markdown
  purpleGrey: "#a9b1de",   // purple-grey - Puntuación y meta de Markdown

  // === Colores de Sintaxis (Accents Tiered Palette) ===

  // Cyans (Attributes, Numbers)
  cyanDim: "#80ecff",      // cyan-dim (Reemplaza a '#8ceaff') - Tokens numéricos o attributes secundarios
  cyanBase: "#8be9fd",     // cyan-base (Reemplaza a '#96e7ff', '#89ddff') - Atributos de React, props, variables
  cyanAccent: "#96e7ff",   // cyan-accent - Functions, git modified, regex, escapes
  cyanVibrant: "#6df5fa",  // cyan-vibrant - Markdown bold, italic e interfaces

  // Rojos (Errors, Tags de cierre, Variables mutadas)
  redBase: "#ff5555",      // red-base (Reemplaza a '#ff6e6e', '#f07178', '#ff5370')

  // Rosas (Keywords, Control Flow, Parameters)
  pinkBase: "#ff8bee",     // pink-base (Reemplaza la masacre de 5 rosas: '#ffacf5', '#feb3e8', '#ffa6f9', '#ff92df', '#ff78f8')
  pinkLight: "#ffa8e6",    // pink-light - Git ignored, constantes numéricas y parámetros
  pinkAccent: "#ff87c5",   // pink-accent - Tags HTML/SGM y git deleted markers
  pinkVibrant: "#ff8ddb",  // pink-vibrant - Headings de Markdown
  pinkTerminal: "#ff55a4", // pink-terminal - ANSI red/bright-red de terminal y git deleted (unifica el rojo de estado)

  // Morados (Operators, Imports/Exports, Support Classes)
  purpleDim: "#c792ea",    // purple-dim (Reemplaza a '#d6acff') - Operadores matemáticos o lógicos
  purpleBase: "#bd93f9",   // purple-base (Reemplaza a '#cca2e8') - Keywords de importación y exportación
  purpleBright: "#eaa9fc", // purple-bright - Clases de soporte (support.class)

  // Naranjas & Amarillos (Strings, Functions, Warnings)
  orangeBase: "#ffb86c",   // orange-base (Reemplaza a '#ffcb6b') - Usado para strings y warnings moderados
  orangeAccent: "#ffcb7d", // orange-accent - keyword.operator.new.tsx
  yellowBase: "#f6ff98",   // yellow-base (Reemplaza a '#ffffa5', '#ffffa3') - Nombres de funciones (Methods)
  yellowLight: "#fff9ba",  // yellow-light - Entity types y attribute names

  // Verdes (Classes, RegEx, Strings exitosos)
  greenBase: "#8bffa8",    // green-base (Reemplaza a '#8affc4', '#c7ffc8', '#b9ffba')
  greenAccent: "#b9ffba",  // green-accent - Strings, unquoted labels y git untracked

  // === UI Accent & Surfaces ===
  uiAccent: "#8c8eff",     // ui-accent - Botones, focusBorder y activityBarBadge
  bgScrollbar: "#4e4b59",  // bg-scrollbar - Slider del scrollbar (rest/hover/active)
};

// ==========================================
// EXPORTACIÓN DEL THEME FINAL
// ==========================================
module.exports = {
  "name": "Maxiano Dark",
  "colors": {
    "sideBar.background": "#24212ed3",
    "sideBar.foreground": "#FFFFFF",
    "editor.background": palette.bgBase,
    "editorCursor.foreground": "#ffde25",
    "editor.lineHighlightBackground": palette.bgElevated,
    "editor.lineHighlightBorder": palette.bgElevated,
    "editor.selectionBackground": palette.uiAccent + "40",
    "editor.findMatchBackground": "#5f569580",
    "editor.findMatchBorder": "#a599efff",
    "editor.findMatchForeground": "#ffffff",
    "editor.findMatchHighlightBackground": "#5f569580",
    "editor.findMatchHighlightForeground": "#ffffff",
    "activityBar.background": palette.bgDeep,
    "activityBar.foreground": "#ffffff",
    "sideBar.border": palette.bgBase,
    "tree.indentGuidesStroke": palette.comments,
    "tree.tableColumnsBorder": palette.comments,
    "tree.tableOddRowsBackground": palette.bgElevated,
    "tab.activeBackground": palette.bgElevated,
    "tab.activeForeground": "#ffffff",
    "tab.inactiveBackground": palette.bgBase,
    "tab.inactiveForeground": "#B0B0B0",
    "tab.hoverBackground": palette.bgElevated,
    "tab.hoverForeground": "#FFFFFF",
    "gitDecoration.modifiedResourceForeground": palette.cyanVibrant,
    "gitDecoration.deletedResourceForeground": palette.pinkTerminal,
    "gitDecoration.untrackedResourceForeground": palette.greenBase,
    "gitDecoration.ignoredResourceForeground": palette.pinkLight,
    "gitDecoration.conflictingResourceForeground": palette.orangeBase,
    "terminal.background": palette.bgDeep,
    "terminal.foreground": palette.fgBase,
    "terminal.ansiBrightBlack": "#6272A4",
    "terminal.ansiBrightRed": palette.pinkAccent,
    "terminal.ansiBrightGreen": palette.pinkLight,
    "terminal.ansiBrightYellow": palette.yellowBase,
    "terminal.ansiBrightBlue": palette.purpleDim,
    "terminal.ansiBrightMagenta": palette.pinkLight,
    "terminal.ansiBrightCyan": "#A4FFFF",
    "terminal.ansiBrightWhite": "#FFFFFF",
    "terminal.ansiBlack": palette.bgDeep,
    "terminal.ansiRed": palette.pinkAccent,
    "terminal.ansiGreen": palette.greenAccent,
    "terminal.ansiYellow": palette.yellowBase,
    "terminal.ansiBlue": palette.purpleBase,
    "terminal.ansiMagenta": palette.pinkLight,
    "terminal.ansiCyan": "#A4FFFF",
    "terminal.ansiWhite": palette.fgBase,
    "titleBar.activeBackground": palette.bgDeep,
    "titleBar.activeForeground": palette.fgWhite,
    "titleBar.inactiveBackground": palette.bgDeep + "d9",
    "titleBar.inactiveForeground": palette.fgWhite + "99",
    "menubar.selectionForeground": palette.fgWhite,
    "menubar.selectionBackground": palette.bgElevated,
    "statusBar.background": palette.bgBase,
    "statusBar.foreground": palette.fgWhite,
    "statusBar.noFolderBackground": palette.bgDeep,
    "statusBar.debuggingBackground": palette.redBase,
    "statusBarItem.hoverBackground": palette.fgWhite + "33",
    "statusBarItem.activeBackground": palette.fgWhite + "80",
    "editorGroupHeader.tabsBackground": palette.bgDeep,

    // ── Widgets / Find ────────────────────────────────────────────────────────
    "editorWidget.background": palette.bgBase,
    "editorWidget.border": palette.bgDeep,
    "editorSuggestWidget.selectedIconForeground": palette.purpleDim,
    "widget.shadow": "#00000030",
    "editorFindWidget.background": palette.bgBase,
    "editorFindWidget.foreground": palette.fgWhite,
    "editorFindWidget.border": palette.bgDeep,

    // ── Inputs ────────────────────────────────────────────────────────────────
    "input.background": palette.bgDeep,
    "input.foreground": palette.fgWhite,
    "input.border": palette.comments,

    // ── Menús y Listas ────────────────────────────────────────────────────────
    "menu.background": palette.bgBase,
    "menu.foreground": palette.fgWhite,
    "menu.selectionForeground": palette.fgWhite,
    "menu.separatorBackground": palette.comments,
    "list.activeSelectionBackground": palette.uiAccent + "33",
    "list.activeSelectionForeground": palette.fgWhite,
    "list.hoverBackground": palette.bgElevated + "80",
    "list.inactiveSelectionBackground": palette.bgElevated,
    "list.inactiveSelectionForeground": palette.fgWhite,

    // ── Scrollbar ─────────────────────────────────────────────────────────────
    "scrollbar.background": palette.bgBase + "ea",
    "scrollbar.shadow": palette.bgBase + "ea",
    "scrollbarSlider.background": palette.bgScrollbar + "80",
    "scrollbarSlider.hoverBackground": palette.bgScrollbar + "a0",
    "scrollbarSlider.activeBackground": palette.bgScrollbar + "c0",

    // ── Diff Editor ───────────────────────────────────────────────────────────
    // Opacidades reducidas para evitar stacking en diffs inline de Antigravity AI.
    // Valores previos: inserted 46/8e, removed 49/52.
    "diffEditor.insertedLineBackground": palette.uiAccent + "25",
    "diffEditor.removedLineBackground": "#ff000025",
    "diffEditor.insertedTextBackground": palette.uiAccent + "40",
    "diffEditor.removedTextBackground": "#ff000040",

    // ── Botones / Focus / Badges ──────────────────────────────────────────────
    "button.background": palette.uiAccent + "d2",
    "button.foreground": palette.fgWhite,
    "button.hoverBackground": palette.uiAccent + "b6",
    "focusBorder": palette.uiAccent + "d2",
    "activityBarBadge.background": palette.uiAccent + "d2",

    // ── Sticky Scroll ─────────────────────────────────────────────────────────
    "editorStickyScroll.background": palette.bgDeep,
    "editorStickyScrollHover.background": palette.bgElevated,
    // Terminal sticky: background elevado (#201d2a en Darker vía build ultra-nocturno)
    "terminalStickyScrollHover.background": palette.bgElevated,
    "editorLineNumber.foreground": "#707381",
    "editorLineNumber.activeForeground": palette.purpleDim
  },
  "tokenColors": [
    {
      "scope": "comment, punctuation.definition.comment",
      "settings": {
        // Comentarios apagados: alfa e9 para que no resalten y no confundan con texto normal
        "foreground": "#d8d8d8e9",
        "fontStyle": ""
      }
    },
    {
      "scope": "variable, string constant.other.placeholder",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    {
      "scope": "constant.other.color",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
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
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "keyword, storage.type, storage.modifier",
      "settings": {
        "foreground": palette.purpleDim
      }
    },
    {
      "scope": "constant.other.color, punctuation, punctuation.definition.tag, punctuation.separator.inheritance.php, punctuation.section.embedded, keyword.other.template, keyword.other.substitution",
      "settings": {
        "foreground": palette.cyanDim
      }
    },
    {
      "scope": "keyword.operator",
      "settings": {
        "foreground": "#9abfff"
      }
    },
    {
      "scope": "keyword.operator.new.tsx",
      "settings": {
        "foreground": palette.orangeAccent
      }
    },
    {
      "scope": "entity.name.tag, meta.tag.sgml, markup.deleted.git_gutter",
      "settings": {
        "foreground": palette.pinkAccent
      }
    },
    {
      "scope": "support.class",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    {
      "scope": "meta.tag",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "entity.name.function, meta.function-call, variable.function, support.function, keyword.other.special-method, meta.block-level",
      "settings": {
        "foreground": palette.cyanAccent
      }
    },
    {
      "scope": "support.other.variable, string.other.link",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "constant.numeric, constant.language, support.constant, constant.character, variable.parameter, keyword.other.unit",
      "settings": {
        "foreground": palette.pinkLight
      }
    },
    {
      "scope": "string, constant.other.symbol, constant.other.key, entity.other.inherited-class, markup.heading, markup.inserted.git_gutter, meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js",
      "settings": {
        "foreground": palette.greenAccent
      }
    },
    {
      "scope": "entity.name.class, entity.name.type.class, support.type, support.orther.namespace.use.php, meta.use.php, support.other.namespace.php, markup.changed.git_gutter, support.type.sys-types",
      "settings": {
        "foreground": palette.yellowBase
      }
    },
    {
      "scope": "source.css support.type, source.sass support.type, source.scss support.type, source.less support.type, source.stylus support.type",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "entity.other.attribute-name.class.css",
      "settings": {
        "foreground": palette.yellowBase
      }
    },
    {
      "scope": "entity.name.module.js, variable.import.parameter.js, variable.other.class.js",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "meta.object-literal.key, meta.property-name, variable.object.property",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "support.class",
      "settings": {
        "foreground": palette.purpleBright
      }
    },
    {
      "scope": "entity.name.type",
      "settings": {
        "foreground": palette.yellowLight
      }
    },
    {
      "scope": "entity.name.class",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "keyword.control.import, keyword.control.from, storage.modifier, keyword.control.export, storage.type",
      "settings": {}
    },
    {
      "scope": "variable.language",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "entity.name.method.js",
      "settings": {
        "foreground": "#82AAFF"
      }
    },
    {
      "scope": "meta.class-method.js entity.name.function.js, variable.function.constructor",
      "settings": {
        "foreground": "#82AAFF"
      }
    },
    {
      "scope": "entity.other.attribute-name",
      "settings": {
        "foreground": palette.yellowLight
      }
    },
    {
      "scope": "text.html.basic entity.other.attribute-name.html, text.html.basic entity.other.attribute-name",
      "settings": {
        "foreground": palette.orangeBase
      }
    },
    {
      "scope": "text.html, meta.tag.inline.any.html, source, text.xml",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    {
      "scope": "entity.other.attribute-name.class",
      "settings": {
        "foreground": palette.orangeBase
      }
    },
    {
      "scope": "source.sass keyword.control",
      "settings": {
        "foreground": "#82AAFF"
      }
    },
    {
      "scope": "markup.inserted",
      "settings": {
        "foreground": "#C3E88D"
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
      "scope": "string.regexp",
      "settings": {
        "foreground": palette.cyanAccent
      }
    },
    {
      "scope": "constant.character.escape",
      "settings": {
        "foreground": palette.cyanAccent
      }
    },
    {
      "scope": "constant.numeric.line-number.find-in-files - match",
      "settings": {
        "foreground": "#C17E70"
      }
    },
    {
      "scope": "entity.name.filename.find-in-files",
      "settings": {
        "foreground": "#C3E88D"
      }
    },
    {
      "scope": "tag.decorator.js entity.name.tag.js, tag.decorator.js punctuation.definition.tag.js",
      "settings": {
        "foreground": "#82AAFF"
      }
    },
    {
      "scope": "source.js constant.other.object.key.js string.unquoted.label.js",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "source.json meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json string.quoted.double.json - meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json punctuation.definition.string - meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": "#C3E88D"
      }
    },
    {
      "scope": "source.json meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json string.quoted.double.json - meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json punctuation.definition.string - meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": palette.purpleDim
      }
    },
    {
      "scope": "source.json meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json string.quoted.double.json - meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json punctuation.definition.string - meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "source.json meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json string.quoted.double.json - meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json punctuation.definition.string - meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": "#82AAFF"
      }
    },
    {
      "scope": "source.json meta meta meta meta meta meta meta meta.structure.dictionary.json string.quoted.double.json - meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta meta meta meta meta meta meta meta.structure.dictionary.json punctuation.definition.string - meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": "#C17E70"
      }
    },
    {
      "scope": "source.json meta meta meta meta meta meta.structure.dictionary.json string.quoted.double.json - meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta meta meta meta meta meta.structure.dictionary.json punctuation.definition.string - meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "source.json meta meta meta meta.structure.dictionary.json string.quoted.double.json - meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta meta meta meta.structure.dictionary.json punctuation.definition.string - meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": "#F78C6C"
      }
    },
    {
      "scope": "source.json meta meta.structure.dictionary.json string.quoted.double.json - meta meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta meta.structure.dictionary.json punctuation.definition.string - meta meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": palette.orangeBase
      }
    },
    {
      "scope": "source.json meta.structure.dictionary.json string.quoted.double.json - meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta.structure.dictionary.json punctuation.definition.string - meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": palette.purpleDim
      }
    },
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
    // ── Markdown: Headings ───────────────────────────────────────────────────
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
    // ── Markdown: Bold & Italic ──────────────────────────────────────────────
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
    // ── Markdown: Inline code ────────────────────────────────────────────────
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
    // ── Markdown: Links ──────────────────────────────────────────────────────
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
    // ── Markdown: Blockquotes ────────────────────────────────────────────────
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
    // ── Markdown: Lists ──────────────────────────────────────────────────────
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
    // ── Markdown: Code blocks (fenced) ───────────────────────────────────────
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
    // ── Markdown: Underline / misc ───────────────────────────────────────────
    {
      "scope": "markup.underline",
      "settings": {
        "foreground": "#F78C6C"
      }
    },
    // ── Markdown: Punctuation & separators ───────────────────────────────────
    {
      "scope": "text.html.markdown punctuation.definition",
      "settings": {
        "foreground": palette.purpleGrey
      }
    },
    {
      "scope": "text.html.markdown meta.disable-markdown punctuation.definition",
      "settings": {
        "foreground": "#A4FFFF"
      }
    },
    {
      "scope": "meta.separator, meta.separator.markdown",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    // ── Markdown: Tables ─────────────────────────────────────────────────────
    {
      "scope": "markup.table",
      "settings": {
        "foreground": palette.fgBase
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
        "foreground": "#C3E88D"
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
    {
      "scope": "brackethighlighter.default",
      "settings": {
        "foreground": "#B2CCD6"
      }
    },
    {
      "scope": "brackethighlighter.quote",
      "settings": {
        "foreground": "#C3E88D"
      }
    },
    {
      "scope": "brackethighlighter.unmatched",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "punctuation.definition.tag.html, punctuation.definition.tag.begin.html, punctuation.definition.tag.end.html, punctuation.definition.tag.begin.tsx, punctuation.definition.tag.end.tsx, punctuation.definition.tag.begin.jsx, punctuation.definition.tag.end.jsx",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    // variable.other.readwrite.alias.js — foreground compartido; el italic lo pone build.js SOLO en la variante Italic (bloque expressive)
    {
      "scope": "variable.other.readwrite.alias.js",
      "settings": {
        "foreground": palette.fgWhite,
        "fontStyle": ""
      }
    },
    // PYTHON, cs, go, java
    {
      "scope": "meta.function-call.generic.python, entity.name.function.cs, entity.name.function.support.go",
      "settings": {
        "foreground": palette.fgWhite
      }
    },
    {
      "scope": "meta.function-call.arguments.python, keyword.type.string.cs, keyword.type.int.cs, keyword.type.bool.cs",
      "settings": {
        "foreground": palette.pinkLight
      }
    }
  ],
  "type": "dark"
};
