import { j as jsxRuntimeExports, c as cn } from "./index-Cs24hTMk.js";
const STEPS = [
  { key: "requested", label: "Demandé" },
  { key: "confirmed", label: "Confirmé" },
  { key: "enRoute", label: "En Route" },
  { key: "arrived", label: "Arrivé" },
  { key: "completed", label: "Terminé" }
];
const statusOrder = {
  requested: 0,
  confirmed: 1,
  enRoute: 2,
  arrived: 3,
  completed: 4,
  cancelled: -1
};
function BookingStatusBar({ status, className }) {
  var _a;
  const currentIndex = statusOrder[status];
  const isCancelled = status === "cancelled";
  if (isCancelled) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "output",
      {
        className: cn(
          "flex items-center justify-center py-3 px-4 rounded-xl bg-destructive/10 border border-destructive/20",
          className
        ),
        "aria-label": "Réservation annulée",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-destructive", children: "✗ Réservation annulée" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("w-full", className),
      "aria-label": `Statut: ${(_a = STEPS[currentIndex]) == null ? void 0 : _a.label}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute left-0 right-0 top-4 h-0.5 bg-border mx-4",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full bg-secondary transition-all duration-500",
                style: { width: `${currentIndex / 4 * 100}%` }
              }
            )
          }
        ),
        STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center gap-1 z-10",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                      isDone && "bg-secondary border-secondary text-secondary-foreground",
                      isCurrent && "bg-primary border-primary text-primary-foreground shadow-md scale-110",
                      !isDone && !isCurrent && "bg-card border-border text-muted-foreground"
                    ),
                    "aria-current": isCurrent ? "step" : void 0,
                    children: isDone ? "✓" : index + 1
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: cn(
                      "text-[10px] font-medium text-center leading-tight max-w-[52px]",
                      isCurrent && "text-primary font-semibold",
                      isDone && "text-secondary",
                      !isDone && !isCurrent && "text-muted-foreground"
                    ),
                    children: step.label
                  }
                )
              ]
            },
            step.key
          );
        })
      ] })
    }
  );
}
export {
  BookingStatusBar as B
};
