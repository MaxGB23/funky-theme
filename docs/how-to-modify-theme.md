# Manual de Mantenimiento: Maxiano Theme

Este documento detalla el flujo de trabajo (Workflow) arquitectónico para mantener, modificar o extender la paleta de colores del Tema Maxiano.

**🚨 Regla de Oro:** NUNCA modifiques manualmente los archivos `.json` dentro de la carpeta `/themes/`. Estos son archivos compilados. Si lo haces, tus cambios se sobrescribirán en la próxima compilación.

---

## 🏗️ La Arquitectura Básica

Toda tu atención debe centrarse en dos lugares:
1. **Source of Truth:** `src/theme-config.js` (Acá viven tus variables y reglas semánticas).
2. **El Compilador:** `scripts/build.js` (El script que lee tu Source of Truth y escupe las variantes).

---

## 🗂️ Estructura del Source of Truth

`src/theme-config.js` está organizado por **zonas semánticas** (no al azar). Antes de agregar o modificar un color, ubica su sección correspondiente:

- **`colors`** → agrupado en ~15 secciones (Editor, Terminal, Git, Barra de estado, etc.), cada una delimitada por comentarios.
- **`tokenColors`** → agrupado en ~14 secciones de sintaxis (Comentarios, Variables, Funciones, Palabras clave, etc.).

**Regla:** cuando agregues un color, colócalo **dentro de su sección semántica**, no suelto al final. Esto mantiene el archivo navegable a medida que crece.

### 🎨 Tokens de paleta disponibles

Los colores reutilizados viven como variables en `const palette` al inicio del archivo. Además de los tokens base, existen estos usos frecuentes:

| Token | Valor | Uso principal |
|---|---|---|
| `blueMethod` | `#82aaff` | Métodos, propiedades, atributos de JS/TS |
| `greenMaterial` | `#c3e88d` | Strings, marcas de inserción, subrayados |
| `orangeScarlet` | `#f78c6c` | Advertencias, números, acentos de operador |
| `terracotta` | `#c17e70` | Verificación de números, find-in-files |
| `linkPurple` | `#b2b3ff` | Links y `pickerGroup.foreground` |
| `uiInactive` | `#8b8f9e` | Título de panel y tabs inactivos |

**Regla de paleta:** crea una variable **solo** para valores que se repiten (≥2 usos) o que tienen identidad semántica clara. Los valores de un solo uso se dejan **literales** en su regla.

### 🔢 Colores con alpha (8 dígitos hex)

Los colores con **alpha** (formato `#rrggbbaa`, ej. `#d8d8d8f1`) son **mezclas de opacidad con el fondo**, no "colores puros" de la paleta. Un alpha como `#8c8eff7e` no es un color con identidad propia — es el tono `#8c8eff` a un 49% de opacidad sobre lo que haya detrás. El resultado visual final depende del fondo, y por eso no encaja en un token de paleta.

**Regla:** los alphas **NO se derivan de tokens base** (p.ej. no compongas `uiAccent` + sufijo: el resultado visual depende del fondo, no es un color con identidad propia). Pero eso NO prohíbe tokenizarlos:

- **Un MISMO alpha repetido ≥2 usos con la MISMA semántica → SÍ es token.** Viven en la sección "Alphas compartidos" de `theme-config.js` (p.ej. `uiAccentStrong` `#8c8effd2` — 9 superficies comparten el acento fuerte al 82%). Si cambias el token, las superficies se mantienen cohesionadas.
- **Cada opacidad DISTINTA del mismo base → literal.** `#8c8eff45`, `#8c8eff40`, `#8c8eff2a`… son mezclas deliberadamente distintas; unificarlas en un token rompería las demás.
- **Coincidencia de valor entre familias distintas → literal.** Si el MISMO número aparece con semántica distinta (un fill que vale como border, terminal vs markdown), dejarlo literal evita acoplar superficies que no deberían cambiar juntas (p.ej. `#8c8eff5e`, `#8c8eff33`, `#a4ffff`).

