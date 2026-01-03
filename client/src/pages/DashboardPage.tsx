import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { useTrips } from '@hooks/useTrips';
import { formatDate } from '@utils/dateUtils';
import toast from 'react-hot-toast';

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuth();
    const { trips, loading, deleteTrip } = useTrips();
    const navigate = useNavigate();
    const [activeNav, setActiveNav] = useState('dashboard');
    const [currentDate, setCurrentDate] = useState(new Date());

    // Calendar helpers
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const daysOfWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Adjust for Monday start

        return { daysInMonth, startingDayOfWeek };
    };

    const getTripDates = () => {
        const tripDates = new Set<string>();
        trips.forEach(trip => {
            const start = new Date(trip.startDate);
            const end = new Date(trip.endDate);
            const current = new Date(start);

            while (current <= end) {
                tripDates.add(current.toDateString());
                current.setDate(current.getDate() + 1);
            }
        });
        return tripDates;
    };

    const changeMonth = (direction: number) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + direction);
            return newDate;
        });
    };

    const tripDates = getTripDates();
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const today = new Date();

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            toast.error('Logout failed');
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deleteTrip(id);
                toast.success('Trip deleted successfully');
            } catch (error) {
                toast.error('Failed to delete trip');
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white rounded-r-3xl shadow-lg flex flex-col p-6">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2 mb-10">
                    <svg className="w-8 h-8 text-coral-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <span className="text-xl font-bold text-gray-900">GlobeTrotter</span>
                </Link>

                {/* Navigation */}
                <nav className="flex-1 space-y-2">
                    <button
                        onClick={() => setActiveNav('dashboard')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeNav === 'dashboard'
                            ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Dashboard</span>
                    </button>

                    <Link
                        to="/profile"
                        onClick={() => setActiveNav('profile')}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all ${activeNav === 'profile' ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Profile</span>
                    </Link>

                    <button
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-600 hover:bg-gray-100 transition-all"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Settings</span>
                    </button>
                </nav>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all mt-4"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Log Out</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-7xl mx-auto flex gap-8">
                    {/* Left Section - Trips */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                                    Hello, {user?.name}! 👋
                                </h1>
                                <p className="text-gray-600">Welcome back and explore your trips.</p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search trips..."
                                        className="w-80 px-4 py-2.5 pl-10 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all"
                                    />
                                    <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <Link
                                    to="/trips/new"
                                    className="flex items-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-coral-500 text-white rounded-xl hover:shadow-lg transition-all font-medium"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Create Trip</span>
                                </Link>
                            </div>
                        </div>

                        {/* Trips Section */}
                        {loading ? (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-400 border-t-transparent"></div>
                                <p className="text-gray-600 mt-4">Loading your trips...</p>
                            </div>
                        ) : trips.length === 0 ? (
                            <div className="bg-white rounded-3xl p-16 text-center shadow-sm">
                                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-orange-100 to-teal-100 rounded-full mb-6">
                                    <svg className="w-16 h-16 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">No trips yet</h3>
                                <p className="text-gray-600 mb-8 text-lg">Start planning your first adventure!</p>
                                <Link
                                    to="/trips/new"
                                    className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    <span>Create Your First Trip</span>
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">My Trips</h2>
                                    <span className="text-gray-600">{trips.length} {trips.length === 1 ? 'trip' : 'trips'} found</span>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {trips.map((trip) => (
                                        <div
                                            key={trip.id}
                                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                                        >
                                            {/* Trip Card Header with Gradient Background */}
                                            <div className="h-40 bg-gradient-to-br from-blue-400 via-teal-400 to-emerald-400 relative overflow-hidden p-6 flex flex-col justify-between">
                                                {/* Decorative Elements */}
                                                <div className="absolute inset-0 opacity-20">
                                                    <svg viewBox="0 0 200 200" className="w-full h-full">
                                                        <circle cx="150" cy="50" r="60" fill="white" />
                                                        <circle cx="50" cy="150" r="40" fill="white" />
                                                    </svg>
                                                </div>
                                                <div className="relative z-10">
                                                    {trip.isPublic && (
                                                        <span className="inline-flex items-center space-x-1 bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                            </svg>
                                                            <span>Public</span>
                                                        </span>
                                                    )}
                                                </div>
                                                <h3 className="relative z-10 text-2xl font-bold text-white">{trip.title}</h3>
                                            </div>

                                            {/* Trip Card Body */}
                                            <div className="p-6">
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                                                    {trip.description || 'No description provided'}
                                                </p>

                                                <div className="flex items-center text-sm text-gray-500 mb-6">
                                                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    <span className="font-medium">{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</span>
                                                </div>

                                                <div className="flex space-x-2">
                                                    <Link
                                                        to={`/trips/${trip.id}`}
                                                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl hover:shadow-lg transition-all text-sm font-semibold text-center"
                                                    >
                                                        View Details
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(trip.id, trip.title)}
                                                        className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all text-sm font-semibold"
                                                        title="Delete trip"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - Calendar */}
                    <aside className="w-80 space-y-6">
                        {/* Calendar Widget */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </h3>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => changeMonth(-1)}
                                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => changeMonth(1)}
                                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Calendar Grid */}
                            <div className="grid grid-cols-7 gap-2">
                                {/* Day headers */}
                                {daysOfWeek.map(day => (
                                    <div key={day} className="text-center text-xs font-semibold text-gray-500 pb-2">
                                        {day}
                                    </div>
                                ))}

                                {/* Empty cells for days before month starts */}
                                {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                                    <div key={`empty-${index}`} className="aspect-square" />
                                ))}

                                {/* Calendar days */}
                                {Array.from({ length: daysInMonth }).map((_, index) => {
                                    const day = index + 1;
                                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                                    const dateString = date.toDateString();
                                    const isToday = dateString === today.toDateString();
                                    const hasTrip = tripDates.has(dateString);

                                    return (
                                        <div
                                            key={day}
                                            className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-all cursor-pointer relative ${isToday
                                                ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-bold shadow-md'
                                                : hasTrip
                                                    ? 'bg-gradient-to-r from-orange-400 to-coral-400 text-white font-semibold'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {day}
                                            {hasTrip && !isToday && (
                                                <span className="absolute bottom-0.5 w-1 h-1 bg-white rounded-full"></span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Legend */}
                            <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                                <div className="flex items-center space-x-2 text-xs">
                                    <div className="w-4 h-4 rounded bg-gradient-to-r from-emerald-400 to-teal-400"></div>
                                    <span className="text-gray-600">Today</span>
                                </div>
                                <div className="flex items-center space-x-2 text-xs">
                                    <div className="w-4 h-4 rounded bg-gradient-to-r from-orange-400 to-coral-400"></div>
                                    <span className="text-gray-600">Trip dates</span>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
