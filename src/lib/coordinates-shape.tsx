import { CircleSlash } from "lucide-react";
import type { JSX } from "react";
import { MapContainer, TileLayer, Polygon, Popup, useMap } from "react-leaflet";
import { getCenterOfCoords, getColor } from "./utils";

function FitBounds({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  map.fitBounds(coords);
  return null;
}

export default function CoordinateShape({
  coordinates,
  popoverContent,
  index,
}: {
  coordinates: { lng: number; lat: number }[];
  popoverContent?: JSX.Element;
  index: number;
}) {
  const coords: [number, number][] = coordinates.map((coor) => [
    coor.lat,
    coor.lng,
  ]);

  // Find bounds
  // const lats = coords
  //   .map((c) => c[0])
  //   .filter((n): n is number => typeof n === "number");
  // const lngs = coords
  //   .map((c) => c[1])
  //   .filter((n): n is number => typeof n === "number");
  // const minLat = Math.min(...lats);
  // const maxLat = Math.max(...lats);
  // const minLng = Math.min(...lngs);
  // const maxLng = Math.max(...lngs);

  // Convert to x/y (simple projection) normalized to SVG size
  // const width = 200;
  // const height = 200;

  // const projected = coords.map(([lat, lng]) => {
  //   const x = ((lng - minLng) / (maxLng - minLng)) * width;
  //   const y = ((maxLat - lat) / (maxLat - minLat)) * height; // flip Y
  //   return [x, y];
  // });

  if (!coordinates.length) {
    return (
      <div className="flex flex-col items-center justify-center text-sm opacity-50">
        <CircleSlash />
        No coordinates provided
      </div>
    );
  }
  return (
    <MapContainer
      center={getCenterOfCoords(coords)}
      zoom={20}
      maxZoom={50}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false} // hides zoom buttons
      // dragging={false} // disable panning
      scrollWheelZoom={false} // disable zoom on scroll
      doubleClickZoom={false} // disable zoom on double click
      touchZoom={false} // disable touch zoom
      keyboard={false} // disable arrow keys
    >
      <TileLayer
        attribution="&copy; GEO-AGRI"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={50}
      />
      <Polygon
        positions={coords}
        color={getColor(index)}
        fillColor={getColor(index)}
      >
        {popoverContent ? <Popup>{popoverContent}</Popup> : <></>}
      </Polygon>

      <FitBounds coords={coords} />
    </MapContainer>
  );

  // return (
  //   <svg width={width} height={height}>
  //     <polygon
  //       points={points}
  //       fill="orange"
  //       stroke="red"
  //       strokeWidth="2"
  //       opacity="0.5"
  //     />
  //   </svg>
  // );
}
