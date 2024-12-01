# courses/permissions.py

from rest_framework import permissions


class IsAdminOrStaff(permissions.BasePermission):
    """
    Custom permission to only allow admins and staff to edit objects.
    """

    def has_permission(self, request, view):
        return request.user and (request.user.is_staff or request.user.is_superuser)


class IsStudent(permissions.BasePermission):
    """
    Custom permission to allow students to only view objects.
    """

    def has_permission(self, request, view):
        return request.user and not (request.user.is_staff or request.user.is_superuser)
