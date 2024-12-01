# user_management/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ProfileViewSet, SendEmailViewSet, ActiveAccountViewSet

router = DefaultRouter()
router.register(r'', ProfileViewSet, basename='student-profile')
router.register(r'users', UserViewSet, basename='users')
router.register(r'send-email', SendEmailViewSet, basename='send-email')
router.register(r'active-account', ActiveAccountViewSet, basename='active-account')

urlpatterns = [
    path('', include(router.urls)),
]
