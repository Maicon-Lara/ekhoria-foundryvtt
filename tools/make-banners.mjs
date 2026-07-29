/**
 * Gera as capas dos compêndios em SVG.
 *
 * Desenho autoral e abstrato — gradiente, poeira de Arcanita e um emblema
 * geométrico por pack. Nada de arte licenciada nem silhueta reconhecível.
 *
 * A paleta vem do tema (ekhoria-module/ekhoria.css): azuis de Arcanita com o
 * dourado da Centelha Solar na barra inferior. Mudou o tema? Mude aqui junto.
 *
 * A poeira usa um gerador congruencial com semente fixa — Math.random geraria
 * um arquivo diferente a cada execução e sujaria o diff sem motivo.
 *
 * Uso: node tools/make-banners.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const OUT = path.join(ROOT, "ekhoria-module", "assets", "banners");

const L = 600;
const A = 200;

// Espelham o :root de ekhoria.css
const FUNDO_ESCURO = "#17212d";
const FUNDO_MEIO = "#2f4d69";
const FUNDO_BAIXO = "#1f2d3c";
const TRACO = "#eef3f8";
const OURO = "#c9a227";
const BRILHO = "#5e82a6";

const pol = (cx, cy, r, lados, giro = 0) =>
  Array.from({ length: lados }, (_, i) => {
    const a = giro + (i * 2 * Math.PI) / lados;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

// Estrela quebrada: raios de comprimentos alternados, como a poeira de
// Arcanita descrita no cenário.
const raios = () =>
  Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const [r0, r1] = i % 2 === 0 ? [18, 44] : [14, 34];
    return `M${(470 + r0 * Math.cos(a)).toFixed(1)} ${(100 + r0 * Math.sin(a)).toFixed(1)} L${(470 + r1 * Math.cos(a)).toFixed(1)} ${(100 + r1 * Math.sin(a)).toFixed(1)}`;
  }).join(" ");

const EMBLEMAS = {
  classes: `
    <path d="M420 106 L470 70 L520 106"/>
    <path d="M420 128 L470 92 L520 128"/>
    <path d="M420 150 L470 114 L520 150"/>`,
  racas: `
    <circle cx="470" cy="86" r="30"/>
    <circle cx="500" cy="112" r="30"/>
    <circle cx="440" cy="112" r="30"/>`,
  itens: `
    <polygon points="${pol(470, 100, 44, 6, -Math.PI / 2)}"/>
    <polygon points="${pol(470, 100, 22, 6, -Math.PI / 2)}"/>`,
  magias: `
    <path d="${raios()}"/>
    <circle cx="470" cy="100" r="10"/>`,
  tabelas: `
    <path d="M428 60 V144 M456 60 V144 M484 60 V144 M512 60 V144"/>
    <path d="M428 60 H512 M428 88 H512 M428 116 H512 M428 144 H512"/>`,
  bestiario: `
    <path d="M430 62 Q452 100 442 140"/>
    <path d="M462 56 Q484 100 474 144"/>
    <path d="M494 62 Q516 100 506 140"/>`,
  lore: `
    <path d="M428 132 L470 118 L512 132"/>
    <path d="M428 132 V74 L470 60 V118"/>
    <path d="M512 132 V74 L470 60"/>`,
  journal: `
    <rect x="428" y="60" width="84" height="80" rx="4"/>
    <path d="M444 84 H496 M444 100 H496 M444 116 H478"/>`,
  campanha: `
    <path d="M424 132 Q470 52 516 128"/>
    <circle cx="424" cy="132" r="7" fill="${OURO}" stroke="none"/>
    <circle cx="470" cy="92" r="7" fill="${OURO}" stroke="none"/>
    <circle cx="516" cy="128" r="7" fill="${OURO}" stroke="none"/>`,
};

function* poeira(semente, n) {
  let s = semente;
  const proximo = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  for (let i = 0; i < n; i++) {
    yield { x: proximo() * L, y: proximo() * A, r: 0.4 + proximo() * 1.1 };
  }
}

function banner(nome, semente) {
  const graos = [...poeira(semente, 80)]
    .map((g) => `<circle cx="${g.x.toFixed(1)}" cy="${g.y.toFixed(1)}" r="${g.r.toFixed(2)}"/>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L} ${A}" width="${L}" height="${A}" role="img">
  <defs>
    <linearGradient id="fundo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${FUNDO_ESCURO}"/>
      <stop offset="0.55" stop-color="${FUNDO_MEIO}"/>
      <stop offset="1" stop-color="${FUNDO_BAIXO}"/>
    </linearGradient>
    <radialGradient id="brilho" cx="0.78" cy="0.5" r="0.6">
      <stop offset="0" stop-color="${BRILHO}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${BRILHO}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${L}" height="${A}" fill="url(#fundo)"/>
  <g fill="${TRACO}" opacity="0.55">${graos}</g>
  <rect width="${L}" height="${A}" fill="url(#brilho)"/>
  <g fill="none" stroke="${TRACO}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.9">${EMBLEMAS[nome]}
  </g>
  <rect x="0" y="${A - 4}" width="${L}" height="4" fill="${OURO}"/>
</svg>
`;
}

fs.mkdirSync(OUT, { recursive: true });
let n = 0;
for (const nome of Object.keys(EMBLEMAS)) {
  fs.writeFileSync(path.join(OUT, `${nome}.svg`), banner(nome, 7919 + n * 104729), "utf8");
  n++;
}
console.log(`  OK ${n} banners em assets/banners/`);
