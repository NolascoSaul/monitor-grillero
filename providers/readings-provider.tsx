"use client";

import { createContext, useContext } from "react";
import { useReadingSubscription } from "@/hooks/use-readings";
import type { ReadingState } from "@/types/firebase";

const ReadingsContext = createContext<ReadingState | null>(null);

export function ReadingsProvider({ children }: { children: React.ReactNode }) {
  const state = useReadingSubscription();

  return (
    <ReadingsContext.Provider value={state}>
      {children}
    </ReadingsContext.Provider>
  );
}

export function useReadings(): ReadingState {
  const ctx = useContext(ReadingsContext);
  if (!ctx)
    throw new Error("useReadings debe usarse dentro de ReadingsProvider");
  return ctx;
}
