"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, SproutIcon, WheatIcon } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { api } from "@/trpc/react";
import { Separator } from "@/components/ui/separator";

const plantingSchema = z.object({
  establishmentType: z.enum([
    "Transplanted",
    "Direct Wet Seeded",
    "Direct Dry Seeded",
  ]),
  dateOfSowing: z.date({ required_error: "Date of sowing is required" }),
  dateOfTransplant: z.date().optional(),
  actualHarvestDate: z.date().optional(),
  plantedArea: z.coerce.number().min(0.01, "Planted area is required"),
  plantedQuantity: z.coerce.number().min(0.01, "Planted quantity is required"),
  harvestedQuantity: z.coerce.number().optional(),
});

type PlantingFormValues = z.infer<typeof plantingSchema>;

export default function PlantingDialogForm() {
  const invalidate = api.useUtils();
  const [distributionId] = useQueryState("view-distribution", parseAsString);
  const [open, setOpen] = useQueryState("planting-id", parseAsString);

  const form = useForm<PlantingFormValues>({
    resolver: zodResolver(plantingSchema),
    defaultValues: {
      establishmentType: "Direct Dry Seeded",
      plantedArea: 0,
      plantedQuantity: 0,
    },
  });

  const { data: distribution, isLoading } =
    api.distribution.getDistribution.useQuery(
      { id: distributionId! },
      {
        enabled: !!distributionId,
      },
    );

  const { mutate, isPending } = api.distribution.upsertPlanting.useMutation({
    onSuccess: async () => {
      await Promise.all([invalidate.distribution.getDistribution.invalidate()]);
      setOpen(null);
      form.reset();
    },
  });

  const handleSubmit = (values: PlantingFormValues) => {
    mutate({
      ...values,
      distributionId: distributionId!,
      plantingId: open!,
    });
  };

  const onClose = () => setOpen(null);

  useEffect(() => {
    const totalCrops = distribution?.CropDistribution.reduce(
      (a, c) => a + c.quantity,
      0,
    );
    const landArea = distribution?.Farm.landArea;
    const findPlanting = distribution?.Planting.find((p) => p.id === open);
    if (findPlanting) {
      form.reset({
        establishmentType: findPlanting.establishmentType as any,
        dateOfSowing: findPlanting.dateOfSowing,
        dateOfTransplant: findPlanting.dateOfTransplant || undefined,
        actualHarvestDate: findPlanting.actualHarvestDate || undefined,
        plantedArea: findPlanting.plantedArea || undefined,
        plantedQuantity: findPlanting.plantedQuantity || undefined,
        harvestedQuantity: findPlanting.harvestedQuantity || undefined,
      });
    } else {
      form.reset({
        plantedArea: landArea,
        plantedQuantity: totalCrops,
      });
    }
  }, [open, distribution]);

  return (
    <Dialog open={!!open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Planting Crop Record</DialogTitle>
          <DialogDescription>
            Provide details of planting crop.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4"
          >
            {/* Establishment Type */}
            <FormField
              control={form.control}
              name="establishmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Establishment Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className=" w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Transplanted">
                          Transplanted
                        </SelectItem>
                        <SelectItem value="Direct Wet Seeded">
                          Direct Wet Seeded
                        </SelectItem>
                        <SelectItem value="Direct Dry Seeded">
                          Direct Dry Seeded
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Sowing */}
            <FormField
              control={form.control}
              name="dateOfSowing"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Sowing</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Transplant (only if Transplanted) */}
            {form.watch("establishmentType") === "Transplanted" && (
              <FormField
                control={form.control}
                name="dateOfTransplant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Transplant</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {field.value
                              ? format(field.value, "PPP")
                              : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Planted Area */}
            <FormField
              control={form.control}
              name="plantedArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Planted Area (hectares)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 1.5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Planted Quantity */}
            <FormField
              control={form.control}
              name="plantedQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Planted Quantity (KG)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-row items-center gap-5">
              <p className="text-sm font-bold">Harvest Details</p>{" "}
              <Separator className="flex-1" />
            </div>
            <p className="text-foreground/70 -mt-4 text-xs">
              Harvest details can be inputted once the harvest is done.
            </p>
            {/* Actual Harvest Date */}
            <FormField
              control={form.control}
              name="actualHarvestDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harvest Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                          <WheatIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Harvested Quantity */}
            <FormField
              control={form.control}
              name="harvestedQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Harvested Quantity (KG)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="e.g. 200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
