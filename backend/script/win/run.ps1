# PowerShell script to run the Django development server

# Ensure the script stops if any command fails
$ErrorActionPreference = "Stop"

# Inform the user that the server is starting
Write-Output "Starting Django development server..."

# Run the Django development server
python manage.py runserver