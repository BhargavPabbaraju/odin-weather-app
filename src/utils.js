export const API_KEY = "LKB55AWFR3SZCS9GNSTHVFKJE";

export const UnitGroup = {
  US: "us",
  METRIC: "metric",
  getUnit(unit) {
    return unit == this.US ? "F" : "C";
  },
};

const TimeOfDay = {
  DAY: "Day",
  MORNING: "Morning",
  NIGHT: "Night",
  EVENING: "Evening",
};

export function getTimeOfDay(time = "11:50:00") {
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

export const icons = {
  snow: [1, 1],
  rain: [1, 0],
  fog: [2, 1],
  wind: [2, 0],
  cloudy: [0, 1],
  "partly-cloudy-day": [0, 1],
  "partly-cloudy-night": [0, 1],
  "clear-day": [0, 0],
  "clear-night": [0, 0],
};

export function getDateText(time) {
  const today = new Date();
  const day = getDay(today.getDay());
  let hours = time.split(":")[0];
  const minutes = time.split(":")[1];
  const ampm = hours > 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  return `${day}, ${hours}:${minutes} ${ampm}`;
}

function getDay(day) {
  switch (day) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    default:
      return "Sat";
  }
}
