"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { menu } from "@/lib/const/sidebar-menu";
import Image from "next/image";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex w-full flex-row items-end justify-start p-2 gap-2">
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
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
