# AGENTS.md

## Project
- `docs/how-to-modify-theme.md` — Guía de mantenimiento del tema: arquitectura, workflow de modificación (source of truth `src/theme-config.js` + build), y cómo agregar tokens de paleta. Consultar ANTES de tocar colores.

## Theme Testing Workflow (MaxGB23)
Flujo de testeo manual ANTES de tocar el Source of Truth:

1. **Testeo directo en JSON:** editar `themes/*.json` directamente y probar la variante en el editor (VS Code con reload window o F5). La aprobación visual es el criterio de aceptación.
2. **Propagación tras aprobación:** SOLO después de aprobar visualmente, aplicar el cambio en `src/theme-config.js` y compilar con `node scripts/build.js` para que las 5 variantes hereden el cambio.
3. **Alerta:** ediciones directas al JSON que no se propaguen a `src/theme-config.js` se PIERDEN en la próxima compilación. El JSON es un artefacto compilado; la edición directa es únicamente para testear.

### Commits
- Conventional commits siempre en inglés.
- Un commit = una work unit (behavior, fix o docs). Nunca separar por tipo de archivo. Consultar la skill `work-unit-commits` para planificar los commits.
- **🚨 NUNCA commitear sin confirmar:** aunque el trabajo esté terminado y verificado, no asumir permiso — preguntar "¿commiteo?" salvo autorización explícita de la sesión. Aplica a ODD y a trabajo por fases: el usuario puede querer revisar el diff, reordenar o trabajar en paralelo. Una pregunta de 5 segundos evita revertir commits no deseados.

## Source of Truth: Convenciones (src/theme-config.js)

- **Orden por keys/scopes relacionados:** al editar `src/theme-config.js`, agrupa las keys de `colors` y los `tokenColors` por zona semántica (Editor, Git, Menús/Listas, Links, Symbol Icons, etc.) y coloca cada nueva propiedad **dentro de su sección correspondiente**, sin salpicar keys sueltas al final. Si el tema ya usa scopes/keys vecinos para un área determinada, coloca la nueva key/scope junto a ellos.
- **No hardcodear colores que se repitan ≥2 veces:** cualquier valor de color usado en más de una key/scope debe resolverse a un token de la paleta (`const palette` en `src/theme-config.js`). Solo se dejan literales los valores de un solo uso o los colores con alpha (formato `#rrggbbaa`), que por su naturaleza de mezcla de opacidad no se resuelven a tokens de paleta.
- **Hex siempre en minúsculas:** todos los valores de color en `src/theme-config.js` se escriben en minúsculas; al final de cada cambio al source of truth, normaliza cualquier letra mayúscula en hex (el caso no afecta la salida visual en VS Code).
- **Cuando lleguen propiedades nuevas** (keys o scopes que aún no existen en el tema), se crea su sección/agrupación correspondiente manteniendo la coherencia con la zona semántica que les toca, en lugar de dejarlas sueltas.
- **Docs van con el cambio (sincronizadas):** al modificar `src/theme-config.js` (colores, tokens o zonas nuevas), actualiza en el MISMO commit la guía `docs/how-to-modify-theme.md` si describe lo que cambió — p.ej. nuevos tokens en la tabla de paleta, o nuevos patrones/escenarios. No dejes la guía desactualizada respecto al source of truth. El `README.md` es una excepción: es la guía de usuario final y SOLO se toca si cambia algo del producto visible (variantes, filosofía, instalación), no por detalles internos de colores UI del workspace.
- **La guía es concisa y general, NO una bitácora:** `docs/how-to-modify-theme.md` documenta arquitectura, workflow y patrones reutilizables — no el detalle de cada cambio concreto. No añadir secciones largas por cada feature nuevo (p.ej. "así funciona tal key" con listados de valores): si el color es nuevo, basta el token en la paleta con comentario en `src/theme-config.js` (el source of truth ya lo documenta). Solo tocar la guía para añadir un PATRÓN general nuevo (mapa nuevo en build.js, familia de colores nueva, workflow nuevo).

## Versioning & Releases (estrategia acordada)

- **🚨 NUNCA lanzar un release de memoria:** releer siempre `.agents/skills/release/SKILL.md` y no asumir nada — verificar cada paso contra la skill y el estado real del repo.
- **SemVer estricto:** consultar la skill para más detalles.
- **NO borrar releases/tags anteriores**, aunque el repo tenga pocas visitas. Mantienen trazabilidad.
- **Flujo RC → estable (estrategia por defecto):** cada cambio se saca primero como pre-release `-rc.x` en GitHub (la subida a Marketplace/Open VSX es trabajo humano y SOLO acepta estables — los RCs no se suben a markets). Cuando el lote esté confirmado, se publica el estable y se sube el vsix a los markets UNA vez. Así las subidas manuales se reducen a una por lote estable.
- **RCs por lote, no por commit:** agrupar varios work units coherentes en un solo `-rc.x`; NO publicar un rc por micro-commit (satura el feed de releases y multiplica los tags).
- **El estable consolida la línea:** la release estable cierra los RCs y documenta TODO el contenido de la línea (Content boundary de la skill), no solo el delta del último rc.
- Respecto al pipeline de la skill `.agents/skills/release/SKILL.md`, confirmar siempre el bump (MAJOR/MINOR/PATCH) con el usuario antes de publicar.

## Project Skills
- `.agents/skills/release/SKILL.md` — Full release pipeline: version bump, build 5 variants, vsix packaging with pnpm, GitHub release with attached vsix. Trigger on "release", "publicar versión", "generar vsix".