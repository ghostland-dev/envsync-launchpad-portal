import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CommandPalette } from "@/components/ui/command-palette";
import { HelpSystem } from "@/components/ui/help-system";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, User, Bell, Settings } from "lucide-react";

const breadcrumbMap: Record<string, { label: string; href?: string }[]> = {
  '/dashboard': [
    { label: 'Dashboard' }
  ],
  '/wizard': [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Environment Wizard' }
  ],
  '/analytics': [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Analytics' }
  ],
  '/feedback': [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Feedback' }
  ]
};

export function AppLayout() {
  const location = useLocation();
  const breadcrumbs = breadcrumbMap[location.pathname] || [];

  // Don't show layout on landing page
  if (location.pathname === '/') {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Global Navigation */}
      <header className="glass border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">EnvSync</span>
              </div>
              
              {/* Breadcrumbs */}
              {breadcrumbs.length > 0 && (
                <>
                  <div className="hidden md:block h-6 w-px bg-border" />
                  <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                      {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                          <BreadcrumbItem>
                            {crumb.href ? (
                              <BreadcrumbLink href={crumb.href}>
                                {crumb.label}
                              </BreadcrumbLink>
                            ) : (
                              <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                            )}
                          </BreadcrumbItem>
                          {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                      ))}
                    </BreadcrumbList>
                  </Breadcrumb>
                </>
              )}
            </div>
            
            {/* Search and Actions */}
            <div className="flex items-center space-x-4">
              <CommandPalette />
              
              <div className="hidden lg:flex items-center space-x-2">
                <ThemeToggle />
                <HelpSystem />
                
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
                  <Bell className="h-4 w-4" />
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-[10px] p-0"
                  >
                    3
                  </Badge>
                </Button>
                
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Global Keyboard Shortcuts */}
      <div className="fixed bottom-4 right-4 z-50 hidden lg:block">
        <Button
          variant="outline"
          size="sm"
          className="glass border-muted text-xs"
          onClick={() => {
            const helpTrigger = document.querySelector('[data-help-trigger]') as HTMLElement;
            helpTrigger?.click();
          }}
        >
          Press ? for shortcuts
        </Button>
      </div>
    </div>
  );
}