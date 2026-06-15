# Como criar uma nova raça no módulo Ekhoria (Foundry VTT)

Guia para adicionar uma raça ao compêndio **Ekhoria: Raças**. A pipeline é a
mesma das classes (veja [`criar-classe.md`](criar-classe.md)); o que muda são os
campos. Raças têm mais campos **mecânicos** (JP, ataque natural, etc.) que o
sistema realmente lê — então preencha-os corretamente.

> **Regra de ouro:** edite só `tools/data/racas.mjs`. Nunca edite `packs-src/`
> nem os compêndios no Foundry — `npm run build` sobrescreve tudo.

---

## 1. Pipeline (resumo)

```
tools/data/racas.mjs  →  npm run build  →  packs-src/ + ekhoria-module/packs/  →  make-zip.py → release
```

Cada raça vira **1 Item `race`** + **1 Item `race_ability` por habilidade**,
agrupados numa pasta com o nome da raça.

---

## 2. Anatomia de uma raça

Objeto na lista `racas` em `tools/data/racas.mjs`:

| Campo | Obrigatório | O quê |
|---|---|---|
| `nome` | ✅ | Nome da raça (vira o Item e a pasta). |
| `descricao` | ✅ | Descrição longa, em **HTML**. |
| `flavor` | recomendado | Frase curta, em HTML. |
| `movement` | recomendado | Deslocamento em **metros** (padrão `9`). |
| `movement_swim` | opcional | Natação, em metros (ex.: `12`). |
| `movement_fly` | opcional | Voo, em metros (padrão `0`). |
| `movement_notes` | opcional | Observação textual sobre deslocamento. |
| `infravision` | opcional | Alcance da infravisão em metros (ex.: `18`, `30`; `0` = não tem). |
| `infravision_notes` | opcional | Observação sobre infravisão. |
| `alignment_tendency` | opcional | Tendência: `"none"`, `"ordeiro"`, `"neutro"`, `"caotico"` (padrão `none`). |
| `alignment_notes` | opcional | Texto explicando a tendência. |
| `habilidades` | ✅ | Lista de habilidades (ver §3). |
| `img` | opcional | Ícone próprio. |

---

## 3. Anatomia de uma habilidade de raça

Cada item de `habilidades` vira um Item `race_ability`. **Ao contrário das
habilidades de classe**, aqui os campos mecânicos abaixo são lidos e aplicados
pelo sistema. Use só o que a habilidade precisar — todos têm padrão seguro.

| Campo | Tipo / valores | O quê |
|---|---|---|
| `nome` | texto | ✅ Nome da habilidade. |
| `desc` | HTML | ✅ Descrição. |
| `jp` | `{ jpc, jpd, jps }` (booleanos) | Bônus racial de +1 numa Jogada de Proteção: `jpc` (Constituição), `jpd` (Destreza), `jps` (Sabedoria). Ex.: `jp: { jpd: true }`. |
| `daily_uses` | número | Usos por dia (ex.: `1`). |
| `natural_armor` | número | CA natural/base (ex.: `14`). |
| `bonus_damage` | número | Bônus fixo de dano. |
| `bonus_damage_condition` | enum (ver abaixo) | Condição em que o bônus de dano se aplica. |
| `bonus_damage_condition_2` | enum | Segunda condição (opcional). |
| `rogue_talent` | enum (ver abaixo) | Talento de ladrão concedido. |
| `rogue_talent_2` | enum | Segundo talento (opcional). |
| `natural_weapon` | objeto (ver §3.1) | Ataque natural (garras, mordida…). |
| `variable_construction` | objeto (ver §3.2) | Escolhas de construção (estilo Autokthon). |
| `xp` | número | Custo/sobretaxa de XP da raça, se houver. |
| `load_modifier` / `max_load_override` / `armor_weight_modifier` | número | Ajustes de carga/peso de armadura. |
| `img` | texto | Ícone próprio. |

### Enums válidos
- **`bonus_damage_condition` / `_2`:** `none`, `weight_1` (arma pequena),
  `weight_2` (média), `weight_3` (grande), `melee`, `throwing`, `ranged`,
  `ammunition`, `bludgeoning`, `piercing`, `slashing`, `arrow`, `bolt`,
  `bolt_small`, `polearm`, `two_handed`, `versatile`, `magic_item`.
- **`rogue_talent` / `_2`:** `none`, `armadilha`, `arrombar`, `cultura`,
  `decifrar`, `disfarce`, `escalar`, `furtividade`, `percepcao`, `punga`,
  `rastrear`, `senso_de_perigo`, `veneno`.

> Use o **valor da esquerda** (a chave), não o rótulo traduzido.

