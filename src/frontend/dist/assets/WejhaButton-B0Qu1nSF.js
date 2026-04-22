import { r as reactExports, j as jsxRuntimeExports, c as cn } from "./index-Cs24hTMk.js";
const variantClasses = {
  primary: "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]",
  secondary: "bg-secondary text-secondary-foreground hover:opacity-90 active:scale-[0.98]",
  ghost: "bg-transparent text-foreground border border-border hover:bg-muted active:scale-[0.98]",
  danger: "bg-destructive text-destructive-foreground hover:opacity-90 active:scale-[0.98]"
};
const sizeClasses = {
  sm: "min-h-[44px] px-4 text-sm rounded-xl",
  md: "min-h-[48px] px-6 text-base rounded-xl",
  lg: "min-h-[56px] px-8 text-lg rounded-2xl"
};
const WejhaButton = reactExports.forwardRef(
  ({
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    disabled,
    className,
    children,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        ref,
        disabled: disabled || loading,
        className: cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        ),
        ...props,
        children: [
          loading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              className: "animate-spin h-4 w-4",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 24 24",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "circle",
                  {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "path",
                  {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  }
                )
              ]
            }
          ),
          children
        ]
      }
    );
  }
);
WejhaButton.displayName = "WejhaButton";
export {
  WejhaButton as W
};
