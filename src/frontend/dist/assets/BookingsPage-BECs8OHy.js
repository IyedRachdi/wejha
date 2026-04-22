import { a as useNavigate, r as reactExports, j as jsxRuntimeExports, c as cn } from "./index-Cs24hTMk.js";
import { A as AppLayout, a as useMockBookings } from "./AppLayout-4ZKxUA7p.js";
import { B as BookingStatusBar } from "./BookingStatusBar-AqFQZ1Fr.js";
import { V as VerifiedBadge } from "./VerifiedBadge-7MMTujfv.js";
import { W as WejhaButton } from "./WejhaButton-B0Qu1nSF.js";
import "./createLucideIcon-nnWebpkL.js";
import "./circle-check-big-BQXcWwZR.js";
const TABS = [
  { key: "active", label: "En cours" },
  { key: "completed", label: "Terminées" },
  { key: "cancelled", label: "Annulées" }
];
const ACTIVE_STATUSES = [
  "requested",
  "confirmed",
  "enRoute",
  "arrived"
];
const statusChipColors = {
  requested: {
    bg: "oklch(0.72 0.15 85 / 0.15)",
    text: "oklch(0.50 0.15 75)",
    label: "En attente"
  },
  confirmed: {
    bg: "oklch(0.65 0.18 260 / 0.15)",
    text: "oklch(0.45 0.18 255)",
    label: "Confirmé"
  },
  enRoute: {
    bg: "oklch(0.55 0.22 310 / 0.12)",
    text: "oklch(0.45 0.22 310)",
    label: "En route"
  },
  arrived: {
    bg: "oklch(0.65 0.18 210 / 0.12)",
    text: "oklch(0.45 0.18 210)",
    label: "Arrivé"
  },
  completed: {
    bg: "oklch(0.6 0.16 140 / 0.12)",
    text: "oklch(0.42 0.16 140)",
    label: "Terminé"
  },
  cancelled: {
    bg: "oklch(0.55 0.24 25 / 0.12)",
    text: "oklch(0.42 0.24 25)",
    label: "Annulé"
  }
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
  homeHelp: "Aide à domicile",
  other: "Autre"
};
function formatRelativeDate(ts) {
  const diff = Date.now() - ts;
  const minutes = Math.floor(diff / 6e4);
  const hours = Math.floor(diff / 36e5);
  const days = Math.floor(diff / 864e5);
  if (minutes < 60) return `Il y a ${minutes} min`;
  if (hours < 24) return `Il y a ${hours}h`;
  return `Il y a ${days}j`;
}
function EmptyState({ tab }) {
  const content = {
    active: {
      icon: "📋",
      msg: "Aucune réservation en cours",
      sub: "Réservez un service pour commencer"
    },
    completed: {
      icon: "✅",
      msg: "Aucune réservation terminée",
      sub: "Vos prestations passées apparaîtront ici"
    },
    cancelled: {
      icon: "🚫",
      msg: "Aucune réservation annulée",
      sub: "Bonne nouvelle !"
    }
  }[tab];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-16 rounded-2xl bg-muted/30 border border-border",
      "data-ocid": "bookings.empty_state",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-3", "aria-hidden": "true", children: content.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base", children: content.msg }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 text-center", children: content.sub })
      ]
    }
  );
}
function BookingItem({
  booking,
  index,
  onPress
}) {
  const chip = statusChipColors[booking.status];
  const isActive = ACTIVE_STATUSES.includes(booking.status);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": `bookings.item.${index}`,
      onClick: onPress,
      className: cn(
        "w-full text-left bg-card rounded-2xl border border-border p-4 space-y-3",
        "hover:shadow-md hover:border-primary/20 transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      ),
      "aria-label": `Réservation : ${booking.description}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", "aria-hidden": "true", children: serviceIcons[booking.serviceType] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-semibold px-2.5 py-1 rounded-full",
                style: {
                  background: "oklch(0.55 0.22 310 / 0.1)",
                  color: "oklch(0.45 0.22 310)"
                },
                children: serviceLabels[booking.serviceType]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0",
              style: { background: chip.bg, color: chip.text },
              "data-ocid": `bookings.status_chip.${index}`,
              children: chip.label
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground line-clamp-2 leading-snug", children: booking.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 min-w-0", children: booking.providerName ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0",
                style: { background: "oklch(0.55 0.22 310)" },
                "aria-hidden": "true",
                children: booking.providerName.charAt(0)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium", children: booking.providerName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(VerifiedBadge, {})
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "En attente d'attribution" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0", children: formatRelativeDate(booking.createdAt) })
        ] }),
        isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBar, { status: booking.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            booking.estimatedDuration,
            " min estimé"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "font-bold text-sm",
              style: { color: "oklch(0.55 0.22 310)" },
              children: [
                booking.price,
                " DT"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function BookingsPage() {
  var _a;
  const navigate = useNavigate();
  const allBookings = useMockBookings();
  const [activeTab, setActiveTab] = reactExports.useState("active");
  const tabBookings = {
    active: allBookings.filter((b) => ACTIVE_STATUSES.includes(b.status)),
    completed: allBookings.filter((b) => b.status === "completed"),
    cancelled: allBookings.filter((b) => b.status === "cancelled")
  };
  const visibleBookings = tabBookings[activeTab];
  function handleTabChange(_key, route) {
    navigate({ to: route });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppLayout,
    {
      activeTab: "bookings",
      onTabChange: handleTabChange,
      title: "Réservations",
      userRole: "pmr",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-5 pb-6 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl text-foreground", children: "Mes Réservations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Gérez et suivez vos prestations" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex-1 rounded-xl p-3 text-center bg-card border border-border",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-bold text-lg",
                  style: { color: "oklch(0.55 0.22 310)" },
                  children: tabBookings[tab.key].length
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-medium mt-0.5", children: tab.label })
            ]
          },
          tab.key
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex border-b border-border",
            role: "tablist",
            "aria-label": "Filtrer les réservations",
            "data-ocid": "bookings.tabs.section",
            children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                role: "tab",
                "data-ocid": `bookings.${tab.key}.tab`,
                "aria-selected": activeTab === tab.key,
                onClick: () => setActiveTab(tab.key),
                className: cn(
                  "flex-1 py-3 text-sm font-semibold transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
                  activeTab !== tab.key && "text-muted-foreground hover:text-foreground"
                ),
                style: activeTab === tab.key ? {
                  color: "oklch(0.45 0.22 310)",
                  borderBottom: "2px solid oklch(0.55 0.22 310)",
                  marginBottom: "-1px"
                } : {},
                children: [
                  tab.label,
                  tabBookings[tab.key].length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "ml-1.5 text-xs px-1.5 py-0.5 rounded-full",
                      style: activeTab === tab.key ? {
                        background: "oklch(0.55 0.22 310 / 0.12)",
                        color: "oklch(0.45 0.22 310)"
                      } : {
                        background: "oklch(0.92 0.01 270)",
                        color: "oklch(0.48 0.008 280)"
                      },
                      children: tabBookings[tab.key].length
                    }
                  )
                ]
              },
              tab.key
            ))
          }
        ),
        visibleBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { tab: activeTab }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            role: "tabpanel",
            "aria-label": (_a = TABS.find((t) => t.key === activeTab)) == null ? void 0 : _a.label,
            "data-ocid": "bookings.list",
            className: "space-y-3",
            children: visibleBookings.map((booking, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              BookingItem,
              {
                booking,
                index: idx + 1,
                onPress: () => navigate({ to: `/booking/${booking.id}` })
              },
              booking.id
            ))
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WejhaButton,
          {
            variant: "primary",
            size: "lg",
            fullWidth: true,
            onClick: () => navigate({ to: "/search" }),
            "data-ocid": "bookings.new_booking.button",
            children: "+ Nouvelle réservation"
          }
        )
      ] })
    }
  );
}
export {
  BookingsPage as default
};
