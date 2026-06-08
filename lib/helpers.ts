import type { HabitatStatus } from "@/types/habitat";
import { IDEAL_RANGES } from "@/constants/ranges";

// Helper function to determine habitat status
export function getHabitatStatus(
  temperature: number,
  humidity: number
): HabitatStatus {
  const tempInRange =
    temperature >= IDEAL_RANGES.temperature.min &&
    temperature <= IDEAL_RANGES.temperature.max;
  const humidityInRange =
    humidity >= IDEAL_RANGES.humidity.min &&
    humidity <= IDEAL_RANGES.humidity.max;

  if (tempInRange && humidityInRange) return "optimal";

  const tempNearRange =
    temperature >= IDEAL_RANGES.temperature.min - 3 &&
    temperature <= IDEAL_RANGES.temperature.max + 3;
  const humidityNearRange =
    humidity >= IDEAL_RANGES.humidity.min - 10 &&
    humidity <= IDEAL_RANGES.humidity.max + 10;

  if (tempNearRange && humidityNearRange) return "caution";

  return "alert";
}

// Format relative time for alerts
export function formatTimeAgo(hoursAgo: number): string {
  if (hoursAgo === 0) return "Ahora mismo";
  if (hoursAgo < 1) return `Hace ${Math.round(hoursAgo * 60)} minutos`;
  if (hoursAgo < 24) return `Hace ${hoursAgo} horas`;
  const days = Math.floor(hoursAgo / 24);
  return `Hace ${days} dias`;
}
