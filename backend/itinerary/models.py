from django.db import models
from trips.models import Trip


class Stop(models.Model):
    """Stop model representing a city/destination in a trip"""
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='stops')
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    arrival_date = models.DateField()
    departure_date = models.DateField()
    order = models.PositiveIntegerField(default=0)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'arrival_date']
        verbose_name = 'Stop'
        verbose_name_plural = 'Stops'

    def __str__(self):
        return f"{self.city}, {self.country} - {self.trip.name}"

    @property
    def duration_days(self):
        """Calculate stop duration in days"""
        return (self.departure_date - self.arrival_date).days + 1

    @property
    def total_cost(self):
        """Calculate total cost for this stop"""
        total = 0
        for activity in self.activities.all():
            total += activity.estimated_cost
        return total

    @property
    def activities_count(self):
        """Get number of activities in this stop"""
        return self.activities.count()


class Activity(models.Model):
    """Activity model representing things to do at a stop"""
    CATEGORY_CHOICES = [
        ('ACCOMMODATION', 'Accommodation'),
        ('TRANSPORT', 'Transport'),
        ('FOOD', 'Food & Dining'),
        ('ACTIVITY', 'Activity & Entertainment'),
        ('SHOPPING', 'Shopping'),
        ('OTHER', 'Other'),
    ]

    stop = models.ForeignKey(Stop, on_delete=models.CASCADE, related_name='activities')
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    date = models.DateField(null=True, blank=True)
    time = models.TimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['date', 'time', 'created_at']
        verbose_name = 'Activity'
        verbose_name_plural = 'Activities'

    def __str__(self):
        return f"{self.name} - {self.get_category_display()}"
