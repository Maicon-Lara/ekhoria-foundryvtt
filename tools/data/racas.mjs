// Raças exclusivas (e adaptadas) do cenário Ekhoria.
//
// Campos da raça (mapeados para o tipo nativo "race" do OD2):
//   movement, movement_swim, infravision, alignment_tendency
//     ("ordeiro" | "neutro" | "caotico" | "none"), *_notes
// Cada item de `habilidades` vira um Item "race_ability". Bônus mecânicos
// seguros são preenchidos (jp.jpc/jpd/jps, natural_armor, usos diários);
// efeitos condicionais (ex.: "+1 dano com cortantes") ficam descritos no texto.

export const racas = [
  {
    nome: "Arkanim",
    flavor: "<p>Filhos de Arkádia, sensíveis à magia que corre em suas veias.</p>",
    descricao:
      "<p>Os Arkanim são descendentes daqueles que viveram próximos demais das fontes arcanas de Arkádia. A magia os marcou: corre em seu sangue como uma infecção benigna, tornando-os sensíveis a anomalias mágicas e capazes de pequenas manifestações arcanas espontâneas.</p>",
    movement: 9,
    infravision: 0,
    alignment_tendency: "none",
    habilidades: [
      {
        nome: "Filhos de Arkádia",
        desc: "<p>O Arkanim percebe distorções mágicas no ambiente. Com uma chance de 1 em 1d6, detecta automaticamente anomalias mágicas próximas.</p>",
      },
      {
        nome: "Infecção Mágica",
        desc: "<p>A magia que corre em seu sangue oferece resistência a outros efeitos arcanos: +1 em JPS e em JPC contra efeitos de origem arcana.</p>",
        jp: { jps: true, jpc: true },
      },
      {
        nome: "Herança Arcana",
        desc: "<p>Uma vez por dia, o Arkanim conjura espontaneamente uma magia arcana de 1º círculo escolhida aleatoriamente pelo Mestre.</p>",
      },
    ],
  },
  {
    nome: "Atlante",
    flavor: "<p>Anfíbios ordeiros oriundos de civilizações abissais.</p>",
    descricao:
      "<p>Os Atlantes vêm das grandes civilizações que prosperam nas profundezas dos oceanos de Ekhoria. Ordeiros e letrados, carregam para a superfície a disciplina e o conhecimento de seu povo — mas dependem da água para sobreviver.</p>",
    movement: 9,
    movement_swim: 12,
    infravision: 18,
    infravision_notes: "Funciona tanto submersa quanto fora d'água.",
    alignment_tendency: "ordeiro",
    habilidades: [
      {
        nome: "Anfíbios",
        desc: "<p>Respiram naturalmente sob a água e não sofrem nenhuma penalidade de combate ou movimento enquanto submersos.</p>",
      },
      {
        nome: "Adaptabilidade",
        desc: "<p>O Atlante recebe +1 em uma Jogada de Proteção à sua escolha (JPD, JPC ou JPS), definida na criação do personagem.</p>",
      },
      {
        nome: "Letrados",
        desc: "<p>Sabem ler e escrever o próprio idioma e mais um idioma adicional à escolha.</p>",
      },
      {
        nome: "Dependência de Água",
        desc: "<p>Precisam do dobro da quantidade diária de água de um humano e devem submergir completamente ao menos uma vez por semana, sob pena de penalidades crescentes.</p>",
      },
    ],
  },
  {
    nome: "Autokthon",
    flavor: "<p>Constructos vivos animados por uma Pedra da Alma. Não dormem, não comem, não envelhecem.</p>",
    descricao:
      "<p>Os Autokthons são seres artificiais que ganharam vida e consciência através de uma Pedra da Alma (Hers'ta) incrustada em seu corpo. São incansáveis e imortais ao tempo, mas presos à fragilidade de seu núcleo vital.</p>",
    movement: 9,
    infravision: 0,
    alignment_tendency: "none",
    habilidades: [
      {
        nome: "Pedra da Alma (Hers'ta)",
        desc: "<p>O núcleo vital do Autokthon. Se a Pedra da Alma for destruída, o Autokthon morre instantaneamente, sem direito a salvação. Se for removida, ele entra em coma até que seja recolocada.</p>",
      },
      {
        nome: "Constructo Vivo",
        desc: "<p>Não dorme, não come, não respira e não envelhece. É imune a venenos e doenças. Em contrapartida, não se beneficia de poções.</p>",
      },
      {
        nome: "Resistência Arcana",
        desc: "<p>Para memorizar magias, o Autokthon precisa de 8 horas de estudo concentrado, em vez do descanso normal exigido pelas demais raças.</p>",
      },
      {
        nome: "Suscetível",
        desc: "<p>Sua natureza construída o torna vulnerável a efeitos mentais, paralisia e cegueira.</p>",
      },
      {
        nome: "Construção Variável",
        desc: "<p>Cada Autokthon foi construído de forma única. Escolha 2 características de construção (definidas junto ao Mestre) que personalizam seu chassi.</p>",
        variable_construction: { choices_count: 2, available_options: [] },
      },
    ],
  },
  {
    nome: "Cambion",
    flavor: "<p>Descendentes de linhagem demoníaca. Tendem ao Caos.</p>",
    descricao:
      "<p>Nascidos de pactos antigos e uniões proibidas, os Cambion carregam sangue infernal. São marcados física e socialmente por sua herança, mas dela extraem resistência e poder.</p>",
    movement: 9,
    infravision: 18,
    alignment_tendency: "caotico",
    habilidades: [
      {
        nome: "Resistência das Trevas",
        desc: "<p>O sangue infernal os protege: +1 em JPS e em JPC contra efeitos mágicos.</p>",
        jp: { jps: true, jpc: true },
      },
      {
        nome: "Herança Infernal",
        desc: "<p>O Cambion possui uma habilidade menor herdada de sua linhagem demoníaca, definida junto ao Mestre na criação do personagem.</p>",
      },
      {
        nome: "Estigma Social",
        desc: "<p>Sua aparência denuncia sua origem: –2 em Testes de Reação ao lidar com raças que temem ou repudiam demônios.</p>",
      },
    ],
  },
  {
    nome: "Mantes",
    flavor: "<p>Insectoides de exoesqueleto rígido e membros extras.</p>",
    descricao:
      "<p>Os Mantes são uma raça insectoide de movimentos precisos e graciosos. Seu exoesqueleto dispensa armaduras e seus membros adicionais lhes conferem vantagem em combate. A muda anual (Ecdise) renova seu corpo por completo.</p>",
    movement: 9,
    infravision: 18,
    alignment_tendency: "neutro",
    habilidades: [
      {
        nome: "Exoesqueleto",
        desc: "<p>O exoesqueleto natural concede CA 14 e dispensa o uso de armaduras convencionais (que não podem ser vestidas sobre ele).</p>",
        natural_armor: 14,
      },
      {
        nome: "Saltadores",
        desc: "<p>Saltam o dobro da distância de um humano, tanto em altura quanto em comprimento.</p>",
      },
      {
        nome: "Graciosos",
        desc: "<p>Controlam o corpo com precisão sobrenatural: +1 em qualquer JPD.</p>",
        jp: { jpd: true },
      },
      {
        nome: "Sem Sono",
        desc: "<p>São imunes à magia Sono e a efeitos análogos de adormecimento.</p>",
      },
      {
        nome: "Ecdise",
        desc: "<p>Uma vez por ano, o Mantes passa 1 dia imóvel trocando o exoesqueleto. Ao final, recupera todos os PV, remove venenos e doenças crônicas e restaura membros perdidos não vitais.</p>",
      },
      {
        nome: "Membros Extras",
        desc: "<p>Possui duas mãos destras adicionais, podendo realizar um ataque extra por rodada sem a penalidade usual.</p>",
      },
    ],
  },
  {
    nome: "Nefilim",
    flavor: "<p>Descendentes celestiais. Presença calmante. Incapazes de mentir.</p>",
    descricao:
      "<p>Os Nefilim descendem de seres celestiais. Irradiam uma serenidade involuntária e são fisicamente incapazes de proferir mentiras — um fardo tão grande quanto sua bênção de recuperação acelerada.</p>",
    movement: 9,
    infravision: 0,
    alignment_tendency: "ordeiro",
    habilidades: [
      {
        nome: "Presença Celestial",
        desc: "<p>Uma aura suave acalma involuntariamente as criaturas próximas, dificultando a hostilidade imediata.</p>",
      },
      {
        nome: "Incapaz de Mentir",
        desc: "<p>O Nefilim não consegue mentir: qualquer tentativa de falsidade direta falha automaticamente.</p>",
      },
      {
        nome: "Resistência Divina",
        desc: "<p>Recebe +1 em uma Jogada de Proteção à sua escolha (JPD, JPC ou JPS), definida na criação do personagem.</p>",
      },
      {
        nome: "Recuperação Acelerada",
        desc: "<p>Cura 2 PV por dia de descanso (em vez de 1) e recupera 1d6+2 PV com um repouso completo (em vez de 1d4).</p>",
      },
    ],
  },
  {
    nome: "Orc do Sol Poente",
    flavor: "<p>Orcs disciplinados e refinados, herdeiros de uma tradição marcial. Tendem à Ordem.</p>",
    descricao:
      "<p>Diferentemente dos orcs selvagens, os Orcs do Sol Poente cultivaram uma cultura de disciplina, técnica e honra marcial. São combatentes metódicos e resilientes em longas marchas.</p>",
    movement: 9,
    infravision: 18,
    alignment_tendency: "ordeiro",
    habilidades: [
      {
        nome: "Técnica Refinada",
        desc: "<p>Treinamento marcial apurado: +1 no dano com armas cortantes e perfurantes.</p>",
      },
      {
        nome: "Corpos Forjados",
        desc: "<p>Testes de Força para erguer ou empurrar objetos são sempre considerados Fáceis.</p>",
      },
      {
        nome: "Postura do Sol Poente",
        desc: "<p>A disciplina física os torna resistentes: +1 em qualquer JPC.</p>",
        jp: { jpc: true },
      },
      {
        nome: "Disciplina de Marcha",
        desc: "<p>Armaduras contam 1 ponto a menos para fins de carga, permitindo marchas mais longas sem penalidade.</p>",
      },
    ],
  },
  {
    nome: "Silente",
    flavor: "<p>Seres de Corpo Estático. Não curam naturalmente; sangue fresco os restaura.</p>",
    descricao:
      "<p>Os Silentes são seres antimágicos de presença perturbadora. Seu Corpo Estático não conhece a cura natural — apenas o sangue fresco os restaura — e sua existência ecoa em silêncio contra a magia.</p>",
    movement: 9,
    infravision: 0,
    alignment_tendency: "neutro",
    habilidades: [
      {
        nome: "Eco-Sombrio",
        desc: "<p>Sua presença incomoda: –4 em Testes de Reação. Em compensação, com 1 em 1d6 podem passar despercebidos em ambientes de penumbra.</p>",
      },
      {
        nome: "Mestre das Lâminas Curtas",
        desc: "<p>Ataques com adagas e facas são considerados Fáceis. Empunhando duas lâminas curtas, recebem +1 de CA.</p>",
      },
      {
        nome: "Corpo Estático",
        desc: "<p>Não se curam naturalmente nem por magia. Beber 500 ml de sangue fresco restaura 1d4 PV.</p>",
      },
      {
        nome: "Eco Antimágico",
        desc: "<p>Não conjuram magias de nenhuma espécie, mas em troca são imunes a magias que os tenham como alvo direto.</p>",
      },
    ],
  },
  {
    nome: "Varko",
    flavor: "<p>Pequenos seres das profundezas. Infravisão excepcional; a luz forte os prejudica.</p>",
    descricao:
      "<p>Os Varko habitam as profundezas subterrâneas de Ekhoria. Pequenos, vigorosos e adaptados à escuridão total, são exímios conhecedores do submundo — mas sofrem sob a luz forte da superfície.</p>",
    movement: 6,
    infravision: 30,
    alignment_tendency: "caotico",
    habilidades: [
      {
        nome: "Conhecimento das Profundezas",
        desc: "<p>Com 1–2 em 1d6, obtêm informações úteis sobre construções, passagens e perigos de ambientes subterrâneos.</p>",
      },
      {
        nome: "Vigorosos",
        desc: "<p>Resistência incomum para o tamanho: +1 em qualquer JPC.</p>",
        jp: { jpc: true },
      },
      {
        nome: "Pequenos",
        desc: "<p>Seu tamanho reduzido torna Difíceis os ataques de criaturas Grandes contra eles.</p>",
      },
      {
        nome: "Restrições",
        desc: "<p>Só podem usar armas pequenas e médias. Sob luz forte, todas as suas ações são consideradas Difíceis.</p>",
      },
      {
        nome: "Sono Intranquilo",
        desc: "<p>Dormem apenas 4 horas por ciclo, recuperando 1d2+1 PV por descanso.</p>",
      },
    ],
  },
];
