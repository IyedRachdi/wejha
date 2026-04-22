import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/missions";
import Common "../types/common";

module {
  public type State = {
    missions : Map.Map<Common.MissionId, Types.MissionInternal>;
    var nextId : Nat;
  };

  public func newState() : State {
    {
      missions = Map.empty();
      var nextId = 0;
    }
  };

  public func seedMissions(state : State) {
    let now = Time.now();
    let seeds : [(Nat, Text, { #medical; #transport; #shopping; #homeHelp; #other }, Nat, Nat, Nat)] = [
      (0, "Accompagnement médical — escorte vers clinique ou hôpital", #medical, 50, 120, 25000),
      (1, "Transport adapté — déplacement en taxi PMR labellisé", #transport, 40, 60, 20000),
      (2, "Courses alimentaires — aide aux achats et livraison", #shopping, 30, 60, 15000),
      (3, "Aide administrative — démarches en mairie ou banque", #homeHelp, 35, 120, 18000),
      (4, "Assistance numérique — aide téléphone, ordinateur, tablette", #other, 25, 60, 12000),
      (5, "Compagnie lecture — lire à voix haute ou échange social", #other, 20, 60, 10000),
    ];
    for ((idx, desc, cat, pts, dur, pay) in seeds.vals()) {
      let m : Types.MissionInternal = {
        id = idx;
        category = cat;
        description = desc;
        pointsReward = pts;
        durationMinutes = dur;
        payoutAmount = pay;
        var isActive = true;
        createdAt = now;
      };
      state.missions.add(idx, m);
      state.nextId := idx + 1;
    };
  };

  public func getAvailable(state : State) : [Types.Mission] {
    let result = List.empty<Types.Mission>();
    state.missions.forEach(func(_id, m) {
      if (m.isActive) { result.add(toPublic(m)) };
    });
    result.toArray()
  };

  public func getById(
    state : State,
    missionId : Common.MissionId,
  ) : ?Types.MissionInternal {
    state.missions.get(missionId)
  };

  public func completeMission(
    state : State,
    missionId : Common.MissionId,
  ) : Common.Result<(Nat, Nat)> {
    // Returns (pointsReward, payoutAmount) for the student
    switch (state.missions.get(missionId)) {
      case null #err("Mission not found");
      case (?m) {
        if (not m.isActive) return #err("Mission is not active");
        #ok((m.pointsReward, m.payoutAmount))
      };
    }
  };

  public func toPublic(internal : Types.MissionInternal) : Types.Mission {
    {
      id = internal.id;
      category = internal.category;
      description = internal.description;
      pointsReward = internal.pointsReward;
      durationMinutes = internal.durationMinutes;
      payoutAmount = internal.payoutAmount;
      isActive = internal.isActive;
      createdAt = internal.createdAt;
    }
  };
};
