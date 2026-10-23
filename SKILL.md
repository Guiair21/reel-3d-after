---
name: reel-3d-after
description: Use quando o usuário mandar um Reel ou vídeo de referência de motion design com objetos que parecem 3D, câmera que anda, profundidade de campo, desfoque ou aberração cromática e pedir "faz igual", "mais 3D", "câmera 3D", "profundidade de campo", "o zoom tá zuado", "tá parecendo zoom digital", ou quiser montar no After Effects por script a partir de imagens. Também quando um vídeo feito com imagens planas precisar de volume, luz, sombra ou movimento de câmera mais cinematográfico, quando pedir parallax ou "animar uma foto parada" (2.5D), escolher lente, desfoque ou bokeh, iluminar uma cena de fotos no After, luz de cinema, ou referência de fotógrafo ou diretor de fotografia para compor. Responda sempre em português.
---

# Reel 3D no After Effects (por script)

## Visão geral
Imagem recortada vira cena 3D no After Effects 26.x montada por ExtendScript: camadas em Z com escala compensada, câmera real com profundidade de campo, foco que puxa entre planos. **O movimento de câmera se copia por medição, não no olho.** "Parece zoom digital" quase sempre é câmera avançando em Z onde a referência desliza de lado.

## Antes de começar
- **Pasta de trabalho:** uma pasta por projeto (`<projeto>/ae/` com `img/`, `out/` e o `.jsx`). Nos exemplos abaixo ela aparece como `<projeto>`.
- **After Effects 26.x instalado** em `C:\Program Files\Adobe\Adobe After Effects 2026`. Outro caminho: exportar `AERENDER` (bash) ou passar `-Aerender` (PowerShell) aos scripts.
- **Idioma do AE:** os templates do aerender vêm no idioma da instalação. Os scripts trazem os nomes em pt-BR ("Melhores configurações", "Sequência TIFF com alfa"); AE em inglês usa "Best Settings" e "TIFF Sequence with Alpha": troque por `RS_TEMPLATE`/`OM_TEMPLATE` (bash) ou `-RS`/`-OM` (PowerShell).
- **Python 3.10+** com `requirements.txt` instalado, mais `ffmpeg`/`ffprobe` e `yt-dlp` no PATH.

## Fluxo
1. **Estudar a referência:** `yt-dlp`, transcrição, quadros em resolução cheia, cor do fundo e das sombras medida no pixel. Cada detalhe da referência é uma decisão de quem fez; o áudio costuma explicar o método.
2. **Medir a câmera da referência:** `python -I scripts/medir_camera.py ref.mp4 --curva 0 5` e o resumo. Anotar: zoom %/quadro, deslize lateral, pico de velocidade, % parado, tranco. Na referência que calibrou esta skill (estilo Kaloyan): zoom ~0,08 %/q, lateral p90 ~2,6, pico ~4 px/q (em 270 px de largura), entrada deslizando de lado com freada exponencial (~1 s), saída acelerando para o mesmo lado.
2b. **Medir a cor:** `python -I scripts/medir_cor.py ref.mp4` (fundo e sombras RGB). Fundo que não é cinza 239: passar `--fundo` ao `medir_camera.py` e trocar `FUNDO` no script.
2c. **Narração (opcional):** voz clonada só com autorização expressa de quem é a voz, **para esta peça**. Gerar 2 tomadas por fala e conferir cada uma no Whisper. `python -I scripts/preparar_voz.py --vozes <pasta das tomadas> --falas falas.txt --saida-voz <pasta> --json falas.json` (falas.txt = uma linha `tomada|texto certo` por cena) corta silêncio, acelera 1,12×, mede com large-v3 e grava `falas.json` = `{dur, cenas:[{ini, dur, voz, texto, palavras:[{w,s,e}]}]}`, que o script do After lê com `eval` e a função `em(cena, "palavra")` usa para sincronizar. O áudio final (voz + trilha + efeitos) é mixado à parte e entra no `acabamento.sh`.
3. **Imagens:** objeto isolado em fundo cinza (qualquer gerador de imagem que aceite referência; Nano Banana deu bons recortes). `achatar_fundo.py` → `recortar_brancos.py` (rembg, sombra no alfa) → `lentes_transparentes.py <pasta> lupa [--tira-sombra oculos]` para vidro (objeto que voa: tirar a sombra). Objeto que gira: gerar 3-4 ângulos com a imagem original como referência e trocar durante o giro (motion blur esconde a emenda).
3b. **PNG ou modelo 3D?**
   | Objeto | Use |
   |---|---|
   | Visto de cima na "mesa" (papel, caneta, chave deitada), fino (armação de óculos), ou que passa rápido | PNG recortado no Classic 3D |
   | Precisa de volume em órbita lenta ou de sombra real projetada (coluna, busto, vaso) | Modelo GLB gerado a partir da imagem (testado com Hunyuan3D v3) numa cena `cena(nome, dur, "ADBE Calder")` com `modelo()` + `luzEstudio()` |
   | Vidro que amplia (lupa, lente, copo) | `lenteDeVidro()` antes da camada da lupa; texto escrito pequeno no fundo desde o começo. Nunca disco branco |
   Gerar modelo 3D custa crédito no serviço usado: confirme o custo com o usuário antes.
