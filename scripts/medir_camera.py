"""Mede o movimento de câmera de um vídeo por fluxo óptico e compara com a referência.

Imprime, por vídeo: zoom mediano (% de escala por quadro), deslize lateral mediano e p90 (px/quadro em 270 px
de largura), velocidade mediana, % do tempo parado, tranco médio (2ª diferença da velocidade) e pico (p95).
Ignora o fundo liso (só mede onde há textura) e os quadros de corte informados.
Uso: python -I medir_camera.py ref.mp4 [minha.mp4 ...] [--ate 18] [--cortes-ref 4.5,6.6] [--cortes 5.06,8.09]
     python -I medir_camera.py ref.mp4 --curva 0 4.5     (curva quadro a quadro de um trecho)
"""
import sys, argparse
import cv2, numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("videos", nargs="+")
ap.add_argument("--ate", type=float, default=None)
ap.add_argument("--fundo", type=int, default=239, help="cinza do fundo liso (0-255)")
ap.add_argument("--cortes-ref", default="")
ap.add_argument("--cortes", default="")
ap.add_argument("--curva", nargs=2, type=float, default=None)
a = ap.parse_args()


def fluxo(arq, ini, fim):
    cap = cv2.VideoCapture(arq); fps = cap.get(5) or 30; cap.set(cv2.CAP_PROP_POS_MSEC, ini * 1000)
    ok, f0 = cap.read(); g0 = cv2.cvtColor(cv2.resize(f0, (270, 480)), cv2.COLOR_BGR2GRAY); t = ini; R = []
    while fim is None or t < fim:
        ok, f1 = cap.read(); t += 1 / fps
        if not ok: break
        g1 = cv2.cvtColor(cv2.resize(f1, (270, 480)), cv2.COLOR_BGR2GRAY)
        fl = cv2.calcOpticalFlowFarneback(g0, g1, None, 0.5, 3, 21, 3, 5, 1.1, 0)
        h, w = g0.shape; y, x = np.mgrid[0:h, 0:w]; xc, yc = x - w / 2, y - h / 2
        m = (np.abs(g0.astype(int) - a.fundo) > 8) | (np.abs(g1.astype(int) - a.fundo) > 8)
        if m.sum() > 200:
            dx, dy = fl[..., 0][m], fl[..., 1][m]; r = np.sqrt(xc[m] ** 2 + yc[m] ** 2) + 1e-6
            R.append((t, float(np.median((dx * xc[m] + dy * yc[m]) / r ** 2) * 100), float(np.median(dx)), float(np.median(dy))))
        else:
            R.append((t, 0.0, 0.0, 0.0))
        g0 = g1
    return R


if a.curva:
    for t, z, dx, dy in fluxo(a.videos[0], a.curva[0], a.curva[1]):
        print(f"{t:6.2f}  zoom {z:+.3f}%/q  dx {dx:+.2f}  dy {dy:+.2f}")
    sys.exit()

for i, v in enumerate(a.videos):
    R = fluxo(v, 0, a.ate)
    cortes = [float(c) for c in (a.cortes_ref if i == 0 else a.cortes).split(",") if c]
    R = [r for r in R if all(abs(r[0] - c) > 0.12 for c in cortes)]
    z = np.abs([r[1] for r in R]); dx = np.abs([r[2] for r in R]); vel = np.array([np.hypot(r[2], r[3]) for r in R])
    print(f"{'REF ' if i == 0 else ''}{v}\n  zoom mediano {np.median(z):.3f}%/q | lateral mediano {np.median(dx):.2f} p90 {np.percentile(dx, 90):.2f} px/q"
          f" | velocidade mediana {np.median(vel):.2f} | parado {(vel < 0.15).mean() * 100:.0f}% | tranco {np.mean(np.abs(np.diff(vel, 2))):.3f} | pico p95 {np.percentile(vel, 95):.2f}")
