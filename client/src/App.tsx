import { useState, useEffect } from 'react'
import apiClient from './services/api'
import './index.css'

interface Trip {
    id: number
    title: string
    destination: string
    start_date: string
    end_date: string
    description?: string
}

function App() {
    const [trips, setTrips] = useState<Trip[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchTrips()
    }, [])

    const fetchTrips = async () => {
        try {
            setLoading(true)
            const response = await apiClient.get('/trips/')
            setTrips(response.data)
            setError(null)
        } catch (err: any) {
            console.error('Error fetching trips:', err)
            setError(err.response?.data?.message || 'Failed to load trips')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-4xl">🌍</span>
                            <h1 className="text-3xl font-bold text-gray-900">
                                GlobeTrotter
                            </h1>
                        </div>
                        <nav className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                Home
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                My Trips
                            </a>
                            <a href="#" className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                                Create Trip
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
                        Plan Your Next Adventure
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        A planner-first multi-city travel planning system that helps you design,
                        visualize, and budget your trips before booking.
                    </p>
                </div>

                {/* Trips Section */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Trips</h3>

                    {loading ? (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                            <p className="mt-4 text-gray-600">Loading trips...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                            <p className="text-yellow-800 mb-2">⚠️ {error}</p>
                            <p className="text-sm text-yellow-600">Make sure the backend is running at http://localhost:8000</p>
                            <button
                                onClick={fetchTrips}
                                className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
                            >
                                Retry
                            </button>
                        </div>
                    ) : trips.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <span className="text-6xl mb-4 block">✈️</span>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips yet</h3>
                            <p className="text-gray-600 mb-6">Start planning your first adventure!</p>
                            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 font-medium">
                                Create Your First Trip
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trips.map((trip) => (
                                <div key={trip.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                    <div className="p-6">
                                        <h4 className="text-xl font-bold text-gray-900 mb-2">{trip.title}</h4>
                                        <p className="text-gray-600 mb-4">📍 {trip.destination}</p>
                                        <div className="flex items-center text-sm text-gray-500 mb-4">
                                            <span>📅 {new Date(trip.start_date).toLocaleDateString()}</span>
                                            <span className="mx-2">→</span>
                                            <span>{new Date(trip.end_date).toLocaleDateString()}</span>
                                        </div>
                                        {trip.description && (
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{trip.description}</p>
                                        )}
                                        <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 font-medium">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <span className="text-4xl mb-4 block">✈️</span>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-City Itineraries</h3>
                        <p className="text-gray-600">Design complex trips with multiple destinations and activities</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <span className="text-4xl mb-4 block">💰</span>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Budget Tracking</h3>
                        <p className="text-gray-600">Track and manage expenses by category for each trip</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 text-center">
                        <span className="text-4xl mb-4 block">📅</span>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Timeline Visualization</h3>
                        <p className="text-gray-600">Visualize your trips on calendars and timelines</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <p className="text-center text-gray-600">
                        © 2026 GlobeTrotter. A planner-first travel planning application.
                    </p>
                </div>
            </footer>
        </div>
    )
}

export default App
