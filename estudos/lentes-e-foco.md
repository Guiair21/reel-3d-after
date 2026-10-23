# Profundidade de campo e lentes da câmera do After Effects

Estudo feito em 20/10/2026 para servir de referência à skill `reel-3d-after` (parallax de foto e cenas 3D montadas no After Effects 26.x por ExtendScript).

Regra de leitura: o que é fato do After vem da documentação da Adobe, com link. O que vem de vídeo aparece como "segundo <autor> (id @mm:ss)" e está listado em `a-conferir.md`. Conta feita por mim aparece marcada como "calculado".

Finalistas (nota 7 ou mais): Jake Bartlett/Jake In Motion (EPw0nMrhP8E e DK04C1mro-U), Curren Sheldon (-UJq0O-H8YA), Elias Sarantopoulos (H493T_1FplE), Motion Science (zgMHWFolli8). Fontes complementares abaixo do corte, citadas com a marca "[complementar]": DEZOLAS DOP (OiAaIbTOfCQ), brainstorm.academy (n4tEu_jelgI), Boone Loves Video (JfM0o4UjMFU), Motion Science (7tW81v5azpk e 5OS3DqBNnnU). Detalhes em `fontes.md`.

## 1. Princípio

Profundidade de campo serve para dizer ao olho onde olhar. Segundo Curren Sheldon (-UJq0O-H8YA @01:01), em quase todo projeto o foco existe para levar a atenção do público ao assunto; o segundo uso é estético (sonho, desorientação). Ele avisa que desfoque raso usado o tempo todo vira muleta e cansa (@00:00, @08:47), e que dá para dirigir o olhar com composição, luz, movimento, preenchimento de quadro e molduras mesmo com tudo nítido (@02:34 em diante).

No parallax de foto isso vira três decisões:

1. **Onde fica o plano de foco** (Focus Distance): o assunto.
2. **Quanto o resto desfoca** (Aperture e Blur Level no Classic 3D; Aperture, Focus Area Width e Near/Far Blur Level no Advanced 3D).
3. **Qual lente** (Zoom/preset): define a que distância a câmera fica do assunto para o mesmo enquadramento, e essa distância define quanto as camadas se separam quando a câmera anda.

O desfoque reforça a separação em Z que o parallax já cria. Os dois juntos dão a sensação de volume; um sem o outro fica pela metade.

## 2. As lentes da câmera do After

