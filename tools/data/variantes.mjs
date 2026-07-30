// Variantes de classe prontas para arrastar na ficha.
//
// POR QUE ISTO EXISTE: o sistema OD2 NÃO deixa soltar uma `class_ability`
// direto no personagem — a ficha bloqueia com "Habilidades de classe não podem
// ser adicionadas diretamente ao personagem. Adicione-as à classe do
// personagem." O caminho nativo é abrir o item da CLASSE que já está na ficha e
// soltar a habilidade dentro dele, o que funciona mas é pouco descobrível.
//
// Então, para a escolha que todo Marcado precisa fazer no 3º nível, este
// arquivo monta uma variante da classe por Escola, com a habilidade já
// embutida: o jogador arrasta a variante certa e acabou. As Escolas avulsas
// continuam no compêndio (avulsas.mjs) para quem quiser consultar as outras ou
// trocar depois.
//
// Nada aqui é conteúdo novo: é recombinação do que já está em classes.mjs e
// avulsas.mjs, para não haver duas fontes de verdade do mesmo texto.

import { classes } from "./classes.mjs";
import { classAbilitiesBase } from "./avulsas.mjs";

const acha = (nome) => {
  const c = classes.find((x) => x.nome === nome);
  if (!c) throw new Error(`Classe não encontrada em classes.mjs: ${nome}`);
  return c;
};

// "Verme Escarlate (marcial)" -> "Verme Escarlate"
const nomeCurto = (nome) => nome.split("(")[0].trim();

// ── Marcado: uma variante por Escola ────────────────────────────────────────
// A classe-base "Marcado" CONTINUA existindo: nos níveis 1 e 2 o Marcado ainda
// não escolheu Escola (ela vem no 3º nível).
const marcado = acha("Marcado");

const marcados = classAbilitiesBase.map((escola) => {
  const curto = nomeCurto(escola.nome);
  return {
    ...marcado,
    // O parêntese faz aninhaPastas() encaixar a variante dentro de "Marcado".
    nome: `Marcado (${curto})`,
    flavor: `<p>O Marcado da Escola <strong>${curto}</strong>. <em>Especialização de Guerreiro.</em></p>`,
    descricao:
      marcado.descricao +
      `<p><strong>Esta variante já traz a Escola ${curto} embutida</strong> — arraste-a para a ficha e a Escola vem junto, com as evoluções de 3º, 6º e 10º nível. Para trocar de Escola depois, use a versão genérica da classe e adicione a Escola pelo compêndio <em>Marcado › Escolas</em>.</p>`,
    // As habilidades do Marcado + a Escola escolhida, no lugar do ponteiro
    // genérico "Escolha da Escola".
    habilidades: [
      ...marcado.habilidades.filter((h) => h.nome !== "Escolha da Escola"),
      {
        ...escola,
        folder: undefined,
        desc:
          escola.desc +
          "<hr><p><strong>Esta é a sua Escola</strong> — progride inteira, nos degraus 3º, 6º e 10º.</p>",
      },
    ],
  };
});

// ── Guardião da Centelha: uma variante por benefício do Cristal ──────────────
// A escolha é feita no 1º nível (Portador da Centelha) e PROGRIDE: no 6º a
// Sincronia Técnica faz o bônus escolhido escalar com Inteligência. Por isso
// vale variante — diferente de um bônus pontual como a Disciplina Solar.
//
// O 10º nível continua fora da variante de propósito: lá o Guardião escolhe um
// SEGUNDO benefício, e embutir as nove combinações inflaria o compêndio sem
// ganho. A segunda escolha é anotada na ficha, como sempre foi.
const centelha = acha("Guardião da Centelha");

const BENEFICIOS = [
  { nome: "Arma", efeito: "<strong>+1 na Base de Ataque e +1 no dano</strong>", curto: "BA e dano" },
  {
    nome: "Joia",
    efeito: "<strong>+1 magia memorizada</strong>, do círculo mais alto disponível",
    curto: "a magia extra",
  },
  { nome: "Vestimenta", efeito: "<strong>+1 na Classe de Armadura</strong>", curto: "o bônus de CA" },
];

const centelhas = BENEFICIOS.map((b) => ({
  ...centelha,
  nome: `Guardião da Centelha (${b.nome})`,
  flavor: `<p>O Guardião cujo Cristal está anexado a uma <strong>${b.nome.toLowerCase()}</strong>. <em>Especialização de Mago.</em></p>`,
  descricao:
    centelha.descricao +
    `<p><strong>Esta variante já traz o Cristal na ${b.nome.toLowerCase()}</strong> — arraste-a para a ficha e o benefício vem escolhido. Para outro benefício, use a variante correspondente ou a versão genérica da classe.</p>`,
  habilidades: centelha.habilidades.map((h) => {
    if (h.nome === "Portador da Centelha") {
      return {
        ...h,
        desc:
          `<p>Recebe 1 Cristal de Centelha anexado a uma <strong>${b.nome}</strong>, concedendo ${b.efeito}.</p>` +
          "<p>Se perder o Cristal, perde as habilidades exclusivas da especialização (mantendo conjuração, " +
          "Ler Magias e Detectar Magias); requisitar um novo leva <strong>1d4 semanas</strong> de canalização.</p>",
      };
    }
    if (h.nome === "Sincronia Técnica") {
      return {
        ...h,
        desc:
          `<p>O Guardião aprimora a ligação com o seu dispositivo: ${b.curto} de <em>Portador da Centelha</em> ` +
          "passa a ser igual ao seu <strong>modificador de Inteligência</strong> (mínimo +1).</p>",
      };
    }
    return h;
  }),
}));

export const variantes = [...marcados, ...centelhas];
