"use client";

import { useFieldArray, type Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
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
import { Input } from "@/components/ui/input";
import { CoordinatesFieldArray } from "./coordinate-farm-fields";
import { api } from "@/trpc/react";
import { CheckBoxesForm } from "./checkboxes-form";
import { Check, ChevronsUpDown, CornerLeftUp, Plus, X } from "lucide-react";
import {
  cn,
  optionLandCategory,
  optionSoilType,
  optionSourceOfIrrigation,
  optionTenurialStatus,
  optionTopography,
  optionWeatherRisks,
} from "@/lib/utils";
import { barangays } from "@/lib/const/barangays";
import { ImageUploadField } from "./image-upload";
import { Separator } from "@/components/ui/separator";

interface FarmFieldsProps {
  control: Control<any>;
}

export function FarmFields({ control }: FarmFieldsProps) {
  const {
    fields: farmFields,
    append: appendFarm,
    remove: removeFarm,
  } = useFieldArray({
    control,
    name: "farms",
  });

  return (
    <div className="grid gap-8 pb-3">
      <div className="space-y-4">
        {farmFields.map((farm, farmIndex) => {
          return (
            <div
              key={farm.id}
              className="relative grid gap-8 rounded-lg border p-5 px-8"
            >
              <p className="-mb-3 font-bold">Farm Parcel {farmIndex + 1}</p>
              <FormField
                control={control}
                name={`farms.${farmIndex}.isPublished`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-base">Publish Farm</FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-5 md:grid-cols-4">
                <FormField
                  control={control}
                  name={`farms.${farmIndex}.barangay`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Barangay</FormLabel>
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
                                ? barangays.find(
                                    (barangay) => barangay === field.value,
                                  )
                                : "Select barangay"}
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search framework..."
                              className="h-9"
                            />
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {barangays.map((barangay) => (
                                  <CommandItem
                                    value={barangay}
                                    key={barangay}
                                    onSelect={() => {
                                      field.onChange(barangay);
                                    }}
                                  >
                                    {barangay}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        barangay === field.value
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
                <FormField
                  control={control}
                  name={`farms.${farmIndex}.address`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sitio</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Farm sitio" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`farms.${farmIndex}.landArea`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Land Area (hectares)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name={`farms.${farmIndex}.farmerCount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farmer Count</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />
              <FormField
                control={control}
                name={`farms.${farmIndex}.land_category`}
                render={({ field }) => {
                  const onChangeCheck = (value: string) => {
                    const current = field.value || [];
                    if (current.includes(value)) {
                      field.onChange(
                        current.filter((c: string) => c !== value),
                      );
                    } else {
                      field.onChange([value]);
                    }
                  };
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Land Category</FormLabel>
                      <div className="flex flex-col gap-5">
                        <div className="flex w-auto flex-row items-center gap-5 rounded-lg">
                          {optionLandCategory.map((w) => (
                            <div
                              key={w.value}
                              className="flex flex-row items-center gap-2"
                            >
                              <Checkbox
                                checked={field.value?.includes(w.value)}
                                onCheckedChange={() => onChangeCheck(w.value)}
                              />{" "}
                              <p>{w.label}</p>
                            </div>
                          ))}
                        </div>

                        {field.value?.includes("IR") && (
                          <FormField
                            control={control}
                            name={`farms.${farmIndex}.source_of_irrigation`}
                            render={({ field }) => {
                              const onChangeCheck = (value: string) => {
                                const current = field.value || [];
                                if (current.includes(value)) {
                                  field.onChange(
                                    current.filter((c: string) => c !== value),
                                  );
                                } else {
                                  field.onChange([value]);
                                }
                              };
                              return (
                                <FormItem className="flex flex-col">
                                  <FormLabel className="flex flex-row gap-0.5">
                                    <CornerLeftUp className="size-4" /> Source
                                    of Irrigation
                                  </FormLabel>
                                  <div className="flex">
                                    <div className="flex w-auto flex-col gap-2 rounded-lg">
                                      {optionSourceOfIrrigation.map((w) => (
                                        <div key={w.value} className="flex flex-row items-center gap-2">
                                          <Checkbox
                                            checked={field.value?.includes(
                                              w.value,
                                            )}
                                            onCheckedChange={() =>
                                              onChangeCheck(w.value)
                                            }
                                          />{" "}
                                          <p>{w.label}</p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Separator />

              <FormField
                control={control}
                name={`farms.${farmIndex}.weather_risks`}
                render={({ field }) => {
                  const onChangeCheck = (value: string) => {
                    const current = field.value || [];
                    if (current.includes(value)) {
                      field.onChange(
                        current.filter((c: string) => c !== value),
                      );
                    } else {
                      field.onChange([...current, value]);
                    }
                  };
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Weather Risks</FormLabel>
                      <div className="flex">
                        <div className="flex w-auto flex-row items-center gap-5 rounded-lg">
                          {optionWeatherRisks.map((w) => (
                            <div
                              key={w.value}
                              className="flex flex-row items-center gap-2"
                            >
                              <Checkbox
                                checked={field.value?.includes(w.value)}
                                onCheckedChange={() => onChangeCheck(w.value)}
                              />{" "}
                              <p>{w.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Separator />

              <FormField
                control={control}
                name={`farms.${farmIndex}.soil_type`}
                render={({ field }) => {
                  const onChangeCheck = (value: string) => {
                    const current = field.value || [];
                    if (current.includes(value)) {
                      field.onChange(
                        current.filter((c: string) => c !== value),
                      );
                    } else {
                      field.onChange([value]);
                    }
                  };
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Soil Type</FormLabel>
                      <div className="flex">
                        <div className="flex w-auto flex-row items-center gap-5 rounded-lg">
                          {optionSoilType.map((w) => (
                            <div
                              key={w.value}
                              className="flex flex-row items-center gap-2"
                            >
                              <Checkbox
                                checked={field.value?.includes(w.value)}
                                onCheckedChange={() => onChangeCheck(w.value)}
                              />{" "}
                              <p>{w.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Separator />

              <FormField
                control={control}
                name={`farms.${farmIndex}.topography`}
                render={({ field }) => {
                  const onChangeCheck = (value: string) => {
                    const current = field.value || [];
                    if (current.includes(value)) {
                      field.onChange(
                        current.filter((c: string) => c !== value),
                      );
                    } else {
                      field.onChange([value]);
                    }
                  };
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Topography</FormLabel>
                      <div className="flex">
                        <div className="flex w-auto flex-row items-center gap-5 rounded-lg">
                          {optionTopography.map((w) => (
                            <div
                              key={w.value}
                              className="flex flex-row items-center gap-2"
                            >
                              <Checkbox
                                checked={field.value?.includes(w.value)}
                                onCheckedChange={() => onChangeCheck(w.value)}
                              />{" "}
                              <p>{w.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <Separator />
              <FormField
                control={control}
                name={`farms.${farmIndex}.tenurial_status`}
                render={({ field }) => {
                  const onChangeCheck = (value: string) => {
                    const current = field.value || [];
                    if (current.includes(value)) {
                      field.onChange(
                        current.filter((c: string) => c !== value),
                      );
                    } else {
                      field.onChange([value]);
                    }
                  };
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tenurial Status</FormLabel>
                      <div className="flex">
                        <div className="flex w-auto flex-row items-center gap-5 rounded-lg">
                          {optionTenurialStatus.map((w) => (
                            <div
                              key={w.value}
                              className="flex flex-row items-center gap-2"
                            >
                              <Checkbox
                                checked={field.value?.includes(w.value)}
                                onCheckedChange={() => onChangeCheck(w.value)}
                              />{" "}
                              <p>{w.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Separator />

              <ImageUploadField
                control={control}
                name={`farms.${farmIndex}.images`}
              />
              {/* Coordinates */}
              <FormField
                control={control}
                name={`farms.${farmIndex}.coordinates`}
                render={() => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Farm Land Coordinates
                    </FormLabel>

                    <CoordinatesFieldArray
                      control={control}
                      name={`farms.${farmIndex}.coordinates`}
                    />

                    {/* Show refine() error for the array itself */}
                  </FormItem>
                )}
              />

              {farmFields.length > 1 && (
                <div className="text-destructive absolute top-0 right-0 p-5">
                  <Button
                    type="button"
                    variant="ghost"
                    className="hover:text-destructive"
                    onClick={() => removeFarm(farmIndex)}
                  >
                    <X />
                    Remove Farm
                  </Button>
                </div>
              )}
            </div>
          );
        })}

        <div className="flex w-full justify-end">
          <Button
            type="button"
            variant={"outline"}
            onClick={() =>
              appendFarm({
                isPublished: true,
                barangay: undefined,
                address: undefined,
                images: [],
                weatherRiskIds: [],
                farmingMethodIds: [],
                farmerCount: 0,
                landArea: 0,
                coordinates: [],
              })
            }
          >
            <Plus />
            Add Farm
          </Button>
        </div>
      </div>
    </div>
  );
}
