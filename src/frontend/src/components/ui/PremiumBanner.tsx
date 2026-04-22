import { WejhaButton } from "@/components/ui/WejhaButton";
import { Shield, Sparkles, Star, Zap } from "lucide-react";

interface PremiumBannerProps {
  onSubscribe?: () => void;
}

const benefits = [
  { icon: Zap, text: "Accès prioritaire aux prestataires disponibles" },
  { icon: Star, text: "Prestataire attitré dédié à votre suivi" },
  { icon: Shield, text: "Assurance trajet et garantie de service" },
];

export function PremiumBanner({ onSubscribe }: PremiumBannerProps) {
  return (
    <div
      className="rounded-2xl p-5 text-white overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.55 0.22 310), oklch(0.65 0.18 210))",
      }}
      data-ocid="premium_banner.section"
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
        style={{ background: "oklch(1 0 0 / 0.15)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-10"
        style={{ background: "oklch(1 0 0 / 0.2)" }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5" aria-hidden="true" />
          <h3 className="font-display font-bold text-lg">Passez Premium ✨</h3>
        </div>
        <p className="text-sm opacity-90 mb-4">
          Profitez d'un service exclusif adapté à vos besoins
        </p>

        <ul className="space-y-2 mb-5">
          {benefits.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-2 text-sm opacity-95"
            >
              <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>

        <WejhaButton
          variant="ghost"
          size="md"
          fullWidth
          onClick={onSubscribe}
          data-ocid="premium_banner.subscribe_button"
          className="border border-white/40 text-white hover:bg-white/20 font-bold"
        >
          S'abonner — 29 DT/mois
        </WejhaButton>
      </div>
    </div>
  );
}
