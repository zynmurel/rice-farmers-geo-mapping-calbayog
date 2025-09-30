// app/news/page.tsx
"use client";

import React from "react";
import PageLayout from "@/app/_components/page-layout";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { CalendarDays, LoaderCircle, Newspaper, Plus } from "lucide-react";
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsIsoDate,
  useQueryState,
  useQueryStates,
} from "nuqs";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import CreateNewsModal from "./_components/create-news";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import TablePagination from "./_components/table-pagination";

function NewsPage() {
  const [_, setOpenCreate] = useQueryState(
    "create-news",
    parseAsBoolean.withDefault(false),
  );
  const [date, setDate] = useQueryState("news_date", parseAsIsoDate);
  const [pagination] = useQueryStates(
    {
      skip: parseAsInteger.withDefault(0),
      take: parseAsInteger.withDefault(10),
    },
    {
      history: "push",
    },
  );
  const { data: news, isLoading } = api.news.getAll.useQuery({
    date: date || undefined,
    ...pagination,
  });
  const { data: count } = api.news.getAllCount.useQuery({
    date: date || undefined,
    ...pagination,
  });

  return (
    <PageLayout title="NEWS" description="Manage news" icon="Newspaper">
      <div className="grid gap-2">
        <CreateNewsModal />
        <div className="flex flex-row justify-between gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className={`min-w-80 justify-start text-left font-normal ${
                  !date && "text-muted-foreground"
                }`}
              >
                <CalendarDays />
                {date ? format(date, "PPP") : "Filter by date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date || undefined}
                onSelect={(e) => setDate(e || null)}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          <Button onClick={() => setOpenCreate(true)}>
            <Plus /> News
          </Button>
        </div>
        <div>
          <div className="bg-background flex flex-col rounded-lg">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-2 p-10 opacity-50">
                <Newspaper className="size-10" />
                <div className="flex flex-row items-center gap-1">
                  <LoaderCircle className="animate-spin" /> Loading News...
                </div>
              </div>
            ) : !news?.length ? (
              <div className="flex flex-col items-center justify-center gap-2 p-10 opacity-50">
                <Newspaper className="size-10" />
                <div className="flex flex-row items-center gap-1">
                  No news found
                </div>
              </div>
            ) : (
              <div className="flex flex-col p-5">
                {news.map((n) => {
                  return (
                    <div key={n.id}>
                      <div className="flex flex-row gap-5">
                        <div className="aspect-square size-52 flex-none overflow-hidden">
                          {n.NewsImage[0]?.url ? (
                            <Image
                              width={1000}
                              height={1000}
                              alt={n.title}
                              src={n.NewsImage[0]?.url}
                              className="aspect-square h-full w-full object-cover"
                            />
                          ) : (
                            <div className="aspect-square h-full"></div>
                          )}
                        </div>
                        <div className=" flex flex-col">
                          <div>
                          <p className=" mt-auto text-sm opacity-50">Posted : {format(n.postedAt, "PPP")}</p>
                            <p className="text-xl font-bold">{n.title}</p>
                            <p className="xl:max-w-1/2">{n.content}</p>
                            {/* <p className=" text-green-600 font-semibold text-sm mt-2 cursor-pointer">View more details</p> */}
                          </div>
                        </div>
                      </div>
                      <Separator className="my-5" />
                    </div>
                  );
                })}
                <TablePagination count={count} />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default NewsPage;
