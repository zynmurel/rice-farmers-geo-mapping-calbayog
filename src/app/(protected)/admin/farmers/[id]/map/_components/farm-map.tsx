import { Checkbox } from "@/components/ui/checkbox";
import { getCenterOfCoords, getColor } from "@/lib/utils";
import type {
  Farm,
  FarmFarmingMethod,
  FarmImage,
  FarmingMethod,
  FarmWeatherRisk,
  WeatherRisk,
} from "@prisma/client";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import {
  parseAsFloat,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Popup, useMap } from "react-leaflet";
import { toast } from "sonner";

const WORLD_IMAGERY = {
  mapView:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  maxZoom: 18.2,
  zoomDelta: 0.3,
  zoomSnap: 0.3,
};

const OPEN_STREET = {
  mapView: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  maxZoom: 18.2,
  zoomDelta: 0.3,
  zoomSnap: 0.3,
};

const MAPVIEWS = {
  OPEN_STREET,
  WORLD_IMAGERY,
};

export default function FarmMap({
  farms,
}: {
  farms:
    | (Farm & {
        FarmFarmingMethod: (FarmFarmingMethod & {
          FarmingMethod: FarmingMethod;
        })[];
      } & {
        FarmWeatherRisk: (FarmWeatherRisk & {
          WeatherRisk: WeatherRisk;
        })[];
      } & {
        FarmImage: FarmImage[];
      })[]
    | undefined;
}) {
  const [activeFarmId] = useQueryState(
    "activeFarmId",
    parseAsString.withDefault(""),
  );

  const [activeMapView, setActiveMapView] = useQueryState(
    "mapView",
    parseAsStringEnum(["OPEN_STREET", "WORLD_IMAGERY"]).withDefault(
      "OPEN_STREET",
    ),
  );

  const farm = farms?.find((f) => f.id === activeFarmId.split("IDSEPARATE")[0]);
  const coordinates = (farm?.coordinates ? farm.coordinates : []) as {
    lat: number;
    lng: number;
  }[];

  const coords: [number, number][] = coordinates.map((coor) => [
    coor.lat,
    coor.lng,
  ]);

  const allFarmCoords = farms?.map((farm) => {
    const coordinates = (farm?.coordinates ? farm.coordinates : []) as {
      lat: number;
      lng: number;
    }[];
    return {
      farm,
      coordinates: coordinates.map((coor) => [coor.lat, coor.lng]) as [
        number,
        number,
      ][],
    };
  });

  const center: [number, number] = coords.length
    ? getCenterOfCoords(coords)
    : [12.0669758, 124.5946412];

  return (
    <div className="z-0 col-span-2 overflow-hidden">
      <div className="flex flex-row items-center justify-end gap-5">
        <div className="flex flex-row items-center gap-1">
          <Checkbox
            id="terms-2"
            checked={activeMapView === "OPEN_STREET"}
            onCheckedChange={() => setActiveMapView("OPEN_STREET")}
          />
          <p>Open Street</p>
        </div>
        <div className="flex flex-row items-center gap-1">
          <Checkbox
            id="terms-2"
            checked={activeMapView === "WORLD_IMAGERY"}
            onCheckedChange={() => setActiveMapView("WORLD_IMAGERY")}
          />
          <p>World Imagery</p>
        </div>
      </div>
      <div className="col-span-2 overflow-hidden rounded-lg border">
        <MapContainer
          center={center}
          zoom={18} // initial, will be overridden by fitBounds
          maxZoom={MAPVIEWS[activeMapView].maxZoom}
          zoomSnap={MAPVIEWS[activeMapView].zoomSnap} // allows fractional zoom like 13.2, 13.4, etc.
          zoomDelta={MAPVIEWS[activeMapView].zoomDelta} // each click changes zoom by 0.2 instead of 1
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            key={MAPVIEWS[activeMapView].mapView}
            attribution="RICE FARMERS GEO MAPPING"
            url={MAPVIEWS[activeMapView].mapView}
            maxZoom={MAPVIEWS[activeMapView].maxZoom}
          />
          {allFarmCoords?.map(({ farm, coordinates }, index) => {
            return (
              <Polygon
                key={farm.id}
                positions={coordinates}
                color={getColor(index)}
                fillColor={getColor(index)}
              >
                <Popup>
                  <div className="bg-foreground/5 relative flex aspect-video w-60 flex-col items-center justify-center overflow-hidden">
                    <ImageOff className="z-10!" />
                    <p className="m-0! p-0!">No Image</p>
                    {farm.FarmImage[0]?.url && (
                      <Image
                        width={300}
                        height={300}
                        src={farm.FarmImage[0].url}
                        alt={farm.FarmImage[0].id}
                        className="absolute top-0 right-0 bottom-0 left-0 z-20 object-cover"
                      />
                    )}
                  </div>
                  <p className="m-0! mt-1 text-base font-bold">
                    {farm.barangay}
                  </p>
                  <p className="m-0!">{farm.address}</p>
                  <div className="mt-2 flex flex-row flex-wrap items-center gap-x-5 gap-y-2">
                    <p className="border-chart-1 m-0! border-l-8 pl-1 text-sm font-semibold">
                      {farm.landArea} Hectare/s
                    </p>
                    <p className="border-chart-2 m-0! border-l-8 pl-1 text-sm font-semibold">
                      {farm.farmerCount} Farmer/s
                    </p>
                  </div>
                </Popup>
              </Polygon>
            );
          })}
          <SmoothPan farms={farms} />
        </MapContainer>
      </div>
    </div>
  );
}

function SmoothPan({ farms }: { farms: Farm[] | undefined }) {
  const map = useMap();
  const [activeFarmId] = useQueryState(
    "activeFarmId",
    parseAsString.withDefault(""),
  );

  const [activeMapView] = useQueryState(
    "mapView",
    parseAsStringEnum(["OPEN_STREET", "WORLD_IMAGERY"]).withDefault(
      "OPEN_STREET",
    ),
  );

  const farm = farms?.find((f) => f.id === activeFarmId.split("IDSEPARATE")[0]);

  const coordinates = (farm?.coordinates ?? []) as {
    lat: number;
    lng: number;
  }[];

  useEffect(() => {
    if (!coordinates.length) {
      toast.info("No Coordinates Provided for this Farm");
      return;
    }

    const coords: [number, number][] = coordinates.map((c) => [c.lat, c.lng]);

    // Automatically set zoom & center to fit coords
    map.fitBounds(coords, {
      animate: true,
      duration: 1.5,
      maxZoom: MAPVIEWS[activeMapView].maxZoom,
    });
  }, [activeFarmId, coordinates, map]);

  return null;
}
