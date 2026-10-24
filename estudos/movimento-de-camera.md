# Movimento de câmera suave, parallax e desfoque dinâmico (estudos de 24 e 25/10/2026)

Seis vídeos escolhidos a dedo (fontes em `movimento-de-camera-fontes.md`, números em `movimento-de-camera-a-conferir.md`). Transcrições e quadros guardados localmente (não incluídos).
Número dito em vídeo é "segundo <autor>". Quando um estudo brigar com o que foi medido nesta skill, vale o medido (ver SKILL.md).

## 1. Movimento contínuo: um null por movimento, sobrepostos

**O método** (NaughtyyJuan [01:00]-[06:40]; Bricks [05:15]-[13:04], os dois chegam ao mesmo lugar):
1. Todas as camadas da cena num null controlador (3D ligado no null também: Bricks [02:37]).
2. Cada movimento de câmera é **um null novo** com só 2 chaves (início e fim). Não empilhar chaves no mesmo null.
3. O null novo vira **pai** do anterior (o anterior arrasta o pick whip para o novo). Assim o novo move tudo, inclusive o que o anterior já movia.
4. **A chave inicial do null novo fica ANTES da chave final do anterior.** Os movimentos se sobrepõem e não há o "ponto morto" entre eles, que é o que deixa o vídeo duro e barato (NaughtyyJuan [00:30]-[01:00]; Bricks [05:45]: "the trick to the smoothest camera movement is to key frame your null layers before the previous one has finished").
5. Ajuste fino é sempre: chaves, curva e valores, tocando de novo até não ter tranco (Bricks [06:48], [12:34]).

**Por script (ExtendScript):** criar o null, ligar o anterior a ele **antes** de definir valores (o After compensa o pai; ver `armadilhas.md`), pôr 2 chaves e ease nas duas. A sobreposição é numérica: `ini(n+1) = fim(n) - 0,3 a 0,5 s`.

**Depende de:** esse método move a **cena** com nulls em cadeia, é o "camera move" de edição. Para uma "câmera de tripé" (posição fixa, só pan/tilt), use câmera de dois nós e anime só o ponto de interesse; a regra da sobreposição vale igual (o próximo giro começa antes de o anterior frear). E a referência medida pela `medir_camera.py` manda sobre os dois.

## 2. Curva: é ela que dá a sensação de suave

- Chave sem curva é linear; `Easy Ease` (F9) e depois o Graph Editor (NaughtyyJuan [05:08]; Bricks [04:42]).
- **Entrada de elemento:** puxar a alça da direita: começa rápido e demora para assentar (Bricks [03:40], [15:39]).
- **Movimento de câmera entre dois pontos:** puxar as duas alças "um pouco" (Bricks [06:16]); a da esquerda mais quando quer entrar devagar no zoom (Bricks [12:02]).
- **Giro de transição (spin), saída:** alça da esquerda toda puxada e a da direita também, para **não desacelerar no fim**: começa devagar e só acelera, e o corte acontece na velocidade máxima. **Entrada da cena seguinte:** o contrário, começa no máximo e desacelera; giro no mesmo sentido e zoom continuando o da cena anterior (Bricks [18:16]-[20:55]).
- **Value graph ou speed graph:** NaughtyyJuan usa o value graph porque dá mais variações; para quem começa, o speed graph faz "90%" e é mais fácil ([09:18]-[10:19]). Depende de quem vai ajustar.
- **Posição não deixa editar o value graph:** botão direito > Separate Dimensions, ou usar o speed graph (NaughtyyJuan [08:46]-[09:18]).
- Por script: `KeyframeEase(0, influência)`. Influência alta (75-90) = alça puxada. Assimetria (entrada ≠ saída) é o que faz as curvas acima; `setTemporalEaseAtKey(k, entrada, saída)`.

## 3. Desfoque de movimento

- Ligar em todas as camadas e na composição. **Em null não faz nada**: só camada de verdade borra (NaughtyyJuan [06:10]-[06:42]).
- As configurações dele aparecem na tela em Composition Settings > Advanced ([08:15]-[08:46]); ele diz que não sabe se são o padrão. Valor na folha `quadros/QmXThvJSwCY-506-folha.jpg` (se legível). Nesta skill o medido continua valendo: shutter 180°, fase -90°, 16 amostras.

## 4. Nitidez: pré-composição vira "print"

- Pré-compor e depois ampliar perde nitidez, como ampliar uma captura de tela; texto em camada própria continua nítido de perto (NaughtyyJuan [10:19]-[11:20]). Para cena com zoom grande em texto, não pré-compor o texto, ou ligar a rasterização contínua na pré-comp [a conferir na documentação da Adobe, não foi dito no vídeo].
- Bricks prefere desenhar os quadros no Illustrator para escalar sem perder qualidade ([00:32]-[01:04]) e importa como Composition com "retain layer sizes" e estilos editáveis ([01:04]).

## 5. 3D na prática

