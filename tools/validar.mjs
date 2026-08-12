// Validação do módulo contra o cofre Obsidian.
//
// POR QUE ISTO EXISTE: toda vez que o cofre muda, a conferência era feita à mão,
// com scripts descartáveis. Foi assim que "Sangue Infernal" (habilidade que o
// módulo concedia e o livro não), o Silêncio Arcano (renomeado no cofre, antigo
// no módulo) e dez deslocamentos truncados passaram despercebidos. Nenhum deles
// dava erro: a ficha abria, o texto estava certo, e o número não.
//
// Uso:  npm run validar        (sai com código 1 se houver erro)
//
// NÃO corrige nada — aponta e explica. Qual lado está certo é decisão sua: às
// vezes é o módulo (XP de chefe calibrado à mão, por exemplo).
//
// ── COMO O COFRE MARCA UMA HABILIDADE ───────────────────────────────────────
// O livro usa três formas de marcador de nível, todas equivalentes:
//     ==**[1]**== **Nome da Habilidade:** texto…
//     - **[6]** **Nome da Habilidade:** texto…
//     - ==**[3]**== **Nome da Habilidade:** texto…
// e escreve as EVOLUÇÕES com o mesmo marcador, mas sem nome em negrito:
//     - ==**[3]**== O dano desarmado letal sobe para **1d4 + mod. de Força**.
//
// É essa a diferença que o extrator usa: só conta como habilidade o que tem
// **Nome:** logo depois do marcador. Sem isso, toda linha de evolução virava
// uma "habilidade faltando no módulo" e o relatório ficava impossível de ler.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

import { classes } from "./data/classes.mjs";
import { classAbilitiesAvulsas } from "./data/avulsas.mjs";
import { racas } from "./data/racas.mjs";
import { grupos as gruposBestiario } from "./data/bestiario.mjs";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const COFRE = path.join(os.homedir(), "Documents", "Ekhoria", "10 Ekhoria", "Compendio");

// O livro titula algumas classes diferente do nome do item. Mapa explícito de
// propósito: a versão anterior tentava adivinhar cortando a primeira palavra, e
// "Guardião da Centelha" casou com a seção do "Guardião da Pira".
const TITULO_NO_LIVRO = { "Guardião da Centelha": "Guardiões da Centelha" };

const achados = [];
const anota = (area, gravidade, msg) => achados.push({ area, gravidade, msg });
const erro = (area, msg) => anota(area, "erro", msg);
const aviso = (area, msg) => anota(area, "aviso", msg);

const norm = (s) =>
  String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/\([^)]*\)/g, " ")          // "Ecdise (desvantagem)" == "Ecdise"
    .replace(/[^a-z0-9]+/g, " ").trim();

// Em NOME DE CRIATURA o parêntese é identidade, não qualificador: o cofre tem
// quatro Silentes Ancorados que só diferem por ele. Com o norm() de cima os
// quatro viravam a mesma chave, e o Arqueiro era comparado contra o Sargento —
// onze "erros" que não existiam.
const normNome = (s) =>
  String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, " ").trim();

