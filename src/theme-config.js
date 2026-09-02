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
    // ── Editor ───────────────────────────────────────────────────────────────────────
    "editor.background": "#24212e",
    "editorCursor.foreground": "#ffde25",
    "editor.lineHighlightBackground": "#2e2a3a",
    "editor.lineHighlightBorder": "#2e2a3a",
    "editor.selectionBackground": "#8c8eff40",
    "editor.findMatchBackground": "#5f569580",
    "editor.findMatchBorder": "#a599efff",
    "editor.findMatchForeground": "#ffffff",
    "editor.findMatchHighlightBackground": "#5f569580",
    "editor.findMatchHighlightForeground": "#ffffff",
    "editorGroupHeader.tabsBackground": "#211e2b",

    // ── Activity Bar / Sidebar / Tree ─────────────────────────────────────────────────
    "activityBar.background": "#211e2b",
    "activityBar.foreground": "#ffffff",
    "sideBar.background": "#24212ed3",
    "sideBar.foreground": "#FFFFFF",
    "sideBar.border": "#24212e",
    "tree.indentGuidesStroke": "#555555",
    "tree.tableColumnsBorder": "#555555",
    "tree.tableOddRowsBackground": "#2e2a3a",

    // ── Tabs ──────────────────────────────────────────────────────────────────────────
    "tab.activeBackground": "#2e2a3a",
    "tab.activeForeground": "#ffffff",
    "tab.inactiveBackground": "#24212e",
    "tab.inactiveForeground": "#B0B0B0",
    "tab.hoverBackground": "#2e2a3a",
    "tab.hoverForeground": "#FFFFFF",

    // ── Git (decoraciones) ────────────────────────────────────────────────────────────
    "gitDecoration.modifiedResourceForeground": "#6df5fa",
    "gitDecoration.deletedResourceForeground": "#ff55a4",
    "gitDecoration.untrackedResourceForeground": "#8bffa8",
    "gitDecoration.ignoredResourceForeground": "#ffa8e6",
    "gitDecoration.conflictingResourceForeground": "#ffb86c",

    // ── Terminal (ANSI) ───────────────────────────────────────────────────────────────
    "terminal.background": "#211e2b",
    "terminal.foreground": "#f8f8f2",
    "terminal.ansiBrightBlack": "#6272A4",
    "terminal.ansiBrightRed": "#ff87c5",
    "terminal.ansiBrightGreen": "#ffa8e6",
    "terminal.ansiBrightYellow": "#f6ff98",
    "terminal.ansiBrightBlue": "#c792ea",
    "terminal.ansiBrightMagenta": "#ffa8e6",
    "terminal.ansiBrightCyan": "#A4FFFF",
    "terminal.ansiBrightWhite": "#FFFFFF",
    "terminal.ansiBlack": "#211e2b",
    "terminal.ansiRed": "#ff87c5",
    "terminal.ansiGreen": "#b9ffba",
    "terminal.ansiYellow": "#f6ff98",
    "terminal.ansiBlue": "#bd93f9",
    "terminal.ansiMagenta": "#ffa8e6",
    "terminal.ansiCyan": "#A4FFFF",
    "terminal.ansiWhite": "#f8f8f2",

    // ── Title Bar / Menubar ───────────────────────────────────────────────────────────
    "titleBar.activeBackground": "#211e2b",
    "titleBar.activeForeground": "#ffffff",
    "titleBar.inactiveBackground": "#211e2bd9",
    "titleBar.inactiveForeground": "#ffffff99",
    "menubar.selectionForeground": "#ffffff",
    "menubar.selectionBackground": "#2e2a3a",

    // ── Status Bar ────────────────────────────────────────────────────────────────────
    "statusBar.background": "#24212e",
    "statusBar.foreground": "#ffffff",
    "statusBar.noFolderBackground": "#211e2b",
    "statusBar.debuggingBackground": "#ff5555",
    "statusBarItem.hoverBackground": "#ffffff33",
    "statusBarItem.activeBackground": "#ffffff80",

    // ── Widgets / Find ─────────────────────────────────────────────────────────────────
    "editorWidget.background": "#24212e",
    "editorWidget.border": "#211e2b",
    "editorSuggestWidget.selectedIconForeground": "#c792ea",
    "widget.shadow": "#00000030",
    "editorFindWidget.background": "#24212e",
    "editorFindWidget.foreground": "#ffffff",
    "editorFindWidget.border": "#211e2b",

    // ── Inputs ────────────────────────────────────────────────────────────────────────
    "input.background": "#211e2b",
    "input.foreground": "#ffffff",
    "input.border": "#555555",

    // ── Menús y Listas ─────────────────────────────────────────────────────────────────
    "menu.background": "#24212e",
    "menu.foreground": "#ffffff",
    "menu.selectionForeground": "#ffffff",
    "menu.separatorBackground": "#555555",
    "list.activeSelectionBackground": "#8c8eff33",
    "list.activeSelectionForeground": "#ffffff",
    "list.hoverBackground": "#2e2a3a80",
    "list.inactiveSelectionBackground": "#2e2a3a",
    "list.inactiveSelectionForeground": "#ffffff",

    // ── Scrollbar ─────────────────────────────────────────────────────────────────────
    "scrollbar.background": "#24212eea",
    "scrollbar.shadow": "#24212eea",
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
    "button.background": "#8c8effd2",
    "button.foreground": "#ffffff",
    "button.hoverBackground": "#8c8effb6",
    "focusBorder": "#8c8effd2",
    "activityBarBadge.background": "#8c8effd2",

    // ── Sticky Scroll ─────────────────────────────────────────────────────────────────
    "editorStickyScroll.background": "#211e2b",
    "editorStickyScrollHover.background": "#2e2a3a",
    // Terminal sticky: background elevado (#201d2a en Darker vía build ultra-nocturno)
    "terminalStickyScrollHover.background": "#2e2a3a",

    // ── Editor Line Numbers ───────────────────────────────────────────────────────────
    "editorLineNumber.foreground": "#707381",
    "editorLineNumber.activeForeground": "#c792ea",
  },
  "tokenColors": [
    // ── Comentarios ────────────────────────────────────────────────────────────────────
    // Comentarios apagados: alfa e9 para que no resalten y no confundan con texto normal
    {
      "scope": "comment, punctuation.definition.comment",
      "settings": {
        "foreground": "#d8d8d8e9",
        "fontStyle": ""
      }
    },

    // ── Variables y constantes ─────────────────────────────────────────────────────────
    {
      "scope": "variable, string constant.other.placeholder",
      "settings": {
        "foreground": "#f8f8f2"
      }
    },
    {
      "scope": "constant.other.color",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    {
      "scope": "support.other.variable, string.other.link",
      "settings": {
        "foreground": "#ff5555"
      }
    },
    {
      "scope": "meta.object-literal.key, meta.property-name, variable.object.property",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    {
      "scope": "variable.language",
      "settings": {
        "foreground": "#ff5555"
      }
    },
    {
      "scope": "source.js constant.other.object.key.js string.unquoted.label.js",
      "settings": {
        "foreground": "#ff5555"
      }
    },
    // variable.other.readwrite.alias.js — foreground compartido; el italic lo pone build.js SOLO en la variante Italic (bloque expressive)
    {
      "scope": "variable.other.readwrite.alias.js",
      "settings": {
        "foreground": "#ffffff",
        "fontStyle": ""
      }
    },

    // ── Keywords / control / imports ───────────────────────────────────────────────────
    {
      "scope": "keyword, storage.type, storage.modifier",
      "settings": {
        "foreground": "#c792ea"
      }
    },
    {
      "scope": "constant.other.color, punctuation, punctuation.definition.tag, punctuation.separator.inheritance.php, punctuation.section.embedded, keyword.other.template, keyword.other.substitution",
      "settings": {
        "foreground": "#80ecff"
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
        "foreground": "#ffcb7d"
      }
    },
    {
      "scope": "entity.name.module.js, variable.import.parameter.js, variable.other.class.js",
      "settings": {
        "foreground": "#ff5555"
      }
    },
    {
      "scope": "keyword.control.import, keyword.control.from, storage.modifier, keyword.control.export, storage.type",
      "settings": {

      }
    },
    {
      "scope": "source.sass keyword.control",
      "settings": {
        "foreground": "#82AAFF"
      }
    },

    // ── Funciones y métodos ────────────────────────────────────────────────────────────
    {
      "scope": "entity.name.function, meta.function-call, variable.function, support.function, keyword.other.special-method, meta.block-level",
      "settings": {
        "foreground": "#96e7ff"
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

    // ── Classes / tipos / soporte ──────────────────────────────────────────────────────
    // support.class (base)
    {
      "scope": "support.class",
      "settings": {
        "foreground": "#f8f8f2"
      }
    },
    // support.class (bright)
    {
      "scope": "support.class",
      "settings": {
        "foreground": "#eaa9fc"
      }
    },
    {
      "scope": "entity.name.class, entity.name.type.class, support.type, support.orther.namespace.use.php, meta.use.php, support.other.namespace.php, markup.changed.git_gutter, support.type.sys-types",
      "settings": {
        "foreground": "#f6ff98"
      }
    },
    {
      "scope": "source.css support.type, source.sass support.type, source.scss support.type, source.less support.type, source.stylus support.type",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    {
      "scope": "entity.name.type",
      "settings": {
        "foreground": "#fff9ba"
      }
    },
    // entity.name.class
    {
      "scope": "entity.name.class",
      "settings": {
        "foreground": "#ffffff"
      }
    },

    // ── Strings / regex / escapes ──────────────────────────────────────────────────────
    {
      "scope": "string, constant.other.symbol, constant.other.key, entity.other.inherited-class, markup.heading, markup.inserted.git_gutter, meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js",
      "settings": {
        "foreground": "#b9ffba"
      }
    },
    {
      "scope": "string.regexp",
      "settings": {
        "foreground": "#96e7ff"
      }
    },
    {
      "scope": "constant.character.escape",
      "settings": {
        "foreground": "#96e7ff"
      }
    },

    // ── Números y constantes numéricas / parámetros ────────────────────────────────────
    {
      "scope": "constant.numeric, constant.language, support.constant, constant.character, variable.parameter, keyword.other.unit",
      "settings": {
        "foreground": "#ffa8e6"
      }
    },

    // ── Atributos (HTML/JSX/CSS) ───────────────────────────────────────────────────────
    {
      "scope": "entity.other.attribute-name.class.css",
      "settings": {
        "foreground": "#f6ff98"
      }
    },
    {
      "scope": "entity.other.attribute-name",
      "settings": {
        "foreground": "#fff9ba"
      }
    },
    {
      "scope": "text.html.basic entity.other.attribute-name.html, text.html.basic entity.other.attribute-name",
      "settings": {
        "foreground": "#ffb86c"
      }
    },
    {
      "scope": "entity.other.attribute-name.class",
      "settings": {
        "foreground": "#ffb86c"
      }
    },

    // ── Tags / meta (HTML/XML) ─────────────────────────────────────────────────────────
    {
      "scope": "entity.name.tag, meta.tag.sgml, markup.deleted.git_gutter",
      "settings": {
        "foreground": "#ff87c5"
      }
    },
    {
      "scope": "meta.tag",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    {
      "scope": "text.html, meta.tag.inline.any.html, source, text.xml",
      "settings": {
        "foreground": "#f8f8f2"
      }
    },
    {
      "scope": "tag.decorator.js entity.name.tag.js, tag.decorator.js punctuation.definition.tag.js",
      "settings": {
        "foreground": "#82AAFF"
      }
    },
    {
      "scope": "punctuation.definition.tag.html, punctuation.definition.tag.begin.html, punctuation.definition.tag.end.html, punctuation.definition.tag.begin.tsx, punctuation.definition.tag.end.tsx, punctuation.definition.tag.begin.jsx, punctuation.definition.tag.end.jsx",
      "settings": {
        "foreground": "#ffffff"
      }
    },

    // ── JSON (dictionary keys/values) ─────────────────────────────────────────────────
    {
      "scope": "source.json meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json string.quoted.double.json - meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json punctuation.definition.string - meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": "#C3E88D"
      }
    },
    {
      "scope": "source.json meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json string.quoted.double.json - meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json punctuation.definition.string - meta meta meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": "#c792ea"
      }
    },
    {
      "scope": "source.json meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json string.quoted.double.json - meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json punctuation.definition.string - meta meta meta meta meta meta meta meta meta meta meta meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": "#ff5555"
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
        "foreground": "#ff5555"
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
        "foreground": "#ffb86c"
      }
    },
    {
      "scope": "source.json meta.structure.dictionary.json string.quoted.double.json - meta.structure.dictionary.json meta.structure.dictionary.value.json string.quoted.double.json, source.json meta.structure.dictionary.json punctuation.definition.string - meta.structure.dictionary.json meta.structure.dictionary.value.json punctuation.definition.string",
      "settings": {
        "foreground": "#c792ea"
      }
    },

    // ── Markdown ───────────────────────────────────────────────────────────────────────
    {
      "scope": "text.html.markdown, punctuation.definition.list_item.markdown",
      "settings": {
        "foreground": "#f8f8f2"
      }
    },
    {
      "scope": "punctuation.definition.constant.markdown",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    // ── Markdown: Headings ──
    {
      "scope": "markup.heading.markdown, entity.name.section.markdown, markdown.heading, markup.heading, markup.heading entity.name",
      "settings": {
        "foreground": "#ff8ddb",
        "fontStyle": "bold"
      }
    },
    {
      "scope": "markup.heading.markdown punctuation.definition.heading.markdown",
      "settings": {
        "foreground": "#ff8ddb",
        "fontStyle": "bold"
      }
    },
    // ── Markdown: Bold & Italic ──
    {
      "scope": "markup.bold.markdown, markup.bold, markup.bold string",
      "settings": {
        "foreground": "#6df5fa",
        "fontStyle": "bold"
      }
    },
    {
      "scope": "punctuation.definition.bold.markdown",
      "settings": {
        "foreground": "#6df5fa",
        "fontStyle": "bold"
      }
    },
    {
      "scope": "markup.italic.markdown, markup.italic",
      "settings": {
        "foreground": "#6df5fa",
        "fontStyle": "italic"
      }
    },
    {
      "scope": "punctuation.definition.italic.markdown",
      "settings": {
        "foreground": "#6df5fa",
        "fontStyle": "italic"
      }
    },
    // ── Markdown: Inline code ──
    {
      "scope": "markup.inline.raw.string.markdown, text.html.markdown markup.raw.inline",
      "settings": {
        "foreground": "#b9ffba",
        "fontStyle": "italic"
      }
    },
    {
      "scope": "text.html.markdown punctuation.definition.raw.markdown",
      "settings": {
        "foreground": "#b9ffba"
      }
    },
    // ── Markdown: Links ──
    {
      "scope": "meta.link.inline.markdown, meta.link.inline.markdown punctuation.definition.link.title.end.markdown, meta.link.inline.markdown punctuation.definition.metadata.markdown, punctuation.definition.link.title.begin.markdown, punctuation.definition.link.title.end.markdown, punctuation.definition.metadata.markdown",
      "settings": {
        "foreground": "#6df5fa"
      }
    },
    {
      "scope": "string.other.link.title.markdown",
      "settings": {
        "foreground": "#f6ff98"
      }
    },
    {
      "scope": "markup.underline.link.markdown, markup.underline.link",
      "settings": {
        "foreground": "#b9ffba",
        "fontStyle": "italic"
      }
    },
    {
      "scope": "string.other.link.description.title.markdown",
      "settings": {
        "foreground": "#f6ff98"
      }
    },
    {
      "scope": "constant.other.reference.link.markdown",
      "settings": {
        "foreground": "#ffcb7d"
      }
    },
    // ── Markdown: Blockquotes ──
    {
      "scope": "markup.quote.markdown, punctuation.definition.quote.begin.markdown, markup.quote",
      "settings": {
        "foreground": "#b9ffba"
      }
    },
    {
      "scope": "markup.quote punctuation.definition.blockquote.markdown",
      "settings": {
        "foreground": "#b9ffba"
      }
    },
    // ── Markdown: Lists ──
    {
      "scope": "beginning.punctuation.definition.list, punctuation.definition.list.begin.markdown",
      "settings": {
        "foreground": "#f6ff98"
      }
    },
    {
      "scope": "markup.list.numbered.markdown, markup.list.unnumbered.markdown",
      "settings": {
        "foreground": "#f8f8f2"
      }
    },
    // ── Markdown: Code blocks (fenced) ──
    {
      "scope": "markup.raw.block",
      "settings": {
        "foreground": "#f8f8f2"
      }
    },
    {
      "scope": "markup.raw.block.fenced.markdown, markup.fenced_code.block.markdown, markup.raw.block.markdown, punctuation.section.class.end",
      "settings": {
        "foreground": "#f8f8f2"
      }
    },
    {
      "scope": "variable.language.fenced.markdown",
      "settings": {
        "foreground": "#f8f8f2"
      }
    },
    {
      "scope": "markup.fenced_code.block.markdown punctuation.definition.markdown, markup.fenced_code.block.markdown punctuation, punctuation.definition.fenced.markdown, markup.raw.block.fenced.markdown punctuation",
      "settings": {
        "foreground": "#cbcbcb"
      }
    },
    // ── Markdown: Underline / misc ──
    {
      "scope": "markup.underline",
      "settings": {
        "foreground": "#F78C6C"
      }
    },
    // ── Markdown: Punctuation & separators ──
    {
      "scope": "text.html.markdown punctuation.definition",
      "settings": {
        "foreground": "#a9b1de"
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
        "foreground": "#f8f8f2"
      }
    },
    // ── Markdown: Tables ──
    {
      "scope": "markup.table",
      "settings": {
        "foreground": "#f8f8f2"
      }
    },

    // ── Git gutter / diff markers ──────────────────────────────────────────────────────
    {
      "scope": "markup.inserted",
      "settings": {
        "foreground": "#C3E88D"
      }
    },
    {
      "scope": "markup.deleted",
      "settings": {
        "foreground": "#ff5555"
      }
    },
    {
      "scope": "markup.changed",
      "settings": {
        "foreground": "#c792ea"
      }
    },
    {
      "scope": "markup.ignored.git_gutter",
      "settings": {
        "foreground": "#606685"
      }
    },
    {
      "scope": "markup.untracked.git_gutter",
      "settings": {
        "foreground": "#606685"
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
        "foreground": "#ffb86c"
      }
    },
    {
      "scope": "markup.deleted.git_gutter",
      "settings": {
        "foreground": "#ff5555"
      }
    },

    // ── Lenguajes específicos (Python/C#/Go) ──────────────────────────────────────────
    // PYTHON, cs, go, java
    {
      "scope": "meta.function-call.generic.python, entity.name.function.cs, entity.name.function.support.go",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    {
      "scope": "meta.function-call.arguments.python, keyword.type.string.cs, keyword.type.int.cs, keyword.type.bool.cs",
      "settings": {
        "foreground": "#ffa8e6"
      }
    },

    // ── Utilidades / extensiones (acejump, sublimelinter, brackets) ────────────────────
    {
      "scope": "invalid, invalid.illegal, invalid.broken",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    {
      "scope": "invalid.unimplemented",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    {
      "scope": "invalid.deprecated",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    // find-in-files
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
      "scope": "acejump.label.blue",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    {
      "scope": "acejump.label.green",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    {
      "scope": "acejump.label.orange",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    {
      "scope": "acejump.label.purple",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    {
      "scope": "sublimelinter.mark.warning",
      "settings": {
        "foreground": "#ffb86c"
      }
    },
    {
      "scope": "sublimelinter.gutter-mark",
      "settings": {
        "foreground": "#ffffff"
      }
    },
    {
      "scope": "sublimelinter.mark.error",
      "settings": {
        "foreground": "#ff5555"
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
        "foreground": "#ff5555"
      }
    }
  ],
  "type": "dark"
};
