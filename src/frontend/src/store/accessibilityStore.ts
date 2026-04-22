import { create } from "zustand";
import { persist } from "zustand/middleware";

type TextSize = "small" | "medium" | "large";

interface AccessibilityState {
  textSize: TextSize;
  highContrast: boolean;
  setTextSize: (size: TextSize) => void;
  toggleHighContrast: () => void;
}

function applyAttributes(textSize: TextSize, highContrast: boolean) {
  const html = document.documentElement;
  html.setAttribute("data-text-size", textSize);
  html.setAttribute("data-high-contrast", String(highContrast));
}

export const useAccessibilityStore = create<AccessibilityState>()(
  persist(
    (set, get) => ({
      textSize: "medium",
      highContrast: false,
      setTextSize: (size) => {
        set({ textSize: size });
        applyAttributes(size, get().highContrast);
      },
      toggleHighContrast: () => {
        const next = !get().highContrast;
        set({ highContrast: next });
        applyAttributes(get().textSize, next);
      },
    }),
    {
      name: "wejha-accessibility",
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyAttributes(state.textSize, state.highContrast);
        }
      },
    },
  ),
);