const semHtml = (s) => String(s ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

// O cofre grava CRLF. Normalizar na leitura, e não em cada regex, porque o
// esquecimento é silencioso: /```od2-monstro\n/ não casava nada, e o bestiário
// passou a reportar "0 erros" sem nunca ter comparado uma ficha sequer.
const semCR = (s) => s.replace(/\r\n?/g, "\n");

const leCofre = (rel) => {
  const p = path.join(COFRE, rel);
  return fs.existsSync(p) ? semCR(fs.readFileSync(p, "utf8")) : null;
};

// ════════════════════════════════════════════════════════════════════════════
// 1. Coerência interna — o texto promete um número que o dado não entrega.
//    Não depende do cofre: é contradição dentro do próprio módulo, e é a que
//    ninguém pega relendo, porque a ficha parece certa.
// ════════════════════════════════════════════════════════════════════════════

const TODAS_HABILIDADES = [
  ...classes.flatMap((c) => (c.habilidades || []).map((h) => [c.nome, h])),
  ...classAbilitiesAvulsas.map((h) => [h.folder, h]),
];

const FALA_EM_DIA = /por dia|ao dia|\/dia|×\/dia/i;

function validaUsosDiarios() {
  const AREA = "usos diários";

  for (const [dono, hab] of TODAS_HABILIDADES) {
    const texto = semHtml([hab.desc, hab.level3, hab.level6, hab.level10].join(" "));
    const promete = FALA_EM_DIA.test(texto);
    const usos = hab.usos_dia;

    if (promete && usos === undefined) {
      erro(AREA, `${dono} › ${hab.nome}: o texto fala em uso diário e a habilidade não tem \`usos_dia\` — a ficha não desenha marcador nenhum.`);
      continue;
    }
    if (usos === undefined) continue;

    // Texto promete escada ("2×/dia no 6º"), mas usos_dia é número fixo?
    const degraus = [];
    for (const [campo, nivel] of [["level3", 3], ["level6", 6], ["level10", 10]]) {
      if (FALA_EM_DIA.test(semHtml(hab[campo]))) degraus.push(nivel);
    }
    if (degraus.length && typeof usos !== "object") {
      erro(AREA, `${dono} › ${hab.nome}: a evolução de nível ${degraus.join("/")} promete mais usos por dia, mas \`usos_dia\` é ${JSON.stringify(usos)} — fixo. A ficha mostra sempre a mesma quantidade de caixas.`);
    }
    if (typeof usos === "object") {
      const chaves = Object.keys(usos).map(Number);
      const base = hab.level ?? 1;
      if (!chaves.includes(base)) {
        erro(AREA, `${dono} › ${hab.nome}: \`usos_dia\` começa no nível ${Math.min(...chaves)}, mas a habilidade vem no ${base}º — fica sem usos até lá.`);
      }
      for (const d of degraus) {
        if (!chaves.includes(d)) {
          erro(AREA, `${dono} › ${hab.nome}: a evolução do ${d}º promete mais usos, mas \`usos_dia\` não tem degrau em ${d}.`);
        }
      }
    }
  }
}

function validaChavesDeTalento() {
  const AREA = "talentos";
  const porNome = new Map();
  const chaves = new Set();

  for (const [, hab] of TODAS_HABILIDADES) {
    for (const t of hab.rogue_talents || []) {
      chaves.add(t.key);
      const n = norm(t.name);
      if (!porNome.has(n)) porNome.set(n, new Set());
      porNome.get(n).add(t.key);
    }
  }

  // Os pontos gastos são gravados POR CHAVE (system.rogue_talent_points) e um
  // bônus de raça casa por chave. Duas chaves para o mesmo talento = ambiguidade.
  for (const [nome, ks] of porNome) {
    if (ks.size > 1) {
      erro(AREA, `o talento "${nome}" aparece com ${ks.size} chaves (${[...ks].join(", ")}). Os pontos são gravados por chave — unifique.`);
    }
  }
  for (const a of chaves) {
    for (const b of chaves) {
      if (a < b && (a === b.replace(/s$/, "") || b === a.replace(/s$/, ""))) {
        aviso(AREA, `as chaves "${a}" e "${b}" diferem só no plural — se são o mesmo talento, unifique.`);
      }
    }
  }

  // O OD2 lê só a PRIMEIRA habilidade com rogue_talents (available_rogue_talents
  // faz .find()); uma segunda seria ignorada em silêncio.
  for (const c of classes) {
    const portadoras = (c.habilidades || []).filter((h) => (h.rogue_talents || []).length);
    if (portadoras.length > 1) {
      erro(AREA, `${c.nome}: ${portadoras.length} habilidades com \`rogue_talents\` (${portadoras.map((h) => h.nome).join(", ")}). O sistema usa só a primeira.`);
    }
  }
}

// ════════════════════════════════════════════════════════════════════════════
// 2. Cofre × módulo
// ════════════════════════════════════════════════════════════════════════════

// Só conta como habilidade o que traz o NOME EM NEGRITO. O livro escreve isso
// de duas formas, e as duas valem:
//     ==**[1]**== **Nome:**        marcador antes
//     - **Nome (1º):**             nível dentro do próprio nome
// Linha de evolução ("- ==**[3]**== O dano sobe para **1d4**") não tem nome em
// negrito seguido de dois-pontos, e é assim que ela fica de fora.
function habilidadesDoCapitulo(texto) {
  const out = [];
  const comMarcador = /(?:==)?\*\*(?:==)?\[?(\d+)[ºo]?\]?(?:==)?\*\*(?:==)?\s*\*\*([^*\n]{2,60}?):\*\*/g;
  for (const m of texto.matchAll(comMarcador)) {
    out.push({ nivel: Number(m[1]), nome: m[2].trim() });
  }
  const nivelNoNome = /\*\*([^*\n]{2,60}?)\s*\((\d+)[ºo]\)\s*:\*\*/g;
  for (const m of texto.matchAll(nivelNoNome)) {
    out.push({ nivel: Number(m[2]), nome: m[1].trim() });
  }
  return out;
}

// Corpo de uma seção, até o próximo cabeçalho de nível IGUAL OU SUPERIOR — a
// semântica normal de markdown. Cortar em qualquer cabeçalho truncava o Marcado
// na "Lista Comum de Ecos" e escondia tudo que vinha depois dela; não cortar
// nunca fazia a seção engolir o capítulo seguinte.
function secao(texto, titulo) {
  const esc = titulo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = texto.match(new RegExp(`^(#{1,4}) .*${esc}.*$`, "m"));
  if (!m) return null;
  const nivel = m[1].length;
  const resto = texto.slice(m.index + m[0].length);
  // Além do nível, para no cabeçalho que abre outro capítulo. O Marcado é o
  // único titulado com "#" em vez de "##", e sem esta segunda barreira a seção
  // dele ia até o fim do arquivo, acusando as habilidades de mais cinco classes
  // como "faltando no Marcado".
  const OUTRO_CAPITULO = new RegExp(`^(?:#{1,${nivel}} |#{1,4} !\\[\\[trans_)`, "m");
  const fim = resto.search(OUTRO_CAPITULO);
  return fim === -1 ? resto : resto.slice(0, fim);
}

// Habilidades que o módulo dá a toda classe e o livro documenta UMA vez, num
// capítulo próprio ("Reputação no Estágio de Legado": *vale para todas as
// classes deste capítulo, e por isso não se repete em cada uma*). Sem esta
// lista são dezesseis avisos idênticos, e dezesseis avisos que nunca são nada
// treinam a pessoa a ignorar a seção inteira.
const FORA_DA_SECAO = new Set(["reputacao"]);

function validaClasses() {
  const AREA = "classes";
  const livro = leCofre("Ekhoria_Livro_Mecanicas/03_classes.md");
  if (!livro) return aviso(AREA, "03_classes.md não encontrado no cofre — pulei.");

  for (const cls of classes) {
    const corpo = secao(livro, TITULO_NO_LIVRO[cls.nome] || cls.nome);
    if (!corpo) {
      aviso(AREA, `${cls.nome}: não achei a seção no livro. Se o título mudou, acrescente em TITULO_NO_LIVRO.`);
      continue;
    }
    const noLivro = habilidadesDoCapitulo(corpo);
    if (!noLivro.length) continue;

    // O lado do módulo inclui as escolhas avulsas da classe (Escolas, Ecos,
    // Maestrias), que vivem em pastas "Classe (Grupo)".
    const avulsasDaClasse = classAbilitiesAvulsas.filter((h) =>
      norm(h.folder).startsWith(norm(cls.nome)));
    const doModulo = [...(cls.habilidades || []), ...avulsasDaClasse];
    const nomesMod = new Map(doModulo.map((h) => [norm(h.nome), h]));

    // Nem tudo que o livro nomeia vira um item: os três degraus de uma Escola
    // do Marcado são uma habilidade só, com level6/level10. Se o nome aparece
    // no TEXTO do módulo, está entregue — só o empacotamento é diferente.
    const textoDoModulo = norm(doModulo
      .map((h) => semHtml([h.desc, h.level3, h.level6, h.level10].join(" ")))
      .join(" "));

    for (const h of noLivro) {
      const noMod = nomesMod.get(norm(h.nome));
      if (!noMod) {
        if (!textoDoModulo.includes(norm(h.nome))) {
          erro(AREA, `${cls.nome} › "${h.nome}" (nível ${h.nivel}): está no livro e falta no módulo.`);
        }
      } else if ((noMod.level ?? 1) !== h.nivel) {
        erro(AREA, `${cls.nome} › "${h.nome}": nível ${noMod.level ?? 1} no módulo, ${h.nivel} no livro.`);
      }
    }
    const nomesLivro = new Set(noLivro.map((h) => norm(h.nome)));
    for (const h of cls.habilidades || []) {
      if (FORA_DA_SECAO.has(norm(h.nome))) continue;
      if (!nomesLivro.has(norm(h.nome))) {
        aviso(AREA, `${cls.nome} › "${h.nome}": está no módulo e não achei no livro.`);
      }
    }
  }
}

function validaRacas() {
  const AREA = "raças";
  // 02_povos.md é a fonte: os arquivos de Sistema/Povos são resumos, e um
  // resumo omitindo uma habilidade não é o mesmo que o livro não concedê-la.
  const livro = leCofre("Ekhoria_Livro_Mecanicas/02_povos.md");
  if (!livro) return aviso(AREA, "02_povos.md não encontrado no cofre — pulei.");

  for (const raca of racas) {
    // O livro titula os povos no plural, e o plural cai na PRIMEIRA palavra:
    // "Elfo Drow" vira "Elfos Drow", não "Elfo Drows".
    const corpo =
      secao(livro, raca.nome) ||
      secao(livro, raca.nome.replace(/^(\S+?)(m?)(\s|$)/, (_, a, m, s) => a + (m ? "ns" : "s") + s)) ||
      secao(livro, `${raca.nome}s`);
    if (!corpo) {
      aviso(AREA, `${raca.nome}: não achei a seção em 02_povos.md.`);
      continue;
    }
    const noLivro = habilidadesDoCapitulo(corpo);
    if (!noLivro.length) continue;

    const nomesMod = new Set((raca.habilidades || []).map((h) => norm(h.nome)));
    const nomesLivro = new Set(noLivro.map((h) => norm(h.nome)));

    for (const h of noLivro) {
      if (!nomesMod.has(norm(h.nome))) {
        erro(AREA, `${raca.nome} › "${h.nome}": está no livro e falta no módulo.`);
      }
    }
    for (const h of raca.habilidades || []) {
      if (!nomesLivro.has(norm(h.nome))) {
        erro(AREA, `${raca.nome} › "${h.nome}": o módulo concede e o livro não lista.`);
      }
    }
  }
}

// Mesma leitura de deslocamento do build: comparar "12" com "12 m" como texto
// acusaria divergência onde não há — o que importa é o que chega na ficha.
function mv(txt) {
  const t = String(txt ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const compacta = t.match(/^(\d+)\s*\/\s*(\d+)\s*([a-z]*)/);
  if (compacta) return `${compacta[1]}|${compacta[2]}${compacta[3][0] || ""}`;
  const n = t.match(/^\s*(\d+)/);
  const extra = t.match(/(?:voa|voo|nada|nado|escava|cava)\w*\s*(\d+)/);
  return `${n ? n[1] : ""}${extra ? "|" + extra[1] : ""}`;
}

function validaBestiario() {
  const AREA = "bestiário";
  const dir = path.join(COFRE, "Sistema", "Bestiario");
  if (!fs.existsSync(dir)) return aviso(AREA, "Sistema/Bestiario não encontrado — pulei.");

  const doCofre = new Map();
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md"))) {
    const txt = semCR(fs.readFileSync(path.join(dir, f), "utf8"));
    for (const bloco of txt.matchAll(/```od2-monstro\n([\s\S]*?)```/g)) {
      const campos = {};
      for (const linha of bloco[1].split("\n")) {
        const m = linha.match(/^([a-z_]+):\s*(.+?)\s*$/);
        if (m) campos[m[1]] = m[2].replace(/^["']|["']$/g, "");
      }
      if (campos.nome) doCofre.set(normNome(campos.nome), campos);
    }
  }

  let comparados = 0;
  for (const grupo of gruposBestiario) {
    for (const m of grupo.monstros || []) {
      const fonte = doCofre.get(normNome(m.nome));
      if (!fonte) continue;
      comparados++;
      for (const c of ["dv", "pv", "ca", "jp", "moral", "xp"]) {
        if (fonte[c] === undefined) continue;
        if (String(fonte[c]).trim() !== String(m[c] ?? "").trim()) {
          erro(AREA, `${m.nome} › ${c}: cofre ${JSON.stringify(String(fonte[c]))}, módulo ${JSON.stringify(String(m[c] ?? ""))}.`);
        }
      }
      if (fonte.movimento !== undefined && mv(fonte.movimento) !== mv(m.movimento)) {
        erro(AREA, `${m.nome} › movimento: cofre ${JSON.stringify(fonte.movimento)} chega como ${mv(fonte.movimento)}, módulo ${JSON.stringify(m.movimento)} chega como ${mv(m.movimento)}.`);
      }
      // Habilidade não se compara aqui: quem faz isso é o
      // sincronizar-bestiario.mjs, que sabe ler a lista aninhada do YAML e as
      // duas formas em que o módulo escreve a dele. O que havia neste lugar era
      // um Set construído a partir de um ternário com os dois ramos vazios —
      // sempre vazio, e portanto sempre em silêncio.
    }
  }
  if (!comparados) aviso(AREA, "nenhuma ficha do cofre casou por nome com o bestiário do módulo.");
}

// Termos que o cofre renomeou. Acrescente aqui quando um rename acontecer: é a
// rede que pega a ocorrência esquecida num arquivo que ninguém lembrou de abrir.
const RENOMEADOS = [
  ["Eco Antimágico", "Silêncio Arcano"],
  ["Marcas do Cambion", "Estigmas do Cambion"],
  ["Arkanita", "Arcanita"],
  ["Filha da Contenção que Falha", "Feita de Escuro"],
  ["Talentos de Caçador", "Talentos de Voraz"],
  ["Firmeza do Caçador", "Firmeza do Voraz"],
  ["Caçada Implacável", "Perseguição Implacável"],
  ["Bom de Briga", "Punhos como Arma"],
];

function validaTermosAntigos() {
  const AREA = "termos";
  const dir = path.join(AQUI, "data");
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".mjs"))) {
    const txt = fs.readFileSync(path.join(dir, f), "utf8");
    for (const [antigo, novo] of RENOMEADOS) {
      if (txt.includes(antigo)) {
        erro(AREA, `data/${f} ainda usa "${antigo}" — o cofre renomeou para "${novo}".`);
      }
    }
  }
  // O mesmo termo antigo pode ter sobrado no cofre: aí quem está atrasado é ele.
  for (const [antigo, novo] of RENOMEADOS) {
    const livro = leCofre("Ekhoria_Livro_Mecanicas/03_classes.md") || "";
    if (livro.includes(antigo)) {
      aviso(AREA, `03_classes.md ainda usa "${antigo}" enquanto o resto do cofre já diz "${novo}".`);
    }
  }
}

// ════════════════════════════════════════════════════════════════════════════

validaUsosDiarios();
validaChavesDeTalento();
validaClasses();
validaRacas();
validaBestiario();
validaTermosAntigos();

console.log("Validando o módulo contra o cofre…\n");
for (const area of [...new Set(achados.map((a) => a.area))]) {
  const doArea = achados.filter((a) => a.area === area);
  const e = doArea.filter((x) => x.gravidade === "erro").length;
  console.log(`── ${area} — ${e} erro(s), ${doArea.length - e} aviso(s)`);
  for (const a of doArea) console.log(`   ${a.gravidade === "erro" ? "✗" : "!"} ${a.msg}`);
  console.log("");
}

const erros = achados.filter((a) => a.gravidade === "erro").length;
if (!achados.length) console.log("Nada a apontar: módulo e cofre batem.");
else console.log(`Total: ${erros} erro(s), ${achados.length - erros} aviso(s).`);

process.exit(erros ? 1 : 0);
