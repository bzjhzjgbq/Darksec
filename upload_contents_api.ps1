$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot

function Get-GitHubToken {
  $credential = @"
protocol=https
host=github.com

"@ | git credential fill

  $passwordLine = ($credential -split "`r?`n" | Where-Object { $_ -like "password=*" } | Select-Object -First 1)
  if (-not $passwordLine) {
    throw "GitHub token not found in git credential store."
  }

  return $passwordLine.Substring("password=".Length)
}

function Invoke-GitHub {
  param(
    [Parameter(Mandatory = $true)][string]$Method,
    [Parameter(Mandatory = $true)][string]$Uri,
    [object]$Body
  )

  if ($null -ne $Body) {
    return Invoke-RestMethod -Method $Method -Headers $script:Headers -Uri $Uri -Body ($Body | ConvertTo-Json -Depth 20)
  }

  return Invoke-RestMethod -Method $Method -Headers $script:Headers -Uri $Uri
}

function Get-ExistingSha {
  param(
    [Parameter(Mandatory = $true)][string]$Owner,
    [Parameter(Mandatory = $true)][string]$Repo,
    [Parameter(Mandatory = $true)][string]$Path,
    [Parameter(Mandatory = $true)][string]$Branch
  )

  $encodedPath = [System.Uri]::EscapeDataString($Path).Replace("%2F", "/")
  $uri = "https://api.github.com/repos/$Owner/$Repo/contents/${encodedPath}?ref=$Branch"
  try {
    $response = Invoke-RestMethod -Method Get -Headers $script:Headers -Uri $uri
    return $response.sha
  } catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 404) {
      return $null
    }
    throw
  }
}

$token = Get-GitHubToken
$script:Headers = @{
  Authorization          = "Bearer $token"
  Accept                 = "application/vnd.github+json"
  "X-GitHub-Api-Version" = "2022-11-28"
}

$owner = "bzjhzjgbq"
$repo = "Darksec"
$mainBranch = Invoke-GitHub -Method Get -Uri "https://api.github.com/repos/$owner/$repo/branches/main"
$baseSha = $mainBranch.commit.sha
$branch = "codex/url-5174-preview-" + (Get-Date -Format "yyyyMMdd-HHmmss")

Invoke-GitHub -Method Post -Uri "https://api.github.com/repos/$owner/$repo/git/refs" -Body @{
  ref = "refs/heads/$branch"
  sha = $baseSha
} | Out-Null

$textFiles = @(
  "src/App.jsx",
  "src/index.css",
  "src/components/auth/RegisterForm.jsx",
  "src/components/layout/MainLayout.jsx",
  "src/components/layout/MainNavbar.jsx",
  "src/components/layout/UserMenu.jsx",
  "src/pages/AuthPage.jsx",
  "src/pages/LoginPage.jsx",
  "src/pages/RegisterPage.jsx",
  "src/utils/normalizeUser.js",
  "src/api/competitionApi.js",
  "src/data/mockCompetitions.js",
  "src/pages/CompetitionDetailPage.jsx",
  "src/pages/CompetitionsPage.jsx",
  "src/components/competition/CompetitionFilterPanel.jsx",
  "src/components/competition/CompetitionList.jsx",
  "src/components/competition/CompetitionListItem.jsx",
  "src/components/competition/CompetitionResources.jsx",
  "src/components/competition/CompetitionSearchBar.jsx",
  "src/components/competition/CompetitionTipsPanel.jsx",
  "src/components/competition/RecentCompetitions.jsx"
)

$binaryFiles = @(
  "public/competition-resources/ministry-competition-list.pdf",
  "public/competition-resources/nuist-competition-catalog-2026.pdf"
)

foreach ($file in $textFiles) {
  Write-Output "uploading text: $file"
  $content = Get-Content $file -Raw
  $encoded = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($content))
  $sha = Get-ExistingSha -Owner $owner -Repo $repo -Path $file -Branch "main"

  $body = @{
    message = "sync preview: $file"
    content = $encoded
    branch  = $branch
  }

  if ($sha) {
    $body.sha = $sha
  }

  $encodedPath = [System.Uri]::EscapeDataString($file).Replace("%2F", "/")
  try {
  Invoke-GitHub -Method Put -Uri "https://api.github.com/repos/$owner/$repo/contents/${encodedPath}" -Body $body | Out-Null
  } catch {
    Write-Output "failed text: $file"
    throw
  }
}

foreach ($file in $binaryFiles) {
  Write-Output "uploading binary: $file"
  $encoded = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path $file)))
  $sha = Get-ExistingSha -Owner $owner -Repo $repo -Path $file -Branch "main"

  $body = @{
    message = "sync preview: $file"
    content = $encoded
    branch  = $branch
  }

  if ($sha) {
    $body.sha = $sha
  }

  $encodedPath = [System.Uri]::EscapeDataString($file).Replace("%2F", "/")
  try {
  Invoke-GitHub -Method Put -Uri "https://api.github.com/repos/$owner/$repo/contents/${encodedPath}" -Body $body | Out-Null
  } catch {
    Write-Output "failed binary: $file"
    throw
  }
}

[pscustomobject]@{
  branch  = $branch
  compare = "https://github.com/$owner/$repo/compare/main...$branch"
} | ConvertTo-Json -Compress
