"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MetricCard } from "@/components/metric-card";
import { StatusCard } from "@/components/status-card";
import {
  currentReadings,
  getHabitatStatus,
  historicalData,
} from "@/lib/mock-data";

export function DashboardScreen() {
  const status = getHabitatStatus(
    currentReadings.temperature,
    currentReadings.humidity,
  );

  // Calculate trends from historical data
  const recentData = historicalData.today.slice(-6);
  const previousTemp =
    recentData[0]?.temperature ?? currentReadings.temperature;
  const previousHumidity = recentData[0]?.humidity ?? currentReadings.humidity;

  const tempTrend =
    currentReadings.temperature > previousTemp
      ? "up"
      : currentReadings.temperature < previousTemp
        ? "down"
        : "stable";
  const humidityTrend =
    currentReadings.humidity > previousHumidity
      ? "up"
      : currentReadings.humidity < previousHumidity
        ? "down"
        : "stable";

  const tempDiff = Math.abs(currentReadings.temperature - previousTemp).toFixed(
    1,
  );
  const humidityDiff = Math.abs(currentReadings.humidity - previousHumidity);

  return (
    <div className="space-y-4">
      {/* Status Card */}
      <StatusCard status={status} />

      {/* Metric Cards */}
      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          title="Temperatura"
          value={currentReadings.temperature}
          unit="°C"
          type="temperature"
          trend={tempTrend}
          trendValue={`${tempDiff}°C`}
        />
        <MetricCard
          title="Humedad"
          value={currentReadings.humidity}
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
