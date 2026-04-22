import Common "common";

module {
  // Internal mutable review record
  public type ReviewInternal = {
    id : Common.ReviewId;
    bookingId : Common.BookingId;
    reviewerId : Common.UserId;
    revieweeId : Common.UserId;
    stars : Nat; // 1–5
    text : Text;
    createdAt : Common.Timestamp;
  };

  // Shared review (API boundary)
  public type Review = {
    id : Common.ReviewId;
    bookingId : Common.BookingId;
    reviewerId : Common.UserId;
    revieweeId : Common.UserId;
    stars : Nat;
    text : Text;
    createdAt : Common.Timestamp;
  };
};
