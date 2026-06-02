"use client";

import { ChartCard } from "@/components/chart-card";
import { RecentReadings } from "@/components/recent-readings";
import { historicalData, getRecentReadings } from "@/lib/mock-data";

export function HistoryScreen() {
  const recentReadings = getRecentReadings();

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
