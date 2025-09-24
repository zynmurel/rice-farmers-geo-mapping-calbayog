import { z } from "zod";

export const distributionBatchSchema = z.object({
  year: z.string(),
  season: z.enum(["WET", "DRY"]),
  barangay: z.string(),
  who: z.string(),
  what: z.string(),
  when: z.string(),
  where: z.string(),
  why: z.string(),
  Distributions: z.array(
    z.object({
      checked: z.boolean(),
      farmId: z.string(),
      estimatedCropKg: z.number(),
      farmer: z.string(),
      phonenumber: z.string(),
      landArea: z.number(),
    }),
  ),
});

export type DistributionFormValues = z.infer<typeof distributionBatchSchema>;
