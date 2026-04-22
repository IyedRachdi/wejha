import { AppLayout } from "@/components/layout/AppLayout";
import { BookingStatusBar } from "@/components/ui/BookingStatusBar";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { WejhaButton } from "@/components/ui/WejhaButton";
import { useMockBookings } from "@/hooks/useWejha";
import { cn } from "@/lib/utils";
import type { Booking, BookingStatus } from "@/types/wejha";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type TabKey = "active" | "completed" | "cancelled";

const TABS: { key: TabKey; label: string }[] = [
  { key: "active", label: "En cours" },
  { key: "completed", label: "Terminées" },
  { key: "cancelled", label: "Annulées" },
];

const ACTIVE_STATUSES: BookingStatus[] = [
  "requested",
  "confirmed",
  "enRoute",
  "arrived",
];

const statusChipColors: Record<
  BookingStatus,
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

const serviceIcons: Record<string, string> = {
  medical: "🏥",
  transport: "🚗",
  shopping: "🛒",
  homeHelp: "🏠",
  other: "✨",
};

const serviceLabels: Record<string, string> = {
  medical: "Médical",
  transport: "Transport",
  shopping: "Courses",
  homeHelp: "Aide à domicile",
  other: "Autre",
};

function formatRelativeDate(ts: number): string {
  const diff = Date.now() - ts;
  const minutes = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  return `Il y a ${days}j`;
}

function EmptyState({ tab }: { tab: TabKey }) {
  const content = {
    active: {
      icon: "📋",
      msg: "Aucune réservation en cours",
      sub: "Réservez un service pour commencer",
    },
    completed: {
      icon: "✅",
      msg: "Aucune réservation terminée",
      sub: "Vos prestations passées apparaîtront ici",
    },
    cancelled: {
      icon: "🚫",
      msg: "Aucune réservation annulée",
      sub: "Bonne nouvelle !",
    },
  }[tab];

  return (
    <div
      className="flex flex-col items-center justify-center py-16 rounded-2xl bg-muted/30 border border-border"
      data-ocid="bookings.empty_state"
      aria-live="polite"
    >
      <span className="text-5xl mb-3" aria-hidden="true">
        {content.icon}
      </span>
      <p className="font-semibold text-foreground text-base">{content.msg}</p>
      <p className="text-sm text-muted-foreground mt-1 text-center">
        {content.sub}
      </p>
    </div>
  );
}

function BookingItem({
  booking,
  index,
  onPress,
}: {
  booking: Booking;
  index: number;
  onPress: () => void;
}) {
  const chip = statusChipColors[booking.status];
  const isActive = ACTIVE_STATUSES.includes(booking.status);

  return (
    <button
      type="button"
      data-ocid={`bookings.item.${index}`}
      onClick={onPress}
      className={cn(
        "w-full text-left bg-card rounded-2xl border border-border p-4 space-y-3",
        "hover:shadow-md hover:border-primary/20 transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
      )}
      aria-label={`Réservation : ${booking.description}`}
    >
      {/* Top row */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden="true">
            {serviceIcons[booking.serviceType]}
          </span>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "oklch(0.55 0.22 310 / 0.1)",
              color: "oklch(0.45 0.22 310)",
            }}
          >
            {serviceLabels[booking.serviceType]}
          </span>
        </div>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
          style={{ background: chip.bg, color: chip.text }}
          data-ocid={`bookings.status_chip.${index}`}
        >
          {chip.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
        {booking.description}
      </p>

      {/* Provider + date */}
      <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5 min-w-0">
          {booking.providerName ? (
            <>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                style={{ background: "oklch(0.55 0.22 310)" }}
                aria-hidden="true"
              >
                {booking.providerName.charAt(0)}
              </div>
              <span className="truncate font-medium">
                {booking.providerName}
              </span>
              <VerifiedBadge />
            </>
          ) : (
            <span className="italic">En attente d'attribution</span>
          )}
        </div>
        <span className="flex-shrink-0">
          {formatRelativeDate(booking.createdAt)}
        </span>
      </div>

      {/* Status progress bar for active bookings */}
      {isActive && <BookingStatusBar status={booking.status} />}

      {/* Footer row */}
      <div className="flex items-center justify-between pt-1 border-t border-border">
        <span className="text-xs text-muted-foreground">
          {booking.estimatedDuration} min estimé
        </span>
        <span
          className="font-bold text-sm"
          style={{ color: "oklch(0.55 0.22 310)" }}
        >
          {booking.price} DT
        </span>
      </div>
    </button>
  );
}

