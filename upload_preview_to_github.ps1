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
    return Invoke-RestMethod -Method $Method -Headers $script:Headers -Uri $Uri -Body ($Body | ConvertTo-Json -Depth 100)
  }

  return Invoke-RestMethod -Method $Method -Headers $script:Headers -Uri $Uri
}

$token = Get-GitHubToken
$script:Headers = @{
  Authorization           = "Bearer $token"
  Accept                  = "application/vnd.github+json"
  "X-GitHub-Api-Version"  = "2022-11-28"
}

$owner = "bzjhzjgbq"
$repo = "Darksec"
$branch = "codex/github-main-preview-sync-" + (Get-Date -Format "yyyyMMdd-HHmmss")

$mainBranch = Invoke-GitHub -Method Get -Uri "https://api.github.com/repos/$owner/$repo/branches/main"
$baseSha = $mainBranch.commit.sha
$baseCommit = Invoke-GitHub -Method Get -Uri "https://api.github.com/repos/$owner/$repo/git/commits/$baseSha"
$baseTreeSha = $baseCommit.tree.sha

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

$tree = New-Object System.Collections.Generic.List[object]

foreach ($file in $textFiles) {
  $content = Get-Content $file -Raw
  $tree.Add(@{
    path    = $file
    mode    = "100644"
    type    = "blob"
    content = $content
  })
}

foreach ($file in $binaryFiles) {
  $blob = Invoke-GitHub -Method Post -Uri "https://api.github.com/repos/$owner/$repo/git/blobs" -Body @{
    content  = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes((Resolve-Path $file)))
    encoding = "base64"
  }

  $tree.Add(@{
    path = $file
    mode = "100644"
    type = "blob"
    sha  = $blob.sha
  })
}

$newTree = Invoke-GitHub -Method Post -Uri "https://api.github.com/repos/$owner/$repo/git/trees" -Body @{
  base_tree = $baseTreeSha
  tree      = $tree
}

$newCommit = Invoke-GitHub -Method Post -Uri "https://api.github.com/repos/$owner/$repo/git/commits" -Body @{
  message = "Sync invite-code auth and competition preview"
  tree    = $newTree.sha
  parents = @($baseSha)
}

Invoke-GitHub -Method Patch -Uri "https://api.github.com/repos/$owner/$repo/git/refs/heads/$branch" -Body @{
  sha   = $newCommit.sha
  force = $true
} | Out-Null

[pscustomobject]@{
  branch = $branch
  commit = $newCommit.sha
  compare = "https://github.com/$owner/$repo/compare/main...$branch"
} | ConvertTo-Json -Compress
