"use client";
import PageLayout from "@/app/_components/page-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { UserCircle, WheatIcon } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { farmerSchema } from "@/lib/schemas/create-farmer";
import { FarmFields } from "./_components/farm-fields";
import { handleUploadSupabase } from "@/lib/upload";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

const defaultValues = {
  phoneNumber: "",
  firstName: "",
  lastName: "",
  birthday: undefined,
  addressLineOne: "",
  indigenous: false,
  farms: [
    {
      isPublished: true,
      images: [],
      barangay: undefined,
      address: undefined,
      weatherRiskIds: [],
      farmingMethodIds: [],
      farmerCount: 0,
      landArea: 0,
      coordinates: undefined,
    },
  ],
};

function CreateFarmer() {
  const utils = api.useUtils();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<z.infer<typeof farmerSchema>>({
    resolver: zodResolver(farmerSchema),
    defaultValues,
  });

  const { mutate, isPending } = api.farmer.createFarmerAndFarms.useMutation({
    onSuccess: async (data) => {
      await utils.farmer.getFarmers.invalidate();
      router.push("/admin/farmers/" + data.farmer.id);
      toast.success("Farmer Added Successfully");
    },
    onError: (error) => {
      const constraintPhone = error?.message.includes(
        "Unique constraint failed on the fields: (`phoneNumber`)",
      );
      constraintPhone &&
        form.setError("phoneNumber", { message: "Phone number already exist" });
      toast.error("Failed", {
        description: constraintPhone
          ? "Phone number already exist"
          : "Failed to add farmer. Please try again.",
      });
    },
  });
  console.log(form.formState.errors)

  async function onSubmit(values: z.infer<typeof farmerSchema>) {
    setIsUploading(true);
    const { farms, ...data } = values;

    try {
      const updatedFarmsPromises = farms.map(async (farm) => {
        const imageUrls = await Promise.all(
          farm.images.map(async (img: File) => {
            return await handleUploadSupabase(img);
          }),
        );
        return {
          ...farm,
          images: imageUrls,
        };
      });

      const updatedFarms = await Promise.all(updatedFarmsPromises).finally(
        () => {
          setIsUploading(false);
        },
      );

      const updatedValues = {
        ...data,
        farms: updatedFarms,
      };

      mutate(updatedValues);
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  }
  return (
    <PageLayout
      title="New Farmer"
      description="Fill out the farmer’s information and farm details."
      icon={"UserPlus"}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full gap-4"
        >
          <Card className="bg-background w-full gap-5 shadow-none dark:opacity-80">
            <CardHeader className="flex flex-row items-center gap-2">
              <UserCircle
                strokeWidth={2.5}
                className="text-foreground size-8"
              />
              <div>
                <CardTitle className="text-lg">Farmer Details</CardTitle>
                <CardDescription className="-mt-1.5">
                  Input farmer details.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 pb-3">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Required & Unique)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+639********* or 09*********"
                          {...field}
                          className="lg:max-w-1/3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid items-start gap-5 md:grid-cols-3 lg:grid-cols-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Juan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="middleName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Middle Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Juan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Dela Cruz" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rsbsaNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RSBSA No.</FormLabel>
                        <FormControl>
                          <Input placeholder="Input RSBSA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="addressLineOne"
                    render={({ field }) => (
                      <FormItem className="col-span-1 lg:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex : Purok 7, Hamorawon, Calbayog City, Samar"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[
                                { name: "Male", id: "MALE" },
                                { name: "Female", id: "FEMALE" },
                              ].map((bank, index) => (
                                <SelectItem
                                  key={index}
                                  value={String(bank?.id)}
                                >
                                  {bank.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="civilStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Civil Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select civil status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {[
                                { name: "Single", id: "SINGLE" },
                                { name: "Married", id: "MARRIED" },
                                { name: "Widow/er", id: "WIDOW" },
                                {
                                  name: "Legally Separated",
                                  id: "LEGALLY_SEPARATED",
                                },
                                { name: "Annuled", id: "ANNULED" },
                              ].map((bank, index) => (
                                <SelectItem
                                  key={index}
                                  value={String(bank?.id)}
                                >
                                  {bank.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="spouse"
                    render={({ field }) => (
                      <FormItem className="col-span-1 lg:col-span-2">
                        <FormLabel>Spouse (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Input spouse name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="indigenous"
                    render={({ field }) => (
                      <FormItem className="col-span-full">
                        <FormLabel>Indigenous Person</FormLabel>
                        <div className="flex flex-row gap-10 py-1">
                          <div className="flex flex-row items-center gap-3">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={() => field.onChange(true)}
                            />
                            <p>Yes</p>
                          </div>
                          <div className="flex flex-row items-center gap-3">
                            <Checkbox
                              checked={!field.value}
                              onCheckedChange={() => field.onChange(false)}
                            />
                            <p>No</p>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tribe"
                    render={({ field }) => (
                      <FormItem className="col-span-1 -mt-3 max-w-80 lg:col-span-2">
                        <FormControl>
                          <Input
                            placeholder="If yes, then input tribe"
                            className=""
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-background w-full gap-5 shadow-none dark:opacity-80">
            <CardHeader className="flex flex-row items-center gap-2">
              <WheatIcon strokeWidth={2.5} className="text-foreground size-8" />
              <div>
                <CardTitle className="text-lg">Farm Details</CardTitle>
                <CardDescription className="-mt-1.5">
                  Fill out farm details.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <FarmFields control={form.control} />
            </CardContent>
          </Card>
          <div className="flex w-full justify-end">
            <Button
              type="submit"
              size={"lg"}
              className="w-full max-w-72"
              disabled={isPending || isUploading}
            >
              Submit Farmer
            </Button>
          </div>
        </form>
      </Form>
    </PageLayout>
  );
}

export default CreateFarmer;
