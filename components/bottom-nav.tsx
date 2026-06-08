"use client";

import { Home, BarChart2, Bell, Fan } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "dashboard" | "history" | "fan" | "alerts";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  alertCount?: number;
}

const navItems = [
  { id: "dashboard" as Tab, label: "Inicio", icon: Home },
  { id: "history" as Tab, label: "Historial", icon: BarChart2 },
  { id: "fan" as Tab, label: "Ventilación", icon: Fan },
  { id: "alerts" as Tab, label: "Alertas", icon: Bell },
];

export function BottomNav({
  activeTab,
  onTabChange,
  alertCount = 0,
}: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const showBadge = item.id === "alerts" && alertCount > 0;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex flex-col items-center gap-1 px-6 py-2 rounded-lg transition-colors relative",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                <div className="relative">
                  <Icon className="h-5 w-5" />
                  {showBadge && (
                    <span className="absolute -top-1.5 -right-1.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                      {alertCount > 9 ? "9+" : alertCount}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      {/* Safe area padding for mobile devices */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
