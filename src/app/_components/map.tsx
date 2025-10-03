"use client";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";

import type { LatLngExpression } from "leaflet";
import type { Farm, FarmImage } from "@prisma/client";
import { ImageOff } from "lucide-react";
import { getColor } from "@/lib/utils";
import Image from "next/image";

const shapeCoords: LatLngExpression[] = [
  [14.605, 121.0],
  [14.61, 121.02],
  [14.595, 121.025],
  [14.59, 121.005],
];
// Calbayog City center
const calbayogCenter: LatLngExpression = [12.075, 124.6];

export default function MapView({
  className = undefined,
  farms,
}: {
  className?: string | undefined;
  farms: (Farm & { FarmImage: FarmImage[] })[];
}) {
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
  return (
    <MapContainer
      center={calbayogCenter}
      zoom={14}
      minZoom={8}
      scrollWheelZoom={false}
      className={className}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
              <p className="m-0! mt-1 text-base font-bold">{farm.barangay}</p>
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
      {/* <SmoothPan farms={farms} /> */}
    </MapContainer>
  );
}
