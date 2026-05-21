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
  journalDoc, itemUuid, writeSource,
} from "./lib.mjs";

import { classes } from "./data/classes.mjs";
import { racas } from "./data/racas.mjs";
import { journalPages } from "./data/journal.mjs";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const SRC = path.join(ROOT, "packs-src");
const OUT = path.join(ROOT, "ekhoria-module", "packs");

const CLASSES_PACK = "ekhoria-classes";
const RACAS_PACK = "ekhoria-racas";
const JOURNAL_PACK = "ekhoria-journal";

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
  return docs;
}

// ── Pack de journal (referência do mestre) ──
function buildJournalDocs() {
  return journalPages.map((entry, i) => journalDoc(entry, (i + 1) * 100000));
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
  await compile(JOURNAL_PACK, buildJournalDocs());
  console.log("Concluído.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
