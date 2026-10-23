# Lança o aerender como processo independente do Windows (tarefa em segundo plano de um agente é morta
# quando a memória aperta; processo lançado assim sobrevive). Devolve o PID para esperar.
# Uso: pwsh -File render_independente.ps1 -Proj C:\projetos\meu-reel\ae -Aep projeto.aep -Comp "Principal"
#      [-Aerender "<caminho do aerender.exe>"] [-RS "Best Settings"] [-OM "TIFF Sequence with Alpha"]
# Precisa de pwsh (PowerShell 7) ou do arquivo salvo em UTF-8 com BOM: o powershell antigo perde o acento dos templates.
param([string]$Proj, [string]$Aep, [string]$Comp,
      [string]$Aerender = "C:\Program Files\Adobe\Adobe After Effects 2026\Support Files\aerender.exe",
      [string]$RS = "Melhores configurações", [string]$OM = "Sequência TIFF com alfa")
New-Item -ItemType Directory -Force "$Proj\out\seq" | Out-Null
$argumentos = '-project "' + "$Proj\$Aep" + '" -comp "' + $Comp + '" -RStemplate "' + $RS + '" -OMtemplate "' + $OM + '" -output "' + "$Proj\out\seq\f_[#####].tif" + '" -mem_usage 40 70'
$p = Start-Process -FilePath $Aerender -ArgumentList $argumentos `
     -RedirectStandardOutput "$Proj\out\render.log" -RedirectStandardError "$Proj\out\render_err.log" -WindowStyle Hidden -PassThru
$p.Id
