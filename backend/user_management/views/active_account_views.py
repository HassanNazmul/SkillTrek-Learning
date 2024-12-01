from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from user_management.models import CustomUser


class ActiveAccountViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    def create(self, request):
        # Extract the required fields from the request body
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password1 = request.data.get('new_password1')
        new_password2 = request.data.get('new_password2')

        # Validate required fields
        if not uid or not token or not new_password1 or not new_password2:
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure the passwords match
        if new_password1 != new_password2:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        # Decode the UID to find the user
        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = CustomUser.objects.get(pk=user_id)
        except (ValueError, CustomUser.DoesNotExist):
            return Response({'error': 'Invalid or expired link'}, status=status.HTTP_400_BAD_REQUEST)

        # Validate the token
        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)

        # Activate the user account and set the password
        if not user.is_active:
            user.is_active = True
            user.set_password(new_password1)
            user.save()
            return Response({'success': 'Account activated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Account is already active'}, status=status.HTTP_400_BAD_REQUEST)
