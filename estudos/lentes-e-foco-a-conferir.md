# A conferir: números e afirmações dos vídeos

Tudo aqui foi dito em vídeo. Status `não verificado` até alguém conferir; `confirmado pela Adobe: <link>` quando a documentação diz o mesmo. Itens com **(suspeito)** vêm de legenda automática ou têm número que a fala não deixa claro.

Links da Adobe abreviados:
- [CAM] https://helpx.adobe.com/after-effects/desktop/work-with-layers/camera-layer/cameras-lights-points-interest.html
- [A3D-DOF] https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/work-with-3d-scene-depth-data/enable-in_engine-depth-of-field-in-advanced-3d.html
- [NEW] https://helpx.adobe.com/after-effects/desktop/what-s-new/whats-new.html
- [BLUR] https://helpx.adobe.com/after-effects/using/blur-sharpen-effects.html
- [DEPTH] https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/work-with-3d-scene-depth-data/3d-depth-data-extraction.html

## Jake Bartlett, Camera Lens Blur (EPw0nMrhP8E)

| # | Afirmação | Link | Status |
|---|---|---|---|
| 1 | A forma de íris padrão do Camera Lens Blur é hexágono | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=66s | não verificado (a Adobe não diz o padrão) |
| 2 | Mais lados na íris renderizam mais devagar e parecem mais reais | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=66s | não verificado |
| 3 | Com Roundness 100 a forma escolhida quase não importa; triângulo + 100 renderiza mais rápido | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=96s | não verificado |
| 4 | Baixar Aspect Ratio dá cara anamórfica; ele usou 0,6 | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=127s | não verificado |
| 5 | Diffraction Fringe alto deixa o centro transparente e cria anel; 0 tira; ele usou 500 | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=127s | confirmado pela Adobe: [BLUR] (100 halo natural, 500 toda a energia no anel) |
| 6 | Blur uniforme de 14 px no exemplo | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=157s | não verificado |
| 7 | Fast Box Blur com máscara e feather só dissolve a transparência, sem transição real de desfoque | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=187s | não verificado |
| 8 | Mapa falso: Gradient Ramp + Colorama (Ramp Gray) indo branco, preto, branco; "Effects and Masks" no menu | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=279s | não verificado |
| 9 | Animar o Phase Shift do Colorama move o plano de foco | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=405s | não verificado |
| 10 | O canal do mapa vem em luminância e pode ser R, G, B ou alfa | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=467s | confirmado pela Adobe em parte: [BLUR] lista luminância, cor ou alfa; o padrão não é dito |
| 11 | Melhor mapa na mesma resolução da camada do que "Stretch Map to Fit" | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=498s | não verificado |
| 12 | Gain alto e Threshold baixo fazem as partes claras florescerem; Saturation 0 vai ao branco, 100 mantém a cor | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=528s | confirmado pela Adobe: [BLUR] |
| 13 | Repeat Edge Pixels vem ligado; desligar cria borda semitransparente | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=558s | não verificado |
| 14 | Em 32 bpc, valores acima de 1 fazem o bokeh florescer; em 8 bpc fica chapado e com banding | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=589s | confirmado pela Adobe: [BLUR] (pede 32 bpc; profundidade menor quantiza) |
| 15 | Use Linear Working Space muda bastante as cores quando o projeto não é linear | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=713s | confirmado pela Adobe em parte: [BLUR] (efeito parecido com projeto linearizado) |
| 16 | Pixels do render do Cinema 4D com R 13, G 8, B 5 **(suspeito)** | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=745s | não verificado |
| 17 | No passe de profundidade do Cinema 4D o mais perto é preto e o longe é claro | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=837s | não verificado; diverge da convenção do 3D Channel Extract da Adobe (branco perto): [DEPTH] |
| 18 | Blur Focal Distance troca o assunto em foco só com mapa de profundidade real | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=837s | confirmado pela Adobe em parte: [BLUR] (valor do mapa que corresponde a desfoque zero) |
| 19 | Raio exagerado gera franja estranha | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=902s | não verificado |
| 20 | Camera Lens Blur é o desfoque mais poderoso embutido no After | https://www.youtube.com/watch?v=EPw0nMrhP8E&t=997s | não verificado (opinião) |

## Jake Bartlett, novidades da 26.3 (DK04C1mro-U)

