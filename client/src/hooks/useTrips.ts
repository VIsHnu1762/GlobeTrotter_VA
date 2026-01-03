import { useState, useEffect } from 'react';
import { Trip } from '@types/index';
import { tripService } from '@services/tripService';
import { getErrorMessage } from '@utils/errorUtils';

export const useTrips = () => {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTrips = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await tripService.getMyTrips();
            setTrips(data);
        } catch (err) {
            setError(getErrorMessage(err));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    const createTrip = async (tripData: any) => {
        const newTrip = await tripService.createTrip(tripData);
        setTrips((prev) => [newTrip, ...prev]);
        return newTrip;
    };

    const updateTrip = async (id: string, tripData: any) => {
        const updatedTrip = await tripService.updateTrip(id, tripData);
        setTrips((prev) => prev.map((t) => (t.id === id ? updatedTrip : t)));
        return updatedTrip;
    };

    const deleteTrip = async (id: string) => {
        await tripService.deleteTrip(id);
        setTrips((prev) => prev.filter((t) => t.id !== id));
    };

    return {
        trips,
        loading,
        error,
        fetchTrips,
        createTrip,
        updateTrip,
        deleteTrip,
    };
};
