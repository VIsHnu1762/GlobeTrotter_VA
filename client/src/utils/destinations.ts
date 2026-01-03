// Popular destinations with coordinates for quick reference
export const popularDestinations = {
    // Europe
    'Paris': { country: 'France', lat: 48.8566, lon: 2.3522 },
    'London': { country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
    'Rome': { country: 'Italy', lat: 41.9028, lon: 12.4964 },
    'Barcelona': { country: 'Spain', lat: 41.3851, lon: 2.1734 },
    'Amsterdam': { country: 'Netherlands', lat: 52.3676, lon: 4.9041 },
    'Berlin': { country: 'Germany', lat: 52.5200, lon: 13.4050 },
    'Prague': { country: 'Czech Republic', lat: 50.0755, lon: 14.4378 },
    'Vienna': { country: 'Austria', lat: 48.2082, lon: 16.3738 },
    'Budapest': { country: 'Hungary', lat: 47.4979, lon: 19.0402 },
    'Istanbul': { country: 'Turkey', lat: 41.0082, lon: 28.9784 },

    // Asia
    'Tokyo': { country: 'Japan', lat: 35.6762, lon: 139.6503 },
    'Kyoto': { country: 'Japan', lat: 35.0116, lon: 135.7681 },
    'Seoul': { country: 'South Korea', lat: 37.5665, lon: 126.9780 },
    'Bangkok': { country: 'Thailand', lat: 13.7563, lon: 100.5018 },
    'Singapore': { country: 'Singapore', lat: 1.3521, lon: 103.8198 },
    'Hong Kong': { country: 'Hong Kong', lat: 22.3193, lon: 114.1694 },
    'Shanghai': { country: 'China', lat: 31.2304, lon: 121.4737 },
    'Beijing': { country: 'China', lat: 39.9042, lon: 116.4074 },
    'Dubai': { country: 'United Arab Emirates', lat: 25.2048, lon: 55.2708 },
    'Mumbai': { country: 'India', lat: 19.0760, lon: 72.8777 },
    'Delhi': { country: 'India', lat: 28.6139, lon: 77.2090 },

    // North America
    'New York': { country: 'United States', lat: 40.7128, lon: -74.0060 },
    'Los Angeles': { country: 'United States', lat: 34.0522, lon: -118.2437 },
    'San Francisco': { country: 'United States', lat: 37.7749, lon: -122.4194 },
    'Las Vegas': { country: 'United States', lat: 36.1699, lon: -115.1398 },
    'Chicago': { country: 'United States', lat: 41.8781, lon: -87.6298 },
    'Miami': { country: 'United States', lat: 25.7617, lon: -80.1918 },
    'Toronto': { country: 'Canada', lat: 43.6532, lon: -79.3832 },
    'Vancouver': { country: 'Canada', lat: 49.2827, lon: -123.1207 },
    'Mexico City': { country: 'Mexico', lat: 19.4326, lon: -99.1332 },

    // South America
    'Rio de Janeiro': { country: 'Brazil', lat: -22.9068, lon: -43.1729 },
    'São Paulo': { country: 'Brazil', lat: -23.5505, lon: -46.6333 },
    'Buenos Aires': { country: 'Argentina', lat: -34.6037, lon: -58.3816 },
    'Lima': { country: 'Peru', lat: -12.0464, lon: -77.0428 },
    'Bogotá': { country: 'Colombia', lat: 4.7110, lon: -74.0721 },

    // Oceania
    'Sydney': { country: 'Australia', lat: -33.8688, lon: 151.2093 },
    'Melbourne': { country: 'Australia', lat: -37.8136, lon: 144.9631 },
    'Auckland': { country: 'New Zealand', lat: -36.8485, lon: 174.7633 },
    'Bali': { country: 'Indonesia', lat: -8.3405, lon: 115.0920 },

    // Africa
    'Cape Town': { country: 'South Africa', lat: -33.9249, lon: 18.4241 },
    'Marrakech': { country: 'Morocco', lat: 31.6295, lon: -7.9811 },
    'Cairo': { country: 'Egypt', lat: 30.0444, lon: 31.2357 },
};

// Famous landmarks and attractions with coordinates
export const famousLandmarks = {
    // Paris
    'Eiffel Tower': { city: 'Paris', lat: 48.8584, lon: 2.2945 },
    'Louvre Museum': { city: 'Paris', lat: 48.8606, lon: 2.3376 },
    'Notre-Dame Cathedral': { city: 'Paris', lat: 48.8530, lon: 2.3499 },
    'Arc de Triomphe': { city: 'Paris', lat: 48.8738, lon: 2.2950 },
    'Sacré-Cœur': { city: 'Paris', lat: 48.8867, lon: 2.3431 },

    // London
    'Big Ben': { city: 'London', lat: 51.5007, lon: -0.1246 },
    'Tower Bridge': { city: 'London', lat: 51.5055, lon: -0.0754 },
    'British Museum': { city: 'London', lat: 51.5194, lon: -0.1270 },
    'Buckingham Palace': { city: 'London', lat: 51.5014, lon: -0.1419 },
    'London Eye': { city: 'London', lat: 51.5033, lon: -0.1196 },

    // Rome
    'Colosseum': { city: 'Rome', lat: 41.8902, lon: 12.4922 },
    'Vatican City': { city: 'Rome', lat: 41.9029, lon: 12.4534 },
    'Trevi Fountain': { city: 'Rome', lat: 41.9009, lon: 12.4833 },
    'Pantheon': { city: 'Rome', lat: 41.8986, lon: 12.4769 },
    'Spanish Steps': { city: 'Rome', lat: 41.9058, lon: 12.4823 },

    // New York
    'Statue of Liberty': { city: 'New York', lat: 40.6892, lon: -74.0445 },
    'Central Park': { city: 'New York', lat: 40.7829, lon: -73.9654 },
    'Empire State Building': { city: 'New York', lat: 40.7484, lon: -73.9857 },
    'Times Square': { city: 'New York', lat: 40.7580, lon: -73.9855 },
    'Brooklyn Bridge': { city: 'New York', lat: 40.7061, lon: -73.9969 },

    // Tokyo
    'Tokyo Tower': { city: 'Tokyo', lat: 35.6586, lon: 139.7454 },
    'Senso-ji Temple': { city: 'Tokyo', lat: 35.7148, lon: 139.7967 },
    'Shibuya Crossing': { city: 'Tokyo', lat: 35.6595, lon: 139.7004 },
    'Meiji Shrine': { city: 'Tokyo', lat: 35.6764, lon: 139.6993 },
    'Tsukiji Market': { city: 'Tokyo', lat: 35.6654, lon: 139.7707 },

    // Sydney
    'Sydney Opera House': { city: 'Sydney', lat: -33.8568, lon: 151.2153 },
    'Sydney Harbour Bridge': { city: 'Sydney', lat: -33.8523, lon: 151.2108 },
    'Bondi Beach': { city: 'Sydney', lat: -33.8915, lon: 151.2767 },
};

// Helper function to get coordinates for a city
export const getCityCoordinates = (cityName: string): { lat: number; lon: number } | null => {
    const city = popularDestinations[cityName as keyof typeof popularDestinations];
    return city ? { lat: city.lat, lon: city.lon } : null;
};

// Helper function to get landmark coordinates
export const getLandmarkCoordinates = (landmarkName: string): { lat: number; lon: number } | null => {
    const landmark = famousLandmarks[landmarkName as keyof typeof famousLandmarks];
    return landmark ? { lat: landmark.lat, lon: landmark.lon } : null;
};

// Get all cities as searchable list
export const getCityList = (): Array<{ name: string; country: string; lat: number; lon: number }> => {
    return Object.entries(popularDestinations).map(([name, data]) => ({
        name,
        country: data.country,
        lat: data.lat,
        lon: data.lon,
    }));
};

// Get landmarks for a specific city
export const getLandmarksForCity = (cityName: string): Array<{ name: string; lat: number; lon: number }> => {
    return Object.entries(famousLandmarks)
        .filter(([, data]) => data.city === cityName)
        .map(([name, data]) => ({
            name,
            lat: data.lat,
            lon: data.lon,
        }));
};
