import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { destinationService, Destination } from '@services/destinationService';
import toast from 'react-hot-toast';

interface Stop {
    city: string;
    country: string;
    startDate: string;
    endDate: string;
}

const CreateTripPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    // Trip basic info
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Destination search
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Destination[]>([]);
    const [popularDestinations, setPopularDestinations] = useState<Destination[]>([]);
    const [stops, setStops] = useState<Stop[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [loading, setLoading] = useState(false);

    // Load popular destinations on mount
    useEffect(() => {
        destinationService.getPopularDestinations(12)
            .then(setPopularDestinations)
            .catch(err => console.error('Failed to load popular destinations:', err));
    }, []);

    // Search destinations as user types
    useEffect(() => {
        if (searchQuery.length > 2) {
            const timer = setTimeout(() => {
                destinationService.searchDestinations(searchQuery, 8)
                    .then(results => {
                        setSearchResults(results);
                        setShowSuggestions(true);
                    })
                    .catch(err => console.error('Search failed:', err));
            }, 300);
            return () => clearTimeout(timer);
        } else {
            setSearchResults([]);
            setShowSuggestions(false);
        }
    }, [searchQuery]);

    const addStop = (destination: Destination) => {
        const newStop: Stop = {
            city: destination.city,
            country: destination.country,
            startDate: '',
            endDate: ''
        };
        setStops([...stops, newStop]);
        setSearchQuery('');
        setShowSuggestions(false);
        toast.success(`Added ${destination.city} to your trip!`);
    };

    const removeStop = (index: number) => {
        setStops(stops.filter((_, i) => i !== index));
    };

    const updateStop = (index: number, field: keyof Stop, value: string) => {
        const updatedStops = [...stops];
        updatedStops[index][field] = value;
        setStops(updatedStops);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !startDate || !endDate) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (stops.length === 0) {
            toast.error('Please add at least one destination');
            return;
        }

        setLoading(true);
        try {
            // TODO: Implement actual trip creation API call
            toast.success('Trip created successfully!');
            navigate('/dashboard');
        } catch (error) {
            toast.error('Failed to create trip');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Trip</h1>
                        <p className="text-gray-600">Plan your perfect multi-city adventure</p>
                    </div>
                    <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                        ← Back to Dashboard
                    </Link>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        <div className={`flex items-center ${step >= 1 ? 'text-emerald-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 1 ? 'bg-emerald-500 text-white' : 'bg-gray-200'}`}>
                                1
                            </div>
                            <span className="ml-2 font-medium">Trip Details</span>
                        </div>
                        <div className="w-16 h-1 bg-gray-300"></div>
                        <div className={`flex items-center ${step >= 2 ? 'text-emerald-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 2 ? 'bg-emerald-500 text-white' : 'bg-gray-200'}`}>
                                2
                            </div>
                            <span className="ml-2 font-medium">Add Destinations</span>
                        </div>
                        <div className="w-16 h-1 bg-gray-300"></div>
                        <div className={`flex items-center ${step >= 3 ? 'text-emerald-600' : 'text-gray-400'}`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= 3 ? 'bg-emerald-500 text-white' : 'bg-gray-200'}`}>
                                3
                            </div>
                            <span className="ml-2 font-medium">Review</span>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-white rounded-3xl shadow-lg p-8">
                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Trip Details */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Trip Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="e.g., European Summer Adventure"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="What makes this trip special?"
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Start Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            End Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            min={startDate}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="w-full py-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                >
                                    Next: Add Destinations →
                                </button>
                            </div>
                        )}

                        {/* Step 2: Add Destinations */}
                        {step === 2 && (
                            <div className="space-y-6">
                                {/* Search Bar */}
                                <div className="relative">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Search Destinations
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onFocus={() => searchQuery.length > 2 && setShowSuggestions(true)}
                                            placeholder="Type a city name... (e.g., Paris, Tokyo, New York)"
                                            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        />
                                        <svg className="w-6 h-6 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>

                                    {/* Search Results Dropdown */}
                                    {showSuggestions && searchResults.length > 0 && (
                                        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-96 overflow-y-auto">
                                            {searchResults.map((dest) => (
                                                <button
                                                    key={dest.id}
                                                    type="button"
                                                    onClick={() => addStop(dest)}
                                                    className="w-full px-4 py-3 text-left hover:bg-emerald-50 transition-colors border-b last:border-b-0"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="font-semibold text-gray-900">{dest.city}</div>
                                                            <div className="text-sm text-gray-600">{dest.country} • {dest.continent}</div>
                                                            <div className="text-xs text-gray-500 mt-1">{dest.description.substring(0, 80)}...</div>
                                                        </div>
                                                        <div className="ml-4 text-right">
                                                            <div className="text-sm font-semibold text-emerald-600">${dest.avgBudgetPerDay}/day</div>
                                                            <div className="text-xs text-gray-500">{dest.popularAttractions.length} attractions</div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Added Stops */}
                                {stops.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Itinerary ({stops.length} stops)</h3>
                                        <div className="space-y-4">
                                            {stops.map((stop, index) => (
                                                <div key={index} className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-4 border border-gray-200">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                                                                {index + 1}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-gray-900">{stop.city}</h4>
                                                                <p className="text-sm text-gray-600">{stop.country}</p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeStop(index)}
                                                            className="text-red-600 hover:text-red-800 p-2"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="grid md:grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-700 mb-1">Arrival Date</label>
                                                            <input
                                                                type="date"
                                                                value={stop.startDate}
                                                                onChange={(e) => updateStop(index, 'startDate', e.target.value)}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-700 mb-1">Departure Date</label>
                                                            <input
                                                                type="date"
                                                                value={stop.endDate}
                                                                onChange={(e) => updateStop(index, 'endDate', e.target.value)}
                                                                min={stop.startDate}
                                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Popular Destinations */}
                                {stops.length === 0 && popularDestinations.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Destinations</h3>
                                        <div className="grid md:grid-cols-3 gap-4">
                                            {popularDestinations.map((dest) => (
                                                <button
                                                    key={dest.id}
                                                    type="button"
                                                    onClick={() => addStop(dest)}
                                                    className="bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-emerald-500 hover:shadow-lg transition-all text-left"
                                                >
                                                    <div className="font-bold text-gray-900">{dest.city}</div>
                                                    <div className="text-sm text-gray-600 mb-2">{dest.country}</div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-semibold text-emerald-600">${dest.avgBudgetPerDay}/day</span>
                                                        <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                                    >
                                        ← Back
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => stops.length > 0 ? setStep(3) : toast.error('Add at least one destination')}
                                        className="flex-1 py-3 bg-gradient-to-r from-emerald-400 to-teal-400 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                    >
                                        Review Trip →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Review */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                                    <p className="text-gray-600 mb-4">{description}</p>
                                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span>{startDate} to {endDate}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span>{stops.length} destinations</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Itinerary</h4>
                                    <div className="space-y-3">
                                        {stops.map((stop, index) => (
                                            <div key={index} className="flex items-center space-x-4 bg-white border border-gray-200 rounded-xl p-4">
                                                <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-gray-900">{stop.city}, {stop.country}</div>
                                                    {stop.startDate && stop.endDate && (
                                                        <div className="text-sm text-gray-600">{stop.startDate} → {stop.endDate}</div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                                    >
                                        ← Edit
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-coral-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
                                    >
                                        {loading ? 'Creating...' : 'Create Trip ✨'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTripPage;
