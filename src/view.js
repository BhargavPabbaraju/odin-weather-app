import * as utils from "./utils.js";
import iconsSrc from "../icons.png";
import { Spritesheet } from "./spritesheet.js";

const spritesheet = new Spritesheet(iconsSrc, 112, 112);

export async function renderIcon(img, icon = "partly-cloudy-day") {
  img.src = await spritesheet.extractSprite(utils.icons[icon]);
}

function renderCurrentInfo(state, data) {
  const current = document.createElement("div");
  current.classList.add("current");
  current.classList.add("shadow");

  const tempRow = document.createElement("div");
  tempRow.classList.add("temp");

  const temp = document.createElement("span");
  temp.setAttribute("id", "current-temp");
  temp.innerText = data.currentConditions.temp;
  tempRow.appendChild(temp);

  const unit = document.createElement("span");
  unit.setAttribute("id", "current-unit");
  unit.innerText = utils.UnitGroup.getUnit(state.unitGroup);
  tempRow.appendChild(unit);

  current.appendChild(tempRow);

  const conditionAndDescRow = document.createElement("div");
  conditionAndDescRow.classList.add("condition-and-desc");

  const conditionRow = document.createElement("div");
  conditionRow.classList.add("condition");

  const condition = document.createElement("div");
  condition.setAttribute("id", "current-condition");
  condition.innerText = data.currentConditions.conditions;
  conditionRow.appendChild(condition);

  const img = document.createElement("img");
  img.classList.add("icon");
  img.setAttribute("id", "current-icon");
  img.setAttribute("alt", data.currentConditions.icon);
  renderIcon(img, data.currentConditions.icon);

  conditionRow.appendChild(img);

  conditionAndDescRow.appendChild(conditionRow);

  const desc = document.createElement("div");
  desc.setAttribute("id", "current-desc");
  desc.innerText = data.description;

  conditionAndDescRow.appendChild(desc);

  current.appendChild(conditionAndDescRow);

  return current;
}

function renderDetails(data) {
  const details = document.createElement("div");
  details.classList.add("details");

  const date = document.createElement("div");
  date.setAttribute("id", "current-date");
  const time = data.currentConditions.datetime;
  date.innerText = utils.getDateText(time);
  changeTheme(time);

  const address = document.createElement("div");
  address.setAttribute("id", "address");
  address.innerText = data.resolvedAddress;

  details.appendChild(date);
  details.appendChild(address);

  return details;
}

export function renderInfo(state, data) {
  const content = document.getElementById("content");
  content.replaceChildren();

  content.appendChild(renderDetails(data));

  content.appendChild(renderCurrentInfo(state, data));
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
