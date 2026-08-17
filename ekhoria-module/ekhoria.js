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

  // A API ENTRA PRIMEIRO, antes de tudo que pode falhar.
  //
  // Ela ficava por último, depois do tema e das duas migrações. Uma exceção em
  // qualquer uma delas abortava o resto do gancho e `game.ekhoria` nunca era
  // criado — e o sintoma que chegava ao usuário era a macro dizendo "o módulo
  // não está ativo neste mundo", que é falso e manda procurar no lugar errado.
  // Nada aqui depende de migração ter rodado.
  game.ekhoria = {
    abrir: abrirDoCompendio,
    nomes: NOMES_EKHORIA,
    contratar: contratarDialogo,
    contratos: listarContratos,
  };

  // Cada tarefa isolada: uma falhar não pode levar as outras junto. O `catch`
  // registra em vez de engolir — erro silencioso aqui vira "o tema não aplicou"
  // sem nenhuma pista de por quê.
  for (const [nome, tarefa] of [
    ["tema", () => aplicarTema(game.settings.get(ID_MODULO, "tema"))],
    ["pontos de talento", corrigirPontosDeTalento],
    ["migração de talentos", migrarChaveArmadilhas],
    ["nomes do cenário", carregarNomesEkhoria],
  ]) {
    try {
      const r = tarefa();
      if (r instanceof Promise) r.catch((e) => console.error(`Ekhoria | ${nome}:`, e));
    } catch (e) {
      console.error(`Ekhoria | ${nome}:`, e);
    }
  }
});

// ─────────────────────────────────────────────
//  CONTRATAR — do statblock do livro para uma ficha viva
// ─────────────────────────────────────────────
//
// O Old Dragon 2 tem TRÊS tipos de ator, e dois poderiam descrever um
// contratado:
//
//   monster    o statblock do livro: DV, CA, JP, Moral e ataques como campos.
//   retainer   a pessoa contratada: atributos, bolso, carga, nível. Mas a CA é
//              DERIVADA do equipamento, a JP é um getter FIXO EM 4 sem campo
//              nenhum, e Moral simplesmente não existe.
//
// Isto usou `retainer` primeiro, por ser o tipo que o sistema criou para o
// papel. Durou até a primeira ficha: um arqueiro saiu com JP 4 onde o livro diz
// 5, e não havia onde corrigir. O tipo certo é o que tem os campos que a mesa
// consulta, não o que tem o nome certo.
//
// Então a macro CLONA o statblock. Perde-se inventário e atributos; ganha-se a
// ficha com os números do livro. E, de quebra, os ganhos da Comitiva deixam de
// ser recado nas notas e viram número: Moral, PV, JP e dano têm campo aqui.
//
// Os números vêm do compêndio, e não de uma tabela aqui dentro. Repetir os
// statblocks neste arquivo criaria a mesma estatística em dois lugares — que é
// exatamente como elas passam a divergir, e foi o motivo de os blocos de
// monstro da campanha terem virado link para o ator em vez de cópia.

const PACK_BESTIARIO = `${ID_MODULO}.ekhoria-bestiario`;
const PASTA_CONTRATANDO = "Contratando";

async function listarContratos() {
  const pack = game.packs.get(PACK_BESTIARIO);
  if (!pack) return [];

  const pastas = pack.folders
    .filter((f) => f.name.startsWith(PASTA_CONTRATANDO))
    .map((f) => f.id);
  if (!pastas.length) return [];

  // Só `monster`: a origem é sempre o statblock do livro. A ficha-modelo de
  // contratado também é um Actor do mesmo pack, e sem este filtro ela apareceria
  // como se fosse alguém que se pode contratar — oferecendo ao jogador a cópia
  // vazia no meio da lista de gente com números.
  const index = await pack.getIndex({ fields: ["folder", "sort", "type"] });
  return index
    .filter((e) => e.type === "monster" && pastas.includes(e.folder))
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
}

// "Piqueiro (Mercenário)" → { nome: "Piqueiro", profissao: "Mercenário" }
// O parêntese do statblock é categoria, não parte do nome de quem foi contratado.
function separaCategoria(nomeCompleto) {
  const m = nomeCompleto.match(/^(.*?)\s*\(([^)]+)\)\s*$/);
  return m
    ? { nome: m[1].trim(), profissao: m[2].trim() }
    : { nome: nomeCompleto.trim(), profissao: nomeCompleto.trim() };
}

// A ficha criada é uma CÓPIA DO STATBLOCK, do mesmo tipo `monster`.
//
// A primeira versão montava um `retainer`, porque é o tipo que o sistema criou
// para contratados. Não deu certo, e o motivo é objetivo: no retainer a JP é um
// getter fixo em 4 — não existe campo. Um arqueiro contratado saía com JP 4
// onde o livro diz 5, e não havia onde corrigir. O mesmo vale para Moral, que
// não existe, e para a CA, que só entrava por uma acomodação em `ac_extra`.
//
// Clonar o statblock inverte a troca: perde-se o inventário e os atributos do
// retainer, e ganha-se a ficha com os números do livro — que é o que a mesa
// consulta. E há um efeito colateral bom: como `monster` TEM os campos, os
// ganhos da Comitiva deixam de ser recado nas notas e viram número na ficha.

