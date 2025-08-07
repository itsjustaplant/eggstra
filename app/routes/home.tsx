/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <shut the fuck up> */

import { PROTEIN_COLOR_MAP, WATER_COLOR_MAP } from "~/constants";
import { AnalysisCard } from "~/containers";
import { TEXTS } from "~/texts";
import type { TDailyData } from "~/types";
import { EAnalysisType } from "~/types";
import { getColorForProtein, getColorForWater } from "~/utils";
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

export async function loader({ context }: Route.LoaderArgs) {
  try {
    const { results } = await context.cloudflare.env.DB.prepare(
      `SELECT * FROM DailyData ORDER BY Date DESC LIMIT 7`
    ).all<TDailyData>();
    return { results };
  } catch (e) {
    console.log(e);
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { results = [] } = loaderData || {};
  const proteinData = results?.map((result) => ({
    date: result.date,
    value: result.protein,
  }));
  const waterData = results?.map((result) => ({
    date: result.date,
    value: result.water,
  }));

  // TODO: bind KV and hold last edited date and show it next to card header
  return (
    <div className="w-full h-full flex flex-col max-w-7xl border-x-0 sm:border-x">
      <div className="p-4 flex gap-2 flex-wrap">
        <AnalysisCard
          data={proteinData.reverse()}
          title={TEXTS["analytics-protein-title"]}
          description={TEXTS["analytics-protein-description"]}
          tooltipLabel={TEXTS["analytics-protein-tooltip-label"]}
          unit={TEXTS["analytics-protein-unit"]}
          colorGetter={getColorForProtein}
          colorMap={PROTEIN_COLOR_MAP}
          type={EAnalysisType.PROTEIN}
        />
        <AnalysisCard
          data={waterData.reverse()}
          title={TEXTS["analytics-water-title"]}
          description={TEXTS["analytics-water-description"]}
          tooltipLabel={TEXTS["analytics-water-tooltip-label"]}
          unit={TEXTS["analytics-water-unit"]}
          colorGetter={getColorForWater}
          colorMap={WATER_COLOR_MAP}
          type={EAnalysisType.WATER}
        />
      </div>
    </div>
  );
}
