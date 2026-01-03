import React from 'react';
import TripMap from '../components/TripMap';
import { getLandmarksForCity } from '../utils/destinations';
import 'leaflet/dist/leaflet.css';

/**
 * Example Demo Page - Map Feature with Multiple Cities
 * 
 * This demonstrates the enhanced map feature with:
 * 1. Multi-city itineraries with automatic geocoding
 * 2. Interactive city-specific views
 * 3. Famous landmarks and attractions
 * 4. Route visualization between cities
 */

const MapDemoPage: React.FC = () => {
    // Example 1: European Adventure
    const europeanTrip = {
        stops: [
            {
                id: '1',
                city: 'Paris',
                country: 'France',
                startDate: '2026-06-01',
                endDate: '2026-06-05',
                notes: 'Explore the City of Light - Eiffel Tower, Louvre, and amazing cuisine',
            },
            {
                id: '2',
                city: 'Rome',
                country: 'Italy',
                startDate: '2026-06-06',
                endDate: '2026-06-10',
                notes: 'Ancient history, incredible food, and beautiful architecture',
            },
            {
                id: '3',
                city: 'Barcelona',
                country: 'Spain',
                startDate: '2026-06-11',
                endDate: '2026-06-15',
                notes: 'Gaudí architecture, beaches, and vibrant nightlife',
            },
        ],
    };

    // Example 2: Paris with famous landmarks
    const parisLandmarks = getLandmarksForCity('Paris');
    const parisTrip = {
        stops: [
            {
                id: 'paris-1',
                city: 'Paris',
                country: 'France',
                startDate: '2026-07-01',
                endDate: '2026-07-07',
                notes: 'One week exploring Paris and its iconic attractions',
            },
        ],
        activities: parisLandmarks.map((landmark, index) => ({
            id: `activity-${index}`,
            stopId: 'paris-1',
            title: landmark.name,
            description: `Visit the famous ${landmark.name}`,
            date: '2026-07-01',
            category: 'Attraction',
            latitude: landmark.lat,
            longitude: landmark.lon,
        })),
    };

    // Example 3: Asian Adventure
    const asianTrip = {
        stops: [
            {
                id: 'tokyo-1',
                city: 'Tokyo',
                country: 'Japan',
                startDate: '2026-09-01',
                endDate: '2026-09-07',
                notes: 'Modern metropolis with ancient traditions',
            },
            {
                id: 'kyoto-1',
                city: 'Kyoto',
                country: 'Japan',
                startDate: '2026-09-08',
                endDate: '2026-09-12',
                notes: 'Historic temples and traditional culture',
            },
            {
                id: 'seoul-1',
                city: 'Seoul',
                country: 'South Korea',
                startDate: '2026-09-13',
                endDate: '2026-09-18',
                notes: 'K-pop culture, amazing food, and tech innovation',
            },
        ],
    };

    // Example 4: US Cross-Country
    const usTrip = {
        stops: [
            {
                id: 'ny-1',
                city: 'New York',
                country: 'United States',
                startDate: '2026-08-01',
                endDate: '2026-08-05',
                notes: 'The city that never sleeps',
            },
            {
                id: 'chicago-1',
                city: 'Chicago',
                country: 'United States',
                startDate: '2026-08-06',
                endDate: '2026-08-09',
                notes: 'Deep dish pizza and stunning architecture',
            },
            {
                id: 'sf-1',
                city: 'San Francisco',
                country: 'United States',
                startDate: '2026-08-10',
                endDate: '2026-08-15',
                notes: 'Golden Gate Bridge and tech scene',
            },
        ],
    };

    const [selectedDemo, setSelectedDemo] = React.useState<'europe' | 'paris' | 'asia' | 'us'>('paris');

    const getDemoData = (): { stops: any[]; activities?: any[] } => {
        switch (selectedDemo) {
            case 'paris':
                return parisTrip;
            case 'asia':
                return asianTrip;
            case 'us':
                return usTrip;
            default:
                return europeanTrip;
        }
    };

    const demoData = getDemoData();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">🗺️ Interactive Map Demo</h1>
                            <p className="text-sm text-gray-600 mt-1">
                                Click on cities to explore detailed views with landmarks
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setSelectedDemo('paris')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedDemo === 'paris'
                                    ? 'bg-coral-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                🇫🇷 Paris Landmarks
                            </button>
                            <button
                                onClick={() => setSelectedDemo('europe')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedDemo === 'europe'
                                    ? 'bg-coral-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                🇪🇺 European Tour
                            </button>
                            <button
                                onClick={() => setSelectedDemo('asia')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedDemo === 'asia'
                                    ? 'bg-coral-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                🇯🇵 Asian Adventure
                            </button>
                            <button
                                onClick={() => setSelectedDemo('us')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedDemo === 'us'
                                    ? 'bg-coral-500 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                🇺🇸 US Road Trip
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="flex h-[calc(100vh-80px)]">
                {/* Left Panel - Trip Details */}
                <div className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Trip Itinerary</h2>

                        <div className="space-y-4">
                            {demoData.stops.map((stop, index) => (
                                <div key={stop.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-coral-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900">{stop.city}</h3>
                                            <p className="text-sm text-gray-600">{stop.country}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(stop.startDate).toLocaleDateString()} - {new Date(stop.endDate).toLocaleDateString()}
                                            </p>
                                            {stop.notes && (
                                                <p className="text-sm text-gray-700 mt-2 italic">{stop.notes}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Activities/Landmarks for Paris */}
                        {selectedDemo === 'paris' && demoData.activities && (
                            <div className="mt-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">📍 Famous Landmarks</h3>
                                <div className="space-y-2">
                                    {demoData.activities.map((activity) => (
                                        <div key={activity.id} className="bg-green-50 rounded-lg p-3 border border-green-200">
                                            <h4 className="font-semibold text-gray-900 text-sm">{activity.title}</h4>
                                            <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Feature Highlights */}
                        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h3 className="font-bold text-blue-900 mb-2">✨ Map Features</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• Automatic city geocoding</li>
                                <li>• Numbered stop markers</li>
                                <li>• Route visualization</li>
                                <li>• City zoom-in views</li>
                                <li>• Landmark markers (green)</li>
                                <li>• Interactive popups</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Map */}
                <div className="flex-1 relative">
                    <TripMap
                        stops={demoData.stops}
                        activities={demoData.activities}
                        onStopClick={(stopId) => console.log('Stop clicked:', stopId)}
                        onActivityClick={(activityId) => console.log('Activity clicked:', activityId)}
                    />
                </div>
            </div>
        </div>
    );
};

export default MapDemoPage;
