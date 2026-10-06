// ==========================================
// FUNKY THEME — ZED BUILDER (plan §5)
// ==========================================
// src/theme-config.js (palette) -> src/zed-config.js (zedMap) -> zed/themes/funky-theme.json
// 1. Resuelve zedMap a colores reales (FALLA ante referencia invalida).
// 2. Aplica perfiles: ultra-nocturno (transform D3 via zedDarkerBackgrounds)
//    e italic (font_style en el set expresivo, espejo del perfil expressive
//    de build.js). Sin Mix ni high-contrast (Q2/Q5).
// 3. Emite la theme family con nombres publicos (D9) + check de drift de licencia.

const fs = require('fs');
const path = require('path');

const baseTheme = require('../src/theme-config.js');
const { palette, ...themeConfig } = baseTheme;
const { zedMap, zedDarkerBackgrounds } = require('../src/zed-config.js');

const ROOT = path.join(__dirname, '..');
const ZED_DIR = path.join(ROOT, 'zed');
const THEMES_DIR = path.join(ZED_DIR, 'themes');
const OUT_FILE = path.join(THEMES_DIR, 'funky-theme.json');

// Atenuacion de sintaxis en Darker: espejo de darkerSyntaxAdjustments de
// build.js (keyed por valor resuelto; amarillos/naranjas luminosos cansan
// mas sobre el fondo ultra-nocturno). En la practica afecta a los tokens
// mapeados a yellowLight (attribute, enum, type, ...).
const darkerSyntaxAdjustments = {
  [palette.yellowLight]: '#fff9ba',
  [palette.orangeAccent]: '#ffd18e',
};

// Set italic del perfil expressive de build.js, traducido a tokens Zed:
// comment(+doc), variable.parameter, entity.other.attribute-name (attribute),
// variable.language (variable.special), storage.modifier (sin equivalente Zed),
// keyword.control y storage.type (type.builtin = primitivos).
const italicTokens = new Set([
  'comment',
  'comment.doc',
  'variable.parameter',
  'attribute',
  'variable.special',
  'keyword.control',
  'type.builtin',
]);

// Resuelve una referencia del zedMap a su hex real. Falla ante typo (D2).
function resolveRef(ref) {
  let hex;
  if (ref.startsWith('colors:')) {
    const key = ref.slice('colors:'.length);
    hex = (themeConfig.colors || {})[key];
    if (!hex) throw new Error(`zedMap: colors key inexistente: '${key}'`);
  } else {
    hex = palette[ref];
    if (!hex) throw new Error(`zedMap: palette token inexistente: '${ref}'`);
  }
  return toZedHex(hex, ref);
}

// Normaliza a la convencion de one.json: hex 8 digitos con alpha en minusculas.
// Los tokens de 6 digitos se vuelven opacos (+ff); los alphas se conservan tal cual.
function toZedHex(hex, ref) {
  if (typeof hex !== 'string') throw new Error(`zedMap: valor no-string en '${ref}'`);
  const v = hex.toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(v)) return v + 'ff';
  if (/^#[0-9a-f]{8}$/.test(v)) return v;
  throw new Error(`zedMap: hex invalido '${hex}' en '${ref}'`);
}

// Transform generico keyed por hex resuelto (misma forma que build.js:
// matchea prefijo y conserva el sufijo alpha).
function applyHexTransform(style, map) {
  const entries = Object.entries(map).map(([b, d]) => [b.toLowerCase(), d.toLowerCase()]);
  for (const key of Object.keys(style)) {
    const color = style[key].toLowerCase();
    for (const [base, darker] of entries) {
      if (color.startsWith(base)) {
        style[key] = darker + color.slice(base.length);
        break;
      }
    }
  }
}

function buildStyle(profile) {
  const style = {};
  for (const [key, ref] of Object.entries(zedMap.style)) style[key] = resolveRef(ref);
  if (profile === 'ultra-nocturno') applyHexTransform(style, zedDarkerBackgrounds);
  return style;
}

