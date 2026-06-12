"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/chart-card";
import { RecentReadings } from "@/components/recent-readings";
import { ReadingState } from "@/types/firebase";
import { useReadings } from "@/providers/readings-provider";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

export function HistoryScreen() {
  const { readings, isLoading, error }: ReadingState = useReadings();
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const now = new Date();

    // Título
    pdf.setFontSize(16);
    pdf.text("Reporte del Hábitat de Grillos", 105, 15, { align: "center" });

    // Fecha
    pdf.setFontSize(10);
    pdf.text(
      `Fecha: ${now.toLocaleDateString()} Hora: ${now.toLocaleTimeString()}`,
      105,
      22,
      { align: "center" },
    );

    // Tabla de lecturas
    const tableData = readings.map((r) => [
      r.timestamp.toLocaleString(),
      r.temperature,
      r.humidity,
    ]);

    autoTable(pdf, {
      head: [["Timestamp", "Temperatura (°C)", "Humedad (%)"]],
      body: tableData,
      startY: 30,
      theme: "grid",
      headStyles: { fillColor: [39, 135, 51] }, // verde como tu theme
      styles: { fontSize: 10 },
    });

    pdf.save(`reporte-habitat-${Date.now()}.pdf`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const todayReadings = readings.slice(-24);
  const weekReadings = readings.slice(-7 * 24).filter((_, i) => i % 24 === 0);
  const monthReadings = readings.slice(-30 * 24).filter((_, i) => i % 24 === 0);

  const historicalData = {
    today: todayReadings,
    week: weekReadings,
    month: monthReadings,
  };

  const recentReadings = readings.slice(-6).reverse();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">
          Historial de datos
        </h2>
        <p className="text-sm text-muted-foreground">
          Visualiza las tendencias de temperatura y humedad a lo largo del
          tiempo
        </p>
      </div>

      <Button
        className="w-100 flex items-center justify-center gap-2"
        variant="default"
        onClick={handleDownloadPdf}
      >
        Descargar reporte
      </Button>

      <div ref={dashboardRef}>
        {/* Temperature Chart */}
        <ChartCard
          title="Temperatura"
          data={historicalData}
          dataKey="temperature"
          color="#2a9d4a"
          unit="°C"
        />

        {/* Humidity Chart */}
        <ChartCard
          title="Humedad"
          data={historicalData}
          dataKey="humidity"
          color="#d4a73a"
          unit="%"
        />

        {/* Recent Readings */}
        <RecentReadings readings={recentReadings} />
      </div>
    </div>
  );
}
