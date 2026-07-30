// Bestiário próprio do cenário Ekhoria — dados para tools/lib-actors.mjs (monsterDoc).
//
// FONTE: C:\Users\...\Documents\Ekhoria\EKHORIA\Compendio\Sistema\Bestiario\*.md
// (blocos ```od2-monstro``` / ```ekhoria_bestiario``` + bullets de habilidades).
//
// FIDELIDADE: nenhum DV, CA, JP, Moral, XP, dano ou habilidade foi inventado.
// Campo que a fonte não fornece é OMITIDO (o builder trata a ausência).
//
// NOTAS DE TRANSCRIÇÃO (o que mudou de forma, nunca de conteúdo):
//  • Movimento: a fonte usa a notação OD2 "12/24Vo" (metros implícitos, E=escavando,
//    Vo/V=voando). O DataModel só guarda um deslocamento por campo, então `movimento`
//    recebe o deslocamento BASE em metros e a linha completa da fonte é repetida em
//    `descricao` como "Movimento (fonte)".
//  • PV: onde a fonte declara PV explícitos (os 4 Silentes, Rorik e os 10 adversários
//    humanos), o número vai no campo `pv`, que tem precedência sobre o valor derivado
//    do DV. Nas demais criaturas a fonte não dá PV e o campo fica ausente (fallback).
//  • `tipo` guarda o texto de tipo exato da fonte; `conceito` é o enum do sistema OD2
//    (Humanoide, Besta, Morto-Vivo, …) escolhido para arte/filtro.
//  • Verme Escarlate: a fonte diz tamanho "Enorme", que não existe no enum do OD2 —
//    mapeado para "imenso" (o mais próximo acima de "grande").
//  • Habilidades que uma variante herda da ficha-base (ex.: "Carne Errada" nas
//    Abominações regionais, "Indiferença Encarnada" nas Atenções) foram repetidas com
//    a descrição da própria base, no mesmo arquivo-fonte.

