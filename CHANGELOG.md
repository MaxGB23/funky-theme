# Changelog

All notable changes to the Funky Theme extension will be documented in this file.

## [Unreleased]

_No changes since the last release._

## [3.2.2] - 2026-10-08

### Docs

- Zed support bootstrap (local-install v0.1): README section, theme-guide pattern note, and `zed/CHANGELOG.md`; no VS Code behavior change — versioned Zed history lives in `zed/CHANGELOG.md`.

## [3.2.1] - 2026-10-05

### Fixed

- XML tag punctuation now renders in the theme's white foreground — the general `punctuation` scope in the cyan rule was overriding the specific `punctuation.definition.tag` rule. Removed the general scope from the cyan rule and simplified the white rule to a single `punctuation.definition.tag` scope (language-specific variants were redundant).
- Removed dead decorator rule (`tag.decorator.js entity.name.tag.js, tag.decorator.js punctuation.definition.tag.js`) — the `tag.*` scope family is reserved for markup grammars, not JS/TS decorators, so the rule never matched any token.
- Removed 9 obsolete JSON meta rules (`source.json meta meta...`) — Sublime Text 2012 hacks that target `string.quoted.double.json` with `meta.structure.dictionary.json` but not `meta.structure.dictionary.json`. VS Code's grammar tokenizes keys as `support.type.property-name.json`, so the rules never matched. JSON keys are already covered by the single `support.type.property-name.json` rule.

### Docs

- README: recommended editor settings split into **Theme settings** — the setup the palette is tuned for, now naming `editor.bracketPairColorization.enabled` instead of `editor.mouseWheelZoom` — and **Personal recommendations** (caret animations, `editor.mouseWheelZoom`), so what the theme needs is no longer mixed with maintainer taste.

## [3.2.0] - 2026-09-29

### Added

- `pnpm verify:vsix` now reads `extension/changelog.md` out of the packaged vsix and fails unless the newest released section matches `package.json`'s version and every `###` heading is a release category. Catches a stale vsix carrying the previous release's notes, and a non-category heading that the release rename would have swept into a released section.
- Range highlight theming for Quick Open, Symbol in File, and Find (`editor.rangeHighlightBackground`, `editor.rangeHighlightBorder`, `editorOverviewRuler.rangeHighlightForeground`) across all five variants; base variants inherit automatically from palette tokens, Darker derives via existing `darkerBackgrounds` transform, High Contrast uses explicit values.

### Changed

- `editor.findMatchHighlightBackground` and new `editor.findMatchHighlightBorder` now use `purpleDim` with variant-specific alpha (30/20/40) instead of `searchBackground`, so the current match (solid white box) and other matches (purple wash) are visually distinct.
- Darker variant word/symbol highlights and bracket match now use `accentFaint` (`#8c8eff2a`) like all other variants; the Darker-only override that raised them to `#8c8eff30` has been removed — the special case was inverted by the requested change.

### Fixed

- `palette.controlBorder` was an orphan token ("SIN USOS") since v3.1rc1; now drives `editorOverviewRuler.rangeHighlightForeground` in base variants.
- `palette.searchBackground` comment no longer claims `findMatchHighlightBackground` (moved to `purpleDim`).

### Docs

- README: added a `Roadmap` section for work that has not shipped yet (Zed support, terminal AI agents), so forward-looking notices stop living in the version history.
- `AGENTS.md`: every work unit commit now writes its `[Unreleased]` entry in the same commit, under the standard release categories, with the reasoning — `git log` keeps the what but loses the why.
- Release skill: the changelog is now the source for the release notes instead of both being written in parallel, and the release step consumes the accumulated `[Unreleased]` instead of reconstructing it from commit subjects.

## [3.1.3] - 2026-09-28

### Changed

- `tree.indentGuidesStroke` and `tree.tableColumnsBorder` moved from the accent family (`#8c8eff73`) to `guideMid` (`#625e74`, Darker `#544f64`) so tree guides and table borders read as the same structure as the editor's active indent guide; High Contrast keeps its stronger borders.

### Docs

- README: terminal AI agents section now names the dedicated `funky-theme-tui` repo and the target agents instead of leaving packaging open.
- README: terminal agent status reports the prototype version as `v0.1.0`.

## [3.1.2] - 2026-09-26

### Changed

- `scrollbar.background` set to fully transparent in all variants so dropdown, widget and panel backgrounds show through.
- `menu.separatorBackground` switched to a discreet gray (`#444156`, darker `#3f3c4f`); High Contrast keeps the accent separator (`#8c8effd2`).
- `editorIndentGuide.background1` raised to `#464254f5` (darker `#3a374af5`) so the active guide stands out on bright panels.
- High Contrast scrollbar slider moved to the accent family (`#8c8effb6` / `#8c8eff`) for an accessible, visible thumb.

### Fixed

- Removed dead orange rules for HTML attribute names — modern HTML tokenizes under `text.html.derivative` (not `text.html.basic`) and the class-scoped rule matched no live scope; shipped rules now match the parser.

### Docs

- README: aligned the color philosophy section with live mappings — attribute names under Yellows (`e.g. HTML, CSS, JSX`), Oranges without HTML attributes, XML added to supported languages.
- README: refined accessibility and editor settings guidance and trimmed a redundant note.
- Noted active work with terminal-based AI coding agents (`opencode`, `pi`) on the dark and darker variants.

## [3.1.1] - 2026-09-24

No appreciable changes to the theme itself — this release fixes extension packaging only.

### Fixed

- Packaged `extension/changelog.md` now ships the release section (`[3.1.0]`) that the published `v3.1.0` vsix was missing — the IDE changelog reflects the installed version from now on.
- Added a packaging guard (`verify:vsix`) that fails the build if the vsix leaks files or misses allowlisted assets.

## [3.1.0] - 2026-09-24

### Added

- Full PeekView block on the deep canvas: `peekView.border`/`peekViewEditor.background` with accent match highlights, `peekViewResult.*` (selection `#2e3250`), and `peekViewTitle.*`.
- Editor indent guides: `editorIndentGuide.background1` (`#464254`) with an active line in the new `guideMid` token; `tree.indentGuidesStroke` and `tree.tableColumnsBorder` switched to the shared `guideAccent` token.
- Elevated input surfaces: `input.background`/`input.border` and `checkbox.*` moved to `bgElevated` with an invisible border, plus `inputValidation.infoBackground`/`infoBorder` styling.

### Changed

- Funky Darker promoted to second position in the variant lineup for quicker access to the most-liked variants.
- High Contrast: inherited secondary buttons, added strong borders for indent guides/tables/PeekView, and raised ignored/untracked gutter marks to `uiInactive` (`#8b8f9e`).
- Darker: manual indent-guide exceptions in the background map keep the active guide visible.

### Docs

- README: restructured for conversion-first flow — Variants hook, shared canvas chips, language differentiation and recommended settings up front.
- README: added Author section with full name, contacts and special thanks; capitalized Variants heading.
- Theme guide: palette table gains `guideAccent`/`guideMid` tokens.

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