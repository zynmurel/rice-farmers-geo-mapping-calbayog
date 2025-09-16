"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, LoaderCircle, Plus, WheatIcon } from "lucide-react";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import React from "react";
import { UpsertCrop } from "./create-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import TablePagination from "@/app/_components/table-pagination";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";

function Crops() {
  const [_, setId] = useQueryState("upsert-crop", parseAsString);
  const [pagination] = useQueryStates(
    {
      skip: parseAsInteger.withDefault(0),
      take: parseAsInteger.withDefault(10),
    },
    {
      history: "push",
    },
  );
  const [search, setSearch] = useQueryState(
    "crop-search",
    parseAsString.withDefault(""),
  );

  const { data: crops, isLoading: cropsIsLoading } = api.crop.getCrops.useQuery(
    {
      search,
      ...pagination,
    },
  );

  const { data: cropCount } =
    api.crop.getCropsCount.useQuery({
      search,
      ...pagination,
    });

  return (
    <Card>
      <UpsertCrop crops={crops} />
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Crops</CardTitle>
          <CardDescription>Create and update crops</CardDescription>
        </div>
        <Button onClick={() => setId("create")}>
          <Plus /> Add
        </Button>
      </CardHeader>
      <div className="mx-5">
        <div className="flex pb-2">
          <Input value={search} onChange={(e) => setSearch(e.target.value)} className=" max-w-96" placeholder="Search crop title" />
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead className="pl-5">Crop</TableHead>
                <TableHead>Variety</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Classification</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crops?.map((crop) => {
                return (
                  <TableRow key={crop.id}>
                    <TableCell className="pl-5">{crop.title}</TableCell>
                    <TableCell>{crop.variety}</TableCell>
                    <TableCell>{crop.source}</TableCell>
                    <TableCell>{format(crop.releaseAt, "yyyy")}</TableCell>
                    <TableCell>{crop.seed_classification}</TableCell>
                    <TableCell>
                      <div className="flex flex-row items-center justify-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={"outline"}
                              size={"icon"}
                              className="text-xs"
                              onClick={() => setId(crop.id)}
                            >
                              <Edit />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit crop</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {cropsIsLoading && (
            <div className="flex w-full items-center justify-center p-5">
              <LoaderCircle className="animate-spin" />
            </div>
          )}
          {!cropCount && !cropsIsLoading && (
            <div className="text-muted-foreground flex items-center justify-center p-5 text-sm">
              <p>No crops found</p>
            </div>
          )}
          <Separator />
          <div className="pb-2">
            <TablePagination count={cropCount} />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Crops;
