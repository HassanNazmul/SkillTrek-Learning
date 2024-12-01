# enrollment_serializers.py

from rest_framework import serializers
from django.utils import timezone
from courses.models import Enrollment
from .module_serializers import ModuleWithTopicsSerializer


# Serializer for Enrollment data
class EnrollmentSerializer(serializers.ModelSerializer):
    module = ModuleWithTopicsSerializer(read_only=True)
    is_active = serializers.SerializerMethodField()
    enrolled_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    expires_at = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")

    class Meta:
        model = Enrollment
        fields = ['id', 'module', 'enrolled_at', 'expires_at', 'is_active']

    def get_is_active(self, obj):
        # Check if enrollment is still active based on expiration
        return obj.expires_at > timezone.now()


# Serializer for Enrollment data during user creation
class EnrollmentDataSerializer(serializers.Serializer):
    module_id = serializers.IntegerField()
    duration = serializers.IntegerField()
