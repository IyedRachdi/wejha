import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type BookingId = Nat;
  public type MissionId = Nat;
  public type ReviewId = Nat;
  public type Timestamp = Time.Time;

  public type Result<T> = { #ok : T; #err : Text };
};
