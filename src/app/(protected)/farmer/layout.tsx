"use client";
import LanguageToogle from "@/app/_components/language-toggle";
import { ModeToggle } from "@/app/_components/mode-toggle";
import { FarmerSideBar } from "@/components/farmer-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useLocaleStore } from "@/store/localeStore";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const active = path.split("/")[2] || "news";
  const { messages } = useLocaleStore();
  return (
    <SidebarProvider>
      <FarmerSideBar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="capitalize">
                    {messages[active as "farms"]?.header}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex flex-row gap-1 px-5">
            <LanguageToogle />
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
