import { StarRating } from "@/components/ui/StarRating";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { WejhaButton } from "@/components/ui/WejhaButton";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  rating: number;
  reviewCount?: number;
  providerName: string;
  isVerified?: boolean;
  priceDisplay: string;
  onBook?: () => void;
  className?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  rating,
  reviewCount,
  providerName,
  isVerified,
  priceDisplay,
  onBook,
  className,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl shadow-md p-4 flex flex-col gap-3 min-h-[180px] border border-border",
        className,
      )}
      data-ocid="service_card.card"
    >
      {/* Header: provider + verified */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          {/* Avatar circle */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: "oklch(0.55 0.22 310 / 0.12)" }}
            aria-hidden="true"
          >
            {icon}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-foreground text-sm truncate">
              {providerName}
            </p>
            <StarRating rating={rating} size="sm" />
            {reviewCount !== undefined && (
              <span className="text-xs text-muted-foreground">
                ({reviewCount} avis)
              </span>
            )}
          </div>
        </div>
        {isVerified && <VerifiedBadge />}
      </div>

      {/* Title + description */}
      <div>
        <h3 className="font-display font-bold text-base text-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
          {description}
        </p>
      </div>

      {/* Footer: price + CTA */}
      <div className="flex items-center justify-between gap-3 mt-auto pt-1">
        <span
          className="font-bold text-base"
          style={{ color: "oklch(0.55 0.22 310)" }}
        >
          {priceDisplay}
        </span>
        <WejhaButton
          variant="primary"
          size="sm"
          onClick={onBook}
          data-ocid="service_card.book_button"
        >
          Réserver
        </WejhaButton>
      </div>
    </div>
  );
}
