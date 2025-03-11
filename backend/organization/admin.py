from django.contrib import admin
from .models import Organization

# Register your models here.
@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('title', 'email', 'phone', 'city', 'country', 'updated_at')
    search_fields = ('title', 'email', 'phone', 'city', 'country')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'motto', 'logo')
        }),
        ('Contact Information', {
            'fields': ('email', 'website', 'phone')
        }),
        ('Address', {
            'fields': ('pobox', 'street', 'city', 'country')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
