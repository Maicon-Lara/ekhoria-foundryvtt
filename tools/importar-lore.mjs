// Gera tools/data/livro-lore.mjs a partir do "Ekhoria — Livro de Lore" do cofre.
//
// POR QUE ISTO EXISTE: o Livro de Lore nunca esteve no módulo. O que havia em
// lore.mjs é um texto próprio, mais antigo e mais curto — "Sobre Ekhoria", "Como
// Usar Ekhoria" — escrito antes do livro e nunca reconciliado com ele. Quem
// jogava tinha o resumo no Foundry e o livro no Obsidian, e as duas versões
// discordavam sem que nada acusasse.
//
// Isso ficou visível quando o cofre reescreveu catorze capítulos de uma vez e
// não havia o que sincronizar: não existia alvo. Este script cria o alvo.
//
// Uso:  node tools/importar-lore.mjs   e depois  npm run build
//
// O QUE ELE FAZ:
//
//   • uma JournalEntry com uma PÁGINA POR CAPÍTULO, na ordem do nome do arquivo
//     (00_para_o_jogador … 17_agora), que é a ordem de leitura do livro.
//
//   • resolve os [[wikilinks]] entre capítulos — [[10_segredos]] vira link para
//     aquela página. Os que apontam para fora do livro viram negrito, e são
//     contados no fim: um wikilink morto na página é indistinguível de texto.
//
//   • NÃO toca no lore.mjs antigo. As duas coisas convivem no mesmo pack até
//     você decidir qual fica — e essa decisão é sua, não deste script.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

import { esc, paraHtml, desprotege, reiniciaProtegidos, avisos } from "./markdown.mjs";

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const COFRE = path.join(
  os.homedir(), "Documents", "Ekhoria", "10 Ekhoria", "Compendio",
  "Ekhoria_Livro_Lore",
);
const SAIDA = path.join(AQUI, "data", "livro-lore.mjs");

// O índice do cofre é sumário, não capítulo: repeti-lo como página dentro do
// próprio journal seria um índice que aponta para os irmãos ao lado dele.
const IGNORAR = new Set(["index.md"]);

// ── Leitura ─────────────────────────────────────────────────────────────────

// O nome do arquivo é a ordem de leitura do livro, e é por isso que ele começa
// com número. Ordenar por outra coisa embaralharia os capítulos.
const arquivos = fs.readdirSync(COFRE)
  .filter((f) => f.endsWith(".md") && !IGNORAR.has(f))
  .sort();

// Título da página: o "# " de abertura do capítulo. Sem ele, o nome do arquivo
// sem o prefixo numérico — que é feio, mas é melhor que uma página "Sem título".
function titulo(md, arquivo) {
  const h1 = md.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, "$2$1").trim();
  return arquivo.replace(/\.md$/, "").replace(/^\d+_/, "").replace(/_/g, " ");
}

// Frontmatter YAML do Obsidian: metadado do cofre, não conteúdo do livro.
const semFrontmatter = (s) => s.replace(/^---\n[\s\S]*?\n---\n/, "");

// Embeds de imagem do Obsidian: ![[arkadia_panorama.png]]. As artes do livro
// não estão no módulo — e enquanto não estiverem, a alternativa a omiti-las é
// deixar "arkadia_panorama.png" em negrito no meio da prosa, que é pior que o
// silêncio. Ficam contadas para você decidir se quer publicá-las.
//
// Repare que o "!" tem de sair junto: sem ele o [[...]] restante seria tratado
// como wikilink comum, e o negrito voltaria por outro caminho.
const IMAGENS = /!\[\[([^\]|]+\.(?:png|jpe?g|webp|gif|svg))(?:\|[^\]]*)?\]\]\s*/gi;
const embeds = new Map();
function semImagens(s) {
  return s.replace(IMAGENS, (_, arq) => {
    embeds.set(arq, (embeds.get(arq) || 0) + 1);
    return "";
  });
}

