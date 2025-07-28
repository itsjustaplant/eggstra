import {
  PROTEIN_COLOR_MAP,
  PROTEIN_MULTIPLIER_MAP,
  WATER_COLOR_MAP,
  WATER_MULTIPLIER_MAP,
  WEIGHT,
} from "./constants";

function getColorForProtein(intake: number): string {
  if (intake > WEIGHT * PROTEIN_MULTIPLIER_MAP.gain)
    return PROTEIN_COLOR_MAP.gain;
  if (intake >= WEIGHT * PROTEIN_MULTIPLIER_MAP.maintanence)
    return PROTEIN_COLOR_MAP.maintanence;
  if (intake >= WEIGHT * PROTEIN_MULTIPLIER_MAP.minimum)
    return PROTEIN_COLOR_MAP.minimum;
  return PROTEIN_COLOR_MAP.default;
}

function getColorForWater(intake: number): string {
  if (intake > WEIGHT * WATER_MULTIPLIER_MAP.gain) return WATER_COLOR_MAP.gain;
  if (intake >= WEIGHT * WATER_MULTIPLIER_MAP.maintanence)
    return WATER_COLOR_MAP.maintanence;
  if (intake >= WEIGHT * WATER_MULTIPLIER_MAP.minimum)
    return WATER_COLOR_MAP.minimum;
  return WATER_COLOR_MAP.default;
}

function getDate() {
  const date = new Date();
  const formattedDate = date.toLocaleString("en-US", {
    timeZone: "Europe/Istanbul",
  });
  const [dateString] = formattedDate.split(",");
  const [month, day, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

function capitalizeFirstLetter(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export { getColorForProtein, getColorForWater, getDate, capitalizeFirstLetter };
