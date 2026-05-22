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
      { nome: "Kurogane", damage: "2d4", damage_type: "cortante", cost: "30 PO", weight_in_load: 1, desc: "<p>Arma tradicional dos Orcs de Yorugan (Média, Cortante). Lâmina larga e levemente curva, de fio assimétrico — os ferimentos tendem a abrir mais do que fechar. <strong>Sangrenta:</strong> realiza acertos críticos com 19 ou 20.</p>" },
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
      { nome: "Vestimenta de Núcleo Condutor", bonus_ca: 3, cost: "40 PO", weight_in_load: 1, desc: "<p>Armadura Média de Arcanita, <strong>exclusiva de Lito-arcanistas</strong> (extensão do sistema vital Arkanim — fatal para quem não tem núcleo mineral ativo). Concede +1 em JPC para Concentração.</p>" },
      { nome: "Panóplia do Núcleo de Ruptura", bonus_ca: 5, cost: "1.500 PO", weight_in_load: 2, desc: "<p>Armadura Pesada de Arcanita, <strong>exclusiva de Lito-arcanistas</strong>. Concede +2 em JPC física e +1d6 no dano da habilidade Ruptura do Núcleo.</p>" },
    ],
  },
  {
    folder: "Substâncias Alquímicas (Fungos do Degelo)",
    tipo: "misc",
    itens: [
      { nome: "Mandra (Pílula)", cost: "—", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Cura 4d6+3 PV e funciona como antídoto. <strong>Vício 1–2.</strong> Colateral/abstinência: insônia e exaustão permanente.</p>" },
      { nome: "Extrato de Mandra Diluído", cost: "50 PO", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Mandra diluída em 500 ml de líquido: cura 1d6 PV sem risco de vício. Também usado no tratamento de recuperação de vício.</p>" },
      { nome: "Albinus", cost: "—", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Cura total (exceto dano de fogo e ácido). <strong>Vício 1.</strong> Colateral: perda de 1d4 PV máximos por semana. Extraído ritualmente de Trolls das fendas térmicas de Vornfell.</p>" },
      { nome: "Fungo Sangue", cost: "—", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Concede Força 18 por 1d4 + Nível rodadas. <strong>Vício 1.</strong> Colateral: perda de 1d4 PV.</p>" },
      { nome: "Fungo Escarlate", cost: "—", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Concede Destreza 18 por 1d4 + Nível rodadas. <strong>Vício 1.</strong> Colateral: exaustão por 1 turno.</p>" },
      { nome: "Fungo Azure", cost: "—", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Concede Sabedoria 18 e Visão no Escuro. <strong>Vício 1.</strong> Colateral: cegueira temporária.</p>" },
      { nome: "Fungo Ébano", cost: "—", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Concede Pele de Pedra (+4 na CA). <strong>Vício 1.</strong> Colateral: testes Difíceis por 1d4 dias.</p>" },
      { nome: "Nargula", cost: "—", weight_in_load: 0, img: `${IC}/magic-potion.svg`, desc: "<p>Ignora dor, fome e frio por 2d6 horas. <strong>Vício 1.</strong> Colateral: paranoia e fúria.</p>" },
      { nome: "Cristal dos Sonhos", cost: "—", weight_in_load: 0, img: `${IC}/gem.svg`, desc: "<p>Provoca alucinações e visões proféticas. <strong>Vício 1–5.</strong> Colateral: depressão severa; risco de suicídio (1–3 em 1d6).</p>" },
    ],
  },
  {
    folder: "Equipamento Tático",
    tipo: "misc",
    itens: [
      { nome: "Saco de Esporos (Azul) — Pó de Morthan", cost: "25 PO", weight_in_load: 0, img: `${IC}/throw.svg`, desc: "<p>Arma de arremesso que, ao impacto, cria uma nuvem de 9 m de raio por 1d4 rodadas. Não causa vício. Variante Azul: provoca <strong>Paralisia</strong> (JP resiste).</p>" },
      { nome: "Saco de Esporos (Prateado) — Pó de Morthan", cost: "25 PO", weight_in_load: 0, img: `${IC}/throw.svg`, desc: "<p>Arma de arremesso que cria uma nuvem de 9 m de raio por 1d4 rodadas. Não causa vício. Variante Prateada: provoca <strong>Cegueira</strong> (JP resiste).</p>" },
      { nome: "Saco de Esporos (Púrpura) — Pó de Morthan", cost: "25 PO", weight_in_load: 0, img: `${IC}/throw.svg`, desc: "<p>Arma de arremesso que cria uma nuvem de 9 m de raio por 1d4 rodadas. Não causa vício. Variante Púrpura: provoca <strong>Sono</strong> (JP resiste).</p>" },
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
      { nome: "Mitral", cost: "", weight_in_load: 0, img: `${IC}/coins.svg`, desc: "<p>Torna armaduras mais leves (+1 na CA) e armas mais afiadas (+1 no dano). Em armas de fogo: +1 no dano e só engasga em 1 natural se também falhar no ataque. Extremamente raro. <strong>Custo: ×10 o valor base.</strong></p>" },
      { nome: "Arkanita", cost: "", weight_in_load: 0, img: `${IC}/gem.svg`, desc: "<p>Mineral que sustenta Arkádia, sagrado para os Clãs Mantis. Em armaduras: +1 em todas as JP contra magias. Em armas: o dano é mágico, afetando criaturas imunes a armas normais. <strong>Custo: ×5 o valor base.</strong></p>" },
      { nome: "Ônix", cost: "", weight_in_load: 0, img: `${IC}/gem.svg`, desc: "<p>Extraído das Montanhas de Ônix Negro de Breônia. Em armaduras: teste Fácil em Furtividade. Em armas brancas: +2 no dano em Ataques Furtivos ou pelas costas. Em armas de fogo: disparo completamente silencioso. <strong>Custo: ×4 o valor base.</strong></p>" },
      { nome: "Centelha Solar", cost: "", weight_in_load: 0, img: `${IC}/gem.svg`, desc: "<p>Forjado pela Guilda dos Ferreiros de Benellikov. Em armaduras: +1 em todas as JP contra medo, paralisia ou necromancia. Em armas: no primeiro ataque bem-sucedido de cada combate, +1d6 de dano de fogo. <strong>Custo: ×6 o valor base.</strong></p>" },
      { nome: "Erebo", cost: "", weight_in_load: 0, img: `${IC}/diamond.svg`, desc: "<p>Cristal raro que consome magia. Em armaduras: ao passar na JP contra uma magia, o efeito é totalmente anulado (sem dano parcial). Em armas: o alvo atingido tem a próxima magia que conjurar absorvida. Em armas mágicas: reduz o bônus em −1 por dia até ser removido. <strong>Custo: ×7 o valor base.</strong></p>" },
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
      { nome: "Flecha de Arcanita", cost: "50 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Ataque Muito Fácil (+5). <strong>Risco:</strong> 1d6 de dano mágico ao usuário e a arma é danificada.</p>" },
      { nome: "Virote de Arcanita", cost: "60 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Ataque Muito Fácil (+5) contra alvos de metal. <strong>Efeito:</strong> em crítico de 20, o alvo faz JPS ou sofre Silêncio por 1d4 rodadas.</p>" },
      { nome: "Bala de Arcanita", cost: "100 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>+2d6 de dano mágico; o alvo faz JPC ou fica Atordoado. <strong>Risco:</strong> a munição explode, causando 2d6 ao usuário e destruindo a arma.</p>" },
      { nome: "Flecha de Ônix", cost: "40 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Ataque Fácil (+2) nas sombras. +1d4 de dano mágico; realiza crítico com 19–20.</p>" },
      { nome: "Virote de Ônix", cost: "50 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>+1d6 de dano mágico; cura 1d4 PV do atirador. <strong>Contra mortos-vivos:</strong> causa Exaustão.</p>" },
      { nome: "Bala de Ônix", cost: "80 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p><strong>Efeito:</strong> −1 de Força no alvo por 8 turnos e cria Escuridão num raio de 4,5 m.</p>" },
      { nome: "Flecha de Centelha Solar", cost: "70 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>+1d4 de dano de fogo; provoca Ignição no alvo.</p>" },
      { nome: "Virote de Centelha Solar", cost: "85 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>+1d6 de dano de fogo; provoca Cegueira. <strong>Risco:</strong> JPC se usado sob sol forte.</p>" },
      { nome: "Bala de Centelha Solar", cost: "150 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Dano em Área: 3d6 de fogo em raio de 3 m. <strong>Risco:</strong> pode explodir no inventário.</p>" },
      { nome: "Flecha de Erebo", cost: "40 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p>Ataque Fácil (+2) nas sombras. <strong>Efeito:</strong> apaga luzes menores no ponto de impacto por 1d4 rodadas.</p>" },
      { nome: "Virote de Erebo", cost: "50 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p><strong>Efeito:</strong> o alvo faz conjurações com ajuste Difícil (−2) por 1d4 rodadas.</p>" },
      { nome: "Bala de Erebo", cost: "100 PO", weight_in_load: 0, img: `${IC}/ammunition.svg`, desc: "<p><strong>Efeito:</strong> todos os itens mágicos do alvo tornam-se mundanos por 1d4 rodadas.</p>" },
    ],
  },
];
