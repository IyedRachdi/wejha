import { RoleSelector } from "@/components/ui/RoleSelector";
import { WejhaButton } from "@/components/ui/WejhaButton";
import { useAuthStore } from "@/store/authStore";
import type { UserRole } from "@/types/wejha";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const TOTAL_SLIDES = 3;

function Slide1() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 px-6 py-4">
      <div className="relative flex flex-col items-center">
        <div className="w-28 h-28 rounded-full gradient-primary flex items-center justify-center shadow-xl">
          <span className="text-primary-foreground font-display font-black text-5xl">
            W
          </span>
        </div>
        <span className="mt-2 text-xl font-bold text-foreground" dir="rtl">
          وجهة
        </span>
      </div>
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.65 0.18 210), oklch(0.72 0.18 190))",
        }}
        aria-hidden="true"
      >
        <span className="text-4xl">♿</span>
      </div>
      <div className="space-y-3 max-w-xs">
        <h1 className="font-display font-black text-3xl text-foreground leading-tight">
          Bienvenue sur Wejha
        </h1>
        <p className="font-semibold text-lg text-primary italic">
          Ensemble, sans frontières
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          La plateforme tunisienne qui connecte les personnes à mobilité réduite
          avec des prestataires de confiance.
        </p>
      </div>
      <div className="w-full max-w-xs space-y-2">
        {[
          { icon: "🛡️", text: "Prestataires vérifiés et certifiés" },
          { icon: "⭐", text: "Système de notation transparent" },
          { icon: "🎮", text: "Gamification et récompenses" },
        ].map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
          >
            <span className="text-xl flex-shrink-0" aria-hidden="true">
              {item.icon}
            </span>
            <span className="text-sm text-foreground font-medium">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Slide2() {
  const roleCards = [
    { icon: "♿", title: "PMR", desc: "Accédez à des services adaptés" },
    { icon: "🎓", title: "Étudiant", desc: "Aidez et gagnez des points" },
    { icon: "🚗", title: "Chauffeur", desc: "Transport PMR certifié" },
  ];
  return (
    <div className="flex flex-col items-center text-center gap-6 px-6 py-4">
      <div className="space-y-2">
        <h2 className="font-display font-black text-3xl text-foreground">
          Pour tout le monde
        </h2>
        <p className="text-sm text-muted-foreground">
          Une solution inclusive pour toute la communauté tunisienne
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 w-full">
        {roleCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border shadow-sm"
          >
            <span className="text-3xl" aria-hidden="true">
              {card.icon}
            </span>
            <p className="font-bold text-sm text-foreground">{card.title}</p>
            <p className="text-xs text-muted-foreground leading-tight">
              {card.desc}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="w-full space-y-3">
        {[
          { icon: "🔐", text: "Vérification des profils et documents" },
          { icon: "💳", text: "Abonnement Premium disponible" },
          { icon: "👨‍👩‍👧", text: "Mode Famille pour vos proches" },
        ].map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted/40"
          >
            <span className="text-xl flex-shrink-0" aria-hidden="true">
              {item.icon}
            </span>
            <span className="text-sm text-foreground font-medium">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface Slide3Props {
  selectedRole: UserRole | null;
  onSelectRole: (role: UserRole) => void;
}

function Slide3({ selectedRole, onSelectRole }: Slide3Props) {
  return (
    <div className="flex flex-col gap-5 px-6 py-4">
      <div className="text-center space-y-1">
        <h2 className="font-display font-black text-2xl text-foreground">
          Commencez maintenant
        </h2>
        <p className="text-sm text-muted-foreground">Qui êtes-vous ?</p>
      </div>
      <RoleSelector selectedRole={selectedRole} onSelectRole={onSelectRole} />
    </div>
  );
}

export default function OnboardingPage() {
  const [slide, setSlide] = useState(0);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const { setAuth, setRole } = useAuthStore();
  const navigate = useNavigate();

  function goNext() {
    if (slide < TOTAL_SLIDES - 1) setSlide((s) => s + 1);
  }
  function goPrev() {
    if (slide > 0) setSlide((s) => s - 1);
  }

  function handleContinue() {
    if (slide < TOTAL_SLIDES - 1) {
      goNext();
      return;
    }
    if (!selectedRole) return;
    setAuth(`user-${Date.now()}`, selectedRole);
    setRole(selectedRole);
    if (selectedRole === "student") navigate({ to: "/student/dashboard" });
    else if (selectedRole === "driver") navigate({ to: "/driver/dashboard" });
    else navigate({ to: "/home" });
  }

  function handleTouchStart(e: React.TouchEvent) {
    setTouchStart(e.touches[0].clientX);
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStart === null) return;
    const delta = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0 && slide < TOTAL_SLIDES - 1) goNext();
      else if (delta < 0 && slide > 0) goPrev();
    }
    setTouchStart(null);
  }

  const canContinue = slide < TOTAL_SLIDES - 1 || selectedRole !== null;

  return (
    <div
      className="flex flex-col min-h-screen bg-background"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Skip */}
      <div className="flex justify-end px-4 pt-4 min-h-[48px] items-center">
        {slide < TOTAL_SLIDES - 1 && (
          <button
            type="button"
            data-ocid="onboarding.skip_button"
            onClick={() => setSlide(TOTAL_SLIDES - 1)}
            className="min-h-[44px] px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
          >
            Passer →
          </button>
        )}
      </div>

      {/* Slides container */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            initial={{ opacity: 0, x: slide === 0 ? 0 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full overflow-y-auto"
            aria-live="polite"
          >
            {slide === 0 && <Slide1 />}
            {slide === 1 && <Slide2 />}
            {slide === 2 && (
              <Slide3
                selectedRole={selectedRole}
                onSelectRole={setSelectedRole}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom controls */}
      <div className="px-6 pb-8 pt-4 space-y-4">
        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {(["slide-1", "slide-2", "slide-3"] as const).map((id, i) => (
            <button
              key={id}
              type="button"
              data-ocid={`onboarding.dot.${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                slide === i ? "w-6 bg-primary" : "w-2 bg-border"
              }`}
              aria-label={`Aller à l'étape ${i + 1}`}
              aria-current={slide === i ? "step" : undefined}
            />
          ))}
        </div>

        {/* Nav */}
        <div className="flex items-center gap-3">
          {slide > 0 && (
            <button
              type="button"
              data-ocid="onboarding.prev_button"
              onClick={goPrev}
              className="w-12 h-14 rounded-2xl border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex-shrink-0"
              aria-label="Retour"
            >
              <ChevronLeft
                className="w-5 h-5 text-foreground"
                aria-hidden="true"
              />
            </button>
          )}
          <WejhaButton
            variant="primary"
            size="lg"
            fullWidth
            data-ocid="onboarding.continue_button"
            onClick={handleContinue}
            disabled={!canContinue}
          >
            {slide < TOTAL_SLIDES - 1 ? (
              <span className="flex items-center gap-2">
                Continuer{" "}
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </span>
            ) : (
              "C'est parti ! →"
            )}
          </WejhaButton>
        </div>
      </div>
    </div>
  );
}
