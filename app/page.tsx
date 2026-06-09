"use client";

import { useState, useMemo, useCallback } from "react";
import { AppHeader } from "@/components/common/app-header";
import { BottomNav } from "@/components/common/bottom-nav";
import { DashboardScreen } from "@/screens/dashboard-screen";
import { HistoryScreen } from "@/screens/history-screen";
import { AlertsScreen } from "@/screens/alerts-screen";
import { FanScreen } from "@/screens/fan-screen";
import { useAlerts } from "@/hooks/use-alerts";

type Tab = "dashboard" | "history" | "fan" | "alerts";

export default function HabitatMonitor() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);
  const { alerts } = useAlerts();

  const visibleAlerts = useMemo(
    () => alerts.filter((a) => !dismissedIds.includes(a.id)),
    [alerts, dismissedIds],
  );

  const alertCount = visibleAlerts.filter(
    (a) => a.type === "warning" || a.type === "danger",
  ).length;

  const handleDismiss = useCallback((id: string) => {
    setDismissedIds((prev) => [...prev, id]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="max-w-md mx-auto px-4 py-4 pb-24">
        {activeTab === "dashboard" && <DashboardScreen />}
        {activeTab === "history" && <HistoryScreen />}
        {activeTab === "fan" && <FanScreen />}
        {activeTab === "alerts" && (
          <AlertsScreen alerts={visibleAlerts} onDismiss={handleDismiss} />
        )}
      </main>

      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        alertCount={alertCount}
      />
    </div>
  );
}
