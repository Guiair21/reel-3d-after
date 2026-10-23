# Referências de fotografia e composição para cenas de parallax

Estudo de 20/10/2026 para a skill `reel-3d-after`. Versão 2: a parte B foi refeita com foco em estilo e técnica. Biografia, prêmio e museu saíram; obra entra só como ponto de olhar.

Base: 14 vídeos finalistas do YouTube (notas em `fontes.md`) e fontes escritas (entrevistas, fichas técnicas de museu, relatos de produção). Tudo que veio de vídeo aparece como "segundo <autor> (id @mm:ss)". Para abrir o trecho: `https://www.youtube.com/watch?v=<id>&t=<segundos>s`. Afirmações de técnica tiradas dos vídeos estão em `a-conferir.md`. O que é dedução minha está marcado como **inferência**.

| Autor | id | Assunto |
|---|---|---|
| Roger Deakins | upJw7AqLeeQ | 1917 comentado por ele |
| Roger Deakins (GQ) | CZ76u0WHXXI | Deakins comenta os próprios filmes |
| Roger e James Deakins (DePaul) | XYSfh1SQF14 | Oficina de luz com alunos |
| Letizia Treves, curadora da National Gallery | 1KcdgFxmnb4 | Estilo de Caravaggio em três quadros |
| ARTEnet | vzhi-jeKADo | Técnica de pintura de Caravaggio |
| Neil Blevins (ArtOfSoulburn) | RG83v_oQ4DY | Primeiro plano, meio e fundo |
| StudioBinder | hUmZldt0DTg | Elementos de composição |
| The Raw Society | rtMBGUNcxSY | Compor em camadas |
| Sean Gallagher | GG8M1Huo_2g | Composição numa reportagem da National Geographic |
| Ted Forbes | tmnXHPjhSIM | Fan Ho |
| Ted Forbes | RJdIJkt3Gz8 | Saul Leiter |
| Tavis Leaf Glover | iT4m9zv79hk | Foto de grupo de Annie Leibovitz |
| Alex Webb (Aperture) | DCHeVfiE1r4 | Webb apresenta 30 anos de cor |
| Sean Tucker | WlTaCD92EFA | O que aprendeu de cor com Alex Webb |

---

## Parte 0. Parâmetros base do After para parallax 2.5D

Geometria da câmera do After, que vale para todas as receitas da parte B. Isso é cálculo, não vem de vídeo.

- **Comp:** 1080 × 1920, 3D Clássico (o desfoque de profundidade de campo da câmera funciona no Renderizador 3D Clássico).
- **Lente:** nas Configurações da Câmera, o tamanho do filme padrão é 36 mm. Com isso, Zoom (px) = 1080 × mm ÷ 36. Então 24 mm ≈ 720 px, 35 mm ≈ 1050 px, 50 mm = 1500 px, 85 mm = 2550 px, 135 mm = 4050 px, 150 mm = 4500 px.
- **Tamanho aparente:** uma camada a uma distância D da câmera aparece com escala Zoom ÷ D. Para uma foto de 1080 px de largura parecer ocupar o quadro, use escala = D ÷ Zoom × 100%. Exemplo, lente de 35 mm (Zoom 1050) e fundo a 3000 px: escala ≈ 286%.
- **Quanto anda cada plano:** num movimento lateral da câmera, o deslocamento na tela é proporcional a Zoom ÷ D. Um plano a 500 px anda 6 vezes mais que um plano a 3000 px. Lente longa com câmera longe dá parallax pequeno; lente curta com câmera perto dá parallax grande.
- **Foco:** Distância de Foco = distância da câmera até o assunto. A abertura em px controla a força do desfoque (comece com 25 a 60 px para foco "de cinema" e suba devagar). Nível de Desfoque 100%.
- **Luz:** luzes Ponto, Spot, Paralela e Ambiente. Para sombra: a luz com "Projeta Sombras" ligado, a camada que faz sombra com "Projeta Sombras" e a que recebe com "Aceita Sombras". Escuridão e Difusão da Sombra controlam dureza (difusão 0 = sombra dura, 30 a 80 px = suave).
- **Névoa:** sólido com Ruído Fractal (contraste baixo, evolução animada lenta), modo Tela ou Adicionar, opacidade 10 a 30%, em uma ou mais camadas com Z próprio entre os planos.
- **Grão:** Adicionar Grão ou Ruído numa camada de ajuste no topo, fora do 3D, depois de toda a cor.

---

## Parte A. Princípios de composição de profundidade

Cada princípio traz a origem, o que fazer no quadro 9:16 e o ajuste no After. As partes "no 9:16" e "no After" são **inferência** minha a partir do princípio.

### A1. Três planos, cada um com uma função

Segundo StudioBinder (hUmZldt0DTg @08:35), o filme é um meio 2D que representa espaço 3D, e o caminho é dividir em primeiro plano, plano médio e fundo, usando cada plano para hierarquia de sentido; no exemplo de Cidadão Kane, cada personagem ocupa um plano (hUmZldt0DTg @09:07). Segundo Blevins (RG83v_oQ4DY @00:01), é isso que leva o olho até o ponto focal, e no estudo dele o assunto mora no meio.

- **No 9:16:** três faixas empilhadas. Base = primeiro plano, terço do meio = assunto, topo = fundo.
- **No After:** com lente de 35 mm, um ponto de partida é primeiro plano a 300 a 600 px da câmera, assunto a 1000 a 1500 px, fundo a 2500 a 5000 px. Compense a escala com a fórmula da parte 0.

### A2. Valor tonal por plano (os três esquemas de Blevins)

Segundo Blevins (RG83v_oQ4DY @01:03), a maior parte das cenas cai em três esquemas:

