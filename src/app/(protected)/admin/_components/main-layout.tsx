import { CalculatorToggle } from "@/app/_components/cal-toggle";
import { ModeToggle } from "@/app/_components/mode-toggle";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <div className="flex h-screen max-h-screen w-full flex-col md:p-2">
        <div className="h-full w-full overflow-hidden md:rounded-xl">
          <div className="bg-background/95 relative flex h-full flex-col">
            <div className="absolute top-3 right-4 z-50 flex flex-row gap-1">
              {/* <CalculatorToggle /> */}
              <ModeToggle />
            </div>
            {/* <SiteHeader /> */}
            <div className="flex flex-1 flex-col overflow-y-scroll p-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
