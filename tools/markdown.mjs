// Conversor de Markdown do cofre Obsidian para o HTML que o Foundry mostra.
//
// POR QUE É UM MÓDULO SEPARADO: nasceu dentro do importar-campanha.mjs e ficou
// bom demais para morar lá. Ele já sabe as coisas que só se descobrem apanhando
// da fonte real — o "|" do wikilink que parte a célula da tabela, a nota de mesa
// com uma tabela inteira dentro do "> ", o "|---|---|" que dava retrocesso
// exponencial. Copiar isso para o segundo importador seria garantir que o
// terceiro bug fosse corrigido em um lugar só.
//
// O chamador entra com um `ctx`, que decide o que é link neste documento:
//   ctx.wikilink(alvo, rotulo) -> HTML
//   ctx.blocoMonstro(yaml)     -> HTML  (só se o documento tiver ```od2-monstro```)

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Marcadores internos: protegem trechos já convertidos de sofrerem uma segunda
// passada de inline (um link não pode ter o próprio rótulo re-processado).
const COFRE_MARCA = "\uE000"; // area de uso privado: nao ocorre no texto do cofre
let protegidos = [];
const protege = (html) => {
  protegidos.push(html);
  return `${COFRE_MARCA}${protegidos.length - 1}${COFRE_MARCA}`;
};

export const desprotege = (s) =>
  s.replace(new RegExp(`${COFRE_MARCA}(\\d+)${COFRE_MARCA}`, "g"), (_, i) => protegidos[Number(i)]);

// Chame antes de cada documento: os índices são posicionais, e o texto de uma
// página não pode desproteger com a tabela da página anterior.
export const reiniciaProtegidos = () => { protegidos = []; };

// Problemas na FONTE que o conversor contornou mas alguém deveria arrumar no
// cofre. Quem importa imprime isto no fim.
export const avisos = [];

// Inline: código, wikilink, negrito, itálico. Nesta ordem — o código vem antes
// para que `**` dentro de crase não vire negrito.
export function inline(txt, ctx) {
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
export function paraHtml(md, ctx, raiz = true) {
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
      out.push(lang === "od2-monstro" && ctx.blocoMonstro
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
