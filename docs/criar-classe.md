# Como criar uma nova classe no módulo Ekhoria (Foundry VTT)

Guia passo a passo para adicionar uma classe ao compêndio **Ekhoria: Classes**,
publicá-la e testá-la — sem precisar de ajuda externa.

> **Regra de ouro:** você **nunca** edita os compêndios direto (nem no Foundry,
> nem em `packs-src/`). A fonte da verdade é `tools/data/classes.mjs`. O comando
> `npm run build` regera tudo a partir dela — qualquer edição manual em
> `packs-src/` é **sobrescrita**.

---

## 1. Como a pipeline funciona

```
tools/data/classes.mjs   →  npm run build       →  packs-src/  +  ekhoria-module/packs/  (LevelDB)
   (você edita aqui)         (gera os compêndios)    (gerado, não editar)
                                                          ↓
                            python tools/make-zip.py  →  ekhoria.zip  →  release no GitHub
```

Cada classe vira:
- **1 Item `class`** (a classe em si), e
- **1 Item `class_ability` por habilidade**, agrupados numa pasta com o nome da classe.

Você só mexe na lista `classes` em `tools/data/classes.mjs`. O resto é automático.

---

## 2. Anatomia de uma classe

Cada classe é um objeto na lista `classes`. Campos:

| Campo | Obrigatório | O quê |
|---|---|---|
| `nome` | ✅ | Nome da classe (vira o nome do Item e da pasta). |
| `dv` | ✅ | Dado de Vida (ex.: `8` = 1d8). Vira `system.hp`. |
| `levels` | ✅ | Progressão de BA/JP/XP. Use `progressao("...")` (ver §4). |
| `descricao` | ✅ | Descrição longa, em **HTML** (`<p>…</p>`). |
| `flavor` | recomendado | Frase de efeito curta, em HTML. |
| `tabela` | informativo | Rótulo da progressão usada (ex.: `"clerigo_esp"`). Apenas documenta; quem gera a progressão é o `levels`. |
| `high_level_hp_bonus` | opcional | PV fixo ganho por nível a partir do 11º (ex.: `1`). |
| `equipment_restrictions` | recomendado | Objeto com `weapons`, `armors`, `magic_items` (texto livre). |
| `restricao_racas` | opcional | Lista de raças permitidas/relacionadas, ex.: `["Autokthon"]`. |
| `restricao_alinhamentos` | opcional | Lista de alinhamentos, ex.: `["Ordeiro"]`. |
| `habilidades` | ✅ | Lista de habilidades (ver §3). |
| `img` | opcional | Caminho de ícone; se omitido usa o ícone padrão de classe. |

> As descrições aceitam HTML simples: `<p>`, `<strong>`, `<em>`, `<ul><li>`.
> Mantenha o português com acentos normalmente — o build lida com isso.

---

## 3. Anatomia de uma habilidade

Cada item de `habilidades` vira um Item `class_ability`. Campos **que o build lê**:

| Campo | Obrigatório | O quê |
|---|---|---|
| `nome` | ✅ | Nome da habilidade. |
| `level` | ✅ | Nível em que é ganha (ex.: `1`, `3`, `6`, `10`, `11`). |
| `desc` | ✅ | Descrição em HTML. |
| `usos_dia` | opcional | Usos por dia (ex.: `1`). Vale do `level` em diante. |
| `level3` | opcional | Texto (HTML) de evolução da habilidade no nível 3. |
| `level6` | opcional | Idem, nível 6. |
| `level10` | opcional | Idem, nível 10. |
| `rogue_talents` | opcional | Lista de talentos de ladrão (raro; só se a classe usar). |
| `img` | opcional | Ícone próprio. |

> ⚠️ Qualquer outro campo (ex.: `jp`, `natural_weapon`) é **ignorado** no Item de
> classe — esses pertencem a habilidades de **raça**, não de classe. Para efeitos
> mecânicos de JP/ataque, descreva no texto da `desc`.

Exemplo de habilidade com evolução e usos/dia:
```js
{ nome: "Portador da Luz", level: 6, usos_dia: 1,
  desc: "<p>Uma vez por dia, reduz à metade o dano de uma criatura Caótica.</p>",
  level10: "<p>Passa a poder usar duas vezes por dia.</p>" },
```

---

## 4. Progressão (BA / JP / XP)

O campo `levels` espera o formato do schema do sistema. Não monte à mão — use a
função `progressao("nome_da_tabela")`, já importada no topo do arquivo.

Tabelas prontas em `tools/data/progressoes.mjs` (1º ao 15º nível):

| Tabela | Arquétipo base | DV típico |
|---|---|---|
| `clerigo_esp` | Especialização de Clérigo | 8 |
| `guerreiro_esp` | Especialização de Guerreiro | 10 |
| `mago_esp` | Especialização de Mago | 4 |
| `ladrao_esp` | Especialização de Ladrão | 6 |

Uso: `levels: progressao("guerreiro_esp")`.

### Criar uma progressão nova
Se a classe precisar de uma tabela diferente, edite `tools/data/progressoes.mjs`
e adicione uma entrada em `TABELAS`. Cada nível é `[ba, jp, xp]` (15 níveis; o XP
do nível 1 é ignorado pelo schema):

