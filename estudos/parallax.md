# Parallax de foto (2.5D) no After Effects

Estudo de 6 tutoriais (lista em `parallax-fontes.md`). Os números abaixo são valores que cada autor usou na imagem dele, e aparecem como "segundo <autor>". Afirmação factual dos vídeos fica em `parallax-a-conferir.md` até ser checada.

## O princípio
Uma foto plana vira cena quando as partes dela ficam em profundidades diferentes e uma câmera real se move. O que está perto anda mais na tela do que o que está longe, e o olho lê isso como volume. Os três ingredientes são a câmera 3D, o sujeito e o fundo (Learn How To Edit Stuff, `LBip1k30YNw` @14:38). O resto é acabamento.

Isto conversa com o resto da skill: a profundidade aqui é a mesma `fator(z) = (D+z)/D`. Camada empurrada em Z encolhe, e a escala compensada devolve o tamanho original no quadro. É exatamente o passo "empurra em Z, depois aumenta a escala até preencher" que MDMZ, LHTES e SonduckFilm fazem no olho.

## Fluxo
1. **Escolher a foto.** Funciona melhor com planos que dá para separar (primeiro plano, meio, fundo) e fundo simples atrás do sujeito, porque o buraco que o sujeito deixa precisa ser preenchido de forma crível (LHTES @01:38). Pense em planos de profundidade antes de recortar: o que não é sujeito vai para o fundo (SonduckFilm @02:03).
2. **Separar em camadas.** Uma camada por plano, cada uma com máscara de borda levemente suavizada. **Pessoa na foto:** recorte com ferramenta dedicada (removedor de fundo com revisão humana), em resolução cheia, nunca por máscara feita no script. Os outros planos (árvore, grade, prédio, céu) podem sair do Photoshop ou do After (ver "Depende de" abaixo).
3. **Fazer a placa limpa (clean plate).** O fundo sem o sujeito. Selecione a máscara do sujeito, expanda alguns pixels e preencha com Preenchimento sensível ao conteúdo; depois retoque com o pincel de recuperação ou o carimbo (INTEGNITY @41:41). Sem a placa, quando a câmera anda aparece o "fantasma" do sujeito no fundo. Não precisa ficar perfeita: só aparece de relance enquanto tudo se move (MDMZ @06:21, SonduckFilm @03:05).
4. **Levar ao After.** PSD importado como "Composition - Retain Layer Sizes" com "Merge Layer Styles into Footage" ligado (MDMZ @14:09; nomes do AE em inglês, no AE pt-BR conferir o rótulo na janela de importação). Mudança salva no PSD atualiza no After (segundo SonduckFilm @05:09).
5. **Montar em 3D.** Todas as camadas 3D, câmera nova. Arrumar em vista dupla (Superior + Câmera Ativa). Empurrar cada camada em Z e compensar a escala. Ao reposicionar em X/Y, não mexer no Z que já foi acertado (Elias @03:21).
6. **Animar a câmera.** Um movimento só, com curva suave (F9 + Editor de gráfico). Exemplos: entrar rápido e depois seguir devagar (LHTES @06:18), avançar em Z ao longo de ~7 s (MDMZ @25:05), velocidade que desacelera sem parar entre dois pontos para não "travar" (Motion Nations @16:12). Ver a nota sobre "zoom digital" abaixo.
7. **Profundidade de campo.** Câmera com DOF ligado (vem desligado), Distância do foco em cima da camada do sujeito e Abertura alta. Foco animado entre planos conta história: começa fora de foco, entra em foco, passa para o próximo plano (Elias @10:13, LHTES @08:56).
8. **Vida dentro da camada.** Pino de marionete (Puppet) com movimento pequeno em cabelo, galho, braço. Pinos nas articulações e alguns pinos parados para travar o que não se move (LHTES @10:59, INTEGNITY @34:20, SonduckFilm @12:52).
9. **Acabamento.** Desfoque de movimento, grão, luz, partículas. O `acabamento.sh` da skill já cobre cor, aberração e grão.

## Truques por tipo de plano
| Plano | Como (autor) |
|---|---|
| Chão | Ponto de ancoragem na borda de cima, Rotação X -90, escala Y esticada até a base do quadro, depois Corner Pin para tirar a distorção (MDMZ @16:44-18:48) |
| Objeto em pé no chão (árvore, pessoa) | Ponto de ancoragem na base do objeto, na mesma altura do chão. Duas árvores = duas camadas com máscara cada (MDMZ @19:52) |
| Objeto que passa (trem, carro) | Pré-comp com null "controle" animando a posição, com motion blur na camada e na comp (MDMZ @23:30) |
| Sombra que faltou | Duplicar a camada, Rotação X 90 colada no chão, Preenchimento preto, Luz suave, opacidade ~40 (MDMZ @26:07) |
| Fundo muito distante | Desfoque gaussiano leve, "não passar de 10" segundo MDMZ (@28:11) |
| Céu ou nuvem | Mover na direção oposta à câmera para o fundo não ficar parado (Elias @10:47) |
| Fundo que mostra a borda | Escalar mais a camada (MDMZ, LHTES) ou Motion Tile com bordas espelhadas (SonduckFilm @06:41) |
| Sujeito principal | Mais contraste ou luz só nele para puxar o olho (INTEGNITY @22:21) |
| Cenário documental com várias fotos | Chão e teto de Sólido com Ruído fractal, reflexo com Desfoque composto, cópias da foto em baixa opacidade perto e longe da câmera (Motion Nations @03:36-17:43) |

