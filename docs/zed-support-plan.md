# Plan de Soporte a Zed — Funky Theme

> **Estado:** v2 — **APROBADO 2026-10-06**
> **Fecha:** 2026-10-06
> **Objetivo:** primera release pública de soporte inicial para Zed en ≤ 2 días
> **Bloqueante:** este documento requiere aprobación antes de implementar nada
>
> **Rev. v1:** aplica la revisión de coherencia del 2026-10-06 — doble carril de releases
> (VS Code ↔ Zed independientes, changelogs y boundaries separados), recuento corregido,
> citas y aceptación condicionada. Verificada contra `zed.dev/docs` (publishing, license,
> updating) y contra el repo (`release` skill v1.12, `verify-vsix.js`, `.vscodeignore`).
>
> **Rev. v2:** Q1/Q2/Q4/Q5 decididas (ID `funky-theme`; HC y Mix fuera de Zed; sin release ligera
> en v0.1). Alcance Zed v0.1 = 3 variantes (Dark, Darker, Italic). Mecánica de llenado de
> changelogs en §7.5.

---

## 1. Resumen ejecutivo

Funky Theme se publica hoy solo en VS Code (Marketplace + Open VSX, subida manual). Este plan propone generar, **desde el mismo source of truth**, los temas para Zed como una extensión separada publicada primero por instalación manual y después en el registro oficial de extensiones de Zed.

Decisiones centrales (detalladas en §4):

| # | Decisión | En una frase |
|---|----------|--------------|
| D1 | Mismo repositorio | `zed/` como subdirectorio; el `.vscodeignore` deny-all ya lo excluye del vsix |
| D2 | Config separado `src/zed-config.js` | Composición sobre monolito: importa `palette`, aísla la lógica Zed |
| D3 | Transform de Darker reutilizado | El mismo mecanismo `darkerBackgrounds` (mayoritariamente keyed por token) se aplica al subset Zed como `zedDarkerBackgrounds` |
| D4 | Mapping curado a mano | El importer oficial de Zed usa *ranked matching* que aplana los tiers de la paleta |
| D5 | Versionado y changelog independientes | Zed arranca en `0.1.0` con `zed/CHANGELOG.md` propio; no hereda `3.x` ni el CHANGELOG raíz de VS Code |
| D6 | Distribución por fases | v0.1 = instalación local (carpeta `themes/` o dev extension); registro Zed después |
| D7 | Automatización de registry PRs | GitHub Actions con script `gh` propio tras un primer PR manual humano; agente local con `gh` descartado |
| D8 | Cadence simétrica por artefacto | Cada canal releasea solo si SU artefacto cambió; cambio de fuente compartida rebuilda ambos pero nunca fuerza bump cruzado |
| D9 | Alcance v0.1 | 3 variantes (Dark, Darker, Italic); HC y Mix sin soporte en Zed; verificación Dark/Darker primero |

---

## 2. Contexto

- **Hoy:** 5 variantes VS Code (`src/theme-config.js` → `scripts/build.js` → `themes/*.json`), release vía GitHub Release + vsix; subida a Marketplace y Open VSX **manual** (definido en la skill `release`).
- **Decidido en sesión:** Dark y Darker son las variantes estrella; el TUI vive en repo aparte **porque una terminal es otro mundo** (sin scopes/tokens, comunidad distinta, orientada a agentes IA, paleta puede derivar). Zed, en cambio, **es un editor con scopes** — es el mismo theme compilado a otro target, así que la paleta **no** deriva.
- **Roadmap:** README `Roadmap` ya declara "Zed support — planned, no work started yet".
- **Plazo:** primera release de soporte inicial en ≤ 2 días.

---

## 3. Hallazgos de investigación (con fuentes)

### 3.1 Cómo funciona un tema en Zed

