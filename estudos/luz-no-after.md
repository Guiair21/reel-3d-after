# Luz e sombra no After Effects (Classic 3D, Advanced 3D e parallax de foto)

Estudo feito em 20/10/2026 para servir de referência à skill `reel-3d-after`.
Versão de referência do After: 26.x (a mais recente é a 26.5, de setembro de 2026, segundo a página "What's new" da Adobe).

Regra de leitura: o que é fato do software vem da Adobe, com link. O que vem de vídeo aparece como "segundo <autor> (id @mm:ss)". Números de vídeo estão listados em `a-conferir.md`.

## 1. Princípio

Uma foto recortada em camadas já traz a luz dela gravada nos pixels. Em parallax 2.5D o trabalho de luz é **continuar a luz que a foto já tem**: achar de onde ela vem, manter essa direção em tudo que for acrescentado (gradiente, sombra, raio, flare) e nunca escurecer duas vezes a mesma área.

- Segundo Manuel Steinhauser (4yxfWMu5v4g @01:36), o primeiro passo é decidir a posição e a direção da luz, e cada gradiente, brilho e sombra acrescentado depois tem de obedecer a ela.
- Segundo Ben Marriott (rdi0bPWqYyI @14:59), sombra sobre sombra não existe: a sombra é ausência de luz, então uma área já escura não fica mais escura quando outra sombra passa por cima.
- Segundo Ben Marriott (rdi0bPWqYyI @00:30), é mais fácil ajustar o elemento novo à foto do que ajustar a foto ao elemento novo (dessaturar e escurecer o elemento primeiro).

Consequência prática para a skill: luz 3D do After sobre camadas de foto tende a **somar luz por cima da luz gravada**. Na maioria dos parallax de foto, a luz entra como camada 2D (gradiente, máscara com feather, modo de mesclagem) presa à geometria por expressão, e a luz 3D fica reservada para elementos que não são foto (texto, objeto 3D, sólido de chão).

## 2. Tipos de luz e parâmetros (fonte: Adobe)

