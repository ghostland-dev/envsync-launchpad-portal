import * as React from "react";
import { useState } from "react";
import { HelpCircle, Keyboard, BookOpen, MessageCircle, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useGlobalShortcuts } from "@/hooks/useKeyboardShortcuts";

export function HelpSystem() {
  const [open, setOpen] = useState(false);
  const shortcuts = useGlobalShortcuts();

  const shortcutGroups = shortcuts.reduce((acc, shortcut) => {
    const category = shortcut.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(shortcut);
    return acc;
  }, {} as Record<string, typeof shortcuts>);

  const formatShortcut = (shortcut: any) => {
    const keys = [];
    if (shortcut.ctrlKey) keys.push('Ctrl');
    if (shortcut.metaKey) keys.push('⌘');
    if (shortcut.shiftKey) keys.push('Shift');
    if (shortcut.altKey) keys.push('Alt');
    keys.push(shortcut.key.toUpperCase());
    return keys.join(' + ');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0"
          data-help-trigger
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl glass border-0 shadow-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Help Center
          </DialogTitle>
          <DialogDescription>
            Get help with EnvSync features and keyboard shortcuts
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="shortcuts" className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass">
            <TabsTrigger value="shortcuts" className="flex items-center gap-2">
              <Keyboard className="h-4 w-4" />
              Shortcuts
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Guides
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Support
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="shortcuts" className="space-y-6">
            <div className="space-y-4">
              {Object.entries(shortcutGroups).map(([category, categoryShortcuts]) => (
                <div key={category} className="space-y-3">
                  <h3 className="font-semibold text-lg">{category}</h3>
                  <div className="space-y-2">
                    {categoryShortcuts.map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg glass border border-muted">
                        <span className="text-sm">{shortcut.description}</span>
                        <Badge variant="secondary" className="font-mono">
                          {formatShortcut(shortcut)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="guides" className="space-y-4">
            <div className="grid gap-4">
              <div className="p-4 rounded-lg glass border border-muted">
                <h3 className="font-semibold mb-2">Getting Started</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Learn how to set up your first environment with EnvSync
                </p>
                <Button size="sm" variant="outline">View Guide</Button>
              </div>
              
              <div className="p-4 rounded-lg glass border border-muted">
                <h3 className="font-semibold mb-2">Team Collaboration</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Share environments and collaborate with your team
                </p>
                <Button size="sm" variant="outline">View Guide</Button>
              </div>
              
              <div className="p-4 rounded-lg glass border border-muted">
                <h3 className="font-semibold mb-2">Advanced Configuration</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Custom integrations and advanced environment setup
                </p>
                <Button size="sm" variant="outline">View Guide</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="support" className="space-y-4">
            <div className="text-center space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Need More Help?</h3>
                <p className="text-muted-foreground">
                  Our support team is here to help you succeed with EnvSync
                </p>
              </div>
              
              <div className="grid gap-3">
                <Button className="w-full" variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start Live Chat
                </Button>
                <Button className="w-full" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Documentation
                </Button>
                <Button className="w-full" variant="outline">
                  Join Community
                </Button>
              </div>
              
              <Separator />
              
              <div className="text-sm text-muted-foreground">
                <p>Average response time: <span className="font-semibold text-primary">2 minutes</span></p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}