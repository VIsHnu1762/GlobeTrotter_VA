# Integration Guide: Adding Map Feature to Existing Trips

## Quick Start

The map feature automatically integrates with your existing trip data. Here's how to add it to different parts of your application.

## 1. Trip Details Page (Already Integrated!)

The map is already working on the Trip Details page. It automatically:
- Geocodes city names from your stops
- Shows numbered markers for each destination
- Draws routes between cities
- Displays trip information in popups

No additional code needed - it's plug and play!

## 2. Adding to Create Trip Page

### Step 1: Import the Component
```typescript
import TripMap from '../components/TripMap';
```

### Step 2: Add Preview Map
```tsx
<div className="mt-6">
  <h3 className="text-lg font-semibold mb-3">Trip Preview</h3>
  <div className="h-96 rounded-lg overflow-hidden border-2 border-gray-200">
    <TripMap
      stops={formData.stops}
      selectedStopId={null}
      onStopClick={(stopId) => handleStopSelection(stopId)}
    />
  </div>
</div>
```

### Step 3: Update as User Adds Stops
```typescript
const handleAddStop = (newStop: Stop) => {
  setFormData(prev => ({
    ...prev,
    stops: [...prev.stops, newStop]
  }));
  // Map automatically updates!
};
```

## 3. Adding to Dashboard

### Show Trip Routes on Dashboard
```tsx
import TripMap from '../components/TripMap';

const DashboardTripCard: React.FC<{ trip: Trip }> = ({ trip }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Trip Info */}
      <div className="p-4">
        <h3 className="font-bold text-lg">{trip.title}</h3>
        <p className="text-sm text-gray-600">
          {trip.stops.length} stops
        </p>
      </div>
      
      {/* Mini Map */}
      <div className="h-48">
        <TripMap
          stops={trip.stops}
          onStopClick={() => navigate(`/trips/${trip.id}`)}
        />
      </div>
    </div>
  );
};
```

## 4. Adding Activities with Locations

### When Creating an Activity

```typescript
import { getLandmarkCoordinates, getCityCoordinates } from '../utils/destinations';

const CreateActivityForm: React.FC = () => {
  const [activity, setActivity] = useState({
    title: '',
    description: '',
    // ... other fields
  });

  // Auto-suggest famous landmarks
  const handleActivitySelect = (activityName: string) => {
    const coords = getLandmarkCoordinates(activityName);
    if (coords) {
      setActivity(prev => ({
        ...prev,
        title: activityName,
        latitude: coords.lat,
        longitude: coords.lon,
      }));
    }
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Activity name (e.g., Eiffel Tower)"
        onChange={(e) => handleActivitySelect(e.target.value)}
      />
      {/* Rest of form */}
    </form>
  );
};
```

## 5. Search with Map Preview

### Destination Search Component
```tsx
import { getCityList } from '../utils/destinations';

const DestinationSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [preview, setPreview] = useState<Stop | null>(null);
  const cities = getCityList();

  const handleCitySelect = (cityName: string) => {
    const city = cities.find(c => c.name === cityName);
    if (city) {
      setPreview({
        id: 'preview',
        city: city.name,
        country: city.country,
        latitude: city.lat,
        longitude: city.lon,
        startDate: '',
        endDate: '',
      });
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Search */}
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search destinations..."
        />
        <ul>
          {cities
            .filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
            .map(city => (
              <li key={city.name} onClick={() => handleCitySelect(city.name)}>
                {city.name}, {city.country}
              </li>
            ))}
        </ul>
      </div>

      {/* Preview Map */}
      <div className="h-96">
        {preview && <TripMap stops={[preview]} />}
      </div>
    </div>
  );
};
```

## 6. Shared Trip Page

### Add Map to Public Trip View
```tsx
import TripMap from '../components/TripMap';

const SharedTripPage: React.FC = () => {
  const { token } = useParams();
  const [trip, setTrip] = useState<Trip | null>(null);

  // ... fetch trip data

  return (
    <div className="min-h-screen">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Trip Details */}
        <div>
          <h1>{trip?.title}</h1>
          {/* ... trip info */}
        </div>

        {/* Interactive Map */}
        <div className="h-screen sticky top-0">
          <TripMap
            stops={trip?.stops || []}
            activities={trip?.activities}
          />
        </div>
      </div>
    </div>
  );
};
```

## 7. Budget View with Map

### Show Expenses on Map
```tsx
const BudgetMapView: React.FC<{ trip: Trip; expenses: Expense[] }> = ({
  trip,
  expenses,
}) => {
  // Convert expenses to activities for map display
  const expenseMarkers = expenses.map(expense => ({
    id: expense.id,
    stopId: expense.stopId,
    title: expense.title,
    description: `$${expense.amount}`,
    category: expense.category,
    latitude: expense.latitude,
    longitude: expense.longitude,
  }));

  return (
    <div className="h-96">
      <TripMap
        stops={trip.stops}
        activities={expenseMarkers}
        onActivityClick={(id) => showExpenseDetails(id)}
      />
    </div>
  );
};
```

## 8. Real-Time Collaboration

