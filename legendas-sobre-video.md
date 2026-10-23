# Legendas 3D por cima de filmagem real (talking head)

Quando usar: o usuário manda um vídeo de alguém falando para a câmera (montado num editor ou gravado direto) e quer legenda "estilo Barsol/Kaloyan": palavra grande, 3D de verdade, foco que puxa, nas partes escuras do quadro. Testado em out/2026 (AE 26.5, Classic 3D).

## Como montar
1. **Base sem legenda.** O que não é legenda (b-roll, cartões, transições) sai pronto de outra ferramenta (HyperFrames, Remotion, ffmpeg, editor de vídeo) como `base.mp4` 1080x1920 30 qps. No After a base entra **2D, embaixo de tudo**: não sofre câmera, luz nem desfoque.
2. **Tempo de cada palavra.** Já existe transcrição com tempo por palavra? Reaproveite com `scripts/transcricao_para_falas.py --json`. Senão, `python -I scripts/transcricao_para_falas.py voz.wav falas.json --cortes ... --roteiro roteiro.txt`, que transcreve com large-v3 (CPU int8; na GPU pode dar erro de cublas) e `word_timestamps=True` na voz isolada. Nome próprio e inglês saem errados no Whisper (ex.: "Reels" virando outra palavra, "Pronto" no lugar de "prompt"): o tempo vale, a grafia vem do roteiro.
3. **Mapa de espaço negativo por plano.** Um quadro por plano com grade de 180x240 px e máscara "escuro e liso" (luminância < 70 e pouca borda) pintada por cima. É o que decide x, y e tamanho. Chapéu ou cabelo escuro conta como espaço negativo; rosto e mãos, nunca.
4. **Gerador em Python → JSX.** Uma lista `(tipo, texto, t0, t1, {x, y, z, size, rot, ry})` vira chamadas da biblioteca. O arco é feito com **uma camada por letra**, com o avanço de cada letra medido na fonte com `fontTools` (hmtx × size / unitsPerEm). Texto em caminho por script não centraliza.
5. **Rodar, conferir a folha de quadros, render, acabamento.** Ver o `SKILL.md`.

## Linguagem que a referência usa (e as primeiras versões não usavam)
- **Uma ou duas palavras por vez**, no tempo da fala, quase todas as palavras. Frase inteira parada na tela parece legenda de TV.
- **A palavra-chave é gigante** (300-560 px) e **girada em Y** (±12-20°, entra com 2× o giro e assenta). O apoio fica menor e em outro plano Z.
- **Profundidade:** apoio em z = +420 (longe) ou z = -260 a -650 (perto da câmera, desfocado e grande). O foco (null `FOCO`) vai para cada palavra no instante em que ela entra e segura até a próxima.
- **Mistura de estilos:** vermelho com extrusão, branco grosso, pílula (laranja ou serifada vermelha) e condensada gigante, em pé na faixa lateral escura.

## Peças que funcionaram
- **Extrusão de verdade:** a palavra vermelha mais cópias em z + i (passo de prof/14, prof = 16 % do tamanho) **com a mesma posição e escala da frente, sem compensar a profundidade**. Com compensação as cópias somem atrás da frente. Todas filhas de um null 3D, que gira em Y e Z (entrada de -70° → giro final). A lateral é branca e o fundo da extrusão rosado.
- **Câmera:** parada no eixo, com uma órbita leve por plano (±6° de giro, ±35 px de deslize, ±3° de inclinação), chaves nos cortes. A órbita revela a extrusão. Distância D = 1200, abertura do DOF 300 (sutil) a 520 (forte).
- **Saída:** opacidade 100 → 0 nos últimos 4 quadros e `outPoint` no fim.
- **Sombra de legibilidade:** efeito `ADBE Drop Shadow` (Opacity 0-255 em `-0002`, Direction `-0003` = 180 para baixo, Distance `-0004`, Softness `-0005`).

## Refazer só um trecho
O que mudou é só um trecho (um b-roll trocado pela filmagem original, por exemplo)? Gere a base de novo e renderize **só esses quadros** no aerender (`-s 140 -e 210`) **na mesma pasta `out/seq`**: os TIFF dos quadros novos substituem os antigos. Depois refaça só o acabamento. O áudio troca sem renderizar a imagem: `ffmpeg -i v.mp4 -i mix.wav -map 0:v -map 1:a -c:v copy`.

## Erros vistos
- Texto passando atrás da pessoa exige um recorte da pessoa em cada quadro. Isso é removedor de fundo de vídeo (serviço pago ou ferramenta dedicada), não máscara feita no script: perguntar ao usuário antes de gastar créditos.
- Correção de cor do `acabamento.sh` (`colorbalance` + `curves`) foi calibrada para uma referência de fundo cinza claro. Por cima de filmagem já com cor aprovada, usar só a aberração e o grão (`SO_LENTE=1`).
- Prévia leve para mandar por chat: 720x1280, 4,5 Mbps, aac 192k (35 s ≈ 19 MB).
