import { AppLayout } from "@/components/layout/AppLayout";
import { BadgeWidget } from "@/components/ui/BadgeWidget";
import { EarningsWidget } from "@/components/ui/EarningsWidget";
import { LeaderboardMini } from "@/components/ui/LeaderboardMini";
import { MissionCard } from "@/components/ui/MissionCard";
import { WejhaButton } from "@/components/ui/WejhaButton";
import { useAuth, useMockMissions } from "@/hooks/useWejha";
import type { Mission, StudentBadge } from "@/types/wejha";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

// ─── Badge tiers ─────────────────────────────────────────────────────────────
const BADGE_TIERS: {
  badge: StudentBadge;
  label: string;
  icon: string;
  minPts: number;
}[] = [
  { badge: "bronze", label: "Helper Bronze", icon: "🥉", minPts: 0 },
  { badge: "silver", label: "Helper Argent", icon: "🥈", minPts: 500 },
  { badge: "gold", label: "Helper Or", icon: "🥇", minPts: 1500 },
];

function determineBadge(pts: number): StudentBadge {
  if (pts >= 1500) return "gold";
  if (pts >= 500) return "silver";
  return "bronze";
}

// ─── Rewards ──────────────────────────────────────────────────────────────────
const REWARDS = [
  {
    id: "r-1",
    title: "10% de réduction",
    desc: "Sur votre prochain abonnement premium",
    icon: "🎟️",
    variant: "secondary" as const,
    ocid: "reward.discount",
  },
  {
    id: "r-2",
    title: "Accès prioritaire",
    desc: "Missions prioritaires pendant 7 jours",
    icon: "⚡",
    variant: "primary" as const,
    ocid: "reward.priority",
  },
];

