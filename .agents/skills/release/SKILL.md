---
name: release
description: "Trigger: release, publicar versión, generar vsix, crear GitHub release, bump version, package theme. Run the full funky-theme release pipeline."
license: MIT
metadata:
  author: maxgb23
  version: "1.0"
---

# Release Pipeline (funky-theme)

## Activation Contract

Use when the user asks to release, publish, package a new version, generate a `.vsix`, or create a GitHub release for this theme.

## Hard Rules

- `src/theme-config.js` is the source of truth. NEVER hand-edit `themes/*.json`; they are build artifacts.
- Never release uncommitted changes: commit first, push, then tag the release on pushed HEAD.
- Conventional Commits only, no AI attribution in commits.
- Confirm the version bump number with the user if ambiguous (patch/minor/major).
- **Release notes are written in English** (GitHub facing), regardless of the author's conversation language.

## Release Notes Format (MANDATORY)

Every release `--notes` MUST follow this exact structure. Do not improvise headings, order, or wording.

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

## Decision Gates

| Situation | Action |
|---|---|
| Changes only in `themes/*.json` (prototype) | Backport to `src/theme-config.js` + palette token first |
| User asks to skip commit/push | STOP; release requires pushed commits |

## Execution Steps

1. Ensure working tree changes are backported to `src/theme-config.js` (use palette tokens for repeated colors).
2. **Determine version bump**
   - **Release boundary:** el corte SIEMPRE es el último tag (`git tag --sort=-creatordate | Select-Object -First 1`). Enumerar `git log --oneline <último-tag>..HEAD` ANTES de decidir el bump y redactar las notas — la plantilla no elimina este paso. Todo lo que esté en el rango entra en la release, incluidos merges/PRs de sesiones anteriores nunca liberados.
   - Leer `package.json` y determinar el tipo de bump:

     | Change type | Bump | Example |
     |-------------|------|---------|
     | New feature | MINOR | 2.5.1 → 2.6.0 |
     | Breaking change | MAJOR | 2.5.1 → 3.0.0 |
     | Bug fix | PATCH | 2.5.1 → 2.5.2 |

   - Preguntar al usuario para confirmar si es ambiguo.
3. Bump `version` en `package.json` según el bump determinado.
4. Canonical flow: `pnpm install && pnpm build && pnpm package`. Minimum viable: `pnpm run package` (builds all 4 variants into `/themes`, then packs `funky-theme-vscode-<ver>.vsix`).
5. Verify output: build logs list 4 variants; spot-check generated JSONs (e.g. changed keys) before packaging.
6. Commit with conventional messages (`feat(theme): ...`, `chore: ...`), then `git push`.
7. Create the release with the vsix attached, using the **Release Notes Format** above:
   ```bash
   gh release create v<version> funky-theme-vscode-<version>.vsix \
     --title "v<version>" --notes "<notes per the Release Notes Format>"
   ```
8. Report the release URL and the commit hashes included.

## Output Contract

Return: release URL, tag, attached vsix name/size, commits shipped, and any known issues documented in the notes.

## References

- `docs/how-to-modify-theme.md` — theme modification guide (source of truth workflow)
