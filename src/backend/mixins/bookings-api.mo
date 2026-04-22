import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import BookingTypes "../types/bookings";
import MissionTypes "../types/missions";
import Common "../types/common";
import BookingLib "../lib/bookings";
import MissionLib "../lib/missions";
import UserLib "../lib/users";

mixin (
  bookingState : BookingLib.State,
  missionState : MissionLib.State,
  userState : UserLib.State,
) {
  public shared ({ caller }) func requestBooking(
    req : BookingTypes.BookingRequest,
  ) : async Common.Result<Common.BookingId> {
    // Validate caller is PMR
    switch (userState.users.get(caller)) {
      case null return #err("User not found — please register first");
      case (?u) {
        if (u.role != #pmr) return #err("Only PMR users can request bookings");
        // Override isPriority from user's premium status if user is premium
        let effectiveReq : BookingTypes.BookingRequest = if (u.isPremium and not req.isPriority) {
          { req with isPriority = true }
        } else {
          req
        };
        BookingLib.requestBooking(bookingState, caller, effectiveReq)
      };
    }
  };

  public shared query ({ caller }) func getMyBookings() : async [BookingTypes.Booking] {
    BookingLib.getMyBookings(bookingState, caller)
  };

  public shared ({ caller }) func updateBookingStatus(
    bookingId : Common.BookingId,
    newStatus : BookingTypes.BookingStatus,
  ) : async Common.Result<()> {
    BookingLib.updateStatus(bookingState, caller, bookingId, newStatus)
  };

  public shared query ({ caller }) func getDriverQueue() : async [BookingTypes.Booking] {
    BookingLib.getDriverQueue(bookingState, caller)
  };

  public shared query func getAvailableMissions() : async [MissionTypes.Mission] {
    MissionLib.getAvailable(missionState)
  };

  public shared ({ caller }) func acceptMission(
    missionId : Common.MissionId,
  ) : async Common.Result<Common.BookingId> {
    // Validate caller is student
    switch (userState.users.get(caller)) {
      case null return #err("User not found");
      case (?u) {
        if (u.role != #student) return #err("Only students can accept missions");
      };
    };
    // Validate mission exists
    switch (MissionLib.getById(missionState, missionId)) {
      case null return #err("Mission not found");
      case (?_m) {};
    };
    // Use missionId as a pseudo bookingId seed (new booking will be created)
    BookingLib.acceptMission(bookingState, caller, missionId, missionId)
  };

  public shared ({ caller }) func completeMission(
    bookingId : Common.BookingId,
  ) : async Common.Result<MissionTypes.StudentProgress> {
    // Find the booking
    let booking = switch (BookingLib.getById(bookingState, bookingId)) {
      case null return #err("Booking not found");
      case (?b) b;
    };
    // Validate caller is the provider
    let isProvider = switch (booking.providerId) {
      case (?pid) Principal.equal(pid, caller);
      case null false;
    };
    if (not isProvider) return #err("Only the assigned provider can complete this mission");

    // Get the mission
    let missionId = switch (booking.missionId) {
      case null return #err("This booking is not linked to a mission");
      case (?mid) mid;
    };

    // Mark booking completed
    switch (BookingLib.updateStatus(bookingState, caller, bookingId, #completed)) {
      case (#err(e)) return #err(e);
      case (#ok(_)) {};
    };

    // Get mission reward
    let (pts, earnings) = switch (MissionLib.completeMission(missionState, missionId)) {
      case (#err(e)) return #err(e);
      case (#ok(v)) v;
    };

    // Add points + earnings to student
    switch (UserLib.addPoints(userState, caller, pts, earnings)) {
      case (#err(e)) return #err(e);
      case (#ok(_)) {};
    };

    // Return updated StudentProgress
    let user = switch (userState.users.get(caller)) {
      case null return #err("Student not found after update");
      case (?u) u;
    };
    #ok({
      points = user.points;
      badge = user.badge;
      completedMissions = user.completedMissions;
      totalEarnings = user.totalEarningsStudent;
    })
  };
};
