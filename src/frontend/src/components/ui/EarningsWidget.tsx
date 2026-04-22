import { cn } from "@/lib/utils";
import { useState } from "react";

interface EarningsWidgetProps {
  totalEarnings: number;
  completedMissions: number;
  thisMonth: number;
  weeklyData: number[];
  className?: string;
}

export function EarningsWidget({
  totalEarnings,
  completedMissions,
  thisMonth,
  weeklyData,
  className,
}: EarningsWidgetProps) {
  const [view, setView] = useState<"month" | "total">("month");

  const displayAmount = view === "month" ? thisMonth : totalEarnings;
  const maxBar = Math.max(...weeklyData, 1);
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  const trendPercent = 12; // mock +12%

  return (
    <div
      data-ocid="earnings.widget"
      className={cn(
        "card-elevated border border-border p-4 space-y-4",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-base text-foreground">Revenus</h3>

        {/* Toggle */}
        <fieldset
          className="flex rounded-xl overflow-hidden border border-border bg-muted p-0.5 gap-0.5"
          aria-label="Période"
        >
          {(["month", "total"] as const).map((v) => (
            <button
              key={v}
              type="button"
              data-ocid={`earnings.${v}_toggle`}
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={cn(
                "px-3 py-1 text-xs font-semibold rounded-lg transition-all min-h-[28px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                view === v
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {v === "month" ? "Ce mois" : "Total"}
            </button>
          ))}
        </fieldset>
      </div>

      {/* Amount + trend */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-foreground tracking-tight">
            {displayAmount.toFixed(0)}
            <span className="text-lg font-semibold text-muted-foreground ml-1">
              DT
            </span>
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {completedMissions} mission{completedMissions !== 1 ? "s" : ""}{" "}
            complétée{completedMissions !== 1 ? "s" : ""}
          </p>
        </div>
        <div
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{
            background: "oklch(0.6 0.16 140 / 0.12)",
            color: "oklch(0.45 0.16 140)",
          }}
          aria-label={`Tendance: +${trendPercent}% par rapport au mois dernier`}
        >
          <span aria-hidden="true">↑</span>+{trendPercent}% ce mois
        </div>
      </div>

      {/* 7-day bar chart */}
      <div aria-label="Graphique des gains des 7 derniers jours">
        <div className="flex items-end justify-between gap-1.5 h-14">
          {weeklyData.map((val, i) => {
            const heightPct = (val / maxBar) * 100;
            const isToday = i === todayIdx;
            return (
              <div
                key={days[i]}
                className="flex-1 flex flex-col items-center gap-1 justify-end"
                title={`${days[i]}: ${val} DT`}
              >
                <div
                  className={cn(
                    "w-full rounded-t-md transition-all duration-500",
                    isToday ? "opacity-100" : "opacity-60",
                  )}
                  style={{
                    height: `${Math.max(heightPct, 6)}%`,
                    background: isToday
                      ? "oklch(0.65 0.18 210)"
                      : "oklch(0.55 0.22 310)",
                    minHeight: "4px",
                  }}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-1">
          {days.map((d, i) => (
            <span
              key={d}
              className={cn(
                "flex-1 text-center text-[10px]",
                i === todayIdx
                  ? "font-bold text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
