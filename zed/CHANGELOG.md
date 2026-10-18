# Changelog — Funky Theme for Zed

Independent history of the Zed extension (`zed/extension.toml`). Never merged
into the root VS Code changelog (plan §D5: each channel versions alone).

## [Unreleased]
- Changed the base yellow from `#f6ff98` to `#f7ffa1` in Dark and Italic,
  and to `#e8f09a` in Darker — link text, JSON object keys and Markdown list
  markers shared one yellow that read as harsh, and Darker now dims it to suit
  its deeper background. Dimmed everywhere too: only syntax used to react, so
  warnings and terminal ANSI yellow kept the full-intensity yellow inside the
  same Darker variant.
- Fixed the diagnostic hover popover rendering as a solid yellow block with
  the near-white popover text unreadable on it; errors and hints had the same
  problem in their own colours. Those severities now paint the elevated
  surface as background and keep the status colour as the border, instead of
  falling back to the status colour as an opaque background.

## [0.2.0]
- Added yellow JSON object keys — they no longer fall back to generic white.
- Changed brackets from yellow to blue — easier to tell apart from functions.
- Added white `<>` tag delimiters across markup languages (HTML, JSX/TSX).
  XML excluded — its Zed grammar exposes no tag-specific scope (upstream,
  not themeable).

## [0.1.0] — Initial Zed support
- Added theme family `Funky Theme` (extension id `funky-theme`) with 3 dark
  variants generated from the same `palette` source of truth: `Funky Dark`,
  `Funky Darker`, `Funky Italic` (all `appearance: dark`).
- Local install only: copy `zed/themes/funky-theme.json` into the Zed themes
  folder, or install the `zed/` directory as a dev extension.
  Registry publication comes after v0.1.
- TSX/JSX component tags render light purple (`tag.component`) while
  intrinsic tags stay pink — VS Code parity, verified with Zed's
  highlight inspector.
- Known limitations: no light, high-contrast, or Mix variants; ~15 VS Code
  extension scopes (acejump, sublimelinter, ...) have no Zed equivalent.
