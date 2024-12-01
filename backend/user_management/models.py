# user_management/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.text import slugify


class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = [
        ('admin', 'Admin'),
        ('staff', 'Staff'),
        ('student', 'Student'),
    ]

    # User Type Field
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='student')

    # Additional fields for user profile
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=15, unique=True, blank=True)

    # Override the username field to allow auto-generation
    username = models.CharField(max_length=150, unique=True, editable=False)

    def save(self, *args, **kwargs):
        # Automatically generate the username if it hasn't been set
        if not self.username:
            base_username = slugify(self.full_name)
            username = base_username

            # Generate a unique username if a duplicate exists
            counter = 1
            while CustomUser.objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1

            self.username = username

        # Set permissions for admin users only if explicitly assigned
        if not self.pk and self.is_superuser:
            self.user_type = 'admin'
        self.is_superuser = self.user_type == 'admin'
        self.is_staff = self.user_type in ['admin', 'staff']

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"

    def set_password(self, raw_password):
        super().set_password(raw_password)  # Hash and set the password
        if raw_password and not self.is_active:  # Check if the account is inactive
            self.is_active = True  # Activate the account
        self.save()  # Save changes to the database
