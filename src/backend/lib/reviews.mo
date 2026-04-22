import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/reviews";
import Common "../types/common";

module {
  public type State = {
    reviews : Map.Map<Common.ReviewId, Types.ReviewInternal>;
    var nextId : Nat;
  };

  public func newState() : State {
    {
      reviews = Map.empty();
      var nextId = 0;
    }
  };

  public func submitReview(
    state : State,
    caller : Common.UserId,
    bookingId : Common.BookingId,
    revieweeId : Common.UserId,
    stars : Nat,
    text : Text,
  ) : Common.Result<Common.ReviewId> {
    if (stars < 1 or stars > 5) {
      return #err("Stars must be between 1 and 5");
    };
    // Prevent duplicate review per booking per reviewer
    let duplicate = state.reviews.any(func(_id, r) {
      r.bookingId == bookingId and Principal.equal(r.reviewerId, caller)
    });
    if (duplicate) {
      return #err("You have already reviewed this booking");
    };
    let id = state.nextId;
    state.nextId := id + 1;
    let review : Types.ReviewInternal = {
      id = id;
      bookingId = bookingId;
      reviewerId = caller;
      revieweeId = revieweeId;
      stars = stars;
      text = text;
      createdAt = Time.now();
    };
    state.reviews.add(id, review);
    #ok(id)
  };

  public func getForUser(
    state : State,
    userId : Common.UserId,
  ) : [Types.Review] {
    let result = List.empty<Types.Review>();
    state.reviews.forEach(func(_id, r) {
      if (Principal.equal(r.revieweeId, userId)) {
        result.add(toPublic(r));
      };
    });
    result.toArray()
  };

  public func averageRating(
    state : State,
    userId : Common.UserId,
  ) : Nat {
    var total : Nat = 0;
    var count : Nat = 0;
    state.reviews.forEach(func(_id, r) {
      if (Principal.equal(r.revieweeId, userId)) {
        total := total + r.stars;
        count := count + 1;
      };
    });
    if (count == 0) { 0 } else { total / count }
  };

  public func toPublic(internal : Types.ReviewInternal) : Types.Review {
    {
      id = internal.id;
      bookingId = internal.bookingId;
      reviewerId = internal.reviewerId;
      revieweeId = internal.revieweeId;
      stars = internal.stars;
      text = internal.text;
      createdAt = internal.createdAt;
    }
  };
};
