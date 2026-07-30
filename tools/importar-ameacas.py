#!/usr/bin/env python3
"""Gera tools/data/ameacas.mjs a partir dos blocos ```od2-monstro``` da campanha.

A FONTE DE VERDADE é o cofre Obsidian: os arquivos de "A Guerra do Esmaecer"
trazem 74 blocos od2-monstro em YAML, com exatamente os campos que o
monsterDoc() do módulo consome. Este script transcreve — não inventa nada.

Mudou uma ficha na campanha? Rode este script e depois `npm run build`.
Não edite ameacas.mjs à mão: ele é gerado.

Uso: python tools/importar-ameacas.py
"""
import json
import os
import re
import subprocess
import unicodedata

import yaml

COFRE = os.path.join(
    os.path.expanduser("~"), "Documents", "Ekhoria", "10 Ekhoria",
    "Compendio", "Campanhas", "A Guerra do Esmaecer",
)
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SAIDA = os.path.join(RAIZ, "tools", "data", "ameacas.mjs")

# Quem já está no bestiário não é reimportado: a fonte de lá continua mandando.
#
# ATENÇÃO: lê a FONTE (tools/data/bestiario.mjs), não packs-src. packs-src é
# SAÍDA do build e passa a conter as próprias ameaças depois do primeiro build —
# ler dali tornava o dedup auto-referente e gerava um arquivo vazio na segunda
# execução, apagando as 70 fichas sem erro nenhum.
BESTIARIO_FONTE = os.path.join(RAIZ, "tools", "data", "bestiario.mjs")

# `tipo` na campanha é descritivo ("Humano (Inquisidor Lunar)"). O conceito
# escolhe a arte do OD2, então precisa cair numa das chaves que ele conhece.
CONCEITO = [
    (r"drag", "Dragão"),
    (r"morto-vivo|desmorto|tecid", "Morto-Vivo"),
    (r"construto|objeto", "Constructo"),
    (r"inset", "Inseto"),
    (r"animal|cao|cão", "Animal"),
    (r"aberra|concorde|monstro|fenda", "Humanoide Monstruoso"),
    (r"human|anao|anão|drow|orc|grimor|silente|breonian|halfling|elfo", "Humanoide"),
]

# Tabela 9.4 do OD2: XP base por DV + adicional por habilidade especial. Usada
# só quando a campanha não declara `xp` — 24 dos 70 blocos não declaravam.
XP_BASE = {0: 5, 1: 15, 2: 35, 3: 75, 4: 125, 5: 175, 6: 270, 7: 420, 8: 650, 9: 925}
XP_ADD = {0: 5, 1: 10, 2: 15, 3: 20, 4: 25, 5: 30, 6: 35, 7: 40, 8: 45, 9: 50}


def xp_od2(dv, n_hab):
    m = re.match(r"(\d+)", str(dv or ""))
    if not m:
        return None
    v = int(m.group(1))
    if v >= 10:
        return 1250 + 350 * (v - 10) + 75 * n_hab
    return XP_BASE[v] + XP_ADD[v] * n_hab


# O proprio nome declara quem e aliado: a campanha usa "(aliado)" e
# "(parceira)". Eles nao sao ameaca e ganham pasta propria.
def eh_aliado(d):
    return bool(re.search(r"\(alia|\(parceir", str(d.get("nome", "")), re.I))


# Arco vem da pasta do arquivo; o Interlúdio e a raiz têm nome próprio.
def arco(rel):
    p = rel.replace("\\", "/").split("/")[0]
    if p.lower().startswith("arco"):
        return p
    if p.lower().startswith("interl"):
        return "Interlúdio"
    return "Preparação"


def norm(s):
    s = unicodedata.normalize("NFD", str(s)).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]", "", s)


def conceito_de(tipo):
    t = norm(tipo)
    for padrao, nome in CONCEITO:
        if re.search(norm(padrao).replace("|", "|"), t) or re.search(padrao, str(tipo), re.I):
            return nome
    return "Besta"


def ja_no_bestiario():
    """Nomes dos monstros de bestiario.mjs, lidos importando o módulo.

    Regex no arquivo pegaria também nome de habilidade e de ataque; o import
    devolve a estrutura de verdade.
    """
    if not os.path.exists(BESTIARIO_FONTE):
        return set()
    script = (
        "import('./tools/data/bestiario.mjs').then(({grupos}) => "
        "console.log(JSON.stringify(grupos.flatMap(g => (g.monstros||[]).map(m => m.nome)))))"
    )
    saida = subprocess.run(["node", "-e", script], cwd=RAIZ,
                           capture_output=True, text=True, encoding="utf-8")
    if saida.returncode != 0:
        raise SystemExit("falha ao ler bestiario.mjs:" + chr(10) + saida.stderr)
    return {norm(n) for n in json.loads(saida.stdout.strip())}