---

## 🎨 Escenario 1: Cómo modificar un color existente

Supongamos que el rosa (`pinkBase`) actual de tu tema te parece muy saturado y lo quieres apagar un poco.

1. Abre el archivo `src/theme-config.js`.
2. Busca el objeto `const palette` en la parte superior.
3. Ubica la variable deseada y modifica su string hexadecimal. De paso, ¡puedes dejar un comentario del por qué cambiaste el color!
   ```javascript
   // Antes
   pinkBase: "#ff8bee",
   
   // Después
   pinkBase: "#e87ea5", // Lo apagué un poco porque cansaba la vista en jornadas largas
   ```
4. **Compilar:** Abre la terminal en la raíz del proyecto y ejecuta:
   ```bash
   node scripts/build.js
   ```
5. ¡Listo! Automáticamente las 5 variantes de tus temas (`/themes/*.json`) van a heredar este nuevo rosa exacto en los lugares correspondientes.

---

## 🛠️ Escenario 2: Cómo agregar un color NUEVO a la paleta

Supongamos que quieres introducir un color Naranja brillante (`orangeBright`) exclusivamente para resaltar los *warnings* severos del editor porque el naranja base se queda corto.

### Paso 2.1: Registrar el Nuevo Token en la Paleta
Agrega la variable al principio de `src/theme-config.js`:
```javascript
const palette = {
  // ... (colores existentes)
  orangeBase: "#ffb86c",
  orangeBright: "#ff9133", // Nuevo token específico para alertas severas
};
```

### Paso 2.2: Aplicar la Variable en el Tema
Baja en el mismo archivo hasta el `module.exports`, donde está la configuración final.
Si es para la **UI del editor**, agrégalo en `colors`:
```javascript
colors: {
  // ...
  "editorWarning.foreground": palette.orangeBright, // Acá inyectás tu nuevo color
},
```

Si es para la **sintaxis del código**, búscalo o agrégalo en `tokenColors`:
```javascript
tokenColors: [
  // ...
  {
    name: "Severe Warnings Output",
    scope: ["log.warning.severe"],
    settings: {
      foreground: palette.orangeBright
    }
  }
]
```

### Paso 2.3: Compilar el Tema
En la terminal ejecuta:
```bash
node scripts/build.js
```
El script leerá la nueva llave `orangeBright` y la volcará compilada a los 5 temas como `"#ff9133"`.

---

## 🗂️ Escenario 3: Agregar un color SOLO en una variante (vía build.js)

A veces un color aplica únicamente a una variante (p.ej. `quickInput.*` que difiere entre Dark/Italic y Darker, o `editorLineNumber.activeForeground` que solo resalta más en High Contrast). Esto NO va en `src/theme-config.js` (compartido), sino en `scripts/build.js`, dentro del bloque de perfil de esa variante.

1. Abre `scripts/build.js` y localiza el bloque de la variante:
   - `ultra-nocturno` → Maxiano Darker
   - `high-contrast` → Maxiano High Contrast
   - `flat` / `expressive` → Maxiano Dark / Dark Italic
   - `mix` → Maxiano Dark Mix (tipografía dirigida: bold en nombres de definición, italic en metadata)

La variante Italic (`expressive`) parte de la MISMA capa de italic de Mix (comments, params, attributes, `variable.language`, alias y `storage.modifier`) y la extiende con `keyword.control` (if/else/return…) y `storage.type` (function/class/const/let/var…): la estética cursiva completa tipo Operator Mono. En esta variante NO hay bold de tipografía (solo los bold de markdown `**negrita**` y headings, igual que en la variante regular); números y keywords genéricas quedan normales.

