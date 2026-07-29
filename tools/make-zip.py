#!/usr/bin/env python3
"""Gera o ekhoria.zip de distribuição a partir de ekhoria-module/.

Usa zipfile (zip padrão, separadores '/', sem data descriptors) — compatível
com o extrator do Foundry (unzipper). NÃO usar `tar` do Windows: o bsdtar/GNU
tar ignora a extensão .zip e gera um tar disfarçado, que o Foundry rejeita
com FILE_ENDED.

Uso: python tools/make-zip.py   (a partir da raiz do repositório)
"""
import json
import os
import re
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "ekhoria-module")
OUT = os.path.join(ROOT, "ekhoria.zip")

# Conteúdo do módulo, com os arquivos na raiz do zip (layout que o Foundry espera).
ITEMS = ["ekhoria.js", "ekhoria.css", "module.json", "lang", "packs"]


REPO = "Maicon-Lara/ekhoria-foundryvtt"


def sincroniza_download():
    """Deriva o campo `download` a partir de `version`.

    Os dois campos precisam concordar, e nada obrigava isso: no v0.7.3 o
    download seguia apontando para o zip do v0.6.8. O Foundry lia o manifest
    novo, baixava o pacote velho e nao dava erro nenhum — versao nova na tela,
    conteudo velho na mesa.

    A versao passa a ser a fonte unica: o download e sempre
    releases/download/v{version}/ekhoria.zip.
    """
    caminho = os.path.join(SRC, "module.json")
    with open(caminho, encoding="utf-8") as f:
        bruto = f.read()
    versao = json.loads(bruto)["version"]
    esperado = f"https://github.com/{REPO}/releases/download/v{versao}/ekhoria.zip"

    atual = json.loads(bruto).get("download", "")
    if atual == esperado:
        return versao

    # Reescreve so o valor do campo, preservando a formatacao do arquivo.
    novo_texto = re.sub(
        r'("download"\s*:\s*)"[^"]*"',
        lambda m: m.group(1) + '"' + esperado + '"',
        bruto,
        count=1,
    )
    with open(caminho, "w", encoding="utf-8", newline="\n") as f:
        f.write(novo_texto)
    anterior = atual.split("/releases/")[-1] or "(vazio)"
    print(f"  download corrigido: {anterior} -> v{versao}/ekhoria.zip")
    return versao


def main():
    versao = sincroniza_download()
    print(f"  empacotando v{versao}")
    if os.path.exists(OUT):
        os.remove(OUT)
    with zipfile.ZipFile(OUT, "w", zipfile.ZIP_DEFLATED) as z:
        for item in ITEMS:
            path = os.path.join(SRC, item)
            if os.path.isfile(path):
                z.write(path, item)
            else:
                for dirpath, _, files in os.walk(path):
                    for f in files:
                        full = os.path.join(dirpath, f)
                        arc = os.path.relpath(full, SRC).replace(os.sep, "/")
                        z.write(full, arc)
    # Sanidade: precisa ser um zip válido.
    with zipfile.ZipFile(OUT) as z:
        assert z.testzip() is None, "zip corrompido"
        assert not any("\\" in n for n in z.namelist()), "separador inválido"
        print(f"  OK ekhoria.zip: {len(z.namelist())} entradas")


if __name__ == "__main__":
    main()
