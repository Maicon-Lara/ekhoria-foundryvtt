# Changelog

Todas as mudanças relevantes deste módulo são documentadas aqui.
O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/)
e o versionamento segue o [SemVer](https://semver.org/lang/pt-BR/).

## [0.11.1] — 2026-08-17

Alterações do cofre feitas depois da build de 0.11.0.

### Modificado
- **Cinco magias trocaram porcentagem por teste de atributo**, acompanhando a
  conversão feita no livro de mecânicas: *Detectar Doença* (INT Normal/−2/−5 para
  saber **qual** doença; a infecção em si passa a ser detectada sem teste),
  *Identificação* (INT, com resultado explícito para sucesso, falha e 20 natural),
  *Análise Essencial de Alamir* (INT Fácil +2, e o alvo não precisa ser item) e
  *Runas Explosivas* (INT Muito Difícil −5; o talento **Armadilhas** de um Ladrão
  só a encontra num resultado 1).
- ***Aura Esotérica de Nystul*** deixou de ser "50% de notar a fraude": agora torna
  *Identificação* e *Análise Essencial de Alamir* **Muito Difíceis (−5)** sobre o
  item, e na falha o conjurador lê a aura plantada como verdadeira.
- **Filhos de Arkádia** (Arkanim) ganhou o raio que faltava na descrição: **9 m**,
  chance de 1 em 1d6.

### Adicionado
- **Malha de Núcleo Aflorado** (armadura leve, CA 2, 30 po, Carga 1) — a peça do
  dia a dia em Arkádia. Enquanto vestida, **Filhos de Arkádia** detecta a **18 m**
  em vez de 9. Com ela, o requisito das armaduras de Núcleo Lítico deixa de ser
  uniforme: a Malha **basta o núcleo** e serve a qualquer Arkanim, enquanto
  Vestimenta e Panóplia continuam exigindo o treino de Lito-arcanista.

### Notas
- Divergências conhecidas e **não** transportadas nesta versão, por estarem fora do
  alcance dos importadores atuais: a tabela geral *Experiência e Progressão — 1º ao
  15º* (o módulo só tem a versão específica de *A Guerra do Esmaecer*) e a campanha
  **Companhia** inteira, com 8 arquivos — o `importar-campanha.mjs` tem
  `"A Guerra do Esmaecer"` fixo no caminho e só enxerga uma campanha.

## [0.11.0] — 2026-08-12

Transporte das alterações do cofre Obsidian acumuladas desde 31/07.

> **Nota sobre a numeração.** O `module.json` já estava em 0.10.0 e este arquivo
> parou no 0.6.8 — as versões 0.7 a 0.10 saíram sem entrada. Não inventei o
> histórico delas; o `package.json`, que tinha ficado para trás em 0.6.6, foi
> alinhado ao módulo.

### Adicionado
- **O Livro de Lore, inteiro.** 18 capítulos, 227 KB, uma página por capítulo na
  ordem de leitura. Ele nunca esteve no módulo: o que havia no pack de lore é um
  texto próprio, mais curto, escrito antes do livro e nunca reconciliado com ele.
  As duas entradas convivem no mesmo pack até você decidir qual fica.
- **15 magias exclusivas de classe** (Guardião da Centelha, Vociferante,
  Astromante), em pasta própria — capítulo que não existia no módulo.
- **O relógio do Breu e suas Consequências**, do capítulo de Regras de Ambiente:
  três tabelas (tempo de permanência, Marca, Ruína). Também nunca transportado.
- **Nomes de Vornfell e Benellikov** (7 tabelas). Benellikov tem duas listas de
  sobrenome porque o nome diz de que andar da cratera a pessoa veio.
- Narcoguerreiro: **Receitas de Combate**. Arkanim: **Cristal à Vista**.

### Modificado
- **Bestiário:** JP recalculada em 19 fichas; `tipo` normalizado em 7
  (`Ladino`→`Ladrão`, `Combatente`→`Guerreiro`, `Caçador`→`Voraz`). Fauce do
  Breu: *Filha da Contenção que Falha* → **Feita de Escuro**.
- **Voraz:** *Talentos/Firmeza de Caçador* e *Caçada Implacável* renomeados para
  **de Voraz** e **Perseguição Implacável**. O **Golpe de Abate** agora só vale
  contra criatura já identificada por *Anatomia das Feras*.
- **Pugilista:** *Bom de Briga* → **Punhos como Arma**, com dano de 1d4/1d6/1d8
  (era 1d2/1d4/1d6). *Calejado* passa a dar **+1 PV por nível**, retroativo, e
  não mais +1 uma única vez. As Três Escolas deixaram de ser só sabor: cada uma
  concede +1 em dano, CA ou nocaute.
- **Cristais:** os quatro reescritos, agora com o custo de cada um como regra
  (o Ônix satura, a Centelha Solar não apaga, o Erebo devora curas). Erebo passa
  a ×8. Munições de Erebo remarcadas (40/50/100 → 90/110/180 po).
- **Fungos:** a duração deixou de escalar com o nível — `1d4 + nível` virou
  `1d4+1`. Num personagem de 10º isso é 14 rodadas virando 3. Nargula vai a
  2d6+6 h; Fungo Ébano vira −2 nos ataques contra o usuário, por 1d4+1 horas.
- Recuperação de vício do Albinus: Difícil (−5) → **Muito Difícil (−5)**.

### Corrigido
- **O validador nunca conferiu o bestiário.** A regex do bloco ```` od2-monstro ````
  exigia LF e o cofre grava CRLF: nenhuma ficha casava, e a área reportava
  "0 erros" com toda confiança enquanto 19 JPs estavam erradas.
- **Os quatro Silentes Ancorados viravam um só.** O `norm()` apaga parênteses —
  certo para *Ecdise (desvantagem)*, errado para nome de criatura. O Arqueiro
  era comparado contra o Sargento de 5º nível: onze erros que não existiam.
- A comparação de habilidades do `validar.mjs` era um `Set` construído de um
  ternário com os dois ramos vazios. Sempre vazio, sempre em silêncio. Quem faz
  isso agora é o `sincronizar-bestiario.mjs`.
- *Encontros — Breônia*: a escolta do mercador de ônix vai a **Nihilvale**.

### Ferramentas
- `sincronizar-bestiario.mjs` (novo): troca no bestiário só os campos de que o
  cofre é dono, preservando a curadoria que não existe na fonte. Aponta renome
  de habilidade sem mexer na descrição. Idempotente.
- `importar-lore.mjs` (novo): gera o Livro de Lore a partir do cofre.
- `markdown.mjs` (novo): o conversor de Markdown saiu de dentro do
  `importar-campanha.mjs` para ser usado pelos dois importadores. Verificado
  como neutro — a campanha regerada saiu byte a byte idêntica.
- `validar.mjs` deixou de repetir dezesseis avisos de *Reputação*: o livro passou
  a documentá-la uma vez só, num capítulo próprio.

## [0.6.8] — 2026-06-19

### Modificado
- **Sincronização das raças com o livro de Mecânicas atual.** O `racas.mjs`
  estava baseado num rascunho antigo; alinhado ao capítulo *Povos* vigente:
  - **Autokthon:** a antiga "Adaptabilidade (+1 JP)" vira **Núcleo Exposto**
    (vulnerabilidade: suscetível a efeitos mentais, JPS Difícil); a lista de
    **Construção Variável** passa a ser as 12 adaptações oficiais (Chassi
    Blindado, Carcaça de Cerco, Membro-Ferramenta, etc.).
  - **Atlante:** "Adaptabilidade/Letrados" → **Filhos da Corrente** (+1 CA/JPD
    ao se mover) e **Erudito Errante**.
  - **Cambion:** "Graça Diabólica (+1 JPD)" → **Sangue Infernal** (reduz dano
    de fogo + JP vs Medo).
  - **Elfo Drow:** "Graciosos (+1 JPD)" → **Pacto da Teia**.
  - **Nefilim:** "Graciosos (+1 JPD)" → **Luz Celeste**.
  - **Mantes:** "Saltadores + Graciosos" fundidos em **Sentidos de Caçador**.
  - **Grimor:** raça renomeada (era "Varko") e "Têmpera das Profundezas"
    completada com o reconhecimento do subterrâneo.
- Arkanim, Orc do Sol Poente e Silente já estavam alinhados.

## [0.6.7] — 2026-06-18

### Adicionado
- **As 8 classes que faltavam**, completando as 16 do cenário: Inquisidor
  Lunar, Guardião da Pira, Astromante, Vociferante de Arcanita, Sabotador da
  Cratera, Corvo, Marcado e Mestre das Armas.

### Modificado
- **Sincronização com o vault (revisão de balanço das classes):**
  - **Clérigo:** Inquisidor Lunar e Guardião da Pira trocam a Cura Milagrosa
    por um espontâneo temático (Misericórdia do Limiar / Dádiva da Pira),
    alinhando ao padrão das especializações de Clérigo do OD2.
  - **Mago:** Guardião da Centelha — Domínio da Centelha agora vezes/dia = mod.
    INT e o capstone integra um 2º Cristal; Lito-arcanista ganha Foco Arcano
    (ataca por INT) e tem o Dado de Vida corrigido para **d6**.
  - **Guerreiro:** Mestre das Armas — Sequência Tática concede o Ataque Extra
    (com trava de encadeamento); Narcoguerreiro — Metabolismo Acelerado
    suavizado (o vício volta a pesar).
- **XP de todas as classes validado contra o Old Dragon 2.**

## [0.6.6] — 2026-06-15

### Modificado
- **Sincronização das mecânicas com o livro de Mecânicas (vault).** Várias
  classes e raças foram alinhadas à versão atual do material-fonte:
  - **Classes:** Custódio Solar ganha "Pulso de Estabilidade" (a antiga
    "Presença da Luz" foi absorvida pelo Núcleo da Chama Primordial); Voraz
    ganha "Golpe de Abate" e "Ouvir Ruídos", "Conhecimento de Abominações"
    vira "Anatomia das Feras" (evolução no 10º), e "Rastreamento" sai;
    Pugilista "Calejado" passa a +1 PV permanente (não +2/nível); Guardião da
    Centelha ganha "Sincronia Técnica" e "Reajuste Rápido" como habilidades
    próprias e troca Cinthara→Durgrann; Lito-arcanista e Voraz têm as
    restrições de armas/armaduras corrigidas; Narcoguerreiro e Diplomata têm
    nomes/efeitos ajustados.
  - **Raças:** Orc do Sol Poente troca "Disciplina de Marcha" por "Fúria dos
    Ancestrais (Ki)" e ganha +1 de dano (cortante/perfurante) em "Técnica
    Refinada"; Varko corrige a inversão entre "Conhecimento das Profundezas"
    (+1 JPC) e "Vigorosos"; Silente, Mantes e Autokthon têm textos ajustados.
  - **Arsenal:** Erebo passa a custo ×5; grafia "Arkanita"→"Arcanita".
  - **Magias:** "Toque do Carniçal" (grafia) e verbo da JP ("evita").

## [0.6.5] — 2026-06-15

### Corrigido
- **Pacote de distribuição (`ekhoria.zip`) inválido.** Nas versões 0.6.3 e 0.6.4
  o arquivo fora gerado como um *tar* com extensão `.zip` (o `tar` do Windows
  ignora a extensão), e o Foundry não conseguia instalá-lo (`FILE_ENDED` /
  "No module manifest found"). Agora o zip é gerado com `tools/make-zip.py`
  (zip real, separadores `/`), compatível com o extrator do Foundry.

## [0.6.4] — 2026-06-15

### Modificado
- **Distribuição via release do GitHub.** O `manifest` passa a apontar para
  `releases/latest/download/module.json` e o `download` para o `.zip` do release
  versionado, em vez dos arquivos crus do branch `main`. Isso evita que um push
  no `main` altere a versão servida a instalações existentes — cada release fica
  imutável e a atualização no Foundry segue o fluxo padrão de módulos.

## [0.6.3] — 2026-06-15

### Corrigido
- **Tipo de dano das armas compatível com o sistema OD2.** O `damage_type` das
  armas passava em português (`cortante`/`impactante`/`perfurante`), valores que
  o enum do sistema rejeita; agora é traduzido na geração dos compêndios para
  `slashing`/`bludgeoning`/`piercing`. Os dados-fonte (`tools/data/itens.mjs`)
  seguem em português — a tradução acontece no `weaponDoc` (`tools/lib.mjs`).
- **Badge "Ekhoria" na ficha.** A detecção lia `system.classe.value`, que não
  existe no Old Dragon 2e (classe e raça são *Items* embarcados na ficha). Agora
  o aviso aparece quando a ficha tem um Item `class`/`race` do cenário, com
  comparação de nome sem acento/caixa.
- **Diálogos de classe/raça migrados para `DialogV2`** (a `Dialog` V1 está
  deprecada no Foundry v13). A inserção do badge passa a usar DOM nativo
  (sem `innerHTML`) e funciona tanto em fichas AppV1 quanto V2.

### Removido
- Setting interno `versao` (não utilizado).

## [0.6.2] — 2026-05-22

### Adicionado
- **Lore completo dos Silentes** no compêndio Ekhoria: Cenário (Lore) — origem
  (Magia do Eco / Ritual do Eco Contaminado), aparência, manutenção (sangue e
  unguentos), personalidade e ganchos de aventura. Páginas de lore autorais
  ficam em `tools/data/lore-extra.mjs` (não sobrescritas pelo gerador).

## [0.6.1] — 2026-05-22

### Modificado
- **Silente** atualizado com as regras oficiais fornecidas pelo autor (não mais
  reconstrução): Eco-Sombrio (1 em 1d6 de não ser percebido, não restrito a
  penumbra), Corpo Estático (inclui substituir partes/transferir o Eco), Eco
  Antimágico (magias de área afetam normalmente). Descrição atualizada com o
  lore da Magia do Eco / Ritual do Eco Contaminado.

## [0.6.0] — 2026-05-22

### Adicionado
- **3 raças que faltavam**, completando as 10 raças originárias do cenário:
  - **Arkanim** e **Atlante** — com ficha mecânica transcrita do livro de
    mecânicas (corrigindo omissão das versões anteriores, que tinham só 7 raças).
  - **Silente** — recriado a partir do material original do cenário (o livro de
    mecânicas não define habilidades raciais para ele; é pré-requisito do
    Relicário Vivo). Sujeito a ajuste pelo Mestre.
- Tabela de raças e nota de conversão do journal atualizadas.

## [0.5.4] — 2026-05-22

### Corrigido
- **Cabeçalhos dos Journals (de verdade desta vez).** O conteúdo passa a ser
  envolvido na classe `odo-markdown` — a mesma que o sistema OD2 usa nos seus
  próprios journals —, então os cabeçalhos herdam o estilo oficial (carmesim
  legível) e as tabelas/listas ficam estilizadas como nos compêndios do sistema.
  (A tentativa anterior com `.ekhoria-doc` não pegava porque o sistema só
  estiliza cabeçalhos dentro de `.odo-markdown`.)

## [0.5.3] — 2026-05-22

### Corrigido
- **Legibilidade dos cabeçalhos nos Journals.** Os títulos das seções ficavam
  numa cor clara (herdada do tema do sistema), quase invisíveis no fundo branco.
  O conteúdo dos journals do Ekhoria agora é envolvido em `.ekhoria-doc` e
  estilizado no ekhoria.css com cabeçalhos legíveis (escopado, sem afetar
  journals de outros módulos). Também estiliza tabelas e citações.
- Removido o título `<h1>` duplicado dentro das páginas de referência (o nome da
  página já é exibido pelo Foundry).

## [0.5.2] — 2026-05-22

### Adicionado
- **Compêndio "Ekhoria: Cenário (Lore)"** — o sourcebook de ambientação,
  transcrito do livro de lore: Sobre Ekhoria, Como Usar, Povos de Ekhoria, as
  10 nações (Arkádia, Benellikov, Areias Esquecidas, Breônia, Cinthara, Ferro
  Velho, Triarcis, Vale da Águia, Vornfell, Yorugan), A Tríade de Ekhoria,
  Cosmologia, Calendário e Organizações — em 17 páginas de Journal.

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
