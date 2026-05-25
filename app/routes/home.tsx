/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <shut the fuck up> */

import { AnalysisCard } from "~/containers";
import { TEXTS } from "~/texts";
import type { TDailyData } from "~/types";
import { EAnalysisType } from "~/types";
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
			`SELECT * FROM DailyData ORDER BY rowid DESC LIMIT 7`,
		).all<TDailyData>();
		console.log(results);
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
	const carbsData = results?.map((result) => ({
		date: result.date,
		value: result.carbs,
	}));

	// TODO: bind KV and hold last edited date and show it next to card header
	return (
		<div className="w-full h-full flex flex-col max-w-7xl border-x-0 sm:border-x">
			<div className="p-4 flex gap-2 flex-wrap">
				<AnalysisCard
					data={proteinData.reverse()}
					type={EAnalysisType.PROTEIN}
				/>
				<AnalysisCard data={waterData.reverse()} type={EAnalysisType.WATER} />
				<AnalysisCard data={carbsData.reverse()} type={EAnalysisType.CARBS} />
			</div>
		</div>
	);
}
