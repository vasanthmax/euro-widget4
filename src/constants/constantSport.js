const ConstantSport = (sport) => {
  if (
    sport == 'Canoe Sprint' ||
    sport == 'Canoë course en ligne' ||
    sport == 'Kanu-Rennsport'
  ) {
    return 'canoesprint';
  }
  if (
    sport == 'Beach Volleyball' ||
    sport == 'Volleyball de plage' ||
    sport == 'Beachvolleyball'
  ) {
    return 'beachvolleyball';
  }
  if (
    sport == 'Cycling Track' ||
    sport == 'Cyclisme sur piste' ||
    sport == 'Radsport Bahnrennsport'
  ) {
    return 'cycling';
  }
  if (
    sport == 'Cycling Road' ||
    sport == 'Cyclisme sur route' ||
    sport == 'Radsport Straßenradrennsport'
  ) {
    return 'cycling';
  }
  if (
    sport == 'Cycling Mountain Bike' ||
    sport == 'Cyclisme Mountain Bike' ||
    sport == 'Radsport Mountain Bike'
  ) {
    return 'cycling';
  }
  if (
    sport == 'Cycling BMX Freestyle' ||
    sport == 'Cyclisme BMX Freestyle' ||
    sport == 'Radsport BMX Freestyle'
  ) {
    return 'cycling';
  }
  if (
    sport == 'Gymnastics Artistic' ||
    sport == 'Gymnastique artistique' ||
    sport == 'Artistische Gymnastik'
  ) {
    return 'gymnastics';
  }
  if (sport == 'Triathon' || sport == 'Triathlon') {
    return 'triathlon';
  }
  if (sport == 'Rowing' || sport == 'Aviron' || sport == 'Rudern') {
    return 'rowing';
  }
  if (
    sport == 'Table Tennis' ||
    sport == 'Tennis de table' ||
    sport == 'Tischtennis'
  ) {
    return 'tabletennis';
  }
  if (
    sport == 'Athletics' ||
    sport == 'Athlétisme' ||
    sport == 'Leichtathletik'
  ) {
    return 'athletics';
  }
  if (
    sport == 'Sport Climbing' ||
    sport == 'Escalade' ||
    sport == 'Sportklettern'
  ) {
    return 'sportclimbing';
  }
};

export default ConstantSport;
