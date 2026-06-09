import { useMemo } from "react";
import { generateAlerts } from "@/services/alerts-service";
import { useReadings } from "@/providers/readings-provider";
import type { Alert } from "@/types/habitat";

export function useAlerts(): { alerts: Alert[]; isLoading: boolean } {
    const { readings, isLoading } = useReadings();

    const alerts = useMemo(
        () => generateAlerts(readings),
        [readings]
    );

    return { alerts, isLoading };
}