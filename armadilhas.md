# Armadilhas do reel-3d-after (todas vistas na prática, out/2026, AE 26.5 no Windows)

## After Effects por script
- Na 26.5 o `app.quit()` às vezes não fecha o After (fica aberto com o projeto). Depois do log dar OK: `Get-Process AfterFX` e, se ainda estiver aberto, `Stop-Process`. Instância presa faz o aerender falhar em silêncio (nenhum quadro).
- Em bash, `"$WP\$AEP"` escapa o cifrão e o caminho sai literal: montar com uma variável `SEP='\'` (ver `quadros.sh`).
- **Instância única:** com um AfterFX já aberto, um segundo `AfterFX.exe -r` entrega o script à instância aberta e sai em segundos (sem log, sem .aep). Duas sessões de agente no mesmo PC se atropelam. Revezar com uma trava `ae.lock` numa pasta fixa de trabalho: conferir `Get-Process AfterFX,aerender`, criar a trava com o nome da sessão, rodar, apagar no fim: **só se o conteúdo for o nome da sua sessão** (`grep -qx "minha-sessao" ae.lock && rm ae.lock`): um vigia que apaga às cegas derruba a trava de quem entrou logo depois. Rodar o `-r` **bloqueante** (`timeout 420 AfterFX.exe -r ...` no bash): `Start-Process` devolve em ~7 s e esconde se o script rodou. Esperar a **trava de outra sessão** com `until` em segundo plano (barato; se o vigia for morto por falta de memória, conferir de novo). Esperar o **seu próprio render** é diferente: laço em primeiro plano com timeout 600 (ver SKILL.md, passo 6), porque o vigia em segundo plano é encerrado justamente quando o render aperta a memória.
- Sintoma "rodou e não gravou log nem .aep" é quase sempre a instância única, não a preferência "Permitir que scripts gravem arquivos". Não editar o arquivo de preferências: o After o reescreve ao fechar e a mudança some.
- `AfterFX.exe -noui -r` **não roda** script. Usar `AfterFX.exe -r arquivo.jsx` e `app.quit()` no fim; log em arquivo (o AE não mostra erro).
- Câmera nova herda a última configuração (saiu inclinada): fixar `Orientation` e rotações X/Y/Z em 0 e usar `autoOrient = CAMERA_OR_POINT_OF_INTEREST`.
- Templates do aerender vêm no idioma do AE: em pt-BR, "Melhores configurações", "Sequência TIFF com alfa", "H.264 - Corresponder configurações de renderização - 40 Mbps".
- Fonte precisa estar instalada no Windows; o AE troca sem avisar. Conferir `textDocument.font` no log. Instalar por usuário: copiar para `%LOCALAPPDATA%\Microsoft\Windows\Fonts` + chave em `HKCU:\Software\Microsoft\Windows NT\CurrentVersion\Fonts`; reabrir o AE.
- `sourceRectAtTime(0)` com letras ainda invisíveis dá caixa errada: medir no fim da comp.
- Ler `S.valueAtTime(0,true)` e `P.valueAtTime(0,true)` **antes** de criar as chaves de voo.
- `ADBE Text Range Shape` em rampa (2/3) estende a seleção para fora do intervalo: usar 1 (quadrada) + `ADBE Text Selector Smoothness` 100.
- Câmera chave a chave com easy ease para e arranca; preferir `setValuesAtTimes` com a curva calculada por quadro.
- Matchnames de sombra: camada `ADBE Material Options Group` > `ADBE Casts Shadows` (0/1/2=Só), `ADBE Accepts Shadows` (2 = só a sombra, "shadow catcher"), `ADBE Accepts Lights`. Ler propriedade de luz em loop travou o script: acessar por nome. **Vale para efeito também:** um laço lendo `.name` e `.value` de todas as propriedades do Drop Shadow derrubou o After, e o log parou na linha anterior (parecia culpa do Gradient Ramp, que não era). Para sondar efeito, usar uma comp separada e ler só `matchName` e `name`.
- **Classic 3D na 26.5: mexer em sombra por script derrubou o After na hora**, sem passar pelo try/catch. Testado: `ADBE Accepts Shadows` com 0, 1 ou 2, em vídeo e em sólido, e `ADBE Light Casts Shadows` 0 na luz. `ADBE Casts Shadows` 0 e `ADBE Accepts Lights` 0 passaram. O After abria com "GPU3 failed (previous) sanity test", e os relatos ligam esse aviso a falha de 3D com luz por pouca memória de vídeo (sem confirmação oficial). Solução usada: luz (spot + ambiente) sem nenhuma propriedade de sombra, e a sombra suave pelo efeito Drop Shadow.
- **Sólido 3D com Fractal Noise no Classic 3D derruba o After** (26.5), mesmo com o projeto em CPU (`gpuAccelType = SOFTWARE`) e sem expressão: o script segue algumas linhas e o After fecha sozinho, sem erro no log. Névoa vai em 2D na comp final, com a posição presa a um null 3D da cena por `comp("cena").layer("NEVOA").toComp([0,0,0])`.
- **Achar a linha que derruba o After:** a função `L()` do log precisa abrir, gravar e fechar a cada linha (`log.open("a")`). Com o arquivo aberto o script todo, o After cai e as últimas linhas somem do log.
- **Script morre calado ao juntar texto com Array (AE 2026).** `"pos " + prop.value` (ou `keyValue`) derruba o script sem erro e sem cair no `catch`: o log fica vazio porque o arquivo nunca fecha, e o que veio antes já foi aplicado (ex.: camada importada duas vezes em duas tentativas). Sempre `prop.value.toString()`. Sintoma enganoso: parece que o After travou a fila de scripts, mas um teste mínimo (`app.project.file.name`) roda normal.
- **Comentário que começa com `// @` derruba o script inteiro.** O ExtendScript lê `//@` (com ou sem espaço) como diretiva de pré-processador, do tipo `//@include`, e recusa o arquivo sem aviso: nada roda, nem o `f.open` do log. Diagnóstico: rodar `$.evalFile(arquivo)` dentro de try/catch, que devolve "SyntaxError" com a linha. Nunca começar comentário com @.
- **`inPoint` depois `outPoint` numa camada de imagem parada desloca o `startTime`.** `ly.inPoint = 1; ly.outPoint = dur` deixou a camada começando em 0 (startTime -1), e o log dizia "entra em 1 s". Para fixar entrada: `ly.startTime = t; ly.inPoint = t; ly.outPoint = dur`, e conferir lendo `inPoint` de volta.

