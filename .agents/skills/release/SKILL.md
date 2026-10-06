---
name: release
description: "Trigger: release, publish version, generate vsix, create GitHub release, bump version, package theme. Run the full funky-theme release pipeline."
license: MIT
metadata:
  author: maxgb23
  version: "1.13"
---

# Release Pipeline (funky-theme)

## Activation Contract

Use when the user asks to release, publish, package a new version, generate a `.vsix`, or create a GitHub release for this theme — VS Code channel, Zed channel (`zed-v*`), or both.

## Channel router (VS Code ↔ Zed)

This repo ships two independent channels from one source of truth (`docs/zed-support-plan.md` §D5/D8):

| Channel | Version file | Changelog | Tag | Distributes via |
|---|---|---|---|---|
| VS Code | `package.json` | `CHANGELOG.md` | `vX.Y.Z` | GitHub Release + vsix → manual Marketplace/Open VSX |
| Zed | `zed/extension.toml` | `zed/CHANGELOG.md` | `zed-vX.Y.Z` (annotated) | Local install (v0.1); Zed registry PR post-v0.1 |

**Route first:** VS Code-only change → VS Code pipeline below. Zed-only change (mapping, `extension.toml`, `build-zed.js`) → Zed channel (§Zed channel release). Shared-source change (`palette`, `colors`) → rebuild BOTH targets, then each channel releases only if ITS artefact changed (`themes/*.json` vs `zed/themes/*.json`); a channel whose artefact is byte-identical neither bumps nor tags (D8). RCs exist only on VS Code and never bump Zed.

**Boundaries are per-channel, never mixed:** first `git fetch --tags`, then
- VS Code boundary: latest tag matching `v[0-9]*` → `git log --oneline $(git describe --tags --match "v[0-9]*" --abbrev=0)..HEAD`
- Zed boundary: latest tag matching `zed-v*` → `git log --oneline $(git describe --tags --match "zed-v*" --abbrev=0)..HEAD`

A `zed-v*` tag is invisible to the VS Code pipeline and vice versa. If no tag matches yet (first release of the channel), the range is the channel's full history — do not borrow the other channel's tags as boundary.

**Changelogs are per-channel:** each work unit writes `[Unreleased]` only in its channel's file (a shared-source change writes both, each describing its artefact's effect). Finalize renames `[Unreleased]` → version only in the releasing channel's file. `verify:vsix` guards the root changelog only.

## Hard Rules

