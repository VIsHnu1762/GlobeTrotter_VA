from django.db import models
from django.contrib.auth.models import User
import uuid


class Trip(models.Model):
    """Trip model representing a travel plan"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trips')
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    is_public = models.BooleanField(default=False)
    share_token = models.CharField(max_length=100, unique=True, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Trip'
        verbose_name_plural = 'Trips'

    def __str__(self):
        return f"{self.name} by {self.user.username}"

    def save(self, *args, **kwargs):
        """Generate share token if public"""
        if self.is_public and not self.share_token:
            self.share_token = str(uuid.uuid4())
        super().save(*args, **kwargs)

    @property
    def total_cost(self):
        """Calculate total trip cost from all activities"""
        total = 0
        for stop in self.stops.all():
            for activity in stop.activities.all():
                total += activity.estimated_cost
        return total

    @property
    def duration_days(self):
        """Calculate trip duration in days"""
        return (self.end_date - self.start_date).days + 1

    @property
    def stops_count(self):
        """Get number of stops in trip"""
        return self.stops.count()
