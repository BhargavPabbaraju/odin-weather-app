import * as utils from "./utils.js";
import iconsSrc from "../icons.png";
import { Spritesheet } from "./spritesheet.js";

const spritesheet = new Spritesheet(iconsSrc, 112, 112);

export async function renderIcon(icon = "partly-cloudy-day") {
  const img = document.getElementById("current-icon");
  img.src = await spritesheet.extractSprite(utils.icons[icon]);
}

function renderCurrentInfo(state, data) {
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

export function renderInfo(state, data) {
  const address = document.getElementById("address");
  address.innerText = data.resolvedAddress;

  const date = document.getElementById("current-date");
  const time = data.currentConditions.datetime;
  date.innerText = utils.getDateText(time);
  changeColorBasedOnTime(time);

  renderCurrentInfo(state, data);
}

function changeColorBasedOnTime(time) {
  const timeOfDay = utils.getTimeOfDay(time);
  const body = document.querySelector("body");
  body.style.backgroundColor = `var(${timeOfDay})`;
  body.style.color =
    timeOfDay == utils.TimeOfDay.NIGHT
      ? "var(--night-color)"
      : "var(--card-color)";
  return;
}
