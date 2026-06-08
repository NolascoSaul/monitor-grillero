import type { HabitatReading } from "@/types/habitat";
export type FirebaseReading = {
    temperatura: number;
    humedad: number;
    timestamp: number;
};

export type ReadingState = {
    readings: HabitatReading[];
    isLoading: boolean;
    error: Error | null;
}