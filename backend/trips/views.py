from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.db.models import Q
import json
from decimal import Decimal
from datetime import datetime

from .models import Trip
from itinerary.models import Stop, Activity


# Standardized response format for frontend compatibility
def success_response(data, message="Success", status=200):
    """Standard success response format"""
    return JsonResponse({
        'success': True,
        'data': data,
        'message': message
    }, status=status)


def error_response(error, status=400, details=None):
    """Standard error response format"""
    response = {
        'success': False,
        'error': error
    }
    if details:
        response['details'] = details
    return JsonResponse(response, status=status)


# Helper function to serialize model to dict
def serialize_trip(trip):
    """Serialize trip object to dictionary"""
    return {
        'id': trip.id,
        'name': trip.name,
        'description': trip.description,
        'start_date': trip.start_date.isoformat(),
        'end_date': trip.end_date.isoformat(),
        'duration_days': trip.duration_days,
        'total_cost': float(trip.total_cost),
        'is_public': trip.is_public,
        'share_token': trip.share_token,
        'stops_count': trip.stops_count,
        'created_at': trip.created_at.isoformat(),
        'updated_at': trip.updated_at.isoformat(),
    }


def serialize_stop(stop):
    """Serialize stop object to dictionary"""
    return {
        'id': stop.id,
        'trip_id': stop.trip.id,
        'city': stop.city,
        'country': stop.country,
        'arrival_date': stop.arrival_date.isoformat(),
        'departure_date': stop.departure_date.isoformat(),
        'duration_days': stop.duration_days,
        'order': stop.order,
        'notes': stop.notes,
        'total_cost': float(stop.total_cost),
        'activities_count': stop.activities_count,
        'created_at': stop.created_at.isoformat(),
    }


def serialize_activity(activity):
    """Serialize activity object to dictionary"""
    return {
        'id': activity.id,
        'stop_id': activity.stop.id,
        'name': activity.name,
        'category': activity.category,
        'category_display': activity.get_category_display(),
        'estimated_cost': float(activity.estimated_cost),
        'date': activity.date.isoformat() if activity.date else None,
        'time': activity.time.isoformat() if activity.time else None,
        'notes': activity.notes,
        'created_at': activity.created_at.isoformat(),
    }


# ============= AUTH VIEWS =============

@ensure_csrf_cookie
@require_http_methods(["GET"])
def get_csrf_token(request):
    """Get CSRF token for frontend"""
    return success_response({}, message='CSRF token set')


@csrf_exempt
@require_http_methods(["POST"])
def register_view(request):
    """User registration"""
    try:
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if not username or not email or not password:
            return error_response('All fields are required', status=400)
        
        if User.objects.filter(username=username).exists():
            return error_response('Username already exists', status=400)
        
        if User.objects.filter(email=email).exists():
            return error_response('Email already exists', status=400)
        
        user = User.objects.create_user(username=username, email=email, password=password)
        login(request, user)
        
        return success_response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        }, message='Registration successful', status=201)
    except Exception as e:
        return error_response(str(e), status=400)


@csrf_exempt
@require_http_methods(["POST"])
def login_view(request):
    """User login"""
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        
        user = authenticate(request, username=username, password=password)
        
        if user:
            login(request, user)
            return success_response({
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email
                }
            }, message='Login successful')
        else:
            return error_response('Invalid credentials', status=401)
    except Exception as e:
        return error_response(str(e), status=400)


@require_http_methods(["POST"])


@require_http_methods(["POST"])
def logout_view(request):
    """User logout"""
    logout(request)
    return JsonResponse({'message': 'Logout successful'})


@login_required
@require_http_methods(["GET"])
def current_user(request):
    """Get current logged-in user"""
    return JsonResponse({
        'user': {
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email
        }
    })


# ============= TRIP VIEWS =============

@login_required
@require_http_methods(["GET"])
def list_trips(request):
    """List all trips for logged-in user"""
    trips = Trip.objects.filter(user=request.user).prefetch_related('stops')
    trips_data = [serialize_trip(trip) for trip in trips]
    
    return JsonResponse({'trips': trips_data})


