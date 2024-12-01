from django.db import models


class Service(models.Model):
    image = models.ImageField(upload_to='services/', blank=False, null=False)

    title = models.CharField(max_length=50, blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    link = models.URLField(blank=False, null=False, unique=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
