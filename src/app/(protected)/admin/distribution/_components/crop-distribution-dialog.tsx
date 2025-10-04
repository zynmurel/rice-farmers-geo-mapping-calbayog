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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  LeafIcon,
  PackageIcon,
} from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { api } from "@/trpc/react";
import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const cropDistributionSchema = z.object({
  cropId: z.string().optional(),
  quantity: z.coerce.number().min(1, "Quantity is required"),
  dateGiven: z.date().optional(),
});

type CropDistributionFormValues = z.infer<typeof cropDistributionSchema>;

export default function CropDistributionDialogForm() {
  const invalidate = api.useUtils();
  const [distributionId] = useQueryState("view-distribution", parseAsString);
  const [open, setOpen] = useQueryState("crop-distribution-id", parseAsString);

  const { data: crops } = api.distribution.getSeletableCrops.useQuery();
  const { data: distribution, isLoading } =
    api.distribution.getDistribution.useQuery(
      { id: distributionId! },
      {
        enabled: !!distributionId,
      },
    );
  const form = useForm<CropDistributionFormValues>({
    resolver: zodResolver(cropDistributionSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const { mutate, isPending } =
    api.distribution.upsertCropDistribution.useMutation({
      onSuccess: async () => {
        await Promise.all([
          invalidate.distribution.getDistribution.invalidate(),
        ]);
        setOpen(null);
        form.reset();
      },
    });

  const handleSubmit = (values: CropDistributionFormValues) => {
    mutate({
      ...values,
      distributionId: distributionId!,
      cropDistributionId: open === "create" ? undefined : Number(open),
    });
  };

  const onClose = () => {
    setOpen(null);
    form.reset();
  };

  console.log({ open, distribution });

  useEffect(() => {
    const findCropDistribution = distribution?.CropDistribution.find(
      (cd) => cd.id.toString() === open,
    );
    console.log(findCropDistribution);
    if (findCropDistribution) {
      form.reset({
        cropId: findCropDistribution.cropId || undefined,
        quantity: findCropDistribution.quantity,
        dateGiven: findCropDistribution.dateGiven || undefined,
      });
    } else {
      form.reset({
        quantity: 1,
      });
    }
  }, [distribution, open]);

  return (
    <Dialog open={!!open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {open === "create" ? "Add" : "Update"} Crop Distribution
          </DialogTitle>
          <DialogDescription>Crop distribution details.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4"
          >
            <FormField
              control={form.control}
              name={`cropId`}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Crop</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? crops?.find((crop) => crop.id === field.value)
                                ?.title
                            : "Select Crop"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search crop..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No crops found.</CommandEmpty>
                          <CommandGroup>
                            {crops?.map((crop) => (
                              <CommandItem
                                value={crop.id}
                                key={crop.id}
                                onSelect={() => {
                                  field.onChange(crop.id);
                                }}
                              >
                                {crop.title}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    crop.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity (KG)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Quantity"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateGiven"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distribution Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
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
            </div>

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
