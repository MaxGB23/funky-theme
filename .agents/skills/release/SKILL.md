---
name: release
description: "Trigger: release, publicar versión, generar vsix, crear GitHub release, bump version, package theme. Run the full funky-theme release pipeline."
license: MIT
metadata:
  author: maxgb23
  version: "1.5"
---

# Release Pipeline (funky-theme)

## Activation Contract

Use when the user asks to release, publish, package a new version, generate a `.vsix`, or create a GitHub release for this theme.

## Hard Rules

- `src/theme-config.js` is the source of truth. NEVER hand-edit `themes/*.json`; they are build artifacts.
- Never release uncommitted changes: commit first, push, then tag the release on pushed HEAD.
- Conventional Commits only, no AI attribution in commits.
- **`RELEASE_NOTES.md` is a transient scratch file, NEVER versioned:** it exists only to pass the notes to `gh release --notes-file` without shell corruption of backticks. Create it before the release, then **DELETE it after `gh release create` succeeds** (`Remove-Item RELEASE_NOTES.md` on Windows / `rm RELEASE_NOTES.md` on Unix). Never `git add`, commit, or push it; it is covered by `.gitignore` as a safety net.
- **Release notes are written in English** (GitHub facing), regardless of the author's conversation language.
- **Pre-releases (rc/beta/alpha) are ALWAYS GitHub pre-releases**: `gh release create ... --prerelease` — NEVER as latest. If an rc was released as latest, fix with `gh release edit <tag> --prerelease` (never delete the tag).
- **Marketplace/Open VSX accept ONLY stable `major.minor.patch`** and publication is HUMAN work: the agent never uploads, it hands off (step 8).
- **CHANGELOG.md is versioned and ships in the vsix** (`.vscodeignore` allowlists it): `[Unreleased]` accumulates between releases and is renamed `[<version>] - <date>` at release.

## Release Content Format (MANDATORY — notes + changelog)

`RELEASE_NOTES.md` (transient, GitHub) and `CHANGELOG.md` (versioned, ships in the vsix) share the SAME grouped content derived from `git log <último-tag>..HEAD` — keep their bullets identical. Only the heading differs: `## v<version> — <title>` on GitHub vs `## [<version>] - <YYYY-MM-DD>` in the changelog. Every release `--notes` MUST follow this exact structure. Do not improvise headings, order, or wording.

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
- Release notes and CHANGELOG share identical bullets and order (see section intro); only the heading format differs.

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
   - **Release boundary:** el corte SIEMPRE es el tag publicado más reciente. NO confíes solo en los tags locales (`git tag` los puede tener desactualizados): primero `git fetch --tags`, compara con `git ls-remote --tags origin`, y usa el tag más reciente de ambos. Enumerar `git log --oneline <último-tag>..HEAD` ANTES de decidir el bump y redactar las notas — la plantilla no elimina este paso. Todo lo que esté en el rango entra en la release, incluidos merges/PRs de sesiones anteriores nunca liberados.
   - Leer `package.json` y determinar el tipo de bump:

     | Change type | Bump | Example |
     |-------------|------|---------|
     | New theme keys/scopes (previously undefined → VS Code default) | MINOR | add `textBlockQuote.*`, `toolbar.hoverBackground`; 2.5.1 → 2.6.0 |
     | Only subtle value tweaks on existing keys (same color family) | PATCH | refine highlight alphas; 2.5.1 → 2.5.2 |
     | Breaking visual change to the overall style | MAJOR | 2.5.1 → 3.0.0 |

   - If the notes will have an `### Added` section, the bump cannot be PATCH: new keys change behavior that previously used VS Code defaults.
   - For themes, "breaking" = identity or semantic change (hue-family overhaul, color-meaning reassignment, contrast-philosophy change): if users must re-learn the theme, it is MAJOR. Diff size alone never upgrades PATCH.
   - Preguntar al usuario para confirmar si es ambiguo.
3. Bump `version` en `package.json` según el bump determinado.
4. Canonical flow: `pnpm install && pnpm build && pnpm package`. Minimum viable: `pnpm run package` (builds all 5 variants into `/themes`, then packs `funky-theme-vscode-<ver>.vsix`).
5. Verify output: build logs list 5 variants; spot-check generated JSONs (e.g. changed keys) before packaging.
6. Commit with conventional messages (`feat(theme): ...`, `chore: ...`) — include the finalized CHANGELOG.md (6a) in the same release commit — then `git push`.
   6a. **Finalize CHANGELOG.md** with the release content (identical bullets to the notes): rename `## [Unreleased]` → `## [<version>] - <YYYY-MM-DD>`, prepend a fresh `## [Unreleased]`, remove the HTML placeholder at the bottom.
7. Write the notes to `RELEASE_NOTES.md` per the **Release Content Format**, then create the release:
   ```bash
   gh release create v<version> funky-theme-vscode-<version>.vsix \
     --title "v<version>" --notes-file RELEASE_NOTES.md [--prerelease]
   ```
   > `--prerelease` is MANDATORY when the version carries an rc/beta/alpha suffix (Hard Rule). Never publish a pre-release as latest.
   > Use `--notes-file`, never inline `--notes`: both Windows and Unix shells corrupt Markdown backticks (PowerShell `` `t ``/`` `n ``; bash command substitution). The file bypasses the shell, so notes are byte-identical on any OS. Write `RELEASE_NOTES.md` raw (`Set-Content -Raw` on PowerShell) so backticks survive verbatim.
   > After the release is created, **delete the scratch file** (`Remove-Item RELEASE_NOTES.md` on Windows / `rm RELEASE_NOTES.md` on Unix). It must never be committed or pushed.
8. **Marketplace publication is HUMAN work — the agent does NOT upload** (stable releases only). For rc/beta/alpha, SKIP this step entirely — no handoff message, nothing to upload. After a stable GitHub release, hand off with this message:
   > Release lanzada. Siguiente paso para ti: sube manualmente el vsix empaquetado al VS Code Marketplace y a Open VSX.
   - VS Code Marketplace: marketplace.visualstudio.com/manage → MaxGB23 → arrastrar el vsix (login Microsoft, cero PAT). Never bare `vsce publish` (auto-bumps and creates a commit+tag).
   - Open VSX: `npx ovsx publish funky-theme-vscode-<version>.vsix -p <OPEN_VSX_TOKEN>` (namespace MaxGB23 + access token) — canal para editores VS Code-compatibles: VSCodium, Google Antigravity, Cursor, Windsurf/Devin Desktop, AWS Kiro, Gitpod, Eclipse Theia.
9. Report the release URL, the changelog commit, and the commit hashes included.

## Output Contract

Return: release URL, tag, attached vsix name/size, commits shipped, changelog commit, and (for stable releases) confirmation the marketplace handoff message was delivered.

## References

- `docs/how-to-modify-theme.md` — theme modification guide (source of truth workflow)
