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
- Un commit = una work unit (behavior, fix o docs). Nunca separar por tipo de archivo. Consultar `~/.config/opencode/skills/work-unit-commits/SKILL.md` para planificar los commits.

## Project Skills
- `skills/release/SKILL.md` — Full release pipeline: version bump, build 4 variants, vsix packaging with pnpm, GitHub release with attached vsix. Trigger on "release", "publicar versión", "generar vsix".