export const grupos = [
  // ───────────────────────────────────────────────────────────────────────────
  {
    folder: "O Breu — Breônia",
    monstros: [
      {
        nome: "Umbra Pávida",
        tipo: "Morto-vivo",
        conceito: "Morto-Vivo",
        tamanho: "medio",
        alinhamento: "caotico",
        movimento: "12 m",
        dv: "3",
        ca: "15",
        jp: "5",
        moral: 10,
        xp: 155,
        encontro: "1d6",
        encontroCovil: "2d4",
        habitat: "Breônia — o escuro do Breu",
        descricao:
          "<p>Quando alguém fica exposto ao <strong>Breu</strong> tempo demais, seus próprios medos podem se descolar e ganhar forma. A Umbra Pávida é isso: uma sombra fiada do terror de uma pessoa específica, condenada a caçar exatamente quem a gerou. Vêm em bandos quando uma vila inteira adormece no escuro — e é por elas que a <strong>Pira</strong> do Guardião nunca pode apagar.</p>",
        ataques: [{ nome: "Garra gélida", qtd: 1, bonus: 3, dano: "1d6" }],
        habilidades: [
          {
            nome: "Nascida do Medo",
            desc: "só existe na escuridão. Nas sombras, esconde-se (1-4 em 1d6) e ataca na surpresa. Sob luz plena fica visível e age com <strong>Ajuste Difícil</strong>.",
          },
          {
            nome: "Toque do Pavor",
            desc: "quem sofre dano faz <strong>JPS</strong> ou fica <strong>abalado</strong> por 1d4 rodadas; se já estava abalado, foge apavorado.",
          },
          {
            nome: "Caça o Gerador",
            desc: "<strong>+2</strong> para acertar a criatura de cujos medos nasceu, e a prioriza sobre qualquer outro alvo.",
          },
          {
            nome: "Desfeita pela Luz",
            desc: "dano de fogo ou de luz mágica a fere em cheio; um facho de <em>Luz</em> ou a Pira do Guardião a dissipa em 1 rodada.",
          },
        ],
      },
      {
        nome: "O Esquecido",
        tipo: "Morto-vivo",
        conceito: "Morto-Vivo",
        tamanho: "medio",
        alinhamento: "neutro",
        movimento: "9 m",
        dv: "5",
        ca: "14",
        jp: "6",
        moral: 12,
        xp: 295,
        encontro: "1d6",
        encontroCovil: "2d4",
        habitat: "Breônia — o escuro do Breu",
        descricao:
          "<p>Foi uma pessoa. Ficou tempo demais no escuro de Breônia e o Breu não a matou — fez pior: apagou-a da memória do mundo, como uma nota que some de uma canção. O que restou caminha entre os vivos procurando ser lembrado, e leva consigo quem toca. Não há maldade nele, só uma fome silenciosa por existir de novo — por isso os breônios acendem velas para os nomes, e o <strong>Guardião da Pira</strong> reza para que nenhum fogo se apague antes da hora.</p>",
        ataques: [{ nome: "Toque do esquecimento", qtd: 1, bonus: 5, dano: "1d6" }],
        habilidades: [
          {
            nome: "Apagado do Mundo",
            desc: "ninguém recorda de tê-lo visto. Age sempre na surpresa na primeira rodada e não pode ser rastreado por meios comuns.",
          },
          {
            nome: "Toque do Esquecimento",
            desc: "ao acertar, o alvo faz <strong>JPS</strong>; na falha, até o fim da cena os aliados o tratam como se não estivesse ali — não podem curá-lo, socorrê-lo nem incluí-lo em ações coordenadas. Um aliado pode gastar a ação para \"reconhecê-lo\" (nova JPS; sucesso o traz de volta).",
          },
          {
            nome: "Filho do Breu",
            desc: "enxerga no escuro total. Sob <strong>luz forte</strong> (sol, a Pira, <em>Luz</em>) fica <strong>abalado</strong> e não pode usar o Toque do Esquecimento.",
          },
          {
            nome: "Corpo Esquecido",
            desc: "imune a Medo, encanto e demais efeitos mentais; vulnerável a magia divina, como todo morto-vivo do cenário.",
          },
        ],
      },
      {
        nome: "Abominação do Breu",
        flavor: "Breônia — o que a escuridão faminta deixa para trás.",
        tipo: "Monstro",
        conceito: "Humanoide Monstruoso",
        tamanho: "medio",
        alinhamento: "caotico",
        movimento: "9 m",
        dv: "5",
        ca: "14",
        jp: "6",
        moral: 9,
        xp: 295,
        encontro: "1d6",
        encontroCovil: "2d4",
        variante: true,
        habitat: "Breônia",
        descricao:
          "<p>Variante regional da <strong>Abominação</strong>: um ser vivo que passou tempo demais sob a fome do Breu e cuja carne cedeu ao que a deforma.</p>",
        ataques: [{ nome: "Garras de Sombra", qtd: 2, bonus: 5, dano: "1d6" }],
        habilidades: [
          {
            nome: "Carne Errada",
            desc: "não sente dor; imune a Medo, encanto e demais efeitos mentais (a mente que tinha já se foi). Não pode ser desmoralizada por meios comuns — só recua diante de dano que a fira de verdade.",
          },
          {
            nome: "Presença Antinatural",
            desc: "humanoides a até 9 m que a avistem devem passar numa <strong>JPS</strong> ou ficam <strong>abalados</strong> (Ajuste Difícil em testes e ataques) por 1d4 rodadas.",
          },
          {
            nome: "Devorar Lembrança",
            desc: "ao acertar com as duas Garras na mesma rodada, força uma <strong>JPS</strong>; na falha, a vítima esquece os últimos minutos e fica confusa por 1 rodada (a Abominação se alimenta do que arranca).",
          },
          {
            nome: "Filha do Breu",
            desc: "enxerga no escuro total e some nas sombras (1-4 em 1d6 para se esconder na penumbra). Sob <strong>luz forte</strong> (sol, a Pira do Guardião, <em>Luz</em>), perde Devorar Lembrança e ataca com <strong>Ajuste Difícil</strong>. Caça humanoides por preferência.",
          },
        ],
      },
      {
        nome: "O Cristalizado",
        tipo: "Monstro",
        conceito: "Humanoide Monstruoso",
        tamanho: "medio",
        alinhamento: "neutro",
        movimento: "6 m",
        dv: "6",
        ca: "17",
        jp: "6",
        moral: 12,
        xp: 375,
        encontro: "1",
        encontroCovil: "1d4",
        habitat: "Breônia",
        descricao:
          "<p>Um dos destinos de quem se demora no <strong>Breu</strong>: a pele escurece, esfria e endurece em cristal negro, as veias viram fissuras de ônix e a pessoa lentamente para de ser pessoa. O Cristalizado ainda anda, ainda golpeia — mas o que quer que houvesse dentro já se calou. É lento, e é a única misericórdia que oferece. Contrabandistas de Breônia caçam os que \"amadureceram\": as lascas de um Cristalizado são ônix bruto, e ônix vale mais que ouro ali.</p>",
        ataques: [{ nome: "Golpe cristalino", qtd: 1, bonus: 6, dano: "1d10" }],
        habilidades: [
          {
            nome: "Pele de Ônix",
            desc: "reduz em <strong>3</strong> todo dano de armas cortantes e perfurantes. Armas de concussão (maças, martelos, quedas) causam <strong>dano dobrado</strong> — o cristal é duro, mas quebradiço.",
          },
          {
            nome: "Estilhaço de Ônix",
            desc: "ao ser destruído, explode. Criaturas a até 1,5 m fazem <strong>JPD</strong> ou sofrem <strong>2d6</strong> de corte por lascas. As lascas são ônix aproveitável (gancho de recompensa e de dilema moral).",
          },
          {
            nome: "Silêncio Mineral",
            desc: "imune a Medo, encanto, efeitos mentais e veneno; a mente que tinha já se foi.",
          },
        ],
      },
      {
        nome: "Fauce do Breu",
        tipo: "Monstro",
        conceito: "Besta",
        tamanho: "grande",
        alinhamento: "caotico",
        movimento: "9 m",
        dv: "11",
        ca: "18",
        jp: "8",
        moral: 12,
        xp: 1900,
        encontro: "1",
        encontroCovil: "1",
        habitat: "Breônia — onde a escuridão fica espessa",
        descricao:
          "<p>Não é uma criatura — é o <strong>Breu</strong> concentrado, um lugar onde a escuridão de Breônia ficou espessa o bastante para ter vontade e boca. Onde uma Fauce se forma, aldeias somem dos mapas e dos registros ao mesmo tempo. Foi o que o Barão Abelard de Ônix realmente acordou, e é a prova mais crua de que a contenção que sustenta o mundo está cedendo. Poucos sobreviveram para descrevê-la; menos ainda foram lembrados por terem tentado.</p>\n<p><em>Nota de mesa.</em> Chefe de fim de arco em Breônia — o combate é uma corrida contra a luz. Quando a última tocha morre, a mesa entende que o verdadeiro recurso da luta era o ônix gasto no caminho. Ligue-a diretamente ao segredo da contenção e ao que a Tropa Sem Fim segura.</p>",
        ataques: [
          { nome: "Tentáculos de sombra", qtd: 2, bonus: 11, dano: "1d10" },
          { nome: "Bocado de escuridão", qtd: 1, bonus: 11, dano: "2d6" },
        ],
        habilidades: [
          {
            nome: "Extinção da Luz",
            desc: "apaga toda fonte de luz não-mágica em 12 m. Luz mágica exige <strong>JP do conjurador</strong> a cada rodada para não se apagar. Um fragmento de ônix ativo resiste enquanto dura.",
          },
          {
            nome: "Devorar o Nome",
            desc: "um alvo agarrado pelo Bocado por uma rodada inteira faz <strong>JPS</strong>; na falha, começa a ser apagado — perde <strong>1 ponto de atributo por rodada</strong> (permanente até restauração poderosa). Uma vítima consumida por completo levanta como O Esquecido.",
          },
          {
            nome: "Filha da Contenção que Falha",
            desc: "imune a frio, escuridão, Medo e efeitos mentais. Sob <strong>luz solar direta</strong> ou junto a ônix ativo, age com <strong>Ajuste Difícil</strong> e não pode usar Devorar o Nome.",
          },
          {
            nome: "Regeneração das Sombras",
            desc: "regenera <strong>2d6 PV por rodada</strong> enquanto estiver em escuridão total; à luz, não regenera.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    folder: "As Areias Esquecidas",
    monstros: [
      {
        nome: "Abominação das Areias",
        flavor: "As Areias Esquecidas — a coisa enterrada que espera o calor passar.",
        tipo: "Monstro",
        conceito: "Humanoide Monstruoso",
        tamanho: "medio",
        alinhamento: "caotico",
        movimento: "9/9E",
        dv: "5",
        ca: "14",
        jp: "5",
        moral: 9,
        xp: 295,
        encontro: "1d6",
        encontroCovil: "2d4",
        variante: true,
        habitat: "As Areias Esquecidas",
        descricao:
          "<p>Variante regional da <strong>Abominação</strong>, moldada pela anomalia enterrada sob as Areias.</p>\n<p><strong>Movimento (fonte):</strong> 9/9E — 9 m, 9 m escavando.</p>",
        ataques: [{ nome: "Presas Retráteis", qtd: 1, bonus: 5, dano: "2d6" }],
        habilidades: [
          {
            nome: "Carne Errada",
            desc: "não sente dor; imune a Medo, encanto e demais efeitos mentais (a mente que tinha já se foi). Não pode ser desmoralizada por meios comuns — só recua diante de dano que a fira de verdade.",
          },
          {
            nome: "Presença Antinatural",
            desc: "humanoides a até 9 m que a avistem devem passar numa <strong>JPS</strong> ou ficam <strong>abalados</strong> (Ajuste Difícil em testes e ataques) por 1d4 rodadas.",
          },
          {
            nome: "Emboscada Soterrada",
            desc: "escava e se enterra na areia (movimento de escavação 9 m). Ao atacar surgindo do solo contra um alvo desprevenido, o ataque é <strong>Muito Fácil</strong> e causa <strong>dano dobrado</strong>.",
          },
          {
            nome: "Ressecamento",
            desc: "quem é mordido deve passar numa <strong>JPC</strong> ou perde 1 ponto de Constituição temporário (recupera com descanso e água); a Abominação se cura do mesmo tanto em PV.",
          },
        ],
      },
      {
        nome: "Couraçado das Areias",
        tipo: "Besta",
        conceito: "Besta",
        tamanho: "grande",
        alinhamento: "neutro",
        movimento: "12/15E",
        dv: "8",
        ca: "18",
        jp: "6",
        moral: 10,
        xp: 830,
        encontro: "1",
        encontroCovil: "1d4",
        tesouroCovil: "D",
        habitat: "As Areias Esquecidas",
        descricao:
          "<p>A besta blindada das <strong>Areias Esquecidas</strong> — parece lenta até o instante em que não é. Passa o calor do dia enterrada, sentindo o chão, e irrompe quando algo grande o bastante pisa perto demais. Os Marcados da <strong>Escola do Couraçado</strong> estudaram justamente essa contradição: um corpo que parece pesado e some quando decide não ser encontrado.</p>\n<p><strong>Movimento (fonte):</strong> 12/15E — 12 m, 15 m escavando.</p>",
        ataques: [
          { nome: "Mordida", qtd: 1, bonus: 8, dano: "2d8" },
          { nome: "Garras", qtd: 2, bonus: 8, dano: "1d8" },
        ],
        habilidades: [
          {
            nome: "Couraça das Areias",
            desc: "as placas vitrificadas reduzem em <strong>4 pontos</strong> todo dano físico de fontes não-mágicas (mínimo 1).",
          },
          {
            nome: "Sentir Vibração",
            desc: "percebe qualquer criatura em contato com o solo a até 18 m; quase nunca é surpreendido e não depende de visão para caçar.",
          },
          {
            nome: "Bote Súbito",
            desc: "escava a 15 m e irrompe do solo. No turno em que emerge, ataca um alvo desprevenido como Ataque <strong>Muito Fácil</strong> e com <strong>dano dobrado</strong> na Mordida; com um salto, pode atravessar até 6 m para alcançar a presa.",
          },
          {
            nome: "Ponto Cego",
            desc: "a junta sob a carapaça é a única parte mole. Quem identificar a fraqueza (a <em>Anatomia das Feras</em> do Voraz, o <em>Olho de Engenheiro</em> do Sabotador, ou um acerto descritivo) ignora a Couraça das Areias naquele golpe.",
          },
        ],
      },
      {
        nome: "Verme Escarlate",
        tipo: "Besta",
        conceito: "Besta",
        tamanho: "imenso",
        alinhamento: "neutro",
        movimento: "6/9E",
        dv: "12",
        ca: "17",
        jp: "5",
        moral: 9,
        xp: 2175,
        encontro: "1",
        encontroCovil: "1",
        tesouroCovil: "F",
        habitat: "Mar de Vidro — Areias Esquecidas",
        descricao:
          "<p>A ameaça-assinatura do <strong>Mar de Vidro</strong>, nas Areias Esquecidas. De 15 a 25 metros, desliza sob a areia silicosa guiado pela vibração, e a primeira coisa que uma caravana sabe da sua presença é o chão se abrindo. É dele que a <strong>Escola do Verme Escarlate</strong> tira seu nome — o golpe que parte da terra e termina antes de a presa entender que começou.</p>\n<p><strong>Movimento (fonte):</strong> 6/9E — 6 m, 9 m escavando.</p>\n<p><strong>Tamanho (fonte):</strong> Enorme (transcrito como \"imenso\", o degrau equivalente no OD2).</p>\n<p><em>Versão do cenário; para a genérica do SRD (Grande, DV 8), ver o Compêndio OD2.</em></p>",
        ataques: [{ nome: "Mordida", qtd: 1, bonus: 12, dano: "3d6" }],
        habilidades: [
          {
            nome: "Senso sísmico 30m",
            desc: "percebe qualquer criatura em contato com o solo num raio de 30 m, mesmo enterrado ou no escuro; é praticamente impossível surpreendê-lo nas areias.",
          },
          {
            nome: "Bote da Areia",
            desc: "se atacar no mesmo turno em que emerge do solo, a Mordida é um <strong>Ataque Fácil (+2)</strong> e causa dano dobrado.",
          },
          {
            nome: "Engolir",
            desc: "num acerto crítico de Mordida (ou contra alvo Médio ou menor já agarrado), o alvo é engolido — sofre <strong>2d6</strong> de dano ácido por rodada e só escapa cortando de dentro (15 PV de dano interno).",
          },
        ],
      },
      {
        nome: "Tarrasque das Areias",
        tipo: "Monstro (Lendário)",
        conceito: "Besta",
        tamanho: "colossal",
        alinhamento: "caotico",
        movimento: "12/12E",
        dv: "18",
        ca: "20",
        jp: "10",
        moral: 12,
        xp: 4500,
        encontro: "1",
        encontroCovil: "1",
        habitat: "As Areias Esquecidas",
        descricao:
          "<p>Não é um animal nem uma fera grande: é o que acontece quando um dos <strong>fragmentos sem forma</strong> da Fragmentação aflora sob as <strong>Areias Esquecidas</strong> e veste areia, osso e vidro como corpo. Some por décadas e ressurge sem aviso — um sinal, dizem os Mantes, de que os sistemas de contenção do mundo estão cedendo. Quando emerge, clãs inteiros se mudam, e a Irmandade Voraz a trata não como caça, mas como catástrofe a ser sobrevivida. Matá-la talvez seja impossível; o que se aprende é a fazê-la <em>afundar de novo</em>.</p>\n<p><strong>Movimento (fonte):</strong> 12/12E — 12 m, 12 m escavando.</p>",
        ataques: [
          { nome: "Mordida", qtd: 1, bonus: 18, dano: "4d8" },
          { nome: "Garras", qtd: 2, bonus: 18, dano: "2d8" },
          { nome: "Cauda", qtd: 1, bonus: 18, dano: "3d8" },
        ],
        habilidades: [
          {
            nome: "Manifestação Sem Forma",
            desc: "não tem mente que se enfeitice nem alma que se drene — imune a Medo, encanto, sono, paralisia, veneno e a todos os efeitos mentais e de morte instantânea.",
          },
          {
            nome: "Couraça Vitrificada",
            desc: "a areia fundida que a recobre reduz em <strong>5 pontos</strong> todo dano físico de fontes não-mágicas (mínimo 1).",
          },
          {
            nome: "Carapaça Reflexiva",
            desc: "quando uma magia que exige Jogada de Proteção falha contra ela (ela passa na JP), o efeito <strong>ricocheteia para o conjurador</strong>, que faz a própria JP contra a própria magia.",
          },
          {
            nome: "Emergir das Areias",
            desc: "escava a 12 m e irrompe do solo. No turno em que emerge, todas as criaturas em pé num raio de 9 m fazem <strong>JPD</strong> ou são <strong>derrubadas</strong>; um alvo desprevenido por baixo sofre a Mordida como ataque <strong>Muito Fácil</strong> e com <strong>dano dobrado</strong>.",
          },
          {
            nome: "Engolir",
            desc: "num acerto de Mordida contra alvo de tamanho <strong>Grande ou menor</strong>, se a margem for de 5+, o alvo é engolido — sofre <strong>2d6 por rodada</strong> e age com Ajuste Difícil até escapar (abrir caminho por dentro exige causar 30 pontos de dano à parede estomacal).",
          },
          {
            nome: "Indomável",
            desc: "regenera <strong>2d6 PV por rodada</strong>. Reduzida a 0 PV, <strong>afunda nas Areias</strong> e se desfaz em vez de morrer — volta a se manifestar tempos depois, a menos que seja contida por meios que tratem a <em>causa</em>, não o corpo (selamento arcano, um fragmento de <strong>Erebo</strong>, ou o que quer que o Mestre decida que ancora um fragmento sem forma).",
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    folder: "A Pressão Arcana — Arkádia",
    monstros: [
      {
        nome: "Abominação Arcana",
        flavor: "Arkádia — a carne que a pressão arcana não devia ter moldado.",
        tipo: "Monstro",
        conceito: "Humanoide Monstruoso",
        tamanho: "medio",
        alinhamento: "caotico",
        movimento: "9 m",
        dv: "6",
        ca: "14",
        jp: "6",
        moral: 9,
        xp: 410,
        encontro: "1",
        encontroCovil: "1d4",
        variante: true,
        habitat: "Arkádia",
        descricao:
          "<p>Variante regional da <strong>Abominação</strong>. Magos a reconhecem como uma cobaia da Ars Vocalis que escapou, ou um visitante que ficou tempo demais sob a Pressão Arcana.</p>",
        ataques: [{ nome: "Tentáculo Cristalino", qtd: 2, bonus: 6, dano: "1d6" }],
        habilidades: [
          {
            nome: "Carne Errada",
            desc: "não sente dor; imune a Medo, encanto e demais efeitos mentais (a mente que tinha já se foi). Não pode ser desmoralizada por meios comuns — só recua diante de dano que a fira de verdade.",
          },
          {
            nome: "Presença Antinatural",
            desc: "humanoides a até 9 m que a avistem devem passar numa <strong>JPS</strong> ou ficam <strong>abalados</strong> (Ajuste Difícil em testes e ataques) por 1d4 rodadas.",
          },
          {
            nome: "Descarga de Quintessência",
            desc: "1×/1d4 rodadas, libera uma rajada num cone de 6 m: <strong>2d6 de dano</strong> de um elemento aleatório (role 1d4 — Fogo/Frio/Eletricidade/Ácido); JPD reduz à metade.",
          },
          {
            nome: "Carne Instável",
            desc: "no início de cada rodada, role 1d4 — a Abominação ganha resistência (metade do dano) ao elemento correspondente até a próxima rodada.",
          },
        ],
      },
      {
        nome: "Construto de Arcanita",
        tipo: "Construto",
        conceito: "Constructo",
        tamanho: "medio",
        alinhamento: "neutro",
        movimento: "9 m",
        dv: "6",
        ca: "17",
        jp: "6",
        moral: 12,
        xp: 410,
        encontro: "1",
        encontroCovil: "1d4",
        tesouroCovil: "I",
        habitat: "Arkádia",
        descricao:
          "<p>Autômato de Arcanita trabalhada, manufaturado pela <strong>Ars Vocalis</strong> de Arkádia — há cerca de 1.200 deles a serviço da magocracia, como guardiões, operários e braços armados dos Buscadores. Não é vivo no sentido dos Arkanim: é cristal moldado e animado por Quintessência selada num núcleo. Obedece a ordens, não a vontade própria — e por isso o <strong>Vociferante de Arcanita</strong> pode arrancá-lo do controle alheio com a voz, enquanto o <strong>Sabotador da Cratera</strong> aprendeu exatamente onde a carga precisa ir.</p>",
        ataques: [{ nome: "Golpe de Cristal", qtd: 2, bonus: 6, dano: "1d8" }],
        habilidades: [
          {
            nome: "Natureza de Construto",
            desc: "imune a sono, encanto, medo, veneno, sangramento e a todos os efeitos mentais; não respira, não se cansa e nunca recua por Moral (testa Moral apenas se a ordem que o anima for desfeita).",
          },
          {
            nome: "Comando por Tom (Arkanes)",
            desc: "responde a comandos em Arkanes. Um conjurador que fale a língua pode tentar redirecioná-lo — o Construto faz um <strong>Teste de Moral</strong> (2d6 + nível do conjurador vs. Moral) ou passa a obedecê-lo. É assim que o Vociferante o comanda, o \"Erguer\" o domina por completo e o \"Estilhaçar\" o desfaz.",
          },
          {
            nome: "Núcleo de Arcanita",
            desc: "carrega no peito o núcleo de Quintessência. Ataques certeiros contra o núcleo (ou a habilidade <strong>Olho de Engenheiro/Sabotagem</strong> do Sabotador) causam <strong>dano dobrado e ignoram metade da CA</strong>. Ao ser destruído, o Construto <strong>estilhaça</strong>: criaturas a até 1,5 m sofrem <strong>2d6 de dano cortante</strong> (JPD reduz à metade).",
          },
          {
            nome: "Sintonia Elemental",
            desc: "muitos são sintonizados a um elemento (Fogo, Frio, Eletricidade ou Ácido). Quando o são, o Golpe de Cristal causa <strong>+1d6</strong> de dano daquele tipo.",
          },
        ],
      },
      {
        nome: "Coro Vazio",
        tipo: "Monstro",
        conceito: "Besta",
        tamanho: "medio",
        alinhamento: "neutro",
        movimento: "9/12Vo",
        dv: "6",
        ca: "16",
        jp: "6",
        moral: 12,
        xp: 410,
        encontro: "1",
        encontroCovil: "1d4",
        habitat: "Arkádia — zonas de alta Pressão Arcana",
        descricao:
          "<p>Onde a <strong>Pressão Arcana</strong> de Arkádia fica densa demais, às vezes o som de vozes que já não existem se acumula até quase virar gente. O Coro Vazio é isso: uma ressonância que aprendeu a repetir palavras sem nunca ter tido boca. A <strong>Ars Vocalis</strong> os estuda com um interesse que os arcanistas chamam de \"científico\" e os vizinhos chamam de doentio — afinal, o que é a magocracia senão a fé de que a voz certa comanda o mundo?</p>\n<p><strong>Movimento (fonte):</strong> 9/12Vo — 9 m, 12 m voando.</p>",
        ataques: [{ nome: "Palavra dissonante", qtd: 1, bonus: 6, dano: "1d8" }],
        habilidades: [
          {
            nome: "Ressonância",
            desc: "quem ouve a Palavra faz <strong>JPC</strong> ou age com <strong>Ajuste Difícil</strong> em todas as jogadas por 1 rodada — o som se instala na cabeça.",
          },
          {
            nome: "Corpo de Som",
            desc: "só um borrão de eco e luz. Armas cortantes e perfurantes causam <strong>metade do dano</strong>; concussão, magia e dano sônico o ferem em cheio.",
          },
          {
            nome: "Preso à Pressão",
            desc: "não pode deixar a zona de alta Pressão Arcana que o gerou. Fora dela, dissipa-se em 1d4 rodadas.",
          },
          {
            nome: "Eco de Arkanes",
            desc: "repete fragmentos de <strong>Arkanes</strong> que ouviu. Um conjurador que fale a língua pode tentar aquietá-lo com um <strong>Teste de Moral</strong> (2d6 + nível vs. Moral) — é assim que os Buscadores da Ars Vocalis o coletam vivo.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    folder: "A Fenda Abissal — Durgrann / Cinthara",
    monstros: [
      {
        nome: "Fera-Abissal",
        tipo: "Monstro",
        conceito: "Besta",
        tamanho: "grande",
        alinhamento: "caotico",
        movimento: "9/6E",
        dv: "8+3",
        ca: "16",
        jp: "6",
        moral: 10,
        xp: 785,
        encontro: "1",
        encontroCovil: "1d4",
        habitat: "Cinthara (Durgrann) — proximidades da Fenda Abissal",
        descricao:
          "<p>Organismo deformado pela proximidade da <strong>Fenda Abissal</strong>, nas profundezas de Cinthara (Durgrann). Não é uma espécie: é o que a pressão dimensional faz com a carne que vive perto demais do rasgo. O <strong>Punhal Tenebroso</strong> já capturou alguns para extrair seus fluidos — é desse sangue que o Marcado da <strong>Escola da Fera-Abissal</strong> deriva sua habilidade homônima.</p>\n<p><strong>Movimento (fonte):</strong> 9/6E — 9 m, 6 m escavando.</p>",
        ataques: [
          { nome: "Garras", qtd: 2, bonus: 8, dano: "1d8" },
          { nome: "Dentadura", qtd: 1, bonus: 8, dano: "2d6" },
        ],
        habilidades: [
          {
            nome: "Sangue Corrosivo",
            desc: "quem a fere em corpo a corpo (ou a morde) sofre <strong>1d6 de dano ácido</strong> imediato.",
          },
          {
            nome: "Vigor Abissal",
            desc: "não sente dor nem medo, e só pode ser desmoralizada por dano mágico. Enquanto estiver a até 30 m da Fenda, cura <strong>1 PV por rodada</strong>.",
          },
          {
            nome: "Presença Dissonante",
            desc: "humanoides a até 9 m que a avistem devem passar numa <strong>JPS</strong> ou ficam <strong>abalados</strong> (Ajuste Difícil em testes e ataques) por 1d4 rodadas — o mesmo pavor que faz quem chega perto da Fenda enlouquecer.",
          },
        ],
      },
      {
        nome: "Caldreth, a Guardiã da Fenda",
        tipo: "Dragão (Lendário)",
        conceito: "Dragão",
        tamanho: "colossal",
        alinhamento: "ordeiro",
        movimento: "12/24Vo",
        dv: "22",
        ca: "22",
        jp: "11",
        moral: 12,
        xp: 5825,
        encontro: "1",
        encontroCovil: "1",
        tesouroCovil: "M",
        habitat: "Cinthara (Durgrann) — sobre a Fenda Abissal",
        descricao:
          "<p>Caldreth não guarda a <strong>Fenda Abissal</strong> de Cinthara — Caldreth <em>é</em> o que a mantém fechada. Um dos fragmentos da Ordem que sobraram da Fragmentação, encarnado em forma de dragão, enroscado sobre o rasgo há mais tempo do que Durgrann existe. Os anões sabem que ela está lá; é o segredo que o Conselho de Clãs mais protege, porque a verdade é simples e intolerável: se Caldreth se for, a Fenda abre. Ela não é um inimigo a ser abatido — é uma condição do mundo continuar inteiro. Lutar contra ela quase nunca é o objetivo; convencê-la, entendê-la, ou impedir que algo a faça partir, sim.</p>\n<p><strong>Movimento (fonte):</strong> 12/24Vo — 12 m, 24 m voando.</p>\n<p><em>Nota de mesa.</em> Caldreth é uma entidade de fim de campanha, não um encontro de combate comum. Use as estatísticas para uma confrontação verdadeiramente catastrófica — mas lembre que <em>vencê-la</em> pode ser o pior resultado possível para todos.</p>",
        ataques: [
          { nome: "Mordida", qtd: 1, bonus: 22, dano: "4d10" },
          { nome: "Garras", qtd: 2, bonus: 22, dano: "2d10" },
          { nome: "Cauda", qtd: 1, bonus: 22, dano: "3d10" },
        ],
        habilidades: [
          {
            nome: "Fragmento de Ordem",
            desc: "imune a Medo, encanto, sono, paralisia, veneno e a efeitos mentais ou de morte instantânea. Magia caótica é reduzida à metade contra ela.",
          },
          {
            nome: "Sopro de Selamento",
            desc: "em vez de fogo, exala um cone de luz cristalina de pura Ordem (30 m). Causa <strong>12d8 de dano</strong> (JPD reduz à metade); criaturas <strong>Caóticas</strong> sofrem o dobro e, na falha, ficam <strong>ancoradas</strong> (paralisadas) por 1d4 rodadas.",
          },
          {
            nome: "Vínculo da Fenda",
            desc: "enquanto Caldreth vive e permanece sobre o rasgo, a Fenda Abissal continua selada e a pressão dimensional, contida. Removê-la, matá-la ou atraí-la para longe <strong>abre a Fenda</strong> — consequência de escala mundial, a critério do Mestre.",
          },
          {
            nome: "Presença de Ordem",
            desc: "num raio de 30 m, criaturas Caóticas devem passar num <strong>Teste de Moral</strong> ao se aproximarem ou recuam; magia caótica conjurada na área tem 50% de chance de simplesmente falhar.",
          },
          {
            nome: "Couraça Primordial",
            desc: "reduz em <strong>8 pontos</strong> todo dano de fontes não-mágicas (mínimo 1) e regenera <strong>3d6 PV por rodada</strong> enquanto estiver sobre a Fenda.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    folder: "O Codex Mortis — necromancia e a Tropa Sem Fim",
    monstros: [
      {
        nome: "Silente Ancorado - Tropa sem Fim",
        flavor: "Veterano ancorado da Tropa Sem Fim. Luta em formação, nunca recua. BA +3.",
        tipo: "Silente ancorado",
        conceito: "Morto-Vivo",
        alinhamento: "ordeiro",
        movimento: "9 m",
        dv: "3",
        ca: "17",
        jp: "6",
        moral: 12,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouro: "Q",
        tesouroCovil: "C",
        pv: 22,
        xp: "200",
        habitat: "Breônia — postos da Tropa Sem Fim",
        descricao:
          "<p>Veteranos mortos-vivos da <strong>Tropa Sem Fim</strong>, ancorados ao posto que juraram guardar em vida. Surgem em formação, nunca sozinhos, e seguram a linha até serem destruídos. Não são fortes por serem monstros — são fortes por serem <strong>soldados disciplinados que a morte não dispensou</strong>.</p>\n<p><em>Nota de mesa — como funciona o medo (e a esperança).</em> A Tropa Sem Fim foi feita para você <em>não querer</em> enfrentá-la: não cansam, não fogem, não sentem dor, e a magia arcana escorrega por eles. Encarar um pelotão em formação aberta é suicídio, e existem <strong>1.847 deles</strong>. Mas não são invencíveis: são <strong>destruídos de vez</strong> (nenhuma cura ou ressurreição os reergue), a <strong>magia divina</strong> os fere em cheio, e a <strong>Disciplina Inquebrável</strong> depende da formação — quebrar a linha, isolar um soldado ou derrubar o Sargento transforma uma muralha impossível num punhado de inimigos que dá, sim, para vencer.</p>\n<p>Comandados pelo Capitão Rorik Sem-Descanso.</p>",
        ataques: [{ nome: "Lança longa", qtd: 1, bonus: 5, dano: "1d8+2" }],
        habilidades: [
          {
            nome: "Silêncio Arcano",
            desc: "imune a magias diretas arcanas; vulnerável a magias divinas (dano divino o fere normalmente; Afastar/Destruir Mortos-Vivos funciona).",
          },
          {
            nome: "Corpo Estático",
            desc: "sem cura natural, arcana ou alquímica. Reduzido a 0 PV, é destruído em definitivo — não pode ser reanimado nem ressuscitado.",
          },
          {
            nome: "Disciplina Inquebrável",
            desc: "nunca testa Moral para fugir; luta até ser destruído. Com 3+ Ancorados lado a lado em formação, todos ganham +2 na CA (muralha) e não podem ser flanqueados; quem ataca um deles sofre um ataque de oportunidade de outro Silente adjacente. Isolado ou com a formação quebrada, perde estes bônus.",
          },
          {
            nome: "Sem Exaustão",
            desc: "não dorme, não cansa, não sente dor; imune a Medo, sono e encanto.",
          },
        ],
      },
      {
        nome: "Silente Ancorado (Arqueiro)",
        flavor: "Atirador ancorado. Cobre a linha de frente em salvas. BA +3.",
        tipo: "Silente ancorado",
        conceito: "Morto-Vivo",
        alinhamento: "ordeiro",
        movimento: "9 m",
        dv: "3",
        ca: "15",
        jp: "6",
        moral: 12,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouro: "Q",
        tesouroCovil: "C",
        pv: 18,
        xp: "200",
        variante: true,
        habitat: "Breônia — postos da Tropa Sem Fim",
        descricao:
          "<p>Atiradores ancorados à linha que cobriam em vida. Disparam em salva, atrás dos Legionários, e a salva não perde o ritmo nem quando um deles cai.</p>",
        ataques: [{ nome: "Arco longo", qtd: 1, bonus: 5, dano: "1d8+1" }],
        habilidades: [
          {
            nome: "Silêncio Arcano",
            desc: "imune a magias diretas arcanas; vulnerável a magias divinas.",
          },
          {
            nome: "Corpo Estático",
            desc: "sem cura; reduzido a 0 PV, é destruído em definitivo.",
          },
          {
            nome: "Disciplina Inquebrável",
            desc: "nunca recua; em formação (3+), os Ancorados ganham +2 CA e não podem ser flanqueados.",
          },
          {
            nome: "Saraivada Disciplinada",
            desc: "quando 3 ou mais arqueiros disparam no mesmo alvo na mesma rodada, a esquiva contra a salva é um Ajuste Difícil.",
          },
          {
            nome: "Sem Exaustão",
            desc: "imune a Medo, sono e encanto; não cansa nem sente dor.",
          },
        ],
      },
      {
        nome: "Silente Ancorado (Couraceiro)",
        flavor: "Infantaria pesada ancorada. Avança em muralha de escudos. BA +4.",
        tipo: "Silente ancorado",
        conceito: "Morto-Vivo",
        alinhamento: "ordeiro",
        movimento: "6 m",
        dv: "4",
        ca: "19",
        jp: "6",
        moral: 12,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouro: "Q",
        tesouroCovil: "B",
        pv: 30,
        xp: "350",
        variante: true,
        habitat: "Breônia — postos da Tropa Sem Fim",
        descricao:
          "<p>Infantaria pesada ancorada — couraça e escudo de ônix. Avança em muralha e nunca cede terreno; é o que segura a ponte enquanto o resto da Tropa se reorganiza.</p>",
        ataques: [{ nome: "Machado de batalha", qtd: 1, bonus: 6, dano: "1d10+1" }],
        habilidades: [
          {
            nome: "Silêncio Arcano",
            desc: "imune a magias diretas arcanas; vulnerável a magias divinas.",
          },
          {
            nome: "Corpo Estático",
            desc: "sem cura; reduzido a 0 PV, é destruído em definitivo.",
          },
          {
            nome: "Disciplina Inquebrável",
            desc: "nunca recua; em formação (3+), os Ancorados ganham +2 CA e não podem ser flanqueados.",
          },
          {
            nome: "Muralha de Escudos",
            desc: "aliados imediatamente atrás dele ganham +2 na CA contra ataques à distância e investidas.",
          },
          {
            nome: "Sem Exaustão",
            desc: "imune a Medo, sono e encanto; não cansa nem sente dor.",
          },
        ],
      },
      {
        nome: "Silente Ancorado (Sargento, nível 5)",
        flavor: "Comandante de pelotão ancorado. Sustenta a formação ao redor. BA +5.",
        tipo: "Silente ancorado",
        conceito: "Morto-Vivo",
        alinhamento: "ordeiro",
        movimento: "9 m",
        dv: "5",
        ca: "18",
        jp: "7",
        moral: 12,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouro: "Q",
        tesouroCovil: "B",
        pv: 38,
        xp: "600",
        variante: true,
        habitat: "Breônia — postos da Tropa Sem Fim",
        descricao:
          "<p>Comandantes de pelotão da Tropa Sem Fim, logo abaixo de Rorik. Lembram cada ordem que já cumpriram — e fazem os Legionários lembrarem também. Enquanto o Sargento está de pé, a formação é uma máquina; derrubá-lo é a melhor chance de quem ousa lutar.</p>",
        ataques: [{ nome: "Espada longa", qtd: 1, bonus: 7, dano: "1d8+3" }],
        habilidades: [
          {
            nome: "Silêncio Arcano",
            desc: "imune a magias diretas arcanas; vulnerável a magias divinas.",
          },
          {
            nome: "Corpo Estático",
            desc: "sem cura; reduzido a 0 PV, é destruído em definitivo.",
          },
          {
            nome: "Disciplina Inquebrável",
            desc: "nunca recua; em formação (3+), os Ancorados ganham +2 CA e não podem ser flanqueados.",
          },
          {
            nome: "Voz de Comando",
            desc: "Silentes Ancorados a até 9 m ganham +1 nos ataques e mantêm a Disciplina Inquebrável mesmo isolados. Se o Sargento é destruído, os Ancorados sob seu comando perdem o +1 e voltam a precisar da formação para os bônus de Disciplina.",
          },
          {
            nome: "Sem Exaustão",
            desc: "imune a Medo, sono e encanto; não cansa nem sente dor.",
          },
        ],
      },
      {
        nome: "Escrito-em-Carne",
        tipo: "Morto-vivo",
        conceito: "Morto-Vivo",
        tamanho: "medio",
        alinhamento: "caotico",
        movimento: "9 m",
        dv: "4",
        ca: "13",
        jp: "5",
        moral: 12,
        xp: 225,
        encontro: "1d6",
        encontroCovil: "2d4",
        descricao:
          "<p>Toda necromancia de Ekhoria nasce do mesmo grimório, o <strong>Codex Mortis</strong> — e o Escrito-em-Carne é sua assinatura mais crua. Não é um esqueleto reanimado por magia comum: é um corpo talhado com as runas do Códice, que reescrevem a morte enquanto a tinta brilha. É o oposto sombrio do <strong>Silente Ancorado</strong> — onde a Tropa Sem Fim serve sob acordo e disciplina, o Escrito-em-Carne é o uso <em>proibido</em>, o que faz um Inquisidor de Morthan cruzar meio continente.</p>\n<p><em>Nota de mesa.</em> O \"se reergue\" ensina a mesa a olhar além dos PV: a vitória real é apagar as runas, não zerar a vida. Um necromante mandando-os em ondas, protegido atrás, é um bom combate de dois níveis.</p>",
        ataques: [
          { nome: "Garras", qtd: 2, bonus: 4, dano: "1d4" },
          { nome: "Mordida", qtd: 1, bonus: 4, dano: "1d6" },
        ],
        habilidades: [
          {
            nome: "Runas do Códice",
            desc: "enquanto as runas na carne brilham, ao cair a 0 PV ele se reergue com <strong>1 PV</strong> no início da rodada seguinte (uma vez). <em>Dissipar Magia</em>, luz divina, ou raspar/queimar as runas impede o retorno.",
          },
          {
            nome: "Servo do Códice",
            desc: "obedece apenas a quem porta um fragmento do Codex Mortis; sem um portador por perto, ataca o vivo mais próximo. Imune a Medo, encanto, efeitos mentais e veneno.",
          },
          {
            nome: "Marca do Crime",
            desc: "onde há um Escrito-em-Carne, há um necromante criminoso por perto — e os <strong>Inquisidores de Morthan</strong> logo atrás dele. Serve tanto de ameaça quanto de pista.",
          },
          {
            nome: "Vulnerável ao Divino",
            desc: "magia divina o fere em cheio; <em>Afastar/Destruir Mortos-Vivos</em> funciona normalmente.",
          },
        ],
      },
      {
        nome: "Capitão Rorik Sem-Descanso",
        flavor: "Silente ancorado | Guerreiro — Legionário 12º nível | Alinhamento: Ordeiro",
        tipo: "Silente ancorado | Guerreiro — Legionário 12º nível",
        conceito: "Morto-Vivo",
        alinhamento: "ordeiro",
        movimento: "9 m",
        dv: "9",
        ca: "22",
        jp: "13",
        moral: 12,
        encontro: "1",
        encontroCovil: "1d4",
        tesouro: "U",
        tesouroCovil: "E",
        pv: 83,
        xp: "2400",
        habitat: "Breônia — à frente da Tropa Sem Fim",
        descricao:
          "<p>Capitão da legião silente. Não dorme, não cansa, não cede o posto — segue comandando os mortos sob suas ordens como se a batalha nunca tivesse terminado.</p>\n<p>FOR 17 / DES 14 / CON 16 / INT 13 / SAB 15 / CAR 16. BA +14 corpo a corpo. Armadura completa de ônix + escudo.</p>\n<p>Comanda o Silente Ancorado - Tropa sem Fim (×4).</p>",
        ataques: [{ nome: "Espada longa", qtd: 2, bonus: 14, dano: "1d8+9" }],
        habilidades: [
          {
            nome: "Silêncio Arcano",
            desc: "imune a magias diretas arcanas; vulnerável a magias divinas.",
          },
          {
            nome: "Corpo Estático",
            desc: "sem cura natural ou arcana. Albinus cura tudo exceto fogo e ácido.",
          },
          {
            nome: "Legionário de Elite",
            desc: "+4 de dano com espada longa, +1 CA com kit completo (já somados acima).",
          },
          {
            nome: "Aparar",
            desc: "sacrifica o escudo para absorver todo o dano de um ataque.",
          },
          { nome: "Liderança", desc: "+2 de moral para aliados em 9 metros." },
          { nome: "Sem exaustão", desc: "não dorme, não cansa, não sente dor." },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    folder: "O Ilusionismo — as sombras",
    monstros: [
      {
        nome: "Miragem Viva",
        tipo: "Monstro",
        conceito: "Besta",
        tamanho: "medio",
        alinhamento: "neutro",
        movimento: "12 m",
        dv: "4",
        ca: "15",
        jp: "5",
        moral: 12,
        xp: 225,
        encontro: "1d6",
        encontroCovil: "2d4",
        descricao:
          "<p>Algumas ilusões duram mais que quem as lançou. Uma <em>Ilusão Programada</em> que nunca foi dissipada, um <em>Terreno Ilusório</em> esquecido, um <em>Véu</em> que sobreviveu ao mago — quando ficam tempo demais, começam a acreditar em si mesmas. A Miragem Viva não tem matéria: é percepção que ganhou vontade, e fere de verdade porque <em>você acredita que ela pode</em>. Muitas guardam as comunidades que não deveriam existir no mapa — as que a <strong>Rede de Sombras dos Halflings</strong> prefere manter fora dos registros — e caem sobre quem chega perto demais.</p>\n<p><em>Nota de mesa.</em> É um enigma disfarçado de monstro: o grupo que insiste na força alimenta a criatura; o que percebe a farsa a apaga. Recompensa o jogador esperto e pune o instinto de sacar a espada — bem no espírito do ilusionismo de Ekhoria.</p>",
        ataques: [{ nome: "Toque aterrador", qtd: 1, bonus: 4, dano: "1d8" }],
        habilidades: [
          {
            nome: "Só Fere Quem Crê",
            desc: "o dano só afeta quem a toma por real. Uma criatura pode gastar a ação para se convencer de que é ilusão (<strong>JPS</strong>); no sucesso, fica imune ao dano dela até o fim da cena e pode atravessá-la. Na falha, sofre normalmente.",
          },
          {
            nome: "Sem Corpo Verdadeiro",
            desc: "armas físicas a atravessam sem efeito. Só magia, <em>Dissipar Magia</em>, ou o dano de quem já a \"revelou\" a ferem.",
          },
          {
            nome: "Alimenta-se da Crença",
            desc: "cada vez que uma criatura falha em descrer dela, a Miragem recupera <strong>1d6 PV</strong> e fica mais nítida (<strong>+1</strong> de ataque, cumulativo na cena).",
          },
          {
            nome: "Órfã de um Feitiço",
            desc: "está presa ao lugar ou objeto que a ancora (o ponto onde o feitiço original foi lançado). Destruir esse elo a desfaz de vez — muitas vezes mais fácil que \"derrotá-la\".",
          },
        ],
      },
      {
        nome: "O Sem-Rosto",
        tipo: "Monstro",
        conceito: "Humanoide Monstruoso",
        tamanho: "medio",
        alinhamento: "caotico",
        movimento: "9 m",
        dv: "5",
        ca: "14",
        jp: "6",
        moral: 9,
        xp: 295,
        encontro: "1d6",
        encontroCovil: "2d4",
        descricao:
          "<p>O ilusionismo não tem escola nem mestres — só gente que aprendeu a distorcer a percepção porque a alternativa era ser encontrada. O Sem-Rosto é o preço quando a máscara dura tempo demais: um Cambion que precisou parecer humano por vidas seguidas, ou um meio-elfo que fez o <strong>Juramento do Espelho</strong> e escolheu <em>rejeitar ambas as heranças e virar algo sem nome</em> — e virou, literalmente. Debaixo da última máscara não sobrou rosto: só a fome de usar o de outra pessoa. À pergunta \"quem é o rosto por baixo?\", ele é a resposta que ninguém queria.</p>\n<p><em>Nota de mesa.</em> Não é um combate — é uma investigação. Plante-o cedo (um NPC recorrente \"estranho\"), deixe a mesa sentir que algo não fecha, e faça a revelação valer. Ótimo vilão para arcos ligados à Rede de Sombras, aos Cambions ou ao Súcubo que os gera.</p>",
        ataques: [{ nome: "Lâmina oculta", qtd: 1, bonus: 5, dano: "1d6" }],
        habilidades: [
          {
            nome: "Sem Rosto Próprio",
            desc: "sem uma máscara vestida, é um borrão pálido e sem feições. Quem o vê assim faz <strong>JPS</strong> ou fica <strong>abalado</strong> por 1d4 rodadas.",
          },
          {
            nome: "Roubar o Rosto",
            desc: "estudando uma criatura humanoide por alguns minutos (ou tocando-a durante o sono), assume sua aparência, voz e maneirismos com perfeição — inclui tendência falsa (como <em>Logro</em>) e engana até <em>Detectar Mentiras</em>. Só <em>Visão da Verdade</em> ou magia de revelação o desmascara.",
          },
          {
            nome: "Usurpar o Original",
            desc: "enquanto veste o rosto de alguém, os que conhecem a vítima fazem <strong>JPS</strong> ao encontrá-la de verdade ou a confundem com um impostor. Se o original morre enquanto o Sem-Rosto o veste, a identidade passa a ser dele — sem emenda.",
          },
          {
            nome: "Golpe de Confiança",
            desc: "o primeiro ataque contra quem confia na máscara (alvo desprevenido) é <strong>Muito Fácil</strong> e causa <strong>dano dobrado</strong>. Ele não vence em campo aberto; vence antes de a luta começar.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    folder: "Demônios e fauna",
    monstros: [
      {
        nome: "Águia-Cadáver",
        tipo: "Besta",
        conceito: "Animal",
        tamanho: "medio",
        alinhamento: "neutro",
        movimento: "6/18V",
        dv: "4+2",
        ca: "15",
        jp: "5",
        moral: 8,
        xp: 200,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouroCovil: "L",
        habitat: "Pinheirais Negros de Vornfell",
        descricao:
          "<p>Ave de rapina dos <strong>Pinheirais Negros de Vornfell</strong>, carniceira que segue a Irmandade Voraz para se fartar das abominações que ela abate. Seus tecidos concentram os resíduos energéticos do que consome — é dessa matéria-prima que os Marcados da <strong>Escola da Águia-Cadáver</strong> modelaram seus Ecos. Não consta nas enciclopédias da Ars Vocalis; consta nos relatos da Irmandade.</p>\n<p><strong>Movimento (fonte):</strong> 6/18V — 6 m, 18 m voando.</p>",
        ataques: [
          { nome: "Bico", qtd: 1, bonus: 5, dano: "1d8" },
          { nome: "Garras", qtd: 2, bonus: 5, dano: "1d4" },
        ],
        habilidades: [
          {
            nome: "Ataque rasante",
            desc: "ao mergulhar de uma altura sobre a presa, dobra o dano do Bico.",
          },
          {
            nome: "Eco Residual (1/dia)",
            desc: "descarrega a energia acumulada num grito sônico-necrótico em cone de 6 m. Alvos sofrem <strong>2d6</strong> de dano e devem passar numa <strong>JPC</strong> ou ficam aturdidos por 1 rodada.",
          },
          {
            nome: "Visão aguçada",
            desc: "dificilmente é surpreendida à luz do dia; enxerga presas a grande distância.",
          },
        ],
      },
      {
        nome: "Águia do Vale",
        tipo: "Besta",
        conceito: "Animal",
        tamanho: "grande",
        alinhamento: "neutro",
        movimento: "6/30Vo",
        dv: "5",
        ca: "15",
        jp: "5",
        moral: 9,
        xp: 295,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouroCovil: "L",
        habitat: "Vale da Águia",
        descricao:
          "<p>A águia-gigante que dá nome ao <strong>Vale da Águia</strong> — e o oposto vivo da carniceira Águia-Cadáver. Nobres, orgulhosas e inteligentes, escolhem com quem voam: um jovem do Vale só monta uma se passar no <strong>Rito da Pena</strong>, e a Ordem do Corvo as honra como mensageiras dos céus. Não servem a quem não as merece; tentar domá-las à força é um modo conhecido de morrer caindo.</p>\n<p><strong>Movimento (fonte):</strong> 6/30Vo — 6 m, 30 m voando.</p>",
        ataques: [
          { nome: "Bico", qtd: 1, bonus: 5, dano: "1d8" },
          { nome: "Garras", qtd: 2, bonus: 5, dano: "1d6" },
        ],
        habilidades: [
          {
            nome: "Mergulho",
            desc: "ao atacar mergulhando de grande altura, dobra o dano das Garras e pode tentar agarrar a presa no mesmo movimento.",
          },
          {
            nome: "Visão de Águia",
            desc: "enxerga presas a quilômetros e dificilmente é surpreendida à luz do dia.",
          },
          {
            nome: "Mente Nobre",
            desc: "entende a fala das gentes e julga caráter; pode firmar um laço voluntário com um cavaleiro digno, tornando-se montaria leal (nunca escrava).",
          },
          {
            nome: "Agarrar e Erguer",
            desc: "num acerto com as duas Garras contra alvo de tamanho <strong>Médio ou menor</strong>, agarra-o e pode carregá-lo voando.",
          },
        ],
      },
      {
        nome: "Súcubo / Íncubo",
        tipo: "Demônio",
        conceito: "Humanoide Monstruoso",
        tamanho: "medio",
        alinhamento: "caotico",
        movimento: "9/15Vo",
        dv: "6",
        ca: "15",
        jp: "7",
        moral: 10,
        xp: 445,
        encontro: "1",
        encontroCovil: "1d3",
        tesouro: "U",
        tesouroCovil: "E",
        descricao:
          "<p>Demônios não fazem parte da cosmologia da Tríade — entram em Ekhoria pelas frestas, e ninguém concorda sobre como. O Súcubo (e seu reflexo masculino, o Íncubo) é o predador mais paciente entre eles: não mata depressa, seduz devagar. É a origem de todo <strong>Cambion</strong> — a Marca do Três que esses híbridos carregam é a assinatura do processo profano que os gera, e o Súcubo é o seu vértice.</p>\n<p><strong>Movimento (fonte):</strong> 9/15Vo — 9 m, 15 m voando.</p>",
        ataques: [{ nome: "Toque Drenante", qtd: 1, bonus: 6, dano: "1d6" }],
        habilidades: [
          {
            nome: "Forma Desejada",
            desc: "assume a aparência exata da pessoa que o alvo mais deseja ou confia; sem magia de revelação, é praticamente impossível desmascará-lo.",
          },
          {
            nome: "Enfeitiçar",
            desc: "à vontade, como a magia <em>Enfeitiçar Pessoas</em> (JPS resiste); um alvo já enfeitiçado faz a JP com Ajuste Difícil.",
          },
          {
            nome: "Beijo Drenante",
            desc: "um beijo (ou Toque Drenante) consentido drena <strong>1d6 PV</strong> e <strong>1 ponto de Constituição</strong> temporário, que o demônio absorve para si; vítimas reduzidas a 0 de Constituição morrem e raramente descansam em paz.",
          },
          {
            nome: "Concepção Profana",
            desc: "o ritual que gera um Cambion exige três — a Vítima Primária esvaziada noite após noite, a Portadora desavisada e o filho estéril que encerra a linhagem. Um Súcubo solto numa comunidade é uma campanha inteira de horror lento.",
          },
          {
            nome: "Resistências Demoníacas",
            desc: "imune a fogo e a encanto/medo; só é ferido por armas mágicas ou de prata; vê no escuro.",
          },
        ],
      },
      {
        nome: "Abominação do Degelo",
        flavor: "Vornfell — o frio que não devia existir.",
        tipo: "Monstro",
        conceito: "Humanoide Monstruoso",
        tamanho: "grande",
        alinhamento: "caotico",
        movimento: "9 m",
        dv: "6",
        ca: "15",
        jp: "6",
        moral: 10,
        xp: 410,
        encontro: "1",
        encontroCovil: "1d4",
        variante: true,
        habitat: "Vornfell",
        descricao:
          "<p>Variante regional da <strong>Abominação</strong>, moldada pelo frio que não devia existir em Vornfell — o que o <strong>Guardião da Pira</strong> mantém do lado de fora da fogueira.</p>",
        ataques: [{ nome: "Garras Geladas", qtd: 2, bonus: 6, dano: "1d8" }],
        habilidades: [
          {
            nome: "Carne Errada",
            desc: "não sente dor; imune a Medo, encanto e demais efeitos mentais (a mente que tinha já se foi). Não pode ser desmoralizada por meios comuns — só recua diante de dano que a fira de verdade.",
          },
          {
            nome: "Presença Antinatural",
            desc: "humanoides a até 9 m que a avistem devem passar numa <strong>JPS</strong> ou ficam <strong>abalados</strong> (Ajuste Difícil em testes e ataques) por 1d4 rodadas.",
          },
          {
            nome: "Toque Mortificante",
            desc: "quem é atingido por uma Garra Gelada sofre <strong>+1d6 de dano de frio</strong> e deve passar numa <strong>JPC</strong> ou tem seu deslocamento reduzido à metade por 1 rodada (os membros entorpecem).",
          },
          {
            nome: "Sangue Congelado",
            desc: "imune a dano de frio; sofre <strong>+50% de dano de fogo</strong> e fica abalada por 1 rodada ao ser ferida por chama (gancho direto para a <strong>Pira</strong> do Guardião).",
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    folder: "A Tríade — manifestações divinas",
    monstros: [
      {
        nome: "Atenção da Tríade",
        tipo: "Manifestação divina",
        conceito: "Besta",
        tamanho: "grande",
        alinhamento: "neutro",
        movimento: "12 m",
        dv: "9",
        ca: "18",
        jp: "8",
        moral: 12,
        xp: 1075,
        encontro: "1",
        descricao:
          "<p>A Tríade não ouve preces, não premia nem pune — apenas <strong>existe</strong>, como uma lei. Mas lançar uma magia divina é <em>roubar a atenção</em> de uma dessas forças, e forçar um milagre grande demais — devolver a vida a um morto, parar o tempo, fazer a carne crescer sem fim — faz o olhar de um dos Três <strong>pousar</strong> onde não devia. O que se manifesta não vem servir nem castigar: vem <strong>corrigir o desequilíbrio</strong>. É indiferente à sua intenção como o sol é indiferente ao que ilumina. Não se negocia com uma Atenção; cessa-se a intromissão que a chamou — ou desfaz-se ela, e reza-se para que o deus perca o interesse de novo.</p>\n<p>Não é um encontro comum: é um evento, e quase sempre a resposta certa é <em>parar de fazer o que a chamou</em>.</p>",
        ataques: [{ nome: "Toque do Divino", qtd: 1, bonus: 9, dano: "2d8" }],
        habilidades: [
          {
            nome: "Indiferença Encarnada",
            desc: "não é servo nem inimigo — é uma correção. Imune a Medo, encanto, sono, paralisia, veneno e a todos os efeitos mentais ou de morte instantânea. Não pode ser desmoralizada nem barganhada por meios comuns.",
          },
          {
            nome: "Chamada pela Intromissão",
            desc: "só se manifesta quando um mortal rouba a atenção de um dos Três (um milagre grande demais). Ignora todos os alvos e vai atrás da <strong>fonte do desequilíbrio</strong> primeiro; os que a defendem só a atrasam.",
          },
          {
            nome: "Retorno ao Silêncio",
            desc: "reduzida a 0 PV, dissipa-se sem deixar corpo. Se o desequilíbrio que a chamou persiste (o morto segue de pé, o feitiço segue ativo), <strong>volta a se manifestar</strong> tempos depois — desfazer a causa é o único fim verdadeiro.",
          },
        ],
      },
      {
        nome: "O Viço (Atenção de Aelora)",
        flavor: "Vida, luz, crescimento. O gancho: uma \"bênção\" sem clero, e o crescimento foge ao controle.",
        tipo: "Manifestação divina",
        conceito: "Besta",
        tamanho: "grande",
        alinhamento: "neutro",
        movimento: "6 m",
        dv: "9",
        ca: "17",
        jp: "8",
        moral: 12,
        xp: 1225,
        encontro: "1",
        variante: true,
        descricao:
          "<p>A Atenção de <strong>Aelora</strong> — vida, luz e crescimento sem freio, pousando onde um milagre de fertilidade ou de cura foi longe demais.</p>",
        ataques: [{ nome: "Toque Fértil", qtd: 2, bonus: 9, dano: "1d8" }],
        habilidades: [
          {
            nome: "Indiferença Encarnada",
            desc: "não é servo nem inimigo — é uma correção. Imune a Medo, encanto, sono, paralisia, veneno e a todos os efeitos mentais ou de morte instantânea. Não pode ser desmoralizada nem barganhada por meios comuns.",
          },
          {
            nome: "Chamada pela Intromissão",
            desc: "só se manifesta quando um mortal rouba a atenção de um dos Três. Ignora todos os alvos e vai atrás da <strong>fonte do desequilíbrio</strong> primeiro.",
          },
          {
            nome: "Retorno ao Silêncio",
            desc: "reduzida a 0 PV, dissipa-se sem deixar corpo. Se o desequilíbrio que a chamou persiste, <strong>volta a se manifestar</strong> tempos depois.",
          },
          {
            nome: "Crescimento Voraz",
            desc: "quem é tocado faz <strong>JPC</strong> ou tem carne e vegetação brotando do próprio corpo — sofre <strong>1d6/rodada</strong> e age com Ajuste Difícil até que alguém gaste uma ação arrancando o viço (ou até morrer e virar canteiro).",
          },
          {
            nome: "Cura que Corrompe",
            desc: "pode \"curar\" à força um alvo em 9 m, restaurando PV <strong>além do máximo</strong>; o excedente vira tumor descontrolado — nova <strong>JPC</strong> ou o alvo fica com Ajuste Difícil permanente até tratamento. A luz não tem preferidos: tudo deve crescer.",
          },
          {
            nome: "Sede de Fim",
            desc: "sofre <strong>+50%</strong> de dano de fogo e de frio — o toque de Morthan é o que a natureza de Aelora não suporta.",
          },
        ],
      },
      {
        nome: "O Registro (Atenção de Chronael)",
        flavor: "Tempo, memória, destino. O gancho: um lugar onde o tempo \"registrou errado\".",
        tipo: "Manifestação divina",
        conceito: "Besta",
        tamanho: "grande",
        alinhamento: "neutro",
        movimento: "12 m",
        dv: "8",
        ca: "19",
        jp: "8",
        moral: 12,
        xp: 920,
        encontro: "1",
        variante: true,
        descricao:
          "<p>A Atenção de <strong>Chronael</strong> — tempo, memória e destino corrigindo um registro que saiu errado.</p>",
        ataques: [{ nome: "Toque Fora do Tempo", qtd: 1, bonus: 8, dano: "2d6" }],
        habilidades: [
          {
            nome: "Indiferença Encarnada",
            desc: "não é servo nem inimigo — é uma correção. Imune a Medo, encanto, sono, paralisia, veneno e a todos os efeitos mentais ou de morte instantânea. Não pode ser desmoralizada nem barganhada por meios comuns.",
          },
          {
            nome: "Chamada pela Intromissão",
            desc: "só se manifesta quando um mortal rouba a atenção de um dos Três. Ignora todos os alvos e vai atrás da <strong>fonte do desequilíbrio</strong> primeiro.",
          },
          {
            nome: "Retorno ao Silêncio",
            desc: "reduzida a 0 PV, dissipa-se sem deixar corpo. Se o desequilíbrio que a chamou persiste, <strong>volta a se manifestar</strong> tempos depois.",
          },
          {
            nome: "Instante Preso",
            desc: "um alvo em 9 m faz <strong>JPS</strong> ou fica preso repetindo a ação da rodada anterior, incapaz de escolher outra coisa por 1 rodada — o tempo o registrou ali.",
          },
          {
            nome: "Memória Emprestada",
            desc: "quem é tocado faz <strong>JPS</strong> ou perde a lembrança do que ia fazer (perde a próxima ação), ou volta com uma memória que não é sua, ficando <strong>abalado</strong> por 1d4 rodadas.",
          },
          {
            nome: "Fora de Sincronia",
            desc: "o tempo dobra ao seu redor — <strong>age duas vezes por rodada</strong>, sempre no topo e no fim da ordem de iniciativa.",
          },
        ],
      },
      {
        nome: "O Limiar (Atenção de Morthan)",
        flavor: "Morte, fim, silêncio. O gancho: Morthan ignora algo que já deveria ter levado — até deixar de ignorar.",
        tipo: "Manifestação divina",
        conceito: "Besta",
        tamanho: "grande",
        alinhamento: "neutro",
        movimento: "9 m",
        dv: "9",
        ca: "18",
        jp: "8",
        moral: 12,
        xp: 1225,
        encontro: "1",
        variante: true,
        descricao:
          "<p>A Atenção de <strong>Morthan</strong> — morte, fim e silêncio vindo cobrar o que já devia ter sido levado. É o predador natural de todo morto-vivo do cenário.</p>",
        ataques: [{ nome: "Toque do Fim", qtd: 1, bonus: 9, dano: "2d8" }],
        habilidades: [
          {
            nome: "Indiferença Encarnada",
            desc: "não é servo nem inimigo — é uma correção. Imune a Medo, encanto, sono, paralisia, veneno e a todos os efeitos mentais ou de morte instantânea. Não pode ser desmoralizada nem barganhada por meios comuns.",
          },
          {
            nome: "Chamada pela Intromissão",
            desc: "só se manifesta quando um mortal rouba a atenção de um dos Três. Ignora todos os alvos e vai atrás da <strong>fonte do desequilíbrio</strong> primeiro.",
          },
          {
            nome: "Retorno ao Silêncio",
            desc: "reduzida a 0 PV, dissipa-se sem deixar corpo. Se o desequilíbrio que a chamou persiste, <strong>volta a se manifestar</strong> tempos depois.",
          },
          {
            nome: "Cobrança do Limiar",
            desc: "contra criaturas que burlaram a morte — mortos-vivos, ressuscitados, quem fingiu o próprio óbito — o Toque do Fim causa <strong>dano dobrado</strong>, e na falha de <strong>JPC</strong> a criatura simplesmente <em>termina</em>, a morte fora de hora enfim corrigida. É o que a Tropa Sem Fim de Breônia teme, e o que um dia pode vir cobrar o Capitão Rorik.",
          },
          {
            nome: "Silêncio Final",
            desc: "um alvo reduzido a 0 PV por ela não pode ser ressuscitado, reanimado nem transformado em morto-vivo. O que ela encerra, fica encerrado.",
          },
          {
            nome: "Presença de Ausência",
            desc: "humanoides a até 9 m fazem <strong>JPS</strong> ou ficam desorientados (Ajuste Difícil) — <em>\"a sensação de ter chegado ao lugar certo pela última vez\"</em>, nas palavras do único que a descreveu.",
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  {
    folder: "Abominações — ficha-base",
    monstros: [
      {
        nome: "Abominação",
        tipo: "Monstro",
        conceito: "Humanoide Monstruoso",
        tamanho: "medio",
        alinhamento: "caotico",
        movimento: "9 m",
        dv: "5",
        ca: "14",
        jp: "5",
        moral: 9,
        xp: 265,
        encontro: "1d6",
        encontroCovil: "2d4",
        descricao:
          "<p>Uma <strong>Abominação</strong> não é uma espécie — é o que acontece quando um ser vivo passa tempo demais sob uma das <strong>anomalias</strong> de Ekhoria e a carne cede ao que a deforma. Cada região marca a sua: o frio que não devia existir em Vornfell, a coisa enterrada sob as Areias, a fome do Breu em Breônia, a pressão arcana de Arkádia. São o inimigo recorrente da <strong>Irmandade Voraz</strong>, o que o <strong>Guardião da Pira</strong> mantém do lado de fora da fogueira e o que o <strong>Voraz</strong> disseca para entender. (A versão deformada pela <strong>Fenda Abissal</strong> de Cinthara tem ficha própria: ver Fera-Abissal.)</p>\n<p>Use esta ficha-base para uma Abominação sem origem definida; para um encontro ancorado numa região, use a variante correspondente (do Degelo, das Areias, do Breu, Arcana).</p>",
        ataques: [{ nome: "Membros Disformes", qtd: 2, bonus: 5, dano: "1d6" }],
        habilidades: [
          {
            nome: "Carne Errada",
            desc: "não sente dor; imune a Medo, encanto e demais efeitos mentais (a mente que tinha já se foi). Não pode ser desmoralizada por meios comuns — só recua diante de dano que a fira de verdade.",
          },
          {
            nome: "Presença Antinatural",
            desc: "humanoides a até 9 m que a avistem devem passar numa <strong>JPS</strong> ou ficam <strong>abalados</strong> (Ajuste Difícil em testes e ataques) por 1d4 rodadas.",
          },
          {
            nome: "Marca da Anomalia",
            desc: "toda Abominação carrega a assinatura da região que a fez — veja as variantes. Uma Abominação base não tem nenhuma marca adicional (uma criatura recém-tocada, ou longe da origem).",
          },
        ],
      },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // Fonte: Sistema\Tabelas do Mestre\Adversários Humanos por Facção.md
  // Statblocks genéricos da oposição humana das facções (o Bestiário cobre o
  // sobrenatural). Escala: capanga DV 1–2, agente DV 3–4, elite DV 5–6.
  // Nenhum deles declara tamanho na fonte — campo omitido de propósito.
  {
    folder: "Adversários Humanos por Facção",
    monstros: [
      {
        nome: "Inquisidor de Morthan",
        flavor: "Caça necromantes e executa no local. Supervisiona Breônia.",
        tipo: "Humano — Clérigo (Inquisidor Lunar) 5º",
        conceito: "Humanoide",
        alinhamento: "ordeiro",
        movimento: "9 m",
        dv: "5",
        ca: "16",
        jp: "7",
        moral: 11,
        xp: 295,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouro: "Q",
        tesouroCovil: "B",
        pv: 25,
        habitat: "Triarcis (Colégio Lunar) — atua em Breônia",
        descricao:
          "<p>Agente do <strong>Colégio Lunar</strong> de Triarcis: caça necromantes e executa no local. Supervisiona Breônia.</p>",
        ataques: [{ nome: "Maça consagrada", qtd: 1, bonus: 5, dano: "1d6+1" }],
        habilidades: [
          {
            nome: "Autoridade de Morthan",
            desc: "Afasta/Destrói Mortos-Vivos como clérigo de 5º nível; tem licença para executar necromantes sem mandado — em qualquer nação.",
          },
          {
            nome: "Farejar a Morte",
            desc: "percebe mortos-vivos, ressuscitados e óbitos forjados a curta distância.",
          },
          {
            nome: "Magia Divina",
            desc: "<em>Curar Ferimentos</em>, <em>Silêncio</em>, <em>Detectar Maldade</em>, <em>Imobilizar</em>.",
          },
          {
            nome: "Convicção",
            desc: "imune a Medo; +2 nas JP contra encanto. Não recua.",
          },
        ],
      },
      {
        nome: "Buscador da Ars Vocalis",
        flavor: "Agente-arcanista; captura \"irregulares\" vivos e protege os segredos da magocracia.",
        tipo: "Arkanim — Arcanista 4º",
        conceito: "Humanoide",
        alinhamento: "neutro",
        movimento: "9 m",
        dv: "4",
        ca: "13",
        jp: "7",
        moral: 8,
        xp: 200,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouro: "Q",
        tesouroCovil: "B",
        pv: 16,
        habitat: "Arkádia",
        descricao:
          "<p>Agente-arcanista da <strong>Ars Vocalis</strong>: captura \"irregulares\" vivos e protege os segredos da magocracia.</p>",
        ataques: [{ nome: "Bastão de cristal", qtd: 1, bonus: 3, dano: "1d6" }],
        habilidades: [
          {
            nome: "Magia Arcana",
            desc: "<em>Mísseis Mágicos</em>, <em>Sono</em>, <em>Enfeitiçar Pessoas</em>, <em>Névoa</em> — prefere neutralizar a matar (a cobaia vale mais viva).",
          },
          {
            nome: "Comando de Construto",
            desc: "em Arkanes, dá ordens a um Construto de Arcanita próximo.",
          },
          {
            nome: "Rede de Amortecimento",
            desc: "imune à Pressão Arcana e estende a proteção a aliados por perto.",
          },
        ],
      },
      {
        nome: "Legionário de Ferro",
        flavor: "A lei do porto neutro: só caça quem quebra contrato — mas aí não solta.",
        tipo: "Humano — Guerreiro 3º",
        conceito: "Humanoide",
        alinhamento: "neutro",
        movimento: "9 m",
        dv: "3",
        ca: "17",
        jp: "6",
        moral: 10,
        xp: 115,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouro: "Q",
        tesouroCovil: "C",
        pv: 18,
        habitat: "Ferro Velho",
        descricao:
          "<p>Soldado da <strong>Legião de Ferro</strong>, a lei do porto neutro de Ferro Velho.</p>\n<p><strong>Capitão (elite, DV 6):</strong> BA +6, PV 34, acesso ao Salão dos Contratos; some liderança (+1 aos Legionários em 9 m).</p>",
        ataques: [{ nome: "Espada longa", qtd: 1, bonus: 4, dano: "1d8+1" }],
        habilidades: [
          {
            nome: "Disciplina de Ferro",
            desc: "+1 na CA quando lado a lado com outro Legionário (formação).",
          },
          {
            nome: "Cumpre o Contrato",
            desc: "não abandona uma missão paga; moral 12 enquanto o contrato vale.",
          },
        ],
      },
      {
        nome: "Agente do Punhal Tenebroso",
        flavor: "Guilda que \"não existe\". Espia, chantageia, e quer a verdade sobre a Fenda como arma.",
        tipo: "Anão — Ladino 3º",
        conceito: "Humanoide",
        alinhamento: "neutro",
        movimento: "6 m",
        dv: "3",
        ca: "14",
        jp: "6",
        moral: 8,
        xp: 135,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouro: "Q",
        tesouroCovil: "C",
        pv: 14,
        habitat: "Durgrann",
        descricao:
          "<p>Espião da guilda que \"não existe\" em Durgrann — chantageia e quer a verdade sobre a Fenda como arma.</p>",
        ataques: [{ nome: "Adaga (ou besta de mão)", qtd: 1, bonus: 3, dano: "1d4+1" }],
        habilidades: [
          {
            nome: "Ataque Furtivo",
            desc: "dano dobrado contra alvo desprevenido ou flanqueado.",
          },
          {
            nome: "Conhece o Eixo Torto",
            desc: "move-se pelas rotas secretas de Durgrann; some numa multidão com facilidade.",
          },
          {
            nome: "Sinais Mudos",
            desc: "comunica-se e coordena em silêncio (a guilda comanda por sinais, como Ragan Martelo-Mudo).",
          },
        ],
      },
      {
        nome: "Corvo (Ordem do Corvo)",
        flavor: "Mensageiro, diplomata e assassino neutro. Matá-lo quebra a paz de 88 anos.",
        tipo: "Meio-elfo — Ladino 5º",
        conceito: "Humanoide",
        alinhamento: "neutro",
        movimento: "9 m",
        dv: "5",
        ca: "15",
        jp: "7",
        moral: 9,
        xp: 265,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouro: "Q",
        tesouroCovil: "B",
        pv: 22,
        habitat: "Vale da Águia",
        descricao:
          "<p>Mensageiro, diplomata e assassino neutro da <strong>Ordem do Corvo</strong>, no Vale da Águia. Matá-lo quebra a paz de 88 anos.</p>",
        ataques: [
          { nome: "Lâminas gêmeas", qtd: 2, bonus: 5, dano: "1d6" },
          { nome: "Arco curto", qtd: 1, bonus: 5, dano: "1d6" },
        ],
        habilidades: [
          {
            nome: "Inviolável",
            desc: "ferir um Corvo une os sete principados contra o agressor — a proteção é <em>política</em>, e vale mais que qualquer armadura.",
          },
          {
            nome: "Entrega Garantida",
            desc: "leva qualquer coisa a qualquer lugar do Vale; conhece os quatro acessos e mil atalhos.",
          },
          {
            nome: "Neutralidade Absoluta",
            desc: "não toma partido dos principados. Mata apenas quando o contrato exige — e então não erra.",
          },
        ],
      },
      {
        nome: "Fulgor da Irmandade Voraz",
        flavor: "A muralha viva contra o norte. Avalia se você é útil ou peso morto.",
        tipo: "Humano — Caçador 4º",
        conceito: "Humanoide",
        alinhamento: "neutro",
        movimento: "9 m",
        dv: "4",
        ca: "15",
        jp: "6",
        moral: 10,
        xp: 200,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouro: "Q",
        tesouroCovil: "B",
        pv: 20,
        habitat: "Vornfell",
        descricao:
          "<p>Membro da <strong>Irmandade Voraz</strong> de Vornfell — a muralha viva contra o norte. Avalia se você é útil ou peso morto.</p>",
        ataques: [{ nome: "Machado flamejante", qtd: 1, bonus: 4, dano: "1d8+1" }],
        habilidades: [
          {
            nome: "Chama contra a Escuridão",
            desc: "ataques carregam fogo; +2 de dano contra mortos-vivos e criaturas das Cavernas Profundas.",
          },
          {
            nome: "Caçada do Norte",
            desc: "rastreia nas montanhas, resiste ao frio extremo, sobrevive à Noite de Morthan.",
          },
          {
            nome: "Vigília do Degelo",
            desc: "encarou o horror e voltou; +2 nas JP contra Medo.",
          },
        ],
      },
      {
        nome: "Bushi",
        flavor: "Guerreiro de honra. Luta por necessidade, nunca por raiva.",
        tipo: "Orc de Yorugan — Guerreiro (Samurai) 5º",
        conceito: "Humanoide",
        alinhamento: "ordeiro",
        movimento: "9 m",
        dv: "5",
        ca: "16",
        jp: "7",
        moral: 11,
        xp: 295,
        encontro: "1d6",
        encontroCovil: "2d4",
        tesouro: "Q",
        tesouroCovil: "B",
        pv: 26,
        habitat: "Yorugan",
        descricao:
          "<p>Guerreiro de honra de <strong>Yorugan</strong>. Luta por necessidade, nunca por raiva.</p>",
        ataques: [{ nome: "Kurogane", qtd: 1, bonus: 6, dano: "1d10+1" }],
        habilidades: [
          {
            nome: "Fio que Abre",
            desc: "a Kurogane faz ferimentos sangrarem — 1 de dano por rodada até serem tratados (acumula).",
          },
          {
            nome: "Duelo de Honra",
            desc: "ao desafiar um oponente formalmente, +2 no primeiro golpe se o duelo for aceito.",
          },
          {
            nome: "Domínio do Ki",
            desc: "1×/combate, um feito sobre-humano (quebrar um escudo, um salto impossível, desarmar sem sacar).",
          },
          {
            nome: "Controle",
            desc: "imune a provocação e Medo; jamais ataca por fúria — o que o torna assustador.",
          },
        ],
      },
      {
        nome: "Mercenário",
        flavor: "O capanga que aparece em dívidas, emboscadas e brigas. Use em bando.",
        tipo: "Humano — Combatente 1º",
        conceito: "Humanoide",
        alinhamento: "neutro",
        movimento: "9 m",
        dv: "1",
        ca: "13",
        jp: "5",
        moral: 8,
        xp: 35,
        encontro: "2d4",
        encontroCovil: "4d6",
        tesouro: "Q",
        tesouroCovil: "C",
        pv: 6,
        descricao:
          "<p>Mercenário / bandido genérico — o capanga que aparece em dívidas, emboscadas e brigas. Use em bando.</p>",
        ataques: [{ nome: "Espada curta (ou besta)", qtd: 1, bonus: 1, dano: "1d6" }],
        habilidades: [
          {
            nome: "Coragem de Bando",
            desc: "moral +1 enquanto houver 4 ou mais de pé.",
          },
          {
            nome: "Sem Lealdade",
            desc: "testa Moral ao perder metade do bando; rende-se ou foge quando a maré vira. Ninguém aqui morre de graça.",
          },
        ],
      },
      {
        nome: "Batedor da Rede de Sombras",
        flavor: "Informação, não luta. Sabe tudo — ou conhece quem sabe.",
        tipo: "Halfling — Ladino 2º",
        conceito: "Humanoide",
        alinhamento: "neutro",
        movimento: "6 m",
        dv: "2",
        ca: "14",
        jp: "6",
        moral: 7,
        xp: 80,
        encontro: "2d4",
        encontroCovil: "4d6",
        tesouro: "Q",
        tesouroCovil: "C",
        pv: 9,
        descricao:
          "<p>Agente da <strong>Rede de Sombras</strong> halfling: informação, não luta. Sabe tudo — ou conhece quem sabe.</p>",
        ataques: [{ nome: "Funda (ou adaga)", qtd: 1, bonus: 3, dano: "1d4" }],
        habilidades: [
          {
            nome: "Furtividade Pequena",
            desc: "esconde-se com facilidade (1-4 em 1d6); atacantes sofrem -2 para acertá-lo.",
          },
          {
            nome: "Rede de Boatos",
            desc: "sabe (ou tem um primo que sabe) praticamente qualquer informação de uma cidade.",
          },
          {
            nome: "Escrita Ilusória",
            desc: "troca mensagens que só o destinatário consegue ler. Negocia antes de sacar a adaga.",
          },
        ],
      },
      {
        nome: "Militante do SUF",
        flavor: "Revolucionário armado com pólvora arcana. Sonha em derrubar a barreira.",
        tipo: "Humano — Combatente 2º",
        conceito: "Humanoide",
        alinhamento: "neutro",
        movimento: "9 m",
        dv: "2",
        ca: "13",
        jp: "5",
        moral: 9,
        xp: 80,
        encontro: "2d4",
        encontroCovil: "4d6",
        tesouro: "Q",
        tesouroCovil: "C",
        pv: 10,
        habitat: "Benellikov",
        descricao:
          "<p>Revolucionário de <strong>Benellikov</strong> armado com pólvora arcana. Sonha em derrubar a barreira.</p>",
        ataques: [{ nome: "Mosquete de pederneira", qtd: 1, bonus: 2, dano: "1d10" }],
        habilidades: [
          {
            nome: "Pólvora Arcana",
            desc: "uma granada explode em área — 2d6 (JPD reduz à metade). Vez ou outra \"abre algo que não fecha\".",
          },
          {
            nome: "Arma Volátil",
            desc: "num 1 natural no ataque, a arma de fogo encrava ou explode na câmara (1d6 no atirador).",
          },
          {
            nome: "Fé na Cratera",
            desc: "luta com convicção pelos seus; moral 11 perto de outros militantes.",
          },
        ],
      },
    ],
  },
];
