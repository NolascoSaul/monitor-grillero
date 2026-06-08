"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { IDEAL_RANGES } from "@/constants/ranges";

interface MetricCardProps {
  title: string;
  value: number;
  unit: string;
  type: "temperature" | "humidity";
  trend?: "up" | "down" | "stable";
  trendValue?: string;
}

export function MetricCard({
  title,
  value,
  unit,
  type,
  trend,
  trendValue,
}: MetricCardProps) {
  const range =
    type === "temperature" ? IDEAL_RANGES.temperature : IDEAL_RANGES.humidity;
  const isInRange = value >= range.min && value <= range.max;
  const isNearRange = value >= range.min - 3 && value <= range.max + 3;

  const getStatusColor = () => {
    if (isInRange) return "text-success";
    if (isNearRange) return "text-warning";
    return "text-destructive";
  };

  const getBgColor = () => {
    if (isInRange) return "bg-success/10";
    if (isNearRange) return "bg-warning/10";
    return "bg-destructive/10";
  };

  const Icon = type === "temperature" ? Thermometer : Droplets;
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : null;

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-md overflow-hidden",
        getBgColor(),
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-3 sm:px-6">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate pr-2">
          {title}
        </CardTitle>
        <div className={cn("p-1.5 sm:p-2 rounded-full shrink-0", getBgColor())}>
          <Icon className={cn("h-4 w-4 sm:h-5 sm:w-5", getStatusColor())} />
        </div>
      </CardHeader>
      <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
        <div className="flex items-baseline gap-0.5 sm:gap-1">
          <span
            className={cn("text-2xl sm:text-4xl font-bold", getStatusColor())}
          >
            {value}
          </span>
          <span className="text-base sm:text-xl text-muted-foreground">
            {unit}
          </span>
        </div>
        <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Ideal: {range.min}-{range.max}
            {range.unit}
          </p>
          {TrendIcon && trendValue && (
            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-muted-foreground">
              <TrendIcon className="h-3 w-3" />
              <span>{trendValue}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
