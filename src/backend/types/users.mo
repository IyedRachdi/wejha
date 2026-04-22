import Common "common";

module {
  public type UserId = Common.UserId;

  public type UserRole = {
    #pmr;
    #student;
    #driver;
  };

  public type StudentBadge = {
    #bronze;
    #silver;
    #gold;
  };

  // Internal mutable user record
  public type UserInternal = {
    id : UserId;
    var name : Text;
    var phone : Text;
    role : UserRole;
    var verifiedBadge : Bool;
    var trustScore : Nat;
    var profilePhotoKey : ?Text;
    createdAt : Common.Timestamp;
    // PMR extras
    var isPremium : Bool;
    var familyMembers : [UserId];
    // Student extras
    var points : Nat;
    var badge : StudentBadge;
    var totalEarningsStudent : Nat; // in millimes
    var completedMissions : Nat;
    // Driver extras
    var isAvailable : Bool;
    var driverLicense : ?Text;
    var pmrLabel : Bool;
    var totalEarningsDriver : Nat; // in millimes
    // Verification
    var verificationDocKey : ?Text;
  };

  // Shared (API boundary) user profile
  public type UserProfile = {
    id : UserId;
    name : Text;
    phone : Text;
    role : UserRole;
    verifiedBadge : Bool;
    trustScore : Nat;
    profilePhotoKey : ?Text;
    createdAt : Common.Timestamp;
    // PMR extras
    isPremium : Bool;
    familyMembers : [UserId];
    // Student extras
    points : Nat;
    badge : StudentBadge;
    totalEarningsStudent : Nat;
    completedMissions : Nat;
    // Driver extras
    isAvailable : Bool;
    driverLicense : ?Text;
    pmrLabel : Bool;
    totalEarningsDriver : Nat;
  };

  public type ProviderSummary = {
    id : UserId;
    name : Text;
    role : UserRole;
    verifiedBadge : Bool;
    trustScore : Nat;
    profilePhotoKey : ?Text;
    badge : StudentBadge;
    isAvailable : Bool;
  };

  public type StudentDashboard = {
    profile : UserProfile;
    activeBookings : [Common.BookingId];
    recentMissions : [Common.MissionId];
  };
};
