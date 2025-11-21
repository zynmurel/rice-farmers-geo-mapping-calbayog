"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NewspaperIcon, User, Wheat } from "lucide-react";
import { NavUserFarmer } from "./nav-user-farmer";
import { useLocaleStore } from "@/store/localeStore";

export function FarmerSideBar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { messages } = useLocaleStore();
  const menu = [
    {
      title: messages.menu.news,
      key: "news",
      url: "/farmer",
      icon: NewspaperIcon,
    },
    {
      title: messages.menu.farms,
      key: "farms",
      url: "/farmer/farms",
      icon: Wheat,
    },
    {
      title: messages.menu.account,
      key: "account",
      url: "/farmer/account",
      icon: User,
    },
  ];
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex w-full flex-row items-end justify-start gap-2 p-2">
            <Image width={50} height={50} alt="logo" src={"/logo.png"} />
            <span className="text-xl font-bold tracking-[2px] uppercase">
              GEO-AGRI
            </span>
          </div>
          <SidebarMenuItem className="flex flex-row items-center gap-2 p-2 py-0">
            {/* <BookKey className="!size-7" /> */}
            <div>
              <p className="text-priary -mt-1 text-sm font-bold opacity-90">
                RICE FARMERS GEO MAPPING
              </p>
              <p className="text-priary text-xs font-medium opacity-60">
                Samar, Calbayog City
              </p>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu} />
        {/* <NavSecondary items={menu.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUserFarmer />
      </SidebarFooter>
    </Sidebar>
  );
}
