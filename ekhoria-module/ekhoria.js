/**
 * Ekhoria — Módulo para Old Dragon 2e no Foundry VTT
 * Adiciona classes, raças e conteúdo exclusivo do cenário Ekhoria.
 */

// ─────────────────────────────────────────────
//  DADOS DAS CLASSES EXCLUSIVAS DE EKHORIA
// ─────────────────────────────────────────────

const EKHORIA_CLASSES = {
  CUSTODIO: {
    nome: "Custódio Solar",
    descricao: "Guerreiro-Clérigo solar. Exclusivo de Autokthons.",
    dv: 8,
    restricao_raca: "AUTOKTHON",
    habilidades: [
      { nivel: 1, texto: "Magias Divinas Solares: Lança magias do círculo solar diariamente." },
      { nivel: 1, texto: "Cura por Luz: 1×/dia cura 1d8+nível PV em aliado a 9m." },
      { nivel: 3, texto: "Disciplina Solar: +1 BA e dano com arma (ou +1 CA, à escolha)." },
      { nivel: 6, texto: "Brilho Protetor: Aura de 3m que cega mortos-vivos por 1 rodada (JPS anula); +2 CA aliados na aura." },
      { nivel: 10, texto: "Transcendência Solar: 1×/dia emite pulso de luz em raio de 9m causando nível×1d6 de dano a mortos-vivos e quebra maldições." }
    ]
  },
  RELICARIO: {
    nome: "Relicário Vivo",
    descricao: "Hospedeiro de entidade. Exclusivo de Silentes.",
    dv: 8,
    restricao_raca: "SILENTE",
    habilidades: [
      { nivel: 1, texto: "Entidade Interna: Acessa magias divinas pagando 2 PV por círculo da magia." },
      { nivel: 1, texto: "Ressonância: 1×/dia invoca habilidade da entidade (acordar com o MJ)." },
      { nivel: 3, texto: "Controle Parcial: Pode suprimir ou libertar a entidade por até 1 hora; recupera 1d4 PV ao suprimir." },
      { nivel: 6, texto: "Fusão Temporária: +4 em um atributo à escolha e CA +2 por 1h." },
      { nivel: 10, texto: "Domínio Pleno: Entidade obedece completamente; usa todas as habilidades dela 1×/dia sem custo em PV." }
    ]
  },
  NARCOGUERRE: {
    nome: "Narcoguerreiro",
    descricao: "Especialista em Fungos do Degelo de Vornfell.",
    dv: 10,
    habilidades: [
      { nivel: 1, texto: "Maestria em Arma: +1 no dano com uma arma à escolha." },
      { nivel: 1, texto: "Conhecimento Químico: Imune a Pó de Morthan e gases tóxicos." },
      { nivel: 1, texto: "Uso Seguro de Seiva: Cura 1d4 PV com Seiva de Yggdras Diluída." },
      { nivel: 3, texto: "Coquetel Marcial: Combina dois Fungos do Degelo diferentes simultaneamente." },
      { nivel: 6, texto: "Metabolismo Acelerado: +1 JPC permanente; +2 contra venenos e vício." },
      { nivel: 10, texto: "Tolerância de Elite: Regenera 1d4 PV/rodada por 1d4+mod.CON rodadas." }
    ]
  },
  PUGILISTA: {
    nome: "Pugilista",
    descricao: "Especializado em armas pequenas/médias e combate desarmado.",
    dv: 10,
    habilidades: [
      { nivel: 1, texto: "Maestria em Arma: +1 no dano com uma arma à escolha." },
      { nivel: 1, texto: "Escola Marcial: Escolha sua escola (Mãos de Ferro, Dança do Vento ou Punhos do Vale)." },
      { nivel: 3, texto: "Combate Desarmado Aprimorado: Ataques desarmados causam 1d4+mod.FOR." },
      { nivel: 6, texto: "Resistência de Campeão: +1 JP permanente. Ao chegar a 0 PV, pode ficar de pé com 1 PV (1×/combate)." },
      { nivel: 10, texto: "Maestria Corporal: Ataques desarmados causam 1d6+mod.FOR; segundo ataque desarmado." }
    ]
  },
  LITO: {
    nome: "Lito-arcanista",
    descricao: "Mago com corpo saturado de cristais via Ritual da Saturação.",
    dv: 4,
    habilidades: [
      { nivel: 1, texto: "Corpo Cristalino: Resistência natural a um tipo de dano (fogo, gelo ou elétrico). CA natural +1." },
      { nivel: 1, texto: "Ressonância Mineral: Detecta cristais mágicos a 18m." },
      { nivel: 3, texto: "Magia Elementar: Acesso a magias elementais do cristal dominante como extra de 1º." },
      { nivel: 6, texto: "Forma de Pedra: 1×/dia transforma parcialmente o corpo por 1 hora: +2 CA." },
      { nivel: 10, texto: "Coração de Cristal: Imune ao tipo de dano do cristal dominante." }
    ]
  },
  GUARDIAO: {
    nome: "Guardião da Centelha",
    descricao: "Elite de Cinthara; usa cristais de combate.",
    dv: 10,
    habilidades: [
      { nivel: 1, texto: "Maestria em Arma: +1 no dano com arma à escolha." },
      { nivel: 1, texto: "Arte da Centelha: Cone de 3m, causa 1d6 de dano a até 3 criaturas (JPD reduz à metade). 1×/round." },
      { nivel: 3, texto: "Escudo de Cristal: 1×/dia, barreira de Arkanita absorve (nível×2) de dano antes de quebrar." },
      { nivel: 6, texto: "Rajada Combinada: Combina dois tipos de cristal; Arte da Centelha causa +1d6 e aplica efeito do segundo cristal." },
      { nivel: 10, texto: "Mestre da Centelha: Ataques com cristais causam +2d6; pode usar Arte da Centelha como magia de 3º círculo 1×/dia (3d6, cone 9m)." }
    ]
  },
  DIPLOMATA: {
    nome: "Diplomata",
    descricao: "Especialista em negociação e influência social da Irmandade de Ekhoria.",
    dv: 6,
    habilidades: [
      { nivel: 1, texto: "Ouvir Ruídos: 1–2 em 1d6 em ambiente silencioso." },
      { nivel: 1, texto: "Comitiva: Custo de contratação –25%; +1 Moral para seguidores." },
      { nivel: 1, texto: "Talentos de Diplomata: 2 pts em cada + 2 adicionais." },
      { nivel: 3, texto: "Audiência: 1–2 em 1d6 + mod. CAR para bônus em Teste de Reação." },
      { nivel: 6, texto: "Traquejo Social: Aprende 1 idioma adicional por ponto de mod. CAR." },
      { nivel: 10, texto: "Rede de Contatos: Teste de CAR → 1d4 contatos fornecem informações obscuras." }
    ]
  },
  VORAZ: {
    nome: "Voraz",
    descricao: "Irmandade Voraz de Vornfell. Especialista em criaturas monstruosas.",
    dv: 6,
    habilidades: [
      { nivel: 1, texto: "Anatomia de Campo: Ataques contra criaturas monstruosas são Fáceis na 1ª rodada." },
      { nivel: 1, texto: "Arsenal do Inimigo: Cria armas improvisadas de partes de criaturas (dano 1d6)." },
      { nivel: 3, texto: "Medo Como Ferramenta: 1×/combate, ao abater criatura, intimida criaturas do mesmo tipo." },
      { nivel: 6, texto: "Caça Especializada: Contra tipo escolhido: dano +1d6 e JP bônus +2." },
      { nivel: 10, texto: "Anatomista de Elite: Ataque Furtivo retorna contra criaturas de caça especializada." }
    ]
  }
};