Por su parte, Dark Mix añade el bold SOLO en los nombres de definición (`meta.function entity.name.function`, `entity.name.type`, `entity.name.class`) y NUNCA en keywords: así la definición de una función se distingue de su llamada aunque ambas compartan el cyan de funciones. Estos tres scopes exactos se resuelven en `scripts/build.js` dentro del perfil `mix`. La separación definición/llamada se refuerza en `src/theme-config.js` con la regla `meta.function-call entity.name.function` (mismo cyan, sin bold): como `meta.function-call` está más cerca del nombre en el stack TS/JS, gana especificidad y las llamadas pierden el bold.

2. Agrega el color dentro de ese bloque con un comentario que explique qué hace:
   ```javascript
   // Perfil: Dark & Italic (QuickInput con fondo profundo y texto blanco)
   if (variant.profile === 'flat' || variant.profile === 'expressive') {
     theme.colors['quickInput.foreground'] = '#ffffff';
     theme.colors['quickInputTitle.background'] = '#211e2b';
   }
   ```

3. Compila con `node scripts/build.js`. El override se aplicará **solamente** a esa variante; el resto mantiene el valor compartido o por defecto.

**Regla de tokens en build.js:** `build.js` importa la paleta que `src/theme-config.js` exporta al final del `module.exports`. Si el valor ya tiene token, úsalo (`palette.uiAccentStrong`, `palette.bgDeep`, `palette.fgWhite`, …) en vez de repetir el hex. El mapa `darkerBackgrounds` (variante Darker) está keyed por token: los overrides de fondo y el transform se mantienen sincronizados aunque cambie el valor de `bgBase`, `bgDeep` o `bgElevated`.

**Regla:** si un color aplica a varias variantes pero con valores distintos, define el valor base en `theme-config.js` (compartido) y solo overrides por variante en `build.js`. Así evitas duplicar el valor en cada bloque.

---

## 🎨 Estrategia cromática: separación por rol

Los colores siguen una estrategia semántica: **el rol del token en el código decide su familia cromática**. Es una GUÍA — no una ley — y admite excepciones cuando el contexto lo pide.

| Rol | Qué es | Familia cromática | Ejemplos |
|---|---|---|---|
| **Flujo** | Verbos que controlan la ejecución | Morado claro (`#eaa9fc`) | `if`, `else`, `for`, `while`, `return`, `switch`, `import`, `export` |
| **Declaración** | Sustantivos que definen estructura | Morado (`#c792ea`) | `type`, `interface`, `class`, `const`, `let`, `var`, `private`, `function` |
| **Referencia** | Punteros al contexto actual | Morado claro (`#eaa9fc`) | `this`, `super`, `self` |
| **Creación** | Operadores de instanciación | Naranja (`#ffcf87`) | `new` |

La meta es la legibilidad por escaneo: el ojo distingue de un vistazo *dónde pasa algo* (flujo) de *dónde se declara algo* (estructura) — por luminosidad dentro de la misma familia morada, no por cambio de color. Flujo y Referencia comparten tono a propósito: ambos son "tokens activos", a diferencia de la estructura estática.

**Excepciones legítimas:** la estrategia es una sugerencia, no un contrato rígido. Un caso particular (lenguaje, contexto o necesidad de énfasis) puede romperla si la excepción mejora la legibilidad. Si rompes la regla, documenta la excepción con un comentario junto a la regla en `theme-config.js`, para que no parezca un error accidental.

**Dónde vive:** la estrategia se implementa en `src/theme-config.js` (sección "Keywords / control / imports" y otras zonas semánticas): cada familia cromática es un `foreground` definido con tokens de la paleta, y las 5 variantes la heredan vía build. Si buscas dónde está aplicada una regla, ese archivo es el punto de partida — nunca los `themes/*.json` (artefactos compilados).

---

## 🚀 Cheatsheet de Comandos
- Para compilar el tema tras CUALQUIER cambio:
  `node scripts/build.js`
- Para previsualizar los cambios en VS Code, tienes que recargar la ventana (`Ctrl + Shift + P` -> `Developer: Reload Window`) o tener la extensión corriendo en modo *Debug* (F5).
