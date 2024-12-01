# courses/views.py

from django.utils import timezone
from courses.permissions import IsAdminOrStaff
from rest_framework import viewsets, permissions
from courses.models import Module, Topic, Enrollment
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from .serializers import ModuleSerializer, TopicSerializer, EnrollmentSerializer

from rest_framework.response import Response
from rest_framework import status


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminOrStaff]
        elif self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        # If the user is a student, check enrollment status
        if self.request.user.user_type == 'student':
            # Get the module ID from the topic if available in the request
            module_id = self.request.query_params.get('module_id')

            if module_id:
                # Check if the student is enrolled in the module and the enrollment is active
                enrollment_exists = Enrollment.objects.filter(
                    student=self.request.user,
                    module_id=module_id,
                    expires_at__gt=timezone.now()
                ).exists()

                if enrollment_exists:
                    # Return topics for the enrolled module
                    return Topic.objects.filter(module_id=module_id)

                # If not enrolled, raise a PermissionDenied exception with a custom message
                raise PermissionDenied("You are not enrolled in this module and cannot view its content.")

            # If no module ID is provided, return no topics
            return Topic.objects.none()

        # For admins and staff, return all topics
        return super().get_queryset()


class ModuleViewSet(viewsets.ModelViewSet):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminOrStaff]
        elif self.action in ['list', 'retrieve']:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]


# class EnrollmentViewSet(viewsets.ModelViewSet):
#     queryset = Enrollment.objects.all()
#     serializer_class = EnrollmentSerializer
#
#     def get_permissions(self):
#         if self.action in ['create', 'update', 'partial_update', 'destroy']:
#             permission_classes = [IsAdminOrStaff]
#         elif self.action == 'list':
#             permission_classes = [permissions.IsAuthenticated]
#         else:
#             permission_classes = [IsAuthenticated]
#         return [permission() for permission in permission_classes]
#
#     def get_queryset(self):
#         # Students can only see their own enrollments
#         if self.request.user.user_type == 'student':
#             return Enrollment.objects.filter(student=self.request.user, expires_at__gt=timezone.now())
#         return super().get_queryset()


class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = [IsAdminOrStaff]
        elif self.action == 'list':
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        student_id = request.data.get("student")
        module_id = request.data.get("module")
        duration = request.data.get("duration")

        # Ensure request is authenticated
        if not request.user.is_authenticated:
            return Response({"error": "Authentication required"}, status=status.HTTP_401_UNAUTHORIZED)

        # Allow only admins or staff to enroll students
        if not request.user.is_staff and not request.user.is_superuser:
            return Response({"error": "You do not have permission to perform this action"}, status=status.HTTP_403_FORBIDDEN)

        # Enrollment logic remains unchanged
        try:
            enrollment = Enrollment.objects.filter(student_id=student_id, module_id=module_id).first()

            if enrollment:
                if enrollment.is_active():
                    # Extend active enrollment
                    enrollment.duration += int(duration)
                    enrollment.save()
                    return Response({
                        "message": "Enrollment extended successfully",
                        "new_expires_at": enrollment.expires_at
                    }, status=status.HTTP_200_OK)
                else:
                    # Re-enroll expired module
                    enrollment.enrolled_at = timezone.now()
                    enrollment.duration = int(duration)
                    enrollment.save()
                    return Response({
                        "message": "Re-enrolled in module",
                        "new_expires_at": enrollment.expires_at
                    }, status=status.HTTP_200_OK)
            else:
                # Create new enrollment
                enrollment = Enrollment.objects.create(
                    student_id=student_id,
                    module_id=module_id,
                    enrolled_at=timezone.now(),
                    duration=int(duration),
                )
                return Response({
                    "message": "New enrollment created successfully",
                    "expires_at": enrollment.expires_at
                }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)