4. **Montar:** script do projeto com `//@include` de `scripts/ae_3d_lib.jsx` (globais exigidas no topo dela). Uma pré-comp por cena (`cena()`), câmera com chaves de batida (`camera()`), foco por null `FOCO`.
5. **Rodar:** `AfterFX.exe -r projeto.jsx`: o script termina com `app.project.save(new File(DIR + "projeto.aep"))` e `app.quit()`. Conferir o log. `bash scripts/quadros.sh <projeto>/ae projeto.aep "<comp>" 20 140 300` e OLHAR a folha.
5b. **Instância única do After:** um segundo `AfterFX.exe -r` com o After já aberto entrega o script à instância aberta e sai sem log. Antes de abrir AfterFX ou aerender: conferir que a trava `<pasta de trabalho>\ae.lock` não existe e que `Get-Process AfterFX,aerender` está vazio → criar a trava com o nome da sessão; no fim apagar **só se o conteúdo for o seu nome**. Se o `app.quit()` não fechar, `Stop-Process` depois do log OK.
6. **Render completo:** `pwsh -File scripts/render_independente.ps1 -Proj <projeto>\ae -Aep projeto.aep -Comp "Principal"` (processo independente; com `powershell` antigo o acento quebra o template). Esperar o PID **em primeiro plano** (`while tasklist ... ; do sleep 15; done` com timeout 600): vigia em segundo plano é morto quando a memória aperta. Render usa ~4 GB: com o OK do usuário, fechar navegador e outros programas pesados antes; nunca a sessão do agente que está rodando.
7. **Acabamento:** `bash scripts/acabamento.sh "out/seq/f_%05d.tif" saida.mp4 audio.m4a` (cor, aberração cromática, grão). Calibrar as sombras pelo número medido na referência.
8. **Comparar em números** com `medir_camera.py ref.mp4 minha.mp4` antes de entregar. Ajustar até bater.