1. **Frente escura, meio claro, fundo mais claro.** Imita a névoa atmosférica ao ar livre (RG83v_oQ4DY @01:34 e @02:06). A frente escura funciona como plataforma do espectador ou moldura (RG83v_oQ4DY @02:36).
2. **Frente escura, meio claro, fundo escuro.** Refletor no plano médio, efeito de palco (RG83v_oQ4DY @05:52 a @06:43). O fundo só precisa ser mais escuro que o meio (RG83v_oQ4DY @07:16).
3. **Frente escura, meio escuro, fundo claro.** Contraluz, maior contraste, silhueta e mistério (RG83v_oQ4DY @08:18 a @08:51).

Detalhes do mesmo autor: o detalhe fica no meio, com frente escura e fundo enevoado (RG83v_oQ4DY @04:38); o fundo pede 4 ou 5 degraus de valor (RG83v_oQ4DY @03:07); vinheta substitui o objeto escuro da frente (RG83v_oQ4DY @03:37); escuro embaixo e claro em cima parece natural, o inverso oprime (RG83v_oQ4DY @10:30 a @11:24).

- **No After:** escolha o esquema antes de montar. Curvas por camada: frente com os pretos baixados (saída do ponto preto em 0 a 5%), fundo com o ponto preto levantado (10 a 25%) e contraste menor. Vinheta em camada de ajuste fora do 3D.

### A3. Perspectiva atmosférica

Segundo Blevins (RG83v_oQ4DY @02:06), o ar tem pequena opacidade; quanto mais ar, mais claro e menos definido.

- **No After:** em cada faixa de fundo, efeito Preencher na cor do céu com opacidade crescente (por exemplo 10%, 20%, 35%, 50% conforme o Z), mais saturação menor. Uma camada de névoa (parte 0) entre o meio e o fundo.

### A4. Moldura dentro do quadro

Segundo StudioBinder (hUmZldt0DTg @04:47), formas criam quadros dentro do quadro e reduzem a área de foco. Segundo Gallagher (GG8M1Huo_2g @02:37 e @03:38), porta, janela ou linhas de prédios servem de moldura, e ele combina batente de porta com a regra dos terços. Segundo Blevins (RG83v_oQ4DY @02:36), objeto escuro perto da câmera em volta da figura "emoldura o personagem".

- **No After:** a moldura é a camada mais perto da câmera, escura e fora de foco. Ela é a que mais anda no movimento e "revela" o assunto.

### A5. Linhas que levam o olho

Segundo StudioBinder (hUmZldt0DTg @03:14 a @03:45), verticais sugerem altura, horizontais calma, diagonais energia, e linhas de fuga puxam o olho ao assunto. Segundo Gallagher (GG8M1Huo_2g @06:45 a @07:45), rio e estrada que diminuem levam o olho da frente ao fundo.

- **No After:** linha de fuga numa camada de frente para a câmera não ganha perspectiva no movimento. Deite o chão (Rotação X 90°) ou corte em 2 ou 3 faixas de Z diferente.

### A6. Escala humana

Segundo Forbes, nos trilhos de Fan Ho a força vem da escala: estrutura enorme e duas figuras pequenas no canto (tmnXHPjhSIM @02:36). Segundo StudioBinder (hUmZldt0DTg @06:52 a @07:27), quanto maior no quadro, mais importância; plano aberto isola.

- **No After:** a figura fica no mesmo Z do chão que ela pisa. Figura solta em outro Z desliza e entrega a montagem.

### A7. Sobreposição e camadas que conversam

Segundo The Raw Society (rtMBGUNcxSY @06:16 a @07:16), compor em camadas começa pelo fundo, escolhendo um espaço onde ações podem se cruzar, e a pessoa mais perto da câmera muitas vezes não é o centro de atenção. No exemplo, o cavalo fica atrás do grupo sem sobrepor (rtMBGUNcxSY @09:20).

- **No After:** monte do fundo para a frente. Confira o primeiro e o último quadro do movimento: o parallax muda a sobreposição.

### A8. Primeiro plano que obstrui

Segundo Forbes, Leiter fotografa de baixo de toldos que ocupam grande parte do quadro (RJdIJkt3Gz8 @14:25), por janela embaçada com uma parte limpa (RJdIJkt3Gz8 @07:43) e por reflexo de vitrine, com efeito de colagem sem manipulação (RJdIJkt3Gz8 @06:11).

- **No After:** bloco escuro ou vidro com gotas a 200 a 400 px da câmera, desfocado; assunto pequeno na faixa que sobra.

### A9. Regra dos terços e quando quebrar

Segundo StudioBinder (hUmZldt0DTg @02:43), assunto num dos quatro cruzamentos. Segundo Gallagher (GG8M1Huo_2g @01:35), a regra ainda é base de foto profissional, e o centro funciona com vegetação na frente e leve inclinação (GG8M1Huo_2g @05:13 a @05:43). Segundo Forbes, assunto colado na borda chama mais atenção e cria mistério (RJdIJkt3Gz8 @11:51 a @12:21).

- **No After:** a posição do assunto muda durante o movimento. Componha o quadro final e verifique o inicial.

### A10. Espaço negativo e simplificação

Segundo StudioBinder (hUmZldt0DTg @07:27), mais espaço à frente do olhar. Segundo Forbes (tmnXHPjhSIM @05:42 a @06:14), o high key de Fan Ho apaga textura e deixa o essencial.

- **No After:** vazio também precisa de gradiente ou névoa com Z próprio; céu chapado vira buraco quando a câmera anda.

### A11. Luz que separa os planos

Segundo StudioBinder (hUmZldt0DTg @13:54), o olho vai para o mais claro. Segundo Deakins (upJw7AqLeeQ @12:08), em 1917 ele pôs sacos de areia para a cabeça do ator ficar contra o preto, e quis uma fenda longa de luz lateral (upJw7AqLeeQ @11:08). Segundo Forbes (tmnXHPjhSIM @09:16 e @10:49), Fan Ho trabalha com quase três tons e destaca a figura dentro do feixe.

- **No After:** atrás da cabeça recortada, uma camada escura de 30 a 60% de opacidade com máscara suave, no Z do fundo.

### A12. Foco e profundidade de campo

