import { z } from "zod";

export const fertilizerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  type2: z.string().min(1, "Required"),
  type3: z.string().min(1, "Required"),
});

export type FertilizerFormValues = z.infer<typeof fertilizerSchema>;
