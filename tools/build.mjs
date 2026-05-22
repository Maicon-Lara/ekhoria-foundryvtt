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
  folderDoc, classDoc, classAbilityDoc, raceDoc, raceAbilityDoc,
  journalDoc, spellDoc, weaponDoc, armorDoc, miscDoc, rollTableDoc, itemUuid, writeSource,
} from "./lib.mjs";

import { classes } from "./data/classes.mjs";
import { racas, racaAbilitiesAvulsas } from "./data/racas.mjs";
import { journalPages } from "./data/journal.mjs";
import { escolas } from "./data/magias.mjs";
import { categorias } from "./data/itens.mjs";
import { tabelas } from "./data/tabelas.mjs";
import { loreJournal } from "./data/lore.mjs";
import { loreExtraPages } from "./data/lore-extra.mjs";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const SRC = path.join(ROOT, "packs-src");
const OUT = path.join(ROOT, "ekhoria-module", "packs");

const CLASSES_PACK = "ekhoria-classes";
const RACAS_PACK = "ekhoria-racas";
const JOURNAL_PACK = "ekhoria-journal";
const ITENS_PACK = "ekhoria-itens";
const MAGIAS_PACK = "ekhoria-magias";
const TABELAS_PACK = "ekhoria-tabelas";
const LORE_PACK = "ekhoria-lore";

// ── Pack de classes (classes + class_abilities, agrupadas em folders) ──
function buildClassesDocs() {
  const docs = [];
  for (const cls of classes) {
    const folder = folderDoc(cls.nome, "Item", "classes");
    docs.push(folder);
    const abilityUuids = [];
    cls.habilidades.forEach((ab, i) => {
      const doc = classAbilityDoc(ab, folder._id, cls.nome, (i + 1) * 100000);
      docs.push(doc);
      abilityUuids.push(itemUuid(CLASSES_PACK, doc._id));
    });
    docs.push(classDoc(cls, folder._id, abilityUuids));
  }
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
  return tabelas.map((t, i) => rollTableDoc(t, (i + 1) * 100000));
}

// ── Pack de lore (cenário de campanha) ──
function buildLoreDocs() {
  const entry = { ...loreJournal, pages: [...loreJournal.pages, ...loreExtraPages] };
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
    const folder = folderDoc(grupo.folder, "Item", "magias");
    docs.push(folder);
    grupo.magias.forEach((m, i) => {
      docs.push(spellDoc({ ...m, school: grupo.school }, folder._id, grupo.school, (i + 1) * 100000));
    });
  }
  return docs;
}

async function compile(packName, docs) {
  const srcDir = path.join(SRC, packName);
  const outDir = path.join(OUT, packName);
  const n = writeSource(srcDir, docs);
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
  await compile(LORE_PACK, buildLoreDocs());
  await compile(JOURNAL_PACK, buildJournalDocs());
  console.log("Concluído.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
