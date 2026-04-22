import Common "common";

module {
  public type ServiceType = {
    #medical;
    #transport;
    #shopping;
    #homeHelp;
    #other;
  };

  public type BookingStatus = {
    #requested;
    #confirmed;
    #enRoute;
    #arrived;
    #completed;
    #cancelled;
  };

  // Shared request input
  public type BookingRequest = {
    serviceType : ServiceType;
    dateTime : Common.Timestamp;
    notes : Text;
    isPriority : Bool;
    locationText : Text;
  };

  // Internal mutable booking record
  public type BookingInternal = {
    id : Common.BookingId;
    pmrUserId : Common.UserId;
    var providerId : ?Common.UserId;
    serviceType : ServiceType;
    var status : BookingStatus;
    dateTime : Common.Timestamp;
    notes : Text;
    isPriority : Bool;
    locationText : Text;
    createdAt : Common.Timestamp;
    var missionId : ?Common.MissionId;
  };

  // Shared booking record (API boundary)
  public type Booking = {
    id : Common.BookingId;
    pmrUserId : Common.UserId;
    providerId : ?Common.UserId;
    serviceType : ServiceType;
    status : BookingStatus;
    dateTime : Common.Timestamp;
    notes : Text;
    isPriority : Bool;
    locationText : Text;
    createdAt : Common.Timestamp;
    missionId : ?Common.MissionId;
  };
};
