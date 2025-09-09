"use client";
import PageLayout from "@/app/_components/page-layout";
import React from "react";
import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringEnum,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Check,
  ChevronsUpDown,
  CloudSunRain,
  Edit,
  Ellipsis,
  Eye,
  LoaderCircle,
  Search,
  Sprout,
  Star,
  StarOff,
  User,
  Wheat,
  X,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import TablePagination from "@/app/_components/table-pagination";
import { barangays } from "@/lib/const/barangays";
import { cn, optionLandCategory, optionWeatherRisks } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import EditFarmModal from "../farmers/_components/edit-farm-modal";
import EditFarmIsFeatured from "../farmers/_components/edit-farm-featured";

function Farmers() {
  const [open, setOpen] = React.useState(false);

  const [_f, setOpenEditFeatured] = useQueryStates({
    id: parseAsString.withDefault(""),
    isFeatured: parseAsBoolean,
  });

  const [barangay, setBarangay] = useQueryState(
    "barangay",
    parseAsString.withDefault("All"),
  );

  const [farmStatus, setFarmStatus] = useQueryState(
    "farmStatus",
    parseAsStringEnum(["All", "Featured", "Published"]).withDefault("All"),
  );

  const [farmingMethodIds, setFarmingMethodIds] = useQueryState(
    "farmingMethodIds",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [weatherRiskIds, setWeatherRiskIds] = useQueryState(
    "weatherRiskIds",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [_, setId] = useQueryState("edit-farm", parseAsString.withDefault(""));

  const [pagination] = useQueryStates({
    skip: parseAsInteger.withDefault(0),
    take: parseAsInteger.withDefault(10),
  });

  const { data: farms, isLoading: farmsIsLoading } = api.farm.getFarm.useQuery({
    barangay,
    farmStatus,
    farmingMethodIds,
    weatherRiskIds,
    ...pagination,
  });

  const { data: farmCount } = api.farm.getFarmCount.useQuery({
    barangay,
    farmStatus,
    farmingMethodIds,
    weatherRiskIds,
  });

  const onEditFarm = (id: string) => {
    setId(id);
  };

  const toggleFarmingMethods = (id: string) => {
    setFarmingMethodIds((prev) => {
      return prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
    });
  };

  const toggleWeatherRisks = (id: string) => {
    setWeatherRiskIds((prev) => {
      return prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
    });
  };

  return (
    <PageLayout title="FARMS" description="Search farms" icon={"House"}>
      <div className="grid w-full gap-2">
        <Card className="gap-0 shadow-none">
          <EditFarmIsFeatured />
          <EditFarmModal />
          <CardContent>
            <div className="flex w-full flex-row items-end justify-between">
              <div className="flex h-full flex-col justify-between">
                <div className="flex flex-row items-center gap-1 font-semibold">
                  <Search className="size-5" strokeWidth={3} />
                  Filter Farms
                </div>
                <div className="flex w-full flex-row gap-2">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[320px] justify-between"
                      >
                        {barangay !== "All"
                          ? barangays?.find(
                              (farmingMethod) => farmingMethod === barangay,
                            )
                          : "Search Barangay"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search barangay"
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No barangay found.</CommandEmpty>
                          <CommandGroup>
                            {barangays.map((brgy) => (
                              <CommandItem
                                key={brgy}
                                value={brgy}
                                onSelect={(currentValue) => {
                                  setBarangay(
                                    currentValue === barangay
                                      ? "All"
                                      : currentValue,
                                  );
                                }}
                              >
                                {brgy}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    barangay === brgy
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        Land Category
                        <ChevronsUpDown />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <h4 className="mb-2 text-sm font-medium">
                        Filter by Farming Method
                      </h4>
                      <div className="flex max-h-60 flex-col gap-2 overflow-auto">
                        {optionLandCategory.map((stat) => (
                          <label
                            key={stat.value}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              checked={farmingMethodIds?.includes(stat.value)}
                              onCheckedChange={() =>
                                toggleFarmingMethods(stat.value)
                              }
                            />
                            <span className="text-sm">{stat.label}</span>
                          </label>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline">
                        Weather Risks
                        <ChevronsUpDown />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <h4 className="mb-2 text-sm font-medium">
                        Filter by Weather Risk
                      </h4>
                      <div className="flex max-h-60 flex-col gap-2 overflow-auto">
                        {optionWeatherRisks?.map((stat) => (
                          <label
                            key={stat.value}
                            className="flex items-center gap-2"
                          >
                            <Checkbox
                              checked={weatherRiskIds?.includes(stat.value)}
                              onCheckedChange={() =>
                                toggleWeatherRisks(stat.value)
                              }
                            />
                            <span className="text-sm">{stat.label}</span>
                          </label>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {["All", "Featured", "Published"].map((data) => {
                  return (
                    <div
                      key={data}
                      className="flex flex-row items-center gap-2"
                    >
                      <p className="text-sm font-medium text-nowrap">{data}</p>
                      <Checkbox
                        checked={farmStatus === data}
                        onCheckedChange={() =>
                          setFarmStatus(
                            data as "All" | "Featured" | "Published",
                          )
                        }
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <DisplayFilter />
          </CardContent>
        </Card>
        <Card className="gap-0 shadow-none">
          <CardContent>
            <div className="grid gap-1">
              <div className="flex flex-row items-end justify-between">
                <div className="flex flex-row items-center gap-1">
                  <Wheat className="size-5" />{" "}
                  <p className="font-semibold">Farms</p>
                </div>
                <p className="text-foreground/50 px-2 text-xs font-medium">
                  {farmCount || 0} Farm/s
                </p>
              </div>
              {!farmsIsLoading &&
                farms?.map((farm) => {
                  return (
                    <div
                      key={farm.id}
                      className="flex min-h-40 flex-row justify-between rounded-lg border p-5 xl:gap-10"
                    >
                      <div className="flex flex-1 flex-row gap-5 xl:gap-10">
                        <div className="flex h-full flex-1 flex-col justify-between">
                          <div>
                            <div className="flex flex-row items-center gap-1">
                              <p className="text-xl font-bold">
                                Barangay {farm.barangay}
                              </p>
                              <Badge
                                variant={
                                  farm.isPublished ? "default" : "destructive"
                                }
                              >
                                {farm.isPublished ? "Published" : "Unpublished"}
                              </Badge>
                              {farm.isPublished && farm.isFeatured && (
                                <Badge className="bg-amber-500">Featured</Badge>
                              )}
                            </div>
                            <p className="text-sm">{farm.address}</p>
                            <div className="mt-1 flex flex-row flex-wrap items-center gap-x-5 gap-y-2">
                              <p className="border-chart-1 border-l-8 pl-1 text-xs font-semibold uppercase">
                                {farm.landArea} Hectare/s
                              </p>
                              <p className="border-chart-2 border-l-8 pl-1 text-xs font-semibold uppercase">
                                {farm.farmerCount} Farmer/s
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-foreground/70 text-xs uppercase">
                              Owner
                            </p>
                            <div className="text-foreground/80 mt-auto flex flex-row items-center gap-1 font-medium">
                              <User className="size-4" />
                              <p className="text-sm">
                                {farm.Farmer.firstName} {farm.Farmer.lastName}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex h-full min-w-48 flex-col">
                          <div className="flex flex-row items-center gap-1">
                            <Sprout className="size-4" strokeWidth={3} />
                            <p className="text-sm font-bold">Land Category</p>
                          </div>
                          {farm.land_category.length ? (
                            <div className="grid gap-1 py-2">
                              {farm.land_category?.map((lc) => {
                                const label = optionLandCategory.find(
                                  (l) => l.value === lc,
                                )?.label;
                                return (
                                  <Badge
                                    key={lc}
                                    className="bg-chart-1 px-3! pb-0.5 text-sm"
                                  >
                                    {label}
                                  </Badge>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-foreground/70 bg-foreground/5 my-2 flex h-full items-center justify-center rounded-lg text-sm">
                              No Farming Method
                            </div>
                          )}
                        </div>

                        <div className="flex h-full min-w-48 flex-col">
                          <div className="flex flex-row items-center gap-1">
                            <CloudSunRain className="size-4" strokeWidth={3} />
                            <p className="text-sm font-bold">WEATHER RISKS</p>
                          </div>
                          {farm.weather_risks.length ? (
                            <div className="grid gap-1 py-2">
                              {farm.weather_risks?.map((wr) => {
                                const label = optionWeatherRisks.find(
                                  (w) => w.value === wr,
                                )?.label;
                                return (
                                  <Badge
                                    key={wr}
                                    className="bg-chart-2 px-3! pb-0.5 text-sm"
                                  >
                                    {label}
                                  </Badge>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="text-foreground/70 bg-foreground/5 my-2 flex h-full items-center justify-center rounded-lg text-sm">
                              No weather risks
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <div className="flex flex-col items-end gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size={"icon"}
                                className="h-3"
                                variant={"ghost"}
                              >
                                <Ellipsis className="size-6" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              className="min-w-36"
                              align="end"
                            >
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuGroup>
                                <DropdownMenuItem>
                                  <Eye />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => onEditFarm(farm.id)}
                                >
                                  <Edit />
                                  Update
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  disabled={!farm.isPublished}
                                  className="pr-4"
                                  onClick={() =>
                                    setOpenEditFeatured(() => ({
                                      id: farm.id,
                                      isFeatured: !farm.isFeatured,
                                    }))
                                  }
                                >
                                  {!farm.isFeatured ? (
                                    <Star className="text-amber-500" />
                                  ) : (
                                    <StarOff className="text-red-500" />
                                  )}
                                  {!farm.isFeatured
                                    ? "Add to Featured"
                                    : "Remove from Featured"}
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-foreground/70 text-xs">
                          Date added : {format(farm.createdAt, "PPP")}
                        </p>
                      </div>
                    </div>
                  );
                })}

              {farmsIsLoading && (
                <div className="text-muted-foreground bg-foreground/5 mt-1 flex flex-col items-center justify-center rounded-2xl p-10 text-sm">
                  <LoaderCircle className="animate-spin" />
                </div>
              )}
              {!farmCount && !farmsIsLoading && (
                <div className="text-muted-foreground bg-foreground/5 mt-1 flex flex-col items-center justify-center rounded-2xl p-10 text-sm">
                  <p className="text-base font-semibold">No farm found</p>
                  <p>Adjust filter to show more farms</p>
                </div>
              )}
            </div>
            {/* <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Farm</TableHead>
                  <TableHead>Land Area</TableHead>
                  <TableHead>Farmer/s</TableHead>
                  <TableHead>Farming Methods</TableHead>
                  <TableHead>Weather Risks</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {farms?.map((farm) => {
                  return (
                    <TableRow key={farm.id} className=" border rounded-2xl grid w-full">
                      <TableCell>
                        <p>{farm.barangay}</p>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table> */}
            <TablePagination count={farmCount} />
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
const DisplayFilter = () => {
  const [barangay, setBarangay] = useQueryState(
    "barangay",
    parseAsString.withDefault("All"),
  );

  const [farmStatus, setFarmStatus] = useQueryState(
    "farmStatus",
    parseAsStringEnum(["All", "Featured", "Published"]).withDefault("All"),
  );

  const [farmingMethodIds, setFarmingMethodIds] = useQueryState(
    "farmingMethodIds",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  const [weatherRiskIds, setWeatherRiskIds] = useQueryState(
    "weatherRiskIds",
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  return weatherRiskIds.length ||
    farmingMethodIds.length ||
    barangay !== "All" ||
    farmStatus !== "All" ? (
    <div>
      <p className="text-muted-foreground mt-2 mb-1 text-xs">Filters</p>
      <div className="flex flex-row flex-wrap gap-1">
        {barangay !== "All" && (
          <Badge key={barangay} variant={"default"} className="bg-chart-3">
            {barangay}
            <div
              className={`size-3.5 cursor-pointer`}
              onClick={() => setBarangay("All")}
            >
              <X className="size-3.5" />
            </div>
          </Badge>
        )}
        {farmStatus !== "All" && (
          <Badge key={farmStatus} variant={"default"} className="bg-chart-4">
            {farmStatus}
            <div
              className={`size-3.5 cursor-pointer`}
              onClick={() => setFarmStatus("All")}
            >
              <X className="size-3.5" />
            </div>
          </Badge>
        )}
        {farmingMethodIds.map((stat) => {
          return (
            <Badge key={stat} variant={"default"} className="bg-chart-1">
              {optionLandCategory?.find((fm) => fm.value === stat)?.label}
              <div
                className={`bgch size-3.5 cursor-pointer`}
                onClick={() =>
                  setFarmingMethodIds((prev) => prev.filter((p) => p !== stat))
                }
              >
                <X className="size-3.5" />
              </div>
            </Badge>
          );
        })}
        {weatherRiskIds.map((stat) => {
          return (
            <Badge key={stat} variant={"default"} className="bg-chart-2">
              {optionWeatherRisks?.find((fm) => fm.value === stat)?.label}
              <div
                className={`size-3.5 cursor-pointer`}
                onClick={() =>
                  setWeatherRiskIds((prev) => prev.filter((p) => p !== stat))
                }
              >
                <X className="size-3.5" />
              </div>
            </Badge>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Farmers;
