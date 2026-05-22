// Verificação: extrai os packs LevelDB compilados de volta para JSON,
// em _verify/, para conferência manual. Não afeta o build.
//
// Uso: npm run extract

import path from "node:path";
import { fileURLToPath } from "node:url";
import { extractPack } from "@foundryvtt/foundryvtt-cli";

const ROOT = path.resolve(fileURLToPath(import.meta.url), "../..");
const PACKS = path.join(ROOT, "ekhoria-module", "packs");
const OUT = path.join(ROOT, "_verify");

for (const name of ["ekhoria-classes", "ekhoria-racas", "ekhoria-itens", "ekhoria-magias", "ekhoria-tabelas", "ekhoria-journal"]) {
  await extractPack(path.join(PACKS, name), path.join(OUT, name), {
    yaml: false,
    log: false,
  });
  console.log(`  ✔ ${name} → _verify/${name}`);
}
console.log("Verificação extraída em _verify/.");
