from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from user_management.models import CustomUser
from user_management.permissions import IsAdminOrStaff
from user_management.serializers import CustomUserSerializer


# User ViewSet for managing users
class UserViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for managing users, accessible only to admins and staff.
    """
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminOrStaff]  # Only admins and staff can access this

    def get_queryset(self):
        # Admins and staff can see all users; no access for students
        if self.request.user.user_type in ['admin', 'staff']:
            return super().get_queryset()
        return CustomUser.objects.none()

    @action(detail=False, methods=['get', 'patch'], url_path='(?P<username>[^/.]+)')
    def get_by_username(self, request, username=None):
        # Get the user by username
        user = get_object_or_404(CustomUser, username=username)

        if request.method == 'GET':
            # Handle GET request to retrieve user details
            serializer = self.get_serializer(user)
            return Response(serializer.data)

        elif request.method == 'PATCH':
            # Handle PATCH request to update user details
            serializer = self.get_serializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
