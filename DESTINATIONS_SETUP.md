# Destination Data Setup Guide

## 📍 Overview
The destination data includes **60+ popular travel destinations** worldwide with:
- Geographic coordinates (latitude/longitude)
- Popular attractions
- Best months to visit
- Average daily budget
- Timezone information
- Detailed descriptions

## 🚀 Quick Setup

### 1. Load Destination Data into Database

Run this command from your project root:

```powershell
# Load the destinations seed data
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U globetrotter_user -d globetrotter_db -f "database\seeds\002_destinations_data.sql"
```

You should see output like:
```
CREATE TABLE
CREATE INDEX
CREATE INDEX
CREATE INDEX
INSERT 0 10  (repeated for each continent)
CREATE VIEW
COMMENT
COMMENT
```

### 2. Verify Data Loaded

```powershell
# Check how many destinations loaded
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U globetrotter_user -d globetrotter_db -c "SELECT COUNT(*) FROM destinations;"

# See sample destinations
& "C:\Program Files\PostgreSQL\17\bin\psql.exe" -U globetrotter_user -d globetrotter_db -c "SELECT city, country, continent FROM destinations LIMIT 10;"
```

### 3. Restart Backend Server

The backend needs to restart to pick up the new routes:

```powershell
cd server
npm run dev
```

## 📡 API Endpoints

Once loaded, these endpoints are available:

### Search Destinations (Autocomplete)
```
GET /api/destinations/search?q=paris&limit=10
```
Returns destinations matching the search query.

### Get Popular Destinations
```
GET /api/destinations/popular?limit=20
```
Returns top destinations sorted by number of attractions.

### Get Destinations by Continent
```
GET /api/destinations/continent/Europe
```
Available continents: Europe, Asia, North America, South America, Oceania, Africa

### Get Budget-Friendly Destinations
```
GET /api/destinations/budget-friendly?maxBudget=100&limit=10
```
Returns destinations under the specified daily budget.

### Get Specific Destination
```
GET /api/destinations/Paris/France
```
Returns detailed info about a specific city.

## 🎨 Frontend Integration Examples

### 1. Autocomplete Search Component

```tsx
import { useState, useEffect } from 'react';
import { destinationService } from '@services/destinationService';

function LocationAutocomplete() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (query.length > 2) {
            destinationService.searchDestinations(query, 5)
                .then(results => setSuggestions(results))
                .catch(console.error);
        } else {
            setSuggestions([]);
        }
    }, [query]);

    return (
        <div className="relative">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full px-4 py-2 border rounded-lg"
            />
            {suggestions.length > 0 && (
                <div className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg">
                    {suggestions.map((dest) => (
                        <button
                            key={dest.id}
                            onClick={() => {
                                setQuery(`${dest.city}, ${dest.country}`);
                                setSuggestions([]);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                            <div className="font-semibold">{dest.city}</div>
                            <div className="text-sm text-gray-600">
                                {dest.country} • ${dest.avgBudgetPerDay}/day
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
```

### 2. Popular Destinations Grid

```tsx
import { useEffect, useState } from 'react';
import { destinationService, Destination } from '@services/destinationService';

function PopularDestinations() {
    const [destinations, setDestinations] = useState<Destination[]>([]);

    useEffect(() => {
        destinationService.getPopularDestinations(12)
            .then(setDestinations)
            .catch(console.error);
    }, []);

    return (
        <div className="grid grid-cols-3 gap-6">
            {destinations.map((dest) => (
                <div key={dest.id} className="bg-white rounded-lg p-4 shadow">
                    <h3 className="text-xl font-bold">{dest.city}</h3>
                    <p className="text-gray-600">{dest.country}</p>
                    <p className="text-sm text-gray-500 mt-2">{dest.description}</p>
                    <div className="mt-4">
                        <span className="text-sm font-semibold text-emerald-600">
                            ${dest.avgBudgetPerDay}/day
                        </span>
                        <span className="text-sm text-gray-500 ml-4">
                            Best: {dest.bestMonths}
                        </span>
                    </div>
                    <div className="mt-2">
                        {dest.popularAttractions.slice(0, 3).map((attr, i) => (
                            <span key={i} className="inline-block bg-gray-100 text-xs px-2 py-1 rounded mr-1 mb-1">
                                {attr}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
```

