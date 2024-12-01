# PowerShell script to make and apply migrations in a Django project

# Ensure script fails if any command fails
$ErrorActionPreference = "Stop"

# Display header for migrations
Write-Output ""
Write-Output "=============================================================="
Write-Output "                Django Migration Script                        "
Write-Output "=============================================================="
Write-Output ""

# Start migrations
Write-Output "Making Migrations..."
Write-Output ""
python manage.py makemigrations
Write-Output "Migrations completed."

Write-Output ""
Write-Output "Applying Migrations..."
Write-Output ""
python manage.py migrate
Write-Output ""
Write-Output "Migrations applied successfully."

Write-Output ""
Write-Output "=============================================================="
Write-Output "            Migrations completed successfully!                "
Write-Output "=============================================================="
Write-Output ""

# Prompt user to decide whether to run the server
Write-Output "Do you want to run the server? Press 1 for Yes or 0 for No"

# Capture a single key press
$keyPress = [System.Console]::ReadKey($true).KeyChar

# Check user input and take action based on the key press
if ($keyPress -eq "1") {
    Write-Output ""
    Write-Output "=============================================================="
    Write-Output "               Starting Django Development Server              "
    Write-Output "=============================================================="
    Write-Output ""
    
    # Run the run.ps1 script located in the 'win' folder
    & "$PSScriptRoot/run.ps1"
} elseif ($keyPress -eq "0") {
    # Clear the terminal if the user entered 0
    Write-Output ""
    Write-Output "Clearing terminal..."
    Clear-Host
} else {
    Write-Output ""
    Write-Output "Invalid input. Please press 1 to run the server or 0 to clear the terminal."
}