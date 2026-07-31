// Gera tools/data/campanha.mjs a partir dos 33 arquivos de "A Guerra do
// Esmaecer" no cofre Obsidian.
//
// POR QUE ISTO EXISTE: campanha.mjs sempre disse "GERADO a partir dos arquivos
// Markdown do cofre", mas o gerador nunca existiu — a conversão foi feita uma
// vez, à mão. Resultado: quando a campanha mudava, a única saída era editar 1,4
// MB de HTML escapado (a renomeação "Eco Antimágico" -> "Silêncio Arcano" foi
// feita com sed, torcendo para não pegar nada demais).
//
// Uso:  npm run importar-campanha   e depois  npm run build
//
// O QUE ELE FAZ ALÉM DE CONVERTER:
//
//   • quebra em uma JournalEntry POR ARCO, dentro de uma pasta. Antes era uma
//     entrada só, de 1,4 MB: abrir qualquer página carregava a campanha inteira.
//
//   • resolve os [[wikilinks]] do cofre. Eles já são as referências cruzadas que
//     você escreveu — [[A17_A_Ancora]] vira link para aquela página, [[Umbra
//     Pávida]] vira link para a ficha no bestiário. No módulo antigo viravam
//     texto morto.
//
//   • liga a PRIMEIRA menção de cada criatura em cada página. O texto cita 82
//     das 111 criaturas dos compêndios; clicar no nome abre a ficha, e dá para
//     arrastar dela para o mapa sem sair da cena.
//
//   • troca cada bloco ```od2-monstro``` por um resumo + link para o ator. A
//     ficha completa já é um Actor do bestiário desde a importação de ameaças —
//     repetir o bloco inteiro na página era manter a mesma estatística em dois
//     lugares, que é como elas passam a divergir.

import fs from "node:fs";
import path from "node:path";
import os from "node:os";

import { makeId } from "./lib.mjs";
import { ameacas } from "./data/ameacas.mjs";
import { grupos as gruposBestiario } from "./data/bestiario.mjs";

