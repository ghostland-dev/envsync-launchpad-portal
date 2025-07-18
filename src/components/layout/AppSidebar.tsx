import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { 
  Home, 
  Wand2, 
  MessageSquare, 
  BarChart3, 
  Puzzle, 
  FileText, 
  Smartphone, 
  Zap, 
  Bot, 
  Users, 
  Shield 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { title: "Tableau de bord", url: "/dashboard", icon: Home },
  { title: "Assistant Environnement", url: "/wizard", icon: Wand2 },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Feedback", url: "/feedback", icon: MessageSquare },
];

const toolsNavItems = [
  { title: "Intégrations", url: "/integrations", icon: Puzzle },
  { title: "Documentation API", url: "/api-docs", icon: FileText },
  { title: "Mobile", url: "/mobile", icon: Smartphone },
  { title: "Performance", url: "/performance", icon: Zap },
];

const advancedNavItems = [
  { title: "Intelligence Artificielle", url: "/ai", icon: Bot },
  { title: "Collaboration", url: "/collaboration", icon: Users },
  { title: "Audit", url: "/audit", icon: Shield },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  
  const isMainGroupExpanded = mainNavItems.some((item) => isActive(item.url));
  const isToolsGroupExpanded = toolsNavItems.some((item) => isActive(item.url));
  const isAdvancedGroupExpanded = advancedNavItems.some((item) => isActive(item.url));

  const getNavClassName = (isActive: boolean) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 transition-colors";

  const renderNavGroup = (
    items: typeof mainNavItems, 
    label: string, 
    isExpanded: boolean
  ) => (
    <SidebarGroup>
      <SidebarGroupLabel className="text-muted-foreground font-medium">
        {label}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="w-full">
                <NavLink 
                  to={item.url} 
                  end 
                  className={({ isActive }) => `flex items-center space-x-2 w-full ${getNavClassName(isActive)}`}
                >
                  <div className="flex items-center space-x-2 w-full">
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {!collapsed && <span className="truncate">{item.title}</span>}
                  </div>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar 
      className={collapsed ? "w-14" : "w-64"} 
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold text-foreground">EnvSync</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {renderNavGroup(mainNavItems, "Principal", isMainGroupExpanded)}
        {renderNavGroup(toolsNavItems, "Outils", isToolsGroupExpanded)}
        {renderNavGroup(advancedNavItems, "Avancé", isAdvancedGroupExpanded)}
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50 p-2">
        <SidebarTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start"
          >
            {collapsed ? "→" : "← Réduire"}
          </Button>
        </SidebarTrigger>
      </SidebarFooter>
    </Sidebar>
  );
}