#!/bin/bash
# Renderiza quadros soltos de um .aep e monta uma folha de conferência (out/q/folha.jpg).
# Uso: bash quadros.sh <pasta_do_projeto> <arquivo.aep> "<nome da comp>" 20 100 140 ...
# Variáveis opcionais: AERENDER (caminho do aerender.exe em formato POSIX), RS_TEMPLATE e OM_TEMPLATE
# (templates no idioma do seu After; padrão pt-BR. Em inglês: "Best Settings" e "TIFF Sequence with Alpha").
PROJ="$1"; AEP="$2"; COMP="$3"; shift 3
AER="${AERENDER:-/c/Program Files/Adobe/Adobe After Effects 2026/Support Files/aerender.exe}"
RS="${RS_TEMPLATE:-Melhores configurações}"; OM="${OM_TEMPLATE:-Sequência TIFF com alfa}"
cd "$PROJ" || exit 1
rm -rf out/q; mkdir -p out/q
WP=$(cygpath -w "$PROJ")
SEP='\'
AEPW="${WP}${SEP}${AEP}"          # montado com SEP: um "\" antes de "$AEP" escaparia o cifrão
SAIDA="${WP}${SEP}out${SEP}q${SEP}f_[#####].tif"
for f in "$@"; do
  timeout 300 "$AER" -project "$AEPW" -comp "$COMP" -RStemplate "$RS" -OMtemplate "$OM" \
    -output "$SAIDA" -s "$f" -e "$f" > /dev/null 2>&1
done
python -I -c "
from PIL import Image; import glob, sys
fs=sorted(glob.glob('out/q/f_*.tif'))
if not fs: sys.exit('nenhum quadro renderizado: confira se o After ficou aberto (Stop-Process) e o nome da comp')
ims=[Image.open(f).convert('RGB').resize((270,480)) for f in fs]
n=min(8,len(ims)); rows=(len(ims)+n-1)//n
s=Image.new('RGB',(270*n,480*rows),'black')
for i,im in enumerate(ims): s.paste(im,((i%n)*270,(i//n)*480))
s.save('out/q/folha.jpg'); print(len(ims),'quadros -> out/q/folha.jpg')"
