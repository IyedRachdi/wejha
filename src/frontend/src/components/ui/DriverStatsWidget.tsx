import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

interface DriverStatsWidgetProps {
  dailyEarnings: number;
  weeklyData: [number, number, number, number, number, number, number];
  totalMissions: number;
  avgRating: number;
}

export function DriverStatsWidget({
  dailyEarnings,
  weeklyData,
  totalMissions,
  avgRating,
}: DriverStatsWidgetProps) {
  const [tab, setTab] = useState<"week" | "month">("week");

  const weeklyTotal = weeklyData.reduce((a, b) => a + b, 0);
  const avgPerDay = Math.round(weeklyTotal / 7);

  const monthlyData = weeklyData.map((v) => Math.round(v * 4.2));
  const monthlyTotal = monthlyData.reduce((a, b) => a + b, 0);

  const chartData = tab === "week" ? weeklyData : monthlyData;
  const chartMax = Math.max(...chartData, 1);
  const displayTotal = tab === "week" ? weeklyTotal : monthlyTotal;

  const summaryStats = [
    {
      label: tab === "week" ? "Total semaine" : "Total mois",
      value: `${displayTotal} TND`,
    },
    { label: "Missions", value: String(totalMissions) },
    {
      label: "Moyenne/jour",
      value: `${tab === "week" ? avgPerDay : Math.round(monthlyTotal / 30)} TND`,
    },
  ];

  return (
    <div
      className="p-4 rounded-2xl bg-card border border-border space-y-4"
      aria-label="Statistiques hebdomadaires conducteur"
    >
      {/* Header + tabs */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground text-sm">
          Statistiques — {tab === "week" ? "Cette semaine" : "Ce mois"}
        </h3>
        <div
          className="flex rounded-lg overflow-hidden border border-border"
          role="tablist"
          aria-label="Période des statistiques"
        >
          {(["week", "month"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              data-ocid={`driver.stats.${t}_tab`}
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "px-3 py-1.5 text-xs font-medium transition-colors min-h-[32px]",
                tab === t
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-muted",
              )}
            >
              {t === "week" ? "Semaine" : "Mois"}
            </button>
          ))}
        </div>
      </div>

      {/* Daily earnings highlight */}
      <div
        className="flex items-center justify-between p-3 rounded-xl"
        style={{
          background: "oklch(0.65 0.18 210 / 0.08)",
          border: "1px solid oklch(0.65 0.18 210 / 0.2)",
        }}
      >
        <div>
          <p className="text-xs text-muted-foreground">Aujourd'hui</p>
          <p
            className="text-xl font-bold"
            style={{ color: "oklch(0.50 0.18 210)" }}
          >
            {dailyEarnings} TND
          </p>
        </div>
        <StarRating rating={avgRating} size="sm" />
      </div>

      {/* Bar chart */}
      <div aria-hidden="true">
        <div className="flex items-end gap-1.5 h-20">
          {chartData.map((val, i) => {
            const heightPct = Math.round((val / chartMax) * 100);
            const isToday = tab === "week" && i === new Date().getDay() - 1;
            return (
              <div
                key={DAY_LABELS[i]}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className="w-full rounded-t-md transition-all duration-500"
                  style={{
                    height: `${Math.max(heightPct, 6)}%`,
                    background: isToday
                      ? "oklch(0.65 0.18 210)"
                      : "oklch(0.65 0.18 210 / 0.45)",
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-1">
          {DAY_LABELS.map((d) => (
            <span
              key={d}
              className="text-[9px] text-muted-foreground flex-1 text-center"
            >
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-2">
        {summaryStats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-0.5 p-2.5 rounded-xl bg-muted/50 text-center"
          >
            <p className="font-bold text-foreground text-sm">{stat.value}</p>
            <p className="text-[9px] text-muted-foreground leading-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Details link */}
      <button
        type="button"
        disabled
        data-ocid="driver.stats.details_link"
        className="w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground/50 cursor-not-allowed py-1"
        aria-disabled="true"
      >
        Voir les détails
        <ArrowRight className="w-3 h-3" aria-hidden="true" />
      </button>
    </div>
  );
}
