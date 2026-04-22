import { j as jsxRuntimeExports, c as cn } from "./index-Cs24hTMk.js";
const badgeConfig = {
  bronze: {
    label: "Helper Bronze",
    icon: "🥉",
    nextPoints: 500,
    minPoints: 0,
    bgStyle: {
      background: "oklch(0.95 0.03 60)",
      borderColor: "oklch(0.85 0.06 60)"
    },
    colorStyle: { color: "oklch(0.45 0.12 60)" },
    barStyle: { background: "oklch(0.60 0.15 60)" }
  },
  silver: {
    label: "Helper Argent",
    icon: "🥈",
    nextPoints: 1500,
    minPoints: 500,
    bgStyle: {
      background: "oklch(0.95 0.01 280)",
      borderColor: "oklch(0.82 0.02 280)"
    },
    colorStyle: { color: "oklch(0.40 0.04 280)" },
    barStyle: { background: "oklch(0.55 0.06 280)" }
  },
  gold: {
    label: "Helper Or",
    icon: "🥇",
    nextPoints: 1500,
    minPoints: 1500,
    bgStyle: {
      background: "oklch(0.96 0.06 85)",
      borderColor: "oklch(0.85 0.09 85)"
    },
    colorStyle: { color: "oklch(0.52 0.15 85)" },
    barStyle: { background: "oklch(0.65 0.18 85)" }
  }
};
function BadgeWidget({
  badge,
  points,
  showProgress = false,
  compact = false,
  className
}) {
  const config = badgeConfig[badge];
  const isGold = badge === "gold";
  const progress = isGold ? 100 : Math.min(
    100,
    (points - config.minPoints) / (config.nextPoints - config.minPoints) * 100
  );
  if (compact) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "span",
      {
        className: cn(
          "inline-flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-semibold",
          className
        ),
        style: { ...config.bgStyle, ...config.colorStyle },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: config.icon }),
          config.label
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center gap-2 p-4 rounded-2xl border",
        className
      ),
      style: config.bgStyle,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", "aria-hidden": "true", children: config.icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-base", style: config.colorStyle, children: config.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: points }),
          " points"
        ] }),
        showProgress && !isGold && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              points,
              " pts"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              config.nextPoints,
              " pts"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full rounded-full transition-all duration-500",
              style: { width: `${progress}%`, ...config.barStyle },
              "aria-label": `Progression vers le niveau suivant: ${Math.round(progress)}%`
            }
          ) })
        ] }),
        showProgress && isGold && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold", style: config.colorStyle, children: "✨ Niveau maximum atteint !" })
      ]
    }
  );
}
export {
  BadgeWidget as B
};
