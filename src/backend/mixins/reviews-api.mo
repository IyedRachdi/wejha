import Principal "mo:core/Principal";
import Common "../types/common";
import ReviewLib "../lib/reviews";
import BookingLib "../lib/bookings";
import UserLib "../lib/users";

mixin (
  reviewState : ReviewLib.State,
  bookingState : BookingLib.State,
  userState : UserLib.State,
) {
  public shared ({ caller }) func submitReview(
    bookingId : Common.BookingId,
    stars : Nat,
    text : Text,
  ) : async Common.Result<()> {
    // Validate booking exists and is completed
    let booking = switch (BookingLib.getById(bookingState, bookingId)) {
      case null return #err("Booking not found");
      case (?b) b;
    };
    if (booking.status != #completed) {
      return #err("Can only review completed bookings");
    };
    // Validate reviewer participated (is PMR or provider)
    let isPmr = Principal.equal(booking.pmrUserId, caller);
    let isProvider = switch (booking.providerId) {
      case (?pid) Principal.equal(pid, caller);
      case null false;
    };
    if (not isPmr and not isProvider) {
      return #err("You did not participate in this booking");
    };
    // Determine reviewee: if caller is PMR, review the provider; if provider, review the PMR
    let revieweeId = if (isPmr) {
      switch (booking.providerId) {
        case null return #err("No provider to review");
        case (?pid) pid;
      }
    } else {
      booking.pmrUserId
    };

    // Submit review
    switch (ReviewLib.submitReview(reviewState, caller, bookingId, revieweeId, stars, text)) {
      case (#err(e)) return #err(e);
      case (#ok(_reviewId)) {};
    };

    // Update trust score on reviewee
    let newScore = ReviewLib.averageRating(reviewState, revieweeId);
    UserLib.updateTrustScore(userState, revieweeId, newScore);

    #ok(())
  };
};
