import { COLOR_MAP, MULTIPLIER_MAP, WEIGHT } from "./constants";
import { TEXTS } from "./texts";
import type { EAnalysisType, TColorMap } from "./types";

function getColor(intake: number, analysisType: EAnalysisType): string {
	const colorMap = getColorMap(analysisType);
	const multiplierMap = MULTIPLIER_MAP[analysisType];
	if (intake > WEIGHT * multiplierMap.gain) return colorMap.gain;
	if (intake >= WEIGHT * multiplierMap.maintanence) return colorMap.maintanence;
	if (intake >= WEIGHT * multiplierMap.minimum) return colorMap.minimum;
	return colorMap.default;
}

function getColorMap(analysisType: EAnalysisType): TColorMap {
	return COLOR_MAP[analysisType];
}

function getAnalysisCardTexts(
	analysisType: EAnalysisType,
): Record<string, string> {
	return {
		title: TEXTS[`analytics-${analysisType}-title`],
		description: TEXTS[`analytics-${analysisType}-description`],
		unit: TEXTS[`analytics-${analysisType}-unit`],
	};
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
