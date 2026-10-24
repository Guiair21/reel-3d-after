# Movimento de câmera: flyer em camadas virando cena 3D (estudo de 24/10/2026)

Um tutorial em português (fonte em `movimento-de-camera-fontes.md`, números em `movimento-de-camera-a-conferir.md`). Transcrição feita com Whisper, guardada localmente (não incluída).
Número dito em vídeo é "segundo <autor>". Quando o estudo brigar com o que foi medido nesta skill, vale o medido (ver SKILL.md).

## 1. O método de câmera: um null por movimento, sobrepostos

1. Câmera de **50 mm** filha de um null 3D. A câmera nunca é animada direto ([03:37]-[04:06]).
2. Cada movimento é **um null novo**, com só 2 chaves, e o null novo vira **pai** do anterior. Assim dá para mexer em um movimento sem refazer os outros ([13:04]-[13:27], [20:28]-[20:46]).
3. **A chave inicial do null novo fica antes da chave final do anterior.** Os movimentos se sobrepõem e a câmera não "vai, bate e volta" ([15:34]-[15:39], [17:16]-[17:31], [19:08]).
4. No tutorial são 4 nulls: recuo de dentro do olho do artista (Z 2000) até a logo, descida até a foto com o carro, deslize lateral até o carro e volta ao enquadramento inicial ([10:44]-[19:23]).

**Por script (ExtendScript):** criar o null, ligar o anterior a ele **antes** de definir valores (o After compensa o pai), pôr 2 chaves e ease. A sobreposição é numérica: `ini(n+1) = fim(n) - 0,3 a 0,5 s`.

## 2. Easing diferente em cada movimento

- Entrada com o plugin Ease and Wizz em **Expo Out**: começa rápido e freia devagar ([12:25]-[12:55]).
- Movimentos de foco em **Expo In+Out** ([14:34]-[15:02], [18:01]-[18:54]).
- O deslize lateral fica **sem easing**, linear, "porque quero que esse movimento seja contínuo" ([16:19]-[16:28]).
- Por script: `KeyframeEase(0, influência)` com influência alta só onde a curva freia; nenhum ease no trecho de passagem.

## 3. Montar a cena a partir de um PSD

1. Importar o PSD como **Composition** (as pastas viram pré-comps) e pôr essa comp dentro de uma comp final, para ajustes gerais por fora ([00:44]-[01:32]).
2. Ligar 3D e motion blur em todas as camadas, **inclusive dentro de cada pré-comp** ([01:41]-[02:05]).
3. **Fica 2D**, porque não pode andar com a câmera: camada de ajuste, vinheta, textura por cima ([02:05]-[02:35]) e partículas de overlay que aparecem no vídeo inteiro ([33:10]).

## 4. Planos em Z de um flyer

Com a vista Top ao lado da câmera ativa ([04:16]-[04:24]):

| Plano | Z | Observação |
|---|---|---|
| Fundo, halftone do meio, halftones laterais | +900 | escala compensada de volta ao tamanho original |
| Foto de fundo do artista + luzes de fundo | +550 | escala compensada |
| Sombra | entre a foto de fundo e a da frente | |
| Foto da frente (artista e carro) | 0 | fica no lugar |
| Fumaça, texto do rodapé, adesivo, logo | negativo (na frente) | escala reduzida |

Fonte: [04:31]-[09:39]. É a fórmula `fator(z) = (D+z)/D` desta skill feita no olho.

## 5. Profundidade de campo em chave, junto com a câmera

- Depth of Field ligado; chaves em Focus Distance e Aperture nos mesmos tempos dos nulls. O foco segue o alvo da câmera (logo, depois artista e carro, depois todos) e no fim as chaves são resetadas para focar tudo ([36:27]-[39:16]).
- Valores na tela ([38:00]): Zoom 1500 px (39,6° H), Focus Distance ~510, Aperture ~40, Blur Level 100 %, Iris Fast Rectangle.
- Nesta skill o foco é pelo null `FOCO` e a abertura medida no Classic 3D é 350-420 (vale o medido). O que se aproveita é a regra: **o foco muda no mesmo tempo em que a câmera muda de alvo**.

## 6. Vida nos elementos sem mexer na câmera

- **Olhos que brilham:** camada duplicada em Add, máscara elíptica, Optical Glow vermelho e opacidade com `wiggle(50,50)` ([21:00]-[23:17]).
- **Puppet sutil:** pinos na cabeça, mão, cintura (para travar) e pé; movimento pequeno e `loopOut("pingpong")` com F9 ([23:41]-[26:43]).
- **Faróis piscando:** opacidade 100→0 colada nas batidas ([26:55]-[28:34]).
- **Borda do overlay de fumaça:** modo Add, duplicar para reforçar e máscara com Feather ~120 para sumir o risco da borda ([28:56]-[29:57]). Overlays também disfarçam trechos do movimento de câmera ([20:08]-[20:18]).

## 7. Glow na batida da música

1. Camada de ajuste com Curves ([34:24]-[34:37]).
2. No áudio: Keyframe Assistant > Convert Audio to Keyframes; usar o slider "Both Channels" ([34:46]-[35:01]).
3. No slider: `ease(value, menor, maior, 0, 100)`; ela usou 30 e 50, olhando no gráfico a batida mais fraca e a mais forte ([35:09]-[36:00]).
4. Opacidade da camada de ajuste presa ao slider pelo pick whip ([36:01]-[36:11]).

Por script: `layer.opacity.expression = 'ease(thisComp.layer("Audio Amplitude").effect("Both Channels")("Slider"), 30, 50, 0, 100)'`. O nome da camada e do efeito muda com o idioma do After: conferir no AE instalado.

## 8. Acabamento

- LUT na camada de ajuste de cor; Lumetri com contraste e nitidez 15 ([39:31]-[40:09]).
- Na pré-comp da arte: `wiggle(0.2,10)` na posição e `wiggle(0.5,1)` na rotação, escala 103 % para não aparecer borda ([40:25]-[40:59]).
- **Esse tremor de câmera na mão briga com a regra desta skill**: tremor só quando a referência medida tremer (`medir_camera.py`).
- Motion blur ligado na comp e em todas as camadas ([41:01]-[41:12]).