## Valores que os autores usaram
Todos dependem da resolução da foto. São ponto de partida, não regra.
| Item | Valor | Segundo |
|---|---|---|
| Câmera | 50 mm, filme 35 mm | MDMZ @14:40, LHTES @05:16 |
| Câmera | Dois nós, 35 mm, DOF ligado | Elias @01:42 |
| Abertura | 330-350 | LHTES @08:25 (a skill usa 350-420) |
| Feather da máscara | 1 px no After; 1,5-2 no Photoshop | LHTES @03:11, SonduckFilm @02:34 |
| Expansão para a placa limpa | 10 px (After) ou 15 px (Photoshop) | LHTES @03:11, INTEGNITY @41:41 |
| Grão | intensidade 0,6, tamanho 0,2 | SonduckFilm @07:12 |
| Optics Compensation | FOV 0 → 50-60, com Reverse Lens Distortion | SonduckFilm @08:12 |
| Tremor de câmera | null pai da câmera, `wiggle(.8, 30)` na posição | SonduckFilm @09:16 |
| Flicker de sol | `wiggle(2, 50)` no brilho do Lens Flare | SonduckFilm @10:16 |
| Motion blur forte | CC Force Motion Blur, shutter 2000 em movimento lento, 180-500 em rápido | SonduckFilm @11:51 |

## Depende de
Onde os autores divergem. Escolha pela condição, não por gosto.
- **Separar no Photoshop ou no After?** Muitas camadas, cabelo, galhos, objeto atrás de grade: Photoshop (MDMZ, SonduckFilm, INTEGNITY no fim). Um sujeito só sobre fundo simples: tudo no After, com Caneta + Preenchimento sensível ao conteúdo (método Superfície, 1 quadro, depois Congelar quadro) (LHTES @03:43).
- **Profundidade de campo de verdade ou desfoque geral?** O DOF da câmera desfoca por distância e é o que vende profundidade (Elias, LHTES). O Camera Lens Blur numa camada de ajuste desfoca o quadro todo e simula a lente "respirando" (SonduckFilm @08:44). Para parallax use o DOF; o geral só como piscada de foco.
- **Motion blur nativo ou CC Force Motion Blur?** Nativo basta para objeto que passa (MDMZ). Câmera lenta sobre foto parada quase não gera blur nativo, então SonduckFilm força com CC Force, que pesa muito no render.
- **Plugin ou na mão?** Photomotion (INTEGNITY), Volumax (SonduckFilm, patrocínio) e Optical Flares (MDMZ) aceleram, mas esta skill monta por script: prefira o nativo e use plugin só se o usuário já tiver.
- **Movimento de câmera.** Avanço em Z (MDMZ, LHTES), órbita (SonduckFilm), Ponto de interesse + Posição (Elias). Avanço em Z puro é o que mais vira "zoom digital" (ver abaixo).

## Cuidados
- **"Parece zoom digital".** Câmera avançando reto em Z sobre poucos planos parece só um zoom. Deslize lateral ou órbita leve mostra mais a diferença de velocidade entre os planos. É a mesma lição da referência medida no `SKILL.md`: meça antes de copiar.
- **Planos com o mesmo movimento.** Se as camadas andam juntas, aumente a distância entre elas em Z (INTEGNITY @20:49).
- **Borda aparecendo.** Zoom ou rotação demais expõe a borda da foto; reduza o movimento ou escale o fundo (INTEGNITY @21:20).
- **Pré-comp dentro da cena 3D.** Confira o Collapse Transformations da pré-comp quando ela parecer chapada ou sumir com a câmera. MDMZ mexe nele no trem (@16:14), mas a legenda automática diz "desligar" e o comportamento esperado do AE é o contrário (ligado = camadas 3D de dentro respondem à câmera de fora). Está em `parallax-a-conferir.md`. Fato da Adobe (ver `luz-no-after.md`, erros comuns): com o interruptor ligado a pré-comp perde o modo de mesclagem e o motion blur próprios.
- **Puppet exagerado.** Movimento pequeno; o objetivo é tirar a cara de foto parada, não animar o personagem (LHTES @13:35).

## Por script (ExtendScript)
O caminho por script é o mesmo da skill: cada camada vira `layer.threeDLayer = true`, Z na `Position`, escala multiplicada por `fator(z)`. A câmera e o foco usam `camera()` e o null `FOCO` da `ae_3d_lib.jsx`. Chão deitado: `anchorPoint` na borda de cima e `xRotation = -90`. O PSD importado como composição já entrega as camadas na ordem do Photoshop.
