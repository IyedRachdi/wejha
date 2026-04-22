import { r as reactExports, j as jsxRuntimeExports, c as cn } from "./index-Cs24hTMk.js";
const sizeMap = { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-7 h-7" };
function StarRating({
  rating,
  interactive = false,
  onRate,
  size = "md",
  className
}) {
  const [hovered, setHovered] = reactExports.useState(0);
  const effective = interactive && hovered > 0 ? hovered : rating;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("inline-flex items-center gap-0.5", className),
      role: interactive ? "radiogroup" : "img",
      "aria-label": `Note: ${rating} étoiles sur 5`,
      children: [1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(effective);
        const half = !filled && star === Math.ceil(effective) && effective % 1 >= 0.5;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: interactive ? "button" : void 0,
            role: interactive ? "radio" : void 0,
            "aria-label": interactive ? `${star} étoile${star > 1 ? "s" : ""}` : void 0,
            "aria-checked": interactive ? star === Math.round(rating) : void 0,
            disabled: !interactive,
            onClick: () => interactive && (onRate == null ? void 0 : onRate(star)),
            onMouseEnter: () => interactive && setHovered(star),
            onMouseLeave: () => interactive && setHovered(0),
            className: cn(
              "transition-transform duration-150",
              interactive && "cursor-pointer hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded",
              !interactive && "cursor-default pointer-events-none"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "svg",
              {
                className: cn(sizeMap[size]),
                viewBox: "0 0 24 24",
                "aria-hidden": "true",
                children: half ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: `half-${star}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "oklch(0.72 0.15 85)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "oklch(0.88 0.008 270)" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
                      fill: `url(#half-${star})`,
                      stroke: "oklch(0.72 0.15 85)",
                      strokeWidth: "0.5"
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
                    fill: filled ? "oklch(0.72 0.15 85)" : "oklch(0.88 0.008 270)",
                    stroke: filled ? "oklch(0.72 0.15 85)" : "oklch(0.80 0.012 270)",
                    strokeWidth: "0.5"
                  }
                )
              }
            )
          },
          star
        );
      })
    }
  );
}
export {
  StarRating as S
};