// ─────────────────────────────────────────────
//  DADOS DAS RAÇAS EXCLUSIVAS DE EKHORIA
// ─────────────────────────────────────────────

const EKHORIA_RACAS = {
  ARKANIM: {
    nome: "Arkanim",
    descricao: "Filhos de Arkádia. Sensíveis à magia e com herança arcana.",
    movimento: 9,
    habilidades: [
      "Filhos de Arkádia: 1 em 1d6 de detectar anomalias mágicas.",
      "Infecção Mágica: +1 em JPS e JPC por origem arcana.",
      "Herança Arcana: Conjura 1 magia de 1º nível aleatória, 1×/dia."
    ]
  },
  ATLANTE: {
    nome: "Atlante",
    descricao: "Anfíbios ordeiros descendentes de civilizações abissais.",
    movimento: 9,
    movimentoNatacao: 12,
    habilidades: [
      "Infravisão: 18m subaquática; 18m fora.",
      "Anfíbios: Respiram sob a água; sem penalidades submerso.",
      "Adaptabilidade: +1 em uma JP à escolha.",
      "Letrados: Leem/escrevem próprio idioma + um adicional.",
      "Dependência de Água: Dobro de água diária; mergulhar 1×/semana.",
      "Movimento: 9m em terra, 12m nadando."
    ]
  },
  AUTOKTHON: {
    nome: "Autokthon",
    descricao: "Constructos vivos com Pedra da Alma. Não dormem, não comem, não envelhecem.",
    movimento: 9,
    habilidades: [
      "Pedra da Alma (Hers'ta): Destruí-la = morte instantânea; removê-la = coma.",
      "Constructo Vivo: Não dorme, não come, não respira, não envelhece. Imune a venenos, doenças. Não bebe poções.",
      "Resistência Arcana: 8h de estudo para memorizar magias.",
      "Suscetível: Vulnerável a efeitos mentais, paralisia, cegueira.",
      "Construção Variável: 2 características únicas de construção."
    ]
  },
  CAMBION: {
    nome: "Cambion",
    descricao: "Descendentes de linhagem demoníaca. Tendem ao Caos.",
    movimento: 9,
    habilidades: [
      "Resistência das Trevas: +1 em JPS e JPC contra efeitos mágicos.",
      "Herança Infernal: Uma habilidade menor da linhagem demoníaca.",
      "Estigma Social: –2 em Testes de Reação com raças que temem demônios.",
      "Infravisão: 18 metros."
    ]
  },
  MANTES: {
    nome: "Mantes",
    descricao: "Insectoides com exoesqueleto natural e membros extras.",
    movimento: 9,
    habilidades: [
      "Infravisão: 18 metros.",
      "Exoesqueleto: CA natural 14; não usa armaduras.",
      "Saltadores: Saltam o dobro da distância humana.",
      "Graciosos: +1 em JPD.",
      "Sem Sono: Imune à magia Sono.",
      "Ecdise: 1×/ano passa 1 dia imóvel mudando exoesqueleto. Ao final: recupera todos PV, remove venenos/doenças crônicas e restaura membros perdidos não-vitais.",
      "Membros Extras: Duas mãos destras; ataque extra sem penalidade."
    ]
  },
  NEFILIM: {
    nome: "Nefilim",
    descricao: "Descendentes celestiais de presença calmante. Incapazes de mentir.",
    movimento: 9,
    habilidades: [
      "Presença Celestial: Aura que acalma involuntariamente.",
      "Incapaz de Mentir: Tentativas de mentira falham automaticamente.",
      "Resistência Divina: +1 em uma JP à escolha.",
      "Recuperação Acelerada: Cura 2 PV/dia normalmente; 1d6+2 PV com repouso completo."
    ]
  },
  ORC_SOL: {
    nome: "Orc do Sol Poente",
    descricao: "Orcs disciplinados e refinados. Tendem à Ordem.",
    movimento: 9,
    habilidades: [
      "Infravisão: 18 metros.",
      "Técnica Refinada: +1 no dano com armas cortantes e perfurantes.",
      "Corpos Forjados: Testes de força para erguer/empurrar são sempre Fáceis.",
      "Postura do Sol Poente: +1 em JPC.",
      "Disciplina de Marcha: Armaduras contam 1 ponto mais leves para carga."
    ]
  },
  SILENTE: {
    nome: "Silente",
    descricao: "Não curam naturalmente. Corpo Estático que absorve sangue para regenerar.",
    movimento: 9,
    habilidades: [
      "Eco-Sombrio: –4 em testes de reação; 1 em 1d6 de passar despercebido.",
      "Mestre das Lâminas Curtas: Ataques com adagas/facas são Fáceis; +1 CA usando duas lâminas.",
      "Corpo Estático: Não cura naturalmente nem por magia. Beber 500ml de sangue fresco restaura 1d4 PV.",
      "Eco Antimágico: Não conjura; imune a magias diretas."
    ]
  },
  VARKO: {
    nome: "Varko",
    descricao: "Pequenos seres das profundezas. Infravisão de 30m. Luz forte os prejudica.",
    movimento: 6,
    habilidades: [
      "Infravisão: 30 metros.",
      "Conhecimento das Profundezas: 1–2 em 1d6 para informações subterrâneas.",
      "Vigorosos: +1 em JPC.",
      "Pequenos: Ataques de criaturas grandes são Difíceis.",
      "Restrições: Apenas armas pequenas/médias; luz forte = tudo Difícil.",
      "Sono Intranquilo: Dorme 4h; recupera 1d2+1 PV por descanso."
    ]
  }
};

