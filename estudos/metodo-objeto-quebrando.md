# Método "objeto foto-realista quebrando", lido num projeto de referência (24/10/2026)

Fonte primária: um `.aep` distribuído pelo próprio autor, aberto por script no After, e o tutorial que ele publicou. Números abaixo são do arquivo, não de estimativa.

## 1. Objeto é PNG, nunca modelo 3D
- O objeto principal é imagem gerada por IA. Os cacos de vidro são recortados um a um no Photoshop, **cada caco numa camada** do PSD (6 cacos) + uma camada de partículas finas.
- A versão quebrada é outra imagem, trocada dentro de um salto de câmera borrado de 1 quadro.
- Por isso nenhum modelo 3D (Tripo, Sketchfab, Blender) chega nesse acabamento: o foto-realismo vem da imagem.
- **Caco nunca é forma vetorial branca semitransparente:** é PNG de vidro com borda escura e reflexo. Se não houver PNG, renderizar cacos de vidro no Blender com fundo transparente.

## 2. Camadas 3D em Z, câmera real (comp 1080x1920, 30 qps, 5 s)
Câmera em Z = -1049, zoom 1050, distância de foco 1050, abertura 17,7 (no motor do projeto; no Classic 3D a abertura que funciona continua 350-420).
| Camada | Z | Escala | Truque |
|---|---|---|---|
| objeto principal | 957 | 143% | `wiggle(.5,10)` na posição; gira -15,8° em Z ao longo da cena |
| moldura | 1400 | 233% | curvas de luz e de sombra separadas + glow vermelho |
| elementos secundários (9 cópias grande/média/pequena) | ~1450 | 267% | modo Tela, tingidas, glow; sobem devagar |
| cacos de lado | 2242 | 1104% | entram no 1º segundo com giro; time remap lento |
| título 3D | 2412 | 332% | chanfro alfa + glow |
| fundo pintado | 3000 | 496% | desfoque gaussiano + curvas + matiz |
| câmera | -1049 | | `wiggle(.33,8)` na posição + 2 chaves no 1º segundo (aproximação) |
Tremor: aqui ele existe (wiggle lento e pequeno). A regra da skill continua: só usar se a referência medida mostrar.

## 3. A luz enevoada (o passo mais importante, segundo o autor)
1. `beam light - MASK`: sólido em **Tela** com máscara em forma de feixe; Opacidade `5+wiggle(fq, ampli)` com dois Controles deslizantes animados (o feixe respira).
2. `beam fog`: sólido com **Fractal Noise** (Contraste 218, Brilho -25, Escala 142, Deslocar turbulência e Evolução animados ao longo da comp), Opacidade 16%, recortado pela **mesma máscara** do feixe por expressão: `thisComp.layer("beam light - MASK").mask("Masque 1").maskPath`.
3. Camada de ajuste de sombra com **Exposição -0,635** + expressão que acompanha o feixe (escurece o que está fora da luz).
4. Vinheta e desfoque lateral (Desfoque de lente da câmera raio 12 + Exposição -0,3 só nas laterais, por máscara).

## 4. Acabamento, de cima para baixo
Uma camada de cores com controles (títulos, parágrafo, sombras, reflexos, glow vermelho) ligados por expressão a todas as camadas: troca a paleta num lugar só. Depois: Universe Finisher, Magic Bullet Looks, ajuste "plat" (Curvas, Brilho e contraste, Níveis, Matiz/saturação), poeira em vídeo no modo Tela, Desfoque composto + BCC Prism (aberração cromática) com 8 máscaras, Lens Dirt em Tela com Níveis e Tonalidade, textura de riscos em Tela.

## 5. Plugins pagos do projeto e o substituto nativo
| Plugin | Nativo |
|---|---|
| Deep Glow 2 | Brilho (`ADBE Glo2`) empilhado, raios diferentes |
| BCC Prism | aberração no `acabamento.sh` (canais deslocados) ou Separação RGB por Deslocamento |
| Magic Bullet Looks, Universe Finisher | Curvas + Lumetri; o `colorbalance` do `acabamento.sh` |
A poeira, a sujeira de lente e os riscos são só mídia em Tela: dá para gerar ou usar banco gratuito.
