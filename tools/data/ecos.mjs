// Lista Comum de Ecos do Marcado — transcrita do Livro de Mecânicas.
//
// POR QUE SÃO ITENS SEPARADOS: o Marcado não recebe os Ecos, ele os ESCOLHE.
// Começa com o Vurk (obrigatório) mais um de Iniciado à escolha, e ganha +1 da
// Lista Comum no 3º, no 6º e no 10º nível. Uma lista fechada dentro da
// descrição da habilidade mostraria a todo Marcado onze Ecos que ele não tem.
// Como class_ability avulsa, o jogador arrasta só os que aprendeu — mesmo
// desenho das Escolas, pelo mesmo motivo.
//
// Os Ecos das Escolas NÃO estão aqui: aqueles vêm junto com a Escola, sem
// escolha, e por isso moram no texto dela (avulsas.mjs).
//
// `level` é o nível do Estágio que libera o Eco (Iniciado 1º, Adepto 6º,
// Mestre 11º) — é o que faz a ficha do OD2 só listar o que o personagem já
// pode usar. Nenhum deles tem `usos_dia`: todos saem do MESMO pool, contado na
// habilidade "Ecos de Mutação".

const PASTA = "Marcado (Ecos)";
const IC = "systems/olddragon2e/assets/icons";

// O classificador de ícones do módulo casa por palavra do nome, e nome de Eco é
// palavra Pré-Primeva — nenhuma regra pegaria. O ícone vem do efeito.
const ecos = [
  // ── Iniciado (1º) ─────────────────────────────────────────────────────────
  {
    nome: "Eco Vurk (Iniciado)",
    level: 1,
    img: `${IC}/unarmed.svg`,
    desc:
      "<p>Libera calor concentrado pelas mãos ou expele uma chama curta — equivalente a " +
      "<em>Mãos Flamejantes</em> ou <em>Luz</em>, à escolha do jogador no momento do uso.</p>" +
      "<p><strong>Todo Marcado começa com este Eco</strong>, e é o único que ninguém escolhe.</p>",
  },
  {
    nome: "Eco Grahl (Iniciado)",
    level: 1,
    img: `${IC}/brain.svg`,
    desc:
      "<p>As cordas vocais mutadas descarregam um berro subsônico que colapsa o equilíbrio de " +
      "quem tem pouca massa. Equivalente a <em>Sono</em>, mas os alvos <strong>não dormem</strong> " +
      "— caem tontos, vomitando, incapazes de agir pela duração.</p>",
  },
  {
    nome: "Eco Thurm (Iniciado)",
    level: 1,
    img: `${IC}/movement.svg`,
    desc:
      "<p>As palmas e as solas exsudam um adesivo de secagem instantânea. " +
      "Equivalente a <em>Patas de Aranha</em>.</p>",
  },
  {
    nome: "Eco Bhek (Iniciado)",
    level: 1,
    img: `${IC}/armor.svg`,
    desc:
      "<p>A musculatura trava em contração total e o Marcado vira uma coisa dura de acertar: " +
      "<strong>+2 na CA por 1d4+1 rodadas</strong>.</p>" +
      "<p>Enquanto durar, ele <strong>não pode correr nem recuar</strong> — só andar e atacar.</p>",
  },

  // ── Adepto (6º) ───────────────────────────────────────────────────────────
  {
    nome: "Eco Sorv (Adepto)",
    level: 6,
    img: `${IC}/throw.svg`,
    desc:
      "<p>Glândulas sob a língua projetam um jato de bile corrosiva. " +
      "Equivalente a <em>Flecha Ácida</em>.</p>",
  },
  {
    nome: "Eco Klaum (Adepto)",
    level: 6,
    img: `${IC}/movement.svg`,
    desc:
      "<p>As fibras das pernas incham e queimam reservas de uma vez. Equivalente à metade " +
      "<strong>Velocidade</strong> de <em>Lentidão/Velocidade</em>, e <strong>só sobre o " +
      "próprio Marcado</strong>.</p>" +
      "<p>Ao terminar, ele fica <strong>fatigado por 1 turno</strong> (−2 em tudo).</p>",
  },
  {
    nome: "Eco Nagh (Adepto)",
    level: 6,
    img: `${IC}/diamond.svg`,
    desc:
      "<p>Os olhos se reconfiguram — a pupila vertical abre até tomar a esclera. " +
      "Equivalente a <em>Infravisão</em>.</p>",
  },
  {
    nome: "Eco Zekk (Adepto)",
    level: 6,
    img: `${IC}/illusionist.svg`,
    desc:
      "<p>A pele assume a cor e a textura do que está atrás dela. Equivalente a " +
      "<em>Invisibilidade</em>, e quebra nas mesmas condições.</p>" +
      "<p><strong>Não funciona debaixo d'água nem sob chuva forte.</strong></p>",
  },

  // ── Mestre (11º) ──────────────────────────────────────────────────────────
  {
    nome: "Eco Ghorr (Mestre)",
    level: 11,
    img: `${IC}/spells.svg`,
    desc:
      "<p>O Marcado deixa de conter o calor que vem acumulando e o solta de uma vez, a partir " +
      "do próprio corpo. Equivalente a <em>Bola de Fogo</em>, <strong>centrada nele " +
      "mesmo</strong> — e ele sofre <strong>metade do dano, sem direito a JP</strong>.</p>" +
      "<p><em>É o Eco que mais mata Marcados.</em></p>",
  },
  {
    nome: "Eco Ulnn (Mestre)",
    level: 11,
    img: `${IC}/natural-weapon.svg`,
    desc:
      "<p>A carne se lembra de que já foi outra coisa. Equivalente a <em>Metamorfosear-se</em>, " +
      "limitado a <strong>criaturas que o Marcado já consumiu</strong> — a forma vem do que ele " +
      "bebeu, não da imaginação.</p>",
  },
  {
    nome: "Eco Kregg (Mestre)",
    level: 11,
    img: `${IC}/spells.svg`,
    desc:
      "<p>O sistema nervoso inteiro descarrega de uma vez pelas mãos. Equivalente a " +
      "<em>Relâmpago</em>.</p>" +
      "<p>O Marcado fica <strong>atordoado por 1 rodada</strong> depois.</p>",
  },
];

// A nota de uso é a mesma das Escolas: o OD2 não deixa soltar class_ability
// direto no personagem, tem de ser dentro do item da classe.
const COMO_ADICIONAR =
  "<hr><p><strong>Como adicionar na ficha:</strong> o sistema não aceita soltar uma habilidade de classe direto no personagem. Abra o item da <strong>classe Marcado que já está na ficha</strong> (aba Classe, clique no nome) e arraste este Eco <strong>para dentro dessa janela</strong>.</p>" +
  "<p><em>Lembre do pool:</em> todos os Ecos gastam os mesmos usos diários, contados na habilidade <strong>Ecos de Mutação</strong> — inclusive os da sua Escola.</p>";

export const ecosComuns = ecos.map((e) => ({
  ...e,
  folder: PASTA,
  desc: e.desc + COMO_ADICIONAR,
}));
