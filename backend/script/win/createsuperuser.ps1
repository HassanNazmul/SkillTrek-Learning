# PowerShell script to create a Django superuser

# Ensure script fails if any command fails
$ErrorActionPreference = "Stop"

# Define superuser details
$username = "nahid"           # Change this to your desired username
$email = "N.Hassan@txtiv.com"   # Change this to your desired email
$password = "rootadmin"        # Change this to your desired password

# Setting environment variables for Django to use
$env:DJANGO_SUPERUSER_USERNAME = $username
$env:DJANGO_SUPERUSER_EMAIL = $email
$env:DJANGO_SUPERUSER_PASSWORD = $password

# Running the createsuperuser management command
Write-Output "Creating superuser with username: $username, email: $email..."

# Use --noinput to bypass prompts
python manage.py createsuperuser --noinput

Write-Output "Superuser created successfully."
