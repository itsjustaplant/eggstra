import { CalendarIcon } from "lucide-react";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "~/components";
import {
	Button,
	Calendar,
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components";

const defaultDateRange = {
	from: new Date(2025, 6, 21),
	to: new Date(2025, 6, 30),
};

type TData = {
	date: string;
	value: number;
};

type TAnalysisCardProps = {
	chartConfig: ChartConfig;
	title: string;
	description: string;
	tooltipLabel: string;
	colorGetter: (value: number) => string;
	data: Array<TData>;
};
function AnalysisCard(props: TAnalysisCardProps) {
	const { chartConfig, title, description, tooltipLabel, colorGetter, data } =
		props;
	const [range, setRange] = useState<DateRange | undefined>(defaultDateRange);

	const filteredData = useMemo(() => {
		if (!range?.from || !range?.to) {
			return data;
		}
		return data.filter((item) => {
			const date = new Date(item.date);
			return (
				date >= (range.from || defaultDateRange.from) &&
				date <= (range.to || defaultDateRange.to)
			);
		});
	}, [range, data]);

	return (
		<Card className="@container/card w-full border-none shadow-none bg-background">
			<CardHeader className="flex flex-col border-b @md/card:grid px-0">
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
				<CardAction className="mt-2 @md/card:mt-0">
					<Popover>
						<PopoverTrigger asChild>
							<Button className="w-[248px]" variant="outline">
								<CalendarIcon />
								{range?.from && range?.to
									? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
									: "June 2025"}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto overflow-hidden p-0" align="end">
							<Calendar
								className="w-full"
								mode="range"
								defaultMonth={range?.from}
								selected={range}
								onSelect={setRange}
								startMonth={range?.from}
								fixedWeeks
							/>
						</PopoverContent>
					</Popover>
				</CardAction>
			</CardHeader>
			<CardContent className="px-0 -ml-4 -mr-3">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto md:h-[420px] h-[360px] w-full"
				>
					<BarChart
						accessibilityLayer
						data={filteredData}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={20}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									day: "numeric",
								});
							}}
						/>
						<YAxis
							dataKey="value"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={20}
						/>
						<ChartTooltip
							content={
								<ChartTooltipContent
									className="w-[150px]"
									nameKey="value"
									labelFormatter={(value) => {
										return new Date(value).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										});
									}}
									formatter={(v) => (
										<div className="flex items-center gap-1.5 w-full">
											<div
												className="w-3 h-3 rounded-xs"
												style={{
													backgroundColor: `var(--${colorGetter(v as number)})`,
												}}
											/>
											<span>{tooltipLabel}</span>
											<span className="ml-auto">{v}g</span>
										</div>
									)}
								/>
							}
						/>
						<Bar
							dataKey="value"
							radius={4}
							label={({ x, y, width, value }) => {
								return (
									<text
										x={x + width / 2}
										y={y}
										fill="var(--muted-foreground)"
										textAnchor="middle"
										dy={-6}
									>{`${value}g`}</text>
								);
							}}
						>
							{filteredData.map((data, index) => (
								<Cell
									key={`cell-${index}-${data}`}
									fill={`var(--${colorGetter(data.value)})`}
								/>
							))}
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
			{/*
<CardFooter className="border-t px-1">
				<div className="text-sm">
					{TEXTS["analytics-summary"].map((text, index) => {
						if (index === 1) {
							return (
								<span className="font-semibold underline" key={text}>
									{text.replaceAll("{}", total.toLocaleString())}
								</span>
							);
						}
						return text;
					})}
				</div>
			</CardFooter>
        */}
		</Card>
	);
}

export { AnalysisCard };
