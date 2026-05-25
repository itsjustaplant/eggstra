import {
	CARBS_COLOR_MAP,
	CARBS_MULTIPLIER_MAP,
	PROTEIN_COLOR_MAP,
	PROTEIN_MULTIPLIER_MAP,
	WATER_COLOR_MAP,
	WATER_MULTIPLIER_MAP,
	WEIGHT,
} from "./constants";
import { TEXTS } from "./texts";
import { EAnalysisType, type TColorMap } from "./types";

function getColor(intake: number, analysisType: EAnalysisType): string {
	const colorMap = getColorMap(analysisType);
	const multiplierMap =
		analysisType === EAnalysisType.PROTEIN
			? PROTEIN_MULTIPLIER_MAP
			: analysisType === EAnalysisType.WATER
				? WATER_MULTIPLIER_MAP
				: CARBS_MULTIPLIER_MAP;
	if (intake > WEIGHT * multiplierMap.gain) return colorMap.gain;
	if (intake >= WEIGHT * multiplierMap.maintanence) return colorMap.maintanence;
	if (intake >= WEIGHT * multiplierMap.minimum) return colorMap.minimum;
	return colorMap.default;
}

function getColorMap(analysisType: EAnalysisType): TColorMap {
	const colorMap =
		analysisType === EAnalysisType.PROTEIN
			? PROTEIN_COLOR_MAP
			: analysisType === EAnalysisType.WATER
				? WATER_COLOR_MAP
				: CARBS_COLOR_MAP;

	return colorMap;
}

function getAnalysisCardTexts(
	analysisType: EAnalysisType,
): Record<string, string> {
	switch (analysisType) {
		case EAnalysisType.PROTEIN:
			return {
				title: TEXTS["analytics-protein-title"],
				description: TEXTS["analytics-protein-description"],
				unit: TEXTS["analytics-protein-unit"],
			};
		case EAnalysisType.WATER:
			return {
				title: TEXTS["analytics-water-title"],
				description: TEXTS["analytics-water-description"],
				unit: TEXTS["analytics-water-unit"],
			};
		default:
			return {
				title: TEXTS["analytics-carbs-title"],
				description: TEXTS["analytics-carbs-description"],
				unit: TEXTS["analytics-carbs-unit"],
			};
	}
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

export {
	getDate,
	capitalizeFirstLetter,
	getColor,
	getColorMap,
	getAnalysisCardTexts,
};