Fonte principal: [Cameras, lights, and points of interest](https://helpx.adobe.com/after-effects/desktop/work-with-layers/camera-layer/cameras-lights-points-interest.html) (atualizada em 21/01/2026) e [Enable lights to cast shadows](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/cast-and-accept-shadows/enable-lights-to-cast-shadows.html) (21/01/2026).

### Tipos

| Tipo | O que a Adobe diz | Projeta sombra? |
|---|---|---|
| Parallel | Luz direcional, sem limite, de uma fonte infinitamente distante, como o Sol. | Sim. No Advanced 3D está entre os tipos que projetam sombra. |
| Spot | Luz de uma fonte limitada por um cone, como lanterna ou refletor de palco. | Sim. No Advanced 3D está entre os tipos que projetam sombra. |
| Point | Luz omnidirecional sem limite, como uma lâmpada nua. | No Advanced 3D a Adobe lista só Spot, Parallel e Environment como tipos que projetam sombra. Point não aparece na lista (não conferido no programa). |
| Ambient | Luz sem fonte, que só soma brilho geral à cena. Não projeta sombra. Não tem ícone no painel Composition. | Não. |
| Environment | Luz, reflexo e sombra a partir de um mapa de ambiente (imagem). Funciona só no Advanced 3D. | Sim, desde que Casts Shadows esteja ligado. A luz de ambiente padrão não projeta sombra. |

Fonte do Environment: [Create realistic reflections and ambient lighting](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/create-realistic-reflections-and-ambient-lighting/image-based-lighting.html) (02/04/2025).

### Parâmetros (Light Options)

| Parâmetro | O que a Adobe diz | Vale para |
|---|---|---|
| Intensity | Brilho da luz. Valor negativo cria "nonlight", que subtrai cor da camada. | Todos |
| Color | Cor da luz. | Todos |
| Cone Angle | Ângulo do cone, define a largura do feixe a uma distância. | Só Spot |
| Cone Feather | Suavidade da borda do spot. | Só Spot |
| Falloff | Como a intensidade cai com a distância: None (não cai), Smooth (queda linear a partir do Radius, ao longo do Falloff Distance), Inverse Square Clamped (queda fisicamente correta a partir do Radius). | Parallel, Spot, Point |
| Radius | Raio dentro do qual a luz é constante. Fora dele começa a queda. | Com Falloff ligado |
| Falloff Distance | Distância ao longo da qual a luz cai. | Com Falloff ligado |
| Casts Shadows | Se a luz faz camadas projetarem sombra. Não pode ser animado (nem o tipo de luz). | Parallel, Spot, Point (Classic), Environment |
| Shadow Darkness | Escuridão da sombra. Ativo só com Casts Shadows. | Com sombra |
| Shadow Diffusion | Suavidade da sombra conforme a distância aparente da camada que a projeta. Valor maior, sombra mais macia. Na página do Advanced 3D: "Available only for Spot lights". | Spot (no Advanced 3D) |
| Source | Camada usada como mapa de ambiente: HDRI (.hdr, .exr), footage ou composição, inclusive animada. | Só Environment |

Outros fatos da Adobe que mudam o trabalho:

- **Luz como adjustment layer**: a luz só ilumina as camadas que estão abaixo dela na pilha da timeline. Camadas acima não recebem luz, seja qual for a posição no espaço ([cameras-lights](https://helpx.adobe.com/after-effects/desktop/work-with-layers/camera-layer/cameras-lights-points-interest.html)). Serve para iluminar só o recorte do sujeito e deixar o fundo da foto intacto.
- **Limite de sombras no Advanced 3D**: até 8 luzes Spot ou Parallel com sombra, mais 1 Environment com sombra, total de 9. Acima de 8, só as 8 mais altas na pilha projetam sombra; as outras iluminam sem sombra ([enable-lights-to-cast-shadows](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/cast-and-accept-shadows/enable-lights-to-cast-shadows.html)).
- **Sombra dura renderiza mais rápido**. Aumentar Shadow Diffusion amacia e deixa o render mais lento (mesma página).
- **Control Light with Camera** (Layer > Create): cria câmera ligada a uma luz, e a luz acompanha o movimento da câmera (cameras-lights).
- **Create Environment Light Background Layer** (Layer > Light): cria um sólido no fundo com CC Environment ligado ao mapa da luz e Fast Box Blur de 5 px ([image-based-lighting](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/create-realistic-reflections-and-ambient-lighting/image-based-lighting.html)).
- O interruptor antigo **Layer > Environment Layer** não funciona no Advanced 3D, só no Cinema 4D (mesma página).
- Qualquer imagem vira HDR: comp em 32 bpc e Save Frame As com formato Radiance (mesma página).

## 3. Material Options das camadas (fonte: Adobe)

Fonte: seção "Material Options properties" de [cameras-lights-points-interest](https://helpx.adobe.com/after-effects/desktop/work-with-layers/camera-layer/cameras-lights-points-interest.html). Atalho: AA mostra as Material Options na timeline.

| Opção | O que a Adobe diz | Uso em parallax |
|---|---|---|
| Casts Shadows (Off, On, Only) | Se a camada projeta sombra. Only: a camada some e a sombra continua. Padrão: Off. | Only numa cópia do recorte cria sombra sem duplicar a imagem. |
| Light Transmission | % de luz que atravessa a camada, levando a cor dela para a sombra. 0% sombra preta; 100% a cor cheia da camada. Parcial imita vitral. Com Casts Shadows = Only e Light Transmission acima de zero, projeta a cor de uma camada invisível. | Sombra colorida, luz através de cortina ou janela. |
| Accepts Shadows (Off, On, Only) | Se a camada mostra sombras recebidas. Only renderiza só a sombra. Padrão: On. | Chão invisível (shadow catcher) sob o sujeito. |
| Accepts Lights | Se a luz altera a cor da camada. Não afeta sombra. Desligado, a camada fica com a cor base (útil para tela de celular e neon). Também existe no Classic 3D e no Cinema 4D. | Desligar nas camadas de foto que devem manter a luz original. |
| Ambient | Refletividade não direcional. 100% máxima, 0% nenhuma. | Quanto a Ambient light pega na camada. |
| Diffuse | Refletividade omnidirecional, "como um plástico fosco". | Quanto a luz direta clareia a foto. |
| Specular Intensity | Refletividade direcional, como espelho. | Brilho especular; em foto quase sempre baixo. |
| Specular Shininess | Tamanho do brilho especular: 100% pequeno, 0% grande. Ativo só com Specular acima de zero. | |
| Metal | Quanto a cor da camada tinge o brilho especular. 100% brilho da cor da camada; 0% brilho da cor da luz. | |

No Advanced 3D, sólidos, precomps, texto e shape layers 3D passam a usar o **Adobe Standard Material** (renderização física) ([Advanced 3D renderer](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/advanced-3d-renderer/advanced-3d-renderer.html), 02/04/2025). A lista de propriedades de material que aparece nesse modo não foi conferida nesta pesquisa; a página "Work with materials" da Adobe fica para a próxima rodada.

## 4. Renderizador × o que suporta (só o que a Adobe confirma)

Na aba 3D Renderer de Composition Settings, a coluna Enabled/Disabled mostra o que cada renderizador liga e desliga ([composition basics](https://helpx.adobe.com/after-effects/desktop/work-with-compositions/composition-settings/composition-basics.html)). Essa coluna não foi lida no programa; o que segue vem das páginas.

| Recurso | Classic 3D | Advanced 3D | Cinema 4D |
|---|---|---|---|
| O que é, segundo a Adobe | Renderizador tradicional e padrão; camadas são planos no espaço 3D. | GPU, Adobe Standard Material (PBR). Único nativo que renderiza modelos 3D (GLTF, GLB, OBJ, FBX). | Extrusão e bisel de texto e shape, preferido para extrusão. |
| Luzes Parallel, Spot, Point, Ambient | Sim (página geral de luzes) | Sim | Não conferido |
| Environment light (HDRI) | Não. "Environment lights currently work only in the Advanced 3D renderer." | Sim, luz, reflexo e sombra | Não. Tem "Environment layer (in reflection only)". |
| Sombra de Spot e Parallel | Não conferido nesta rodada | Sim, até 8 + 1 Environment | Não conferido |
| Sombra de Point | Não conferido | Não listada pela Adobe | Não conferido |
| Shadow catcher (Accepts Shadows = Only) | Não conferido | Sim em sólido 3D ([Shadow catchers](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/cast-and-accept-shadows/shadow-catchers.html), 18/06/2024). Ver "Depende de". | Não conferido |
| Profundidade de campo | Câmera tem Depth of Field (página geral de câmera) | Sim, in-engine, desde a 26.3 (junho de 2026), com Focus Area Width e Near/Far Blur Level ([DOF no Advanced 3D](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/work-with-3d-scene-depth-data/enable-in_engine-depth-of-field-in-advanced-3d.html)) | Não conferido |
| Motion blur | Não conferido | Não conferido na Adobe. Premiere Gal disse em 05/2024 que não havia (ks9TXSxSUGs @04:40). | Não conferido |
| Accepts Lights | Sim | Sim | Sim |
| Controle de qualidade | Resolução do shadow map | Render Quality; Shadows: Resolution (Half 2 MB, Full 16 MB, Double 128 MB), Smoothness 1 a 32 (padrão 3), Casting Box Size e Center, Fit to Scene | Slider Draft, Typical, Extreme |
| Template (MOGRT) | Único suportado | Não | Não |

Notas da Adobe sobre o Advanced 3D:
- Sombra de Environment é sombra de **voxel**, pesada em memória. Só camadas dentro da Casting Box projetam sombra; aumentar a caixa espalha a resolução e amacia a sombra. Com o diálogo aberto, a caixa aparece em magenta ([image-based-lighting](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/create-realistic-reflections-and-ambient-lighting/image-based-lighting.html)).
- Resolution e Smoothness valem para a sombra do Environment e não afetam Spot nem Parallel; estes respondem ao Render Quality ([enable-lights-to-cast-shadows](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/cast-and-accept-shadows/enable-lights-to-cast-shadows.html)).
- Smoothness e Render Quality têm relação inversa: Render Quality baixo pede Smoothness mais alto (image-based-lighting).
- A qualidade da DOF segue o Render Quality; "ripple" ao animar o foco pede mais qualidade (página de DOF).
- Requisito de GPU: Macs Intel com GPU integrada não rodam o Advanced 3D (página do Advanced 3D).
- Para modelo 3D, Advanced 3D é ligado sozinho ao entrar o modelo na comp.

## 5. Receitas para iluminar parallax de foto

Base de parallax, segundo MDMZ (7tVyu-rjHbg): importar o PSD como composição com "Retain Layer Size" (@14:09), todas as camadas 3D, câmera de 50 mm (@14:40), afastar no Z o que é fundo e compensar com Scale (@15:42), deitar o chão com âncora no topo e X Rotation -90 (@17:14), esticar o chão em Y e corrigir a distorção com Corner Pin (@18:48), âncora de cada recorte no ponto onde ele toca o chão (@20:22).

### 5.1 Sombra de contato e sombra projetada falsa (sem luz 3D)

1. **Deixe a sombra original no chão.** Segundo MDMZ (7tVyu-rjHbg @01:09), a sombra do sujeito fica na camada do chão, fora do recorte do sujeito. Isso evita sombra flutuando quando a câmera anda.
2. **Duplicar o recorte e deitar.** Segundo Ben Marriott (rdi0bPWqYyI @05:03), duplicar a camada, girar X -90 para ela deitar no chão, aplicar Fill com uma cor pega por conta-gotas na sombra da própria cena (@05:35). Segundo MDMZ (7tVyu-rjHbg @26:07), mesma ideia com X 90, Fill preto, modo Soft Light e opacidade 40 (@26:37).
3. **Sombra que some com a distância.** Segundo Ben Marriott (rdi0bPWqYyI @06:10), máscara retangular com feather alto na cópia, para a sombra morrer longe do ponto de contato.
4. **Inclinar para a luz.** Segundo Ben Marriott (rdi0bPWqYyI @06:43), CC Slant na cópia muda a direção da sombra quando a luz vem de lado.
5. **Amaciar.** Segundo Ben Marriott (rdi0bPWqYyI @07:17), Gaussian Blur alto com Repeat Edge Pixels desligado, e opacidade baixa (@07:51). Luz difusa de interior pede sombra macia; sol direto pede sombra dura.
6. **Contato escuro.** Segundo Manuel Steinhauser (4yxfWMu5v4g @05:21), uma elipse escura com feather logo abaixo do objeto, mais escura no lado oposto à luz, tira a sensação de objeto flutuando. Escurecer a borda de baixo do próprio objeto onde ele encosta no chão ajuda (@04:42).
7. **Sombra em perspectiva com dispersão.** Segundo Manuel Steinhauser (4yxfWMu5v4g @05:54), duplicar a forma escura, ligar 3D, girar cerca de 100° em X, cortar com máscara o lado que não faz sentido para a luz (@06:26) e aplicar CC Radial Fast Blur com o centro do lado da luz para a sombra abrir com a distância (@06:26 a @07:00).

Opção nativa para a mesma sombra: os efeitos **Drop Shadow** (fonte infinita) e **Radial Shadow** (fonte pontual, com Light Source, Projection Distance e Softness) projetam sombra a partir do alfa da camada; a Adobe diz que servem para fazer "uma camada 3D parecer projetar sombra numa camada 2D" ([Perspective effects](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/perspective-effects.html)). A Adobe sugere copiar a posição do Lens Flare para o Light Source da Radial Shadow, para a sombra casar com a fonte.

### 5.2 Sombra projetada real (Advanced 3D, shadow catcher)

Fonte: [Shadow catchers](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/cast-and-accept-shadows/shadow-catchers.html) e [enable-lights-to-cast-shadows](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/cast-and-accept-shadows/enable-lights-to-cast-shadows.html).

1. Comp em Advanced 3D. Sólido 3D deitado (X Rotation) onde a sombra deve cair, abaixo do objeto na pilha.
2. Objeto com Casts Shadows On. Sólido com Accepts Shadows = Only (some, fica a sombra). Shadow Color do receptor muda a cor da sombra.
3. Luz Spot, Parallel ou Environment com Casts Shadows. Se a sombra não aparecer, Renderer Options > Fit to Scene (a Casting Box pode estar pequena).
4. Para recorte de foto como "objeto", Casts Shadows = Only numa cópia do recorte projeta a silhueta sem dobrar a imagem. Não conferido no programa com camada de imagem plana no Advanced 3D.

Segundo Jake Bartlett (6wQjuplvypI @21:21), com Shadow Diffusion a sombra fica nítida perto do contato e mais macia longe dele, e a opacidade de material deixa a luz passar e desenha sombra recortada (@21:52), o que dá para usar como gobo.

### 5.3 Luz motivada pela foto (relighting 2D)

1. **Gradiente na direção da luz.** Segundo Manuel Steinhauser (4yxfWMu5v4g @01:36), Gradient Ramp com início claro do lado da luz e fim escuro do lado oposto, no fundo e no objeto, sempre com a mesma direção (@02:07).
2. **Luz de ambiente falsa.** Segundo Manuel Steinhauser (4yxfWMu5v4g @03:41), sólido claro com máscara redonda de feather alto no canto da luz, e sólido escuro com máscara no canto oposto.
3. **Sombra que passa e sombreado de forma.** Segundo Ben Marriott (rdi0bPWqYyI @08:24), duplicar o recorte, Fill com a cor de sombra da cena e controlar onde ela aparece por máscaras de feather muito alto: uma animada para a sombra que atravessa (@09:30), outra na base para o lado sem luz (@10:35).
4. **Luz rebatida do chão.** Segundo Ben Marriott (rdi0bPWqYyI @11:09), uma máscara em Subtract na base da camada de sombra devolve um pouco de luz de baixo, com opacidade baixa para não brilhar mais que o chão (@11:42).
5. **Borda clara entre camadas.** Segundo Ben Marriott (rdi0bPWqYyI @12:14), Simple Choker de menos de 1 px na camada de baixo some com o fio de luz que vaza entre duas cópias com borda macia.
6. **Volume com Layer Styles.** Segundo Ben Marriott (x4kc4XbIOAU @01:02), Inner Shadow com tamanho alto e ângulo apontando para a luz dá volume a uma forma plana; Inner Glow segura o lado escuro (@02:03); Bevel and Emboss grande com cor de sombra saturada em Multiply troca o preto por cor (@02:34); Gradient Overlay em Overlay unifica (@03:35). Em precomp, Outer Glow e Inner Glow em Overlay contornam o recorte inteiro (@07:10 a @08:42).
7. **Reflexo de cor vizinha.** Segundo Ben Marriott (x4kc4XbIOAU @04:36), duplicar o objeto colorido vizinho, Gaussian Blur alto e Set Matte com o alfa do objeto que recebe a luz. Blur antes do Set Matte e um segundo Set Matte depois dão um reflexo mais redondo (@05:37 a @06:07).
8. **Reflexo no chão.** Segundo Ben Marriott (rdi0bPWqYyI @13:19), cópia com Flip Vertical, modo Overlay, máscara com feather alto só junto ao contato e blur (@14:24).
9. **Luz 3D só no recorte.** Fato Adobe: luz funciona como adjustment layer, ilumina só o que está abaixo dela; e Accepts Lights desligado mantém a cor original de uma camada. Combinação para parallax: Accepts Lights Off no fundo da foto, luz posicionada acima do recorte do sujeito na pilha.
10. **Intensidade negativa para escurecer.** Fato Adobe: Intensity negativa subtrai cor. Um Spot negativo escurece um canto sem pintar máscara.

Normal map: nenhuma das fontes estudadas ensinou relighting com normal map no After, e nenhuma página da Adobe lida nesta rodada trata disso. Fica como lacuna.

### 5.4 Vinheta

Segundo Ben Marriott (rdi0bPWqYyI @19:19), CC Vignette numa adjustment layer por cima de tudo, com Amount reduzido; ninguém percebe a vinheta até desligar, e ela puxa o olho para o centro. Cuidado em cena clara (neve), onde a borda escura aparece demais (@19:52).

### 5.5 Luz volumétrica e raios

**CC Radial Fast Blur com ponto 3D** (todo nativo), segundo Andrew Kramer (frXQxwMKh6c):
1. Fonte de luz: sólido branco com máscara circular, 3D, Accepts Lights desligado (@04:13).
2. Adjustment layer com CC Radial Fast Blur, Zoom = Brightest (@04:43).
3. Null 3D atrás da fonte. No Center do blur, expressão com pick whip para o null e `toComp([0,0,0])`, que converte o ponto 3D em posição 2D (@05:46 a @06:49). Kramer admite que o efeito é 2D e o volume vem dessa ligação (@05:14).
4. Curves antes do blur, comprimindo a faixa para só o brilho virar raio (@06:49). Essa curva é o limiar dos raios (@12:05).
5. Adjustment layer em Screen para devolver a cena por baixo (@07:20).
6. Null perto: feixe largo; null longe: feixe fechado (@07:51).
7. Fractal Noise atrás (máscara com feather, Evolution animada) dá textura ao raio (@08:22, @10:30). A cor da fonte tinge os raios (@15:16).
8. Em footage: 3D Camera Tracker, criar Null, Tint e Curves antes do CC Radial Fast Blur, Screen e a mesma expressão `toComp` (@17:23 a @18:56).

Para parallax de foto: a "fonte" pode ser o próprio céu ou janela recortados da foto, já que o efeito lê o brilho.

**Raios com forma de estrela**, segundo Manuel Steinhauser (4yxfWMu5v4g @09:07): shape de estrela com raio interno pequeno, CC Radial Fast Blur com o centro no canto da luz; animar o centro ou girar a estrela.

**CC Light Rays, CC Light Burst 2.5, CC Light Sweep**: a Adobe lista os três entre os efeitos Generate de terceiros incluídos no After ([Generate effects](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/generate-effects.html)). Nenhum finalista demonstrou CC Light Rays. Segundo Manuel Steinhauser (4yxfWMu5v4g @00:10), CC Light Sweep anda sobre o texto no sentido de leitura e guia o olho.

**Shine** (Trapcode, terceiro, pago): não coberto pelas fontes desta rodada.

### 5.6 Flare

- **Lens Flare** nativo simula a refração de luz forte na lente; trabalha em 8 bpc ([Generate effects](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/generate-effects.html)).
- Segundo MDMZ (7tVyu-rjHbg @27:07), sólido com Optical Flares (plugin pago da Video Copilot) em modo transparente, preset de sol, fonte em 3D no canto da luz da foto (@27:40).
- Prender o centro do flare ao mesmo null da luz (expressão `toComp`) mantém flare, raios e Radial Shadow apontando para a mesma fonte. Ideia derivada das receitas acima, não testada.

### 5.7 Acabamento que une as camadas

Segundo Ben Marriott (rdi0bPWqYyI @17:06), tudo o que se aplica igual às duas partes da imagem aproxima as duas: grade de cor numa adjustment layer por cima, granulação no elemento novo (Noise HLS Auto, @03:53), blur leve nas bordas de recorte limpas demais (@02:43) e uma Camera Lens Blur animada imitando o foco da câmera (@24:15). Segundo MDMZ (7tVyu-rjHbg @28:11), um Gaussian Blur leve no fundo mais distante. Motion blur no elemento que anda pede o interruptor na camada e na comp (@24:34).

## 6. Valores de partida que os autores usaram

Todos são números de vídeo, ponto de partida para testar. Ver `a-conferir.md`.

| Uso | Valor | Quem |
|---|---|---|
| Dessaturar o elemento novo | Hue/Saturation Saturation cerca de -12, Lightness cerca de -10 | segundo Ben Marriott (rdi0bPWqYyI @01:03) |
| Blur de borda de recorte | 2 px | segundo Ben Marriott (rdi0bPWqYyI @02:43) |
| Granulação | Noise HLS Auto, Lightness 4 a 5, tipo Grain | segundo Ben Marriott (rdi0bPWqYyI @04:27) |
| Feather da sombra que some | 500 px | segundo Ben Marriott (rdi0bPWqYyI @06:10) |
| Blur da sombra de interior | 200 | segundo Ben Marriott (rdi0bPWqYyI @07:17) |
| Opacidade da sombra | 50% | segundo Ben Marriott (rdi0bPWqYyI @07:51) |
| Sombra do trem | Soft Light, opacidade 40 | segundo MDMZ (7tVyu-rjHbg @26:37) |
| Sombra que passa | feather 1000 px, mask opacity 50% | segundo Ben Marriott (rdi0bPWqYyI @09:30) |
| Luz rebatida | feather 100, opacidade 35 a 36% | segundo Ben Marriott (rdi0bPWqYyI @11:42) |
| Simple Choker anti-halo | 0,8 | segundo Ben Marriott (rdi0bPWqYyI @12:46) |
| Reflexo no chão | Overlay, feather 1000, Gaussian 50 | segundo Ben Marriott (rdi0bPWqYyI @14:24) |
| Vinheta | CC Vignette Amount 75 | segundo Ben Marriott (rdi0bPWqYyI @19:19) |
| Foco animado | Camera Lens Blur 0, 4, 0 (até 8) | segundo Ben Marriott (rdi0bPWqYyI @26:26) |
| Drop shadow empilhado (3 cópias) | 75% dist 10 soft 20; 60% dist 20 soft 80; 50% dist 30 soft 170; ângulo 135° para luz do alto à esquerda; cor misturada com a do fundo, nunca preta | segundo Manuel Steinhauser (4yxfWMu5v4g @07:31 a @08:02) |
| Textura na sombra | Noise 5%, sem cor | segundo Manuel Steinhauser (4yxfWMu5v4g @08:35) |
| Inner Shadow de volume | opacidade 75, distância 85, tamanho 100, ângulo 320 | segundo Ben Marriott (x4kc4XbIOAU @01:32) |
| Bevel and Emboss | tamanho cerca de 200 | segundo Ben Marriott (x4kc4XbIOAU @02:34) |
| Reflexo de cor vizinha | Gaussian 150 + Set Matte | segundo Ben Marriott (x4kc4XbIOAU @05:06) |
| Blur do fundo distante | até 10 | segundo MDMZ (7tVyu-rjHbg @28:11) |
| Câmera do parallax | 50 mm, film size 35 | segundo MDMZ (7tVyu-rjHbg @14:40) |
| Environment light | intensidade 100%, Shadow Darkness 40 | segundo Jake Bartlett (6wQjuplvypI @14:01) |
| Render enquanto trabalha | Render Quality 12, Smoothness 2; Smoothness raramente acima de 6 | segundo Jake Bartlett (6wQjuplvypI @09:55, @22:23) |
| Evolução do Fractal Noise | expressão `time*150` | segundo Andrew Kramer (frXQxwMKh6c @10:30) |

## 7. Depende de (onde as fontes divergem)

- **Accepts Shadows = Only.** A página [Cast and accept shadows](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/cast-and-accept-shadows/cast-and-accept-shadows.html) (07/02/2024, sobre camada de modelo 3D) diz "Only - Disabled". A página [Shadow catchers](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/cast-and-accept-shadows/shadow-catchers.html) (18/06/2024, sobre sólido 3D) ensina usar Only. Premiere Gal (ks9TXSxSUGs @09:25, maio de 2024) encontrou a opção desabilitada e montou um precomp em Multiply. Depende da versão e do tipo de camada: em sólido 3D numa versão de meados de 2024 em diante, Only funciona. Na camada de modelo 3D, conferir no programa.
- **Desde quando Spot e Parallel projetam sombra no Advanced 3D.** Segundo Jake Bartlett (6wQjuplvypI @20:50), isso só passou a existir na versão 26. A Adobe confirma o recurso, mas a página "What's new" de hoje só lista da 26.2 em diante; a versão exata não foi conferida. A página geral de luzes ainda tem um aviso antigo de que o recurso estava "em beta".
- **Shadow Diffusion.** A página geral fala em diffusion para qualquer luz com sombra; a página do Advanced 3D diz "Available only for Spot lights". Andrew Kramer (frXQxwMKh6c @03:41) usou diffusion num Point light no Classic 3D. Leitura provável: no Classic vale para mais tipos, no Advanced 3D só Spot. Não conferido no programa.
- **Técnica de sombra no Advanced 3D.** Uma página da Adobe fala em "shadow maps" renderizados do ponto de vista de cada luz, outra em "voxel shadows" para o Environment. As duas convivem: Spot e Parallel usam Render Quality; Environment usa Resolution, Smoothness e Casting Box.
- **Luz 3D ou luz 2D na foto.** Ben Marriott e Manuel Steinhauser constroem toda a luz com máscara, gradiente e cópia de camada. Jake Bartlett mostra luz 3D com sombra real. Em parallax de foto, a escolha depende de haver ou não objeto que não seja foto (texto 3D, modelo, sólido de chão). Com só camadas de foto, a luz 2D é mais controlável e mais rápida.
- **Motion blur no Advanced 3D.** Premiere Gal (ks9TXSxSUGs @04:40, maio de 2024) disse que não havia e usou CC Force Motion Blur numa adjustment layer. A Adobe não confirma nem nega nas páginas lidas. Conferir na versão 26.5.

## 8. Erros comuns

- **Cena preta ao criar luz.** Segundo Jake Bartlett (6wQjuplvypI @20:18), o padrão de Falloff estava alterado e apagava a cena; voltar Falloff para None.
- **Sombra não aparece no Advanced 3D.** Conferir Casts Shadows na luz e na camada (padrão da camada é Off), Accepts Shadows no receptor e a Casting Box (Fit to Scene). Fato Adobe.
- **Mais de 8 luzes com sombra.** As de baixo na pilha param de projetar sombra sem aviso. Fato Adobe.
- **Render travado.** Render Quality e Smoothness no máximo enquanto trabalha. Fato Adobe: Smoothness alto deixa lento; segundo Jake Bartlett (6wQjuplvypI @09:55), "nunca" subir ao máximo, Draft 3D para posicionar.
- **Sombra preta pura.** Segundo Manuel Steinhauser (4yxfWMu5v4g @07:31), misturar a cor do fundo na sombra. Segundo Ben Marriott (rdi0bPWqYyI @05:35), pegar a cor por conta-gotas numa sombra da foto.
- **Sombra dobrada.** Segundo Ben Marriott (rdi0bPWqYyI @14:59), não escurecer de novo uma área que já está na sombra.
- **Gaussian Blur com borda dura.** Segundo Ben Marriott (rdi0bPWqYyI @07:17), desligar Repeat Edge Pixels na camada de sombra.
- **Luz contrária à da foto.** Segundo Manuel Steinhauser (4yxfWMu5v4g @02:07), consistência de direção acima de tudo. Segundo MDMZ (7tVyu-rjHbg @22:58), alinhar o recorte com as sombras que já estão na foto.
- **Fractal Noise com borda cinza.** Segundo Andrew Kramer (frXQxwMKh6c @09:25), Solid Composite com modo None.
- **Collapse Transformations em precomp 3D.** Fato Adobe ([3D layers](https://helpx.adobe.com/after-effects/desktop/work-with-layers/3d-layers/3d-layers.html)): com o interruptor ligado o precomp perde blending mode e motion blur próprios.
- **Efeito 2D em modelo 3D.** Segundo Premiere Gal (ks9TXSxSUGs @11:01), em maio de 2024 efeitos como Lumetri não funcionavam na camada de modelo; ela usou Calculations num sólido como cópia. Não conferido na Adobe.

## 9. Notas para fazer por script (ExtendScript)

matchNames vindos da referência comunitária [After Effects Scripting Guide, docsforadobe](https://ae-scripting.docsforadobe.dev/matchnames/layer/lightlayer/) (não é página helpx da Adobe; é a referência usada pela comunidade de scripts).

### Luz (`ADBE Light Options Group`, "Light Options")

| Propriedade | matchName | Status |
|---|---|---|
| Intensity | `ADBE Light Intensity` | conferido (docsforadobe) |
| Color | `ADBE Light Color` | conferido (docsforadobe) |
| Cone Angle | `ADBE Light Cone Angle` | conferido (docsforadobe) |
| Cone Feather | `ADBE Light Cone Feather 2` | conferido (docsforadobe) |
| Falloff | `ADBE Light Falloff Type` | conferido (docsforadobe) |
| Radius | `ADBE Light Falloff Start` | conferido (docsforadobe) |
| Falloff Distance | `ADBE Light Falloff Distance` | conferido (docsforadobe) |
| Shadow Darkness | `ADBE Light Shadow Darkness` | conferido (docsforadobe) |
| Shadow Diffusion | `ADBE Light Shadow Diffusion` | conferido (docsforadobe) |
| Casts Shadows (da luz) | não listado | não conferido |
| Source (Environment) | não listado | não conferido |
| Tipo da luz | `layer.lightType`; `LightType.ENVIRONMENT` para Environment | Environment confirmado pela Adobe ([image-based-lighting](https://helpx.adobe.com/after-effects/desktop/work-with-3d-composition/create-realistic-reflections-and-ambient-lighting/image-based-lighting.html)); `PARALLEL`, `SPOT`, `POINT`, `AMBIENT` não conferidos |
| Criar luz | `comp.layers.addLight(nome, [x, y])` | não conferido |

Fato Adobe: tipo de luz e Casts Shadows da luz não podem ser animados. Defina antes de criar keyframes.

### Material Options (`ADBE Material Options Group`, "Material Options")

| Propriedade | matchName | Status |
|---|---|---|
| Light Transmission | `ADBE Light Transmission` | conferido ([docsforadobe 3D layer](https://ae-scripting.docsforadobe.dev/matchnames/layer/3dlayer/)) |
| Ambient | `ADBE Ambient Coefficient` | conferido |
| Diffuse | `ADBE Diffuse Coefficient` | conferido |
| Specular Intensity | `ADBE Specular Coefficient` | conferido |
| Specular Shininess | `ADBE Shininess Coefficient` | conferido |
| Metal | `ADBE Metal Coefficient` | conferido |
| Reflection Intensity, Sharpness, Rolloff | `ADBE Reflection Coefficient`, `ADBE Glossiness Coefficient`, `ADBE Fresnel Coefficient` | conferido (propriedades do Cinema 4D renderer) |
| Transparency, Rolloff, Index of Refraction | `ADBE Transparency Coefficient`, `ADBE Transp Rolloff`, `ADBE Index of Refraction` | conferido |
| Casts Shadows | provável `ADBE Casts Shadows` | não conferido |
| Accepts Shadows | provável `ADBE Accepts Shadows` | não conferido |
| Accepts Lights | provável `ADBE Accepts Lights` | não conferido |

Para os três não conferidos: antes de gravar no script, rodar uma sonda que percorre `layer.property("ADBE Material Options Group")` e imprime `matchName`, `name` e `value` de cada filho, numa camada 3D da versão instalada. Os valores Off, On e Only devem ser lidos da sonda (não conferido se são 0, 1, 2).

### Outros pontos para script

- Câmera do parallax e Depth of Field: propriedades da câmera não foram levantadas nesta rodada (ver o estudo de câmera da skill, se houver).
- Efeitos citados que a skill pode aplicar por `addProperty`: CC Radial Fast Blur, Curves, Fill, Gaussian Blur, CC Vignette, CC Slant, Simple Choker, Drop Shadow, Radial Shadow, Lens Flare, Fractal Noise. matchNames de efeito não conferidos nesta rodada.
- Expressão do raio volumétrico, segundo Andrew Kramer (frXQxwMKh6c @06:17): no Center do CC Radial Fast Blur, `thisComp.layer("Ponto").toComp([0,0,0])`. Funciona como em qualquer expressão de After; a versão em que foi mostrada é de 2014.
- Renderer Options do Advanced 3D (Render Quality, Smoothness, Casting Box): acesso por script não conferido.
