import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import { useTrips } from '@hooks/useTrips';
import { formatDate } from '@utils/dateUtils';
import toast from 'react-hot-toast';

const DashboardPage: React.FC = () => {
    const { user, logout } = useAuth();
    const { trips, loading, deleteTrip } = useTrips();
    const navigate = useNavigate();

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
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/dashboard" className="flex items-center space-x-2">
                        <span className="text-3xl">🌍</span>
                        <h1 className="text-2xl font-bold text-primary-600">GlobeTrotter</h1>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">Welcome, {user?.name}</span>
                        <Link to="/profile" className="text-gray-600 hover:text-primary-600">
                            Profile
                        </Link>
                        <button onClick={handleLogout} className="btn-secondary">
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">My Trips</h2>
                    <Link to="/trips/new" className="btn-primary">
                        + Create New Trip
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600">Loading your trips...</p>
                    </div>
                ) : trips.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">✈️</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No trips yet</h3>
                        <p className="text-gray-600 mb-6">Start planning your first adventure!</p>
                        <Link to="/trips/new" className="btn-primary">
                            Create Your First Trip
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trips.map((trip) => (
                            <div key={trip.id} className="card-hover">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900">{trip.title}</h3>
                                    {trip.isPublic && (
                                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                            Public
                                        </span>
                                    )}
                                </div>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {trip.description || 'No description'}
                                </p>
                                <div className="text-sm text-gray-500 mb-4">
                                    <p>📅 {formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link to={`/trips/${trip.id}`} className="btn-primary text-sm flex-1">
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(trip.id, trip.title)}
                                        className="btn-danger text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default DashboardPage;
