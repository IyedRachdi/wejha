import Common "common";
import Bookings "bookings";

module {
  // Internal mutable mission record
  public type MissionInternal = {
    id : Common.MissionId;
    category : Bookings.ServiceType;
    description : Text;
    pointsReward : Nat;
    durationMinutes : Nat;
    payoutAmount : Nat; // in millimes
    var isActive : Bool;
    createdAt : Common.Timestamp;
  };

  // Shared mission (API boundary)
  public type Mission = {
    id : Common.MissionId;
    category : Bookings.ServiceType;
    description : Text;
    pointsReward : Nat;
    durationMinutes : Nat;
    payoutAmount : Nat;
    isActive : Bool;
    createdAt : Common.Timestamp;
  };

  public type StudentProgress = {
    points : Nat;
    badge : { #bronze; #silver; #gold };
    completedMissions : Nat;
    totalEarnings : Nat;
  };
};
