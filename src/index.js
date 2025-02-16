import * as utils from "./utils.js";
import "./styles.css";
import iconsSrc from "../icons.png";
import { Spritesheet } from "./spritesheet.js";

const spritesheet = new Spritesheet(iconsSrc, 112, 112);

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
  renderInfo(data);
}

function renderCurrentInfo(data) {
  const temp = document.getElementById("current-temp");
  temp.innerText = data.currentConditions.temp;

  const unit = document.getElementById("current-unit");
  unit.innerText = utils.UnitGroup.getUnit(state.unitGroup);

  const condition = document.getElementById("current-condition");
  condition.innerText = data.currentConditions.conditions;

  renderIcon(data.currentConditions.icon);

  const desc = document.getElementById("current-desc");
  desc.innerText = data.description;
}

function renderInfo(data) {
  const address = document.getElementById("address");
  address.innerText = data.resolvedAddress;

  const date = document.getElementById("current-date");
  date.innerText = utils.getDateText(data.currentConditions.datetime);

  renderCurrentInfo(data);
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

async function renderIcon(icon = "partly-cloudy-day") {
  const img = document.getElementById("current-icon");
  img.src = await spritesheet.extractSprite(utils.icons[icon]);
}

function initialRender() {
  const form = document.getElementById("form");
  form.addEventListener("submit", onSubmit);

  const unitSelect = document.getElementById("unit-select");
  unitSelect.addEventListener("click", changeUnit);

  renderIcon();
}

initialRender();