- Estructura: **theme family** (`name`, `author`, `themes[]`), cada theme con `appearance` (`light|dark`) y `style`. Schema: <https://zed.dev/schema/themes/v0.2.0.json>. Docs: <https://zed.dev/docs/extensions/themes>.
- `style` contiene ~143 claves UI planas (`editor.background`, `status_bar.background`, `version_control.added`, `terminal.ansi.*`, …) + `syntax` (mapa de tokens) + `players` (cursor/selección) + `accents`.
- **Cursor y selección NO son claves top-level:** viven en `players[0].cursor` / `players[0].selection` / `players[0].background` (verificado en el tema built-in `assets/themes/one/one.json`).
- **Resolución de sintaxis = prefix matching jerárquico** (verificado en `crates/syntax_theme/src/syntax_theme.rs`, función `highlight_id`): para la captura del grammar `keyword.control.import`, Zed usa la clave más larga definida que sea prefijo con punto — `keyword.control.import` › `keyword.control` › `keyword`. **El tiering de la paleta se preserva** si definimos ambas claves.
- Estilos por token: `font_style` (`normal|italic|oblique`) + `font_weight` (100–900). El built-in One Dark usa `font_weight: 700` en `emphasis.strong`. **Las variantes Italic/Mix se mapean directo.**
- Semantic tokens de LSP existen pero vienen **`off` por defecto** (<https://zed.dev/docs/semantic-tokens>). Irrelevante aquí: nuestro theme tiene **0 keys `semanticTokenColors`** (verificado).
- Instalación local: `~/.config/zed/themes` (macOS/Linux) / `%USERPROFILE%\AppData\Roaming\Zed\themes\` (Windows) — <https://zed.dev/docs/themes>. Dev extension: paleta → `zed: install dev extension` → seleccionar el directorio con `extension.toml`.

### 3.2 Convertidores existentes (2026)

| Herramienta | Qué es | Limitación |
|-------------|--------|------------|
| `theme_importer` (oficial, `crates/theme_importer` en el repo de Zed) | CLI Rust VS Code → Zed | Exige toolchain Rust + clonar Zed; friction reconocido en issue [#7111](https://github.com/zed-industries/zed/issues/7111) |
| [alanisme/vscode-themes-for-zed](https://github.com/alanisme/vscode-themes-for-zed) | Pipeline TS que porta los 19 themes built-in de VS Code; **extensión publicada en el registry** | Referencia más seria; usa matching por prefijo sobre TextMate y admite sus propias "known limitations" (TextMate vs Tree-sitter, 500 vs ~100 keys) |
| `enBonnet/migrazed` | Guía de migración + scripts | Didáctico |
| VS Code ext `degreat.theme-to-zed` | Envuelve `theme_importer` | Sigue requiriendo el binario Rust |

**Conclusión:** no existe un adaptador runtime — toda conversión es build-time. Ninguno respetaba la identidad de un theme deliberadamente tiered como el nuestro, así que **la conversión será propia** (D4).

- **Theme Builder oficial** (<https://zed.dev/theme-builder>, blog Feb 2026): editor visual con preview Tree-sitter real; **importa un JSON existente** y exporta overrides o archivo de extensión. Servirá para pulir el mapping (fase post-v0.1).

### 3.3 Vocabulario real medido

| Fuente | Claves UI style | Tokens syntax |
|--------|-----------------|---------------|
| Schema publicado `v0.2.0` (35.233 bytes) | ~100 declaradas | — |
| Built-in `one.json` de Zed | **141** | **46** |
| Tema portado `dark-modern.json` de alanisme | **171** | **49** |
| `theme_importer` (`ZedSyntaxToken` enum) | — | 40 (atrasado) |
| Nuestro source | 210 (`colors`) | 97 scopes (`tokenColors`) |

**Hallazgo importante:** el schema publicado **está atrasado respecto al renderer** — no contiene `version_control.*`, `search.active_match_background`, `editor.hover_line_number`, `editor.diff_hunk.*`, `minimap.*`, `selector`, `namespace`, `diff.plus/minus`, pero los temas built-in de Zed los usan y funcionan (schema sin `additionalProperties: false` → no rechaza claves extra). **Regla de validación: probar cargando en Zed, no solo contra el schema.**

### 3.4 Diferencias estructurales VS Code ↔ Zed (impacto en nuestro theme)

Nuestro source: **54 tokens de paleta, 210 claves `colors`, 97 reglas `tokenColors`** (medido).

| Dato | Detalle | Impacto |
|------|---------|---------|
| UI: 210 → ~143 claves Zed | Muchos→uno; keys VS Code sin destino se descartan; keys Zed sin fuente usan defaults de Zed | Mapeo manual de ~60–80 claves UI relevantes |
| Sintaxis: 97 reglas → ~49 tokens | Prefix matching preserva jerarquía (`keyword` + `keyword.control` coexisten) | Tiering conservado ✅ |
| **~15 reglas sin equivalente** | `acejump.*` (4), `sublimelinter.*` (3), `brackethighlighter.*` (3), `*.find-in-files` (2), `invalid.*` (3) — scopes de extensiones VS Code | Se descartan sin regresión para nadie |
| **`*.git_gutter` (5) NO muere** | → `version_control.added/deleted/modified/ignored` + status colors (`created`, `deleted`, …) | Mapeo explícito ✅ |
| **Selectores stack** (`meta.function entity.name.function`, `text.html.markdown markup.raw.inline`, …) | Zed colorea la **captura simple**, no el stack TextMate | Moot en v0.1: Mix está fuera de alcance (Q5). Si Mix vuelve algún día, la decisión registrada es descartar la distinción definición-vs-uso y documentarlo |
| Bracket colorization nativa (`editorBracketHighlight.*`) | Sin clave equivalente directa; Zed tiene `accents[]` (colores cíclicos para rainbow brackets/indent) | Mapear niveles 1–3 a `accents` |
| HC (`hc-black`, `contrastBorder`, …) | Zed solo conoce `light|dark`; no existe modelo HC de VS Code | HC fuera de alcance en Zed (Q2); documentar la ausencia en el README |
| Terminal ANSI | Zed tiene los 16 + 8 `dim_*` + `bright_foreground/dim_foreground` | 1:1 para nuestros 16; `dim_*` opcional (omitir = default) |

**Recuento v1 (corrige la estimación previa de 22 descartadas):** 15 reglas sin equivalente
descartadas + 5 `git_gutter` mapeadas = 20. La estimación anterior contaba 22 por un conteo
grueso de `git_gutter` (6) e `invalid.*` (4); el recount da 5 y 3 respectivamente.

### 3.5 Registro oficial de extensiones de Zed

Estado del registro (<https://github.com/zed-industries/extensions>, `extensions.toml`): **1.569 extensiones, 462 con sufijo `-theme`**; sin coincidencias para `funky`, `maxiano` o `maxgb` → **el ID está disponible**.

Reglas verificadas (<https://zed.dev/docs/extensions/publishing/prerequisites>):

- ID: kebab-case, único, indicativo de tema (sufijo `-theme`), **prohibido contener las palabras `zed` o `extension`** → ~~`funky-zed-theme`~~ inválido; candidatos válidos: **`funky-theme`** o `maxiano-theme`.
- Theme extension: **solo themes, nada más**.
- **Licencia obligatoria desde 2025-10-01** (MIT aceptado) y **debe residir dentro del subdirectorio** de la extensión si esta va en subdirectorio (`zed/LICENSE`; symlink permitido, raíz del repo **no** vale) — <https://zed.dev/docs/extensions/publishing/license-requirements>.
- Todo texto visible en inglés.

Proceso (<https://zed.dev/docs/extensions/publishing/publishing-guide>):

- Publicación inicial: fork de `zed-industries/extensions` → submodule (HTTPS, commit en rama) + entrada en `extensions.toml` con **`path = "zed"`** (soporta subdirectorio de monorepo) + `pnpm sort-extensions` + PR.
- **Cada actualización = un PR nuevo**: bump del gitlink del submodule al commit de la nueva versión + `version` en `extensions.toml` (igual a `extension.toml`) — <https://zed.dev/docs/extensions/publishing/updating-and-maintenance>.
- Reglas de PR: **exactamente 1 extensión por PR**, **máx 3 PRs abiertos**, responder en **3 semanas** o cierran el PR.
- CI del registro valida licencia y empaquetado desde `path`.

Automatización existente (verificada):

- [`huacnlee/zed-extension-action`](https://github.com/huacnlee/zed-extension-action) (`@v1`, 39★, actualizado 2026-03-17): en push de tag `v*` abre el PR contra tu fork del registro. Usada internamente por el workflow `extension_bump` de Zed.
- Precedente **gh CLI puro**: [`middle-management/pgfmt` → `zed-extension-bump.yml`](https://github.com/middle-management/pgfmt/blob/main/.github/workflows/zed-extension-bump.yml) — sync del fork, bump con `sed`, gitlink con `git update-index --add --cacheinfo 160000,<SHA>,...`, dedupe de PR vía `gh api .../pulls?head=`, `gh pr create`.
- **Caveat crítico (CLA):** el bot de CLA de Zed **rechaza commits autorados por `github-actions[bot]`** (no puede firmar la CLA). El commit debe ir autorado por una **cuenta humana con CLA firmada** (<https://zed.dev/cla>) mediante PAT. El propio ejemplo de pgfmt resuelve esto con un PAT clásico (`repo` scope) del dueño.

---

## 4. Decisiones y justificación

### D1 — Mismo repositorio (no repo hermano)

**Decisión:** generar y versionar el soporte Zed dentro de este repo, en `zed/`.

**Alternativa descartada:** repo hermano separado (p. ej. `funky-theme-zed`, como `funky-theme-tui`). Como nombre de repo sería válido; como ID de extensión no (ver Q1).

**Justificación:**

1. **`path = "zed"` en `extensions.toml` existe** — el registro de Zed empaqueta solo ese subdirectorio; el "monorepo" es una ruta soportada oficialmente. Mi objeción previa de "repo separado obligatorio" era **incorrecta**.
2. **`.vscodeignore` es deny-all (`**`) + allowlist explícita** (verificado): `zed/` no está allowlisted → queda fuera del vsix **sin tocar nada**. `verify-vsix.js` deriva las entradas esperadas de ese mismo allowlist → el guard de release **no se rompe**.
3. **El source of truth vive aquí.** La tabla de mapeo Zed debe componerse con `palette`; en un repo hermano exigiría duplicar la paleta o builds cross-repo frágiles (la clase exacta de drift que el pipeline actual evita).
4. `funky-theme-tui` es repo aparte **por buena razón** (otro artefacto, otro ecosistema). Zed es *este mismo artefacto* a otro target — la analogía del TUI no aplica.

**Caveat detectado (consecuencia de D1):** por la regla de licencia, `zed/LICENSE` debe existir **dentro** de `zed/` (la raíz no sirve). Recomendación: copia real del MIT en `zed/LICENSE` + check en build que falle si difiere de la raíz (symlink es frágil en Windows).

### D2 — `src/zed-config.js` separado (composición, no monolito)

**Decisión:** no meter `zedMap` en `theme-config.js`. Nuevo archivo:

```js
// src/zed-config.js
const { palette } = require('./theme-config.js');  // única fuente de la paleta
const zedMap = { ... };               // clave Zed → token palette / key colors
const zedDarkerBackgrounds = { ... }; // subset aplicable a keys Zed (ver D3; nombre propio para no colisionar con el de build.js)
module.exports = { zedMap, zedDarkerBackgrounds };
// Sin hcOverrides: HC no tiene soporte en Zed (Q2). Sin perfiles Mix: Mix no tiene soporte en Zed (Q5).
```

**Alternativa descartada:** todo en `theme-config.js`.

**Justificación:** responde a la objeción de monolito con **composición**: `palette` sigue única; lo que cambia es que el *mapeo* (conocimiento de la sintaxis de Zed) se aísla y se revisa en un diff enfocado. Beneficios: cambios Zed no ensucian el diff del source of truth; `build-zed.js` importa solo lo que necesita; si mañana hay otro target (JetBrains), se repite el patrón `*-config.js` importando `palette`.

**Regla de consistencia:** todo valor de `zedMap` **debe** resolver a un token de `palette` o a una key de `colors` — el build **falla** ante referencia inválida (lección de `build.js`: el `darkerBackgrounds` con hex hardcodeado se rompió *en silencio* cuando cambió `bgBase`; aquí ningún typo puede pasar inadvertido).

### D3 — Transform de Darker reutilizado (mismo mecanismo)

**Decisión:** Darker en Zed = correr el **mismo transform** `darkerBackgrounds` (keyed por token de paleta) sobre el subset de claves Zed mapeadas a esos tokens.

**Alternativa descartada:** paleta Darker escrita a mano para Zed.

**Justificación:** Darker **no es una paleta, es una transformación** (`build.js:29-49`, incluyendo
`darkerSyntaxAdjustments`). Manual = duplicar decisiones de color en dos sitios y romper la sincronía
cuando cambie `palette.bgBase`. El transform — mayoritariamente keyed por token, con unos pocos
literales puntuales (`#363143`, `#464254`, `#444156`) que se trasladan tal cual y quedan documentados
en `zed-config.js` — ya demostró seguir a la paleta cuando cambia ("…el transform sigue a los fondos aunque
cambien su valor"). Si este patrón sobrevive el traslado, queda probado que el source único vale la pena.

### D4 — Mapping curado a mano vs. importer oficial

**Decisión:** tabla explícita `zedKey → paletteToken` escrita a mano, documentada por zonas semánticas (igual que `theme-config.js`).

**Alternativas descartadas:** (a) `theme_importer` oficial — usa *ranked matching* de scopes candidatos (`find_best_token_color_match`), que **aplanaría nuestros tiers** (3 cyans, 5 rosas, keyword vs keyword.control) a 2-3 colores: identidad perdida; (b) portar el converter TS de alanisme — mucho código que igualmente heredaría su aplanamiento.

**Justificación:** nuestros tiers existen **precisamente para no aplanarse**. Además, la resolución real de Zed es prefix-based (§3.1), así que un mapping consciente conserva más fidelidad que cualquier ranking genérico. Coste aceptado: mantener la tabla al día — mitigado porque es puro dato declarativo + build con validación (D2).

### D5 — Versionado independiente de Zed

**Decisión:** `zed/extension.toml` arranca en **`0.1.0`**, semver propio, sin heredar `3.x` de VS Code.

**Alternativa descartada:** misma versión en ambos canales.

**Justificación:**

1. **Deriva asimétrica real:** un fix puramente de mapping Zed (colores de `property` mal traducidos) no toca VS Code → exigiría bump "falso" de VS Code. Un fix puramente VS Code (scope `acejump.*`, `sublimelinter.*` — que ni existen en Zed) no merece bump de Zed. Versiones acopladas = o bumps mentirosos o bumps saltados.
2. **Paridad incompleta:** Zed descarta ~15 reglas y es "HC parcial". Un `3.3.0` en Zed promete lo que no entrega.
3. `0.1.0` señala explícitamente "soporte inicial, puede cambiar" — coherente con semver estricto del repo.

**Changelog separado (condición de la independencia):** el historial versionado de Zed vive en
`zed/CHANGELOG.md` (versionado con `extension.toml`), NUNCA en el `CHANGELOG.md` raíz — el step 4 de la
skill `release` renombra TODO `[Unreleased]` a la sección versionada, así que mezclarlos barrería
notas Zed dentro de una versión VS Code y viceversa. El `CHANGELOG.md` raíz sigue siendo solo de la
extensión VS Code (`package.json`): la bootstrap inicial de Zed merece ahí UNA línea `Docs` de referencia,
nada más. `verify-vsix.js` queda intacto (solo mira el vsix, que excluye `zed/`).

Correlación documentada: cada tag `zed-vX.Y.Z` (anotado) indica la versión VS Code de referencia
coetánea; el detalle vive en la sección correspondiente de `zed/CHANGELOG.md`.

### D6 — Distribución por fases

**Fase 1 (v0.1.0, ≤2 días): instalación local, dos mecanismos excluyentes (documentar ambos por separado en el README).**
(a) Copia directa: el usuario copia `zed/themes/funky-theme.json` a `~/.config/zed/themes/` (macOS/Linux) /
`%USERPROFILE%\AppData\Roaming\Zed\themes\` (Windows). (b) Dev extension: `zed: install dev extension`
apuntando al directorio `zed/` (requiere `extension.toml`). El JSON se publica en el repo en ambos casos.

**Fase 2 (post-deadline): registro oficial.** PR de alta + automatización de bumps.

**Justificación:** el review del registro tiene latencia impredecible (días/semanas, 3 semanas de ventana de respuesta) — **no se puede prometer en 2 días**. La instalación local entrega valor el día del deadline. El alta en registro se prepara en paralelo pero **no bloquea** la release.

### D7 — Sí se automatizan los PRs del registry (con `gh` CLI)

**Respuesta directa a la pregunta de releases:** *sí, cada release de Zed requiere un PR* (submodule bump + version bump en `extensions.toml` — §3.5), y *sí, es automatizable* con `gh`.

**Decisión:** workflow de GitHub Actions disparado por tags `zed-v*`, usando un script `gh` CLI propio (modelo pgfmt), **no** un action de terceros.

**Justificación:**

- **Caveat CLA manda:** el PAT debe pertenecer a una cuenta con CLA firmada y el commit se autoriza como esa cuenta (nunca `github-actions[bot]`). Esto es igual en acción de terceros o script propio — pero con script propio el token queda bajo nuestro control y sin dependencia de un action de 39★.
- Ventajas del script propio: dedupe de PR abierto (`gh api .../pulls?head=`), sync de fork, sin clonar el submodule completo (gitlink directo), y chequeo previo de "¿cambió `zed/themes/`?" para no abrir PRs vacíos. El diff de referencia se calcula contra el commit del submodule actualmente registrado en `zed-industries/extensions` (no solo contra el tag anterior local), y el dedupe hace force-push sobre el PR existente en vez de abrir uno nuevo (respeta "1 extensión por PR / máx 3 PRs abiertos").

**Sustituto aceptable:** `huacnlee/zed-extension-action@v1` si se prioriza rapidez de entrega sobre control (decisión para el revisor — §11 Q3).

**Ejecutor decidido (sesión 2026-10-06):** GitHub Actions disparado por tags `zed-v*`, DESPUÉS de un
primer PR manual operado por humano (T9) que confirme el camino y el tema de autoría/CLA. Descartado el
agente local con `gh` ambiental: heredaría la identidad completa del usuario sin alcance acotado ni
auditoría, violando el principio de no publicar con identidad prestada; para aprender es peor que el
humano y para repetir es peor que Actions.

### D8 — Cadence simétrica por artefacto (ningún canal arrastra al otro)

- Regla única, igual para ambos canales: **un canal releasea solo si SU artefacto cambió.**
Cambio de fuente compartida (`palette`, `colors`) → rebuild de ambos targets; cada canal compara
su artefacto (`themes/*.json` vs `zed/themes/*.json`) y solo el que difirió releasea.
- Fix solo-Zed (mapping, `extension.toml`) → solo tag `zed-v*` + PR al registro; `package.json` ni se toca.
- Fix solo-VSCode (scopes `acejump.*`/`sublimelinter.*`, que ni existen en Zed) → solo release `v*`; `extension.toml` ni se toca.
- RCs de VS Code: **jamás** bump de Zed (consistente con "RC no se sube a markets"). Zed no tiene RCs.
- Releases solo-docs/chore o de scopes muertos en un canal no abren PR ni bump en el otro.
- Límite duro: **máx 3 PRs abiertos** en el registro → el automation nunca abre un PR si ya hay uno nuestro abierto (dedupe obligatorio).

### D9 — Alcance v0.1: 5 variantes generadas, verificación priorizada

- **Generar** las 5 variantes (coste programático nulo: mismos perfiles de `build.js`).
- **Verificar** en orden: **Dark y Darker** (estrellas, side-by-side completo) → Italic/Mix (tipografía `font_style`/`font_weight`) → HC (UI básica).
- Nombres visibles = **labels de `package.json`** (`Funky Dark`, `Funky Darker`, …), no los `Maxiano *` internos de `theme-config` (en Zed el `name` del JSON **es** lo que ve el usuario; no hay `label` en `package.json` que lo tape).

---

## 5. Arquitectura propuesta

```
funky-theme-vscode/
├── src/
│   ├── theme-config.js        # SOURCE OF TRUTH (sin cambios estructurales)
│   └── zed-config.js          # NUEVO: zedMap + zedDarkerBackgrounds (sin HC ni Mix — Q2/Q5)
├── scripts/
│   ├── build.js               # VS Code (sin cambios)
│   └── build-zed.js           # NUEVO: genera zed/themes/*.json
├── zed/                       # NUEVO: raíz de la extensión Zed (path = "zed" en registry)
│   ├── extension.toml         # id=funky-theme, version=0.1.0, themes=[...]
│   ├── LICENSE                # NUEVO: copia MIT (requisito del registro)
│   ├── CHANGELOG.md             # NUEVO: historial versionado de Zed (ver D5)
│   └── themes/
│       └── funky-theme.json   # GENERADO: family con 3 variantes (Dark, Darker, Italic), todas appearance=dark
├── package.json               # + script "build:zed"
├── .vscodeignore              # SIN CAMBIOS (deny-all ya excluye zed/)
└── scripts/verify-vsix.js     # SIN CAMBIOS
```

Flujo de datos:

```
src/theme-config.js ──► palette ──┬──► scripts/build.js      ──► themes/*.json       ──► vsix (VS Code)
                                  │
                                  └──► src/zed-config.js (zedMap)
                                            │
                                            ▼
                                    scripts/build-zed.js ──► zed/themes/funky-theme.json ──► Zed
```

Detalle de `build-zed.js`:

1. Resuelve `zedMap` → colores reales (**falla** si el token no existe).
2. Aplica perfiles: `ultra-nocturno` (transform D3 vía `zedDarkerBackgrounds`) e `italic` (font rules → `font_style`/`font_weight`). Sin perfil Mix ni high-contrast (Q2/Q5: fuera de alcance).
3. Emite theme family con nombres públicos (D9).
4. Valida: JSON parseable + claves críticas presentes (`editor.background`, `players[0]`, `syntax.keyword`, …).

---

## 6. Plan de implementación (≤ 2 días)

| ID | Tarea | Ruta | Evidencia de done |
|----|-------|------|-------------------|
| T1 | `src/zed-config.js`: `zedMap` UI + syntax + players + accents (referenciando solo tokens existentes) + `zedDarkerBackgrounds` | Delegada (writer) | `require()` OK; sin referencias inválidas |
| T2 | `scripts/build-zed.js` + script `build:zed` en `package.json` | Delegada (writer) | `pnpm build:zed` genera 3 variantes (Dark, Darker, Italic); nombres = labels públicos |
| T3 | `zed/extension.toml` + `zed/LICENSE` (copia MIT + check de drift) + `zed/CHANGELOG.md` (sección `0.1.0`) | Delegada (writer) | Estructura válida; license check verde |
| T4 | Validación funcional: instalar como dev extension en Zed; side-by-side **Dark y Darker** vs VS Code (fondo, selección, cursor, keywords, strings, funciones, terminal, git, markdown, tabs, paleta de comandos) | Directa (verificación visual — decisión humana) | Checklist visual firmado (Dark/Darker side-by-side + Italic tipografía en Windows); notas de drift (en Windows no aplica el apagado macOS de R1) |
| T5 | Ajustes de mapping observados en T4 (iteración única) | Delegada (writer) | Diff revisado, regresión visual OK |
| T6 | Docs sincronizados: README (sección Zed + install a/b + disclaimer sRGB + Roadmap actualizado), `docs/how-to-modify-theme.md` (patrón nuevo: build Zed + `zedMap` — justificado como patrón de build nuevo, AGENTS.md:28), `zed/CHANGELOG.md` (sección `0.1.0`) + UNA línea `Docs` en `CHANGELOG.md` raíz | Directa/delegada | `pnpm verify:vsix` pasa; guía actualizada **en el mismo commit** |
| T7 | Regresión VS Code: `pnpm build && pnpm package && pnpm verify:vsix` | Directa (bounded) | vsix idéntico al previo salvo changelog |
| T8 | Commit work-unit (preguntar antes de commitear/pushear) → push → verificar → tag `zed-v0.1.0` sobre HEAD pusheado → push del tag | Directa | Conventional commit en inglés; tag anotado en pushed HEAD con referencia VS Code |
| T9 | *(post-deadline)* Primer PR manual operado POR HUMANO (no agente, no Actions): fork, CLA firmada, PAT con alcance mínimo, PR inicial (`pnpm sort-extensions`); confirma autoría/CLA en la práctica | Directa (humano) | PR abierto y merged; camino verificado |
| T10 | *(post-deadline, solo tras T9 verde)* Workflow `zed-registry-bump.yml` en Actions (script `gh` propio, dedupe, autoría humana vía `ZED_REGISTRY_PAT`, recordatorio de rotación) | Delegada (writer) | PR de prueba automatizado desde tag `zed-v*` |

Trabajo sustancial → ODD: feature doc `odd/tasks/zed-support.md` creado **antes** del primer write de código.

---

## 7. Estrategia de releases

### 7.1 VS Code — inalterado

Skill `release`: GitHub Release `v3.x.y` + vsix adjunto → subida **manual** a Marketplace y Open VSX (solo stables; RC = pre-release en GitHub y nada más).

### 7.2 Zed — nuevo canal

| Aspecto | Decisión |
|---------|----------|
| Versión | Independiente (`extension.toml`, arranca `0.1.0`) — D5 |
| Tag de trigger | `zed-vX.Y.Z` en este repo (push dispara el workflow; **no** crea GitHub Release) |
| Distribución | Fase 1: install manual (README). Fase 2: registro Zed vía PR |
| GitHub Release | **No** duplica releases por Zed en v0.1 — la página de releases sigue siendo de VS Code + vsix. Fuente de verdad de Zed: tag anotado `zed-v*` + `zed/CHANGELOG.md` (ver Q4 para la opción de release ligera) |
| Cadence | Simétrica por artefacto — D8: cada canal releasea solo si su artefacto cambió |

### 7.3 Flujo automatizado (fase 2)

```
tag zed-v0.2.0 push ──► GitHub Actions:
  1. Verifica que extension.toml version == tag
  2. Build + check: ¿zed/themes/*.json cambió respecto al tag anterior? (si no → salir)
  3. gh repo sync <fork> --source zed-industries/extensions --branch main
  4. Branch <fork>: sed bump de version en extensions.toml
  5. git update-index --add --cacheinfo 160000,<SHA de nuestro repo>,extensions/funky-theme
  6. Commit AUTORIZADO COMO <cuenta humana con CLA> (PAT; jamás github-actions[bot])
  7. gh api pulls?head=... → si ya hay PR abierto, solo force-push (dedupe)
  8. gh pr create --repo zed-industries/extensions
  9. Respuesta a review en < 3 semanas (regla del registro)
```

Precedente verificado para copiar: `middle-management/pgfmt` `zed-extension-bump.yml`.

**Secrets y variables del workflow (decidido 2026-10-06):**
- Secret único `ZED_REGISTRY_PAT`: PAT de la cuenta humana con CLA firmada. Ideal fine-grained limitado
al fork de `zed-industries/extensions` (`Contents: write` + `Pull requests: write`); alternativa
pragmática classic con scope `repo`. `GITHUB_TOKEN` no sirve (cross-repo + autor bot).
- No secretos: fork (`vars.REGISTRY_FORK`), ID de extensión y `user.name`/`user.email` del commit
(cuenta con CLA) como variables o literales — son datos públicos.
- Operativa: los PAT expiran; la expiración falla cerrada (no se abre PR, nada se rompe). Anotar el
recordatorio de rotación desde el día uno.

### 7.4 Boundaries por canal (actualización requerida en la skill `release`)

La skill `release` v1.12 asume un solo namespace de tags ("latest published tag"). Con dos canales,
cada operación usa boundary filtrado — verificar con `git fetch --tags` primero en ambos casos:

- Canal VS Code: `git log --oneline $(git describe --tags --match "v[0-9]*" --abbrev=0)..HEAD`
- Canal Zed: `git log --oneline $(git describe --tags --match "zed-v*" --abbrev=0)..HEAD`

Un tag `zed-v*` jamás cuenta como boundary de VS Code ni viceversa. Actualizar la skill ANTES del
primer tag `zed-v*` (dueño: T10 o tarea previa al T8).

### 7.5 Llenado de changelogs (sin conflictos entre plataformas)

Cada work unit escribe en el `[Unreleased]` de SU canal y solo del suyo:
- Cambio VS Code (colores, scopes, guía que lo describa) → `CHANGELOG.md` raíz.
- Cambio Zed (mapping, `extension.toml`, `build-zed.js`) → `zed/CHANGELOG.md`.
- Cambio de fuente compartida (`palette`, `colors`) → entrada en AMBOS (cada una describe el efecto en su artefacto).
- Un commit que toque ambos canales trae ambas entradas; son archivos distintos, nunca hay conflicto de contenido por plataforma.
- Los finalize son independientes: el step 4 de la skill renombra `[Unreleased]` → versión solo en el archivo del canal que releasea. `verify-vsix.js` solo mira el raíz, así que el changelog Zed jamás lo rompe.
- Bootstrap v0.1: `zed/CHANGELOG.md` nace con su sección `0.1.0`; el raíz recibe UNA línea `Docs` que viaja con la próxima versión VS Code que salga (no fuerza release).

**Decisión de estructura (sesión 2026-10-06):** la skill `release` NO se parte por plataforma ni se crea
skill conjunta: un solo entry point con router por canal (VS Code-only / Zed-only / conjunto desde fuente
compartida) + detalle pesado en `references/`. El bump Zed no es skill sino workflow disparado por tag.
Aplicar al implementar Zed, no antes.

---

## 8. Riesgos y mitigaciones

| Riesgo | Severidad | Mitigación |
|--------|-----------|------------|
| **R1** — macOS wide-gamut: Zed no es color-managed → colores apagados (issue [#9057](https://github.com/zed-industries/zed/issues/9057), abierto desde 2024) | Media | Disclaimer en README Zed **desde v0.1** con link al issue: no es bug del theme |
| **R2** — Schema publicado atrasado vs renderer | Media | Validar cargando en Zed (no solo schema); usar `one.json` como referencia de claves actuales |
| **R3** — Latencia/rechazo en review del registro | Alta para Fase 2 | D6: release v0.1 no depende del registro |
| **R4** — CLA: automation rechazada si autor es bot | Alta (fase 2) | PAT de cuenta con CLA firmada; documentado en workflow |
| **R5** — Límite 3 PRs abiertos / ventana 3 semanas | Media | Dedupe en automation; bump solo cuando toca (D8) |
| **R6** — Fidelidad: ~15 reglas descartadas, HC y Mix fuera de alcance | Media | "Known limitations" en README Zed; priorizar verificación Dark/Darker (D9) |
| **R7** — Drift futuro: token nuevo en `palette` no mapeado a Zed | Baja | `build-zed.js` valida referencias; revisión de `zedMap` como checklist de cada cambio de paleta (documentar en guía) |
| **R8** — `zed/LICENSE` desincronizado de la raíz | Baja | Check en build que falle ante diff |
| **R9** — Expiración del PAT del workflow | Baja | Falla cerrada (no abre PR); recordatorio de rotación desde el día uno (T10) |

---

## 9. Criterios de aceptación (v0.1)

- [ ] `pnpm build:zed` genera `zed/themes/funky-theme.json` con 3 variantes (Dark, Darker, Italic), nombres públicos (`Funky ...`, no los `Maxiano ...` internos).
- [ ] Referencias de `zedMap` 100% válidas (build falla ante typo).
- [ ] Instalación dev-extension en Zed funcional; **Dark y Darker** aprobados visualmente side-by-side (checklist T4).
- [ ] `pnpm build && pnpm package && pnpm verify:vsix` pasa — **vsix sin `zed/`** y changelog con la entrada.
- [ ] `zed/LICENSE` presente y sincronizado con la raíz.
- [ ] README: sección Zed (install manual + disclaimer sRGB + known limitations) + Roadmap actualizado.
- [ ] `docs/how-to-modify-theme.md` documenta el build Zed y el `zedMap` (mismo commit).
- [ ] `zed/CHANGELOG.md` con sección `0.1.0` + UNA línea `### Docs` en el `CHANGELOG.md` raíz (referencia, mismo commit); sin historial Zed en el changelog raíz.
- [ ] Conventional commit en inglés, sin atribución IA; **commit solo con confirmación explícita**.

---

## 10. Fuera de alcance (post-v0.1)

- Pulido fino con Theme Builder importando nuestro JSON.
- Light variant (requiere paleta light completa — no existe hoy).
- Semantic tokens Zed (vienen off; nuestro theme no los usa).
- Icon theme.
- Registry: alta inicial, workflow de bump. (Zed no tiene RCs por D8.)
- Variantes Mix y HC en Zed: sin soporte por decisión explícita (Q2/Q5) — no hay backlog activo.

---

## 11. Preguntas abiertas para el revisor

| Q | Pregunta | Recomendación |
|---|----------|---------------|
| Q1 ✅ DECIDIDO | **ID de extensión:** `funky-theme` — `maxiano` es legacy nostálgico (solo vive en los nombres de JSON, que no afectan nada; el package es `funky-theme-vscode`). `funky-theme-zed` queda descartado: contiene la palabra `zed`, prohibida en IDs | `funky-theme` |
| Q2 ✅ DECIDIDO | **¿Soporte HC en Zed?** No — cada cambio exige adaptación costosa (no es un transform limpio como Darker) y nadie la usa | Sin soporte: HC no se genera ni se documenta en Zed |
| Q3 ✅ DECIDIDO | **Automatización registry:** script `gh` propio en Actions tras PR manual (decidido) vs `huacnlee/zed-extension-action` (descartada: 3ra dependencia) vs agente local con `gh` (descartado: identidad sin acotar) | Script propio en Actions (D7) |
| Q4 ✅ DECIDIDO | **¿GitHub Release ligera para tags `zed-v*`?** No en v0.1 — tag anotado + `zed/CHANGELOG.md` bastan; releases de GitHub = VS Code + vsix | No en v0.1 (revisitar si el registro o los usuarios piden URL de release) |
| Q5 ✅ DECIDIDO | **¿Soporte Mix en Zed?** No — al caer la variante completa, la duda de aplanar-vs-descartar se disuelve | Sin soporte Mix en Zed |

---

## 12. Referencias

1. Zed — Theme Extensions: <https://zed.dev/docs/extensions/themes>
2. Zed — Theme JSON Schema v0.2.0: <https://zed.dev/schema/themes/v0.2.0.json>
3. Zed — Local themes / Theme Builder docs: <https://zed.dev/docs/themes>, <https://zed.dev/blog/theme-builder>
4. Zed — Tree-sitter capture list (supported captures by themes): <https://zed.dev/docs/extensions/languages>
5. Zed — Resolución de capturas (prefix matching): `crates/syntax_theme/src/syntax_theme.rs` (`highlight_id`) — <https://github.com/zed-industries/zed/blob/main/crates/syntax_theme/src/syntax_theme.rs>
6. Zed — Tema built-in de referencia: `assets/themes/one/one.json` — <https://github.com/zed-industries/zed/blob/main/assets/themes/one/one.json>
7. Zed — `theme_importer` (importador oficial VS Code): <https://github.com/zed-industries/zed/tree/main/crates/theme_importer>; issue de friction: <https://github.com/zed-industries/zed/issues/7111>
8. Zed — Publishing guide / prerequisites / updating / license: <https://zed.dev/docs/extensions/publishing/publishing-guide>, <https://zed.dev/docs/extensions/publishing/prerequisites>, <https://zed.dev/docs/extensions/publishing/updating-and-maintenance>, <https://zed.dev/docs/extensions/publishing/license-requirements>
9. Zed — CLA: <https://zed.dev/cla>
10. Registro oficial: <https://github.com/zed-industries/extensions>
11. `alanisme/vscode-themes-for-zed` (port de 19 themes, pipeline TS): <https://github.com/alanisme/vscode-themes-for-zed>
12. `huacnlee/zed-extension-action`: <https://github.com/huacnlee/zed-extension-action>
13. Precedente gh CLI para bump de registry: `middle-management/pgfmt` → `.github/workflows/zed-extension-bump.yml`: <https://github.com/middle-management/pgfmt/blob/main/.github/workflows/zed-extension-bump.yml>
14. Zed — Color management (sRGB/dull colors, macOS): issue <https://github.com/zed-industries/zed/issues/9057>
15. Zed — Semantic tokens (off por defecto): <https://zed.dev/docs/semantic-tokens>
16. `enBonnet/migrazed` (guía migración themes): <https://github.com/enBonnet/migrazed>

---

## 13. Aprobación

| Rol | Persona | Fecha | Veredicto | Notas |
|-----|---------|-------|-----------|-------|
| Autor | (sesión actual) | 2026-10-06 | Borrador v2 con Q1/Q2/Q4/Q5 decididas | Aprobado por el revisor en sesión |
| Revisor 1 | (dueño) | 2026-10-06 | ☑ Aprobar | Q1/Q2/Q4/Q5 decididas; alcance 3 variantes |
| Revisor 1 | | | ☐ Aprobar ☐ Aprobar con cambios ☐ Rechazar | |
| Revisor 2 | | | ☐ Aprobar ☐ Aprobar con cambios ☐ Rechazar | |

**Cambios solicitados en revisión:**
