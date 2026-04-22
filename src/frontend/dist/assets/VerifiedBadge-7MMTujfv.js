import { j as jsxRuntimeExports, c as cn } from "./index-Cs24hTMk.js";
import { C as CircleCheckBig } from "./circle-check-big-BQXcWwZR.js";
function VerifiedBadge({
  variant = "small",
  className
}) {
  if (variant === "large") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full",
          "bg-success/10 border border-success/30",
          className
        ),
        "aria-label": "Profil vérifié",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-5 h-5 text-success", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-success", children: "Profil vérifié" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold",
        "bg-success/10 text-success border border-success/20",
        className
      ),
      "aria-label": "Profil vérifié",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3 h-3", "aria-hidden": "true" }),
        "Vérifié"
      ]
    }
  );
}
export {
  VerifiedBadge as V
};
