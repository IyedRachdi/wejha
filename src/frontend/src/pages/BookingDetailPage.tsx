import { AppLayout } from "@/components/layout/AppLayout";
import { BookingStatusBar } from "@/components/ui/BookingStatusBar";
import { ProviderCard } from "@/components/ui/ProviderCard";
import { StarRating } from "@/components/ui/StarRating";
import { TrackingView } from "@/components/ui/TrackingView";
import { WejhaButton } from "@/components/ui/WejhaButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMockBookings, useMockProviders } from "@/hooks/useWejha";
import type { Booking } from "@/types/wejha";
import { useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";

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
  homeHelp: "Aide à domicile",
  other: "Autre",
};

function formatDate(ts: number): string {
  return new Intl.DateTimeFormat("fr-TN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(ts));
}

function ReviewModal({
  open,
  onClose,
  booking,
}: { open: boolean; onClose: () => void; booking: Booking }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (stars === 0) return;
    setSubmitted(true);
    setTimeout(onClose, 1500);
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-sm mx-auto rounded-2xl"
        data-ocid="review.dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-lg">
            Laisser un avis
          </DialogTitle>
        </DialogHeader>
        {submitted ? (
          <div
            className="flex flex-col items-center py-6 gap-3"
            data-ocid="review.success_state"
          >
            <span className="text-4xl">🎉</span>
            <p className="font-semibold text-foreground">
              Merci pour votre avis !
            </p>
          </div>
        ) : (
          <div className="space-y-5 pt-2">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Comment s'est passée votre expérience avec{" "}
                <strong>{booking.providerName ?? "le prestataire"}</strong> ?
              </p>
              <div className="flex justify-center mt-3">
                <StarRating
                  rating={stars}
                  interactive
                  onRate={setStars}
                  size="lg"
                />
              </div>
              {stars > 0 && (
                <p className="text-xs text-muted-foreground">
                  {
                    [
                      "",
                      "Très mauvais",
                      "Mauvais",
                      "Moyen",
                      "Bien",
                      "Excellent !",
                    ][stars]
                  }
                </p>
              )}
            </div>
            <textarea
              placeholder="Partagez votre expérience (optionnel)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              data-ocid="review.comment.textarea"
              className="w-full min-h-[96px] p-3 rounded-xl border border-input bg-card text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Commentaire sur la prestation"
            />
            <div className="flex gap-3">
              <WejhaButton
                variant="ghost"
                size="md"
                onClick={onClose}
                fullWidth
                data-ocid="review.cancel_button"
              >
                Annuler
              </WejhaButton>
              <WejhaButton
                variant="primary"
                size="md"
                onClick={handleSubmit}
                fullWidth
                disabled={stars === 0}
                data-ocid="review.submit_button"
              >
                Envoyer
              </WejhaButton>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function BookingDetailPage() {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) as { id?: string };
  const bookingId = params.id;
  const bookings = useMockBookings();
  const providers = useMockProviders();
  const [reviewOpen, setReviewOpen] = useState(false);

  const booking = bookings.find((b) => b.id === bookingId);
  const provider = booking?.providerId
    ? (providers.find((p) => p.id === booking.providerId) ?? null)
    : null;
  const showTracking =
    booking?.status === "enRoute" || booking?.status === "arrived";

  function handleTabChange(_key: string, route: string) {
    navigate({ to: route as "/" });
  }

  return (
    <AppLayout
      activeTab="bookings"
      onTabChange={handleTabChange}
      title="Réservation"
      userRole="pmr"
    >
      {/* Back button */}
      <div className="px-4 pt-4">
        <button
          type="button"
          data-ocid="booking_detail.back_link"
          onClick={() => navigate({ to: "/bookings" })}
          className="flex items-center gap-2 text-sm font-semibold min-h-[44px] -ml-1 px-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:opacity-70 transition-opacity"
          style={{ color: "oklch(0.50 0.18 220)" }}
          aria-label="Retour aux réservations"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour
        </button>
      </div>

      {!booking ? (
        <div
          className="flex flex-col items-center justify-center py-20 px-8 text-center"
          data-ocid="booking_detail.not_found.section"
        >
          <span className="text-5xl mb-4" aria-hidden="true">
            🔍
          </span>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">
            Réservation introuvable
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Cette réservation n'existe pas ou a été supprimée.
          </p>
          <WejhaButton
            variant="primary"
            size="md"
            onClick={() => navigate({ to: "/bookings" })}
            data-ocid="booking_detail.back_button"
          >
            Retour aux réservations
          </WejhaButton>
        </div>
      ) : (
        <div className="px-4 pb-6 space-y-5">
          {/* Status bar */}
          <div
            className="bg-card rounded-2xl p-4 border border-border"
            data-ocid="booking_detail.status_bar.section"
          >
            <BookingStatusBar status={booking.status} />
          </div>

          {/* Service info */}
          <div
            className="bg-card rounded-2xl p-4 border border-border space-y-3"
            data-ocid="booking_detail.service_info.section"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl" aria-hidden="true">
                {serviceIcons[booking.serviceType]}
              </span>
              <div>
                <span
                  className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: "oklch(0.50 0.18 220 / 0.1)",
                    color: "oklch(0.42 0.18 220)",
                  }}
                >
                  {serviceLabels[booking.serviceType]}
                </span>
                <p className="font-semibold text-foreground text-sm mt-1 leading-snug">
                  {booking.description}
                </p>
              </div>
            </div>
            <div className="space-y-2 pt-1 border-t border-border">
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>{booking.address}</span>
              </div>
              {booking.scheduledAt && (
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Calendar
                    className="w-4 h-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span>{formatDate(booking.scheduledAt)}</span>
                </div>
              )}
              <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                <span>Durée estimée : {booking.estimatedDuration} min</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <span className="text-sm text-muted-foreground font-medium">
                Tarif
              </span>
              <span
                className="font-bold text-lg"
                style={{ color: "oklch(0.50 0.18 220)" }}
              >
                {booking.price} DT
              </span>
            </div>
          </div>

          {/* Provider card (if assigned) */}
          {provider && (
            <section aria-labelledby="provider-section-title">
              <h2
                id="provider-section-title"
                className="font-display font-bold text-sm text-muted-foreground uppercase tracking-wide mb-2"
              >
                Votre prestataire
              </h2>
              <ProviderCard
                provider={provider}
                compact
                data-ocid="booking_detail.provider_card.card"
              />
            </section>
          )}

          {/* Tracking view */}
          {showTracking && (
            <section aria-labelledby="tracking-section-title">
              <h2
                id="tracking-section-title"
                className="font-display font-bold text-sm text-muted-foreground uppercase tracking-wide mb-2"
              >
                Suivi en temps réel
              </h2>
              <TrackingView
                booking={booking}
                onContact={() => {}}
                onComplete={() => {}}
              />
            </section>
          )}

          {/* Action buttons */}
          <div
            className="space-y-3 pt-2"
            data-ocid="booking_detail.actions.section"
          >
            {(booking.status === "requested" ||
              booking.status === "confirmed") && (
              <WejhaButton
                variant="ghost"
                size="lg"
                fullWidth
                data-ocid="booking_detail.cancel_button"
                onClick={() => navigate({ to: "/bookings" })}
              >
                Annuler la réservation
              </WejhaButton>
            )}
            {showTracking && (
              <WejhaButton
                variant="secondary"
                size="lg"
                fullWidth
                data-ocid="booking_detail.contact_button"
                onClick={() => {}}
              >
                📞 Contacter le prestataire
              </WejhaButton>
            )}
            {booking.status === "completed" && (
              <WejhaButton
                variant="primary"
                size="lg"
                fullWidth
                data-ocid="booking_detail.review_button"
                onClick={() => setReviewOpen(true)}
              >
                ⭐ Laisser un avis
              </WejhaButton>
            )}
          </div>
        </div>
      )}

      {booking && (
        <ReviewModal
          open={reviewOpen}
          onClose={() => setReviewOpen(false)}
          booking={booking}
        />
      )}
    </AppLayout>
  );
}
