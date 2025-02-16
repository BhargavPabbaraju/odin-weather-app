import * as utils from "./utils.js";
import iconsSrc from "../icons.png";
import { Spritesheet } from "./spritesheet.js";

const spritesheet = new Spritesheet(iconsSrc, 112, 112);

export async function renderIcon(img, icon = "partly-cloudy-day") {
  img.src = await spritesheet.extractSprite(utils.icons[icon]);
}

function renderCurrentInfo(state, data) {
  const temp = document.getElementById("current-temp");
  temp.innerText = data.currentConditions.temp;

  const unit = document.getElementById("current-unit");
  unit.innerText = utils.UnitGroup.getUnit(state.unitGroup);

  const condition = document.getElementById("current-condition");
  condition.innerText = data.currentConditions.conditions;

  const img = document.getElementById("current-icon");
  renderIcon(img, data.currentConditions.icon);

  const desc = document.getElementById("current-desc");
  desc.innerText = data.description;
}

export function renderInfo(state, data) {
  const address = document.getElementById("address");
  address.innerText = data.resolvedAddress;

  const date = document.getElementById("current-date");
  const time = data.currentConditions.datetime;
  date.innerText = utils.getDateText(time);
  changeTheme(time);

  renderCurrentInfo(state, data);
  renderNextDays(state, data);
}

function changeTheme(time) {
  const theme = utils.getTimeOfDay(time);
  document.documentElement.setAttribute("data-theme", theme);
}

function renderTemp(value, unit) {
  const div = document.createElement("div");
  const temp = document.createElement("span");
  const unitText = document.createElement("span");

  temp.innerText = value;
  unitText.innerText = utils.UnitGroup.getUnit(unit);
  unitText.classList.add("unit");

  div.appendChild(temp);
  div.appendChild(unitText);
  return div;
}

function renderIconRow(data) {
  const div = document.createElement("div");
  div.classList.add("icon-row");
  const img = document.createElement("img");
  renderIcon(img, data.icon);
  div.appendChild(img);

  const condition = document.createElement("div");
  condition.innerText = data.conditions;

  div.appendChild(condition);
  return div;
}

function renderNextDay(state, data) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.classList.add("shadow");

  const [year, month, day] = data.datetime.split("-");
  const dayText = document.createElement("div");
  const date = new Date(year, month, day);
  dayText.innerText = utils.getDay(date.getDay());
  dayText.classList.add("day");
  div.appendChild(dayText);

  const iconRow = renderIconRow(data);
  div.appendChild(iconRow);

  const tempRow = document.createElement("div");
  tempRow.classList.add("temp-row");
  tempRow.appendChild(renderTemp(data.tempmin, state.unitGroup));
  tempRow.appendChild(renderTemp(data.tempmax, state.unitGroup));
  div.appendChild(tempRow);

  return div;
}

function renderNextDays(state, data) {
  const days = data.days;
  const nextDays = document.getElementById("next-days");
  nextDays.replaceChildren();
  for (let i = 1; i < Math.min(3, days.length) + 1; i++) {
    nextDays.appendChild(renderNextDay(state, days[i]));
  }
}
