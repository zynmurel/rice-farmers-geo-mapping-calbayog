"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { parseAsString, useQueryState } from "nuqs";
import { Edit, LoaderCircle, UserX } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "next/navigation";
import { ImageUploadField } from "../create/_components/image-upload";
import { handleUploadSupabase } from "@/lib/upload";

const addFarmImageSchema = z.object({
  farmId: z.string(),
  images: z.array(z.instanceof(File)),
});
function AddImageFarmModal() {
  const utils = api.useUtils();
  const [id, setId] = useQueryState(
    "add-image-farm",
    parseAsString.withDefault(""),
  );
  const [loading, setIsLoading] = useState(false);

  const { id: farmerId } = useParams();

  const { data: farmer, isLoading: farmerIsLoading } =
    api.farmer.getFarmer.useQuery({ farmerId: String(farmerId) });

  const { data: farm, isLoading } = api.farmer.getFarmerFarm.useQuery(
    {
      farmId: id,
    },
    { enabled: !!id },
  );

  const { mutate, isPending } = api.farmer.addFarmImage.useMutation({
    onSuccess: async () => {
      toast.success("Image uploaded");
      onClose();
      await Promise.all([
        utils.farmer.getFarmerFarms.invalidate(),
      ]);
    },
    onError: () => {
      toast.error("Failed", {
        description: "Failed to update farm. Please try again.",
      });
    },
  });

  const form = useForm<z.infer<typeof addFarmImageSchema>>({
    resolver: zodResolver(addFarmImageSchema),
    defaultValues: {
      images: [],
      farmId: id,
    },
  });

  const { control } = form;

  const onClose = () => {
    setId("");
  };

  async function onSubmit(values: z.infer<typeof addFarmImageSchema>) {
    setIsLoading(true);
    const imageUrls = await Promise.all(
      values.images.map(async (img: File) => {
        return await handleUploadSupabase(img);
      }),
    ).finally(() => setIsLoading(false));
    mutate({
      images: imageUrls,
      farmId: id,
    });
  }

  useEffect(() => {
    id.length && form.reset({ images: [], farmId: id });
  }, [id]);

  return (
    <Dialog open={!!id} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl">
        <DialogHeader className="">
          <DialogTitle className="flex flex-row items-center gap-1">
            <Edit className="size-5" />
            Farm Image
          </DialogTitle>
          <DialogDescription className="-mt-2">
            Add farm images.
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
                          src={farmer?.profile || undefined}
                          alt={farmer?.id}
                        />
                        <AvatarFallback className="bg-card rounded-lg">
                          {farmer?.firstName[0]}
                          {farmer?.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-foreground/50 text-xs">Owner</p>
                        <p className="text-xl font-semibold">
                          {farmer?.firstName} {farmer?.lastName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground/50 text-xs">Farm</p>
                  <p className="text-xl font-bold">
                    Barangay {farm.barangay}
                  </p>{" "}
                  <p className="text-sm">{farm.address}</p>
                </div>

                <ImageUploadField control={control} name={`images`} />
              </div>
            )}
            <Button disabled={isPending || loading}>Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddImageFarmModal;
