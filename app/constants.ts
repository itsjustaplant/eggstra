import type { TColorMap, TItem, TMultiplierMap } from "./types";
import { EAnalysisType } from "./types";

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

const CALORIE_MULTIPLIER_MAP: TMultiplierMap = {
	minimum: 24.3,
	maintanence: 28.3,
	gain: 32.4,
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

const CALORIE_COLOR_MAP: TColorMap = {
	gain: "protein-gain",
	maintanence: "protein-minimum",
	minimum: "protein-maintanence",
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
		caloriesMultiplier: 1,
	},
	{
		icon: "bottle-water",
		text: "Water",
		key: "water",
		label: "mL",
		proteinMultiplier: 0,
		waterMultiplier: 1,
		carbsMultiplier: 0,
		caloriesMultiplier: 1,
	},
	{
		icon: "bread-slice",
		text: "Carbs",
		key: "carbs",
		label: "g",
		proteinMultiplier: 0,
		waterMultiplier: 0,
		carbsMultiplier: 1,
		caloriesMultiplier: 1,
	},
	{
		icon: "bolt",
		text: "Calories",
		key: "calories",
		label: "kcal",
		proteinMultiplier: 0,
		waterMultiplier: 0,
		carbsMultiplier: 1,
		caloriesMultiplier: 1,
	},
];

const COLOR_MAP: Record<EAnalysisType, TColorMap> = {
	[EAnalysisType.PROTEIN]: PROTEIN_COLOR_MAP,
	[EAnalysisType.WATER]: WATER_COLOR_MAP,
	[EAnalysisType.CARBS]: CARBS_COLOR_MAP,
	[EAnalysisType.CALORIES]: CALORIE_COLOR_MAP,
};

const MULTIPLIER_MAP: Record<EAnalysisType, TMultiplierMap> = {
	[EAnalysisType.PROTEIN]: PROTEIN_MULTIPLIER_MAP,
	[EAnalysisType.WATER]: WATER_MULTIPLIER_MAP,
	[EAnalysisType.CARBS]: CARBS_MULTIPLIER_MAP,
	[EAnalysisType.CALORIES]: CALORIE_MULTIPLIER_MAP,
};

export {
	WEIGHT,
	PROTEIN_MULTIPLIER_MAP,
	WATER_MULTIPLIER_MAP,
	CARBS_MULTIPLIER_MAP,
	CALORIE_MULTIPLIER_MAP,
	PROTEIN_COLOR_MAP,
	WATER_COLOR_MAP,
	CARBS_COLOR_MAP,
	CALORIE_COLOR_MAP,
	ITEM_MAP,
	COLOR_MAP,
	MULTIPLIER_MAP,
};
