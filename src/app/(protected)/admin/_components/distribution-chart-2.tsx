"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";
import { Leaf, Loader2, LoaderCircle } from "lucide-react";
import { years } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default function DistributionOverview2() {
  const [selectedYear, setSelectedYear] = useState<string | undefined>();
  const [selectedSeason, setSelectedSeason] = useState<"WET" | "DRY" | "BOTH">(
    "BOTH",
  );

  const { data, isLoading } = api.overview.getDashboardStatsByYear.useQuery({
    year: selectedYear,
    season: selectedSeason,
  });

  // if (isLoading) {
  //   return (
  //     <div className="flex h-screen items-center justify-center">
  //       <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
  //     </div>
  //   );
  // }

  const yearlyData = Object.values(
    data?.reduce((acc: any, d) => {
      if (!acc[d.year]) {
        acc[d.year] = { year: d.year, planted: 0, harvested: 0 };
      }
      acc[d.year].planted += d.plantedTonnes;
      acc[d.year].harvested += d.harvestedTonnes;
      return acc;
    }, {}) ?? {},
  ) as { year: string; planted: number; harvested: number }[];

  const yieldData =
    data?.map((d) => ({
      year: `${d.year} ${d.season}`,
      yieldRate: d.yieldRate,
    })) ?? [];

  const seasonData = [
    {
      name: "Dry Season",
      value:
        data
          ?.filter((d) => d.season === "DRY")
          .reduce((a, b) => a + b.harvestedTonnes, 0) ?? 0,
    },
    {
      name: "Wet Season",
      value:
        data
          ?.filter((d) => d.season === "WET")
          .reduce((a, b) => a + b.harvestedTonnes, 0) ?? 0,
    },
  ];

  const COLORS = ["#3b82f6", "#22c55e"];
  console.log(yearlyData);
  return (
    <div className="space-y-4 p-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Planted vs Harvested (Tonnes per Year)</CardTitle>
          <CardDescription>
            This chart compares the total quantity of rice crops planted and
            harvested each year, measured in tonnes. Data can be filtered by
            season to analyze performance during Wet or Dry periods.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">Year</label>
              <Select
                onValueChange={(value) =>
                  setSelectedYear(value === "all" ? undefined : value)
                }
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  {[...years].reverse().map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600">
                Season
              </label>
              <Select
                value={selectedSeason}
                onValueChange={(v) =>
                  setSelectedSeason(v as "WET" | "DRY" | "BOTH")
                }
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BOTH">Both Seasons</SelectItem>
                  <SelectItem value="WET">Wet Season</SelectItem>
                  <SelectItem value="DRY">Dry Season</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {/* Planted vs Harvested */}
        <Card className="col-span-3 pt-10">
          <CardContent>
            {isLoading ? (
              <div className="flex w-full flex-row items-center justify-center gap-2">
                <LoaderCircle className="size-5 animate-spin" />{" "}
                <p>Loading ...</p>
              </div>
            ) : yearlyData.length ? (
              <ResponsiveContainer
                width="100%"
                height={300}
                className={"text-sm"}
              >
                <BarChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 5" />
                  <XAxis dataKey="year" />
                  <YAxis>
                    <Label
                      value="Tonnes"
                      angle={-90}
                      position="insideLeft"
                      style={{ textAnchor: "middle" }}
                    />
                  </YAxis>
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="planted" fill="#e0e024" name="Planted" />
                  <Bar dataKey="harvested" fill="#22c55e" name="Harvested" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex w-full flex-row items-center justify-center gap-2 py-8">
                <Leaf className="size-5" />
                <p>
                  No planting or harvest records found for this year and season.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t">
            <div className="w-full text-end text-sm">
              <p>
                Total Planted:{" "}
                <strong>
                  {yearlyData.reduce((a, c) => a + c.planted, 0).toFixed(2)}{" "}
                  Metric Tons
                </strong>
              </p>

              <div className="text-sm">
                <p className="text-xl font-bold">
                  {yearlyData.reduce((a, c) => a + c.harvested, 0).toFixed(2)}{" "}
                  Metric Tons Yield {selectedYear ? `in ${selectedYear}` : ""}
                  {selectedSeason !== "BOTH" ? ` during ${selectedSeason.toLowerCase()} season` : ""}
                </p>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Yield Efficiency */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Yield Efficiency (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="yieldRate"
                  stroke="#eab308"
                  name="Yield %"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Season Share */}
        <Card>
          <CardHeader>
            <CardTitle>Harvest Share by Season</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={seasonData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {seasonData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
