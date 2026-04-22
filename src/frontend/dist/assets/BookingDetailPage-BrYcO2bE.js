import { r as reactExports, j as jsxRuntimeExports, c as cn, a as useNavigate, d as useParams } from "./index-Cs24hTMk.js";
import { R as Root, C as Content, f as Close, X, e as Title, P as Portal, O as Overlay, A as AppLayout, p as Calendar, a as useMockBookings, b as useMockProviders } from "./AppLayout-4ZKxUA7p.js";
import { B as BookingStatusBar } from "./BookingStatusBar-AqFQZ1Fr.js";
import { P as ProviderCard } from "./ProviderCard-DRVieMHo.js";
import { S as StarRating } from "./StarRating-Dm-NFMtj.js";
import { W as WejhaButton } from "./WejhaButton-B0Qu1nSF.js";
import { P as Phone } from "./phone-5WStyZPG.js";
import { c as createLucideIcon } from "./createLucideIcon-nnWebpkL.js";
import { M as MapPin } from "./map-pin-C-tS1rCw.js";
import "./VerifiedBadge-7MMTujfv.js";
import "./circle-check-big-BQXcWwZR.js";
import "./chevron-right-CNApGgaa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function TrackingView({
  booking,
  onContact,
  onComplete
}) {
  const [eta, setEta] = reactExports.useState(booking.status === "enRoute" ? 12 : 2);
  const [pulsePos, setPulsePos] = reactExports.useState({ x: 35, y: 55 });
  reactExports.useEffect(() => {
    if (booking.status !== "enRoute") return;
    const interval = setInterval(() => {
      setEta((prev) => Math.max(0, prev - 1));
    }, 1e4);
    return () => clearInterval(interval);
  }, [booking.status]);
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setPulsePos((prev) => ({
        x: Math.min(65, Math.max(25, prev.x + (Math.random() - 0.5) * 6)),
        y: Math.min(70, Math.max(30, prev.y + (Math.random() - 0.5) * 6))
      }));
    }, 3e3);
    return () => clearInterval(interval);
  }, []);
  const isArrived = booking.status === "arrived";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl overflow-hidden border border-border shadow-sm",
      "data-ocid": "tracking_view.section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "relative h-40 flex items-center justify-center overflow-hidden",
            style: {
              background: "linear-gradient(160deg, oklch(0.65 0.18 210 / 0.15), oklch(0.55 0.22 310 / 0.1))"
            },
            "aria-label": "Carte de suivi en temps réel",
            role: "img",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "absolute inset-0 w-full h-full opacity-20",
                  "aria-hidden": "true",
                  children: [0, 25, 50, 75, 100].map((pct) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1: `${pct}%`,
                        y1: "0",
                        x2: `${pct}%`,
                        y2: "100%",
                        stroke: "oklch(0.55 0.22 310)",
                        strokeWidth: "1",
                        strokeDasharray: "4,4"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "line",
                      {
                        x1: "0",
                        y1: `${pct}%`,
                        x2: "100%",
                        y2: `${pct}%`,
                        stroke: "oklch(0.55 0.22 310)",
                        strokeWidth: "1",
                        strokeDasharray: "4,4"
                      }
                    )
                  ] }, pct))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute transition-all duration-[3000ms] ease-in-out",
                  style: {
                    left: `${pulsePos.x}%`,
                    top: `${pulsePos.y}%`,
                    transform: "translate(-50%, -50%)"
                  },
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-0 rounded-full animate-ping opacity-40",
                        style: {
                          background: "oklch(0.55 0.22 310)",
                          transform: "scale(2.5)"
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg z-10 relative",
                        style: { background: "oklch(0.55 0.22 310)" },
                        children: booking.providerName ? getInitials(booking.providerName) : "?"
                      }
                    )
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute bottom-6 right-8 text-2xl animate-bounce",
                  "aria-hidden": "true",
                  children: "📍"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute top-3 left-3 px-3 py-1.5 rounded-xl text-sm font-bold shadow-md",
                  style: {
                    background: "oklch(0.99 0.004 270)",
                    color: "oklch(0.55 0.22 310)"
                  },
                  children: isArrived ? "🎉 Arrivé !" : `Arrivée estimée: ${eta} min`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white flex-shrink-0",
              style: {
                background: "linear-gradient(135deg, oklch(0.55 0.22 310), oklch(0.65 0.18 210))"
              },
              "aria-hidden": "true",
              children: booking.providerName ? getInitials(booking.providerName) : "?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: booking.providerName ?? "Prestataire en route" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: isArrived ? "Est arrivé à votre adresse" : "Se dirige vers vous" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onContact,
                "data-ocid": "tracking_view.contact_button",
                className: "w-11 h-11 rounded-full flex items-center justify-center transition-all hover:opacity-80 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                style: { background: "oklch(0.55 0.22 310 / 0.12)" },
                "aria-label": "Appeler le prestataire",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Phone,
                  {
                    className: "w-5 h-5",
                    style: { color: "oklch(0.55 0.22 310)" },
                    "aria-hidden": "true"
                  }
                )
              }
            ),
            isArrived && onComplete && /* @__PURE__ */ jsxRuntimeExports.jsx(
              WejhaButton,
              {
                variant: "secondary",
                size: "sm",
                onClick: onComplete,
                "data-ocid": "tracking_view.complete_button",
                children: "Terminer"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
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
function formatDate(ts) {
  return new Intl.DateTimeFormat("fr-TN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(ts));
}
function ReviewModal({
  open,
  onClose,
  booking
}) {
  const [stars, setStars] = reactExports.useState(0);
  const [comment, setComment] = reactExports.useState("");
  const [submitted, setSubmitted] = reactExports.useState(false);
  function handleSubmit() {
    if (stars === 0) return;
    setSubmitted(true);
    setTimeout(onClose, 1500);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-sm mx-auto rounded-2xl",
      "data-ocid": "review.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display font-bold text-lg", children: "Laisser un avis" }) }),
        submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center py-6 gap-3",
            "data-ocid": "review.success_state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "🎉" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Merci pour votre avis !" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Comment s'est passée votre expérience avec",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: booking.providerName ?? "le prestataire" }),
              " ?"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              StarRating,
              {
                rating: stars,
                interactive: true,
                onRate: setStars,
                size: "lg"
              }
            ) }),
            stars > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: [
              "",
              "Très mauvais",
              "Mauvais",
              "Moyen",
              "Bien",
              "Excellent !"
            ][stars] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              placeholder: "Partagez votre expérience (optionnel)...",
              value: comment,
              onChange: (e) => setComment(e.target.value),
              "data-ocid": "review.comment.textarea",
              className: "w-full min-h-[96px] p-3 rounded-xl border border-input bg-card text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary",
              "aria-label": "Commentaire sur la prestation"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              WejhaButton,
              {
                variant: "ghost",
                size: "md",
                onClick: onClose,
                fullWidth: true,
                "data-ocid": "review.cancel_button",
                children: "Annuler"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              WejhaButton,
              {
                variant: "primary",
                size: "md",
                onClick: handleSubmit,
                fullWidth: true,
                disabled: stars === 0,
                "data-ocid": "review.submit_button",
                children: "Envoyer"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function BookingDetailPage() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const bookingId = params.id;
  const bookings = useMockBookings();
  const providers = useMockProviders();
  const [reviewOpen, setReviewOpen] = reactExports.useState(false);
  const booking = bookings.find((b) => b.id === bookingId);
  const provider = (booking == null ? void 0 : booking.providerId) ? providers.find((p) => p.id === booking.providerId) ?? null : null;
  const showTracking = (booking == null ? void 0 : booking.status) === "enRoute" || (booking == null ? void 0 : booking.status) === "arrived";
  function handleTabChange(_key, route) {
    navigate({ to: route });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AppLayout,
    {
      activeTab: "bookings",
      onTabChange: handleTabChange,
      title: "Réservation",
      userRole: "pmr",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "booking_detail.back_link",
            onClick: () => navigate({ to: "/bookings" }),
            className: "flex items-center gap-2 text-sm font-semibold min-h-[44px] -ml-1 px-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:opacity-70 transition-opacity",
            style: { color: "oklch(0.55 0.22 310)" },
            "aria-label": "Retour aux réservations",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4", "aria-hidden": "true" }),
              "Retour"
            ]
          }
        ) }),
        !booking ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-20 px-8 text-center",
            "data-ocid": "booking_detail.not_found.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4", "aria-hidden": "true", children: "🔍" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Réservation introuvable" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "Cette réservation n'existe pas ou a été supprimée." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                WejhaButton,
                {
                  variant: "primary",
                  size: "md",
                  onClick: () => navigate({ to: "/bookings" }),
                  "data-ocid": "booking_detail.back_button",
                  children: "Retour aux réservations"
                }
              )
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-6 space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "bg-card rounded-2xl p-4 border border-border",
              "data-ocid": "booking_detail.status_bar.section",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookingStatusBar, { status: booking.status })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card rounded-2xl p-4 border border-border space-y-3",
              "data-ocid": "booking_detail.service_info.section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", "aria-hidden": "true", children: serviceIcons[booking.serviceType] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xs font-semibold px-2.5 py-0.5 rounded-full",
                        style: {
                          background: "oklch(0.55 0.22 310 / 0.1)",
                          color: "oklch(0.45 0.22 310)"
                        },
                        children: serviceLabels[booking.serviceType]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm mt-1 leading-snug", children: booking.description })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-1 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 flex-shrink-0", "aria-hidden": "true" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: booking.address })
                  ] }),
                  booking.scheduledAt && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Calendar,
                      {
                        className: "w-4 h-4 flex-shrink-0",
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(booking.scheduledAt) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4 flex-shrink-0", "aria-hidden": "true" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Durée estimée : ",
                      booking.estimatedDuration,
                      " min"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-medium", children: "Tarif" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-bold text-lg",
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
          ),
          provider && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "provider-section-title", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "provider-section-title",
                className: "font-display font-bold text-sm text-muted-foreground uppercase tracking-wide mb-2",
                children: "Votre prestataire"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ProviderCard,
              {
                provider,
                compact: true,
                "data-ocid": "booking_detail.provider_card.card"
              }
            )
          ] }),
          showTracking && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-labelledby": "tracking-section-title", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "tracking-section-title",
                className: "font-display font-bold text-sm text-muted-foreground uppercase tracking-wide mb-2",
                children: "Suivi en temps réel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TrackingView,
              {
                booking,
                onContact: () => {
                },
                onComplete: () => {
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "space-y-3 pt-2",
              "data-ocid": "booking_detail.actions.section",
              children: [
                (booking.status === "requested" || booking.status === "confirmed") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  WejhaButton,
                  {
                    variant: "ghost",
                    size: "lg",
                    fullWidth: true,
                    "data-ocid": "booking_detail.cancel_button",
                    onClick: () => navigate({ to: "/bookings" }),
                    children: "Annuler la réservation"
                  }
                ),
                showTracking && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  WejhaButton,
                  {
                    variant: "secondary",
                    size: "lg",
                    fullWidth: true,
                    "data-ocid": "booking_detail.contact_button",
                    onClick: () => {
                    },
                    children: "📞 Contacter le prestataire"
                  }
                ),
                booking.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  WejhaButton,
                  {
                    variant: "primary",
                    size: "lg",
                    fullWidth: true,
                    "data-ocid": "booking_detail.review_button",
                    onClick: () => setReviewOpen(true),
                    children: "⭐ Laisser un avis"
                  }
                )
              ]
            }
          )
        ] }),
        booking && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReviewModal,
          {
            open: reviewOpen,
            onClose: () => setReviewOpen(false),
            booking
          }
        )
      ]
    }
  );
}
export {
  BookingDetailPage as default
};
