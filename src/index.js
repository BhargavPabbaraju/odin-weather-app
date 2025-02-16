import * as utils from "./utils.js";
import "./styles.css";

import * as view from "./view.js";

const state = {
  location: "Boston",
  unitGroup: utils.UnitGroup.METRIC,
};

async function fetchData() {
  const url =
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` +
    `${state.location}?unitGroup=${state.unitGroup}&key=${utils.API_KEY}&contentType=json`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
  view.renderInfo(state, data);
}

function onSubmit(e) {
  const form = e.target;
  if (!form.checkValidity()) {
    return;
  }
  e.preventDefault();
  const location = form.location.value;
  state.location = location;
  fetchData();
}

function changeUnit(e) {
  state.unitGroup = utils.UnitGroup[e.target.value];
  fetchData();
}

function initialRender() {
  const form = document.getElementById("form");
  form.addEventListener("submit", onSubmit);

  const unitSelect = document.getElementById("unit-select");
  unitSelect.addEventListener("click", changeUnit);

  view.renderIcon();
}

initialRender();
