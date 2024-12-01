# modules_serializers.py

from rest_framework import serializers
from courses.models import Topic
from courses.models import Module


# Serializer for Topic data
class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['id', 'title', 'description', 'url']


# Serializer for Module with Topics
class ModuleWithTopicsSerializer(serializers.ModelSerializer):
    topics = TopicSerializer(many=True, read_only=True)

    class Meta:
        model = Module
        fields = ['id', 'name', 'description', 'topics']
