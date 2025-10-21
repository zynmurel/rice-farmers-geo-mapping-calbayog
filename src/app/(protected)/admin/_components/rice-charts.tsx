"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Loader2, TrendingUp, TrendingDown, Sprout } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { api } from "@/trpc/react";

interface ComputationResult {
  year: number;
  seeds: number;
  remainingPalay: number;
  cleanRice: number;
  populationNow: number;
  riceEaters: number;
  totalConsumptionTons: number;
  percent: number;
  enough: boolean;
}

export default function RiceComputationChart() {
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, i) => 2000 + i,
  );
  const [year, setYear] = useState<number>(2025);
  const [result, setResult] = useState<any>(null);

  const { data, isLoading } = api.overview.getDashboardStatsByYear.useQuery(
    {
      year: String(year),
      season: "BOTH",
    },
    { enabled: !!year },
  );

  const harvest = data?.[0]?.harvestedTonnes || 0;

  const computeRice = () => {
    const seeds = harvest * 0.1447;
    const remainingPalay = harvest - seeds;
    const cleanRice = remainingPalay * 0.65;

    const basePopulation = 186960;
    const growthRate = 0.0035;
    const yearsPassed = year - 2020;
    const populationNow =
      basePopulation * Math.pow(1 + growthRate, yearsPassed);
    const riceEaters = populationNow * 0.8;

    const totalConsumptionTons = (riceEaters * 120.18) / 1000;

    const percent = (cleanRice / totalConsumptionTons) * 100;
    const enough = percent >= 100;

    setResult({
      year,
      seeds,
      remainingPalay,
      cleanRice,
      populationNow,
      riceEaters,
      totalConsumptionTons,
      percent,
      enough,
    });
  };

  const harvestBreakdownData = result
    ? [
        { name: "Seeds", value: result.seeds, fill: "#22c55e" },
        {
          name: "Remaining Palay",
          value: result.remainingPalay,
          fill: "#3b82f6",
        },
      ]
    : [];

  const productionData = result
    ? [
        {
          name: "Clean Rice Produced",
          value: result.cleanRice,
          fill: "#10b981",
        },
        {
          name: "Total Consumption",
          value: result.totalConsumptionTons,
          fill: "#ef4444",
        },
      ]
    : [];

  const comparisonData = result
    ? [
        {
          category: "Production vs Consumption",
          produced: result.cleanRice,
          needed: result.totalConsumptionTons,
        },
      ]
    : [];

  const populationData = result
    ? [
        {
          name: "Total Population",
          value: result.populationNow,
          fill: "#6366f1",
        },
        {
          name: "Rice Eaters (80%)",
          value: result.riceEaters,
          fill: "#8b5cf6",
        },
      ]
    : [];

  const populationGrowthData = result
    ? (() => {
        const basePopulation = 186960;
        const growthRate = 0.0035;
        const data = [];

        for (let y = 2020; y <= result.year; y++) {
          const yearsPassed = y - 2020;
          const population =
            basePopulation * Math.pow(1 + growthRate, yearsPassed);
          data.push({
            year: y,
            population: Math.round(population),
          });
        }

        return data;
      })()
    : [];

  const chartConfig = {
    produced: {
      label: "Produced",
      color: "#10b981",
    },
    needed: {
      label: "Needed",
      color: "#ef4444",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    computeRice();
  }, [year, harvest]);

  return (
    <div className="w-full space-y-6 px-6">
      <Card>
        <CardHeader className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-green-100 p-2">
              <Sprout className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold sm:text-xl">
                Rice Harvest and Sufficiency for {year}
              </CardTitle>
              <CardDescription>
                View rice production and sufficiency data for the selected year.
              </CardDescription>
            </div>
          </div>

          <div className="w-full sm:w-auto">
            <Select
              value={String(year)}
              onValueChange={(value) => setYear(Number(value))}
            >
              <SelectTrigger id="year" className="min-w-40">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {years
                  .slice()
                  .reverse()
                  .map((y) => (
                    <SelectItem key={y} value={String(y)}>
                      {y}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
      </Card>

      {result && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Sufficiency</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-3xl font-bold">
                  {result.percent.toFixed(1)}%
                  {result.enough ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <p
                  className={`text-sm ${result.enough ? "text-green-600" : "text-red-600"}`}
                >
                  {result.enough
                    ? "Production Sufficient"
                    : "Production Insufficient"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Clean Rice</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {result.cleanRice.toFixed(2)}
                </div>
                <p className="text-muted-foreground text-sm">metric tons</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Population</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {result.populationNow.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </div>
                <p className="text-muted-foreground text-sm">people</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Consumption Needed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">

                  {result.totalConsumptionTons.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </div>
                <p className="text-muted-foreground text-sm">metric tons</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Harvest Breakdown</CardTitle>
                <CardDescription>
                  Distribution of harvested palay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={harvestBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(1)}%`
                        }
                        outerRadius={80}
                        dataKey="value"
                      >
                        {harvestBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production vs Consumption</CardTitle>
                <CardDescription>
                  Comparing clean rice produced with consumption needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar
                        dataKey="produced"
                        fill={chartConfig.produced.color}
                        name="Clean Rice Produced (metric tons)"
                      />
                      <Bar
                        dataKey="needed"
                        fill={chartConfig.needed.color}
                        name="Consumption Needed (metric tons)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Population Distribution</CardTitle>
                <CardDescription>
                  Total population vs rice-eating population
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={populationData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) =>
                          `${name}: ${value.toFixed(0)}`
                        }
                        outerRadius={80}
                        dataKey="value"
                      >
                        {populationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Production Metrics</CardTitle>
                <CardDescription>Key production values</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productionData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="value" name="Tonnes">
                        {productionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                Population Growth Trend (2020 - {result.year})
              </CardTitle>
              <CardDescription>
                Starting from 186,960 in 2020 with 0.35% annual growth rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={populationGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="year"
                      label={{
                        value: "Year",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      label={{
                        value: "Population",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (active && payload?.length) {
                          return (
                            <div className="rounded border bg-white p-3 shadow-lg">
                              <p className="font-semibold">
                                Year: {payload[0]?.payload.year}
                              </p>
                              <p className="text-sm">
                                Population:{" "}
                                {payload[0]?.value?.toLocaleString()}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="population"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={{ fill: "#6366f1", r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Total Harvest:</span>
                    <span>{harvest.toFixed(2)} metric tons</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Seeds (14.47%):</span>
                    <span>{result.seeds.toFixed(2)} metric tons</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Remaining Palay:</span>
                    <span>{result.remainingPalay.toFixed(2)} metric tons</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Clean Rice (65%):</span>
                    <span>{result.cleanRice.toFixed(2)} metric tons</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Total Population:</span>
                    <span>
                      {result.populationNow.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}{" "}
                      people
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Rice Eaters (80%):</span>
                    <span>
                      {result.riceEaters.toLocaleString(undefined, {
                        maximumFractionDigits: 0,
                      })}{" "}
                      people
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Per Capita Consumption:</span>
                    <span>120.18 kg/year</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Total Consumption:</span>
                    <span>
                      {result.totalConsumptionTons.toFixed(2)} metric tons
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
