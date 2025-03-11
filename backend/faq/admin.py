from django.contrib import admin
from .models import FAQ, FAQCategory

@admin.register(FAQCategory)
class FAQCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at')

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'order', 'is_active', 'created_at')
    list_filter = ('category', 'is_active')
    search_fields = ('question', 'answer')
    readonly_fields = ('created_at', 'updated_at')
    list_editable = ('order', 'is_active')
    fieldsets = (
        ('Content', {
            'fields': ('question', 'answer')
        }),
        ('Settings', {
            'fields': ('category', 'order', 'is_active')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )