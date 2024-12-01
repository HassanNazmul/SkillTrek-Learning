from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models


class Review(models.Model):
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=1,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ]
    )
    reviewer_name = models.CharField(max_length=50, blank=False, null=False)
    review_text = models.TextField(blank=False, null=False)
    review_date = models.DateField(blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.reviewer_name
