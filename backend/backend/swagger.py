from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="NAHID'S API",
      default_version='v1',
   ),

    # This Line of Code is Added to Make the Swagger UI Public
   public=True,
   permission_classes=(permissions.AllowAny,),
)
