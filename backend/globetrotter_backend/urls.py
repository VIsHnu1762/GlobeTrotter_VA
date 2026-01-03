from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('trips.urls')),
]

# Customize admin site
admin.site.site_header = "GlobeTrotter Admin"
admin.site.site_title = "GlobeTrotter Admin Portal"
admin.site.index_title = "Welcome to GlobeTrotter Administration"
