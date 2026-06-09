import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SkeletonProvider } from "@/providers/skeleton-provider";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ReadingsProvider } from "@/providers/readings-provider";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Monitor de grilleros",
  description:
    "Aplicación para monitorear las condiciones ambientales de un hábitat de grillos.",
  icons: {
    icon: [
      {
        url: "/icon.png",
        type: "image/png",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className="font-sans antialiased">
        <SkeletonProvider>
          <ReadingsProvider>
            {children}
            {process.env.NODE_ENV === "production" && <Analytics />}
          </ReadingsProvider>
        </SkeletonProvider>
      </body>
    </html>
  );
}
