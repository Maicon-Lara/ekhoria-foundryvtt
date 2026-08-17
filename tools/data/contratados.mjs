// Ficha-modelo de contratado (Actor type "retainer").
//
// UMA ficha, genérica, e não nove.
//
// Quem tem statblock no livro — os sete mercenários, o aprendiz, o ajudante —
// é criado pela macro "Contratar", que CLONA o statblock do Bestiário. Ela
// deixou de montar retainer justamente por causa deste tipo: a JP aqui é um
// getter fixo em 4, e um arqueiro saía com 4 onde o livro diz 5.
//
// Este modelo continua útil para quem NÃO tem statblock: o alquimista, o
// engenheiro, o espião, o sábio, o marinheiro — especialistas que o livro
// descreve por preço e serviço, sem ficha. Para eles o retainer é o tipo certo,
// porque o que importa é profissão, bolso e carga, não CA e Moral.

export const contratadosModelo = [
  {
    nome: "Contratado (modelo)",
    profissao: "—",
    nivel: 0,
    pv: 3,
    caExtra: 0,
    notas:
      "<p><em>Ficha para contratado <strong>sem statblock no livro</strong>: alquimista, engenheiro, espião, sábio, capitão, marinheiro, remador. Copie, renomeie e preencha a profissão.</em></p>"
      + "<p><em>Para mercenários, aprendiz e ajudante <strong>não use esta ficha</strong> — use a macro <strong>Contratar</strong>, no compêndio <strong>Ekhoria: Ferramentas</strong>. Ela clona o statblock do Bestiário, com DV, CA, JP, Moral e ataques certos.</em></p>"
      + "<hr><h4>O que esta ficha não guarda</h4>"
      + "<ul>"
      + "<li><strong>CA é calculada</strong>, não digitada: 10 + mod. de Destreza + <em>CA extra</em> + armadura e escudo equipados.</li>"
      + "<li><strong>JP é fixa em 4.</strong> Não existe campo — e foi por isso que os mercenários, que têm JP 5, deixaram de ser criados como esta ficha.</li>"
      + "<li><strong>Moral não existe</strong> aqui. Especialista não costuma testar moral; se o seu testar, anote e role à parte.</li>"
      + "<li><strong>Nível começa em 0</strong>, o que é adequado a quem não é aventureiro.</li>"
      + "</ul>"
      + "<hr><h4>Comitiva — se o contratante for Diplomata</h4>"
      + "<ul>"
      + "<li><strong>1º nível:</strong> custo de contratação −25%; seguidores com <strong>+1 de Moral</strong>.</li>"
      + "<li><strong>3º:</strong> ataques de proteção da comitiva são Ações Fáceis.</li>"
      + "<li><strong>6º:</strong> membros recebem <strong>PV adicionais iguais ao mod. de Carisma</strong> do Diplomata.</li>"
      + "<li><strong>10º:</strong> membros recebem <strong>bônus em JP e Dano iguais ao mod. de Carisma</strong>.</li>"
      + "</ul>"
      + "<p><em>Os três últimos não têm campo nesta ficha: o de PV você soma ao máximo, os de JP e Dano ficam escritos aqui.</em></p>",
  },
];
