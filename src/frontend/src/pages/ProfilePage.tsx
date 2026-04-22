import { AppLayout } from "@/components/layout/AppLayout";
import { BadgeWidget } from "@/components/ui/BadgeWidget";
import { StarRating } from "@/components/ui/StarRating";
import { SubscriptionCard } from "@/components/ui/SubscriptionCard";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { WejhaButton } from "@/components/ui/WejhaButton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useWejha";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/wejha";
import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  Camera,
  CheckCircle,
  ChevronRight,
  Crown,
  Eye,
  EyeOff,
  LogOut,
  Star,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const mockProfile = {
  id: "u-001",
  name: "Salma Bouzid",
  phone: "+216 22 345 678",
  email: "salma.bouzid@example.tn",
  role: "pmr" as const,
  verifiedBadge: true,
  trustScore: 4.8,
  reviewCount: 24,
  isPremium: false,
  points: 340,
  badge: "silver" as const,
  totalEarnings: 0,
  completedMissions: 0,
  familyMembers: [
    { name: "Ahmed Bouzid", phone: "+216 25 123 456", relation: "Fils" },
  ],
  createdAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
};

const mockReviews = [
  {
    id: "r-001",
    authorName: "Amira B.",
    stars: 5,
    text: "Très agréable, toujours ponctuelle et attentionnée. Je recommande vivement !",
    createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: "r-002",
    authorName: "Yassine C.",
    stars: 4,
    text: "Bonne communication, a su s'adapter à mes besoins spécifiques.",
    createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
  },
];

function Avatar({ name, size = "lg" }: { name: string; size?: "sm" | "lg" }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const cls = size === "lg" ? "w-16 h-16 text-2xl" : "w-8 h-8 text-sm";
  return (
    <div
      className={cn(
        "rounded-2xl bg-primary/20 flex items-center justify-center font-bold text-primary flex-shrink-0",
        cls,
      )}
    >
      {initials}
    </div>
  );
}

