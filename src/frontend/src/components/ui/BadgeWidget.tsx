import { cn } from "@/lib/utils";
import type { StudentBadge } from "@/types/wejha";

interface BadgeWidgetProps {
  badge: StudentBadge;
  points: number;
  showProgress?: boolean;
  compact?: boolean;
  className?: string;
}

const badgeConfig = {
  bronze: {
    label: "Helper Bronze",
    icon: "🥉",
    nextPoints: 500,
    minPoints: 0,
    bgStyle: {
      background: "oklch(0.95 0.03 60)",
      borderColor: "oklch(0.85 0.06 60)",
    },
    colorStyle: { color: "oklch(0.45 0.12 60)" },
    barStyle: { background: "oklch(0.60 0.15 60)" },
  },
  silver: {
    label: "Helper Argent",
    icon: "🥈",
    nextPoints: 1500,
    minPoints: 500,
    bgStyle: {
      background: "oklch(0.95 0.01 280)",
      borderColor: "oklch(0.82 0.02 280)",
    },
    colorStyle: { color: "oklch(0.40 0.04 280)" },
    barStyle: { background: "oklch(0.55 0.06 280)" },
  },
  gold: {
    label: "Helper Or",
    icon: "🥇",
    nextPoints: 1500,
    minPoints: 1500,
    bgStyle: {
      background: "oklch(0.96 0.06 85)",
      borderColor: "oklch(0.85 0.09 85)",
    },
    colorStyle: { color: "oklch(0.52 0.15 85)" },
    barStyle: { background: "oklch(0.65 0.18 85)" },
  },
} as const;

export function BadgeWidget({
  badge,
  points,
  showProgress = false,
  compact = false,
  className,
}: BadgeWidgetProps) {
  const config = badgeConfig[badge];
  const isGold = badge === "gold";
  const progress = isGold
    ? 100
    : Math.min(
        100,
        ((points - config.minPoints) / (config.nextPoints - config.minPoints)) *
          100,
      );

  if (compact) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-semibold",
          className,
        )}
        style={{ ...config.bgStyle, ...config.colorStyle }}
      >
        <span aria-hidden="true">{config.icon}</span>
        {config.label}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-2xl border",
        className,
      )}
      style={config.bgStyle}
    >
      <span className="text-4xl" aria-hidden="true">
        {config.icon}
      </span>
      <p className="font-bold text-base" style={config.colorStyle}>
        {config.label}
      </p>
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{points}</span> points
      </p>
      {showProgress && !isGold && (
        <div className="w-full mt-1">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>{points} pts</span>
            <span>{config.nextPoints} pts</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, ...config.barStyle }}
              aria-label={`Progression vers le niveau suivant: ${Math.round(progress)}%`}
            />
          </div>
        </div>
      )}
      {showProgress && isGold && (
        <p className="text-xs font-semibold" style={config.colorStyle}>
          ✨ Niveau maximum atteint !
        </p>
      )}
    </div>
  );
}
