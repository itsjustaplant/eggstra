import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "~/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components";
import { TEXTS } from "~/texts";

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

  return (
    <Card className="@container/card w-full border-none shadow-none bg-background">
      <CardHeader className="flex flex-col border-b @md/card:grid px-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-0 -ml-4 -mr-3">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto md:h-[420px] h-[360px] w-full"
        >
          {!data || data?.length === 0 ? (
            <div className="w-full h-full geist-mono flex items-center justify-center text-3xl">
              {TEXTS["no-data"]}
            </div>
          ) : (
            <BarChart accessibilityLayer data={data}>
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
                            backgroundColor: `var(--${colorGetter(
                              v as number
                            )})`,
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
                {data.map((data, index) => (
                  <Cell
                    key={`cell-${index}-${data}`}
                    fill={`var(--${colorGetter(data.value)})`}
                  />
                ))}
              </Bar>
            </BarChart>
          )}
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
