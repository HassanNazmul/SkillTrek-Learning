from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models


# Create your models here.

class User(AbstractUser):
    # User Types as choices
    ADMIN = 'admin'
    STUDENT = 'student'

    USER_TYPE_CHOICES = [
        (ADMIN, 'Admin'),
        (STUDENT, 'Student'),
    ]

    # Remove username field
    username = None
    email = models.EmailField(unique=True, max_length=255)

    # Additional Custom fields
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default=STUDENT)

    # Use email as username and set it as unique
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'user_type']

    # Timestamps for creation and update
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)

    # Add related_name to avoid clashes with auth.User model
    groups = models.ManyToManyField(Group, related_name='custom_user_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions', blank=True)

    # Metaclass with multiple ordering fields
    class Meta:
        ordering = ['first_name', 'last_name', 'date_created', 'date_updated', 'email']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['user_type']),
            models.Index(fields=['date_created']),
            models.Index(fields=['date_updated']),
        ]

    def __str__(self):
        return f"({self.get_user_type_display()}){self.first_name} {self.last_name}"
