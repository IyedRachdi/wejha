import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  displayName: string;
  badge: "bronze" | "silver" | "gold";
  points: number;
  isCurrentUser?: boolean;
}

interface LeaderboardMiniProps {
  currentUserId?: string;
  className?: string;
}

const badgeIcon: Record<string, string> = {
  bronze: "🥉",
  silver: "🥈",
  gold: "🥇",
};

const rankMedal = ["🥇", "🥈", "🥉"];

const mockLeaders: LeaderboardEntry[] = [
  {
    rank: 1,
    displayName: "Amira B.",
    badge: "gold",
    points: 2340,
    isCurrentUser: false,
  },
  {
    rank: 2,
    displayName: "Yassine C.",
    badge: "gold",
    points: 2105,
    isCurrentUser: false,
  },
  {
    rank: 3,
    displayName: "Ahmed K.",
    badge: "silver",
    points: 1890,
    isCurrentUser: true,
  },
];

function getInitials(name: string): string {
  const parts = name.split(" ");
  if (parts.length === 1) return name.slice(0, 2).toUpperCase();
  return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
}

export function LeaderboardMini({ className }: LeaderboardMiniProps) {
  return (
    <div
      data-ocid="leaderboard.mini.panel"
      className={cn(
        "card-elevated border border-border p-4 space-y-3",
        className,
      )}
    >
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-base text-foreground">
          Top Helpers cette semaine 🏆
        </h3>
      </div>

      {/* Entries */}
      <div className="space-y-2">
        {mockLeaders.map((entry) => (
          <div
            key={entry.rank}
            data-ocid={`leaderboard.item.${entry.rank}`}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl transition-smooth",
              entry.isCurrentUser ? "ring-2 ring-primary/40" : "bg-muted/40",
            )}
            style={
              entry.isCurrentUser
                ? { background: "oklch(0.55 0.22 310 / 0.08)" }
                : undefined
            }
            aria-current={entry.isCurrentUser ? "true" : undefined}
          >
            {/* Rank */}
            <span
              className="text-lg w-7 text-center flex-shrink-0"
              aria-label={`Rang ${entry.rank}`}
            >
              {rankMedal[entry.rank - 1]}
            </span>

            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary-foreground"
              style={{ background: "oklch(0.55 0.22 310)" }}
              aria-hidden="true"
            >
              {getInitials(entry.displayName)}
            </div>

            {/* Name + badge */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "text-sm font-semibold text-foreground truncate",
                    entry.isCurrentUser && "text-primary",
                  )}
                >
                  {entry.displayName}
                </span>
                {entry.isCurrentUser && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary flex-shrink-0">
                    Vous
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {badgeIcon[entry.badge]} Helper{" "}
                {entry.badge === "gold"
                  ? "Or"
                  : entry.badge === "silver"
                    ? "Argent"
                    : "Bronze"}
              </span>
            </div>

            {/* Points */}
            <span className="text-sm font-bold text-foreground flex-shrink-0">
              {entry.points.toLocaleString("fr-TN")} pts
            </span>
          </div>
        ))}
      </div>

      {/* Link */}
      <button
        type="button"
        data-ocid="leaderboard.see_full.link"
        disabled
        className="w-full text-center text-sm font-semibold text-primary/50 py-2 cursor-not-allowed"
        aria-label="Voir le classement complet (bientôt disponible)"
      >
        Voir le classement complet →
      </button>
    </div>
  );
}
