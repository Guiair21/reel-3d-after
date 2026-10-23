"""Deixa transparentes as lentes (óculos e lupa) nos PNGs recortados: onde o objeto é quase branco e
sem cor, o alfa vira o quanto o pixel se afasta do branco (o reflexo e a rachadura ficam).
Nos óculos também tira a sombra separada (alfa fora do objeto = 0), porque eles voam.
Uso: python -I lentes_transparentes.py <pasta_img> <nome> [<nome> ...] [--tira-sombra <nome> ...]
     (nome = arquivo sem extensão: precisa de <nome>.png achatado e <nome>_rgba.png do recortar_brancos.py)
"""
import sys
import numpy as np
from PIL import Image
from rembg import remove, new_session

import argparse, os
ap = argparse.ArgumentParser(); ap.add_argument("pasta"); ap.add_argument("nomes", nargs="+"); ap.add_argument("--tira-sombra", nargs="*", default=[])
A = ap.parse_args()
pasta = A.pasta
ses = new_session("isnet-general-use")
for n in A.nomes + [x for x in A.tira_sombra if x not in A.nomes]:
    tira_sombra = n in A.tira_sombra
    if not (os.path.exists(f"{pasta}/{n}.png") and os.path.exists(f"{pasta}/{n}_rgba.png")):
        print(n, "pulado: falta", f"{n}.png ou {n}_rgba.png"); continue
    base = Image.open(f"{pasta}/{n}.png").convert("RGB")
    rgba = np.asarray(Image.open(f"{pasta}/{n}_rgba.png")).astype(np.float64)
    rgb = np.asarray(base).astype(np.float64)
    obj = np.asarray(remove(base, session=ses, only_mask=True)).astype(np.float64) / 255
    luz = rgb.mean(2) / 255
    sat = (rgb.max(2) - rgb.min(2)) / 255
    vidro = (luz > 0.86) & (sat < 0.06) & (obj > 0.5)
    a = rgba[..., 3] / 255
    a_vidro = np.clip((1 - luz) * 4.0, 0, 1) * 0.85 + 0.06
    a = np.where(vidro, np.minimum(a, a_vidro), a)
    if tira_sombra:
        a = np.where(obj > 0.5, a, 0)
    rgba[..., 3] = a * 255
    Image.fromarray(rgba.astype(np.uint8), "RGBA").save(f"{pasta}/{n}_rgba.png")
    print(n, "vidro", round(vidro.mean(), 3))
