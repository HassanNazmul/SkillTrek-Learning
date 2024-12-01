# courses/serializers.py

from rest_framework import serializers
from .models import Module, Topic, Enrollment


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'description', 'url', 'module', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ModuleSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ['id', 'name', 'description', 'created_at', 'updated_at', 'topics']
        read_only_fields = ['id', 'created_at', 'updated_at']


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'module', 'enrolled_at', 'expires_at', 'is_active', 'duration']
        read_only_fields = ['enrolled_at', 'is_active', 'expires_at']
