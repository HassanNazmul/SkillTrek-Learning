from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.db import DatabaseError

from landing_page.models import Review
from landing_page.serializers import ReviewSerializer


class ReviewViewSet(viewsets.ViewSet):
    permission_classes_by_action = {
        'list': [AllowAny],  # Publicly accessible
        'create': [IsAuthenticated],  # Restricted to authenticated users
    }

    def get_permissions(self):
        """
        Assign permissions based on the action.
        """
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]

    def create(self, request):
        try:
            serializer = ReviewSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"message": "Review added successfully", "data": serializer.data},
                            status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({"message": "Invalid data provided.", "errors": e.detail},
                            status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message": "An error occurred while adding the review.", "error": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def list(self, request):
        try:
            order_by = request.GET.get('order_by', 'id')
            reviews = Review.objects.all().order_by(order_by)
            if not reviews.exists():
                return Response({"detail": "No Review found"}, status=status.HTTP_204_NO_CONTENT)
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except DatabaseError:
            return Response({"detail": "A database error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"detail": "An unexpected error occurred.", "error": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
