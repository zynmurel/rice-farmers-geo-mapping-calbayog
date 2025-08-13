"use client";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderCircle, Map, Wheat } from "lucide-react";
import { api } from "@/trpc/react";
import { useParams } from "next/navigation";
import { parseAsString, useQueryState } from "nuqs";
import FarmMap from "./_components/farm-map";

function MapPage() {
  const { id } = useParams();

  const [activeFarmId, setActiveFarmId] = useQueryState(
    "activeFarmId",
    parseAsString.withDefault(""),
  );

  const { data: farms, isLoading: farmsIsLoading } =
    api.farmer.getFarmerFarms.useQuery({ farmerId: String(id) });

  function triggerFarmId(id: string) {
    setActiveFarmId(`${id}IDSEPARATE${Date.now()}`);
  }

  useEffect(() => {
    if (farms && !activeFarmId) {
      setActiveFarmId(farms[0]?.id || "");
    }
  }, [farms]);

  return (
    <Card className="bg-background w-full gap-5 shadow-none dark:opacity-80">
      <CardHeader className="flex w-full flex-row justify-between">
        <div className="flex flex-row items-center gap-2">
          <Map strokeWidth={2.5} className="text-foreground size-8" />
          <div>
            <CardTitle className="text-lg">Map</CardTitle>
            <CardDescription className="-mt-1.5">
              Farm map view.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-5">
          <div>
            <div className="flex w-full flex-row items-center gap-1 font-semibold">
              <Wheat className="size-4" />
              <p className="uppercase">Farms</p>
            </div>
            <div className="bg-foreground/5 flex flex-col gap-1 rounded-lg p-1">
              {farmsIsLoading ? (
                <div className="flex flex-row items-center justify-center gap-1 p-10">
                  <LoaderCircle className="animate-spin" /> Loading ...
                </div>
              ) : (
                farms?.map((farm) => {
                  return (
                    <div
                      key={farm.id}
                      onClick={() => triggerFarmId(farm.id)}
                      className={`hover:border-border hover:bg-card cursor-pointer rounded-lg border p-5 py-3 transition-all ease-in-out ${farm.id === activeFarmId.split("IDSEPARATE")[0] ? "border-border bg-card" : "border-border bg-foreground/5"}`}
                    >
                      <p className="font-bold">{farm.barangay}</p>
                      <p className="text-sm">{farm.address}</p>
                      <div className="mt-2 flex flex-row flex-wrap items-center gap-x-5 gap-y-2">
                        <p className="border-chart-1 border-l-8 pl-1 text-sm font-semibold">
                          {farm.landArea} Hectare/s
                        </p>
                        <p className="border-chart-2 border-l-8 pl-1 text-sm font-semibold">
                          {farm.farmerCount} Farmer/s
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
          <FarmMap farms={farms} />
        </div>
      </CardContent>
    </Card>
  );
}

export default MapPage;
