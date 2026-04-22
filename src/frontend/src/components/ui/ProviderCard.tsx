import { StarRating } from "@/components/ui/StarRating";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { cn } from "@/lib/utils";
import type { ProviderSummary, ServiceType } from "@/types/wejha";
import { ChevronRight } from "lucide-react";

interface ProviderCardProps {
  provider: ProviderSummary;
  onSelect?: (provider: ProviderSummary) => void;
  compact?: boolean;
  className?: string;
}

const serviceLabels: Record<ServiceType, string> = {
  medical: "Médical",
  transport: "Transport",
  shopping: "Courses",
  homeHelp: "Aide dom.",
  other: "Autre",
};

const badgeColors = {
  bronze: { bg: "oklch(0.65 0.14 55 / 0.15)", text: "oklch(0.52 0.14 55)" },
  silver: { bg: "oklch(0.7 0.01 270 / 0.2)", text: "oklch(0.48 0.012 270)" },
  gold: { bg: "oklch(0.85 0.18 90 / 0.2)", text: "oklch(0.60 0.18 80)" },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ProviderCard({
  provider,
  onSelect,
  compact = false,
  className,
}: ProviderCardProps) {
  const isDriver = provider.role === "driver";
  const badge = provider.badge ? badgeColors[provider.badge] : null;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(provider)}
      className={cn(
        "w-full text-left bg-card rounded-2xl border border-border shadow-sm",
        "hover:shadow-md hover:border-primary/30 transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        compact ? "p-3" : "p-4",
        className,
      )}
      data-ocid="provider_card.card"
      aria-label={`Voir le profil de ${provider.name}`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className={cn(
              "rounded-full flex items-center justify-center font-bold text-white",
              compact ? "w-10 h-10 text-sm" : "w-12 h-12 text-base",
            )}
            style={{
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 310), oklch(0.65 0.18 210))",
            }}
            aria-hidden="true"
          >
            {getInitials(provider.name)}
          </div>
          {/* Availability dot */}
          <span
            className={cn(
              "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card",
              provider.isAvailable ? "bg-success" : "bg-muted-foreground",
            )}
            aria-label={provider.isAvailable ? "Disponible" : "Indisponible"}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {/* Name + verified */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-foreground text-sm">
              {provider.name}
            </span>
            {provider.isVerified && <VerifiedBadge />}
          </div>

          {/* Role chip + badge */}
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={
                isDriver
                  ? {
                      background: "oklch(0.55 0.22 310 / 0.12)",
                      color: "oklch(0.45 0.22 310)",
                    }
                  : {
                      background: "oklch(0.65 0.18 210 / 0.12)",
                      color: "oklch(0.45 0.18 210)",
                    }
              }
            >
              {isDriver ? "Chauffeur PMR" : "Étudiant"}
            </span>
            {provider.badge && badge && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full capitalize"
                style={{ background: badge.bg, color: badge.text }}
              >
                {provider.badge === "bronze"
                  ? "🥉 Bronze"
                  : provider.badge === "silver"
                    ? "🥈 Argent"
                    : "🥇 Or"}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1">
            <StarRating rating={provider.rating} size="sm" />
            <span className="text-xs text-muted-foreground font-medium">
              {provider.rating.toFixed(1)} ({provider.reviewCount})
            </span>
          </div>

          {/* Services + missions (not compact) */}
          {!compact && (
            <>
              <div className="flex flex-wrap gap-1 mt-2">
                {provider.serviceTypes.slice(0, 3).map((svc) => (
                  <span
                    key={svc}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium"
                  >
                    {serviceLabels[svc]}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                {provider.bio}
              </p>
            </>
          )}
        </div>

        {/* Arrow */}
        <ChevronRight
          className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1"
          aria-hidden="true"
        />
      </div>

      {/* "Voir le profil →" footer link (non-compact only) */}
      {!compact && (
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {provider.completedMissions} missions effectuées
          </span>
          <span
            className="text-xs font-semibold"
            style={{ color: "oklch(0.55 0.22 310)" }}
            aria-hidden="true"
          >
            Voir le profil →
          </span>
        </div>
      )}
    </button>
  );
}
