# Manual de Mantenimiento: Maxiano Theme

Guía operativa para mantener y extender la paleta de colores del tema. Todo cambio de color se hace en el **source of truth** y se compila — nunca a mano en los JSON.

**🚨 Regla de Oro:** NUNCA modifiques manualmente los archivos `.json` dentro de `/themes/`. Son artefactos compilados: tus cambios se sobrescribirán en la próxima compilación.

---

## 🏗️ Arquitectura (lo único que importa)

| Pieza | Rol |
|---|---|
| `src/theme-config.js` | **Source of Truth**: paleta de tokens + reglas de `colors` y `tokenColors` |
| `scripts/build.js` | **Compilador**: lee el source y genera las 5 variantes en `/themes/*.json` |

---

## 🎨 Cómo hacer cambios

### Escenario 1: Modificar un color existente

1. Abre `src/theme-config.js`.
2. Busca la variable en `const palette` y cambia su hex. De paso deja un comentario del porqué:
   ```javascript
   pinkBase: "#e87ea5", // Lo apagué un poco porque cansaba la vista en jornadas largas
   ```
3. Compila: `node scripts/build.js`.
4. Recarga el editor (`Ctrl+Shift+P` → `Developer: Reload Window`) o corre la extensión en modo Debug (F5).

### Escenario 2: Agregar un color NUEVO a la paleta

1. Registra el token en `const palette`:
   ```javascript
   orangeBright: "#ff9133", // Nuevo token específico para alertas severas
   ```
2. Úsalo donde corresponda:
   - **UI del editor** → en `colors`:
     ```javascript
     "editorWarning.foreground": palette.orangeBright,
     ```
   - **Sintaxis de código** → en `tokenColors`:
     ```javascript
     {
       scope: ["log.warning.severe"],
       settings: {
         foreground: palette.orangeBright
       }
     }
     ```
3. Compila: `node scripts/build.js`. El token se vuelca a las 5 variantes como `"#ff9133"`.

### Escenario 3: Color SOLO en una variante (vía build.js)

Cuando un color aplica a una única variante (p.ej. `quickInput.*` que difiere entre Dark/Italic y Darker, o `editorLineNumber.activeForeground` que resalta más en High Contrast), NO va en el source compartido: va en `scripts/build.js`, dentro del bloque del perfil.

1. Localiza el bloque del perfil en `build.js`:
   - `ultra-nocturno` → Maxiano Darker
   - `high-contrast` → Maxiano High Contrast
   - `flat` / `expressive` → Maxiano Dark / Dark Italic
   - `mix` → Maxiano Dark Mix

2. Añade el override con un comentario que explique qué hace:
   ```javascript
   // Perfil: Dark & Italic (QuickInput con fondo profundo y texto blanco)
   if (variant.profile === 'flat' || variant.profile === 'expressive') {
     theme.colors['quickInput.foreground'] = '#ffffff';
     theme.colors['quickInputTitle.background'] = '#211e2b';
   }
   ```
3. Compila: `node scripts/build.js`. El override aplica SOLO a esa variante; el resto mantiene el valor compartido.

**Reglas de build.js:**
- Usa los tokens que importa de la paleta (`palette.uiAccentStrong`, `palette.bgDeep`, …) en vez de repetir hex.
- El mapa `darkerBackgrounds` (variante Darker) está keyed por token: los overrides de fondo y su transform se mantienen sincronizados aunque cambie el valor de `bgBase`/`bgDeep`/`bgElevated`.
- El mapa `darkerSyntaxAdjustments` (también Darker) atenúa colores de sintaxis luminosos sobre el fondo ultra-nocturno (amarillo/naranja claros cansan más): keyed por token de paleta, recorre `tokenColors` y sustituye el foreground. Si quieres que un color luminoso se atenúe en Darker, añádelo aquí — NO en el source compartido.
- Si un color vale distinto entre variantes: define el base en `theme-config.js` (compartido) y solo los overrides por variante en `build.js`.

**Perfiles tipográficos (italic/bold, resueltos en `build.js`):**
- Dark Italic parte de la MISMA capa de italic que Mix (comments, params, attributes, `variable.language`, alias, `storage.modifier`) y la extiende con `keyword.control` y `storage.type`; NO tiene bold de tipografía. Números y keywords genéricas quedan normales.
- Mix añade bold SOLO en nombres de definición (`meta.function entity.name.function`, `entity.name.type`, `entity.name.class`), nunca en keywords: así la definición se distingue de la llamada aunque ambas compartan el cyan de funciones. La separación llamada/definición también es de color: el contenedor `meta.function-call` usa un rosa propio (`pinkAccent`) distinto del de params (`pinkLight`), y en gramáticas que emiten `meta.function-call.generic` (p. ej. Python) el contenedor cede al cyan de funciones.

---

## 🗂️ Mapa de decisiones

### Colocación de las propiedades

`src/theme-config.js` está organizado por **zonas semánticas**: `colors` agrupado en ~15 secciones (Editor, Terminal, Git, Barra de estado, etc.) y `tokenColors` en ~14 secciones de sintaxis (Comentarios, Variables, Funciones, Palabras clave, etc.). Al agregar una propiedad nueva, colócala **dentro de su sección semántica**, junto a las keys vecinas del área — nunca suelta al final.

### Tokens de paleta disponibles

Los colores reutilizados viven como variables en `const palette`. Además de los tokens base, existen estos usos frecuentes:

