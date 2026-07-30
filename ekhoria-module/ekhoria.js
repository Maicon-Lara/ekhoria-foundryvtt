/**
 * Ekhoria — Módulo para Old Dragon 2e no Foundry VTT
 * Adiciona classes, raças e conteúdo exclusivo do cenário Ekhoria.
 */

// ─────────────────────────────────────────────
//  INICIALIZAÇÃO DO MÓDULO
// ─────────────────────────────────────────────

const ID_MODULO = "ekhoria";
const CLASSE_TEMA = "ekhoria-tema";

function aplicarTema(ligado) {
  document.body.classList.toggle(CLASSE_TEMA, !!ligado);
}

Hooks.once("init", () => {
  console.log("Ekhoria | Módulo inicializado.");

  game.settings.register(ID_MODULO, "talentosPorAtributo", {
    name: "Talentos pelo atributo do cenário",
    hint:
      "O Old Dragon 2 calcula os pontos de Talento só por Destreza. Três " +
      "classes de Ekhoria usam o maior entre Destreza e outro atributo — " +
      "Diplomata e Corvo com Carisma, Sabotador da Cratera com Inteligência. " +
      "Ligado, a ficha passa a somar a diferença sozinha. Desligue para deixar " +
      "o cálculo do sistema intacto.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
  });

  // Marca de migração: não aparece nas configurações, só evita rodar de novo.
  game.settings.register(ID_MODULO, "migrouArmadilhas", {
    scope: "world",
    config: false,
    type: Boolean,
    default: false,
  });

  game.settings.register(ID_MODULO, "tema", {
    name: "Tema Ekhoria nas fichas",
    hint:
      "Repinta as fichas do Old Dragon 2 com a paleta do cenário: prata-azulada " +
      "de Arcanita, com o dourado da Centelha Solar no que está selecionado. " +
      "Desligue para manter a aparência original do sistema.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: aplicarTema, // sem recarregar: a classe sai e o sistema volta
  });
});

// ─────────────────────────────────────────────
//  PONTOS DE TALENTO PELO ATRIBUTO DO CENÁRIO
// ─────────────────────────────────────────────
//
// O OD2 já usa "o maior entre dois atributos" na iniciativa
// (calculateInitiative faz Math.max(destreza, sabedoria)). Mas os pontos de
// Talento saem de um getter fixo no DataModel do personagem:
//
//     get rogue_talent_total_points_available() {
//       let points = 2 + Math.max(0, this.mod_destreza);   // <- só Destreza
//       if (level >= 3) points += 2; ...
//     }
//
// Não há gancho, setting nem campo de dados que mude isso — então o módulo
// redefine o getter, delegando ao original e somando só a DIFERENÇA quando o
// atributo do cenário é maior. Delegar importa: se o OD2 mudar a fórmula (mais
// pontos por nível, outro teto), a mudança continua valendo e o módulo só
// acrescenta o que é dele.
const TALENTO_ATRIBUTO = {
  DIPLOMATA: "carisma",
  CORVO: "carisma",
  "SABOTADOR DA CRATERA": "inteligencia",
};

function corrigirPontosDeTalento() {
  const modelo = CONFIG.Actor?.dataModels?.character;
  const proto = modelo?.prototype;
  const original =
    proto && Object.getOwnPropertyDescriptor(proto, "rogue_talent_total_points_available");

  // Se o sistema renomear ou remover o getter, não inventamos um: sem base para
  // delegar, a conta viraria adivinhação silenciosa.
  if (!original?.get) {
    console.warn(
      "Ekhoria | rogue_talent_total_points_available não encontrado no OD2; " +
        "pontos de talento seguem só por Destreza."
    );
    return;
  }

  Object.defineProperty(proto, "rogue_talent_total_points_available", {
    configurable: true,
    get() {
      const base = original.get.call(this);
      if (!game.settings.get(ID_MODULO, "talentosPorAtributo")) return base;

      const atributo = TALENTO_ATRIBUTO[normalizarNome(this.class?.name)];
      if (!atributo || !this.has_rogue_talents) return base;

      const doCenario = Math.max(0, this[`mod_${atributo}`] ?? 0);
      const deDestreza = Math.max(0, this.mod_destreza ?? 0);
      return base + Math.max(0, doCenario - deDestreza);
    },
  });
}

