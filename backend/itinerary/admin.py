from django.contrib import admin
from .models import Stop, Activity


class ActivityInline(admin.TabularInline):
    model = Activity
    extra = 1
    fields = ['name', 'category', 'estimated_cost', 'date', 'time', 'notes']
    show_change_link = True


@admin.register(Stop)
class StopAdmin(admin.ModelAdmin):
    list_display = ['city', 'country', 'trip', 'arrival_date', 'departure_date', 'duration_days', 'order', 'activities_count']
    list_filter = ['country', 'arrival_date', 'trip']
    search_fields = ['city', 'country', 'trip__name', 'notes']
    inlines = [ActivityInline]
    date_hierarchy = 'arrival_date'
    readonly_fields = ['created_at', 'updated_at', 'duration_days', 'total_cost']
    
    fieldsets = (
        ('Trip', {
            'fields': ('trip',)
        }),
        ('Location', {
            'fields': ('city', 'country', 'order')
        }),
        ('Schedule', {
            'fields': ('arrival_date', 'departure_date', 'duration_days')
        }),
        ('Notes', {
            'fields': ('notes',),
            'classes': ('collapse',)
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

    def activities_count(self, obj):
        return obj.activities_count
    activities_count.short_description = 'Activities'


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'stop', 'estimated_cost', 'date', 'time', 'created_at']
    list_filter = ['category', 'date', 'stop__city']
    search_fields = ['name', 'stop__city', 'stop__country', 'notes']
    date_hierarchy = 'date'
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('stop', 'name', 'category')
        }),
        ('Cost & Schedule', {
            'fields': ('estimated_cost', 'date', 'time')
        }),
        ('Notes', {
            'fields': ('notes',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
