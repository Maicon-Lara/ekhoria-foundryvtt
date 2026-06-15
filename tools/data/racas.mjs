// Raças do cenário Ekhoria — transcritas do livro "Ekhoria — Mecânicas para
// Old Dragon 2" (capítulo POVOS DE EKHORIA). São as 7 raças com mecânica própria.
// As raças base do OD2 (Humano, Elfo, Anão, Halfling, Meio-Elfo, Gnomo) recebem
// apenas lore no livro e usam a mecânica do Livro de Regras Básicas.
//
// Campos da raça (tipo nativo "race"): movement, movement_swim, movement_fly,
// infravision, alignment_tendency ("ordeiro" | "neutro" | "caotico" | "none"),
// *_notes. Cada habilidade vira um Item "race_ability"; bônus seguros (jp,
// natural_armor, daily_uses, variable_construction) são preenchidos.

const CONSTRUCAO_VARIAVEL = [
  { key: "arma-embutida", name: "Arma Embutida", description: "Uma arma de corpo a corpo de uma mão ou besta substitui uma das mãos. Não pode ser desarmado, mas possui uma mão a menos." },
  { key: "armadura-leve", name: "Armadura Leve", description: "Camada externa reforçada, conferindo +3 na CA. Impede o uso de armaduras externas." },
  { key: "armadura-pesada", name: "Armadura Pesada", description: "Camada muito reforçada, conferindo +5 na CA e –2 metros de deslocamento. Impede o uso de armaduras externas." },
  { key: "arpeu", name: "Arpéu", description: "Arpéu com 15 metros de cabo ejetável do corpo, usado para se içar ou como ataque à distância (Arremesso 5, Perfurante, 1d4+1 de dano)." },
  { key: "asas", name: "Asas", description: "Par de asas mecânicas com voo de 9 metros. Não é possível transportar mais que uma carga leve durante o voo. Armaduras precisam ser feitas sob medida." },
  { key: "bracos-extras", name: "Braços Extras", description: "Par de braços adicionais com duas mãos destras. Pode usar duas armas e realizar um ataque extra sem penalidade." },
  { key: "escudo-embutido", name: "Escudo Embutido", description: "Escudo preso permanentemente a um dos braços. Testes que exijam usar essa mão são difíceis. O braço não entra em lugares estreitos e impede o uso de armas de duas mãos." },
  { key: "espinhos", name: "Espinhos", description: "Corpo recoberto por espinhos (trate como adaga, 1d4 de dano) que ferem qualquer um que o agarre." },
  { key: "flutuadores", name: "Flutuadores", description: "Partes ocas permitem natação, mas tornam o Autokthon incapaz de afundar naturalmente." },
  { key: "material-incomum", name: "Material Incomum", description: "Partes do corpo feitas de prata, ferro frio ou mitral. Ataques e defesas naturais recebem os benefícios do material escolhido." },
  { key: "resistencia", name: "Resistência", description: "Escolha um tipo de dano (cortante, perfurante, impactante, fogo, ácido ou veneno). Todo dano desse tipo é reduzido em 5 pontos." },
  { key: "tamanho-grande", name: "Tamanho Grande", description: "Entre 2 e 4 metros de altura. Equipamentos sob medida (no mínimo o triplo do custo). Usa armas médias e grandes com uma mão, e enormes com ambas." },
  { key: "tamanho-pequeno", name: "Tamanho Pequeno", description: "Cerca de 1 metro de altura. +2 na CA contra alvos grandes ou maiores. Só usa armas médias com ambas as mãos; não usa armas grandes. Armaduras sob medida." },
];

