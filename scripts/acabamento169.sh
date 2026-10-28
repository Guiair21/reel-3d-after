#!/bin/bash
# Acabamento para vídeo HORIZONTAL 1920x1080 (o acabamento.sh é fixo em 1080x1920).
# Cor, aberração cromática e grão iguais ao da skill. Calibrar colorbalance pela medir_cor.py.
# Uso: bash acabamento169.sh <pasta da sequência TIF> <audio da cena> <saida.mp4>
SEQ="$1"; AUD="$2"; OUT="$3"
DURA=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$AUD")
FILTRO="format=gbrp,
colorbalance=rs=0.07:gs=-0.015:bs=0.025:rm=0:gm=0:bm=0:rh=0:gh=0:bh=0,
curves=all='0/0.035 0.5/0.5 1/1',
split=3[a][b][c];
[a]extractplanes=g,scale=iw*1.003:ih*1.003,crop=1920:1080,setsar=1[g];
[b]extractplanes=b,setsar=1[bb];
[c]extractplanes=r,scale=iw*1.006:ih*1.006,crop=1920:1080,setsar=1[rr];
[g][bb][rr]mergeplanes=0x001020:gbrp,
noise=alls=5:allf=t,tpad=stop_mode=clone:stop_duration=0.2,format=yuv420p"
ffmpeg -v error -y -framerate 30 -i "$SEQ/f_%05d.tif" -i "$AUD" -filter_complex "[0:v]$FILTRO[v]" -map "[v]" -map 1:a -c:v libx264 -crf 16 -preset slow -c:a aac -b:a 192k -t "$DURA" "$OUT"
