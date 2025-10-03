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
import { LoaderCircle, UserX } from "lucide-react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateFarmerSchema } from "@/lib/schemas/create-farmer";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Checkbox } from "@/components/ui/checkbox";

function EditFarmerModal() {
  const utils = api.useUtils();
  const [id, setId] = useQueryState(
    "edit-farmer",
    parseAsString.withDefault(""),
  );

  const { data: farmer, isLoading } = api.farmer.getFarmer.useQuery(
    {
      farmerId: id,
    },
    { enabled: !!id },
  );

  const { mutate, isPending } = api.farmer.updateFarmer.useMutation({
    onSuccess: async () => {
      toast.success("Account updated");
      onClose();
      await Promise.all([
        utils.farmer.getFarmerByAccountId.invalidate(),
      ]);
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
          : "Failed to update account. Please try again.",
      });
    },
  });

  const form = useForm<z.infer<typeof updateFarmerSchema>>({
    resolver: zodResolver(updateFarmerSchema),
    defaultValues: {
      id: id,
      firstName: farmer?.firstName,
      lastName: farmer?.lastName,
      phoneNumber: farmer?.phoneNumber,
      birthday: farmer?.birthday,
      addressLineOne: farmer?.addressLineOne,
    },
  });

  const onClose = () => {
    setId("");
  };

  async function onSubmit(values: z.infer<typeof updateFarmerSchema>) {
    mutate({
      ...values,
      id,
    });
  }

  useEffect(() => {
    if (farmer) {
      form.reset({
        id: id,
        firstName: farmer?.firstName,
        middleName: farmer?.middleName || undefined,
        lastName: farmer?.lastName,
        phoneNumber: farmer?.phoneNumber,
        birthday: farmer?.birthday,
        addressLineOne: farmer?.addressLineOne,
        rsbsaNo: farmer?.rsbsaNo,
        gender: farmer?.gender,
        civilStatus: farmer?.civilStatus,
        spouse: farmer?.spouse || undefined,
        indigenous: farmer?.indigenous || false,
        tribe: farmer?.tribe || undefined,
      });
    }
  }, [farmer]);

  return (
    <Dialog open={!!id} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md px-4 sm:max-w-xl sm:px-6 md:max-w-2xl lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Account Details</DialogTitle>
          <DialogDescription className="-mt-2">
            Edit account details.
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
            ) : !farmer ? (
              <div className="flex w-full flex-row items-center justify-center gap-2 p-10">
                <p>
                  <UserX className="size-7" />
                  No farmer found
                </p>
              </div>
            ) : (
              <div className="grid gap-5 pb-3">
                <div className="max-h-[60vh] overflow-y-auto md:max-h-none">
                  <div className="grid items-start gap-5 md:grid-cols-2">
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
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+639********* or 09*********"
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
                  </div>
                  <div className="grid items-start gap-5 md:grid-cols-2 mt-5">
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
                <div className="flex w-full justify-end gap-1">
                  <Button type="button" variant={"outline"} onClick={onClose}>Cancel</Button>
                  <Button disabled={isPending}>Submit</Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditFarmerModal;
