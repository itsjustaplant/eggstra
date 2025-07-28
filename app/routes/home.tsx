/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <shut the fuck up> */

import { PROTEIN_COLOR_MAP, WATER_COLOR_MAP } from "~/constants";
import { AnalysisCard, Header } from "~/containers";
import { TEXTS } from "~/texts";
import type { TDailyData } from "~/types";
import { EAnalysisType } from "~/types";
import { getColorForProtein, getColorForWater, getDate } from "~/utils";
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
			`SELECT * FROM DailyData ORDER BY Date DESC LIMIT 7`,
		).all<TDailyData>();
		return { results };
	} catch (e) {
		console.log(e);
	}
}

export async function action({ request, context }: Route.ActionArgs) {
	const date = getDate();
	const formData = await request.formData();
	const protein = Number(formData.get("protein"));
	const water = Number(formData.get("water"));

	try {
		const { results } = await context.cloudflare.env.DB.prepare(
			`SELECT * FROM DailyData where Date = ?`,
		)
			.bind(date)
			.all<TDailyData>();

		if (results.length === 0) {
			await context.cloudflare.env.DB.prepare(
				`INSERT INTO DailyData(Date, protein, water) values(?, ?, ?)`,
			)
				.bind(date, protein, water)
				.all();
		} else {
			await context.cloudflare.env.DB.prepare(
				`UPDATE DailyData SET protein = ?, water = ? WHERE Date = ?`,
			)
				.bind(results[0].protein + protein, results[0].water + water, date)
				.run();
		}

		return { status: 200 };
	} catch (_) {
		return { status: 400 };
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

	return (
		<div className="w-full flex flex-col max-w-[1440px] m-auto">
			<Header />
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
