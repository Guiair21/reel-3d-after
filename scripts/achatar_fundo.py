"""Deixa o fundo das imagens geradas branco e chapado (passo antes do recorte com rembg; serve para qualquer cor de fundo).

Ajusta um polinômio de 2º grau ao fundo (pixels da borda, sem o objeto) e divide a imagem por ele:
o fundo vira 255, a sombra e o objeto mantêm a proporção de luz.
Uso: python -I achatar_fundo.py <pasta_entrada> <pasta_saida>
"""
import sys, glob, os
import numpy as np
from PIL import Image

ent, sai = sys.argv[1], sys.argv[2]
os.makedirs(sai, exist_ok=True)
for f in sorted(glob.glob(f"{ent}/*.png")):
    a = np.asarray(Image.open(f).convert("RGB")).astype(np.float64)
    h, w, _ = a.shape
    y, x = np.mgrid[0:h, 0:w]
    xn, yn = x / w - 0.5, y / h - 0.5
    lum = a.mean(2)
    b = int(min(h, w) * 0.07)
    borda = np.zeros((h, w), bool)
    borda[:b], borda[-b:], borda[:, :b], borda[:, -b:] = True, True, True, True
    med = np.median(lum[borda])
    m = borda & (np.abs(lum - med) < 12)
    A = np.stack([np.ones_like(xn), xn, yn, xn * xn, yn * yn, xn * yn], -1)
    coef, *_ = np.linalg.lstsq(A[m], lum[m], rcond=None)
    fundo = A @ coef
    out = np.clip(a / fundo[..., None] * 255.0 + 2, 0, 255)
    out[out > 250] = 255  # o ruído do fundo some de vez no multiplicar
    Image.fromarray(out.astype(np.uint8)).save(f"{sai}/{os.path.basename(f)}")
    print(os.path.basename(f), f"fundo~{med:.0f}", f"pixels de borda {m.sum()}")
