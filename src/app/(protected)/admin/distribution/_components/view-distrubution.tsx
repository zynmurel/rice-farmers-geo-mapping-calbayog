"use client";

import { parseAsString, useQueryState } from "nuqs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { formatName } from "@/lib/distributionUtils";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  Handshake,
  Plus,
  Pyramid,
  Sprout,
  User,
  Users2,
  Wheat,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CropDistributionDialogForm from "./crop-distribution-dialog";
import { format } from "date-fns";
import FertlizerDistributionDialogForm from "./fertilizer-distribution-dialog";
import PlantingDialogForm from "./planting-dialog";

function ViewDistribution() {
  const [open, setOpen] = useQueryState("view-distribution", parseAsString);
  const [, setOpenCrop] = useQueryState("crop-distribution-id", parseAsString);
  const [, setOpenFertilizer] = useQueryState(
    "fertilizer-distribution-id",
    parseAsString,
  );
  const [, setOpenPlanting] = useQueryState("planting-id", parseAsString);
  const { data: distribution, isLoading } =
    api.distribution.getDistribution.useQuery(
      { id: open! },
      {
        enabled: !!open,
      },
    );
  api.distribution.getSeletableCrops.useQuery();
  api.distribution.getSeletableFertilizer.useQuery();
  return (
    <Dialog open={!!open} onOpenChange={() => setOpen(null)}>
      <CropDistributionDialogForm />
      <FertlizerDistributionDialogForm />
      <PlantingDialogForm />
      <DialogContent className="max-h-[90vh] min-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Distribution & Planting</DialogTitle>
          <DialogDescription>
            Crop distribution and planting record.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        {isLoading ? (
          <div className="flex h-40 w-full items-center justify-center">
            Loading...{" "}
          </div>
        ) : !distribution ? (
          <div className="flex h-40 w-full items-center justify-center">
            No Distribution Found
          </div>
        ) : (
          <div className="relative">
            <div className="absolute right-4 flex flex-row items-center gap-1">
              <Badge>{distribution.year}</Badge>
              <Badge
                className={
                  distribution.season === "DRY" ? "bg-chart-1" : "bg-chart-2"
                }
              >
                {distribution.season === "DRY"
                  ? "Dry Season"
                  : distribution.season === "WET"
                    ? "Wet Season"
                    : distribution.season}
              </Badge>
            </div>
            <p className="text-foreground/50 text-xs">Farm</p>
            <p className="text-xl font-bold">
              Barangay {distribution.Farm.barangay}
            </p>
            <p className="-mt-1 text-sm">
              Barangay {distribution.Farm.address}
            </p>
            <div className="grid max-w-96 grid-cols-2 gap-2 py-1">
              <div className="border-chart-1 border-l-[10px] pl-2">
                <div className="flex flex-row items-center gap-1">
                  <Pyramid strokeWidth={2.5} className="size-4" />{" "}
                  <p className="text-xs leading-6 font-bold">
                    {distribution.Farm.landArea} HECTARES
                  </p>
                </div>
              </div>
              <div className="border-chart-2 border-l-[10px] pl-2">
                <div className="flex flex-row items-center gap-1">
                  <Users2 strokeWidth={2.5} className="size-4" />{" "}
                  <p className="text-xs leading-6 font-bold">
                    {distribution.Farm.farmerCount} FARMERS
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center gap-1">
              <User className="size-4" strokeWidth={3} />
              <p className="text-sm font-bold">
                {" "}
                Farmer - {formatName(distribution.Farm.Farmer)}
              </p>
            </div>
            <Separator className="my-3" />
            <div className="grid gap-2">
              <div className="flex flex-row items-end justify-between">
                <div className="flex flex-row items-center gap-1">
                  <Handshake className="size-4" strokeWidth={2.5} />
                  <p className="font-bold">Distributions</p>
                </div>
                <div className="grid max-w-60 grid-cols-2 items-center gap-1">
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={() => setOpenFertilizer("create")}
                  >
                    <Plus className="size-3 text-xs" />{" "}
                    <span className="text-xs">Fertilizer</span>
                  </Button>
                  <Button size={"sm"} onClick={() => setOpenCrop("create")}>
                    <Plus className="size-3 text-xs" />{" "}
                    <span className="text-xs">Crop</span>
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-2 px-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="">
                      <td className="py-2">Weight (KG)</td>
                      <td className="py-2">Crop</td>
                      <td className="py-2">Distribution Date</td>
                      <td className="py-2"></td>
                    </tr>
                  </thead>
                  <tbody>
                    {distribution.CropDistribution.map((crop) => (
                      <tr key={crop.id} className="border-t">
                        <td className="py-2 font-semibold">
                          {crop.quantity} kg
                        </td>
                        <td className="py-2">
                          {crop.Crop ? (
                            <div className="font-semibold">
                              {crop.Crop.title}
                            </div>
                          ) : (
                            <div className="text-slate-500">Not specified</div>
                          )}
                        </td>
                        <td className="py-2">
                          {crop.dateGiven ? (
                            <div className="font-semibold">
                              {format(crop.dateGiven, "PP")}
                            </div>
                          ) : (
                            <div className="text-slate-500">Not provided</div>
                          )}
                        </td>
                        <td align="right" className="py-1">
                          <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={() => setOpenCrop(crop.id.toString())}
                          >
                            <Edit className="size-3 text-xs" />{" "}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {distribution.FertilizerDistribution.length ? (
                <div className="rounded-lg border p-2 px-5">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="">
                        <td className="py-2">Weight (KG)</td>
                        <td className="py-2">Fertilizer</td>
                        <td className="py-2">Distribution Date</td>
                        <td className="py-2"></td>
                      </tr>
                    </thead>
                    <tbody>
                      {distribution.FertilizerDistribution.map((fert) => (
                        <tr key={fert.id} className="border-t">
                          <td className="py-2 font-semibold">
                            {fert.quantity} kg
                          </td>
                          <td className="py-2">
                            {fert.Fertilizer ? (
                              <div className="font-semibold">
                                {fert.Fertilizer.name}
                              </div>
                            ) : (
                              <div className="text-slate-500">
                                Not specified
                              </div>
                            )}
                          </td>
                          <td className="py-2">
                            {fert.dateGiven ? (
                              <div className="font-semibold">
                                {format(fert.dateGiven, "PP")}
                              </div>
                            ) : (
                              <div className="text-slate-500">Not provided</div>
                            )}
                          </td>
                          <td align="right" className="py-1">
                            <Button
                              size={"sm"}
                              variant={"outline"}
                              onClick={() =>
                                setOpenFertilizer(fert.id.toString())
                              }
                            >
                              <Edit className="size-3 text-xs" />{" "}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <></>
              )}
            </div>
            <Separator className="my-3" />

            <div className="grid gap-2">
              <div className="flex flex-row items-end justify-between">
                <div className="flex flex-row items-center gap-1">
                  <Sprout className="size-4" strokeWidth={2.5} />
                  <p className="font-bold">Planting Record</p>
                </div>
                <div className="grid max-w-60 grid-cols-2 items-center gap-1">
                  <div></div>
                  <Button size={"sm"} onClick={() => setOpenPlanting("create")}>
                    <Plus className="size-3 text-xs" />{" "}
                    <span className="text-xs">Planting</span>
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border p-2 px-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="">
                      <td className="py-2">Establishment</td>
                      <td className="py-2">Planted Quantity</td>
                      <td className="py-2">Date of Sowing</td>
                      <td className="py-2">Land Area</td>
                      <td className="bg-sidebar-accent/20 p-2">
                        Harvest Quantity
                      </td>
                      <td className="bg-sidebar-accent/20 py-2">
                        Harvest Date
                      </td>
                      <td className="py-2"></td>
                    </tr>
                  </thead>
                  <tbody>
                    {distribution.Planting.length ? (
                      distribution.Planting.map((planting) => (
                        <tr key={planting.id} className="border-t">
                          <td className="py-2 font-semibold">
                            {planting.establishmentType}
                            <div className=" text-xs font-normal">
                              {planting.establishmentType === "Transplanted" &&
                              planting.dateOfTransplant
                                ? `Transplant Date : ${format(planting.dateOfTransplant, "PP")}`
                                : ""}
                            </div>
                          </td>
                          <td className="py-2 font-semibold">
                            {planting.plantedQuantity} KG
                          </td>
                          <td className="py-2 font-semibold">
                            {format(planting.dateOfSowing, "PP")}
                          </td>
                          <td className="py-2 font-semibold">
                            {planting.plantedArea} HA
                          </td>
                          <td className="bg-sidebar-accent/20 p-2 font-semibold">
                            {planting.harvestedQuantity ? (
                              `${planting.harvestedQuantity} KG`
                            ) : (
                              <span className="text-foreground/60 text-xs font-normal">
                                Not yet provided
                              </span>
                            )}
                          </td>
                          <td className="bg-sidebar-accent/20 py-2 font-semibold">
                            {planting.actualHarvestDate ? (
                              format(planting.actualHarvestDate, "PP")
                            ) : (
                              <span className="text-foreground/60 text-xs font-normal">
                                Not yet provided
                              </span>
                            )}
                          </td>
                          <td align="right" className="py-1">
                            <Button
                              size={"sm"}
                              variant={"outline"}
                              onClick={() =>
                                setOpenPlanting(planting.id.toString())
                              }
                            >
                              <Edit className="size-3 text-xs" />{" "}
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <></>
                    )}
                  </tbody>
                </table>
                {distribution.Planting.length ? (
                  <></>
                ) : (
                  <div className="text-foreground/80 flex flex-row items-center justify-center border-t p-5 text-sm">
                    No planting crops record
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ViewDistribution;
