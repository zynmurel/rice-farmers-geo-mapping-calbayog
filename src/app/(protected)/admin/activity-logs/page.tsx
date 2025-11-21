"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  UserCircle,
  Sprout,
  MapPin,
  Leaf,
  Package,
  Shield,
  Search,
  Filter,
  LoaderCircle,
} from "lucide-react";
import PageLayout from "@/app/_components/page-layout";
import type {
  ActivityLog,
  ActivityLogAction,
  ActivityLogType,
} from "@prisma/client";
import { api } from "@/trpc/react";
import { parseAsInteger, useQueryStates } from "nuqs";
import { Separator } from "@/components/ui/separator";
import TablePagination from "./_components/table-pagination";

const getTypeIcon = (type: ActivityLogType) => {
  const iconClass = "h-4 w-4";
  switch (type) {
    case "FARMER":
      return <UserCircle className={iconClass} />;
    case "FARM":
      return <MapPin className={iconClass} />;
    case "CROPS":
      return <Leaf className={iconClass} />;
    case "FERTILIZER":
      return <Sprout className={iconClass} />;
    case "DISTRIBUTION":
      return <Package className={iconClass} />;
    case "ACCOUNT":
      return <Shield className={iconClass} />;
  }
};

const getActionBadgeVariant = (
  action: ActivityLogAction,
): "default" | "secondary" | "destructive" | "outline" => {
  switch (action) {
    case "CREATE":
      return "default";
    case "UPDATE":
      return "outline";
    case "DELETE":
      return "destructive";
    case "LOGIN":
      return "default";
    case "LOGOUT":
      return "destructive";
  }
};

const getTypeBadgeColor = (type: ActivityLogType) => {
  const colors = {
    FARMER: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    FARM: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    CROPS:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300",
    FERTILIZER:
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300",
    DISTRIBUTION:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    ACCOUNT:
      "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
    NEWS: "bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-300",
  };
  return colors[type];
};

export default function ActivityLogsPage() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [pagination] = useQueryStates(
    {
      skip: parseAsInteger.withDefault(0),
      take: parseAsInteger.withDefault(10),
    },
    {
      history: "push",
    },
  );

  const { data: filteredLogs, isLoading: logsIsLoading } =
    api.activityLog.getActivityLogs.useQuery({
      type: typeFilter,
      action: actionFilter,
      ...pagination,
    });

  const { data: filteredLogsCount, isLoading: logsCountIsLoading } =
    api.activityLog.getActivityLogsCount.useQuery({
      type: typeFilter,
      action: actionFilter,
    });

  return (
    <PageLayout
      title="ACTIVITY LOGS"
      description="Review admin activity logs."
      icon={"Leaf"}
    >
      <div className="mx-auto space-y-6">
        <Card className="border-slate-200 shadow-lg dark:border-slate-800">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Admin Activity Monitor</CardTitle>
                <CardDescription>
                  Monitor and review all system activities and changes
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-sm font-normal">
                {filteredLogs?.length}{" "}
                {filteredLogs?.length === 1 ? "log" : "logs"}
              </Badge>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex gap-2">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="FARMER">Farmer</SelectItem>
                    <SelectItem value="FARM">Farm</SelectItem>
                    <SelectItem value="CROPS">Crops</SelectItem>
                    <SelectItem value="FERTILIZER">Fertilizer</SelectItem>
                    <SelectItem value="DISTRIBUTION">Distribution</SelectItem>
                    <SelectItem value="ACCOUNT">Account</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={actionFilter} onValueChange={setActionFilter}>
                  <SelectTrigger className="w-[160px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by action" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Actions</SelectItem>
                    <SelectItem value="CREATE">Create</SelectItem>
                    <SelectItem value="UPDATE">Update</SelectItem>
                    <SelectItem value="DELETE">Delete</SelectItem>
                    <SelectItem value="LOGIN">Login</SelectItem>
                    <SelectItem value="LOGOUT">Logout</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800">
              <Table>
                <TableHeader className="bg-slate-50 dark:bg-slate-900">
                  <TableRow>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                    <TableHead className="font-semibold">Remarks</TableHead>
                    <TableHead className="font-semibold">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs?.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="py-12 text-center text-slate-500"
                      >
                        No activity logs found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLogs?.map((log) => (
                      <TableRow
                        key={log.id}
                        className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {/* <div className="rounded-lg bg-slate-100 p-2 dark:bg-slate-800">
                              {getTypeIcon(log.type)}
                            </div> */}
                            <Badge
                              variant="outline"
                              className={`font-medium ${getTypeBadgeColor(log.type)}`}
                            >
                              {log.type}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getActionBadgeVariant(log.action)}>
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">{log.message}</TableCell>
                        <TableCell className="text-slate-600 dark:text-slate-400">
                          {formatDistanceToNow(new Date(log.createdAt), {
                            addSuffix: true,
                          })}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>

              {logsIsLoading && (
                <div className="flex w-full items-center justify-center p-5">
                  <LoaderCircle className="animate-spin" />
                </div>
              )}
              <Separator />
              <div className="pb-2">
                <TablePagination count={filteredLogsCount} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
