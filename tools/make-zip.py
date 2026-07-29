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
# Pasta nova no módulo PRECISA entrar aqui: senão o arquivo existe no
# repositório e nunca chega ao servidor.
ITEMS = ["ekhoria.js", "ekhoria.css", "module.json", "lang", "packs", "assets"]


REPO = "Maicon-Lara/ekhoria-foundryvtt"
RAW = f"https://raw.githubusercontent.com/{REPO}/main"
MANIFEST = f"{RAW}/ekhoria-module/module.json"
DOWNLOAD = f"{RAW}/ekhoria.zip"


def confere_urls():
    """Garante que manifest e download apontam para o branch, nao para o release.

    O servidor onde o modulo roda nao consegue buscar anexo de release: a URL
    releases/latest/download atravessa tres hosts e termina em
    release-assets.githubusercontent.com, que da "fetch failed" la. raw
    funciona (o outro modulo atualiza por ele), entao a entrega vive no branch.

    Com o download apontando para um arquivo fixo, `version` e `download`
    deixam de ser dois campos que precisam concordar — some a classe de bug que
    fez o v0.7.3 servir o pacote do v0.6.8.
    """
    caminho = os.path.join(SRC, "module.json")
    with open(caminho, encoding="utf-8") as f:
        bruto = f.read()
    manifesto = json.loads(bruto)
    texto = bruto

    for campo, esperado in (("manifest", MANIFEST), ("download", DOWNLOAD)):
        if manifesto.get(campo) != esperado:
            print(f"  {campo} corrigido -> .../{esperado.split('/main/')[-1]}")
            texto = re.sub(
                r'("' + campo + r'"\s*:\s*)"[^"]*"',
                lambda m, e=esperado: m.group(1) + '"' + e + '"',
                texto,
                count=1,
            )
    if texto != bruto:
        with open(caminho, "w", encoding="utf-8", newline="\n") as f:
            f.write(texto)
    return manifesto["version"]


def main():
    versao = confere_urls()
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