export const racas = [
  {
    nome: "Autokthon",
    flavor: "<p>Constructos que não deveriam existir — mas existem. Animados por uma Pedra da Alma.</p>",
    descricao:
      "<p>No centro de cada Autokthon há uma Pedra da Alma gravada com runas que apenas outros Autokthons leem — e apenas parcialmente. Sem ela, o Autokthon é objeto inanimado; destruí-la o mata instantaneamente, removê-la induz coma. Não há dois iguais: variam em material (metal, madeira, pedra, cristal), tamanho e forma. Não dormem, não comem, não envelhecem — e carregam para sempre a pergunta de quem os criou.</p>",
    movement: 9,
    infravision: 30,
    alignment_tendency: "neutro",
    alignment_notes: "Tendem ao Neutro ou ao Ordeiro.",
    habilidades: [
      {
        nome: "Constructo Vivo",
        desc: "<p>A Pedra da Alma concede vida real, mas de natureza única. Autokthons não dormem, não se alimentam, não respiram e não envelhecem; não possuem sistema circulatório. São imunes a sono, venenos, doenças comuns e drenagem de sangue, e não podem beber poções mágicas. Precisam de 8 horas de estudo para memorizar magias. São plenamente suscetíveis a efeitos mentais, morte, paralisia, cegueira, surdez, drenagem de energia, acertos críticos e efeitos que exijam JPC. <em>Aprisionar Alma</em> e <em>Reviver Mortos</em> não os afetam; <em>Curar</em> e <em>Causar Ferimentos</em> os afetam pela metade.</p>",
      },
      {
        nome: "Adaptabilidade",
        desc: "<p>O Autokthon recebe +1 em uma única Jogada de Proteção à sua escolha.</p>",
      },
      {
        nome: "Construção Variável",
        desc: "<p>Ao criar o personagem, escolha duas características de construção da lista a seguir (a palavra final é do Mestre).</p>",
        variable_construction: { choices_count: 2, available_options: CONSTRUCAO_VARIAVEL },
      },
      {
        nome: "Vulnerabilidades",
        desc: "<p>O material de construção cria suscetibilidades específicas. Um Autokthon com partes de madeira pode ser infectado por fungos ou cupins; um com partes metálicas teme o toque das antenas de um Monstro Ferrugem tanto quanto um guerreiro teme veneno.</p>",
      },
    ],
  },
  {
    nome: "Cambion",
    flavor: "<p>Filhos do pacto profano — híbridos meio-humanoides, meio-demoníacos, que o mundo prefere ignorar.</p>",
    descricao:
      "<p>O Cambion nasce de um processo antinatural envolvendo um Súcubo/Íncubo, uma vítima e uma portadora. Carrega a aparência da raça da portadora como base e marcas infernais como constante — sempre incluindo a Marca do Três. É estéril: a linhagem termina nele. Herda o charme demoníaco e a desconfiança de quem foi traído repetidamente.</p>",
    movement: 9,
    movement_notes: "Cambions descendentes de raças pequenas mantêm a característica Pequeno, com movimento de 6 metros.",
    infravision: 15,
    alignment_tendency: "none",
    habilidades: [
      {
        nome: "Enganadores",
        desc: "<p>Por parentesco com criaturas metamórficas, alteram ligeiramente a aparência (altura até 15 cm, peso até 25%, cor de pele/olhos/cabelos, gênero, formato do rosto). Não permite se passar por alguém específico, mas modifica testes de reação em +1 ou –1 com quem não conhece sua verdadeira natureza.</p>",
      },
      {
        nome: "Graça Diabólica",
        desc: "<p>Movimentos graciosos e controlados por herança demoníaca: +1 em qualquer teste de JPD.</p>",
        jp: { jpd: true },
      },
      {
        nome: "Conhecimento Ancestral",
        desc: "<p>Chance de 1–2 em 1d6 de reconhecer símbolos demoníacos ou profanos, ou recordar informações sobre demônios (a critério do Mestre). Cambions Magos e Clérigos: 1–3 em 1d6. Cambions Acadêmicos: 1–4 em 1d6.</p>",
      },
      {
        nome: "Marcados",
        desc: "<p>Carrega ao menos duas marcas visíveis da descendência demoníaca (escolhidas com o Mestre): olhos diferentes, mãos estranhas, três olhos, língua bifurcada, chifres, pele anormal, dentes pontiagudos, ausência de nariz, orelhas pontudas, cauda, protuberâncias escapulares ou odor de enxofre.</p>",
      },
    ],
  },
  {
    nome: "Elfo Drow",
    flavor: "<p>Elfos transformados há dois mil anos por um ritual proibido, que serve à Tecelã nas profundezas.</p>",
    descricao:
      "<p>Descendentes de elfos do Vale da Águia que buscaram longevidade num ritual proibido e encontraram algo anterior à Tríade — A Tecelã. Foram transformados: pele do negro-obsidiana ao púrpura, cabelos prateados ou negros, olhos vermelhos ou violetas. Vivem em Labirintos-Templo no Subterrâneo Profundo, numa sociedade matriarcal onde contratos são sagrados por cálculo.</p>",
    movement: 9,
    infravision: 18,
    alignment_tendency: "neutro",
    habilidades: [
      {
        nome: "Elfos",
        desc: "<p>Elfos Drow são tratados como elfos para todos os efeitos, incluindo o cumprimento de requisitos de classe ou especialização.</p>",
      },
      {
        nome: "Magia Inata",
        desc: "<p>Podem conjurar a magia <em>Escuridão</em> uma vez por dia, como um Mago de nível igual aos seus DV.</p>",
        daily_uses: 1,
      },
      {
        nome: "Imunidades",
        desc: "<p>Imunes a efeitos e magias que envolvam sono e à paralisia causada por Ghouls. Precisam de apenas 4 horas de meditação por dia como descanso.</p>",
      },
      {
        nome: "Graciosos",
        desc: "<p>Controlam com precisão seus movimentos: +1 em qualquer teste de JPD.</p>",
        jp: { jpd: true },
      },
      {
        nome: "Vulnerabilidade",
        desc: "<p>Sob sol ou luz forte, todos os testes e Jogadas de Proteção do Drow são realizados com ajuste Difícil.</p>",
      },
    ],
  },
  {
    nome: "Mantes",
    flavor: "<p>Caçadores insectoides de exoesqueleto rígido e quatro braços, vindos das Areias Esquecidas.</p>",
    descricao:
      "<p>Ninguém sabe de onde vieram os Mantes — nem eles. Entre dois e dois metros e quarenta, com cabeça triangular de olhos compostos, antenas sensoriais, mandíbulas em pinça e quatro braços de coordenação independente. Comunicam emoções por feromônios, o que outras raças confundem com frieza. Vivem em clãs nômades do deserto, leais até a morte.</p>",
    movement: 9,
    infravision: 18,
    alignment_tendency: "neutro",
    habilidades: [
      {
        nome: "Exoesqueleto",
        desc: "<p>Possuem uma carapaça rígida que garante CA natural 14 + modificador de Destreza (em vez dos 10 + Destreza usuais). Por sua anatomia incomum, não podem usar armaduras de nenhum tipo.</p>",
        natural_armor: 14,
      },
      {
        nome: "Saltadores",
        desc: "<p>Saltam o dobro da distância de um humano — cerca de 10 metros para frente ou 3 metros para cima.</p>",
      },
      {
        nome: "Graciosos",
        desc: "<p>Controlam com precisão seus movimentos: +1 em qualquer teste de JPD.</p>",
        jp: { jpd: true },
      },
      {
        nome: "Sem Sono",
        desc: "<p>Mantes nunca dormem, mas precisam descansar, ficando completamente parados — descansos curtos e espalhados pelo dia. Conjuradores ainda precisam de 8 horas seguidas de descanso/meditação para memorizar magias. São imunes à magia Sono e efeitos similares.</p>",
      },
      {
        nome: "Ecdise",
        desc: "<p>Uma vez ao ano realizam a muda do exoesqueleto: 1 dia inteiro imóvel. Após a muda, o novo exoesqueleto leva 10 dias para enrijecer — período em que o Mantes perde a habilidade Exoesqueleto. O Mestre determina quando ocorre.</p>",
      },
      {
        nome: "Membros Extras",
        desc: "<p>Possuem duas mãos destras adicionais, podendo usar duas armas e realizar um ataque extra sem penalidade.</p>",
      },
    ],
  },
  {
    nome: "Nefilim",
    flavor: "<p>Filhos de celestiais e mortais — admirados por todos, compreendidos por ninguém.</p>",
    descricao:
      "<p>Nefilins parecem a versão perfeita da raça da mãe, com olhos metálicos que brilham levemente e uma aura involuntária que acalma quem está por perto. Carregam nostalgia inexplicável, ingenuidade perigosa e a incapacidade física de mentir. Sentem que têm um destino — e vivem isso com mais angústia do que parece.</p>",
    movement: 9,
    movement_notes: "Nefilins descendentes de raças pequenas mantêm a característica Pequeno, com movimento de 6 metros.",
    infravision: 15,
    alignment_tendency: "ordeiro",
    habilidades: [
      {
        nome: "Carismáticos",
        desc: "<p>A aura de paz dos Nefilins faz todos tenderem a se sentir bem em sua presença. Havendo um Nefilim no grupo, os testes de Reação são feitos com bônus de +2.</p>",
      },
      {
        nome: "Graciosos",
        desc: "<p>Controlam com precisão seus movimentos: +1 em qualquer teste de JPD.</p>",
        jp: { jpd: true },
      },
      {
        nome: "Pacíficos",
        desc: "<p>Uma vez por dia, podem lançar a magia <em>Santuário</em> como um Clérigo de nível igual aos seus DV.</p>",
        daily_uses: 1,
      },
      {
        nome: "Honestidade",
        desc: "<p>Têm grande dificuldade em ser desonestos. Falham automaticamente em testes de JP contra efeitos que os obriguem a contar a verdade.</p>",
      },
    ],
  },
  {
    nome: "Orc do Sol Poente",
    flavor: "<p>Orcs disciplinados e refinados de um império marcial e filosófico. A força que se contém.</p>",
    descricao:
      "<p>Diferentemente dos orcs selvagens do ocidente, os Orcs do Sol Poente cultivaram uma cultura onde intelectual e guerreiro são a mesma pessoa. Movem-se com controle deliberado e econômico; sua musculatura é funcional, não de demonstração. Vivem segundo três pilares: Força Contida, Ordem e Disciplina, e Dever ao Coletivo.</p>",
    movement: 9,
    infravision: 18,
    alignment_tendency: "ordeiro",
    alignment_notes: "Tendem ao Ordeiro, embora o Neutro seja igualmente comum entre os que passaram tempo fora do Império.",
    habilidades: [
      {
        nome: "Técnica Refinada",
        desc: "<p>Séculos de duelos rituais e filosofia marcial ensinaram a explorar cada abertura com precisão: +1 no dano com armas cortantes e perfurantes.</p>",
        bonus_damage: 1,
        bonus_damage_condition: "slashing",
        bonus_damage_condition_2: "piercing",
      },
      {
        nome: "Corpos Forjados",
        desc: "<p>O treinamento diário desde a infância transforma o corpo em instrumento: testes de Força para erguer ou empurrar são sempre Fáceis.</p>",
      },
      {
        nome: "Postura do Sol Poente",
        desc: "<p>A disciplina física os acostuma a suportar o que quebraria outro: +1 em qualquer teste de JPC.</p>",
        jp: { jpc: true },
      },
      {
        nome: "Fúria dos Ancestrais (Ki)",
        desc: "<p>Com uma rodada de concentração — e apenas em estado de controle, jamais em pânico ou amedrontado — o orc abre seu Ki à perícia dos que vieram antes. Pode fazê-lo uma vez por dia, mais uma a cada 5 níveis (2×/dia no 6º, 3×/dia no 11º); o estado dura um número de rodadas igual ao seu modificador de Sabedoria (mínimo 1). Enquanto ativo:</p><ul><li><strong>Em combate:</strong> suas jogadas de ataque recebem um Ajuste Fácil (+2) e ele causa +2 de dano. A partir do estágio Heroico (6º nível), pode trocar esses bônus por um ataque extra por rodada.</li><li><strong>Num ofício ou perícia que já domine</strong> (forja, arte, navegação...): uma tarefa que exija teste é resolvida com Ajuste Muito Fácil (+5) — a mão de mil antepassados guiando a sua (um 20 natural ainda é falha).</li><li><strong>O preço da memória emprestada:</strong> quando o estado termina, todos os seus testes ficam em Ajuste Difícil (−2) por 1d4 rodadas.</li></ul>",
        daily_uses: 1,
      },
    ],
  },
  {
    nome: "Varko",
    flavor: "<p>Os Halflings das Profundezas — exilados do subterrâneo, paranoicos e adaptados à escuridão.</p>",
    descricao:
      "<p>Há oitocentos anos, um clã Halfling desceu fundo demais e o subterrâneo ficou com eles. A pele clareou sem sol, os olhos cresceram, e a paranoia se instalou como postura corporal. Mantêm o porte halfling (90 cm a 1,10 m), veneram deuses esquecidos e tratam relíquias antigas como história viva. Foram exilados pelos Halflings da superfície — e o ressentimento só amadureceu.</p>",
    movement: 6,
    infravision: 30,
    alignment_tendency: "caotico",
    habilidades: [
      {
        nome: "Conhecimento das Profundezas",
        desc: "<p>Pela capacidade de suportar exercícios contínuos e condições adversas: +1 em qualquer teste de JPC.</p>",
        jp: { jpc: true },
      },
      {
        nome: "Vigorosos",
        desc: "<p>A resistência sobre-humana dos Varkos lhes permite suportar o dobro do tempo de marcha forçada, trabalho pesado ou privação antes de sofrer penalidades por exaustão.</p>",
      },
      {
        nome: "Pequenos",
        desc: "<p>Todos os ataques de criaturas Grandes ou maiores são considerados Difíceis para acertar um Varko.</p>",
      },
      {
        nome: "Restrições",
        desc: "<p>Não podem usar armas grandes e só usam uma arma média com as duas mãos. Sob sol ou luz forte, todos os testes e Jogadas de Proteção são realizados com ajuste Difícil.</p>",
      },
      {
        nome: "Sono Intranquilo",
        desc: "<p>Têm sono agitado e dormem apenas quatro horas por noite, recuperando apenas 1d2+1 PV ao repousar. Magos Varkos ainda precisam de 8 horas para recuperar magias.</p>",
      },
    ],
  },
  {
    nome: "Arkanim",
    flavor: "<p>Humanos transformados por gerações sob a pressão arcana de Arkádia. Cristais crescem em sua pele.</p>",
    descricao:
      "<p>Os Arkanim são o que acontece quando gerações de humanos vivem sob a pressão arcana de Arkádia. Cristais coloridos crescem pela pele e as veias brilham em azul-violeta sob emoção intensa; o corpo aprendeu a processar o que mataria um visitante não adaptado. Tratam magia como ferramenta, não milagre.</p>",
    movement: 9,
    infravision: 0,
    alignment_tendency: "none",
    habilidades: [
      {
        nome: "Filhos de Arkádia",
        desc: "<p>Por nascerem em Arkádia, detectam anomalias mágicas com 1 em 1d6, mesmo sem analisar ativamente (como sob o efeito de Detectar Magias).</p>",
      },
      {
        nome: "Infecção Mágica",
        desc: "<p>Sua origem mágica os torna mais resistentes a efeitos que afetam mente e corpo: +1 em teste de JPS ou JPC (à escolha).</p>",
      },
      {
        nome: "Herança Arcana",
        desc: "<p>Uma vez por dia, conjuram uma magia de 1º círculo, definida aleatoriamente no nascimento ou escolhida pelo Mestre.</p>",
        daily_uses: 1,
      },
    ],
  },
  {
    nome: "Atlante",
    flavor: "<p>Eruditos errantes das correntes — nômades anfíbios que transformaram o movimento em filosofia.</p>",
    descricao:
      "<p>Sem lar fixo, os Atlantes vivem em frotas-cidade que nunca param de se mover, descendentes dos que fugiram para o mar no Dilúvio Ancestral. Têm guelras, pele em tons aquáticos e carregam o Diário de Corrente com tudo o que viveram. Para um Atlante, parar é morte.</p>",
    movement: 9,
    movement_swim: 12,
    infravision: 18,
    infravision_notes: "30 metros embaixo d'água; 18 metros fora dela.",
    alignment_tendency: "ordeiro",
    habilidades: [
      {
        nome: "Anfíbios",
        desc: "<p>Respiram sob a água e fora dela, sem nenhuma penalidade para agir ou lutar submersos.</p>",
      },
      {
        nome: "Adaptabilidade",
        desc: "<p>Recebem +1 em uma única Jogada de Proteção à sua escolha.</p>",
      },
      {
        nome: "Letrados",
        desc: "<p>Sabem ler e escrever o próprio idioma e ao menos um idioma adicional.</p>",
      },
      {
        nome: "Dependência de Água",
        desc: "<p>Em terra firme, bebem o dobro de água diária e precisam submergir totalmente ao menos uma vez por semana. Sem isso, após 1 semana todas as jogadas ficam Difíceis; após 2 semanas, Muito Difíceis.</p>",
      },
    ],
  },
  {
    nome: "Silente",
    flavor: "<p>Os Esquecidos pelo Ciclo, presos entre a vida e o fim. Mortos-vivos conscientes que o mundo prefere esquecer.</p>",
    descricao:
      "<p>Os Silentes são mortos-vivos conscientes criados pela <strong>Magia do Eco</strong> — um ritual proibido (o Ritual do Eco Contaminado) que prende um eco da alma a um corpo morto, gerando uma existência limiar: nem vivo, nem morto, apenas persistência. Não apodrecem; têm pele pálida e fosca, são frios como mármore, suas veias são estáticas e seus ferimentos nunca cicatrizam. O mundo instintivamente os esquece, e para videntes, clérigos e magos eles emitem apenas <em>ausência</em> — por isso magias de alvo direto não os atingem.</p><p>Para persistir, precisam ingerir 500 ml de sangue fresco por semana e aplicar unguentos alquímicos; partes do corpo que falham são substituídas por peças de cadáveres. Foram criados pela Velha Irmandade há cerca de 150 anos — criar novos Silentes é proibido em toda Ekhoria.</p>",
    movement: 9,
    infravision: 0,
    alignment_tendency: "neutro",
    habilidades: [
      {
        nome: "Eco-Sombrio",
        desc: "<p>Silentes sofrem –4 em Testes de Reação. Além disso, têm 1 em 1d6 de chance de simplesmente não serem percebidos, como se o mundo evitasse notá-los.</p>",
      },
      {
        nome: "Mestre das Lâminas Curtas",
        desc: "<p>Ataques com adagas e facas contam como Ataques Fáceis. Ao usar duas lâminas, recebem +1 na CA, como se portassem um escudo leve.</p>",
      },
      {
        nome: "Corpo Estático",
        desc: "<p>Não se curam naturalmente nem por magia. Beber 500 ml de sangue fresco restaura 1d4 PV. Energia necrótica — como a magia <em>Causar Ferimentos</em> — também o restaura em vez de feri-lo (é assim que o Relicário Vivo se autocura). Podem substituir partes perdidas ou transferir o núcleo espiritual (o Eco) para outro corpo preparado.</p>",
      },
      {
        nome: "Eco Antimágico",
        desc: "<p>Não podem conjurar magias e não podem ser alvo de magias de efeito direto. Magias de área os afetam normalmente, mas magias de cura (mesmo em área) jamais surtem efeito.</p>",
      },
    ],
  },
];

// Habilidades de raça avulsas (não pertencem a uma raça específica; são
// arrastadas para a ficha quando uma classe concede um aprimoramento racial).
// O Custódio Solar concede ao Autokthon uma 3ª característica de Construção
// Variável — como o tipo class_ability não suporta variable_construction, a
// 3ª escolha é entregue por esta habilidade de raça (choices_count 1), que
// soma +1 seletor na ficha além dos 2 da raça Autokthon.
export const racaAbilitiesAvulsas = [
  {
    folder: "Aprimoramentos de Classe",
    nome: "Construção Variável (Custódio Solar)",
    desc: "<p>Aprimoramento da classe <strong>Custódio Solar</strong> (habilidade Núcleo da Chama Primordial): concede ao Autokthon uma 3ª característica de Construção Variável. Adicione esta habilidade à ficha do Custódio para liberar o seletor extra (totalizando 3 com os 2 da raça).</p>",
    variable_construction: { choices_count: 1, available_options: CONSTRUCAO_VARIAVEL },
  },
];
