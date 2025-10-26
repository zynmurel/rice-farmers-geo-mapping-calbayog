"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { parseAsString, useQueryState } from "nuqs";
import { ArrowUpRight, Edit, LoaderCircle, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatName } from "@/lib/distributionUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function CropHistoryModal() {
  const [id, setId] = useQueryState(
    "crop-history",
    parseAsString.withDefault(""),
  );
  const [_, setView] = useQueryState("view-distribution", parseAsString);

  const { id: farmerId } = useParams();

  const { data: farmer, isLoading: farmerIsLoading } =
    api.farmer.getFarmer.useQuery({ farmerId: String(farmerId) });

  const { data: distributions, isLoading: distributionIsLoading } =
    api.distribution.getDistributionsByFarmId.useQuery({
      farmId: id,
    });

  const { data: farm, isLoading } = api.farmer.getFarmerFarm.useQuery(
    {
      farmId: id,
    },
    { enabled: !!id },
  );

  const onClose = () => {
    setId("");
  };

  return (
    <Dialog open={!!id} onOpenChange={onClose}>
      <DialogContent className="min-w-5xl">
        <DialogHeader className="">
          <DialogTitle className="flex flex-row items-center gap-1">
            <Edit className="size-5" />
            Crop History
          </DialogTitle>
          <DialogDescription className="-mt-2">
            Crop history details and planting record.
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex w-full flex-row items-center justify-center gap-2 p-10">
            <LoaderCircle className="size-7 animate-spin" />
            <p>Loading...</p>
          </div>
        ) : !farm ? (
          <div className="flex w-full flex-row items-center justify-center gap-2 p-10">
            <p>
              <UserX className="size-7" />
              No farmer found
            </p>
          </div>
        ) : (
          <div className="relative grid max-h-[80vh] gap-3 overflow-scroll p-1">
            <div className="border-b pb-2">
              <div className="flex w-full flex-row items-end justify-between">
                <div className="-mt-1 flex flex-row items-center gap-3">
                  <Avatar className="text-foreground size-12 rounded-lg border">
                    <AvatarImage
                      src={farmer?.profile || undefined}
                      alt={farmer?.id}
                    />
                    <AvatarFallback className="bg-card rounded-lg">
                      {farmer?.firstName[0]}
                      {farmer?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-foreground/50 text-xs">Owner</p>
                    <p className="text-xl font-semibold">
                      {farmer?.firstName} {farmer?.lastName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-foreground/50 text-xs">Farm</p>
              <p className="text-xl font-bold">Barangay {farm.barangay}</p>{" "}
              <p className="text-sm">{farm.address}</p>
            </div>
          </div>
        )}
        <div className="rounded-lg border">
          <Table>
            <TableHeader className="">
              <TableRow>
                <TableHead className="w-[130px] pl-4 text-center">
                  Year & Season
                </TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Barangay/Address</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Crops Distributed</TableHead>
                {/* <TableHead></TableHead> */}
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
                    <TableCell>
                      <div>
                        <p className="text-base font-semibold">
                          {distribution.Farm.barangay}
                        </p>
                        <p className="text-foreground/70">
                          {distribution.Farm.address}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>{distribution.Farm.landArea} ha</TableCell>
                    <TableCell>
                      {distribution.CropDistribution[0]?.quantity || 0} kg
                    </TableCell>
                    <TableCell>
                      {distribution.CropDistribution[0]?.Crop ? (
                        <div className="font-bold">
                          {distribution.CropDistribution[0]?.Crop.title}
                        </div>
                      ) : (
                        <div className="text-slate-500">No record</div>
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
                    </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {isLoading || distributionIsLoading ? (
            <div className="flex w-full items-center justify-center p-5">
              <LoaderCircle className="animate-spin" />
            </div>
          ) : distributions?.length ? (
            <></>
          ) : (
            <div className="flex w-full items-center justify-center p-5">
              No distribution record.
            </div>
          )}
          {/* {!count && !isLoading && (
            <div className="text-muted-foreground flex items-center justify-center p-5 text-sm">
              <p>No distribution found</p>
            </div>
          )} */}
          {/* <Separator /> */}
          <div className="pb-2">{/* <TablePagination count={count} /> */}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CropHistoryModal;
