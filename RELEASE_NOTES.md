## v3.0.0-rc.2 — Semantic token split and focus polish

Second release candidate: separates declaration modifiers and structural keywords into their own palette families, makes the find match stand out by border alone, and adds a visible keyboard-focus ring on the status bar.

### Added
- `storage.modifier` in lavender (`purpleSoft` `#afadff`) — `public`, `static`, `final`, `abstract`, `readonly` no longer share the declaration purple
- Generic `keyword.other` in coral (`orangeSoft` `#ffb488`) — `extends`, `package`, Java `import`, Rust `mod`/`pub`; specific sub-scopes (`keyword.other.new`/`template`/`special-method`/`unit`) keep their previous colors
- `statusBar.focusBorder` — keyboard focus on the status bar (`#211e2b`, `#121018` on Darker, `#8c8effd2` on High Contrast)
- `extensionIcon.starForeground` — marketplace star ratings now tinted (excluded on High Contrast)

### Changed
- `editor.findMatchBackground` is now transparent; the matched word is distinguished by its existing `#a599efff` border (High Contrast keeps a solid background `#a599efff`)
- `extensionIcon.starForeground` refined to the existing cursor yellow `#ffde25` (`yellowVibrant`) for stronger icon presence
- `orangeSoft` tweaked to `#ffb488` for the `keyword.other` role
- `yellowLight` refined to `#fff9b7`
- `orangeAccent` refined to `#ffcc81` and `button.secondaryHoverBackground` to `#3f3c4f`

### Docs
- `docs/how-to-modify-theme.md` — strategy table now includes **Modificador** (lavender `#afadff`) and **Auxiliar** (coral `#ffb488`) roles and documents both as deliberate exceptions from the purple family

No issues found after extended testing.