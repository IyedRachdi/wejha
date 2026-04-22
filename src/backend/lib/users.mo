import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Types "../types/users";
import Common "../types/common";

module {
  public type State = {
    users : Map.Map<Common.UserId, Types.UserInternal>;
    var nextUserId : Nat;
  };

  public func newState() : State {
    {
      users = Map.empty();
      var nextUserId = 0;
    }
  };

  public func register(
    state : State,
    caller : Common.UserId,
    role : Types.UserRole,
    name : Text,
    phone : Text,
  ) : Common.Result<Common.UserId> {
    if (state.users.containsKey(caller)) {
      return #err("User already registered");
    };
    let now = Time.now();
    let user : Types.UserInternal = {
      id = caller;
      var name = name;
      var phone = phone;
      role = role;
      var verifiedBadge = false;
      var trustScore = 0;
      var profilePhotoKey = null;
      createdAt = now;
      var isPremium = false;
      var familyMembers = [];
      var points = 0;
      var badge = #bronze;
      var totalEarningsStudent = 0;
      var completedMissions = 0;
      var isAvailable = false;
      var driverLicense = null;
      var pmrLabel = false;
      var totalEarningsDriver = 0;
      var verificationDocKey = null;
    };
    state.users.add(caller, user);
    #ok(caller)
  };

  public func getProfile(
    state : State,
    caller : Common.UserId,
  ) : Common.Result<Types.UserProfile> {
    switch (state.users.get(caller)) {
      case null #err("User not found");
      case (?u) #ok(toPublic(u));
    }
  };

  public func updateProfile(
    state : State,
    caller : Common.UserId,
    name : Text,
    phone : Text,
    profilePhotoKey : ?Text,
  ) : Common.Result<()> {
    switch (state.users.get(caller)) {
      case null #err("User not found");
      case (?u) {
        u.name := name;
        u.phone := phone;
        u.profilePhotoKey := profilePhotoKey;
        #ok(())
      };
    }
  };

  public func toggleDriverAvailability(
    state : State,
    caller : Common.UserId,
    isAvailable : Bool,
  ) : Common.Result<()> {
    switch (state.users.get(caller)) {
      case null #err("User not found");
      case (?u) {
        switch (u.role) {
          case (#driver) {
            u.isAvailable := isAvailable;
            #ok(())
          };
          case _ #err("Only drivers can toggle availability");
        }
      };
    }
  };

  public func subscribePremium(
    state : State,
    caller : Common.UserId,
  ) : Common.Result<()> {
    switch (state.users.get(caller)) {
      case null #err("User not found");
      case (?u) {
        switch (u.role) {
          case (#pmr) {
            u.isPremium := true;
            #ok(())
          };
          case _ #err("Only PMR users can subscribe to premium");
        }
      };
    }
  };

  public func addFamilyMember(
    state : State,
    caller : Common.UserId,
    member : Common.UserId,
  ) : Common.Result<()> {
    switch (state.users.get(caller)) {
      case null #err("User not found");
      case (?u) {
        switch (u.role) {
          case (#pmr) {
            if (u.familyMembers.size() >= 5) {
              return #err("Maximum 5 family members allowed");
            };
            // Check if already added
            let exists = u.familyMembers.find(func(m) { Principal.equal(m, member) });
            switch (exists) {
              case (?_) #err("Family member already added");
              case null {
                u.familyMembers := u.familyMembers.concat([member]);
                #ok(())
              };
            }
          };
          case _ #err("Only PMR users can add family members");
        }
      };
    }
  };

  public func removeFamilyMember(
    state : State,
    caller : Common.UserId,
    member : Common.UserId,
  ) : Common.Result<()> {
    switch (state.users.get(caller)) {
      case null #err("User not found");
      case (?u) {
        switch (u.role) {
          case (#pmr) {
            u.familyMembers := u.familyMembers.filter<Common.UserId>(func(m) { not Principal.equal(m, member) });
            #ok(())
          };
          case _ #err("Only PMR users can remove family members");
        }
      };
    }
  };

  public func uploadVerificationDoc(
    state : State,
    caller : Common.UserId,
    _role : Types.UserRole,
    assetKey : Text,
  ) : Common.Result<()> {
    switch (state.users.get(caller)) {
      case null #err("User not found");
      case (?u) {
        u.verificationDocKey := ?assetKey;
        #ok(())
      };
    }
  };

  public func markVerified(
    state : State,
    target : Common.UserId,
  ) : Common.Result<()> {
    switch (state.users.get(target)) {
      case null #err("User not found");
      case (?u) {
        u.verifiedBadge := true;
        #ok(())
      };
    }
  };

  public func getPublicProviders(
    state : State,
    serviceType : { #student; #driver },
    minRating : Nat,
  ) : [Types.ProviderSummary] {
    let result = List.empty<Types.ProviderSummary>();
    state.users.forEach(func(_id, u) {
      let roleMatch = switch (serviceType) {
        case (#student) u.role == #student;
        case (#driver) u.role == #driver;
      };
      let ratingOk = u.trustScore >= minRating;
      let availOk = switch (serviceType) {
        case (#driver) u.isAvailable;
        case (#student) true;
      };
      if (roleMatch and ratingOk and availOk) {
        result.add({
          id = u.id;
          name = u.name;
          role = u.role;
          verifiedBadge = u.verifiedBadge;
          trustScore = u.trustScore;
          profilePhotoKey = u.profilePhotoKey;
          badge = u.badge;
          isAvailable = u.isAvailable;
        });
      };
    });
    result.toArray()
  };

  public func addPoints(
    state : State,
    studentId : Common.UserId,
    points : Nat,
    earnings : Nat,
  ) : Common.Result<()> {
    switch (state.users.get(studentId)) {
      case null #err("Student not found");
      case (?u) {
        switch (u.role) {
          case (#student) {
            let newPoints = u.points + points;
            u.points := newPoints;
            u.totalEarningsStudent := u.totalEarningsStudent + earnings;
            u.completedMissions := u.completedMissions + 1;
            // Auto-upgrade badge
            u.badge := if (newPoints > 200) { #gold }
              else if (newPoints > 50) { #silver }
              else { #bronze };
            #ok(())
          };
          case _ #err("User is not a student");
        }
      };
    }
  };

  public func updateTrustScore(
    state : State,
    userId : Common.UserId,
    newScore : Nat,
  ) {
    switch (state.users.get(userId)) {
      case null {};
      case (?u) { u.trustScore := newScore };
    }
  };

  public func toPublic(internal : Types.UserInternal) : Types.UserProfile {
    {
      id = internal.id;
      name = internal.name;
      phone = internal.phone;
      role = internal.role;
      verifiedBadge = internal.verifiedBadge;
      trustScore = internal.trustScore;
      profilePhotoKey = internal.profilePhotoKey;
      createdAt = internal.createdAt;
      isPremium = internal.isPremium;
      familyMembers = internal.familyMembers;
      points = internal.points;
      badge = internal.badge;
      totalEarningsStudent = internal.totalEarningsStudent;
      completedMissions = internal.completedMissions;
      isAvailable = internal.isAvailable;
      driverLicense = internal.driverLicense;
      pmrLabel = internal.pmrLabel;
      totalEarningsDriver = internal.totalEarningsDriver;
    }
  };
};
