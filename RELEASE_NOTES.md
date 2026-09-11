# Release Notes

## v3.0.0-rc.1 — Color families, typography strategy and multi-language `new`

Major theme refresh: unified yellow family for types/attributes, a sharper Mix typography strategy, personalized error/warning squiggles, and the creation operator (`new`) now inherits its orange accent across grammars. Release candidate — feedback welcome before the stable v3.0.0.

### Added
- `editorError.foreground` / `editorWarning.foreground` — personalized squiggly underline and gutter markers (`#ff8282` errors, `#f6ff98` warnings)
- `support.type.property-name.json` — JSON property names in strong yellow (`#f6ff98`)
- Language-specific `new` scopes colored with the creation orange: `keyword.operator.expression.new` (C#), `keyword.other.new` (PHP) and `keyword.control.new.java` (Java)
- Shared `errorFg` palette token (`#ff8282`), reused by `list.errorForeground` and the new editor error keys

### Changed
- Unified entity types, support types and attribute names to yellow light `#fff9ba` across the theme
- Dark Mix bold strategy: bold only on declaration names (`meta.function entity.name.function`, `entity.name.type`, `entity.name.class`); function calls unbolded via `meta.function-call entity.name.function`
- Sidebar, panels, widgets and control borders aligned with editor background and unified accent hues

### Fixed
- Pruned dominated/duplicated rules from the compiled themes (dead `constant.other.color`, leftover `markup.changed.git_gutter`, unused `support.orther` typo); 35 lines of dead rules removed per variant
- `new` operator now renders orange in C#, PHP and Java instead of falling back to the generic operator/keyword color
- `cyanBase` dead palette token removed; unused tokens (`fgMuted`, `bgScrollbar`, `pinkBase`) explicitly annotated in the source of truth

### Docs
- README variant typography description corrected
- Comments synced with the palette audit state in `src/theme-config.js`

Release candidate — feedback welcome before the stable v3.0.0.