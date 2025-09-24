import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { parseAsString, useQueryState } from "nuqs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { cropSchema, type CropFormValues } from "@/lib/schemas/crops";
import {
  optionEnvironments,
  optionEstablishment,
  optionSeasons,
  optionSeedClassifications,
} from "@/lib/cropUtils";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import type { Crop } from "@prisma/client";

export function UpsertCrop({ crops }: { crops: Crop[] | undefined }) {
  const utils = api.useUtils();
  const currentYear = new Date().getFullYear();

  // Generate list of years (1900 → current year)
  const years = useMemo(() => {
    return Array.from(
      { length: currentYear - 1900 + 1 },
      (_, i) => currentYear - i,
    );
  }, [currentYear]);

  const [id, setId] = useQueryState(
    "upsert-crop",
    parseAsString.withDefault(""),
  );

  const isCreate = id === "create";

  const { mutate, isPending } = api.crop.upsertCrop.useMutation({
    onSuccess: async () => {
      toast.success(`Crop ${isCreate ? "created" : "updated"}`);
      setId(null);
      await Promise.all([
        utils.crop.getCrops.invalidate(),
        utils.crop.getCropsCount.invalidate(),
      ]);
    },
    onError: () => {
      toast.error("Failed", {
        description: "Failed to create crop. Please try again.",
      });
    },
  });

  const form = useForm<CropFormValues>({
    resolver: zodResolver(cropSchema),
    defaultValues: {
      title: "",
      variety: "",
      code: "",
      source: "",
      releaseAt: new Date(),
      season: [],
      establishment: [],
      environment: [],
      seed_classification: "",
    },
  });

  const onSubmit = (data: CropFormValues) => {
    mutate({
      id: isCreate ? undefined : id,
      ...data,
    });
  };

  const onCancel = () => {
    setId(null);
  };

  useEffect(() => {
    const activeCrop = crops?.find((c) => c.id === id);
    if (activeCrop) {
      form.reset({
        title: activeCrop.title,
        variety: activeCrop.variety,
        code: activeCrop.code || undefined,
        source: activeCrop.source,
        releaseAt: activeCrop.releaseAt,
        season: activeCrop.season,
        establishment: activeCrop.establishment,
        environment: activeCrop.environment,
        seed_classification: activeCrop.seed_classification,
        daysOfSowing: activeCrop.daysOfSowing,
      });
    }
  }, [crops, id]);

  return (
    <Dialog open={!!id} onOpenChange={() => setId(null)}>
      <DialogContent className="max-h-[90vh] min-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {!isCreate ? "Edit Crop" : "Create New Crop"}
          </DialogTitle>
          <DialogDescription>
            {!isCreate
              ? "Update the crop information below."
              : "Fill in the details to create a new crop."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter crop name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="variety"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Variety</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., NSIC Rc 222" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter crop code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., PhilRice" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="releaseAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Release Year</FormLabel>
                    <Select
                      value={
                        field.value ? String(field.value.getFullYear()) : ""
                      }
                      onValueChange={(year) => {
                        // return full Date object but default to Jan 1
                        field.onChange(new Date(Number(year), 0, 1));
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={String(year)}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="seed_classification"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seed Classification</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select seed classification" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {optionSeedClassifications.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="daysOfSowing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Days of Sowing</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter days of sowing " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="season"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seasons</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {optionSeasons.map((option) => (
                      <FormItem
                        key={option.value}
                        className="flex flex-row items-start space-y-0 space-x-3"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.value)}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...(field.value || []), option.value]
                                : field.value?.filter(
                                    (value) => value !== option.value,
                                  ) || [];
                              field.onChange(updatedValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="establishment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Establishment Methods</FormLabel>
                  <div className="grid grid-cols-1 gap-2">
                    {optionEstablishment.map((option) => (
                      <FormItem
                        key={option.value}
                        className="flex flex-row items-start space-y-0 space-x-3"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.value)}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...(field.value || []), option.value]
                                : field.value?.filter(
                                    (value) => value !== option.value,
                                  ) || [];
                              field.onChange(updatedValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="environment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Environments</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {optionEnvironments.map((option) => (
                      <FormItem
                        key={option.value}
                        className="flex flex-row items-start space-y-0 space-x-3"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(option.value)}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...(field.value || []), option.value]
                                : field.value?.filter(
                                    (value) => value !== option.value,
                                  ) || [];
                              field.onChange(updatedValue);
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (isCreate ? "Creating..." : "Updating...") : (isCreate ? "Create" : "Update")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
