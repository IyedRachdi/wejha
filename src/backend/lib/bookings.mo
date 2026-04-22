import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Types "../types/bookings";
import Common "../types/common";

module {
  public type State = {
    bookings : Map.Map<Common.BookingId, Types.BookingInternal>;
    var nextId : Nat;
  };

  public func newState() : State {
    {
      bookings = Map.empty();
      var nextId = 0;
    }
  };

  public func requestBooking(
    state : State,
    caller : Common.UserId,
    req : Types.BookingRequest,
  ) : Common.Result<Common.BookingId> {
    let id = state.nextId;
    state.nextId := id + 1;
    let now = Time.now();
    let booking : Types.BookingInternal = {
      id = id;
      pmrUserId = caller;
      var providerId = null;
      serviceType = req.serviceType;
      var status = #requested;
      dateTime = req.dateTime;
      notes = req.notes;
      isPriority = req.isPriority;
      locationText = req.locationText;
      createdAt = now;
      var missionId = null;
    };
    state.bookings.add(id, booking);
    #ok(id)
  };

  public func getMyBookings(
    state : State,
    caller : Common.UserId,
  ) : [Types.Booking] {
    let result = List.empty<Types.Booking>();
    state.bookings.forEach(func(_id, b) {
      let isMine = Principal.equal(b.pmrUserId, caller) or (
        switch (b.providerId) {
          case (?pid) Principal.equal(pid, caller);
          case null false;
        }
      );
      if (isMine) { result.add(toPublic(b)) };
    });
    result.toArray()
  };

  public func updateStatus(
    state : State,
    updater : Common.UserId,
    bookingId : Common.BookingId,
    newStatus : Types.BookingStatus,
  ) : Common.Result<()> {
    switch (state.bookings.get(bookingId)) {
      case null #err("Booking not found");
      case (?b) {
        // PMR can cancel; provider can update other statuses
        let isCancelling = newStatus == #cancelled;
        let isPmr = Principal.equal(b.pmrUserId, updater);
        let isProvider = switch (b.providerId) {
          case (?pid) Principal.equal(pid, updater);
          case null false;
        };
        if (isCancelling and isPmr) {
          b.status := #cancelled;
          #ok(())
        } else if (isProvider) {
          b.status := newStatus;
          #ok(())
        } else {
          #err("Not authorized to update this booking")
        }
      };
    }
  };

  public func getDriverQueue(
    state : State,
    _driverId : Common.UserId,
  ) : [Types.Booking] {
    let result = List.empty<Types.Booking>();
    state.bookings.forEach(func(_id, b) {
      if (b.status == #requested and b.providerId == null) {
        result.add(toPublic(b));
      };
    });
    result.toArray()
  };

  public func acceptMission(
    state : State,
    student : Common.UserId,
    missionId : Common.MissionId,
    bookingId : Common.BookingId,
  ) : Common.Result<Common.BookingId> {
    // Create a new booking for the mission
    let id = state.nextId;
    state.nextId := id + 1;
    let now = Time.now();
    let booking : Types.BookingInternal = {
      id = id;
      pmrUserId = student; // student is requester for mission bookings
      var providerId = ?student;
      serviceType = #other;
      var status = #confirmed;
      dateTime = now;
      notes = "Mission booking";
      isPriority = false;
      locationText = "";
      createdAt = now;
      var missionId = ?missionId;
    };
    state.bookings.add(id, booking);
    // Mark the original booking as having a provider if bookingId is valid
    switch (state.bookings.get(bookingId)) {
      case (?b) {
        b.providerId := ?student;
        b.status := #confirmed;
      };
      case null {};
    };
    #ok(id)
  };

  public func getById(
    state : State,
    bookingId : Common.BookingId,
  ) : ?Types.BookingInternal {
    state.bookings.get(bookingId)
  };

  public func toPublic(internal : Types.BookingInternal) : Types.Booking {
    {
      id = internal.id;
      pmrUserId = internal.pmrUserId;
      providerId = internal.providerId;
      serviceType = internal.serviceType;
      status = internal.status;
      dateTime = internal.dateTime;
      notes = internal.notes;
      isPriority = internal.isPriority;
      locationText = internal.locationText;
      createdAt = internal.createdAt;
      missionId = internal.missionId;
    }
  };
};