// ─── Achievement modal ────────────────────────────────────────────────────────
function AchievementModal({
  badge,
  onClose,
}: {
  badge: (typeof BADGE_TIERS)[number];
  onClose: () => void;
}) {
  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-end justify-center p-4 backdrop-blur-sm w-full h-full max-w-none m-0 bg-transparent"
      style={{ background: "oklch(0.18 0.02 280 / 0.5)" }}
      aria-labelledby="achievement-title"
      data-ocid="achievement.dialog"
      onClose={onClose}
    >
      <div className="card-elevated border border-border w-full max-w-sm p-6 text-center space-y-4 mb-4">
        <span className="text-6xl block" aria-hidden="true">
          {badge.icon}
        </span>
        <div>
          <h2
            id="achievement-title"
            className="font-bold text-xl text-foreground"
          >
            {badge.label}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Débloqué à {badge.minPts} points — continuez sur votre lancée !
          </p>
        </div>
        <WejhaButton
          variant="primary"
          size="md"
          fullWidth
          onClick={onClose}
          data-ocid="achievement.close_button"
        >
          Super ! 🎉
        </WejhaButton>
      </div>
    </dialog>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function StudentDashboardPage() {
  const navigate = useNavigate();
  const { userProfile } = useAuth();
  const allMissions = useMockMissions();

  // Student data (mock or from store)
  const points = userProfile?.points ?? 142;
  const totalEarnings = userProfile?.totalEarnings ?? 185;
  const completedCount = userProfile?.completedMissions ?? 12;
  const firstName = userProfile?.name?.split(" ")[0] ?? "Ahmed";
  const thisMonthEarnings = 95;
  const weeklyData = [20, 35, 15, 40, 25, 30, 10];

  const currentBadge = determineBadge(points);
  const currentTierIdx = BADGE_TIERS.findIndex((t) => t.badge === currentBadge);
  const nextTier = BADGE_TIERS[currentTierIdx + 1];
  const pointsToNext = nextTier ? nextTier.minPts - points : 0;

  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [showAllMissions, setShowAllMissions] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<
    (typeof BADGE_TIERS)[number] | null
  >(null);

  const availableMissions = allMissions.filter(
    (m) => m.id !== activeMission?.id && !completedIds.has(m.id),
  );
  const displayedMissions = showAllMissions
    ? availableMissions
    : availableMissions.slice(0, 3);

  function handleAccept(mission: Mission) {
    setActiveMission(mission);
  }

  function handleComplete(mission: Mission) {
    setCompletedIds((prev) => new Set([...prev, mission.id]));
    setActiveMission(null);
  }

  return (
    <AppLayout
      activeTab="home"
      onTabChange={(_, route) => navigate({ to: route as "/" })}
      title="Wejha"
      userRole="student"
    >
      <div className="pb-10">
        {/* ── Hero header ───────────────────────────────────────── */}
        <div
          data-ocid="dashboard.header.section"
          className="relative overflow-hidden px-4 pt-6 pb-10"
          style={{
            background:
              "linear-gradient(145deg, oklch(0.65 0.18 210) 0%, oklch(0.50 0.22 310) 100%)",
          }}
        >
          <div
            className="absolute -top-12 -right-12 w-52 h-52 rounded-full opacity-15 pointer-events-none"
            style={{ background: "oklch(1 0 0)" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-32 h-32 rounded-full opacity-10 pointer-events-none"
            style={{ background: "oklch(1 0 0)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-primary-foreground/75 text-sm font-medium">
                Tableau de bord étudiant
              </p>
              <h1
                data-ocid="dashboard.greeting"
                className="font-display font-bold text-[26px] text-primary-foreground mt-0.5 leading-tight"
              >
                Bonjour, {firstName}! 🎓
              </h1>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-bold text-4xl text-primary-foreground tabular-nums">
                  {points}
                </span>
                <span className="text-primary-foreground/75 text-base font-medium">
                  pts
                </span>
              </div>
              <p className="text-primary-foreground/90 text-sm font-semibold mt-0.5">
                Helper{" "}
                {currentBadge === "gold"
                  ? "Or"
                  : currentBadge === "silver"
                    ? "Argent"
                    : "Bronze"}
              </p>
            </div>

            <BadgeWidget
              badge={currentBadge}
              points={points}
              showProgress
              className="flex-shrink-0 w-[118px] !border-primary-foreground/20 !bg-primary-foreground/10"
            />
          </div>
        </div>

        {/* ── Stats cards ────────────────────────────────────────── */}
        <div
          data-ocid="dashboard.stats.section"
          className="px-4 -mt-5 relative z-10"
        >
          <div className="grid grid-cols-3 gap-2.5">
            {[
              {
                value: String(availableMissions.length + completedIds.size),
                label: "Missions ce mois",
                icon: "📋",
                ocid: "stats.missions.card",
              },
              {
                value: `${totalEarnings} DT`,
                label: "Gains totaux",
                icon: "💰",
                ocid: "stats.earnings.card",
              },
              {
                value: pointsToNext > 0 ? `${pointsToNext} pts` : "MAX ✨",
                label: "Points restants",
                icon: "🎯",
                ocid: "stats.next_badge.card",
              },
            ].map((s) => (
              <div
                key={s.ocid}
                data-ocid={s.ocid}
                className="card-elevated border border-border p-3 text-center space-y-1"
              >
                <span className="text-xl block" aria-hidden="true">
                  {s.icon}
                </span>
                <p className="font-bold text-sm text-foreground leading-none">
                  {s.value}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Badge progression ──────────────────────────────────── */}
        <section
          data-ocid="badge.progression.section"
          className="mt-6 px-4 space-y-3"
        >
          <h2 className="font-bold text-base text-foreground">
            Votre progression
          </h2>

          <div className="card-elevated border border-border p-4 space-y-4">
            <div className="flex items-stretch gap-2">
              {BADGE_TIERS.map((tier) => {
                const isUnlocked = points >= tier.minPts;
                const isCurrent = tier.badge === currentBadge;
                return (
                  <button
                    key={tier.badge}
                    type="button"
                    data-ocid={`badge.tier.${tier.badge}`}
                    onClick={() => isUnlocked && setSelectedBadge(tier)}
                    disabled={!isUnlocked}
                    className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed"
                    style={
                      isCurrent
                        ? {
                            background: "oklch(0.55 0.22 310 / 0.1)",
                            border: "2px solid oklch(0.55 0.22 310 / 0.5)",
                          }
                        : isUnlocked
                          ? {
                              background: "oklch(0.65 0.18 210 / 0.08)",
                              border: "2px solid transparent",
                            }
                          : {
                              background: "oklch(0.92 0.01 270)",
                              border: "2px solid transparent",
                              opacity: 0.5,
                            }
                    }
                    aria-pressed={isCurrent}
                    aria-label={`${tier.label}${isUnlocked ? " — débloqué" : " — non débloqué"}`}
                  >
                    <span
                      className={isUnlocked ? "text-2xl" : "text-2xl grayscale"}
                      aria-hidden="true"
                    >
                      {tier.icon}
                    </span>
                    <span className="text-[10px] font-semibold text-foreground text-center">
                      {tier.badge === "bronze"
                        ? "Bronze"
                        : tier.badge === "silver"
                          ? "Argent"
                          : "Or"}
                    </span>
                    {isCurrent && (
                      <span
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded-full text-primary-foreground"
                        style={{ background: "oklch(0.55 0.22 310)" }}
                      >
                        Actuel
                      </span>
                    )}
                    {!isUnlocked && (
                      <span className="text-[9px] text-muted-foreground">
                        {tier.minPts} pts
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {currentBadge !== "gold" && nextTier ? (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{points} pts</span>
                  <span className="font-medium text-foreground">
                    {nextTier.label} à {nextTier.minPts} pts
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(100, (points / nextTier.minPts) * 100)}%`,
                      background:
                        "linear-gradient(90deg, oklch(0.55 0.22 310), oklch(0.65 0.18 210))",
                    }}
                    role="progressbar"
                    tabIndex={0}
                    aria-valuenow={points}
                    aria-valuemin={0}
                    aria-valuemax={nextTier.minPts}
                    aria-label={`Progression vers ${nextTier.label}`}
                  />
                </div>
              </div>
            ) : (
              <p
                className="text-xs font-semibold text-center"
                style={{ color: "oklch(0.6 0.15 85)" }}
              >
                ✨ Niveau maximum atteint ! Vous êtes un Helper Or.
              </p>
            )}
          </div>
        </section>

        {/* ── Active mission ─────────────────────────────────────── */}
        {activeMission && (
          <section
            data-ocid="active_mission.section"
            className="mt-6 px-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse flex-shrink-0"
                style={{ background: "oklch(0.65 0.18 210)" }}
                aria-hidden="true"
              />
              <h2 className="font-bold text-base text-foreground">
                Mission en cours
              </h2>
            </div>
            <MissionCard
              mission={activeMission}
              isActive
              onComplete={handleComplete}
            />
          </section>
        )}

        {/* ── Available missions ─────────────────────────────────── */}
        <section
          data-ocid="missions.section"
          className="mt-6 px-4 space-y-3"
          aria-labelledby="missions-heading"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2
                id="missions-heading"
                className="font-bold text-base text-foreground"
              >
                Missions disponibles
              </h2>
              <span
                className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold text-primary-foreground"
                style={{ background: "oklch(0.55 0.22 310)" }}
                aria-label={`${availableMissions.length} missions`}
              >
                {availableMissions.length}
              </span>
            </div>
          </div>

          {availableMissions.length === 0 ? (
            <div
              data-ocid="missions.empty_state"
              className="card-elevated border border-border p-8 text-center space-y-2"
            >
              <p className="text-3xl" aria-hidden="true">
                🎉
              </p>
              <p className="font-semibold text-foreground">
                Toutes les missions acceptées !
              </p>
              <p className="text-sm text-muted-foreground">
                Revenez bientôt pour de nouvelles missions.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayedMissions.map((mission, idx) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onAccept={handleAccept}
                  isActive={false}
                  data-ocid={`missions.item.${idx + 1}`}
                />
              ))}
              {availableMissions.length > 3 && (
                <button
                  type="button"
                  data-ocid="missions.see_all.link"
                  onClick={() => setShowAllMissions((v) => !v)}
                  className="w-full text-center text-sm font-semibold py-3 rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] text-primary hover:bg-primary/5"
                  style={{ borderColor: "oklch(0.55 0.22 310 / 0.3)" }}
                >
                  {showAllMissions
                    ? "Réduire ↑"
                    : `Voir toutes les missions (${availableMissions.length}) →`}
                </button>
              )}
            </div>
          )}
        </section>

        {/* ── Earnings widget ────────────────────────────────────── */}
        <div className="mt-6 px-4">
          <EarningsWidget
            totalEarnings={totalEarnings}
            completedMissions={completedCount}
            thisMonth={thisMonthEarnings}
            weeklyData={weeklyData}
          />
        </div>

        {/* ── Rewards ────────────────────────────────────────────── */}
        <section
          data-ocid="rewards.section"
          className="mt-6 px-4 space-y-3"
          aria-labelledby="rewards-heading"
        >
          <h2
            id="rewards-heading"
            className="font-bold text-base text-foreground"
          >
            Vos récompenses
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {REWARDS.map((r) => (
              <div
                key={r.id}
                data-ocid={r.ocid}
                className="card-elevated border border-border p-4 flex flex-col gap-3"
              >
                <span className="text-3xl block" aria-hidden="true">
                  {r.icon}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-sm text-foreground leading-tight">
                    {r.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">
                    {r.desc}
                  </p>
                </div>
                <WejhaButton
                  data-ocid={`${r.ocid}.use_button`}
                  variant={r.variant}
                  size="sm"
                  fullWidth
                  aria-label={`Utiliser: ${r.title}`}
                >
                  Utiliser
                </WejhaButton>
              </div>
            ))}
          </div>
        </section>

        {/* ── Leaderboard ────────────────────────────────────────── */}
        <div className="mt-6 px-4">
          <LeaderboardMini currentUserId={userProfile?.id} />
        </div>
      </div>

      {/* Achievement modal */}
      {selectedBadge && (
        <AchievementModal
          badge={selectedBadge}
          onClose={() => setSelectedBadge(null)}
        />
      )}
    </AppLayout>
  );
}
