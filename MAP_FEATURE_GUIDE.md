# 🗺️ Interactive Map Feature - GlobeTrotter

## Overview

The GlobeTrotter application now features a comprehensive interactive map system that visualizes multi-city itineraries with automatic geocoding, landmark markers, and route visualization.

## Features

### 1. **Multi-City Itinerary Mapping**
- Automatically geocodes city names to coordinates using OpenStreetMap Nominatim API
- Displays numbered markers for each stop in your trip
- Shows a dashed route line connecting all destinations
- Color-coded markers for easy identification

### 2. **City-Specific Views**
- Click on any city to zoom into a detailed view
- Switch between "Full Route" view and individual city views
- Side panel showing city information and dates
- Real-time map updates when switching between cities

### 3. **Landmark & Activity Markers**
- Green circular markers for activities and landmarks within cities
- Pre-loaded coordinates for 100+ famous landmarks worldwide
- Interactive popups showing activity details
- Category tags for different types of activities

### 4. **Smart Geocoding**
- Automatic coordinate lookup for 60+ popular destinations
- Fallback to OpenStreetMap API for any city worldwide
- Caches coordinates to minimize API calls
- Graceful handling of geocoding failures

### 5. **Interactive Controls**
- Toggle between route view and city views
- Click markers to see detailed information
- Popup windows with trip dates, notes, and descriptions
- Zoom and pan controls

## Usage Examples

### Example 1: Paris with Famous Landmarks

```typescript
const parisTrip = {
    stops: [
        {
            id: 'paris-1',
            city: 'Paris',
            country: 'France',
            startDate: '2026-07-01',
            endDate: '2026-07-07',
            notes: 'Exploring the City of Light'
        }
    ],
    activities: [
        {
            id: 'eiffel',
            stopId: 'paris-1',
            title: 'Eiffel Tower',
            latitude: 48.8584,
            longitude: 2.2945,
            category: 'Landmark'
        },
        {
            id: 'louvre',
            stopId: 'paris-1',
            title: 'Louvre Museum',
            latitude: 48.8606,
            longitude: 2.3376,
            category: 'Museum'
        }
    ]
};
```

**What you'll see:**
- Paris city center with a numbered marker
- Green markers for Eiffel Tower and Louvre Museum
- Click markers to see details in popups
- Switch to city view for a zoomed-in map of Paris

### Example 2: European Multi-City Tour

```typescript
const europeanTour = {
    stops: [
        {
            id: '1',
            city: 'Paris',
            country: 'France',
            startDate: '2026-06-01',
            endDate: '2026-06-05'
        },
        {
            id: '2',
            city: 'Rome',
            country: 'Italy',
            startDate: '2026-06-06',
            endDate: '2026-06-10'
        },
        {
            id: '3',
            city: 'Barcelona',
            country: 'Spain',
            startDate: '2026-06-11',
            endDate: '2026-06-15'
        }
    ]
};
```

**What you'll see:**
- Three numbered markers (1, 2, 3) for each city
- Different colors for each stop
- Dashed red line showing travel route
- Click any city to zoom in and explore

### Example 3: Asian Adventure

```typescript
const asianTrip = {
    stops: [
        {
            id: 'tokyo-1',
            city: 'Tokyo',
            country: 'Japan',
            startDate: '2026-09-01',
            endDate: '2026-09-07'
        },
        {
            id: 'kyoto-1',
            city: 'Kyoto',
            country: 'Japan',
            startDate: '2026-09-08',
            endDate: '2026-09-12'
        },
        {
            id: 'seoul-1',
            city: 'Seoul',
            country: 'South Korea',
            startDate: '2026-09-13',
            endDate: '2026-09-18'
        }
    ]
};
```

**What you'll see:**
- Route spanning across Japan to Korea
- Automatic geocoding for all three cities
- Distance visualization between stops

## Supported Destinations

The system includes pre-loaded coordinates for 60+ popular cities:

### Europe
Paris, London, Rome, Barcelona, Amsterdam, Berlin, Prague, Vienna, Budapest, Istanbul

