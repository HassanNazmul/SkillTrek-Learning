"""
URL configuration for SkillTrek project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf.urls.static import static
from django.conf import settings

from user_management.views import CustomLoginView, CustomPasswordResetView, CustomPasswordResetConfirmView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/user_management/', include('user_management.urls')),  # Include the URLs from user_management app

    path('api/courses/', include('courses.urls')),  # Include the URLs from courses app

    path('api/landing_page/', include('landing_page.urls')),  # Include the URLs from landing_page app)

    # API Authentication endpoints
    path('api/auth/login/', CustomLoginView.as_view()),
    path('api/auth/password/reset/', CustomPasswordResetView.as_view(), name='custom_password_reset'),
    path('api/auth/password/reset/confirm/', CustomPasswordResetConfirmView.as_view(),
         name='custom_password_reset_confirm'),
    path('api/auth/', include('dj_rest_auth.urls')),  # Login, logout, password reset, etc.
    path('api/auth/', include('django.contrib.auth.urls')),
]

# Serve media and static files in development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
