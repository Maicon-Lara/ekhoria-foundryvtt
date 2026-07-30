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

import { ecosComuns } from "./ecos.mjs";

const PASTA_ESCOLAS = "Marcado (Escolas)";

const ESCOLAS = [
  {
    folder: PASTA_ESCOLAS,
    nome: "Verme Escarlate (marcial)",
    level: 3,
    desc:
      "<p><em>Equilíbrio marcial — a lâmina e o Eco, um só instrumento.</em></p>" +
      "<p>Inspirada nos <strong>Vermes Escarlates</strong> das Areias Esquecidas, esta Escola não " +
      "escolhe entre arma e mutação: treina para que os dois sejam o mesmo gesto. Surgiu entre " +
      "caçadores das bordas do deserto que perceberam que lâmina e Eco, usados no mesmo impulso, " +
      "eram mais devastadores que qualquer um separado.</p>" +
      "<p><strong>Maestria com Lâminas Curtas e Longas:</strong> <strong>+2 no dano</strong> com " +
      "espadas curtas, longas ou bastardas.</p>" +
      "<p><strong>Eco Rhoz</strong> <em>(Iniciado)</em>: sopra a palavra sobre o próprio aço e a " +
      "lâmina esquenta até o vermelho. Pelas próximas <strong>1d4+1 rodadas</strong>, os ataques " +
      "com essas espadas causam <strong>+1d6 de dano por fogo</strong>. Liberado como " +
      "<strong>parte</strong> do ataque — não gasta a ação.</p>",
    level6:
      "<p><strong>Eco Draum</strong> <em>(Adepto)</em>: uma onda de pressão somática. Os alvos " +
      "fazem <strong>JPD</strong> ou ficam derrubados e atordoados por <strong>1 rodada</strong>. " +
      "Pode ser usado como <em>Ação de Ataque</em>, no lugar de um ataque normal.</p>",
    level10:
      "<p><strong>Ataque Extra:</strong> um <strong>segundo ataque por rodada</strong> com " +
      "espadas curtas, longas ou bastardas.</p>",
  },
  {
    folder: PASTA_ESCOLAS,
    nome: "Águia-Cadáver (Ecos)",
    level: 3,
    // Sem `usos_dia`: o Skorn era 1×/dia numa versão anterior do livro e agora
    // sai do MESMO pool dos outros Ecos, contado em "Ecos de Mutação". Um
    // marcador próprio aqui daria um uso a mais do que a regra concede.
    desc:
      "<p><em>Poder dos Ecos — a mutação como linguagem.</em></p>" +
      "<p>A <strong>Águia-Cadáver</strong> não consta nas enciclopédias da Ars Vocalis; consta " +
      "nos relatos da Irmandade Voraz: uma ave de rapina dos Pinheirais Negros de Vornfell cujos " +
      "tecidos concentram resíduos energéticos das abominações que consome. Os Marcados desta " +
      "Escola modelaram a própria mutação observando esse processo — absorver, concentrar, " +
      "liberar.</p>" +
      "<p><strong>Ecos Amplificados:</strong> o dano de <strong>todo</strong> Eco que cause dano " +
      "aumenta em <strong>+1 por dado</strong>.</p>" +
      "<p><strong>Eco Skorn</strong> <em>(Iniciado)</em>: cria uma barreira de contenção somática " +
      "equivalente a <em>Escudo Arcano</em> (bônus de CA e absorção de <em>Mísseis Mágicos</em>).</p>",
    level6:
      "<p><strong>Eco Ygth</strong> <em>(Adepto)</em>: uma descarga que ancora criaturas ao plano " +
      "físico (como <em>Teia</em>, mas somática — afeta apenas o movimento). Criaturas mágicas e " +
      "mortos-vivos com <strong>3 DV ou menos</strong> falham automaticamente na JPD.</p>",
    level10:
      "<p><strong>Fluxo de Mutação:</strong> um turno em <strong>descanso concentrado</strong> " +
      "(sem atacar nem se mover) recupera <strong>todos os usos diários dos seus Ecos</strong>.</p>" +
      "<p><strong>Eco Residual</strong> <em>(Adepto)</em>: o que a Escola passou dez níveis " +
      "estudando na ave, o corpo finalmente faz. Um <strong>grito sônico-necrótico em cone de " +
      "6 m</strong>: <strong>2d6</strong> de dano e <strong>JPC</strong> ou <strong>aturdido por " +
      "1 rodada</strong>. É o mesmo Eco da Águia-Cadáver do bestiário — e, com os " +
      "<em>Ecos Amplificados</em>, sai por <strong>2d6+2</strong>.</p>",
  },
  {
    folder: PASTA_ESCOLAS,
    nome: "Couraçado (furtivo)",
    level: 3,
    desc:
      "<p><em>Agilidade e precisão — o golpe que a presa não viu.</em></p>" +
      "<p>Os <strong>Couraçados</strong> — as bestas blindadas das Areias — parecem lentos até o " +
      "instante em que não são. Esta Escola estuda essa contradição: um corpo que parece pesado e " +
      "é impossível de rastrear quando decide não ser encontrado. Seus Marcados tendem a vir de " +
      "<strong>Benellikov</strong>, onde a arena pune a lentidão, e do Subterrâneo Profundo, onde " +
      "fazer barulho é erro que não se comete duas vezes.</p>" +
      "<p><strong>Treinamento de Sombras:</strong> ganha os talentos <strong>Furtividade</strong> " +
      "e <strong>Escalar</strong> como um Ladrão de 1º nível, com as mesmas chances base, " +
      "evoluindo normalmente com o nível.</p>" +
      "<p><strong>Eco Mhul</strong> <em>(Iniciado)</em>: a pele fecha os poros e a garganta abafa " +
      "a respiração — o corpo para de fazer barulho e de cheirar. Por <strong>1 turno</strong>, " +
      "todo teste para ouvir, farejar ou rastrear o Marcado é <strong>Muito Difícil (−5)</strong>, " +
      "e criaturas que caçam por olfato simplesmente o perdem. <em>Não o torna invisível.</em></p>" +
      "<p><em>Na ficha:</em> os dois talentos aparecem roláveis no bloco de Talentos. O OD2 " +
      "distribui a mesma reserva de pontos do Ladrão (2 + modificador de Destreza, mais 2 nos " +
      "níveis 3, 6 e 10) — como aqui há só dois talentos em vez de cinco, sobra ponto; gaste até " +
      "o teto de 5 em cada e ignore o resto.</p>",
    // A regra dá dois Talentos de Ladrão a uma classe de Guerreiro. Sem este
    // array o sistema não mostra bloco de talento nenhum — has_rogue_talents
    // procura justamente uma class_ability com rogue_talents preenchido.
    rogue_talents: [
      { key: "furtividade", name: "Furtividade", description: "Esconder-se imóvel nas sombras, sem ser detectado sem o uso de magia." },
      { key: "escalar", name: "Escalar", description: "Escalar superfícies sem cordas, incluindo as íngremes e lisas." },
    ],
    level6:
      "<p><strong>Golpe de Precisão:</strong> contra inimigo desprevenido ou flanqueado, " +
      "<strong>+1d6 de dano</strong> (similar ao Ataque Furtivo do Ladrão).</p>" +
      "<p><strong>Eco Vresk</strong> <em>(Adepto)</em>: a carapaça subcutânea das Areias endurece " +
      "de uma vez, no instante certo. Usado <strong>como reação a um ataque que o acertou</strong>, " +
      "reduz o dano daquele golpe em <strong>1d8+2</strong>. Se o dano cair a zero, a lâmina " +
      "entorta ou lasca na placa — armas mundanas sofrem <strong>−1 permanente</strong>.</p>",
    level10:
      "<p><strong>Reflexos de Prata:</strong> <strong>+2 na CA</strong> contra ataques de monstros " +
      "e criaturas não humanoides — leu tantos corpos de feras que antecipa os padrões antes de " +
      "vê-los.</p>",
  },
  {
    folder: PASTA_ESCOLAS,
    nome: "Fera-Abissal (vigor)",
    level: 3,
    desc:
      "<p><em>Vigor e alquimia pesada — o corpo como fortaleza.</em></p>" +
      "<p>Nos <strong>Níveis Proibidos</strong> de Cinthara há registros — que o Conselho de Clãs " +
      "preferiria destruir — de experimentos do <strong>Punhal Tenebroso</strong> com extratos de " +
      "organismos das proximidades da <strong>Fenda Abissal</strong>. Os resultados foram… " +
      "robustos. Esta Escola não tem nome oficial porque sua origem é embaraçosa para todo mundo, " +
      "mas quem sobreviveu ao processo é inegavelmente mais difícil de matar.</p>" +
      "<p><strong>Tolerância Abissal:</strong> pode estar sob o efeito de <strong>duas " +
      "substâncias de combate simultaneamente</strong>. Os efeitos de exaustão só se aplicam " +
      "<strong>após o término de ambos</strong>.</p>" +
      "<p><strong>Eco Orgh</strong> <em>(Iniciado)</em>: o metabolismo queima tudo o que tem de " +
      "uma vez. Ganha <strong>1d8+2 pontos de vida temporários</strong> por <strong>1 turno</strong>, " +
      "que <strong>não se acumulam</strong> com outro Orgh. Quando acabam, perde <strong>1 ponto " +
      "de Constituição até o próximo descanso longo</strong> — o corpo cobra o adiantamento.</p>",
    level6:
      "<p><strong>Couro de Mutante:</strong> <strong>+1 ponto de vida por nível</strong> a partir " +
      "deste nível (retroativo ao 1º) e <strong>+1 de CA natural</strong> — a pele espessou, e não " +
      "vai desespessar.</p>" +
      "<p><strong>Eco Brakk</strong> <em>(Adepto)</em>: as glândulas dorsais expelem uma nuvem de " +
      "esporos abissais num <strong>raio de 3 m</strong> centrado no Marcado. Quem estiver dentro " +
      "faz <strong>JPC</strong> ou sofre <strong>1d6 de dano</strong> e fica <strong>cego por 1d4 " +
      "rodadas</strong>. <strong>O Marcado é imune aos próprios esporos</strong>, e a nuvem " +
      "permanece por 2 rodadas.</p>",
    level10:
      "<p><strong>Sangue Corrosivo:</strong> o sangue do Marcado tornou-se quimicamente " +
      "incompatível com o que queira consumi-lo. Qualquer criatura que <strong>o morder</strong> " +
      "ou ingerir seu sangue sofre <strong>1d6 de dano ácido imediato</strong> e faz " +
      "<strong>JPC</strong> contra veneno paralisante.</p>",
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

// As Escolas levam a nota de uso; os Ecos já vêm com a sua (ecos.mjs). Os dois
// grupos vão no mesmo export porque o build só precisa saber a `folder` de cada
// um — "Marcado (Escolas)" e "Marcado (Ecos)" viram duas subpastas de Marcado.
export const classAbilitiesAvulsas = [
  ...ESCOLAS.map((a) => ({ ...a, desc: (a.desc || "") + COMO_ADICIONAR })),
  ...ecosComuns,
];
