from django.contrib import admin
from .models import Trip


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ['name', 'user', 'start_date', 'end_date', 'is_public', 'stops_count', 'created_at']
    list_filter = ['is_public', 'created_at', 'start_date']
    search_fields = ['name', 'description', 'user__username', 'user__email']
    readonly_fields = ['created_at', 'updated_at', 'share_token', 'total_cost', 'duration_days']
    date_hierarchy = 'start_date'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('user', 'name', 'description')
        }),
        ('Dates', {
            'fields': ('start_date', 'end_date', 'duration_days')
        }),
        ('Sharing', {
            'fields': ('is_public', 'share_token')
        }),
        ('Summary', {
            'fields': ('total_cost',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def stops_count(self, obj):
        return obj.stops_count
    stops_count.short_description = 'Stops'