// ─────────────────────────────────────────────
//  INICIALIZAÇÃO DO MÓDULO
// ─────────────────────────────────────────────

Hooks.once("init", () => {
  console.log("Ekhoria | Módulo inicializado.");
});

Hooks.once("ready", () => {
  console.log("Ekhoria | Módulo pronto.");

  // Expõe os dados globalmente para uso em macros e outros módulos
  game.ekhoria = {
    classes: EKHORIA_CLASSES,
    racas: EKHORIA_RACAS
  };
});

// ─────────────────────────────────────────────
//  ENRIQUECIMENTO DA FICHA — injeta dados Ekhoria
//  na ficha padrão do OD2e quando a classe/raça
//  for exclusiva do cenário
// ─────────────────────────────────────────────

// Normaliza nome para comparação sem acento/caixa.
function normalizarNome(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toUpperCase()
    .trim();
}

// Conjunto dos nomes de classes/raças exclusivas de Ekhoria (normalizados).
const NOMES_EKHORIA = new Set([
  ...Object.values(EKHORIA_CLASSES).map(c => normalizarNome(c.nome)),
  ...Object.values(EKHORIA_RACAS).map(r => normalizarNome(r.nome)),
]);

Hooks.on("renderActorSheet", (sheet, html) => {
  const actor = sheet.actor;
  if (!actor || actor.type !== "character") return;

  // No OD2, classe e raça são Items embarcados na ficha (não há system.classe.value).
  const classe = actor.items.find(i => i.type === "class");
  const raca = actor.items.find(i => i.type === "race");
  const usaEkhoria =
    (classe && NOMES_EKHORIA.has(normalizarNome(classe.name))) ||
    (raca && NOMES_EKHORIA.has(normalizarNome(raca.name)));
  if (!usaEkhoria) return;

  // `html` é jQuery nas sheets V1 e HTMLElement nas V2 — normaliza para DOM nativo.
  const root = html?.[0] ?? html;
  const titulo = root?.querySelector?.(".window-header .window-title");
  if (!titulo || titulo.parentElement?.querySelector(".ekhoria-badge")) return;

  // Badge "Ekhoria" no topo da ficha (DOM seguro, sem innerHTML).
  const badge = document.createElement("div");
  badge.className = "ekhoria-badge";
  badge.title = "Personagem usa conteúdo exclusivo de Ekhoria";
  badge.textContent = "✦ EKHORIA";
  titulo.after(badge);
});

