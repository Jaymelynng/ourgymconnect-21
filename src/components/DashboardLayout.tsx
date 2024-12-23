import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarTrigger } from "@/components/ui/sidebar";
import { Facebook, Instagram, Share, Menu } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { GymSelector } from "./GymSelector";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  const viewItems = [
    {
      title: "List View",
      path: "/list",
      description: "View and manage your content in a list format"
    },
    {
      title: "Calendar View",
      path: "/calendar",
      description: "Schedule and plan your content"
    },
    {
      title: "Weekly View",
      path: "/weekly",
      description: "Weekly content overview and planning"
    },
    {
      title: "Gallery View",
      path: "/gallery",
      description: "Visual gallery of your content"
    },
  ];

  const toolkitLinks = [
    {
      title: "Facebook",
      icon: Facebook,
      url: "https://facebook.com",
      description: "Access Facebook Business Manager"
    },
    {
      title: "Instagram",
      icon: Instagram,
      url: "https://instagram.com",
      description: "Access Instagram Business Account"
    },
    {
      title: "SharePoint",
      icon: Share,
      url: "https://sharepoint.com",
      description: "Access SharePoint Resources"
    }
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar>
          <SidebarHeader className="border-b border-border/10 p-6 bg-gradient-to-b from-primary/10 to-transparent">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Share className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div>
                <h2 className="font-semibold text-xl text-foreground">Marketing Toolkit</h2>
                <p className="text-sm text-muted-foreground">
                  Quick access to your platforms
                </p>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-sm font-medium px-2 py-1.5 bg-secondary/10 rounded-md mx-4 mb-2">
                Social Media & Resources
              </SidebarGroupLabel>
              <SidebarMenu>
                {toolkitLinks.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.description}
                      className="transition-all duration-200 hover:bg-primary/10"
                    >
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-3 p-2"
                      >
                        <div className="p-1.5 rounded-md bg-secondary/10">
                          <item.icon className="w-4 h-4" />
                        </div>
                        <span className="font-medium">{item.title}</span>
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
            <div className="px-6 py-4">
              <div className="flex items-center justify-between mb-4">
                <SidebarTrigger className="hover:bg-primary/10" />
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex gap-2">
                {viewItems.map((item) => (
                  <Button
                    key={item.path}
                    variant={location.pathname === item.path ? "default" : "ghost"}
                    className="transition-all duration-200"
                    asChild
                  >
                    <a href={item.path}>
                      {item.title}
                    </a>
                  </Button>
                ))}
              </nav>
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