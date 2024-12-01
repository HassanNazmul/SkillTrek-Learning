from decimal import Decimal
from rest_framework import serializers

from landing_page.models.review_models import Review


class ReviewSerializer(serializers.ModelSerializer):
    rating = serializers.DecimalField(
        max_digits=3,  # Ensures sufficient total digits
        decimal_places=1,  # Ensures one decimal place
        min_value=Decimal('1.0'),
        max_value=Decimal('5.0')
    )
    review_date = serializers.DateField(input_formats=["%d-%m-%Y"])

    class Meta:
        model = Review
        fields = ['id', 'reviewer_name', 'review_text', 'rating', 'review_date', 'created_at', 'updated_at']
        read_only_fields = ['slug', 'created_at', 'updated_at']