Segundo StudioBinder (hUmZldt0DTg @08:35 a @09:07), o foco raso isola, a passagem de foco puxa a atenção, o foco profundo permite várias camadas. Segundo Blevins (RG83v_oQ4DY @03:07), o escuro muito perto da câmera fica melhor desfocado.

- **No After:** Distância de Foco presa ao Z do assunto (expressão ligando à posição da camada). Puxada de foco = animar a Distância de Foco do primeiro plano para o assunto em 12 a 24 quadros.

### A13. Escolha da lente e compressão

Segundo The Raw Society (rtMBGUNcxSY @02:39 a @05:46), para camadas ele usa de 28 a 50 mm, de preferência 35 mm; acima de 50 mm a compressão muda a estética.

- **No After:** veja a parte 0. Escolha uma lente por cena e não troque no meio.

### A14. Geometria escondida

Segundo Glover (iT4m9zv79hk @14:37 a @16:13), na foto de grupo de Leibovitz cabeças e braços se alinham com diagonais da grade de simetria dinâmica; não precisa ser exato porque o olho lê como a mesma diagonal (iT4m9zv79hk @17:17).

- **No After:** diagonais de luz e de linha moram no mesmo Z do assunto.

### A15. Luz consistente entre camadas

Segundo Glover (iT4m9zv79hk @05:10 a @07:45), a foto de grupo de Leibovitz é composite, e uma pista é a luz: pela lei do inverso do quadrado, quem está ao dobro da distância da fonte recebe um quarto da luz. Segundo Deakins (upJw7AqLeeQ @07:22), a luz dos sinalizadores de 1917 foi planejada com maquete e LEDs.

- **No After:** iguale direção da luz, temperatura de cor e nível de preto entre as camadas antes de animar. Teste: dessature a comp e confira se os planos seguem o esquema de A2.

### A16. Quadro vertical 9:16 (síntese, inferência)

StudioBinder lembra que a proporção do quadro muda as considerações de composição (hUmZldt0DTg @01:06 a @01:40). Aplicação: planos empilhados na vertical, molduras verticais, movimentos de subida ou de empurrão para dentro de uma moldura, espaço negativo reservado para o texto e assunto longe da faixa de baixo onde ficam legenda e botões do Instagram.

---

## Parte B. Biblioteca de estilo e técnica

Cada ficha tem quatro blocos: **Estilo** (o que se vê), **Técnica** (como chega lá, com fonte), **Receita no After** (2.5D, valores de partida) e **Para olhar** (obra de exemplo).

Ficaram de fora desta versão: Rembrandt, Vivian Maier, Steve McCurry, Annie Leibovitz como ficha e Vittorio Storaro. Para eles não achei técnica documentada com fonte boa o bastante nesta rodada. A lição de Leibovitz (composite pela luz) está em A15.

### B1. Saul Leiter

**Estilo.** Primeiro plano obstruído ocupando grande parte do quadro (toldo, vidro, neve), sujeito pequeno e às vezes cortado na borda, reflexos que sobrepõem cenas, cor dessaturada com um acento pequeno de vermelho, planos achatados como colagem. Segundo Forbes, há fotos em que o preto toma cerca de 80% da imagem (RJdIJkt3Gz8 @14:25) e vermelhos pequenos colocados com cuidado (RJdIJkt3Gz8 @10:17).

