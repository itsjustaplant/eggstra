import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "~/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartContainer,
} from "~/components";
import { TEXTS } from "~/texts";
import { EAnalysisType, type TLevel } from "~/types";
import { capitalizeFirstLetter } from "~/utils";

const chartConfig = {} satisfies ChartConfig;

type TData = {
  date: string;
  value: number;
};

type TAnalysisCardProps = {
  title: string;
  description: string;
  tooltipLabel: string;
  unit: string;
  colorGetter: (value: number) => string;
  data: Array<TData>;
  colorMap: Record<TLevel, string>;
  type: EAnalysisType;
};
function AnalysisCard(props: TAnalysisCardProps) {
  const { title, description, unit, colorGetter, data, colorMap, type } = props;

  return (
    <Card className="@container/card w-full border-none shadow-none bg-background pt-1">
      <CardHeader className="flex flex-col border-b @md/card:grid px-0 !pb-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-0 -ml-7 -mr-2">
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
                  const [, month, day] = value.split("-");
                  return `${month}-${day}`;
                }}
              />
              <YAxis
                dataKey="value"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={20}
              />
              <Bar
                dataKey="value"
                radius={4}
                label={({ x, y, width, value }) => {
                  // TODO: this is bad find a better way to check if it fits or not
                  if (!value || value < 10) return <span />;
                  return (
                    <text
                      className="font-bold text-sm"
                      x={x + width / 2}
                      y={y + 30}
                      fill="var(--foreground)"
                      textAnchor="middle"
                      dy={-6}
                    >
                      {type === EAnalysisType.PROTEIN
                        ? `${value?.toFixed()}${unit}`
                        : `${(value / 1000)?.toFixed(1)}${unit}`}
                    </text>
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
      <CardFooter className="w-full flex justify-between items-center px-2">
        {Object.entries(colorMap).map(([k, v]) => (
          <div key={k} className="flex gap-1 items-center">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: `var(--${v})` }}
            ></div>
            <span>{capitalizeFirstLetter(k)}</span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}

export { AnalysisCard };
