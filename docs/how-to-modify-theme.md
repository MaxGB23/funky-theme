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
| `uiBorder` | `#5d4e69` | Bordes de checkbox, dropdown e inputs |
| `linkPurple` | `#b2b3ff` | Links y `pickerGroup.foreground` |

**Regla de paleta:** crea una variable **solo** para valores que se repiten (≥2 usos) o que tienen identidad semántica clara. Los valores de un solo uso se dejan **literales** en su regla.

### 🔢 Colores con alpha (8 dígitos hex)

Los colores con **alpha** (formato `#rrggbbaa`, ej. `#d8d8d8f1`) son **mezclas de opacidad con el fondo**, no "colores puros" de la paleta. Un alpha como `#8c8eff7e` no es un color con identidad propia — es el tono `#8c8eff` a un 49% de opacidad sobre lo que haya detrás. El resultado visual final depende del fondo, y por eso no encaja en un token de paleta.

**Regla:** estos **NO se resuelven a tokens de paleta** — se escriben **literales** en su regla. Aunque el tono base se repita (p.ej. `#5f569580`, `#8c8eff40`, `#8c8effd2`), cada opacidad distinta es deliberadamente un valor distinto: cambiarla en un token rompería los demás. Los tokens son para **colores opacos puros** con identidad estable (p.ej. `fgWhite`, `bgDeep`); el alpha es la única categoría que rompe la regla de "≥2 usos → token". No intentes convertir un alpha en variable.

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
5. ¡Listo! Automáticamente las 4 variantes de tus temas (`/themes/*.json`) van a heredar este nuevo rosa exacto en los lugares correspondientes.

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
El script leerá la nueva llave `orangeBright` y la volcará compilada a los 4 temas como `"#ff9133"`.

---

## 🗂️ Escenario 3: Agregar un color SOLO en una variante (vía build.js)

A veces un color aplica únicamente a una variante (p.ej. `quickInput.*` que difiere entre Dark/Italic y Darker, o `editorLineNumber.activeForeground` que solo resalta más en High Contrast). Esto NO va en `src/theme-config.js` (compartido), sino en `scripts/build.js`, dentro del bloque de perfil de esa variante.

1. Abre `scripts/build.js` y localiza el bloque de la variante:
   - `ultra-nocturno` → Maxiano Darker
   - `high-contrast` → Maxiano High Contrast
   - `flat` / `expressive` → Maxiano Dark / Dark Italic

2. Agrega el color dentro de ese bloque con un comentario que explique qué hace:
   ```javascript
   // Perfil: Dark & Italic (QuickInput con fondo profundo y texto blanco)
   if (variant.profile === 'flat' || variant.profile === 'expressive') {
     theme.colors['quickInput.foreground'] = '#ffffff';
     theme.colors['quickInputTitle.background'] = '#211e2b';
   }
   ```

3. Compila con `node scripts/build.js`. El override se aplicará **solamente** a esa variante; el resto mantiene el valor compartido o por defecto.

**Regla:** si un color aplica a varias variantes pero con valores distintos, define el valor base en `theme-config.js` (compartido) y solo overrides por variante en `build.js`. Así evitas duplicar el valor en cada bloque.

---

## 🚀 Cheatsheet de Comandos
- Para compilar el tema tras CUALQUIER cambio:
  `node scripts/build.js`
- Para previsualizar los cambios en VS Code, tienes que recargar la ventana (`Ctrl + Shift + P` -> `Developer: Reload Window`) o tener la extensión corriendo en modo *Debug* (F5).