```js
minha_tabela: [
  [1, 5, 0], [1, 5, 2000], /* … 15 entradas no total … */ [9, 13, 600000],
],
```
Depois use `progressao("minha_tabela")` na classe.

---

## 5. Passo a passo: adicionar uma classe

1. Abra `tools/data/classes.mjs`.
2. Copie o **template** abaixo e cole como novo objeto dentro da lista `classes`
   (antes do `];` final). Preencha os campos.

```js
{
  nome: "Nome da Classe",
  tabela: "guerreiro_esp",          // só rótulo; a progressão real é o `levels`
  dv: 10,
  high_level_hp_bonus: 2,           // opcional
  restricao_racas: [],              // ex.: ["Varko"] — opcional
  flavor: "<p>Uma frase de efeito.</p>",
  descricao: "<p>Descrição completa da classe em HTML.</p>",
  equipment_restrictions: {
    weapons: "Pode usar todas as armas.",
    armors: "Pode usar todas as armaduras.",
    magic_items: "Sem restrições.",
  },
  levels: progressao("guerreiro_esp"),
  habilidades: [
    { nome: "Habilidade 1", level: 1, desc: "<p>O que faz.</p>" },
    { nome: "Habilidade 2", level: 3, usos_dia: 1, desc: "<p>O que faz.</p>",
      level6: "<p>Como evolui no 6º nível.</p>" },
    { nome: "Reputação", level: 11, desc: "<p>Reputação 1 em 1d6, +1 por nível.</p>" },
  ],
},
```

3. Salve. Pronto — a parte de conteúdo acabou.

---

## 6. Gerar, testar e publicar

A partir da **raiz do repositório** (`ekhoria-foundryvtt/`):

### a) Gerar os compêndios
```bash
npm run build
```
Deve listar `✔ ekhoria-classes: N documentos → LevelDB` sem erros. Se aparecer
`Tabela de progressão desconhecida`, você errou o nome em `progressao(...)`.

### b) Testar localmente no Foundry (recomendado antes de publicar)
1. Feche o Foundry (pra não travar os arquivos dos compêndios).
2. Copie a pasta do módulo para os dados do Foundry:
   ```powershell
   $dest = "$env:LOCALAPPDATA\FoundryVTT\Data\modules\ekhoria"
   robocopy ".\ekhoria-module" $dest /MIR
   ```
3. Abra um mundo com o sistema **olddragon2e**, ative o módulo, abra o compêndio
   **Ekhoria: Classes** e confira a nova classe e suas habilidades. Arraste a
   classe para uma ficha e veja se os níveis/habilidades aparecem certos.

### c) Publicar uma nova versão
1. **Suba a versão** em dois arquivos (mesmo número), ex.: `0.6.5` → `0.6.6`:
   - `ekhoria-module/module.json` → campo `version`
   - `package.json` → campo `version`
   - E o campo `download` em `module.json`, trocando a versão no fim da URL:
     `…/releases/download/v0.6.6/ekhoria.zip`
2. Anote a mudança no topo do `CHANGELOG.md`.
3. **Gere o zip** (sempre com este script — **nunca** com `tar`):
   ```bash
   python tools/make-zip.py
   ```
4. Commit + push na `main`:
   ```bash
   git add -A
   git commit -m "Adiciona a classe Nome da Classe (v0.6.6)"
   git push origin main
   ```
5. **Crie o release** com os dois assets (a versão tem que bater com o `download`):
   ```bash
   gh release create v0.6.6 ekhoria.zip ekhoria-module/module.json \
     --target main --title "v0.6.6 — Nova classe" \
     --notes "Adiciona a classe Nome da Classe."
   ```

No Foundry, quem já tem o módulo verá a atualização disponível.

---

## 7. Erros comuns

- **Editei `packs-src/` ou os compêndios no Foundry e sumiu.** Eles são gerados.
  Edite só `tools/data/classes.mjs` e rode `npm run build`.
- **Gerei o zip com `tar` e o Foundry não instala (`FILE_ENDED`).** O `tar` do
  Windows cria um tar disfarçado de `.zip`. Use **sempre** `python tools/make-zip.py`.
- **A versão do release não bate com o `download`.** O `download` aponta para
  `…/v0.6.6/ekhoria.zip`; o release tem que ser `v0.6.6`, senão o link quebra.
- **Releases são imutáveis.** Errou um asset? Não dá pra trocar — suba uma nova
  versão (ex.: `0.6.7`).
- **Esqueci de rodar o build antes do zip.** O zip empacota `ekhoria-module/packs/`;
  se você não rodou `npm run build`, ele leva os compêndios antigos.

## 8. Checklist rápido
- [ ] Classe adicionada em `tools/data/classes.mjs`
- [ ] `npm run build` rodou sem erro
- [ ] (Opcional) Testada localmente no Foundry
- [ ] `version` subida em `module.json` **e** `package.json`; `download` atualizado
- [ ] `CHANGELOG.md` atualizado
- [ ] `python tools/make-zip.py` rodou
- [ ] commit + push na `main`
- [ ] `gh release create vX.Y.Z …` com `ekhoria.zip` e `module.json`
