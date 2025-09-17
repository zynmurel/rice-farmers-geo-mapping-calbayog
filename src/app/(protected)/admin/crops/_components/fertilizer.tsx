"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Edit, LoaderCircle, Plus } from "lucide-react";
import {
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from "nuqs";
import React from "react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { UpsertFertilizer } from "./create-fertilizer-dialog";
import { fertilizerTypes, fertilizerTypes2 } from "@/lib/fertilizerUtils";
import { Badge } from "@/components/ui/badge";

function Fertilizer() {
  const [_, setId] = useQueryState("upsert-fertilizer", parseAsString);
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
    "fertilizer-search",
    parseAsString.withDefault(""),
  );

  const { data: fertilizers, isLoading: fertilizersIsLoading } =
    api.fertilizer.getFertilizer.useQuery({
      search,
      ...pagination,
    });

  const { data: fertilizersCount } = api.fertilizer.getFertilizerCount.useQuery(
    {
      search,
      ...pagination,
    },
  );

  return (
    <Card>
      <UpsertFertilizer fertilizers={fertilizers} />
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Fertilizer</CardTitle>
          <CardDescription>Create and update fertilizer</CardDescription>
        </div>
        <Button onClick={() => setId("create")}>
          <Plus /> Add
        </Button>
      </CardHeader>
      <div className="mx-5">
        <div className="flex pb-2">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-96"
            placeholder="Search fertilizer name"
          />
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader className="bg-slate-100">
              <TableRow>
                <TableHead className="pl-5">Fertilizer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fertilizers?.map((fertilizer) => {
                return (
                  <TableRow key={fertilizer.id}>
                    <TableCell className="pl-5">{fertilizer.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-row gap-1">
                        <Badge>
                          {
                            fertilizerTypes[
                              fertilizer.type as keyof typeof fertilizerTypes
                            ]
                          }
                        </Badge>
                        <Badge className="bg-sidebar-accent">
                          {
                            fertilizerTypes2[
                              fertilizer.type2 as keyof typeof fertilizerTypes2
                            ]
                          }
                        </Badge>
                        <Badge variant={"outline"} className=" capitalize">{fertilizer.type3.toLowerCase().replace(/_/g, " ")}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-row items-center justify-center gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={"outline"}
                              size={"icon"}
                              className="text-xs"
                              onClick={() => setId(fertilizer.id)}
                            >
                              <Edit />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit fertilizer</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {fertilizersIsLoading && (
            <div className="flex w-full items-center justify-center p-5">
              <LoaderCircle className="animate-spin" />
            </div>
          )}
          {!fertilizersCount && !fertilizersIsLoading && (
            <div className="text-muted-foreground flex items-center justify-center p-5 text-sm">
              <p>No fertilizer found</p>
            </div>
          )}
          <Separator />
          <div className="pb-2">
            <TablePagination count={fertilizersCount} />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Fertilizer;
