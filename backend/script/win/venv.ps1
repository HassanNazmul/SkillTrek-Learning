# PowerShell script to set up a Python virtual environment for the project

# Ensure script fails if any command fails
$ErrorActionPreference = "Stop"

# Display header for virtual environment setup
Write-Output ""
Write-Output "=============================================================="
Write-Output "                      Virtual Environment                     "
Write-Output "=============================================================="
Write-Output ""

# Check if the 'venv' or '.venv' virtual environment folder exists and activate accordingly
if (Test-Path -Path "venv") {
    Write-Output "Virtual environment already exists."
    Write-Output ""
    Write-Output "               Virtual environment Activated!                 "
    Write-Output "=============================================================="
    .\venv\Scripts\Activate
} elseif (Test-Path -Path ".venv") {
    Write-Output "Virtual environment already exists."
    Write-Output ""
    Write-Output "               Virtual environment Activated!                 "
    Write-Output "=============================================================="
    .\.venv\Scripts\Activate
} else {
    # If neither 'venv' nor '.venv' exists, create '.venv' by default
    Write-Output "Creating virtual environment..."
    python -m venv .venv

    Write-Output ""
    Write-Output "Activating virtual environment..."
    .\.venv\Scripts\Activate
    Write-Output ""
    Write-Output ""
    Write-Output "               Virtual environment Activated!                 "
    Write-Output "=============================================================="

    # Upgrade pip in case it wasn't upgraded during creation
    Write-Output ""
    Write-Output "Upgrading pip..."
    Write-Output ""

    python.exe -m pip install --upgrade pip
    Write-Output ""
    Write-Output "PIP upgraded successfully."
    Write-Output "=============================================================="


    # Check if requirements.txt exists before attempting to install dependencies
    Write-Output ""
    if (Test-Path -Path "requirements.txt") {
        Write-Output "Installing dependencies..."
        Write-Output ""
        pip install -r requirements.txt
        Write-Output ""
        Write-Output "Dependencies installed successfully."
        Write-Output ""


    } else {
        Write-Output ""
        Write-Output "No requirements.txt file found. Skipping dependency installation."
        Write-Output ""

    }
    Write-Output "=============================================================="
    Write-Output "             Virtual environment is ready to smash!           " 
    Write-Output "=============================================================="

}

Write-Output ""
Write-Output "Press any key to continue..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Clear-Host