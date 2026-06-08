import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function SkeletonProvider({ children }: { children: React.ReactNode }) {
  return <SkeletonTheme>{children}</SkeletonTheme>;
}
