import type { HabitatReading } from "@/types/habitat";
export type FirebaseReading = {
    temperature: number;
    humidity: number;
    timestamp: number;
};

export type ReadingState = {
    readings: HabitatReading[];
    isLoading: boolean;
    error: Error | null;
}