- `src/theme-config.js` is the source of truth. NEVER hand-edit `themes/*.json`; they are build artifacts.
- Never release uncommitted changes: commit first, push, then tag the release on pushed HEAD.
- Conventional Commits only, no AI attribution in commits.
- **`RELEASE_NOTES.md` is a transient scratch file, NEVER versioned:** it exists only to pass the notes to `gh release --notes-file` without shell corruption of backticks. Create it before the release, then **DELETE it after `gh release create` succeeds** (`Remove-Item RELEASE_NOTES.md` on Windows / `rm RELEASE_NOTES.md` on Unix). Never `git add`, commit, or push it; it is covered by `.gitignore` as a safety net.
- **Release notes are written in English** (GitHub facing), regardless of the author's conversation language.
- **Pre-releases (rc/beta/alpha) are ALWAYS GitHub pre-releases**: `gh release create ... --prerelease` — NEVER as latest. If an rc was released as latest, fix with `gh release edit <tag> --prerelease` (never delete the tag).
- **Marketplace/Open VSX accept ONLY stable `major.minor.patch`** and publication is HUMAN work: the agent never uploads, it hands off (step 8).
- **CHANGELOG.md is versioned and ships in the vsix** (`.vscodeignore` allowlists it): `[Unreleased]` accumulates between releases and is renamed `[<version>] - <date>` at release. An empty `[Unreleased]` carries the placeholder `_No changes since the last release._`; the first real entry replaces it.
- **`[Unreleased]` holds ONLY shippable changes, under the standard release categories** (`Added` / `Changed` / `Fixed` / `Docs` / `Removed`). The step 4 rename moves EVERY heading it finds, so a non-category heading (`Planned`, `Roadmap`, `Coming soon`) silently becomes part of the released version section and then reads as that version's history. Forward-looking notices and roadmap items live in the README (its `Roadmap` section) and are referenced from a `Docs` entry, never inlined — including notices about sibling repos like `funky-theme-tui`, which are legitimate `Docs` content. A `[Unreleased]` that still carries a non-category heading after the rename is a defect, not pending work.
- **Package AFTER the changelog is finalized:** `pnpm package` runs only after step 4 renamed `[Unreleased]` → `[<version>]`. Packaging first ships a stale `extension/changelog.md` — the IDE later shows an update whose changelog lacks the release section. Step 6 verifies the packaged changelog contains the new section **and** that the vsix matches its `.vscodeignore` allowlist (`pnpm verify:vsix`) before anything is uploaded.
- **CHANGELOG.md is a permanent, append-only historical record**: once a version section is released, it is never rewritten, deleted, or pruned (it ships in the vsix and documents the project's history); only new `[Unreleased]` entries and the release rename/prepend change the file. **Narrow exception:** content that was never a versioned change may be removed from a released section — a non-category heading swept in by the rename, or content duplicated from the README — but only in a commit that also fixes the rule that let it in, and never to alter the record of what actually shipped.
- **An RC (rc/beta/alpha) NEVER creates a CHANGELOG section**: its content stays in `[Unreleased]` and its notes live only on the GitHub pre-release. The stable that closes the line consolidates the accumulated pre-release content via the Content boundary rule.

## Release Content Format (MANDATORY — notes + changelog)

`CHANGELOG.md` is the SOURCE for `RELEASE_NOTES.md` (transient, GitHub): the notes are derived from the finalized `[<version>]` changelog section, never authored in parallel with it — two independently written copies drift. Only the heading differs: `## v<version> — <title>` on GitHub vs `## [<version>] - <YYYY-MM-DD>` in the changelog. Every release `--notes` MUST follow this exact structure. Do not improvise headings, order, or wording.

```
## v<version> — <Short meaningful title>

<One-sentence summary of the release intent (what changed and for whom).>

### Added
- <bullet describing a new feature/color, with `backticked` keys where relevant>
- (one bullet per added color/key, grouped)

### Changed
- <bullet describing a value refinement or behavior tweak, with `backticked` keys>
- (omit this section entirely if there are no changes)

### Fixed
- <bullet describing a bug fix, if any>
- (omit this section entirely if there are no fixes)

### Docs
- <bullet describing any documentation updates>
- (omit this section entirely if there are no doc changes)
```

**Rules:**
- Title is short and meaningful (describes the theme area touched), NOT the version taxonomic label.
- Headings are always `### Added`, `### Changed`, `### Fixed`, `### Docs` — in that order. Omit a heading (and its bullets) when that category is empty; never emit a heading with `(none)`.
- Bullets are concrete and technical: name the actual `colorKey` and value, or the actual doc/section changed.
- Group related keys in one bullet when they share a purpose (e.g. `editor.wordHighlightBackground`/`...Border`).
- Use backticks around code identifiers (`editor.*` keys, tokens, file paths).
- End with a known-issues or "no issues found" line only when relevant: `No issues found after extended testing.`
- No emojis. No AI attribution. Match the version number exactly.
- Release notes are DERIVED from the finalized changelog section (see section intro), so their bullets and order are identical by construction — only the heading format differs. Never re-draft the notes independently of the changelog.
- **Content boundary** (`<boundary>`): when the release is the stable that closes a pre-release line (rc/beta/alpha), the boundary is the last STABLE tag and bullets are assembled from the accumulated pre-release bodies (`gh release view <tag> --json body`) plus `git log <last-stable>..HEAD` — users who never tried the RCs see the whole line as new. Otherwise the boundary is the last tag.

## Decision Gates

| Situation | Action |
|---|---|
| Changes only in `themes/*.json` (prototype) | Backport to `src/theme-config.js` + palette token first |
| User asks to skip commit/push | STOP; release requires pushed commits |
| Version carries `-rc.x` / `-beta` / `-alpha` suffix | GitHub release MUST use `--prerelease`; SKIP marketplace publication |
| Stable bump (no prerelease suffix) | After the GitHub release, hand off marketplace publication to the human (step 8) |

## Execution Steps

1. Ensure working tree changes are backported to `src/theme-config.js` (use palette tokens for repeated colors).
2. **Determine version bump**
   - **Release boundary:** the cutoff is ALWAYS the latest published tag. Do not trust local tags alone (`git tag` can be stale): first `git fetch --tags`, compare with `git ls-remote --tags origin`, and use the most recent tag from both. Run `git log --oneline <last-tag>..HEAD` BEFORE deciding the bump and verifying that the accumulated `[Unreleased]` covers the full range — the template does not skip this step. Everything in the range goes into the release, including merges/PRs from previous sessions that were never released.
   - Read `package.json` and determine the bump type:

     | Change type | Bump | Example |
     |-------------|------|---------|
     | New theme keys/scopes (previously undefined → VS Code default) | MINOR | add `textBlockQuote.*`, `toolbar.hoverBackground`; 2.5.1 → 2.6.0 |
     | Only subtle value tweaks on existing keys (same color family) | PATCH | refine highlight alphas; 2.5.1 → 2.5.2 |
     | Breaking visual change to the overall style | MAJOR | 2.5.1 → 3.0.0 |

   - If the notes will have an `### Added` section, the bump cannot be PATCH: new keys change behavior that previously used VS Code defaults.
   - For themes, "breaking" = identity or semantic change (hue-family overhaul, color-meaning reassignment, contrast-philosophy change): if users must re-learn the theme, it is MAJOR. Diff size alone never upgrades PATCH.
   - Ask the user to confirm if ambiguous.
3. Bump `version` in `package.json` per the determined bump.
4. **Finalize CHANGELOG.md BEFORE packaging** by renaming `## [Unreleased]` → `## [<version>] - <YYYY-MM-DD>`, then prepend a fresh empty `## [Unreleased]` with its placeholder (the placeholder is replaced by the first real entry; if a release happens while it still sits there — e.g. an empty section — remove it during finalize so it never leaks into the released section). **The renamed block IS the release content — consume it, never rewrite it.** Entries accumulate there per work unit (see `AGENTS.md`); this step is a rename plus a completeness check, not a reconstruction. Verify with `git log --oneline <boundary>..HEAD` that every shipped work unit has a corresponding entry, and if one is missing, ADD IT HERE (while the block is still `[Unreleased]`) rather than shipping a changelog that omits shipped work — do not reconstruct the section from commit subjects, because a commit subject preserves the *what* and loses the *why*. For rc/beta/alpha releases, SKIP this step entirely — an RC never creates a changelog section (Hard Rule); its `[Unreleased]` remains in the packaged changelog.
5. Canonical flow: `pnpm install && pnpm build && pnpm package`. Minimum viable: `pnpm run package` (builds all 5 variants into `/themes`, then packs `funky-theme-vscode-<ver>.vsix`). Runs AFTER step 4 so the packaged `extension/changelog.md` carries the finalized section — packaging before finalize ships a stale changelog inside the vsix.
6. Verify output: build logs list 5 variants; spot-check generated JSONs (e.g. changed keys); then run **`pnpm verify:vsix`** (wraps `node scripts/verify-vsix.js`, auto-detects `funky-theme-vscode-<version>.vsix` from `package.json`). It asserts BOTH halves, and a FAIL on either means fix the cause and re-run `pnpm package` + `pnpm verify:vsix` — never upload a vsix that fails:
   - **Entry set:** the vsix contains EXACTLY the `.vscodeignore` allowlist. It parses `!`-entries, expands `*.json`-style globs against the filesystem, maps vsce's asset renames (`README.md`→`readme.md`, `CHANGELOG.md`→`changelog.md`, `LICENSE`→`LICENSE.txt`) and fails on any missing OR extra entry. A FAIL means the package leaks files (an added allowlist entry or a stray file) or misses expected assets.
   - **Changelog content:** it reads `extension/changelog.md` out of the vsix and fails unless the newest RELEASED section equals `package.json`'s version and every `###` heading is a release category. This is what catches a stale vsix carrying the previous release's notes, and a non-category heading (`### Planned`) that the step 4 rename would have swept into the released section. Pass the vsix path explicitly (`node scripts/verify-vsix.js <path>`) when the on-disk filename does not match the current version.
7. Commit with conventional messages (`feat(theme): ...`, `chore: ...`) — include the finalized CHANGELOG.md (step 4) in the same release commit — then `git push`.
8. Write the notes to `RELEASE_NOTES.md` per the **Release Content Format**, then create the release:
   ```bash
   gh release create v<version> funky-theme-vscode-<version>.vsix \
     --title "v<version>" --notes-file RELEASE_NOTES.md [--prerelease]
   ```
   > `--prerelease` is MANDATORY when the version carries an rc/beta/alpha suffix (Hard Rule). Never publish a pre-release as latest.
   > Use `--notes-file`, never inline `--notes`: both Windows and Unix shells corrupt Markdown backticks (PowerShell `` `t ``/`` `n ``; bash command substitution). The file bypasses the shell, so notes are byte-identical on any OS. Write `RELEASE_NOTES.md` raw (`Set-Content -Raw` on PowerShell) so backticks survive verbatim.
   > After the release is created, **delete the scratch file** (`Remove-Item RELEASE_NOTES.md` on Windows / `rm RELEASE_NOTES.md` on Unix). It must never be committed or pushed.
9. **Marketplace publication is HUMAN work** — the agent does NOT upload (stable releases only). For rc/beta/alpha, SKIP this step entirely — no handoff message, nothing to upload. After a stable GitHub release, hand off with this message:
   > Release published. Next step for you: manually upload the packaged vsix to VS Code Marketplace and Open VSX.
   - VS Code Marketplace: marketplace.visualstudio.com/manage → MaxGB23 → drag the vsix (Microsoft login, zero PAT). Never bare `vsce publish` (auto-bumps and creates a commit+tag).
   - Open VSX: `npx ovsx publish funky-theme-vscode-<version>.vsix -p <OPEN_VSX_TOKEN>` (namespace MaxGB23 + access token) — channel for VS Code-compatible editors: VSCodium, Google Antigravity, Cursor, Windsurf/Devin Desktop, AWS Kiro, Gitpod, Eclipse Theia.
10. Report the release URL, the changelog commit, and the commit hashes included.

## Zed channel release

1. Bump `version` in `zed/extension.toml` if needed (own semver line, starts at `0.1.0`; Zed has no RCs).
2. `node scripts/build-zed.js` — must print 3 variants + validation PASS.
3. Finalize `zed/CHANGELOG.md`: rename `## [Unreleased]` → `## [<version>]`, prepend a fresh empty `## [Unreleased]`. Consume the block, never rewrite it.
4. Commit (conventional, English) + push; tag annotated `zed-v<version>` on pushed HEAD recording the coetaneous VS Code version in the tag message; push the tag. **No GitHub Release for `zed-v*`** (decided Q4) — source of truth is the tag + `zed/CHANGELOG.md`.
5. Distribution for v0.1 = local install (README). Registry PRs are a separate post-v0.1 flow (human first PR, then Actions) and are never part of this skill.

## Output Contract

Return: release URL, tag, attached vsix name/size, commits shipped, changelog commit, and (for stable releases) confirmation the marketplace handoff message was delivered.

## References

- `docs/how-to-modify-theme.md` — theme modification guide (source of truth workflow)
