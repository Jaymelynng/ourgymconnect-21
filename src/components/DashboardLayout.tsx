import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, Grid, LayoutList, CalendarDays, Settings, Menu, Wrench } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { GymSelector } from "./GymSelector";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  const menuItems = [
    {
      title: "List View",
      icon: LayoutList,
      path: "/list",
    },
    {
      title: "Calendar View",
      icon: Calendar,
      path: "/calendar",
    },
    {
      title: "Weekly View",
      icon: CalendarDays,
      path: "/weekly",
    },
    {
      title: "Gallery View",
      icon: Grid,
      path: "/gallery",
    },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-border/10 p-4">
            <div className="flex items-center gap-2">
              <Wrench className="w-6 h-6 text-primary animate-pulse" />
              <h2 className="font-semibold text-lg">Marketing Toolkit</h2>
            </div>
            <p className="text-sm text-muted-foreground mt-1 pl-8">
              Your all-in-one gym marketing solution
            </p>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Toolkit Views</SidebarGroupLabel>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                      tooltip={item.title}
                    >
                      <a href={item.path} className="flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Gym Settings</SidebarGroupLabel>
              <div className="p-4">
                <GymSelector />
              </div>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-border/10 p-4">
            <div className="text-xs text-muted-foreground text-center">
              Marketing Toolkit v1.0
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 w-full bg-card border-b border-border/10 shadow-sm">
            <div className="px-4 h-14 flex items-center justify-between">
              <SidebarTrigger />
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}