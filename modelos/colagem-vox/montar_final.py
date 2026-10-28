"""Junta as 10 cenas e mixa a narração com a trilha (cama 18 dB abaixo da voz).

Saídas em final/:
  final.mp4   1920x1080, voz -14 LUFS, trilha -32 LUFS
  final-480p.mp4 versão leve
"""
import json, subprocess, os
import numpy as np, soundfile as sf, pyloudnorm as pyln

P = os.path.dirname(os.path.abspath(__file__))
A = os.path.join(P, "after"); F = os.path.join(P, "final"); os.makedirs(F, exist_ok=True)
cenas = [os.path.join(A, f"cena{i:02d}.mp4") for i in range(1, 11)]
for c in cenas:
    assert os.path.exists(c), "falta " + c

def ff(*a): subprocess.run(["ffmpeg", "-v", "error", "-y", *a], check=True)

# 1) vídeo: concatenar recodificando (nunca -c copy), preso a 30 qps
ins = sum([["-i", c] for c in cenas], [])
fc = "".join(f"[{i}:v]fps=30,setpts=N/30/TB[v{i}];" for i in range(10)) + "".join(f"[v{i}]" for i in range(10)) + "concat=n=10:v=1:a=0,tpad=start_mode=clone:start_duration=0.8:stop_mode=clone:stop_duration=3[v]"
ff(*ins, "-filter_complex", fc, "-map", "[v]", "-c:v", "libx264", "-crf", "16", "-preset", "medium", "-pix_fmt", "yuv420p", os.path.join(F, "video.mp4"))

# 2) voz: a mesma concatenação das cenas, pelo áudio de cada mp4
fa = "".join(f"[{i}:a]" for i in range(10)) + "concat=n=10:v=0:a=1,aresample=48000[a]"
ff(*ins, "-filter_complex", fa, "-map", "[a]", "-ac", "2", os.path.join(F, "voz-cenas.wav"))
v, sr = sf.read(os.path.join(F, "voz-cenas.wav")); meter = pyln.Meter(sr)

# loudnorm de duas passadas na voz (-14 LUFS, pico -1,5)
j = subprocess.run(["ffmpeg", "-hide_banner", "-i", os.path.join(F, "voz-cenas.wav"), "-af",
                    "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json", "-f", "null", "-"],
                   capture_output=True, text=True).stderr
m = json.loads(j[j.rindex("{"):j.rindex("}") + 1])
ff("-i", os.path.join(F, "voz-cenas.wav"), "-af",
   f"loudnorm=I=-14:TP=-1.5:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:linear=true,aresample=48000",
   os.path.join(F, "voz-norm.wav"))
v, _ = sf.read(os.path.join(F, "voz-norm.wav"))
PRE, POS = 0.8, 3.0   # música entra antes da voz e fica depois da última fala
v = np.concatenate([np.zeros((int(PRE * sr), 2)), v, np.zeros((int(POS * sr), 2))])

# 3) trilha: cama constante -32 LUFS, entra 0,8 s antes da voz e sai 3 s depois do fim
mu, _ = sf.read(os.path.join(P, "trilha", "musica48.wav"))
n = len(v); mu = mu[:n]
mu = mu * 10 ** ((-32 - meter.integrated_loudness(mu)) / 20)
fi, fo = int(0.8 * sr), int(3.0 * sr)
mu[:fi] *= np.linspace(0, 1, fi)[:, None]; mu[-fo:] *= np.linspace(1, 0, fo)[:, None]
mix = v + mu
pk = np.abs(mix).max()
if pk > 0.89: mix *= 0.89 / pk
sf.write(os.path.join(F, "mix.wav"), mix, sr)
print("voz", round(meter.integrated_loudness(v), 1), "trilha", round(meter.integrated_loudness(mu), 1),
      "mix", round(meter.integrated_loudness(mix), 1), "pico dBFS", round(20 * np.log10(np.abs(mix).max()), 1))

# 4) final + versão leve
out = os.path.join(F, "final.mp4")
ff("-i", os.path.join(F, "video.mp4"), "-i", os.path.join(F, "mix.wav"), "-map", "0:v", "-map", "1:a",
   "-c:v", "copy", "-c:a", "aac", "-b:a", "256k", "-shortest", "-movflags", "+faststart", out)
ff("-i", out, "-vf", "scale=854:-2", "-c:v", "libx264", "-crf", "28", "-c:a", "aac", "-b:a", "96k",
   os.path.join(F, "final-480p.mp4"))
for f in ("video.mp4", "voz-cenas.wav", "voz-norm.wav", "mix.wav"):
    os.remove(os.path.join(F, f))
print("ok", out)
