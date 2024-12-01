# course/models.py

from django.db import models
from django.contrib.auth import get_user_model
from datetime import timedelta
from django.utils import timezone

User = get_user_model()


class Module(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Topic(models.Model):
    module = models.ForeignKey(Module, related_name='topics', on_delete=models.CASCADE)
    title = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True, null=True)
    url = models.URLField(max_length=300, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name='enrollments')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    duration = models.PositiveIntegerField(help_text="Duration in days")

    @property
    def expires_at(self):
        # Calculate expires_at based on enrolled_at and duration
        return self.enrolled_at + timedelta(days=self.duration)

    def is_active(self):
        # Check if the current time is before the expiration date
        return timezone.now() < self.expires_at

    def __str__(self):
        return f"{self.student.username} enrolled in {self.module.name} for {self.duration} days"
