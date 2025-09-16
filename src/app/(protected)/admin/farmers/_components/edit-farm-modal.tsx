"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { parseAsString, useQueryState } from "nuqs";
import type { Farmer } from "@prisma/client";
import {
  Check,
  ChevronsUpDown,
  CornerLeftUp,
  Edit,
  Edit2,
  LoaderCircle,
  User,
  UserX,
} from "lucide-react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFarmSchema } from "@/lib/schemas/create-farmer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { CoordinatesFieldArray } from "../create/_components/coordinate-farm-fields";
import { ImageUploadField } from "../create/_components/image-upload";
import { CheckBoxesForm } from "../create/_components/checkboxes-form";
import {
  cn,
  formatCoordinatesToString,
  optionLandCategory,
  optionSoilType,
  optionSourceOfIrrigation,
  optionTenurialStatus,
  optionTopography,
  optionWeatherRisks,
} from "@/lib/utils";
import { barangays } from "@/lib/const/barangays";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

function EditFarmModal() {
  const utils = api.useUtils();
  const [id, setId] = useQueryState("edit-farm", parseAsString.withDefault(""));

  const { data: farm, isLoading } = api.farmer.getFarmerFarm.useQuery(
    {
      farmId: id,
    },
    { enabled: !!id },
  );

  const { mutate, isPending } = api.farmer.updateFarm.useMutation({
    onSuccess: async () => {
      toast.success("Farm updated");
      onClose();
      await Promise.all([
        utils.farmer.getFarmerFarms.invalidate(),
        utils.farmer.getFarmerFarm.invalidate(),
        utils.farm.getFarm.invalidate(),
        utils.farm.getFarmCount.invalidate(),
      ]);
    },
    onError: () => {
      toast.error("Failed", {
        description: "Failed to update farm. Please try again.",
      });
    },
  });

  const form = useForm<z.infer<typeof updateFarmSchema>>({
    resolver: zodResolver(updateFarmSchema),
  });

  const { control } = form;

  const onClose = () => {
    setId("");
  };

  async function onSubmit(values: z.infer<typeof updateFarmSchema>) {
    mutate({
      ...values,
      id,
    });
  }
  useEffect(() => {
    if (farm) {
      const coordinates = farm.coordinates as { lat: number; lng: number }[];
      form.reset({
        id: id,
        isPublished: farm.isPublished,
        barangay: farm.barangay,
        address: farm.address,
        landArea: farm.landArea,
        farmerCount: farm.farmerCount,
        farmingMethodIds: [],
        weatherRiskIds: [],
        coordinates: formatCoordinatesToString(coordinates),
        land_category: farm.land_category as any[],
        weather_risks: farm.weather_risks as any[],
        source_of_irrigation: farm.source_of_irrigation as any[],
        soil_type: farm.soil_type as any[],
        topography: farm.topography as any[],
        tenurial_status: farm.tenurial_status as any[],
      });
    }
  }, [farm]);

  return (
    <Dialog open={!!id} onOpenChange={onClose}>
      <DialogContent className="min-w-3xl">
        <DialogHeader className="">
          <DialogTitle className="flex flex-row items-center gap-1">
            <Edit className="size-5" />
            Edit Farm
          </DialogTitle>
          <DialogDescription className="-mt-2">
            Edit farm details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid w-full gap-4"
          >
            {isLoading ? (
              <div className="flex w-full flex-row items-center justify-center gap-2 p-10">
                <LoaderCircle className="size-7 animate-spin" />
                <p>Loading...</p>
              </div>
            ) : !farm ? (
              <div className="flex w-full flex-row items-center justify-center gap-2 p-10">
                <p>
                  <UserX className="size-7" />
                  No farmer found
                </p>
              </div>
            ) : (
              <div className="relative grid max-h-[80vh] gap-3 overflow-scroll p-1">
                <div className="border-b pb-2">
                  <div className="flex w-full flex-row items-end justify-between">
                    <div className="-mt-1 flex flex-row items-center gap-3">
                      <Avatar className="text-foreground size-12 rounded-lg border">
                        <AvatarImage
                          src={farm.Farmer.profile || undefined}
                          alt={farm.Farmer.id}
                        />
                        <AvatarFallback className="bg-card rounded-lg">
                          {farm.Farmer.firstName[0]}
                          {farm.Farmer.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-foreground/50 text-xs">Owner</p>
                        <p className="text-xl font-semibold">
                          {farm?.Farmer.firstName} {farm?.Farmer.lastName}
                        </p>
                      </div>
                    </div>
                    <FormField
                      control={control}
                      name={`isPublished`}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center gap-2 px-5">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="text-base">
                            Publish Farm
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={control}
                    name={`barangay`}
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
                    name={`address`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Farm address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <FormField
                    control={control}
                    name={`landArea`}
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
                    name={`farmerCount`}
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
                  name={`land_category`}
                  render={({ field }) => {
                    const onChangeCheck = (value: string) => {
                      const current = field.value || [];
                      if (current.includes(value as any)) {
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
                                  checked={field.value?.includes(
                                    w.value as any,
                                  )}
                                  onCheckedChange={() => onChangeCheck(w.value)}
                                />{" "}
                                <p>{w.label}</p>
                              </div>
                            ))}
                          </div>

                          {field.value?.includes("IR") && (
                            <FormField
                              control={control}
                              name={`source_of_irrigation`}
                              render={({ field }) => {
                                const onChangeCheck = (value: string) => {
                                  const current = field.value || [];
                                  if (current.includes(value as any)) {
                                    field.onChange(
                                      current.filter(
                                        (c: string) => c !== value,
                                      ),
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
                                          <div
                                            key={w.value}
                                            className="flex flex-row items-center gap-2"
                                          >
                                            <Checkbox
                                              checked={field.value?.includes(
                                                w.value as any,
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
                  name={`weather_risks`}
                  render={({ field }) => {
                    const onChangeCheck = (value: string) => {
                      const current = field.value || [];
                      if (current.includes(value as any)) {
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
                                  checked={field.value?.includes(
                                    w.value as any,
                                  )}
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
                  name={`soil_type`}
                  render={({ field }) => {
                    const onChangeCheck = (value: string) => {
                      const current = field.value || [];
                      if (current.includes(value as any)) {
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
                                  checked={field.value?.includes(
                                    w.value as any,
                                  )}
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
                  name={`topography`}
                  render={({ field }) => {
                    const onChangeCheck = (value: string) => {
                      const current = field.value || [];
                      if (current.includes(value as any)) {
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
                                  checked={field.value?.includes(
                                    w.value as any,
                                  )}
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
                  name={`tenurial_status`}
                  render={({ field }) => {
                    const onChangeCheck = (value: string) => {
                      const current = field.value || [];
                      if (current.includes(value as any)) {
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
                                  checked={field.value?.includes(
                                    w.value as any,
                                  )}
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

                {/* <ImageUploadField control={control} name={`images`} /> */}
                {/* Coordinates */}
                <FormField
                  control={control}
                  name={`coordinates`}
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Farm Land Coordinates
                      </FormLabel>

                      <CoordinatesFieldArray
                        control={control}
                        name={`coordinates`}
                      />

                      {/* Show refine() error for the array itself */}
                    </FormItem>
                  )}
                />
              </div>
            )}
            <Button disabled={isPending}>Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditFarmModal;
