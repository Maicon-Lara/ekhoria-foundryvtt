// Propriedades de Maestria do Mestre das Armas — transcritas do Livro de Mecânicas.
//
// POR QUE SÃO ITENS SEPARADOS: como os Ecos do Marcado, estas são ESCOLHA, não
// concessão. O Mestre das Armas começa com duas das oito, aprende mais duas no
// 3º, mais duas no 6º, e as oito no 10º. A ficha de quem tem duas não deveria
// listar as outras seis.
//
// `level: 1` em todas de propósito: o que limita não é o nível de cada
// maestria, é quantas o personagem já pode ter. Quem está no 1º nível arrasta
// duas; no 3º, mais duas. A conta fica na habilidade "Técnicas de Maestria".

const PASTA = "Mestre das Armas (Maestrias)";
const IC = "systems/olddragon2e/assets/icons";

const maestrias = [
  {
    nome: "Corte Rápido",
    img: `${IC}/slashing.svg`,
    efeito:
      "<p>Após um ataque com arma leve, realiza imediatamente um ataque adicional com outra arma " +
      "leve empunhada, <strong>sem a penalidade padrão de combate com duas armas</strong>.</p>",
    armas: "Adaga, Cimitarra",
  },
  {
    nome: "Irritar",
    img: `${IC}/piercing.svg`,
    efeito:
      "<p>Ao causar dano, o <strong>próximo ataque contra aquela criatura</strong> (até o fim da " +
      "próxima rodada) recebe <strong>Ajuste Fácil (+2)</strong>.</p>",
    armas: "Espada Curta",
  },
  {
    nome: "Debilitar",
    img: `${IC}/bludgeoning.svg`,
    efeito:
      "<p>Ao atingir um alvo, o <strong>próximo ataque feito por aquela criatura</strong> sofre " +
      "<strong>Ajuste Difícil (−2)</strong>.</p>",
    armas: "Espada Longa, Maça, Mangual",
  },
  {
    nome: "Arranhão",
    img: `${IC}/slashing.svg`,
    efeito:
      "<p>Ao <strong>errar</strong> um ataque corpo a corpo (sem Erro Crítico), o alvo ainda sofre " +
      "dano igual ao <strong>modificador de Força</strong> do atacante (mínimo 1).</p>",
    armas: "Montante",
  },
  {
    nome: "Derrubar",
    img: `${IC}/melee.svg`,
    efeito:
      "<p>Ao atingir, força o alvo a uma Jogada de Proteção apropriada; na falha, fica " +
      "<strong>Caído</strong>. Ataques contra criaturas Caídas são <strong>Ajustes Fáceis " +
      "(+2)</strong>.</p>",
    armas: "Bordão, Machado de Batalha, Tridente",
  },
  {
    nome: "Empurrar",
    img: `${IC}/bludgeoning.svg`,
    efeito:
      "<p>Ao atingir um alvo de tamanho <strong>Grande ou menor</strong>, pode empurrá-lo até " +
      "<strong>3 metros</strong> em linha reta (JP apropriada evita o movimento).</p>",
    armas: "Martelo de Batalha, Pique, Besta Pesada",
  },
  {
    nome: "Desacelerar",
    img: `${IC}/ranged.svg`,
    efeito:
      "<p>O movimento do alvo é reduzido em <strong>3 metros</strong> até o início da próxima " +
      "rodada do Mestre das Armas. Se chegar a 0, o alvo age normalmente mas <strong>não se " +
      "move</strong>.</p>",
    armas: "Clava, Arco Longo, Funda",
  },
  {
    nome: "Trespassar",
    img: `${IC}/piercing.svg`,
    efeito:
      "<p>Ao atingir e causar dano, realiza imediatamente um <strong>segundo ataque contra outra " +
      "criatura adjacente</strong> ao alvo e dentro do alcance, usando a mesma Base de Ataque do " +
      "primeiro.</p>",
    armas: "Machado de Batalha, Alabarda",
  },
];

// O limite de encadeamento vale para as duas maestrias que dão ataque bônus, e
// é o que impede a bola de neve — repetido nas duas para quem lê só o item.
const ENCADEAMENTO =
  "<p><strong>Limite de encadeamento:</strong> ataques bônus concedidos por uma maestria não " +
  "desencadeiam novas maestrias de ataque extra, e o Mestre das Armas realiza <strong>no máximo " +
  "um ataque bônus de maestria por rodada</strong>.</p>";

const COMO_ADICIONAR =
  "<hr><p><strong>Como adicionar na ficha:</strong> o sistema não aceita soltar uma habilidade de classe direto no personagem. Abra o item da <strong>classe Mestre das Armas que já está na ficha</strong> (aba Classe, clique no nome) e arraste esta maestria <strong>para dentro dessa janela</strong>.</p>" +
  "<p><em>Quantas você pode ter:</em> duas no 1º nível, quatro no 3º, seis no 6º e todas as oito no 10º. <strong>Apenas uma por ataque</strong> — com o Ataque Extra do 6º, uma diferente em cada ataque da rodada.</p>";

export const maestriasArmas = maestrias.map((m) => ({
  folder: PASTA,
  nome: m.nome,
  level: 1,
  img: m.img,
  desc:
    m.efeito +
    (m.nome === "Corte Rápido" || m.nome === "Trespassar" ? ENCADEAMENTO : "") +
    `<p><strong>Armas compatíveis:</strong> ${m.armas}.</p>` +
    COMO_ADICIONAR,
}));
