"use client";
import PageLayout from "@/app/_components/page-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { years } from "@/lib/distributionUtils";
import {
  parseAsBoolean,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from "nuqs";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { CreateDistributionModal } from "./_components/create-distribution-dialog";
import DistributionTable from "./_components/distribution-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { barangays } from "@/lib/const/barangays";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Page() {
  const [activeTab, setActiveTab] = useQueryState(
    "activeTab",
    parseAsStringEnum(["distribution", "crop-planting"]).withDefault(
      "distribution",
    ),
  );
  const [activeYear, setActiveYear] = useQueryState(
    "distribution-year",
    parseAsString,
  );
  const [activeSeason, setActiveSeason] = useQueryState(
    "distribution-season",
    parseAsString,
  );
  const [activeBarangay, setActiveBarangay] = useQueryState(
    "distribution-barangay",
    parseAsString,
  );
  const [_, setOpenCreate] = useQueryState(
    "create-distribution",
    parseAsBoolean.withDefault(false),
  );
  return (
    <PageLayout
      title="DISTRIBUTION & CROP PLANTING"
      description="Manage crops and fertilizer distribution to farms."
      icon={"Handshake"}
    >
      <div className="grid w-full gap-2">
        <CreateDistributionModal />
        {/* <ViewDistributionModal /> */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>
              Filter distribution record by barangay (farm location), season and
              year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row justify-between gap-5">
              <div className="flex flex-row gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "min-w-60 justify-between",
                        !activeBarangay && "text-muted-foreground",
                      )}
                    >
                      <p className="flex-1 truncate text-start">
                        {activeBarangay || "Filter by barangay (Farm location)"}
                      </p>
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="min-w-60 p-0">
                    <Command
                      filter={(value, search) => {
                        if (!search) return 1;
                        return barangays
                          ?.find((c) => c === value)
                          ?.toLowerCase()
                          ?.includes(search.toLowerCase())
                          ? 1
                          : 0;
                      }}
                    >
                      <CommandInput
                        placeholder="Search barangay"
                        className="h-9"
                      />
                      {
                        <CommandList className="max-h-[500px] overflow-y-auto">
                          <CommandEmpty>No barangay found.</CommandEmpty>
                          <CommandGroup>
                            {barangays.map((barangay) => (
                              <CommandItem
                                value={barangay}
                                key={barangay}
                                onSelect={() => setActiveBarangay(barangay)}
                              >
                                <div className="flex flex-col">
                                  <p>{barangay}</p>
                                </div>
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    barangay === activeBarangay
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      }
                    </Command>
                  </PopoverContent>
                </Popover>
                <Select
                  onValueChange={setActiveYear}
                  value={activeYear || undefined}
                >
                  <SelectTrigger className="min-w-60">
                    <SelectValue placeholder="Filter year">
                      {activeYear || (
                        <span className="text-foreground/70">Select year</span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-96">
                    <SelectGroup>
                      <SelectLabel>Distribution year</SelectLabel>
                      {[...years].reverse().map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={setActiveSeason}
                  value={activeSeason || undefined}
                >
                  <SelectTrigger className="min-w-60">
                    <SelectValue placeholder="Filter season">
                      {activeSeason ? (
                        <span>
                          {activeSeason === "WET" ? "Wet Season" : "Dry Season"}
                        </span>
                      ) : (
                        <span className="text-foreground/70">
                          Filter season
                        </span>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="max-h-96">
                    <SelectGroup>
                      <SelectLabel>Distribution season</SelectLabel>
                      {["WET", "DRY"].reverse().map((season) => (
                        <SelectItem key={season} value={season}>
                          {season === "WET" ? "Wet Season" : "Dry Season"}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {(activeYear || activeSeason || activeBarangay) && (
                  <div
                    onClick={() => {
                      setActiveSeason(null);
                      setActiveYear(null);
                      setActiveBarangay(null);
                    }}
                    className="text-sidebar-accent mt-auto flex cursor-pointer flex-row items-center gap-1 rounded px-1 hover:bg-slate-50"
                  >
                    <X className="size-3.5" />
                    <p className="mt-auto text-xs">Clear filter</p>
                  </div>
                )}
              </div>
              <div>
                <Button onClick={() => setOpenCreate(true)}>
                  <Plus /> New Distribution
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="px-5 py-5">
          <Tabs value={activeTab} onValueChange={(e) => setActiveTab(e as any)}>
            <TabsList className="w-[400px] cursor-pointer ">
              <TabsTrigger className="cursor-pointer" value="crop-planting">
                Distribution
              </TabsTrigger>
              <TabsTrigger className="cursor-pointer" value="distribution">
                Planting History
              </TabsTrigger>
            </TabsList>
            <TabsContent value="crop-planting">
              <DistributionTable />
            </TabsContent>
            <TabsContent value="distribution"></TabsContent>
          </Tabs>
        </Card>
      </div>
    </PageLayout>
  );
}

export default Page;
