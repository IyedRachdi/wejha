import { r as reactExports, j as jsxRuntimeExports, c as cn, a as useNavigate } from "./index-Cs24hTMk.js";
import { l as Slot, u as useAuth, A as AppLayout, L as Label, j as Switch, a as useMockBookings } from "./AppLayout-4ZKxUA7p.js";
import { S as StarRating } from "./StarRating-Dm-NFMtj.js";
import { c as createLucideIcon } from "./createLucideIcon-nnWebpkL.js";
import { W as WejhaButton } from "./WejhaButton-B0Qu1nSF.js";
import { M as MapPin } from "./map-pin-C-tS1rCw.js";
import { V as VerifiedBadge } from "./VerifiedBadge-7MMTujfv.js";
import { c as cva } from "./index-D7MJk4CF.js";
import { m as motion } from "./proxy-3RPPOCwZ.js";
import { C as CircleCheckBig } from "./circle-check-big-BQXcWwZR.js";
import { P as Plus } from "./plus-C8TWsIQI.js";
import { P as Phone } from "./phone-5WStyZPG.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode);
const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
function DriverStatsWidget({
  dailyEarnings,
  weeklyData,
  totalMissions,
  avgRating
}) {
  const [tab, setTab] = reactExports.useState("week");
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
      value: `${displayTotal} TND`
    },
    { label: "Missions", value: String(totalMissions) },
    {
      label: "Moyenne/jour",
      value: `${tab === "week" ? avgPerDay : Math.round(monthlyTotal / 30)} TND`
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 rounded-2xl bg-card border border-border space-y-4",
      "aria-label": "Statistiques hebdomadaires conducteur",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground text-sm", children: [
            "Statistiques — ",
            tab === "week" ? "Cette semaine" : "Ce mois"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "flex rounded-lg overflow-hidden border border-border",
              role: "tablist",
              "aria-label": "Période des statistiques",
              children: ["week", "month"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  role: "tab",
                  type: "button",
                  "data-ocid": `driver.stats.${t}_tab`,
                  "aria-selected": tab === t,
                  onClick: () => setTab(t),
                  className: cn(
                    "px-3 py-1.5 text-xs font-medium transition-colors min-h-[32px]",
                    tab === t ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
                  ),
                  children: t === "week" ? "Semaine" : "Mois"
                },
                t
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 rounded-xl",
            style: {
              background: "oklch(0.65 0.18 210 / 0.08)",
              border: "1px solid oklch(0.65 0.18 210 / 0.2)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Aujourd'hui" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-xl font-bold",
                    style: { color: "oklch(0.50 0.18 210)" },
                    children: [
                      dailyEarnings,
                      " TND"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: avgRating, size: "sm" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end gap-1.5 h-20", children: chartData.map((val, i) => {
            const heightPct = Math.round(val / chartMax * 100);
            const isToday = tab === "week" && i === (/* @__PURE__ */ new Date()).getDay() - 1;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex-1 flex flex-col items-center gap-1",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-full rounded-t-md transition-all duration-500",
                    style: {
                      height: `${Math.max(heightPct, 6)}%`,
                      background: isToday ? "oklch(0.65 0.18 210)" : "oklch(0.65 0.18 210 / 0.45)"
                    }
                  }
                )
              },
              DAY_LABELS[i]
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between mt-1", children: DAY_LABELS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-[9px] text-muted-foreground flex-1 text-center",
              children: d
            },
            d
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: summaryStats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-0.5 p-2.5 rounded-xl bg-muted/50 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: stat.value }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground leading-tight", children: stat.label })
            ]
          },
          stat.label
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            disabled: true,
            "data-ocid": "driver.stats.details_link",
            className: "w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground/50 cursor-not-allowed py-1",
            "aria-disabled": "true",
            children: [
              "Voir les détails",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3", "aria-hidden": "true" })
            ]
          }
        )
      ]
    }
  );
}
const serviceLabels$1 = {
  medical: { label: "Médical", icon: "🏥" },
  transport: { label: "Transport", icon: "🚗" },
  shopping: { label: "Courses", icon: "🛒" },
  homeHelp: { label: "Aide domicile", icon: "🏠" },
  other: { label: "Autre", icon: "✨" }
};
function getInitials(fullName) {
  return fullName.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}