def coletar():
    existentes = ja_no_bestiario()
    achados, vistos = [], set()
    for raiz, _, arquivos in os.walk(COFRE):
        for f in sorted(arquivos):
            if not f.endswith(".md"):
                continue
            caminho = os.path.join(raiz, f)
            texto = open(caminho, encoding="utf-8").read()
            for m in re.finditer(r"```od2-monstro\n([\s\S]*?)```", texto):
                d = yaml.safe_load(m.group(1))
                if not isinstance(d, dict) or "nome" not in d:
                    continue
                chave = norm(d["nome"])
                if chave in existentes or chave in vistos:
                    continue
                vistos.add(chave)
                d["_arco"] = arco(os.path.relpath(caminho, COFRE))
                if d.get("xp") is None:
                    d["xp"] = xp_od2(d.get("dv"), len(d.get("habilidades") or []))
                d["_aliado"] = eh_aliado(d)
                # PV textual ("22 por Portador"): parseInt pegaria 22 e daria 22
                # PV a um chefe DV 18. Sai do campo e vira nota, para o hp
                # derivar do DV e a regra continuar visível na ficha.
                pv = str(d.get("pv", "")).strip()
                if pv and not pv.isdigit():
                    d["descricao"] = (str(d.get("descricao", "")).rstrip()
                                      + f" **PV:** {pv}.").strip()
                    d.pop("pv", None)
                achados.append(d)
    return achados


def js(valor):
    return json.dumps(valor, ensure_ascii=False)


def monstro_js(d, ident="      "):
    linhas = [f"{ident}{{"]
    p = ident + "  "
    ordem = ["nome", "tipo", "tamanho", "alinhamento", "movimento", "dv", "pv",
             "ca", "jp", "moral", "xp", "descricao"]
    for campo in ordem:
        if campo not in d or d[campo] is None:
            continue
        v = d[campo]
        if campo == "movimento":
            # Verbatim: movement() já lê "9", "9 m", "9/12Vo" e "6 (voo 36)".
            # Antes daqui saía um " m" colado no fim, e "6 (voo 36) m" não casava
            # com regex nenhuma — a ficha ficava sem deslocamento.
            v = str(v)
        linhas.append(f"{p}{campo}: {js(str(v) if campo != 'xp' else v)},")
    linhas.append(f"{p}conceito: {js(conceito_de(d.get('tipo', '')))},")

    for a in d.get("ataques") or []:
        pass
    if d.get("ataques"):
        linhas.append(f"{p}ataques: [")
        for a in d["ataques"]:
            partes = ", ".join(
                f"{k}: {js(v) if isinstance(v, str) else v}"
                for k, v in a.items() if v is not None
            )
            linhas.append(f"{p}  {{ {partes} }},")
        linhas.append(f"{p}],")
    if d.get("habilidades"):
        linhas.append(f"{p}habilidades: [")
        for h in d["habilidades"]:
            linhas.append(f"{p}  {{")
            linhas.append(f"{p}    nome: {js(str(h.get('nome','')))},")
            linhas.append(f"{p}    desc: {js(str(h.get('desc','')))},")
            linhas.append(f"{p}  }},")
        linhas.append(f"{p}],")
    linhas.append(f"{ident}}},")
    return "\n".join(linhas)


def main():
    monstros = coletar()
    por_arco = {}
    for d in monstros:
        chave = "Aliados e Parceiros" if d["_aliado"] else d["_arco"]
        por_arco.setdefault(chave, []).append(d)

    cab = '''// Ameaças de "A Guerra do Esmaecer" — GERADO, não editar à mão.
//
// Transcrito dos blocos ```od2-monstro``` dos arquivos da campanha no cofre
// Obsidian, que já traziam ficha completa em YAML: dv, pv, ca, jp, moral,
// ataques e habilidades. A fonte de verdade é o cofre.
//
// Mudou uma ficha lá? Rode `python tools/importar-ameacas.py` e depois
// `npm run build`.
//
// Quem já estava no bestiário (Umbra Pávida, Fulgor da Irmandade Voraz) não é
// reimportado: a fonte de bestiario.mjs continua mandando neles.
//
// As pastas nascem do arco da campanha. Encontro e tesouro ficam vazios de
// propósito: quantos aparecem e o que carregam é a cena que decide, não uma
// tabela.

export const ameacas = [
'''
    corpo = []
    for nome_arco in sorted(por_arco, key=lambda x: (x != "Preparação", x)):
        lista = por_arco[nome_arco]
        rotulo = f"Ameaças da Campanha — {nome_arco}"
        corpo.append("  {" + chr(10) + "    folder: " + js(rotulo) + ",")
        corpo.append("    monstros: [")
        for d in sorted(lista, key=lambda x: str(x["nome"])):
            corpo.append(monstro_js(d))
        corpo.append("    ],")
        corpo.append("  },")
    with open(SAIDA, "w", encoding="utf-8", newline="\n") as f:
        f.write(cab + "\n".join(corpo) + "\n];\n")

    print(f"  {len(monstros)} ameaças em {len(por_arco)} arcos -> tools/data/ameacas.mjs")
    for a in sorted(por_arco):
        print(f"     {a:14} {len(por_arco[a])}")


if __name__ == "__main__":
    main()
