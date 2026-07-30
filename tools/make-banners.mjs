/**
 * Gera as capas dos compêndios em SVG.
 *
 * Desenho autoral e abstrato — gradiente, poeira de Arcanita e um emblema por
 * pack, cada um tirado do cenário: a Marca, Ithara, o cristal de Arcanita, a
 * estrela quebrada, a Cratera, a Fenda, a Pira e o Esmaecer. Nada de arte
 * licenciada nem silhueta reconhecível.
 *
 * A paleta vem do tema (ekhoria-module/ekhoria.css): carmim sobre pergaminho,
 * a mesma dos brasões do cenário, com o dourado da Centelha na barra inferior.
 * Mudou o tema? Mude aqui junto.
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

// Espelham o :root de ekhoria.css (carmim e pergaminho)
const FUNDO_ESCURO = "#2b0d0d";
const FUNDO_MEIO = "#781818";
const FUNDO_BAIXO = "#3d1010";
const TRACO = "#f3ecdb";
const OURO = "#c9a227";
const BRILHO = "#c0a878";

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
  // A Marca: o rito que abre a classe. Traço vertical partido por três cortes.
  classes: `
    <path d="M470 54 V146"/>
    <path d="M446 78 L494 90"/>
    <path d="M446 100 L494 112"/>
    <path d="M446 122 L494 134"/>`,
  // Ithara, a lua do cenário — cheia e minguante, o par que marca as noites.
  racas: `
    <circle cx="452" cy="100" r="34"/>
    <path d="M506 66 A44 44 0 1 0 506 134 A34 34 0 1 1 506 66"/>`,
  // Cristal de Arcanita: hexágono com os veios que o percorrem.
  itens: `
    <polygon points="${pol(470, 100, 44, 6, -Math.PI / 2)}"/>
    <path d="M470 56 V144 M432 78 L508 122 M432 122 L508 78"/>`,
  // "Poeira brilhando no ar como se alguém tivesse quebrado uma estrela."
  magias: `
    <path d="${raios()}"/>
    <circle cx="470" cy="100" r="10"/>`,
  // A Cratera: anéis de impacto, de onde saiu o que o cenário conta.
  tabelas: `
    <ellipse cx="470" cy="104" rx="46" ry="18"/>
    <ellipse cx="470" cy="100" rx="30" ry="12"/>
    <ellipse cx="470" cy="96" rx="14" ry="6"/>
    <path d="M470 96 V64"/>`,
  bestiario: `
    <path d="M430 62 Q452 100 442 140"/>
    <path d="M462 56 Q484 100 474 144"/>
    <path d="M494 62 Q516 100 506 140"/>`,
  // A Fenda: a rachadura que atravessa o mundo.
  lore: `
    <path d="M462 50 L484 84 L458 96 L488 122 L462 132 L480 150"/>
    <path d="M436 72 L458 96"/>
    <path d="M504 108 L488 122"/>`,
  // A Pira: a chama que os Guardiões carregam.
  journal: `
    <path d="M470 52 Q502 92 486 122 Q478 140 470 148 Q462 140 454 122 Q438 92 470 52 Z"/>
    <path d="M470 96 Q482 116 470 136 Q458 116 470 96 Z"/>`,
  // O Esmaecer: o círculo que se desfaz em poeira — a guerra que dá nome à campanha.
  campanha: `
    <path d="M470 56 A44 44 0 0 1 470 144"/>
    <path d="M470 56 A44 44 0 0 0 442 68"/>
    <circle cx="430" cy="82" r="3" fill="${TRACO}" stroke="none"/>
    <circle cx="424" cy="100" r="2.5" fill="${TRACO}" stroke="none"/>
    <circle cx="430" cy="118" r="2" fill="${TRACO}" stroke="none"/>
    <circle cx="442" cy="132" r="1.5" fill="${TRACO}" stroke="none"/>`,
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
