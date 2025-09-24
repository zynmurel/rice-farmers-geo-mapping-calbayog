"use client";
import PageLayout from "@/app/_components/page-layout";
import { api } from "@/trpc/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { type JSX } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cake,
  Edit,
  History,
  House,
  HousePlus,
  LoaderCircle,
  Map,
  PhoneCall,
  UserCircle,
  UserX,
  Wheat,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import EditFarmerModal from "../_components/edit-farmer-modal";
import { parseAsString, useQueryState } from "nuqs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

function Farmer({ children }: { children: JSX.Element }) {
  const { id } = useParams();
  const router = useRouter();
  const path = usePathname();
  const [_, setId] = useQueryState(
    "edit-farmer",
    parseAsString.withDefault(""),
  );

  const { data: farmer, isLoading: farmerIsLoading } =
    api.farmer.getFarmer.useQuery({ farmerId: String(id) });

  const menu = [
    {
      label: "Farm",
      icon: Wheat,
      url: `/admin/farmers/${id}`,
    },
    {
      label: "Map",
      icon: Map,
      url: `/admin/farmers/${id}/map`,
    },
    {
      label: "Crop History",
      icon: History,
      url: `/admin/farmers/${id}/crop-history`,
    },
  ];
  return (
    <PageLayout
      title="Farmer Information"
      description="Manage farmer’s information and farms."
      icon="UserCheck"
    >
      <div className="grid w-full gap-4">
        <EditFarmerModal />
        <Card className="bg-background w-full gap-5 shadow-none dark:opacity-80">
          <CardHeader className="flex w-full flex-row justify-between">
            <div className="flex flex-row items-center gap-2">
              <UserCircle
                strokeWidth={2.5}
                className="text-foreground size-8"
              />
              <div>
                <CardTitle className="text-lg">Farmer Information</CardTitle>
                <CardDescription className="-mt-1.5">
                  Manage farmer information.
                </CardDescription>
              </div>
            </div>
            <Button
              variant={"ghost"}
              className="text-primary"
              onClick={() => farmer?.id && setId(farmer.id)}
            >
              <Edit />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="grid gap-4">
            {farmerIsLoading ? (
              <div className="flex w-full items-center justify-center gap-1 p-10">
                <LoaderCircle className="size-5 animate-spin" /> Loading...
              </div>
            ) : !farmer ? (
              <div className="flex w-full items-center justify-center gap-1 p-10">
                <UserX className="size-5" /> No Farmer Found
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-3">
                  <Avatar className="text-foreground/90 size-28 rounded-lg border text-3xl">
                    <AvatarImage
                      src={farmer.profile || undefined}
                      alt={farmer.id}
                    />
                    <AvatarFallback className="bg-card rounded-lg uppercase">
                      {farmer.firstName[0]}
                      {farmer.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex w-full flex-row justify-between">
                    <div className="flex h-full w-full justify-between pb-1">
                      <div className="flex flex-col gap-0">
                        <p className="text-3xl font-semibold">
                          {farmer.firstName} {farmer.lastName}
                        </p>
                        <div className="flex flex-row items-center gap-1 text-lg font-semibold opacity-80">
                          <PhoneCall className="size-4" />
                          {`+63` + farmer.phoneNumber.slice(1)}
                        </div>
                        <div className="mt-1 flex flex-col">
                          <div className="flex flex-row items-end gap-1 text-sm opacity-60">
                            <Cake className="size-4" />{" "}
                            <p className="leading-3">Birthdate</p>
                          </div>
                          <p className="text-base font-semibold">
                            {format(farmer.birthday, "PPP")}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-2">
                      {farmer.FarmerAccount ? (
                        <Badge className="bg-primary text-sm brightness-125">
                          Account Registered
                        </Badge>
                      ) : (
                        <Badge className="text-sm" variant={"destructive"}>
                          Not Registered
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="dark:bg-background flex flex-row items-center gap-2 rounded-lg border bg-card/95 p-3 px-5">
                    <House className="text-foreground/70 size-7" />
                    <div className="flex flex-col">
                      <p className="text-foreground/70 text-xs">
                        Address Line
                      </p>
                      <p className="-mt-0.5 text-sm font-medium">
                        {farmer.addressLineOne}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <div className="flex flex-col gap-2">
          <div className="bg-foreground/5 flex w-full max-w-lg flex-none flex-row gap-1 rounded-lg p-1">
            {menu.map((m) => {
              return (
                <Button
                  key={m.label}
                  className="flex-1 border-none"
                  variant={path === m.url ? "outline" : "ghost"}
                  onClick={() => {
                    router.push(m.url);
                  }}
                >
                  <m.icon /> {m.label}
                </Button>
              );
            })}
          </div>
          {children}
        </div>
      </div>
    </PageLayout>
  );
}

export default Farmer;
