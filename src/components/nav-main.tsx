"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname, useRouter } from "next/navigation"
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";

type NavMainItem = {
  title: string;
  key: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};

export function NavMain({
  items,
}: {
  items: NavMainItem[]
}) {
  const router = useRouter()
  const path = usePathname()
  const getActive = (pathItem:string)=>{
    const pathActive = path.split("/")[2]
    const pathItemActive = pathItem.split("/")[2]
    console.log(pathActive, pathItemActive)
    return pathActive === pathItemActive
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Pages</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton onClick={()=>router.push(item.url)} className=" cursor-pointer" tooltip={item.title} isActive={getActive(item.url)}>
                {item.icon && <item.icon/>}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
