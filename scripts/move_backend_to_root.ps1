<#
Move the Laravel backend out of the frontend workspace into a top-level folder.
This script moves the folder \smartbus-frontend\SMARTBUS_BACKEND_temp_backup\SMARTBUS_BACKEND_APP to E:\SMARTBUS_BACKEND.
It will:
 - create E:\SMARTBUS_BACKEND if it doesn't exist
 - move the project files there
 - remove the vendor directory to force a fresh `composer install` on the target if desired

Run this in PowerShell as an interactive script:
  cd E:\smartbus-frontend\scripts
  .\move_backend_to_root.ps1
#>

$source = Join-Path (Split-Path $PSScriptRoot -Parent) 'SMARTBUS_BACKEND_temp_backup\SMARTBUS_BACKEND_APP'
$dest = 'E:\SMARTBUS_BACKEND'

Write-Host "Source: $source"
Write-Host "Destination: $dest"

if (!(Test-Path $source)) {
    Write-Error "Source project not found: $source"; exit 1
}

if (Test-Path $dest) {
    $answer = Read-Host "Destination $dest already exists. Type 'overwrite' to remove and continue"
    if ($answer -ne 'overwrite') { Write-Host 'Aborting'; exit }
    Remove-Item -Recurse -Force $dest
}

# Move the project
Write-Host 'Moving project...'
Move-Item -Path $source -Destination $dest

# Optionally remove vendor to force composer install later
if (Test-Path (Join-Path $dest 'vendor')) {
    Write-Host 'Removing vendor directory to ensure fresh composer install on destination.'
    Remove-Item -Recurse -Force (Join-Path $dest 'vendor')
}

Write-Host "Done. Backend moved to $dest"
Write-Host "Next steps:"
Write-Host "  cd $dest"
Write-Host "  composer install"
Write-Host "  Copy .env.example to .env and set DB credentials"
Write-Host "  php artisan key:generate"
Write-Host "  Import schema.sql (mysql -u root -p < schema.sql)"
Write-Host "  php artisan migrate"
Write-Host "  php artisan serve --host=127.0.0.1 --port=8000"
