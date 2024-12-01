# courses/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ModuleViewSet, TopicViewSet, EnrollmentViewSet

router = DefaultRouter()
router.register(r'module', ModuleViewSet, basename='module')
router.register(r'topics', TopicViewSet, basename='topic')
router.register(r'enrollments', EnrollmentViewSet, basename='enrollment')

urlpatterns = [
    path('', include(router.urls)),
]
