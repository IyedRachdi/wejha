import Map "mo:core/Map";
import UserLib "lib/users";
import BookingLib "lib/bookings";
import MissionLib "lib/missions";
import ReviewLib "lib/reviews";
import UsersApi "mixins/users-api";
import BookingsApi "mixins/bookings-api";
import ReviewsApi "mixins/reviews-api";

actor {
  let userState : UserLib.State = {
    users = Map.empty();
    var nextUserId = 0;
  };

  let bookingState : BookingLib.State = {
    bookings = Map.empty();
    var nextId = 0;
  };

  let missionState : MissionLib.State = {
    missions = Map.empty();
    var nextId = 0;
  };

  let reviewState : ReviewLib.State = {
    reviews = Map.empty();
    var nextId = 0;
  };

  // Seed initial missions on first deploy
  var stateInitialized : Bool = false;
  if (not stateInitialized) {
    MissionLib.seedMissions(missionState);
    stateInitialized := true;
  };

  include UsersApi(userState, bookingState, missionState);
  include BookingsApi(bookingState, missionState, userState);
  include ReviewsApi(reviewState, bookingState, userState);
};
