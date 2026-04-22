import { AppLayout } from "@/components/layout/AppLayout";
import { FamilyModeCard } from "@/components/ui/FamilyModeCard";
import { SubscriptionCard } from "@/components/ui/SubscriptionCard";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAccessibility, useAuth } from "@/hooks/useWejha";
import { cn } from "@/lib/utils";
import type { FamilyMember } from "@/types/wejha";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  ExternalLink,
  Globe,
  HelpCircle,
  RefreshCcw,
  Shield,
  Smartphone,
  Type,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const INITIAL_MEMBERS: FamilyMember[] = [
  { name: "Ahmed Bouzid", phone: "+216 25 123 456", relation: "Fils" },
];

function SectionTitle({
  id,
  children,
}: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="font-semibold text-foreground text-sm mb-2 px-1">
      {children}
    </h3>
  );
}

function SettingRow({
  icon,
  title,
  description,
  ocid,
  rightElement,
  onClick,
  disabled,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  ocid: string;
  rightElement?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full flex items-center gap-3 py-3 px-2 text-left rounded-xl transition-colors min-h-[56px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/50",
      )}
    >
      <div className="w-9 h-9 rounded-xl bg-foreground/8 flex items-center justify-center flex-shrink-0 text-foreground/70">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {rightElement ?? (
        <ChevronRight
          className="w-4 h-4 text-muted-foreground flex-shrink-0"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [familyMembers, setFamilyMembers] =
    useState<FamilyMember[]>(INITIAL_MEMBERS);
  const { userRole } = useAuth();
  const { textSize, highContrast, setTextSize, toggleHighContrast } =
    useAccessibility();
  const navigate = useNavigate();
  const isPmr = (userRole ?? "pmr") === "pmr";

  function handleTabChange(key: string, route: string) {
    setActiveTab(key);
    navigate({ to: route as "/" });
  }

  function handleRemoveMember(idx: number) {
    setFamilyMembers((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleAddMember() {
    const newMember: FamilyMember = {
      name: `Proche ${familyMembers.length + 1}`,
      phone: "+216 XX XXX XXX",
      relation: "Proche",
    };
    setFamilyMembers((prev) => [...prev, newMember]);
  }

  function handleReset() {
    setTextSize("medium");
    if (highContrast) toggleHighContrast();
  }

  return (
    <AppLayout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      title="Paramètres"
      userRole={userRole ?? "pmr"}
    >
      <div className="px-4 py-4 space-y-5">
        {/* Accessibility card — prominent with violet border */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          aria-labelledby="access-heading"
          className="rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 space-y-4"
          data-ocid="settings.accessibility.card"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3
                id="access-heading"
                className="font-bold text-foreground text-base flex items-center gap-2"
              >
                <span aria-hidden="true">♿</span> Accessibilité
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Pour une meilleure lisibilité
              </p>
            </div>
            <button
              type="button"
              data-ocid="settings.accessibility.reset_button"
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1 min-h-[44px]"
              aria-label="Réinitialiser les paramètres d'accessibilité"
            >
              <RefreshCcw className="w-3.5 h-3.5" aria-hidden="true" />
              Réinitialiser
            </button>
          </div>

          {/* Text size */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Type className="w-4 h-4 text-primary" aria-hidden="true" />
              <Label className="text-sm font-semibold text-foreground">
                Taille du texte
              </Label>
            </div>
            <fieldset className="grid grid-cols-3 gap-2 border-0 p-0 m-0">
              <legend className="sr-only">
                Sélectionnez la taille du texte
              </legend>
              {(
                [
                  { key: "small" as const, label: "S" },
                  { key: "medium" as const, label: "M" },
                  { key: "large" as const, label: "L" },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  data-ocid={`settings.text_size_${key}.button`}
                  onClick={() => setTextSize(key)}
                  aria-pressed={textSize === key}
                  className={cn(
                    "py-3 rounded-xl border text-sm font-bold transition-all min-h-[44px]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    textSize === key
                      ? "bg-primary text-primary-foreground border-primary shadow-sm"
                      : "bg-card border-border text-foreground hover:bg-muted",
                  )}
                >
                  {label}
                </button>
              ))}
            </fieldset>
          </div>

          {/* High contrast toggle */}
          <div className="flex items-center justify-between py-1">
            <div className="flex-1 min-w-0">
              <Label
                htmlFor="high-contrast-toggle"
                className="text-sm font-semibold text-foreground"
              >
                Mode contraste élevé
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                Pour une meilleure lisibilité
              </p>
            </div>
            <Switch
              id="high-contrast-toggle"
              data-ocid="settings.high_contrast.switch"
              checked={highContrast}
              onCheckedChange={toggleHighContrast}
              aria-label="Activer le contraste élevé"
            />
          </div>
        </motion.section>

        {/* Notifications */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          aria-labelledby="notif-heading"
        >
          <SectionTitle id="notif-heading">Notifications</SectionTitle>
          <div className="rounded-2xl bg-card border border-border px-2 py-1">
            <SettingRow
              icon={<Smartphone className="w-4 h-4" aria-hidden="true" />}
              title="Notifications push"
              description="Alertes réservations et mises à jour"
              ocid="settings.push_notifications.row"
              rightElement={
                <Switch
                  data-ocid="settings.push_notifications.switch"
                  checked={pushNotif}
                  onCheckedChange={setPushNotif}
                  aria-label="Notifications push"
                />
              }
            />
            <Separator className="mx-2" />
            <SettingRow
              icon={<Bell className="w-4 h-4" aria-hidden="true" />}
              title="Notifications email"
              description="Confirmations et rappels par email"
              ocid="settings.email_notifications.row"
              rightElement={
                <Switch
                  data-ocid="settings.email_notifications.switch"
                  checked={emailNotif}
                  onCheckedChange={setEmailNotif}
                  aria-label="Notifications email"
                />
              }
            />
          </div>
        </motion.section>

        {/* Language */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          aria-labelledby="lang-heading"
        >
          <SectionTitle id="lang-heading">Langue</SectionTitle>
          <div className="rounded-2xl bg-card border border-border px-2 py-1">
            <SettingRow
              icon={<Globe className="w-4 h-4" aria-hidden="true" />}
              title="Langue de l'application"
              description="Français (v1)"
              ocid="settings.language.row"
              disabled
              rightElement={
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  Français
                </span>
              }
            />
          </div>
        </motion.section>

        {/* Family mode — PMR only */}
        {isPmr && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            aria-labelledby="family-heading"
          >
            <SectionTitle id="family-heading">Mode Famille</SectionTitle>
            <FamilyModeCard
              members={familyMembers}
              onAddMember={handleAddMember}
              onRemoveMember={handleRemoveMember}
            />
          </motion.section>
        )}

        {/* Premium subscription — PMR only */}
        {isPmr && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            aria-labelledby="sub-heading"
          >
            <SectionTitle id="sub-heading">Abonnement</SectionTitle>
            <SubscriptionCard
              isPremium={false}
              onSubscribe={() => {}}
              onManage={() => {}}
            />
          </motion.section>
        )}

        {/* About / Legal */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          aria-labelledby="about-heading"
        >
          <SectionTitle id="about-heading">À propos</SectionTitle>
          <div className="rounded-2xl bg-card border border-border px-2 py-1">
            <SettingRow
              icon={<Shield className="w-4 h-4" aria-hidden="true" />}
              title="Politique de confidentialité"
              ocid="settings.privacy_policy.link"
              rightElement={
                <ExternalLink
                  className="w-4 h-4 text-muted-foreground"
                  aria-hidden="true"
                />
              }
            />
            <Separator className="mx-2" />
            <SettingRow
              icon={<ExternalLink className="w-4 h-4" aria-hidden="true" />}
              title="Conditions générales (CGU)"
              ocid="settings.cgu.link"
              rightElement={
                <ExternalLink
                  className="w-4 h-4 text-muted-foreground"
                  aria-hidden="true"
                />
              }
            />
            <Separator className="mx-2" />
            <SettingRow
              icon={<HelpCircle className="w-4 h-4" aria-hidden="true" />}
              title="Contacter le support"
              description="Signaler un problème ou obtenir de l'aide"
              ocid="settings.support.link"
            />
          </div>
        </motion.section>

        {/* App version */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
          className="text-center py-4 space-y-1"
        >
          <p className="text-sm font-bold text-foreground">Rafiqni رافقني</p>
          <p className="text-xs text-muted-foreground">Version 1.0.0</p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </motion.div>

        <div className="h-4" />
      </div>
    </AppLayout>
  );
}