const COFRE = path.join(
  os.homedir(), "Documents", "Ekhoria", "10 Ekhoria", "Compendio",
  "Campanhas", "A Guerra do Esmaecer",
);
const RAIZ = path.dirname(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")));
const SAIDA = path.join(RAIZ, "tools", "data", "campanha.mjs");

const PACK = "ekhoria-campanha";
const PACK_BESTIARIO = "ekhoria-bestiario";

// ── Arcos ───────────────────────────────────────────────────────────────────
// A ordem aqui é a ordem de jogo, e vira a ordem das entradas no compêndio.
const ARCOS = [
  { chave: "raiz", titulo: "A Guerra do Esmaecer — Fundação" },
  { chave: "Arco 1", titulo: "A Guerra do Esmaecer — Arco 1: Sob o Ônix" },
  { chave: "Interludio", titulo: "A Guerra do Esmaecer — Interlúdio" },
  { chave: "Arco 2", titulo: "A Guerra do Esmaecer — Arco 2" },
  { chave: "Arco 3", titulo: "A Guerra do Esmaecer — Arco 3" },
];

// ── Conversão de Markdown ───────────────────────────────────────────────────

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Marcadores internos: protegem trechos já convertidos de sofrerem uma segunda
// passada de inline (um link não pode ter o próprio rótulo re-processado).
const COFRE_MARCA = "\uE000"; // area de uso privado: nao ocorre no texto do cofre
let protegidos = [];
const protege = (html) => {
  protegidos.push(html);
  return `${COFRE_MARCA}${protegidos.length - 1}${COFRE_MARCA}`;
};
const desprotege = (s) =>
  s.replace(new RegExp(`${COFRE_MARCA}(\\d+)${COFRE_MARCA}`, "g"), (_, i) => protegidos[Number(i)]);

// Inline: código, wikilink, negrito, itálico. Nesta ordem — o código vem antes
// para que `**` dentro de crase não vire negrito.
function inline(txt, ctx) {
  let s = esc(txt);
  s = s.replace(/`([^`\n]+)`/g, (_, c) => protege(`<code>${c}</code>`));
  s = s.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, alvo, rotulo) =>
    protege(ctx.wikilink(alvo.trim(), (rotulo || alvo).trim())));
  // Negrito antes do itálico, e sem proibir "*" no miolo: o livro escreve
  // "**A regra é *subordinação a um governo vivo*.**" o tempo todo, e um
  // [^*]+ no meio nunca fecharia esse par — a linha saía com os asteriscos
  // crus na página. O não-guloso fecha no primeiro "**" seguinte.
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/(?<![*\w])\*([^*\n]+)\*(?!\*)/g, "<em>$1</em>");
  return s;
}

// Uma linha de tabela em células, sem os pipes das pontas.
//
// O `|` de um wikilink com rótulo — [[A16_A_Batalha|Av. 16]] — é o MESMO
// caractere que separa célula. Dividir direto partia o link em dois pedaços, e
// o que sobrava ("[[A16_A_Batalha" numa célula, "Av. 16]]" na outra) aparecia
// cru na página. Os wikilinks saem antes do split e voltam depois.
const RE_WIKI_BRUTO = /\[\[[^\]]*\]\]/g;
function celulas(linha) {
  const guardados = [];
  const mascarado = linha.replace(RE_WIKI_BRUTO, (w) => {
    guardados.push(w);
    return `${COFRE_MARCA}w${guardados.length - 1}${COFRE_MARCA}`;
  });
  return mascarado
    .replace(/^\s*\|/, "")
    .replace(/\|\s*$/, "")
    .split("|")
    .map((c) =>
      c.trim().replace(new RegExp(`${COFRE_MARCA}w(\\d+)${COFRE_MARCA}`, "g"),
        (_, i) => guardados[Number(i)]));
}

// Uma classe de caracteres so, de proposito: a versao anterior punha dois
// quantificadores em volta do "-" e dava retrocesso exponencial numa linha
// longa de "|---|---|---|". O importador nao terminava no primeiro arquivo
// com tabela grande, e isso nao aparece como erro: ele so nunca volta.
const ehSeparador = (linha) =>
  /^[\s:|-]+$/.test(linha) && linha.includes("-") && linha.includes("|");

// Converte um documento markdown inteiro. Parser de blocos, linha a linha: cada
// construção consome as linhas que lhe pertencem e devolve HTML.
function paraHtml(md, ctx, raiz = true) {
  const linhas = md.split("\n");
  const out = [];
  let i = 0;

  const paragrafo = (buf) => {
    if (buf.length) out.push(`<p>${inline(buf.join(" "), ctx)}</p>`);
    buf.length = 0;
  };

  // Listas podem aninhar por indentação; a recursão fecha na volta.
  function lista(nivelBase) {
    const ordenada = /^\s*\d+[.)] /.test(linhas[i]);
    const itens = [];
    let ultimoItem = -1;
    while (i < linhas.length) {
      if (i === ultimoItem) {
        throw new Error(`lista parada na linha ${i + 1}: ${JSON.stringify(linhas[i].slice(0, 90))}`);
      }
      ultimoItem = i;
      const ln = linhas[i];
      const m = ln.match(/^(\s*)(?:[-*+]|\d+[.)])\s+(.*)$/);
      if (!m) break;
      const indent = m[1].replace(/\t/g, "  ").length;
      if (indent < nivelBase) break;
      if (indent > nivelBase) {
        itens[itens.length - 1] = (itens[itens.length - 1] || "") + lista(indent);
        continue;
      }
      i++;
      let texto = m[2];
      // Continuação: linha seguinte indentada e sem marcador.
      while (i < linhas.length && /^\s+\S/.test(linhas[i]) &&
             !/^(\s*)(?:[-*+]|\d+[.)])\s+/.test(linhas[i])) {
        texto += " " + linhas[i].trim();
        i++;
      }
      itens.push(`<li>${inline(texto, ctx)}</li>`);
    }
    const tag = ordenada ? "ol" : "ul";
    return `<${tag}>\n${itens.join("\n")}\n</${tag}>`;
  }

  const buf = [];
  let ultimo = -1;
  while (i < linhas.length) {
    // Trava de segurança: todo ramo do laço tem de consumir pelo menos uma
    // linha. Sem isto, um bloco que não casa com nada vira laço infinito — e a
    // única evidência é o processo que não volta, sem erro nenhum. A checagem
    // fica no topo porque quase todos os ramos saem por `continue`.
    if (i === ultimo) {
      throw new Error(`laço parado na linha ${i + 1}: ${JSON.stringify(linhas[i].slice(0, 90))}`);
    }
    ultimo = i;
    const ln = linhas[i];

    if (!ln.trim()) { paragrafo(buf); i++; continue; }

    // Cerca de código
    if (/^```/.test(ln)) {
      paragrafo(buf);
      const lang = ln.slice(3).trim();
      const corpo = [];
      i++;
      while (i < linhas.length && !/^```/.test(linhas[i])) corpo.push(linhas[i++]);
      i++; // fecha
      out.push(lang === "od2-monstro"
        ? ctx.blocoMonstro(corpo.join("\n"))
        : `<pre><code>${esc(corpo.join("\n"))}</code></pre>`);
      continue;
    }

    // Cabeçalho
    const h = ln.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      paragrafo(buf);
      // O "# Título" de abertura já é o nome da página — não se repete no corpo.
      if (!(raiz && h[1].length === 1 && out.length === 0)) {
        const n = Math.min(6, h[1].length + 1); // desce um nível: h1 é o título da página
        out.push(`<h${n}>${inline(h[2], ctx)}</h${n}>`);
      }
      i++;
      continue;
    }

    // Régua
    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(ln)) {
      paragrafo(buf); out.push("<hr>"); i++; continue;
    }

    // Tabela: linha de pipes seguida de separador
    if (/^\s*\|/.test(ln) && i + 1 < linhas.length && ehSeparador(linhas[i + 1])) {
      paragrafo(buf);
      const cab = celulas(ln);
      i += 2;
      const corpo = [];
      while (i < linhas.length && /^\s*\|/.test(linhas[i])) corpo.push(celulas(linhas[i++]));
      out.push(
        "<table>\n<thead><tr>" + cab.map((c) => `<th>${inline(c, ctx)}</th>`).join("") + "</tr></thead>\n<tbody>\n" +
        corpo.map((r) => "<tr>" + r.map((c) => `<td>${inline(c, ctx)}</td>`).join("") + "</tr>").join("\n") +
        "\n</tbody>\n</table>",
      );
      continue;
    }

    // Linhas de tabela órfãs: começam com "|" mas não têm cabeçalho nem
    // separador acima. Acontece quando uma citação é inserida no MEIO de uma
    // tabela no cofre e parte as linhas de baixo (A6, linha 234). Sem este
    // ramo elas viravam um parágrafo cheio de "|" na página. O aviso no fim da
    // execução diz onde arrumar a fonte.
    if (/^\s*\|/.test(ln) && (ln.match(/\|/g) || []).length >= 2) {
      paragrafo(buf);
      const corpo = [];
      while (i < linhas.length && /^\s*\|/.test(linhas[i])) corpo.push(celulas(linhas[i++]));
      avisos.push(`tabela sem cabeçalho (${corpo.length} linha(s)): ${corpo[0].slice(0, 2).join(" | ").slice(0, 70)}…`);
      out.push("<table>\n<tbody>\n" +
        corpo.map((r) => "<tr>" + r.map((c) => `<td>${inline(c, ctx)}</td>`).join("") + "</tr>").join("\n") +
        "\n</tbody>\n</table>");
      continue;
    }

    // Citação: consome as linhas ">" seguidas; ">" sozinho separa parágrafos.
    if (/^\s*>/.test(ln)) {
      paragrafo(buf);
      const dentro = [];
      while (i < linhas.length && /^\s*>/.test(linhas[i])) {
        dentro.push(linhas[i].replace(/^\s*>\s?/, ""));
        i++;
      }
      // O conteúdo da citação passa pelo MESMO conversor, recursivamente. As
      // notas de mesa do livro trazem tabela, cabeçalho e lista dentro do "> ",
      // e a versão anterior só sabia tratar parágrafo e lista solta: uma tabela
      // inteira saía como um parágrafo cheio de "|".
      out.push(`<blockquote>\n${paraHtml(dentro.join("\n"), ctx, false)}\n</blockquote>`);
      continue;
    }

    // Lista
    if (/^(\s*)(?:[-*+]|\d+[.)])\s+/.test(ln)) {
      paragrafo(buf);
      const indent = (ln.match(/^(\s*)/)[1] || "").replace(/\t/g, "  ").length;
      out.push(lista(indent));
      continue;
    }

    buf.push(ln.trim());
    i++;
  }
  paragrafo(buf);
  return out.join("\n");
}

// ── Leitura do cofre ────────────────────────────────────────────────────────

function arquivos() {
  const achados = [];
  (function anda(dir, arco) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) anda(p, e.name);
      else if (e.name.endsWith(".md")) achados.push({ caminho: p, arquivo: e.name, arco: arco || "raiz" });
    }
  })(COFRE, null);
  return achados.sort((a, b) => a.arquivo.localeCompare(b.arquivo, "pt"));
}

// Frontmatter fora, título do `title:` ou do primeiro "# ".
//
// O `\r` do CRLF sai aqui, antes de qualquer regex. Em JS o `\r` é terminador
// de linha, então o `.` de `(.*)$` NÃO o casa: uma linha "  - item\r" não era
// reconhecida como item de lista, o parser devolvia sem consumir nada e o laço
// externo a reoferecia para sempre. Pelo mesmo motivo o frontmatter escapava do
// `/^---\n/` e as tags do YAML viravam conteúdo da página.
function corpoETitulo(texto, arquivo) {
  let t = texto.replace(/\r\n?/g, "\n");
  let titulo = null;
  const fm = t.match(/^---\n([\s\S]*?)\n---\n?/);
  if (fm) {
    const m = fm[1].match(/^title:\s*"?([^"\n]+)"?\s*$/m);
    if (m) titulo = m[1].trim();
    t = t.slice(fm[0].length);
  }
  if (!titulo) {
    const h1 = t.match(/^#\s+(.+)$/m);
    titulo = h1 ? h1[1].trim() : path.basename(arquivo, ".md");
  }
  return { corpo: t, titulo };
}

// ── Índice de criaturas e de páginas, para os links ─────────────────────────

// Mesmas sementes do build (buildBestiarioDocs): monster:<pasta>:<nome>.
function indiceCriaturas() {
  const idx = new Map();
  const registra = (grupo) => {
    for (const m of grupo.monstros || []) {
      const id = makeId(`monster:${grupo.folder}:${m.nome}`);
      idx.set(m.nome, `Compendium.ekhoria.${PACK_BESTIARIO}.Actor.${id}`);
    }
  };
  gruposBestiario.forEach(registra);
  ameacas.forEach(registra);
  return idx;
}

const normaliza = (s) =>
  String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

// ── Montagem ────────────────────────────────────────────────────────────────

const CRIATURAS = indiceCriaturas();
const CRIATURA_POR_CHAVE = new Map([...CRIATURAS].map(([n, u]) => [normaliza(n), { nome: n, uuid: u }]));

const docs = arquivos().map((f) => {
  const { corpo, titulo } = corpoETitulo(fs.readFileSync(f.caminho, "utf8"), f.arquivo);
  return { ...f, corpo, titulo, base: path.basename(f.arquivo, ".md") };
});

// Uma entrada por arco, na ordem de jogo.
const entradas = ARCOS.map((a) => ({
  titulo: a.titulo,
  paginas: docs.filter((d) => d.arco === a.chave),
})).filter((e) => e.paginas.length);

// Onde cada arquivo virou página — para os [[wikilinks]] entre aventuras.
const PAGINA_POR_ARQUIVO = new Map();
for (const entrada of entradas) {
  const idEntrada = makeId(`journal:${entrada.titulo}`);
  entrada.paginas.forEach((p, i) => {
    const idPagina = makeId(`journal-page:${entrada.titulo}:${p.titulo}:${i}`);
    PAGINA_POR_ARQUIVO.set(normaliza(p.base), {
      titulo: p.titulo,
      uuid: `Compendium.ekhoria.${PACK}.JournalEntry.${idEntrada}.JournalEntryPage.${idPagina}`,
    });
  });
}

const uuidLink = (uuid, rotulo) => `@UUID[${uuid}]{${rotulo}}`;

const contagem = { wikiPagina: 0, wikiCriatura: 0, wikiSolto: 0, mencoes: 0, blocos: 0 };
// Problemas na FONTE que o conversor contornou. Aparecem no fim da execução
// porque quem arruma é o cofre, não o script.
const avisos = [];

function contextoDe(pagina) {
  // Cada página liga a PRIMEIRA menção de cada criatura. Ligar as 34 de "Irmã
  // Nell" encheria a cena de azul sem ajudar ninguém a clicar mais rápido.
  const jaLigada = new Set();

  return {
    wikilink(alvo, rotulo) {
      const chave = normaliza(alvo);
      const pag = PAGINA_POR_ARQUIVO.get(chave);
      if (pag && chave !== normaliza(pagina.base)) {
        contagem.wikiPagina++;
        return uuidLink(pag.uuid, rotulo === alvo ? pag.titulo : rotulo);
      }
      const cri = CRIATURA_POR_CHAVE.get(chave);
      if (cri) {
        contagem.wikiCriatura++;
        jaLigada.add(chave);
        return uuidLink(cri.uuid, rotulo === alvo ? cri.nome : rotulo);
      }
      contagem.wikiSolto++;
      return `<strong>${esc(rotulo)}</strong>`;
    },

    // O bloco vira resumo + link: a ficha inteira já é um Actor do bestiário.
    blocoMonstro(yaml) {
      contagem.blocos++;
      const nome = (yaml.match(/^nome:\s*"?([^"\n]+)"?\s*$/m) || [])[1]?.trim();
      const campo = (c) => (yaml.match(new RegExp(`^${c}:\\s*"?([^"\\n]+)"?\\s*$`, "m")) || [])[1]?.trim();
      const stats = ["dv", "pv", "ca", "jp", "moral", "xp"]
        .map((c) => [c.toUpperCase(), campo(c)])
        .filter(([, v]) => v)
        .map(([k, v]) => `<strong>${k}</strong> ${esc(v)}`)
        .join(" &middot; ");
      const cri = nome && CRIATURA_POR_CHAVE.get(normaliza(nome));
      if (!cri) {
        // Sem ator correspondente, o bloco fica como estava — melhor um bloco
        // feio na página do que uma criatura que some da aventura.
        return `<blockquote><p><strong>${esc(nome || "Criatura")}</strong></p><p>${stats}</p></blockquote>`;
      }
      jaLigada.add(normaliza(nome));
      return `<blockquote class="ekhoria-ficha">\n<p>${uuidLink(cri.uuid, cri.nome)}</p>\n${stats ? `<p>${stats}</p>\n` : ""}<p><em>Ficha completa no compêndio <strong>Ekhoria: Bestiário</strong> — clique no nome para abrir, ou arraste para o mapa.</em></p>\n</blockquote>`;
    },

    jaLigada,
  };
}

