import { AppLayout } from "@/components/layout/AppLayout";
import { BookingStatusBar } from "@/components/ui/BookingStatusBar";
import { PremiumBanner } from "@/components/ui/PremiumBanner";
import { WejhaButton } from "@/components/ui/WejhaButton";
import { useAuth, useMockBookings } from "@/hooks/useWejha";
import { cn } from "@/lib/utils";
import type { ServiceType } from "@/types/wejha";
import { useNavigate } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

const QUICK_SERVICES: { type: ServiceType; icon: string; label: string }[] = [
  { type: "medical", icon: "🏥", label: "Médical" },
  { type: "transport", icon: "🚗", label: "Transport" },
  { type: "shopping", icon: "🛒", label: "Courses" },
  { type: "homeHelp", icon: "🏠", label: "Aide à domicile" },
];

const statusChipColors: Record<
  string,
  { bg: string; text: string; label: string }
> = {
  requested: {
    bg: "oklch(0.72 0.15 85 / 0.15)",
    text: "oklch(0.50 0.15 75)",
    label: "En attente",
  },
  confirmed: {
    bg: "oklch(0.65 0.18 260 / 0.15)",
    text: "oklch(0.45 0.18 255)",
    label: "Confirmé",
  },
  enRoute: {
    bg: "oklch(0.55 0.22 310 / 0.12)",
    text: "oklch(0.45 0.22 310)",
    label: "En route",
  },
  arrived: {
    bg: "oklch(0.65 0.18 210 / 0.12)",
    text: "oklch(0.45 0.18 210)",
    label: "Arrivé",
  },
  completed: {
    bg: "oklch(0.6 0.16 140 / 0.12)",
    text: "oklch(0.42 0.16 140)",
    label: "Terminé",
  },
  cancelled: {
    bg: "oklch(0.55 0.24 25 / 0.12)",
    text: "oklch(0.42 0.24 25)",
    label: "Annulé",
  },
};

const serviceIcons: Record<ServiceType, string> = {
  medical: "🏥",
  transport: "🚗",
  shopping: "🛒",
  homeHelp: "🏠",
  other: "✨",
};

