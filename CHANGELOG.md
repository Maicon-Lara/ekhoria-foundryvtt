# Changelog

Todas as mudanças relevantes deste módulo são documentadas aqui.
O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o versionamento segue o [SemVer](https://semver.org/lang/pt-BR/).

## [0.3.0] — 2026-05-22

### Corrigido
- **Conteúdo de raças e classes reescrito conforme o livro oficial "Ekhoria —
  Mecânicas para Old Dragon 2".** As versões anteriores usavam dados de
  placeholder incorretos.
- **Raças (7):** Autokthon, Cambion, Elfo Drow, Mantes, Nefilim, Orc do Sol
  Poente e Varko, com movimento, infravisão, alinhamento e habilidades fiéis ao
  livro. Removidas as raças inexistentes Arkanim, Atlante e Silente; adicionado
  Elfo Drow.
- **Classes (8):** progressões de XP/BA/JP transcritas das tabelas do livro
  (Especializações de Clérigo, Guerreiro, Mago e Ladrão), com restrições,
  Dado de Vida e habilidades por nível corretas. Evoluções de habilidade
  ([3]/[6]/[10]) mapeadas para os campos level3/level6/level10.

### Notas
- "Silente" e "Arkanim" aparecem como restrições de classe, mas no livro são
  identidades de origem/lore, não raças jogáveis com ficha própria.

## [0.2.0] — 2026-05-21

### Adicionado
- Pipeline de build: conteúdo editável em `tools/data/`, compilado para LevelDB
  via `@foundryvtt/foundryvtt-cli` (`npm run build`).
- Fontes JSON versionadas em `packs-src/` (uma por documento).
- Progressões oficiais de BA/JP/XP por arquétipo (Guerreiro, Clérigo, Mago, Ladrão),
  extraídas do SRD do Old Dragon 2e.
- Habilidades de classe e de raça como itens separados, vinculados por UUID.
- Pasta de compêndios "Ekhoria" (`packFolders`) e `ekhoria.zip` distribuível no repositório.

### Modificado
- **Classes e raças agora usam os tipos nativos do sistema** (`class`, `class_ability`,
  `race`, `race_ability`) em vez do tipo inexistente `feature`. Com isso, integram-se de
  fato à mecânica do Old Dragon 2e (Dado de Vida, progressão, restrições de raça,
  movimento, infravisão, alinhamento, bônus de JP, CA natural, usos diários).
- Compêndios migrados do formato legado **NeDB (`.db`)** para **LevelDB**, exigido pelo
  Foundry v13.
- `module.json`: caminhos dos packs apontando para as pastas LevelDB; compatibilidade
  declarada para Foundry v13 e OD2 v2.x; `download` apontando para o `ekhoria.zip`.

### Removido
- `gerar-compendios.js` (gerava itens com o tipo errado `feature`), substituído por `tools/`.
- Arquivos `.db` antigos (NeDB), substituídos pelos packs LevelDB.

## [0.1.0]

### Adicionado
- Versão inicial do módulo: 8 classes e 9 raças do cenário Ekhoria e um journal de
  referência, gerados como itens genéricos em formato NeDB (`.db`).
