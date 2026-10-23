"""Mede a cor do fundo e das sombras (pixels escuros) de quadros da referência e da sua versão, para calibrar
o colorbalance do acabamento.sh pelo número e não no olho.
Uso: python -I medir_cor.py ref.mp4 [minha.mp4] [--tempos 1.5,5,9,13]
"""
import argparse, subprocess, tempfile, os
import numpy as np
from PIL import Image
ap = argparse.ArgumentParser(); ap.add_argument("videos", nargs="+"); ap.add_argument("--tempos", default="1.5,5,9,13,17")
a = ap.parse_args()
for v in a.videos:
    sombras, fundos = [], []
    for t in a.tempos.split(","):
        f = os.path.join(tempfile.gettempdir(), "medir_cor.png")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", t, "-i", v, "-frames:v", "1", f], check=True)
        im = np.asarray(Image.open(f).convert("RGB")).astype(int); lum = im.mean(2)
        if (lum < 90).any(): sombras.append(im[lum < 90].mean(0))
        fundos.append(np.median(im.reshape(-1, 3), 0))
    print(v, "| fundo RGB", np.median(fundos, 0).astype(int), "| sombras RGB", np.mean(sombras, 0).astype(int) if sombras else "-")
