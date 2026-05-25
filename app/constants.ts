import type { TColorMap, TItem, TMultiplierMap } from "./types";

const WEIGHT = 74;

const PROTEIN_MULTIPLIER_MAP: TMultiplierMap = {
	minimum: 0.8,
	maintanence: 1.6,
	gain: 2.0,
};

const WATER_MULTIPLIER_MAP: TMultiplierMap = {
	minimum: 35,
	maintanence: 42,
	gain: 48,
};

const CARBS_MULTIPLIER_MAP: TMultiplierMap = {
	minimum: 2,
	maintanence: 3,
	gain: 4,
};

const PROTEIN_COLOR_MAP: TColorMap = {
	gain: "protein-gain",
	maintanence: "protein-maintanence",
	minimum: "protein-minimum",
	default: "protein-default",
};

const WATER_COLOR_MAP: TColorMap = {
	gain: "water-gain",
	maintanence: "water-maintanence",
	minimum: "water-minimum",
	default: "water-default",
};

const CARBS_COLOR_MAP: TColorMap = {
	gain: "protein-gain",
	maintanence: "protein-maintanence",
	minimum: "protein-minimum",
	default: "protein-default",
};

const ITEM_MAP: Array<TItem> = [
	{
		icon: "cow",
		text: "Protein",
		key: "protein",
		label: "g",
		proteinMultiplier: 1,
		waterMultiplier: 0,
		carbsMultiplier: 0,
	},
	{
		icon: "bottle-water",
		text: "Water",
		key: "water",
		label: "mL",
		proteinMultiplier: 0,
		waterMultiplier: 1,
		carbsMultiplier: 0,
	},
	{
		icon: "bread-slice",
		text: "Carbs",
		key: "carbs",
		label: "g",
		proteinMultiplier: 0,
		waterMultiplier: 0,
		carbsMultiplier: 1,
	},
];

export {
	WEIGHT,
	PROTEIN_MULTIPLIER_MAP,
	WATER_MULTIPLIER_MAP,
	CARBS_MULTIPLIER_MAP,
	PROTEIN_COLOR_MAP,
	WATER_COLOR_MAP,
	CARBS_COLOR_MAP,
	ITEM_MAP,
};
