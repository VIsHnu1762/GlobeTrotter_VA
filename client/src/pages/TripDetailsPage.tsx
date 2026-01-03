import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import toast from 'react-hot-toast';
import TripMap from '../components/TripMap';
import 'leaflet/dist/leaflet.css';

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
    date: string;
    category: string;
}

interface Trip {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    isPublic: boolean;
    stops: Stop[];
}

const TripDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useAuth();
    const [trip, setTrip] = useState<Trip | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [activeSection, setActiveSection] = useState<'overview' | 'explore' | 'itinerary'>('overview');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedStopId, setSelectedStopId] = useState<string | null>(null);

    useEffect(() => {
        const fetchTrip = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const { tripService } = await import('@services/tripService');
                const tripData = await tripService.getTripById(id);
                setTrip(tripData);
            } catch (error) {
                console.error('Error fetching trip:', error);
                toast.error('Failed to load trip details');
            } finally {
                setLoading(false);
            }
        };

        fetchTrip();
    }, [id]);

    const getDaysBetween = (start: string, end: string) => {
        const days = [];
        const startDate = new Date(start);
        const endDate = new Date(end);

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            days.push(new Date(d));
        }
        return days;
    };

    const formatDate = (date: Date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
        return `${days[date.getDay()]} ${months[date.getMonth()]}/${date.getDate()}`;
    };

    const formatDateRange = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        return `${startDate.getMonth() + 1}/${startDate.getDate()} - ${endDate.getMonth() + 1}/${endDate.getDate()}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-coral-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Trip not found</h2>
                    <Link to="/dashboard" className="text-coral-500 hover:text-coral-600">
                        ← Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const tripDays = getDaysBetween(trip.startDate, trip.endDate);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Sidebar */}
            <aside className={`bg-white border-r border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-12' : 'w-64'} flex flex-col`}>
                {!sidebarCollapsed && (
                    <div className="flex-1 overflow-y-auto">
                        {/* Logo/Header */}
                        <div className="p-4 border-b border-gray-200">
                            <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="text-sm font-medium">Back</span>
                            </Link>
                        </div>

                        {/* AI Assistant */}
                        <div className="p-4 border-b border-gray-200">
                            <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                                🤖 AI Assistant
                            </button>
                        </div>

                        {/* Navigation Sections */}
                        <div className="p-2">
                            <button
                                onClick={() => setActiveSection('overview')}
                                className={`w-full px-3 py-2 rounded-lg text-left text-sm font-medium transition-colors ${activeSection === 'overview' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span>📋 Overview</span>
                                    <svg className={`w-4 h-4 transition-transform ${activeSection === 'overview' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>

                            <button
                                onClick={() => setActiveSection('explore')}
                                className={`w-full px-3 py-2 rounded-lg text-left text-sm font-medium transition-colors mt-1 ${activeSection === 'explore' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span>🔍 Explore</span>
                                    <svg className={`w-4 h-4 transition-transform ${activeSection === 'explore' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                            {activeSection === 'explore' && (
                                <div className="ml-4 mt-1 space-y-1">
                                    <button className="w-full px-3 py-1.5 text-left text-sm text-gray-600 hover:text-gray-900 rounded">Notes</button>
                                    <button className="w-full px-3 py-1.5 text-left text-sm text-gray-600 hover:text-gray-900 rounded">Places to visit</button>
                                    <button className="w-full px-3 py-1.5 text-left text-sm text-gray-600 hover:text-gray-900 rounded">Untitled</button>
                                </div>
                            )}

                            <button
                                onClick={() => setActiveSection('itinerary')}
                                className={`w-full px-3 py-2 rounded-lg text-left text-sm font-medium transition-colors mt-1 ${activeSection === 'itinerary' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <span>📅 Itinerary</span>
                                    <svg className={`w-4 h-4 transition-transform ${activeSection === 'itinerary' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </button>
                            {activeSection === 'itinerary' && (
                                <div className="ml-4 mt-1 space-y-1">
                                    {tripDays.map((day, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedDate(day.toISOString())}
                                            className={`w-full px-3 py-1.5 text-left text-sm rounded transition-colors ${selectedDate === day.toISOString()
                                                ? 'bg-coral-50 text-coral-600 font-medium'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            {formatDate(day)}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Collapse Button */}
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="p-4 border-t border-gray-200 text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                    </svg>
                    {!sidebarCollapsed && <span className="ml-2">Hide sidebar</span>}
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="max-w-5xl mx-auto p-8">
                    {/* Trip Header */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{trip.title}</h1>
                                <div className="flex items-center space-x-4 text-gray-600">
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{formatDateRange(trip.startDate, trip.endDate)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-semibold text-gray-600">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Explore Section */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                                Explore
                            </h2>
                            <button className="flex items-center space-x-2 px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <span className="text-sm font-medium">Browse all</span>
                            </button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Best Attractions Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="h-40 bg-gradient-to-br from-purple-400 to-pink-400 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1">Best attractions in {trip.stops[0]?.city || 'Tokyo'}</h3>
                                    <p className="text-sm text-gray-500">Most often-seen on the web</p>
                                    <div className="flex items-center space-x-2 mt-3">
                                        <div className="w-5 h-5 bg-coral-100 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-coral-600" fill="currentColor" viewBox="0 0 20 20">
                                                <circle cx="10" cy="10" r="10" />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-gray-600">Wanderlog</span>
                                    </div>
                                </div>
                            </div>

                            {/* Best Restaurants Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="h-40 bg-gradient-to-br from-orange-400 to-red-400 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1">Best restaurants in {trip.stops[0]?.city || 'Tokyo'}</h3>
                                    <p className="text-sm text-gray-500">Most often-seen on the web</p>
                                    <div className="flex items-center space-x-2 mt-3">
                                        <div className="w-5 h-5 bg-coral-100 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-coral-600" fill="currentColor" viewBox="0 0 20 20">
                                                <circle cx="10" cy="10" r="10" />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-gray-600">Wanderlog</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hotels Card */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                                <div className="h-40 bg-gradient-to-br from-blue-400 to-teal-400 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="w-16 h-16 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 mb-1">Search hotels with transparent pricing</h3>
                                    <p className="text-sm text-gray-500">Unlike most sites, we don't sort based on commissions</p>
                                    <div className="flex items-center space-x-2 mt-3">
                                        <div className="w-5 h-5 bg-coral-100 rounded-full flex items-center justify-center">
                                            <svg className="w-3 h-3 text-coral-600" fill="currentColor" viewBox="0 0 20 20">
                                                <circle cx="10" cy="10" r="10" />
                                            </svg>
                                        </div>
                                        <span className="text-xs text-gray-600">Wanderlog</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional Sections */}
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">📎 Reservations and attachments</h3>
                            <p className="text-sm text-gray-500">Keep track of your bookings and important documents</p>
                            <button className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-coral-400 hover:text-coral-600 transition-colors">
                                + Add reservation or attachment
                            </button>
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">💰 Budgeting</h3>
                            <p className="text-sm text-gray-500">Track your trip expenses and stay on budget</p>
                            <button className="mt-4 w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-coral-400 hover:text-coral-600 transition-colors">
                                + Add expense
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Right Sidebar - Map */}
            <aside className="w-96 bg-white border-l border-gray-200 relative">
                <TripMap
                    stops={trip.stops}
                    selectedStopId={selectedStopId}
                    onStopClick={(stopId) => setSelectedStopId(stopId)}
                />
            </aside>
        </div>
    );
};

export default TripDetailsPage;