| # | Afirmação | Link | Status |
|---|---|---|---|
| 21 | O DOF nativo do Advanced 3D chegou na 26.3 | https://www.youtube.com/watch?v=DK04C1mro-U&t=217s | confirmado pela Adobe: [NEW] (June 2026 release, version 26.3) |
| 22 | Controles: liga/desliga, Aperture, Focus Area Width, Near e Far Blur Level | https://www.youtube.com/watch?v=DK04C1mro-U&t=248s | confirmado pela Adobe: [A3D-DOF] |
| 23 | Focus Area Width em 0 deixa só um plano fino em foco | https://www.youtube.com/watch?v=DK04C1mro-U&t=279s | não verificado (a Adobe só diz que define o tamanho da região nítida) |
| 24 | Near/Far Blur Level funciona como multiplicador do desfoque | https://www.youtube.com/watch?v=DK04C1mro-U&t=279s | confirmado pela Adobe em parte: [A3D-DOF] (aumenta ou diminui o desfoque da frente e do fundo) |
| 25 | Não há controle de íris nem de forma do bokeh no Advanced 3D | https://www.youtube.com/watch?v=DK04C1mro-U&t=279s | não verificado (a página [A3D-DOF] não lista íris, mas não diz que não existe) |
| 26 | Se ficar granulado, subir os valores nas opções de render | https://www.youtube.com/watch?v=DK04C1mro-U&t=279s | confirmado pela Adobe: [A3D-DOF] (Render Quality; "ondulação" ao animar o foco) |
| 27 | Ele baixou um valor para 25 **(suspeito: o controle não fica claro no áudio)** | https://www.youtube.com/watch?v=DK04C1mro-U&t=309s | não verificado |
| 28 | Menos de 1 s por quadro, com gravação de tela e câmera na mesma GPU | https://www.youtube.com/watch?v=DK04C1mro-U&t=309s | não verificado |
| 29 | Usar Draft 3D para acertar a câmera e desligar para ajustar o DOF | https://www.youtube.com/watch?v=DK04C1mro-U&t=309s | não verificado |

## Curren Sheldon (-UJq0O-H8YA)

| # | Afirmação | Link | Status |
|---|---|---|---|
| 30 | Ele é cineasta indicado ao Oscar e premiado pela ASC | https://www.youtube.com/watch?v=-UJq0O-H8YA&t=30s | confirmado na web (não Adobe): indicação ao Oscar por *Heroin(e)*, https://en.wikipedia.org/wiki/Curren_Sheldon; prêmio ASC por *King Coal*, https://www.currensheldon.com/about |
| 31 | Em 95 % dos projetos o foco serve para dirigir a atenção | https://www.youtube.com/watch?v=-UJq0O-H8YA&t=61s | não verificado (estimativa dele) |
| 32 | Soderbergh usa desfoque raso para desorientar em *Side Effects* | https://www.youtube.com/watch?v=-UJq0O-H8YA&t=92s | não verificado |
| 33 | f/4 ou f/5.6 já dão desfoque raso suficiente para separar o assunto | https://www.youtube.com/watch?v=-UJq0O-H8YA&t=122s | não verificado |
| 34 | *Recovery Boys*: discurso de 5 minutos filmado com 24-105 f/4 em Super 35 | https://www.youtube.com/watch?v=-UJq0O-H8YA&t=311s | não verificado |
| 35 | Com 85 ou 105 mm fica fácil sujar o primeiro plano | https://www.youtube.com/watch?v=-UJq0O-H8YA&t=375s | não verificado |
| 36 | Com a 18-135 da Canon tinha desfoque em f/6.3 na ponta longa | https://www.youtube.com/watch?v=-UJq0O-H8YA&t=405s | não verificado |
| 37 | Poucas imagens de Terrence Malick têm desfoque muito raso | https://www.youtube.com/watch?v=-UJq0O-H8YA&t=496s | não verificado |
| 38 | *Wicked* foi filmado com tudo em f/1.4 | https://www.youtube.com/watch?v=-UJq0O-H8YA&t=527s | não verificado (provável exagero retórico) |
| 39 | Cena de *King Coal* em f/11 com a Canon 600 mm f/11; na mesma fala diz "mesmo em f/16" **(suspeito: os dois números se contradizem)** | https://www.youtube.com/watch?v=-UJq0O-H8YA&t=591s | não verificado |

## Elias Sarantopoulos (H493T_1FplE)

| # | Afirmação | Link | Status |
|---|---|---|---|
| 40 | Câmera two-node, preset 35 mm, DOF ligado na criação | https://www.youtube.com/watch?v=H493T_1FplE&t=102s | não verificado (escolha dele) |
| 41 | Todas as camadas precisam ser 3D para entrar na câmera e no DOF | https://www.youtube.com/watch?v=H493T_1FplE&t=68s | confirmado pela Adobe: [CAM] (câmera afeta só camadas 3D e efeitos com Comp Camera) |
| 42 | Depois de definir o Z, mexer só em X e Y | https://www.youtube.com/watch?v=H493T_1FplE&t=201s | não verificado |
| 43 | Aumentar a abertura aumenta o desfoque fora do plano focal | https://www.youtube.com/watch?v=H493T_1FplE&t=439s | confirmado pela Adobe: [CAM] |
| 44 | Começar fora de foco e entrar em foco é um truque de entrada | https://www.youtube.com/watch?v=H493T_1FplE&t=613s | não verificado |