| Token | Valor | Uso principal |
|---|---|---|
| `blueMethod` | `#82aaff` | Métodos y propiedades (JS/TS, C#, Go…), valores de JSON y decorators |
| `greenMaterial` | `#c3e88d` | Strings, marcas de inserción, subrayados |
| `orangeScarlet` | `#f78c6c` | Advertencias, números, acentos de operador |
| `terracotta` | `#c17e70` | Verificación de números, find-in-files |
| `linkPurple` | `#b2b3ff` | Links y `pickerGroup.foreground` |
| `uiInactive` | `#8b8f9e` | Título de panel y tabs inactivos |

**Regla de paleta:** crea una variable SOLO para valores que se repiten (≥2 usos) o con identidad semántica clara. Los de un solo uso se dejan literales en su regla.

### Colores con alpha (8 dígitos hex)

Los colores con alpha (formato `#rrggbbaa`, p.ej. `#d8d8d8f1`) son **mezclas de opacidad con el fondo**, no colores puros: su resultado visual depende de lo que haya detrás.

- **Un MISMO alpha repetido ≥2 usos con la MISMA semántica → SÍ es token** (sección "Alphas compartidos", p.ej. `uiAccentStrong` `#8c8effd2` — 9 superficies comparten el acento fuerte al 82%). Cambiar el token mantiene las superficies cohesionadas.
- **Cada opacidad DISTINTA del mismo base → literal**: `#8c8eff45`, `#8c8eff40`, `#8c8eff2a`… son mezclas deliberadamente distintas.
- **Coincidencia de valor entre familias distintas → literal**: si el mismo número aparece con semántica distinta (un fill que vale como border, terminal vs markdown), dejarlo literal evita acoplar superficies que no deberían cambiar juntas.
- Los alphas NO se derivan de tokens base (no compongas `uiAccent` + sufijo: el render depende del fondo).

### Estrategia cromática: separación por rol

El rol del token en el código decide su familia cromática. Es una GUÍA — no una ley — y admite excepciones cuando el contexto lo pide.

| Rol | Qué es | Familia cromática | Ejemplos |
|---|---|---|---|
| **Flujo** | Verbos que controlan la ejecución | Morado claro (`#eaa9fc`) | `if`, `else`, `for`, `while`, `return`, `switch`, `import`, `export` |
| **Declaración** | Sustantivos que definen estructura | Morado (`#c792ea`) | `type`, `interface`, `class`, `const`, `let`, `var`, `private`, `function` |
| **Modificador** | Adjetivos que matizan una declaración | Azul claro (`#a1caff`) | `public`, `static`, `final`, `abstract`, `readonly` |
| **Referencia** | Punteros al contexto actual | Morado claro (`#eaa9fc`) | `this`, `super`, `self` |
| **Auxiliar** | Palabras estructurales que no controlan el flujo | Coral (`#ffb488`) | `extends` (JS/TS, Java, PHP), `mod`/`pub` (p.ej. Rust) |
| **Creación** | Operadores de instanciación | Naranja claro (`#ffd089`) | `new` |

La meta es la legibilidad por escaneo: distinguir de un vistazo *dónde pasa algo* (flujo) de *dónde se declara algo* (estructura) — por luminosidad dentro de la misma familia morada, no por cambio de color. Flujo y Referencia comparten tono a propósito: ambos son "tokens activos", a diferencia de la estructura estática.

> **⚠️ Ejemplos representativos, NO exhaustivos.** Cada rol aplica a TODOS los lenguajes donde exista una palabra con ese papel; los paréntesis tipo `(Rust)` solo indican dónde es común verla. Para verificar una palabra concreta usa `Developer: Inspect Editor Tokens and Scopes` (`Ctrl+Shift+P`) en el editor — el scope real que reporta VS Code es el que manda, no la tabla. **Ojo: esto solo lo puede hacer un humano en el editor; un agente no puede abrir el inspector.**

**Excepciones al mapa:** el rol **Auxiliar** no vive en la familia morada: `keyword.other` genérico → coral `#ffb488` (token `orangeSoft`) — creado como candidato reutilizable aunque hoy tenga un solo uso. Los sub-scopes superiores de `keyword.other` (`import`, `directive`, `using`, `use`, `namespace`, `package`, `include`, `require`, `module`) → cyan `#96e7ff` (parte estructural superior, mismo tinte que las funciones). `storage.modifier` → azul claro `#a1caff` (literal: variante ligeramente más clara del azul de operadores `#9abfff`, deliberadamente NO comparte color con `keyword.operator`). `support.class` (clases externas/builtin: p.ej. `Exception` en PHP, `React` en TSX) se queda en morado claro `#eaa9fc` como referencia activa — no es tipo definido por el usuario, y moverlo a la familia de tipos lo confundiría con el código propio.

**Excepciones legítimas:** la estrategia es una sugerencia, no un contrato. Un caso particular (lenguaje, contexto o necesidad de énfasis) puede romperla si mejora la legibilidad — pero documenta la excepción con un comentario junto a la regla en `theme-config.js`, para que no parezca un error accidental.

**Dónde vive:** la estrategia se implementa en `src/theme-config.js` (sección "Keywords / control / imports" y otras zonas semánticas): cada familia es un `foreground` con tokens de la paleta, y las 5 variantes la heredan vía build. Si buscas dónde está aplicada una regla, ese archivo es el punto de partida — nunca los `themes/*.json`.

---

## 🚀 Cheatsheet de Comandos
- Compilar tras CUALQUIER cambio: `node scripts/build.js`
- Previsualizar en VS Code: recargar la ventana (`Ctrl+Shift+P` → `Developer: Reload Window`) o correr la extensión en modo Debug (F5)
- Inspeccionar el scope real de un token: `Ctrl+Shift+P` → `Developer: Inspect Editor Tokens and Scopes` (solo humano)