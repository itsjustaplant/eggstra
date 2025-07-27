/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <shut the fuck up> */
import type { ChartConfig } from "~/components/";
import { AnalysisCard, Header } from "~/containers";
import { TEXTS } from "~/texts";
import type { Route } from "./+types/home";

// biome-ignore lint/correctness/noEmptyPattern: <shut the fuck up>
export function meta({}: Route.MetaArgs) {
  return [
    { title: TEXTS.title },
    {
      name: "Protein and Water tracker",
      content: "Track your protein and water intake",
    },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

const WEIGHT = 70;
const PROTEIN_MULTIPLIER_MAP = {
  minimum: 0.8,
  maintanence: 1.6,
  gain: 2.0,
};
const WATER_MULTIPLIER_MAP = {
  minimum: 35,
  maintanence: 42,
  gain: 48
}

function getColorForProtein(intake: number): string {
  if (intake > WEIGHT * PROTEIN_MULTIPLIER_MAP.gain) return "chart-5";
  if (intake >= WEIGHT * PROTEIN_MULTIPLIER_MAP.maintanence) return "chart-6";
  if (intake >= WEIGHT * PROTEIN_MULTIPLIER_MAP.minimum) return "chart-3";
  if (intake > 0) return "ring";
  return "chart-3";
}

function getColorForWater(intake: number): string {
  if (intake > WEIGHT * WATER_MULTIPLIER_MAP.gain) return "water-gain"
  if (intake >= WEIGHT * WATER_MULTIPLIER_MAP.maintanence) return "water-maintanence"
  if (intake >= WEIGHT * WATER_MULTIPLIER_MAP.minimum) return "water-minimum"
  return "water-default"
}

const proteinData = [
  { date: "2025-07-23", value: 80 },
  { date: "2025-07-24", value: 120 },
  { date: "2025-07-25", value: 150 },
  { date: "2025-07-26", value: 40 },
  { date: "2025-07-27", value: 120 },
  { date: "2025-07-28", value: 120 },
  { date: "2025-07-29", value: 120 },
];

const waterData = [
  { date: "2025-07-23", value: 2000 },
  { date: "2025-07-24", value: 2500 },
  { date: "2025-07-25", value: 2800 },
  { date: "2025-07-26", value: 1600 },
  { date: "2025-07-27", value: 1200 },
  { date: "2025-07-28", value: 3500 },
  { date: "2025-07-29", value: 3700 },
];

// const total = proteinData.reduce((acc, curr) => acc + curr.protein, 0);
const chartConfig = {
  protein: {
    label: "Protein (g)",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="w-full flex flex-col max-w-[1440px] m-auto">
      <Header />
      <div className="p-4 flex gap-2 flex-wrap">
        <AnalysisCard
          chartConfig={chartConfig}
          data={proteinData}
          title={TEXTS["analytics-protein-title"]}
          description={TEXTS["analytics-protein-description"]}
          tooltipLabel={TEXTS["analytics-protein-tooltip-label"]}
          colorGetter={getColorForProtein}
        />
        <AnalysisCard
          chartConfig={chartConfig}
          data={waterData}
          title={TEXTS["analytics-water-title"]}
          description={TEXTS["analytics-water-description"]}
          tooltipLabel={TEXTS["analytics-water-tooltip-label"]}
          colorGetter={getColorForWater}
        />
      </div>
    </div>
  );
}
