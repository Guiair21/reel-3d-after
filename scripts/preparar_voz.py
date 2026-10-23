"""Prepara a narração (voz gerada em tomadas soltas) e grava o falas.json que o script do After lê.

Para cada fala: corta o silêncio das pontas, acelera (padrão 1,12x), mede as palavras com o Whisper large-v3
(CPU int8) e grava <saida_voz>/NN.wav. Saída: falas.json com início, duração e palavras de cada cena.
Arquivo de falas (texto, UTF-8): uma linha por cena, "tomada|texto certo da fala" (tomada = nome do .wav sem extensão
dentro de --vozes). A grafia vem do texto; o tempo, do Whisper.
Uso: python -I preparar_voz.py --vozes trabalho/voz --falas falas.txt --saida-voz remotion/public/voz --json falas.json
     [--gap 0.25] [--fim 1.8] [--tempo 1.12]
"""
import argparse, json, os, re, subprocess

ap = argparse.ArgumentParser()
ap.add_argument("--vozes", required=True, help="pasta com as tomadas .wav")
ap.add_argument("--falas", required=True, help="arquivo 'tomada|texto' por linha, na ordem das cenas")
ap.add_argument("--saida-voz", required=True, help="pasta onde grava NN.wav cortado e acelerado")
ap.add_argument("--json", required=True, help="caminho do falas.json")
ap.add_argument("--gap", type=float, default=0.25, help="respiro entre falas (s)")
ap.add_argument("--fim", type=float, default=1.8, help="quanto segura a última tela (s)")
ap.add_argument("--tempo", type=float, default=1.12, help="aceleração da voz")
A = ap.parse_args()
VOZ, PUB, GAP, FIM = A.vozes, A.saida_voz, A.gap, A.fim
FALAS = [tuple(l.rstrip("\r\n").split("|", 1)) for l in open(A.falas, encoding="utf-8") if "|" in l]


def dur(a):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", a]).decode())


def som(arq):
    """Início e fim do trecho com voz (silencedetect a -40 dB)."""
    err = subprocess.run(["ffmpeg", "-i", arq, "-af", "silencedetect=n=-40dB:d=0.15", "-f", "null", "-"],
                         capture_output=True, text=True).stderr
    d = dur(arq)
    ini, fim = 0.0, d
    ss = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    se = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    if ss and ss[0] < 0.05 and se:
        ini = se[0]
    if ss and ss[-1] > ini and (not se or se[-1] < ss[-1] or abs(se[-1] - d) < 0.05):
        fim = ss[-1]
    return max(0, ini - 0.04), min(d, fim + 0.1)


def main():
    from faster_whisper import WhisperModel
    m = WhisperModel("large-v3", device="cpu", compute_type="int8")
    os.makedirs(PUB, exist_ok=True)
    t, cenas = 0.0, []
    for n, (tk, txt) in enumerate(FALAS):
        a, b = som(f"{VOZ}/{tk}.wav")
        saida = f"{PUB}/{n:02d}.wav"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{a:.3f}", "-to", f"{b:.3f}", "-i", f"{VOZ}/{tk}.wav",
                        "-af", f"atempo={A.tempo},afade=t=in:d=0.02", "-ar", "48000", "-ac", "1", saida], check=True)
        d = dur(saida)
        seg, _ = m.transcribe(saida, language="pt", word_timestamps=True)
        ws = [dict(s=round(w.start, 3), e=round(w.end, 3), w=w.word.strip()) for x in seg for w in x.words]
        certas = txt.split()
        if len(ws) == len(certas):
            pal = [dict(w=c, s=w["s"], e=w["e"]) for c, w in zip(certas, ws)]
            modo = "whisper"
        else:  # distribui o trecho falado pelo tamanho de cada palavra
            s0 = ws[0]["s"] if ws else 0.0
            s1 = ws[-1]["e"] if ws else d
            tot = sum(len(c) + 2 for c in certas)
            pal, acc = [], s0
            for c in certas:
                fat = (len(c) + 2) / tot * (s1 - s0)
                pal.append(dict(w=c, s=round(acc, 3), e=round(acc + fat, 3)))
                acc += fat
            modo = f"proporcional ({len(ws)} x {len(certas)}: {' '.join(w['w'] for w in ws)})"
        ext = FIM if n == len(FALAS) - 1 else GAP
        cenas.append(dict(ini=round(t, 3), dur=round(d + ext, 3), voz=round(d, 3), texto=txt, palavras=pal))
        print(f"{n} {d:.2f}s {modo}  {txt}")
        t += d + ext
    json.dump(dict(dur=round(t, 3), cenas=cenas), open(A.json, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"total {t:.2f}s")


if __name__ == "__main__":
    main()
