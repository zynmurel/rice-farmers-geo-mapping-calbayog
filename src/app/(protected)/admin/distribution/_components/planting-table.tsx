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
import ViewDistribution from "./view-distrubution";
import { format } from "date-fns";

function PlantingTable() {
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
  const { data: planting, isLoading } =
    api.distribution.getPlantingDistributions.useQuery({
      year,
      season: season as "WET" | "DRY" | null,
      barangay,
      ...pagination,
    });
  const { data: count } =
    api.distribution.getPlantingDistributionsCount.useQuery({
      year,
      season: season as "WET" | "DRY" | null,
      barangay,
    });

  return (
    <div className="rounded-lg border">
      <ViewDistribution />
      <Table className=" overflow-hidden rounded-t-md">
        <TableHeader className="">
          <TableRow>
            <TableHead className="pl-4">Farmer</TableHead>
            <TableHead>Establisment</TableHead>
            <TableHead>Planted Quantity</TableHead>
            <TableHead>Date of Sowing</TableHead>
            <TableHead>Land Area</TableHead>
            <TableHead className="bg-sidebar-accent/30 text-center" align="center">
              Harvest Quantity
            </TableHead>
            <TableHead className="bg-sidebar-accent/30 text-center" align="center">Harvest Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {planting?.map((planting) => {
            return (
              <TableRow key={planting.id}>
                <TableCell className="pl-4">
                  <div>
                    <p className="text-sm font-semibold">
                      {formatName(planting.Distribution.Farm.Farmer)}
                    </p>
                    <p className="text-xs">
                      Barangay {planting.Distribution.Farm.barangay}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold">
                    {planting.establishmentType}
                  </div>
                  <div className="text-xs font-normal">
                    {planting.establishmentType === "Transplanted" &&
                    planting.dateOfTransplant
                      ? `Transplant Date : ${format(planting.dateOfTransplant, "PP")}`
                      : ""}
                  </div>
                </TableCell>
                <TableCell>{planting.plantedQuantity} Kg</TableCell>
                <TableCell>{format(planting.dateOfSowing, "PP")}</TableCell>
                <TableCell>{planting.plantedArea} Hectare</TableCell>
                <TableCell className="bg-sidebar-accent/30 font-semibold text-primary" align="center">
                  {planting.harvestedQuantity ? (
                    `${planting.harvestedQuantity} Kg`
                  ) : (
                    <span className="text-foreground/60 text-xs font-normal">
                      Not yet provided
                    </span>
                  )}
                </TableCell>
                <TableCell className="bg-sidebar-accent/30 font-semibold text-primary" align="center">
                  {planting.actualHarvestDate ? (
                    format(planting.actualHarvestDate, "PP")
                  ) : (
                    <span className="text-foreground/60 text-xs font-normal">
                      Not yet provided
                    </span>
                  )}
                </TableCell>

                {/* <TableCell>
                  <div className="flex flex-row items-center justify-center gap-1">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant={"outline"}
                          size={"icon"}
                          className="size-7 cursor-pointer text-xs"
                          onClick={() => setView(planting.Distribution.id)}
                        >
                          <ArrowUpRight />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View details</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell> */}
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

export default PlantingTable;
