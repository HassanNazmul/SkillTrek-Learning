from rest_framework import serializers

from SkillTrek.utils.attachment_serializers import add_attachment_data
from landing_page.models import Service


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'image', 'title', 'description', 'link', 'created_at', 'updated_at']


class ServiceSerializerDetails(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response = add_attachment_data(response, instance, 'image')
        return response
