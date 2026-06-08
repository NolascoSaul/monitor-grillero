"use client";

import React, { useState } from "react";
import { sendFanCommand } from "@/services/mqtt-service";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Power, Fan, Info } from "lucide-react";

export function FanScreen() {
  const [fanOn, setFanOn] = useState(false);

  const toggleFan = async () => {
    const newFanState = !fanOn;
    setFanOn(newFanState);
    sendFanCommand(newFanState);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Control de ventilación
        </h2>
        <p className="text-sm text-muted-foreground">
          Gestiona los ventiladores del hábitat para mantener condiciones
          óptimas para tus grillos
        </p>
      </div>

      {/* Fan Control Card */}
      <Card>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center gap-3">
            {/* Fan Icon */}
            <div
              className={`p-4 rounded-full ${
                fanOn ? "bg-success/20" : "bg-destructive/20"
              }`}
            >
              <Fan
                className={`h-10 w-10 ${fanOn ? "text-success" : "text-destructive"}`}
              />
            </div>

            {/* Toggle Button */}
            <Button
              className=" flex items-center justify-center gap-2"
              variant={fanOn ? "default" : "destructive"}
              onClick={toggleFan}
              size="lg"
            >
              <Power className="h-4 w-4" />
              {fanOn ? "Apagar" : "Encender"}
            </Button>

            {/* Description */}
            <p className="text-xs text-muted-foreground text-center">
              Al activar el ventilador, se enviará la señal al sistema para
              encender la ventilación.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Advice */}
      <Card className="border border-primary/10 bg-primary/10">
        <CardContent className="flex items-center gap-4">
          <span>
            <Info className="text-primary h-8 w-8" />
          </span>

          <div>
            <h3 className="font-semibold text-sm text-primary mb-2">Consejo</h3>
            <p className="text-xs text-muted-foreground space-y-1">
              Usa la ventilación cuando la temperatura supere los 28°C o la
              humedad sea muy alta.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
