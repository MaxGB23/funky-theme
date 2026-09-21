# Changelog

All notable changes to the Funky Theme extension will be documented in this file.

## [Unreleased]

### Added

- Bracket pair colorization: `editorBracketHighlight.foreground1`-3 with a `meta.brace` fallback in vibrant yellow.

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

### Fixed

- High Contrast: removed an explicit `editorHint.foreground` that double-painted the IDE's native hint styling.
- High Contrast: inherited the shared extension star color (`extensionIcon.starForeground`).
- Normalized all hex colors to lowercase.

<!-- At stable release: rename [Unreleased] to [3.0.0] with the release date and remove this comment. -->