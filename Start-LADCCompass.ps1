$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$bundledNode = Join-Path $env:USERPROFILE ".cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
$localNext = Join-Path $projectRoot "node_modules\next\dist\bin\next"

if (Test-Path $bundledNode) {
  $node = $bundledNode
} else {
  $node = (Get-Command node -ErrorAction Stop).Source
}

if (-not (Test-Path $localNext)) {
  throw "Next.js dependencies were not found. Run your package install first, then try again."
}

Write-Host "Starting LADC Compass at http://localhost:3000"
& $node $localNext start -p 3000