## Motion Science, guia da câmera 3D (zgMHWFolli8)

| # | Afirmação | Link | Status |
|---|---|---|---|
| 45 | Presets com nome de distância focal, cada um imitando uma câmera real | https://www.youtube.com/watch?v=zgMHWFolli8&t=143s | confirmado pela Adobe: [CAM] |
| 46 | O preset define angle of view, zoom, focus distance, focal length e aperture | https://www.youtube.com/watch?v=zgMHWFolli8&t=176s | confirmado pela Adobe: [CAM] |
| 47 | 15 mm tem campo muito aberto e 80 mm muito fechado | https://www.youtube.com/watch?v=zgMHWFolli8&t=176s | não verificado (coerente com a definição de ângulo da Adobe) |
| 48 | Câmera one-node e two-node só diferem no jeito de orientar; dá para trocar a qualquer hora | https://www.youtube.com/watch?v=zgMHWFolli8&t=79s | confirmado pela Adobe em parte: [CAM] (two-node = auto-orient para o ponto de interesse) |
| 49 | `wiggle(5,25)` na posição dá sensação de câmera na mão | https://www.youtube.com/watch?v=zgMHWFolli8&t=838s | não verificado |
| 50 | Blur Level 100 % é o desfoque natural do preset | https://www.youtube.com/watch?v=zgMHWFolli8&t=1049s | confirmado pela Adobe: [CAM] |
| 51 | Iris Shape vem em Fast Rectangle; as outras formas renderizam bem mais devagar | https://www.youtube.com/watch?v=zgMHWFolli8&t=1089s | não verificado |
| 52 | Highlight Gain, Threshold e Saturation reforçam a luminosidade nos pixels desfocados | https://www.youtube.com/watch?v=zgMHWFolli8&t=1119s | confirmado pela Adobe: [BLUR] |
| 53 | Link Focus to Point of Interest, Link Focus Distance to Layer (autofoco) e Set Focus Distance to Layer | https://www.youtube.com/watch?v=zgMHWFolli8&t=1119s | confirmado pela Adobe: [CAM] |

## Complementares (abaixo do corte)

