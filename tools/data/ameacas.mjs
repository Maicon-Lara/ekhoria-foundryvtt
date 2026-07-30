// Ameaças de "A Guerra do Esmaecer" — GERADO, não editar à mão.
//
// Transcrito dos blocos ```od2-monstro``` dos arquivos da campanha no cofre
// Obsidian, que já traziam ficha completa em YAML: dv, pv, ca, jp, moral,
// ataques e habilidades. A fonte de verdade é o cofre.
//
// Mudou uma ficha lá? Rode `python tools/importar-ameacas.py` e depois
// `npm run build`.
//
// Quem já estava no bestiário (Umbra Pávida, Fulgor da Irmandade Voraz) não é
// reimportado: a fonte de bestiario.mjs continua mandando neles.
//
// As pastas nascem do arco da campanha. Encontro e tesouro ficam vazios de
// propósito: quantos aparecem e o que carregam é a cena que decide, não uma
// tabela.

export const ameacas = [
  {
    folder: "Ameaças da Campanha — Aliados e Parceiros",
    monstros: [
      {
        nome: "Ancel, o Que Ninguém Lembra (aliado)",
        tipo: "Silente ancorado",
        tamanho: "Médio",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "5",
        pv: "30",
        ca: "14",
        jp: "8",
        moral: "12",
        xp: 295,
        conceito: "Humanoide",
        ataques: [
          { nome: "Poste de lanterneiro (bordão)", qtd: 1, bonus: 5, dano: "1d6+1" },
        ],
        habilidades: [
          {
            nome: "Os Seis Lampiões",
            desc: "",
          },
          {
            nome: "Sem Exaustão",
            desc: "",
          },
          {
            nome: "Esquecido",
            desc: "",
          },
          {
            nome: "Vulnerável ao Divino",
            desc: "",
          },
        ],
      },
      {
        nome: "Ysolde de Vandhal (parceira — nível 3)",
        tipo: "Humana (breoniana)",
        tamanho: "Médio",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "3",
        pv: "21",
        ca: "15",
        jp: "12",
        moral: "11",
        xp: 135,
        conceito: "Humanoide",
        ataques: [
          { nome: "Espada da casa (bastarda)", qtd: 1, bonus: 4, dano: "1d8+1" },
        ],
        habilidades: [
          {
            nome: "Nome que Ainda Vale",
            desc: "",
          },
          {
            nome: "Teimosia de Ônix",
            desc: "",
          },
          {
            nome: "Envenenada",
            desc: "",
          },
        ],
      },
    ],
  },
  {
    folder: "Ameaças da Campanha — Arco 1",
    monstros: [
      {
        nome: "Belvo Talha-de-Sino",
        tipo: "Humano",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "5",
        pv: "22",
        ca: "16",
        jp: "12",
        moral: "10",
        xp: 400,
        descricao: "61 anos, campeão da paróquia de Vez-do-Sino, com o coração falhando e ninguém sabe. BA +5.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Espada longa", qtd: 1, bonus: 6, dano: "1d8+2" },
        ],
        habilidades: [
          {
            nome: "Ofício Velho",
            desc: "Nas duas primeiras rodadas luta como o soldado que foi: +2 nos ataques e Ajuste Fácil para desarmar.",
          },
          {
            nome: "O Mal do Peito",
            desc: "AO FIM DA 3ª RODADA DE COMBATE, CORVIN MORRE — de exaustão, não de ferimento. Sem JP, sem cura possível na areia. O Mestre deve sinalizar isto na ficção a partir da 2ª rodada: o suor errado, a mão esquerda encolhida, o silêncio.",
          },
          {
            nome: "Duas saídas",
            desc: "(1) Derrubá-lo com dano NÃO-LETAL dentro de 3 rodadas — 22 PV caem rápido para quem está tentando. (2) Falar com ele no meio da luta: teste de Carisma (1 em 1d6), Ajuste Fácil se citarem o telhado, a paróquia ou o nome dele; ele se rende chorando de alívio.",
          },
          {
            nome: "Se viver",
            desc: "Vira aliado menor permanente: conhece meia Trisólio há quarenta anos e, no Arco 2, é ele quem tira o grupo da cidade.",
          },
        ],
      },
      {
        nome: "Campeão de Casa",
        tipo: "Humano",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "6",
        pv: "38",
        ca: "19",
        jp: "11",
        moral: "9",
        xp: 900,
        descricao: "Profissional caro, patrocinado por Casa antiga. Educado, competente e entediado. BA +6.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Espada bastarda", qtd: 2, bonus: 8, dano: "1d10+3" },
        ],
        habilidades: [
          {
            nome: "Arnês de Casa",
            desc: "Armadura completa de placas cerimoniais: o primeiro golpe que o atingiria a cada rodada é reduzido em 4 pontos de dano.",
          },
          {
            nome: "Escola de Salão",
            desc: "Uma vez por combate, desarma automaticamente um oponente que tenha errado dois ataques seguidos.",
          },
          {
            nome: "Contrato",
            desc: "Ergue a palma ao chegar a 12 PV. Morrer não faz parte do que ele foi pago para fazer, e ele não tem a menor vergonha disso.",
          },
        ],
      },
      {
        nome: "Cantor do Fio",
        tipo: "Humano (Inquisidor Lunar)",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "4",
        pv: "20",
        ca: "13",
        jp: "6",
        moral: "12",
        xp: 200,
        conceito: "Humanoide",
        ataques: [
          { nome: "Punhal ritual", qtd: 1, bonus: 4, dano: "1d4" },
        ],
        habilidades: [
          {
            nome: "A Cadência",
            desc: "",
          },
          {
            nome: "Não Interrompe",
            desc: "",
          },
          {
            nome: "Rendição Possível",
            desc: "",
          },
        ],
      },
      {
        nome: "Capitão Halvo Sete-Chaves, o Ancorado pelo Rancor",
        tipo: "Breoniano ancorado",
        tamanho: "Médio",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "7",
        pv: "44",
        ca: "17",
        jp: "8",
        moral: "12",
        xp: 580,
        conceito: "Humanoide",
        ataques: [
          { nome: "Espada de oficial", qtd: 2, bonus: 8, dano: "1d8+3" },
        ],
        habilidades: [
          {
            nome: "Ancorado pelo Rancor",
            desc: "",
          },
          {
            nome: "Os Onze",
            desc: "",
          },
          {
            nome: "A Palavra de um Oficial",
            desc: "",
          },
          {
            nome: "Vulnerável ao Divino",
            desc: "",
          },
        ],
      },
      {
        nome: "Espada de Paróquia",
        tipo: "Humano",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "3",
        pv: "17",
        ca: "16",
        jp: "14",
        moral: "8",
        xp: 120,
        descricao: "Campeão comum das Provações: um lutador local com fé e treino de milícia. BA +3.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Espada e escudo", qtd: 1, bonus: 4, dano: "1d8+1" },
        ],
        habilidades: [
          {
            nome: "A Palma",
            desc: "Ergue a palma e se rende ao chegar a 1/4 dos PV, ou se um aliado seu morrer em cena. Sempre. Nenhum Espada de Paróquia morre por orgulho.",
          },
          {
            nome: "Liturgia da Areia",
            desc: "Enquanto o braseiro de três cores estiver aceso e ele estiver rezando (primeira rodada), ganha +1 na CA.",
          },
        ],
      },
      {
        nome: "Inquisidor Batedor (Colégio Lunar)",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "3",
        ca: "15",
        jp: "5",
        moral: "9",
        xp: 135,
        conceito: "Humanoide",
        ataques: [
          { nome: "Besta de mão", qtd: 1, bonus: 4, dano: "1d6" },
          { nome: "Maça de cabo curto", qtd: 1, bonus: 4, dano: "1d6+1" },
        ],
        habilidades: [
          {
            nome: "Trabalha em Par",
            desc: "",
          },
          {
            nome: "Corda e Capuz",
            desc: "",
          },
          {
            nome: "Fé de Serviço",
            desc: "",
          },
        ],
      },
      {
        nome: "Inquisidor Lunar",
        tipo: "Humano",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "4",
        pv: "24",
        ca: "17",
        jp: "12",
        moral: "11",
        xp: 350,
        descricao: "Executor do Colégio Lunar. Reza o nome do alvo antes de matá-lo. BA +4.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Maça de ônix", qtd: 1, bonus: 5, dano: "1d8+2" },
        ],
        habilidades: [
          {
            nome: "Nomear o Impuro",
            desc: "Uma vez por combate, declara em voz alta o nome de um alvo à vista. O alvo faz JPS; falhando, sofre Ajuste Difícil em ataques e testes por 1d4 rodadas, e todos os Levas a até 18 m atacam preferencialmente ele.",
          },
          {
            nome: "Rito Menor",
            desc: "Conjura como Clérigo de 2º nível (Curar Ferimentos, Purificar, Afastar Mortos-Vivos). Afastar funciona plenamente contra Silentes Ancorados — é assim que Halvir cai.",
          },
          {
            nome: "Convicção",
            desc: "Imune a Medo. Não se rende e não aceita rendição de impuro registrado.",
          },
        ],
      },
      {
        nome: "Inquisidor Lunar (menor)",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "3",
        pv: "18",
        ca: "16",
        jp: "6",
        moral: "10",
        xp: 240,
        descricao: "Executor do Colégio Lunar. Maça, símbolo de Morthan, e autoridade para matar no local. BA +3.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Maça", qtd: 1, bonus: 4, dano: "1d6+2" },
        ],
        habilidades: [
          {
            nome: "Autoridade do Colégio",
            desc: "Uma vez por combate, ordena rendição: todos os PJs a até 9 m fazem JPS ou perdem a ação da rodada hesitando. Personagens criados em Triarcis ou Breônia sofrem Ajuste Difícil nesta JP.",
          },
          {
            nome: "Repelir Mortos-Vivos",
            desc: "Como clérigo de 3º nível. Isto importa muito perto de Nell, e ela nunca reparou que fica enjoada quando acontece.",
          },
        ],
      },
      {
        nome: "Inquisidor-Comandante Vare Ostrim",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "9",
        pv: "62",
        ca: "19",
        jp: "10",
        moral: "12",
        xp: 1175,
        conceito: "Humanoide",
        ataques: [
          { nome: "Martelo de ferro-vela", qtd: 2, bonus: 11, dano: "1d10+4" },
        ],
        habilidades: [
          {
            nome: "Ferro da Convicção",
            desc: "",
          },
          {
            nome: "Executor de Ordens",
            desc: "",
          },
          {
            nome: "Rito Maior da Dispensa",
            desc: "",
          },
          {
            nome: "O Que Ele Carrega",
            desc: "",
          },
          {
            nome: "Não Negocia",
            desc: "",
          },
        ],
      },
      {
        nome: "Irmã Nell",
        tipo: "Humano (?)",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "12 m",
        dv: "4",
        pv: "26",
        ca: "17",
        jp: "7",
        moral: "11",
        xp: 500,
        descricao: "Caçadora de impuros do Colégio Lunar. Rápida, precisa, silenciosa. Não sente frio, não sangra direito, e não sabe por quê. BA +4.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Espada curta lunar", qtd: 2, bonus: 5, dano: "1d6+2" },
          { nome: "Besta de mão", qtd: 1, bonus: 5, dano: "1d6+1" },
        ],
        habilidades: [
          {
            nome: "Pés de Ardósia",
            desc: "Move-se em telhados, beirais e vigas sem teste e sem perder deslocamento. Não pode ser flanqueada em terreno alto.",
          },
          {
            nome: "Marca do Ímpio",
            desc: "No início do combate escolhe um alvo (o arcanista, o Silente ou o originário, se houver). Contra ele: +2 para acertar e +2 de dano. Ela é treinada para isto e não pensa a respeito.",
          },
          {
            nome: "Frio no Toque",
            desc: "Quem a agarrar, for agarrado, ou tocar a pele dela sente frio de cadáver. Ferimentos nela sangram devagar e escuro. Ela nunca comentou isso com ninguém porque nunca lhe ocorreu que fosse estranho.",
          },
          {
            nome: "Recuo Calculado",
            desc: "Ao chegar a 8 PV ou menos, retira-se pelos telhados na rodada seguinte, sem provocar ataques. NÃO LUTA ATÉ A MORTE. Ela não morre nesta aventura.",
          },
          {
            nome: "Escuta",
            desc: "Se um PJ falar com ela em vez de atacar, ela responde. E ouve. Ver Desestabilização.",
          },
        ],
      },
      {
        nome: "Irmã Nell (Av.5 — a caçadora)",
        tipo: "Silente ancorada (ela não sabe)",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "12 m",
        dv: "6",
        pv: "34",
        ca: "17",
        jp: "8",
        moral: "12",
        xp: 410,
        conceito: "Humanoide",
        ataques: [
          { nome: "Besta pesada dos Colégios", qtd: 1, bonus: 7, dano: "1d10" },
          { nome: "Estilete de ferro-vela", qtd: 2, bonus: 6, dano: "1d4+2" },
        ],
        habilidades: [
          {
            nome: "Tiro de Marca",
            desc: "",
          },
          {
            nome: "Não Cansa",
            desc: "",
          },
          {
            nome: "Cortesia de Caçadora",
            desc: "",
          },
          {
            nome: "A Coisa que Ela Caça",
            desc: "",
          },
        ],
      },
      {
        nome: "Irmã Nell (Av.7 — a caçadora que se descobriu)",
        tipo: "Silente ancorada",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "12 m",
        dv: "8",
        pv: "48",
        ca: "18",
        jp: "9",
        moral: "12",
        xp: 875,
        conceito: "Humanoide",
        ataques: [
          { nome: "Lâminas de ônix", qtd: 2, bonus: 9, dano: "1d6+4" },
        ],
        habilidades: [
          {
            nome: "Ônix contra o que Ela É",
            desc: "",
          },
          {
            nome: "Terreno Preparado",
            desc: "",
          },
          {
            nome: "Não Cansa",
            desc: "",
          },
          {
            nome: "A Âncora",
            desc: "",
          },
          {
            nome: "Redimível",
            desc: "",
          },
        ],
      },
      {
        nome: "Irmã Nell (observando)",
        tipo: "Silente ancorado (não sabe)",
        alinhamento: "Neutro",
        movimento: "12 m",
        dv: "6",
        pv: "30",
        ca: "17",
        jp: "11",
        moral: "10",
        xp: 900,
        descricao: "Caçadora de impuros dos Colégios, criada sem saber o que é. NESTA AVENTURA ELA NÃO LUTA. BA +6.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Espada curta de ônix", qtd: 2, bonus: 8, dano: "1d6+3" },
        ],
        habilidades: [
          {
            nome: "Farejar o Impuro",
            desc: "Sabe, a até 30 m e sem teste, se alguém à vista é arcanista, Silente, Cambion ou originário. É assim que ela caça — e é assim que ela nunca percebeu que o sinal mais forte da sala é o dela própria.",
          },
          {
            nome: "Não Cansa",
            desc: "Não dorme, não come mais do que aparência exige, não adoece. Ela acha que é disciplina.",
          },
          {
            nome: "Papel nesta aventura",
            desc: "Aparece três vezes: no Degrau (Cena 1), na Cava (uma eliminatória) e na arquibancada da final. Nunca fala. Na terceira vez, encara por três segundos. A redenção dela depende de conversas acumuladas ao longo de seis aventuras — e a primeira delas é o grupo simplesmente NOTAR que ela está lá.",
          },
        ],
      },
      {
        nome: "Irmãos Ferrolho (Teo e Anselmo)",
        tipo: "Humano",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "3",
        pv: "16",
        ca: "15",
        jp: "14",
        moral: "11",
        xp: "200 (o par)",
        descricao: "Gêmeos Sem-Hora de 19 anos lutando pela própria casta. Dois corpos, um instinto. BA +3 cada.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Machadinha", qtd: 1, bonus: 4, dano: "1d6+1" },
        ],
        habilidades: [
          {
            nome: "Um Só Corpo",
            desc: "Enquanto os dois estiverem de pé e adjacentes, ambos ganham +2 nos ataques e não podem ser flanqueados. Se um cai, o outro perde o bônus e entra em fúria: +2 no dano, –2 na CA.",
          },
          {
            nome: "Não Erguem a Palma",
            desc: "Não se rendem e não testam Moral. Vencer as Provações é a única saída de casta que existe para eles, e os dois sabem disso desde os nove anos.",
          },
          {
            nome: "Saída marcada",
            desc: "Podem ser derrubados com dano não-letal, e nesse caso acordam humilhados e vivos. Um grupo que os poupe publicamente ganha +1 de Favor e dois admiradores para o resto da campanha.",
          },
        ],
      },
      {
        nome: "Lanceiro do Auspício",
        tipo: "Humano",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "2",
        pv: "11",
        ca: "15",
        jp: "15",
        moral: "9",
        xp: 35,
        descricao: "Infantaria profissional do Auspício Sétimo. Luta em fileira de três. BA +2.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Lança longa", qtd: 1, bonus: 3, dano: "1d8" },
        ],
        habilidades: [
          {
            nome: "Fileira Cerrada",
            desc: "Com 3+ Lanceiros lado a lado, todos ganham +1 na CA e atacam antes de quem os investe.",
          },
          {
            nome: "Disciplina de Ordem",
            desc: "Só testa Moral quando um oficial cai ou quando metade da fileira é derrubada.",
          },
        ],
      },
      {
        nome: "Leva de Fé",
        tipo: "Humano",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "1",
        pv: "5",
        ca: "12",
        jp: "16",
        moral: "7",
        xp: 15,
        descricao: "Camponês triárcio convocado. Lança, fé e nenhum treinamento. BA +1.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Lança", qtd: 1, bonus: 1, dano: "1d6" },
        ],
        habilidades: [
          {
            nome: "Oração de Fileira",
            desc: "Enquanto houver um Inquisidor Lunar a até 18 m e à vista, a Moral sobe para 10. Se o Inquisidor cai, testam Moral 2d6 imediatamente.",
          },
          {
            nome: "Não Queriam Vir",
            desc: "Um Leva que falhe no teste de Moral não foge do campo: ajoelha-se e larga a lança. Matá-lo ajoelhado é possível e nenhum PJ decente esquece disso.",
          },
        ],
      },
      {
        nome: "Leva de Fé (tropa triárcia)",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "1",
        ca: "14",
        jp: "4",
        moral: "7",
        xp: 35,
        conceito: "Humanoide",
        ataques: [
          { nome: "Lança de leva", qtd: 1, bonus: 2, dano: "1d6" },
        ],
        habilidades: [
          {
            nome: "Formação de Leva",
            desc: "",
          },
          {
            nome: "Gente, não Soldado",
            desc: "",
          },
        ],
      },
      {
        nome: "Punho de Cinza",
        tipo: "Humano",
        alinhamento: "Ordeiro",
        movimento: "6 m",
        dv: "5",
        pv: "34",
        ca: "18",
        jp: "11",
        moral: "12",
        xp: 600,
        descricao: "Guarda pessoal de Vare Ostrim. Malho de duas mãos e placa de ônix pilhado. BA +5.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Malho de ônix", qtd: 1, bonus: 7, dano: "2d6+3" },
        ],
        habilidades: [
          {
            nome: "Golpe de Derrubada",
            desc: "Um alvo atingido faz JPD ou cai caído (levantar custa metade do movimento e concede Ajuste Fácil aos ataques contra ele naquela rodada).",
          },
          {
            nome: "Placa Pilhada",
            desc: "A armadura é de ônix breoniano confiscado: reduz em 2 o dano de qualquer fonte necrótica ou de magia divina.",
          },
          {
            nome: "Ninguém Passa",
            desc: "Só pode ser ultrapassado num corredor por quem vencer um teste oposto de Força. Falhando, o personagem para e leva um ataque.",
          },
        ],
      },
      {
        nome: "Sargento Adem Vosk",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "2",
        pv: "13",
        ca: "15",
        jp: "5",
        moral: "9",
        xp: 120,
        descricao: "Cronista rebaixado a serviço de estrada. Entediado, competente, sem crueldade. BA +2.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Espada curta", qtd: 1, bonus: 3, dano: "1d6+1" },
          { nome: "Besta leve", qtd: 1, bonus: 3, dano: "1d6" },
        ],
        habilidades: [
          {
            nome: "Ele Não Quer Isso",
            desc: "Se o grupo oferecer rendição ou suborno a qualquer momento do combate, Vosk aceita — e falha o teste de Moral de propósito para justificar aos seus. Marque isto: é o inimigo-que-se-resolve-por-conversa desta aventura.",
          },
          {
            nome: "Ordem de Retirada",
            desc: "Ao cair a 1/3 dos PV, ordena que o mais novo leve o relato. Piro Menna sai correndo. Alguém tem que decidir o que fazer com isso.",
          },
        ],
      },
      {
        nome: "Soldado de Estrada (Triarcis)",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "1",
        pv: "6",
        ca: "14",
        jp: "4",
        moral: "8",
        xp: 25,
        descricao: "Levas triárcias em serviço de fronteira. Lança, escudo, couro batido. BA +1.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Lança", qtd: 1, bonus: 2, dano: "1d6+1" },
        ],
        habilidades: [
          {
            nome: "Formação de Posto",
            desc: "Com 3+ soldados lado a lado, +1 na CA e o Moral sobe para 10 enquanto o sargento estiver de pé.",
          },
          {
            nome: "Corneta",
            desc: "Um soldado gasta a rodada tocando: qualquer patrulha a até 3 km converge em 1d6 turnos.",
          },
        ],
      },
      {
        nome: "Tolmo Quebrantar",
        tipo: "Humano",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "6",
        pv: "44",
        ca: "16",
        jp: "11",
        moral: "12",
        xp: 1000,
        descricao: "Fundidor de sinos, 2,10 m, campeão surpresa do Colégio Lunar. Não vai matar ninguém. BA +6.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Barra de fundição", qtd: 1, bonus: 9, dano: "2d6+4" },
        ],
        habilidades: [
          {
            nome: "Quebra-Armas",
            desc: "Em vez de atacar, pode golpear a arma ou o escudo de um oponente. Ataque contra CA 14; sucesso destrói o item (escudos e armas comuns) ou, se for mágico, o item faz JP com bônus igual ao dobro do próprio bônus mágico. É o ataque que ele PREFERE.",
          },
          {
            nome: "Não Mata",
            desc: "Nunca reduz um oponente abaixo de 1 PV. Um golpe que mataria deixa o alvo caído e inconsciente. Se derruba alguém, PARA e espera a pessoa se levantar. Se alguém se rende, ajuda a levantar e pede desculpa.",
          },
          {
            nome: "Braço de Fundição",
            desc: "Imune a desarme e a derrubada. Não pode ser empurrado por Força inferior à dele.",
          },
          {
            nome: "Resolvível por conversa",
            desc: "Tolmo não sabe o que está fazendo ali: disseram-lhe que era 'prova de humildade' e que o prêmio era um telhado. Qualquer PJ que fale com ele em vez de bater descobre isso em duas ou três trocas. Explicar-lhe a verdade — ou prometer o telhado — o faz erguer a própria palma. Nenhum teste é obrigatório; se a mesa quiser dados, Carisma (1 em 1d6) com Ajuste Fácil, uma tentativa por rodada.",
          },
          {
            nome: "Se poupado",
            desc: "Aliado recorrente da campanha. Não lê, não entende política, recusa armas com gume — e é o coração moral do grupo dali em diante.",
          },
        ],
      },
      {
        nome: "Vare Ostrim, Inquisidor-Comandante",
        tipo: "Humano",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "9",
        pv: "78",
        ca: "20",
        jp: "8",
        moral: "12",
        xp: 3000,
        descricao: "O rosto da ocupação em Breônia. Convicto, sereno, competente. NÃO É PARA SER DERROTADO NESTA AVENTURA. BA +9.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Espada do Auspício", qtd: 2, bonus: 11, dano: "1d10+5" },
          { nome: "Escudo (empurrão)", qtd: 1, bonus: 11, dano: "1d6+5 e JPD ou caído" },
        ],
        habilidades: [
          {
            nome: "Suspensão de Graça",
            desc: "Uma vez por combate, declara um alvo 'suspenso'. Aquele alvo não pode ser curado por magia divina até o fim do combate. Ostrim considera isto um ato administrativo, não um ataque.",
          },
          {
            nome: "Serenidade",
            desc: "Imune a Medo, encanto e a qualquer efeito que dependa de emoção. Nunca testa Moral e nunca corre.",
          },
          {
            nome: "Conjuração Lunar",
            desc: "Conjura como Clérigo de 6º nível.",
          },
          {
            nome: "A Papelada",
            desc: "Ostrim prefere prisioneiros a cadáveres quando o alvo tem valor administrativo — nobres, arcanistas registrados, Silentes. Isto é a razão pela qual Ysolde sobrevive à Cena 5, e é a razão pela qual PJs capturados continuam vivos.",
          },
        ],
      },
      {
        nome: "Vela-Cega (conjuradora do Colégio Lunar)",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "4",
        ca: "14",
        jp: "6",
        moral: "8",
        xp: 200,
        conceito: "Humanoide",
        ataques: [
          { nome: "Bastão de ferro-vela", qtd: 1, bonus: 4, dano: "1d6" },
        ],
        habilidades: [
          {
            nome: "Rito da Dispensa",
            desc: "",
          },
          {
            nome: "Lume Frio",
            desc: "",
          },
          {
            nome: "Olhos Cobertos",
            desc: "",
          },
        ],
      },
      {
        nome: "Vigário de Campanha Halbert Sem",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "5",
        pv: "26",
        ca: "16",
        jp: "7",
        moral: "10",
        xp: 265,
        conceito: "Humanoide",
        ataques: [
          { nome: "Maça bento-ferrada", qtd: 1, bonus: 5, dano: "1d6+2" },
        ],
        habilidades: [
          {
            nome: "Cura de Campo",
            desc: "",
          },
          {
            nome: "Coragem Emprestada",
            desc: "",
          },
          {
            nome: "Rito da Dispensa",
            desc: "",
          },
        ],
      },
      {
        nome: "Yurga Mão-de-Cal",
        tipo: "Orc do Sol Poente",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "6",
        pv: "40",
        ca: "16",
        jp: "8",
        moral: "12",
        xp: 375,
        conceito: "Humanoide",
        ataques: [
          { nome: "Marreta de estivador", qtd: 1, bonus: 8, dano: "1d10+3" },
        ],
        habilidades: [
          {
            nome: "Força Contida",
            desc: "",
          },
          {
            nome: "A Voz Antes da Espada",
            desc: "",
          },
          {
            nome: "Não Cai Fácil",
            desc: "",
          },
        ],
      },
    ],
  },
  {
    folder: "Ameaças da Campanha — Arco 2",
    monstros: [
      {
        nome: "Aurelia Vantris, Legada do Concordato de Arcanita",
        tipo: "Humana (Colégio Estelar)",
        tamanho: "Médio",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "14",
        pv: "96",
        ca: "20",
        jp: "5",
        moral: "12",
        xp: 3025,
        conceito: "Humanoide",
        ataques: [
          { nome: "Bastão de lacre", qtd: 2, bonus: 14, dano: "1d6+6" },
        ],
        habilidades: [
          {
            nome: "Ordem Executória",
            desc: "",
          },
          {
            nome: "Palavra Terminal",
            desc: "",
          },
          {
            nome: "A Matriz",
            desc: "",
          },
          {
            nome: "Registrado",
            desc: "",
          },
          {
            nome: "Não Corre",
            desc: "",
          },
        ],
      },
      {
        nome: "Batedor Drow",
        tipo: "Drow",
        alinhamento: "Caótico",
        movimento: "12 m",
        dv: "3",
        pv: "15",
        ca: "16",
        jp: "14",
        moral: "8",
        xp: 200,
        descricao: "Olheiro de túnel. Não luta se puder correr, e quase sempre pode. BA +3.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Besta de mão (virote entorpecido)", qtd: 1, bonus: 4, dano: "1d4 e JPC ou -2 em ataques por 1d4 rodadas" },
        ],
        habilidades: [
          {
            nome: "Conhece a Saída",
            desc: "Uma vez por combate, move-se o dobro e não provoca ataque de oportunidade.",
          },
          {
            nome: "Avisa",
            desc: "Se escapar, o próximo encontro drow desta aventura acontece preparado. Se não escapar, não acontece.",
          },
        ],
      },
      {
        nome: "Brasa da Irmandade",
        tipo: "Humano",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "1",
        pv: "6",
        ca: "13",
        jp: "16",
        moral: "9",
        xp: 25,
        descricao: "Iniciado de dezesseis a vinte anos, ainda sem a Vigília do Degelo. BA +1.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Lança curta", qtd: 1, bonus: 1, dano: "1d6" },
        ],
        habilidades: [
          {
            nome: "Aprendendo",
            desc: "Ao lado de um Fulgor ou Incandescente, ataca com Ajuste Fácil e não testa Moral.",
          },
          {
            nome: "Vinte e Cinco por Cento",
            desc: "Um em cada quatro não passa da Vigília do Degelo. Todo mundo em Vornfell sabe qual é a proporção, inclusive eles.",
          },
        ],
      },
      {
        nome: "Cantor de Fio",
        tipo: "Drow",
        alinhamento: "Caótico",
        movimento: "9 m",
        dv: "5",
        pv: "26",
        ca: "15",
        jp: "12",
        moral: "12",
        xp: 800,
        descricao: "Operador do Tear Suspenso. Não é guerreiro; é técnico. Trabalha até o fim. BA +4.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Estilete ritual", qtd: 1, bonus: 4, dano: "1d4+1" },
        ],
        habilidades: [
          {
            nome: "Puxar o Fio",
            desc: "Uma vez por rodada, contra um alvo a até 18 m: JPS ou o alvo perde a ação da rodada, imóvel, ouvindo. Não funciona em quem estiver em voo (falta de estabilidade — a mesma razão pela qual não há magia no ar).",
          },
          {
            nome: "Não É Pessoal",
            desc: "Aceita rendição, oferece rendição e responde perguntas com precisão. Nunca mente e nunca ajuda. Se capturado, é a melhor fonte de informação sobre o Pacto do Fio disponível no Arco 2.",
          },
          {
            nome: "Termina o Trabalho",
            desc: "Se o Tear estiver a menos de 2 rodadas do despejo, ignora todo o resto e trabalha, mesmo sendo atacado.",
          },
        ],
      },
      {
        nome: "Cantor-Mor Isque",
        tipo: "Drow (Coro do Fio)",
        tamanho: "Médio",
        alinhamento: "Neutro",
        movimento: "12 m",
        dv: "10",
        pv: "58",
        ca: "19",
        jp: "8",
        moral: "12",
        xp: 1550,
        conceito: "Humanoide",
        ataques: [
          { nome: "Estilete de fiar", qtd: 2, bonus: 11, dano: "1d6+4" },
        ],
        habilidades: [
          {
            nome: "A Cadência Maior",
            desc: "",
          },
          {
            nome: "Não Odeia Ninguém",
            desc: "",
          },
          {
            nome: "Ele Responde",
            desc: "",
          },
          {
            nome: "O Último Nó",
            desc: "",
          },
        ],
      },
      {
        nome: "Cavaleiro-Inquisidor Fulgêncio Solaz",
        tipo: "Humano (Colégio Lunar, Casta Cronista)",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "11",
        pv: "70",
        ca: "20",
        jp: "9",
        moral: "10",
        xp: 1975,
        conceito: "Humanoide",
        ataques: [
          { nome: "Espada-oração de Sela-Alta", qtd: 3, bonus: 13, dano: "1d8+5" },
        ],
        habilidades: [
          {
            nome: "O Melhor Duelista Deste Campo",
            desc: "",
          },
          {
            nome: "General Medíocre",
            desc: "",
          },
          {
            nome: "A Plateia",
            desc: "",
          },
          {
            nome: "Palavra de Cavaleiro",
            desc: "",
          },
          {
            nome: "Rito Maior da Dispensa",
            desc: "",
          },
        ],
      },
      {
        nome: "Colosso de Fio (interior)",
        tipo: "Construto",
        tamanho: "Enorme",
        alinhamento: "Caótico",
        movimento: "6 m",
        dv: "11",
        pv: "70",
        ca: "20",
        jp: "9",
        moral: "12",
        xp: 3000,
        descricao: "Se os PJs abrirem um. Sete metros de ferro triárcio e ossos drow, movido por onze pessoas amarradas no compartimento central, conscientes. BA +9.",
        conceito: "Constructo",
        ataques: [
          { nome: "Braço de bigorna", qtd: 2, bonus: 12, dano: "2d8+6" },
          { nome: "Sopro de fio", qtd: 1, bonus: 0, dano: "5d6 em linha de 18 m, JPD para metade" },
        ],
        habilidades: [
          {
            nome: "Movido a Gente",
            desc: "Onze pessoas no compartimento. Cada uma libertada reduz o Poder da unidade em 1 e o dano do Colosso em 1d8. Libertar todas as onze o desliga — e as onze não conseguem andar sozinhas, e alguém vai ter que carregá-las através de uma batalha.",
          },
          {
            nome: "Ígnea",
            desc: "Em batalha em massa: a unidade que perder para um Colosso perde 4 de Poder em vez de 2.",
          },
          {
            nome: "A Escotilha",
            desc: "Abrir por fora exige teste de Força (1 em 1d6) com Ajuste Difícil, ou uma ação de Tolmo Quebrantar, que faz isso sem rolar e sem comentar.",
          },
        ],
      },
      {
        nome: "Confessor-Primeiro Sabien Auvray",
        tipo: "Humano (arcanista converso)",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "9",
        pv: "55",
        ca: "18",
        jp: "11",
        moral: "12",
        xp: 2400,
        descricao: "Quarenta e um anos, arkadiano, Arcano Pleno de Fluxos de Quintessência até nove meses atrás. Hoje comanda os Inquisidores Lunares. Educado, lúcido, feliz. BA +8.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Vara de anúncio", qtd: 2, bonus: 10, dano: "1d8+4" },
        ],
        habilidades: [
          {
            nome: "A Conta Conferida",
            desc: "Conhece arcanismo por dentro. Toda magia arcana lançada contra ele concede a ele JPS com Ajuste Fácil; se passar, a magia é redirecionada ao conjurador com metade do efeito. Contra milagres divinos ele não tem defesa nenhuma, e sabe disso, e acha justo.",
          },
          {
            nome: "Puxar o Fio",
            desc: "1x/combate. Um alvo a até 18 m faz JPC ou começa a INVERTER: 2d6 por rodada durante 3 rodadas, e a pele vira quartzo. Interrompível por qualquer aliado que gaste uma ação inteira segurando a pessoa e dizendo o nome dela em voz alta. Foi assim que Théon Vaskiris morreu.",
          },
          {
            nome: "Petrificar",
            desc: "1x/combate, toque. JPC ou suspensão de fluxo: o alvo vira estátua morna e viva. Reversível pelos métodos da Cena 13. Não é morte e ele fará questão de esclarecer isso.",
          },
          {
            nome: "A Alavanca",
            desc: "Ler em voz alta algo escrito pelo próprio Auvray de antes da conversão o paralisa: ele perde a ação e o grupo tem UMA rodada em que acerta automaticamente e ele falha automaticamente em toda JP. Funciona uma única vez.",
          },
          {
            nome: "A Conta Refeita",
            desc: "GATILHO: depois de A Alavanca ser usada. Pelo resto do combate, +2 nos ataques, +4 de dano, e imunidade a medo, encanto e a qualquer tentativa de persuasão. Ele agradece pela lembrança.",
          },
          {
            nome: "Ele Para",
            desc: "Ao chegar a 20 PV, senta-se e encerra o combate. Entrega o Selo. Não é rendição: é ele terminando de coletar o dado que veio coletar.",
          },
        ],
      },
      {
        nome: "Construto de Arcanita (desgovernado)",
        tipo: "Construto",
        tamanho: "Grande",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "7",
        pv: "40",
        ca: "18",
        jp: "12",
        moral: "12",
        xp: 1100,
        descricao: "Três metros de cristal fosco e latão, com um núcleo de Arcanita bruta no peito. Não odeia. Organiza. BA +7.",
        conceito: "Constructo",
        ataques: [
          { nome: "Braço de arrumação", qtd: 2, bonus: 9, dano: "1d10+3" },
        ],
        habilidades: [
          {
            nome: "Reclassificação",
            desc: "Não ataca para matar. Um alvo reduzido a 0 PV fica caído e estável, e o Construto o levanta e o empilha. Um personagem empilhado precisa de uma ação de outro para ser tirado da pilha; se a pilha chegar a quatro corpos, o de baixo começa a sofrer 1d6 por rodada de esmagamento.",
          },
          {
            nome: "Núcleo Instável",
            desc: "Ao ser destruído, o núcleo estilhaça: JPD a 3 m ou 3d6 de dano arcano. O Hex/área vira NÉVOA DO BREU pelo resto da cena — magia e milagres rolam um nível abaixo ali.",
          },
          {
            nome: "Imune ao Sopro",
            desc: "Não respira, não sangra, não testa Moral, imune a veneno, medo, encanto, sono e crítico.",
          },
          {
            nome: "Comando de Parada",
            desc: "Três fonemas de Arkanes na cadência certa o param por 1d4 rodadas. Teste de Inteligência (1 em 1d6); Ajuste Difícil para quem não fala Arkanes, automático para arkanim. Não funciona duas vezes na mesma unidade.",
          },
        ],
      },
      {
        nome: "Devorador de Selo",
        tipo: "Aberração",
        alinhamento: "Caótico",
        movimento: "6 m",
        dv: "8",
        pv: "52",
        ca: "18",
        jp: "10",
        moral: "12",
        xp: 2000,
        descricao: "O que a Velha Irmandade selou nas Cavernas Profundas. Uma coluna de coisa fria que empurra contra o mundo, e o mundo range. BA +7.",
        conceito: "Humanoide Monstruoso",
        ataques: [
          { nome: "Investida fria", qtd: 2, bonus: 9, dano: "2d6+3 e JPC ou -1 de Constituição até descanso longo" },
        ],
        habilidades: [
          {
            nome: "Anterior ao Escuro",
            desc: "Não é morto-vivo e não é afetado por Afastar Mortos-Vivos. Imune a frio, veneno e medo.",
          },
          {
            nome: "Onde a Pressão Entra",
            desc: "Enquanto estiver a menos de 30 m do selo rompido, regenera 5 PV por rodada. Longe do selo, não regenera nada — e ele sabe disso, e não se afasta.",
          },
          {
            nome: "Fogo é Fogo",
            desc: "Dano de fogo o afeta normalmente e interrompe a regeneração por uma rodada. É literalmente por isso que a Irmandade Voraz existe.",
          },
          {
            nome: "Saída marcada",
            desc: "Deslocamento 6 e não deixa a área do selo. Um grupo que corra escapa sempre. Diga isso à mesa.",
          },
        ],
      },
      {
        nome: "Diretora-Comandante Ordelia Renzo",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "7",
        pv: "38",
        ca: "17",
        jp: "11",
        moral: "11",
        xp: 1200,
        descricao: "Cinquenta e três anos, AnoMinas e Guarda da Cratera, onze dias em pé dentro de uma caixa de luz. A única do Diretorado que já viu uma guerra. BA +7.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Sabre de mina", qtd: 2, bonus: 9, dano: "1d8+3" },
        ],
        habilidades: [
          {
            nome: "Onze Dias",
            desc: "Esteve consciente o tempo todo. Sabe exatamente quantos dias passaram, o que foi dito à sua frente e por quem. Não perdoa nenhum dos quatro, e vota sim de qualquer maneira.",
          },
          {
            nome: "Comando",
            desc: "Se sair viva, comanda os Fuzileiros do SUF na Aventura 16. A unidade deixa de ser Destreinada enquanto ela estiver em campo, e ganha +1 de Poder no primeiro combate de cada batalha.",
          },
          {
            nome: "A Acusação",
            desc: "Entrar na câmara do Diretorado com ela derruba Karthus Malvaggio na hora: a Guarda da Cratera responde a ela, não ao governo. O voto contrário dele deixa de existir.",
          },
        ],
      },
      {
        nome: "Draska Vell-Ferro, capitã da Corda Curta",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "6",
        pv: "34",
        ca: "17",
        jp: "12",
        moral: "9",
        xp: 700,
        descricao: "Benellikovana, quarenta e quatro anos, cinco meses vigiando estátuas por ouro triárcio. Profissional. Cansada. Não é má pessoa e não é uma boa pessoa. BA +6.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Lança curta de cratera", qtd: 2, bonus: 8, dano: "1d8+2" },
        ],
        habilidades: [
          {
            nome: "Conta de Cabeça",
            desc: "Levanta a mão e negocia na primeira rodada de qualquer combate em que esteja em desvantagem numérica ou de nível. SEMPRE. Nunca ataca primeiro.",
          },
          {
            nome: "Os Onze",
            desc: "Dez mercenários (DV 2, CA 15, 11 PV, lança 1d8) que fazem exatamente o que ela manda e param exatamente quando ela para.",
          },
          {
            nome: "Não Sabia",
            desc: "Disseram a ela que as estátuas eram um projeto de arte. Mostrar-lhe a verdade — de preferência despetrificando alguém na frente dela — permite teste de Carisma (1 em 1d6) com Ajuste Fácil para virá-la de lado sem pagar nada.",
          },
          {
            nome: "O que ela vale depois",
            desc: "Contratada, vira a unidade COMPANHIA DA CORDA CURTA na Aventura 16 — Poder 6, Desl 2, Contrainvestida · Destreinada. Convertida pela verdade em vez de por ouro, não testa Moral na primeira batalha.",
          },
        ],
      },
      {
        nome: "Enxameiro Mantis",
        tipo: "Monstro",
        alinhamento: "Neutro",
        movimento: "15 m",
        dv: "5",
        pv: "30",
        ca: "16",
        jp: "12",
        moral: "10",
        xp: 500,
        descricao: "Batedor dos Clãs Mantis das Areias Esquecidas. Não conquista: come e vai embora. BA +5.",
        conceito: "Humanoide Monstruoso",
        ataques: [
          { nome: "Foices frontais", qtd: 2, bonus: 6, dano: "1d8+2" },
        ],
        habilidades: [
          {
            nome: "Conta e Volta",
            desc: "Diante de quatro ou mais oponentes, recua sem lutar e leva o número exato ao clã. Não é covardia: é reconhecimento, e é a razão pela qual Durgrann tem medo.",
          },
          {
            nome: "Mineração é Sacrilégio",
            desc: "Ataca preferencialmente quem carrega ferramenta de escavação ou minério bruto, mesmo que haja alvos melhores.",
          },
          {
            nome: "Saída marcada",
            desc: "Deslocamento 15. Nunca persegue além de 60 m. Um grupo que recue está seguro, e isso vale dizer à mesa.",
          },
        ],
      },
      {
        nome: "Fiado",
        tipo: "Morto-vivo tecido",
        tamanho: "Médio",
        alinhamento: "Caótico",
        movimento: "12 m",
        dv: "4",
        pv: "18",
        ca: "15",
        jp: "6",
        moral: "12",
        xp: 200,
        conceito: "Morto-Vivo",
        ataques: [
          { nome: "Mãos com fio", qtd: 2, bonus: 5, dano: "1d6" },
        ],
        habilidades: [
          {
            nome: "Foi Alguém",
            desc: "",
          },
          {
            nome: "Atravessa a Parede",
            desc: "",
          },
          {
            nome: "Reposto",
            desc: "",
          },
        ],
      },
      {
        nome: "Fiandeira",
        tipo: "Drow",
        alinhamento: "Caótico",
        movimento: "6 (voo 24, montada)",
        dv: "5",
        pv: "29",
        ca: "17",
        jp: "12",
        moral: "11",
        xp: 700,
        descricao: "Cavaleira drow montada num versperto — construto alado de asa membranosa e sem cabeça. Luta com lança de fio e não fala. BA +5.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Lança de fio", qtd: 1, bonus: 6, dano: "1d10+2" },
        ],
        habilidades: [
          {
            nome: "Rasante",
            desc: "Ataque mergulhando: Ajuste Difícil no ataque; se acertar alvo surpreso, dano dobrado (LB2 cap.7).",
          },
          {
            nome: "Ancoragem",
            desc: "Um alvo reduzido a 0 PV pela lança de fio não morre: fica ancorado, inconsciente e com um filamento preso à nuca. Cortar o filamento nas primeiras 24 h liberta sem sequela; depois disso, não.",
          },
          {
            nome: "O Versperto",
            desc: "A montaria tem CA 15 e 14 PV separados. Destruída, a Fiandeira cai — e drow não usam correia de segurança.",
          },
          {
            nome: "Sem Voz",
            desc: "Não conjura, não grita, não se rende e não testa Moral enquanto o Tear Suspenso estiver no ar.",
          },
        ],
      },
      {
        nome: "Guarda da Barreira (Magitécnicos)",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "6",
        pv: "32",
        ca: "18",
        jp: "12",
        moral: "10",
        xp: 700,
        descricao: "Segurança privada de Karthus Malvaggio, equipada com o que a cratera fabrica e não vende. BA +6.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Arcabuz de cratera", qtd: 1, bonus: 8, dano: "2d6+2" },
          { nome: "Bastão de descarga", qtd: 1, bonus: 8, dano: "1d8+2" },
        ],
        habilidades: [
          {
            nome: "Ignora Armadura",
            desc: "O arcabuz ignora bônus de CA vindos de armadura não-mágica. É a assinatura de Benellikov e é o motivo pelo qual a Aliança os quer.",
          },
          {
            nome: "Recarga",
            desc: "Só dispara em rodadas ímpares. Nas pares, saca o bastão ou recua. Um grupo que conte as rodadas domina a cena.",
          },
          {
            nome: "Célula de Bolso",
            desc: "1x cada, ação: um alvo a até 9 m faz JPC ou fica PARALISADO por 1d4 rodadas num cubo de luz. Não causa dano. É como Ordelia foi presa, e ver isso acontecer com um PJ ensina a mesa o que aconteceu com ela.",
          },
        ],
      },
      {
        nome: "Guardião do Arco — Colosso de Fio",
        tipo: "Construto (drow/triárcio)",
        tamanho: "Enorme",
        alinhamento: "Neutro",
        movimento: "6 m",
        dv: "12",
        pv: "78",
        ca: "19",
        jp: "6",
        moral: "12",
        xp: 2250,
        conceito: "Constructo",
        ataques: [
          { nome: "Braço de forja", qtd: 2, bonus: 13, dano: "2d8+5" },
          { nome: "Sopro de fiação", qtd: 1, bonus: "—", dano: "4d6" },
        ],
        habilidades: [
          {
            nome: "Movido a Gente",
            desc: "",
          },
          {
            nome: "Sopro de Fiação",
            desc: "",
          },
          {
            nome: "Passo que Racha",
            desc: "",
          },
          {
            nome: "A Válvula",
            desc: "",
          },
        ],
      },
      {
        nome: "Incandescente",
        tipo: "Humano",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "6",
        pv: "38",
        ca: "17",
        jp: "11",
        moral: "12",
        xp: 900,
        descricao: "Veterano de Vornfell, com direito de executar por traição. Onze deles vivos. BA +6.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Lâmina aquecida", qtd: 2, bonus: 8, dano: "1d8+3 (+1d6 de fogo)" },
        ],
        habilidades: [
          {
            nome: "Marca Voraz",
            desc: "Um traço por monstruosidade maior abatida. Contra criaturas com 6 ou mais DV, ataca com Ajuste Fácil.",
          },
          {
            nome: "Julgamento Sumário",
            desc: "Pode declarar traição a um alvo à vista. Enquanto a declaração estiver de pé, todos os membros da Irmandade a até 30 m atacam preferencialmente aquele alvo. Só se retira publicamente.",
          },
          {
            nome: "Não Recua",
            desc: "Nunca testa Moral enquanto houver uma fogueira acesa à vista.",
          },
        ],
      },
      {
        nome: "Legada-Menor Sabra Tovin",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "3",
        pv: "12",
        ca: "11",
        jp: "14",
        moral: "8",
        xp: 0,
        descricao: "Notária de tratados do Colégio Estelar, cinquenta e dois anos, trinta de ofício. Desarmada, sozinha, e lê o que assina. NÃO É UM COMBATE. BA +2.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Não luta", qtd: 0, bonus: 0, dano: "—" },
        ],
        habilidades: [
          {
            nome: "Parlamento",
            desc: "Atacá-la aciona o santuário do mensageiro da Ordem do Corvo: bloqueio total de comunicações da Aliança, e TODAS as unidades aliadas perdem 1 de Poder na Batalha Principal. A Legião de Ferro registra, e o registro reaparece no Arco 3.",
          },
          {
            nome: "Os Termos",
            desc: "Quatro dos cinco itens são verdadeiros e seriam cumpridos. O item 4 (Aurelia devolvida viva em trinta dias) é a única mentira, e Sabra não sabe — ela perguntou sobre o prazo de verificação e não foi respondida, e vai contar isso ao grupo na porta da tenda.",
          },
          {
            nome: "Se tratada bem",
            desc: "Um PJ que escreva de verdade uma resposta escrita a conquista. No Arco 3 ela é a pessoa que abre a porta que ninguém abre.",
          },
        ],
      },
      {
        nome: "Mestre Umbral, Cardeal do Colégio Lunar",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "14",
        pv: "85",
        ca: "21",
        jp: "6",
        moral: "12",
        xp: 12000,
        descricao: "Setenta e poucos anos, magro, olhos bons, sem capuz pela primeira vez em oitenta e três anos. Não é fanático — é o único que não é. Não grita, não ameaça e não mente sobre o que faz. BA +12.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Báculo de escrutínio", qtd: 2, bonus: 14, dano: "1d8+6" },
          { nome: "Toque da Dispensa", qtd: 1, bonus: 14, dano: "4d6 + JPC ou paralisia 1d4 rodadas" },
        ],
        habilidades: [
          {
            nome: "O Devedor",
            desc: "Carrega o nó vivo do Pacto do Fio no esterno. Enquanto o Pacto estiver de pé, Umbral NÃO PODE MORRER nesta aventura: ao ser reduzido a 0 PV, o Fio o retira do campo instantaneamente e ele reaparece a 300 m, ferido e calmo. A Tecelã protege o devedor. Cortar o Pacto é objetivo do Arco 3, não desta cena.",
          },
          {
            nome: "A Conexão",
            desc: "Fala dentro da cabeça de qualquer comandante seu no continente. Em batalha em massa, isso se traduz em: uma vez por turno, refaz a rolagem de Poder de QUALQUER unidade aliada dele, em qualquer Hex, sem limite de distância.",
          },
          {
            nome: "Rito Maior da Dispensa",
            desc: "3x/combate. JPS ou 6d6 de dano divino num ancorado, Silente ou originário a até 18 m. Metade do dano com JP bem-sucedida. Ele prioriza Ancorados, sempre, porque é o que a contabilidade manda.",
          },
          {
            nome: "Sentença Registrada",
            desc: "1x/combate, ação. Diz o nome completo de um PJ e a data em que ele nasceu. JPS ou o alvo fica INCAPAZ DE ATACÁ-LO por 1d4 rodadas — não medo, reconhecimento: ele sabe quem você é e você entende, no osso, que sempre soube.",
          },
          {
            nome: "Não Se Expõe",
            desc: "Nunca fica em combate corpo a corpo por mais de 3 rodadas. Na quarta, retira-se — a pé, sem pressa, por uma saída que ele já tinha. Perseguir é possível e é exatamente o que ele quer que façam.",
          },
          {
            nome: "Ele Não Mata",
            desc: "Nenhum ataque de Umbral reduz um alvo abaixo de 0 PV. Um golpe letal deixa o alvo CAÍDO E CAPTURADO. Impuro morto é desperdício de estoque, e ele não desperdiça.",
          },
          {
            nome: "Sem Alavanca",
            desc: "Imune a medo, encanto, sugestão, intimidação e a qualquer apelo moral. Não porque seja frio: porque já fez todas essas contas, sozinho, doze anos atrás, e chegou onde chegou. Confrontá-lo com o Gambito NÃO o abala — ele agradece a companhia.",
          },
          {
            nome: "A Única Fenda",
            desc: "Umbral responde toda pergunta com honestidade completa. É vaidade, e é a coisa mais humana nele, e é explorável: um grupo que o mantenha falando o mantém PARADO. Cada pergunta genuína que ele responde é uma rodada em que ele não age — e na Cena 7 isso vale a retirada de mil pessoas.",
          },
        ],
      },
      {
        nome: "Operador Acorrentado",
        tipo: "Humanoide (ancorado)",
        alinhamento: "qualquer",
        movimento: "3 (acorrentado) m",
        dv: "1",
        pv: "4",
        ca: "10",
        jp: "16",
        moral: "12",
        xp: 0,
        descricao: "Uma das oitenta e quatro pessoas que fazem o Colosso de Fio funcionar. Consciente, lúcida, e atrasada no turno. NÃO É INIMIGO.",
        conceito: "Humanoide",
        ataques: [
          { nome: "nenhum", qtd: 0, bonus: 0, dano: "—" },
        ],
        habilidades: [
          {
            nome: "A Regeneração é Deles",
            desc: "Enquanto houver operadores trabalhando, o Colosso fecha qualquer brecha em cerca de 40 segundos. Libertar todos desliga a regeneração permanentemente. Esta é a informação central da aventura e ela deve ser DESCOBERTA, nunca explicada.",
          },
          {
            nome: "O Turno",
            desc: "Muitos pedem que o grupo não atrapalhe. Não estão dominados: estão exaustos, ancorados e há meses sem outra estrutura mental além do turno. Um libertado leva 1d6 dias para parar de tentar trabalhar.",
          },
          {
            nome: "A Marca",
            desc: "Queimadura circular na nuca, permanente, e reconhecível a dez passos por qualquer pessoa que já tenha visto uma. É por isso que eles são a prova que o Conselho de Clãs não consegue argumentar contra.",
          },
        ],
      },
      {
        nome: "Ophris Sem-Tom",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "5",
        pv: "22",
        ca: "12",
        jp: "13",
        moral: "6",
        xp: 0,
        descricao: "Vociferante aposentado, corretor de vozes no Mercado de Ares. Não é um combate. É um preço. BA +4.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Não luta", qtd: 0, bonus: 0, dano: "—" },
        ],
        habilidades: [
          {
            nome: "O Aro",
            desc: "Fala através de um aro de arcanita na garganta. O tom sai sempre errado para o conteúdo. Pêsames em tom de piada; ameaças em tom de canção de ninar.",
          },
          {
            nome: "A Barganha",
            desc: "Vende a localização da Agulha, a senha das runas e um aviso verdadeiro por 1 PONTO PERMANENTE de um atributo de um único PJ voluntário. O jogador escolhe o atributo. Recalcule tudo na hora. É irreversível — não existe cura, dissipar, descanso ou reviravolta futura.",
          },
          {
            nome: "Honesto",
            desc: "Não mente, não trapaceia, não tem letra miúda, não guarda um punhal. Entrega exatamente o que prometeu. A via longa das Cenas 9-10 é igualmente real e igualmente funcional; nenhuma das duas é a armadilha.",
          },
          {
            nome: "Catorze",
            desc: "Tem catorze pontos comprados de outras pessoas e não usou nenhum. Quer voltar a cantar uma frase inteira em Arkanes, com o tom certo, uma única vez, porque foi a última coisa que a mulher dele o ouviu não conseguir fazer. Conta se perguntarem.",
          },
        ],
      },
      {
        nome: "SMTLIVRES (braço armado do SUF)",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "4",
        pv: "20",
        ca: "15",
        jp: "13",
        moral: "7",
        xp: 200,
        descricao: "Assalariado da cratera com besta e ordens que não entendeu. Não é fanático e não quer morrer. BA +4.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Besta pesada", qtd: 1, bonus: 6, dano: "1d10+1" },
        ],
        habilidades: [
          {
            nome: "Carga de Pólvora Arcana",
            desc: "Dois dos catorze carregam uma. 3d6 em área de 6 m, JPD para metade, e o terreno atingido vira instável (movimento à metade) pelo resto da cena. Estourar uma carga ANTES do uso reduz o dano ao comboio em 2d6 na rodada seguinte.",
          },
          {
            nome: "Assalariados",
            desc: "Testam Moral 2d6 ao perder o quinto homem e de novo ao perder o oitavo. Debandam com folga. Um grupo que quebre a moral resolve a cena em quatro rodadas sem matar ninguém.",
          },
          {
            nome: "Não Sabem",
            desc: "Nenhum dos catorze sabe por que a estrada foi cortada. Um prisioneiro entrega o intermediário, e o intermediário entrega Fattoreto.",
          },
        ],
      },
      {
        nome: "Sapador de Durgrann",
        tipo: "Anão",
        alinhamento: "Ordeiro",
        movimento: "6 m",
        dv: "4",
        pv: "26",
        ca: "17",
        jp: "13",
        moral: "11",
        xp: 240,
        descricao: "Engenheiro de guerra subterrânea. Escava, escora, mina e derruba. Luta bem e prefere não. BA +4.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Picareta de guerra", qtd: 1, bonus: 5, dano: "1d8+2" },
        ],
        habilidades: [
          {
            nome: "Ler a Pedra",
            desc: "Sabe, sem teste, se um teto vai cair, onde há vazio atrás de uma parede e quanto tempo uma escora aguenta. Num ambiente subterrâneo, nunca é surpreendido.",
          },
          {
            nome: "Escavação Rápida",
            desc: "Quatro sapadores abrem uma passagem por rocha em uma hora, ou derrubam uma galeria em dez minutos. É isto que a habilidade de unidade Subterrânea representa em escala de exército.",
          },
          {
            nome: "Contrainvestida",
            desc: "Recebendo uma investida em corredor ou galeria, ataca primeiro e causa dano dobrado se acertar.",
          },
        ],
      },
      {
        nome: "Águia de Guerra do Vale",
        tipo: "Animal",
        alinhamento: "Neutro",
        movimento: "6 (voo 36) m",
        dv: "4",
        pv: "22",
        ca: "15",
        jp: "13",
        moral: "10",
        xp: 400,
        descricao: "Envergadura de sete metros, arreio de duas pessoas, treinada desde o ovo. Não é montaria: é sócia. BA +4.",
        conceito: "Animal",
        ataques: [
          { nome: "Garras", qtd: 2, bonus: 5, dano: "1d6+2" },
        ],
        habilidades: [
          {
            nome: "Investida em Mergulho",
            desc: "Ataque rasante com Ajuste Difícil; dano dobrado contra alvo surpreso. Em contrainvestida, dano dobrado ao acertar.",
          },
          {
            nome: "Ela Decide",
            desc: "Se o cavaleiro cair da sela preso à correia, a águia interrompe o que estiver fazendo e nivela o voo. Isso custa a ação dela, e ela faz sempre.",
          },
          {
            nome: "Não se Ataca",
            desc: "Matar uma águia no Vale da Águia é execução imediata no local, por qualquer cidadão. Isto não é habilidade da criatura: é a lei, e vale para os PJs.",
          },
        ],
      },
    ],
  },
  {
    folder: "Ameaças da Campanha — Arco 3",
    monstros: [
      {
        nome: "A Procissão",
        tipo: "Concorde (multidão de mente única)",
        tamanho: "Colossal (oito mil corpos)",
        alinhamento: "Neutro",
        movimento: "6 m",
        dv: "20",
        ca: "12",
        jp: "4",
        moral: "12",
        xp: 5050,
        conceito: "Humanoide Monstruoso",
        ataques: [
          { nome: "Corrente humana", qtd: 1, bonus: 20, dano: "3d6" },
        ],
        habilidades: [
          {
            nome: "Não É Um Monstro",
            desc: "",
          },
          {
            nome: "Uma Só Vontade",
            desc: "",
          },
          {
            nome: "Com Licença",
            desc: "",
          },
          {
            nome: "Cede a Quem Pede",
            desc: "",
          },
        ],
      },
      {
        nome: "Aferidora-Mor Nyss'val",
        tipo: "Humanoide (drow)",
        tamanho: "Médio",
        alinhamento: "Neutro",
        movimento: "12 m",
        dv: "10",
        pv: "58",
        ca: "19",
        jp: "8",
        moral: "9",
        xp: 4000,
        descricao: "Cento e poucos anos. Não odeia ninguém: confere. Conferiu quarenta e um mil, oitocentas e nove pessoas e sabe o número de cabeça, e acrescenta que três mil e duzentas foram devolvidas, porque a taxa está dentro da tolerância e ela tem orgulho disso. BA +9.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Estilete de aferição", qtd: 2, bonus: 11, dano: "1d6+4 e JPC ou –2 em todas as rolagens por 1d4 rodadas" },
          { nome: "Chamado de fio", qtd: 1, bonus: 0, dano: "convoca 1d4 Fiados adjacentes, 2x/combate" },
        ],
        habilidades: [
          {
            nome: "Procedimento",
            desc: "NÃO LUTA SE HOUVER PROCEDIMENTO DISPONÍVEL. Um documento selado que a exonere formalmente da função — e Sabra Tovin sabe redigir um — faz Nyss'val entregar o Segundo Contador inteiro sem uma rolagem: o registro cruzado, a chave da comporta e os nomes. E ela vai embora andando.",
          },
          {
            nome: "Ela Confere",
            desc: "Responde a qualquer pergunta sobre números com precisão total e sem emoção. Não mente e não omite. Não vê diferença moral entre conferir pessoas e conferir sacas de grão, e essa ausência é o horror da cena — não crueldade, indiferença profissional.",
          },
          {
            nome: "Desatar Também É Procedimento",
            desc: "Se lhe pedirem, com autoridade plausível, que desate os quarenta nós da Sala 3, ELA DESATA — mediante recibo. Ninguém pensa em pedir. É a melhor jogada da Cena 4.",
          },
          {
            nome: "Testemunha",
            desc: "Se convertida, é a segunda testemunha de dentro que a Cena 6 exige quando o registro cruzado foi perdido. Vale quatro Cohortes da Legião de Ferro.",
          },
        ],
      },
      {
        nome: "Aurelia Vantris, a Distribuída",
        tipo: "Humana tecida (nove Portadores)",
        tamanho: "Médio (nove corpos)",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "18",
        ca: "18",
        jp: "4",
        moral: "12",
        xp: 4500,
        descricao: "**PV:** 22 por Portador.",
        conceito: "Morto-Vivo",
        ataques: [
          { nome: "Armas de nove pessoas", qtd: 3, bonus: 16, dano: "1d8+4" },
        ],
        habilidades: [
          {
            nome: "Nove Portadores",
            desc: "",
          },
          {
            nome: "Não Está Ali",
            desc: "",
          },
          {
            nome: "Ordem Executória",
            desc: "",
          },
          {
            nome: "A Voz Somada",
            desc: "",
          },
          {
            nome: "Ela Está Tentando Parar",
            desc: "",
          },
          {
            nome: "Os Cinco Nós",
            desc: "",
          },
        ],
      },
      {
        nome: "Aurelia Vantris, a Que Não Cedeu",
        tipo: "Humana (cinco Marcas de Pressão)",
        tamanho: "Médio",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "16",
        pv: "118",
        ca: "21",
        jp: "4",
        moral: "12",
        xp: 3800,
        conceito: "Humanoide",
        ataques: [
          { nome: "Barra de guincho", qtd: 3, bonus: 17, dano: "1d10+7" },
        ],
        habilidades: [
          {
            nome: "Ordem Executória",
            desc: "",
          },
          {
            nome: "Chamada de Galeria",
            desc: "",
          },
          {
            nome: "O Sangue Dela",
            desc: "",
          },
          {
            nome: "A Voz do Rasgo",
            desc: "",
          },
          {
            nome: "Não Corre",
            desc: "",
          },
          {
            nome: "Sem Matriz",
            desc: "",
          },
        ],
      },
      {
        nome: "Caelith, o Fragmento do Conhecimento",
        tipo: "Dragão (Lendário)",
        tamanho: "Colossal",
        alinhamento: "Neutro",
        movimento: "12/24Vo m",
        dv: "20",
        pv: "130",
        ca: "22",
        jp: "10",
        moral: "12",
        xp: 0,
        descricao: "O Um tentando compreender o que se tornou. Escamas escritas em idiomas que mudam quando você desvia o olhar. A voz vem de trás do ombro de quem ele responde. NÃO É UM COMBATE — é uma negociação com uma coisa que não tem motivo para negociar. BA +20.",
        conceito: "Dragão",
        ataques: [
          { nome: "Não ataca", qtd: 0, bonus: 0, dano: "—" },
        ],
        habilidades: [
          {
            nome: "Fragmento de Conhecimento",
            desc: "Imune a medo, encanto, sono, paralisia, ilusão, efeitos mentais e morte instantânea. Nenhuma mentira dita na presença dele funciona — ele não a desmente, apenas responde à verdade que ela escondia.",
          },
          {
            nome: "Uma Pergunta por Pessoa",
            desc: "Cada criatura pode fazer UMA pergunta a Caelith, uma vez na vida. Ele responde com verdade completa e nenhuma clareza. O preço é uma memória específica, escolhida pelo próprio interrogante. Ver a Regra da Cena.",
          },
          {
            nome: "O Preço Se Cobra Sozinho",
            desc: "A memória some no instante da resposta. Não há JP, não há resistência, não há magia no cenário que a devolva. Um personagem que ofereceu a memória de aprender algo PERDE aquilo na ficha, permanentemente.",
          },
          {
            nome: "A Pergunta de Volta",
            desc: "Se atacado, não revida. Faz UMA pergunta ao agressor — a coisa que aquele personagem menos quer discutir. JPS ou fica parado 1d4 rodadas respondendo em voz alta, na frente do grupo. Depois Caelith vai embora e as perguntas não feitas se perdem para sempre.",
          },
          {
            nome: "Ele Não Sabe Consertar",
            desc: "Caelith não devora memórias: ele as lê e as solta, e elas caem fora de quem as tinha. Ele lamenta isso de um jeito distraído e já tentou resolver. Se um PJ perguntar como devolver o que perdeu, essa É a pergunta dele, e a resposta é: 'ainda não sei. Volte quando eu souber. Você não vai conseguir voltar.'",
          },
        ],
      },
      {
        nome: "Hakon Conta-Certa, Curador de Sal-de-Baixo",
        tipo: "Anão (Clã Kalzhar)",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "6 m",
        dv: "14",
        pv: "92",
        ca: "21",
        jp: "6",
        moral: "12",
        xp: 3025,
        conceito: "Humanoide",
        ataques: [
          { nome: "Martelo de aferição", qtd: 2, bonus: 15, dano: "1d10+6" },
          { nome: "Chamada de Turno", qtd: 1, bonus: "—", dano: "—" },
        ],
        habilidades: [
          {
            nome: "A Planilha Fecha",
            desc: "",
          },
          {
            nome: "Chamada de Turno",
            desc: "",
          },
          {
            nome: "Pele de Obsidiana",
            desc: "",
          },
          {
            nome: "Não Foge, Não Corre",
            desc: "",
          },
          {
            nome: "O Livro",
            desc: "",
          },
        ],
      },
      {
        nome: "Kess Vandrel, a Caçadora",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Neutro",
        movimento: "12 m",
        dv: "9",
        pv: "48",
        ca: "17",
        jp: "10",
        moral: "11",
        xp: 1200,
        descricao: "Ex-legionária da Cohorte V, dispensada por quebra da lei 3. Trinta e oito anos, magra de fome antiga, três cães e uma rede. NÃO QUER MATAR NINGUÉM — quer um refém vivo para trocar por entrada na Vigília. BA +9.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Bordão ferrado", qtd: 2, bonus: 11, dano: "1d6+3 (contundente; nunca letal — reduz a 1 PV, não a 0)" },
          { nome: "Rede lastrada", qtd: 1, bonus: 11, dano: "JPD ou preso (Força 1 em 1d6 para sair)" },
        ],
        habilidades: [
          {
            nome: "Batedora da Cohorte V",
            desc: "Move-se em terreno difícil sem penalidade, surpreende com 1-4 em 1d6 e nunca é surpreendida. Sabe onde estão as saídas antes de entrar.",
          },
          {
            nome: "Três Cães",
            desc: "Cães de derrubada (DV 2, CA 13, 9 PV, mordida +4/1d6, derruba com JPD). Mordem e soltam. Nenhum deles persegue quem foge.",
          },
          {
            nome: "Não Mata",
            desc: "Nenhum ataque de Kess reduz um alvo a menos de 1 PV. Um refém morto não compra nada.",
          },
          {
            nome: "Não Inscrita",
            desc: "As defesas da Vigília ferem APENAS criaturas não registradas no livro da cidade: 2d6 por rodada, sem JP, e a luz a segue. Os PJs foram registrados na Cena 3 e não sabem disso. É prova visual do que aquele lugar é.",
          },
          {
            nome: "O Irmão",
            desc: "Está no arco há dezoito meses e não sabe mais o nome dela. Kess se rende imediatamente a qualquer grupo que ofereça ajudá-lo — e cumpre a palavra, e é útil pelo resto do arco.",
          },
        ],
      },
      {
        nome: "Mestre Umbral, Cardeal do Colégio Lunar — Fase 1, \"O Contador\"",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "16",
        pv: "110",
        ca: "22",
        jp: "5",
        moral: "12",
        xp: 20000,
        descricao: "Setenta e sete anos, magro, sem capuz, olhos bons e cansados. Não é fanático — é o único que não é. Não grita, não ameaça e não mente sobre o que faz. Está contando quando o grupo chega, e termina a coluna antes de levantar a cabeça. BA +14.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Báculo de escrutínio", qtd: 2, bonus: 16, dano: "1d8+8" },
          { nome: "Toque da Dispensa", qtd: 1, bonus: 16, dano: "5d6 + JPC ou paralisia 1d4 rodadas" },
        ],
        habilidades: [
          {
            nome: "A Única Fenda",
            desc: "Responde toda pergunta com honestidade completa. É vaidade, e é a coisa mais humana nele, e é explorável: CADA PERGUNTA GENUÍNA QUE ELE RESPONDE É UMA RODADA EM QUE ELE NÃO AGE. Se Irmã Nell foi redimida, a mesa já sabe disso antes de entrar na cena.",
          },
          {
            nome: "Sem Alavanca",
            desc: "Imune a medo, encanto, sugestão, intimidação e a qualquer apelo moral. Já fez todas essas contas sozinho, doze anos atrás. Confrontá-lo com o Gambito não o abala — ele agradece a companhia.",
          },
          {
            nome: "Ele Não Mata",
            desc: "Nenhum ataque de Umbral reduz um alvo abaixo de 0 PV. Um golpe letal deixa o alvo CAÍDO E CAPTURADO. Impuro morto é desperdício de estoque, e a essa altura já não é contabilidade: é hábito.",
          },
          {
            nome: "Sentença Registrada",
            desc: "2x/combate, ação. Diz o nome completo de um PJ, a data em que nasceu e o nome da mãe dele. JPS ou o alvo fica INCAPAZ DE ATACÁ-LO por 1d4 rodadas. Não é medo: é reconhecimento.",
          },
          {
            nome: "Rito Maior da Dispensa",
            desc: "3x/combate. JPS ou 7d6 de dano divino num ancorado, Silente ou originário a até 18 m; metade com JP. Prioriza Ancorados, sempre.",
          },
          {
            nome: "A Ordem que Já Foi Dada",
            desc: "No primeiro turno de qualquer combate, Umbral age antes de todos, sem rolar iniciativa. Ele já tinha decidido o que fazer antes de vocês chegarem.",
          },
          {
            nome: "Não Foge Desta Vez",
            desc: "AO CONTRÁRIO DE TODAS AS APARIÇÕES ANTERIORES, Umbral não pode ser retirado do campo pela Conexão. O Tear parou (Cena 8) e o Fio que sempre o salvou agora o prende. Diga isso à mesa: 'ele não vai embora desta vez.'",
          },
          {
            nome: "Transição",
            desc: "AOS 40 PV OU MENOS, a Fase 1 termina imediatamente, no meio da ação. Não role nada. Vá para a Fase 2.",
          },
        ],
      },
      {
        nome: "O Suplicante",
        tipo: "Monstro (Fenda)",
        tamanho: "Enorme",
        alinhamento: "Caótico",
        movimento: "9 m",
        dv: "16",
        pv: "108",
        ca: "19",
        jp: "9",
        moral: "12",
        xp: 3725,
        conceito: "Humanoide Monstruoso",
        ataques: [
          { nome: "Braçada", qtd: 3, bonus: 17, dano: "2d8+4" },
          { nome: "Dentadura", qtd: 1, bonus: 17, dano: "4d6" },
        ],
        habilidades: [
          {
            nome: "Sangue Corrosivo",
            desc: "",
          },
          {
            nome: "Vigor Abissal",
            desc: "",
          },
          {
            nome: "A Corrente",
            desc: "",
          },
          {
            nome: "Ele Pede",
            desc: "",
          },
          {
            nome: "Foi Alguém",
            desc: "",
          },
        ],
      },
      {
        nome: "Teodemar Vell, o Anfitrião — o Padre que Ficou",
        tipo: "Morto-vivo (Desmorto)",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "13",
        pv: "68",
        ca: "19",
        jp: "7",
        moral: "12",
        xp: 9000,
        descricao: "Um dos Treze do Conclave Secreto Desmorto, e o mais velho deles. Breônia o chora há quarenta anos como mártir. Oitenta e tantos anos aparentes, mãos boas, voz baixa; levanta quando alguém entra e usa o nome de todo mundo. NÃO É UM VILÃO ODIOSO E NÃO DEVE SER JOGADO COMO UM. BA +11.",
        conceito: "Morto-Vivo",
        ataques: [
          { nome: "Toque de Inscrição", qtd: 1, bonus: 13, dano: "3d8 + JPC ou o alvo é INSCRITO (ver abaixo)" },
          { nome: "Báculo do priorado", qtd: 1, bonus: 13, dano: "1d6+4" },
        ],
        habilidades: [
          {
            nome: "Inscrito",
            desc: "Um alvo Inscrito entra no livro da Vigília. Enquanto estiver dentro dos muros, as defesas o poupam — e ele NÃO PODE atravessar os portões sem que Teodemar retire o nome. Não é dano: é cadastro. Retirar o nome à força exige o Corte Limpo (Cena 5b) ou a morte dele.",
          },
          {
            nome: "A Casa Vem Junto",
            desc: "Se atacado dentro da Vigília, 1.200 moradores saem de casa para defendê-lo, desarmados ou com ferramenta, todos ao mesmo tempo, em 1d4 rodadas. Não são unidade de batalha: são um obstáculo moral. O grupo NÃO pode vencer este combate sem massacrar uma cidade de gente salva, e você deve dizer isso à mesa antes da primeira rodada.",
          },
          {
            nome: "Ancorado Nele Mesmo",
            desc: "Reduzido a 0 PV, não morre: uma das quarenta vidas separadas para a âncora é gasta, e ele se reergue com 30 PV no início da rodada seguinte. Isso acontece até quarenta vezes. A cada vez, ele diz o nome de quem foi gasto, em voz alta, e ele sabe todos os nomes.",
          },
          {
            nome: "Não Persegue",
            desc: "Nunca persegue quem sai pelo portão. Nunca mandou atrás de ninguém em quarenta anos. Isso é verdade e é a coisa mais desestabilizadora dele.",
          },
          {
            nome: "A Ampulheta",
            desc: "Traz o símbolo do Conclave no forro do casaco. Se o grupo rodou A Mentira de Ônix, ele é quem recebeu as amostras de Breu que escaparam — e vai reconhecer os PJs antes de eles o reconhecerem.",
          },
          {
            nome: "O Silêncio",
            desc: "Imune a intimidação, medo e apelo moral — com UMA exceção: se um PJ apontar que os argumentos dele são exatamente os de Umbral, ele não tem resposta e fica em silêncio por um tempo longo. Não concede nada mecanicamente. É a única fenda que ele tem, e a mesa merece encontrá-la.",
          },
        ],
      },
      {
        nome: "Tribuna Vetta Sórdano, VI Cohorte (Reserva)",
        tipo: "Humano",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "9",
        pv: "52",
        ca: "19",
        jp: "9",
        moral: "12",
        xp: 0,
        descricao: "Quarenta e um anos. Quatro anos observando esta guerra de longe com três oficiais e um livro de anotações, agora no terceiro volume. Três mil e duzentas linhas. Uma delas lhe tira o sono. NÃO É UM COMBATE. BA +8.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Gládio de Ferro", qtd: 2, bonus: 10, dano: "1d8+4" },
        ],
        habilidades: [
          {
            nome: "O Registro",
            desc: "Tudo o que a mesa fez em vinte aventuras que a Legião testemunhou está anotado, incluindo a violação do parlamento de Sabra Tovin (A16), se houve. Ela lê a linha em voz alta antes de negociar, e a negociação fica dois graus mais cara.",
          },
          {
            nome: "A Lei 6",
            desc: "Neutralidade absoluta. Nenhum apelo moral, nenhuma quantia e nenhum discurso a movem. A ÚNICA alavanca é a lei 1 (o contrato é sagrado) combinada com a lei 4 (traição se paga com ferro e sangue): prove fraude sobre a natureza da carga e a Legião não entra numa guerra — cobra uma dívida.",
          },
          {
            nome: "O Preço",
            desc: "Onze nomes no registro cruzado; quatro mortos, sete vivos, dois com filhos em Ferro Velho. Entregar o livro põe doze Cohortes em campo e mata os sete pela lei 4. Ela não argumenta e não pressiona: espera.",
          },
          {
            nome: "Não Aceita Papel",
            desc: "Em batalha, a Legião cumpre o contrato assinado e nada mais. As Cohortes avançam pela Estrada do Sal em linha reta e não desviam por nada, inclusive por unidades aliadas em apuros.",
          },
        ],
      },
      {
        nome: "Umbral Liquidado — Fase 2, \"O Nó Aberto\"",
        tipo: "Humano (tecido)",
        tamanho: "Médio",
        alinhamento: "Ordeiro",
        movimento: "6 m",
        dv: "16",
        pv: "70",
        ca: "24",
        jp: "4",
        moral: "12",
        xp: 30000,
        descricao: "O nó do Pacto do Fio, enxertado no esterno há doze anos, ABRIU. Dois metros de fio sem cor saindo para todos os lados: para a vala, para os Fiados, para o Tear parado, para baixo. Ele não virou um monstro. Virou uma instituição — e continua falando, e agora fala no plural sem perceber. BA +14.",
        conceito: "Morto-Vivo",
        ataques: [
          { nome: "O fio, em três direções", qtd: 3, bonus: 16, dano: "2d6+6 e JPD ou o alvo fica preso (ação para escapar)" },
          { nome: "Cobrança", qtd: 1, bonus: 0, dano: "6d6 em raio de 9 m, JPS para metade — e todos os ANCORADOS na área rolam JPS ou obedecem à próxima ordem que ele der" },
        ],
        habilidades: [
          {
            nome: "O Passivo",
            desc: "⚠ A CADA 10 PONTOS DE DANO QUE UMBRAL SOFRER, DEZ CATIVOS MORREM NA VALA DO ESTOQUE. Anuncie o número corrente em voz alta a cada rodada, sem arredondar. Não esconda, não suavize, não retire.",
          },
          {
            nome: "Os Três Nós",
            desc: "Três nós de ancoragem visíveis no fio, a até 18 m. Cortar cada um: uma ação e teste de Inteligência (1 em 1d6) ou JPS. Cada nó cortado reduz o Passivo em um terço; os três eliminam o Passivo — E UMBRAL GANHA +4 EM TODOS OS ATAQUES E +2 NA CA, porque o que ele carregava era peso. Este é o trade-off central da luta. Irmã Nell redimida corta um nó sem teste.",
          },
          {
            nome: "Fala no Plural",
            desc: "As vozes dos mil cativos entram na dele, uma por frase, dizendo coisas administrativas e cordiais em línguas diferentes. Ele continua argumentando, e os argumentos continuam bons, e é isso que assusta. Ele NÃO fica sádico. Não o interprete como sádico.",
          },
          {
            nome: "Ele Ainda Não Mata",
            desc: "Herda Ele Não Mata da Fase 1. A Tecelã também não desperdiça. Um grupo derrotado aqui acorda amarrado na Vala do Estoque, e a Cena 11 acontece com eles do lado de dentro.",
          },
          {
            nome: "Sem Saída",
            desc: "Não pode ser retirado do campo, teleportado, banido ou salvo. Pela primeira vez em vinte aventuras, Umbral está preso onde está.",
          },
          {
            nome: "A Oferta",
            desc: "AOS 20 PV OU MENOS, ele senta e encerra o combate por conta própria. Não continue rolando. Vá para a Cena 11 — o resgate oferecido — e leia o box dos dois lados.",
          },
        ],
      },
      {
        nome: "Vhael-en-Thur, o Arauto Encalhado",
        tipo: "Aberração (Arauto)",
        tamanho: "Grande",
        alinhamento: "Neutro",
        movimento: "12 m",
        dv: "15",
        pv: "96",
        ca: "20",
        jp: "6",
        moral: "12",
        xp: 8000,
        descricao: "Três metros e pouco, forma alongada, placagem que não é armadura nem pele. Arrasta às costas um aro de pedra escura de dois metros, rachado e mal remendado — o caminho de volta que ele mesmo destruiu. É herói local no Nó. Mata quem registra o caminho. NÃO É UM MONSTRO: é a última ordem de alguém que ficou sozinho onze anos. BA +14.",
        conceito: "Humanoide Monstruoso",
        ataques: [
          { nome: "Corte de passagem", qtd: 2, bonus: 16, dano: "2d10+5" },
          { nome: "O aro (arremesso)", qtd: 1, bonus: 14, dano: "4d8, JPD para metade, e o alvo fica preso 1 rodada" },
        ],
        habilidades: [
          {
            nome: "Numa Ação",
            desc: "Contra qualquer criatura que carregue mapa, caderno, instrumento de registro ou que o grupo tenha visto anotando o caminho, Vhael-en-Thur ataca UMA vez e o alvo morre. Sem JP, sem rolagem. Isso mata Tallec Sole na Cena 5 e vale contra qualquer PJ que esteja mapeando — AVISE A MESA PELO EXEMPLO, NUNCA PELA REGRA.",
          },
          {
            nome: "Não Persegue Quem Não Registra",
            desc: "Ignora completamente qualquer criatura que não carregue registro do caminho. Um grupo que largue os mapas no chão, em cena, pode simplesmente passar por ele.",
          },
          {
            nome: "O Aro Ressoa",
            desc: "FRAQUEZA. Um Cristal de Centelha carregado na presença dele (ação, exige metal e uma pancada) faz o aro zumbir: ele perde ação, JP e movimento por 1 rodada. Funciona sempre; ele nunca aprende. Deve ser PLANTADO VISUALMENTE na Cena 4 (Hrun, o Outro) ou lido na 6c.",
          },
          {
            nome: "Placagem de Arauto",
            desc: "Reduz em 6 todo dano de fontes não-mágicas (mínimo 1). Imune a veneno, doença, medo, sono e paralisia.",
          },
          {
            nome: "Onze Anos",
            desc: "Imune a encanto, sugestão e a qualquer tentativa de comunicação por idioma. Comunica-se apenas por IMAGEM, e só com quem parar de atacá-lo primeiro. Se o grupo recuar sem golpear na rodada em que ele estiver abaixo de 20 PV, ele para também, senta, e a reviravolta acontece por conversa.",
          },
          {
            nome: "Ele Não Cai Duas Vezes",
            desc: "Reduzido a 0 PV, não agoniza: para. O aro se solta e cai. Descreva a morte como libertação, e conceda XP integral mesmo que o grupo o tenha poupado.",
          },
        ],
      },
      {
        nome: "Vurro Duas-Bocas, campeão do Anel de Osso",
        tipo: "Grimor (cinco Marcas)",
        tamanho: "Grande",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "11",
        pv: "74",
        ca: "17",
        jp: "8",
        moral: "12",
        xp: 1825,
        conceito: "Humanoide",
        ataques: [
          { nome: "Punhos", qtd: 2, bonus: 13, dano: "1d8+5" },
          { nome: "Agarrão", qtd: 1, bonus: 13, dano: "2d6" },
        ],
        habilidades: [
          {
            nome: "Nunca Mata",
            desc: "",
          },
          {
            nome: "Sangue Corrosivo",
            desc: "",
          },
          {
            nome: "Lê o Peso",
            desc: "",
          },
        ],
      },
    ],
  },
  {
    folder: "Ameaças da Campanha — Interlúdio",
    monstros: [
      {
        nome: "A Última Palavra (arma de fogo · relíquia)",
        tipo: "Objeto",
        alinhamento: "—",
        descricao: "Cano longo, coronha de madeira escura sem nó, ferragem sem marca de forja. Não enferruja, não aquece e não tem peso de arma. Cinco palavras em Arkanes na alma do cano, nenhuma delas um substantivo. Ninguém consegue datá-la.",
        conceito: "Constructo",
        habilidades: [
          {
            nome: "Dano",
            desc: "1d10, alcance 30 m, duas mãos. Estouro (dado máximo rola de novo e soma).",
          },
          {
            nome: "Não Falha",
            desc: "Imune ao Erro Crítico Instável. Não emperra, não trava, não dá backfire. Nunca.",
          },
          {
            nome: "Sempre Carregada",
            desc: "Não consome munição e não exige recarga. Está sempre pronta, e sempre esteve.",
          },
          {
            nome: "Discórdia",
            desc: "SEGREDO. Enquanto a arma estiver a até 30 m: todo teste de Reação (6.15) sofre -4; um resultado Hostil (2-3) não pode ser desescalado naquela cena; e uma vez por dia o Mestre pode transformar qualquer desentendimento entre NPCs em violência, sem rolagem, sem aviso e sem motivo suficiente.",
          },
          {
            nome: "O Rastro",
            desc: "SEGREDO. Toda comunidade em que a arma passe uma noite tem, nos sete dias seguintes, uma briga que não deveria ter acontecido. O Mestre deve narrar isso à distância, por boato, três ou quatro aventuras seguidas, sem nunca ligar os pontos.",
          },
        ],
      },
      {
        nome: "Irmã Colvet (em jejum de nove dias)",
        tipo: "Silente ancorada",
        alinhamento: "Ordeiro",
        movimento: "12 m",
        dv: "6",
        pv: "26",
        ca: "16",
        jp: "10",
        moral: "12",
        xp: 900,
        descricao: "Dezessete anos. Enfraquecida de propósito para não ser ouvida. Ainda assim treinada desde os nove. BA +6.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Estilete de ônix", qtd: 2, bonus: 8, dano: "1d4+2" },
        ],
        habilidades: [
          {
            nome: "Jejum",
            desc: "PV e CA já reduzidos pelos nove dias sem o frasco (seriam 44 PV e CA 18). A cada dia adicional perde 1d6 PV máximo. Na quinta-feira, ela cai sozinha, e cai para sempre.",
          },
          {
            nome: "Não Cansa",
            desc: "Imune a Medo, sono, encanto e veneno. O jejum não altera isso.",
          },
          {
            nome: "Ônix contra o que Ela É",
            desc: "Os estiletes ferem ancorados e criaturas do Breu como armas mágicas — e a ferem em cheio se voltados contra ela. Ela sabe.",
          },
          {
            nome: "Sem Âncora",
            desc: "Colvet deixou o relicário para trás, escondido, para não ser rastreada. É a primeira decisão livre da vida dela e ela não sabe disso. Não se reergue quando cai.",
          },
          {
            nome: "Redimível — a segunda chance",
            desc: "Ver abaixo. Não é a mesma redenção de Nell e não custa seis aventuras. Custa uma coisa material.",
          },
        ],
      },
      {
        nome: "Ordulf Três-Selos",
        tipo: "Humano (armador do baixo Vessel)",
        alinhamento: "Neutro",
        movimento: "9 m",
        dv: "6",
        pv: "34",
        ca: "16",
        jp: "10",
        moral: "9",
        xp: 900,
        descricao: "Vinte e dois anos sem uma quebra de contrato registrada. Não é bandido: é um concorrente que leu a lei melhor que você. BA +6.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Sabre de abordagem", qtd: 1, bonus: 8, dano: "1d8+2" },
          { nome: "Pistola de pederneira", qtd: 1, bonus: 7, dano: "1d6 (Estouro; recarga 1 rodada por câmara)" },
        ],
        habilidades: [
          {
            nome: "Dentro da Lei",
            desc: "Ordulf não fere quem se rendeu, não queima casco com gente no porão e não toca em quem nada lhe deve. Não é bondade: é que uma única infração da Lei de Ferro custa a ele vinte e dois anos de registro limpo. Um grupo que perceba isso pode usá-lo — render-se, por exemplo, é absolutamente seguro.",
          },
          {
            nome: "Conhece o Canal",
            desc: "Nas duas primeiras rodadas, A Terceira Assinatura conta como um ponto de deslocamento mais rápida — ele sabe onde a água corre.",
          },
          {
            nome: "Moral de Contrato",
            desc: "A tripulação dele é paga por esforço, não por vitória. Quando Ordulf cai ou se rende, os arpoadores testam Moral 2d6 imediatamente e quase sempre param. Eles não morrem por ele e ele não espera que morram.",
          },
          {
            nome: "A Assinatura",
            desc: "Ele carrega no peito o livro de rota com vinte e dois anos de balizamento anotado. É a prova documental do direito dele — e é a coisa que decide a Cena 5. Tomar o livro é mais valioso que matá-lo, e é mais difícil.",
          },
        ],
      },
      {
        nome: "Sargento Ivor Conta-Fechada",
        tipo: "Silente ancorado (Tropa Sem Fim, posto de Sal-Alto)",
        alinhamento: "Ordeiro",
        movimento: "9 m",
        dv: "5",
        pv: "38",
        ca: "18",
        jp: "7",
        moral: "12",
        xp: 600,
        descricao: "Sargento de pelotão, quarenta anos sem rito, sem rendição e sem ordem nova. Não lembra o próprio nome; lembra o regulamento inteiro. BA +5.",
        conceito: "Humanoide",
        ataques: [
          { nome: "Espada longa", qtd: 1, bonus: 7, dano: "1d8+3" },
        ],
        habilidades: [
          {
            nome: "Eco Antimágico",
            desc: "Imune a magias arcanas diretas; vulnerável a magia divina.",
          },
          {
            nome: "Corpo Estático",
            desc: "Sem cura. Reduzido a 0 PV, é destruído em definitivo.",
          },
          {
            nome: "Voz de Comando",
            desc: "Silentes a até 9 m ganham +1 nos ataques e mantêm a Disciplina Inquebrável mesmo isolados. Se ele cai, a coluna perde o +1 — e não para. Continua andando.",
          },
          {
            nome: "Conta Fechada",
            desc: "Ivor sabe exatamente quantos saíram de Sal-Alto (33), quantos restam (31) e onde os dois estão enterrados. É a única aritmética que sobrou nele, e ele a recita quando pressionado. Um PJ que peça a conta e escute até o fim ganha Ajuste Fácil na próxima tentativa de conversa.",
          },
          {
            nome: "O Duelo é Sagrado",
            desc: "Ver A saída (b). Se um duelo formal for aceito, Ivor combate sem a formação, sem Voz de Comando e sem interferência de ninguém — e o resultado do duelo é acatado sem discussão, qualquer que seja.",
          },
          {
            nome: "Sem Exaustão",
            desc: "Imune a Medo, sono, encanto e veneno. Não dorme, não cansa, não sente dor.",
          },
        ],
      },
    ],
  },
];
