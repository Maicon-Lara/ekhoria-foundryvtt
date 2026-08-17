// Itens do Arsenal de Ekhoria — transcritos do livro "Ekhoria — Mecânicas para
// Old Dragon 2" (capítulo Arsenal de Ekhoria). Armas, armaduras e substâncias.
// Materiais especiais, cristais, munições e regras detalhadas ficam no journal
// "Arsenal — Materiais, Cristais e Regras".
//
// tipo: "weapon" | "armor" | "misc"
// Ícones: armas/armaduras usam o ícone automático do OD2 por tipo; itens misc
// recebem ícones temáticos do próprio sistema (garantidos de existir).

const IC = "systems/olddragon2e/assets/icons";

export const categorias = [
  {
    folder: "Armas",
    tipo: "weapon",
    itens: [
      { nome: "Kurogane", damage: "2d4", damage_type: "cortante", cost: "300 PO", weight_in_load: 1, desc: "<p>Arma tradicional dos Orcs de Yorugan (Média, Cortante). Lâmina larga e levemente curva, de fio assimétrico — os ferimentos tendem a abrir mais do que fechar. <strong>Sangrenta:</strong> realiza acertos críticos com 19 ou 20.</p>" },
      { nome: "Soqueira de Bronze", damage: "1d4", damage_type: "impactante", cost: "2 PO", weight_in_load: 1, desc: "<p>Pequena, Impactante. Permite causar dano letal com ataques desarmados. É a única variante de soqueira permitida a Clérigos.</p>" },
      { nome: "Soqueira de Espinhos", damage: "1d4", damage_type: "perfurante", cost: "4 PO", weight_in_load: 1, desc: "<p>Pequena, Perfurante. Permite causar dano letal com ataques desarmados.</p>" },
      { nome: "Kattar", damage: "1d4", damage_type: "cortante", cost: "5 PO", weight_in_load: 1, desc: "<p>Pequena, Cortante. Soqueira de lâminas que permite causar dano letal cortante com ataques desarmados.</p>" },
      { nome: "Pistola de Pederneira", damage: "1d4", ranged: true, shoot_range: 15, cost: "70 PO", weight_in_load: 1, desc: "<p>Pequena, Disparo (15 m). Tambor rotativo de 4 câmaras; recarga de 1 rodada por câmara. <strong>Instável:</strong> resultados 1–2 no d20 causam falha crítica. Por ser arma de Disparo, não soma modificador de Força no dano.</p>" },
      { nome: "Mosquete de Chapa", damage: "1d6", ranged: true, shoot_range: 30, two_handed: true, cost: "110 PO", weight_in_load: 2, desc: "<p>Média, Disparo (30 m), Duas Mãos. Tambor rotativo de 3 câmaras; recarga de 1 rodada por câmara. <strong>Instável:</strong> resultados 1–2 no d20 causam falha crítica. Por ser arma de Disparo, não soma modificador de Força no dano.</p>" },
    ],
  },
  {
    folder: "Armaduras",
    tipo: "armor",
    itens: [
      { nome: "Couraça Lagarto-Gelo", bonus_ca: 3, cost: "40 PO", weight_in_load: 1, desc: "<p>Armadura Leve de couro (Carga 1), feita com o couro de répteis das tundras de Vornfell. <strong>Antifuro:</strong> concede +1 na CA contra armas perfurantes, incluindo flechas, lanças e estocadas.</p>" },
      // As três armaduras de Núcleo Lítico são extensões do sistema vital Arkanim —
      // em quem não tem núcleo mineral ativo causam colapso térmico, calcificação ou
      // implosão, todos fatais, e por isso são inúteis como espólio. O requisito, porém,
      // não é o mesmo nas três: a Malha basta o núcleo, enquanto Vestimenta e Panóplia
      // exigem também o treino de Lito-arcanista, porque canalizam carga que um núcleo
      // destreinado não sustenta.
      { nome: "Malha de Núcleo Aflorado", bonus_ca: 2, cost: "30 PO", weight_in_load: 1, desc: "<p>Armadura Leve de Arcanita, <strong>exclusiva de Arkanim</strong> — basta o núcleo, sem exigir o treino de Lito-arcanista. A peça do dia a dia em Arkádia: trama fina costurada de modo que as cristalizações do corpo <em>aflorem através dela</em> em vez de serem cobertas. Não esconde nada, e não foi feita para esconder.</p><p>Enquanto vestida, <strong>Filhos de Arkádia</strong> passa a detectar num raio de <strong>18 metros</strong> em vez de 9; a chance continua sendo <strong>1 em 1d6</strong>. Um Lito-arcanista a carrega em <strong>Carga 0</strong> pelo redutor da classe, e é a única armadura que ele consegue comprar com uma renda inicial ruim.</p>" },
      { nome: "Vestimenta de Núcleo Condutor", bonus_ca: 3, cost: "40 PO", weight_in_load: 1, desc: "<p>Armadura Média de Arcanita, <strong>exclusiva de Lito-arcanistas</strong> (extensão do sistema vital Arkanim — fatal para quem não tem núcleo mineral ativo). Concede +1 em JPC para Concentração.</p>" },
      { nome: "Panóplia do Núcleo de Ruptura", bonus_ca: 5, cost: "1.500 PO", weight_in_load: 2, desc: "<p>Armadura Pesada de Arcanita, <strong>exclusiva de Lito-arcanistas</strong>. Concede +2 em JPC física e +1d6 no dano da habilidade Ruptura do Núcleo.</p>" },
    ],
  },
  {
    folder: "Substâncias Alquímicas (Fungos do Degelo)",
    tipo: "misc",
    itens: [
      { nome: "Mandra (Pílula)", cost: "500 PO", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Cura 4d6+3 PV e funciona como antídoto. <strong>Vício 1–2.</strong> Colateral/abstinência: insônia e exaustão permanente. <em>Narcoguerreiro fabrica por 250 PO em 2 semanas (JP Muito Difícil −5).</em></p>" },
      { nome: "Extrato de Mandra Diluído", cost: "50 PO", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Mandra diluída em 500 ml de líquido: cura 1d6 PV sem risco de vício. Também usado no tratamento de recuperação de vício.</p>" },
      { nome: "Albinus", cost: "500 PO", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Cura total (exceto dano de fogo e ácido). <strong>Vício 1.</strong> Colateral: perda de 1d4 PV máximos por semana. Extraído ritualmente de Trolls das fendas térmicas de Vornfell. <em>Narcoguerreiro fabrica por 250 PO em 2 semanas (JP Muito Difícil −5).</em></p>" },
      // A duração dos quatro cogumelos deixou de escalar com o nível: era
      // "1d4 + nível rodadas", virou "1d4+1". Num personagem de 10º isso é a
      // diferença entre 14 rodadas e 3 — a mudança mecânica mais forte deste
      // capítulo, e a que passa despercebida por caber numa célula de tabela.
      { nome: "Fungo Sangue", cost: "100 PO", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Concede Força 18 por <strong>1d4+1 rodadas</strong>. <strong>Vício 1.</strong> Colateral: perda de 1d4 PV. <em>Cogumelo de Combate: Narcoguerreiro fabrica por 50 PO em 1 semana.</em></p>" },
      { nome: "Fungo Escarlate", cost: "100 PO", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Concede Destreza 18 por <strong>1d4+1 rodadas</strong>. <strong>Vício 1.</strong> Colateral: exaustão por 1 turno. <em>Cogumelo de Combate: Narcoguerreiro fabrica por 50 PO em 1 semana.</em></p>" },
      { nome: "Fungo Azure", cost: "100 PO", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Concede Visão no Escuro por <strong>1d4+1 rodadas</strong>; enquanto dura, não é surpreendido nem flanqueado. <strong>Vício 1.</strong> Colateral: cegueira temporária. <em>Cogumelo de Combate: Narcoguerreiro fabrica por 50 PO em 1 semana.</em></p>" },
      { nome: "Fungo Ébano", cost: "100 PO", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Pele de pedra por <strong>1d4+1 horas</strong>: ataques contra o usuário são <strong>Difíceis (−2)</strong>. <strong>Vício 1.</strong> Colateral: todos os testes Difíceis (−2) por 1d4+1 dias. <em>Cogumelo de Combate: Narcoguerreiro fabrica por 50 PO em 1 semana.</em></p>" },
      { nome: "Nargula", cost: "—", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Ignora dor, fome e frio por <strong>2d6+6 horas</strong>. <strong>Vício 1.</strong> Colateral: paranoia e fúria.</p>" },
      { nome: "Cristal dos Sonhos", cost: "—", weight_in_load: 0, img: `${IC}/gem.svg`, desc: "<p>Provoca alucinações e visões proféticas. <strong>Vício 1–5.</strong> Colateral: depressão severa; risco de suicídio (1–3 em 1d6).</p>" },
    ],
  },
  {
    folder: "Equipamento Tático",
    tipo: "misc",
    itens: [
      { nome: "Saco de Esporos (Azul) — Pó de Morthan", cost: "50 PO", weight_in_load: 0, img: `${IC}/throw.svg`, desc: "<p>Arma de arremesso que, ao impacto, cria uma nuvem de 9 m de raio por 1d4 rodadas. Não causa vício. Variante Azul: provoca <strong>Paralisia</strong> (JP resiste). <em>Narcoguerreiro fabrica por 25 PO em 1 semana.</em></p>" },
      { nome: "Saco de Esporos (Prateado) — Pó de Morthan", cost: "50 PO", weight_in_load: 0, img: `${IC}/throw.svg`, desc: "<p>Arma de arremesso que cria uma nuvem de 9 m de raio por 1d4 rodadas. Não causa vício. Variante Prateada: provoca <strong>Cegueira</strong> (JP resiste). <em>Narcoguerreiro fabrica por 25 PO em 1 semana.</em></p>" },
      { nome: "Saco de Esporos (Púrpura) — Pó de Morthan", cost: "50 PO", weight_in_load: 0, img: `${IC}/throw.svg`, desc: "<p>Arma de arremesso que cria uma nuvem de 9 m de raio por 1d4 rodadas. Não causa vício. Variante Púrpura: provoca <strong>Sono</strong> (JP resiste). <em>Narcoguerreiro fabrica por 25 PO em 1 semana.</em></p>" },
      { nome: "Máscara de Nurillion", cost: "—", weight_in_load: 1, img: `${IC}/kit.svg`, desc: "<p>Utiliza filtros minerais aquecidos que concedem imunidade a gases tóxicos e aos efeitos de todos os Sacos de Esporos. Item padrão em expedições de Vornfell e nas operações da Irmandade Voraz.</p>" },
      { nome: "Bala de Chumbo (20)", cost: "4 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Munição comum para armas de fogo (pacote com 20). Variantes especiais e de cristal nas categorias Munições.</p>" },
    ],
  },
  {
    folder: "Materiais e Cristais",
    tipo: "misc",
    itens: [
      { nome: "Prata", cost: "", weight_in_load: 0, img: `${IC}/coins.svg`, desc: "<p>Essencial contra licantropos e certas categorias de mortos-vivos. Amplamente disponível em centros urbanos. <strong>Custo: ×2 o valor base</strong> da arma/armadura forjada nele.</p>" },
      { nome: "Bronze", cost: "", weight_in_load: 0, img: `${IC}/coins.svg`, desc: "<p>Em armaduras: −1 na CA, mas diminui o peso (armadura pesada de bronze conta como média para Carga). Em armas de fogo: reduz a Carga da arma em 1 (mínimo 1). <strong>Custo: ×1,5 o valor base.</strong></p>" },
      { nome: "Aço de Casturel", cost: "", weight_in_load: 0, img: `${IC}/coins.svg`, desc: "<p>O melhor aço <strong>mundano</strong> de Ekhoria, do Vale da Águia: armas <strong>+1 no dano</strong> <em>ou</em> armaduras <strong>+1 na CA</strong> (escolha na forja). Sem magia — não exige manutenção ritual, não quebra por desgaste e <strong>mantém o bônus onde encantamentos falham</strong> (contra Silentes e Construtos, em zonas de Erebo). <strong>Custo: ×4 o valor base.</strong></p>" },
      { nome: "Mitral", cost: "", weight_in_load: 0, img: `${IC}/coins.svg`, desc: "<p>Torna armaduras mais leves (+1 na CA) e armas mais afiadas (+1 no dano). Em armas de fogo: +1 no dano e só engasga em 1 natural se também falhar no ataque. Extremamente raro. <strong>Custo: ×10 o valor base.</strong></p>" },
      // Os quatro cristais seguem a mesma régua no livro: preço acompanha
      // potência, e todo cristal cobra alguma coisa — menos a Arcanita, que é a
      // medida dos outros justamente por não cobrar nada. O custo de cada um faz
      // parte da regra, não é sabor: sem ele o Ônix vira só um bônus grátis.
      { nome: "Arcanita", cost: "", weight_in_load: 0, img: `${IC}/gem.svg`, desc: "<p>Mineral que sustenta Arkádia, sagrado para os Clãs Mantis. <strong>Em armas:</strong> o dano conta como mágico — fere o que só armas mágicas ferem. <strong>Em armaduras:</strong> +1 em todas as JP contra magia.</p><p><strong>O que custa:</strong> nada. É o cristal sem contrapartida, e por isso a medida dos outros.</p><p><strong>Preço: ×5 o valor base.</strong></p>" },
      { nome: "Ônix", cost: "", weight_in_load: 0, img: `${IC}/gem.svg`, desc: "<p>Extraído das Montanhas de Ônix Negro de Breônia. <strong>Em armas:</strong> fere mortos-vivos a pleno — <strong>+1d6</strong> contra o que a necromancia anima; armas de fogo ficam <strong>silenciosas</strong>. <strong>Em armaduras:</strong> +2 em JP contra drenagem de energia e efeitos de mortos-vivos, +2 em JP contra o Breu, e Furtividade <strong>Fácil (+2)</strong>.</p><p><strong>O que custa — satura.</strong> Depois de uma aventura de uso pesado (o Mestre avisa), o cristal escurece e para de funcionar. Gastar um <strong>Fragmento de Ônix</strong> o devolve ao normal, em qualquer lugar. Repare no que isso significa: o fragmento no bolso serve para recarregar a armadura <em>ou</em> para 24 horas de imunidade ao Breu, nunca para os dois.</p><p><strong>Preço: ×4 o valor base.</strong></p>" },
      { nome: "Centelha Solar", cost: "", weight_in_load: 0, img: `${IC}/gem.svg`, desc: "<p>Forjado pela Guilda dos Ferreiros de Benellikov. <strong>Em armas:</strong> +1d6 de fogo no 1º acerto de cada combate (com <strong>Estouro</strong>), <strong>dobrado</strong> contra criaturas vulneráveis a fogo. <strong>Em armaduras:</strong> emite <strong>luz constante</strong>; +1 em JP contra medo, paralisia e necromancia.</p><p><strong>O que custa — a luz não apaga.</strong> Nunca. Furtividade é impossível vestindo uma, e sacar a arma no escuro anuncia sua posição a tudo que estiver olhando. O cristal é mais valioso justamente onde essa desvantagem dói mais.</p><p><strong>Preço: ×6 o valor base.</strong></p>" },
      { nome: "Erebo", cost: "", weight_in_load: 0, img: `${IC}/diamond.svg`, desc: "<p>Cristal raro que consome magia. <strong>Em armas — caça-conjuradores:</strong> ao ferir quem conjura, o alvo faz JP ou <strong>perde a magia</strong> da próxima rodada; cada acerto <strong>dissipa um efeito mágico ativo</strong> e ignora bônus mágicos de CA (por exemplo, <em>Escudo Arcano</em>). <strong>Em armaduras:</strong> toda JP bem-sucedida contra magia <strong>anula o efeito por inteiro</strong>, em vez de reduzir à metade.</p><p><strong>O que custa — devora sem escolher.</strong> A peça não aceita encantamento nem um segundo cristal, e curas e bênçãos mágicas lançadas <em>sobre você</em> valem metade. Carregar Erebo significa que o clérigo do grupo trabalha em dobro por você.</p><p><strong>Preço: ×8 o valor base.</strong></p>" },
    ],
  },
  {
    folder: "Explosivos de Benellikov",
    tipo: "misc",
    itens: [
      { nome: "Granada de Fragmentação", cost: "40 PO", weight_in_load: 1, img: `${IC}/misc.svg`,
        desc: "<p><strong>2d6</strong> num raio de <strong>3 m</strong> (<strong>JPD</strong> reduz à metade). Arremesso a <strong>9 m</strong>.</p>" },
      { nome: "Bomba de Fumaça", cost: "20 PO", weight_in_load: 1, img: `${IC}/misc.svg`,
        desc: "<p>Cobertura total num raio de <strong>6 m</strong> por <strong>1d4 rodadas</strong>. Arremesso a <strong>9 m</strong>.</p>" },
      { nome: "Bomba de Clarão", cost: "25 PO", weight_in_load: 1, img: `${IC}/misc.svg`,
        desc: "<p>Alvos a até <strong>3 m</strong> do impacto fazem <strong>JP</strong> ou ficam <strong>cegos e ensurdecidos por 1 rodada</strong>. Arremesso a <strong>9 m</strong>.</p>" },
      { nome: "Carga de Demolição", cost: "60 PO", weight_in_load: 2, img: `${IC}/misc.svg`,
        desc: "<p>Fixa, alcance de <strong>toque</strong>. Contra estruturas, objetos e Construtos causa <strong>4d6</strong> ignorando metade da \"CA\" inanimada; detona no <strong>início da próxima rodada</strong>.</p>" },
    ],
  },
  {
    folder: "Munições Especiais",
    tipo: "misc",
    itens: [
      { nome: "Balas de Prata (10)", cost: "50 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Pacote com 10. Causa dano completo em criaturas vulneráveis à Prata (licantropos, certos mortos-vivos).</p>" },
      { nome: "Balas de Ferro Frio (10)", cost: "75 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Pacote com 10. Causa dano completo em criaturas vulneráveis ao Ferro Frio — fadas, demônios menores.</p>" },
      { nome: "Balas Perfurantes (Mitral) (10)", cost: "150 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Pacote com 10. Ignora 2 pontos de CA do alvo.</p>" },
    ],
  },
  {
    folder: "Munições de Cristal",
    tipo: "misc",
    itens: [
      // "Explode", "arma destruída" e "no inventário" só acontecem numa FALHA
      // CRÍTICA (1 natural no ataque) — num disparo normal a munição funciona
      // como descrito. A ressalva vale para as três munições que têm risco, e
      // sem ela a leitura natural é que o risco corre a cada tiro.
      { nome: "Flecha de Arcanita", cost: "50 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>O dano <strong>conta como mágico</strong>: fere criaturas imunes a armas comuns.</p>" },
      { nome: "Virote de Arcanita", cost: "60 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>O dano <strong>conta como mágico</strong>. Em crítico de 20, o alvo faz JPS ou sofre Silêncio por 1d4 rodadas.</p>" },
      { nome: "Bala de Arcanita", cost: "100 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>+2d6 de dano, que <strong>conta como mágico</strong>; o alvo faz JPC ou fica Atordoado.</p><p><strong>Risco:</strong> em falha crítica (1 natural), a munição explode — 2d6 ao usuário e a arma é destruída.</p>" },
      { nome: "Flecha de Ônix", cost: "40 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Ataque Fácil (+2) nas sombras ou pelas costas; realiza crítico com <strong>19–20</strong>.</p>" },
      { nome: "Virote de Ônix", cost: "50 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p><strong>+1d6 contra mortos-vivos</strong>, que também sofrem Exaustão — devora a energia que os anima.</p>" },
      { nome: "Bala de Ônix", cost: "80 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Disparo <strong>silencioso</strong>. −1 de Força no alvo por 8 turnos (dreno) e cria Escuridão num raio de 4,5 m.</p>" },
      { nome: "Flecha de Centelha Solar", cost: "70 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>+1d4 de dano de fogo; provoca Ignição no alvo.</p>" },
      { nome: "Virote de Centelha Solar", cost: "85 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>+1d6 de dano de fogo; provoca Cegueira.</p><p><strong>Risco:</strong> JPC se usado sob sol forte.</p>" },
      { nome: "Bala de Centelha Solar", cost: "150 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Dano em Área: 3d6 de fogo em raio de 3 m.</p><p><strong>Risco:</strong> em falha crítica (1 natural), explode no inventário.</p>" },
      { nome: "Flecha de Erebo", cost: "90 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Apaga luz mágica menor no ponto de impacto por 1d4 rodadas, e o alvo <strong>não recupera PV por magia</strong> por 1 rodada.</p>" },
      { nome: "Virote de Erebo", cost: "110 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>A conjuração do alvo fica <strong>Difícil (−2)</strong> por 1d4 rodadas.</p>" },
      { nome: "Bala de Erebo", cost: "180 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Todos os itens mágicos do alvo tornam-se <strong>mundanos</strong> por 1d4 rodadas.</p>" },
    ],
  },
];
