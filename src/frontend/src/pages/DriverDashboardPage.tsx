import { AppLayout } from "@/components/layout/AppLayout";
import { DriverStatsWidget } from "@/components/ui/DriverStatsWidget";
import { MissionQueueCard } from "@/components/ui/MissionQueueCard";
import { StarRating } from "@/components/ui/StarRating";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { WejhaButton } from "@/components/ui/WejhaButton";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth, useMockBookings } from "@/hooks/useWejha";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/wejha";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, MapPin, Minus, Phone, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const mockDriver = {
  name: "Riadh Hamdi",
  rating: 4.8,
  reviewCount: 112,
  todayEarnings: 120,
  completedToday: 6,
  weeklyData: [55, 80, 48, 95, 70, 120, 65] as [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ],
  totalMissions: 210,
};

const serviceIcons: Record<string, string> = {
  medical: "🏥",
  transport: "🚗",
  shopping: "🛒",
  homeHelp: "🏠",
  other: "✨",
};

const serviceLabels: Record<string, string> = {
  medical: "Médical",
  transport: "Transport",
  shopping: "Courses",
  homeHelp: "Aide domicile",
  other: "Autre",
};

export default function DriverDashboardPage() {
  const [activeTab, setActiveTab] = useState("home");
  const [isAvailable, setIsAvailable] = useState(true);
  const [etaMinutes, setEtaMinutes] = useState(12);
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const bookings = useMockBookings();

  const activeMission = bookings.find((b) =>
    ["confirmed", "enRoute", "arrived"].includes(b.status),
  );
  const queuedMissions = bookings.filter((b) => b.status === "requested");

  const effectiveRole: UserRole = userRole ?? "driver";
  const isDriver = effectiveRole === "driver";
  const pageTitle = isDriver
    ? "Tableau de bord Conducteur"
    : "Tableau de bord Prestataire";

  function handleTabChange(key: string, route: string) {
    setActiveTab(key);
    navigate({ to: route as "/" });
  }

  const dailyStats = [
    {
      label: "Aujourd'hui",
      value: `${mockDriver.todayEarnings} TND`,
      icon: "💰",
    },
    {
      label: "Missions",
      value: String(mockDriver.completedToday),
      icon: "✅",
    },
    {
      label: "Note moyenne",
      value: null,
      icon: null,
      rating: mockDriver.rating,
    },
  ];

  return (
    <AppLayout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      title={pageTitle}
      userRole={effectiveRole}
    >
      <div className="px-4 py-4 space-y-5">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h2 className="font-display font-bold text-2xl text-foreground">
              Bonjour, {mockDriver.name.split(" ")[0]} 👋
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              {isAvailable ? "Vous êtes en service" : "Vous êtes hors service"}
            </p>
          </div>
          {/* PMR Label badge */}
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap"
            style={{
              background: "oklch(0.65 0.18 210 / 0.15)",
              color: "oklch(0.45 0.18 210)",
              border: "1px solid oklch(0.65 0.18 210 / 0.4)",
            }}
            aria-label="Certifié Label PMR"
          >
            <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />
            Label PMR ✓
          </span>
        </motion.div>

        {/* Availability toggle — prominent */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          data-ocid="driver.availability.card"
          className={cn(
            "p-4 rounded-2xl border shadow-xs transition-all duration-300",
            isAvailable ? "border-success/30" : "bg-muted/40 border-border",
          )}
          style={
            isAvailable
              ? { background: "oklch(0.6 0.16 140 / 0.06)" }
              : undefined
          }
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "w-2.5 h-2.5 rounded-full flex-shrink-0",
                    isAvailable
                      ? "bg-success animate-pulse"
                      : "bg-muted-foreground",
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    "font-bold text-base",
                    isAvailable ? "text-success" : "text-muted-foreground",
                  )}
                >
                  {isAvailable ? "En service" : "Hors service"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground pl-4">
                Dernière mise à jour: il y a 5 min
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="availability-toggle" className="sr-only">
                Activer la disponibilité
              </Label>
              <Switch
                id="availability-toggle"
                data-ocid="driver.availability.switch"
                checked={isAvailable}
                onCheckedChange={setIsAvailable}
                aria-label={
                  isAvailable ? "Passer hors service" : "Passer en service"
                }
                className="data-[state=checked]:bg-success"
              />
            </div>
          </div>
        </motion.div>

        {/* Active mission — with overlay dim if offline */}
        <div
          className={cn(
            "transition-opacity duration-300",
            !isAvailable && "opacity-40 pointer-events-none select-none",
          )}
        >
          {activeMission && (
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              aria-labelledby="active-mission-heading"
              className="p-4 rounded-2xl border shadow-sm space-y-3"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.50 0.18 220 / 0.05), oklch(0.68 0.18 95 / 0.05))",
                borderColor: "oklch(0.50 0.18 220 / 0.25)",
              }}
            >
              <h3
                id="active-mission-heading"
                className="font-bold text-foreground text-base"
              >
                Mission en cours 🚗
              </h3>

              {/* Client info */}
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-primary-foreground flex-shrink-0"
                  style={{ background: "oklch(0.50 0.18 220)" }}
                  aria-hidden="true"
                >
                  {activeMission.clientName
                    ? activeMission.clientName
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")
                    : "CL"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground">
                    {activeMission.clientName?.split(" ")[0] ?? "Client"}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                    <span aria-hidden="true">
                      {serviceIcons[activeMission.serviceType]}
                    </span>
                    <span>{serviceLabels[activeMission.serviceType]}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin
                      className="w-3 h-3 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <p className="text-xs text-muted-foreground truncate">
                      {activeMission.address}
                    </p>
                  </div>
                </div>
                <VerifiedBadge variant="small" />
              </div>

              {/* ETA control */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border">
                <span className="text-sm text-muted-foreground font-medium">
                  Temps estimé restant:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    data-ocid="driver.active_mission.eta_minus.button"
                    onClick={() => setEtaMinutes((v) => Math.max(1, v - 1))}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] min-w-[44px]"
                    aria-label="Diminuer le temps estimé"
                  >
                    <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <span className="font-bold text-foreground text-base w-14 text-center">
                    {etaMinutes} min
                  </span>
                  <button
                    type="button"
                    data-ocid="driver.active_mission.eta_plus.button"
                    onClick={() => setEtaMinutes((v) => v + 1)}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted-foreground/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px] min-w-[44px]"
                    aria-label="Augmenter le temps estimé"
                  >
                    <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <WejhaButton
                  data-ocid="driver.active_mission.contact_button"
                  variant="ghost"
                  size="sm"
                  className="flex-1"
                  aria-label="Contacter le client"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Contacter
                </WejhaButton>
                <WejhaButton
                  data-ocid="driver.active_mission.complete_button"
                  variant="secondary"
                  size="sm"
                  className="flex-1 font-bold"
                >
                  Mission terminée ✓
                </WejhaButton>
              </div>
            </motion.section>
          )}

          {/* Mission queue */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            aria-labelledby="queue-heading"
            className={activeMission ? "mt-5" : ""}
          >
            <div className="flex items-center justify-between mb-3">
              <h3
                id="queue-heading"
                className="font-semibold text-foreground text-base"
              >
                Nouvelles demandes
              </h3>
              {queuedMissions.length > 0 && (
                <Badge
                  data-ocid="driver.mission_queue.count_badge"
                  variant="secondary"
                  className="text-xs font-bold"
                >
                  {queuedMissions.length}
                </Badge>
              )}
            </div>

            {queuedMissions.length === 0 ? (
              <div
                data-ocid="driver.mission_queue.empty_state"
                className="flex flex-col items-center justify-center py-12 gap-3 text-center rounded-2xl bg-muted/40 border border-border"
              >
                <span className="text-5xl" aria-hidden="true">
                  🌙
                </span>
                <p className="font-semibold text-foreground text-sm">
                  Aucune nouvelle demande pour l'instant
                </p>
                <p className="text-xs text-muted-foreground max-w-[200px]">
                  Les nouvelles missions apparaîtront ici
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {queuedMissions.map((booking, i) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14 + i * 0.07 }}
                  >
                    <MissionQueueCard
                      booking={booking}
                      onAccept={(id) => console.log("accept", id)}
                      onDecline={(id) => console.log("decline", id)}
                      isPriority={booking.price >= 30}
                      index={i + 1}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Daily stats row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-3 gap-3 mt-5"
          >
            {dailyStats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 p-3 rounded-2xl bg-card border border-border text-center"
                data-ocid={`driver.daily_stat.${stat.label.toLowerCase().replace(/[\s']/g, "_")}.card`}
              >
                {stat.rating ? (
                  <>
                    <StarRating rating={stat.rating} size="sm" />
                    <p className="font-bold text-foreground text-sm">
                      {stat.rating}
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-xl" aria-hidden="true">
                      {stat.icon}
                    </span>
                    <p className="font-bold text-foreground text-sm">
                      {stat.value}
                    </p>
                  </>
                )}
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Driver stats widget */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            className="mt-5"
          >
            <DriverStatsWidget
              dailyEarnings={mockDriver.todayEarnings}
              weeklyData={mockDriver.weeklyData}
              totalMissions={mockDriver.totalMissions}
              avgRating={mockDriver.rating}
            />
          </motion.div>

          {/* PMR Certified badge — prominent bottom */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="mt-5 flex justify-center"
          >
            <div
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl font-bold text-sm shadow-sm"
              style={{
                background: "oklch(0.65 0.18 210 / 0.12)",
                color: "oklch(0.40 0.18 210)",
                border: "1.5px solid oklch(0.65 0.18 210 / 0.4)",
              }}
              aria-label="Label PMR certifié par Rafiqni"
            >
              <CheckCircle className="w-5 h-5" aria-hidden="true" />
              Label PMR Certifié ✓
            </div>
          </motion.div>
        </div>

        <div className="h-4" />
      </div>
    </AppLayout>
  );
}
