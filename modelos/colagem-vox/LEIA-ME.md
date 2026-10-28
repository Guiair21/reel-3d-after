# Modelo: colagem documental estilo Vox, horizontal 16:9 (vídeo longo de YouTube)

Testado num tutorial de 10 cenas (1min50s) montado por script no After Effects 26.5.

## O visual
- Cartão de papel bege (RGB 218,206,184) com manchas, sobre o mesmo papel mais escuro e desfocado (moldura dentro de moldura). Sombra RGB 53,47,40.
- Círculo chapado na cor de destaque atrás do assunto (no exemplo, vinho `#7d0001`; a referência usava laranja). Um único detalhe colorido por recorte (`tingeParte`), o resto P&B.
- Recortes PNG transparentes em P&B com retícula, gerados por IA de imagem já com fundo transparente (prompt começando por "FUNDO TRANSPARENTE, canal alfa"). Personagens-metáfora explicam a parte técnica (carteiro = baixar, orelha com lápis = transcrever).
- Mão de verdade entrando pela borda: gere o **braço inteiro**, cortado na borda. Mão curta + retângulo de manga desenhado fica feio.
- Régua embaixo ("TESTE 01 · ASSUNTO") com pino andando = numeração da série.
- Rótulos manuscritos em Instrument Serif itálico, título em Anton, texto em Inter.
- Profundidade, DOF com foco puxando conforme a palavra, sombra por recorte, luz 2D, 3D e **bastante movimento**: câmera viva o tempo todo e nada parado. A referência medida ficava parada 93% do tempo; o resultado aprovado se mexe o tempo todo.

## Régua: movimento e desfoque aprovados
`camera3d` do `base.jsx` (um movimento sobreposto por palavra-gatilho, mais deriva contínua; abertura **380** no Classic 3D; foco puxando entre os planos conforme a fala), `fantasma` (recortes desfocados em parallax passando na frente/atrás), `particulas` (bokeh) e motion blur 180°/16 amostras.

## Arquivos
| Arquivo | O que é |
|---|---|
| `base.jsx` | funções da colagem sobre a `ae_3d_lib.jsx`: `baseCena`, `papel`, `circulo`, `sombra`, `tingeParte`, `fantasma`, `particulas`, `rotulo`, `selo` (com confete), `bilhete`, `camera3d`, `luz2d`, `hud` (régua), `finalizar` |
| `base2.jsx` | auxiliares 2D: `vagaRet`, `ret2d`, `bola2d`, `texto2d`, `ligaEm` |
| `cena05.jsx` | cena completa de exemplo (dois personagens + mão + setas + selo) |
| `cena02.jsx` | exemplo de virada dramática (folha amassa, fundo escurece, bilhete "erro") |
| `montar_final.py` | junta as cenas (recodificando, `fps=30,setpts`), voz em loudnorm -14 LUFS em duas passadas, trilha cama -32 LUFS com 0,8 s antes da voz e 3 s depois (tpad clone no vídeo), versão 480p |
| `../../scripts/acabamento169.sh` | acabamento 1920x1080 (o `acabamento.sh` é 9:16) |

**Estrutura de pastas que os scripts esperam** (dentro de `P`): `imagens/<nome>.png` (o `img()` aceita um prefixo opcional: defina `var PREFIXO_IMG = "2026-10-27-";` antes do include se seus arquivos tiverem data no nome), `audio/cenas/cNN.mp3`, `after/falas-cNN.json` (formato `{dur, cenas:[{ini, dur, palavras:[{w,s,e}]}]}`, o mesmo do `scripts/preparar_voz.py`, lido pela função `em(cena, "palavra")`), `after/cenaNN.mp4` (10 cenas) e `trilha/musica48.wav` para o `montar_final.py` (ajuste a lista de cenas e o caminho da trilha no topo dele).

Troque `P` no topo das cenas e copie `ae_3d_lib.jsx` e `base.jsx` para a pasta do projeto (os `//@include` são relativos).

## Fluxo
1. Roteiro aprovado → narração por cena (`cNN.mp3` + `duracoes.json`); a cena dura exatamente o áudio.
2. Tempo por palavra de todas as cenas de uma vez (`falas-cNN.json`, faster_whisper large-v3).
3. `plano-cenas.md`: tabela cena | palavra-gatilho → ação | imagens. É o que o agente segue.
4. **Uma cena de teste** aprovada antes das outras.
5. Resto em **levas de 3 cenas por agente** (uma leva consumiu ~250-310 mil tokens; 9 cenas num agente só não cabem). O After é instância única: levas em fila, cada uma com nome próprio na trava.
6. Revisar a folha de quadros de cada leva antes da próxima. Juntar com `montar_final.py`. Auditoria.

## O que a revisão pegou (conferir em toda cena)
- Rótulo perto da borda sai cortado quando a câmera desliza: manter texto até ~90% da largura.
- Rótulo escondido atrás de objeto que entra depois (mão, cronômetro).
- Anotação de bastidor do plano virando texto na tela. Só vira texto o que está entre aspas no plano.
- Cor que veio no PNG gerado (pinos dourados de um processador): dessaturar.
- Tela real de terminal dentro de monitor (corner pin) fica pequena: é decoração, o texto não precisa ser legível.

## Gravar a tela real do terminal (Windows)
- `gdigrab` grava **preto** em janela desenhada pela GPU (Windows Terminal). Use `ddagrab` (Desktop Duplication): `-f lavfi -i ddagrab=output_idx=0:framerate=30:offset_x=X:offset_y=Y:video_size=WxH -vf hwdownload,format=bgra`.
- Largura/altura ímpar quebra o libx264: arredonde para par.
- `wt.exe` abre aba dentro de uma janela do Terminal já aberta (o título não bate); `conhost` chamado do bash se prende ao shell. Abra com `Start-Process conhost.exe` no PowerShell, ache a janela pelo título, chame `SetProcessDPIAware` antes do `GetWindowRect` e pare o ffmpeg mandando "q" no stdin.
- O Windows não deixa o script trazer a janela para a frente: os primeiros segundos podem gravar outra janela. Recorte o trecho bom depois.
