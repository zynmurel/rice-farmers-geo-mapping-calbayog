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
import {
  fertilizerSchema,
  type FertilizerFormValues,
} from "@/lib/schemas/fertilizer";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import type { Fertilizer } from "@prisma/client";
import { optionFertilizerType } from "@/lib/fertilizerUtils";

export function UpsertFertilizer({
  fertilizers,
}: {
  fertilizers: Fertilizer[] | undefined;
}) {
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
    "upsert-fertilizer",
    parseAsString.withDefault(""),
  );

  const { mutate, isPending } = api.fertilizer.upsertFertilizer.useMutation({
    onSuccess: async () => {
      toast.success(`Fertilizer ${isCreate ? "created" : "updated"}`);
      setId(null);
      await Promise.all([utils.fertilizer.getFertilizer.invalidate(),utils.fertilizer.getFertilizerCount.invalidate()]);
    },
    onError: () => {
      toast.error("Failed", {
        description: "Failed to create fertilizer. Please try again.",
      });
    },
  });

  const form = useForm<FertilizerFormValues>({
    resolver: zodResolver(fertilizerSchema),
    defaultValues: {
      name: "",
      type: undefined,
    },
  });

  const isCreate = id === "create";

  const onSubmit = (data: FertilizerFormValues) => {
    mutate({
      id: isCreate ? undefined : id,
      ...data,
    });
  };

  const onCancel = () => {
    setId(null);
  };

  useEffect(() => {
    const activeFertilizer = fertilizers?.find((c) => c.id === id);
    if (activeFertilizer) {
      form.reset({
        name: activeFertilizer.name,
        type: activeFertilizer.type,
      });
    }
  }, [fertilizers, id]);

  return (
    <Dialog open={!!id} onOpenChange={() => setId(null)}>
      <DialogContent className="max-h-[90vh] min-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {!isCreate ? "Edit Fertilizer" : "Create New Fertilizer"}
          </DialogTitle>
          <DialogDescription>
            {!isCreate
              ? "Update the fertilizer information below."
              : "Fill in the details to create a new fertilizer."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter fertilizer name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fertilizer Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select fertilizer type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {optionFertilizerType.map((option) => (
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

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
