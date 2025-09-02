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

function EditFarmerModal() {
  const utils = api.useUtils();
  const [id, setId] = useQueryState(
    "edit-farmer",
    parseAsString.withDefault(""),
  );

  const { data: farmer, isLoading } = api.farmer.getFarmer.useQuery({
    farmerId: id,
  }, { enabled : !!id });

  const { mutate, isPending } = api.farmer.updateFarmer.useMutation({
    onSuccess: async () => {
      toast.success("Farmer updated");
      onClose();
      await Promise.all([
        utils.farmer.getFarmers.invalidate(),
        utils.farmer.getFarmer.invalidate(),
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
          : "Failed to update farmer. Please try again.",
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
        lastName: farmer?.lastName,
        phoneNumber: farmer?.phoneNumber,
        birthday: farmer?.birthday,
        addressLineOne: farmer?.addressLineOne,
      });
    }
  }, [farmer]);

  return (
    <Dialog open={!!id} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="">
          <DialogTitle>Edit Farmer</DialogTitle>
          <DialogDescription className="-mt-2">
            Edit farmer details.
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
                        <FormLabel>Birthday</FormLabel>
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
                <div className="grid items-start gap-5">
                  <FormField
                    control={form.control}
                    name="addressLineOne"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address Line</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full justify-end">
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
