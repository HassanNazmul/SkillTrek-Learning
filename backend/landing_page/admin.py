from django.contrib import admin
from django.apps import apps

# Register your models here.

# Auto Register all models
app = apps.get_app_config("landing_page")

for model in app.get_models():
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass
