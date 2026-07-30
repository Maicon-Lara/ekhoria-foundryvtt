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

const PASTA_ESCOLAS = "Marcado (Escolas)";

const ESCOLAS = [
  {
    folder: PASTA_ESCOLAS,
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
    folder: PASTA_ESCOLAS,
    nome: "Águia-Cadáver (Ecos)",
    level: 3,
    // O Eco Skorn é o único uso diário de Escola: 1×/dia a partir do 3º.
    usos_dia: 1,
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
    folder: PASTA_ESCOLAS,
    nome: "Couraçado (furtivo)",
    level: 3,
    desc:
      "<p>A Escola furtiva: o Marcado que aprendeu a não ser visto antes de ser temido.</p>" +
      "<p>Ganha os talentos <strong>Furtividade</strong> e <strong>Escalar</strong> " +
      "com as chances do <strong>Ladrão</strong>.</p>" +
      "<p><em>Na ficha:</em> os dois talentos aparecem roláveis no bloco de Talentos. O OD2 distribui a mesma reserva de pontos do Ladrão (2 + modificador de Destreza, mais 2 nos níveis 3, 6 e 10) — como aqui há só dois talentos em vez de cinco, sobra ponto; gaste até o teto de 5 em cada e ignore o resto.</p>",
    // A regra dá dois Talentos de Ladrão a uma classe de Guerreiro. Sem este
    // array o sistema não mostra bloco de talento nenhum — has_rogue_talents
    // procura justamente uma class_ability com rogue_talents preenchido.
    rogue_talents: [
      { key: "furtividade", name: "Furtividade", description: "Esconder-se imóvel nas sombras, sem ser detectado sem o uso de magia." },
      { key: "escalar", name: "Escalar", description: "Escalar superfícies sem cordas, incluindo as íngremes e lisas." },
    ],
    level6:
      "<p><strong>+1d6</strong> de dano contra alvo <strong>desprevenido ou flanqueado</strong>.</p>",
    level10:
      "<p><strong>+2 na CA</strong> contra criaturas <strong>não humanoides</strong>.</p>",
  },
  {
    folder: PASTA_ESCOLAS,
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

// O sistema OD2 NAO deixa soltar uma class_ability direto no personagem: a
// ficha bloqueia com "Habilidades de classe nao podem ser adicionadas
// diretamente ao personagem. Adicione-as a classe do personagem." O caminho
// nativo e abrir o item da CLASSE que ja esta na ficha e soltar a habilidade
// dentro dele — funciona, mas e pouco descobrivel. Por isso existem tambem as
// variantes de classe em variantes.mjs, com a Escola ja embutida.
const COMO_ADICIONAR =
  "<hr><p><strong>Como adicionar na ficha:</strong> o sistema não aceita soltar uma habilidade de classe direto no personagem. Abra o item da <strong>classe que já está na ficha</strong> (aba Classe, clique no nome) e arraste esta habilidade <strong>para dentro dessa janela</strong> — ela é sincronizada para o personagem automaticamente.</p>" +
  "<p><em>Atalho:</em> o compêndio de Classes já traz variantes prontas (ex.: <em>Marcado (Couraçado)</em>) com a Escola embutida — basta arrastar a variante e pular este passo.</p>";

// Versao CRUA, sem a nota de uso: e o que as variantes de classe embutem.
// Quem arrasta "Marcado (Couracado)" ja usou o atalho, entao a instrucao de
// "como adicionar manualmente" so faria ruido na ficha dele.
export const classAbilitiesBase = ESCOLAS;

export const classAbilitiesAvulsas = ESCOLAS.map((a) => ({
  ...a,
  desc: (a.desc || "") + COMO_ADICIONAR,
}));
