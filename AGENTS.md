# AGENTS.md

## Project
- `docs/how-to-modify-theme.md` — Guía de mantenimiento del tema: arquitectura, workflow de modificación (source of truth `src/theme-config.js` + build), y cómo agregar tokens de paleta. Consultar ANTES de tocar colores.

## Theme Testing Workflow (MaxGB23)
Flujo de testeo manual ANTES de tocar el Source of Truth:

1. **Testeo directo en JSON:** editar `themes/*.json` directamente y probar la variante en el editor (VS Code con reload window o F5). La aprobación visual es el criterio de aceptación.
2. **Propagación tras aprobación:** SOLO después de aprobar visualmente, aplicar el cambio en `src/theme-config.js` y compilar con `node scripts/build.js` para que las 4 variantes hereden el cambio.
3. **Alerta:** ediciones directas al JSON que no se propaguen a `src/theme-config.js` se PIERDEN en la próxima compilación. El JSON es un artefacto compilado; la edición directa es únicamente para testear.

### Commits
- Conventional commits siempre en inglés.
- Un commit = una work unit (behavior, fix o docs). Nunca separar por tipo de archivo. Consultar la skill `work-unit-commits` para planificar los commits.

## Source of Truth: Convenciones (src/theme-config.js)

- **Orden por keys/scopes relacionados:** al editar `src/theme-config.js`, agrupa las keys de `colors` y los `tokenColors` por zona semántica (Editor, Git, Menús/Listas, Links, Symbol Icons, etc.) y coloca cada nueva propiedad **dentro de su sección correspondiente**, sin salpicar keys sueltas al final. Si el tema ya usa scopes/keys vecinos para un área determinada, coloca la nueva key/scope junto a ellos.
- **No hardcodear colores que se repitan ≥2 veces:** cualquier valor de color usado en más de una key/scope debe resolverse a un token de la paleta (`const palette` en `src/theme-config.js`). Solo se dejan literales los valores de un solo uso o los colores con alpha (formato `#rrggbbaa`), que por su naturaleza de mezcla de opacidad no se resuelven a tokens de paleta.
- **Cuando lleguen propiedades nuevas** (keys o scopes que aún no existen en el tema), se crea su sección/agrupación correspondiente manteniendo la coherencia con la zona semántica que les toca, en lugar de dejarlas sueltas.

## Versioning & Releases (estrategia acordada)

- **SemVer estricto:** `MAJOR` solo para un cambio visual rompedor grande; `MINOR` para features/refactors con cambio de comportamiento; `PATCH` para fixes.
- **NO borrar releases/tags anteriores**, aunque el repo tenga pocas visitas. Mantienen trazabilidad.
- **Releases por lote, no por commit:** agrupar varios cambios en un solo vsix cuando haya un grupo coherente. NO publicar un vsix por cada micro-commit (eso satura el feed de releases).
- **Pre-release de GitHub** (`-beta.x` / `-rc.x`) reservado SOLO para cambios de paleta grandes o MAJOR que requieran feedback antes de fijar una versión estable. Para cambios menores no hace falta candidate — release estable directa cuando el lote esté listo.
- Respecto al pipeline de la skill `skills/release/SKILL.md`, confirmar siempre el bump (MAJOR/MINOR/PATCH) con el usuario antes de publicar.

## Project Skills
- `skills/release/SKILL.md` — Full release pipeline: version bump, build 4 variants, vsix packaging with pnpm, GitHub release with attached vsix. Trigger on "release", "publicar versión", "generar vsix".