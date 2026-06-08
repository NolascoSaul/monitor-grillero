"use client";

import { useState, useCallback } from "react";
import { AppHeader } from "@/components/common/app-header";
import { BottomNav } from "@/components/common/bottom-nav";
import { DashboardScreen } from "@/screens/dashboard-screen";
import { HistoryScreen } from "@/screens/history-screen";
import { AlertsScreen } from "@/screens/alerts-screen";
import { FanScreen } from "@/screens/fan-screen";
import { alerts as initialAlerts } from "@/lib/mock-data";
import type { Alert } from "@/types/habitat";

type Tab = "dashboard" | "history" | "fan" | "alerts";

export default function HabitatMonitor() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [visibleAlerts, setVisibleAlerts] = useState<Alert[]>(initialAlerts);

  const warningCount = visibleAlerts.filter(
    (a) => a.type === "warning" || a.type === "danger",
  ).length;

  const dismissAlert = useCallback((alertId: string) => {
    setVisibleAlerts((prev) => prev.filter((a) => a.id !== alertId));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="max-w-md mx-auto px-4 py-4 pb-24">
        {activeTab === "dashboard" && <DashboardScreen />}
        {activeTab === "history" && <HistoryScreen />}
        {activeTab === "fan" && <FanScreen />}
        {activeTab === "alerts" && (
          <AlertsScreen alerts={visibleAlerts} onDismissAlert={dismissAlert} />
        )}
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        alertCount={warningCount}
      />
    </div>
  );
}
