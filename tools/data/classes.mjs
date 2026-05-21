// Classes exclusivas do cenário Ekhoria.
//
// Cada classe herda a progressão de BA/JP/XP de um arquétipo do OD2
// (guerreiro, clerigo, mago, ladrao) via `progressao()`.
// `dv` preenche o campo system.hp (Dado de Vida).
// `restricao_racas` preenche system.restrictions.races (exclusividade racial).
// Cada item de `habilidades` vira um Item "class_ability" com seu nível;
// `usos_dia` define usos diários a partir do nível em que é obtida.

import { progressao } from "./progressoes.mjs";

const EQUIP = {
  guerreiro: {
    weapons: "Pode usar todas as armas.",
    armors: "Pode usar todas as armaduras.",
    magic_items:
      "Não pode usar cajados, varinhas e pergaminhos mágicos, com exceção dos pergaminhos de proteção.",
  },
  clerigo: {
    weapons:
      "Apenas armas impactantes. Usar armas cortantes ou perfurantes faz o personagem perder o acesso às suas magias até cumprir uma penitência.",
    armors: "Pode usar todas as armaduras.",
    magic_items: "Pode usar itens mágicos compatíveis com a sua fé.",
  },
  mago: {
    weapons: "Apenas armas pequenas. Armas médias ou grandes geram ataques difíceis.",
    armors:
      "Nenhuma. Escudos e armaduras impedem a conjuração de magias e protegem apenas metade da CA normal.",
    magic_items: "Pode usar todos os tipos.",
  },
  ladrao: {
    weapons: "Apenas armas pequenas ou médias. Armas grandes geram ataques difíceis.",
    armors:
      "Apenas armaduras leves. Escudos e armaduras médias ou pesadas impedem o uso das habilidades de classe e protegem apenas metade da CA normal.",
    magic_items:
      "Não pode usar cajados, varinhas e pergaminhos mágicos, com exceção dos pergaminhos de proteção.",
  },
};