// Soma um bônus a um campo que o sistema guarda como texto ("5" → "7").
// Devolve o original intacto quando não há número — melhor a ficha ficar como
// estava do que virar "NaN".
function somaAoCampo(valor, bonus) {
  const n = parseInt(String(valor ?? "").replace(/[^\d-]/g, ""), 10);
  return Number.isFinite(n) ? String(n + bonus) : valor;
}

function notaDaComitiva(mod) {
  const itens = ["<li><strong>Moral +1</strong> (1º nível) — já aplicado.</li>"];
  if (mod > 0) {
    itens.push(`<li><strong>+${mod} PV</strong> pelo modificador de Carisma (6º nível) — já aplicado.</li>`);
    itens.push(`<li><strong>+${mod} em JP e no dano dos ataques</strong> (10º nível) — já aplicado. <em>Se o Diplomata ainda não tem o 10º nível, desfaça esses dois na ficha.</em></li>`);
  }
  itens.push("<li><strong>Custo de contratação −25%</strong> pela Logística.</li>");
  return `<hr><h4>Comitiva — do Diplomata</h4><ul>${itens.join("")}</ul>`;
}

async function criarContratado(entryId, { quantidade = 1, comitiva = null } = {}) {
  const pack = game.packs.get(PACK_BESTIARIO);
  const origem = await pack.getDocument(entryId);
  if (!origem) return [];

  const { nome } = separaCategoria(origem.name);
  const mod = comitiva?.mod ?? 0;

  const dados = [];
  for (let i = 0; i < quantidade; i++) {
    const ficha = origem.toObject();

    // Sem os ids da origem: o Foundry cunha os novos. Mantê-los faria as três
    // cópias de um piqueiro nascerem com o mesmo id de ataque embutido.
    delete ficha._id;
    delete ficha.folder;
    for (const item of ficha.items ?? []) delete item._id;

    // O número só entra quando há mais de um: "Piqueiro" sozinho não precisa
    // se chamar "Piqueiro 1". E o "(Mercenário)" do statblock sai — ali era
    // categoria de catálogo, e agora é o nome de alguém que foi contratado.
    ficha.name = quantidade > 1 ? `${nome} ${i + 1}` : nome;

    if (comitiva) {
      // Moral +1 vem do 1º nível da Comitiva e vale sempre que ela existe.
      ficha.system.mo = somaAoCampo(ficha.system.mo, 1);

      if (mod > 0) {
        const pv = Math.max(1, (ficha.system.hp?.max ?? 1) + mod);
        ficha.system.hp = { value: pv, max: pv };
        // JP sobe com o poder no OD2 (1 DV → 5, 8 DV → 10), então o bônus soma.
        ficha.system.jp = somaAoCampo(ficha.system.jp, mod);
        for (const item of ficha.items ?? []) {
          if (item.type !== "monster_attack") continue;
          item.system.damage_bonus = (item.system.damage_bonus ?? 0) + mod;
        }
      }

      ficha.system.description = (ficha.system.description ?? "") + notaDaComitiva(mod);
    }

    dados.push(ficha);
  }

  return Actor.createDocuments(dados);
}

async function contratarDialogo() {
  const lista = await listarContratos();
  if (!lista.length) {
    return ui.notifications.warn(
      "Ekhoria: não encontrei as pastas \"Contratando —\" no compêndio Bestiário.",
    );
  }

  const opcoes = lista
    .map((e) => `<option value="${e._id}">${foundry.utils.escapeHTML?.(e.name) ?? e.name}</option>`)
    .join("");

  const corpo = `
    <p>Cria a ficha do contratado <strong>com os números do livro</strong> — DV, CA, JP, Moral e ataques —, pronta para arrastar ao mapa.</p>
    <div class="form-group"><label>Quem</label><select name="quem">${opcoes}</select></div>
    <div class="form-group"><label>Quantos</label><input type="number" name="quantos" value="1" min="1" max="20"></div>
    <div class="form-group">
      <label>Comitiva (mod. de Carisma do Diplomata)</label>
      <input type="number" name="carisma" value="0" min="0" max="5">
      <p class="hint">0 = sem Comitiva. Acima de 0, soma os PV do 6º nível e anota os demais ganhos nas notas.</p>
    </div>`;

  const aplica = async (form) => {
    const quantidade = Math.max(1, parseInt(form.quantos.value, 10) || 1);
    const mod = Math.max(0, parseInt(form.carisma.value, 10) || 0);
    const criados = await criarContratado(form.quem.value, {
      quantidade,
      comitiva: mod > 0 || form.carisma.value !== "" ? { mod } : null,
    });
    if (criados.length === 1) criados[0].sheet.render(true);
    ui.notifications.info(`Ekhoria: ${criados.length} ficha(s) de contratado criada(s).`);
  };

  // DialogV2 no v13; Dialog continua existindo, mas depreciado. Tentamos o novo
  // e caímos no antigo em vez de assumir a versão — o mesmo cuidado que o selo
  // da ficha teve de tomar com os nomes de gancho.
  const V2 = foundry.applications?.api?.DialogV2;
  if (V2) {
    return V2.prompt({
      window: { title: "Contratar" },
      content: corpo,
      ok: {
        label: "Contratar",
        callback: (_ev, botao) => aplica(botao.form),
      },
    });
  }
  return new Dialog({
    title: "Contratar",
    content: corpo,
    buttons: {
      ok: {
        label: "Contratar",
        callback: (html) => aplica((html[0] ?? html).querySelector("form") ?? html[0] ?? html),
      },
    },
    default: "ok",
  }).render(true);
}

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
