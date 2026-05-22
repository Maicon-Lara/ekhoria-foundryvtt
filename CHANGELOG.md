# Changelog

Todas as mudanças relevantes deste módulo são documentadas aqui.
O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o versionamento segue o [SemVer](https://semver.org/lang/pt-BR/).

## [0.5.1] — 2026-05-22

### Modificado
- **Ícones temáticos** em todo o conteúdo, usando os ícones do próprio sistema
  OD2 (garantidos de existir, sem risco de ícone quebrado): magias por escola
  (arcana/divina/necromante/ilusionista), armas por tipo de dano
  (cortante/perfurante/impactante/disparo), armaduras, munições, substâncias e
  cristais, além de ícones consistentes para classes, raças e habilidades.

## [0.5.0] — 2026-05-22

### Adicionado
- **Compêndio "Ekhoria: Tabelas"** (RollTables jogáveis): Falha Crítica de Arma
  de Fogo (1d6), Marcas do Cambion (1d12), Construção Variável do Autokthon
  (1d13) e Fungo do Degelo Aleatório (1d8).

## [0.4.3] — 2026-05-22

### Corrigido
- **Custódio Solar:** o aprimoramento que concede ao Autokthon uma 3ª
  característica de Construção Variável agora é computável na ficha. Como o tipo
  `class_ability` não suporta `variable_construction`, foi criada a habilidade de
  raça **Construção Variável (Custódio Solar)** (compêndio Ekhoria: Raças, pasta
  "Aprimoramentos de Classe"): ao adicioná-la, o personagem ganha o 3º seletor de
  construção (2 da raça + 1 do Custódio). Descrição da habilidade da classe
  atualizada com a instrução.

### Revisão
- Todas as 8 classes reconferidas contra o livro (EKHORIA_MECANICAS.docx);
  habilidades e progressões confirmadas.

## [0.4.2] — 2026-05-22

### Adicionado
- **Materiais e Cristais** como itens no compêndio Arsenal: Prata, Bronze,
  Mitral, Arkanita, Ônix, Centelha Solar e Erebo (efeitos em armadura/arma/arma
  de fogo e multiplicador de custo).
- **Munições Especiais**: Balas de Prata, de Ferro Frio e Perfurantes (Mitral).
- **Munições de Cristal** (12): Flecha/Virote/Bala de Arcanita, Ônix, Centelha
  Solar e Erebo, com dano extra, efeito e risco. A regra de Instabilidade de
  Ressonância (só funcionam em armas mundanas) segue no journal de referência.

## [0.4.1] — 2026-05-22

### Corrigido
- **Talentos de Diplomata** e **Talentos de Caçador** agora usam a mecânica
  nativa de talentos do OD2 (campo `rogue_talents` populado), fazendo a ficha
  exibir o alocador de pontos por talento (base 2 + pontos por nível, máximo 5),
  igual aos Talentos de Ladrão. Cada talento tem nome e descrição próprios.
- Nota: o sistema calcula os pontos por **Destreza** (correto para o Voraz).
  Para o **Diplomata**, que no livro usa **Carisma**, a alocação deve ser
  ajustada manualmente — registrado na descrição da habilidade.

## [0.4.0] — 2026-05-22

### Adicionado
- **Compêndio "Ekhoria: Arsenal"** (itens): armas regionais (Kurogane, Soqueiras,
  Kattar), armas de fogo (Pistola e Mosquete de pederneira), armaduras (Couraça
  Lagarto-Gelo e armaduras de Núcleo Lítico) e substâncias alquímicas / Fungos do
  Degelo (Mandra, Albinus, Nargula, Sacos de Esporos, Máscara de Nurillion, etc.).
- **Compêndio "Ekhoria: Magias"**: 45 magias das quatro escolas — Arcana (9),
  Divina (18, por divindade Aelora/Chronael/Morthan), Necromante (9, incluindo
  o Buquê Púrpura exclusivo) e Ilusionista (9) — com escola, círculo, alcance,
  duração, Jogada de Proteção e descrição.
- Página de journal "Arsenal — Materiais, Cristais e Regras" (metais especiais,
  cristais de Ekhoria, regras de armas de fogo, vício e extração de despojos).

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
