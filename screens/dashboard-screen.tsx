"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MetricCard } from "@/components/metric-card";
import { StatusCard } from "@/components/status-card";
import { useRealtimeReadings } from "@/hooks/use-readings";
import { getHabitatStatus } from "@/lib/helpers";
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton";

export function DashboardScreen() {
  const { readings, isLoading, error } = useRealtimeReadings();

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <div>Error: {error.message}</div>;

  const currentReading = readings[readings.length - 1] ?? {
    temperature: 0,
    humidity: 0,
    timestamp: new Date(),
  };

  const previousReading = readings[readings.length - 2] ?? currentReading;

  const status = getHabitatStatus(
    currentReading.temperature,
    currentReading.humidity,
  );

  const tempTrend =
    currentReading.temperature > previousReading.temperature
      ? "up"
      : currentReading.temperature < previousReading.temperature
        ? "down"
        : "stable";

  const humidityTrend =
    currentReading.humidity > previousReading.humidity
      ? "up"
      : currentReading.humidity < previousReading.humidity
        ? "down"
        : "stable";

  const tempDiff = Math.abs(
    currentReading.temperature - previousReading.temperature,
  ).toFixed(1);

  const humidityDiff = Math.abs(
    currentReading.humidity - previousReading.humidity,
  );

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <StatusCard status={status} />

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          title="Temperatura"
          value={currentReading.temperature}
          unit="°C"
          type="temperature"
          trend={tempTrend}
          trendValue={`${tempDiff}°C`}
        />
        <MetricCard
          title="Humedad"
          value={currentReading.humidity}
          unit="%"
          type="humidity"
          trend={humidityTrend}
          trendValue={`${humidityDiff}%`}
        />
      </div>

      {/* Quick Info */}
      <Card>
        <CardContent>
          <h3 className="font-medium text-sm text-foreground mb-2">
            Condiciones ideales para grillos
          </h3>
          <ul className="space-y-1 text-xs text-muted-foreground">
            <li>Temperatura: 24-30 grados Celsius</li>
            <li>Humedad: 50-70%</li>
            <li>Ventilación adecuada</li>
            <li>Ciclo de luz: 12-14 horas</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