**Técnica.**
- **Lente:** teleobjetiva. Numa entrevista à Time, reproduzida por [Eric Kim](https://erickimphotography.com/blog/2013/11/04/7-lessons-saul-leiter-has-taught-me-about-street-photography/), ele diz gostar tanto da tele quanto da 50 mm e ter tido uma 150 mm de que gostava muito; [James Maher](https://jamesmaherphotography.com/street_photography/saul-leiter/) também descreve o uso frequente da 150 mm. Fonte secundária: o texto original da Time não foi localizado.
- **Filme e cor:** segundo Forbes, ele gostava de filme vencido ou mal guardado, e isso ajuda nas cores abafadas (RJdIJkt3Gz8 @09:16). James Maher fala em Kodachrome e outros cromos vencidos, por serem baratos (secundária).
- **Método:** fotografar através de coisas: vitrine, janela molhada, neve fora de foco (RJdIJkt3Gz8 @06:11, @07:43, @08:46). A frase "uma janela coberta de gotas de chuva me interessa mais que a foto de uma pessoa famosa" é dele no documentário *In No Great Hurry*, segundo a [Hollywood Reporter](https://www.hollywoodreporter.com/review/no-great-hurry-film-review-668725) (paráfrase; não li a transcrição do filme). Em entrevista à [Aperture](https://aperture.org/editorial/saul-leiter-east-village/) ele diz: "às vezes eu digo que o tempo está do lado do fotógrafo" e admite "uma fraqueza por guarda-chuvas vermelhos".
- **Posição da câmera:** de dentro para fora (atrás de vitrine, embaixo de toldo), com o sujeito longe. **Inferência** a partir das obras.

**Receita no After.**
- Lente: 135 ou 150 mm (Zoom 4050 a 4500 px). Câmera longe: vidro a 1200 px, sujeito a 4000 px, fundo a 6000 px. O parallax fica pequeno e os planos parecem colados.
- Foco no sujeito, abertura 80 a 150 px para o vidro virar mancha.
- Planos: (1) vidro com gotas ou condensação, máscara com uma área "limpa"; (2) reflexo de vitrine em modo Tela a 20 a 40%, Z ligeiramente diferente do vidro; (3) sujeito pequeno com acento de vermelho; (4) rua de fundo.
- Ou o bloco escuro: sólido quase preto ou foto de toldo ocupando 50 a 80% do quadro, a 600 px, desfocado.
- Luz: dia nublado ou chuva, sem luz 3D; só uma Ambiente se precisar.
- Cor: Matiz/Saturação global −30 a −50, curva com pretos levantados (filme vencido), máscara para manter o vermelho saturado. Balanço levemente quente nos realces.
- Grão: médio, visível.
- Movimento: lateral lento de 20 a 60 px em 5 segundos.

**Para olhar.** *Snow* ([Saint Louis Art Museum](https://www.slam.org/collection/objects/49920)); *Red Umbrella* (crédito no [Foam](https://www.foam.org/press/saul-leiter)).

### B2. Fan Ho

**Estilo.** Preto e branco de alto contraste, quase só três tons (preto, branco, pouco meio-tom), sombras longas como formas geométricas, feixes de luz e fumaça, figura humana pequena no feixe, high key em cenas de névoa. Segundo Forbes (tmnXHPjhSIM @09:16, @04:07, @05:42).

**Técnica.** Em entrevista ao [Leica Liker](https://leicaliker.com/2013/01/11/fan-ho-hong-kong-master-street-photographer-1/), nas palavras dele (tradução minha):
- **Câmera:** "Rolleiflex e às vezes Leica"; usava uma câmera só.
- **Formato e recorte:** gostava do negativo quadrado porque servia para recortar "vertical e horizontalmente. Essa é minha marca."
- **Luz:** "Gosto do sol baixo para ter sombras longas." Muitas fotos foram feitas "no mesmo lugar em horas diferentes do dia e do ano".
- **Método:** "Encontro um lugar e fico de tocaia por um tempo", esperando "os atores chegarem às marcas".
- **Laboratório:** fazia as próprias cópias; mais tarde usou Photoshop e Lightroom.
- **Encenação e sombra no laboratório:** fontes secundárias ([Ocula, Blue Lotus Gallery](https://ocula.com/artists/fan-ho/)) dizem que *Approaching Shadow* foi encenada com uma prima e que a sombra diagonal foi acrescentada no laboratório. Segundo um vídeo não finalista da The Photographic Eye, Fan Ho teria dito que algumas cenas foram montadas e que a fumaça foi produzida (a conferir).

**Receita no After.**
- Lente: 50 a 80 mm (Zoom 1500 a 2400 px). Composição pensada para recorte vertical, o que encaixa no 9:16.
- Planos: (1) parede ou escada em perspectiva (camada deitada ou em 2 faixas), (2) figura pequena, (3) fundo quase preto.
- Luz: Luz Spot ou Paralela dura, ângulo baixo e lateral (sol baixo), "Projeta Sombras" ligado, Difusão da Sombra 0 a 5 px. Uma segunda camada de feixe: sólido branco com máscara em faixa diagonal, Desfoque Gaussiano 40 a 80 px, modo Adicionar, Z entre câmera e figura.
- Fumaça: Ruído Fractal com contraste baixo, opacidade 20 a 40%, só dentro do feixe (máscara igual à do feixe).
- Sombra "de laboratório": máscara em diagonal escurecendo 40 a 60% a parede, no Z da parede.
- Cor: Preto e Branco, curva em S forte, pretos esmagados, realces quase estourados.
- Grão: médio a forte.
- Movimento: quase parado; um empurrão de 2 a 4% em 5 segundos.

**Para olhar.** *Approaching Shadow* ([Christie's](https://christies.com.cn/lot/lot-6131938)); *Afternoon Chat* ([SFO Museum](https://www.sfomuseum.org/exhibitions/fan-ho-hong-kong-yesterday-1950s-1960s/gallery)).

### B3. Henri Cartier-Bresson

**Estilo.** Preto e branco, geometria forte (escada, curva, reflexo na água), figura entrando no ponto exato da composição, perspectiva de olho humano, quadro inteiro sem recorte.

**Técnica.**
- **Lente e câmera:** Leica 35 mm (formato) com lente normal de 50 mm na maior parte da obra e às vezes grande angular em paisagem, segundo o [All About Photo](https://www.all-about-photo.com/photographer/29/henri-cartier-bresson) (secundária).
- **Sem recorte:** a mesma fonte diz que ele fazia as cópias com o quadro inteiro, incluindo a borda preta do negativo, como prova de que não recortava (secundária).
- **Método:** esperar a cena dentro da geometria. A ficha do [Nelson-Atkins](https://art.nelson-atkins.org/objects/47758/hyeres-france) para *Hyères* diz que ele ficou no alto da escada esperando algo animar o quadro.
- **Geometria:** segundo StudioBinder, ele usava a espiral áurea (hUmZldt0DTg @10:42); trata-se de leitura de analistas, a conferir.

**Receita no After.**
- Lente: 50 mm (Zoom 1500 px), câmera na altura do olho ou de cima para baixo como em *Hyères*.
- Planos: cenário geométrico em 1 ou 2 camadas (escada e chão), figura em movimento como camada própria.
- Movimento: câmera quase parada; o "evento" é a figura chegando ao ponto da linha (animação de posição da figura, 1 a 2 segundos) e a câmera assentando junto.
- Luz: dia, sol médio, sombra 3D dura (Difusão 0 a 10 px).
- Cor: Preto e Branco, contraste médio, sem esmagar pretos.
- Grão: fino.
- Moldura: borda preta fina (6 a 10 px) como citação ao quadro inteiro, opcional.

**Para olhar.** *Hyères, France* ([MFAH](https://emuseum.mfah.org/objects/118699/hyeres-france)); *Behind the Gare Saint-Lazare* ([MoMA](https://www.moma.org/collection/works/98333)).

### B4. Alex Webb

**Estilo.** Cor saturada em blocos (vermelho, verde, amarelo, azul), sombras duras e pretos profundos dividindo o quadro, várias ações em vários planos, rostos às vezes quase no preto. Segundo Tucker (WlTaCD92EFA @04:41, @05:12, @06:13).

**Técnica.**
- **Luz:** ele foi para a cor por causa da "luz que queima" e da cor vibrante desses lugares, nas palavras dele (DCHeVfiE1r4 @03:09). Luz dura de sol tropical. Ele publicou um livro chamado *Hot Light/Half-Made Worlds* (DCHeVfiE1r4 @05:28).
- **Filme:** Kodachrome, segundo Tucker (WlTaCD92EFA @08:17) e segundo a entrevista à Shutterbug citada em busca (não consegui abrir a página).
- **Lente:** Leica com 28 e 35 mm, segundo o blog [About Photography](https://aboutphotography.blog/photographer/alex-webb) (secundária).
- **Exposição:** segundo Tucker, para trazer o preto rico para a cor é preciso proteger os realces e aceitar as sombras (WlTaCD92EFA @09:53).
- **Método:** andar com a câmera, em palavras dele (DCHeVfiE1r4 @00:02). Segundo Tucker, ele arma o quadro e espera o elemento humano acontecer (WlTaCD92EFA @04:10).

**Receita no After.**
- Lente: 28 a 35 mm (Zoom 840 a 1050 px). Câmera perto: primeiro plano a 300 px, ação do meio a 900 px, fundo a 2000 px. Parallax forte.
- Planos: (1) figura ou objeto de cor no primeiro plano, (2) ação no meio, (3) parede de cor chapada ou porta com outra cena.
- Luz: Luz Paralela dura, alta e lateral (sol forte), "Projeta Sombras" ligado, Difusão 0, Escuridão da Sombra 80 a 100%. Paredes recebem sombra.
- Cor: exposição baixada para proteger o céu; curva com pretos esmagados; Vibração +20 a +40 e saturação seletiva de vermelho e verde; azuis escurecidos.
- Grão: fino, sem dessaturar.
- Movimento: lateral de 60 a 120 px em 5 segundos para os planos se cruzarem.

**Para olhar.** *Enfants jouant sur les étendues de sel, Les Gonaïves* ([Centre Pompidou](https://www.centrepompidou.fr/en/ressources/oeuvre/cEbBB9R)); livro *Under a Grudging Sun* ([Magnum](https://store.magnumphotos.com/products/under-a-grudging-sun)).

### B5. Gregory Crewdson

**Estilo.** Foto parada que parece plano de cinema: cidade pequena ao anoitecer, várias fontes de luz artificial visíveis (janelas, postes, faróis), névoa baixa, tudo nítido de frente a fundo, personagens imóveis.

**Técnica.**
- **Câmera:** Sinar 8×10 de filme por muitos anos, depois Phase One P65+ em câmera técnica Cambo 5005 e lentes Rodenstock, segundo a [Capture Integration](https://captureintegration.com/?p=31001), empresa que fornece o sistema.
- **Foco total:** a mesma fonte diz que no 8×10 a profundidade de campo era muito curta e cada imagem precisava de um empilhamento de foco de 9 a 10 exposições; no digital, 2 ou 3.
- **Composite:** várias exposições da mesma cena combinadas no digital, segundo fontes secundárias da busca (a conferir).
- **Luz:** equipe de cinema com diretor de fotografia e equipe de luz; luz contínua; luz artificial combinada com o sol se pondo para um efeito "entre o dia e a noite", segundo relato de palestra no [Brown Daily Herald](https://www.browndailyherald.com/article/2013/11/famed-photographer-gives-snapshot-of-career) (não consegui abrir a página; texto visto no resumo da busca). Segundo a [Gagosian](https://gagosian.com/exhibitions/2005/gregory-crewdson-beneath-the-roses/), *Beneath the Roses* foi feito com equipe completa, em estúdio e em cidades pequenas.
- **Encenação:** segundo Tatiana Hopper (vídeo não finalista), ele usa máquinas de fumaça, gruas e luzes de balão, e atores que seguram poses (a conferir).

**Receita no After.**
- Lente: 35 a 50 mm (Zoom 1050 a 1500 px), câmera na altura do olho, simétrica ou frontal.
- Foco: profundidade de campo da câmera desligada (tudo nítido, como no empilhamento de foco).
- Planos: (1) rua ou gramado, (2) casa ou carro com personagem, (3) casas e árvores de fundo, (4) céu de crepúsculo.
- Luz: céu azul profundo (curva no céu puxando para azul ciano escuro); cada janela, poste e farol é uma camada de brilho própria (sólido quente com Brilho, modo Adicionar) e, se houver geometria 3D, uma Luz Ponto quente (2700 a 3200 K, laranja) com queda de intensidade.
- Névoa: duas camadas baixas de Ruído Fractal, uma entre a frente e o meio, outra entre o meio e o fundo, opacidade 15 a 30%.
- Cor: dupla temperatura (azul no ambiente, laranja nas fontes), saturação moderada, pretos não esmagados.
- Grão: fino.
- Movimento: empurrão muito lento, 1 a 3% em 6 a 8 segundos.

**Para olhar.** Série *Beneath the Roses* ([Gagosian](https://gagosian.com/exhibitions/2005/gregory-crewdson-beneath-the-roses/), [White Cube](https://whitecube.com/gallery-exhibitions/beneath-the-roses)).

### B6. Roger Deakins

**Estilo.** Luz que parece vir de fontes reais da cena, poucas sombras, separação clara entre rosto e fundo, contraste alto sem estourar, figuras solitárias em espaços grandes. Ele diz: "gosto de pessoas solitárias em espaços grandes" (CZ76u0WHXXI @18:54).

**Técnica.** Tudo nas palavras dele:
- **Fontes da cena:** em *Prisoners*, não dava para pôr luz na rua, então usou os postes e as lojas acesas (CZ76u0WHXXI @04:07). Em *Onde os Fracos Não Têm Vez*, escolheu quais postes ficavam acesos, porque todos acesos deixava a cena "chapada", e pôs luzes pequenas em pontos específicos nos telhados (CZ76u0WHXXI @14:45).
- **Uma sombra:** "Normalmente não uso duas luzes e duas sombras, porque não é real"; quando usou, foi por motivo dramático (CZ76u0WHXXI @15:47).
- **Fogo:** em *Soldado Anônimo*, iluminou com lâmpadas comuns em dimmers sequenciais para dar tremulação; em 1917, uma grande torre de lâmpadas balanceadas uma a uma (CZ76u0WHXXI @02:02 a @02:34; upJw7AqLeeQ @08:56).
- **Separação:** sacos de areia para a cabeça ficar contra o preto e diafragma fechado para garantir a separação (upJw7AqLeeQ @12:08 a @12:39). Fenda longa de luz lateral (upJw7AqLeeQ @11:08).
- **Cor da luz:** LEDs para controlar intensidade e temperatura de cor entre dentro e fora, porque a luz do fim do dia vai ficando mais azul (CZ76u0WHXXI @24:46).
- **Fundo:** em *Blade Runner 2049*, a cena de Las Vegas foi feita com cortinas pretas em volta e luz programada de show (CZ76u0WHXXI @26:50).
- **Oficina:** sugeriu luz quente e suave rebatida num rebatedor dourado com a fonte reduzida em cerca de 30% (XYSfh1SQF14 @00:33); silhueta contra uma lâmpada pequena imitando poste de sódio (XYSfh1SQF14 @01:36); luz entrando por frestas com gelatinas de cores diferentes (XYSfh1SQF14 @04:18).
- **Câmera:** "não acho que se deva mover a câmera sem um motivo muito importante" (CZ76u0WHXXI @00:00).
- **Vinheta:** em *O Assassinato de Jesse James*, usou a vinheta de lente de câmera antiga para entrar e sair das sequências (CZ76u0WHXXI @21:09).

**Receita no After.**
- Lente: 35 a 50 mm (Zoom 1050 a 1500 px), câmera parada ou com movimento curto e motivado.
- Planos: (1) primeiro plano escuro (parede, batente), (2) personagem, (3) fundo com uma fonte prática visível (janela, poste).
- Luz: uma Luz Spot como fonte principal, motivada pela fonte visível (mesma direção e cor), Cone 60 a 90°, Difusão da Sombra 20 a 40 px. Uma Ambiente bem baixa (5 a 10%) para não perder o preto. Evite segunda luz que projete sombra.
- Separação: camada escura atrás da cabeça no Z do fundo (A11) ou um contorno de luz fraco pelo lado da fonte.
- Cor: fonte prática quente (sódio, tungstênio) contra ambiente frio; curva com pretos profundos e realces protegidos.
- Névoa: leve (10 a 15%) para o feixe de luz aparecer.
- Grão: fino.

**Para olhar.** *1917* e *Blade Runner 2049* (fotografia premiada: [Oscars.org 2020](https://www.oscars.org/oscars/ceremonies/2020), [Oscars.org 2018](https://www.oscars.org/oscars/ceremonies/2018)).

### B7. Emmanuel Lubezki

**Estilo.** Luz natural suave de céu, horas de amanhecer e anoitecer, câmera perto dos atores com lente bem aberta mostrando o ambiente inteiro, movimento contínuo.

**Técnica.**
- **Luz natural:** em *O Regresso*, segundo entrevista à [Adorama](https://www.adorama.com/alc/the-revenant-shooting-under-extreme-conditions/), ele diz que a ideia de usar luz natural veio para o público sentir "que aquilo está acontecendo de verdade", e que as paisagens eram grandes demais para iluminar.
- **Digital por sensibilidade:** escolheu a Alexa 65 digital porque o filme não tinha sensibilidade para as cenas de amanhecer e anoitecer (mesma fonte). A [ARRI](https://www.arri.com/news-en/alexa-xt-and-alexa-65-on-the-revenant-) informa ALEXA XT e M como câmeras principais e ALEXA 65 em parte do filme.
- **Lente:** lentes muito abertas para mostrar o ambiente e ficar perto do ator, segundo citação vista em busca (fonte não aberta; a conferir).

**Receita no After.**
- Lente: 16 a 24 mm (Zoom 480 a 720 px). Câmera muito perto do assunto (600 a 800 px), fundo bem longe.
- Planos: (1) galhos ou neve muito perto, desfocados, (2) personagem, (3) floresta em 2 ou 3 faixas, (4) céu.
- Luz: sem luz dura. Uma Luz Ambiente 60 a 80% e uma Paralela fraca e baixa (sol nascendo ou se pondo), Difusão da Sombra alta (60 a 100 px).
- Cor: frio nas sombras, quente fraco no céu do horizonte; contraste baixo; saturação moderada.
- Névoa: atmosférica forte no fundo (A3).
- Movimento: contínuo, passando por um elemento de primeiro plano (o primeiro plano "atravessa" a lente).

**Para olhar.** *O Regresso* e *Birdman* (fotografia premiada: [Oscars.org 2016](https://www.oscars.org/oscars/ceremonies/2016), [Oscars.org 2015](https://www.oscars.org/oscars/ceremonies/2015)).

### B8. Caravaggio

**Estilo.** Fundo quase preto, uma fonte de luz forte vinda do alto e de um lado, rostos e mãos que saem do escuro, figuras em meio corpo recortadas perto da borda, objetos que avançam para o espaço do espectador. Segundo a curadora Letizia Treves, a luz carrega o sentido da cena: em *A Ceia em Emaús*, quem reconhece Cristo está na luz e o estalajadeiro fica no escuro (1KcdgFxmnb4 @12:05); o corte em três quartos traz o espectador para dentro, com cotovelos e a cesta de frutas saindo para o nosso espaço (1KcdgFxmnb4 @12:38). Nas obras finais, o fundo some no escuro e a paleta fica quase preto e branco (1KcdgFxmnb4 @22:06 e @24:12).

**Técnica.**
- **Luz e modelo:** pintava direto diante dos modelos, posicionando-os, com fontes de luz fortes (1KcdgFxmnb4 @15:16). Segundo ARTEnet, usava um ateliê com luz vinda de cima (vzhi-jeKADo @00:08).
- **Base escura:** preparação escura de óleo e terra, que ele deixava aparecer como meio-tom das sombras; o biógrafo Bellori diz que ele deixava a preparação "nas meias sombras" (vzhi-jeKADo @01:55 e @06:08). Os claros da pele subiam em tons cada vez mais claros até o branco puro (vzhi-jeKADo @06:08).
- **Ordem de construção:** figuras pintadas inteiras de trás para frente, com o que está na frente sobreposto depois (vzhi-jeKADo @12:09). A National Gallery achou no raio X uma única mudança em *Emaús*: o joelho do apóstolo passou para trás da toalha para a projeção do braço e da cesta ficar mais forte (1KcdgFxmnb4 @13:10).
- **Marcas para o modelo:** incisões na preparação, talvez para repor o modelo na pose a cada sessão (vzhi-jeKADo @02:36).
- **Paleta:** poucos pigmentos (branco de chumbo, ocres, cinábrio, verde de cobre, preto de carvão, terras), escurecendo nas obras finais (vzhi-jeKADo @08:28).

**Receita no After.**
- Lente: 50 a 85 mm (Zoom 1500 a 2550 px). Enquadramento de meio corpo, com um objeto (mão, cesta, cotovelo) bem perto da câmera saindo do quadro.
- Planos: (1) objeto do primeiro plano a 400 px, (2) figuras a 1200 px, (3) fundo preto ou parede quase preta a 2000 px.
- Luz: uma Luz Spot de cima e de um lado (45° acima, 45° lateral), Cone 40 a 60°, Difusão da Sombra 10 a 20 px. Nenhuma luz de preenchimento; Ambiente 0 a 5%.
- Base escura: sólido marrom muito escuro (perto de #1a120c) atrás de tudo em vez de preto puro, para as sombras terem cor de "preparação".
- Cor: paleta quente e terrosa, saturação baixa fora dos panos vermelhos; realces da pele subindo até quase branco.
- Grão: fino ou textura de tela muito sutil.
- Movimento: mínimo. Um empurrão de 1 a 2% ou nenhum; o drama vem da luz.

**Para olhar.** *A Ceia em Emaús* ([National Gallery](https://www.nationalgallery.org.uk/paintings/michelangelo-merisi-da-caravaggio-the-supper-at-emmaus)); *A Vocação de São Mateus* ([Smarthistory](https://smarthistory.org/?p=2445)).

### B9. Ansel Adams

**Estilo.** Preto e branco de paisagem com escala grande, céu muito escuro, pedra e neve com textura, gama tonal ampla do preto ao branco.

**Técnica.**
- **Filtro e contraste:** em *Monolith*, câmera de grande formato Korona com filtro vermelho escuro, que aumenta muito o contraste, deixa o céu azul quase preto e destaca as nuvens brancas, segundo o [North Carolina Museum of Art](https://learn.ncartmuseum.org/?p=149).
- **Visualização:** segundo o mesmo museu, a foto mostra o que ele sentiu olhando o Half Dome, mais do que a aparência real da paisagem. É a ideia de planejar a cópia final antes de expor.

**Receita no After.**
- Lente: 35 a 50 mm (Zoom 1050 a 1500 px), câmera baixa olhando para cima para dar escala.
- Planos: (1) rocha ou árvore escura perto, (2) massa principal (montanha), (3) montanhas de fundo em 2 ou 3 faixas, (4) céu.
- Filtro vermelho: efeito Preto e Branco com o controle de azuis bem baixo (−60 a −100) e vermelhos e amarelos altos. Céu fica quase preto.
- Luz: Paralela lateral e dura na montanha, para revelar textura; sombra com Difusão baixa.
- Cor: curva com preto profundo e branco limpo; contraste local alto (Nitidez ou Contraste Local leve).
- Grão: fino, de grande formato.
- Movimento: subida lenta (pedestal) revelando a montanha atrás da rocha do primeiro plano.

**Para olhar.** *Monolith, the Face of Half Dome* ([The Met](https://www.metmuseum.org/art/collection/search/262595)); *Moonrise, Hernandez, New Mexico* ([Eastman Museum](https://collections.eastman.org/objects/5462/moonrise-hernandez-new-mexico)).

### B10. Sebastião Salgado

**Estilo.** Preto e branco de contraste alto com grão aparente, multidões em camadas, céu dramático, luz rasante.

**Técnica.**
- **Filme:** por décadas, Kodak Tri-X em 24×36 e 4,5×6, segundo o blog de John Bailey na [ASC](https://theasc.com/post/johns-bailiwick/sebastiao-salgado-and-the-spectre-of-hope-part-2-genesis/).
- **Digital:** no meio de *Genesis* passou ao digital (Canon), porque o raio X dos aeroportos estragava a gama de cinzas do filme; depois de testes, fazia negativos 4×5 a partir dos arquivos digitais (mesma fonte).
- **Método:** compõe olhando pelo visor e revisa em folhas de contato impressas com lupa, não na tela (mesma fonte).

**Receita no After.**
- Lente: 28 a 50 mm (Zoom 840 a 1500 px).
- Planos: 4 a 6 faixas de multidão ou paisagem, cada uma menor, mais clara e menos contrastada com a distância.
- Luz: Paralela rasante (baixa, lateral), sombra dura.
- Cor: Preto e Branco, curva em S forte, céu escurecido por gradiente, vinheta pesada fora do 3D.
- Grão: médio a forte, imitando Tri-X.
- Movimento: subida ou empurrão lento.

**Para olhar.** *Serra Pelada* ([Nelson-Atkins](https://art.nelson-atkins.org/objects/49960/serra-pelada-brasil)).

### B11. Edward Hopper

**Estilo.** Luz forte e geométrica atravessando janelas, sombras longas de sol rasante, cores chapadas, poucas figuras imóveis, interior iluminado visto de fora.

**Técnica.**
- **Preparação:** para *Nighthawks*, fez cerca de 19 ou 20 estudos a giz e carvão, desenhando partes separadas antes da tela, e posou com um espelho para as figuras masculinas, segundo a [Open Culture](https://openculture.com/2020/10/edward-hoppers-creative-process.html) e a exposição "Hopper Drawing" do [Whitney](https://whitney.org/exhibitions/hopper-drawing) (secundária e catálogo de exposição).
- **Luz:** sem fonte técnica sobre como ele trabalhava a luz. O que segue é **inferência** pelas obras: uma fonte dominante por quadro (sol rasante ou luz de interior), sombras de bordas definidas.

**Receita no After.**
- Lente: 35 a 50 mm, câmera frontal ou em leve diagonal, à distância.
- Planos: (1) rua escura, (2) vitrine ou janela iluminada como moldura, (3) interior com figuras, (4) prédios escuros. É o esquema 2 de Blevins.
- Luz: Luz Ponto ou Spot quente dentro do interior, com a vitrine projetando no chão da rua um retângulo de luz (camada de clareamento no Z do chão).
- Cor: cores chapadas, saturação média, verde e amarelo frios na luz fluorescente, rua azul escura.
- Grão: nenhum ou quase nenhum (pintura).
- Movimento: muito lento, lateral, para a moldura da janela deslizar sobre o interior.

**Para olhar.** *Nighthawks* ([Art Institute of Chicago](https://www.artic.edu/artworks/111628/nighthawks)); *Early Sunday Morning* ([Whitney](https://whitney.org/collection/works/46345)).

---

## Tabela-resumo

| Quero esta sensação | Olhe esta referência | Faça isto no After |
|---|---|---|
| Mistério, "o que tem ali?" | Saul Leiter | Tele 135 a 150 mm, vidro com gotas desfocado na frente, cor dessaturada, um vermelho |
| Solidão geométrica | Fan Ho | Spot dura e baixa, feixe com fumaça, P&B de três tons, figura pequena |
| Momento exato | Cartier-Bresson | 50 mm, cenário geométrico parado, figura entrando no ponto da linha |
| Vida cheia de cor | Alex Webb | 28 a 35 mm perto, sol duro com sombra 3D, saturação alta, pretos esmagados |
| Cena de cinema parada | Gregory Crewdson | Sem desfoque, crepúsculo azul, várias fontes quentes, névoa baixa |
| Realismo de fonte prática | Roger Deakins | Uma luz principal motivada por fonte visível, uma sombra, fundo escuro atrás da cabeça |
| Imersão na natureza | Lubezki | 16 a 24 mm muito perto, luz de amanhecer suave, câmera passando por galhos |
| Drama sagrado | Caravaggio | Spot do alto e de lado, sem preenchimento, fundo marrom quase preto, objeto saindo do quadro |
| Grandiosidade | Ansel Adams; Salgado | Céu escurecido como filtro vermelho, montanha com luz rasante, grão |
| Solidão urbana | Edward Hopper | Vitrine iluminada como moldura, retângulo de luz no chão, cores chapadas |

---

## Depende de: onde os autores divergem

- **Lente longa ou curta para camadas.** The Raw Society prefere 28 a 50 mm e diz que acima de 50 mm a compressão muda a estética (rtMBGUNcxSY @05:14). Leiter gostava da 150 mm, segundo fontes secundárias, e Forbes descreve o resultado como colagem (RJdIJkt3Gz8 @06:11). Webb fica no 28 e 35 mm. Depende de querer profundidade legível ou planos colados.
- **Uma luz ou várias.** Deakins evita duas sombras (CZ76u0WHXXI @15:47). Crewdson enche a cena de fontes visíveis. Depende de a cena pedir realismo de uma fonte ou o estranhamento de muitas luzes; mesmo em Crewdson, cada fonte tem uma direção clara (inferência).
- **Foco raso ou tudo nítido.** StudioBinder trata os dois como ferramentas (hUmZldt0DTg @08:35 a @09:07). Leiter desfoca o primeiro plano; Crewdson empilha foco para deixar tudo nítido (Capture Integration). Depende de existir uma história ou várias no quadro.
- **Encenar ou esperar.** Fan Ho fica de tocaia e espera, e há relatos de cenas montadas; Cartier-Bresson espera; Crewdson e Caravaggio encenam com modelos. No After tudo é encenado, então vale a lição dos dois lados: geometria pronta e figura no ponto certo.
- **Regra dos terços.** Gallagher defende como base (GG8M1Huo_2g @01:35). Glover prefere a simetria dinâmica (lq0IOAPXT84 @08:27, vídeo não finalista). StudioBinder mostra a simetria total de Wes Anderson (hUmZldt0DTg @11:14).
- **Saturação.** Webb satura forte; Leiter dessatura. Tucker diz que não quer copiar a cor de Webb e procura o próprio nível de saturação (WlTaCD92EFA @09:21).

---

## Erros comuns de estilo e composição em parallax

1. **Camadas sem esquema de valor.** Todas no mesmo brilho. Escolha um esquema de Blevins (A2).
2. **Luz de direções diferentes por camada.** Cada foto trouxe o próprio sol. Iguale direção e temperatura (A15) e use uma luz 3D principal só.
3. **Duas sombras sem motivo.** Duas luzes que projetam sombra parecem falsas, segundo Deakins (CZ76u0WHXXI @15:47).
4. **Lente trocada no meio da cena.** Muda o parallax e quebra a sensação de espaço (parte 0).
5. **Escala não compensada.** Camada afastada no Z sem aumentar a escala fica pequena e com borda visível (parte 0).
6. **Fundo de um nível só.** Divida em 3 a 5 faixas com névoa crescente (RG83v_oQ4DY @03:07).
7. **Primeiro plano nítido e claro.** Rouba o olho. Escuro e desfocado (RG83v_oQ4DY @03:07 e @04:38).
8. **Desfoque em todo lado para parecer cinema.** Crewdson e Adams são nítidos de frente a fundo; desfoque é escolha de estilo.
9. **Parallax exagerado.** Revela borda de recorte e buraco atrás do assunto. Preencha atrás do recorte e limite o deslocamento.
10. **Grão e cor aplicados por camada.** Cada camada fica com grão diferente. Grão e correção final numa camada de ajuste no topo, fora do 3D.
11. **Vinheta dentro do 3D.** Ela se move com o parallax. Deixe fora do 3D.
12. **Assunto na zona da interface.** No 9:16, mantenha assunto e texto fora da faixa de legenda e botões (A16).
