from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # List the fields you want to expose in the API
        fields = [
            'id', 'email', 'first_name', 'last_name', 'is_student',
            'is_admin', 'is_staff', 'is_active', 'date_joined'
        ]
        # Read-only fields that can't be modified via the API
        read_only_fields = ['id', 'is_active', 'date_joined']

    def validate_email(self, value):
        """
        Ensure the email is always in lowercase for consistency.
        """
        return value.lower()

    def validate(self, data):
        """
        Global validation for ensuring appropriate permissions and role settings.
        """
        user = self.context['request'].user

        # Prevent non-admin staff from assigning admin role
        if user.is_staff and not user.is_admin and data.get('is_admin'):
            raise serializers.ValidationError("You don't have permission to assign admin role.")

        return data