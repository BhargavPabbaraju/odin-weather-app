const API_KEY = "LKB55AWFR3SZCS9GNSTHVFKJE";

const UnitGroup = {
  US: "us",
  METRIC: "metric",
};

const TimeOfDay = {
  DAY: "Day",
  MORNING: "Morning",
  NIGHT: "Night",
  EVENING: "Evening",
};

// const icons = {
//     snow	Amount of snow is greater than zero
// rain	Amount of rainfall is greater than zero
// fog	Visibility is low (lower than one kilometer or mile)
// wind	Wind speed is high (greater than 30 kph or mph)
// cloudy	Cloud cover is greater than 90% cover
// partly-cloudy-day	Cloud cover is greater than 20% cover during day time.
// partly-cloudy-night	Cloud cover is greater than 20% cover during night time.
// clear-day	Cloud cover is less than 20% cover during day time
// clear-night	Cloud cover is less than 20% cover during night time
// }

function getTimeOfDay(time = "11:50:00") {
  const hours = parseInt(time.split(":")[0]);
  if (hours >= 4 && hours <= 10) {
    return TimeOfDay.MORNING;
  } else if (hours >= 11 && hours <= 17) {
    return TimeOfDay.DAY;
  } else if (hours >= 18 && hours <= 20) {
    return TimeOfDay.EVENING;
  }
  return TimeOfDay.NIGHT;
}
