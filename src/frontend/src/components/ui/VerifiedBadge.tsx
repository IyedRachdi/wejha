import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";

interface VerifiedBadgeProps {
  variant?: "small" | "large";
  className?: string;
}

export function VerifiedBadge({
  variant = "small",
  className,
}: VerifiedBadgeProps) {
  if (variant === "large") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full",
          "bg-success/10 border border-success/30",
          className,
        )}
        aria-label="Profil vérifié"
      >
        <CheckCircle className="w-5 h-5 text-success" aria-hidden="true" />
        <span className="text-sm font-semibold text-success">
          Profil vérifié
        </span>
      </div>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold",
        "bg-success/10 text-success border border-success/20",
        className,
      )}
      aria-label="Profil vérifié"
    >
      <CheckCircle className="w-3 h-3" aria-hidden="true" />
      Vérifié
    </span>
  );
}
