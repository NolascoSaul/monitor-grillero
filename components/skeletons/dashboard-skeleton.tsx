import { MetricCardSkeleton } from "./metric-card-skeleton";
import { StatusCardSkeleton } from "./status-card-skeleton";
import { InfoCardSkeleton } from "./info-card-skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <StatusCardSkeleton />
      <div className="grid grid-cols-2 gap-3">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>

      <InfoCardSkeleton />
    </div>
  );
}