export const classes = [
  {
    nome: "Custódio Solar",
    arquetipo: "clerigo",
    dv: 8,
    restricao_racas: ["Autokthon"],
    flavor: "<p>Guerreiro-clérigo solar, canalizador da luz. Exclusivo de Autokthons.</p>",
    descricao:
      "<p>Os Custódios Solares são Autokthons cuja Pedra da Alma foi consagrada como um farol da luz solar. Combatentes devotos, curam aliados e fulminam mortos-vivos com a energia do sol. Seguem a progressão de Clérigo.</p>",
    equipment_restrictions: EQUIP.clerigo,
    levels: progressao("clerigo"),
    habilidades: [
      { nome: "Magias Divinas Solares", level: 1, desc: "<p>Lança magias do círculo solar diariamente, conforme a progressão de magias do Clérigo.</p>" },
      { nome: "Cura por Luz", level: 1, usos_dia: 1, desc: "<p>Uma vez por dia, cura 1d8 + nível PV em um aliado a até 9 metros.</p>" },
      { nome: "Disciplina Solar", level: 3, desc: "<p>O Custódio recebe +1 na BA e no dano com armas, ou +1 na CA — escolha feita ao adquirir a habilidade.</p>" },
      { nome: "Brilho Protetor", level: 6, desc: "<p>Emana uma aura de 3 metros que cega mortos-vivos (JPS anula) e concede +2 de CA aos aliados dentro dela.</p>" },
      { nome: "Transcendência Solar", level: 10, usos_dia: 1, desc: "<p>Uma vez por dia, libera um pulso de luz em 9 metros causando nível × 1d6 de dano a mortos-vivos e quebrando maldições.</p>" },
    ],
  },
  {
    nome: "Relicário Vivo",
    arquetipo: "clerigo",
    dv: 8,
    restricao_racas: ["Silente"],
    flavor: "<p>Hospedeiro de uma entidade aprisionada em seu Corpo Estático. Exclusivo de Silentes.</p>",
    descricao:
      "<p>Apenas o Corpo Estático dos Silentes pode hospedar uma entidade sem ser destruído por ela. O Relicário Vivo conjura poder divino pagando com a própria vitalidade e, no auge, funde-se à entidade que carrega. Segue a progressão de Clérigo.</p>",
    equipment_restrictions: EQUIP.clerigo,
    levels: progressao("clerigo"),
    habilidades: [
      { nome: "Entidade Interna", level: 1, desc: "<p>Acessa magias divinas pagando 2 PV por círculo de magia conjurado.</p>" },
      { nome: "Ressonância", level: 1, usos_dia: 1, desc: "<p>Uma vez por dia, invoca uma habilidade da entidade interna (definida junto ao Mestre).</p>" },
      { nome: "Controle Parcial", level: 3, desc: "<p>Suprime ou liberta a entidade por até 1 hora. Ao suprimi-la, recupera 1d4 PV.</p>" },
      { nome: "Fusão Temporária", level: 6, desc: "<p>Funde-se à entidade por 1 hora, ganhando +4 em um atributo à escolha e +2 de CA.</p>" },
      { nome: "Domínio Pleno", level: 10, usos_dia: 1, desc: "<p>Uma vez por dia, usa todas as habilidades da entidade sem qualquer custo em PV.</p>" },
    ],
  },
  {
    nome: "Narcoguerreiro",
    arquetipo: "guerreiro",
    dv: 10,
    flavor: "<p>Combatente especializado nos Fungos do Degelo de Vornfell.</p>",
    descricao:
      "<p>Os Narcoguerreiros dominam a química alquímica dos fungos que brotam no degelo de Vornfell, usando-os como armas e remédios. Resistentes a venenos, transformam o próprio metabolismo em campo de batalha. Seguem a progressão de Guerreiro.</p>",
    equipment_restrictions: EQUIP.guerreiro,
    levels: progressao("guerreiro"),
    habilidades: [
      { nome: "Maestria em Arma", level: 1, desc: "<p>+1 no dano com uma arma à sua escolha.</p>" },
      { nome: "Conhecimento Químico", level: 1, desc: "<p>Imune ao Pó de Morthan e a gases tóxicos.</p>" },
      { nome: "Uso Seguro de Seiva", level: 1, usos_dia: 1, desc: "<p>Consome com segurança a Seiva de Yggdras Diluída, curando 1d4 PV.</p>" },
      { nome: "Coquetel Marcial", level: 3, desc: "<p>Combina os efeitos de dois Fungos do Degelo simultaneamente.</p>" },
      { nome: "Metabolismo Acelerado", level: 6, desc: "<p>+1 permanente em JPC e +2 contra venenos e vícios.</p>" },
      { nome: "Tolerância de Elite", level: 10, desc: "<p>Regenera 1d4 PV por rodada durante 1d4 + mod. CON rodadas.</p>" },
    ],
  },
  {
    nome: "Pugilista",
    arquetipo: "guerreiro",
    dv: 10,
    flavor: "<p>Mestre do combate desarmado e de armas pequenas e médias.</p>",
    descricao:
      "<p>O Pugilista transforma o próprio corpo em arma. Filiado a uma das escolas marciais de Ekhoria, golpeia com técnica e resiste como um campeão. Segue a progressão de Guerreiro.</p>",
    equipment_restrictions: {
      weapons: "Apenas armas pequenas e médias. Especialista em combate desarmado.",
      armors: "Pode usar todas as armaduras.",
      magic_items: EQUIP.guerreiro.magic_items,
    },
    levels: progressao("guerreiro"),
    habilidades: [
      { nome: "Maestria em Arma", level: 1, desc: "<p>+1 no dano com uma arma à sua escolha.</p>" },
      { nome: "Escola Marcial", level: 1, desc: "<p>Escolha sua escola de combate: Mãos de Ferro, Dança do Vento ou Punhos do Vale.</p>" },
      { nome: "Combate Desarmado Aprimorado", level: 3, desc: "<p>Ataques desarmados causam 1d4 + mod. FOR de dano.</p>" },
      { nome: "Resistência de Campeão", level: 6, desc: "<p>+1 permanente em JP. Uma vez por combate, ao chegar a 0 PV, permanece de pé com 1 PV.</p>" },
      { nome: "Maestria Corporal", level: 10, desc: "<p>Ataques desarmados causam 1d6 + mod. FOR e o Pugilista realiza um segundo ataque desarmado por rodada.</p>" },
    ],
  },
  {
    nome: "Lito-arcanista",
    arquetipo: "mago",
    dv: 4,
    flavor: "<p>Mago cujo corpo foi saturado de cristais pelo Ritual da Saturação.</p>",
    descricao:
      "<p>Submetidos ao Ritual da Saturação, os Lito-arcanistas têm o corpo permeado por cristais arcanos. Conjuram como Magos, mas sua carne mineral lhes confere resistências elementais crescentes. Seguem a progressão de Mago.</p>",
    equipment_restrictions: EQUIP.mago,
    levels: progressao("mago"),
    habilidades: [
      { nome: "Corpo Cristalino", level: 1, desc: "<p>Resistência a fogo, gelo ou elétrico (cristal dominante, à escolha) e +1 de CA natural.</p>" },
      { nome: "Ressonância Mineral", level: 1, desc: "<p>Detecta cristais mágicos a até 18 metros.</p>" },
      { nome: "Magia Elementar", level: 3, desc: "<p>Conjura magias elementais associadas ao cristal dominante como magias extras de 1º círculo.</p>" },
      { nome: "Forma de Pedra", level: 6, usos_dia: 1, desc: "<p>Uma vez por dia, transforma parcialmente o corpo em cristal por 1 hora, ganhando +2 de CA.</p>" },
      { nome: "Coração de Cristal", level: 10, desc: "<p>Torna-se imune ao tipo de dano do seu cristal dominante.</p>" },
    ],
  },
  {
    nome: "Guardião da Centelha",
    arquetipo: "guerreiro",
    dv: 10,
    flavor: "<p>Elite militar de Cinthara, armada com cristais de combate.</p>",
    descricao:
      "<p>Os Guardiões da Centelha são a tropa de elite de Cinthara, treinada no uso de cristais de combate que disparam rajadas de energia. Combinam disciplina marcial com poder de fogo cristalino. Seguem a progressão de Guerreiro.</p>",
    equipment_restrictions: EQUIP.guerreiro,
    levels: progressao("guerreiro"),
    habilidades: [
      { nome: "Maestria em Arma", level: 1, desc: "<p>+1 no dano com uma arma à sua escolha.</p>" },
      { nome: "Arte da Centelha", level: 1, desc: "<p>Dispara um cone de 3 metros causando 1d6 a até 3 criaturas (JPD reduz). Uma vez por rodada.</p>" },
      { nome: "Escudo de Cristal", level: 3, usos_dia: 1, desc: "<p>Uma vez por dia, ergue uma barreira que absorve nível × 2 de dano.</p>" },
      { nome: "Rajada Combinada", level: 6, desc: "<p>Usa dois cristais ao mesmo tempo: +1d6 de dano e adiciona o efeito do segundo cristal.</p>" },
      { nome: "Mestre da Centelha", level: 10, usos_dia: 1, desc: "<p>+2d6 de dano com cristais. Uma vez por dia, usa a Arte da Centelha como magia de 3º círculo (3d6, cone de 9 metros).</p>" },
    ],
  },
  {
    nome: "Diplomata",
    arquetipo: "ladrao",
    dv: 6,
    flavor: "<p>Especialista em negociação, influência social e redes de contato.</p>",
    descricao:
      "<p>O Diplomata vence pela palavra onde outros falham pela espada. Mestre da reação e da persuasão, lidera comitivas e tece redes de informantes. Segue a progressão de Ladrão.</p>",
    equipment_restrictions: EQUIP.ladrao,
    levels: progressao("ladrao"),
    habilidades: [
      { nome: "Ouvir Ruídos", level: 1, desc: "<p>Com 1–2 em 1d6, percebe sons sutis em ambientes silenciosos.</p>" },
      { nome: "Comitiva", level: 1, desc: "<p>Custo de contratação de seguidores reduzido em 25% e +1 de Moral para eles.</p>" },
      { nome: "Audiência", level: 3, usos_dia: 1, desc: "<p>Com 1–2 em 1d6 + mod. CAR, obtém uma audiência favorável que concede bônus em Teste de Reação.</p>" },
      { nome: "Traquejo Social", level: 6, desc: "<p>Aprende 1 idioma adicional por ponto de modificador de Carisma.</p>" },
      { nome: "Rede de Contatos", level: 10, usos_dia: 1, desc: "<p>Com um teste de Carisma, aciona 1d4 contatos que fornecem informações obscuras.</p>" },
    ],
  },
  {
    nome: "Voraz",
    arquetipo: "ladrao",
    dv: 6,
    flavor: "<p>Membro da Irmandade Voraz de Vornfell, caçador de criaturas monstruosas.</p>",
    descricao:
      "<p>Os Vorazes da Irmandade de Vornfell conhecem a anatomia das criaturas monstruosas como ninguém. Caçam metodicamente, usando o medo e os despojos do inimigo como armas. Seguem a progressão de Ladrão.</p>",
    equipment_restrictions: EQUIP.ladrao,
    levels: progressao("ladrao"),
    habilidades: [
      { nome: "Anatomia de Campo", level: 1, desc: "<p>Ataques contra criaturas monstruosas são Fáceis na primeira rodada de combate.</p>" },
      { nome: "Arsenal do Inimigo", level: 1, desc: "<p>Cria armas improvisadas a partir de partes de criaturas abatidas, causando 1d6 de dano.</p>" },
      { nome: "Medo Como Ferramenta", level: 3, desc: "<p>Uma vez por combate, ao abater uma criatura, intimida automaticamente outras do mesmo tipo.</p>" },
      { nome: "Caça Especializada", level: 6, desc: "<p>Contra o tipo de criatura escolhido: +1d6 de dano e +2 em JP.</p>" },
      { nome: "Anatomista de Elite", level: 10, desc: "<p>O Ataque Furtivo volta a ser aplicável contra as criaturas da sua caça especializada.</p>" },
    ],
  },
];
