# Receitas de cena testadas no AE 26.5 (24 e 25/10/2026)

Armadilhas técnicas em `../armadilhas.md`, seção AE 26.5.

## Objeto que entra girando
- Uma imagem só na entrada. Trocar de pose a cada poucos quadros fica trincado.
- Curva com amortecimento crítico: `r = (1 + 0,5 w t) e^(-w t)`, com w ≈ 3,2. Sai rápido, freia e para sem passar do ponto. Mola com ultrapassagem foi reprovada como "dança".
- Depois de pousar, a deriva fica bem pequena (no máximo 3 px e 1,5°).

## Lente de vidro no formato real
- Os mattes de cada lente saem dos furos do alfa do PNG (componentes fechados que não tocam a borda; feche a fresta da haste com closing).
- Para cada lente, duas camadas de ajuste com `setTrackMatte(matte, TrackMatteType.ALPHA)`:
  - **miolo:** Ampliar 160 % + Inchar;
  - **faixa da borda:** complementar, Ampliar 118 % + desfoque 3. É a "quebra" da borda do vidro.
- Os mattes recebem as mesmas chaves do objeto, quadro a quadro.

## Cacos que voam para a câmera
- **Tamanho:** proporcional à peça que quebrou, de um terço a metade da lente.
- **Escala:** fixa no plano do objeto. Crescem e desfocam sozinhos ao chegar perto.
- **Posição na tela:** segue o caminho com `onde()`, mas desconte a paralaxe da câmera que continua andando: `c * (D/(D+z) - D/(D+z0))`. Sem isso, os cacos saem do quadro.
- **Distância:** perto demais da câmera vira mancha cinza. Pare entre 200 e 400 px à frente do objeto.

## Tipografia palavra a palavra (ref. Stark Media)
- **Cortes:** os tempos vêm da fala (início de cada palavra), não da referência.
- **Fundo:** dois fundos em pré-comp (claro com letra preta, grafite com letra branca), alternados por opacidade em HOLD.
- **Pingo do i que cai:** haste com "ı" (U+0131) e o pingo vindo de uma cópia "ri" com máscara acima da altura do "r". Na Helvetica Neue, o pingo fica entre 0,59 e 0,71 do corpo e o "r" vai até 0,53.
- **Entrada derretendo:** Deslocamento turbulento de 160 até 0, em 3 quadros.
- **Final se desfazendo:** Dissolver em blocos, de 0 a 100, em 4 quadros.

## Anéis de texto girando
- **Montagem:** faixa de 4800 x 200 px cortada em 48 fatias, num círculo de raio 4800 / 2π.
- **Expressões:** cada fatia tem expressões próprias, sem null pai (ver armadilhas).
- **Frase:** no máximo 900 px de largura, para caber no arco da frente. Frase longa vai em duas linhas a 70 px.
- **Tempo:** o anel fica de frente no início da frase falada. A câmera desce de anel em anel com inclinação de 4°. Inclinação maior vê os anéis por dentro.

## Letras recortadas (estilo bilhete)
- Cada letra é uma caixa com fonte e cor diferentes, rotação de -7 a +7° e entrada em escala 150 → 92 → 100 em 4 quadros, com 0,1 s entre uma letra e outra.

## Explosão em formas 3D
- **Formas:** 30 malhas paramétricas (esfera, cubo, cone, toro) em preto, cinza e branco.
- **Física:** posição calculada quadro a quadro, com lançamento, gravidade de 2600 px/s² e quique a -45 %.
- **Sombra:** falsa, uma mancha mole no chão que diminui com a altura.

## Trocas de cena em movimento
- As pré-comps se sobrepõem 0,5 s. A troca sai num movimento (mergulho com desfoque direcional, giro rápido que borra, letras caindo enquanto o papel sobe, recuo de câmera), não num corte seco com clarão.
