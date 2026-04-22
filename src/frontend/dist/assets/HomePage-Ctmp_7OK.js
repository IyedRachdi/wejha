import { j as jsxRuntimeExports, a as useNavigate, c as cn } from "./index-Cs24hTMk.js";
import { u as useAuth, A as AppLayout, a as useMockBookings } from "./AppLayout-4ZKxUA7p.js";
import { B as BookingStatusBar } from "./BookingStatusBar-AqFQZ1Fr.js";
import { W as WejhaButton } from "./WejhaButton-B0Qu1nSF.js";
import { c as createLucideIcon } from "./createLucideIcon-nnWebpkL.js";
import { S as Star } from "./star-LV77aeJO.js";
import { S as Shield } from "./shield-CZXb-rDq.js";
import { M as MapPin } from "./map-pin-C-tS1rCw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const benefits = [
  { icon: Zap, text: "Accès prioritaire aux prestataires disponibles" },
  { icon: Star, text: "Prestataire attitré dédié à votre suivi" },
  { icon: Shield, text: "Assurance trajet et garantie de service" }
];
function PremiumBanner({ onSubscribe }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl p-5 text-white overflow-hidden relative",
      style: {
        background: "linear-gradient(135deg, oklch(0.55 0.22 310), oklch(0.65 0.18 210))"
      },
      "data-ocid": "premium_banner.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20",
            style: { background: "oklch(1 0 0 / 0.15)" },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10",
            style: { background: "oklch(1 0 0 / 0.2)" },
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-5 h-5", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: "Passez Premium ✨" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90 mb-4", children: "Profitez d'un service exclusif adapté à vos besoins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mb-5", children: benefits.map(({ icon: Icon, text }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-center gap-2 text-sm opacity-95",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 flex-shrink-0", "aria-hidden": "true" }),
                text
              ]
            },
            text
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            WejhaButton,
            {
              variant: "ghost",
              size: "md",
              fullWidth: true,
              onClick: onSubscribe,
              "data-ocid": "premium_banner.subscribe_button",
              className: "border border-white/40 text-white hover:bg-white/20 font-bold",
              children: "S'abonner — 29 DT/mois"
            }
          )
        ] })
      ]
    }
  );
}
const QUICK_SERVICES = [
  { type: "medical", icon: "🏥", label: "Médical" },
  { type: "transport", icon: "🚗", label: "Transport" },
  { type: "shopping", icon: "🛒", label: "Courses" },
  { type: "homeHelp", icon: "🏠", label: "Aide à domicile" }
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
function HomePage() {
  var _a;
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const bookings = useMockBookings();
  const recentBookings = bookings.slice(0, 2);
  const firstName = ((_a = userProfile == null ? void 0 : userProfile.name) == null ? void 0 : _a.split(" ")[0]) ?? "là";
  const isPremium = (userProfile == null ? void 0 : userProfile.isPremium) ?? false;
  function handleTabChange(_key, route) {
    navigate({ to: route });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppLayout,
    {
      activeTab: "home",
      onTabChange: handleTabChange,
      title: "Wejha وجهة",
      showSos: false,
      userRole: "pmr",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-5 pb-4 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground", children: [
            "Bonjour,",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "oklch(0.55 0.22 310)" }, children: [
              firstName,
              " 👋"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5", children: "Comment pouvons-nous vous aider aujourd'hui ?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "home.sos_button",
            "aria-label": "Appel d'urgence SOS",
            onClick: () => window.alert(
              "Appel d'urgence SOS — Êtes-vous en danger?\nComposez le 190 (Police) ou le 1021 (SAMU) pour une urgence médicale."
            ),
            className: cn(
              "w-full min-h-16 rounded-2xl text-white font-display font-bold text-lg",
              "flex items-center justify-center gap-3 shadow-lg relative overflow-hidden",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2",
              "active:scale-[0.98] transition-transform duration-150"
            ),
            style: {
              background: "linear-gradient(135deg, oklch(0.50 0.24 25), oklch(0.55 0.26 15))"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "absolute inset-0 rounded-2xl animate-ping opacity-20",
                  style: { background: "oklch(0.55 0.24 25)" },
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 text-2xl", "aria-hidden": "true", children: "🚨" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative z-10 tracking-wide", children: "Appel d'urgence SOS" })
            ]
          }
        ),
        isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 p-4 rounded-2xl border",
            style: {
              background: "oklch(0.55 0.22 310 / 0.08)",
              borderColor: "oklch(0.55 0.22 310 / 0.3)"
            },
            "data-ocid": "home.premium_status.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", "aria-hidden": "true", children: "⭐" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "font-semibold text-sm",
                    style: { color: "oklch(0.45 0.22 310)" },
                    children: "Abonné Premium ✓"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Vous profitez d'un accès prioritaire" })
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(PremiumBanner, { onSubscribe: () => {
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "quick-services-title", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "quick-services-title",
              className: "font-display font-bold text-base text-foreground mb-3",
              children: "Services rapides"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 gap-3",
              "data-ocid": "home.quick_services.section",
              children: QUICK_SERVICES.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `home.service_${service.type}.button`,
                  onClick: () => navigate({ to: "/search" }),
                  className: cn(
                    "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 min-h-[88px]",
                    "bg-card hover:shadow-md active:scale-[0.97]",
                    "transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  ),
                  style: { borderColor: "oklch(0.55 0.22 310 / 0.2)" },
                  "aria-label": `Trouver un service ${service.label}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", "aria-hidden": "true", children: service.icon }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground text-center leading-tight", children: service.label })
                  ]
                },
                service.type
              ))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "location-title", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "location-title",
              className: "font-display font-bold text-base text-foreground mb-3",
              children: "Votre position"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl p-5 flex items-center gap-4 min-h-[80px]",
              style: {
                background: "oklch(0.65 0.18 210 / 0.12)",
                border: "1px solid oklch(0.65 0.18 210 / 0.25)"
              },
              "data-ocid": "home.location.section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                    style: { background: "oklch(0.65 0.18 210 / 0.2)" },
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      MapPin,
                      {
                        className: "w-6 h-6",
                        style: { color: "oklch(0.45 0.18 210)" }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground", children: "Votre localisation" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tunis, Tunisie — GPS actif 📍" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  WejhaButton,
                  {
                    variant: "secondary",
                    size: "sm",
                    className: "flex-shrink-0",
                    "data-ocid": "home.location.update_button",
                    children: "Mettre à jour"
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "recent-bookings-title", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "recent-bookings-title",
                className: "font-display font-bold text-base text-foreground",
                children: "Réservations récentes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "home.bookings.see_all_button",
                onClick: () => navigate({ to: "/bookings" }),
                className: "text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded",
                style: { color: "oklch(0.55 0.22 310)" },
                children: "Voir tout →"
              }
            )
          ] }),
          recentBookings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-8 rounded-2xl bg-muted/40 border border-border",
              "data-ocid": "home.bookings.empty_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl mb-2", "aria-hidden": "true", children: "📋" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center", children: "Aucune réservation récente" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "home.bookings.list", children: recentBookings.map((booking, idx) => {
            const chip = statusChipColors[booking.status];
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `home.booking.item.${idx + 1}`,
                onClick: () => navigate({ to: `/booking/${booking.id}` }),
                className: cn(
                  "w-full text-left bg-card rounded-2xl border border-border p-4",
                  "hover:shadow-md hover:border-primary/20 transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "text-2xl flex-shrink-0 mt-0.5",
                      "aria-hidden": "true",
                      children: serviceIcons[booking.serviceType]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm text-foreground line-clamp-1", children: booking.description }),
                    booking.providerName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: booking.providerName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBar, { status: booking.status }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full",
                      style: { background: chip.bg, color: chip.text },
                      children: chip.label
                    }
                  )
                ] })
              },
              booking.id
            );
          }) })
        ] })
      ] })
    }
  );
}
export {
  HomePage as default
};
