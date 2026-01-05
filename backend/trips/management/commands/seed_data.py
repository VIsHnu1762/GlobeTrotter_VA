from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from trips.models import Trip
from itinerary.models import Stop, Activity
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = 'Seeds database with sample data for testing'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting database seed...'))
        
        # Create demo user
        demo_user, created = User.objects.get_or_create(
            username='demo',
            defaults={
                'email': 'demo@globetrotter.com',
                'first_name': 'Demo',
                'last_name': 'User'
            }
        )
        if created:
            demo_user.set_password('Demo@123')
            demo_user.save()
            self.stdout.write(self.style.SUCCESS('✓ Created demo user (demo / Demo@123)'))
        else:
            self.stdout.write(self.style.WARNING('! Demo user already exists'))
        
        # Create sample trip
        trip, created = Trip.objects.get_or_create(
            user=demo_user,
            name='European Adventure',
            defaults={
                'description': 'A 10-day tour across three amazing European cities',
                'start_date': datetime.now().date(),
                'end_date': (datetime.now() + timedelta(days=10)).date(),
                'is_public': True
            }
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS(f'✓ Created trip: {trip.name}'))
            
            # Add Paris stop
            paris = Stop.objects.create(
                trip=trip,
                city='Paris',
                country='France',
                arrival_date=trip.start_date,
                departure_date=trip.start_date + timedelta(days=3),
                order=1,
                notes='The City of Light - visit iconic landmarks'
            )
            self.stdout.write(self.style.SUCCESS(f'  ✓ Added stop: {paris.city}'))
            
            # Paris activities
            Activity.objects.create(
                stop=paris,
                name='Visit Eiffel Tower',
                category='sightseeing',
                estimated_cost=25.00,
                notes='Book tickets online to skip the queue'
            )
            Activity.objects.create(
                stop=paris,
                name='Louvre Museum',
                category='sightseeing',
                estimated_cost=17.00,
                notes='See Mona Lisa and Venus de Milo'
            )
            Activity.objects.create(
                stop=paris,
                name='Seine River Cruise',
                category='activities',
                estimated_cost=15.00,
            )
            self.stdout.write(self.style.SUCCESS(f'    ✓ Added 3 activities'))
            
            # Add Rome stop
            rome = Stop.objects.create(
                trip=trip,
                city='Rome',
                country='Italy',
                arrival_date=trip.start_date + timedelta(days=3),
                departure_date=trip.start_date + timedelta(days=7),
                order=2,
                notes='The Eternal City - ancient history awaits'
            )
            self.stdout.write(self.style.SUCCESS(f'  ✓ Added stop: {rome.city}'))
            
            # Rome activities
            Activity.objects.create(
                stop=rome,
                name='Colosseum Tour',
                category='sightseeing',
                estimated_cost=20.00,
                notes='Skip-the-line ticket recommended'
            )
            Activity.objects.create(
                stop=rome,
                name='Vatican Museums',
                category='sightseeing',
                estimated_cost=28.00,
            )
            Activity.objects.create(
                stop=rome,
                name='Trevi Fountain',
                category='sightseeing',
                estimated_cost=0.00,
                notes='Free! Throw a coin for good luck'
            )
            self.stdout.write(self.style.SUCCESS(f'    ✓ Added 3 activities'))
            
            # Add Barcelona stop
            barcelona = Stop.objects.create(
                trip=trip,
                city='Barcelona',
                country='Spain',
                arrival_date=trip.start_date + timedelta(days=7),
                departure_date=trip.end_date,
                order=3,
                notes='Gaudi architecture and beaches'
            )
            self.stdout.write(self.style.SUCCESS(f'  ✓ Added stop: {barcelona.city}'))
            
            # Barcelona activities
            Activity.objects.create(
                stop=barcelona,
                name='Sagrada Familia',
                category='sightseeing',
                estimated_cost=26.00,
                notes='Gaudi masterpiece - book in advance'
            )
            Activity.objects.create(
                stop=barcelona,
                name='Park Güell',
                category='sightseeing',
                estimated_cost=10.00,
            )
            Activity.objects.create(
                stop=barcelona,
                name='Beach Day',
                category='activities',
                estimated_cost=0.00,
                notes='Barceloneta Beach - bring sunscreen'
            )
            self.stdout.write(self.style.SUCCESS(f'    ✓ Added 3 activities'))
            
            self.stdout.write(self.style.SUCCESS(f'\n✅ Sample data created successfully!'))
            self.stdout.write(self.style.SUCCESS(f'   Trip total cost: ${trip.total_cost}'))
            self.stdout.write(self.style.SUCCESS(f'   Duration: {trip.duration_days} days'))
            self.stdout.write(self.style.SUCCESS(f'   Share token: {trip.share_token}'))
        else:
            self.stdout.write(self.style.WARNING('! Sample trip already exists'))
        
        self.stdout.write(self.style.SUCCESS('\n🎉 Seed completed! Use demo/Demo@123 to login'))
