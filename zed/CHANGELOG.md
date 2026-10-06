# Changelog — Funky Theme for Zed

Independent history of the Zed extension (`zed/extension.toml`). Never merged
into the root VS Code changelog (plan §D5: each channel versions alone).

## [Unreleased]

## [0.1.0] — Initial Zed support
- Added theme family `Funky Theme` with 3 dark variants generated from the
  same `palette` source of truth: `Funky Dark`, `Funky Darker`, `Funky Italic`.
- Local install only (copy `zed/themes/funky-theme.json` or dev extension).
  Registry publication comes after v0.1.
- Known limitations: no light, high-contrast, or Mix variants; ~15 VS Code
  extension scopes (acejump, sublimelinter, ...) have no Zed equivalent.