function buildSyntax(profile) {
  const syntax = {};
  for (const [token, spec] of Object.entries(zedMap.syntax)) {
    const entry = { color: null, font_style: null, font_weight: null };
    if (typeof spec === 'string') {
      entry.color = resolveRef(spec);
    } else {
      entry.color = resolveRef(spec.color);
      if (spec.font_style) entry.font_style = spec.font_style;
      if (spec.font_weight) entry.font_weight = spec.font_weight;
    }
    if (profile === 'ultra-nocturno') {
      const c = entry.color.toLowerCase();
      for (const [base, adj] of Object.entries(darkerSyntaxAdjustments)) {
        if (c.startsWith(base.toLowerCase())) {
          entry.color = adj + entry.color.slice(base.length);
          break;
        }
      }
    }
    if (profile === 'expressive' && italicTokens.has(token) && !entry.font_style) {
      entry.font_style = 'italic';
    }
    syntax[token] = entry;
  }
  return syntax;
}

function buildPlayers() {
  return zedMap.players.map((p) => ({
    cursor: resolveRef(p.cursor),
    background: resolveRef(p.background),
    selection: resolveRef(p.selection),
  }));
}

function buildAccents() {
  return zedMap.accents.map(resolveRef);
}

const variants = [
  { name: 'Funky Dark', profile: 'flat' },
  { name: 'Funky Darker', profile: 'ultra-nocturno' },
  { name: 'Funky Italic', profile: 'expressive' },
];

function checkLicenseSync() {
  const root = fs.readFileSync(path.join(ROOT, 'LICENSE'));
  const zed = fs.readFileSync(path.join(ZED_DIR, 'LICENSE'));
  if (!root.equals(zed)) {
    throw new Error('zed/LICENSE difiere del LICENSE raiz (drift de licencia, plan §R8)');
  }
  console.log('✅ zed/LICENSE sincronizado con LICENSE raiz');
}

function main() {
  checkLicenseSync();
  if (!fs.existsSync(THEMES_DIR)) fs.mkdirSync(THEMES_DIR, { recursive: true });

  const themes = variants.map((v) => ({
    name: v.name,
    appearance: 'dark',
    style: {
      ...buildStyle(v.profile),
      players: buildPlayers(),
      accents: buildAccents(),
      syntax: buildSyntax(v.profile),
    },
  }));

  fs.writeFileSync(OUT_FILE, JSON.stringify({ name: 'Funky Theme', author: 'MaxGB23', themes }, null, 2));
  for (const t of themes) console.log(`✅ ${t.name} construido en /zed/themes/funky-theme.json`);

  // Validacion: JSON parseable + claves criticas en las 3 variantes
  const parsed = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'));
  if (!Array.isArray(parsed.themes) || parsed.themes.length !== 3) {
    throw new Error(`validacion: se esperaban 3 themes, hay ${parsed.themes && parsed.themes.length}`);
  }
  for (const t of parsed.themes) {
    if (t.appearance !== 'dark') throw new Error(`validacion: ${t.name} sin appearance=dark`);
    const s = t.style || {};
    if (!s['editor.background']) throw new Error(`validacion: ${t.name} sin editor.background`);
    if (!s.players || !s.players[0] || !s.players[0].cursor || !s.players[0].selection) {
      throw new Error(`validacion: ${t.name} sin players[0] completo`);
    }
    if (!s.syntax || !s.syntax.keyword || !s.syntax.keyword.color) {
      throw new Error(`validacion: ${t.name} sin syntax.keyword`);
    }
    if (!Array.isArray(s.accents) || s.accents.length === 0) {
      throw new Error(`validacion: ${t.name} sin accents`);
    }
  }
  console.log('✅ validacion: 3 themes dark con editor.background, players[0], syntax.keyword y accents');
}

main();
