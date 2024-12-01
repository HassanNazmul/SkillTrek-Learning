# landing_page/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter

from landing_page.views import ReviewViewSet
from landing_page.views.service_views import ServiceViewSet

router = DefaultRouter()
router.register(r'reviews', ReviewViewSet, basename='review')
router.register(r'services', ServiceViewSet, basename='service')

urlpatterns = router.urls
