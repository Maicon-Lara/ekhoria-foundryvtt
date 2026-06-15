// Classes (Especializações) do cenário Ekhoria — transcritas do livro
// "Ekhoria — Mecânicas para Old Dragon 2" (capítulo CLASSES).
//
// Cada classe herda o BA/JP do arquétipo base e usa uma tabela de XP de
// Especialista (ver progressoes.mjs). `dv` -> system.hp; `high_level_hp_bonus`
// -> PV fixo ganho a partir do nível 11. `restricao_racas` é informativo.
// Habilidades com evoluções por nível usam os campos level3/level6/level10.

import { progressao } from "./progressoes.mjs";

const EQUIP_GUERREIRO_MAGIC = "Não pode usar cajados, varinhas ou pergaminhos mágicos, exceto pergaminhos de proteção.";

export const classes = [
  {
    nome: "Custódio Solar",
    tabela: "clerigo_esp",
    dv: 8,
    high_level_hp_bonus: 1,
    restricao_racas: ["Autokthon"],
    flavor: "<p>A Sentinela Eterna da Luz Primordial. Especialização de Clérigo, exclusiva de Autokthons.</p>",
    descricao:
      "<p>O Custódio Solar não é escolhido por deuses: <em>escolhe</em>, com plena consciência, transferir sua alma para uma Pedra da Alma e renascer como Autokthon vinculado à Luz Primordial. Sua convicção não é emprestada de divindade alguma — quando a Ordem falha, o Custódio permanece. Ao passar pelo Ritual da Renúncia, assume todas as habilidades raciais dos Autokthons.</p>",
    equipment_restrictions: {
      weapons: "Pode usar todas as armas.",
      armors: "Pode usar todas as armaduras.",
      magic_items: "Apenas itens mágicos ordeiros. Itens caóticos nunca funcionam para um Custódio.",
    },
    levels: progressao("clerigo_esp"),
    habilidades: [
      { nome: "Núcleo da Chama Primordial", level: 1, desc: "<p>A fé do Custódio é alimentada por uma forja interna rítmica. Ele prepara magias divinas desde o 1º nível através de meditação diária (8 horas). Devido à sua natureza artificial, <strong>não recebe magias extras por Sabedoria</strong>. Como benefício dessa sintonização, recebe uma <strong>terceira</strong> característica de Construção Variável no 1º nível (totalizando 3 com as 2 da raça Autokthon).</p><p><em>Na ficha:</em> além das 2 escolhas da raça, adicione a habilidade de raça <strong>Construção Variável (Custódio Solar)</strong> — disponível no compêndio <em>Ekhoria: Raças</em>, pasta \"Aprimoramentos de Classe\" — para liberar o 3º seletor de construção.</p>" },
      { nome: "Pulso de Estabilidade", level: 1, usos_dia: 1, desc: "<p>O Custódio emite uma frequência de Ordem absoluta através de sua Pedra da Alma. Criaturas <strong>Caóticas</strong> num raio de 18 metros devem realizar um <strong>Teste de Moral</strong> (2d6 + nível do Custódio vs. Moral do alvo). Aquelas que falharem fugirão desesperadamente por 1 turno. <strong>Desintegração:</strong> se a falha ocorrer com dados iguais (dois 4, 5 ou 6), a criatura é imediatamente desintegrada, reduzida a pó. Alvos bem-sucedidos tornam-se imunes a esta habilidade até o próximo amanhecer.</p>", level3: "<p>Pode utilizar Pulso de Estabilidade duas vezes ao dia.</p>", level10: "<p>Pode utilizar Pulso de Estabilidade três vezes ao dia.</p>" },
      { nome: "Disciplina Solar", level: 3, desc: "<p>Recebe +1 na Base de Ataque em relação ao Clérigo padrão e escolhe um aprimoramento permanente no chassi: +1 de dano com uma arma específica OU +1 de bônus na CA.</p>" },
      { nome: "Portador da Luz", level: 6, usos_dia: 1, desc: "<p>Uma vez por dia, ao ser atingido por uma criatura Caótica, reage instantaneamente para reduzir o dano à metade ou impedir efeitos colaterais do ataque (drenagem, maldições ou corrupção).</p>" },
      { nome: "Aura de Estabilidade", level: 10, desc: "<p>Emana uma aura constante em raio de 9 metros que funciona como <em>Proteção Contra Alinhamento</em> contra seres Caóticos. Aliados na área recebem bônus em JP contra efeitos caóticos enquanto o Custódio estiver consciente.</p>" },
      { nome: "Reputação", level: 11, desc: "<p>Os feitos do Custódio tornam-se notórios, conferindo Reputação 1 em 1d6, aumentando +1 a cada nível subsequente até o máximo de 5 em 1d6.</p>" },
    ],
  },
  {
    nome: "Relicário Vivo",
    tabela: "clerigo_esp",
    dv: 8,
    high_level_hp_bonus: 1,
    restricao_racas: ["Silente"],
    flavor: "<p>A Unidade Insurgente de Breônia. Especialização de Clérigo, exclusiva de Silentes.</p>",
    descricao:
      "<p>Agente oficialmente negável do Conselho de Ônix, o Relicário Vivo existe nas sombras de outras nações — observador silencioso e eliminador de ameaças que Breônia jamais admitirá ter enviado. Apenas um Silente pode trilhar esse caminho. Após o Juramento do Vazio, se capturado ou morto, Breônia negará conhecê-lo — embora seu nome esteja gravado em ônix nos Arquivos Silenciosos.</p>",
    equipment_restrictions: {
      weapons: "Só pode usar armas cortantes.",
      armors: "Pode usar todas as armaduras.",
      magic_items: "Apenas itens mágicos caóticos. Itens ordeiros nunca funcionam.",
    },
    levels: progressao("clerigo_esp"),
    habilidades: [
      { nome: "Litania do Relicário", level: 1, desc: "<p>Prepara e conjura magias divinas diariamente meditando sobre a entropia e a Anomalia. Suas magias são manifestações internas, tornando-o imune a efeitos mágicos diretos de terceiros (magias de área o afetam normalmente). Por padrão, suas magias são sempre preparadas em versão reversa.</p>" },
      { nome: "Consagrar os Esquecidos", level: 1, usos_dia: 1, desc: "<p>Brandindo seu símbolo sagrado, submete mortos-vivos a até 18 metros que falharem em Teste de Moral; eles obedecem a comandos simples por 1d6 rodadas. Controle Total: se o morto-vivo falhar com dados iguais (dois 4, dois 5 ou dois 6), permanece sob controle total até o próximo amanhecer. Uma vez por dia.</p>", level3: "<p>+1 no teste e duas vezes por dia.</p>", level10: "<p>+2 no teste e três vezes por dia.</p>" },
      { nome: "Oferenda Reliquial", level: 1, desc: "<p>Troca uma magia memorizada por <em>Causar Ferimentos</em> (1º círculo), causando 1d8 de dano mágico por toque. Mortos-vivos são curados por esse efeito, incluindo o próprio Relicário.</p>", level6: "<p>Pode usar <em>Causar Ferimentos</em> de 3º círculo: até 2d8 de dano.</p>", level10: "<p>Pode usar <em>Causar Ferimentos</em> de 5º círculo: até 3d8 de dano.</p>" },
      { nome: "Erguer os Consagrados", level: 1, usos_dia: 1, desc: "<p>Anima cadáveres como servos temporários (ritual de 1 turno por corpo): Esqueletos (1 DV) ou Zumbis (2 DV). Duração de 1 hora por nível; total máximo de DV igual ao modificador de Sabedoria. Uma vez por dia. Ao fim da duração, os servos viram pó.</p>" },
      { nome: "Veredicto do Relicário", level: 10, usos_dia: 1, desc: "<p>Uma quantidade de vezes por dia igual ao seu <strong>modificador de Sabedoria (mínimo 1)</strong>, aponta para uma criatura a até 9 metros e pronuncia a sentença final. A criatura faz Jogada de Proteção de Constituição (JPC) contra Morte com Ajuste Difícil (−2). Falha: criaturas vivas sofrem 3d8 de dano mágico e mortos-vivos são instantaneamente destruídos (reduzidos a pó). Sucesso: metade do dano ou evita a destruição.</p>" },
      { nome: "Reputação (Infâmia)", level: 11, desc: "<p>Torna-se figura amplamente temida: obtém Infâmia 1 em 1d6, aumentando +1 até o máximo de 1–5 em 1d6 no 15º nível.</p>" },
    ],
  },
  {
    nome: "Narcoguerreiro",
    tabela: "guerreiro_esp",
    dv: 10,
    high_level_hp_bonus: 2,
    flavor: "<p>Onde a química se torna coragem, e a coragem se torna vício. Especialização de Guerreiro.</p>",
    descricao:
      "<p>O Narcoguerreiro transforma o próprio corpo em arma por alquimia de combate, sacrificando longevidade por vantagem tática imediata. Domina os Fungos do Degelo de Vornfell — e paga o preço em vício e degradação progressiva. Perde a habilidade Aparar, mas mantém Maestria em Arma. Sempre que consome substâncias de combate, fica sujeito às regras de Vício e Abstinência.</p>",
    equipment_restrictions: {
      weapons: "Pode usar todas as armas.",
      armors: "Pode usar todas as armaduras.",
      magic_items: EQUIP_GUERREIRO_MAGIC,
    },
    levels: progressao("guerreiro_esp"),
    habilidades: [
      { nome: "Maestria em Arma", level: 1, desc: "<p>+1 no dano com uma arma à sua escolha.</p>" },
      { nome: "Conhecimento Químico e Filtros", level: 1, desc: "<p>Domina substâncias químicas e a sobrevivência em ambientes tóxicos. <strong>Máscara de Nurillion:</strong> enquanto a usa, fica imune aos efeitos de Sacos de Esporos e a gases naturais tóxicos. <strong>Uso Seguro:</strong> consome Extrato de Mandra Diluído recuperando 1d4 PV, um número de vezes por dia igual ao modificador de Constituição (mínimo 1), sem risco de vício. <strong>Uso Extra:</strong> além desse limite, a cura é reduzida à metade e o Mestre faz o teste de vício.</p>" },
      { nome: "Coquetel Marcial", level: 3, desc: "<p>Consome dois Fungos do Degelo diferentes simultaneamente. O risco de vício da dose combinada aumenta em +1, e a duração de qualquer exaustão ou penalidade pós-efeito dos fungos é dobrada.</p>" },
      { nome: "Metabolismo Acelerado", level: 6, desc: "<p><strong>Resiliência:</strong> +1 permanente em JPC, mais +2 adicionais em JPC para resistir a venenos e vício. <strong>Maestria em Dosagem:</strong> usa 1 fungo por dia sem teste de vício. <strong>Supressão de Dor (Nargula):</strong> ignora penalidades de movimento por ferimentos, fadiga, fome ou frio por 2d6+6 horas.</p>", jp: { jpc: true } },
      { nome: "Tolerância de Elite", level: 10, desc: "<p>O personagem atinge o ápice da resistência química. Ao consumir a substância <strong>Albinus</strong>, ativa uma <strong>Efervescência Solar:</strong> recupera 1d4 PV por rodada durante um número de rodadas igual a 1d4 + modificador de Constituição. <strong>Vapor de Proteção:</strong> enquanto a regeneração estiver ativa, emite um vapor protetor que concede +2 na CA. Essa regeneração não cura dano de fogo ou ácido.</p>" },
      { nome: "Reputação", level: 11, desc: "<p>Obtém Reputação 1 em 1d6, evoluindo +1 até o máximo de 1–5 em 1d6 no 15º nível.</p>" },
    ],
  },
  {
    nome: "Pugilista",
    tabela: "guerreiro_esp",
    dv: 10,
    high_level_hp_bonus: 2,
    flavor: "<p>A Arma Viva da Resistência Inquebrável. Especialização de Guerreiro.</p>",
    descricao:
      "<p>O Pugilista transforma o próprio corpo em arma com o calo das mãos, a velocidade dos pés e um espírito que aprendeu a não quebrar. Escolhe uma das Três Escolas — Mãos de Ferro (Benellikov), Dança do Vento (Yorugan) ou Punhos do Vale (Vale da Águia) — que muda o estilo e os códigos, mas não as habilidades mecânicas. Perde Aparar, mantém Maestria em Arma.</p>",
    equipment_restrictions: {
      weapons: "Pode usar armas pequenas e médias. Armas grandes impõem Ataque Difícil.",
      armors: "Pode usar apenas armaduras leves.",
      magic_items: EQUIP_GUERREIRO_MAGIC,
    },
    levels: progressao("guerreiro_esp"),
    habilidades: [
      { nome: "Maestria em Arma", level: 1, desc: "<p>Torna-se Mestre em uma arma à sua escolha, recebendo +1 no dano com ela.</p>" },
      { nome: "Bom de Briga (Técnica Desarmada)", level: 1, desc: "<p>Ao lutar desarmado, não sofre penalidade de Ataque Difícil nem concede Ataque Fácil a inimigos armados. <strong>Dano Letal:</strong> pode optar por causar dano letal (impactante) de 1d2 + modificador de Força, em vez de apenas tentativas de nocaute.</p>", level3: "<p>O dano desarmado letal sobe para 1d4 + modificador de Força.</p>", level10: "<p>O dano desarmado letal atinge o ápice de 1d6 + modificador de Força.</p>" },
      { nome: "Jogo de Perna e Manobras", level: 3, desc: "<p><strong>Jogo de Perna:</strong> se realizar uma ação de movimento no turno, todos os ataques contra ele são Difíceis até o início da próxima rodada. <strong>Mestre de Chão:</strong> manobras para imobilizar, derrubar ou desarmar são Ações Fáceis.</p>" },
      { nome: "Calejado", level: 6, desc: "<p><strong>Resiliência:</strong> recebe +1 Ponto de Vida permanente (uma única vez, adicionado ao seu total); testes para resistir a Medo tornam-se Fáceis (+2). <strong>Queixo de Aço:</strong> a chance de nocauteá-lo é reduzida em 1 (mínimo 1 em 1d6). <strong>Nocauteador:</strong> sua chance de nocaute aumenta para 1 + modificador de Força em 1d6.</p>" },
      { nome: "Ataque Rápido", level: 10, desc: "<p>Recebe um ataque extra por rodada, desde que ambos os ataques sejam desarmados ou realizados com soqueiras.</p>" },
      { nome: "Reputação", level: 11, desc: "<p>Obtém Reputação 1 em 1d6, evoluindo +1 até o máximo de 1–5 em 1d6 no 15º nível.</p>" },
    ],
  },
  {
    nome: "Lito-arcanista",
    tabela: "mago_esp",
    dv: 4,
    high_level_hp_bonus: 1,
    restricao_racas: ["Arkanim"],
    flavor: "<p>O Bastião Elemental da Estrutura Mineral. Especialização de Mago, exclusiva de Arkanim (Arkádia).</p>",
    descricao:
      "<p>O Lito-arcanista satura o próprio corpo com cristais de Arcanita, internalizando a Quintessência até tornar-se o vetor do poder: punhos que queimam, pele que endurece como diamante. Não conjura magias, mas continua recebendo espaços de magia até o 5º círculo, usados exclusivamente para ativar habilidades de classe. Mantém Ler Magias.</p>",
    equipment_restrictions: {
      weapons: "Pode usar armas pequenas e médias. Armas grandes apenas se forem de Arcanita.",
      armors: "Não utiliza armaduras convencionais — apenas armaduras de Arcanita e escudos leves.",
      magic_items: "Pode utilizar todos os tipos de itens mágicos.",
    },
    levels: progressao("mago_esp"),
    habilidades: [
      { nome: "Pulso de Arcanita", level: 1, desc: "<p>Ao sacrificar um espaço de magia memorizado de 1º círculo ou superior, sintoniza o núcleo com um elemento (Fogo, Frio, Eletricidade ou Ácido) e encanta os punhos ou uma arma por 1 turno por nível. Dano adicional conforme o círculo sacrificado: 1º +1d8; 3º +2d8; 5º +3d8. <strong>Concentração Marcial:</strong> se sofrer dano com o efeito ativo, faz JPC ou o efeito se dissipa.</p>" },
      { nome: "Geometria Dérmica", level: 3, desc: "<p>Ao sacrificar uma magia de 3º círculo, realinha as placas minerais defensivamente. Escolha: <strong>Enrijecer</strong> (ativa <em>Escudo Arcano</em>) ou <strong>Geotérmica</strong> (ativa <em>Proteção Contra Temperatura</em>).</p>" },
      { nome: "Refração Rúnica", level: 6, desc: "<p>Ao sacrificar uma magia de 5º círculo, projeta uma barreira de luz sólida: todos os ataques contra o Lito-arcanista são Difíceis. Duração: 1d4 + 1 por nível turnos.</p>" },
      { nome: "Ruptura do Núcleo", level: 10, desc: "<p>Sobrecarrega o próprio núcleo para uma liberação violenta de energia, sacrificando um espaço de magia de 5º círculo: todas as criaturas num raio de 6 metros centrado no Lito-arcanista sofrem 10d6 de dano elemental (do tipo sintonizado no <em>Pulso de Arcanita</em>).</p>" },
      { nome: "Reputação", level: 11, desc: "<p>Obtém Reputação 1 em 1d6, evoluindo +1 até o máximo de 1–5 em 1d6 no 15º nível.</p>" },
    ],
  },
  {
    nome: "Guardião da Centelha",
    tabela: "mago_esp",
    dv: 4,
    high_level_hp_bonus: 1,
    restricao_alinhamentos: ["ordeiro"],
    flavor: "<p>A Elite Tecnomanufaturada de Durgrann. Especialização de Mago (anões-magos), de alinhamento Ordeiro.</p>",
    descricao:
      "<p>Em Durgrann, onde engenharia é religião, os Guardiões da Centelha tratam magia como engenharia: cada feitiço tem custo calculado e margem de erro aceitável. Dominam os Cristais de Centelha como outros magos dominam componentes arcanos. Devem representar a cultura de Durgrann e ter alinhamento Ordeiro. Conjuram magias arcanas até o 5º círculo e mantêm Ler Magias e Detectar Magias.</p>",
    equipment_restrictions: {
      weapons: "Apenas armas pequenas. Armas médias ou grandes impõem Ataque Difícil.",
      armors: "Não pode usar armaduras nem escudos; se o fizer, perde a conjuração de magias e recebe apenas metade da CA.",
      magic_items: "Pode utilizar todos os tipos de itens mágicos.",
    },
    levels: progressao("mago_esp"),
    habilidades: [
      { nome: "Portador da Centelha", level: 1, desc: "<p>Recebe 1 Cristal de Centelha, anexado a um objeto manufaturado à escolha, concedendo um benefício técnico: <strong>Arma</strong> (+1 na BA e +1 no dano), <strong>Joia</strong> (+1 magia memorizada, do círculo mais alto disponível) ou <strong>Vestimenta</strong> (+1 na CA). Se perder o Cristal, perde as habilidades exclusivas da especialização (mantendo conjuração, Ler Magias e Detectar Magias); requisitar um novo leva 1d4 semanas de canalização.</p>" },
      { nome: "Domínio da Centelha", level: 3, usos_dia: 1, desc: "<p>Enquanto estiver de posse do Cristal, conjura automaticamente uma vez por dia, sem memorização prévia, uma das magias: <em>Mãos Flamejantes</em>, <em>Luz</em> ou <em>Escudo Arcano</em>.</p>" },
      { nome: "Sincronia Técnica", level: 6, desc: "<p>O Guardião aprimora a ligação com o seu dispositivo. O bônus escolhido na habilidade <strong>Portador da Centelha</strong> (BA/Dano, Magia Extra ou CA) passa a ser igual ao seu <strong>modificador de Inteligência</strong> (mínimo de +1).</p>" },
      { nome: "Reajuste Rápido", level: 10, desc: "<p>A eficiência no manuseio dos cristais atinge o ápice. A conjuração das magias concedidas pela habilidade <strong>Domínio da Centelha</strong> exige agora apenas uma <strong>Ação de Movimento</strong>, permitindo que o Guardião realize outra ação ou ataque na mesma rodada.</p>" },
      { nome: "Reputação", level: 11, desc: "<p>Obtém Reputação 1 em 1d6, evoluindo +1 até o máximo de 1–5 em 1d6 no 15º nível.</p>" },
    ],
  },
  {
    nome: "Diplomata",
    tabela: "ladrao_esp",
    dv: 6,
    high_level_hp_bonus: 1,
    flavor: "<p>O Arquiteto de Segredos e Alianças. Especialização de Ladrão.</p>",
    descricao:
      "<p>O Diplomata parece negociar, mas o que realmente faz é controlar informação: decide o que cada um sabe, pensa que sabe e nunca vai descobrir. É especialização de Ladrão porque rouba — apenas com palavras, sorrisos e o timing perfeito. Perde Ataque Furtivo; os Talentos de Diplomata substituem os Talentos de Ladrão.</p>",
    equipment_restrictions: {
      weapons: "Apenas armas pequenas ou médias.",
      armors: "Apenas armaduras leves.",
      magic_items: "Pode utilizar pergaminhos mágicos como se tivesse metade do seu nível.",
    },
    levels: progressao("ladrao_esp"),
    habilidades: [
      { nome: "Ouvir Ruídos", level: 1, desc: "<p>Ouve ruídos sutis em ambiente silencioso, fora de combate: chance de 1–2 em 1d6.</p>", level3: "<p>Chance de 1–3 em 1d6.</p>", level6: "<p>Chance de 1–4 em 1d6.</p>", level10: "<p>Chance de 1–5 em 1d6.</p>" },
      { nome: "Comitiva", level: 1, desc: "<p>Especialista em gerir subordinados. <strong>Logística:</strong> custos para contratar ajudantes e mercenários são 25% menores. <strong>Moral:</strong> seguidores recebem +1 em Moral.</p>", level3: "<p>Ataques de proteção da comitiva são Ações Fáceis.</p>", level6: "<p>Os membros recebem PV adicionais iguais ao modificador de Carisma.</p>", level10: "<p>Os membros recebem bônus em JP e Dano iguais ao modificador de Carisma.</p>" },
      { nome: "Talentos de Diplomata", level: 1, desc: "<p>Começa com 2 pontos em cada um dos cinco talentos e 2 pontos adicionais para distribuir; máximo de 5 por talento. <strong>Bônus de Atributo:</strong> recebe, no 1º nível, pontos extras iguais ao <strong>maior modificador entre Destreza ou Carisma</strong>.</p><p><em>Automação:</em> a ficha do OD2 calcula os pontos de talento por <strong>Destreza</strong>; no cenário Ekhoria o Diplomata usa o maior valor entre Destreza e Carisma — ajuste a alocação manualmente conforme o livro.</p>", level3: "<p>Recebe 2 pontos para evoluir seus talentos.</p>", level6: "<p>Recebe 2 pontos para evoluir seus talentos.</p>", level10: "<p>Recebe 2 pontos para evoluir seus talentos.</p>", rogue_talents: [
        { key: "arrombar", name: "Arrombar", description: "Abrir trancas e fechaduras para acessar correspondências e documentos." },
        { key: "culturas", name: "Culturas", description: "Heráldica, linhagens, história e etiqueta." },
        { key: "furtividade", name: "Furtividade", description: "Mover-se sem ser notado." },
        { key: "decifrar", name: "Decifrar", description: "Códigos, idiomas e alfabetos antigos." },
        { key: "dossie", name: "Dossiê", description: "Rede de informações para obter dados comprometedores (evolui de 1–2 em 1d6 / 1d4 dias até 1–5 em 1d6 / 1d6 turnos)." },
      ] },
      { nome: "Audiência", level: 3, desc: "<p>Ao preparar uma reunião formal, manipula o clima político: chance de 1–2 em 1d6 + modificador de Carisma para aplicar bônus ou penalidade no Teste de Reação.</p>", level10: "<p>O modificador aplicado passa a ser +2 ou −2.</p>" },
      { nome: "Traquejo Social", level: 6, desc: "<p>Aprende uma língua adicional por ponto do modificador de Carisma (mínimo 1).</p>" },
      { nome: "Rede de Contatos", level: 10, desc: "<p>Mediante teste de Carisma, 1d4 contatos fornecem informações obscuras ou relatos de eventos distantes.</p>" },
      { nome: "Reputação", level: 11, desc: "<p>Obtém Reputação 1 em 1d6, evoluindo +1 até o máximo de 1–5 em 1d6 no 15º nível.</p>" },
    ],
  },
  {
    nome: "Voraz",
    tabela: "ladrao_esp",
    dv: 6,
    high_level_hp_bonus: 1,
    flavor: "<p>O Anatomista de Campo da Irmandade Voraz. Especialização de Ladrão.</p>",
    descricao:
      "<p>Para o Voraz, a morte da presa é apenas o início da parte interessante: a dissecção metódica, a catalogação e a transformação de componentes em arma, veneno, antídoto ou armadura. Usa o medo como ferramenta tática e bússola. Segue a progressão de Ladrão Especialista e perde o Ataque Furtivo, substituído pelas habilidades desta especialização.</p>",
    equipment_restrictions: {
      weapons: "Pode usar armas pequenas ou médias. Armas grandes impõem Ataque Difícil.",
      armors: "Pode usar apenas armaduras leves. Escudos ou armaduras médias/pesadas impedem as habilidades de classe e dão só metade da CA.",
      magic_items: EQUIP_GUERREIRO_MAGIC,
    },
    levels: progressao("ladrao_esp"),
    habilidades: [
      { nome: "Análise de Campo", level: 1, desc: "<p>Após derrotar uma criatura significativa, faz um teste de perícia que (conforme o resultado) extrai componentes utilizáveis, identifica fraquezas da espécie para encontros futuros, ou descobre propriedades não catalogadas. O Mestre determina o que está disponível.</p>" },
      { nome: "Golpe de Abate", level: 1, desc: "<p>Ao atacar após uma aproximação furtiva, o ataque é um <strong>Ataque Muito Fácil</strong> e causa <strong>dano ×2</strong>. É a base referenciada pelo Golpe Predatório.</p>" },
      { nome: "Ouvir Ruídos", level: 1, desc: "<p>Em ambiente silencioso e fora de combate, consegue ouvir ruídos sutis (uma conversa do outro lado de uma porta, monstros se aproximando): chance de 1–2 em 1d6.</p>", level3: "<p>Chance de 1–3 em 1d6.</p>", level6: "<p>Chance de 1–4 em 1d6.</p>", level10: "<p>Chance de 1–5 em 1d6.</p>" },
      { nome: "Talentos de Caçador", level: 1, desc: "<p>Começa com 2 pontos em cada um dos cinco talentos e 2 pontos adicionais para distribuir; máximo de 5 por talento. <strong>Bônus de Destreza:</strong> recebe, no 1º nível, 1 ponto extra por ponto de modificador de Destreza.</p>", level3: "<p>Recebe 2 pontos para evoluir seus talentos.</p>", level6: "<p>Recebe 2 pontos para evoluir seus talentos.</p>", level10: "<p>Recebe 2 pontos para evoluir seus talentos.</p>", rogue_talents: [
        { key: "armadilha", name: "Armadilha", description: "Detecta e desarma silenciosamente armadilhas em lugares ou objetos." },
        { key: "rastrear", name: "Rastrear", description: "Nos Ermos e durante a caçada, segue rastros de um inimigo, animal ou erva, e procura comida e água para si e seu grupo." },
        { key: "escalar", name: "Escalar", description: "Escalar superfícies íngremes ou lisas sem o uso de cordas." },
        { key: "furtividade", name: "Furtividade", description: "Esconder-se em ambientes naturais ou nas sombras." },
        { key: "armeiro-de-carcacas", name: "Armeiro de Carcaças", description: "Domina a Extração de Despojos: extrai em metade do tempo; itens têm estatísticas plenas e não quebram em '1' natural; recursos duram 1d6+2 dias; pode preservar uma habilidade da fera no item criado." },
      ] },
      { nome: "Anatomia das Feras", level: 1, desc: "<p>Capaz de identificar monstros e animais (ataques, defesas e fraquezas) com um resultado de 1–2 em 1d6.</p>", level10: "<p>A chance aumenta para 1–3 em 1d6.</p>" },
      { nome: "Armadilhas de Abate", level: 1, desc: "<p>Cria armadilhas de campo em 1 turno. Criaturas Grandes ou maiores presas não podem realizar ataques à distância na rodada seguinte e tornam-se Alvos Enredados (ataques contra elas são Fáceis).</p>" },
      { nome: "Golpe Predatório", level: 3, desc: "<p>Contra criaturas identificadas por <em>Anatomia das Feras</em>, ignora bônus de CA por Couro Grosso, Escamas ou Placas Naturais. Se causar o dano ×2 do <em>Golpe de Abate</em>, o alvo faz JPC ou tem o Movimento reduzido à metade por 1d4 rodadas.</p>" },
      { nome: "Firmeza do Caçador", level: 6, desc: "<p><strong>Resistência:</strong> Teste Fácil em JP contra Medo, incluindo auras aterrorizantes. <strong>Letalidade:</strong> acertos críticos contra criaturas identificadas usam Dano Aumentado (o dado de dano sobe duas categorias antes de ser dobrado; ex.: d6 vira d10).</p>" },
      { nome: "Caçada Implacável", level: 10, desc: "<p><strong>Imunidade:</strong> torna-se totalmente imune a Medo e Auras Aterrorizantes. <strong>Maestria Crítica:</strong> acertos críticos contra criaturas identificadas passam a causar dano ×3 (role o dano três vezes e some os bônus).</p>" },
      { nome: "Reputação", level: 11, desc: "<p>Obtém Reputação 1 em 1d6, evoluindo +1 até o máximo de 1–5 em 1d6 no 15º nível.</p>" },
    ],
  },
];
