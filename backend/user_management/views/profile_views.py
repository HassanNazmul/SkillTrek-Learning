from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from user_management.serializers import CustomUserSerializer


class ProfileViewSet(viewsets.ViewSet):
    """
    A ViewSet that allows any authenticated user to view and update their own profile.
    """
    permission_classes = [IsAuthenticated]  # Only authenticated users can access this

    @action(detail=False, methods=['get', 'patch'], url_path='', url_name='profile')
    def profile(self, request):
        # Allow any authenticated user (Admin, Staff, Student) to access this
        if request.method == 'GET':
            serializer = CustomUserSerializer(request.user)
            return Response(serializer.data)
        elif request.method == 'PATCH':
            serializer = CustomUserSerializer(request.user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
