"use client";

import { AlertCard } from "@/components/alert-card";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, CheckCircle2, X, Save, RotateCcw } from "lucide-react";
import { IDEAL_RANGES } from "@/lib/mock-data";
import type { Alert } from "@/lib/mock-data";

interface AlertsScreenProps {
  alerts: Alert[];
  onDismissAlert: (alertId: string) => void;
}

export function AlertsScreen({ alerts, onDismissAlert }: AlertsScreenProps) {
  const warningAlerts = alerts.filter(
    (a) => a.type === "warning" || a.type === "danger",
  );
  const infoAlerts = alerts.filter((a) => a.type === "info");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Centro de Alertas
        </h2>
        <p className="text-sm text-muted-foreground">
          Monitorea las alertas y notificaciones del hábitat
        </p>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-warning/10 border-warning/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-warning" />
              <span className="text-2xl font-bold text-warning">
                {warningAlerts.length}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Alertas activas
            </p>
          </CardContent>
        </Card>
        <Card className="bg-success/10 border-success/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="text-2xl font-bold text-success">
                {infoAlerts.length}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Notificaciones</p>
          </CardContent>
        </Card>
      </div>

      {/* Warning Alerts */}
      {warningAlerts.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">
            Alertas Importantes
          </h3>
          {warningAlerts.map((alert) => (
            <div key={alert.id} className="relative group">
              <AlertCard alert={alert} />
              <button
                type="button"
                onClick={() => onDismissAlert(alert.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-muted opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                aria-label="Descartar alerta"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Info Alerts */}
      {infoAlerts.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-foreground">
            Notificaciones
          </h3>
          {infoAlerts.map((alert) => (
            <div key={alert.id} className="relative group">
              <AlertCard alert={alert} />
              <button
                type="button"
                onClick={() => onDismissAlert(alert.id)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-muted opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                aria-label="Descartar notificacion"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {alerts.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle2 className="h-10 w-10 text-success mx-auto mb-2" />
            <p className="text-sm font-medium text-foreground">
              No hay alertas pendientes
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Todas las alertas han sido revisadas
            </p>
          </CardContent>
        </Card>
      )}

      {/* Ideal Ranges Info */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-sm text-foreground mb-3">
            Rangos de alerta
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Temperatura</span>
              <span className="text-sm font-medium">
                {IDEAL_RANGES.temperature.min}-{IDEAL_RANGES.temperature.max}
                {IDEAL_RANGES.temperature.unit}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Humedad</span>
              <span className="text-sm font-medium">
                {IDEAL_RANGES.humidity.min}-{IDEAL_RANGES.humidity.max}
                {IDEAL_RANGES.humidity.unit}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