## Referência rápida
| Item | Valor que funcionou |
|---|---|
| Renderer | `"ADBE Advanced 3d"` = **Classic 3D** (DOF + motion blur). O Advanced 3D (`ADBE Calder`) tem DOF só a partir da 26.3 e **nunca motion blur** |
| Câmera | zoom = D = 1200 (≈40 mm em 1080); 900-1050 para 30-35 mm |
| Profundidade | `fator(z) = (D+z)/D`; posição e escala multiplicadas por ele (z>0 longe) |
| Desfoque da base do quadro | câmera inclinada ~14° olhando a "mesa" |
| DOF | `abertura` 350-420 (valor real), Blur Level 100 %, foco = `dot(FOCO - câmera, eixo da câmera)` |
| Texto palavra a palavra | `texto(..., {palavra: true})` (seletor em palavras) |
| Acabamento | `colorbalance` e escala da aberração no topo do `acabamento.sh`: recalibrar pela `medir_cor.py`; 30 fps e 1080×1920 fixos lá |
| Troca de cena | FOCO dispara 2600 px para trás nos 6 quadros das pontas |
| Motion blur | shutter 180°, fase -90°, 16 amostras |
| Entrada/saída lateral | `mov: {entra: 170, tau: 0.38, sai: 150}`; zoom do meio ×0,25 |
| Texto letra a letra | Opacity 0 + Blur 26 + Position 3D [0,40,0]; seletor **forma 1 (quadrada)** + Smoothness 100; anima `ADBE Text Percent Start` 0→100 |
| Modelo 3D (Advanced 3D) | abertura ~90; luz ambiente 140 + paralela 110 com sombra (escuridão 22, difusão 60); parede/chão com Accepts Shadows = 2; sem motion blur → câmera lenta; texto/forma com Casts Shadows 0 |
| Lente de vidro | Ampliar 150 % (185 corta) + Inchar 0,45, centro e raio por expressão `toComp` do centro da lente no PNG; foco no plano do fundo |

## Por cima de vídeo de alguém falando (talking head)
Vídeo de uma pessoa falando para a câmera que ganha camada 3D:
1. **A base vem pronta de outra ferramenta** (editor de vídeo, Remotion, HyperFrames, ffmpeg): `base.mp4` 1080×1920 30 qps **sem** as legendas e telas que vão virar 3D (b-roll e cartões ficam prontos lá), mais a transcrição com tempo por palavra e o áudio em WAV à parte.
2. **Tempos:** `python -I scripts/transcricao_para_falas.py voz.wav falas.json --cortes <início de cada plano/tela> --roteiro roteiro.txt`. Já tem a transcrição? Passe com `--json`, não transcreva de novo com outro modelo.
3. **Esta skill faz a camada:** a base entra 2D embaixo de tudo (ver `legendas-sobre-video.md`); por cima, legendas 3D. **Tela gráfica 3D no meio** (lupa, coluna, objeto) = cena própria que **cobre a tela inteira**; se for para ficar por cima da pessoa, perguntar. A entrada/saída dela é o desfoque de foco das pontas (`camera()` já faz), o equivalente a um "desfoque 0,4 s / dissolve 12 quadros".
4. **Acabamento por cima de filmagem com cor aprovada:** `SO_LENTE=1 bash scripts/acabamento.sh ...` (só aberração e grão). Aceita WAV (vira AAC) e não mexe no volume.
5. **Áudio é da etapa de edição:** trilha e efeitos entram mixados. Woosh/impacto das telas que viraram 3D precisam ser adicionados lá, porque não existem mais no WAV da base.
6. **Mudou um trecho:** se a imagem toda sai do mesmo `out/seq` do After, renderize só aqueles quadros (`-s`/`-e`) na mesma pasta e refaça o acabamento inteiro: não há emenda. Emenda só quando juntar renders de ferramentas diferentes: concat recodificando com `fps=30,setpts=N/30/TB`, nunca `-c copy`.

**Legenda 3D por cima de vídeo de alguém falando** (palavra por palavra, extrusão, foco, espaço negativo, refazer só um trecho): ver `legendas-sobre-video.md`.

