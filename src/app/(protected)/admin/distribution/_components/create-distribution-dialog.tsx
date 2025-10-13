"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/trpc/react";
import { parseAsBoolean, parseAsString, useQueryState } from "nuqs";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
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
import { useEffect } from "react";
import { toast } from "sonner";
import {
  distributionBatchSchema,
  type DistributionFormValues,
} from "@/lib/schemas/distribution";
import { cn } from "@/lib/utils";
import { formatName, years } from "@/lib/distributionUtils";
import {
  Check,
  ChevronsUpDown,
  LoaderCircle,
  MessageCircle,
  MessageSquareMore,
} from "lucide-react";
import { barangays } from "@/lib/const/barangays";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export function CreateDistributionModal() {
  const utils = api.useUtils();

  const [openCreate, setOpenCreate] = useQueryState(
    "create-distribution",
    parseAsBoolean.withDefault(false),
  );

  const form = useForm<DistributionFormValues>({
    resolver: zodResolver(distributionBatchSchema),
  });

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "Distributions",
  });

  const [barangay] = form.watch(["barangay"]);

  const { data, isLoading: farmsIsLoading } =
    api.distribution.getSearchedFarms.useQuery(
      {
        barangay,
      },
      { enabled: !!barangay },
    );

  const { mutate, isPending } = api.distribution.createDistribution.useMutation(
    {
      onSuccess: async (data) => {
        toast.success(`Distribution information created`);
        form.reset({
          barangay: undefined,
          season: undefined,
          year: undefined,
          Distributions: [],
          who: undefined,
          what: undefined,
          when: undefined,
          where: undefined,
          why: undefined,
        });
        setOpenCreate(false);
        const { phoneNumbers, distributionBatch } = data;

        const message = `Good day! 🌾
This is a message from GEO AGRI.

WHO: ${distributionBatch.who}
WHAT: ${distributionBatch.what}
WHEN: ${distributionBatch.when}
WHERE: ${distributionBatch.where}
WHY: ${distributionBatch.why}

Thank you for your continued cooperation with GEO AGRI.`;
        console.log(distributionBatch);
        await sendSms({ message, recipients: phoneNumbers });
        await Promise.all([
          utils.distribution.getDistributions.invalidate(),
          utils.distribution.getDistributionsCount.invalidate(),
        ]);
      },
      onError: (e) => {
        let message = "Failed to create distribution. Please try again.";
        if (!e?.message.includes("Unique Constraint")) {
          message = "Error submitting distribution";
        } else {
          const farmer = data?.find(
            (f) => f.id === e.message.replace("Unique Constraint ", ""),
          );
          if (farmer) {
            message = `Distribution for ${formatName(farmer.Farmer)} in ${form.getValues("year")} ${form.getValues("season") === "DRY" ? "Dry season" : "Wet season"} was already made`;
          } else {
            message = "Failed to create distribution. Please try again.";
          }
        }
        toast.error("Failed", {
          description: message,
        });
      },
    },
  );

  const onSubmit = (data: DistributionFormValues) => {
    mutate(data);
  };

  const onCancel = () => {
    form.reset({});
    setOpenCreate(false);
  };

  const sendSms = async ({
    message,
    recipients,
  }: {
    message: string;
    recipients: string[];
  }) => {
    const res = await fetch("/api/send-sms-textbee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipients,
        message,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  useEffect(() => {
    if (data && barangay) {
      form.setValue("Distributions", []);
      data.map((d) => {
        append({
          farmId: d.id,
          estimatedCropKg: d.landArea * 40,
          checked: true,
          farmer: formatName(d.Farmer),
          phonenumber: d.Farmer.phoneNumber,
          landArea: d.landArea,
        });
        return d;
      });
    }
  }, [data, barangay]);

  return (
    <Dialog open={openCreate} onOpenChange={() => setOpenCreate(false)}>
      <DialogContent className="bg-card min-w-4xl">
        <DialogHeader className="gap-y-1">
          <DialogTitle>New Distribution</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new distribution.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
            <div className="grid max-h-[70vh] gap-2 overflow-y-auto">
              <div className="space-y-6 p-1">
                <div className="flex flex-row items-start gap-3">
                  <FormField
                    control={form.control}
                    name={`barangay`}
                    render={({ field }) => (
                      <FormItem className="w-full">
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
                                <CommandEmpty>No barangay found.</CommandEmpty>
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
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Year</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-96">
                            {[...years].reverse().map((year) => (
                              <SelectItem key={year} value={String(year)}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="season"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Season</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select season" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-96">
                            {["WET", "DRY"].reverse().map((season) => (
                              <SelectItem key={season} value={String(season)}>
                                {season === "WET" ? "Wet Season" : "Dry Season"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="rounded-lg border">
                <Table>
                  <TableHeader className="bg-slate-100">
                    <TableRow>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Farmer</TableHead>
                      <TableHead>Contact #</TableHead>
                      <TableHead>Land Area</TableHead>
                      <TableHead>Estimated Crop</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields?.map((dis, index) => {
                      return (
                        <TableRow key={dis.farmId}>
                          <TableCell className="w-10 pl-3">
                            <FormField
                              control={form.control}
                              name={`Distributions.${index}.checked`}
                              render={({ field }) => (
                                <FormItem>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={(e) => field.onChange(e)}
                                  />
                                </FormItem>
                              )}
                            />
                          </TableCell>
                          <TableCell className="capitalize">
                            {dis.farmer}
                          </TableCell>
                          <TableCell className="capitalize">
                            {dis.phonenumber}
                          </TableCell>
                          <TableCell className="font-semibold">
                            {dis.landArea} ha
                          </TableCell>
                          <TableCell className="text-primary font-semibold">
                            {dis.estimatedCropKg} kg
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                {farmsIsLoading && (
                  <div className="flex w-full items-center justify-center p-5">
                    <LoaderCircle className="animate-spin" />
                  </div>
                )}
                {!fields?.length && !farmsIsLoading && (
                  <div className="text-muted-foreground flex items-center justify-center p-5 text-sm">
                    <p>No farmer found</p>
                  </div>
                )}
              </div>
              <Separator className="my-2" />
              <div>
                <div className="flex flex-row items-center gap-1">
                  <MessageSquareMore className="size-4" strokeWidth={3} />
                  <p className="text-sm font-semibold">SMS Details</p>
                </div>
                <div className="grid gap-4 py-2">
                  <FormField
                    control={form.control}
                    name={"who"}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Who</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Who is involved (e.g., Farmers)"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"what"}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>What</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What is happening (e.g., Seed Distribution)"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"when"}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>When</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="When it will happen (e.g., Sept 30, 9 AM)"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"where"}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Where</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Where it will happen (e.g., Barangay Hall)"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"why"}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Why</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Why it matters (e.g., For planting season)"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-1 pt-4">
              <div className="flex items-end justify-between space-x-2">
                <p className="text-primary text-end text-sm">
                  Submitting this distribution will also automatically send an
                  SMS to the farmers included in this form.
                </p>
                <div className="flex flex-row items-center gap-2">
                  <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending || !data?.length}>
                    {isPending ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
