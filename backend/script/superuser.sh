#!/bin/bash

# Define superuser details
username="nahid"          # Change this to your desired username
email="NHassan96@outlook.com"  # Change this to your desired email
password="rootadmin"   # Change this to your desired password

# Setting environment variables for Django to use
export DJANGO_SUPERUSER_USERNAME="$username"
export DJANGO_SUPERUSER_EMAIL="$email"
export DJANGO_SUPERUSER_PASSWORD="$password"

# Running the createsuperuser management command
echo "Creating superuser with username: $username, email: $email..."

# Use --noinput to bypass prompts
python manage.py createsuperuser --noinput

echo "Superuser created successfully."
