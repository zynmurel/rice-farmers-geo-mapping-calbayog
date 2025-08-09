"use client";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
} from "react-leaflet";

import type { LatLngExpression } from "leaflet";

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
}: {
  className?: string | undefined;
}) {
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
      <Polygon positions={shapeCoords}>
        <Popup>This is a shape with some info.</Popup>
      </Polygon>
    </MapContainer>
  );
}
