// Itens do Arsenal de Ekhoria — transcritos do livro "Ekhoria — Mecânicas para
// Old Dragon 2" (capítulo Arsenal de Ekhoria). Armas, armaduras e substâncias.
// Materiais especiais, cristais, munições e regras detalhadas ficam no journal
// "Arsenal — Materiais, Cristais e Regras".
//
// tipo: "weapon" | "armor" | "misc"

export const categorias = [
  {
    folder: "Armas",
    tipo: "weapon",
    itens: [
      { nome: "Kurogane", damage: "2d4", damage_type: "cortante", cost: "30 PO", weight_in_load: 1, img: "icons/weapons/swords/sword-katana-gold.webp", desc: "<p>Arma tradicional dos Orcs de Yorugan (Média, Cortante). Lâmina larga e levemente curva, de fio assimétrico — os ferimentos tendem a abrir mais do que fechar. <strong>Sangrenta:</strong> realiza acertos críticos com 19 ou 20.</p>" },
      { nome: "Soqueira de Bronze", damage: "1d4", damage_type: "impactante", cost: "2 PO", weight_in_load: 1, img: "icons/equipment/hand/gauntlet-armored-steel.webp", desc: "<p>Pequena, Impactante. Permite causar dano letal com ataques desarmados. É a única variante de soqueira permitida a Clérigos.</p>" },
      { nome: "Soqueira de Espinhos", damage: "1d4", damage_type: "perfurante", cost: "4 PO", weight_in_load: 1, img: "icons/equipment/hand/gauntlet-spiked-leather-brown.webp", desc: "<p>Pequena, Perfurante. Permite causar dano letal com ataques desarmados.</p>" },
      { nome: "Kattar", damage: "1d4", damage_type: "cortante", cost: "5 PO", weight_in_load: 1, img: "icons/weapons/daggers/dagger-bone.webp", desc: "<p>Pequena, Cortante. Soqueira de lâminas que permite causar dano letal cortante com ataques desarmados.</p>" },
      { nome: "Pistola de Pederneira", damage: "1d4", ranged: true, shoot_range: 15, cost: "70 PO", weight_in_load: 1, img: "icons/weapons/guns/gun-pistol-flintlock-metal.webp", desc: "<p>Pequena, Disparo (15 m). Tambor rotativo de 4 câmaras; recarga de 1 rodada por câmara. <strong>Instável:</strong> resultados 1–2 no d20 causam falha crítica. Por ser arma de Disparo, não soma modificador de Força no dano.</p>" },
      { nome: "Mosquete de Chapa", damage: "1d6", ranged: true, shoot_range: 30, two_handed: true, cost: "110 PO", weight_in_load: 2, img: "icons/weapons/guns/gun-musket-wood.webp", desc: "<p>Média, Disparo (30 m), Duas Mãos. Tambor rotativo de 3 câmaras; recarga de 1 rodada por câmara. <strong>Instável:</strong> resultados 1–2 no d20 causam falha crítica. Por ser arma de Disparo, não soma modificador de Força no dano.</p>" },
    ],
  },
  {
    folder: "Armaduras",
    tipo: "armor",
    itens: [
      { nome: "Couraça Lagarto-Gelo", bonus_ca: 3, cost: "40 PO", weight_in_load: 1, img: "icons/equipment/chest/breastplate-scale-grey.webp", desc: "<p>Armadura Leve de couro (Carga 1), feita com o couro de répteis das tundras de Vornfell. <strong>Antifuro:</strong> concede +1 na CA contra armas perfurantes, incluindo flechas, lanças e estocadas.</p>" },
      { nome: "Vestimenta de Núcleo Condutor", bonus_ca: 3, cost: "40 PO", weight_in_load: 1, img: "icons/equipment/chest/breastplate-cuirass-steel-blue.webp", desc: "<p>Armadura Média de Arcanita, <strong>exclusiva de Lito-arcanistas</strong> (extensão do sistema vital Arkanim — fatal para quem não tem núcleo mineral ativo). Concede +1 em JPC para Concentração.</p>" },
      { nome: "Panóplia do Núcleo de Ruptura", bonus_ca: 5, cost: "1.500 PO", weight_in_load: 2, img: "icons/equipment/chest/breastplate-helmet-metal.webp", desc: "<p>Armadura Pesada de Arcanita, <strong>exclusiva de Lito-arcanistas</strong>. Concede +2 em JPC física e +1d6 no dano da habilidade Ruptura do Núcleo.</p>" },
    ],
  },
  {
    folder: "Substâncias Alquímicas (Fungos do Degelo)",
    tipo: "misc",
    itens: [
      { nome: "Mandra (Pílula)", cost: "—", weight_in_load: 0, desc: "<p>Cura 4d6+3 PV e funciona como antídoto. <strong>Vício 1–2.</strong> Colateral/abstinência: insônia e exaustão permanente.</p>" },
      { nome: "Extrato de Mandra Diluído", cost: "50 PO", weight_in_load: 0, desc: "<p>Mandra diluída em 500 ml de líquido: cura 1d6 PV sem risco de vício. Também usado no tratamento de recuperação de vício.</p>" },
      { nome: "Albinus", cost: "—", weight_in_load: 0, desc: "<p>Cura total (exceto dano de fogo e ácido). <strong>Vício 1.</strong> Colateral: perda de 1d4 PV máximos por semana. Extraído ritualmente de Trolls das fendas térmicas de Vornfell.</p>" },
      { nome: "Fungo Sangue", cost: "—", weight_in_load: 0, desc: "<p>Concede Força 18 por 1d4 + Nível rodadas. <strong>Vício 1.</strong> Colateral: perda de 1d4 PV.</p>" },
      { nome: "Fungo Escarlate", cost: "—", weight_in_load: 0, desc: "<p>Concede Destreza 18 por 1d4 + Nível rodadas. <strong>Vício 1.</strong> Colateral: exaustão por 1 turno.</p>" },
      { nome: "Fungo Azure", cost: "—", weight_in_load: 0, desc: "<p>Concede Sabedoria 18 e Visão no Escuro. <strong>Vício 1.</strong> Colateral: cegueira temporária.</p>" },
      { nome: "Fungo Ébano", cost: "—", weight_in_load: 0, desc: "<p>Concede Pele de Pedra (+4 na CA). <strong>Vício 1.</strong> Colateral: testes Difíceis por 1d4 dias.</p>" },
      { nome: "Nargula", cost: "—", weight_in_load: 0, desc: "<p>Ignora dor, fome e frio por 2d6 horas. <strong>Vício 1.</strong> Colateral: paranoia e fúria.</p>" },
      { nome: "Cristal dos Sonhos", cost: "—", weight_in_load: 0, desc: "<p>Provoca alucinações e visões proféticas. <strong>Vício 1–5.</strong> Colateral: depressão severa; risco de suicídio (1–3 em 1d6).</p>" },
    ],
  },
  {
    folder: "Equipamento Tático",
    tipo: "misc",
    itens: [
      { nome: "Saco de Esporos (Azul) — Pó de Morthan", cost: "25 PO", weight_in_load: 0, img: "icons/consumables/potions/bottle-round-corked-orange.webp", desc: "<p>Arma de arremesso que, ao impacto, cria uma nuvem de 9 m de raio por 1d4 rodadas. Não causa vício. Variante Azul: provoca <strong>Paralisia</strong> (JP resiste).</p>" },
      { nome: "Saco de Esporos (Prateado) — Pó de Morthan", cost: "25 PO", weight_in_load: 0, img: "icons/consumables/potions/bottle-round-corked-white.webp", desc: "<p>Arma de arremesso que cria uma nuvem de 9 m de raio por 1d4 rodadas. Não causa vício. Variante Prateada: provoca <strong>Cegueira</strong> (JP resiste).</p>" },
      { nome: "Saco de Esporos (Púrpura) — Pó de Morthan", cost: "25 PO", weight_in_load: 0, img: "icons/consumables/potions/bottle-round-corked-purple.webp", desc: "<p>Arma de arremesso que cria uma nuvem de 9 m de raio por 1d4 rodadas. Não causa vício. Variante Púrpura: provoca <strong>Sono</strong> (JP resiste).</p>" },
      { nome: "Máscara de Nurillion", cost: "—", weight_in_load: 1, img: "icons/equipment/head/mask-carved-scream-tan.webp", desc: "<p>Utiliza filtros minerais aquecidos que concedem imunidade a gases tóxicos e aos efeitos de todos os Sacos de Esporos. Item padrão em expedições de Vornfell e nas operações da Irmandade Voraz.</p>" },
      { nome: "Bala de Chumbo (20)", cost: "4 PO", weight_in_load: 0, img: "icons/consumables/ammunition/3-bullets-lead-grey.webp", desc: "<p>Munição para armas de fogo (pacote com 20). Existem variantes especiais (Prata, Ferro Frio, Mitral) e munições de cristal — ver journal de referência.</p>" },
    ],
  },
];
