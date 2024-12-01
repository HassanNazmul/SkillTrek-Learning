# PowerShell script to create a new Django project or app in the current directory

# Ensure script fails if any command fails
$ErrorActionPreference = "Stop"

# Check if manage.py exists to determine if a Django project already exists
if (Test-Path -Path "./manage.py") {
    # If manage.py exists, assume it's a Django project and prompt for an app name
    Write-Output ""
    $appName = (Read-Host -Prompt "Enter the Django app name").Trim()
    Write-Output ""

    Write-Output "Creating a new Django app named: $appName"

    python manage.py startapp $appName
    Write-Output ""
    
    Write-Output "Django app '$appName' created successfully."
    Write-Output "=============================================================="
} else {
    # If manage.py does not exist, prompt for a project name and create a new project
    Write-Output ""
    $projectName = (Read-Host -Prompt "Enter the Django project name").Trim()
    
    Write-Output ""
    Write-Output "Creating a new Django project named: $projectName"

    django-admin startproject $projectName .
    Write-Output ""
    
    Write-Output "Django project '$projectName' created successfully."
    Write-Output "=============================================================="
}
