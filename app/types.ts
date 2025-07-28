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
