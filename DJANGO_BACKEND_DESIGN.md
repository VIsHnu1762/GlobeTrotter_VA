# 🌍 GlobeTrotter - Django Backend Architecture

**Django Backend System Design**  
**Generated:** January 3, 2026  
**Framework:** Django 5.0 + Django REST Framework 3.14+

---

## 📋 Table of Contents

1. [Django Project Structure](#1-django-project-structure)
2. [Database Models](#2-database-models)
3. [Django Admin Setup](#3-django-admin-setup)
4. [REST API Design](#4-rest-api-design)
5. [Authentication & Authorization](#5-authentication--authorization)
6. [Budget Calculation Logic](#6-budget-calculation-logic)
7. [MVP vs Future Scope](#7-mvp-vs-future-scope)

---

## 1. 📁 Django Project Structure

### Recommended Project Layout

```
globetrotter/
│
├── manage.py
├── requirements.txt
├── .env
├── .gitignore
├── README.md
│
├── config/                          # Django project settings
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
│
├── apps/
│   │
│   ├── users/                       # User management
│   │   ├── __init__.py
│   │   ├── models.py                # Custom User model (optional)
│   │   ├── serializers.py           # User serializers
│   │   ├── views.py                 # Auth views
│   │   ├── urls.py                  # Auth endpoints
│   │   ├── admin.py                 # User admin
│   │   └── permissions.py           # Custom permissions
│   │
│   ├── trips/                       # Core trip management
│   │   ├── __init__.py
│   │   ├── models.py                # Trip, Stop models
│   │   ├── serializers.py           # Trip serializers
│   │   ├── views.py                 # Trip CRUD views
│   │   ├── urls.py                  # Trip endpoints
│   │   ├── admin.py                 # Trip admin
│   │   └── services.py              # Business logic
│   │
│   ├── activities/                  # Activity management
│   │   ├── __init__.py
│   │   ├── models.py                # Activity model
│   │   ├── serializers.py           # Activity serializers
│   │   ├── views.py                 # Activity CRUD views
│   │   ├── urls.py                  # Activity endpoints
│   │   └── admin.py                 # Activity admin
│   │
│   ├── expenses/                    # Budget tracking
│   │   ├── __init__.py
│   │   ├── models.py                # Expense model
│   │   ├── serializers.py           # Expense serializers
│   │   ├── views.py                 # Expense CRUD views
│   │   ├── urls.py                  # Expense endpoints
│   │   ├── admin.py                 # Expense admin
│   │   └── services.py              # Budget calculations
│   │
│   └── analytics/                   # Admin analytics
│       ├── __init__.py
│       ├── views.py                 # Analytics API views
│       ├── urls.py                  # Analytics endpoints
│       └── services.py              # Analytics logic
│
├── media/                           # User uploads (future)
├── static/                          # Static files
└── templates/                       # Email templates only
```

### App Responsibilities

#### 🔹 `users` app
**Purpose:** User authentication and profile management

- User registration and login
- User profile CRUD
- Custom user permissions
- JWT token management (if needed)

---

#### 🔹 `trips` app
**Purpose:** Trip and Stop (city) management

- Trip CRUD operations
- Stop (city) management
- Trip ownership and sharing
- Public/private trip logic
- Share token generation

---

#### 🔹 `activities` app
**Purpose:** Activity management within stops

- Activity CRUD operations
- Activity scheduling
- Category management
- Activity-to-stop relationships

---

#### 🔹 `expenses` app
**Purpose:** Budget tracking and expense management

- Expense CRUD operations
- Budget calculation services
- Category-based expense tracking
- Trip/Stop/Activity expense linking

---

#### 🔹 `analytics` app
**Purpose:** Admin analytics and reporting

- User statistics
- Trip statistics
- Popular destinations
- System metrics

---

## 2. 🗄️ Database Models

### User Model

**Approach:** Extend Django's built-in `AbstractUser`

```python
# apps/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom user model extending Django's AbstractUser.
    Adds role and profile information.
    """
    
    ROLE_CHOICES = [
        ('guest', 'Guest'),
        ('user', 'User'),
        ('admin', 'Admin'),
    ]
    
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='user',
        help_text="User role for permission handling"
    )
    
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"
```

**Why this model?**
- Extends Django's battle-tested authentication system
- Adds role field for simple RBAC
- Easy to integrate with Django admin and DRF
- No need to recreate password hashing, sessions, etc.

---

### Trip Model

```python
# apps/trips/models.py
from django.db import models
from django.conf import settings
import uuid

class Trip(models.Model):
    """
    Represents a multi-city trip planned by a user.
    """
    
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='trips',
        help_text="Trip owner"
    )
    
    title = models.CharField(
        max_length=255,
        help_text="Trip name (e.g., 'Europe Summer 2026')"
    )
    
    description = models.TextField(
        blank=True, 
        null=True,
        help_text="Trip overview/notes"
    )
    
    start_date = models.DateField(help_text="Trip start date")
    end_date = models.DateField(help_text="Trip end date")
    
    is_public = models.BooleanField(
        default=False,
        help_text="Allow public access via share link"
    )
    
    share_token = models.UUIDField(
        default=uuid.uuid4,
        unique=True,
        editable=False,
        help_text="Unique token for public sharing"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'trips'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', '-created_at']),
            models.Index(fields=['share_token']),
        ]
    
    def __str__(self):
        return f"{self.title} ({self.start_date} to {self.end_date})"
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if self.end_date < self.start_date:
            raise ValidationError("End date must be after start date")
    
    @property
    def duration_days(self):
        """Calculate trip duration in days"""
        return (self.end_date - self.start_date).days + 1
```

**Why this model?**
- UUID for security (prevents ID enumeration)
- ForeignKey to User (one user, many trips)
- Share token for public access
- Date validation in clean() method
- Property method for derived data

---

### Stop Model

```python
# apps/trips/models.py
class Stop(models.Model):
    """
    Represents a city/location within a trip.
    """
    
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )
    
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name='stops',
        help_text="Parent trip"
    )
    
    city = models.CharField(max_length=255, help_text="City name")
    country = models.CharField(max_length=255, help_text="Country name")
    
    order_index = models.PositiveIntegerField(
        default=0,
        help_text="Stop sequence in trip (0, 1, 2, ...)"
    )
    
    start_date = models.DateField(help_text="Arrival date")
    end_date = models.DateField(help_text="Departure date")
    
    notes = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'stops'
        ordering = ['trip', 'order_index']
        unique_together = [['trip', 'order_index']]
        indexes = [
            models.Index(fields=['trip', 'order_index']),
        ]
    
    def __str__(self):
        return f"{self.city}, {self.country} (Stop {self.order_index})"
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if self.end_date < self.start_date:
            raise ValidationError("End date must be after start date")
    
    @property
    def duration_days(self):
        """Calculate stop duration in days"""
        return (self.end_date - self.start_date).days + 1
```

**Why this model?**
- ForeignKey to Trip (one trip, many stops)
- order_index for sequencing stops
- unique_together prevents duplicate orders
- Date fields for stop duration
- related_name='stops' enables trip.stops.all()

---

### Activity Model

```python
# apps/activities/models.py
from django.db import models
import uuid

class Activity(models.Model):
    """
    Represents an activity/event at a specific stop.
    """
    
    CATEGORY_CHOICES = [
        ('sightseeing', 'Sightseeing'),
        ('food', 'Food & Dining'),
        ('adventure', 'Adventure'),
        ('culture', 'Culture'),
        ('relaxation', 'Relaxation'),
        ('shopping', 'Shopping'),
        ('nightlife', 'Nightlife'),
        ('other', 'Other'),
    ]
    
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )
    
    stop = models.ForeignKey(
        'trips.Stop',
        on_delete=models.CASCADE,
        related_name='activities',
        help_text="Parent stop (city)"
    )
    
    title = models.CharField(
        max_length=255,
        help_text="Activity name"
    )
    
    description = models.TextField(blank=True, null=True)
    
    date = models.DateField(help_text="Activity date")
    time = models.TimeField(blank=True, null=True, help_text="Start time")
    
    duration = models.PositiveIntegerField(
        blank=True, 
        null=True,
        help_text="Duration in minutes"
    )
    
    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES,
        blank=True,
        null=True
    )
    
    notes = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'activities'
        ordering = ['date', 'time']
        indexes = [
            models.Index(fields=['stop', 'date']),
        ]
        verbose_name_plural = 'Activities'
    
    def __str__(self):
        return f"{self.title} on {self.date}"
```

**Why this model?**
- ForeignKey to Stop (one stop, many activities)
- Category field with choices (structured data)
- Date and time for scheduling
- Duration for time planning
- Flexible notes field

---

### Expense Model

```python
# apps/expenses/models.py
from django.db import models
from decimal import Decimal
import uuid

class Expense(models.Model):
    """
    Represents a budget item for a trip, stop, or activity.
    """
    
    CATEGORY_CHOICES = [
        ('accommodation', 'Accommodation'),
        ('food', 'Food & Dining'),
        ('transport', 'Transportation'),
        ('activities', 'Activities & Entertainment'),
        ('shopping', 'Shopping'),
        ('other', 'Other'),
    ]
    
    id = models.UUIDField(
        primary_key=True, 
        default=uuid.uuid4, 
        editable=False
    )
    
    trip = models.ForeignKey(
        'trips.Trip',
        on_delete=models.CASCADE,
        related_name='expenses',
        help_text="Parent trip (required)"
    )
    
    stop = models.ForeignKey(
        'trips.Stop',
        on_delete=models.SET_NULL,
        related_name='expenses',
        blank=True,
        null=True,
        help_text="Related stop (optional)"
    )
    
    activity = models.ForeignKey(
        'activities.Activity',
        on_delete=models.SET_NULL,
        related_name='expenses',
        blank=True,
        null=True,
        help_text="Related activity (optional)"
    )
    
    title = models.CharField(
        max_length=255,
        help_text="Expense description"
    )
    
    amount = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Expense amount"
    )
    
    currency = models.CharField(
        max_length=3,
        default='USD',
        help_text="ISO currency code (USD, EUR, etc.)"
    )
    
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )
    
    date = models.DateField(help_text="Expense date")
    notes = models.TextField(blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'expenses'
        ordering = ['date']
        indexes = [
            models.Index(fields=['trip', 'category']),
            models.Index(fields=['trip', 'date']),
        ]
    
    def __str__(self):
        return f"{self.title}: {self.amount} {self.currency}"
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if self.amount < 0:
            raise ValidationError("Amount must be positive")
```

**Why this model?**
- ForeignKey to Trip (required)
- Optional ForeignKeys to Stop and Activity
- DecimalField for precise currency handling
- Category for budget breakdown
- SET_NULL on delete (preserve expense history)

---

### Model Relationships Summary

```
User (1) ──────< (N) Trip
                      │
                      ├──< (N) Stop
                      │         │
                      │         └──< (N) Activity
                      │                   │
                      │                   └──< (N) Expense (optional)
                      │
                      └──< (N) Expense (required)
```

**Key Principles:**
- One User owns many Trips
- One Trip has many Stops (ordered)
- One Stop has many Activities
- Expenses link to Trip (always) and optionally to Stop/Activity
- CASCADE deletes maintain referential integrity
- SET_NULL preserves data when optional relations deleted

---

## 3. 🔧 Django Admin Setup

### Registering Models

```python
# apps/users/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'role', 'is_active', 'date_joined']
    list_filter = ['role', 'is_active', 'date_joined']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Custom Fields', {
            'fields': ('role', 'bio', 'avatar')
        }),
    )
```

```python
# apps/trips/admin.py
from django.contrib import admin
from .models import Trip, Stop

class StopInline(admin.TabularInline):
    model = Stop
    extra = 1
    fields = ['city', 'country', 'order_index', 'start_date', 'end_date']
    ordering = ['order_index']

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ['title', 'user', 'start_date', 'end_date', 'is_public', 'created_at']
    list_filter = ['is_public', 'created_at', 'start_date']
    search_fields = ['title', 'description', 'user__username']
    readonly_fields = ['share_token', 'created_at', 'updated_at']
    date_hierarchy = 'start_date'
    
    inlines = [StopInline]
    
    fieldsets = (
        ('Trip Information', {
            'fields': ('user', 'title', 'description')
        }),
        ('Dates', {
            'fields': ('start_date', 'end_date')
        }),
        ('Sharing', {
            'fields': ('is_public', 'share_token')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Stop)
class StopAdmin(admin.ModelAdmin):
    list_display = ['city', 'country', 'trip', 'order_index', 'start_date', 'end_date']
    list_filter = ['country', 'created_at']
    search_fields = ['city', 'country', 'trip__title']
    ordering = ['trip', 'order_index']
```

```python
# apps/activities/admin.py
from django.contrib import admin
from .models import Activity

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['title', 'stop', 'category', 'date', 'time', 'duration']
    list_filter = ['category', 'date', 'created_at']
    search_fields = ['title', 'description', 'stop__city']
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Activity Details', {
            'fields': ('stop', 'title', 'description')
        }),
        ('Schedule', {
            'fields': ('date', 'time', 'duration')
        }),
        ('Categorization', {
            'fields': ('category', 'notes')
        }),
    )
```

```python
# apps/expenses/admin.py
from django.contrib import admin
from .models import Expense

@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
    list_display = ['title', 'trip', 'amount', 'currency', 'category', 'date']
    list_filter = ['category', 'currency', 'date', 'created_at']
    search_fields = ['title', 'trip__title', 'notes']
    date_hierarchy = 'date'
    
    fieldsets = (
        ('Expense Information', {
            'fields': ('trip', 'stop', 'activity', 'title')
        }),
        ('Financial', {
            'fields': ('amount', 'currency', 'category', 'date')
        }),
        ('Notes', {
            'fields': ('notes',)
        }),
    )
```

### Admin Analytics Features

**Built-in Django Admin Capabilities:**

1. **User Statistics**
   - Filter by role, join date, active status
   - Search by username/email
   - Export to CSV (using admin actions)

2. **Trip Analytics**
   - Filter by public/private, date ranges
   - View trips by user
   - Inline stops preview
   - Date hierarchy navigation

3. **Activity Analytics**
   - Filter by category, date
   - View activities by stop
   - Category distribution

4. **Budget Analysis**
   - Filter expenses by category, currency
   - View expenses per trip
   - Date-based expense tracking

**Custom Admin Dashboard (Future):**

```python
# apps/analytics/admin.py
from django.contrib import admin
from django.db.models import Count, Sum, Avg
from django.utils.html import format_html

class AnalyticsDashboard(admin.ModelAdmin):
    change_list_template = 'admin/analytics_dashboard.html'
    
    def changelist_view(self, request, extra_context=None):
        from apps.trips.models import Trip
        from apps.users.models import User
        from apps.expenses.models import Expense
        
        extra_context = extra_context or {}
        
        # User stats
        extra_context['total_users'] = User.objects.count()
        extra_context['active_users'] = User.objects.filter(is_active=True).count()
        
        # Trip stats
        extra_context['total_trips'] = Trip.objects.count()
        extra_context['public_trips'] = Trip.objects.filter(is_public=True).count()
        
        # Expense stats
        expense_summary = Expense.objects.aggregate(
            total=Sum('amount'),
            average=Avg('amount')
        )
        extra_context['total_budget'] = expense_summary['total']
        extra_context['avg_expense'] = expense_summary['average']
        
        return super().changelist_view(request, extra_context)
```

---

## 4. 🔌 REST API Design

### Authentication Endpoints

#### Register User

```python
# apps/users/views.py
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """
    Register a new user.
    
    POST /api/auth/register/
    {
        "username": "john_doe",
        "email": "john@example.com",
        "password": "securepass123",
        "first_name": "John",
        "last_name": "Doe"
    }
    """
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {
                'message': 'User registered successfully',
                'user': UserSerializer(user).data
            },
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

#### Login User

```python
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token

@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """
    Login user and return authentication token.
    
    POST /api/auth/login/
    {
        "username": "john_doe",
        "password": "securepass123"
    }
    """
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(username=username, password=password)
    
    if user:
        login(request, user)
        token, _ = Token.objects.get_or_create(user=user)
        
        return Response({
            'message': 'Login successful',
            'token': token.key,
            'user': UserSerializer(user).data
        })
    
    return Response(
        {'error': 'Invalid credentials'},
        status=status.HTTP_401_UNAUTHORIZED
    )
```

---

### Trip Endpoints

```python
# apps/trips/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from .models import Trip
from .serializers import TripSerializer, TripDetailSerializer

class TripViewSet(viewsets.ModelViewSet):
    """
    CRUD operations for trips.
    
    List:    GET    /api/trips/
    Create:  POST   /api/trips/
    Retrieve:GET    /api/trips/{id}/
    Update:  PUT    /api/trips/{id}/
    Delete:  DELETE /api/trips/{id}/
    """
    
    serializer_class = TripSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return only user's own trips"""
        return Trip.objects.filter(user=self.request.user)
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TripDetailSerializer
        return TripSerializer
    
    def perform_create(self, serializer):
        """Auto-assign current user as trip owner"""
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def toggle_public(self, request, pk=None):
        """
        Toggle trip public/private status.
        
        POST /api/trips/{id}/toggle_public/
        """
        trip = self.get_object()
        trip.is_public = not trip.is_public
        trip.save()
        return Response({
            'message': f'Trip is now {"public" if trip.is_public else "private"}',
            'is_public': trip.is_public
        })
```

**Example Request/Response:**

```json
// POST /api/trips/
{
    "title": "Europe Summer 2026",
    "description": "Backpacking through Europe",
    "start_date": "2026-06-01",
    "end_date": "2026-06-30",
    "is_public": false
}

// Response (201 Created)
{
    "id": "a1b2c3d4-e5f6-4789-abcd-ef0123456789",
    "title": "Europe Summer 2026",
    "description": "Backpacking through Europe",
    "start_date": "2026-06-01",
    "end_date": "2026-06-30",
    "is_public": false,
    "share_token": "f1e2d3c4-b5a6-4987-cdef-012345678901",
    "created_at": "2026-01-03T12:00:00Z",
    "duration_days": 30
}
```

---

### Stop Endpoints

```python
# apps/trips/views.py
from .models import Stop
from .serializers import StopSerializer

class StopViewSet(viewsets.ModelViewSet):
    """
    CRUD operations for stops (cities).
    
    List:    GET    /api/stops/?trip={trip_id}
    Create:  POST   /api/stops/
    Retrieve:GET    /api/stops/{id}/
    Update:  PUT    /api/stops/{id}/
    Delete:  DELETE /api/stops/{id}/
    """
    
    serializer_class = StopSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filter stops by trip (only user's trips)"""
        trip_id = self.request.query_params.get('trip')
        user_trips = Trip.objects.filter(user=self.request.user)
        
        queryset = Stop.objects.filter(trip__in=user_trips)
        
        if trip_id:
            queryset = queryset.filter(trip_id=trip_id)
        
        return queryset.order_by('order_index')
    
    @action(detail=True, methods=['post'])
    def reorder(self, request, pk=None):
        """
        Reorder stop position.
        
        POST /api/stops/{id}/reorder/
        {
            "new_order_index": 2
        }
        """
        stop = self.get_object()
        new_order = request.data.get('new_order_index')
        
        if new_order is not None:
            # Reordering logic
            old_order = stop.order_index
            stops = Stop.objects.filter(trip=stop.trip).order_by('order_index')
            
            if new_order < old_order:
                # Move up
                stops.filter(
                    order_index__gte=new_order,
                    order_index__lt=old_order
                ).update(order_index=models.F('order_index') + 1)
            else:
                # Move down
                stops.filter(
                    order_index__gt=old_order,
                    order_index__lte=new_order
                ).update(order_index=models.F('order_index') - 1)
            
            stop.order_index = new_order
            stop.save()
            
            return Response({'message': 'Stop reordered successfully'})
        
        return Response(
            {'error': 'new_order_index required'},
            status=status.HTTP_400_BAD_REQUEST
        )
```

---

### Activity Endpoints

```python
# apps/activities/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Activity
from .serializers import ActivitySerializer

class ActivityViewSet(viewsets.ModelViewSet):
    """
    CRUD operations for activities.
    
    List:    GET    /api/activities/?stop={stop_id}
    Create:  POST   /api/activities/
    Retrieve:GET    /api/activities/{id}/
    Update:  PUT    /api/activities/{id}/
    Delete:  DELETE /api/activities/{id}/
    """
    
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Filter activities by stop (only user's trips)"""
        from apps.trips.models import Trip
        
        stop_id = self.request.query_params.get('stop')
        user_trips = Trip.objects.filter(user=self.request.user)
        
        queryset = Activity.objects.filter(stop__trip__in=user_trips)
        
        if stop_id:
            queryset = queryset.filter(stop_id=stop_id)
        
        return queryset.order_by('date', 'time')
```

---

### Budget Endpoints

```python
# apps/expenses/views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Sum, Count
from .models import Expense

@api_view(['GET'])
def trip_budget_summary(request, trip_id):
    """
    Get budget summary for a trip.
    
    GET /api/trips/{trip_id}/budget/
    
    Response:
    {
        "total": 2500.00,
        "currency": "USD",
        "expense_count": 24,
        "by_category": {
            "accommodation": 800.00,
            "food": 600.00,
            "transport": 500.00,
            "activities": 400.00,
            "shopping": 150.00,
            "other": 50.00
        },
        "by_stop": {
            "Paris": 1200.00,
            "Rome": 800.00,
            "Barcelona": 500.00
        }
    }
    """
    from apps.trips.models import Trip
    
    # Verify user owns trip
    try:
        trip = Trip.objects.get(id=trip_id, user=request.user)
    except Trip.DoesNotExist:
        return Response({'error': 'Trip not found'}, status=404)
    
    expenses = Expense.objects.filter(trip=trip)
    
    # Total budget
    total = expenses.aggregate(total=Sum('amount'))['total'] or 0
    
    # By category
    by_category = {}
    for category, _ in Expense.CATEGORY_CHOICES:
        amount = expenses.filter(category=category).aggregate(
            total=Sum('amount')
        )['total'] or 0
        by_category[category] = float(amount)
    
    # By stop
    by_stop = {}
    for stop in trip.stops.all():
        amount = expenses.filter(stop=stop).aggregate(
            total=Sum('amount')
        )['total'] or 0
        by_stop[stop.city] = float(amount)
    
    return Response({
        'total': float(total),
        'currency': 'USD',  # Could be dynamic
        'expense_count': expenses.count(),
        'by_category': by_category,
        'by_stop': by_stop
    })
```

---

### Public Shared Trip Endpoint

```python
# apps/trips/views.py
@api_view(['GET'])
@permission_classes([AllowAny])
def shared_trip_view(request, share_token):
    """
    View public shared trip (no authentication required).
    
    GET /api/trips/shared/{share_token}/
    """
    try:
        trip = Trip.objects.get(share_token=share_token, is_public=True)
    except Trip.DoesNotExist:
        return Response(
            {'error': 'Trip not found or not public'},
            status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = TripDetailSerializer(trip)
    return Response(serializer.data)
```

---

### URL Configuration

```python
# config/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.users.urls')),
    path('api/', include('apps.trips.urls')),
    path('api/', include('apps.activities.urls')),
    path('api/', include('apps.expenses.urls')),
    path('api/', include('apps.analytics.urls')),
]
```

---

## 5. 🔐 Authentication & Authorization

### Session-Based Authentication

Django's default session authentication is sufficient for MVP.

**Settings Configuration:**

```python
# config/settings.py

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',  # Optional
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}
```

### Permission Classes

```python
# apps/users/permissions.py
from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners to edit objects.
    """
    
    def has_object_permission(self, request, view, obj):
        # Read permissions for all
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions only for owner
        return obj.user == request.user


class IsAdminUser(permissions.BasePermission):
    """
    Allow access only to admin users.
    """
    
    def has_permission(self, request, view):
        return request.user and request.user.is_staff
```

### Role-Based Access

```python
# Example usage in views
from rest_framework.permissions import IsAuthenticated
from apps.users.permissions import IsAdminUser

class AnalyticsViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated, IsAdminUser]
    
    def get_queryset(self):
        # Only admins can access
        if not self.request.user.is_staff:
            return Response({'error': 'Admin only'}, status=403)
        
        # Analytics logic here
        pass
```

### Login Required Decorator

```python
from django.contrib.auth.decorators import login_required

@login_required
@api_view(['GET'])
def protected_view(request):
    return Response({'message': 'You are authenticated'})
```

---

## 6. 💰 Budget Calculation Logic

### Why Calculate Instead of Store?

**Principles:**
1. **Single Source of Truth:** Expenses are the raw data
2. **Always Accurate:** Calculations reflect current expense data
3. **Flexible:** Easy to add new aggregation logic
4. **No Sync Issues:** No need to update budget when expenses change

### Service Layer

```python
# apps/expenses/services.py
from django.db.models import Sum, Count, Q
from decimal import Decimal
from .models import Expense

class BudgetService:
    """
    Service for budget calculations.
    """
    
    @staticmethod
    def calculate_trip_budget(trip):
        """
        Calculate total budget for a trip.
        """
        total = trip.expenses.aggregate(
            total=Sum('amount')
        )['total'] or Decimal('0.00')
        
        return {
            'total': float(total),
            'expense_count': trip.expenses.count()
        }
    
    @staticmethod
    def calculate_by_category(trip):
        """
        Break down budget by category.
        """
        result = {}
        
        for category, label in Expense.CATEGORY_CHOICES:
            amount = trip.expenses.filter(category=category).aggregate(
                total=Sum('amount')
            )['total'] or Decimal('0.00')
            
            result[category] = {
                'label': label,
                'amount': float(amount)
            }
        
        return result
    
    @staticmethod
    def calculate_by_stop(trip):
        """
        Break down budget by stop (city).
        """
        result = {}
        
        for stop in trip.stops.all():
            amount = trip.expenses.filter(stop=stop).aggregate(
                total=Sum('amount')
            )['total'] or Decimal('0.00')
            
            result[stop.city] = float(amount)
        
        # Unassigned expenses (no stop)
        unassigned = trip.expenses.filter(stop__isnull=True).aggregate(
            total=Sum('amount')
        )['total'] or Decimal('0.00')
        
        if unassigned > 0:
            result['_unassigned'] = float(unassigned)
        
        return result
    
    @staticmethod
    def calculate_daily_average(trip):
        """
        Calculate average daily expense.
        """
        total = trip.expenses.aggregate(
            total=Sum('amount')
        )['total'] or Decimal('0.00')
        
        duration = trip.duration_days
        
        if duration > 0:
            return float(total / duration)
        
        return 0.0
```

### Usage in Views

```python
# apps/expenses/views.py
from .services import BudgetService

@api_view(['GET'])
def trip_budget_summary(request, trip_id):
    trip = Trip.objects.get(id=trip_id, user=request.user)
    
    return Response({
        'total': BudgetService.calculate_trip_budget(trip),
        'by_category': BudgetService.calculate_by_category(trip),
        'by_stop': BudgetService.calculate_by_stop(trip),
        'daily_average': BudgetService.calculate_daily_average(trip)
    })
```

### Performance Optimization

```python
# For large datasets, use select_related and prefetch_related

trip = Trip.objects.prefetch_related(
    'stops',
    'expenses',
    'expenses__stop',
    'expenses__activity'
).get(id=trip_id)

# This reduces database queries significantly
```

---

## 7. 🧩 MVP vs Future Scope

### ✅ MUST-HAVE (Hackathon MVP)

#### Core Functionality
- ✅ User registration and login (Django authentication)
- ✅ Create/Edit/Delete trips
- ✅ Add/Remove/Reorder stops
- ✅ Add/Edit/Delete activities per stop
- ✅ Add/Edit/Delete expenses
- ✅ Budget summary API (total, by category, by stop)
- ✅ Public trip sharing via share token
- ✅ Django admin for analytics

#### Models
- ✅ User, Trip, Stop, Activity, Expense models
- ✅ All relationships defined
- ✅ Model validation (clean methods)

#### API Endpoints
- ✅ Auth: register, login, logout
- ✅ Trips: CRUD + toggle_public
- ✅ Stops: CRUD + reorder
- ✅ Activities: CRUD
- ✅ Expenses: CRUD
- ✅ Budget: summary endpoint
- ✅ Shared trips: public view endpoint

#### Admin Panel
- ✅ All models registered
- ✅ List filters and search
- ✅ Inline editing (stops in trips)
- ✅ Basic analytics via admin

---

### 🚀 NICE-TO-HAVE (Time Permitting)

#### Enhanced Features
- 🔄 Token-based authentication (JWT)
- 🔄 Password reset via email
- 🔄 Email verification
- 🔄 Activity image uploads
- 🔄 Multi-currency conversion
- 🔄 Export trip to PDF
- 🔄 Calendar API integration

#### API Improvements
- 🔄 Pagination for large lists
- 🔄 Advanced filtering (by date, category)
- 🔄 Sorting options
- 🔄 Search functionality

#### Analytics
- 🔄 Custom admin dashboard template
- 🔄 Charts and graphs
- 🔄 Trend analysis
- 🔄 Popular destination tracking

---

### 🌟 FUTURE SCOPE (Post-Hackathon)

#### Collaboration
- 🔮 Invite users to collaborate on trips
- 🔮 Comments on activities
- 🔮 Real-time updates (Django Channels)
- 🔮 Trip templates library

#### Advanced Features
- 🔮 AI-powered itinerary suggestions
- 🔮 Weather integration
- 🔮 Map visualization (no booking)
- 🔮 Flight/hotel search display (no booking)

#### Mobile
- 🔮 Django REST API for mobile apps
- 🔮 Push notifications
- 🔮 Offline sync

#### Performance
- 🔮 Redis caching
- 🔮 Celery for background tasks
- 🔮 Database optimization
- 🔮 CDN for static files

---

## 🎯 Implementation Checklist

### Phase 1: Setup (Day 1)
```bash
# Create Django project
django-admin startproject config .

# Create apps
python manage.py startapp users
python manage.py startapp trips
python manage.py startapp activities
python manage.py startapp expenses
python manage.py startapp analytics

# Install dependencies
pip install djangorestframework
pip install django-cors-headers
pip install python-decouple
pip install psycopg2-binary  # PostgreSQL

# Configure settings
- Add apps to INSTALLED_APPS
- Configure REST_FRAMEWORK settings
- Set up CORS
- Configure database (PostgreSQL)
```

### Phase 2: Models (Day 2)
- ✅ Define all models
- ✅ Create migrations
- ✅ Run migrations
- ✅ Create superuser
- ✅ Register models in admin

### Phase 3: Serializers (Day 3)
- ✅ Create serializers for all models
- ✅ Add validation logic
- ✅ Test serialization

### Phase 4: Views & URLs (Day 4-5)
- ✅ Implement ViewSets
- ✅ Create custom actions
- ✅ Configure URLs
- ✅ Add permissions

### Phase 5: Budget Logic (Day 6)
- ✅ Create BudgetService
- ✅ Implement calculation methods
- ✅ Create budget summary endpoint

### Phase 6: Testing (Day 7)
- ✅ Test all endpoints with Postman
- ✅ Fix bugs
- ✅ Optimize queries

---

## 📚 Required Dependencies

```txt
# requirements.txt

Django==5.0.1
djangorestframework==3.14.0
django-cors-headers==4.3.1
python-decouple==3.8
psycopg2-binary==2.9.9
Pillow==10.2.0  # For image uploads
django-filter==23.5  # For advanced filtering
```

---

## 🏁 Conclusion

**This Django backend provides:**
- ✅ Clean, maintainable code structure
- ✅ Powerful Django ORM for data handling
- ✅ Built-in admin panel for analytics
- ✅ RESTful API design with DRF
- ✅ Session-based authentication
- ✅ Flexible budget calculation
- ✅ Hackathon-ready MVP with clear roadmap

**Django advantages for GlobeTrotter:**
- Rapid development with built-in features
- Powerful admin interface (no custom analytics needed)
- ORM handles complex relationships elegantly
- Built-in authentication and permissions
- Great for startups and hackathons

**Ready for development!** 🚀
