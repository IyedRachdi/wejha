import { cn } from "@/lib/utils";
import { CheckCircle, Settings } from "lucide-react";

interface SubscriptionCardProps {
  isPremium: boolean;
  renewalDate?: string;
  onSubscribe?: () => void;
  onManage?: () => void;
  className?: string;
}

const benefits = [
  "Accès prioritaire",
  "Prestataire attitré",
  "Mode Famille inclus",
];

export function SubscriptionCard({
  isPremium,
  renewalDate = "15 mai 2026",
  onSubscribe,
  onManage,
  className,
}: SubscriptionCardProps) {
  if (isPremium) {
    return (
      <div
        className={cn(
          "rounded-2xl border-2 border-primary/30 bg-primary/8 p-5 space-y-4",
          className,
        )}
        data-ocid="subscription.card"
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-base text-primary flex items-center gap-1.5">
              <span aria-hidden="true">✨</span> Abonné Premium
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Renouvellement le{" "}
              <span className="font-semibold text-foreground">
                {renewalDate}
              </span>
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold border border-primary/20">
            ACTIF
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {benefits.map((b) => (
            <span
              key={b}
              className="inline-flex items-center gap-1 text-xs text-foreground/80 bg-card px-3 py-1 rounded-full border border-border"
            >
              <CheckCircle
                className="w-3 h-3 text-success"
                aria-hidden="true"
              />
              {b}
            </span>
          ))}
        </div>
        <button
          type="button"
          data-ocid="subscription.manage_button"
          onClick={onManage}
          className={cn(
            "flex items-center gap-2 text-sm text-primary font-semibold",
            "hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded min-h-[44px] px-2",
          )}
        >
          <Settings className="w-4 h-4" aria-hidden="true" />
          Gérer l'abonnement
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn("rounded-2xl overflow-hidden", className)}
      data-ocid="subscription.card"
    >
      <div className="gradient-primary p-5 space-y-4">
        <div>
          <h3 className="font-bold text-xl text-primary-foreground flex items-center gap-2">
            <span aria-hidden="true">✨</span> Rafiqni Premium
          </h3>
          <p className="text-primary-foreground/80 text-sm mt-1">
            Profitez d'une expérience prioritaire et personnalisée
          </p>
        </div>

        <ul className="space-y-2">
          {benefits.map((benefit) => (
            <li key={benefit} className="flex items-center gap-2">
              <CheckCircle
                className="w-4 h-4 text-primary-foreground flex-shrink-0"
                aria-hidden="true"
              />
              <span className="text-sm text-primary-foreground font-medium">
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-2 border-t border-primary-foreground/20">
          <div>
            <span className="text-2xl font-bold text-primary-foreground">
              29 DT
            </span>
            <span className="text-primary-foreground/70 text-sm"> / mois</span>
          </div>
          <button
            type="button"
            data-ocid="subscription.subscribe_button"
            onClick={onSubscribe}
            className={cn(
              "px-5 py-3 rounded-xl font-bold text-sm",
              "bg-primary-foreground text-primary hover:opacity-90 active:scale-[0.98]",
              "transition-all duration-200 min-h-[44px]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
            )}
          >
            S'abonner maintenant
          </button>
        </div>
      </div>
    </div>
  );
}
