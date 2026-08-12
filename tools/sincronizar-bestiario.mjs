// Sincroniza os NÚMEROS de tools/data/bestiario.mjs com o cofre Obsidian.
//
// POR QUE ISTO EXISTE: bestiario.mjs nunca teve gerador — foi transcrito à mão
// uma vez. Quando o cofre recalculou a JP de 22 fichas, a única saída era abrir
// as 85 KB e conferir campo a campo, que é exatamente o trabalho que ninguém faz
// duas vezes seguidas do mesmo jeito. Pior: o validador não avisava, porque a
// regex do bloco ```od2-monstro``` exigia LF e o cofre grava CRLF — o bestiário
// reportou "0 erros" durante todo o tempo em que estava errado.
//
// POR QUE NÃO UM GERADOR INTEIRO: metade de bestiario.mjs não vem do cofre. O
// `conceito` (enum do OD2 para arte e filtro), a `descricao` em HTML, o mapa de
// tamanho "Enorme" -> "imenso" — nada disso está na fonte, tudo é curadoria. Um
// gerador completo apagaria isso a cada rodada. Então este script troca só o que
// o cofre é dono: os números da ficha.
//
// Uso:  node tools/sincronizar-bestiario.mjs --conferir   (não escreve nada)
//       node tools/sincronizar-bestiario.mjs
//       npm run build

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const COFRE = path.join(
  os.homedir(), "Documents", "Ekhoria", "10 Ekhoria", "Compendio", "Sistema",
);
// O bestiário do módulo vem de DUAS pastas do cofre. Os dez adversários humanos
// (Bushi, Mercenário, Legionário de Ferro…) nunca estiveram em Bestiario/ — são
// oposição de facção, e moram nas Tabelas do Mestre. Enquanto este script lia só
// a primeira pasta, ele os reportava como "sem bloco od2-monstro no cofre", que
// é verdade e engana: a fonte existe, estava era noutro lugar.
const FONTES = [
  path.join(COFRE, "Bestiario"),
  path.join(COFRE, "Tabelas do Mestre", "Adversários Humanos por Facção.md"),
];
const ALVO = path.join(AQUI, "data", "bestiario.mjs");
const CONFERIR = process.argv.includes("--conferir");

// Só estes. `movimento` fica de fora do laço porque a fonte usa notação OD2
// composta ("12/24Vo") que não cabe no campo do DataModel — tratado à parte.
const CAMPOS = ["dv", "pv", "ca", "jp", "moral", "xp", "tipo"];

const norm = (s) =>
  String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, " ").trim();

