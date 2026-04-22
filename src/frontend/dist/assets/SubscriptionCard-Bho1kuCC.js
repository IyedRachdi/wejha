import { c as createLucideIcon } from "./createLucideIcon-nnWebpkL.js";
import { j as jsxRuntimeExports, c as cn } from "./index-Cs24hTMk.js";
import { C as CircleCheckBig } from "./circle-check-big-BQXcWwZR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
];
const Bell = createLucideIcon("bell", __iconNode$1);
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
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode);
const benefits = [
  "Accès prioritaire",
  "Prestataire attitré",
  "Mode Famille inclus"
];
function SubscriptionCard({
  isPremium,
  renewalDate = "15 mai 2026",
  onSubscribe,
  onManage,
  className
}) {
  if (isPremium) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "rounded-2xl border-2 border-primary/30 bg-primary/8 p-5 space-y-4",
          className
        ),
        "data-ocid": "subscription.card",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-base text-primary flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "✨" }),
                " Abonné Premium"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                "Renouvellement le",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: renewalDate })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold border border-primary/20", children: "ACTIF" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: benefits.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 text-xs text-foreground/80 bg-card px-3 py-1 rounded-full border border-border",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheckBig,
                  {
                    className: "w-3 h-3 text-success",
                    "aria-hidden": "true"
                  }
                ),
                b
              ]
            },
            b
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": "subscription.manage_button",
              onClick: onManage,
              className: cn(
                "flex items-center gap-2 text-sm text-primary font-semibold",
                "hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded min-h-[44px] px-2"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-4 h-4", "aria-hidden": "true" }),
                "Gérer l'abonnement"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("rounded-2xl overflow-hidden", className),
      "data-ocid": "subscription.card",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "gradient-primary p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-xl text-primary-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "✨" }),
            " Wejha Premium"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/80 text-sm mt-1", children: "Profitez d'une expérience prioritaire et personnalisée" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: benefits.map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleCheckBig,
            {
              className: "w-4 h-4 text-primary-foreground flex-shrink-0",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-primary-foreground font-medium", children: benefit })
        ] }, benefit)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-primary-foreground/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-primary-foreground", children: "29 DT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground/70 text-sm", children: " / mois" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "subscription.subscribe_button",
              onClick: onSubscribe,
              className: cn(
                "px-5 py-3 rounded-xl font-bold text-sm",
                "bg-primary-foreground text-primary hover:opacity-90 active:scale-[0.98]",
                "transition-all duration-200 min-h-[44px]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              ),
              children: "S'abonner maintenant"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  Bell as B,
  SubscriptionCard as S
};
