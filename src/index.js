import * as utils from "./utils.js";
import "./styles.css";

function fetchData(location = "Boston", unitGroup = utils.UnitGroup.US) {
  const url =
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` +
    `${location}?unitGroup=${unitGroup}&key=${utils.API_KEY}&contentType=json`;

  console.log(url);
}

fetchData();
