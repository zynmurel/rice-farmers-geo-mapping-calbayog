import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeFilename(filename: string) {
  return filename
    .replace(/\s+/g, "-") // replace spaces with hyphen
    .replace(/:/g, "") // remove colons
    .replace(/[^a-zA-Z0-9-_.]/g, ""); // remove other invalid characters if needed
}

export const formatCoordinatesToString = (
  coordinates: { lat: number; lng: number }[] | undefined | null,
) => {
  if (!coordinates) return undefined;
  return coordinates
    .map((c) => [c.lat, c.lng])
    .flat()
    .join();
};

export const formatCoordinatesToJSON = (coordString: string | undefined) => {
  if (!coordString) return undefined;
  // Split into parts, trim spaces, and filter out any empty entries
  const parts = coordString
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  // Ensure even number of elements (lng, lat pairs)
  if (parts.length % 2 !== 0) {
    throw new Error("Invalid coordinate string: odd number of values.");
  }

  const result: { lng: number; lat: number }[] = [];

  for (let i = 0; i < parts.length; i += 2) {
    const lng = parseFloat(parts[i]!);
    const lat = parseFloat(parts[i + 1]!);

    if (isNaN(lng) || isNaN(lat)) {
      throw new Error(
        `Invalid number at index ${i}: ${parts[i]}, ${parts[i + 1]}`,
      );
    }

    result.push({ lng, lat });
  }

  return result;
};

export function getCenterOfCoords(coords: [number, number][]): [number, number] {
  const total = coords.reduce(
    (acc, [lat, lng]) => {
      acc.lat += lat!;
      acc.lng += lng!;
      return acc;
    },
    { lat: 0, lng: 0 },
  );

  const count = coords.length;
  return [total.lat / count, total.lng / count];
}

export const COLORS: string[] = Array.from({ length: 12 }, (_, i) => {
  const hue = Math.floor((i * 360) / 12); // 12 equally spaced hues
  return `hsl(${hue}, 70%, 50%)`;
});

export function getColor(index: number) {
  return COLORS[index % COLORS.length]; // loops back to start
}
