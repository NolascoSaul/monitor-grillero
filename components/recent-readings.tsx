"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Thermometer, Droplets } from "lucide-react";
import type { HabitatReading } from "@/lib/mock-data";

interface RecentReadingsProps {
  readings: HabitatReading[];
}

export function RecentReadings({ readings }: RecentReadingsProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Lecturas Recientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {readings.map((reading, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
            >
              <span className="text-xs text-muted-foreground">
                {reading.timestamp.toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Thermometer className="h-3.5 w-3.5 text-chart-1" />
                  <span className="text-sm font-medium">
                    {reading.temperature}C
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplets className="h-3.5 w-3.5 text-chart-2" />
                  <span className="text-sm font-medium">
                    {reading.humidity}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
