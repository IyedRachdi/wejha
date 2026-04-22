import { r as reactExports, j as jsxRuntimeExports, c as cn, a as useNavigate } from "./index-Cs24hTMk.js";
import { u as useAuth, A as AppLayout, k as useMockMissions } from "./AppLayout-4ZKxUA7p.js";
import { B as BadgeWidget } from "./BadgeWidget-Cc4me4rW.js";
import { W as WejhaButton } from "./WejhaButton-B0Qu1nSF.js";
import "./createLucideIcon-nnWebpkL.js";
function EarningsWidget({
  totalEarnings,
  completedMissions,
  thisMonth,
  weeklyData,
  className
}) {
  const [view, setView] = reactExports.useState("month");
  const displayAmount = view === "month" ? thisMonth : totalEarnings;
  const maxBar = Math.max(...weeklyData, 1);
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const todayIdx = (/* @__PURE__ */ new Date()).getDay() === 0 ? 6 : (/* @__PURE__ */ new Date()).getDay() - 1;
  const trendPercent = 12;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "earnings.widget",
      className: cn(
        "card-elevated border border-border p-4 space-y-4",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base text-foreground", children: "Revenus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "fieldset",
            {
              className: "flex rounded-xl overflow-hidden border border-border bg-muted p-0.5 gap-0.5",
              "aria-label": "Période",
              children: ["month", "total"].map((v) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `earnings.${v}_toggle`,
                  onClick: () => setView(v),
                  "aria-pressed": view === v,
                  className: cn(
                    "px-3 py-1 text-xs font-semibold rounded-lg transition-all min-h-[28px]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    view === v ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  ),
                  children: v === "month" ? "Ce mois" : "Total"
                },
                v
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-foreground tracking-tight", children: [
              displayAmount.toFixed(0),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold text-muted-foreground ml-1", children: "DT" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              completedMissions,
              " mission",
              completedMissions !== 1 ? "s" : "",
              " ",
              "complétée",
              completedMissions !== 1 ? "s" : ""
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold",
              style: {
                background: "oklch(0.6 0.16 140 / 0.12)",
                color: "oklch(0.45 0.16 140)"
              },
              "aria-label": `Tendance: +${trendPercent}% par rapport au mois dernier`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "↑" }),
                "+",
                trendPercent,
                "% ce mois"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-label": "Graphique des gains des 7 derniers jours", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between gap-1.5 h-14", children: weeklyData.map((val, i) => {
            const heightPct = val / maxBar * 100;
            const isToday = i === todayIdx;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex-1 flex flex-col items-center gap-1 justify-end",
                title: `${days[i]}: ${val} DT`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "w-full rounded-t-md transition-all duration-500",
                      isToday ? "opacity-100" : "opacity-60"
                    ),
                    style: {
                      height: `${Math.max(heightPct, 6)}%`,
                      background: isToday ? "oklch(0.65 0.18 210)" : "oklch(0.55 0.22 310)",
                      minHeight: "4px"
                    },
                    "aria-hidden": "true"
                  }
                )
              },
              days[i]
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between mt-1", children: days.map((d, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "flex-1 text-center text-[10px]",
                i === todayIdx ? "font-bold text-foreground" : "text-muted-foreground"
              ),
              children: d
            },
            d
          )) })
        ] })
      ]
    }
  );
}
const badgeIcon = {
  bronze: "🥉",
  silver: "🥈",
  gold: "🥇"
};
const rankMedal = ["🥇", "🥈", "🥉"];
const mockLeaders = [
  {
    rank: 1,
    displayName: "Amira B.",
    badge: "gold",
    points: 2340,
    isCurrentUser: false
  },
  {
    rank: 2,
    displayName: "Yassine C.",
    badge: "gold",
    points: 2105,
    isCurrentUser: false
  },
  {
    rank: 3,
    displayName: "Ahmed K.",
    badge: "silver",
    points: 1890,
    isCurrentUser: true
  }
];
function getInitials(name) {
  const parts = name.split(" ");
  if (parts.length === 1) return name.slice(0, 2).toUpperCase();
  return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase();
}
function LeaderboardMini({ className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "leaderboard.mini.panel",
      className: cn(
        "card-elevated border border-border p-4 space-y-3",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-base text-foreground", children: "Top Helpers cette semaine 🏆" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: mockLeaders.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": `leaderboard.item.${entry.rank}`,
            className: cn(
              "flex items-center gap-3 p-3 rounded-xl transition-smooth",
              entry.isCurrentUser ? "ring-2 ring-primary/40" : "bg-muted/40"
            ),
            style: entry.isCurrentUser ? { background: "oklch(0.55 0.22 310 / 0.08)" } : void 0,
            "aria-current": entry.isCurrentUser ? "true" : void 0,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-lg w-7 text-center flex-shrink-0",
                  "aria-label": `Rang ${entry.rank}`,
                  children: rankMedal[entry.rank - 1]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold text-primary-foreground",
                  style: { background: "oklch(0.55 0.22 310)" },
                  "aria-hidden": "true",
                  children: getInitials(entry.displayName)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "text-sm font-semibold text-foreground truncate",
                        entry.isCurrentUser && "text-primary"
                      ),
                      children: entry.displayName
                    }
                  ),
                  entry.isCurrentUser && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-primary/15 text-primary flex-shrink-0", children: "Vous" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  badgeIcon[entry.badge],
                  " Helper",
                  " ",
                  entry.badge === "gold" ? "Or" : entry.badge === "silver" ? "Argent" : "Bronze"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold text-foreground flex-shrink-0", children: [
                entry.points.toLocaleString("fr-TN"),
                " pts"
              ] })
            ]
          },
          entry.rank
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "leaderboard.see_full.link",
            disabled: true,
            className: "w-full text-center text-sm font-semibold text-primary/50 py-2 cursor-not-allowed",
            "aria-label": "Voir le classement complet (bientôt disponible)",
            children: "Voir le classement complet →"
          }
        )
      ]
    }
  );
}
const categoryConfig = {
  medical: {
    icon: "🏥",
    label: "Médical",
    color: "text-rose-700",
    bg: "bg-rose-50"
  },
  transport: {
    icon: "🚗",
    label: "Transport",
    color: "text-blue-700",
    bg: "bg-blue-50"
  },
  shopping: {
    icon: "🛒",
    label: "Courses",
    color: "text-orange-700",
    bg: "bg-orange-50"
  },
  homeHelp: {
    icon: "🏠",
    label: "Aide à domicile",
    color: "text-green-700",
    bg: "bg-green-50"
  },
  other: {
    icon: "💼",
    label: "Autre",
    color: "text-purple-700",
    bg: "bg-purple-50"
  }
};
function formatDuration(minutes) {
  if (minutes < 60) return `${minutes}min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h${m}` : `${h}h`;
}
function formatSchedule(ts) {
  if (!ts) return null;
  const diff = ts - Date.now();
  if (diff < 0) return "Maintenant";
  const h = Math.floor(diff / 36e5);
  const m = Math.floor(diff % 36e5 / 6e4);
  if (h === 0) return `Dans ${m} min`;
  if (m === 0) return `Dans ${h}h`;
  return `Dans ${h}h${m}`;
}
function MissionCard({
  mission,
  onAccept,
  onComplete,
  isActive = false,
  className
}) {
  const cat = categoryConfig[mission.category];
  const scheduleLabel = formatSchedule(mission.scheduledAt);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `mission.card.${mission.id}`,
      className: cn(
        "card-elevated p-4 flex flex-col gap-3 border",
        isActive ? "border-secondary/50 ring-2 ring-secondary/30" : "border-border",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0",
                  cat.bg
                ),
                "aria-hidden": "true",
                children: cat.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "text-xs font-semibold uppercase tracking-wide",
                    cat.color
                  ),
                  children: cat.label
                }
              ),
              mission.isUrgent && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-semibold", children: "🔴 Urgent" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                "data-ocid": `mission.points_badge.${mission.id}`,
                className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold",
                style: {
                  background: "oklch(0.65 0.18 210 / 0.15)",
                  color: "oklch(0.45 0.18 210)"
                },
                children: [
                  "+",
                  mission.pointsReward,
                  " pts"
                ]
              }
            ),
            isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold",
                style: {
                  background: "oklch(0.55 0.22 310 / 0.12)",
                  color: "oklch(0.45 0.22 310)"
                },
                children: "⚡ En cours"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm text-foreground font-medium leading-snug line-clamp-2",
            title: mission.description,
            children: mission.description
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "📍" }),
          mission.address
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "⏱" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: formatDuration(mission.durationMinutes) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "💰" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
              mission.payoutAmount,
              " DT"
            ] })
          ] }),
          scheduleLabel && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground", children: [
            "🕐 ",
            scheduleLabel
          ] })
        ] }),
        isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          WejhaButton,
          {
            "data-ocid": `mission.complete_button.${mission.id}`,
            variant: "secondary",
            size: "sm",
            fullWidth: true,
            onClick: () => onComplete == null ? void 0 : onComplete(mission),
            "aria-label": "Marquer cette mission comme terminée",
            children: "✅ Marquer comme terminé"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          WejhaButton,
          {
            "data-ocid": `mission.accept_button.${mission.id}`,
            variant: "primary",
            size: "sm",
            fullWidth: true,
            onClick: () => onAccept == null ? void 0 : onAccept(mission),
            "aria-label": `Accepter la mission: ${mission.description}`,
            children: "Accepter"
          }
        )
      ]
    }
  );
}
const BADGE_TIERS = [
  { badge: "bronze", label: "Helper Bronze", icon: "🥉", minPts: 0 },
  { badge: "silver", label: "Helper Argent", icon: "🥈", minPts: 500 },
  { badge: "gold", label: "Helper Or", icon: "🥇", minPts: 1500 }
];
function determineBadge(pts) {
  if (pts >= 1500) return "gold";
  if (pts >= 500) return "silver";
  return "bronze";
}
const REWARDS = [
  {
    id: "r-1",
    title: "10% de réduction",
    desc: "Sur votre prochain abonnement premium",
    icon: "🎟️",
    variant: "secondary",
    ocid: "reward.discount"
  },
  {
    id: "r-2",
    title: "Accès prioritaire",
    desc: "Missions prioritaires pendant 7 jours",
    icon: "⚡",
    variant: "primary",
    ocid: "reward.priority"
  }
];
function AchievementModal({
  badge,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-end justify-center p-4 backdrop-blur-sm w-full h-full max-w-none m-0 bg-transparent",
      style: { background: "oklch(0.18 0.02 280 / 0.5)" },
      "aria-labelledby": "achievement-title",
      "data-ocid": "achievement.dialog",
      onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated border border-border w-full max-w-sm p-6 text-center space-y-4 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-6xl block", "aria-hidden": "true", children: badge.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "achievement-title",
              className: "font-bold text-xl text-foreground",
              children: badge.label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            "Débloqué à ",
            badge.minPts,
            " points — continuez sur votre lancée !"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WejhaButton,
          {
            variant: "primary",
            size: "md",
            fullWidth: true,
            onClick: onClose,
            "data-ocid": "achievement.close_button",
            children: "Super ! 🎉"
          }
        )
      ] })
    }
  );
}
function StudentDashboardPage() {
  var _a;
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const allMissions = useMockMissions();
  const points = (userProfile == null ? void 0 : userProfile.points) ?? 142;
  const totalEarnings = (userProfile == null ? void 0 : userProfile.totalEarnings) ?? 185;
  const completedCount = (userProfile == null ? void 0 : userProfile.completedMissions) ?? 12;
  const firstName = ((_a = userProfile == null ? void 0 : userProfile.name) == null ? void 0 : _a.split(" ")[0]) ?? "Ahmed";
  const thisMonthEarnings = 95;
  const weeklyData = [20, 35, 15, 40, 25, 30, 10];
  const currentBadge = determineBadge(points);
  const currentTierIdx = BADGE_TIERS.findIndex((t) => t.badge === currentBadge);
  const nextTier = BADGE_TIERS[currentTierIdx + 1];
  const pointsToNext = nextTier ? nextTier.minPts - points : 0;
  const [activeMission, setActiveMission] = reactExports.useState(null);
  const [completedIds, setCompletedIds] = reactExports.useState(/* @__PURE__ */ new Set());
  const [showAllMissions, setShowAllMissions] = reactExports.useState(false);
  const [selectedBadge, setSelectedBadge] = reactExports.useState(null);
  const availableMissions = allMissions.filter(
    (m) => m.id !== (activeMission == null ? void 0 : activeMission.id) && !completedIds.has(m.id)
  );
  const displayedMissions = showAllMissions ? availableMissions : availableMissions.slice(0, 3);
  function handleAccept(mission) {
    setActiveMission(mission);
  }
  function handleComplete(mission) {
    setCompletedIds((prev) => /* @__PURE__ */ new Set([...prev, mission.id]));
    setActiveMission(null);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AppLayout,
    {
      activeTab: "home",
      onTabChange: (_, route) => navigate({ to: route }),
      title: "Wejha",
      userRole: "student",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "dashboard.header.section",
              className: "relative overflow-hidden px-4 pt-6 pb-10",
              style: {
                background: "linear-gradient(145deg, oklch(0.65 0.18 210) 0%, oklch(0.50 0.22 310) 100%)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute -top-12 -right-12 w-52 h-52 rounded-full opacity-15 pointer-events-none",
                    style: { background: "oklch(1 0 0)" },
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10 pointer-events-none",
                    style: { background: "oklch(1 0 0)" },
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-start justify-between gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/75 text-sm font-medium", children: "Tableau de bord étudiant" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "h1",
                      {
                        "data-ocid": "dashboard.greeting",
                        className: "font-display font-bold text-[26px] text-primary-foreground mt-0.5 leading-tight",
                        children: [
                          "Bonjour, ",
                          firstName,
                          "! 🎓"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-baseline gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-4xl text-primary-foreground tabular-nums", children: points }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/75 text-base font-medium", children: "pts" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary-foreground/90 text-sm font-semibold mt-0.5", children: [
                      "Helper",
                      " ",
                      currentBadge === "gold" ? "Or" : currentBadge === "silver" ? "Argent" : "Bronze"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    BadgeWidget,
                    {
                      badge: currentBadge,
                      points,
                      showProgress: true,
                      className: "flex-shrink-0 w-[118px] !border-primary-foreground/20 !bg-primary-foreground/10"
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              "data-ocid": "dashboard.stats.section",
              className: "px-4 -mt-5 relative z-10",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2.5", children: [
                {
                  value: String(availableMissions.length + completedIds.size),
                  label: "Missions ce mois",
                  icon: "📋",
                  ocid: "stats.missions.card"
                },
                {
                  value: `${totalEarnings} DT`,
                  label: "Gains totaux",
                  icon: "💰",
                  ocid: "stats.earnings.card"
                },
                {
                  value: pointsToNext > 0 ? `${pointsToNext} pts` : "MAX ✨",
                  label: "Points restants",
                  icon: "🎯",
                  ocid: "stats.next_badge.card"
                }
              ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": s.ocid,
                  className: "card-elevated border border-border p-3 text-center space-y-1",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl block", "aria-hidden": "true", children: s.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground leading-none", children: s.value }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight", children: s.label })
                  ]
                },
                s.ocid
              )) })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              "data-ocid": "badge.progression.section",
              className: "mt-6 px-4 space-y-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-base text-foreground", children: "Votre progression" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated border border-border p-4 space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-stretch gap-2", children: BADGE_TIERS.map((tier) => {
                    const isUnlocked = points >= tier.minPts;
                    const isCurrent = tier.badge === currentBadge;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        "data-ocid": `badge.tier.${tier.badge}`,
                        onClick: () => isUnlocked && setSelectedBadge(tier),
                        disabled: !isUnlocked,
                        className: "flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed",
                        style: isCurrent ? {
                          background: "oklch(0.55 0.22 310 / 0.1)",
                          border: "2px solid oklch(0.55 0.22 310 / 0.5)"
                        } : isUnlocked ? {
                          background: "oklch(0.65 0.18 210 / 0.08)",
                          border: "2px solid transparent"
                        } : {
                          background: "oklch(0.92 0.01 270)",
                          border: "2px solid transparent",
                          opacity: 0.5
                        },
                        "aria-pressed": isCurrent,
                        "aria-label": `${tier.label}${isUnlocked ? " — débloqué" : " — non débloqué"}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: isUnlocked ? "text-2xl" : "text-2xl grayscale",
                              "aria-hidden": "true",
                              children: tier.icon
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-foreground text-center", children: tier.badge === "bronze" ? "Bronze" : tier.badge === "silver" ? "Argent" : "Or" }),
                          isCurrent && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-[9px] font-bold px-1.5 py-0.5 rounded-full text-primary-foreground",
                              style: { background: "oklch(0.55 0.22 310)" },
                              children: "Actuel"
                            }
                          ),
                          !isUnlocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-muted-foreground", children: [
                            tier.minPts,
                            " pts"
                          ] })
                        ]
                      },
                      tier.badge
                    );
                  }) }),
                  currentBadge !== "gold" && nextTier ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                        points,
                        " pts"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                        nextTier.label,
                        " à ",
                        nextTier.minPts,
                        " pts"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2.5 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "h-full rounded-full transition-all duration-700",
                        style: {
                          width: `${Math.min(100, points / nextTier.minPts * 100)}%`,
                          background: "linear-gradient(90deg, oklch(0.55 0.22 310), oklch(0.65 0.18 210))"
                        },
                        role: "progressbar",
                        tabIndex: 0,
                        "aria-valuenow": points,
                        "aria-valuemin": 0,
                        "aria-valuemax": nextTier.minPts,
                        "aria-label": `Progression vers ${nextTier.label}`
                      }
                    ) })
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "text-xs font-semibold text-center",
                      style: { color: "oklch(0.6 0.15 85)" },
                      children: "✨ Niveau maximum atteint ! Vous êtes un Helper Or."
                    }
                  )
                ] })
              ]
            }
          ),
          activeMission && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              "data-ocid": "active_mission.section",
              className: "mt-6 px-4 space-y-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0",
                      style: { background: "oklch(0.65 0.18 210)" },
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-base text-foreground", children: "Mission en cours" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  MissionCard,
                  {
                    mission: activeMission,
                    isActive: true,
                    onComplete: handleComplete
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              "data-ocid": "missions.section",
              className: "mt-6 px-4 space-y-3",
              "aria-labelledby": "missions-heading",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      id: "missions-heading",
                      className: "font-bold text-base text-foreground",
                      children: "Missions disponibles"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-primary-foreground",
                      style: { background: "oklch(0.55 0.22 310)" },
                      "aria-label": `${availableMissions.length} missions`,
                      children: availableMissions.length
                    }
                  )
                ] }) }),
                availableMissions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": "missions.empty_state",
                    className: "card-elevated border border-border p-8 text-center space-y-2",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl", "aria-hidden": "true", children: "🎉" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Toutes les missions acceptées !" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Revenez bientôt pour de nouvelles missions." })
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  displayedMissions.map((mission, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    MissionCard,
                    {
                      mission,
                      onAccept: handleAccept,
                      isActive: false,
                      "data-ocid": `missions.item.${idx + 1}`
                    },
                    mission.id
                  )),
                  availableMissions.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": "missions.see_all.link",
                      onClick: () => setShowAllMissions((v) => !v),
                      className: "w-full text-center text-sm font-semibold py-3 rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] text-primary hover:bg-primary/5",
                      style: { borderColor: "oklch(0.55 0.22 310 / 0.3)" },
                      children: showAllMissions ? "Réduire ↑" : `Voir toutes les missions (${availableMissions.length}) →`
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EarningsWidget,
            {
              totalEarnings,
              completedMissions: completedCount,
              thisMonth: thisMonthEarnings,
              weeklyData
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "section",
            {
              "data-ocid": "rewards.section",
              className: "mt-6 px-4 space-y-3",
              "aria-labelledby": "rewards-heading",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h2",
                  {
                    id: "rewards-heading",
                    className: "font-bold text-base text-foreground",
                    children: "Vos récompenses"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: REWARDS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": r.ocid,
                    className: "card-elevated border border-border p-4 flex flex-col gap-3",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl block", "aria-hidden": "true", children: r.icon }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground leading-tight", children: r.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-snug", children: r.desc })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        WejhaButton,
                        {
                          "data-ocid": `${r.ocid}.use_button`,
                          variant: r.variant,
                          size: "sm",
                          fullWidth: true,
                          "aria-label": `Utiliser: ${r.title}`,
                          children: "Utiliser"
                        }
                      )
                    ]
                  },
                  r.id
                )) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeaderboardMini, { currentUserId: userProfile == null ? void 0 : userProfile.id }) })
        ] }),
        selectedBadge && /* @__PURE__ */ jsxRuntimeExports.jsx(
          AchievementModal,
          {
            badge: selectedBadge,
            onClose: () => setSelectedBadge(null)
          }
        )
      ]
    }
  );
}
export {
  StudentDashboardPage as default
};
