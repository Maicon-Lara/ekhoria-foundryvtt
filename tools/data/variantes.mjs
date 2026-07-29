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

export const variantes = classAbilitiesBase.map((escola) => {
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
