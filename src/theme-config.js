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
  
  // === Grises de UI e Invisibles ===
  comments: "#555555",     // comment (Reemplaza a '#666666') - Exclusivo para código comentado en cursiva
  uiMuted: "#606685",      // ui-muted (Reemplaza a '#5a657c','#65737e','#546e7a') - Bordes, guías y tokens secundarios

  // === Colores de Sintaxis (Accents Tiered Palette) ===
  
  // Cyans (Attributes, Numbers)
  cyanDim: "#80ecff",      // cyan-dim (Reemplaza a '#8ceaff') - Tokens numéricos o attributes secundarios
  cyanBase: "#8be9fd",     // cyan-base (Reemplaza a '#96e7ff', '#89ddff') - Atributos de React, props, variables
  
  // Rojos (Errors, Tags de cierre, Variables mutadas)
  redBase: "#ff5555",      // red-base (Reemplaza a '#ff6e6e', '#f07178', '#ff5370')
  
  // Rosas (Keywords, Control Flow, Parameters)
  pinkBase: "#ff8bee",     // pink-base (Reemplaza la masacre de 5 rosas: '#ffacf5', '#feb3e8', '#ffa6f9', '#ff92df', '#ff78f8')
  
  // Naranjas & Amarillos (Strings, Functions, Warnings)
  orangeBase: "#ffb86c",   // orange-base (Reemplaza a '#ffcb6b') - Usado para strings y warnings moderados
  yellowBase: "#f6ff98",   // yellow-base (Reemplaza a '#ffffa5', '#ffffa3') - Nombres de funciones (Methods)
  
  // Verdes (Classes, RegEx, Strings exitosos)
  greenBase: "#8bffa8",    // green-base (Reemplaza a '#8affc4', '#c7ffc8', '#b9ffba')
  
  // Morados (Operators, Imports/Exports)
  purpleDim: "#c792ea",    // purple-dim (Reemplaza a '#d6acff') - Operadores matemáticos o lógicos
  purpleBase: "#bd93f9"    // purple-base (Reemplaza a '#cca2e8') - Keywords de importación y exportación
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
    "editor.lineHighlightBackground": palette.bgBase,
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
    "gitDecoration.modifiedResourceForeground": palette.cyanBase,
    "gitDecoration.deletedResourceForeground": "#ff55a4",
    "gitDecoration.untrackedResourceForeground": palette.greenBase,
    "gitDecoration.ignoredResourceForeground": palette.pinkBase,
    "gitDecoration.conflictingResourceForeground": palette.orangeBase,
    "terminal.background": palette.bgDeep,
    "terminal.foreground": palette.fgBase,
    "terminal.ansiBrightBlack": "#6272A4",
    "terminal.ansiBrightRed": palette.redBase,
    "terminal.ansiBrightGreen": palette.pinkBase,
    "terminal.ansiBrightYellow": palette.yellowBase,
    "terminal.ansiBrightBlue": palette.purpleDim,
    "terminal.ansiBrightMagenta": palette.pinkBase,
    "terminal.ansiBrightCyan": "#A4FFFF",
    "terminal.ansiBrightWhite": "#FFFFFF",
    "terminal.ansiBlack": palette.bgDeep,
    "terminal.ansiRed": palette.redBase,
    "terminal.ansiGreen": palette.greenBase,
    "terminal.ansiYellow": palette.yellowBase,
    "terminal.ansiBlue": palette.purpleBase,
    "terminal.ansiMagenta": palette.pinkBase,
    "terminal.ansiCyan": "#A4FFFF",
    "terminal.ansiWhite": palette.fgBase
  },
  "tokenColors": [
    {
      "scope": "comment, punctuation.definition.comment",
      "settings": {
        "foreground": palette.uiMuted,
        "fontStyle": "italic"
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
        "foreground": "#ffffff"
      }
    },
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
    {
      "scope": "keyword, storage.type, storage.modifier",
      "settings": {
        "foreground": palette.purpleDim
      }
    },
    {
      "scope": "constant.other.color, punctuation, punctuation.definition.tag, punctuation.separator.inheritance.php, punctuation.definition.tag.html, punctuation.definition.tag.begin.html, punctuation.definition.tag.end.html, punctuation.section.embedded, keyword.other.template, keyword.other.substitution",
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
      "scope": "entity.name.tag, meta.tag.sgml, markup.deleted.git_gutter",
      "settings": {
        "foreground": palette.pinkBase
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
        "foreground": "#c9fbff"
      }
    },
    {
      "scope": "entity.name.function, meta.function-call, variable.function, support.function, keyword.other.special-method, meta.block-level",
      "settings": {
        "foreground": palette.cyanBase
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
        "foreground": palette.pinkBase
      }
    },
    {
      "scope": "string, constant.other.symbol, constant.other.key, entity.other.inherited-class, markup.heading, markup.inserted.git_gutter, meta.group.braces.curly constant.other.object.key.js string.unquoted.label.js",
      "settings": {
        "foreground": palette.greenBase
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
        "foreground": "#B2CCD6"
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
        "foreground": "#FFFFFF"
      }
    },
    {
      "scope": "entity.name.type, entity.name.class, support.class",
      "settings": {
        "foreground": "#FFFFFF"
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
        "foreground": palette.purpleBase
      }
    },
    {
      "scope": "text.html.basic entity.other.attribute-name.html, text.html.basic entity.other.attribute-name",
      "settings": {
        "foreground": palette.orangeBase
      }
    },
    {
      "scope": "text.html, meta.tag.inline.any.html, source",
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
        "foreground": palette.cyanBase
      }
    },
    {
      "scope": "constant.character.escape",
      "settings": {
        "foreground": palette.cyanBase
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
      "scope": "text.html.markdown markup.raw.inline",
      "settings": {
        "foreground": palette.purpleDim
      }
    },
    {
      "scope": "text.html.markdown punctuation.definition.raw.markdown",
      "settings": {
        "foreground": palette.uiMuted
      }
    },
    {
      "scope": "markdown.heading, markup.heading | markup.heading entity.name, markup.heading.markdown punctuation.definition.heading.markdown",
      "settings": {
        "foreground": "#C3E88D"
      }
    },
    {
      "scope": "markup.italic",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "markup.bold, markup.bold string",
      "settings": {
        "foreground": palette.redBase
      }
    },
    {
      "scope": "markup.underline",
      "settings": {
        "foreground": "#F78C6C"
      }
    },
    {
      "scope": "markup.quote punctuation.definition.blockquote.markdown",
      "settings": {
        "foreground": palette.uiMuted
      }
    },
    {
      "scope": "string.other.link.title.markdown",
      "settings": {
        "foreground": "#82AAFF"
      }
    },
    {
      "scope": "string.other.link.description.title.markdown",
      "settings": {
        "foreground": palette.purpleDim
      }
    },
    {
      "scope": "constant.other.reference.link.markdown",
      "settings": {
        "foreground": palette.orangeBase
      }
    },
    {
      "scope": "markup.raw.block",
      "settings": {
        "foreground": palette.purpleDim
      }
    },
    {
      "scope": "markup.raw.block.fenced.markdown, variable.language.fenced.markdown, punctuation.section.class.end",
      "settings": {
        "foreground": palette.fgBase
      }
    },
    {
      "scope": "variable.language.fenced.markdown",
      "settings": {
        "foreground": palette.uiMuted
      }
    },
    {
      "scope": "text.html.markdown punctuation.definition",
      "settings": {
        "foreground": palette.uiMuted
      }
    },
    {
      "scope": "text.html.markdown meta.disable-markdown punctuation.definition",
      "settings": {
        "foreground": palette.cyanBase
      }
    },
    {
      "scope": "meta.separator",
      "settings": {
        "foreground": palette.uiMuted
      }
    },
    {
      "scope": "markup.table",
      "settings": {
        "foreground": palette.fgBase
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
        "foreground": palette.orangeBase
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
    }
  ],
  "type": "dark"
};
