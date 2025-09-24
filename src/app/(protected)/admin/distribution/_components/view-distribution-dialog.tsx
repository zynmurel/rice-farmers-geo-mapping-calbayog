"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatName } from "@/lib/distributionUtils";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import {
  CornerDownRight,
  Handshake,
  LoaderCircle,
  Phone,
  Trash,
  Wheat,
} from "lucide-react";
import { parseAsString, parseAsStringEnum, useQueryState } from "nuqs";

export function ViewDistributionModal() {
  const [openDistribution, setOpenDistribution] = useQueryState(
    "view-distribution",
    parseAsString,
  );
  const [activeTab, setActiveTab] = useQueryState(
    "modal-active-tab",
    parseAsStringEnum(["crops", "fertilizers"]).withDefault("crops"),
  );

  const { data, isLoading } = api.distribution.getDistribution.useQuery(
    { id: openDistribution! },
    { enabled: !!openDistribution },
  );

  return (
    <Dialog
      open={!!openDistribution}
      onOpenChange={() => setOpenDistribution(null)}
    >
      <DialogContent className="min-w-4xl bg-white">
        <DialogHeader className="gap-y-1">
          <DialogTitle>Distribution Details</DialogTitle>
          <DialogDescription>
            Manage crop/fertilizer distribution details.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {isLoading ? (
          <div className="flex flex-row items-center justify-center gap-1 p-5">
            <LoaderCircle className="animate-spin" /> Loading ...
          </div>
        ) : !data ? (
          <div className="text-foreground/60 flex flex-row items-center justify-center gap-1 p-5">
            No distribution found
          </div>
        ) : (
          <div className="">
            <div className="flex flex-row justify-between rounded-lg border bg-white p-5 py-4">
              <div>
                <p className="text-foreground/50 text-xs">Farmer</p>
                <p className="text-xl font-bold">{formatName(data.Farmer)}</p>
                <p className="text-sm">{data.Farmer.addressLineOne}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <div className="flex flex-row items-start justify-center gap-1">
                  <Badge>{data.year}</Badge>
                  <Badge
                    className={
                      data.season === "DRY" ? "bg-chart-1" : "bg-chart-2"
                    }
                  >
                    {data.season === "DRY"
                      ? "Dry Season"
                      : data.season === "WET"
                        ? "Wet Season"
                        : data.season}
                  </Badge>
                </div>
                <div className="text-foreground/80 flex flex-row items-center gap-1 text-sm font-semibold">
                  <Phone className="size-3.5" />
                  {data.Farmer.phoneNumber}
                </div>
              </div>
            </div>
            <Tabs
              value={activeTab}
              onValueChange={(e) => setActiveTab(e as any)}
              className="mt-2 gap-4"
            >
              <TabsList className="w-[400px] cursor-pointer bg-slate-100">
                <TabsTrigger className="cursor-pointer" value="crops">
                  Crops
                </TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="fertilizers">
                  Fertilizers
                </TabsTrigger>
              </TabsList>
              <TabsContent value="crops">
                <DistributedCrops />
              </TabsContent>
              <TabsContent value="fertilizers">
                {/* <Fertilizer /> */}
              </TabsContent>
            </Tabs>
            <div className="flex flex-row justify-between border-t pt-4">
              <Button
                size={"sm"}
                variant={"outline"}
                className="cursor-pointer"
                onClick={() => setOpenDistribution(null)}
              >
                Close
              </Button>
              <Button
                size={"sm"}
                variant={"destructive"}
                className="cursor-pointer"
              >
                <Trash />
                Remove
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

const DistributedCrops = () => {
  const [openDistribution, setOpenDistribution] = useQueryState(
    "view-distribution",
    parseAsString,
  );
  const { data, isLoading } = api.distribution.getDistribution.useQuery(
    { id: openDistribution! },
    { enabled: !!openDistribution },
  );
  if (!data) return <></>;
  const crops = data.CropDistribution;
  return (
    <div className="">
      <div className="flex flex-row items-center gap-1">
        <Wheat className="size-5" />
        <p className="text-base font-bold">Distributed Crops</p>
      </div>
      <div className="py-2 max-h-[50vh] overflow-y-scroll">
        {[...crops].map((crop, index) => {
          return (
            <div className="pb-1">
              <div className="border-t py-2">
                <div className=" flex flex-row justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-500">
                      Distribution {index + 1}
                    </p>
                    <div>
                      <p className="font-bold">{crop.Crop.title}</p>
                      <p className="text-xs">
                        {crop.Crop.variety} ({crop.Crop.source} -{" "}
                        {format(crop.Crop.releaseAt, "yyyy")})
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className=" text-sm text-primary font-bold">Quantity : {crop.quantity}{crop.unit.toLowerCase()}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-sidebar-accent flex flex-row items-center gap-1 text-sm font-semibold">
                    <CornerDownRight className="size-4" strokeWidth={3} />
                    <p className="text-primary font-semibold">Crop Planting</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {!crops.length ? (
        <div className="flex flex-row items-center justify-center gap-1 p-5 text-slate-500">
          {" "}
          No crop distribution
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
