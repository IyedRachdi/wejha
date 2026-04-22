import { j as jsxRuntimeExports, c as cn } from "./index-Cs24hTMk.js";
import { S as StarRating } from "./StarRating-Dm-NFMtj.js";
import { V as VerifiedBadge } from "./VerifiedBadge-7MMTujfv.js";
import { C as ChevronRight } from "./chevron-right-CNApGgaa.js";
const serviceLabels = {
  medical: "Médical",
  transport: "Transport",
  shopping: "Courses",
  homeHelp: "Aide dom.",
  other: "Autre"
};
const badgeColors = {
  bronze: { bg: "oklch(0.65 0.14 55 / 0.15)", text: "oklch(0.52 0.14 55)" },
  silver: { bg: "oklch(0.7 0.01 270 / 0.2)", text: "oklch(0.48 0.012 270)" },
  gold: { bg: "oklch(0.85 0.18 90 / 0.2)", text: "oklch(0.60 0.18 80)" }
};
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function ProviderCard({
  provider,
  onSelect,
  compact = false,
  className
}) {
  const isDriver = provider.role === "driver";
  const badge = provider.badge ? badgeColors[provider.badge] : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => onSelect == null ? void 0 : onSelect(provider),
      className: cn(
        "w-full text-left bg-card rounded-2xl border border-border shadow-sm",
        "hover:shadow-md hover:border-primary/30 transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        compact ? "p-3" : "p-4",
        className
      ),
      "data-ocid": "provider_card.card",
      "aria-label": `Voir le profil de ${provider.name}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "rounded-full flex items-center justify-center font-bold text-white",
                  compact ? "w-10 h-10 text-sm" : "w-12 h-12 text-base"
                ),
                style: {
                  background: "linear-gradient(135deg, oklch(0.55 0.22 310), oklch(0.65 0.18 210))"
                },
                "aria-hidden": "true",
                children: getInitials(provider.name)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-card",
                  provider.isAvailable ? "bg-success" : "bg-muted-foreground"
                ),
                "aria-label": provider.isAvailable ? "Disponible" : "Indisponible"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: provider.name }),
              provider.isVerified && /* @__PURE__ */ jsxRuntimeExports.jsx(VerifiedBadge, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-semibold px-2 py-0.5 rounded-full",
                  style: isDriver ? {
                    background: "oklch(0.55 0.22 310 / 0.12)",
                    color: "oklch(0.45 0.22 310)"
                  } : {
                    background: "oklch(0.65 0.18 210 / 0.12)",
                    color: "oklch(0.45 0.18 210)"
                  },
                  children: isDriver ? "Chauffeur PMR" : "Étudiant"
                }
              ),
              provider.badge && badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-xs font-semibold px-2 py-0.5 rounded-full capitalize",
                  style: { background: badge.bg, color: badge.text },
                  children: provider.badge === "bronze" ? "🥉 Bronze" : provider.badge === "silver" ? "🥈 Argent" : "🥇 Or"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: provider.rating, size: "sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-medium", children: [
                provider.rating.toFixed(1),
                " (",
                provider.reviewCount,
                ")"
              ] })
            ] }),
            !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 mt-2", children: provider.serviceTypes.slice(0, 3).map((svc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium",
                  children: serviceLabels[svc]
                },
                svc
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5 line-clamp-2", children: provider.bio })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronRight,
            {
              className: "w-4 h-4 text-muted-foreground flex-shrink-0 mt-1",
              "aria-hidden": "true"
            }
          )
        ] }),
        !compact && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            provider.completedMissions,
            " missions effectuées"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-xs font-semibold",
              style: { color: "oklch(0.55 0.22 310)" },
              "aria-hidden": "true",
              children: "Voir le profil →"
            }
          )
        ] })
      ]
    }
  );
}
export {
  ProviderCard as P
};