## Modelo 3D (GLB) no Advanced 3D: testado no AE 26.5
- `importFile` do .glb + `layers.add` funcionam; a camada já vem 3D (grupo `ADBE3D Material Parade`). `comp.renderer = "ADBE Calder"`.
- **Mexer em `ADBE Material Options Group` > `ADBE Casts Shadows` de um modelo DERRUBA o After** (o try/catch não pega). Não tocar: o modelo já projeta sombra.
- Luz: `LightType.ENVIRONMENT` (intensidade ~140) + `PARALLEL` (~110, `ADBE Casts Shadows` 1 na luz, Shadow Darkness 22, Diffusion 60: os valores do `luzEstudio()`; 45 ficou pesado demais). Chão = sólido 3D deitado (Rotate X 90) com `ADBE Accepts Shadows` = 2 (só a sombra), na altura da base do modelo.
- O pivô do modelo não é o centro: medir onde fica a base num quadro e ajustar posição/chão.
- DOF no Advanced 3D é bem mais forte: abertura ~90 (no Classic 3D eram 350-420). Câmera filha de um null "pivô" para orbitar.
- Modelo gerado por IA a partir de uma foto (Hunyuan3D v3) de uma coluna saiu bom: caneluras e capitel visíveis em órbita de 40°. Não tem motion blur no Advanced 3D: movimento rápido fica serrilhado.

## Lente de vidro (lupa) que amplia de verdade
- Nunca disco branco com texto dentro: lupa é vidro, amplia o que está atrás. Reprovado em revisão exatamente por isso ("lupa fisicamente aumenta as coisas e é de vidro").
- Receita: lente do PNG transparente (`lentes_transparentes.py`); o texto fica **escrito pequeno no fundo desde o começo** (a lente só revela); camada de ajuste 2D **entre** o fundo e a lupa com `ADBE Magnify` (2 Centro, 3 Ampliação, 5 Tamanho, 6 Difusão) + `ADBE Bulge` (1/2 raios, 3 centro, 4 altura ~0,45), centro e raio por expressão `thisComp.layer("lupa").toComp([cx, cy, 0])` (cx, cy = centro da lente em pixels do PNG).
- 150 % de ampliação para um texto de 2 linhas pequenas caber na lente; 185 % cortava. Cada linha sobre uma área de cor, nunca sobre a emenda clara. Foco da câmera no plano do fundo (o que é ampliado), não na lupa.

## Composição e imagem
- `mix-blend-mode`/modo multiplicar dentro de grupo isolado (transform, filter) mistura com transparente → retângulo branco. No AE, preferir PNG com alfa; no navegador, dar fundo ao grupo.
- Papel e coluna brancos somem em multiplicar: recortar com rembg (`recortar_brancos.py`) e manter a sombra no alfa.
- Lente (óculos, lupa) sai opaca no recorte: `lentes_transparentes.py`. Objeto que voa: tirar a sombra separada.
- Texto sobre papel: pelo menos 20-25 px à frente em Z.
- Imagem gerada vem com fundo ~205-233 e vinheta: achatar antes (`achatar_fundo.py`).

## Render e máquina
- `render_independente.ps1` precisa rodar com **pwsh** (PowerShell 7) ou estar salvo em UTF-8 com BOM: o `powershell` antigo lê sem acento e o aerender responde "No render settings template was found" (sem render nenhum).
- Cena com modelo 3D: `cena(nome, dur, "ADBE Calder")` desde o início; o Advanced 3D recusa motion blur (erro "O desfoque de movimento não é aceito") e esconde o Blur Level da câmera.
- No Advanced 3D, texto e forma também projetam sombra: desligar `ADBE Casts Shadows` (0) nelas e deixar só nos objetos (no modelo não mexer).
- Tarefa em segundo plano do agente é encerrada quando a memória aperta: lançar aerender com `render_independente.ps1` (Start-Process) e `-mem_usage 40 70`.
- Atualizar o AE pela Creative Cloud **remove a versão anterior** se não marcar "manter": ajustar os caminhos dos scripts (AE 2026 = 26.x).
- ffmpeg `mergeplanes` exige `setsar=1` em todos os planos; escalar o azul para baixo deixa moldura escura: escalar vermelho e verde para cima e recortar.

## Movimento (medido por fluxo óptico)
- Referência que calibrou a skill (estilo Kaloyan): zoom mediano 0,078 %/q; lateral mediano 0,22, p90 2,6 px/q; parado 33 %; tranco 0,49; pico 3,97 (largura 270).
- Versão só com zoom: lateral p90 0,12 → "zoom digital". Versão com deslize forte: pico 6,6 → brusco. Versão que bateu: entra 170 / tau 0,38 / sai 150.
- Cena da lupa na referência: câmera parada, só os objetos se movem. Tela final (CTA): avanço rápido na entrada (zoom ~7 %/q caindo).
