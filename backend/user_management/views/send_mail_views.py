from rest_framework import viewsets
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import action


class SendEmailViewSet(viewsets.ViewSet):
    """
    A viewset for sending emails.
    """

    @action(detail=False, methods=['post'])
    def send_email(self, request):
        try:
            data = request.data
            send_mail(
                subject=data.get('subject'),
                message=data.get('message'),
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[data.get('recipient')],
                fail_silently=False,
            )
            return Response({'status': 'success', 'message': 'Email sent successfully!'})
        except Exception as e:
            return Response({'status': 'error', 'message': str(e)}, status=400)
