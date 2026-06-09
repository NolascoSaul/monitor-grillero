"use client";

import { ChartCard } from "@/components/chart-card";
import { RecentReadings } from "@/components/recent-readings";
import { ReadingState } from "@/types/firebase";
import { useReadings } from "@/providers/readings-provider";

export function HistoryScreen() {
  const { readings, isLoading, error }: ReadingState = useReadings();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const todayReadings = readings.slice(-24);
  const weekReadings = readings.slice(-7 * 24).filter((_, i) => i % 24 === 0);
  const monthReadings = readings.slice(-30 * 24).filter((_, i) => i % 24 === 0);

  const historicalData = {
    today: todayReadings,
    week: weekReadings,
    month: monthReadings,
  };

  const recentReadings = readings.slice(-6).reverse();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Historial de datos
        </h2>
        <p className="text-sm text-muted-foreground">
          Visualiza las tendencias de temperatura y humedad a lo largo del
          tiempo
        </p>
      </div>

      {/* Temperature Chart */}
      <ChartCard
        title="Temperatura"
        data={historicalData}
        dataKey="temperature"
        color="#2a9d4a"
        unit="°C"
      />

      {/* Humidity Chart */}
      <ChartCard
        title="Humedad"
        data={historicalData}
        dataKey="humidity"
        color="#d4a73a"
        unit="%"
      />

      {/* Recent Readings */}
      <RecentReadings readings={recentReadings} />
    </div>
  );
}