const capitulos = arquivos.map((f) => {
  const bruto = fs.readFileSync(path.join(COFRE, f), "utf8").replace(/\r\n?/g, "\n");
  const corpo = semImagens(semFrontmatter(bruto));
  return { arquivo: f, base: f.replace(/\.md$/, ""), titulo: titulo(corpo, f), corpo };
});

// ── Links ───────────────────────────────────────────────────────────────────

const normaliza = (s) =>
  String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/\.md$/, "").replace(/[^a-z0-9]+/g, "");

// Um capítulo é alcançável pelo nome do arquivo ("10_segredos") e pelo título
// ("Os Segredos de Ekhoria") — o cofre usa as duas formas, às vezes na mesma
// frase, e resolver só uma delas deixaria metade dos links mortos.
const PAGINA = new Map();
for (const c of capitulos) {
  PAGINA.set(normaliza(c.base), c);
  PAGINA.set(normaliza(c.titulo), c);
}

const contagem = { interno: 0, solto: 0 };
const soltos = new Map();

// Âncora interna do Foundry. O journal é um só, então basta o nome da página:
// @UUID de página exige o id do journal, que só existe depois da build — e
// amarrar o texto a um id gerado tornaria a saída não reprodutível.
function contexto() {
  return {
    wikilink(alvo, rotulo) {
      // "[[12_mapa#Vale da Águia]]" — a âncora de seção não é parte do arquivo.
      const semAncora = alvo.split("#")[0].trim() || alvo;
      const destino = PAGINA.get(normaliza(semAncora));
      if (destino) {
        contagem.interno++;
        return `<a class="content-link" data-type="JournalEntryPage" data-page="${esc(destino.titulo)}">${esc(rotulo)}</a>`;
      }
      contagem.solto++;
      soltos.set(semAncora, (soltos.get(semAncora) || 0) + 1);
      return `<strong>${esc(rotulo)}</strong>`;
    },
  };
}

// ── Escrita ─────────────────────────────────────────────────────────────────

const paginas = capitulos.map((c) => {
  reiniciaProtegidos();
  return { title: c.titulo, content: desprotege(paraHtml(c.corpo, contexto())) };
});

const entrada = { title: "Ekhoria — Livro de Lore", pages: paginas };

const cabecalho = `// Journal do "Ekhoria — Livro de Lore" (cofre Obsidian).
//
// GERADO — não editar à mão. Rode \`npm run importar-lore\` e depois
// \`npm run build\`. A fonte é Compendio/Ekhoria_Livro_Lore.
//
// Uma página por capítulo, na ordem do livro; os [[wikilinks]] entre capítulos
// viram links de conteúdo. Ver tools/importar-lore.mjs.

export const livroLoreJournal = ${JSON.stringify(entrada, null, 2)};
`;

fs.writeFileSync(SAIDA, cabecalho, "utf8");

const kb = Math.round(paginas.reduce((t, p) => t + p.content.length, 0) / 1024);
console.log(`  ${paginas.length} capítulos, ${kb} KB de HTML -> tools/data/livro-lore.mjs`);
for (const p of paginas) {
  console.log(`     ${p.title.slice(0, 46).padEnd(46)} ${String(Math.round(p.content.length / 1024)).padStart(4)} KB`);
}
console.log(`\n  links: ${contagem.interno} entre capítulos`);
if (embeds.size) {
  const total = [...embeds.values()].reduce((a, b) => a + b, 0);
  console.log(`         ${total} embed(s) de imagem omitidos (${embeds.size} arquivos distintos)`);
  console.log("         — as artes do livro não estão em ekhoria-module/assets.");
}
if (contagem.solto) {
  console.log(`         ${contagem.solto} sem destino no livro (viraram negrito):`);
  for (const [alvo, n] of [...soltos].sort((a, b) => b[1] - a[1]).slice(0, 12)) {
    console.log(`            ${alvo}${n > 1 ? ` (${n}×)` : ""}`);
  }
}
if (avisos.length) {
  console.log(`\n  ${avisos.length} aviso(s) sobre a fonte no cofre:`);
  for (const a of [...new Set(avisos)]) console.log(`     ${a}`);
}