// A seção `habilidades:` do YAML, até a próxima chave de topo. Devolve só os
// nomes, na ordem em que a fonte os lista.
function habilidadesDo(bloco) {
  const linhas = bloco.split("\n");
  const ini = linhas.findIndex((l) => /^habilidades:\s*$/.test(l));
  if (ini === -1) return [];
  const nomes = [];
  for (let i = ini + 1; i < linhas.length; i++) {
    if (/^[a-z_]+:/.test(linhas[i])) break;   // chegou na próxima chave de topo
    const m = linhas[i].match(/^\s+-\s+nome:[ \t]*(.+?)[ \t]*$/);
    if (m) nomes.push(m[1].replace(/^["']|["']$/g, ""));
  }
  return nomes;
}

// ── 1. O que o cofre diz ────────────────────────────────────────────────────

const arquivos = FONTES.flatMap((f) =>
  fs.statSync(f).isDirectory()
    ? fs.readdirSync(f).filter((x) => x.endsWith(".md")).map((x) => path.join(f, x))
    : [f]);

const doCofre = new Map();
for (const caminho of arquivos) {
  const f = path.basename(caminho);
  const txt = fs.readFileSync(caminho, "utf8").replace(/\r\n?/g, "\n");
  for (const bloco of txt.matchAll(/```od2-monstro\n([\s\S]*?)```/g)) {
    const campos = {};
    for (const linha of bloco[1].split("\n")) {
      // Só o topo do YAML: `ataques:` e `habilidades:` são listas aninhadas, e
      // os `nome:` de dentro delas não podem virar o nome da criatura.
      const m = linha.match(/^([a-z_]+):[ \t]*(.+?)[ \t]*$/);
      if (m) campos[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
    // Nomes das habilidades, da lista aninhada. Só os NOMES: a descrição no
    // módulo é HTML curado, escrito a partir dos bullets que vêm depois do
    // bloco, e sobrescrevê-la com a linha crua do YAML seria perder texto.
    //
    // Recorta a seção antes de varrer: `ataques:` também é uma lista de
    // "- nome:", e sem o recorte "Garra gélida" entraria como habilidade.
    campos._habilidades = habilidadesDo(bloco[1]);
    if (campos.nome) doCofre.set(norm(campos.nome), { arquivo: f, ...campos });
  }
}

// ── 2. Troca no lugar ───────────────────────────────────────────────────────

const linhas = fs.readFileSync(ALVO, "utf8").split("\n");

// A indentação é o que separa a criatura da habilidade: campos de criatura
// ficam em 8 espaços, e os `nome:` de dentro de `habilidades` em 12.
const NOME = /^ {8}nome: "(.+)",$/;
const CAMPO = /^( {8})([a-z]+): (.+),$/;
// Entrada de `habilidades`, um nível mais fundo. É só a indentação que a separa
// do nome da criatura — os dois são `nome: "…"`.
//
// Duas formas, porque o arquivo usa as duas: a habilidade com descrição longa
// abre um objeto de várias linhas (`nome:` sozinho em 12 espaços), e a curta
// cabe numa linha só (`{ nome: "…", desc: "…" },` em 10). Só a primeira forma
// fazia o Rorik aparecer como se tivesse perdido Liderança e Sem exaustão.
const NOME_HAB = /^ {12}nome: "([^"]+)",$|^ {10}\{ nome: "([^"]+)",/;

// …mas a forma compacta é a MESMA em `ataques`, quando a lista é multilinha. Sem
// saber em que seção o laço está, "Mordida" e "Garras" entravam como habilidade
// e a criatura parecia ter três a mais que a fonte. A indentação diz o nível,
// não diz o campo.
const ABRE_HABILIDADES = /^ {8}habilidades: \[/;
const CHAVE_DE_CRIATURA = /^ {8}[a-z_]+:/;

let atual = null;         // { chave, fonte, nome, habs }
let emHabilidades = false;
const mudancas = [];
const semFonte = new Set();
const naoConferidos = [];
const habilidades = [];   // { nome, fonte, habs } por criatura casada

for (let i = 0; i < linhas.length; i++) {
  const n = linhas[i].match(NOME);
  if (n) {
    if (atual) habilidades.push(atual);
    const chave = norm(n[1]);
    const fonte = doCofre.get(chave);
    atual = fonte ? { chave, fonte, nome: n[1], habs: [] } : null;
    emHabilidades = false;
    if (!fonte) semFonte.add(n[1]);
    continue;
  }
  if (CHAVE_DE_CRIATURA.test(linhas[i])) {
    emHabilidades = ABRE_HABILIDADES.test(linhas[i]);
  }
  if (!atual) continue;

  if (emHabilidades) {
    const h = linhas[i].match(NOME_HAB);
    if (h) { atual.habs.push(h[1] ?? h[2]); continue; }
  }

  const c = linhas[i].match(CAMPO);
  if (!c) continue;
  const [, ind, campo, bruto] = c;

  if (campo === "movimento") {
    const alvo = movimento(atual.fonte.movimento, bruto);
    if (alvo && alvo !== bruto) {
      mudancas.push({ nome: atual.nome, campo, de: bruto, para: alvo });
      linhas[i] = `${ind}${campo}: ${alvo},`;
    } else if (!alvo && atual.fonte.movimento !== undefined) {
      naoConferidos.push(
        `${atual.nome} › movimento: cofre "${atual.fonte.movimento}" é composto — confira à mão.`,
      );
    }
    continue;
  }

  if (!CAMPOS.includes(campo)) continue;
  const valor = atual.fonte[campo];
  if (valor === undefined) continue;

  // Preserva a forma que o arquivo já usa: dv/ca/jp são string ("3"), moral e
  // xp são número solto. Trocar a forma quebraria o DataModel na build.
  const alvo = bruto.startsWith('"') ? `"${valor}"` : String(valor);
  if (alvo !== bruto) {
    mudancas.push({ nome: atual.nome, campo, de: bruto, para: alvo });
    linhas[i] = `${ind}${campo}: ${alvo},`;
  }
}
if (atual) habilidades.push(atual);

// A fonte escreve "9", "12/24Vo", "6/18E". O módulo guarda o deslocamento base
// em metros; a linha completa já está repetida na `descricao` (ver cabeçalho de
// bestiario.mjs). Só sincroniza quando a fonte dá um número simples — no caso
// composto, mexer aqui perderia informação que a descrição carrega.
function movimento(fonte, atualBruto) {
  if (fonte === undefined) return null;
  const simples = String(fonte).trim().match(/^(\d+)\s*m?$/i);
  if (!simples) return null;
  return atualBruto.startsWith('"') ? `"${simples[1]} m"` : simples[1];
}

// ── 3. Relatório ────────────────────────────────────────────────────────────

for (const m of mudancas) {
  console.log(`  ${m.nome} › ${m.campo}: ${m.de} -> ${m.para}`);
}
for (const l of naoConferidos) console.log(`  ! ${l}`);

// Renome de habilidade não é campo escalar, então o laço acima não o vê — e é
// o que faz uma ficha ficar certa nos números e errada no nome. Aqui só APONTA:
// a descrição do lado do módulo é texto curado, e trocar o nome sem reler a
// descrição junto produziria um par que não conversa.
const renomes = [];
for (const c of habilidades) {
  const noCofre = c.fonte._habilidades || [];
  if (!noCofre.length || !c.habs.length) continue;
  const modSet = new Set(c.habs.map(norm));
  const cofreSet = new Set(noCofre.map(norm));
  const soNoCofre = noCofre.filter((h) => !modSet.has(norm(h)));
  const soNoModulo = c.habs.filter((h) => !cofreSet.has(norm(h)));
  if (soNoCofre.length || soNoModulo.length) {
    renomes.push({ nome: c.nome, soNoCofre, soNoModulo });
  }
}
if (renomes.length) {
  console.log(`\n  ${renomes.length} ficha(s) com habilidade divergente (este script não mexe em nome nem em descrição):`);
  for (const r of renomes) {
    if (r.soNoCofre.length) console.log(`     ${r.nome} › só no cofre: ${r.soNoCofre.join(", ")}`);
    if (r.soNoModulo.length) console.log(`     ${r.nome} › só no módulo: ${r.soNoModulo.join(", ")}`);
  }
}
if (semFonte.size) {
  console.log(`\n  ${semFonte.size} ficha(s) do módulo sem bloco od2-monstro no cofre (intocadas):`);
  console.log(`     ${[...semFonte].join(", ")}`);
}

// Fichas do cofre que o módulo não tem: não é erro deste script (ele não cria
// criatura), mas é o aviso de que alguém escreveu uma ficha nova no cofre.
const noModulo = new Set(linhas.flatMap((l) => {
  const n = l.match(NOME);
  return n ? [norm(n[1])] : [];
}));
const soNoCofre = [...doCofre.values()].filter((f) => !noModulo.has(norm(f.nome)));
if (soNoCofre.length) {
  console.log(`\n  ${soNoCofre.length} ficha(s) só no cofre (este script não cria criatura):`);
  for (const f of soNoCofre) console.log(`     ${f.nome}  (${f.arquivo})`);
}

console.log(`\n  ${mudancas.length} campo(s) em ${new Set(mudancas.map((m) => m.nome)).size} ficha(s).`);
if (CONFERIR) {
  console.log("  --conferir: nada foi escrito.");
} else if (mudancas.length) {
  fs.writeFileSync(ALVO, linhas.join("\n"), "utf8");
  console.log(`  Escrito em ${path.relative(process.cwd(), ALVO)}.`);
}