- Em 3D, a ordem na linha do tempo não decide o que aparece: decide a posição em Z (Bricks [14:38]). Camada "sumida" geralmente está atrás de outra: conferir em Custom View e trazer para a frente pela seta azul ([08:20]).
- Empurrar em Z os elementos que não podem aparecer cria **parallax de graça** quando a câmera recua (Bricks [15:08]).
- Fundo ligado ao null da cena para ficar no quadro o tempo todo (Bricks [16:42]).

## 6. Parallax com foto ou ilustração (Nijat Ibrahimli)

Complementa `parallax.md`.
1. Todas as camadas em 3D, câmera preset **50 mm**, "Create Orbit Null" para mover a câmera por um null ([00:00]-[00:30]).
2. Vista de cima (Top) para espalhar as camadas em Z; depois **escalar cada uma** para compensar o encolhimento e reposicionar na câmera ativa ([00:30]-[03:10]). É o `fator(z)` desta skill feito à mão.
3. 7 s de animação: o orbit null aproxima no último quadro e depois gira um pouco em X e Y para "mudar a perspectiva" ([03:10]-[06:20]).
4. Buracos que aparecem no movimento: duplicar o chão e os elementos e tapar ([03:41]-[04:45]).
5. Fundo dividido em 3 faixas com máscara, cada uma num Z ([06:52]-[09:38]); céu num sólido com Gradient Ramp ([09:38]-[10:11]).
6. **Profundidade de campo:** ligada, Aperture 200 e Blur Level 200, depois 250/250, foco no objeto principal e chave de foco no início e no fim ([10:11]-[11:15]). Esses números são para câmera de 50 mm numa comp horizontal; nesta skill o Classic 3D medido pede abertura 350-420 (vale o medido).
7. Partículas por cima em modo **Add** ([11:15]).

## 7. Desfoque dinâmico, o "tremido" de blur (Foebus dela Paz)

1. Opcional: câmera lenta a 1% com Optical Flow no Premiere; no After, Frame Blending em Pixel Motion ([00:30]-[02:03]).
2. Chromatic Aberration do Red Giant Universe (plugin pago): Distortion 0,4, saturação 0, Radial Blur 10 ([02:03]-[02:34]).
3. O truque: expressão `wiggle(5, 800)` no **Center** do efeito; 1º número = velocidade, 2º = intensidade ([02:34]-[03:35]).
4. Sem plugin: Radial Blur nativo em 2 com `wiggle(5, 1000)` no centro ([04:07]-[04:38]).
- Nesta skill, para a aberração use o `acabamento.sh`; o wiggle no centro do Radial Blur é o que falta para o "tremido". Por script: `prop.expression = "wiggle(5, 1000)"`.

## 8. Planejamento antes do After (Bricks [00:32]-[01:04])

Roteiro → storyboard (como cada cena passa para a outra) → style frames (um quadro desenhado por cena) → só então animar: primeiro a interface/elementos de cada cena, **depois** a câmera ([02:37], [08:52]).

## 9. Estilo Vox automatizado (Maestros da IA)

- **Três características do estilo** ([01:00]-[01:32]): a narração conduz, sem apresentador na tela; a imagem obedece à narração palavra por palavra (sincronia, não ilustração genérica); visual gráfico e não filmagem: formas recortadas, paleta fechada, poucos elementos por tela.
- **A chave técnica:** o áudio vem primeiro e o tempo de cada palavra define os cortes ([22:20]). É o que esta skill já faz com `falas.json` e `em(cena, "palavra")`.
- **Três regras** ([22:20]): uma imagem por clipe; anime tudo; revise antes de animar, porque animar é o que custa.
- **Pipeline do agente** ([09:50]-[11:25]): pesquisa → narração → análise → clipes (4 a 8) → prompts → geração, com um **ponto de aprovação do roteiro** antes de gastar crédito ([18:39]). Configuração num `config.json` (idioma, formato, voz) e chaves num `.env` ([11:25]-[17:37]).
- Pasta de referências visuais do estilo (5 imagens) e pasta de trilhas e efeitos que o agente consulta ([12:57]-[15:02]); ele só usa a trilha quando combina com o tema ([19:44]).
- Imagem pelo GPT Image 2 e animação pelo Gemini Omni Flash via fal.ai; Seedance 2.0 para figura pública ([10:21]). Custo e números em `movimento-de-camera-a-conferir.md`.
- O pedaço que vale para esta skill é o **processo**: áudio primeiro, uma imagem por clipe, aprovação antes de animar.

## 10. Flyer em PSD virando cena 3D (Isabelle Vilela)

Confirma a §1 com um terceiro autor e acrescenta o resto abaixo.

### 10.1 O método de câmera: um null por movimento, sobrepostos

1. Câmera de **50 mm** filha de um null 3D. A câmera nunca é animada direto ([03:37]-[04:06]).
2. Cada movimento é **um null novo**, com só 2 chaves, e o null novo vira **pai** do anterior. Assim dá para mexer em um movimento sem refazer os outros ([13:04]-[13:27], [20:28]-[20:46]).
3. **A chave inicial do null novo fica antes da chave final do anterior.** Os movimentos se sobrepõem e a câmera não "vai, bate e volta" ([15:34]-[15:39], [17:16]-[17:31], [19:08]).
4. No tutorial são 4 nulls: recuo de dentro do olho do artista (Z 2000) até a logo, descida até a foto com o carro, deslize lateral até o carro e volta ao enquadramento inicial ([10:44]-[19:23]).