### Live Trip Updates
```typescript
import { useEffect } from 'react';
import { io } from 'socket.io-client';

const CollaborativeTripMap: React.FC<{ tripId: string }> = ({ tripId }) => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [liveUsers, setLiveUsers] = useState<User[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    
    socket.emit('join-trip', tripId);
    
    socket.on('stop-added', (newStop: Stop) => {
      setStops(prev => [...prev, newStop]);
    });

    socket.on('user-joined', (users: User[]) => {
      setLiveUsers(users);
    });

    return () => socket.disconnect();
  }, [tripId]);

  return (
    <div className="relative">
      <TripMap stops={stops} />
      
      {/* Live Users Indicator */}
      <div className="absolute top-4 right-4 bg-white rounded-lg p-2">
        <p className="text-xs text-gray-600">
          {liveUsers.length} user(s) viewing
        </p>
      </div>
    </div>
  );
};
```

## 9. Mobile App Integration

### React Native (Future)
```javascript
// Using react-native-maps instead of leaflet
import MapView, { Marker, Polyline } from 'react-native-maps';

const MobileTripMap = ({ stops }) => {
  return (
    <MapView
      initialRegion={{
        latitude: stops[0]?.latitude || 0,
        longitude: stops[0]?.longitude || 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {stops.map((stop, index) => (
        <Marker
          key={stop.id}
          coordinate={{
            latitude: stop.latitude,
            longitude: stop.longitude,
          }}
          title={stop.city}
          description={stop.country}
        />
      ))}
      
      <Polyline
        coordinates={stops.map(s => ({
          latitude: s.latitude,
          longitude: s.longitude,
        }))}
        strokeColor="#EF4444"
        strokeWidth={3}
      />
    </MapView>
  );
};
```

## 10. Analytics Dashboard

### Popular Destinations Heatmap
```tsx
const PopularDestinationsMap: React.FC = () => {
  const [stats, setStats] = useState<DestinationStats[]>([]);

  useEffect(() => {
    // Fetch destination statistics
    fetchDestinationStats().then(setStats);
  }, []);

  // Create heat map data
  const heatmapStops = stats.map(stat => ({
    id: stat.destinationId,
    city: stat.city,
    country: stat.country,
    latitude: stat.latitude,
    longitude: stat.longitude,
    visitCount: stat.count, // For marker sizing
  }));

  return (
    <div>
      <h2>Most Popular Destinations</h2>
      <TripMap
        stops={heatmapStops}
        // Marker size based on popularity
      />
    </div>
  );
};
```

## Best Practices

### 1. Performance
```typescript
// Lazy load the map component
const TripMap = React.lazy(() => import('../components/TripMap'));

// Use in component
<Suspense fallback={<MapLoadingSpinner />}>
  <TripMap stops={stops} />
</Suspense>
```

### 2. Error Handling
```typescript
const SafeTripMap: React.FC<TripMapProps> = (props) => {
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return (
      <div className="h-96 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Map unavailable</p>
          <button onClick={() => setError(null)}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary onError={setError}>
      <TripMap {...props} />
    </ErrorBoundary>
  );
};
```

### 3. Loading States
```typescript
const MapWithLoading: React.FC = ({ stops }) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <MapSkeleton />}
      <TripMap
        stops={stops}
        onLoad={() => setLoading(false)}
      />
    </>
  );
};
```

## Common Patterns

### Pattern 1: Map + Sidebar
```tsx
<div className="flex">
  <aside className="w-80">
    {/* Stop list */}
  </aside>
  <main className="flex-1">
    <TripMap stops={stops} />
  </main>
</div>
```

### Pattern 2: Map + Modal
```tsx
const [selectedStop, setSelectedStop] = useState<Stop | null>(null);

<>
  <TripMap
    stops={stops}
    onStopClick={(id) => {
      const stop = stops.find(s => s.id === id);
      setSelectedStop(stop);
    }}
  />
  
  {selectedStop && (
    <StopDetailsModal
      stop={selectedStop}
      onClose={() => setSelectedStop(null)}
    />
  )}
</>
```

### Pattern 3: Map + Timeline
```tsx
<div className="grid grid-cols-3">
  <div className="col-span-2">
    <TripMap stops={stops} />
  </div>
  <div>
    <TripTimeline stops={stops} />
  </div>
</div>
```

## Testing

### Unit Test Example
```typescript
import { render, screen } from '@testing-library/react';
import TripMap from '../components/TripMap';

describe('TripMap', () => {
  it('renders map with stops', () => {
    const stops = [
      {
        id: '1',
        city: 'Paris',
        country: 'France',
        startDate: '2026-01-01',
        endDate: '2026-01-05',
      },
    ];

    render(<TripMap stops={stops} />);
    
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });
});
```

## Need Help?

- Check the demo: http://localhost:3000/map-demo
- See [MAP_FEATURE_GUIDE.md](./MAP_FEATURE_GUIDE.md) for detailed API docs
- See [MAP_VISUAL_EXAMPLES.md](./MAP_VISUAL_EXAMPLES.md) for visual examples
