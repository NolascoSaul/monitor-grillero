import type { Alert, HabitatReading } from "@/types/habitat";
import { IDEAL_RANGES } from "@/constants/ranges";

/**
 * Genera alertas a partir de la última lectura.
 * - danger: ambas fuera de rango
 * - warning: una fuera de rango
 * - info: ambas dentro de rango
 */
export function generateAlerts(readings: HabitatReading[]): Alert[] {
    if (!readings.length) return [];

    const latest = readings[readings.length - 1];
    const alerts: Alert[] = [];
    const tsId = Math.floor(latest.timestamp.getTime() / (1000 * 60));

    // Verificar las conndiciones fuera de rango
    const tempOutOfRange =
        latest.temperature < IDEAL_RANGES.temperature.min ||
        latest.temperature > IDEAL_RANGES.temperature.max;

    const humidityOutOfRange =
        latest.humidity < IDEAL_RANGES.humidity.min ||
        latest.humidity > IDEAL_RANGES.humidity.max;

    // Determinar tipo de alerta según condiciones
    let alertType: "danger" | "warning" | "info";

    if (tempOutOfRange && humidityOutOfRange) {
        alertType = "danger";
    } else if (tempOutOfRange || humidityOutOfRange) {
        alertType = "warning";
    } else {
        alertType = "info";
    }

    // Agregar alertas según tipo
    if (alertType === "warning") {
        if (tempOutOfRange) {
            alerts.push({
                id: `temp-${tsId}`,
                type: "warning",
                title: "Alerta de temperatura",
                message: `La temperatura está fuera del rango ideal`,
                hoursAgo: 0,
                metric: "temperature",
            });
        }

        if (humidityOutOfRange) {
            alerts.push({
                id: `hum-${tsId}`,
                type: "warning",
                title: "Alerta de humedad",
                message: `La humedad está fuera del rango ideal`,
                hoursAgo: 0,
                metric: "humidity",
            });
        }
    }

    if (alertType === "danger") {
        alerts.push({
            id: `danger-${tsId}`,
            type: "danger",
            title: "Alerta urgente",
            message: "La temperatura y humedad están fuera del rango ideal",
            hoursAgo: 0,
            metric: "both",
        });
    }

    // Si ambas están dentro de rango, agregar info
    if (alertType === "info") {
        alerts.push({
            id: `ok-${tsId}`,
            type: "info",
            title: "Estado del hábitat",
            message: "Temperatura y humedad en rango óptimo",
            hoursAgo: 0,
            metric: "general",
        });
    }

    return alerts;
}