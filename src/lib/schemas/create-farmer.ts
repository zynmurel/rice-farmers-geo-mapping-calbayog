import z from "zod";
import { phoneSchema } from "./phone-schema";

export const coordinatesSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val) return true; // allow undefined or empty

      // Split by comma and trim
      const parts = val.split(",").map((p) => p.trim());

      // Must be even number of values (lng, lat pairs)
      if (parts.length % 2 !== 0) return false;

      // Every part must be a valid number
      return parts.every((p) => !isNaN(Number(p)) && p.length > 0);
    },
    {
      message:
        "Coordinates must be in format: lng,lat, lng,lat, ... and all must be numbers",
    },
  );

const farmSchema = z.object({
  isPublished: z.boolean(),
  images: z.any().refine((files) => {
    return Array.from(files).every((file) =>
      (file as File).type.startsWith("image/"),
    );
  }, "All files must be images"),
  weatherRiskIds: z.array(z.coerce.number()),
  barangay: z.string().min(1, "Barangay is required"),
  address: z.string().min(1, "Address is required"),
  farmingMethodIds: z.array(z.coerce.number()),
  farmerCount: z.coerce.number().min(1),
  landArea: z.coerce.number().min(0.1),
  coordinates: coordinatesSchema,
  // coordinates: z
  //   .array(z.object({ lat: z.coerce.number(), lng: z.coerce.number() }))
  //   .refine((coords) => coords.length === 0 || coords.length >= 3, {
  //     message: "If coordinates are provided, at least 3 are required.",
  //   }),
});

const updateFarmerSchema = z.object({
  id: z.string(),
  phoneNumber: phoneSchema,
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthday: z.date(),
  addressLineOne: z.string().min(1, "Address is required"),
  addressLineTwo: z.string().optional(),
});

const updateFarmSchema = z.object({
  id: z.string(),
  isPublished: z.boolean(),
  weatherRiskIds: z.array(z.coerce.number()),
  barangay: z.string().min(1),
  address: z.string().min(1),
  farmingMethodIds: z.array(z.coerce.number()),
  farmerCount: z.coerce.number().min(1),
  landArea: z.coerce.number().min(0.1),
  coordinates: coordinatesSchema,
  // coordinates: z
  //   .array(z.object({ lat: z.coerce.number(), lng: z.coerce.number() }))
  //   .refine((coords) => coords.length === 0 || coords.length >= 3),
});

const farmerSchema = z.object({
  phoneNumber: phoneSchema,
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  birthday: z.date(),
  addressLineOne: z.string().min(1, "Address is required"),
  addressLineTwo: z.string().optional(),
  farms: z.array(farmSchema).min(1, "At least one farm is required"),
});

const createFarmerMutationSchema = z.object({
  phoneNumber: phoneSchema,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  birthday: z.date(),
  addressLineOne: z.string(),
  addressLineTwo: z.string().optional(),
  farms: z
    .array(
      z.object({
        isPublished: z.boolean(),
        images: z.array(z.string()),
        weatherRiskIds: z.array(z.coerce.number()),
        barangay: z.string().min(1),
        address: z.string().min(1),
        farmingMethodIds: z.array(z.coerce.number()),
        farmerCount: z.coerce.number().min(1),
        landArea: z.coerce.number().min(0.1),
        coordinates: coordinatesSchema,
      }),
    )
    .min(1, "At least one farm is required"),
});

export {
  farmSchema,
  farmerSchema,
  createFarmerMutationSchema,
  updateFarmerSchema,
  updateFarmSchema,
};
