from django.urls import path
from . import views

urlpatterns = [
    # Auth
    path('auth/register/', views.register_view, name='register'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),
    path('auth/me/', views.current_user, name='current_user'),
    
    # Trips
    path('trips/', views.list_trips, name='list_trips'),
    path('trips/<int:trip_id>/', views.get_trip, name='get_trip'),
    path('trips/create/', views.create_trip, name='create_trip'),
    path('trips/<int:trip_id>/update/', views.update_trip, name='update_trip'),
    path('trips/<int:trip_id>/delete/', views.delete_trip, name='delete_trip'),
    
    # Stops
    path('trips/<int:trip_id>/stops/create/', views.create_stop, name='create_stop'),
    path('stops/<int:stop_id>/update/', views.update_stop, name='update_stop'),
    path('stops/<int:stop_id>/delete/', views.delete_stop, name='delete_stop'),
    
    # Activities
    path('stops/<int:stop_id>/activities/create/', views.create_activity, name='create_activity'),
    path('activities/<int:activity_id>/update/', views.update_activity, name='update_activity'),
    path('activities/<int:activity_id>/delete/', views.delete_activity, name='delete_activity'),
    
    # Budget
    path('trips/<int:trip_id>/budget/', views.trip_budget, name='trip_budget'),
    
    # Public
    path('public/<str:share_token>/', views.public_trip, name='public_trip'),
]
