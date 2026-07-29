// Build dos compêndios do Ekhoria.
// 1) Gera os arquivos-fonte JSON (versionados em packs-src/).
// 2) Compila cada pack para LevelDB em ekhoria-module/packs/.
//
// Uso: npm run build   (a partir da raiz do repositório)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { compilePack } from "@foundryvtt/foundryvtt-cli";

import {
  folderDoc, aninhaPastas, classDoc, classAbilityDoc, raceDoc, raceAbilityDoc,
  journalDoc, spellDoc, weaponDoc, armorDoc, miscDoc, rollTableDoc, itemUuid, writeSource,
} from "./lib.mjs";
import { monsterDoc } from "./lib-actors.mjs";

import { classes } from "./data/classes.mjs";
import { classAbilitiesAvulsas } from "./data/avulsas.mjs";
import { racas, racaAbilitiesAvulsas } from "./data/racas.mjs";
import { journalPages } from "./data/journal.mjs";
import { escolas } from "./data/magias.mjs";
import { categorias } from "./data/itens.mjs";
import { tabelas } from "./data/tabelas.mjs";
import { tabelasMestre } from "./data/tabelas-mestre.mjs";
import { grupos as gruposBestiario } from "./data/bestiario.mjs";
import { loreJournal } from "./data/lore.mjs";
import { loreExtraPages } from "./data/lore-extra.mjs";
import { worldbuildingPages } from "./data/lore-worldbuilding.mjs";
import { campanhaJournal } from "./data/campanha.mjs";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const SRC = path.join(ROOT, "packs-src");
const OUT = path.join(ROOT, "ekhoria-module", "packs");

const CLASSES_PACK = "ekhoria-classes";
const RACAS_PACK = "ekhoria-racas";
const JOURNAL_PACK = "ekhoria-journal";
const ITENS_PACK = "ekhoria-itens";
const MAGIAS_PACK = "ekhoria-magias";
const TABELAS_PACK = "ekhoria-tabelas";
const BESTIARIO_PACK = "ekhoria-bestiario";
const CAMPANHA_PACK = "ekhoria-campanha";
const LORE_PACK = "ekhoria-lore";

// ── Pack de classes (classes + class_abilities, agrupadas em folders) ──
// Nome de exibicao do chassi do OD2 sobre o qual cada classe roda. As 16
// classes de Ekhoria se dividem 4 por chassi, e isso vira a hierarquia do
// compendio — o mesmo papel que classe-base/especializacao fez no modulo de
// Star Wars, aqui vindo de um campo em vez de palavra-chave no nome.
const CHASSI = {
  guerreiro_esp: { nome: "Guerreiro", sort: 100000 },
  mago_esp: { nome: "Mago", sort: 200000 },
  clerigo_esp: { nome: "Clérigo", sort: 300000 },
  ladrao_esp: { nome: "Ladrão", sort: 400000 },
};

function buildClassesDocs() {
  const docs = [];
  const pastaChassi = new Map();

  for (const cls of classes) {
    const chassi = CHASSI[cls.tabela];
    let pai = null;
    if (chassi) {
      if (!pastaChassi.has(cls.tabela)) {
        const nova = folderDoc(chassi.nome, "Item", "classes:chassi", { sort: chassi.sort });
        pastaChassi.set(cls.tabela, nova);
        docs.push(nova);
      }
      pai = pastaChassi.get(cls.tabela)._id;
    }
    // O _id da pasta deriva do nome da classe, nao do pai: aninhar nao muda ID.
    const folder = folderDoc(cls.nome, "Item", "classes", { parentId: pai });
    docs.push(folder);
    const abilityUuids = [];
    cls.habilidades.forEach((ab, i) => {
      const doc = classAbilityDoc(ab, folder._id, cls.nome, (i + 1) * 100000);
      docs.push(doc);
      abilityUuids.push(itemUuid(CLASSES_PACK, doc._id));
    });
    docs.push(classDoc(cls, folder._id, abilityUuids));
  }

  // Escolhas de linha (Escolas do Marcado): o jogador arrasta a que escolheu.
  // A pasta "Marcado (Escolas)" é aninhada dentro de "Marcado" por
  // aninhaPastas(), que lê o parêntese.
  const avulsas = {};
  classAbilitiesAvulsas.forEach((ab, i) => {
    if (!avulsas[ab.folder]) {
      avulsas[ab.folder] = folderDoc(ab.folder, "Item", "classes");
      docs.push(avulsas[ab.folder]);
    }
    docs.push(classAbilityDoc(ab, avulsas[ab.folder]._id, ab.folder, (i + 1) * 100000));
  });

  return docs;
}

