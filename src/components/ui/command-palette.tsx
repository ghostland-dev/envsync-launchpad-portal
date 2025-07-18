import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Users, Settings, BarChart3, Zap, Monitor, Shield } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
  category: string;
  keywords: string[];
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const quickActions: QuickAction[] = [
    {
      id: 'dashboard',
      title: 'Go to Dashboard',
      description: 'View your environment overview',
      icon: Monitor,
      action: () => navigate('/dashboard'),
      category: 'Navigation',
      keywords: ['dashboard', 'home', 'overview']
    },
    {
      id: 'wizard',
      title: 'Environment Wizard',
      description: 'Create a new environment',
      icon: Zap,
      action: () => navigate('/wizard'),
      category: 'Actions',
      keywords: ['wizard', 'create', 'new', 'environment', 'setup']
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Check performance metrics',
      icon: BarChart3,
      action: () => navigate('/analytics'),
      category: 'Navigation',
      keywords: ['analytics', 'metrics', 'performance', 'stats']
    },
    {
      id: 'feedback',
      title: 'Give Feedback',
      description: 'Share your thoughts',
      icon: Users,
      action: () => navigate('/feedback'),
      category: 'Navigation',
      keywords: ['feedback', 'support', 'help', 'contact']
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure your preferences',
      icon: Settings,
      action: () => console.log('Settings'),
      category: 'Actions',
      keywords: ['settings', 'preferences', 'config', 'configure']
    }
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const groupedActions = quickActions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, QuickAction[]>);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 glass border-muted"
        onClick={() => setOpen(true)}
        data-search-trigger
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">Search or jump to...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for actions, pages, or features..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {Object.entries(groupedActions).map(([category, actions]) => (
            <CommandGroup key={category} heading={category}>
              {actions.map((action) => (
                <CommandItem
                  key={action.id}
                  onSelect={() => {
                    action.action();
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 px-3 py-2"
                >
                  <action.icon className="h-4 w-4" />
                  <div className="flex flex-col">
                    <span className="font-medium">{action.title}</span>
                    <span className="text-xs text-muted-foreground">{action.description}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}