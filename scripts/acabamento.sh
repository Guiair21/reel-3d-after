#!/bin/bash
# Acabamento do reel-3d-after: cor (sombras para vermelho-magenta, calibradas na referência Kaloyan), aberração cromática
# radial (vermelho 0,6% e verde 0,3% ampliados sobre o azul: a franja cresce para a borda, sem moldura) e grão fino.
# Uso: bash acabamento.sh <entrada (padrão ffmpeg, ex. out/seq/f_%05d.tif)> <saida.mp4> [audio: .m4a/.mp4/.wav]
#   SO_LENTE=1 bash acabamento.sh ...   -> sem colorbalance/curves (por cima de filmagem já com cor aprovada:
#                                          só aberração e grão).
#   Sem áudio: grava só o 1º quadro (teste de cor). Com áudio, use uma sequência de quadros: com 1 quadro só,
#   o -shortest descarta o áudio.
ENT="$1"; SAI="$2"; AUD="$3"
COR="colorbalance=rs=0.07:gs=-0.015:bs=0.025:rm=0:gm=0:bm=0:rh=0:gh=0:bh=0,
curves=all='0/0.035 0.5/0.5 1/1',"
[ "$SO_LENTE" = "1" ] && COR=""
FILTRO="format=gbrp,
$COR
split=3[a][b][c];
[a]extractplanes=g,scale=iw*1.003:ih*1.003,crop=1080:1920,setsar=1[g];
[b]extractplanes=b,setsar=1[bb];
[c]extractplanes=r,scale=iw*1.006:ih*1.006,crop=1080:1920,setsar=1[rr];
[g][bb][rr]mergeplanes=0x001020:gbrp,
noise=alls=5:allf=t,format=yuv420p"
if [ -n "$AUD" ]; then
  # áudio: copia se já for AAC; WAV/PCM vira AAC 192k (MP4 não aceita PCM). Volume não é mexido aqui
  # (mixe e normalize antes, por exemplo a -14 LUFS).
  CA="copy"; case "${AUD,,}" in *.wav|*.aif|*.aiff) CA="aac -b:a 192k";; esac
  ffmpeg -v error -y -framerate 30 -i "$ENT" -i "$AUD" -filter_complex "[0:v]$FILTRO[v]" -map "[v]" -map 1:a -c:v libx264 -crf 16 -preset slow -c:a $CA -shortest "$SAI"
else
  ffmpeg -v error -y -i "$ENT" -filter_complex "[0:v]$FILTRO[v]" -map "[v]" -frames:v 1 "$SAI"
fi
