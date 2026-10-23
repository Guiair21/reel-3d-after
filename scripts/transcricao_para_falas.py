"""Converte a transcrição com tempo por palavra (faster-whisper) no falas.json que o
script do After lê (função em(cena, "palavra")).

Entrada: o próprio vídeo/áudio (transcreve aqui com large-v3, CPU int8) OU um JSON já transcrito no formato
[{"w": "palavra", "s": 1.23, "e": 1.50}, ...]. Cenas: lista de cortes em segundos (início de cada plano/tela).
Grafia: passe --roteiro com o texto certo; quando o número de palavras bate, a grafia vem do roteiro (nome próprio e
palavras em inglês saem errados no Whisper; o tempo vale).
Saída: {"dur": D, "cenas": [{"ini", "dur", "voz", "texto", "palavras": [{"w","s","e"}]}]} com tempos relativos à cena.
Uso: python -I transcricao_para_falas.py voz.wav falas.json --cortes 0,5.1,8.1 [--roteiro roteiro.txt] [--json palavras.json]
"""
import argparse, json, subprocess

ap = argparse.ArgumentParser()
ap.add_argument("audio"); ap.add_argument("saida")
ap.add_argument("--cortes", default="0", help="início de cada cena em segundos, separado por vírgula")
ap.add_argument("--roteiro"); ap.add_argument("--json", help="palavras já transcritas")
a = ap.parse_args()

if a.json:
    pal = json.load(open(a.json, encoding="utf-8"))
else:
    from faster_whisper import WhisperModel
    m = WhisperModel("large-v3", device="cpu", compute_type="int8")
    seg, _ = m.transcribe(a.audio, language="pt", word_timestamps=True)
    pal = [dict(w=w.word.strip(), s=round(w.start, 3), e=round(w.end, 3)) for x in seg for w in x.words]
if a.roteiro:
    certas = open(a.roteiro, encoding="utf-8").read().split()
    if len(certas) == len(pal):
        for p, c in zip(pal, certas): p["w"] = c
    else:
        print(f"aviso: roteiro com {len(certas)} palavras e transcrição com {len(pal)}; grafia do Whisper mantida")

dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", a.audio]).decode())
cortes = [float(c) for c in a.cortes.split(",")] + [dur]
cenas = []
for i in range(len(cortes) - 1):
    c0, c1 = cortes[i], cortes[i + 1]
    ps = [dict(w=p["w"], s=round(p["s"] - c0, 3), e=round(p["e"] - c0, 3)) for p in pal if c0 <= p["s"] < c1]
    voz = (ps[-1]["e"] if ps else 0)
    cenas.append(dict(ini=round(c0, 3), dur=round(c1 - c0, 3), voz=round(voz, 3), texto=" ".join(p["w"] for p in ps), palavras=ps))
json.dump(dict(dur=round(dur, 3), cenas=cenas), open(a.saida, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"{len(cenas)} cenas, {len(pal)} palavras -> {a.saida}")
