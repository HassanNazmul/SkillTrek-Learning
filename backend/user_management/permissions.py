from rest_framework.permissions import BasePermission


# Admin and staff Permissions
class IsAdminOrStaff(BasePermission):
    """
    Custom permission that allows only admin and staff users.
    """

    def has_permission(self, request, view):
        # Only allow access if the user is admin or staff
        return request.user.is_authenticated and request.user.user_type in ['admin', 'staff']


# Student Permissions
class IsStudentAndOwner(BasePermission):
    """
    Custom permission that allows students to access only their own data.
    """

    def has_object_permission(self, request, view, obj):
        # Check if the user is a student and is trying to access their own data
        return request.user.is_authenticated and request.user.user_type == 'student' and obj == request.user
