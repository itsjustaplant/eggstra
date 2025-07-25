/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <shut the fuck up> */
import { CalendarIcon } from "lucide-react";
import React from "react";
import type { DateRange } from "react-day-picker";
import type { ChartConfig } from "~/components/";
import {
  Bar,
  BarChart,
  Button,
  Calendar,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CartesianGrid,
  Cell,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Header,
  Popover,
  PopoverContent,
  PopoverTrigger,
  XAxis,
  YAxis,
} from "~/components/";
import { TEXTS } from "~/texts";
import type { Route } from "./+types/home";

// biome-ignore lint/correctness/noEmptyPattern: <shut the fuck up>
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

function getColorForProtein(intake: number): string {
  if (intake > 140) return "chart-5";
  if (intake >= 110) return "chart-6";
  if (intake >= 75) return "chart-3";
  if (intake > 0) return "ring";
  return "chart-3";
}

const proteinData = [
  { date: "2025-07-23", protein: 80 },
  { date: "2025-07-24", protein: 120 },
  { date: "2025-07-25", protein: 150 },
  { date: "2025-07-26", protein: 40 },
  { date: "2025-07-27", protein: 120 },
  { date: "2025-07-28", protein: 120 },
  { date: "2025-07-29", protein: 120 },
];

const total = proteinData.reduce((acc, curr) => acc + curr.protein, 0);
const chartConfig = {
  protein: {
    label: "Protein (g)",
    color: "var(--chart-6)",
  },
} satisfies ChartConfig;

export default function Home({ loaderData }: Route.ComponentProps) {
  const defaultDateRange = {
    from: new Date(2025, 6, 21),
    to: new Date(2025, 6, 30),
  };
  const [range, setRange] = React.useState<DateRange | undefined>(
    defaultDateRange
  );
  const filteredData = React.useMemo(() => {
    if (!range?.from || !range?.to) {
      return proteinData;
    }
    return proteinData.filter((item) => {
      const date = new Date(item.date);
      return (
        date >= (range.from || defaultDateRange.from) &&
        date <= (range.to || defaultDateRange.to)
      );
    });
  }, [range, defaultDateRange.from, defaultDateRange.to]);

  return (
    <div className="w-full h-full flex flex-col max-w-[1440px] m-auto">
      <Header />
      <div className="p-4 flex gap-2 flex-wrap">
        <Card className="@container/card w-full border-none shadow-none bg-background">
          <CardHeader className="flex flex-col border-b @md/card:grid px-0">
            <CardTitle>{TEXTS.analytics}</CardTitle>
            <CardDescription>{TEXTS["analytics-description"]}</CardDescription>
            <CardAction className="mt-2 @md/card:mt-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon />
                    {range?.from && range?.to
                      ? `${range.from.toLocaleDateString()} - ${range.to.toLocaleDateString()}`
                      : "June 2025"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                >
                  <Calendar
                    className="w-full"
                    mode="range"
                    defaultMonth={range?.from}
                    selected={range}
                    onSelect={setRange}
                    disableNavigation
                    startMonth={range?.from}
                    fixedWeeks
                    showOutsideDays
                  />
                </PopoverContent>
              </Popover>
            </CardAction>
          </CardHeader>
          <CardContent className="px-1">
            <ChartContainer
              config={chartConfig}
              className="aspect-auto md:h-[420px] h-[360px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={filteredData}
                margin={{
                  left: 12,
                  right: 12,
                }}
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
                  dataKey="protein"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={20}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      nameKey="protein"
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
                              backgroundColor: `var(--${getColorForProtein(
                                v as number
                              )})`,
                            }}
                          />
                          <span>{TEXTS["tooltip-label"]}</span>
                          <span className="ml-auto">{v}g</span>
                        </div>
                      )}
                    />
                  }
                />
                <Bar
                  dataKey="protein"
                  fill={`var(--color-protein)`}
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
                      fill={`var(--${getColorForProtein(data.protein)})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
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
        </Card>
      </div>
    </div>
  );
}
