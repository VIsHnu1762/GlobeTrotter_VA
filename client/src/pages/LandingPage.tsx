import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-3xl">🌍</span>
                        <h1 className="text-2xl font-bold text-primary-600">GlobeTrotter</h1>
                    </div>
                    <div className="space-x-4">
                        <Link to="/login" className="text-gray-600 hover:text-primary-600">
                            Login
                        </Link>
                        <Link to="/register" className="btn-primary">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-5xl font-bold text-gray-900 mb-6">
                    Plan Your Perfect Multi-City Adventure
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Design detailed itineraries, track your budget, and visualize your journey—all before booking anything.
                </p>
                <Link to="/register" className="btn-primary text-lg px-8 py-3">
                    Start Planning Free
                </Link>
            </section>

            {/* Features */}
            <section className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="card text-center">
                        <div className="text-4xl mb-4">✈️</div>
                        <h3 className="text-xl font-semibold mb-2">Multi-City Itineraries</h3>
                        <p className="text-gray-600">
                            Build detailed day-by-day plans across multiple destinations with activities and notes.
                        </p>
                    </div>
                    <div className="card text-center">
                        <div className="text-4xl mb-4">💰</div>
                        <h3 className="text-xl font-semibold mb-2">Budget Tracking</h3>
                        <p className="text-gray-600">
                            Track expenses by category and location. Know your costs before you commit.
                        </p>
                    </div>
                    <div className="card text-center">
                        <div className="text-4xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold mb-2">Visual Timeline</h3>
                        <p className="text-gray-600">
                            See your entire trip laid out on an intuitive timeline and calendar view.
                        </p>
                    </div>
                    <div className="card text-center">
                        <div className="text-4xl mb-4">🔗</div>
                        <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
                        <p className="text-gray-600">
                            Share your itinerary with travel companions via simple public links.
                        </p>
                    </div>
                    <div className="card text-center">
                        <div className="text-4xl mb-4">🎯</div>
                        <h3 className="text-xl font-semibold mb-2">Focus on Planning</h3>
                        <p className="text-gray-600">
                            No booking pressure. Just pure planning to perfect your trip.
                        </p>
                    </div>
                    <div className="card text-center">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                        <p className="text-gray-600">
                            Get insights into your travel patterns and spending habits.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t mt-20">
                <div className="container mx-auto px-4 py-8 text-center text-gray-600">
                    <p>&copy; 2026 GlobeTrotter. Built for travelers who love to plan.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
