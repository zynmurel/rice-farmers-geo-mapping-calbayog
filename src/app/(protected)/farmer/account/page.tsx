"use client";

import { useQueryState, parseAsString } from "nuqs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { LoaderCircle, UserX } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  User,
  Phone,
  Calendar,
  MapPin,
  Venus,
  Heart,
  Users,
  Badge,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import EditFarmerModal from "./_components/edit-farmer-modal";
// import EditFarmerModal from "./EditFarmerModal";

export default function FarmerDetails() {
  const { data } = useSession();
  const [, setId] = useQueryState("edit-farmer", parseAsString.withDefault(""));

  const { data: farmer, isLoading } = api.farmer.getFarmerByAccountId.useQuery(
    { farmerId: data?.user.id || "" },
    { enabled: !!data?.user.id },
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <LoaderCircle className="size-6 animate-spin" />
        <span className="ml-2">Loading farmer...</span>
      </div>
    );
  }

  if (!farmer) {
    return (
      <div className="text-muted-foreground flex items-center justify-center p-6">
        <UserX className="size-6" />
        <span className="ml-2">No farmer found</span>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-5 md:max-w-2xl md:px-0">
        <EditFarmerModal/>
      {/* Desktop: Card view */}
      <Card className="hidden overflow-hidden rounded-xl border shadow-sm md:block m-10">
        <CardHeader className="bg-muted/40 flex flex-row items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold tracking-tight">
                {farmer.firstName} {farmer.middleName || ""} {farmer.lastName}
              </CardTitle>
              <p className="text-muted-foreground text-xs">
                Farmer Information
              </p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => setId(farmer.id)}>
            Edit
          </Button>
        </CardHeader>
        <CardContent className="divide-muted divide-y px-6">
          <div className="py-3">
            <InfoRow
              icon={Badge}
              label="RSBSA No"
              value={farmer.rsbsaNo || "-"}
            />
          </div>
          <div className="py-3">
            <InfoRow icon={Phone} label="Phone" value={farmer.phoneNumber} />
          </div>
          <div className="py-3">
            <InfoRow
              icon={Calendar}
              label="Birthday"
              value={
                farmer.birthday
                  ? new Date(farmer.birthday).toLocaleDateString()
                  : "-"
              }
            />
          </div>
          <div className="py-3">
            <InfoRow
              icon={MapPin}
              label="Address"
              value={farmer.addressLineOne}
            />
          </div>
          <div className="py-3">
            <InfoRow icon={Venus} label="Gender" value={farmer.gender} />
          </div>
          <div className="py-3">
            <InfoRow
              icon={Heart}
              label="Civil Status"
              value={farmer.civilStatus}
            />
          </div>
          {farmer.spouse && (
            <div className="py-3">
              <InfoRow icon={Users} label="Spouse" value={farmer.spouse} />
            </div>
          )}
          <div className="py-3">
            <InfoRow
              icon={Users}
              label="Indigenous"
              value={farmer.indigenous ? "Yes" : "No"}
            />
          </div>
          {farmer.tribe && (
            <div className="py-3">
              <InfoRow icon={Users} label="Tribe" value={farmer.tribe} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Mobile: Simple list view */}
      <div className="mt-4 space-y-2 md:hidden">
        <div className="bg-muted/40 flex items-center justify-between rounded-lg p-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-sm font-semibold">
                {farmer.firstName} {farmer.middleName || ""} {farmer.lastName}
              </h2>
              <p className="text-muted-foreground text-xs">Farmer Info</p>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={() => setId(farmer.id)}>
            Edit
          </Button>
        </div>
        <div className="divide-muted bg-card divide-y rounded-lg border p-2 px-4">
          <InfoRow
            icon={Badge}
            label="RSBSA No"
            value={farmer.rsbsaNo || "-"}
          />
          <InfoRow icon={Phone} label="Phone" value={farmer.phoneNumber} />
          <InfoRow
            icon={Calendar}
            label="Birthday"
            value={
              farmer.birthday
                ? new Date(farmer.birthday).toLocaleDateString()
                : "-"
            }
          />
          <InfoRow
            icon={MapPin}
            label="Address"
            value={farmer.addressLineOne}
          />
          <InfoRow icon={Venus} label="Gender" value={farmer.gender} />
          <InfoRow
            icon={Heart}
            label="Civil Status"
            value={farmer.civilStatus}
          />
          {farmer.spouse && (
            <InfoRow icon={Users} label="Spouse" value={farmer.spouse} />
          )}
          <InfoRow
            icon={Users}
            label="Indigenous"
            value={farmer.indigenous ? "Yes" : "No"}
          />
          {farmer.tribe && (
            <InfoRow icon={Users} label="Tribe" value={farmer.tribe} />
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 py-2 text-xs">
      <Icon className="text-muted-foreground h-4 w-4" />
      <p className="text-xs">
        <span className="font-medium">{label}:</span> {value}
      </p>
    </div>
  );
}
