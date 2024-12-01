from dj_rest_auth.views import PasswordResetView, PasswordResetConfirmView
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django_ratelimit.decorators import ratelimit
from django_ratelimit.exceptions import Ratelimited
from rest_framework import status
from rest_framework.response import Response

from user_management.serializers import CustomPasswordResetSerializer, hash_and_encode_pk


class CustomPasswordResetView(PasswordResetView):
    serializer_class = CustomPasswordResetSerializer

    @method_decorator(ratelimit(key='ip', rate='5/m', block=True))
    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except Ratelimited:
            return JsonResponse(
                {"error": "Too many password reset attempts. Please try again later."},
                status=429,
            )


User = get_user_model()


class CustomPasswordResetConfirmView(PasswordResetConfirmView):
    """
    Overwritten PasswordResetConfirmView to handle custom UID logic.
    """

    def post(self, request, *args, **kwargs):
        uid = request.data.get('uid')
        token = request.data.get('token')
        new_password1 = request.data.get('new_password1')
        new_password2 = request.data.get('new_password2')

        if not uid or not token or not new_password1 or not new_password2:
            return Response({'error': 'Missing required fields'}, status=status.HTTP_400_BAD_REQUEST)

        # Ensure passwords match
        if new_password1 != new_password2:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Decode the custom UID to find the user
            user = None
            for candidate_user in User.objects.all():
                if hash_and_encode_pk(candidate_user.pk) == uid:
                    user = candidate_user
                    break
            if not user:
                raise ValueError("User not found.")

        except ValueError:
            return Response({'error': 'Invalid UID'}, status=status.HTTP_400_BAD_REQUEST)

        # Validate the token
        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)

        # Set the new password
        user.set_password(new_password1)
        user.save()

        return Response({'success': 'Password has been reset successfully'}, status=status.HTTP_200_OK)