export default function BookingsPage() {
  const navigate = useNavigate();
  const allBookings = useMockBookings();
  const [activeTab, setActiveTab] = useState<TabKey>("active");

  const tabBookings: Record<TabKey, Booking[]> = {
    active: allBookings.filter((b) => ACTIVE_STATUSES.includes(b.status)),
    completed: allBookings.filter((b) => b.status === "completed"),
    cancelled: allBookings.filter((b) => b.status === "cancelled"),
  };

  const visibleBookings = tabBookings[activeTab];

  function handleTabChange(_key: string, route: string) {
    navigate({ to: route as "/" });
  }

  return (
    <AppLayout
      activeTab="bookings"
      onTabChange={handleTabChange}
      title="Réservations"
      userRole="pmr"
    >
      <div className="px-4 pt-5 pb-6 space-y-4">
        {/* Title */}
        <div>
          <h1 className="font-display font-bold text-xl text-foreground">
            Mes Réservations
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Gérez et suivez vos prestations
          </p>
        </div>

        {/* Summary chips */}
        <div className="flex gap-3">
          {TABS.map((tab) => (
            <div
              key={tab.key}
              className="flex-1 rounded-xl p-3 text-center bg-card border border-border"
            >
              <p
                className="font-bold text-lg"
                style={{ color: "oklch(0.55 0.22 310)" }}
              >
                {tabBookings[tab.key].length}
              </p>
              <p className="text-[10px] text-muted-foreground font-medium mt-0.5">
                {tab.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div
          className="flex border-b border-border"
          role="tablist"
          aria-label="Filtrer les réservations"
          data-ocid="bookings.tabs.section"
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              data-ocid={`bookings.${tab.key}.tab`}
              aria-selected={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex-1 py-3 text-sm font-semibold transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
                activeTab !== tab.key &&
                  "text-muted-foreground hover:text-foreground",
              )}
              style={
                activeTab === tab.key
                  ? {
                      color: "oklch(0.45 0.22 310)",
                      borderBottom: "2px solid oklch(0.55 0.22 310)",
                      marginBottom: "-1px",
                    }
                  : {}
              }
            >
              {tab.label}
              {tabBookings[tab.key].length > 0 && (
                <span
                  className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full"
                  style={
                    activeTab === tab.key
                      ? {
                          background: "oklch(0.55 0.22 310 / 0.12)",
                          color: "oklch(0.45 0.22 310)",
                        }
                      : {
                          background: "oklch(0.92 0.01 270)",
                          color: "oklch(0.48 0.008 280)",
                        }
                  }
                >
                  {tabBookings[tab.key].length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {visibleBookings.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          <div
            role="tabpanel"
            aria-label={TABS.find((t) => t.key === activeTab)?.label}
            data-ocid="bookings.list"
            className="space-y-3"
          >
            {visibleBookings.map((booking, idx) => (
              <BookingItem
                key={booking.id}
                booking={booking}
                index={idx + 1}
                onPress={() =>
                  navigate({ to: `/booking/${booking.id}` as "/" })
                }
              />
            ))}
          </div>
        )}

        {/* CTA to create new booking */}
        <WejhaButton
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => navigate({ to: "/search" as "/" })}
          data-ocid="bookings.new_booking.button"
        >
          + Nouvelle réservation
        </WejhaButton>
      </div>
    </AppLayout>
  );
}
