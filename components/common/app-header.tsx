import Image from "next/image";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="px-2 rounded-lg">
            <Image src="/icon.svg" alt="Grillero" width={32} height={32} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Grillero</h1>
            <p className="text-xs text-muted-foreground">
              Monitor de habitat para grillos
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