O que a Adobe diz ([Cameras, lights, and points of interest](https://helpx.adobe.com/after-effects/desktop/work-with-layers/camera-layer/cameras-lights-points-interest.html), atualizada em 21/01/2026):

- Os presets têm nome de distância focal e representam uma câmera de 35 mm com aquela lente. O preset define Angle of View, Zoom, Focus Distance, Focal Length e Aperture. **O padrão é 50 mm.**
- **Zoom** é a distância da lente ao plano da imagem: uma camada que está a uma distância igual ao Zoom aparece em tamanho cheio; a duas vezes essa distância aparece com metade da altura e da largura.
- **Angle of View** sai de Focal Length, Film Size e Zoom. Ângulo maior dá o resultado de uma grande angular.
- **Film Size** é a área exposta do filme, ligada ao tamanho da comp. Mudar Film Size ou Focal Length muda o Zoom para manter a perspectiva de uma câmera real.
- **Measure Film Size** escolhe a dimensão usada para o tamanho do filme.
- A posição da câmera representa o centro da lente.

A lista de presets não aparece na página da Adobe. Na janela Camera Settings eles são 15, 20, 24, 28, 35, 50, 80, 135 e 200 mm (lista vista na tela nos vídeos; Motion Science cita 15 e 80 em zgMHWFolli8 @02:56). **Não conferido na Adobe.**

### Tabela das lentes

Ângulo horizontal **calculado** por 2·atan(18/f), supondo Film Size de 36 mm medido na horizontal (o padrão de 35 mm). Zoom **calculado** por f × largura da comp / 36, para um Reel de 1080 px de largura. Coluna de parallax **calculada** com a geometria do próprio Zoom da Adobe: com o assunto enquadrado a uma distância igual ao Zoom (D), um fundo 1000 px atrás dele anda D/(D+1000) do que o assunto anda num deslize lateral da câmera. Conferir ângulo e Zoom na janela Camera Settings antes de usar como número fixo.

| Preset | Ângulo horizontal (calc.) | Zoom num Reel 1080 (calc.) | Fundo 1000 px atrás anda (calc.) | O que faz com perspectiva e parallax |
|---|---|---|---|---|
| 15 mm | 100,4° | 450 | 31 % do assunto | Câmera colada no assunto. Separação enorme entre planos; deforma o que está perto e nas bordas |
| 20 mm | 84,0° | 600 | 38 % | Grande angular forte; parallax muito evidente, bom para "entrar" no cenário |
| 24 mm | 73,7° | 720 | 42 % | Grande angular; profundidade exagerada sem tanta deformação |
| 28 mm | 65,5° | 840 | 46 % | Grande angular leve |
| 35 mm | 54,4° | 1050 | 51 % | Ponto de partida comum para parallax de foto (Elias Sarantopoulos usa 35 mm em H493T_1FplE @01:42) |
| 50 mm | 39,6° | 1500 | 60 % | Padrão do After; leitura "natural" |
| 80 mm | 25,4° | 2400 | 71 % | Começa a comprimir; planos parecem mais próximos entre si |
| 135 mm | 15,2° | 4050 | 80 % | Compressão forte; o fundo "cresce" atrás do assunto |
| 200 mm | 10,3° | 6000 | 86 % | Quase chapado no deslize lateral; precisa de Z muito maior para ler profundidade |

Como ler a última coluna: quanto mais perto de 100 %, mais as camadas andam juntas e mais a cena parece um cartão só.

### O que muda a perspectiva

- Segundo DEZOLAS DOP [complementar] (OiAaIbTOfCQ @04:04), recortar o miolo de uma foto de 16 mm dá a mesma imagem de uma 200 mm; a tele "comprime" porque a câmera fica longe. Ou seja, quem muda a perspectiva é a distância da câmera.
- No After isso bate com a definição de Zoom da Adobe: com a câmera parada, mexer só no Zoom aumenta todas as camadas na mesma proporção (dedução da definição de Zoom; a página não diz isso com essas palavras). Para mudar a relação entre planos é preciso mover a câmera em Z junto.
- Segundo brainstorm.academy [complementar] (n4tEu_jelgI @14:33), mudar a distância focal muda o parallax entre o que está em foco e o fundo. Na demonstração ele também se aproxima da câmera, então a mudança de perspectiva vem da distância. Ver "Depende de".

## 3. Parâmetros de DOF da câmera

Fonte: [Cameras, lights, and points of interest](https://helpx.adobe.com/after-effects/desktop/work-with-layers/camera-layer/cameras-lights-points-interest.html) (câmera), [Blur and Sharpen effects, seção Camera Lens Blur](https://helpx.adobe.com/after-effects/using/blur-sharpen-effects.html) (íris e highlight; a Adobe diz que as descrições do Camera Lens Blur valem para o grupo Camera Options da câmera, que tem nomes iguais ou parecidos) e [Enable in-engine Depth of Field in Advanced 3D](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/work-with-3d-scene-depth-data/enable-in_engine-depth-of-field-in-advanced-3d.html) (Advanced 3D).

| Parâmetro | Renderer | O que faz (Adobe) |
|---|---|---|
| Depth of Field | Classic e Advanced | Liga o desfoque. Agrupa Focus Distance, Aperture, F-Stop e Blur Level. Fora da faixa de distância em foco, a imagem desfoca |
| Focus Distance | Classic e Advanced | Distância da câmera ao plano em foco perfeito. Dica da Adobe para travar no ponto de interesse: expressão `length(position, pointOfInterest)` |
| Lock to Zoom | Classic (janela) | Faz Focus Distance igual ao Zoom. Mexer em Zoom ou Focus Distance na timeline destrava |
| Aperture | Classic e Advanced | Tamanho da abertura. Aumentar a abertura aumenta o desfoque. Mudar Aperture atualiza F-Stop. O After ignora o efeito da abertura na exposição. No Advanced 3D: quanto da cena pode desfocar no ponto mais borrado |
| F-Stop | Classic (janela) | Razão entre distância focal e abertura. Mudar F-Stop atualiza Aperture |
| Blur Level | Classic | Quantidade de desfoque. 100 % é o desfoque natural das configurações da câmera; valores menores reduzem |
| Focus Area Width | Advanced 3D | Tamanho da região nítida. Serve para manter objetos inteiros em foco |
| Near Blur Level / Far Blur Level | Advanced 3D | Aumenta ou diminui o desfoque da frente e do fundo, juntos ou separados, inclusive além do que uma lente real faria |
| Iris Shape | Classic | Forma da íris (do bokeh). Propriedade de íris descrita no Camera Lens Blur |
| Iris Rotation | Classic | Rotação da forma da íris |
| Iris Roundness | Classic | Arredonda a forma da íris |
| Iris Aspect Ratio | Classic | Proporção da forma (achatar dá cara anamórfica, segundo Jake Bartlett, EPw0nMrhP8E @02:07) |
| Iris Diffraction Fringe | Classic | Halo na borda da íris que simula a luz dobrando nas lâminas. Em 100, halo natural; em 500, toda a energia vai para o anel (imita lente catadióptrica) |
| Highlight Gain | Classic | Energia somada aos pixels acima do limiar |
| Highlight Threshold | Classic | Limite de luminosidade do que o Gain reforça. 0 reforça tudo acima de 0; 1 praticamente elimina o highlight, a não ser que haja valores acima do branco |
| Highlight Saturation | Classic | Quanta cor o pixel reforçado mantém. 0 empurra para o branco; 100 tenta manter a cor (bokeh colorido em luzes) |

Comandos de câmera (Layer > Camera), segundo a Adobe: **Link Focus Distance to Point of Interest** (expressão com a distância até o ponto de interesse), **Link Focus Distance to Layer** (expressão que faz o foco seguir uma camada) e **Set Focus Distance to Layer** (grava o valor no tempo atual). Valem também no Advanced 3D.

### Classic 3D, Advanced 3D e Cinema 4D

- **Classic 3D:** DOF completo, com íris, highlight e Blur Level.
- **Advanced 3D:** DOF nativo chegou na versão 26.3 (junho de 2026), segundo o [What's new da Adobe](https://helpx.adobe.com/after-effects/desktop/what-s-new/whats-new.html). Controles: Focus Distance, Aperture, Focus Area Width, Near/Far Blur Level. A qualidade sai do controle geral Render Quality (Composition panel > 3D Renderer > Renderer Options); se aparecer "ondulação" ao animar o foco, subir a qualidade, e o render fica mais lento. A Adobe diz que ele lida com várias camadas de transparência sobrepostas (assunto visto através de uma janela). A página da Adobe não lista controle de íris. Jake Bartlett confirma que não há controle de forma do bokeh (DK04C1mro-U @04:39).
- **Testes desta skill (AE 26.5, `armadilhas.md`):** no Advanced 3D o DOF é bem mais forte (abertura ~90 contra 350-420 no Classic), o Blur Level fica escondido e não há motion blur. São medições locais, não da Adobe.
- **Cinema 4D renderer:** a Adobe diz que dá para extrair dados de profundidade dele como no Classic e no Advanced ([3D depth data extraction](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/work-with-3d-scene-depth-data/3d-depth-data-extraction.html)). Como o DOF de câmera se comporta nele: **não conferido**.
- Câmera só afeta camada 3D (e efeito com atributo Comp Camera), segundo a página de câmeras da Adobe. Camada 2D não desfoca com o DOF da câmera; Boone Loves Video [complementar] mostra isso com imagem do Google Earth Studio em 2D (JfM0o4UjMFU @01:34).

## 4. Desfoques fora da câmera

### Camera Lens Blur (efeito)

Segundo a Adobe ([Blur and Sharpen](https://helpx.adobe.com/after-effects/using/blur-sharpen-effects.html), atualizada em 26/06/2025): substituto do Lens Blur antigo, raio máximo de 500, bem mais rápido, funciona em 8, 16 e 32 bpc.

- **Blur Map > Layer:** camada de controle que diz onde desfocar mais.
- **Channel:** luminância, cor ou alfa do mapa.
- **Blur Focal Distance:** o valor do mapa que corresponde a desfoque zero. A diferença entre esse valor e o valor de cada pixel do mapa dita o desfoque daquela área.
- **Highlight (Gain, Threshold, Saturation):** os mesmos da tabela acima.
- **Use Linear Working Space:** dá resultado parecido com projeto linearizado; a Adobe pede também 32 bpc, porque profundidade de bits menor quantiza o bokeh.

Método de Jake Bartlett (EPw0nMrhP8E):

1. Camada de ajuste com Camera Lens Blur por cima da foto (@00:36).
2. Mapa falso: sólido com Gradient Ramp e Colorama no preset Ramp Gray, ajustado para ir branco, preto, branco; a faixa preta fica em foco (@04:40). Escolher "Effects and Masks" no menu do mapa (@05:12).
3. Animar o foco pelo Phase Shift do Colorama, com easy ease (@06:45 a @07:47).
4. Com mapa de profundidade real (passe de profundidade de um render 3D), animar o **Blur Focal Distance** para trocar o assunto em foco (@13:58). No mapa estilizado branco-preto-branco o Blur Focal Distance não funciona bem (@08:18, @14:30).
5. Bokeh bonito em ponto de luz pede 32 bpc e valores acima de 1 (@10:19, @11:22). Em 8 bpc fica chapado e com banding.
6. Exagerar o raio gera franja estranha; manter sutil (@15:02).

Ele também mostra por que máscara com feather sobre um blur comum fica falsa: só dissolve a transparência entre a versão borrada e a nítida, sem transição de desfoque (@03:07 a @04:08).

### Mapa de profundidade a partir da cena do After

Segundo a Adobe ([3D depth data extraction](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/work-with-3d-scene-depth-data/3d-depth-data-extraction.html)): pré-compor a cena 3D e aplicar **3D Channel Extract**. O mapa sai em cinza com **branco perto e preto longe**; Black Point e White Point ajustam a faixa. Os efeitos Depth of Field, Fog 3D e Depth Matte leem a profundidade direto, sem o Extract. O efeito **Depth Of Field** (3D Channel) tem Focal Plane e Maximum Radius e usa o canal auxiliar de profundidade ([3D Channel effects](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/3d-channel-effects.html)).

Atenção à convenção: no passe do Cinema 4D que Jake usa, o mais perto é preto (@13:28). No 3D Channel Extract da Adobe, o mais perto é branco. Como o Camera Lens Blur mede a diferença em relação ao Blur Focal Distance, a convenção só importa para escolher o valor do foco e para o Invert Blur Map.

### Desfoques baratos

Segundo Boone Loves Video [complementar] (JfM0o4UjMFU): Gaussian Blur com máscara invertida e feather grande (300 px) é o mais rápido e o menos realista (@02:37 a @03:39); Camera Lens Blur com mapa feito de sólido com máscara e feather (500 px) fica mais natural (@04:42 a @06:14); o plugin pago Bokeh fica melhor ainda. Tempos que ele mediu por quadro: ~0,4 s, ~3 s e ~7 s (@08:20).

## 5. Como compor com profundidade de campo

Regras práticas, aplicadas ao parallax de foto:

1. **Separar a foto em três planos: frente, meio, fundo.** Elias Sarantopoulos recorta os elementos no Photoshop e espalha em Z (H493T_1FplE @00:34, @02:18). Boone Loves Video [complementar] posiciona o texto em planos de foco diferentes para o DOF aparecer (JfM0o4UjMFU @00:31).
2. **Depois de fixar a distância em Z entre as fotos, ajustar só X e Y** para fechar buracos, sem mexer no Z (Elias, H493T_1FplE @03:21). Na skill, o Z vem com escala compensada `fator(z)`.
3. **Pôr o foco no assunto da frase.** O foco aponta o que importa naquele momento (Curren Sheldon, -UJq0O-H8YA @01:01).
4. **Puxada de foco conta a história em sequência.** Elias anima Focus Distance e Aperture de uma estátua para a outra (H493T_1FplE @07:49 a @09:39). Motion Science [complementar] leva o foco por "Boston 34", depois a senha, depois o login, acompanhando o que está sendo digitado (7tW81v5azpk @03:38 a @04:39).
5. **Começar fora de foco de propósito** e deixar a câmera "achar" o assunto ao entrar (Elias, H493T_1FplE @10:13). A skill já faz isso na entrada e na saída de cena.
6. **Primeiro plano desfocado como moldura.** Curren Sheldon chama de "sujar o primeiro plano": elementos fora de foco na frente emolduram o assunto, e fica fácil com lente longa, 85 ou 105 mm (-UJq0O-H8YA @06:15).
7. **Moldura dentro do quadro** (porta, janela, galho) dirige o olhar mesmo sem desfoque (Curren Sheldon @07:15).
8. **Linhas que levam ao assunto e tirar o que distrai** (Curren Sheldon @02:34).
9. **Luz separa o assunto**: o assunto como a coisa mais clara do quadro (Curren Sheldon @03:06). Liga com o estudo de luz e sombra.
10. **Movimento chama o olho.** Se o assunto se move ou a câmera o segue, não precisa de desfoque raso (Curren Sheldon @05:44).
11. **Fundo também pode andar.** Elias anima a foto do céu na direção oposta à da câmera para o fundo não ficar parado (H493T_1FplE @10:47).
12. **Ver a cena de cima.** Usar duas vistas (Top + Active Camera) para enxergar a linha do foco e as camadas (Elias @02:18 e @07:49; Motion Science [complementar] 7tW81v5azpk @03:05).

## 6. Qual desfoque usar em qual caso

| Caso | Use | Por quê |
|---|---|---|
| Fotos recortadas em camadas 3D + câmera, Classic 3D | DOF da câmera | Cada camada desfoca pela distância real; puxada de foco por Focus Distance; íris e highlight disponíveis |
| Cena com modelo 3D (GLB) ou material, Advanced 3D | DOF da câmera no Advanced 3D (26.3+) | Único renderer que mostra modelo 3D; sem íris, sem motion blur (teste da skill) |
| Foto única, sem camadas (foto plana) | Camera Lens Blur com mapa de profundidade | A câmera não tem o que separar; o mapa diz o que fica longe |
| Imagem 2D vinda de outro programa (Google Earth Studio, GEOlayers) | Camera Lens Blur com mapa ou máscara | Camada 2D não recebe o DOF da câmera |
| Cena 3D do After já pronta que precisa de ajuste fino depois | 3D Channel Extract + Camera Lens Blur, ou efeito Depth Of Field | Separa o desfoque da cena; permite mudar sem re-renderizar |
| Bokeh de luzes marcado, com cor | Camera Lens Blur ou DOF Classic com Highlight, em 32 bpc e espaço linear | A Adobe pede 32 bpc; Jake mostra o bloom só aparecendo assim |
| Prévia rápida ou prazo curto | Gaussian Blur com máscara, trocar no final | Mais rápido, menos realista (Boone) |

## 7. Valores de partida usados pelos autores

Todos "segundo o autor", não conferidos. Os valores de pixel dependem do tamanho da comp e da distância em Z, então servem só como ordem de grandeza.

- **Câmera:** two-node, preset 35 mm, DOF ligado na criação (Elias, H493T_1FplE @01:42). One-node, 35 mm, DOF desligado até compor (Motion Science [complementar], 5OS3DqBNnnU @03:07). TheBlade (abaixo do corte, L01HNH6rmgU @14:02) diz que quase sempre usa 35 ou 50 mm por serem fáceis de controlar e parecerem naturais.
- **Zoom:** ~4266 numa comp 1920 para fechar no assunto (Motion Science [complementar], 7tW81v5azpk @02:04). Pela conta f × 1920/36, isso é a lente de 80 mm (calculado).
- **Aperture:** 347 já mostra o efeito; ele usou 2500 num projeto de desfoque forte (Motion Science [complementar], 7tW81v5azpk @02:35). Aperture 1000 com Blur Level 200 % dá parecido com 2500 em 100 % (@05:10).
- **Blur Level:** 100 % na maior parte do tempo (Motion Science [complementar], 7tW81v5azpk @04:39; Motion Science, zgMHWFolli8 @17:37).
- **Iris Shape:** Fast Rectangle enquanto trabalha; Hexagon ou Heptagon no render final (Motion Science [complementar], 7tW81v5azpk @05:40 a @07:15; zgMHWFolli8 @18:09).
- **Camera Lens Blur:** Aspect Ratio 0,6 para oval anamórfico; Diffraction Fringe 500; Roundness 100 com triângulo para render mais rápido (Jake, EPw0nMrhP8E @01:36, @02:37, @15:33).
- **Advanced 3D:** Focus Area Width em 0 dá um plano fino em foco; ele baixou um valor para 25 antes de medir o render (o áudio não deixa claro qual controle); menos de 1 s por quadro com gravação de tela rodando (Jake, DK04C1mro-U @04:39, @05:09). Usar Draft 3D para acertar a câmera e só depois ajustar o DOF (@05:09).
- **Abertura de lente real para composição:** f/4 a f/5.6 já dá desfoque suficiente para separar (Curren Sheldon @02:02).
- **Da skill (testes próprios, não vídeo):** Classic 3D com abertura 350-420 e Blur Level 100 %; Advanced 3D com abertura ~90.
- **Tremor de mão:** `wiggle(5,25)` na posição da câmera, com sliders para controlar frequência e amplitude (Motion Science, zgMHWFolli8 @13:58).

## 8. Depende de

- **Desfoque raso é cinema ou é muleta?** Curren Sheldon diz que desfoque raso o tempo todo deixa o filme com cara barata e cansa, e que composição, luz e movimento dirigem o olhar com tudo nítido (-UJq0O-H8YA @00:00, @08:47). Breadfruit Studios (abaixo do corte, zQ31j39YyIc @03:51) trata o desfoque raso como técnica central de profundidade. Para Reel curto, o desfoque ajuda a ler rápido o que importa; para peça longa ou cena em que o ambiente conta, vale o conselho de Curren. A decisão fica com a peça.
- **O que mais borra o fundo: abertura, distância focal ou distância do fundo?** Epic Light Media (abaixo do corte, F5GL341bSwo @03:48) diz que é a distância focal. brainstorm.academy [complementar] diz para afastar o assunto do fundo quando a lente não abre muito (n4tEu_jelgI @20:17). A Adobe só diz que abertura maior desfoca mais. No After, a separação em Z entre assunto e fundo é o que está sob controle por script; teste para medir.
- **Lente muda a perspectiva?** brainstorm.academy [complementar] apresenta a mudança de distância focal como mudança de parallax (n4tEu_jelgI @14:33); DEZOLAS DOP [complementar] diz que a tele equivale a recortar uma grande angular e que a compressão vem da distância (OiAaIbTOfCQ @04:04). No After, o preset muda o Zoom e, para o mesmo enquadramento, a distância da câmera; quem cria a diferença de parallax é essa distância.
- **One-node ou two-node?** Elias usa two-node (H493T_1FplE @01:42); Motion Science prefere one-node ([complementar] 5OS3DqBNnnU @03:07) e diz que dá para trocar a qualquer hora (zgMHWFolli8 @01:51). A skill liga o auto-orient para o ponto de interesse (`AutoOrientType.CAMERA_OR_POINT_OF_INTEREST`), e a Adobe diz que isso equivale a uma câmera two-node.
- **Íris:** Motion Science quase nunca mexe nas propriedades de íris além da forma (7tW81v5azpk @01:33). Jake explora todas no Camera Lens Blur para estilizar (EPw0nMrhP8E). Para parallax de foto sem pontos de luz, a íris quase não aparece; com luzes no fundo, aparece muito.

## 9. Erros comuns

- Ligar o DOF e não ver nada: o padrão do preset desfoca pouco; precisa subir a abertura (Motion Science [complementar], 7tW81v5azpk @02:04).
- Camada sem o 3D ligado não desfoca; foto com pré-comp interna precisa do 3D dentro também (Motion Science [complementar], 5OS3DqBNnnU @03:38). A Adobe: câmera só afeta camada 3D.
- Fazer DOF falso com blur comum e máscara com feather: vira dissolve, sem transição de desfoque (Jake, EPw0nMrhP8E @03:38).
- Mapa de profundidade com tamanho diferente da camada: Jake recomenda mesma resolução em vez de "Stretch Map to Fit" (EPw0nMrhP8E @08:18).
- Bokeh em 8 bpc: chapado e com banding (Jake @11:22; Adobe pede 32 bpc).
- Exagerar o raio do Camera Lens Blur: franja estranha (Jake @15:02).
- Advanced 3D com "ondulação" ao animar o foco: subir Render Quality (Adobe).
- Trocar Zoom ou Focus Distance na timeline com Lock to Zoom ligado: destrava (Adobe).
- Achar que só trocar o Zoom com a câmera parada cria profundidade: escala tudo igual; parallax vem de mover a câmera (dedução da definição de Zoom da Adobe).
- Grande angular colada em rosto deforma (DEZOLAS DOP [complementar] OiAaIbTOfCQ @03:04; brainstorm.academy [complementar] n4tEu_jelgI @12:25). Vale para foto de pessoa num parallax com câmera em 15-24 mm muito perto.

## 10. Notas para fazer por script

**Nomes confirmados** no guia de scripting da comunidade ([docsforadobe, Camera Layer match names](https://ae-scripting.docsforadobe.dev/matchnames/layer/cameralayer/)); não estão na helpx da Adobe, e os da câmera já rodam na `ae_3d_lib.jsx`:

| Propriedade | matchName |
|---|---|
| Camera Options (grupo) | `ADBE Camera Options Group` |
| Zoom | `ADBE Camera Zoom` |
| Depth of Field | `ADBE Camera Depth of Field` |
| Focus Distance | `ADBE Camera Focus Distance` |
| Aperture | `ADBE Camera Aperture` |
| Blur Level | `ADBE Camera Blur Level` |
| Iris Shape | `ADBE Iris Shape` |
| Iris Rotation | `ADBE Iris Rotation` |
| Iris Roundness | `ADBE Iris Roundness` |
| Iris Aspect Ratio | `ADBE Iris Aspect Ratio` |
| Iris Diffraction Fringe | `ADBE Iris Diffraction Fringe` |
| Highlight Gain | `ADBE Iris Highlight Gain` |
| Highlight Threshold | `ADBE Iris Highlight Threshold` |
| Highlight Saturation | `ADBE Iris Hightlight Saturation` (com o erro "Hightlight" no próprio nome) |

Efeitos ([docsforadobe, first-party effects](https://ae-scripting.docsforadobe.dev/matchnames/effects/firstparty/)): Camera Lens Blur `ADBE Camera Lens Blur`; Gaussian Blur `ADBE Gaussian Blur 2`; Compound Blur `ADBE Compound Blur`; Fast Box Blur `ADBE Box Blur2`; Gradient Ramp `ADBE Ramp`; 3D Channel Extract `ADBE AUX CHANNEL EXTRACT`; Depth Of Field `ADBE DEPTH FIELD`; Fog 3D `ADBE FOG_3D`; Depth Matte `ADBE DEPTH MATTE`. Os índices e matchNames dos controles internos do Camera Lens Blur (Blur Radius, Blur Map Layer, Blur Focal Distance): **não conferidos**.

**Renderer da comp:** a documentação só diz que `CompItem.renderer` aceita os valores de `CompItem.renderers` ([docsforadobe, CompItem](https://ae-scripting.docsforadobe.dev/item/compitem/)). Na skill, testado no AE 26.5: `"ADBE Advanced 3d"` é o **Classic 3D** (nome interno antigo) e `"ADBE Calder"` é o **Advanced 3D**. Conferido na prática pela skill, não pela Adobe.

**Não conferido:** matchName de Focus Area Width e Near/Far Blur Level do Advanced 3D. Para descobrir na máquina, rodar numa comp Advanced 3D com câmera:

```
var op = app.project.activeItem.layer("cam").property("ADBE Camera Options Group");
var s = ""; for (var i = 1; i <= op.numProperties; i++) s += op.property(i).matchName + " = " + op.property(i).name + "\n";
alert(s);
```

**Foco por script:**

- O jeito da Adobe para seguir uma camada é "Link Focus Distance to Layer"; para o ponto de interesse, `length(position, pointOfInterest)`.
- A skill usa a projeção no eixo da câmera, `dot(FOCO - câmera, eixo Z da câmera)`, que é a distância ao plano de foco e não muda quando o alvo sai do centro. A expressão da Adobe mede a distância em linha reta; as duas dão o mesmo valor só com o alvo no centro do quadro (geometria, não conferido na Adobe).
- Puxada de foco: animar a posição do null FOCO entre as camadas com easy ease, que é o que Elias e Motion Science fazem à mão com Focus Distance.

**Conta de lente por script (calculado):** Zoom ≈ f × largura da comp / 36 com Film Size de 36 mm na horizontal. Num Reel 1080: 35 mm → 1050; 50 mm → 1500. Conferir na janela Camera Settings antes de gravar como constante, porque `addCamera` não recebe preset e o Film Size pode estar medido na vertical.