// ── Pack de raças (races + race_abilities, agrupadas em folders) ──
function buildRacasDocs() {
  const docs = [];
  for (const race of racas) {
    const folder = folderDoc(race.nome, "Item", "racas");
    docs.push(folder);
    const abilityUuids = [];
    race.habilidades.forEach((ab, i) => {
      const doc = raceAbilityDoc(ab, folder._id, race.nome, (i + 1) * 100000);
      docs.push(doc);
      abilityUuids.push(itemUuid(RACAS_PACK, doc._id));
    });
    docs.push(raceDoc(race, folder._id, abilityUuids));
  }
  // Habilidades de raça avulsas (aprimoramentos concedidos por classes).
  const folders = {};
  racaAbilitiesAvulsas.forEach((ab, i) => {
    if (!folders[ab.folder]) {
      folders[ab.folder] = folderDoc(ab.folder, "Item", "racas");
      docs.push(folders[ab.folder]);
    }
    docs.push(raceAbilityDoc(ab, folders[ab.folder]._id, ab.folder, (i + 1) * 100000));
  });
  return docs;
}

// ── Pack de journal (referência do mestre) ──
function buildJournalDocs() {
  return journalPages.map((entry, i) => journalDoc(entry, (i + 1) * 100000));
}

// ── Pack de tabelas de rolagem ──
function buildTabelasDocs() {
  // As de mecânica (tabelas.mjs) + as da Seção do Mestre (tabelas-mestre.mjs).
  return [...tabelas, ...tabelasMestre].map((t, i) => rollTableDoc(t, (i + 1) * 100000));
}

// ── Pack de lore (cenário de campanha) ──
function buildLoreDocs() {
  const entry = {
    ...loreJournal,
    pages: [...loreJournal.pages, ...loreExtraPages, ...worldbuildingPages],
  };
  return [journalDoc(entry, 100000)];
}

// ── Pack de itens (Arsenal: armas, armaduras, substâncias) ──
function buildItensDocs() {
  const builders = { weapon: weaponDoc, armor: armorDoc, misc: miscDoc };
  const docs = [];
  for (const cat of categorias) {
    const folder = folderDoc(cat.folder, "Item", "itens");
    docs.push(folder);
    const build = builders[cat.tipo];
    cat.itens.forEach((it, i) => {
      docs.push(build(it, folder._id, cat.folder, (i + 1) * 100000));
    });
  }
  return docs;
}

// ── Pack de magias (4 escolas) ──
function buildMagiasDocs() {
  const docs = [];
  for (const grupo of escolas) {
    const escola = folderDoc(grupo.folder, "Item", "magias");
    docs.push(escola);

    // Dentro da escola, uma subpasta por círculo.
    const porCirculo = new Map();
    for (const m of grupo.magias) {
      const c = m.circle ?? 1;
      if (!porCirculo.has(c)) porCirculo.set(c, []);
      porCirculo.get(c).push(m);
    }

    for (const c of [...porCirculo.keys()].sort((a, b) => a - b)) {
      // A seed inclui a escola: sem isso o "1º Círculo" da Arcana e o da
      // Divina gerariam o mesmo _id e um sobrescreveria o outro.
      const sub = folderDoc(`${c}º Círculo`, "Item", `magias:${grupo.folder}`, {
        parentId: escola._id,
        sort: c * 100000,
      });
      docs.push(sub);
      porCirculo.get(c).forEach((m, i) => {
        docs.push(spellDoc({ ...m, school: grupo.school }, sub._id, grupo.school, (i + 1) * 100000));
      });
    }
  }
  return docs;
}

// ── Pack de bestiário (Actors do tipo monster) ──
function buildBestiarioDocs() {
  const docs = [];
  for (const grupo of gruposBestiario) {
    const folder = folderDoc(grupo.folder, "Actor", "bestiario");
    docs.push(folder);
    grupo.monstros.forEach((m, i) => {
      docs.push(monsterDoc(m, folder._id, grupo.folder, (i + 1) * 100000));
    });
  }
  return docs;
}

// ── Pack da campanha (material do mestre; ownership restrito no module.json) ──
function buildCampanhaDocs() {
  return [journalDoc(campanhaJournal, 100000)];
}

async function compile(packName, docs) {
  const srcDir = path.join(SRC, packName);
  const outDir = path.join(OUT, packName);
  // Converte a hierarquia dos NOMES ("Guerreiro — Bárbaro") em pastas
  // aninhadas de verdade. Vale para todos os packs, por isso mora aqui.
  const n = writeSource(srcDir, aninhaPastas(docs));
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  await compilePack(srcDir, outDir, { log: false });
  console.log(`  ✔ ${packName}: ${n} documentos → LevelDB`);
}

async function main() {
  console.log("Gerando compêndios do Ekhoria…");
  await compile(CLASSES_PACK, buildClassesDocs());
  await compile(RACAS_PACK, buildRacasDocs());
  await compile(ITENS_PACK, buildItensDocs());
  await compile(MAGIAS_PACK, buildMagiasDocs());
  await compile(TABELAS_PACK, buildTabelasDocs());
  await compile(BESTIARIO_PACK, buildBestiarioDocs());
  await compile(LORE_PACK, buildLoreDocs());
  await compile(JOURNAL_PACK, buildJournalDocs());
  await compile(CAMPANHA_PACK, buildCampanhaDocs());
  console.log("Concluído.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
