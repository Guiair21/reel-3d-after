"""Recorta os objetos brancos (papel, coluna) com rembg e guarda a sombra como preto semitransparente.

Entrada: a imagem já achatada (fundo 255). Saída: PNG RGBA <nome>_rgba.png, para compor em modo normal
sobre #EFEFEF. Dentro do objeto: cor original, alfa 1. Fora: preto com alfa = 1 - luz (a sombra).
Uso: python -I recortar_brancos.py <pasta_achatada> papel coluna
"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
from rembg import remove, new_session

pasta, nomes = sys.argv[1], sys.argv[2:]
ses = new_session("isnet-general-use")
for n in nomes:
    im = Image.open(f"{pasta}/{n}.png").convert("RGB")
    m = remove(im, session=ses, only_mask=True).filter(ImageFilter.GaussianBlur(1.2))
    a = np.asarray(m).astype(np.float64) / 255.0
    rgb = np.asarray(im).astype(np.float64)
    luz = rgb.mean(2) / 255.0
    sombra = np.clip(1.0 - luz, 0, 1) * 1.15
    alfa = a + (1 - a) * np.clip(sombra, 0, 1)
    cor = rgb * a[..., None]  # fora do objeto a cor tende a preto (sombra)
    cor = np.where(alfa[..., None] > 0, cor / np.maximum(alfa[..., None], 1e-6), 0)
    out = np.dstack([np.clip(cor, 0, 255), alfa * 255]).astype(np.uint8)
    Image.fromarray(out, "RGBA").save(f"{pasta}/{n}_rgba.png")
    print(n, "objeto", round(a.mean(), 3))
