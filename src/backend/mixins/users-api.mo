import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import UserTypes "../types/users";
import Common "../types/common";
import UserLib "../lib/users";
import BookingLib "../lib/bookings";
import MissionLib "../lib/missions";

mixin (
  userState : UserLib.State,
  bookingState : BookingLib.State,
  missionState : MissionLib.State,
) {
  public shared ({ caller }) func registerUser(
    role : UserTypes.UserRole,
    name : Text,
    phone : Text,
  ) : async Common.Result<Common.UserId> {
    UserLib.register(userState, caller, role, name, phone)
  };

  public shared query ({ caller }) func getMyProfile() : async Common.Result<UserTypes.UserProfile> {
    UserLib.getProfile(userState, caller)
  };

  public shared ({ caller }) func updateProfile(
    name : Text,
    phone : Text,
    profilePhotoKey : ?Text,
  ) : async Common.Result<()> {
    UserLib.updateProfile(userState, caller, name, phone, profilePhotoKey)
  };

  public shared ({ caller }) func toggleDriverAvailability(
    isAvailable : Bool,
  ) : async Common.Result<()> {
    UserLib.toggleDriverAvailability(userState, caller, isAvailable)
  };

  public shared ({ caller }) func subscribePremium() : async Common.Result<()> {
    UserLib.subscribePremium(userState, caller)
  };

  public shared ({ caller }) func addFamilyMember(
    member : Common.UserId,
  ) : async Common.Result<()> {
    UserLib.addFamilyMember(userState, caller, member)
  };

  public shared ({ caller }) func removeFamilyMember(
    member : Common.UserId,
  ) : async Common.Result<()> {
    UserLib.removeFamilyMember(userState, caller, member)
  };

  public shared ({ caller }) func uploadVerificationDoc(
    role : UserTypes.UserRole,
    assetKey : Text,
  ) : async Common.Result<()> {
    UserLib.uploadVerificationDoc(userState, caller, role, assetKey)
  };

  public shared query ({ caller }) func getMyStudentDashboard() : async UserTypes.StudentDashboard {
    let profile = switch (UserLib.getProfile(userState, caller)) {
      case (#ok(p)) p;
      case (#err(e)) Runtime.trap(e);
    };
    // Collect active bookings for this student
    let activeBookingIds = List.empty<Common.BookingId>();
    bookingState.bookings.forEach(func(_id, b) {
      let isProvider = switch (b.providerId) {
        case (?pid) Principal.equal(pid, caller);
        case null false;
      };
      let isActive = b.status == #confirmed or b.status == #enRoute or b.status == #arrived;
      if (isProvider and isActive) {
        activeBookingIds.add(b.id);
      };
    });
    // Collect recent missions from completed bookings
    let recentMissionIds = List.empty<Common.MissionId>();
    bookingState.bookings.forEach(func(_id, b) {
      let isProvider = switch (b.providerId) {
        case (?pid) Principal.equal(pid, caller);
        case null false;
      };
      if (isProvider and b.status == #completed) {
        switch (b.missionId) {
          case (?mid) recentMissionIds.add(mid);
          case null {};
        };
      };
    });
    {
      profile = profile;
      activeBookings = activeBookingIds.toArray();
      recentMissions = recentMissionIds.toArray();
    }
  };

  public shared query func getPublicProviders(
    serviceType : { #student; #driver },
    minRating : Nat,
  ) : async [UserTypes.ProviderSummary] {
    UserLib.getPublicProviders(userState, serviceType, minRating)
  };
};
