const AlignOrder = (sport) => {
  if (
    sport == 'Canoe Sprint' ||
    sport == 'Canoë course en ligne' ||
    sport == 'Kanu-Rennsport'
  ) {
    return 3;
  }
  if (
    sport == 'Beach Volleyball' ||
    sport == 'Volleyball de plage' ||
    sport == 'Beachvolleyball'
  ) {
    return 2;
  }
  if (
    sport == 'Cycling Track' ||
    sport == 'Cyclisme sur piste' ||
    sport == 'Radsport Bahnrennsport'
  ) {
    return 7;
  }
  if (
    sport == 'Cycling Road' ||
    sport == 'Cyclisme sur route' ||
    sport == 'Radsport Straßenradrennsport'
  ) {
    return 6;
  }
  if (
    sport == 'Cycling Mountain Bike' ||
    sport == 'Cyclisme Mountain Bike' ||
    sport == 'Radsport Mountain Bike'
  ) {
    return 5;
  }
  if (
    sport == 'Cycling BMX Freestyle' ||
    sport == 'Cyclisme BMX Freestyle' ||
    sport == 'Radsport BMX Freestyle'
  ) {
    return 4;
  }
  if (
    sport == 'Gymnastics Artistic' ||
    sport == 'Gymnastique artistique' ||
    sport == 'Artistische Gymnastik'
  ) {
    return 8;
  }
  if (sport == 'Triathlon' || sport == 'Triathlon') {
    return 12;
  }
  if (sport == 'Rowing' || sport == 'Aviron' || sport == 'Rudern') {
    return 9;
  }
  if (
    sport == 'Table Tennis' ||
    sport == 'Tennis de table' ||
    sport == 'Tischtennis'
  ) {
    return 11;
  }
  if (
    sport == 'Athletics' ||
    sport == 'Athlétisme' ||
    sport == 'Leichtathletik'
  ) {
    return 1;
  }
  if (
    sport == 'Sport Climbing' ||
    sport == 'Escalade' ||
    sport == 'Sportklettern'
  ) {
    return 10;
  }
};

export default AlignOrder;
