"use client";
import PageLayout from "@/app/_components/page-layout";
import React from "react";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Edit,
  LoaderCircle,
  Search,
  UserPlus,
  WheatIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TablePagination from "@/app/_components/table-pagination";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import EditFarmerModal from "./_components/edit-farmer-modal";

function Farmers() {
  const router = useRouter();
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault(""),
  );
  const [_, setId] = useQueryState(
    "edit-farmer",
    parseAsString.withDefault(""),
  );

  const [pagination] = useQueryStates({
    skip: parseAsInteger.withDefault(0),
    take: parseAsInteger.withDefault(10),
  });

  const { data: farmers, isLoading: farmersIsLoading } =
    api.farmer.getFarmers.useQuery({ search, ...pagination });

  const { data: farmersCount } =
    api.farmer.getFarmersCount.useQuery({ search });

  const onCreateFarmer = () => {
    router.push("/admin/farmers/create");
  };

  const onViewFarm = (id: string) => {
    router.push("/admin/farmers/" + id);
  };

  return (
    <PageLayout
      title="FARMERS"
      description="Create and manage farmers."
      icon={"Users2"}
    >
      <div className="grid w-full gap-2">
        <EditFarmerModal/>
        <Card className="gap-0 shadow-none">
          <CardHeader>
            <CardTitle className="flex flex-row items-center gap-1">
              <Search className="size-5" strokeWidth={3} />
              Filter Farmers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex w-full flex-row justify-between gap-2">
              <div>
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="lg:min-w-96"
                  placeholder="Search farmer name or phone number"
                />
              </div>
              <Button onClick={onCreateFarmer}>
                <UserPlus />
                <p>Farmer</p>
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="gap-0 shadow-none">
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden text-center md:table-cell"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Birthdate
                  </TableHead>
                  <TableHead className="hidden xl:table-cell">
                    Address
                  </TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {farmers?.map((farmer) => {
                  return (
                    <TableRow key={farmer.id}>
                      <TableCell className="hidden w-full items-center justify-center md:flex">
                        <Avatar className="text-foreground rounded-lg border">
                          <AvatarImage
                            src={farmer.profile || undefined}
                            alt={farmer.id}
                          />
                          <AvatarFallback className="bg-card rounded-lg">
                            {farmer.firstName[0]}
                            {farmer.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        {farmer.firstName} {farmer.lastName}
                      </TableCell>
                      <TableCell>{farmer.phoneNumber}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(farmer.birthday, "PPP")}
                      </TableCell>
                      <TableCell className="hidden xl:flex">
                        {farmer.addressLineOne}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row items-center justify-center gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={"outline"}
                                size={"icon"}
                                className="text-xs"
                                onClick={() => setId(farmer.id)}
                              >
                                <Edit />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Edit Farmer</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={"outline"}
                                size={"icon"}
                                className="text-xs"
                                onClick={() => onViewFarm(farmer.id)}
                              >
                                <WheatIcon />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Show farms</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {farmersIsLoading && (
              <div className="flex w-full items-center justify-center p-5">
                <LoaderCircle className="animate-spin" />
              </div>
            )}
            {!farmersCount && !farmersIsLoading && (
              <div className="text-muted-foreground flex items-center justify-center p-5 text-sm">
                <p>No farm found</p>
              </div>
            )}
            <Separator />
            <TablePagination count={farmersCount} />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}

export default Farmers;
