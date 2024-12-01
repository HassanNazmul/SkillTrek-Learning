import hashlib
from base64 import urlsafe_b64encode
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.conf import settings
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from rest_framework.exceptions import ValidationError
from dj_rest_auth.serializers import PasswordResetSerializer

User = get_user_model()


def hash_and_encode_pk(pk):
    """
    Hash the primary key using SHA256 and encode it in URL-safe Base64.
    """
    # Hash the primary key
    hashed_pk = hashlib.sha256(str(pk).encode()).digest()
    # Encode the hash in URL-safe Base64
    return urlsafe_b64encode(hashed_pk).decode().rstrip('=')


class CustomPasswordResetSerializer(PasswordResetSerializer):
    def get_users(self, email):
        if not email:
            raise ValidationError({"email": "This field is required."})

        # Use iexact for case-insensitive email filtering
        active_users = User.objects.filter(email__iexact=email, is_active=True)
        if not active_users:
            raise ValidationError({"email": "No active account found with the given email address."})

        return active_users

    def save(self):
        request = self.context.get('request')
        frontend_reset_url = settings.FRONTEND_URL + '/auth/set-password/'

        for user in self.get_users(self.data['email']):
            # Generate a hashed and encoded UID
            uid = hash_and_encode_pk(user.pk)

            # Generate a token
            token = default_token_generator.make_token(user)

            # Create the reset link
            reset_link = f"{frontend_reset_url}?uid={uid}&token={token}"

            # Get the user's full name
            full_name = user.full_name or user.username

            # Render HTML email content
            email_content = render_to_string(
                'password_reset.html',
                {
                    'full_name': full_name,
                    'username': user.username,
                    'reset_link': reset_link,
                }
            )

            # Send email using EmailMessage
            email_message = EmailMessage(
                subject="SkillTrek Password Reset Request",
                body=email_content,
                to=[user.email],
                from_email=None,
            )
            email_message.content_subtype = 'html'  # Set email content to HTML
            email_message.send()