// Segunda passada: liga a PRIMEIRA menção solta de cada criatura.
//
// Uma alternância só, montada uma vez, com os nomes longos primeiro — é o que
// faz "Inquisidor-Comandante Vare Ostrim" ganhar de "Inquisidor Lunar" no mesmo
// ponto do texto. A primeira versão varria o HTML inteiro uma vez por criatura
// (111 varreduras por página, sobre 60 KB) e não terminava.
const NOMES_ORDENADOS = [...CRIATURAS.keys()].sort((a, b) => b.length - a.length);
const LETRA = "\\w\\u00c0-\\u024f";
const RE_NOMES = new RegExp(
  `(?<![${LETRA}])(${NOMES_ORDENADOS
    .map((n) => esc(n).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})(?![${LETRA}])`,
  "g",
);
// Fatia o HTML em marcação e texto: só o texto pode receber link, senão o nome
// dentro de um atributo ou de um @UUID já montado viraria link aninhado.
const RE_FATIAS = /(<[^>]*>|@UUID\[[^\]]*\]\{[^}]*\})|([^<@]+|[<@])/g;

function ligaMencoes(html, ctx) {
  return html.replace(RE_FATIAS, (trecho, markup, texto) => {
    if (markup || !texto) return trecho;
    return texto.replace(RE_NOMES, (achado) => {
      const chave = normaliza(achado);
      if (ctx.jaLigada.has(chave)) return achado;
      const uuid = CRIATURAS.get(achado);
      if (!uuid) return achado;
      ctx.jaLigada.add(chave);
      contagem.mencoes++;
      return uuidLink(uuid, achado);
    });
  });
}