export default function HomePage() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const bookings = useMockBookings();
  const recentBookings = bookings.slice(0, 2);
  const firstName = userProfile?.name?.split(" ")[0] ?? "là";
  const isPremium = userProfile?.isPremium ?? false;

  function handleTabChange(_key: string, route: string) {
    navigate({ to: route as "/" });
  }

  return (
    <AppLayout
      activeTab="home"
      onTabChange={handleTabChange}
      title="Wejha وجهة"
      showSos={false}
      userRole="pmr"
    >
      <div className="px-4 pt-5 pb-4 space-y-5">
        {/* Welcome header */}
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Bonjour,{" "}
            <span style={{ color: "oklch(0.55 0.22 310)" }}>
              {firstName} 👋
            </span>
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Comment pouvons-nous vous aider aujourd'hui ?
          </p>
        </div>

        {/* SOS Button — prominent, pulsing */}
        <button
          type="button"
          data-ocid="home.sos_button"
          aria-label="Appel d'urgence SOS"
          onClick={() =>
            window.alert(
              "Appel d'urgence SOS — Êtes-vous en danger?\nComposez le 190 (Police) ou le 1021 (SAMU) pour une urgence médicale.",
            )
          }
          className={cn(
            "w-full min-h-16 rounded-2xl text-white font-display font-bold text-lg",
            "flex items-center justify-center gap-3 shadow-lg relative overflow-hidden",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2",
            "active:scale-[0.98] transition-transform duration-150",
          )}
          style={{
            background:
              "linear-gradient(135deg, oklch(0.50 0.24 25), oklch(0.55 0.26 15))",
          }}
        >
          <span
            className="absolute inset-0 rounded-2xl animate-ping opacity-20"
            style={{ background: "oklch(0.55 0.24 25)" }}
            aria-hidden="true"
          />
          <span className="relative z-10 text-2xl" aria-hidden="true">
            🚨
          </span>
          <span className="relative z-10 tracking-wide">
            Appel d'urgence SOS
          </span>
        </button>

        {/* Premium section */}
        {isPremium ? (
          <div
            className="flex items-center gap-3 p-4 rounded-2xl border"
            style={{
              background: "oklch(0.55 0.22 310 / 0.08)",
              borderColor: "oklch(0.55 0.22 310 / 0.3)",
            }}
            data-ocid="home.premium_status.section"
          >
            <span className="text-2xl" aria-hidden="true">
              ⭐
            </span>
            <div>
              <p
                className="font-semibold text-sm"
                style={{ color: "oklch(0.45 0.22 310)" }}
              >
                Abonné Premium ✓
              </p>
              <p className="text-xs text-muted-foreground">
                Vous profitez d'un accès prioritaire
              </p>
            </div>
          </div>
        ) : (
          <PremiumBanner onSubscribe={() => {}} />
        )}

        {/* Quick services 2×2 grid */}
        <section aria-labelledby="quick-services-title">
          <h2
            id="quick-services-title"
            className="font-display font-bold text-base text-foreground mb-3"
          >
            Services rapides
          </h2>
          <div
            className="grid grid-cols-2 gap-3"
            data-ocid="home.quick_services.section"
          >
            {QUICK_SERVICES.map((service) => (
              <button
                key={service.type}
                type="button"
                data-ocid={`home.service_${service.type}.button`}
                onClick={() => navigate({ to: "/search" })}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 min-h-[88px]",
                  "bg-card hover:shadow-md active:scale-[0.97]",
                  "transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                )}
                style={{ borderColor: "oklch(0.55 0.22 310 / 0.2)" }}
                aria-label={`Trouver un service ${service.label}`}
              >
                <span className="text-3xl" aria-hidden="true">
                  {service.icon}
                </span>
                <span className="text-sm font-semibold text-foreground text-center leading-tight">
                  {service.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Map placeholder */}
        <section aria-labelledby="location-title">
          <h2
            id="location-title"
            className="font-display font-bold text-base text-foreground mb-3"
          >
            Votre position
          </h2>
          <div
            className="rounded-2xl p-5 flex items-center gap-4 min-h-[80px]"
            style={{
              background: "oklch(0.65 0.18 210 / 0.12)",
              border: "1px solid oklch(0.65 0.18 210 / 0.25)",
            }}
            data-ocid="home.location.section"
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "oklch(0.65 0.18 210 / 0.2)" }}
              aria-hidden="true"
            >
              <MapPin
                className="w-6 h-6"
                style={{ color: "oklch(0.45 0.18 210)" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground">
                Votre localisation
              </p>
              <p className="text-xs text-muted-foreground">
                Tunis, Tunisie — GPS actif 📍
              </p>
            </div>
            <WejhaButton
              variant="secondary"
              size="sm"
              className="flex-shrink-0"
              data-ocid="home.location.update_button"
            >
              Mettre à jour
            </WejhaButton>
          </div>
        </section>

        {/* Recent bookings */}
        <section aria-labelledby="recent-bookings-title">
          <div className="flex items-center justify-between mb-3">
            <h2
              id="recent-bookings-title"
              className="font-display font-bold text-base text-foreground"
            >
              Réservations récentes
            </h2>
            <button
              type="button"
              data-ocid="home.bookings.see_all_button"
              onClick={() => navigate({ to: "/bookings" })}
              className="text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              style={{ color: "oklch(0.55 0.22 310)" }}
            >
              Voir tout →
            </button>
          </div>

          {recentBookings.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-8 rounded-2xl bg-muted/40 border border-border"
              data-ocid="home.bookings.empty_state"
            >
              <span className="text-4xl mb-2" aria-hidden="true">
                📋
              </span>
              <p className="text-sm text-muted-foreground text-center">
                Aucune réservation récente
              </p>
            </div>
          ) : (
            <div className="space-y-3" data-ocid="home.bookings.list">
              {recentBookings.map((booking, idx) => {
                const chip = statusChipColors[booking.status];
                return (
                  <button
                    key={booking.id}
                    type="button"
                    data-ocid={`home.booking.item.${idx + 1}`}
                    onClick={() =>
                      navigate({ to: `/booking/${booking.id}` as "/" })
                    }
                    className={cn(
                      "w-full text-left bg-card rounded-2xl border border-border p-4",
                      "hover:shadow-md hover:border-primary/20 transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="text-2xl flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      >
                        {serviceIcons[booking.serviceType]}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground line-clamp-1">
                          {booking.description}
                        </p>
                        {booking.providerName && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {booking.providerName}
                          </p>
                        )}
                        <div className="mt-2">
                          <BookingStatusBar status={booking.status} />
                        </div>
                      </div>
                      <span
                        className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: chip.bg, color: chip.text }}
                      >
                        {chip.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </AppLayout>
  );
}
