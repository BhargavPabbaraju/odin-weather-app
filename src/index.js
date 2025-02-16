import * as utils from "./utils.js";
import "./styles.css";

import * as view from "./view.js";

const state = {
  location: "Boston",
  unitGroup: utils.UnitGroup.METRIC,
};

async function fetchData() {
  document.getElementById("content").replaceChildren();
  const url =
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/` +
    `${state.location}?unitGroup=${state.unitGroup}&key=${utils.API_KEY}&contentType=json`;

  view.renderLoading();
  try {
    const response = await fetch(url);
    const data = await response.json();

    view.renderInfo(state, data);
  } catch {
    view.renderError(state);
  }
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
  if (utils.UnitGroup[e.target.value] === state.unitGroup) {
    return;
  }
  state.unitGroup = utils.UnitGroup[e.target.value];
  fetchData();
}

function initialRender() {
  const form = document.getElementById("form");
  form.addEventListener("submit", onSubmit);

  const unitSelect = document.getElementById("unit-select");
  unitSelect.addEventListener("click", changeUnit);
  document
    .getElementById("locationInput")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        this.form.submit();
      }
    });
}

initialRender();
