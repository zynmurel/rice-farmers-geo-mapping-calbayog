"use client";

import PageLayout from "@/app/_components/page-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseAsStringEnum, useQueryState } from "nuqs";
import React from "react";
import Crops from "./_components/crops";
import Fertilizer from "./_components/fertilizer";

function Page() {
  const [activeTab, setActiveTab] = useQueryState(
    "activeTab",
    parseAsStringEnum(["crops", "fertilizers"]).withDefault("crops"),
  );
  return (
    <PageLayout
      title="CROPS & FERTILIZERS"
      description="Create and manage crops and fertilizers."
      icon={"Leaf"}
    >
      <div>
        <Tabs value={activeTab} onValueChange={(e) => setActiveTab(e as any)}>
          <TabsList className="w-[400px] cursor-pointer bg-slate-200">
            <TabsTrigger className="cursor-pointer" value="crops">
              Crops
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="fertilizers">
              Fertilizers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="crops">
            <Crops />
          </TabsContent>
          <TabsContent value="fertilizers">
            <Fertilizer />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
}

export default Page;
