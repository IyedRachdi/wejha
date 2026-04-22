import { WejhaButton } from "@/components/ui/WejhaButton";
import type { Booking } from "@/types/wejha";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";

interface TrackingViewProps {
  booking: Booking;
  onContact?: () => void;
  onComplete?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function TrackingView({
  booking,
  onContact,
  onComplete,
}: TrackingViewProps) {
  const [eta, setEta] = useState(booking.status === "enRoute" ? 12 : 2);
  const [pulsePos, setPulsePos] = useState({ x: 35, y: 55 });

  // Animate ETA countdown
  useEffect(() => {
    if (booking.status !== "enRoute") return;
    const interval = setInterval(() => {
      setEta((prev) => Math.max(0, prev - 1));
    }, 10_000);
    return () => clearInterval(interval);
  }, [booking.status]);

  // Animate map marker drift
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePos((prev) => ({
        x: Math.min(65, Math.max(25, prev.x + (Math.random() - 0.5) * 6)),
        y: Math.min(70, Math.max(30, prev.y + (Math.random() - 0.5) * 6)),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isArrived = booking.status === "arrived";

  return (
    <div
      className="rounded-2xl overflow-hidden border border-border shadow-sm"
      data-ocid="tracking_view.section"
    >
      {/* Map placeholder */}
      <div
        className="relative h-40 flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, oklch(0.65 0.18 210 / 0.15), oklch(0.55 0.22 310 / 0.1))",
        }}
        aria-label="Carte de suivi en temps réel"
        role="img"
      >
        {/* Grid lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-20"
          aria-hidden="true"
        >
          {[0, 25, 50, 75, 100].map((pct) => (
            <g key={pct}>
              <line
                x1={`${pct}%`}
                y1="0"
                x2={`${pct}%`}
                y2="100%"
                stroke="oklch(0.55 0.22 310)"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <line
                x1="0"
                y1={`${pct}%`}
                x2="100%"
                y2={`${pct}%`}
                stroke="oklch(0.55 0.22 310)"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
            </g>
          ))}
        </svg>

        {/* Animated provider pin */}
        <div
          className="absolute transition-all duration-[3000ms] ease-in-out"
          style={{
            left: `${pulsePos.x}%`,
            top: `${pulsePos.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden="true"
        >
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-40"
              style={{
                background: "oklch(0.55 0.22 310)",
                transform: "scale(2.5)",
              }}
            />
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg z-10 relative"
              style={{ background: "oklch(0.55 0.22 310)" }}
            >
              {booking.providerName ? getInitials(booking.providerName) : "?"}
            </div>
          </div>
        </div>

        {/* Destination pin */}
        <div
          className="absolute bottom-6 right-8 text-2xl animate-bounce"
          aria-hidden="true"
        >
          📍
        </div>

        {/* ETA badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1.5 rounded-xl text-sm font-bold shadow-md"
          style={{
            background: "oklch(0.99 0.004 270)",
            color: "oklch(0.55 0.22 310)",
          }}
        >
          {isArrived ? "🎉 Arrivé !" : `Arrivée estimée: ${eta} min`}
        </div>
      </div>

      {/* Provider info row */}
      <div className="bg-card p-4 flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.55 0.22 310), oklch(0.65 0.18 210))",
          }}
          aria-hidden="true"
        >
          {booking.providerName ? getInitials(booking.providerName) : "?"}
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm">
            {booking.providerName ?? "Prestataire en route"}
          </p>
          <p className="text-xs text-muted-foreground">
            {isArrived ? "Est arrivé à votre adresse" : "Se dirige vers vous"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onContact}
            data-ocid="tracking_view.contact_button"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:opacity-80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            style={{ background: "oklch(0.55 0.22 310 / 0.12)" }}
            aria-label="Appeler le prestataire"
          >
            <Phone
              className="w-5 h-5"
              style={{ color: "oklch(0.55 0.22 310)" }}
              aria-hidden="true"
            />
          </button>

          {isArrived && onComplete && (
            <WejhaButton
              variant="secondary"
              size="sm"
              onClick={onComplete}
              data-ocid="tracking_view.complete_button"
            >
              Terminer
            </WejhaButton>
          )}
        </div>
      </div>
    </div>
  );
}