## Estudos de apoio (`estudos/`)
Estudos de 20/10/2026 feitos com vídeos (autores conferidos) e com a documentação da Adobe. Leia o arquivo do assunto **antes** de decidir; cada um tem `-fontes.md` e `-a-conferir.md` ao lado. Número de vídeo é "segundo <autor>", não fato.
| Quando | Ler |
|---|---|
| Animar foto parada: separar planos, placa limpa, chão, sombra que faltou | `estudos/parallax.md` |
| Escolher lente (mm), quanto cada plano anda, DOF Classic × Advanced, Camera Lens Blur com mapa | `estudos/lentes-e-foco.md` |
| Luz e sombra dentro do After: tipos de luz, Material Options, sombra falsa, raio volumétrico, matchNames | `estudos/luz-no-after.md` |
| Decidir a luz como diretor de fotografia: fonte motivada, contraste, esquemas, cor, atmosfera | `estudos/luz-cinematografica.md` |
| Compor a profundidade (planos, valor tonal, 9:16) e copiar o estilo de uma referência (Leiter, Fan Ho, Deakins, Caravaggio...) | `estudos/referencias-visuais.md` |

**Quando os estudos brigam com o que foi medido aqui, vale o medido.** Já resolvido:
- **Abertura:** as receitas de `referencias-visuais.md` sugerem 25-150; aqui o Classic 3D precisa de 350-420 e o Advanced 3D de ~90 (Referência rápida). Use as receitas só como proporção entre estilos (Leiter desfoca mais que Crewdson).
- **Lente:** D = 1200 da Referência rápida é o padrão quando não há estilo pedido. Estilo pede outra lente (Leiter 135-150 mm, Lubezki 16-24 mm): use a tabela de `lentes-e-foco.md` §2 e confira o Zoom na janela Camera Settings. Uma lente por cena.
- **Luz 3D sobre foto:** a foto já traz a luz gravada, e luz 3D soma por cima. Em cena só de fotos, prefira a luz 2D (gradiente, máscara, cópia de camada) de `luz-no-after.md` §5; luz 3D com sombra fica para texto, modelo e chão. Isso vale também para as receitas de `referencias-visuais.md` e de `luz-cinematografica.md` que pedem "Luz Spot com sombra".
- **Point light não projeta sombra no Advanced 3D** (Adobe lista só Spot, Parallel e Environment). Receita que pede Point com sombra: trocar por Spot.
- **Material Options em modelo 3D fecha o After** (`armadilhas.md`). As tabelas de Material Options de `luz-no-after.md` são para camadas planas, sólidos e texto.
- **Nomes de efeito em pt-BR** nas receitas não foram conferidos no AE instalado. Por script, use matchName (tabelas de `lentes-e-foco.md` §10 e `luz-no-after.md` §9); os marcados "não conferido" pedem a sonda que está lá antes de gravar.
- **Pessoa na foto:** recorte com ferramenta dedicada (removedor de fundo com revisão humana), não por máscara feita no script; a separação de camadas dos tutoriais é para cenário.

## Erros comuns
Ver `armadilhas.md` (todas vistas na prática). As que mais custam:
- Câmera só avançando em Z → "zoom digital". Deslizar de lado.
- Forma em rampa no seletor de texto → letras escondidas no fim.
- Ler escala/posição depois de pôr chave de voo → objeto 8× maior.
- Texto a menos de ~20 px em Z do papel → some (briga de planos).
- Render longo como tarefa em segundo plano do agente → morto por pressão de memória.
- Tremor de câmera "para dar vida": a referência medida não tem. Só se a medição mostrar.
- Mexer em Material Options de um modelo 3D → o After fecha na hora (o try não pega).
- Lupa com disco branco dentro → reprovado: vidro amplia o que está atrás.
- Vigia que apaga a trava `ae.lock` sem conferir o dono → derruba a trava da outra sessão.

Antes de entregar, confira o resultado contra o pedido original (folha de quadros, números do `medir_camera.py`, áudio em sincronia). A fonte da verdade das funções é `scripts/ae_3d_lib.jsx` via `//@include`; o cabeçalho dela mostra as globais que o script do projeto precisa definir antes, e `scripts/exemplo.jsx` é um projeto mínimo pronto para adaptar.
