"use client";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { api } from "@/trpc/react";
import type { News, NewsImage } from "@prisma/client";
import { format } from "date-fns";
import { LoaderCircle, Newspaper } from "lucide-react";
import React, { useEffect } from "react";

function Page() {
  const { data, isLoading } = api.Farmer.news.getNews.useQuery();
  return (
    <div className="lg:bg-background bg-foreground/10">
      <div className="flex flex-row items-center gap-2 bg-background p-2 font-semibold md:p-4 lg:p-5">
        <Newspaper className="size-5" strokeWidth={2.5} />
        News
      </div>
      {isLoading ? (
        <div className="flex h-[80vh] flex-row items-center justify-center gap-2">
          <LoaderCircle className="animate-spin" />
          Loading...
        </div>
      ) : data?.length ? (
        <div className="my-1 flex flex-col gap-1">
          {data.map((news) => (
            <News key={news.id} news={news} />
          ))}
        </div>
      ) : (
        <div className="my-1 flex h-[70vh] flex-row items-center justify-center gap-2 rounded border bg-foreground/10 text-foreground/50">
          <Newspaper className="n" />
          No News Added
        </div>
      )}
    </div>
  );
}

const News = ({ news }: { news: News & { NewsImage?: NewsImage[] } }) => {
  const isMobile = useIsMobile();
  const [showMore, setShowMore] = React.useState(false);
  useEffect(() => {
    setShowMore(!isMobile);
  }, [isMobile]);
  return (
    <div
      key={news.id}
      className="flex flex-col gap-1 bg-background p-2 md:p-4 lg:flex-row-reverse lg:justify-end lg:gap-5 lg:p-2 lg:px-5"
    >
      <div className="">
        <p className="text-xs text-foreground/50">
          Posted : {format(news.postedAt, "PPP")}
        </p>
        <p className="text-base font-bold lg:text-xl">{news.title}</p>
        <p className="text-xs lg:text-base">
          {news.content.slice(0, showMore ? Infinity : 100)}
          {showMore ? "" : news.content.length > 100 ? "...  " : ""}
          {showMore ? (
            ""
          ) : news.content.length > 100 ? (
            <span className="text-foreground/50" onClick={() => setShowMore(true)}>
              Show more
            </span>
          ) : (
            <></>
          )}
        </p>
      </div>
      {news.NewsImage?.length ? (
        <Dialog>
          <DialogTrigger>
            {news.NewsImage?.[0]?.url && (
              <div className="mb-2 h-80 w-full flex-none overflow-hidden lg:h-60 lg:w-60">
                <img
                  src={news.NewsImage[0]?.url}
                  alt={news.title}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </DialogTrigger>
          <DialogContent className="overflow-y-auto p-0 w-full">
            <Carousel>
              <CarouselContent>
                {news.NewsImage?.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className=" w-full flex-none overflow-hidden ">
                      <img
                        src={image.url}
                        alt={news.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </DialogContent>
        </Dialog>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Page;
