import "./app.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import type { TDailyData } from "~/types";
import type { Route } from "./+types/root";
import { Toaster } from "./components";
import { Header } from "./containers";
import { getDate } from "./utils";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swa",
	},
];
library.add(fas);

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

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="dark">
				<Header />
				{children}
				<Toaster position="top-center" />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
