import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createNumberedIcon = (number: number, color: string) => {
    return L.divIcon({
        html: `
            <div style="
                background-color: ${color};
                width: 32px;
                height: 32px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <span style="
                    transform: rotate(45deg);
                    color: white;
                    font-weight: bold;
                    font-size: 14px;
                ">${number}</span>
            </div>
        `,
        className: 'custom-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
};

const activityIcon = L.divIcon({
    html: `
        <div style="
            background-color: #10B981;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
        ">
            <span style="color: white; font-size: 12px;">📍</span>
        </div>
    `,
    className: 'activity-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
});

interface Stop {
    id: string;
    city: string;
    country: string;
    startDate: string;
    endDate: string;
    notes?: string;
    latitude?: number;
    longitude?: number;
}

interface Activity {
    id: string;
    stopId: string;
    title: string;
    description?: string;
    date: string;
    category?: string;
    latitude?: number;
    longitude?: number;
}

interface TripMapProps {
    stops: Stop[];
    activities?: Activity[];
    selectedStopId?: string;
    onStopClick?: (stopId: string) => void;
    onActivityClick?: (activityId: string) => void;
}

// Component to adjust map bounds when stops change
const MapBoundsUpdater: React.FC<{ stops: Stop[] }> = ({ stops }) => {
    const map = useMap();

    useEffect(() => {
        const validStops = stops.filter(s => s.latitude && s.longitude);
        if (validStops.length > 0) {
            const bounds = L.latLngBounds(
                validStops.map(s => [s.latitude!, s.longitude!])
            );
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [stops, map]);

    return null;
};

// Geocoding function using Nominatim (OpenStreetMap)
const geocodeCity = async (city: string, country: string): Promise<{ lat: number; lon: number } | null> => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city)},${encodeURIComponent(country)}&limit=1`
        );
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
            };
        }
    } catch (error) {
        console.error('Geocoding error:', error);
    }
    return null;
};

export const TripMap: React.FC<TripMapProps> = ({
    stops,
    activities = [],
    selectedStopId,
    onStopClick,
    onActivityClick,
}) => {
    const [geocodedStops, setGeocodedStops] = useState<Stop[]>(stops);
    const [loading, setLoading] = useState(false);
    const [mapView, setMapView] = useState<'route' | 'city'>('route');
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    // Geocode stops that don't have coordinates
    useEffect(() => {
        const geocodeStops = async () => {
            setLoading(true);
            const updatedStops = await Promise.all(
                stops.map(async (stop) => {
                    if (stop.latitude && stop.longitude) {
                        return stop;
                    }
                    const coords = await geocodeCity(stop.city, stop.country);
                    if (coords) {
                        return { ...stop, latitude: coords.lat, longitude: coords.lon };
                    }
                    return stop;
                })
            );
            setGeocodedStops(updatedStops);
            setLoading(false);
        };

        geocodeStops();
    }, [stops]);

    const validStops = geocodedStops.filter(s => s.latitude && s.longitude);

    if (loading) {
        return (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-coral-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading map...</p>
                </div>
            </div>
        );
    }

    if (validStops.length === 0) {
        return (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                <div className="text-center p-8">
                    <svg className="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-gray-600 font-medium mb-2">No Location Data</p>
                    <p className="text-sm text-gray-500">Add destinations to see them on the map</p>
                </div>
            </div>
        );
    }

    const centerStop = selectedStopId
        ? validStops.find(s => s.id === selectedStopId) || validStops[0]
        : validStops[0];

    const center: [number, number] = [centerStop.latitude!, centerStop.longitude!];
    const zoom = mapView === 'city' && selectedCity ? 13 : 6;

    const formatDateRange = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endDate.getMonth() + 1}/${endDate.getDate()}`;
    };

    const getStopColor = (index: number): string => {
        const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
        return colors[index % colors.length];
    };

    return (
        <div className="relative h-full w-full">
            {/* Map Controls */}
            <div className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-2 space-y-2">
                <button
                    onClick={() => {
                        setMapView('route');
                        setSelectedCity(null);
                    }}
                    className={`w-full px-3 py-2 rounded text-sm font-medium transition-colors ${mapView === 'route'
                        ? 'bg-coral-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    🗺️ Full Route
                </button>
                <div className="border-t border-gray-200 pt-2">
                    <p className="text-xs text-gray-500 px-2 mb-1">Cities</p>
                    {validStops.map((stop, index) => (
                        <button
                            key={stop.id}
                            onClick={() => {
                                setMapView('city');
                                setSelectedCity(stop.id);
                                onStopClick?.(stop.id);
                            }}
                            className={`w-full px-3 py-2 rounded text-sm transition-colors text-left ${selectedCity === stop.id
                                ? 'bg-coral-500 text-white'
                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <div className="flex items-center space-x-2">
                                <div
                                    className="w-4 h-4 rounded-full border-2 border-white shadow"
                                    style={{ backgroundColor: getStopColor(index) }}
                                />
                                <span className="truncate">{stop.city}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Stop Info Card */}
            {selectedCity && (
                <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-xs">
                    {validStops
                        .filter(s => s.id === selectedCity)
                        .map(stop => (
                            <div key={stop.id}>
                                <h3 className="font-bold text-lg text-gray-900">{stop.city}</h3>
                                <p className="text-sm text-gray-600">{stop.country}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    📅 {formatDateRange(stop.startDate, stop.endDate)}
                                </p>
                                {stop.notes && (
                                    <p className="text-sm text-gray-700 mt-2 border-t pt-2">{stop.notes}</p>
                                )}
                                <div className="mt-3">
                                    <p className="text-xs font-medium text-gray-500 mb-1">
                                        Activities in this city
                                    </p>
                                    {activities.filter(a => a.stopId === stop.id).length > 0 ? (
                                        <div className="space-y-1">
                                            {activities
                                                .filter(a => a.stopId === stop.id)
                                                .slice(0, 3)
                                                .map(activity => (
                                                    <div
                                                        key={activity.id}
                                                        className="text-xs text-gray-700 bg-gray-50 rounded px-2 py-1"
                                                    >
                                                        📍 {activity.title}
                                                    </div>
                                                ))}
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">No activities yet</p>
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            )}

            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapBoundsUpdater stops={validStops} />

                {/* Markers for each stop */}
                {validStops.map((stop, index) => (
                    <Marker
                        key={stop.id}
                        position={[stop.latitude!, stop.longitude!]}
                        icon={createNumberedIcon(index + 1, getStopColor(index))}
                        eventHandlers={{
                            click: () => {
                                setSelectedCity(stop.id);
                                setMapView('city');
                                onStopClick?.(stop.id);
                            },
                        }}
                    >
                        <Popup>
                            <div className="text-center p-2">
                                <h3 className="font-bold text-gray-900 text-base">{stop.city}</h3>
                                <p className="text-sm text-gray-600">{stop.country}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                    📅 {formatDateRange(stop.startDate, stop.endDate)}
                                </p>
                                {stop.notes && (
                                    <p className="text-xs text-gray-600 mt-2 border-t pt-2">{stop.notes}</p>
                                )}
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Activity markers */}
                {activities
                    .filter(a => a.latitude && a.longitude)
                    .map(activity => (
                        <Marker
                            key={activity.id}
                            position={[activity.latitude!, activity.longitude!]}
                            icon={activityIcon}
                            eventHandlers={{
                                click: () => onActivityClick?.(activity.id),
                            }}
                        >
                            <Popup>
                                <div className="text-center p-2">
                                    <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                                    {activity.description && (
                                        <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                                    )}
                                    {activity.category && (
                                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                            {activity.category}
                                        </span>
                                    )}
                                </div>
                            </Popup>
                        </Marker>
                    ))}

                {/* Draw route line between stops */}
                {validStops.length > 1 && mapView === 'route' && (
                    <Polyline
                        positions={validStops.map(s => [s.latitude!, s.longitude!])}
                        color="#EF4444"
                        weight={3}
                        opacity={0.7}
                        dashArray="10, 10"
                    />
                )}
            </MapContainer>
        </div>
    );
};

export default TripMap;
