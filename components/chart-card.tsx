"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { HabitatReading } from "@/lib/mock-data";
import { IDEAL_RANGES } from "@/lib/mock-data";

interface ChartCardProps {
  title: string;
  data: {
    today: HabitatReading[];
    week: HabitatReading[];
    month: HabitatReading[];
  };
  dataKey: "temperature" | "humidity";
  color: string;
  unit: string;
}

type TimeRange = "today" | "week" | "month";

const timeRangeLabels: Record<TimeRange, string> = {
  today: "Hoy",
  week: "Semana",
  month: "Mes",
};

export function ChartCard({
  title,
  data,
  dataKey,
  color,
  unit,
}: ChartCardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("today");

  const chartData = data[timeRange].map((reading) => ({
    time:
      timeRange === "today"
        ? reading.timestamp.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : reading.timestamp.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
          }),
    value: reading[dataKey],
  }));

  const range =
    dataKey === "temperature"
      ? IDEAL_RANGES.temperature
      : IDEAL_RANGES.humidity;
  const minValue = Math.min(...chartData.map((d) => d.value)) - 5;
  const maxValue = Math.max(...chartData.map((d) => d.value)) + 5;

  // Sample data for mobile to avoid overcrowding
  const displayData =
    chartData.length > 8
      ? chartData.filter(
          (_, i) =>
            i % Math.ceil(chartData.length / 8) === 0 ||
            i === chartData.length - 1,
        )
      : chartData;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 sm:px-6">
        <CardTitle className="text-sm sm:text-base font-semibold">
          {title}
        </CardTitle>
        <div className="flex gap-0.5 sm:gap-1">
          {(["today", "week", "month"] as TimeRange[]).map((range) => (
            <Button
              key={range}
              variant={timeRange === range ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range)}
              className={cn(
                "h-6 sm:h-7 px-1.5 sm:px-2 text-[10px] sm:text-xs",
                timeRange === range && "bg-primary text-primary-foreground",
              )}
            >
              {timeRangeLabels[range]}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <div className="h-[180px] sm:h-[200px] w-full -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={displayData}
              margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 9 }}
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-35}
                textAnchor="end"
                height={45}
              />
              <YAxis
                domain={[minValue, maxValue]}
                tick={{ fontSize: 9 }}
                tickLine={false}
                axisLine={false}
                width={35}
                tickFormatter={(value) => `${value}${unit}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const value = payload[0].value as number;
                    const isInRange = value >= range.min && value <= range.max;
                    return (
                      <div className="bg-card border border-border rounded-lg shadow-lg p-2">
                        <p className="text-sm font-medium">
                          {value}
                          {unit}
                        </p>
                        <p
                          className={cn(
                            "text-xs",
                            isInRange ? "text-success" : "text-warning",
                          )}
                        >
                          {isInRange ? "En rango" : "Fuera de rango"}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: color }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-4 mt-2 text-xs text-muted-foreground">
          <span>
            Rango ideal: {range.min}-{range.max}
            {range.unit}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
