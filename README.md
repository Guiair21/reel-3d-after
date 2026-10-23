# reel-3d-after

Skill para agentes de código (Claude Code e compatíveis com o formato `SKILL.md`) que monta Reels verticais com cara de 3D no **After Effects 26.x por ExtendScript**: imagens recortadas viram camadas em Z com escala compensada, câmera real com profundidade de campo, foco que puxa entre planos, legendas 3D por cima de vídeo de alguém falando, lupa de vidro que amplia de verdade e modelo GLB em órbita.

O princípio da skill: **o movimento de câmera se copia por medição, não no olho.** Tem script para medir a câmera da referência por fluxo óptico, medir a cor do fundo e das sombras, e comparar o seu render com a referência em números.

Texto em português do Brasil. Testado no Windows 11 com After Effects 26.5 em pt-BR.

## Instalar

```bash
git clone https://github.com/Guiair21/reel-3d-after ~/.claude/skills/reel-3d-after
pip install -r ~/.claude/skills/reel-3d-after/requirements.txt
```

Também precisa de `ffmpeg`, `ffprobe` e `yt-dlp` no PATH, Python 3.10+ e After Effects 26.x. Os scripts `.sh` assumem o Git Bash do Windows (`cygpath`, `timeout`); o `.ps1` pede PowerShell 7 (`pwsh`). O After em outro idioma ou outro caminho: veja "Antes de começar" no `SKILL.md`.

## O que tem aqui

| Arquivo | Para quê |
|---|---|
| `SKILL.md` | O fluxo inteiro, a tabela de valores que funcionaram e os erros que mais custam |
| `armadilhas.md` | Tudo que derrubou o After ou saiu errado, com a solução |
| `legendas-sobre-video.md` | Legenda 3D palavra a palavra por cima de filmagem real |
| `scripts/ae_3d_lib.jsx` | Biblioteca ExtendScript: cena, câmera medida, foco, texto, formas, modelo 3D, lente de vidro |
| `scripts/exemplo.jsx` | Projeto mínimo que usa a biblioteca: uma cena, uma imagem, um título e a câmera |
| `scripts/medir_camera.py` | Zoom, deslize lateral, tranco e pico de um vídeo por fluxo óptico |
| `scripts/medir_cor.py` | RGB do fundo e das sombras para calibrar o acabamento |
| `scripts/achatar_fundo.py`, `recortar_brancos.py`, `lentes_transparentes.py` | Preparo dos PNG: fundo chapado, recorte com sombra no alfa, vidro transparente |
| `scripts/preparar_voz.py`, `transcricao_para_falas.py` | Tempo por palavra da narração para sincronizar o texto |
| `scripts/quadros.sh`, `render_independente.ps1`, `acabamento.sh` | Folha de quadros, render que sobrevive ao agente, cor + aberração cromática + grão |
| `estudos/` | Lentes e foco, luz no After, luz cinematográfica, parallax e referências visuais, cada um com fontes e pontos a conferir |

## Licença

MIT. Os estudos citam vídeos e documentação de terceiros como "segundo <autor>"; os links estão nos arquivos `-fontes.md`.
