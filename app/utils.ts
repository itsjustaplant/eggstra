import {
  PROTEIN_MULTIPLIER_MAP,
  WATER_MULTIPLIER_MAP,
  WEIGHT,
} from "./constants";

function getColorForProtein(intake: number): string {
  if (intake > WEIGHT * PROTEIN_MULTIPLIER_MAP.gain) return "chart-5";
  if (intake >= WEIGHT * PROTEIN_MULTIPLIER_MAP.maintanence) return "chart-6";
  if (intake >= WEIGHT * PROTEIN_MULTIPLIER_MAP.minimum) return "chart-3";
  if (intake > 0) return "ring";
  return "chart-3";
}

function getColorForWater(intake: number): string {
  if (intake > WEIGHT * WATER_MULTIPLIER_MAP.gain) return "water-gain";
  if (intake >= WEIGHT * WATER_MULTIPLIER_MAP.maintanence)
    return "water-maintanence";
  if (intake >= WEIGHT * WATER_MULTIPLIER_MAP.minimum) return "water-minimum";
  return "water-default";
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

export { getColorForProtein, getColorForWater, getDate };
