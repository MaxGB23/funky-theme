# Funky Theme

> A vibrant, semantically-driven dark theme for Visual Studio Code — crafted for long coding sessions without sacrificing personality.

---

## Variants

| Variant | Description |
|---|---|
| **Funky Dark** | The main experience. Balanced contrast, vivid palette. |
| **Funky Dark Italic** | Same colors, with expressive italic for keywords, storage types and decorators. |
| **Funky Darker** | Ultra-nocturnal backgrounds for zero-distraction sessions. |
| **Funky High Contrast** | Accessibility-focused borders and boosted contrast for comment tokens. |

---

## Color Philosophy

Funky Theme is built around a **semantic, tiered color palette** defined in a single source-of-truth config file. Every color has a name and a reason to exist:

- 🩷 **Pinks** — Tags, parameters, numeric constants
- 🟣 **Purples** — Keywords, operators, support classes  
- 🔵 **Cyans** — Functions, attributes, regex, escape characters
- 🟡 **Yellows** — Class names, type names, attribute names  
- 🟢 **Greens** — Strings, git untracked, inline code  
- 🔴 **Reds** — Errors, variables, deleted references  
- 🟠 **Oranges** — Warnings, HTML attributes, operator accents

---

## Language Support

Tested and tuned for:

- TypeScript / JavaScript / JSX / TSX
- HTML / CSS / SCSS / SASS / Less
- JSON / JSON5
- Markdown (headings, bold, italic, links, blockquotes, code blocks)
- Python / C# / Go
- Regular Expressions

---

## Installation

1. Download the latest `.vsix` file from the [Releases](https://github.com/maxgb23/funky-theme/releases) page
2. In VS Code: `Ctrl+Shift+P` → **Extensions: Install from VSIX...**
3. Select the downloaded file
4. Press `Ctrl+Shift+P` → **Preferences: Color Theme** → Select a **Funky** variant

---

## Build from source

```bash
# Clone the repo
git clone https://github.com/maxgb23/funky-theme
cd funky-theme

# Install dependencies
pnpm install

# Compile the theme JSON files
pnpm build

# Generate the .vsix package
pnpm package
```

---

## License

[MIT](./LICENSE) © maxgb23
