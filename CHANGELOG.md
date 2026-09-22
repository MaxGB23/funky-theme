# Changelog

All notable changes to the Funky Theme extension will be documented in this file.

## [Unreleased]

_No changes since the last release._

## [3.0.1] - 2026-09-21

### Changed

- Refined marketplace keywords to the documented 30-tag limit for better search discoverability.

### Docs

- README: added VS Code Marketplace and Open VSX listing links and installation channels in the intro.
- README: left-aligned intro install links for consistency.
- README: grouped language support by category and listed React, Vue, Svelte, Angular and Next.js as tested frameworks.

## [3.0.0] - 2026-09-21

### Added

- Bracket pair colorization: `editorBracketHighlight.foreground1`-3 with a `meta.brace` fallback in vibrant yellow.
- Personalized squiggles and gutter markers: `editorError.foreground` / `editorWarning.foreground` (`#ff8282` / `#f6ff98`), with the shared `errorFg` palette token reused by `list.errorForeground`.
- JSON property names (`support.type.property-name.json`) in strong yellow, and language-specific `new` operators (`keyword.operator.expression.new`, `keyword.other.new`, `keyword.control.new.java`) in creation orange.
- Generic `keyword.other` in coral (`#ffb488`) — `extends`, `package`, upper-scope keywords — with specific sub-scopes keeping their previous colors.
- `statusBar.focusBorder` — a visible keyboard-focus ring on the status bar.
- `extensionIcon.starForeground` — marketplace star ratings tinted (excluded on High Contrast).

### Changed

- Unified function call scopes: call containers use a dedicated pink (`pinkAccent`) distinct from parameter pink; generic call containers (e.g. Python) yield to the shared function cyan.
- `storage.modifier` and `keyword.operator` symbols moved to the blue family, split for clarity.
- Level-1 bracket highlight switched to vibrant yellow (`#ffde25`).
- ANSI red / bright-red terminal colors unified with the shared error foreground.
- Java `meta.record.identifier` scope replaced by `meta.record`.
- Object literal keys rendered white in TSX/JSX for consistency with the meta layer.
- Regex quantifiers colored blue and regexp green.
- Imports/directives (`keyword.other.import`, `namespace`, `package`, ...) unified to cyan; `editorLink.activeForeground` cyan shared across all variants.
- High Contrast diff borders (`diffEditor.insertedTextBorder` / `insertedLineBorder`) aligned to the purple accent family for coherence with the diff backgrounds.
- Bilingual (EN/ES) marketplace description and refined search keywords for global discoverability.
- Entity types, support types and attribute names unified to yellow light; Dark Mix typography strategy: bold on declaration names only, function calls unbolded.
- Sidebar, panels, widgets and control borders aligned with the editor background and unified accent hues; `editor.findMatchBackground` transparent with the match distinguished by its border.
- Creation orange lightened (`#ffd089`) and unified with `constant.other.reference.link.markdown`; Darker attenuates the brightest syntax colors via `darkerSyntaxAdjustments`.
- `constant.other.placeholder` split from variable strings (`#a1caff`); `orangeAccent` refined along with `button.secondaryHoverBackground`.
- `keyword.type` unified in light purple (`#c792ea`) across grammars; parameters share light pink (`#ffa8e6`) while calls keep their own pink (`#ff87c5`).

### Fixed

- High Contrast: removed an explicit `editorHint.foreground` that double-painted the IDE's native hint styling.
- High Contrast: inherited the shared extension star color (`extensionIcon.starForeground`).
- Pruned dominated/duplicated rules from the compiled themes (dead `constant.other.color`, leftover `markup.changed.git_gutter`, unused `support.orther` typo) — 35 lines removed per variant.
- Normalized all hex colors to lowercase.

### Docs

- README: new installation channels — VS Code Marketplace, Open VSX (VS Code-compatible editors), and GitHub Releases `.vsix`.

No issues found after extended testing.