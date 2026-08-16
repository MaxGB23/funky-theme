# Funky Theme 👻

> A vibrant, semantically-driven dark theme for Visual Studio Code — breaking away from the usual dull dark themes.

As terminal agents and AI handle more of the heavy lifting, the IDE is becoming less of a place to write everything and more of a place to review, understand, and refine. Funky Theme embraces that shift with bright, vibrant semantics — because if you're going to look at code, it shouldn't have to look dull.

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

While primarily dedicated to and optimized for **web development** (specifically for workflows using **React, HTML, CSS, JavaScript, TypeScript, Next.js, and Markdown**), it has also been tested and tuned for other backend and scripting languages.

- **Web & Frontend**: TypeScript / JavaScript / JSX / TSX (React, Next.js), HTML / CSS / SCSS / SASS / Less, JSON / JSON5
- **Content & Documentation**: Markdown (headings, bold, italic, links, blockquotes, code blocks)
- **Backend & Scripts**: Java, Python, C#, Go
- **Utilities**: Regular Expressions


---

## 📦 Installation

This theme **is not published on the Marketplace**. Being store-agnostic, it is distributed directly via a `.vsix` file. This ensures universal compatibility with any VS Code-based editor (VS Code, Cursor, Windsurf, etc.).

You can install it in two ways:

### Option A: Editor UI (Recommended)

1. Download the latest `.vsix` file from the [Releases](https://github.com/maxgb23/funky-theme/releases) page.
2. Open your editor and open the Command Palette (`Ctrl+Shift+P` on Windows/Linux or `Cmd+Shift+P` on Mac).
3. Type and select **`Extensions: Install from VSIX...`**.
4. Browse and select the downloaded `.vsix` file.
5. To activate it, open the Command Palette again, type **`Preferences: Color Theme`**, and select your favorite **Funky** variant.

### Option B: Terminal (Hacker Mode)

If you have already downloaded the `.vsix` file, you can install it via CLI:

```bash
code --install-extension path/to/funky-theme-x.x.x.vsix
```
*(Note: Replace `code` with your editor's CLI command if you are not using VS Code, e.g., `cursor --install-extension ...`)*

---

## Build from source

> **Note**: You can use `npm` to install dependencies and run scripts, but **`pnpm` is highly recommended** for better security, stricter dependency resolution, and to avoid lockfile conflicts.

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

## Maintenance & Contributing

Want to tweak colors, add new tokens, or build your own variant on top of Funky Theme?

👉 Read the **[Guía de Mantenimiento](./docs/how-to-modify-theme.md)** — a step-by-step guide covering the architecture, how to modify existing colors, and how to add new palette tokens.

> The guide is written in Spanish, as most contributors and maintainers of this project are Spanish-speaking developers.

---

## License

[MIT](./LICENSE) © maxgb23
