// Habilidades de classe escolhidas à parte — o jogador arrasta para a ficha a
// que escolheu, em vez de o compêndio ter uma variante da classe por escolha.
//
// Mesmo desenho das Formas de Sabre do módulo Star Wars: cada opção é uma
// habilidade própria, com os degraus 3/6/10 nos campos `desc`, `level6` e
// `level10`. É o que faz a ficha do OD2 mostrar os selos de evolução — texto
// corrido num campo só apareceria como um bloco sem estrutura.
//
// A pasta se chama "Marcado (Escolas)" de propósito: aninhaPastas() lê o
// parêntese e a coloca dentro da pasta "Marcado", virando "Escolas".

const ESCOLAS = "Marcado (Escolas)";

export const classAbilitiesAvulsas = [
  {
    folder: ESCOLAS,
    nome: "Verme Escarlate (marcial)",
    level: 3,
    desc:
      "<p>A Escola marcial do Marcado: a toxina afia o golpe em vez de mudar o corpo.</p>" +
      "<p><strong>+2 de dano</strong> com espadas <strong>curtas, longas e bastardas</strong>.</p>",
    level6:
      "<p><strong>Eco Draum:</strong> libera uma onda que <strong>derruba e atordoa</strong> " +
      "(<strong>JPD</strong> para evitar).</p>",
    level10: "<p><strong>Ataque extra</strong> por rodada com essas espadas.</p>",
  },
  {
    folder: ESCOLAS,
    nome: "Águia-Cadáver (Ecos)",
    level: 3,
    desc:
      "<p>A Escola que aprofunda os Ecos, a herança sonora da marcação.</p>" +
      "<p><strong>+1 de dano por dado</strong> nos Ecos, e aprende o <strong>Eco Skorn</strong> " +
      "(como <em>Escudo Arcano</em>, <strong>1×/dia</strong>).</p>",
    level6:
      "<p><strong>Eco Ygth:</strong> prende o alvo ao plano, como <em>Teia</em> somática.</p>",
    level10:
      "<p>Recupera <strong>todos os Ecos</strong> com <strong>1 turno de descanso</strong>.</p>",
  },
  {
    folder: ESCOLAS,
    nome: "Couraçado (furtivo)",
    level: 3,
    desc:
      "<p>A Escola furtiva: o Marcado que aprendeu a não ser visto antes de ser temido.</p>" +
      "<p>Ganha os talentos <strong>Furtividade</strong> e <strong>Escalar</strong> " +
      "com as chances do <strong>Ladrão</strong>.</p>",
    level6:
      "<p><strong>+1d6</strong> de dano contra alvo <strong>desprevenido ou flanqueado</strong>.</p>",
    level10:
      "<p><strong>+2 na CA</strong> contra criaturas <strong>não humanoides</strong>.</p>",
  },
  {
    folder: ESCOLAS,
    nome: "Fera-Abissal (vigor)",
    level: 3,
    desc:
      "<p>A Escola do vigor: o corpo aceita mais veneno do que deveria, e devolve.</p>" +
      "<p>Tolera <strong>duas substâncias de combate ao mesmo tempo</strong>.</p>",
    level6:
      "<p><strong>+1 PV por nível</strong> (retroativo) e <strong>+1 de CA natural</strong>.</p>",
    level10:
      "<p><strong>Sangue corrosivo:</strong> quem o morder sofre <strong>1d6 de ácido</strong> " +
      "e faz <strong>JPC</strong>.</p>",
  },
];
