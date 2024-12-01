from django.db import DatabaseError
from rest_framework import viewsets, status
from rest_framework.exceptions import ValidationError, PermissionDenied
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from landing_page.models import Service
from landing_page.serializers import ServiceSerializer
from landing_page.serializers.service_serializers import ServiceSerializerDetails


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()

    permission_classes_by_action = {
        'list': [AllowAny],
        'create': [IsAuthenticated],
        'update': [IsAuthenticated],
        'delete': [IsAuthenticated],
    }

    def get_permissions(self):
        """
        Assign permissions based on the action.
        """
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]

    def create(self, request, *args, **kwargs):
        # Check if the user is an admin
        if not request.user.is_authenticated or request.user.user_type != 'admin':
            raise PermissionDenied("Only admins can create services.")

        try:
            serializer = ServiceSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"message": "Service added successfully", "data": serializer.data},
                            status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({"message": "Invalid data provided.", "errors": e.detail},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": "An error occurred while adding the service.", "error": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def list(self, request, *args, **kwargs):
        try:
            order_by = request.GET.get('order_by', 'id')
            services = Service.objects.all().order_by(order_by)
            if not services.exists():
                return Response({"detail": "No service found"}, status=status.HTTP_204_NO_CONTENT)
            serializer = ServiceSerializerDetails(services, context={"request": request}, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except DatabaseError:
            return Response({"detail": "A database error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"detail": "An unexpected error occurred.", "error": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        # Check if the user is an admin
        if not request.user.is_authenticated or request.user.user_type != 'admin':
            raise PermissionDenied("Only admins can update services.")

        try:
            service = self.get_object()
            serializer = ServiceSerializer(service, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"message": "Service updated successfully", "data": serializer.data},
                            status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"message": "Invalid data provided.", "errors": e.detail},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": "An error occurred while updating the service.", "error": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, *args, **kwargs):
        # Check if the user is an admin
        if not request.user.is_authenticated or request.user.user_type != 'admin':
            raise PermissionDenied("Only admins can delete services.")

        try:
            service = self.get_object()
            service.delete()
            return Response({"message": "Service deleted successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": "An error occurred while deleting the service.", "error": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
