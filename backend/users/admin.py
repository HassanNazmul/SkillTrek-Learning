from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import User


# Register your models here.


class CustomUserAdmin(UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User
    list_display = ('email', 'first_name', 'last_name', 'is_student', 'is_admin', 'is_staff', 'is_active')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_student', 'is_admin')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email', 'first_name', 'last_name', 'password1', 'password2', 'is_student', 'is_admin', 'is_active',
                'is_staff')}
         ),
    )

    # Remove `username` field by setting it to `None`
    username_field = None

    # Use `email` as the identifier instead of `username`
    UserAdmin.fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_student', 'is_admin')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )


admin.site.register(User, CustomUserAdmin)