**Por script (ExtendScript):** criar o null, ligar o anterior a ele **antes** de definir valores (o After compensa o pai), pôr 2 chaves e ease. A sobreposição é numérica: `ini(n+1) = fim(n) - 0,3 a 0,5 s`.

### 10.2 Easing diferente em cada movimento

- Entrada com o plugin Ease and Wizz em **Expo Out**: começa rápido e freia devagar ([12:25]-[12:55]).
- Movimentos de foco em **Expo In+Out** ([14:34]-[15:02], [18:01]-[18:54]).
- O deslize lateral fica **sem easing**, linear, "porque quero que esse movimento seja contínuo" ([16:19]-[16:28]).
- Por script: `KeyframeEase(0, influência)` com influência alta só onde a curva freia; nenhum ease no trecho de passagem.

### 10.3 Montar a cena a partir de um PSD

1. Importar o PSD como **Composition** (as pastas viram pré-comps) e pôr essa comp dentro de uma comp final, para ajustes gerais por fora ([00:44]-[01:32]).
2. Ligar 3D e motion blur em todas as camadas, **inclusive dentro de cada pré-comp** ([01:41]-[02:05]).
3. **Fica 2D**, porque não pode andar com a câmera: camada de ajuste, vinheta, textura por cima ([02:05]-[02:35]) e partículas de overlay que aparecem no vídeo inteiro ([33:10]).

### 10.4 Planos em Z de um flyer

Com a vista Top ao lado da câmera ativa ([04:16]-[04:24]):

| Plano | Z | Observação |
|---|---|---|
| Fundo, halftone do meio, halftones laterais | +900 | escala compensada de volta ao tamanho original |
| Foto de fundo do artista + luzes de fundo | +550 | escala compensada |
| Sombra | entre a foto de fundo e a da frente | |
| Foto da frente (artista e carro) | 0 | fica no lugar |
| Fumaça, texto do rodapé, adesivo, logo | negativo (na frente) | escala reduzida |

Fonte: [04:31]-[09:39]. É a fórmula `fator(z) = (D+z)/D` desta skill feita no olho.

### 10.5 Profundidade de campo em chave, junto com a câmera

- Depth of Field ligado; chaves em Focus Distance e Aperture nos mesmos tempos dos nulls. O foco segue o alvo da câmera (logo, depois artista e carro, depois todos) e no fim as chaves são resetadas para focar tudo ([36:27]-[39:16]).
- Valores na tela ([38:00]): Zoom 1500 px (39,6° H), Focus Distance ~510, Aperture ~40, Blur Level 100 %, Iris Fast Rectangle.
- Nesta skill o foco é pelo null `FOCO` e a abertura medida no Classic 3D é 350-420 (vale o medido). O que se aproveita é a regra: **o foco muda no mesmo tempo em que a câmera muda de alvo**.

### 10.6 Vida nos elementos sem mexer na câmera

- **Olhos que brilham:** camada duplicada em Add, máscara elíptica, Optical Glow vermelho e opacidade com `wiggle(50,50)` ([21:00]-[23:17]).
- **Puppet sutil:** pinos na cabeça, mão, cintura (para travar) e pé; movimento pequeno e `loopOut("pingpong")` com F9 ([23:41]-[26:43]).
- **Faróis piscando:** opacidade 100→0 colada nas batidas ([26:55]-[28:34]).
- **Borda do overlay de fumaça:** modo Add, duplicar para reforçar e máscara com Feather ~120 para sumir o risco da borda ([28:56]-[29:57]). Overlays também disfarçam trechos do movimento de câmera ([20:08]-[20:18]).

### 10.7 Glow na batida da música

1. Camada de ajuste com Curves ([34:24]-[34:37]).
2. No áudio: Keyframe Assistant > Convert Audio to Keyframes; usar o slider "Both Channels" ([34:46]-[35:01]).
3. No slider: `ease(value, menor, maior, 0, 100)`; ela usou 30 e 50, olhando no gráfico a batida mais fraca e a mais forte ([35:09]-[36:00]).
4. Opacidade da camada de ajuste presa ao slider pelo pick whip ([36:01]-[36:11]).

Por script: `layer.opacity.expression = 'ease(thisComp.layer("Audio Amplitude").effect("Both Channels")("Slider"), 30, 50, 0, 100)'`. O nome da camada e do efeito muda com o idioma do After: conferir no AE instalado.

### 10.8 Acabamento

- LUT na camada de ajuste de cor; Lumetri com contraste e nitidez 15 ([39:31]-[40:09]).
- Na pré-comp da arte: `wiggle(0.2,10)` na posição e `wiggle(0.5,1)` na rotação, escala 103 % para não aparecer borda ([40:25]-[40:59]).
- **Esse tremor de câmera na mão briga com a regra desta skill**: tremor só quando a referência medida tremer (`medir_camera.py`).
- Motion blur ligado na comp e em todas as camadas ([41:01]-[41:12]).
