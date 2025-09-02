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
  land_category: z.array(z.enum(["IR", "RF", "UL"])),
  weather_risks: z.array(z.enum(["MD", "FD"])),
  source_of_irrigation: z.array(z.enum(["NIA_CIS", "DW", "SWIP", "STW"])),
  soil_type: z
    .array(z.enum(["CL", "SCL", "SiL", "Sal"]))
    .min(1, { message: "Soil type is required" }),
  topography: z
    .array(z.enum(["FLAT", "ROLLING", "HILLY"]))
    .min(1, { message: "Topography is required" }),
  tenurial_status: z
    .array(z.enum(["OWNER", "LESSEE", "TENANT"]))
    .min(1, { message: "Tenurial status is required" }),
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
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  rsbsaNo: z.string().min(1, "RSBSA number  is required"),
  birthday: z.date(),
  addressLineOne: z.string().min(1, "Address is required"),
  farms: z.array(farmSchema).min(1, "At least one farm is required"),
  gender: z.enum(["MALE", "FEMALE"]),
  civilStatus: z.enum([
    "SINGLE",
    "MARRIED",
    "WIDOW",
    "LEGALLY_SEPARATED",
    "ANNULED",
  ]),
  spouse: z.string().optional(),
  indigenous: z.boolean(),
  tribe: z.string().optional(),
});

const createFarmerMutationSchema = z.object({
  phoneNumber: phoneSchema,
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  birthday: z.date(),
  addressLineOne: z.string(),
  gender: z.enum(["MALE", "FEMALE"]),
  civilStatus: z.enum([
    "SINGLE",
    "MARRIED",
    "WIDOW",
    "LEGALLY_SEPARATED",
    "ANNULED",
  ]),
  spouse: z.string().optional(),
  indigenous: z.boolean(),
  tribe: z.string().optional(),
  farms: z
    .array(
      z.object({
        isPublished: z.boolean(),
        images: z.array(z.string()),
        barangay: z.string().min(1),
        address: z.string().min(1),
        farmerCount: z.coerce.number().min(1),
        landArea: z.coerce.number().min(0.1),
        coordinates: coordinatesSchema,
        weather_risks: z.array(z.enum(["MD", "FD"])),
        land_category: z.array(z.enum(["IR", "RF", "UL"])),
        source_of_irrigation: z.array(z.enum(["NIA_CIS", "DW", "SWIP", "STW"])),
        soil_type: z
          .array(z.enum(["CL", "SCL", "SiL", "Sal"]))
          .min(1, { message: "Soil type is required" }),
        topography: z
          .array(z.enum(["FLAT", "ROLLING", "HILLY"]))
          .min(1, { message: "Topography is required" }),
        tenurial_status: z
          .array(z.enum(["OWNER", "LESSEE", "TENANT"]))
          .min(1, { message: "Tenurial status is required" }),
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