// ── Escrita ─────────────────────────────────────────────────────────────────

const saida = entradas.map((entrada) => ({
  title: entrada.titulo,
  pages: entrada.paginas.map((p) => {
    protegidos = [];
    const ctx = contextoDe(p);
    const t0 = Date.now();
    let html = desprotege(paraHtml(p.corpo, ctx));
    const t1 = Date.now();
    html = ligaMencoes(html, ctx);
    const t2 = Date.now();
    if (process.env.PERF) console.error(`   ${p.base.padEnd(34)} html ${t1 - t0}ms  links ${t2 - t1}ms`);
    return { title: p.titulo, content: html };
  }),
}));

const cabecalho = `// Journal da campanha "A Guerra do Esmaecer" (Ekhoria / Old Dragon 2).
//
// GERADO — não editar à mão. Rode \`npm run importar-campanha\` e depois
// \`npm run build\`. A fonte é o cofre Obsidian, em
// Compendio/Campanhas/A Guerra do Esmaecer.
//
// Uma entrada por arco; os [[wikilinks]] do cofre e a primeira menção de cada
// criatura viram @UUID clicáveis. Ver tools/importar-campanha.mjs.

export const campanhaJournais = ${JSON.stringify(saida, null, 2)};
`;

fs.writeFileSync(SAIDA, cabecalho, "utf8");

const totalPaginas = saida.reduce((s, e) => s + e.pages.length, 0);
const kb = Math.round(saida.reduce((s, e) => s + e.pages.reduce((t, p) => t + p.content.length, 0) / 1024, 0));
console.log(`  ${saida.length} entradas, ${totalPaginas} páginas, ${kb} KB de HTML -> tools/data/campanha.mjs`);
for (const e of saida) {
  const k = Math.round(e.pages.reduce((t, p) => t + p.content.length, 0) / 1024);
  console.log(`     ${e.title.padEnd(46)} ${String(e.pages.length).padStart(2)} págs  ${String(k).padStart(4)} KB`);
}
console.log(`\n  links: ${contagem.wikiPagina} wikilinks para páginas, ${contagem.wikiCriatura} para criaturas,`);
console.log(`         ${contagem.mencoes} menções soltas ligadas, ${contagem.blocos} blocos od2-monstro resumidos`);
if (contagem.wikiSolto) console.log(`         ${contagem.wikiSolto} wikilinks sem destino (viraram negrito)`);
if (avisos.length) {
  console.log(`
  ${avisos.length} aviso(s) sobre a fonte no cofre:`);
  for (const a of [...new Set(avisos)]) console.log(`     ${a}`);
}
