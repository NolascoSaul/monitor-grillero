// Simulated data for cricket habitat monitoring

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

// Ideal ranges for crickets
export const IDEAL_RANGES = {
  temperature: { min: 24, max: 30, unit: "°C" },
  humidity: { min: 50, max: 70, unit: "%" },
};

// Current readings (simulated)
export const currentReadings = {
  temperature: 27.5,
  humidity: 62,
};

// Seeded random number generator for consistent data
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate historical data for the past 24 hours
function generateHourlyData(hours: number): HabitatReading[] {
  const data: HabitatReading[] = [];
  // Use a fixed base time (midnight today) for consistent data
  const baseTime = new Date();
  baseTime.setHours(0, 0, 0, 0);

  for (let i = 0; i <= hours; i++) {
    const timestamp = new Date(baseTime.getTime() + i * 60 * 60 * 1000);
    const baseTemp = 27;
    const baseHumidity = 60;
    const tempVariation = Math.sin(i / 4) * 2 + (seededRandom(i * 100) - 0.5) * 1;
    const humidityVariation = Math.cos(i / 6) * 5 + (seededRandom(i * 200) - 0.5) * 3;

    data.push({
      timestamp,
      temperature: Math.round((baseTemp + tempVariation) * 10) / 10,
      humidity: Math.round(baseHumidity + humidityVariation),
    });
  }

  return data;
}

// Generate weekly data (daily averages)
function generateDailyData(days: number): HabitatReading[] {
  const data: HabitatReading[] = [];
  const baseTime = new Date();
  baseTime.setHours(12, 0, 0, 0);

  for (let i = days; i >= 0; i--) {
    const timestamp = new Date(baseTime.getTime() - i * 24 * 60 * 60 * 1000);
    const baseTemp = 26.5;
    const baseHumidity = 58;
    const tempVariation = Math.sin(i / 2) * 1.5 + (seededRandom(i * 300) - 0.5) * 0.5;
    const humidityVariation = Math.cos(i / 3) * 4 + (seededRandom(i * 400) - 0.5) * 2;

    data.push({
      timestamp,
      temperature: Math.round((baseTemp + tempVariation) * 10) / 10,
      humidity: Math.round(baseHumidity + humidityVariation),
    });
  }

  return data;
}

// Generate monthly data
function generateMonthlyData(): HabitatReading[] {
  const data: HabitatReading[] = [];
  const baseTime = new Date();
  baseTime.setHours(12, 0, 0, 0);

  for (let i = 30; i >= 0; i--) {
    const timestamp = new Date(baseTime.getTime() - i * 24 * 60 * 60 * 1000);
    const baseTemp = 27;
    const baseHumidity = 60;
    const tempVariation = Math.sin(i / 5) * 2 + (seededRandom(i * 500) - 0.5) * 0.8;
    const humidityVariation = Math.cos(i / 4) * 6 + (seededRandom(i * 600) - 0.5) * 3;

    data.push({
      timestamp,
      temperature: Math.round((baseTemp + tempVariation) * 10) / 10,
      humidity: Math.round(baseHumidity + humidityVariation),
    });
  }

  return data;
}

export const historicalData = {
  today: generateHourlyData(24),
  week: generateDailyData(7),
  month: generateMonthlyData(),
};

// Sample alerts with relative time (hoursAgo) to avoid hydration issues
export const alerts: Alert[] = [
  {
    id: "1",
    type: "info",
    title: "Estado del habitat",
    message: "La temperatura y humedad estan en rango optimo",
    hoursAgo: 0,
    metric: "general",
  },
  {
    id: "2",
    type: "warning",
    title: "Humedad baja detectada",
    message: "La humedad bajo del nivel recomendado hace 2 horas",
    hoursAgo: 2,
    metric: "humidity",
  },
  {
    id: "3",
    type: "danger",
    title: "Alerta de temperatura",
    message: "La temperatura supero los 31 grados ayer a las 14:00",
    hoursAgo: 20,
    metric: "temperature",
  },
  {
    id: "4",
    type: "info",
    title: "Sistema estable",
    message: "No se han detectado anomalias en las ultimas 24 horas",
    hoursAgo: 24,
    metric: "general",
  },
];


export type HabitatStatus = "optimal" | "caution" | "alert";
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

// Get recent readings for display
export function getRecentReadings(): HabitatReading[] {
  return historicalData.today.slice(-6).reverse();
}

// Format relative time for alerts
export function formatTimeAgo(hoursAgo: number): string {
  if (hoursAgo === 0) return "Ahora mismo";
  if (hoursAgo < 1) return `Hace ${Math.round(hoursAgo * 60)} minutos`;
  if (hoursAgo < 24) return `Hace ${hoursAgo} horas`;
  const days = Math.floor(hoursAgo / 24);
  return `Hace ${days} dias`;
}
