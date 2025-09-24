"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import TablePagination from "@/app/_components/table-pagination";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { formatName } from "@/lib/distributionUtils";

function DistributionTable() {
  const [year] = useQueryState("distribution-year", parseAsString);
  const [season] = useQueryState("distribution-season", parseAsString);
  const [barangay] = useQueryState("distribution-barangay", parseAsString);
  const [pagination] = useQueryStates(
    {
      skip: parseAsInteger.withDefault(0),
      take: parseAsInteger.withDefault(10),
    },
    {
      history: "push",
    },
  );
  const [_, setView] = useQueryState("view-distribution", parseAsString);
  const { data: distributions, isLoading } =
    api.distribution.getDistributions.useQuery({
      year,
      season: season as "WET" | "DRY" | null,
      barangay,
      ...pagination,
    });
  const { data: count } = api.distribution.getDistributionsCount.useQuery({
    year,
    season: season as "WET" | "DRY" | null,
    barangay,
  });

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader className="">
          <TableRow>
            <TableHead className="w-[130px] pl-4 text-center">
              Year & Season
            </TableHead>
            <TableHead>Farmer</TableHead>
            <TableHead>Area</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Crops Distributed</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {distributions?.map((distribution) => {
            return (
              <TableRow key={distribution.id}>
                <TableCell className="w-[130px] pl-4">
                  <div className="flex flex-row items-start justify-center gap-1">
                    <Badge>{distribution.year}</Badge>
                    <Badge
                      className={
                        distribution.season === "DRY"
                          ? "bg-chart-1"
                          : "bg-chart-2"
                      }
                    >
                      {distribution.season === "DRY"
                        ? "Dry Season"
                        : distribution.season === "WET"
                          ? "Wet Season"
                          : distribution.season}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-base font-semibold">
                      {formatName(distribution.Farm.Farmer)}
                    </p>
                    <p className="text-foreground/70">
                      {distribution.Farm.Farmer.phoneNumber}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{distribution.Farm.landArea} ha</TableCell>
                <TableCell>
                  {distribution.CropDistribution[0]?.quantity || 0} kg
                </TableCell>
                <TableCell>
                  {distribution.CropDistribution[0]?.Crop ? <div className=" font-bold">{distribution.CropDistribution[0]?.Crop.title}</div> : <div className=" text-slate-500">No record</div>}
                </TableCell>
                <TableCell>
                  <div className="flex flex-row items-center justify-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          className="size-7 cursor-pointer text-xs"
                          onClick={() => setView(distribution.id)}
                        >
                          <ArrowUpRight />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View details</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {isLoading && (
        <div className="flex w-full items-center justify-center p-5">
          <LoaderCircle className="animate-spin" />
        </div>
      )}
      {!count && !isLoading && (
        <div className="text-muted-foreground flex items-center justify-center p-5 text-sm">
          <p>No distribution found</p>
        </div>
      )}
      <Separator />
      <div className="pb-2">
        <TablePagination count={count} />
      </div>
    </div>
  );
}

export default DistributionTable;