@login_required
@require_http_methods(["GET"])
def get_trip(request, trip_id):
    """Get single trip with all details"""
    try:
        trip = Trip.objects.prefetch_related('stops__activities').get(
            id=trip_id, user=request.user
        )
        
        trip_data = serialize_trip(trip)
        
        # Add stops with activities
        stops = []
        for stop in trip.stops.all():
            stop_data = serialize_stop(stop)
            stop_data['activities'] = [serialize_activity(a) for a in stop.activities.all()]
            stops.append(stop_data)
        
        trip_data['stops'] = stops
        
        return JsonResponse({'trip': trip_data})
    except Trip.DoesNotExist:
        return JsonResponse({'error': 'Trip not found'}, status=404)


@login_required
@csrf_exempt
@require_http_methods(["POST"])
def create_trip(request):
    """Create a new trip"""
    try:
        data = json.loads(request.body)
        
        trip = Trip.objects.create(
            user=request.user,
            name=data['name'],
            description=data.get('description', ''),
            start_date=data['start_date'],
            end_date=data['end_date'],
            is_public=data.get('is_public', False)
        )
        
        return JsonResponse({
            'message': 'Trip created successfully',
            'trip': serialize_trip(trip)
        }, status=201)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@login_required
@csrf_exempt
@require_http_methods(["PUT"])
def update_trip(request, trip_id):
    """Update a trip"""
    try:
        trip = Trip.objects.get(id=trip_id, user=request.user)
        data = json.loads(request.body)
        
        trip.name = data.get('name', trip.name)
        trip.description = data.get('description', trip.description)
        trip.start_date = data.get('start_date', trip.start_date)
        trip.end_date = data.get('end_date', trip.end_date)
        trip.is_public = data.get('is_public', trip.is_public)
        trip.save()
        
        return JsonResponse({
            'message': 'Trip updated successfully',
            'trip': serialize_trip(trip)
        })
    except Trip.DoesNotExist:
        return JsonResponse({'error': 'Trip not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@login_required
@csrf_exempt
@require_http_methods(["DELETE"])
def delete_trip(request, trip_id):
    """Delete a trip"""
    try:
        trip = Trip.objects.get(id=trip_id, user=request.user)
        trip.delete()
        return JsonResponse({'message': 'Trip deleted successfully'})
    except Trip.DoesNotExist:
        return JsonResponse({'error': 'Trip not found'}, status=404)


# ============= STOP VIEWS =============

@login_required
@csrf_exempt
@require_http_methods(["POST"])
def create_stop(request, trip_id):
    """Add a stop to a trip"""
    try:
        trip = Trip.objects.get(id=trip_id, user=request.user)
        data = json.loads(request.body)
        
        stop = Stop.objects.create(
            trip=trip,
            city=data['city'],
            country=data['country'],
            arrival_date=data['arrival_date'],
            departure_date=data['departure_date'],
            order=data.get('order', 0),
            notes=data.get('notes', '')
        )
        
        return JsonResponse({
            'message': 'Stop added successfully',
            'stop': serialize_stop(stop)
        }, status=201)
    except Trip.DoesNotExist:
        return JsonResponse({'error': 'Trip not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@login_required
@csrf_exempt
@require_http_methods(["PUT"])
def update_stop(request, stop_id):
    """Update a stop"""
    try:
        stop = Stop.objects.get(id=stop_id, trip__user=request.user)
        data = json.loads(request.body)
        
        stop.city = data.get('city', stop.city)
        stop.country = data.get('country', stop.country)
        stop.arrival_date = data.get('arrival_date', stop.arrival_date)
        stop.departure_date = data.get('departure_date', stop.departure_date)
        stop.order = data.get('order', stop.order)
        stop.notes = data.get('notes', stop.notes)
        stop.save()
        
        return JsonResponse({
            'message': 'Stop updated successfully',
            'stop': serialize_stop(stop)
        })
    except Stop.DoesNotExist:
        return JsonResponse({'error': 'Stop not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@login_required
@csrf_exempt
@require_http_methods(["DELETE"])
def delete_stop(request, stop_id):
    """Delete a stop"""
    try:
        stop = Stop.objects.get(id=stop_id, trip__user=request.user)
        stop.delete()
        return JsonResponse({'message': 'Stop deleted successfully'})
    except Stop.DoesNotExist:
        return JsonResponse({'error': 'Stop not found'}, status=404)


# ============= ACTIVITY VIEWS =============

@login_required
@csrf_exempt
@require_http_methods(["POST"])
def create_activity(request, stop_id):
    """Add an activity to a stop"""
    try:
        stop = Stop.objects.get(id=stop_id, trip__user=request.user)
        data = json.loads(request.body)
        
        activity = Activity.objects.create(
            stop=stop,
            name=data['name'],
            category=data['category'],
            estimated_cost=Decimal(str(data.get('estimated_cost', 0))),
            date=data.get('date'),
            time=data.get('time'),
            notes=data.get('notes', '')
        )
        
        return JsonResponse({
            'message': 'Activity added successfully',
            'activity': serialize_activity(activity)
        }, status=201)
    except Stop.DoesNotExist:
        return JsonResponse({'error': 'Stop not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@login_required
@csrf_exempt
@require_http_methods(["PUT"])
def update_activity(request, activity_id):
    """Update an activity"""
    try:
        activity = Activity.objects.get(id=activity_id, stop__trip__user=request.user)
        data = json.loads(request.body)
        
        activity.name = data.get('name', activity.name)
        activity.category = data.get('category', activity.category)
        activity.estimated_cost = Decimal(str(data.get('estimated_cost', activity.estimated_cost)))
        activity.date = data.get('date', activity.date)
        activity.time = data.get('time', activity.time)
        activity.notes = data.get('notes', activity.notes)
        activity.save()
        
        return JsonResponse({
            'message': 'Activity updated successfully',
            'activity': serialize_activity(activity)
        })
    except Activity.DoesNotExist:
        return JsonResponse({'error': 'Activity not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)


@login_required
@csrf_exempt
@require_http_methods(["DELETE"])
def delete_activity(request, activity_id):
    """Delete an activity"""
    try:
        activity = Activity.objects.get(id=activity_id, stop__trip__user=request.user)
        activity.delete()
        return JsonResponse({'message': 'Activity deleted successfully'})
    except Activity.DoesNotExist:
        return JsonResponse({'error': 'Activity not found'}, status=404)


# ============= BUDGET VIEWS =============

@login_required
@require_http_methods(["GET"])
def trip_budget(request, trip_id):
    """Get budget breakdown for a trip"""
    try:
        trip = Trip.objects.prefetch_related('stops__activities').get(
            id=trip_id, user=request.user
        )
        
        # Per-stop breakdown
        stops_breakdown = []
        for stop in trip.stops.all():
            stops_breakdown.append({
                'stop_id': stop.id,
                'city': stop.city,
                'country': stop.country,
                'total_cost': float(stop.total_cost),
                'activities_count': stop.activities_count
            })
        
        # Per-category breakdown
        categories = {}
        for stop in trip.stops.all():
            for activity in stop.activities.all():
                category = activity.get_category_display()
                categories[category] = float(categories.get(category, 0)) + float(activity.estimated_cost)
        
        return JsonResponse({
            'trip_id': trip.id,
            'trip_name': trip.name,
            'total_cost': float(trip.total_cost),
            'stops_breakdown': stops_breakdown,
            'category_breakdown': categories
        })
    except Trip.DoesNotExist:
        return JsonResponse({'error': 'Trip not found'}, status=404)


# ============= PUBLIC VIEWS =============

@require_http_methods(["GET"])
def public_trip(request, share_token):
    """View a public trip by share token"""
    try:
        trip = Trip.objects.prefetch_related('stops__activities').get(
            share_token=share_token, is_public=True
        )
        
        trip_data = serialize_trip(trip)
        
        # Add stops with activities
        stops = []
        for stop in trip.stops.all():
            stop_data = serialize_stop(stop)
            stop_data['activities'] = [serialize_activity(a) for a in stop.activities.all()]
            stops.append(stop_data)
        
        trip_data['stops'] = stops
        trip_data['user'] = {'username': trip.user.username}
        
        return JsonResponse({'trip': trip_data})
    except Trip.DoesNotExist:
        return JsonResponse({'error': 'Trip not found or not public'}, status=404)