function InfoField({
  label,
  value,
  ocid,
}: {
  label: string;
  value: string;
  ocid: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-muted/40 border border-border min-h-[44px]">
        <span className="text-sm font-medium text-foreground">{value}</span>
        <button
          type="button"
          data-ocid={ocid}
          className="text-primary text-xs font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-1"
          aria-label={`Modifier ${label}`}
        >
          Modifier
        </button>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();
  const profile = { ...mockProfile, role: (userRole ?? "pmr") as UserRole };
  const isStudent = profile.role === "student";

  function handleTabChange(key: string, route: string) {
    setActiveTab(key);
    navigate({ to: route as "/" });
  }

  function handleLogout() {
    logout();
    navigate({ to: "/" });
  }

  function handleDeleteAccount() {
    logout();
    navigate({ to: "/" });
  }

  return (
    <AppLayout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      title="Mon profil"
      userRole={userRole ?? "pmr"}
    >
      <div className="px-4 py-4 space-y-4">
        {/* Header card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-card border border-border shadow-sm"
          data-ocid="profile.header.card"
        >
          <div className="flex items-start gap-4">
            <div className="relative">
              <Avatar name={profile.name} size="lg" />
              <button
                type="button"
                data-ocid="profile.edit_photo.button"
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Modifier la photo"
              >
                <Camera className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-xl text-foreground truncate">
                {profile.name}
              </h2>
              <p className="text-sm text-muted-foreground">{profile.phone}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {profile.verifiedBadge && <VerifiedBadge variant="small" />}
                {profile.isPremium && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning/10 text-warning text-xs font-semibold border border-warning/20">
                    <Crown className="w-3 h-3" aria-hidden="true" />
                    Premium
                  </span>
                )}
                {isStudent && profile.badge && (
                  <BadgeWidget
                    badge={profile.badge}
                    points={profile.points}
                    compact
                  />
                )}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
            {[
              {
                label: "Note",
                value: profile.trustScore.toFixed(1),
                icon: (
                  <Star className="w-4 h-4 text-warning" aria-hidden="true" />
                ),
              },
              {
                label: "Avis",
                value: `${profile.reviewCount}`,
                icon: <span aria-hidden="true">💬</span>,
              },
              {
                label: "Depuis",
                value: "Jan 2024",
                icon: <span aria-hidden="true">📅</span>,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <div className="flex items-center gap-1">
                  {stat.icon}
                  <span className="font-bold text-foreground">
                    {stat.value}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Student badge widget */}
        {isStudent && profile.badge && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 }}
          >
            <BadgeWidget
              badge={profile.badge}
              points={profile.points}
              showProgress
            />
          </motion.div>
        )}

        {/* Contact info */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          aria-labelledby="contact-heading"
          className="rounded-2xl bg-card border border-border p-4 space-y-3"
        >
          <h3
            id="contact-heading"
            className="font-semibold text-foreground text-sm"
          >
            Informations de contact
          </h3>
          <InfoField
            label="Téléphone"
            value={profile.phone}
            ocid="profile.phone.edit_button"
          />
          <InfoField
            label="Email"
            value={profile.email}
            ocid="profile.email.edit_button"
          />
        </motion.section>

        {/* Verification */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          aria-labelledby="verif-heading"
          className="rounded-2xl bg-card border border-border p-4"
        >
          <h3
            id="verif-heading"
            className="font-semibold text-foreground text-sm mb-3"
          >
            Vérification du profil
          </h3>
          {profile.verifiedBadge ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-success/10 border border-success/20">
              <CheckCircle
                className="w-5 h-5 text-success flex-shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-success">
                  Documents vérifiés ✓
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Votre profil est certifié
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-warning/10 border border-warning/20">
              <Upload
                className="w-5 h-5 text-warning flex-shrink-0"
                aria-hidden="true"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-warning">
                  Profil non vérifié
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Soumettez vos documents
                </p>
              </div>
              <button
                type="button"
                data-ocid="profile.verify.button"
                className="text-xs font-bold text-warning border border-warning/40 rounded-lg px-3 py-2 hover:bg-warning/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning min-h-[44px]"
              >
                Vérifier →
              </button>
            </div>
          )}
        </motion.section>

        {/* Reviews */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          aria-labelledby="reviews-heading"
          className="rounded-2xl bg-card border border-border p-4 space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3
              id="reviews-heading"
              className="font-semibold text-foreground text-sm"
            >
              Avis reçus
            </h3>
            <div className="flex items-center gap-1.5">
              <StarRating rating={profile.trustScore} size="sm" />
              <span className="text-sm font-bold text-foreground">
                {profile.trustScore}
              </span>
              <span className="text-xs text-muted-foreground">
                ({profile.reviewCount} avis)
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {mockReviews.map((review, i) => (
              <div
                key={review.id}
                data-ocid={`profile.review.item.${i + 1}`}
                className="p-3 rounded-xl bg-muted/30 border border-border/50 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    {review.authorName}
                  </span>
                  <StarRating rating={review.stars} size="sm" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
          <button
            type="button"
            data-ocid="profile.all_reviews.button"
            className="flex items-center gap-1 text-primary text-sm font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded min-h-[44px] px-2"
          >
            Voir tous les avis{" "}
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </motion.section>

        {/* Account preferences */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          aria-labelledby="prefs-heading"
          className="rounded-2xl bg-card border border-border p-4 space-y-3"
        >
          <h3
            id="prefs-heading"
            className="font-semibold text-foreground text-sm"
          >
            Préférences du compte
          </h3>
          <div className="flex items-center justify-between min-h-[44px]">
            <div className="flex items-center gap-2">
              <Bell
                className="w-4 h-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Label
                htmlFor="notif-toggle"
                className="text-sm font-medium text-foreground"
              >
                Notifications
              </Label>
            </div>
            <Switch
              id="notif-toggle"
              data-ocid="profile.notifications.switch"
              checked={notifEnabled}
              onCheckedChange={setNotifEnabled}
              aria-label="Activer les notifications"
            />
          </div>
          <div className="flex items-center justify-between min-h-[44px]">
            <div className="flex items-center gap-2">
              {profileVisible ? (
                <Eye
                  className="w-4 h-4 text-muted-foreground"
                  aria-hidden="true"
                />
              ) : (
                <EyeOff
                  className="w-4 h-4 text-muted-foreground"
                  aria-hidden="true"
                />
              )}
              <Label
                htmlFor="visibility-toggle"
                className="text-sm font-medium text-foreground"
              >
                Profil visible
              </Label>
            </div>
            <Switch
              id="visibility-toggle"
              data-ocid="profile.visibility.switch"
              checked={profileVisible}
              onCheckedChange={setProfileVisible}
              aria-label="Rendre le profil visible"
            />
          </div>
        </motion.section>

        {/* Premium CTA / Status */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
        >
          <SubscriptionCard
            isPremium={profile.isPremium}
            onSubscribe={() => navigate({ to: "/settings" })}
            onManage={() => navigate({ to: "/settings" })}
          />
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.16 }}
          className="space-y-3"
        >
          <WejhaButton
            data-ocid="profile.logout.button"
            variant="ghost"
            size="md"
            fullWidth
            onClick={handleLogout}
            className="text-destructive border-destructive/20 hover:bg-destructive/5"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            Se déconnecter
          </WejhaButton>

          {/* Delete account */}
          <div className="flex justify-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  data-ocid="profile.delete_account.button"
                  className="text-xs text-destructive hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-destructive rounded min-h-[44px] px-3"
                >
                  Supprimer mon compte
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent data-ocid="profile.delete_dialog">
                <AlertDialogHeader>
                  <AlertDialogTitle>Supprimer le compte ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action est irréversible. Toutes vos données seront
                    définitivement supprimées.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel data-ocid="profile.delete_cancel.button">
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    data-ocid="profile.delete_confirm.button"
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Supprimer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>

        {/* Branding */}
        <p className="text-center text-xs text-muted-foreground py-2">
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
        <div className="h-4" />
      </div>
    </AppLayout>
  );
}
