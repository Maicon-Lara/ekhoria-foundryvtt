// Biblioteca de geração dos compêndios do Ekhoria.
// Constrói documentos no formato-fonte do foundryvtt-cli (um JSON por documento,
// com o campo "_key") e compila para LevelDB.

import crypto from "node:crypto";
import fs from "node:fs";
import { iconeProprio } from "./data/icones.mjs";
import path from "node:path";

const ID_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// ID determinístico de 16 caracteres derivado de uma "seed".
// Determinístico = o mesmo conteúdo sempre gera o mesmo _id, então as
// referências por UUID permanecem estáveis entre builds (e entre mundos que
// já importaram o conteúdo).
export function makeId(seed) {
  const hash = crypto.createHash("sha1").update(String(seed)).digest();
  let id = "";
  for (let i = 0; i < 16; i++) id += ID_ALPHABET[hash[i] % ID_ALPHABET.length];
  return id;
}

// Converte a descrição de HTML para texto puro.
//
// Por que: no olddragon2e o campo `system.description` muda de contrato conforme
// o tipo do item. Classe, habilidade, magia e monstro são renderizados com
// {{{ }}} e aceitam HTML. Mas weapon/armor/misc aparecem em
// `templates/sheets/*-sheet.hbs` dentro de um <textarea>, que exibe tag como
// texto, e a lista de equipamento da ficha passa por {{truncate ... 35}} — um
// corte cego que, caindo no meio de uma tag, deixa elemento aberto e faz as
// tabelas seguintes da ficha aninharem umas nas outras.
//
// O conteúdo oficial do OD2 segue essa mesma divisão: 0 de 96 itens do pack
// `equipment` têm HTML na descrição, enquanto 139 de 179 das classes têm.
//
// A autoria em `data/*.mjs` continua em HTML (é mais legível e as notas são
// compartilhadas com journals); a conversão acontece só na saída.
export function htmlParaTexto(html) {
  if (!html) return "";
  return String(html)
    .replace(/<\s*br\s*\/?>/gi, "\n")
    .replace(/<\s*li[^>]*>/gi, "• ")
    .replace(/<\s*\/\s*(p|div|li|tr|h[1-6]|ul|ol)\s*>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&mdash;/g, "—")
    .replace(/&ndash;/g, "–")
    .replace(/&hellip;/g, "…")
    .replace(/&times;/g, "×")
    .replace(/&quot;/g, '"')
    .replace(/&(?:#0?39|apos);/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&") // por último: senão reintroduz entidade
    .replace(/[ \t]+/g, " ")
    .replace(/[ \t]*\n[ \t]*/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Slug simples para usar em seeds.
export function slug(s) {
  return String(s)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Ícones empacotados pelo próprio sistema OD2 (garantidos para qualquer usuário).
const OD2I = "systems/olddragon2e/assets/icons";
const ICONS = {
  class: `${OD2I}/level-up.svg`,
  class_ability: `${OD2I}/kit.svg`,
  race: `${OD2I}/alignment.svg`,
  race_ability: `${OD2I}/diamond.svg`,
};

// Tradução do tipo de dano: PT (como está no livro) → enum do sistema OD2
// (slashing/piercing/bludgeoning). Os dados-fonte ficam em português; um valor
// já em inglês passa direto, e ausência vira "none".
const DANO_PT_EN = { cortante: "slashing", perfurante: "piercing", impactante: "bludgeoning" };
function damageType(v) {
  if (!v) return "none";
  return DANO_PT_EN[v] ?? v;
}

// Ícone semântico por palavra-chave.
//
// Sem isto, 100 habilidades dividiam kit.svg e 43 de espécie dividiam
// diamond.svg: abrir o compêndio era uma parede de linhas idênticas. As regras
// usam só os 35 ícones que o próprio olddragon2e empacota.
//
// Ordem importa: vence a primeira que casar, então o específico vem antes do
// genérico — "Bala de Arcanita" é munição, não material.
const REGRAS_ICONE = [
  // Munição: antes dos materiais, senão "Flecha de Ônix" vira gema
  [/bala|flecha|virote|municao|perfurante|balas/, "ammunition"],
  // Alquimia, fungos e substâncias
  [/fungo|extrato|mandra|esporo|pilula|po de|substancia|coquetel|quimic|filtro|metabolismo|antidoto/, "magic-potion"],
  // Materiais, cristais e relíquias
  [/arcanita|erebo|onix|mitral|prata|bronze|albinus|nargula|cristal|centelha|relicario|reliquial|gema/, "gem"],
  // Fogo, sol e luz
  [/pira|chama|fogo|solar|luz|incandesc|brasa/, "divine"],
  // Baluarte contra a escuridão é defesa, não tema sombrio: vem antes
  [/bastiao|baluarte|salvaguarda/, "shield"],
  // Sombra, profano e morte ("abate" saiu: é armadilha de caçador e golpe
  // marcial, não morte — "Armadilhas de Abate", "Golpe de Abate")
  [/profano|sombrio|escuridao|infernal|morthan|consagrad|esquecidos|necro|morte/, "necromancer"],
  // Arcano e runas
  [/arcan|arkanes|arkadia|runic|rune|magia|magic|antimagic|feitic/, "arcane"],
  // Ilusão e engano
  [/ilusa|engan|miragem|disfarce/, "illusionist"],
  // Furtividade, corvo e sabotagem
  [/corvo|furtiv|sabotag|sabotador|cobertura|ouvir ruidos|estopim|contatos|ladrao|talentos d/, "bag"],
  // Caça e tiro
  [/cacad|caca|presa|feras|armadilha|arco|tiro|predator/, "ranged"],
  // Combate desarmado
  [/desarmad|briga|jogo de perna|punho|manobras/, "unarmed"],
  // Combate com arma
  [/arma|golpe|ataque|marcial|maestria|lamina|espada|carga|combate|guerra|tatic/, "melee"],
  // Defesa, resistência e imunidade
  [/estabilidade|inviolab|imune|imunidade|bastiao|resistenc|vulnerab|restric|tolerancia|firmeza|calejad|temper/, "shield"],
  // Corpo, carapaça e mutação
  [/exoesqueleto|ecdise|dermic|corpo|corpos|constructo|nucleo|membros|forjad|escama|couro/, "armor"],
  // Mente, presságio e tempo
  [/antecipa|pressagio|chronael|linha|fora-de-hora|estelar|lunar|sono|mente|visao|sentidos|percep/, "brain"],
  // Palavra escrita, léxico e conhecimento
  [/lexico|litania|palavra|conhecimento|erudito|escola|texto|tomo|codex|voz|grito|coro|tom /, "magic-scroll"],
  // Social, reputação e comércio
  [/audiencia|comitiva|rede |reputacao|traquejo|social|diplomat|carismat|honestidade|pacific|veredicto|julgamento|ordem/, "coins"],
  // Ofício técnico e engenharia
  [/engenheiro|tecnic|sincronia|reajuste|analise|campo|improviso|sequencia|oficio/, "kit"],
  // Água e movimento
  [/anfibio|agua|profundezas|nautic|voo|passo|movimento|velocidade|rapid/, "movement"],
];

// Remove acentos e caixa para as regras acima casarem sem depender de grafia.
function normaliza(s) {
  return String(s ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

// Icone da classe pelo chassi do OD2 sobre o qual ela roda.
//
// Ao contrario das habilidades, aqui nao ha adivinhacao por palavra-chave: o
// chassi ja e um dado (`tabela: "guerreiro_esp"`), e as 16 classes de Ekhoria
// se dividem exatamente 4 por chassi.
const ICONE_CHASSI = {
  guerreiro_esp: "melee",
  mago_esp: "arcane",
  clerigo_esp: "divine",
  ladrao_esp: "bag",
};

export function iconeClasse(cls, padrao) {
  const icone = ICONE_CHASSI[cls?.tabela];
  return icone ? `${OD2I}/${icone}.svg` : padrao;
}

export function iconeSemantico(texto, padrao) {
  const alvo = normaliza(texto);
  for (const [regra, icone] of REGRAS_ICONE) {
    if (regra.test(alvo)) return `${OD2I}/${icone}.svg`;
  }
  return padrao;
}

// Ícone de arma conforme o tipo (alcance ou tipo de dano).
function weaponIcon(it) {
  if (it.ranged || it.melee === false) return `${OD2I}/ranged.svg`;
  const t = damageType(it.damage_type);
  return `${OD2I}/${["slashing", "piercing", "bludgeoning"].includes(t) ? t : "melee"}.svg`;
}

// "Usuário" que assina os documentos gerados. O Foundry valida este campo como
// um ID de documento: EXATAMENTE 16 caracteres alfanuméricos. Com qualquer
// outro tamanho, o MUNDO INTEIRO falha ao carregar (o erro estoura em
// Game.initializePacks, antes de a mesa abrir):
//   DataModelValidationError: ... lastModifiedBy: must be a valid
//   16-character alphanumeric ID
// "ekhoriabuildtool" tem 16 por coincidência — a validação abaixo garante que
// continue assim se alguém renomear.
const BUILD_USER_ID = "ekhoriabuildtool";
if (!/^[A-Za-z0-9]{16}$/.test(BUILD_USER_ID)) {
  throw new Error(
    `BUILD_USER_ID inválido (${BUILD_USER_ID.length} chars): precisa ter exatamente 16 caracteres alfanuméricos.`
  );
}

// _stats padrão. systemVersion é substituído automaticamente pelo Foundry.
export function stats() {
  return {
    compendiumSource: null,
    duplicateSource: null,
    coreVersion: "13.342",
    systemId: "olddragon2e",
    systemVersion: "This is auto replaced",
    createdTime: 0,
    modifiedTime: 0,
    lastModifiedBy: BUILD_USER_ID,
    exportSource: null,
  };
}

// Pasta (folder) que agrupa, dentro de um pack, uma classe/raça com suas habilidades.
export function folderDoc(name, contentType /* "Item" */, seedPrefix, opts = {}) {
  const id = makeId(`folder:${seedPrefix}:${name}`);
  return {
    name,
    sorting: "m",
    folder: opts.parentId ?? null,
    type: contentType,
    _id: id,
    description: "",
    sort: opts.sort ?? 0,
    color: opts.color ?? null,
    flags: {},
    _stats: { ...stats(), exportSource: undefined },
    _key: `!folders!${id}`,
  };
}

// Transforma a hierarquia que hoje só existe no NOME da pasta em hierarquia de
// verdade. O projeto já nomeia por convenção — "Operativo — Assassino",
// "Sensível à Força — Guardião (Ataru)" —, então a própria convenção vira a
// regra: se existe uma pasta com o nome do prefixo, a pasta vira filha dela e
// fica só com o sufixo no rótulo.
//
// Duas formas de prefixo, aplicadas em laço até estabilizar (para encadear
// Sensível à Força > Guardião > Ataru):
//   "Pai — Filho"   (travessão)
//   "Pai (Filho)"   (parêntese, usado pelas Formas de Sabre)
//
// O _id continua derivado do nome COMPLETO original, então renomear aqui não
// muda ID nenhum: referências por UUID seguem válidas.
export function aninhaPastas(docs) {
  const pastas = docs.filter((d) => d._key?.startsWith("!folders!"));
  const porId = new Map(pastas.map((f) => [f._id, f]));

  // Nome curto -> pasta. Só registra o primeiro: nomes repetidos (várias
  // "Senda Mandaloriana", uma por classe) não devem virar pai de ninguém.
  const porNome = new Map();
  const ambiguos = new Set();
  const registra = (nome, pasta) => {
    if (ambiguos.has(nome)) return;
    if (porNome.has(nome) && porNome.get(nome) !== pasta) {
      porNome.delete(nome);
      ambiguos.add(nome);
      return;
    }
    porNome.set(nome, pasta);
  };
  for (const f of pastas) registra(f.name, f);

  // Evita ciclo: um pai não pode ser descendente do próprio filho.
  const ehDescendente = (possivel, ancestral) => {
    let atual = possivel;
    while (atual?.folder) {
      if (atual.folder === ancestral._id) return true;
      atual = porId.get(atual.folder);
    }
    return false;
  };

  let mudou = true;
  while (mudou) {
    mudou = false;
    for (const pasta of pastas) {
      const travessao = pasta.name.lastIndexOf(" — ");
      const parenteses = pasta.name.match(/^(.+) \(([^)]+)\)$/);

      let pai = null;
      let rotulo = null;
      if (travessao > 0) {
        pai = porNome.get(pasta.name.slice(0, travessao)) ?? null;
        if (pai) rotulo = pasta.name.slice(travessao + 3);
      }
      if (!pai && parenteses) {
        pai = porNome.get(parenteses[1]) ?? null;
        if (pai) rotulo = parenteses[2];
      }

      if (!pai || pai === pasta) continue;
      if (pasta.folder === pai._id && pasta.name === rotulo) continue;
      if (ehDescendente(pai, pasta)) continue;

      pasta.folder = pai._id;
      pasta.name = rotulo;
      registra(rotulo, pasta); // permite descer mais um nível na volta do laço
      mudou = true;
    }
  }
  return docs;
}

// daily_uses por nível (1..15).
//
// O sistema NÃO deriva nada do texto: o template lê `daily_uses[nível do
// personagem]` e desenha um checkbox por uso (helper generateClassAbilityDailyUses).
// Então uma habilidade que vai de 1×/dia para 2× no 3º e 3× no 10º precisa ter
// isso NO MAPA — escrever "duas vezes por dia" em level3 muda o texto exibido e
// mais nada. Era esse o buraco: todas as evoluções de uso estavam só em prosa.
//
// `usos_dia` aceita três formas:
//   2                   número fixo, valendo do nível em que a habilidade é obtida
//   { 1: 1, 3: 2, 10: 3 }  degraus: de cada nível listado em diante, aquele valor
//   "nivel"             o próprio nível do personagem (Pólvora Arcana do Sabotador)
function dailyUses(ability) {
  const level = ability.level ?? 1;
  const usos = ability.usos_dia ?? 0;
  const o = {};

  if (usos === "nivel") {
    for (let i = 1; i <= 15; i++) o[String(i)] = i >= level ? i : 0;
    return o;
  }

  if (usos && typeof usos === "object") {
    const degraus = Object.keys(usos).map(Number).sort((a, b) => a - b);
    for (let i = 1; i <= 15; i++) {
      const degrau = degraus.filter((n) => n <= i).pop();
      o[String(i)] = degrau === undefined ? 0 : usos[degrau];
    }
    return o;
  }

  for (let i = 1; i <= 15; i++) o[String(i)] = i >= level ? usos : 0;
  return o;
}

// Item do tipo class_ability.
export function classAbilityDoc(ability, folderId, seedPrefix, sort) {
  const id = makeId(`class_ability:${seedPrefix}:${ability.nome}`);
  return {
    folder: folderId,
    name: ability.nome,
    type: "class_ability",
    _id: id,
    img: ability.img || iconeSemantico(ability.nome, ICONS.class_ability),
    system: {
      description: ability.desc || "",
      level: ability.level ?? 1,
      level3: ability.level3 || "",
      level6: ability.level6 || "",
      level10: ability.level10 || "",
      rogue_talents: ability.rogue_talents || [],
      daily_uses: dailyUses(ability),
    },
    effects: [],
    flags: {},
    _stats: stats(),
    sort: sort,
    ownership: { default: 0 },
    _key: `!items!${id}`,
  };
}

// Item do tipo class.
export function classDoc(cls, folderId, abilityUuids) {
  const id = makeId(`class:${cls.nome}`);
  return {
    folder: folderId,
    name: cls.nome,
    type: "class",
    _id: id,
    img: cls.img || iconeProprio(cls.nome) || iconeClasse(cls, ICONS.class),
    system: {
      flavor: cls.flavor || "",
      description: cls.descricao || "",
      hp: cls.dv ?? null,
      high_level_hp_bonus: cls.high_level_hp_bonus ?? null,
      equipment_restrictions: {
        weapons: cls.equipment_restrictions?.weapons ?? "Sem restrições.",
        armors: cls.equipment_restrictions?.armors ?? "Sem restrições.",
        magic_items: cls.equipment_restrictions?.magic_items ?? "Sem restrições.",
      },
      restrictions: {
        alignments: cls.restricao_alinhamentos || [],
        races: cls.restricao_racas || [],
      },
      levels: cls.levels,
      class_abilities: abilityUuids,
    },
    effects: [],
    flags: {},
    _stats: stats(),
    sort: 0,
    ownership: { default: 0 },
    _key: `!items!${id}`,
  };
}

// Item do tipo race_ability.
export function raceAbilityDoc(ability, folderId, seedPrefix, sort) {
  const id = makeId(`race_ability:${seedPrefix}:${ability.nome}`);
  const jp = ability.jp || {};
  const sys = {
    description: ability.desc || "",
    xp: ability.xp ?? null,
    jp: {
      jpc: !!jp.jpc,
      jpd: !!jp.jpd,
      jps: !!jp.jps,
    },
    bonus_damage: ability.bonus_damage ?? 0,
    bonus_damage_condition: ability.bonus_damage_condition ?? "none",
    bonus_damage_condition_2: ability.bonus_damage_condition_2 ?? "none",
    rogue_talent: ability.rogue_talent ?? "none",
    rogue_talent_2: ability.rogue_talent_2 ?? "none",
    daily_uses: ability.daily_uses ?? 0,
    natural_armor: ability.natural_armor ?? 0,
    load_modifier: ability.load_modifier ?? 0,
    max_load_override: ability.max_load_override ?? 0,
    armor_weight_modifier: ability.armor_weight_modifier ?? 0,
  };
  if (ability.natural_weapon) {
    sys.natural_weapon = {
      damage: ability.natural_weapon.damage ?? "",
      damage_type: ability.natural_weapon.damage_type ?? "none",
      weapon_size: ability.natural_weapon.weapon_size ?? "none",
    };
  }
  if (ability.variable_construction) {
    sys.variable_construction = {
      choices_count: ability.variable_construction.choices_count ?? 0,
      available_options: ability.variable_construction.available_options ?? [],
    };
  }
  return {
    folder: folderId,
    name: ability.nome,
    type: "race_ability",
    _id: id,
    img: ability.img || iconeSemantico(ability.nome, ICONS.race_ability),
    system: sys,
    effects: [],
    flags: {},
    _stats: stats(),
    sort: sort,
    ownership: { default: 0 },
    _key: `!items!${id}`,
  };
}

// Item do tipo race.
export function raceDoc(race, folderId, abilityUuids) {
  const id = makeId(`race:${race.nome}`);
  const sys = {
    flavor: race.flavor || "",
    description: race.descricao || "",
    movement: race.movement ?? 9,
    movement_fly: race.movement_fly ?? 0,
    movement_notes: race.movement_notes || "",
    infravision: race.infravision ?? 0,
    infravision_notes: race.infravision_notes || "",
    alignment_tendency: race.alignment_tendency || "none",
    alignment_notes: race.alignment_notes || "",
    race_abilities: abilityUuids,
  };
  if (race.movement_swim != null) sys.movement_swim = race.movement_swim;
  return {
    folder: folderId,
    name: race.nome,
    type: "race",
    _id: id,
    img: race.img || iconeProprio(race.nome) || ICONS.race,
    system: sys,
    effects: [],
    flags: {},
    _stats: stats(),
    sort: 0,
    ownership: { default: 0 },
    _key: `!items!${id}`,
  };
}

// JournalEntry com páginas de texto (HTML).
export function journalDoc(entry, sort, folderId = null) {
  const id = makeId(`journal:${entry.title}`);
  const pages = (entry.pages || [{ title: entry.title, content: entry.content }]).map(
    (p, i) => {
      const pid = makeId(`journal-page:${entry.title}:${p.title}:${i}`);
      return {
        sort: (i + 1) * 100000,
        name: p.title,
        type: "text",
        _id: pid,
        title: { show: true, level: 1 },
        image: {},
        text: { format: 1, content: `<div class="odo-markdown">${p.content}</div>` },
        video: { controls: true, volume: 0.5 },
        src: null,
        system: {},
        ownership: { default: -1 },
        flags: {},
        _stats: stats(),
        _key: `!journal.pages!${id}.${pid}`,
      };
    }
  );
  return {
    folder: folderId,
    name: entry.title,
    _id: id,
    pages,
    flags: {},
    sort: sort,
    ownership: { default: 0 },
    _stats: stats(),
    _key: `!journal!${id}`,
  };
}

// Item do tipo spell (magia).
export function spellDoc(spell, folderId, seedPrefix, sort) {
  const id = makeId(`spell:${seedPrefix}:${spell.nome}`);
  const traditions = { arcane: "null", divine: "null", necromancer: "null", illusionist: "null" };
  traditions[spell.school] = String(spell.circle);
  return {
    folder: folderId,
    name: spell.nome,
    type: "spell",
    _id: id,
    img: `${OD2I}/${spell.school}.svg`,
    system: {
      odo_id: slug(spell.nome),
      school: spell.school,
      circle: String(spell.circle),
      ...traditions,
      reverse: !!spell.reverse,
      range: spell.range || "",
      duration: spell.duration || "",
      jp: spell.jp || "nenhuma",
      description: spell.desc || "",
    },
    effects: [],
    flags: {},
    _stats: stats(),
    sort: sort,
    ownership: { default: 0 },
    _key: `!items!${id}`,
  };
}

// Campos comuns do equipamento (cost, peso, etc.).
function equipmentBase(it) {
  return {
    odo_id: slug(it.nome),
    // weapon/armor/misc: a ficha exibe num <textarea>. Ver htmlParaTexto().
    description: htmlParaTexto(it.desc),
    quantity: 1,
    cost: it.cost || "",
    weight_in_load: it.weight_in_load ?? 0,
    weight_in_grams: it.weight_in_grams ?? 0,
    magic_item: !!it.magic_item,
    is_equipped: false,
  };
}

// Item do tipo weapon (arma).
export function weaponDoc(it, folderId, seedPrefix, sort) {
  const id = makeId(`weapon:${seedPrefix}:${it.nome}`);
  return {
    folder: folderId,
    name: it.nome,
    type: "weapon",
    _id: id,
    img: it.img || weaponIcon(it),
    system: {
      ...equipmentBase(it),
      type: it.melee === false || it.ranged ? "ranged" : "melee",
      damage_type: damageType(it.damage_type),
      damage: it.damage || "",
      bonus_damage: it.bonus_damage ?? 0,
      bonus_ba: it.bonus_ba ?? 0,
      bonus_ca: it.bonus_ca ?? 0,
      shoot_range: it.shoot_range ?? 0,
      throw_range: it.throw_range ?? 0,
      arrow: !!it.arrow,
      bolt: !!it.bolt,
      bolt_small: !!it.bolt_small,
      polearm: !!it.polearm,
      two_handed: !!it.two_handed,
      versatile: !!it.versatile,
    },
    effects: [],
    flags: {},
    _stats: stats(),
    sort: sort,
    ownership: { default: 0 },
    _key: `!items!${id}`,
  };
}

// Item do tipo armor (armadura).
export function armorDoc(it, folderId, seedPrefix, sort) {
  const id = makeId(`armor:${seedPrefix}:${it.nome}`);
  return {
    folder: folderId,
    name: it.nome,
    type: "armor",
    _id: id,
    img: it.img || `${OD2I}/armor.svg`,
    system: { ...equipmentBase(it), bonus_ca: it.bonus_ca ?? 0 },
    effects: [],
    flags: {},
    _stats: stats(),
    sort: sort,
    ownership: { default: 0 },
    _key: `!items!${id}`,
  };
}

// Item do tipo misc (equipamento geral / consumível).
export function miscDoc(it, folderId, seedPrefix, sort) {
  const id = makeId(`misc:${seedPrefix}:${it.nome}`);
  return {
    folder: folderId,
    name: it.nome,
    type: "misc",
    _id: id,
    img: it.img || iconeSemantico(it.nome, `${OD2I}/misc.svg`),
    system: equipmentBase(it),
    effects: [],
    flags: {},
    _stats: stats(),
    sort: sort,
    ownership: { default: 0 },
    _key: `!items!${id}`,
  };
}

// RollTable (tabela de rolagem). `resultados` é um array de
// { range: [min, max], text, img? }.
export function rollTableDoc(table, sort) {
  const id = makeId(`table:${table.nome}`);
  const results = table.resultados.map((r, i) => {
    const rid = makeId(`table-result:${table.nome}:${i}`);
    return {
      type: 0,
      weight: 1,
      range: r.range,
      drawn: false,
      _id: rid,
      text: r.text,
      documentId: null,
      flags: {},
      img: r.img || "icons/svg/d20-black.svg",
      _key: `!tables.results!${id}.${rid}`,
    };
  });
  return {
    folder: null,
    name: table.nome,
    _id: id,
    img: table.img || `${OD2I}/d6.svg`,
    description: table.desc || "",
    results,
    replacement: true,
    displayRoll: true,
    flags: {},
    _stats: stats(),
    formula: table.formula,
    sort: sort,
    ownership: { default: 0 },
    _key: `!tables!${id}`,
  };
}

// Caminho de UUID de um item dentro de um pack deste módulo.
export function itemUuid(packName, itemId) {
  return `Compendium.ekhoria.${packName}.Item.${itemId}`;
}

// Escreve os documentos de um pack como arquivos JSON-fonte (um por documento).
export function writeSource(srcDir, docs) {
  fs.rmSync(srcDir, { recursive: true, force: true });
  fs.mkdirSync(srcDir, { recursive: true });
  for (const doc of docs) {
    const kind = doc._key.startsWith("!folders!") ? "folder" : doc.type || "doc";
    const fname = `${slug(doc.name)}__${kind}__${doc._id}.json`;
    fs.writeFileSync(
      path.join(srcDir, fname),
      JSON.stringify(doc, null, 2) + "\n",
      "utf8"
    );
  }
  return docs.length;
}
