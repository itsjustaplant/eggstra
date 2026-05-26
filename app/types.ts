import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export type TDailyData = {
	date: string;
	protein: number;
	water: number;
	carbs: number;
	calories: number;
};

export type TLevel = "gain" | "maintanence" | "minimum" | "default";

export enum EAnalysisType {
	PROTEIN = "protein",
	WATER = "water",
	CARBS = "carbs",
	CALORIES = "calories",
}

export type TItem = {
	icon: IconProp;
	text: string;
	key: string;
	label: string;
	proteinMultiplier: number;
	waterMultiplier: number;
	carbsMultiplier: number;
	caloriesMultiplier: number;
};

export type TMultiplierMap = {
	minimum: number;
	maintanence: number;
	gain: number;
};

export type TColorMap = {
	gain: string;
	maintanence: string;
	minimum: string;
	default: string;
};
