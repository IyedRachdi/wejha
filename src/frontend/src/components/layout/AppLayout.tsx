import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useAccessibility, useAuth } from "@/hooks/useWejha";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/wejha";
import { Accessibility, Eye, Type, Volume2, X } from "lucide-react";
import { useState } from "react";
import { TabBar } from "./TabBar";

interface AppLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (key: string, route: string) => void;
  title?: string;
  showSos?: boolean;
  userRole?: UserRole;
}

export function AppLayout({
  children,
  activeTab,
  onTabChange,
  title = "Wejha",
  showSos = false,
  userRole: roleProp,
}: AppLayoutProps) {
  const [accessOpen, setAccessOpen] = useState(false);
  const { textSize, highContrast, setTextSize, toggleHighContrast } =
    useAccessibility();
  const { userRole } = useAuth();
  const effectiveRole: UserRole = roleProp ?? userRole ?? "pmr";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-md">
        <div className="flex items-center justify-between px-4 max-w-lg mx-auto h-14">
          <span className="font-display font-bold text-xl tracking-tight">
            {title}
          </span>
          <div className="flex items-center gap-2">
            {showSos && (
              <button
                type="button"
                data-ocid="header.sos_button"
                className="w-11 h-11 rounded-full bg-destructive text-destructive-foreground font-bold text-sm shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Appel d'urgence SOS"
              >
                SOS
              </button>
            )}
            <button
              type="button"
              data-ocid="header.accessibility_button"
              onClick={() => setAccessOpen(true)}
              className="w-11 h-11 rounded-full bg-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Paramètres d'accessibilité"
            >
              <Accessibility className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        className="flex-1 overflow-y-auto pt-14"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 5rem)" }}
      >
        <div className="max-w-lg mx-auto w-full">{children}</div>
      </main>

      {/* Bottom TabBar */}
      <TabBar
        role={effectiveRole}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />

      {/* Accessibility Sheet */}
      <Sheet open={accessOpen} onOpenChange={setAccessOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl max-w-lg mx-auto"
          data-ocid="accessibility.dialog"
        >
          <SheetHeader className="flex flex-row items-center justify-between pb-2">
            <SheetTitle className="text-lg font-bold">Accessibilité</SheetTitle>
            <button
              type="button"
              data-ocid="accessibility.close_button"
              onClick={() => setAccessOpen(false)}
              className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </SheetHeader>

          <div className="space-y-6 pt-4 pb-6">
            {/* High contrast */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-foreground" aria-hidden="true" />
                </div>
                <div>
                  <Label className="text-base font-semibold">
                    Contraste élevé
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Améliore la lisibilité
                  </p>
                </div>
              </div>
              <Switch
                data-ocid="accessibility.high_contrast.switch"
                checked={highContrast}
                onCheckedChange={toggleHighContrast}
                aria-label="Activer le contraste élevé"
              />
            </div>

            {/* Text size */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Type
                    className="w-5 h-5 text-foreground"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <Label className="text-base font-semibold">
                    Taille du texte
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Ajustez selon votre confort
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["small", "medium", "large"] as const).map((size) => {
                  const labels = {
                    small: "Petit",
                    medium: "Normal",
                    large: "Grand",
                  };
                  return (
                    <button
                      key={size}
                      type="button"
                      data-ocid={`accessibility.text_size_${size}.button`}
                      onClick={() => setTextSize(size)}
                      className={cn(
                        "py-3 rounded-xl border text-sm font-medium transition-all min-h-[44px]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        textSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card border-border text-foreground hover:bg-muted",
                      )}
                      aria-pressed={textSize === size}
                    >
                      {labels[size]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Voice info */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
              <Volume2
                className="w-5 h-5 text-secondary flex-shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm text-foreground">
                <strong>Support vocal</strong> — Activez le lecteur d'écran de
                votre appareil pour la navigation vocale.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
