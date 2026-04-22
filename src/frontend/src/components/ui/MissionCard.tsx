import { cn } from "@/lib/utils";
import type { Mission, ServiceType } from "@/types/wejha";
import { WejhaButton } from "./WejhaButton";

interface MissionCardProps {
  mission: Mission;
  onAccept?: (mission: Mission) => void;
  onComplete?: (mission: Mission) => void;
  isActive?: boolean;
  className?: string;
}

const categoryConfig: Record<
  ServiceType,
  { icon: string; label: string; color: string; bg: string }
> = {
  medical: {
    icon: "🏥",
    label: "Médical",
    color: "text-rose-700",
    bg: "bg-rose-50",
  },
  transport: {
    icon: "🚗",
    label: "Transport",
    color: "text-blue-700",
    bg: "bg-blue-50",
  },
  shopping: {
    icon: "🛒",
    label: "Courses",
    color: "text-orange-700",
    bg: "bg-orange-50",
  },
  homeHelp: {
    icon: "🏠",
    label: "Aide à domicile",
    color: "text-green-700",
    bg: "bg-green-50",
  },
  other: {
    icon: "💼",
    label: "Autre",
    color: "text-purple-700",
    bg: "bg-purple-50",
  },
};

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h${m}` : `${h}h`;
}

function formatSchedule(ts?: number): string | null {
  if (!ts) return null;
  const diff = ts - Date.now();
  if (diff < 0) return "Maintenant";
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h === 0) return `Dans ${m} min`;
  if (m === 0) return `Dans ${h}h`;
  return `Dans ${h}h${m}`;
}

export function MissionCard({
  mission,
  onAccept,
  onComplete,
  isActive = false,
  className,
}: MissionCardProps) {
  const cat = categoryConfig[mission.category];
  const scheduleLabel = formatSchedule(mission.scheduledAt);

  return (
    <div
      data-ocid={`mission.card.${mission.id}`}
      className={cn(
        "card-elevated p-4 flex flex-col gap-3 border",
        isActive
          ? "border-secondary/50 ring-2 ring-secondary/30"
          : "border-border",
        className,
      )}
    >
      {/* Top row: category + urgency + schedule */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0",
              cat.bg,
            )}
            aria-hidden="true"
          >
            {cat.icon}
          </span>
          <div>
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-wide",
                cat.color,
              )}
            >
              {cat.label}
            </span>
            {mission.isUrgent && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">
                🔴 Urgent
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          {/* Points badge */}
          <span
            data-ocid={`mission.points_badge.${mission.id}`}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
            style={{
              background: "oklch(0.65 0.18 210 / 0.15)",
              color: "oklch(0.45 0.18 210)",
            }}
          >
            +{mission.pointsReward} pts
          </span>
          {isActive && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{
                background: "oklch(0.50 0.18 220 / 0.12)",
                color: "oklch(0.42 0.18 220)",
              }}
            >
              ⚡ En cours
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p
        className="text-sm text-foreground font-medium leading-snug line-clamp-2"
        title={mission.description}
      >
        {mission.description}
      </p>

      {/* Address */}
      <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
        <span aria-hidden="true">📍</span>
        {mission.address}
      </p>

      {/* Meta row: duration + payout + schedule */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <span aria-hidden="true">⏱</span>
          <span className="font-medium text-foreground">
            {formatDuration(mission.durationMinutes)}
          </span>
        </span>
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <span aria-hidden="true">💰</span>
          <span className="font-semibold text-foreground">
            {mission.payoutAmount} DT
          </span>
        </span>
        {scheduleLabel && (
          <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            🕐 {scheduleLabel}
          </span>
        )}
      </div>

      {/* Action */}
      {isActive ? (
        <WejhaButton
          data-ocid={`mission.complete_button.${mission.id}`}
          variant="secondary"
          size="sm"
          fullWidth
          onClick={() => onComplete?.(mission)}
          aria-label="Marquer cette mission comme terminée"
        >
          ✅ Marquer comme terminé
        </WejhaButton>
      ) : (
        <WejhaButton
          data-ocid={`mission.accept_button.${mission.id}`}
          variant="primary"
          size="sm"
          fullWidth
          onClick={() => onAccept?.(mission)}
          aria-label={`Accepter la mission: ${mission.description}`}
        >
          Accepter
        </WejhaButton>
      )}
    </div>
  );
}
