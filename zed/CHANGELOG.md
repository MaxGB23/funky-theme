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
- Changed search match highlights from the flat grey-purple to the purple wash
  VS Code 3.2.0 moved this role to (`#c792ea35`, dimmed to `#c792ea30` in
  Darker) — the old value predated that change and read as a different colour
  family from the rest of the theme.
- Changed the editor and file-tree indent guides to translucent tones (and their
  active/hover variants with them) so they stop competing with the code they sit
  behind; the single column ruler stays solid. Darker keeps its deeper guide
  colours and now carries the same transparencies.
- Fixed the diagnostic hover popover rendering as a solid yellow block with
  the near-white popover text unreadable on it; errors and hints had the same
  problem in their own colours. Every severity now paints the elevated surface
  as background and keeps the status colour as the border, instead of falling
  back to the status colour as an opaque background.
- Fixed Vim's `:!cmd` output block painting the rows it covers with an opaque
  light grey that hid the code underneath; it now uses the panel surface colour
  with the status colour as its outline.
- Fixed merge-conflicted files in the project panel painting pink, the colour
  git-ignored files use; conflicts now carry the theme's conflict orange.
- Fixed named constants rendering in the numeric pink; they now use the same
  near-white as variables, which is what they get in the VS Code theme. Pink
  stays for the values that are pink there (numbers, `true`/`false`,
  `None`/`nil`/`undefined`).
- Changed the 16 terminal ANSI colours to the Funky TUI palette, so the
  terminal matches what the agent CLIs draw: bright green was pink, both blues
  were purple, and black was the terminal background itself, which made black
  text invisible. All 16 slots are now derived from the VS Code colour block
  instead of the theme's own tokens — only bright black used to be derived, so
  any palette change left this channel half-aligned, with one slot updated and
  fifteen left behind.

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