// ─────────────────────────────────────────────
//  MIGRAÇÃO — chave "armadilha" -> "armadilhas"
// ─────────────────────────────────────────────
//
// O talento do Voraz nasceu com a chave no singular e o do Sabotador no plural.
// Os pontos gastos são gravados POR CHAVE (system.rogue_talent_points), então
// uniformizar sem migrar zeraria a alocação de quem já jogava de Voraz. São
// poucas linhas e roda uma vez só — mais barato que descobrir o problema numa
// mesa, com o personagem aberto na frente do jogador.
async function migrarChaveArmadilhas() {
  if (!game.user.isGM) return;
  if (game.settings.get(ID_MODULO, "migrouArmadilhas")) return;

  const afetados = game.actors.filter(
    (a) => a.type === "character" && a.system?.rogue_talent_points?.armadilha != null
  );

  for (const actor of afetados) {
    const pontos = actor.system.rogue_talent_points;
    await actor.update({
      "system.rogue_talent_points.armadilhas": pontos.armadilhas ?? pontos.armadilha,
      "system.rogue_talent_points.-=armadilha": null, // remove a chave antiga
    });
  }

  if (afetados.length) {
    ui.notifications.info(
      `Ekhoria: talento "Armadilha" migrado para a chave padrão em ${afetados.length} personagem(ns).`
    );
  }
  await game.settings.set(ID_MODULO, "migrouArmadilhas", true);
}

Hooks.once("ready", () => {
  console.log("Ekhoria | Módulo pronto.");

  aplicarTema(game.settings.get(ID_MODULO, "tema"));
  corrigirPontosDeTalento();
  migrarChaveArmadilhas();
  carregarNomesEkhoria();

  game.ekhoria = { abrir: abrirDoCompendio, nomes: NOMES_EKHORIA };
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

// Nomes das classes e raças do cenário, lidos DOS COMPÊNDIOS.
//
// Antes esta lista era uma cópia à mão, e envelheceu: ficou parada em 8 classes
// e 9 raças enquanto o módulo passou a publicar 16 e 10 — o selo simplesmente
// não aparecia para Inquisidor Lunar, Corvo, Marcado e companhia. O índice do
// compêndio é a única lista que não tem como divergir do que foi publicado.
const NOMES_EKHORIA = new Set();

async function carregarNomesEkhoria() {
  for (const id of [`${ID_MODULO}.ekhoria-classes`, `${ID_MODULO}.ekhoria-racas`]) {
    const pack = game.packs.get(id);
    if (!pack) continue;
    for (const entrada of await pack.getIndex()) {
      if (entrada.type === "class" || entrada.type === "race") {
        NOMES_EKHORIA.add(normalizarNome(entrada.name));
      }
    }
  }
}

// Abre a ficha de compêndio de uma classe ou raça pelo nome.
//   game.ekhoria.abrir("Voraz")
//
// Substitui as antigas exibirHabilidades()/exibirRaca(), que montavam um
// diálogo a partir da cópia de dados que envelheceu junto com a lista acima —
// mostravam habilidades que a classe não tem mais. A ficha do compêndio mostra
// o conteúdo publicado, com evoluções por nível, usos diários e talentos.
async function abrirDoCompendio(nome) {
  const alvo = normalizarNome(nome);
  for (const id of [`${ID_MODULO}.ekhoria-classes`, `${ID_MODULO}.ekhoria-racas`]) {
    const pack = game.packs.get(id);
    if (!pack) continue;
    const entrada = (await pack.getIndex()).find((e) => normalizarNome(e.name) === alvo);
    if (entrada) return (await pack.getDocument(entrada._id)).sheet.render(true);
  }
  ui.notifications.warn(`Ekhoria: "${nome}" não está nos compêndios de Classes ou Raças.`);
}

// O Foundry monta o nome do gancho a partir do nome interno da classe. A ficha
// do OD2 herda da camada de compatibilidade (foundry.appv1.sheets.ActorSheet),
// cujo nome interno nao e garantido no v13 — e `renderActorSheet` simplesmente
// nao dispara, deixando o selo invisivel sem erro nenhum. Ouvimos tambem o nome
// concreto da classe do sistema; a funcao ja verifica se o selo existe, entao
// disparar duas vezes e inofensivo.
const colocarSelo = (sheet, html) => {
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
};

for (const gancho of ["renderOD2CharacterSheet", "renderActorSheet"]) {
  Hooks.on(gancho, colocarSelo);
}
