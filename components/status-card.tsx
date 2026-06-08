"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { HabitatStatus } from "@/types/habitat";

interface StatusCardProps {
  status: HabitatStatus;
}

const statusConfig = {
  optimal: {
    label: "Óptimo",
    description: "El hábitat esta en condiciones ideales",
    icon: CheckCircle2,
    bgColor: "bg-success/10",
    textColor: "text-success",
    borderColor: "border-success/30",
  },
  caution: {
    label: "Precaución",
    description: "Algunas condiciones están fuera del rango ideal",
    icon: AlertTriangle,
    bgColor: "bg-warning/10",
    textColor: "text-warning",
    borderColor: "border-warning/30",
  },
  alert: {
    label: "Alerta",
    description: "Las condiciones requieren atención inmediata",
    icon: AlertCircle,
    bgColor: "bg-destructive/10",
    textColor: "text-destructive",
    borderColor: "border-destructive/30",
  },
};

export function StatusCard({ status }: StatusCardProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    setCurrentTime(
      new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, []);

  return (
    <Card className={cn("border-2", config.borderColor, config.bgColor)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Estado del hábitat
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <div className={cn("p-3 rounded-full", config.bgColor)}>
            <Icon className={cn("h-8 w-8", config.textColor)} />
          </div>
          <div>
            <p className={cn("text-2xl font-bold", config.textColor)}>
              {config.label}
            </p>
            <p className="text-sm text-muted-foreground">
              {config.description}
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Ultima actualización: {currentTime ?? "--:--"}
        </p>
      </CardContent>
    </Card>
  );
}
