"use client";
import type { DistributionFormValues } from "@/lib/schemas/distribution";
import {
  Check,
  ChevronsUpDown,
  LoaderCircle,
  Plus,
  Wheat,
  X,
} from "lucide-react";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatName } from "@/lib/distributionUtils";
import { api } from "@/trpc/react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type z from "zod";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

function CropDistributionForm() {
  const form = useFormContext<DistributionFormValues>();
  const { data: crops, isLoading } =
    api.distribution.getSeletableCrops.useQuery();
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "CropDistribution",
  });
  console.log(form.getValues());
  return (
    <div className="grid gap-2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <Wheat className="size-5" />
          <p className="font-semibold">Crops</p>
        </div>
        <Button
          type="button"
          size={"sm"}
          className="text-xs"
          variant={"outline"}
          onClick={() => {
            append({
              cropId: "",
              dateGiven: new Date(),
              quantity: 0,
              unit: "KG",
              type: "SEED",
            });
          }}
        >
          <Plus /> Crop
        </Button>
      </div>
      <div className="grid gap-1">
        {fields.map((field, index) => {
          return (
            <div className="grid gap-4 rounded-lg border p-3" key={field.id}>
              <div className="flex flex-row justify-between">
                <Badge className="bg-foreground/80">
                  Crop distribution {index + 1}
                </Badge>
                {index ? (
                  <Badge
                    variant={"destructive"}
                    className="size-6"
                    onClick={() => remove(index)}
                  >
                    <X className="flex-none" />
                  </Badge>
                ) : (
                  <></>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                <FormField
                  control={form.control}
                  name={`CropDistribution.${index}.cropId`}
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col">
                      <FormLabel>Select Crop</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={!crops || isLoading}
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <p className="flex-1 truncate text-start">
                                {crops?.find((crop) => crop.id === field.value)
                                  ?.title || "Select crop"}
                              </p>
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[350px] p-0">
                          <Command
                            filter={(value, search) => {
                              if (!search) return 1;
                              const activeCrop = crops?.find(
                                (c) => c.id === value,
                              );
                              const text = activeCrop
                                ? `${activeCrop.code}  ${activeCrop.seed_classification} ${activeCrop.source} ${activeCrop.variety} ${activeCrop.title} ${format(activeCrop.releaseAt, "yyyy")}`.toLowerCase()
                                : undefined;
                              return text?.includes(search.toLowerCase())
                                ? 1
                                : 0;
                            }}
                          >
                            <CommandInput
                              placeholder="Search crop"
                              className="h-9"
                            />
                            {isLoading ? (
                              <div className="flex items-center justify-center p-5">
                                <LoaderCircle className="animate-spin" />
                              </div>
                            ) : (
                              <CommandList className="max-h-[500px] overflow-y-auto">
                                <CommandEmpty>No crops found.</CommandEmpty>
                                <CommandGroup>
                                  {crops?.map((crop) => (
                                    <CommandItem
                                      value={crop.id}
                                      key={crop.id}
                                      onSelect={field.onChange}
                                    >
                                      <div className="flex flex-col">
                                        <p>{crop.title}</p>
                                        <p className="text-foreground/60 text-xs">
                                          {crop.variety} - {crop.source}{" "}
                                          {format(crop.releaseAt, "yyyy")}
                                        </p>
                                      </div>
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
                            )}
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`CropDistribution.${index}.type`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Planting Material</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select material" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-96">
                          {["SEED", "SEEDLING"].map((season) => (
                            <SelectItem key={season} value={String(season)}>
                              {season === "SEED" ? "Seed" : "Seedling"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`CropDistribution.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Quantity (in KG)</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Input quantity in kg" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`CropDistribution.${index}.dateGiven`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Distributed</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              className={`w-full justify-start text-left font-normal ${
                                !field.value && "text-muted-foreground"
                              }`}
                            >
                              {field.value
                                ? format(field.value, "PPP")
                                : "Pick a date"}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
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
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CropDistributionForm;
