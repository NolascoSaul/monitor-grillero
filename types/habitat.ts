export interface HabitatReading {
    timestamp: Date;
    temperature: number;
    humidity: number;
}

export interface Alert {
    id: string;
    type: "warning" | "danger" | "info";
    title: string;
    message: string;
    hoursAgo: number;
    metric: "temperature" | "humidity" | "general";
}

export type HabitatStatus = "optimal" | "caution" | "alert";