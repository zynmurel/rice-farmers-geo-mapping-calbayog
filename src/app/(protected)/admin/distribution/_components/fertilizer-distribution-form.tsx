"use client";
import type { DistributionFormValues } from "@/lib/schemas/distribution";
import {
  Bean,
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
  FormField,
  FormItem,
  FormLabel,
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

function FertilizerDistributionForm() {
  const form = useFormContext<DistributionFormValues>();
  const { data: fertilizers, isLoading } =
    api.distribution.getSeletableFertilizer.useQuery();
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "FertilizerDistribution",
  });
  
  return (
    <div className="grid gap-2">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1">
          <Bean className="size-5" />
          <p className="font-semibold">Fertilizer</p>
        </div>
        <Button
          type="button"
          size={"sm"}
          className="text-xs"
          variant={"outline"}
          onClick={() => {
            append({
              fertilizerId: "",
              dateGiven: new Date(),
              quantity: 0,
              unit: "KG",
            });
          }}
        >
          <Plus /> Fertilizer
        </Button>
      </div>
      <div className="grid gap-1">
        {fields.map((field, index) => {
          return (
            <div className="grid gap-4 rounded-lg border p-3" key={field.id}>
              <div className="flex flex-row justify-between">
                <Badge className="bg-foreground/80">
                  Fertilizer distribution {index + 1}
                </Badge>
                <Badge
                  variant={"destructive"}
                  className="size-6"
                  onClick={() => remove(index)}
                >
                  <X className="flex-none" />
                </Badge>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <FormField
                  control={form.control}
                  name={`FertilizerDistribution.${index}.fertilizerId`}
                  render={({ field }) => (
                    <FormItem className="flex flex-1 flex-col">
                      <FormLabel>Select Fertilizer</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={!fertilizers || isLoading}
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between truncate",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              <p className="flex-1 truncate text-start">
                                {fertilizers?.find(
                                  (fertilizer) => fertilizer.id === field.value,
                                )?.name || "Select fertilizer"}
                              </p>
                              <ChevronsUpDown className="opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[350px] p-0">
                          <Command
                            filter={(value, search) => {
                              if (!search) return 1;
                              const activeFertilizer = fertilizers?.find(
                                (c) => c.id === value,
                              );
                              const text = activeFertilizer
                                ? `${activeFertilizer.name}  ${activeFertilizer.type} ${activeFertilizer.type2} ${activeFertilizer.type3}`.toLowerCase()
                                : undefined;
                              return text?.includes(search.toLowerCase())
                                ? 1
                                : 0;
                            }}
                          >
                            <CommandInput
                              placeholder="Search fertilizer"
                              className="h-9"
                            />
                            {isLoading ? (
                              <div className="flex items-center justify-center p-5">
                                <LoaderCircle className="animate-spin" />
                              </div>
                            ) : (
                              <CommandList className="max-h-[500px] overflow-y-auto">
                                <CommandEmpty>
                                  No fertilizers found.
                                </CommandEmpty>
                                <CommandGroup>
                                  {fertilizers?.map((fertilizer) => (
                                    <CommandItem
                                      value={fertilizer.id}
                                      key={fertilizer.id}
                                      onSelect={field.onChange}
                                    >
                                      <div className="flex flex-col">
                                        <p>{fertilizer.name}</p>
                                        <p className="text-foreground/60 text-xs">
                                          {fertilizer.type} - {fertilizer.type2}{" "}
                                          - {fertilizer.type3}
                                        </p>
                                      </div>
                                      <Check
                                        className={cn(
                                          "ml-auto",
                                          fertilizer.id === field.value
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
                  name={`FertilizerDistribution.${index}.quantity`}
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
                  name={`FertilizerDistribution.${index}.dateGiven`}
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
        {!fields.length ? (
          <div className="bg-foreground/5 text-foreground/60 flex items-center justify-center rounded-lg border-2 border-dashed p-5 text-sm">
            Add Fertilizer (if included)
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default FertilizerDistributionForm;