// ─────────────────────────────────────────────
//  MACRO AUXILIAR — Exibir habilidades da classe
//  Uso: game.ekhoria.exibirHabilidades("GUARDIAO")
// ─────────────────────────────────────────────

Hooks.once("ready", () => {
  game.ekhoria.exibirHabilidades = function(idClasse) {
    const classe = EKHORIA_CLASSES[idClasse.toUpperCase()];
    if (!classe) {
      ui.notifications.warn(`Ekhoria: Classe "${idClasse}" não encontrada.`);
      return;
    }

    const linhas = classe.habilidades
      .map(h => `<li><strong>Nível ${h.nivel}:</strong> ${h.texto}</li>`)
      .join("");

    const conteudo = `
      <h2>${classe.nome}</h2>
      <p><em>${classe.descricao}</em></p>
      <p><strong>DV:</strong> 1d${classe.dv}</p>
      <ul>${linhas}</ul>`;

    foundry.applications.api.DialogV2.prompt({
      window: { title: `Classe: ${classe.nome}` },
      content: conteudo,
      ok: { label: "Fechar" },
      rejectClose: false,
    });
  };

  game.ekhoria.exibirRaca = function(idRaca) {
    const raca = EKHORIA_RACAS[idRaca.toUpperCase()];
    if (!raca) {
      ui.notifications.warn(`Ekhoria: Raça "${idRaca}" não encontrada.`);
      return;
    }

    const linhas = raca.habilidades
      .map(h => `<li>${h}</li>`)
      .join("");

    const mov = raca.movimentoNatacao
      ? `${raca.movimento}m (terra) / ${raca.movimentoNatacao}m (natação)`
      : `${raca.movimento}m`;

    const conteudo = `
      <h2>${raca.nome}</h2>
      <p><em>${raca.descricao}</em></p>
      <p><strong>Movimento:</strong> ${mov}</p>
      <ul>${linhas}</ul>`;

    foundry.applications.api.DialogV2.prompt({
      window: { title: `Raça: ${raca.nome}` },
      content: conteudo,
      ok: { label: "Fechar" },
      rejectClose: false,
    });
  };
});
