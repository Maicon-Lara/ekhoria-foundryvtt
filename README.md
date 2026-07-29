# Ekhoria — Sourcebook Oficial

Módulo de conteúdo do cenário de RPG **Ekhoria** para o [Foundry VTT](https://foundryvtt.com/),
sobre o sistema [Old Dragon 2e](https://github.com/olddragoneditora/olddragon2e-foundryvtt).

Adiciona, como compêndios nativos do sistema, as **classes** e **raças** exclusivas do
cenário, além de um **journal de referência do mestre**.

- 🛡️ **8 classes**: Custódio Solar, Relicário Vivo, Narcoguerreiro, Pugilista,
  Lito-arcanista, Guardião da Centelha, Diplomata e Voraz.
- 🧬 **9 raças**: Arkanim, Atlante, Autokthon, Cambion, Mantes, Nefilim,
  Orc do Sol Poente, Silente e Varko.
- 📖 **Referência do Mestre**: tabelas de habilidades, combinações de classe/raça,
  substâncias e itens do cenário.

As classes e raças usam os **tipos nativos** do Old Dragon 2e (`class`, `class_ability`,
`race`, `race_ability`): aparecem corretamente, são arrastáveis para a ficha e trazem os
dados mecânicos (Dado de Vida, progressão de BA/JP/XP, movimento, infravisão, restrições,
bônus de Jogada de Proteção, etc.).

## Compatibilidade

| Requisito | Versão |
|-----------|--------|
| Foundry VTT | v13+ |
| Sistema Old Dragon 2e | v2.0.0+ (verificado em v2.4.0) |

## Instalação

### Pela URL de manifesto (recomendado)

1. Na tela inicial do Foundry (**Setup/Configuração**), abra **Add-on Modules / Módulos Complementares**.
2. Clique em **Install Module / Instalar Módulo**.
3. No campo **Manifest URL**, cole:

   ```
   https://raw.githubusercontent.com/Maicon-Lara/ekhoria-foundryvtt/main/ekhoria-module/module.json
   ```

4. Clique em **Install**.
5. Abra um mundo que use o sistema **Old Dragon 2e**, vá em **Configurações do Jogo →
   Gerenciar Módulos**, marque **Ekhoria — Sourcebook Oficial** e salve.
6. Os compêndios aparecem na aba **Compêndios**, dentro da pasta **Ekhoria**.

> Instalar módulos exige acesso à tela de **Setup** (nível administrador do servidor).

### Instalação manual

Copie a pasta `ekhoria-module/` (ou o conteúdo de `ekhoria.zip`) para o diretório
`Data/modules/ekhoria/` da instalação do Foundry e reinicie o servidor.

## Para desenvolvedores

O conteúdo é definido em arquivos de dados legíveis e compilado para os bancos
**LevelDB** que o Foundry v13 usa.

```
tools/data/        # Conteúdo editável (classes, raças, journal, progressões)
tools/lib.mjs      # Construtores dos documentos (formato do foundryvtt-cli)
tools/build.mjs    # Gera packs-src/ e compila para ekhoria-module/packs/
packs-src/         # Fontes JSON versionadas (uma por documento)
ekhoria-module/    # O módulo em si (module.json, scripts, packs LevelDB)
```

Para regenerar os compêndios após editar `tools/data/`:

```bash
npm install        # instala o @foundryvtt/foundryvtt-cli (uma vez)
npm run build      # gera packs-src/ e compila os packs LevelDB
npm run extract    # (opcional) extrai os packs de volta para _verify/ e confere
```

Os IDs dos documentos são **determinísticos** (derivados do nome), de modo que as
referências por UUID entre raça/classe e suas habilidades permanecem estáveis entre builds.

> 📘 **Adicionar conteúdo novo:** passo a passo completo (conteúdo → build → zip →
> release) para [classes](docs/criar-classe.md) e [raças](docs/criar-raca.md).

> **Observação:** Atlante, Autokthon, Cambion, Mantes, Nefilim e Varko também existem no
> módulo oficial **Guia de Raças** (`olddragon2e-racas`). As versões deste módulo são as
> adaptações do cenário Ekhoria e são auto-contidas (não dependem do Guia de Raças).

## Licença e créditos

Conteúdo do cenário Ekhoria por **Maicon Lara**. Compatível com o sistema Old Dragon 2e
da Old Dragon Editora. Old Dragon é marca de seus respectivos detentores.

## Aparencia

O modulo repinta as fichas do OD2 com a paleta do cenario (prata-azulada de
Arcanita, dourado da Centelha Solar no que esta selecionado), mas so quando a
opcao **Tema Ekhoria nas fichas** esta ligada — `ekhoria.js` poe a classe
`ekhoria-tema` no `<body>`. Todas as cores vivem no bloco `:root` de
`ekhoria.css`: para mudar o tema, edite so ali.

As capas dos compendios sao geradas:

```sh
node tools/make-banners.mjs
```

> `tools/make-zip.py` tem a lista `ITEMS` do que vai no pacote. **Pasta nova no
> modulo precisa ser adicionada la** — senao o arquivo existe no repositorio e
> nunca chega ao servidor.

## Publicar uma versao

```sh
git tag v0.7.4
git push origin v0.7.4
```

> ⚠️ **A entrega vive no branch, não no release.** O servidor onde o módulo roda
> não alcança `release-assets.githubusercontent.com` — a URL
> `releases/latest/download` atravessa três hosts e termina lá, dando
> `fetch failed` no Foundry. `raw` funciona. Os releases continuam sendo criados
> por tag, mas como **arquivo histórico**: quem publica é o push na `main`.
>
> Consequência: dê alguns minutos após o push, porque o `raw` tem cache de CDN.

A **tag e a fonte unica da versao**. O workflow `.github/workflows/release.yml`
grava a versao no `module.json`, roda `tools/make-zip.py` e cria o release com
`ekhoria.zip` e `module.json` anexados. A URL de instalacao nao muda:

```
https://raw.githubusercontent.com/Maicon-Lara/ekhoria-foundryvtt/main/ekhoria-module/module.json
```

> **Nao edite `download` na mao.** `make-zip.py` o deriva de `version`
> (`releases/download/v{version}/ekhoria.zip`). Os dois campos precisam
> concordar e nada obrigava isso: no v0.7.3 o download seguia apontando para o
> zip do v0.6.8 — o Foundry lia o manifest novo, baixava o pacote velho e nao
> dava erro nenhum.