### Asia
Tokyo, Kyoto, Seoul, Bangkok, Singapore, Hong Kong, Shanghai, Beijing, Dubai, Mumbai, Delhi

### North America
New York, Los Angeles, San Francisco, Las Vegas, Chicago, Miami, Toronto, Vancouver, Mexico City

### South America
Rio de Janeiro, São Paulo, Buenos Aires, Lima, Bogotá

### Oceania
Sydney, Melbourne, Auckland, Bali

### Africa
Cape Town, Marrakech, Cairo

## Famous Landmarks Included

Pre-loaded coordinates for 30+ famous landmarks:

**Paris:** Eiffel Tower, Louvre Museum, Notre-Dame, Arc de Triomphe, Sacré-Cœur

**London:** Big Ben, Tower Bridge, British Museum, Buckingham Palace, London Eye

**Rome:** Colosseum, Vatican City, Trevi Fountain, Pantheon, Spanish Steps

**New York:** Statue of Liberty, Central Park, Empire State Building, Times Square, Brooklyn Bridge

**Tokyo:** Tokyo Tower, Senso-ji Temple, Shibuya Crossing, Meiji Shrine, Tsukiji Market

**Sydney:** Sydney Opera House, Sydney Harbour Bridge, Bondi Beach

## How to View the Demo

Visit: **http://localhost:3000/map-demo**

The demo page includes four pre-configured trips:
1. **🇫🇷 Paris Landmarks** - Detailed Paris map with all famous attractions
2. **🇪🇺 European Tour** - Multi-city route through Paris, Rome, Barcelona
3. **🇯🇵 Asian Adventure** - Tokyo, Kyoto, Seoul journey
4. **🇺🇸 US Road Trip** - Cross-country from NYC to San Francisco

## Component Usage

### Basic Usage

```tsx
import TripMap from '../components/TripMap';

<TripMap
    stops={tripStops}
    onStopClick={(stopId) => console.log('Clicked:', stopId)}
/>
```

### With Activities

```tsx
<TripMap
    stops={tripStops}
    activities={activities}
    selectedStopId={selectedStopId}
    onStopClick={(stopId) => setSelectedStopId(stopId)}
    onActivityClick={(activityId) => handleActivityClick(activityId)}
/>
```

## Props

### TripMap Component

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `stops` | `Stop[]` | Yes | Array of trip stops with city, country, dates |
| `activities` | `Activity[]` | No | Array of activities with location data |
| `selectedStopId` | `string` | No | ID of currently selected stop |
| `onStopClick` | `(stopId: string) => void` | No | Callback when stop marker is clicked |
| `onActivityClick` | `(activityId: string) => void` | No | Callback when activity marker is clicked |

## Utilities

### Getting City Coordinates

```typescript
import { getCityCoordinates } from '../utils/destinations';

const coords = getCityCoordinates('Paris');
// Returns: { lat: 48.8566, lon: 2.3522 }
```

### Getting Landmarks for a City

```typescript
import { getLandmarksForCity } from '../utils/destinations';

const landmarks = getLandmarksForCity('Paris');
// Returns array of landmarks with coordinates
```

## Technical Stack

- **Mapping Library:** Leaflet + React-Leaflet
- **Geocoding:** OpenStreetMap Nominatim API
- **Tiles:** OpenStreetMap
- **Markers:** Custom SVG-based markers with numbers and colors
- **Routing:** Polyline visualization between stops

## Performance

- Automatic coordinate caching
- Lazy loading of map tiles
- Efficient re-rendering with React hooks
- Batch geocoding for multiple cities
- Minimal API calls with pre-loaded destination data

## Future Enhancements

- [ ] Add routing directions between stops
- [ ] Estimated travel time and distance
- [ ] Weather integration for destinations
- [ ] Photo uploads for activities
- [ ] Heatmap of popular destinations
- [ ] Offline map support
- [ ] Custom marker icons by category
- [ ] 3D terrain view
- [ ] Street view integration

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Credits

- Map data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- Geocoding powered by [Nominatim](https://nominatim.org/)
- Map rendering by [Leaflet](https://leafletjs.com/)
