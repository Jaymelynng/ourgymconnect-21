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
      description: "View and manage your content in a list format"
    },
    {
      title: "Calendar View",
      icon: Calendar,
      path: "/calendar",
      description: "Schedule and plan your content"
    },
    {
      title: "Weekly View",
      icon: CalendarDays,
      path: "/weekly",
      description: "Weekly content overview and planning"
    },
    {
      title: "Gallery View",
      icon: Grid,
      path: "/gallery",
      description: "Visual gallery of your content"
    },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-border/10 p-6 bg-gradient-to-b from-primary/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Wrench className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div>
                <h2 className="font-semibold text-xl text-foreground">Marketing Toolkit</h2>
                <p className="text-sm text-muted-foreground">
                  Your content command center
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-medium px-2 py-1.5 bg-secondary/10 rounded-md mx-4 mb-2">
                Toolkit Views
              </SidebarGroupLabel>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                      tooltip={item.description}
                      className="transition-all duration-200 hover:bg-primary/10"
                    >
                      <a href={item.path} className="flex items-center gap-3 p-2">
                        <div className={`p-1.5 rounded-md ${location.pathname === item.path ? 'bg-primary/20' : 'bg-secondary/10'}`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-xs text-muted-foreground hidden group-hover:block">
                            {item.description}
                          </span>
                        </div>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-medium px-2 py-1.5 bg-secondary/10 rounded-md mx-4 mb-2">
                Gym Settings
              </SidebarGroupLabel>
              <div className="p-4">
                <GymSelector />
              </div>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-border/10 p-4 bg-card/50">
            <div className="text-xs text-muted-foreground text-center">
              Marketing Toolkit v1.0
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 w-full bg-card/80 backdrop-blur-sm border-b border-border/10 shadow-sm">
            <div className="px-6 h-16 flex items-center justify-between">
              <SidebarTrigger className="hover:bg-primary/10" />
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </header>
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}