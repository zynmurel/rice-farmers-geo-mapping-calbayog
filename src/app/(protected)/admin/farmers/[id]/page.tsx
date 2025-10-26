"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CloudHail,
  CloudRain,
  Component,
  Edit,
  History,
  ImageIcon,
  ImageOff,
  Plus,
  Pyramid,
  RailSymbol,
  Sprout,
  Users2,
  Waves,
  Waypoints,
  Wheat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { api } from "@/trpc/react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import CoordinateShape from "@/lib/coordinates-shape";
import { parseAsString, useQueryState } from "nuqs";
import EditFarmModal from "../_components/edit-farm-modal";
import AddImageFarmModal from "../_components/add-image-modal";

function Farms() {
  const { id } = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [_, setId] = useQueryState("edit-farm", parseAsString.withDefault(""));
  const [, setAddImageId] = useQueryState(
    "add-image-farm",
    parseAsString.withDefault(""),
  );

  const { data: farms, isLoading: farmsIsLoading } =
    api.farmer.getFarmerFarms.useQuery({ farmerId: String(id) });

  return (
    <Card className="bg-background w-full gap-5 shadow-none dark:opacity-80">
      <CardHeader className="flex w-full flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <Wheat strokeWidth={2.5} className="text-foreground size-8" />
          <div>
            <CardTitle className="text-lg">Farm</CardTitle>
            <CardDescription className="-mt-1.5">
              Farmer&apos;s farm information.
            </CardDescription>
          </div>
        </div>
        <Button
          variant={"outline"}
          className="text-primary"
          onClick={() => setId("create")}
        >
          <Plus />
          Farm
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4">
        <EditFarmModal />
        <AddImageFarmModal/>
        {farms?.map((farm, index) => {
          const coordinates = farm.coordinates as {
            lng: number;
            lat: number;
          }[];
          return (
            <Card
              key={farm.id}
              className="bg-background w-full gap-5 shadow-none"
            >
              <CardHeader className="flex flex-row justify-between">
                <div>
                  <CardDescription>Farm Parcel {index + 1}</CardDescription>
                  <CardTitle className="-mt-1 flex flex-row items-center gap-2 text-2xl">
                    Barangay {farm.barangay}
                    <Badge
                      className={`${farm.isPublished ? "bg-primary brightness-115" : "bg-orange-500"}`}
                    >
                      {farm.isPublished ? "Published" : "Unpublished"}
                    </Badge>
                  </CardTitle>
                  <p className="-mt-1">{farm.address}</p>
                </div>
                <div className="flex flex-row gap-1">
                  <div className="mt-5 flex w-full flex-row gap-2">
                    <Button
                      className="flex-1"
                      size={"lg"}
                      variant={"outline"}
                      onClick={() => setAddImageId(farm.id)}
                    >
                      <ImageIcon />
                      Add Image
                    </Button>
                    <Button
                      className="flex-1"
                      size={"lg"}
                      variant={"outline"}
                      onClick={() => setId(farm.id)}
                    >
                      <Edit />
                      Edit Farm
                    </Button>
                    <Button className="flex-1" size={"lg"}>
                      <History />
                      Crop History
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-5 gap-5">
                <div className="col-span-3 rounded border p-1">
                  {!farm.FarmImage.length ? (
                    <div className="bg-foreground/5 flex aspect-video h-full w-full items-center justify-center">
                      <div className="text-foreground/50 flex flex-row gap-3">
                        <ImageOff />
                        No Image
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <Image
                        width={1000}
                        height={1000}
                        src={farm.FarmImage[0]!.url}
                        alt={farm.FarmImage[0]!.id}
                        className="aspect-video w-full cursor-pointer object-cover transition-all ease-in-out hover:brightness-75"
                      />
                      <div className="grid grid-cols-3 gap-1">
                        {farm.FarmImage.slice(1, 4).map((image) => {
                          return (
                            <Image
                              key={image.id}
                              width={500}
                              height={500}
                              src={image.url}
                              alt={image.id}
                              className="aspect-square w-full cursor-pointer object-cover transition-all ease-in-out hover:brightness-75"
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="col-span-2 mt-1">
                  <div className="flex flex-col gap-5">
                    <div className="border-chart-1 border-l-[14px] pl-2">
                      <p className="text-xs uppercase">Land Area</p>
                      <div className="flex flex-row gap-1">
                        <Pyramid strokeWidth={2.5} />{" "}
                        <p className="text-base leading-6 font-bold">
                          {farm.landArea}ha
                        </p>
                      </div>
                    </div>
                    <div className="border-chart-2 border-l-[14px] pl-2">
                      <p className="text-xs uppercase">FARMERS</p>
                      <div className="flex flex-row gap-1">
                        <Users2 strokeWidth={2.5} />{" "}
                        <p className="text-base leading-6 font-bold">
                          {farm.farmerCount} FARMERS
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-1">
                    <p className="top-2 left-2 text-xs font-bold uppercase">
                      MAP SHAPE
                    </p>
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
                                {farm.landArea} HECTARES
                              </p>
                            </div>
                            <Button
                              className="h-6 w-full text-[10px]"
                              variant={"outline"}
                              onClick={() => {
                                const params = new URLSearchParams(
                                  searchParams.toString(),
                                );
                                params.set("newParam", "123"); // Add or update your param

                                router.push(
                                  `${pathname}/map?activeFarmId=${farm.id}`,
                                );
                              }}
                            >
                              Show on Map
                            </Button>
                          </div>
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </CardContent>
    </Card>
  );
}

export default Farms;
