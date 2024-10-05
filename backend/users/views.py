from rest_framework import viewsets, serializers
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_admin:
            # Admins can see all users
            return User.objects.all()
        elif user.is_staff:
            # Staff can see students only
            return User.objects.filter(is_student=True)
        else:
            # Students can see only their own profile
            return User.objects.filter(id=user.id)

    def perform_create(self, serializer):
        """
        Handle creating a new user instance.
        """
        user = self.request.user
        if user.is_admin or user.is_staff:
            # Allow admin or staff to create new users
            serializer.save()
        else:
            # Students cannot create new users
            raise serializers.ValidationError("You do not have permission to create users.")