### 3. Budget Filter

```tsx
function BudgetDestinations() {
    const [maxBudget, setMaxBudget] = useState(100);
    const [destinations, setDestinations] = useState([]);

    const search = () => {
        destinationService.getBudgetFriendly(maxBudget, 10)
            .then(setDestinations)
            .catch(console.error);
    };

    return (
        <div>
            <div className="mb-4">
                <label>Max Daily Budget: ${maxBudget}</label>
                <input
                    type="range"
                    min="30"
                    max="300"
                    step="10"
                    value={maxBudget}
                    onChange={(e) => setMaxBudget(parseInt(e.target.value))}
                    className="w-full"
                />
                <button onClick={search} className="btn-primary mt-2">
                    Find Destinations
                </button>
            </div>
            {/* Display results */}
        </div>
    );
}
```

## 🌍 Included Destinations

### Europe (10 cities)
Paris, London, Rome, Barcelona, Amsterdam, Berlin, Prague, Vienna, Athens, Lisbon

### Asia (10 cities)
Tokyo, Bangkok, Singapore, Dubai, Seoul, Bali, Hong Kong, Hanoi, Mumbai, Siem Reap

### North America (9 cities)
New York, Los Angeles, San Francisco, Las Vegas, Chicago, Toronto, Vancouver, Mexico City, Cancún

### South America (4 cities)
Rio de Janeiro, Buenos Aires, Lima, Bogotá

### Oceania (4 cities)
Sydney, Melbourne, Auckland, Queenstown

### Africa (4 cities)
Cape Town, Marrakech, Cairo, Nairobi

### Middle East (3 cities)
Istanbul, Jerusalem, Doha

## 🔧 Customization

### Add More Destinations

Edit `database/seeds/002_destinations_data.sql` and add:

```sql
INSERT INTO destinations (city, country, country_code, continent, latitude, longitude, description, popular_attractions, best_months, avg_budget_per_day, timezone) VALUES
('Your City', 'Your Country', 'CC', 'Continent', 0.0000, 0.0000, 'Description',
    ARRAY['Attraction 1', 'Attraction 2', 'Attraction 3'],
    'Best months', 100, 'Timezone');
```

Then reload the seed file.

### Update Existing Data

```sql
UPDATE destinations 
SET avg_budget_per_day = 120, 
    description = 'Updated description'
WHERE city = 'Paris' AND country = 'France';
```

## 🔍 Useful Queries

### Find cheapest destinations
```sql
SELECT city, country, avg_budget_per_day 
FROM destinations 
ORDER BY avg_budget_per_day ASC 
LIMIT 10;
```

### Destinations in a region
```sql
SELECT city, country 
FROM destinations 
WHERE continent = 'Asia' 
ORDER BY avg_budget_per_day ASC;
```

### Search by attractions
```sql
SELECT city, country, popular_attractions 
FROM destinations 
WHERE 'Beach' = ANY(popular_attractions);
```

## 🚨 Troubleshooting

### Error: relation "destinations" does not exist
Run the seed script again - the table creation is included.

### Empty search results
Make sure the backend server restarted after adding routes.

### CORS errors
Check that `cors.origin` in server config includes your frontend URL.

## 🎯 Next Steps

1. **Add to CreateTripPage**: Use autocomplete when adding stops
2. **Destination Details Modal**: Show full destination info when hovering
3. **Map Integration**: Display destinations on an interactive map
4. **Recommendation Engine**: Suggest destinations based on budget/season
5. **User Reviews**: Allow users to rate and review destinations

## 📚 Additional Resources

- PostgreSQL Arrays: https://www.postgresql.org/docs/current/arrays.html
- Geographic Data: https://www.geonames.org/
- Budget Travel Data: https://www.budgetyourtrip.com/
