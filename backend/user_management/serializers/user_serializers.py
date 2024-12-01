# user_serializers.py
from django.template.loader import render_to_string
from rest_framework import serializers
from django.conf import settings
from django.db import transaction
from django.utils import timezone
from django.core.mail import EmailMessage
from courses.models import Module, Enrollment
from user_management.models import CustomUser
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from .enrollment_serializers import EnrollmentSerializer, EnrollmentDataSerializer


# Main serializer for user creation with enrollments
class CustomUserSerializer(serializers.ModelSerializer):
    # Fields for module enrollments
    module_enrollments = EnrollmentDataSerializer(many=True, write_only=True, required=False)
    enrollments = EnrollmentSerializer(many=True, read_only=True)
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = CustomUser
        fields = [
            'id', 'username', 'full_name', 'email', 'mobile', 'user_type', 'is_active', 'password',
            'module_enrollments', 'enrollments'
        ]
        read_only_fields = ['username']
        extra_kwargs = {'password': {'write_only': True, 'required': False}}

    def create(self, validated_data):
        # Extract module enrollments and password from validated data
        module_enrollments = validated_data.pop('module_enrollments', [])
        password = validated_data.pop('password', None)

        with transaction.atomic():
            # Create the user with the provided data
            user = CustomUser(
                full_name=validated_data.get('full_name'),
                email=validated_data.get('email'),
                mobile=validated_data.get('mobile'),
                user_type=validated_data.get('user_type', 'student'),
                is_active=False  # User will activate account by setting password
            )
            user.save()

            # Enroll the user in specified modules
            enrolled_modules = []
            for enrollment_data in module_enrollments:
                module_id = enrollment_data['module_id']
                duration = enrollment_data['duration']
                # Retrieve the module
                try:
                    module = Module.objects.get(id=module_id)
                except Module.DoesNotExist:
                    raise serializers.ValidationError({'module_id': f'Module with id {module_id} does not exist.'})
                # Create the enrollment
                Enrollment.objects.create(
                    student=user,
                    module=module,
                    enrolled_at=timezone.now(),
                    duration=duration
                )
                # Add to the list for email
                enrolled_modules.append(f"{module.name} ({duration} days)")

            # Generate the account activation link
            request = self.context.get('request')
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)

            frontend_url = settings.FRONTEND_URL + '/auth/active-account'
            activation_link = f"{frontend_url}?uid={uid}&token={token}"

            # Prepare email content
            module_list = "\n".join(enrolled_modules)

        # Render HTML email content
        email_content = render_to_string(
            'account_activation.html',
            {
                'full_name': user.full_name,
                'username': user.username,
                'activation_link': activation_link,
                'module_list': module_list
            }
        )

        # Send email using EmailMessage
        email_message = EmailMessage(
            subject="SkillTrek Account Activation",
            body=email_content,
            to=[user.email],
            from_email=None,
        )

        email_message.content_subtype = 'html'
        email_message.send()

        return user