| # | Autor | Afirmação | Link | Status |
|---|---|---|---|---|
| 54 | Motion Science (7tW81v5azpk) | Usa as propriedades de Iris Rotation até Highlight Saturation em cerca de 1 % dos projetos | https://www.youtube.com/watch?v=7tW81v5azpk&t=93s | não verificado |
| 55 | Motion Science (7tW81v5azpk) | Zoom ~4266 fecha bem no assunto **(suspeito: legenda automática)** | https://www.youtube.com/watch?v=7tW81v5azpk&t=124s | não verificado; pela conta f × 1920/36 bate com 80 mm (calculado) |
| 56 | Motion Science (7tW81v5azpk) | O valor padrão de Aperture muda com o preset | https://www.youtube.com/watch?v=7tW81v5azpk&t=124s | confirmado pela Adobe: [CAM] (o preset define Aperture) |
| 57 | Motion Science (7tW81v5azpk) | Aperture 347 já mostra desfoque; usou 2500 no projeto | https://www.youtube.com/watch?v=7tW81v5azpk&t=155s | não verificado |
| 58 | Motion Science (7tW81v5azpk) | Aperture 1000 com Blur Level 200 % dá quase o mesmo que 2500 com 100 % | https://www.youtube.com/watch?v=7tW81v5azpk&t=310s | não verificado |
| 59 | Motion Science (7tW81v5azpk) | Fast Rectangle é o padrão por ser rápido; Hexagon ou Heptagon no render final | https://www.youtube.com/watch?v=7tW81v5azpk&t=340s | não verificado |
| 60 | Motion Science (5OS3DqBNnnU) | Foto com pré-comp interna precisa do 3D ligado dentro da pré-comp para reagir à câmera | https://www.youtube.com/watch?v=5OS3DqBNnnU&t=218s | não verificado |
| 61 | DEZOLAS DOP (OiAaIbTOfCQ) | Grande angulares vão de cerca de 8 a 35 mm e distorcem as bordas | https://www.youtube.com/watch?v=OiAaIbTOfCQ&t=93s | não verificado |
| 62 | DEZOLAS DOP | 85 mm é a preferida para moda; grande angular deforma rosto | https://www.youtube.com/watch?v=OiAaIbTOfCQ&t=184s | não verificado |
| 63 | DEZOLAS DOP | A "normal" de full frame fica perto de 43 mm por ser a diagonal do sensor | https://www.youtube.com/watch?v=OiAaIbTOfCQ&t=214s | não verificado (a diagonal de 36 × 24 mm dá 43,3 mm, calculado) |
| 64 | DEZOLAS DOP | Recortar o miolo de uma foto de 16 mm dá a mesma imagem de uma 200 mm | https://www.youtube.com/watch?v=OiAaIbTOfCQ&t=244s | não verificado |
| 65 | DEZOLAS DOP | Foto do Ítalo Ferreira no eclipse: 1 km de distância, 600 mm com duplicador = 1200 mm **(suspeito: nome do fotógrafo na legenda)** | https://www.youtube.com/watch?v=OiAaIbTOfCQ&t=306s | não verificado |
| 66 | DEZOLAS DOP | Super 35 é menor que full frame; 24 mm vira algo como 35 mm | https://www.youtube.com/watch?v=OiAaIbTOfCQ&t=734s | não verificado |
| 67 | DEZOLAS DOP | Anamórficas existem desde 1953; as primeiras com squeeze 2.0 | https://www.youtube.com/watch?v=OiAaIbTOfCQ&t=800s | não verificado |
| 68 | DEZOLAS DOP | Cinerama em 1952 com três lentes de 27 mm; CinemaScope em 1953 com *O Manto Sagrado* | https://www.youtube.com/watch?v=OiAaIbTOfCQ&t=954s | não verificado |
| 69 | DEZOLAS DOP | A escala de f-stop multiplica por 1,4 (raiz de 2) para dobrar a área | https://www.youtube.com/watch?v=OiAaIbTOfCQ&t=1188s | não verificado |
| 70 | DEZOLAS DOP | Círculo de confusão: 0,03 mm em full frame e cerca de 0,02 mm em sensor recortado | https://www.youtube.com/watch?v=OiAaIbTOfCQ&t=1555s | não verificado |
| 71 | brainstorm.academy (n4tEu_jelgI) | Grande angular de 7 a 35 mm; normal de 35/40 a 70 mm; tele acima de 70/80 mm | https://www.youtube.com/watch?v=n4tEu_jelgI&t=714s | não verificado |
| 72 | brainstorm.academy | Mudar a distância focal muda o parallax entre foco e fundo | https://www.youtube.com/watch?v=n4tEu_jelgI&t=903s | não verificado; diverge de DEZOLAS (#64) |
| 73 | brainstorm.academy | f/1.8 a 3.2 para fundo desfocado; f/5 a 11 para paisagem nítida | https://www.youtube.com/watch?v=n4tEu_jelgI&t=1153s | não verificado |
| 74 | brainstorm.academy | Afastar o assunto do fundo desfoca mais mesmo com abertura pequena | https://www.youtube.com/watch?v=n4tEu_jelgI&t=1217s | não verificado |
| 75 | Boone Loves Video (JfM0o4UjMFU) | Camada 2D não recebe o DOF da câmera | https://www.youtube.com/watch?v=JfM0o4UjMFU&t=94s | confirmado pela Adobe: [CAM] |
| 76 | Boone Loves Video | Feather de 300 px no Gaussian; 500 px no mapa do Camera Lens Blur | https://www.youtube.com/watch?v=JfM0o4UjMFU&t=219s | não verificado |
| 77 | Boone Loves Video | Render por quadro: Gaussian ~0,42 s, Camera Lens Blur ~3 s, plugin Bokeh ~7 s | https://www.youtube.com/watch?v=JfM0o4UjMFU&t=506s | não verificado |

## Descartados citados no estudo

| # | Autor | Afirmação | Link | Status |
|---|---|---|---|---|
| 78 | TheBlade (L01HNH6rmgU) | Presets 15, 20, 24, 28, 35, 50, 80, 135, 200 mm **(suspeito: a legenda diz "50 mm" no lugar de 15)** | https://www.youtube.com/watch?v=L01HNH6rmgU&t=563s | não verificado; a lista não está na Adobe |
| 79 | TheBlade | Trocar o preset só muda a distância da câmera em Z, mantendo o enquadramento | https://www.youtube.com/watch?v=L01HNH6rmgU&t=842s | não verificado |
| 80 | TheBlade | Quase sempre usa 35 ou 50 mm | https://www.youtube.com/watch?v=L01HNH6rmgU&t=842s | não verificado |
| 81 | Epic Light Media (F5GL341bSwo) | A distância focal é o fator que mais aumenta o bokeh, mais que a abertura | https://www.youtube.com/watch?v=F5GL341bSwo&t=228s | não verificado |
| 82 | Breadfruit Studios (zQ31j39YyIc) | Desfoque raso com f/2.8 ou menos; profundidade total com f/8 ou f/11 | https://www.youtube.com/watch?v=zQ31j39YyIc&t=265s | não verificado |

Total: 82 itens. Confirmados total ou parcialmente pela Adobe: 20. Confirmado na web (não Adobe): 1.
