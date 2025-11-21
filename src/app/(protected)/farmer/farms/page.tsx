"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CoordinateShape from "@/lib/coordinates-shape";
import { useLocaleStore } from "@/store/localeStore";
import { api } from "@/trpc/react";
import { Image, LoaderCircle, Map, Pyramid, Wheat } from "lucide-react";
import React from "react";

function Farms() {
  const { data, isLoading } = api.Farmer.farms.getFarms.useQuery();

  const { messages } = useLocaleStore();
  const language = messages.farms;
  return (
    <div className="lg:bg-background bg-foreground/10">
      <div className="bg-background flex flex-row items-center gap-2 p-2 font-semibold md:p-4 lg:p-5">
        <Wheat className="size-5" strokeWidth={2.5} />
        {language.yourFarm}
      </div>
      {isLoading ? (
        <div className="flex h-[80vh] flex-row items-center justify-center gap-2">
          <LoaderCircle className="animate-spin" />
          Loading...
        </div>
      ) : data?.length ? (
        <div className="my-1 flex flex-col gap-1">
          {data.map((farm, index) => {
            const coordinates = farm.coordinates as {
              lng: number;
              lat: number;
            }[];
            return (
              <div
                key={farm.id}
                className="bg-background p-2 md:p-4 lg:p-2 lg:px-5"
              >
                <p className="text-foreground/50 text-xs md:text-sm">
                  {language.farmParcel} {index + 1}
                </p>
                <p className="text-base font-bold md:text-lg">
                  Barangay {farm.barangay}
                </p>
                <p className="-mt-1 text-sm md:text-base">{farm.address}</p>
                <div className="my-1 grid max-w-[500px] grid-cols-2 gap-1">
                  <div className="bg-chart-1 flex flex-row items-center justify-center gap-1 rounded p-2 text-xs text-white md:text-sm">
                    <Pyramid className="size-4" />
                    {farm.landArea} {language.hectares}
                  </div>
                  <div className="bg-chart-2 flex flex-row items-center justify-center gap-1 rounded p-2 text-xs text-white md:text-sm">
                    <Pyramid className="size-4" />
                    {farm.farmerCount} {language.farmers}
                  </div>
                </div>
                <div className="w-full">
                  <Dialog>
                    <DialogTrigger className="w-full max-w-[500px]">
                      <Button
                        className="w-full rounded"
                        size={"sm"}
                        variant={"outline"}
                      >
                        {language.cropHistory}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-full overflow-y-auto px-2 md:min-w-3xl md:px-5">
                      <DialogHeader>
                        <DialogTitle>{language.cropHistory}</DialogTitle>
                        <DialogDescription>
                          {language.cropHistoryDescription}
                        </DialogDescription>
                      </DialogHeader>
                      {farm.Distribution.length ? (
                        farm.Distribution.sort(
                          (a, b) => Number(b.year) - Number(a.year),
                        ).map((distribution, index) => (
                          <div
                            key={index}
                            className="max-h-[60vh] overflow-y-scroll rounded border"
                          >
                            <Table className="text-xs md:text-sm">
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="pl-4">
                                    {language.yearSeason}
                                  </TableHead>
                                  <TableHead>{language.crop}</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow>
                                  <TableCell className="pl-4 font-bold">
                                    <p>{distribution.year}</p>
                                    <p>
                                      {distribution.season === "DRY"
                                        ? "Dry Season"
                                        : "Wet Season"}
                                    </p>
                                  </TableCell>
                                  <TableCell className="font-bold">
                                    <p>
                                      {distribution.CropDistribution.reduce(
                                        (a, c) => a + c.quantity,
                                        0,
                                      )}{" "}
                                      kg
                                    </p>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </div>
                        ))
                      ) : (
                        <div>
                          <div className="text-foreground/50 flex w-full flex-row items-center justify-center p-5 text-sm">
                            {language.noCropDistributionHistory}
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="grid py-1 lg:grid-cols-2 lg:gap-5">
                  <div className="w-full">
                    <div className="flex flex-row items-center gap-1 py-1">
                      <Image className="size-4" strokeWidth={2.5} />
                      <p className="text-sm font-bold md:text-base">
                        {language.images}
                      </p>
                    </div>
                    {farm.FarmImage?.length ? (
                      <Dialog>
                        <DialogTrigger className="w-full">
                          {farm.FarmImage?.[0]?.url && (
                            <div className="h-80 w-full flex-none overflow-hidden rounded border lg:h-80">
                              <img
                                src={farm.FarmImage[0]?.url}
                                alt={"Farm"}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                        </DialogTrigger>
                        <DialogContent className="w-full overflow-y-auto p-0">
                          <Carousel>
                            <CarouselContent>
                              {farm.FarmImage?.map((farm, index) => (
                                <CarouselItem key={index}>
                                  <div className="w-full flex-none overflow-hidden">
                                    <img
                                      src={farm.url}
                                      alt={`Farm Image ${index + 1}`}
                                      className="h-full w-full object-cover"
                                    />
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                          </Carousel>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="w-full">
                    <div className="flex flex-row items-center gap-1 py-1">
                      <Map className="size-4" strokeWidth={2.5} />
                      <p className="text-sm font-bold md:text-base">
                        {language.map}
                      </p>
                    </div>

                    <div className="bg-foreground/5 relative z-0 flex aspect-video w-full items-center justify-center overflow-hidden rounded border">
                      <CoordinateShape
                        coordinates={coordinates}
                        index={index}
                        popoverContent={
                          <div>
                            <p className="my-0 text-xs font-bold">
                              {farm.barangay}
                            </p>
                            <div className="-mt-3 max-w-52">
                              <p className="text-[10px]">{farm.address}</p>
                              <p className="border-chart-1/80 border-l-8 pl-1 text-[10px]">
                                {farm.landArea} {language.hectares}
                              </p>
                            </div>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-foreground/50 bg-foreground/10 my-1 flex h-[70vh] flex-row items-center justify-center gap-2 rounded border">
          <Wheat className="size-5" />
          {language.noFarms}
        </div>
      )}
    </div>
  );
}

export default Farms;
