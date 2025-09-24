import { z } from "zod";

export const cropSchema = z.object({
  title: z.string().min(1, "Title is required"),
  variety: z.string().min(1, "Variety is required"),
  code: z.string().optional(),
  source: z.string().min(1, "Source is required"),
  releaseAt: z.date({
    required_error: "Release date is required",
  }),
  season: z.array(z.string()).min(1, "At least one season must be selected"),
  establishment: z
    .array(z.string())
    .min(1, "At least one establishment method must be selected"),
  environment: z
    .array(z.string())
    .min(1, "At least one environment must be selected"),
  seed_classification: z.string().min(1, "Seed classification is required"),
  daysOfSowing: z.coerce.number().min(1, "Days of sowing is required"),
});

export type CropFormValues = z.infer<typeof cropSchema>;
