import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';

const LandingPage: React.FC = () => {
    const { user, isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/90">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <svg className="w-8 h-8 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            <path d="M2 12h20" />
                        </svg>
                        <h1 className="text-2xl font-bold text-gray-900">GlobeTrotter</h1>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition">Features</a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 font-medium transition">How it works</a>
                        {isAuthenticated ? (
                            <>
                                <span className="text-gray-600 font-medium">Welcome, {user?.name}</span>
                                <Link
                                    to="/dashboard"
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all"
                                >
                                    Go to Dashboard
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-600 hover:text-gray-900 font-medium transition">
                                    Sign in
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all"
                                >
                                    Get started
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Professional Background */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50"
                    style={{
                        backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(254,243,199);stop-opacity:0.3" /><stop offset="50%" style="stop-color:rgb(253,230,138);stop-opacity:0.2" /><stop offset="100%" style="stop-color:rgb(252,211,77);stop-opacity:0.1" /></linearGradient></defs><rect width="1200" height="800" fill="url(%23grad1)"/><g opacity="0.1"><path d="M0 400 Q 300 350 600 400 T 1200 400" stroke="%23fb923c" stroke-width="2" fill="none"/><path d="M0 500 Q 300 450 600 500 T 1200 500" stroke="%23f97316" stroke-width="2" fill="none"/><circle cx="200" cy="200" r="3" fill="%23ea580c"/><circle cx="800" cy="150" r="3" fill="%23ea580c"/><circle cx="400" cy="600" r="3" fill="%23ea580c"/><circle cx="1000" cy="550" r="3" fill="%23ea580c"/></g></svg>')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>The smarter way to plan multi-city trips</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                            Plan your journey.
                            <br />
                            <span className="text-orange-600">Not your booking.</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Build detailed itineraries, track budgets, and visualize multi-city trips with confidence—before you commit to any booking.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/register"
                                className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl inline-flex items-center gap-2"
                            >
                                <span>Start planning free</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link
                                to="/login"
                                className="bg-white text-gray-700 px-10 py-4 rounded-lg text-lg font-semibold border-2 border-gray-300 hover:border-orange-600 transition-all hover:shadow-md"
                            >
                                Sign in
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div>
                                <div className="text-4xl font-bold text-gray-900">10K+</div>
                                <div className="text-sm text-gray-600 mt-1">Trips planned</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-gray-900">50+</div>
                                <div className="text-sm text-gray-600 mt-1">Countries</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-gray-900">4.9★</div>
                                <div className="text-sm text-gray-600 mt-1">User rating</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
                        <path fill="#ffffff" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                    </svg>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-white py-20" id="how-it-works">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-gray-900 mb-4">Three simple steps</h3>
                        <p className="text-xl text-gray-600">From inspiration to itinerary in minutes</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Step 1 */}
                        <div className="text-center group">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Choose destinations</h4>
                            <p className="text-gray-600 leading-relaxed">Create your trip and add cities in the order you'll visit them</p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center group">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Build your itinerary</h4>
                            <p className="text-gray-600 leading-relaxed">Schedule activities, attractions, and experiences with dates and times</p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center group">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Manage your budget</h4>
                            <p className="text-gray-600 leading-relaxed">Track expenses by category and see real-time budget breakdowns</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 py-20" id="features">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl font-bold text-gray-900 mb-4">Powerful planning tools</h3>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Everything you need to create the perfect multi-city itinerary
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all border border-gray-200">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Multi-City Planning</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Build detailed itineraries across multiple destinations with day-by-day activities and notes
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all border border-gray-200">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Budget Analytics</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Track expenses by category and location with real-time budget summaries and insights
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all border border-gray-200">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Timeline View</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Visualize your entire journey on an intuitive timeline with all activities organized by date
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all border border-gray-200">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Collaboration</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Share itineraries with travel companions through secure public links
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all border border-gray-200">
                            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Planning First</h3>
                            <p className="text-gray-600 leading-relaxed">
                                No booking pressure. No ads. Just pure planning to perfect your dream trip.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 hover:shadow-lg transition-all border border-gray-200">
                            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900">Responsive Design</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Plan on desktop, review on mobile. Your itinerary syncs across all devices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-coral-500 to-orange-500 py-20">
                <div className="container mx-auto px-6 text-center">
                    <h3 className="text-4xl font-bold text-white mb-6">Ready to plan your next adventure?</h3>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                        Join thousands of travelers who trust GlobeTrotter to plan their perfect trips.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 bg-white text-coral-500 px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all hover:scale-105"
                    >
                        <span>Get started free</span>
                        <span>→</span>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white border-t">
                <div className="container mx-auto px-6 py-12">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <svg className="w-6 h-6 text-coral-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                                <span className="font-bold text-gray-900">GlobeTrotter</span>
                            </div>
                            <p className="text-gray-600 text-sm">Plan better. Travel smarter.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-coral-500">Features</a></li>
                                <li><a href="#" className="hover:text-coral-500">How it works</a></li>
                                <li><a href="#" className="hover:text-coral-500">Pricing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-coral-500">About</a></li>
                                <li><a href="#" className="hover:text-coral-500">Blog</a></li>
                                <li><a href="#" className="hover:text-coral-500">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><a href="#" className="hover:text-coral-500">Privacy</a></li>
                                <li><a href="#" className="hover:text-coral-500">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t pt-8 text-center text-gray-600 text-sm">
                        <p>&copy; 2026 GlobeTrotter. Built for travelers who love to plan.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
