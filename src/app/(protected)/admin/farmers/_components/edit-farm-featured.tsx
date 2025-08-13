"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";
import { Edit, Star, StarOff } from "lucide-react";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function EditFarmIsFeatured() {
  const utils = api.useUtils();
  const [{ id, isFeatured }, setData] = useQueryStates({
    id: parseAsString.withDefault(""),
    isFeatured: parseAsBoolean,
  });

  const { mutate, isPending } = api.farm.updateFarmIsFeatured.useMutation({
    onSuccess: async () => {
      toast.success("Farm updated");
      onClose();
      await Promise.all([
        utils.farm.getFarm.invalidate(),
        utils.farm.getFarmCount.invalidate(),
      ]);
    },
    onError: () => {
      toast.error("Failed", {
        description: "Please try again.",
      });
    },
  });

  const onClose = () => {
    setData((prev) => ({ ...prev, id: "" }));
  };

  async function onSubmit() {
    isFeatured !== null &&
      mutate({
        isFeatured,
        id,
      });
  }

  return (
    <Dialog open={!!id} onOpenChange={onClose}>
      <DialogContent className="min-w-lg">
        <DialogHeader className="">
          <DialogTitle className="flex flex-row items-center gap-1">
            {isFeatured ? (
              <Star className="text-amber-500" />
            ) : (
              <StarOff className="text-red-500" />
            )}
            {isFeatured ? "Add to Featured" : "Remove from Featured"}
          </DialogTitle>
        </DialogHeader>
        {isFeatured ? (
          <div>
            Confirming will add this farm to the Featured Farms section on the
            landing page.
          </div>
        ) : (
          <div className=" font-medium px-2">
            Confirming will remove this farm from the Featured Farms section on
            the landing page.
          </div>
        )}
        <DialogFooter>
          <Button variant={"outline"} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isPending}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditFarmIsFeatured;
