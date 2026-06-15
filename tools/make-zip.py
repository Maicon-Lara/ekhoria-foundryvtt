#!/usr/bin/env python3
"""Gera o ekhoria.zip de distribuição a partir de ekhoria-module/.

Usa zipfile (zip padrão, separadores '/', sem data descriptors) — compatível
com o extrator do Foundry (unzipper). NÃO usar `tar` do Windows: o bsdtar/GNU
tar ignora a extensão .zip e gera um tar disfarçado, que o Foundry rejeita
com FILE_ENDED.

Uso: python tools/make-zip.py   (a partir da raiz do repositório)
"""
import os
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "ekhoria-module")
OUT = os.path.join(ROOT, "ekhoria.zip")

# Conteúdo do módulo, com os arquivos na raiz do zip (layout que o Foundry espera).
ITEMS = ["ekhoria.js", "ekhoria.css", "module.json", "lang", "packs"]


def main():
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
