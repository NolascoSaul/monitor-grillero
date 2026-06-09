"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Alert } from "@/types/habitat";
import { formatTimeAgo } from "@/mocks/readings";

interface AlertCardProps {
  alert: Alert;
  compact?: boolean;
}

const alertConfig = {
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-warning/10",
    textColor: "text-warning",
    borderColor: "border-warning/30",
  },
  danger: {
    icon: AlertCircle,
    bgColor: "bg-destructive/10",
    textColor: "text-destructive",
    borderColor: "border-destructive/30",
  },
  info: {
    icon: Info,
    bgColor: "bg-primary/10",
    textColor: "text-primary",
    borderColor: "border-primary/30",
  },
};

export function AlertCard({ alert, compact = false }: AlertCardProps) {
  const config = alertConfig[alert.type];
  const Icon = config.icon;

  const timeAgo = formatTimeAgo(alert.hoursAgo);

  if (compact) {
    return (
      <div
        className={cn(
          "flex items-start gap-3 p-3 rounded-lg border",
          config.bgColor,
          config.borderColor,
        )}
      >
        <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", config.textColor)} />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm text-foreground">{alert.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {alert.message}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{timeAgo}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className={cn("border-l-4", config.borderColor)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("p-2 rounded-full shrink-0", config.bgColor)}>
            <Icon className={cn("h-5 w-5", config.textColor)} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground">{alert.title}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {alert.message}
            </p>
            <p className="text-xs text-muted-foreground mt-2">{timeAgo}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