### 3.1. Ataque natural (`natural_weapon`)
```js
natural_weapon: { damage: "1d6", damage_type: "slashing", weapon_size: "small" },
```
- `damage`: dado de dano (texto, ex.: `"1d6"`).
- `damage_type`: **em inglês** — `none`, `bludgeoning`, `piercing`, `slashing`.
  ⚠️ Aqui **não há tradução automática** (diferente das armas do Arsenal, que
  aceitam português). Escreva direto o termo em inglês.
- `weapon_size`: `none`, `small`, `medium`, `large`.

### 3.2. Construção variável (`variable_construction`)
Para raças com "monte seu corpo" (como o Autokthon). Permite N escolhas de uma lista:
```js
variable_construction: { choices_count: 2, available_options: MINHA_LISTA },
```
Onde `MINHA_LISTA` é um array de `{ key, name, description }`. Você pode reusar a
constante `CONSTRUCAO_VARIAVEL` já definida no topo de `racas.mjs`, ou criar a sua.

---

## 4. Passo a passo: adicionar uma raça

1. Abra `tools/data/racas.mjs`.
2. Cole o template abaixo na lista `racas` (antes do `];` final) e preencha:

```js
{
  nome: "Nome da Raça",
  flavor: "<p>Uma frase de efeito.</p>",
  descricao: "<p>Descrição completa em HTML.</p>",
  movement: 9,
  infravision: 18,                 // 0 se não tiver
  alignment_tendency: "neutro",    // none | ordeiro | neutro | caotico
  alignment_notes: "Tendem ao Neutro.",
  habilidades: [
    { nome: "Sentidos Aguçados", desc: "<p>+1 em testes de percepção.</p>",
      rogue_talent: "percepcao" },
    { nome: "Resiliente", desc: "<p>+1 em JP de Constituição.</p>",
      jp: { jpc: true } },
    { nome: "Garras", desc: "<p>Ataque natural com as garras.</p>",
      natural_weapon: { damage: "1d6", damage_type: "slashing", weapon_size: "small" } },
  ],
},
```

3. Salve. Conteúdo pronto.

> **Habilidade de raça avulsa** (avançado): se precisar de uma habilidade que não
> pertence a uma raça específica — por exemplo, um aprimoramento concedido por uma
> classe (como `Construção Variável (Custódio Solar)`) — adicione-a ao array
> `racaAbilitiesAvulsas`, no fim do arquivo, com um campo `folder` (nome da pasta).

---

## 5. Gerar, testar e publicar

Idêntico ao guia de classes. A partir da **raiz do repositório**:

```bash
npm run build                 # gera os compêndios (confira: ✔ ekhoria-racas)
python tools/make-zip.py      # gera o ekhoria.zip (NUNCA use tar)
```

Teste local (feche o Foundry antes):
```powershell
robocopy ".\ekhoria-module" "$env:LOCALAPPDATA\FoundryVTT\Data\modules\ekhoria" /MIR
```
Abra o compêndio **Ekhoria: Raças**, confira a raça e arraste-a para uma ficha:
veja se movimento, infravisão, JP e ataques naturais aparecem corretos.

Publicar (suba a versão em `module.json` + `package.json`, atualize o `download`
e o `CHANGELOG.md`):
```bash
git add -A && git commit -m "Adiciona a raça Nome da Raça (v0.6.6)" && git push origin main
gh release create v0.6.6 ekhoria.zip ekhoria-module/module.json \
  --target main --title "v0.6.6 — Nova raça" --notes "Adiciona a raça Nome da Raça."
```
(Detalhes e armadilhas do release: ver [`criar-classe.md`](criar-classe.md) §6–§7.)

---

## 6. Erros comuns (específicos de raça)
- **`damage_type` do ataque natural em português.** Em `natural_weapon` use o
  inglês (`slashing`/`piercing`/`bludgeoning`/`none`) — não há tradução aqui.
- **`alignment_tendency` inválido.** Só `none`/`ordeiro`/`neutro`/`caotico`.
- **`rogue_talent`/`bonus_damage_condition` com rótulo errado.** Use a *chave*
  do enum (§3), em minúsculas e com `_` (ex.: `senso_de_perigo`, `weight_1`).
- **Pôs campo mecânico de raça numa habilidade de classe.** `jp`, `natural_weapon`
  e `variable_construction` só funcionam em `race_ability` (não em `class_ability`).

## 7. Checklist
- [ ] Raça adicionada em `tools/data/racas.mjs`
- [ ] `npm run build` sem erro (`✔ ekhoria-racas`)
- [ ] (Opcional) Testada no Foundry
- [ ] `version` subida em `module.json` **e** `package.json`; `download` atualizado
- [ ] `CHANGELOG.md` atualizado
- [ ] `python tools/make-zip.py` rodou
- [ ] commit + push + `gh release create`
