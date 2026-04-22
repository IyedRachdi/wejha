import { StarRating } from "@/components/ui/StarRating";
import { WejhaButton } from "@/components/ui/WejhaButton";
import { cn } from "@/lib/utils";
import type { Booking } from "@/types/wejha";
import { MapPin } from "lucide-react";

const serviceLabels: Record<string, { label: string; icon: string }> = {
  medical: { label: "Médical", icon: "🏥" },
  transport: { label: "Transport", icon: "🚗" },
  shopping: { label: "Courses", icon: "🛒" },
  homeHelp: { label: "Aide domicile", icon: "🏠" },
  other: { label: "Autre", icon: "✨" },
};

function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function timeAgo(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 60000);
  if (diff < 1) return "À l'instant";
  if (diff === 1) return "il y a 1 min";
  return `il y a ${diff} min`;
}

function estimatedPayout(price: number): string {
  return `~${price} DT`;
}

interface MissionQueueCardProps {
  booking: Booking;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
  isPriority?: boolean;
  index?: number;
}

export function MissionQueueCard({
  booking,
  onAccept,
  onDecline,
  isPriority = false,
  index = 1,
}: MissionQueueCardProps) {
  const clientName = booking.clientName ?? "Client";
  const clientFirstName = clientName.split(" ")[0] ?? "Client";
  const initials = getInitials(clientName);
  const service = serviceLabels[booking.serviceType];
  const timeReceived = timeAgo(booking.createdAt);
  const payout = estimatedPayout(booking.price);

  return (
    <div
      data-ocid={`driver.mission_queue.item.${index}`}
      className={cn(
        "relative p-4 rounded-2xl border shadow-xs space-y-3 transition-smooth",
        isPriority ? "bg-primary/5 border-primary/30" : "bg-card border-border",
      )}
    >
      {/* Priority chip */}
      {isPriority && (
        <span
          className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
          style={{
            background: "oklch(0.50 0.18 220 / 0.15)",
            color: "oklch(0.42 0.18 220)",
            border: "1px solid oklch(0.50 0.18 220 / 0.3)",
          }}
          aria-label="Mission prioritaire"
        >
          ⭐ Prioritaire
        </span>
      )}

      {/* Client row */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground flex-shrink-0"
          style={{ background: "oklch(0.50 0.18 220)" }}
          aria-hidden="true"
        >
          {initials}
        </div>

        {/* Client info */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">
            {clientFirstName}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-base" aria-hidden="true">
              {service?.icon}
            </span>
            <span className="text-xs text-muted-foreground">
              {service?.label}
            </span>
          </div>
        </div>

        {/* Payout */}
        <div className="text-right flex-shrink-0">
          <p
            className="font-bold text-base"
            style={{ color: "oklch(0.55 0.20 200)" }}
          >
            {payout}
          </p>
          <p className="text-[10px] text-muted-foreground">{timeReceived}</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-1.5">
        <MapPin
          className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0"
          aria-hidden="true"
        />
        <p className="text-xs text-muted-foreground line-clamp-1 min-w-0">
          {booking.address}
        </p>
      </div>

      {/* Rating preview if available */}
      {booking.providerRating && (
        <div className="flex items-center gap-1.5">
          <StarRating rating={booking.providerRating} size="sm" />
          <span className="text-xs text-muted-foreground">
            {booking.providerRating}
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-2 pt-1">
        <WejhaButton
          data-ocid={`driver.mission_queue.decline_button.${index}`}
          variant="ghost"
          size="sm"
          className="flex-1"
          onClick={() => onDecline(booking.id)}
          aria-label="Décliner cette mission"
        >
          Décliner
        </WejhaButton>
        <WejhaButton
          data-ocid={`driver.mission_queue.accept_button.${index}`}
          variant="secondary"
          size="sm"
          className="flex-1 font-bold"
          onClick={() => onAccept(booking.id)}
          aria-label="Accepter cette mission"
        >
          Accepter
        </WejhaButton>
      </div>

      {/* Swipe hint */}
      <p
        className="text-center text-[10px] text-muted-foreground/60 pt-0.5"
        aria-hidden="true"
      >
        Glissez pour accepter
      </p>
    </div>
  );
}
