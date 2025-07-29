import type { TItem } from "./types";

const WEIGHT = 70;

const PROTEIN_MULTIPLIER_MAP = {
  minimum: 0.8,
  maintanence: 1.6,
  gain: 2.0,
};

const WATER_MULTIPLIER_MAP = {
  minimum: 35,
  maintanence: 42,
  gain: 48,
};

const PROTEIN_COLOR_MAP = {
  gain: "protein-gain",
  maintanence: "protein-maintanence",
  minimum: "protein-minimum",
  default: "protein-default",
};

const WATER_COLOR_MAP = {
  gain: "water-gain",
  maintanence: "water-maintanence",
  minimum: "water-minimum",
  default: "water-default",
};

const ITEM_MAP: Array<TItem> = [
  {
    icon: "drumstick-bite",
    text: "Chicken",
    key: "chicken",
    label: "g",
    proteinMultiplier: 0.24,
  },
  {
    icon: "cow",
    text: "Meat",
    key: "meat",
    label: "g",
    proteinMultiplier: 0.26,
  },
  {
    icon: "egg",
    text: "Egg",
    key: "egg",
    label: "piece",
    proteinMultiplier: 6,
  },
  {
    icon: "bacon",
    text: "Smoked Turkey",
    key: "smoked-turkey",
    label: "piece",
    proteinMultiplier: 8.5,
  },
  {
    icon: "fish",
    text: "Salmon",
    key: "salmon",
    label: "g",
    proteinMultiplier: 0.2,
  },
  {
    icon: "fish-fins",
    text: "Tuna",
    key: "tuna",
    label: "g",
    proteinMultiplier: 0.25,
  },
  {
    icon: "bottle-water",
    text: "Water",
    key: "water",
    label: "mL",
    proteinMultiplier: 0,
    waterMultiplier: 1,
  },
  {
    icon: "glass-water",
    text: "Milk",
    key: "milk",
    label: "mL",
    proteinMultiplier: 0.03,
  },
  {
    icon: "dna",
    text: "WHEY",
    key: "whey",
    label: "scoop",
    proteinMultiplier: 22,
  },
  {
    icon: "gear",
    text: "Custom",
    key: "custom",
    label: "g",
    proteinMultiplier: 1,
  },
];

export {
  WEIGHT,
  PROTEIN_MULTIPLIER_MAP,
  WATER_MULTIPLIER_MAP,
  PROTEIN_COLOR_MAP,
  WATER_COLOR_MAP,
  ITEM_MAP,
};
