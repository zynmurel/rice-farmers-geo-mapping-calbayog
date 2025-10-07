"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Wheat, LoaderCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";

export const years = Array.from(
  { length: new Date().getFullYear() - 2000 + 1 },
  (_, i) => `${2000 + i}`,
);

export default function RiceComputationCard() {
  const [year, setYear] = useState<number>(2025);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const { data, isLoading } = api.overview.getDashboardStatsByYear.useQuery(
    {
      year: String(year),
      season: "BOTH",
    },
    { enabled: !!year },
  );

  const harvest = data?.[0]?.harvestedTonnes || 0;

  const computeRice = () => {
    setLoading(true);
    if (!harvest || harvest <= 0) return;

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
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className=" space-y-5">
      <div className="grid grid-cols-1 gap-3">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Harvest Year{" "}
          </label>
          <Select
            value={year.toString()}
            onValueChange={(value) => {
              setYear(Number(value));
              setResult(null);
            }}
          >
            <SelectTrigger className="mt-1 w-full">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className=" max-h-96">
              {[...years].reverse().map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {year &&
        (isLoading ? (
          <div className="flex items-center justify-center gap-1">
            <LoaderCircle className="size-4 animate-spin" /> Loading ...
          </div>
        ) : (
          <div className="text-sm">
            {harvest ? (
              <label>
                Harvest in {year}: <strong>{harvest} metric tons</strong>
              </label>
            ) : (
              <label htmlFor="" className="text-foreground/50">
                No harvest record in year {year}
              </label>
            )}
          </div>
        ))}
      <div className="grid gap-2">
        <Button
          onClick={computeRice}
          disabled={!data?.length}
          className="w-full bg-green-600 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
        >
          Compute
        </Button>
      </div>
      {loading ? (
        <div className="flex w-full flex-col items-center justify-center gap-2 p-10">
          <LoaderCircle className="animate-spin" />
          Loading
        </div>
      ) : (
        result && (
          <div className="mt-6 space-y-3 text-sm">
            <Separator />
            <p>
              <strong>Year:</strong> {result.year}
            </p>
            <p>
              <strong>Seeds with stage:</strong>{" "}
              {result.seeds.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
              metric tons
            </p>
            <p>
              <strong>Remaining Palay Supply:</strong>{" "}
              {result.remainingPalay.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}{" "}
              metric tons
            </p>
            <p>
              <strong>Clean Rice:</strong>{" "}
              {result.cleanRice.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              metric tons
            </p>
            <Separator />
            <p>
              <strong>Population (est.):</strong>{" "}
              {result.populationNow.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
            <p>
              <strong>Rice Eaters (80%):</strong>{" "}
              {result.riceEaters.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </p>
            <p>
              <strong>Annual Rice Consumption:</strong>{" "}
              {result.totalConsumptionTons.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              metric tons
            </p>
            <Separator />
            <div
              className={`rounded-lg p-3 text-center font-semibold ${
                result.enough
                  ? "border border-green-300 bg-green-100 text-green-800"
                  : "border border-red-300 bg-red-100 text-red-800"
              }`}
            >
              {result.enough ? (
                <>
                  <TrendingUp className="mr-1 inline-block h-5 w-5" />
                  Rice Production is <strong>Enough</strong> for {result.year} (
                  {result.percent.toFixed(1)}%)
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 inline-block h-5 w-5" />
                  Rice Production is <strong>Not Enough</strong> for{" "}
                  {result.year} ({result.percent.toFixed(1)}% of requirement)
                </>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
