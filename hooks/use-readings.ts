import { useEffect, useState } from "react";
import type { HabitatReading } from "@/types/habitat";
import type { ReadingState } from "@/types/firebase";
import { subscribeReadings } from "@/services/firebase-service";

export function useRealtimeReadings(): ReadingState {
    const [readings, setReadings] = useState<HabitatReading[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const unsubscribe = subscribeReadings(
            (data) => {
                setReadings(data);
                setIsLoading(false);
                setError(null);
            },
            (err) => {
                setError(err);
                setIsLoading(false);
            }
        );
        return () => unsubscribe();
    }, []);


    return { readings, isLoading, error };
}