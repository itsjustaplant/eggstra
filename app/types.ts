import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export type TDailyData = {
  date: string;
  protein: number;
  water: number;
};

export type TLevel = "gain" | "maintanence" | "minimum" | "default";

export enum EAnalysisType {
  PROTEIN,
  WATER,
}

export type TItem = {
  icon: IconProp;
  text: string;
  key: string;
  label: string;
  proteinMultiplier: number;
  waterMultiplier?: number;
};