function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 6e4);
  if (diff < 1) return "À l'instant";
  if (diff === 1) return "il y a 1 min";
  return `il y a ${diff} min`;
}
function estimatedPayout(price) {
  return `~${price} DT`;
}
function MissionQueueCard({
  booking,
  onAccept,
  onDecline,
  isPriority = false,
  index = 1
}) {
  var _a;
  const clientFirstName = ((_a = booking.providerName) == null ? void 0 : _a.split(" ")[0]) ?? "Client";
  const initials = getInitials(booking.providerName ?? "CL");
  const service = serviceLabels$1[booking.serviceType];
  const timeReceived = timeAgo(booking.createdAt);
  const payout = estimatedPayout(booking.price);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `driver.mission_queue.item.${index}`,
      className: cn(
        "relative p-4 rounded-2xl border shadow-xs space-y-3 transition-smooth",
        isPriority ? "bg-primary/5 border-primary/30" : "bg-card border-border"
      ),
      children: [
        isPriority && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold",
            style: {
              background: "oklch(0.55 0.22 310 / 0.15)",
              color: "oklch(0.45 0.22 310)",
              border: "1px solid oklch(0.55 0.22 310 / 0.3)"
            },
            "aria-label": "Mission prioritaire",
            children: "⭐ Prioritaire"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground flex-shrink-0",
              style: { background: "oklch(0.55 0.22 310)" },
              "aria-hidden": "true",
              children: initials
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm truncate", children: clientFirstName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", "aria-hidden": "true", children: service == null ? void 0 : service.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: service == null ? void 0 : service.label })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "font-bold text-base",
                style: { color: "oklch(0.55 0.20 200)" },
                children: payout
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: timeReceived })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            MapPin,
            {
              className: "w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-1 min-w-0", children: booking.address })
        ] }),
        booking.providerRating && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: booking.providerRating, size: "sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: booking.providerRating })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            WejhaButton,
            {
              "data-ocid": `driver.mission_queue.decline_button.${index}`,
              variant: "ghost",
              size: "sm",
              className: "flex-1",
              onClick: () => onDecline(booking.id),
              "aria-label": "Décliner cette mission",
              children: "Décliner"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            WejhaButton,
            {
              "data-ocid": `driver.mission_queue.accept_button.${index}`,
              variant: "secondary",
              size: "sm",
              className: "flex-1 font-bold",
              onClick: () => onAccept(booking.id),
              "aria-label": "Accepter cette mission",
              children: "Accepter"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-center text-[10px] text-muted-foreground/60 pt-0.5",
            "aria-hidden": "true",
            children: "Glissez pour accepter"
          }
        )
      ]
    }
  );
}
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
const mockDriver = {
  name: "Riadh Hamdi",
  rating: 4.8,
  todayEarnings: 120,
  completedToday: 6,
  weeklyData: [55, 80, 48, 95, 70, 120, 65],
  totalMissions: 210
};
const serviceIcons = {
  medical: "🏥",
  transport: "🚗",
  shopping: "🛒",
  homeHelp: "🏠",
  other: "✨"
};
const serviceLabels = {
  medical: "Médical",
  transport: "Transport",
  shopping: "Courses",
  homeHelp: "Aide domicile",
  other: "Autre"
};
function DriverDashboardPage() {
  var _a;
  const [activeTab, setActiveTab] = reactExports.useState("home");
  const [isAvailable, setIsAvailable] = reactExports.useState(true);
  const [etaMinutes, setEtaMinutes] = reactExports.useState(12);
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const bookings = useMockBookings();
  const activeMission = bookings.find(
    (b) => ["confirmed", "enRoute", "arrived"].includes(b.status)
  );
  const queuedMissions = bookings.filter((b) => b.status === "requested");
  const effectiveRole = userRole ?? "driver";
  const isDriver = effectiveRole === "driver";
  const pageTitle = isDriver ? "Tableau de bord Conducteur" : "Tableau de bord Prestataire";
  function handleTabChange(key, route) {
    setActiveTab(key);
    navigate({ to: route });
  }
  const dailyStats = [
    {
      label: "Aujourd'hui",
      value: `${mockDriver.todayEarnings} TND`,
      icon: "💰"
    },
    {
      label: "Missions",
      value: String(mockDriver.completedToday),
      icon: "✅"
    },
    {
      label: "Note moyenne",
      value: null,
      icon: null,
      rating: mockDriver.rating
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppLayout,
    {
      activeTab,
      onTabChange: handleTabChange,
      title: pageTitle,
      userRole: effectiveRole,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            className: "flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-2xl text-foreground", children: [
                  "Bonjour, ",
                  mockDriver.name.split(" ")[0],
                  " 👋"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: isAvailable ? "Vous êtes en service" : "Vous êtes hors service" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap",
                  style: {
                    background: "oklch(0.65 0.18 210 / 0.15)",
                    color: "oklch(0.45 0.18 210)",
                    border: "1px solid oklch(0.65 0.18 210 / 0.4)"
                  },
                  "aria-label": "Certifié Label PMR",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
                    "Label PMR ✓"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 10 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.06 },
            "data-ocid": "driver.availability.card",
            className: cn(
              "p-4 rounded-2xl border shadow-xs transition-all duration-300",
              isAvailable ? "border-success/30" : "bg-muted/40 border-border"
            ),
            style: isAvailable ? { background: "oklch(0.6 0.16 140 / 0.06)" } : void 0,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "w-2.5 h-2.5 rounded-full flex-shrink-0",
                        isAvailable ? "bg-success animate-pulse" : "bg-muted-foreground"
                      ),
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: cn(
                        "font-bold text-base",
                        isAvailable ? "text-success" : "text-muted-foreground"
                      ),
                      children: isAvailable ? "En service" : "Hors service"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pl-4", children: "Dernière mise à jour: il y a 5 min" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "availability-toggle", className: "sr-only", children: "Activer la disponibilité" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: "availability-toggle",
                    "data-ocid": "driver.availability.switch",
                    checked: isAvailable,
                    onCheckedChange: setIsAvailable,
                    "aria-label": isAvailable ? "Passer hors service" : "Passer en service",
                    className: "data-[state=checked]:bg-success"
                  }
                )
              ] })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "transition-opacity duration-300",
              !isAvailable && "opacity-40 pointer-events-none select-none"
            ),
            children: [
              activeMission && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.section,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.1 },
                  "aria-labelledby": "active-mission-heading",
                  className: "p-4 rounded-2xl border shadow-sm space-y-3",
                  style: {
                    background: "linear-gradient(135deg, oklch(0.55 0.22 310 / 0.05), oklch(0.65 0.18 210 / 0.05))",
                    borderColor: "oklch(0.55 0.22 310 / 0.25)"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "h3",
                      {
                        id: "active-mission-heading",
                        className: "font-bold text-foreground text-base",
                        children: "Mission en cours 🚗"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-primary-foreground flex-shrink-0",
                          style: { background: "oklch(0.55 0.22 310)" },
                          "aria-hidden": "true",
                          children: activeMission.providerName ? activeMission.providerName.split(" ").map((w) => w[0]).slice(0, 2).join("") : "CL"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: ((_a = activeMission.providerName) == null ? void 0 : _a.split(" ")[0]) ?? "Client" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: serviceIcons[activeMission.serviceType] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: serviceLabels[activeMission.serviceType] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            MapPin,
                            {
                              className: "w-3 h-3 text-muted-foreground",
                              "aria-hidden": "true"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: activeMission.address })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(VerifiedBadge, { variant: "small" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-xl bg-background border border-border", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-medium", children: "Temps estimé restant:" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "driver.active_mission.eta_minus.button",
                            onClick: () => setEtaMinutes((v) => Math.max(1, v - 1)),
                            className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] min-w-[44px]",
                            "aria-label": "Diminuer le temps estimé",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5", "aria-hidden": "true" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-foreground text-base w-14 text-center", children: [
                          etaMinutes,
                          " min"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            "data-ocid": "driver.active_mission.eta_plus.button",
                            onClick: () => setEtaMinutes((v) => v + 1),
                            className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] min-w-[44px]",
                            "aria-label": "Augmenter le temps estimé",
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5", "aria-hidden": "true" })
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        WejhaButton,
                        {
                          "data-ocid": "driver.active_mission.contact_button",
                          variant: "ghost",
                          size: "sm",
                          className: "flex-1",
                          "aria-label": "Contacter le client",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4", "aria-hidden": "true" }),
                            "Contacter"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        WejhaButton,
                        {
                          "data-ocid": "driver.active_mission.complete_button",
                          variant: "secondary",
                          size: "sm",
                          className: "flex-1 font-bold",
                          children: "Mission terminée ✓"
                        }
                      )
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.section,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.14 },
                  "aria-labelledby": "queue-heading",
                  className: activeMission ? "mt-5" : "",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "h3",
                        {
                          id: "queue-heading",
                          className: "font-semibold text-foreground text-base",
                          children: "Nouvelles demandes"
                        }
                      ),
                      queuedMissions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          "data-ocid": "driver.mission_queue.count_badge",
                          variant: "secondary",
                          className: "text-xs font-bold",
                          children: queuedMissions.length
                        }
                      )
                    ] }),
                    queuedMissions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        "data-ocid": "driver.mission_queue.empty_state",
                        className: "flex flex-col items-center justify-center py-12 gap-3 text-center rounded-2xl bg-muted/40 border border-border",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl", "aria-hidden": "true", children: "🌙" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: "Aucune nouvelle demande pour l'instant" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-[200px]", children: "Les nouvelles missions apparaîtront ici" })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: queuedMissions.map((booking, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        initial: { opacity: 0, y: 8 },
                        animate: { opacity: 1, y: 0 },
                        transition: { delay: 0.14 + i * 0.07 },
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          MissionQueueCard,
                          {
                            booking,
                            onAccept: (id) => console.log("accept", id),
                            onDecline: (id) => console.log("decline", id),
                            isPriority: booking.price >= 30,
                            index: i + 1
                          }
                        )
                      },
                      booking.id
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.2 },
                  className: "grid grid-cols-3 gap-3 mt-5",
                  children: dailyStats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex flex-col items-center gap-1 p-3 rounded-2xl bg-card border border-border text-center",
                      "data-ocid": `driver.daily_stat.${stat.label.toLowerCase().replace(/[\s']/g, "_")}.card`,
                      children: [
                        stat.rating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: stat.rating, size: "sm" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: stat.rating })
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", "aria-hidden": "true", children: stat.icon }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: stat.value })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground leading-tight", children: stat.label })
                      ]
                    },
                    stat.label
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.26 },
                  className: "mt-5",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DriverStatsWidget,
                    {
                      dailyEarnings: mockDriver.todayEarnings,
                      weeklyData: mockDriver.weeklyData,
                      totalMissions: mockDriver.totalMissions,
                      avgRating: mockDriver.rating
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 10 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.32 },
                  className: "mt-5 flex justify-center",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm shadow-sm",
                      style: {
                        background: "oklch(0.65 0.18 210 / 0.12)",
                        color: "oklch(0.40 0.18 210)",
                        border: "1.5px solid oklch(0.65 0.18 210 / 0.4)"
                      },
                      "aria-label": "Label PMR certifié par Wejha",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5", "aria-hidden": "true" }),
                        "Label PMR Certifié ✓"
                      ]
                    }
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4" })
      ] })
    }
  );
}
export {
  DriverDashboardPage as default
};
