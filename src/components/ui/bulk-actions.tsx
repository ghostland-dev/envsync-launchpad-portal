import React, { useState } from "react";
import { Check, X, Download, Archive, Trash2, Copy, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface BulkAction {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  action: (ids: string[]) => Promise<void> | void;
  variant?: 'default' | 'destructive';
  requiresConfirmation?: boolean;
}

interface BulkActionsProps {
  selectedIds: string[];
  onClearSelection: () => void;
  totalItems: number;
  actions: BulkAction[];
}

export function BulkActions({ selectedIds, onClearSelection, totalItems, actions }: BulkActionsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const { toast } = useToast();

  if (selectedIds.length === 0) return null;

  const handleAction = async (action: BulkAction) => {
    if (action.requiresConfirmation) {
      const confirmed = window.confirm(
        `Are you sure you want to ${action.label.toLowerCase()} ${selectedIds.length} item(s)?`
      );
      if (!confirmed) return;
    }

    setIsLoading(action.id);
    try {
      await action.action(selectedIds);
      toast({
        title: "Action completed",
        description: `Successfully ${action.label.toLowerCase()} ${selectedIds.length} item(s)`,
      });
      onClearSelection();
    } catch (error) {
      toast({
        title: "Action failed",
        description: `Failed to ${action.label.toLowerCase()} selected items`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg glass">
      <div className="flex items-center space-x-3">
        <Checkbox 
          checked={true}
          onChange={onClearSelection}
          className="border-primary"
        />
        <Badge variant="secondary" className="bg-primary/20 text-primary">
          {selectedIds.length} of {totalItems} selected
        </Badge>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="outline" className="glass border-muted">
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glass border-muted">
            {actions.map((action, index) => (
              <React.Fragment key={action.id}>
                <DropdownMenuItem
                  onClick={() => handleAction(action)}
                  disabled={isLoading === action.id}
                  className={action.variant === 'destructive' ? 'text-destructive' : ''}
                >
                  <action.icon className="h-4 w-4 mr-2" />
                  {isLoading === action.id ? 'Processing...' : action.label}
                </DropdownMenuItem>
                {index < actions.length - 1 && action.variant === 'destructive' && (
                  <DropdownMenuSeparator />
                )}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// Example usage component
export function EnvironmentBulkActions({ selectedIds, onClearSelection, totalItems }: {
  selectedIds: string[];
  onClearSelection: () => void;
  totalItems: number;
}) {
  const bulkActions: BulkAction[] = [
    {
      id: 'export',
      label: 'Export Configurations',
      icon: Download,
      action: async (ids) => {
        // Export logic here
        console.log('Exporting environments:', ids);
      }
    },
    {
      id: 'duplicate',
      label: 'Duplicate',
      icon: Copy,
      action: async (ids) => {
        // Duplicate logic here
        console.log('Duplicating environments:', ids);
      }
    },
    {
      id: 'share',
      label: 'Share with Team',
      icon: Share,
      action: async (ids) => {
        // Share logic here
        console.log('Sharing environments:', ids);
      }
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: Archive,
      action: async (ids) => {
        // Archive logic here
        console.log('Archiving environments:', ids);
      }
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: Trash2,
      variant: 'destructive' as const,
      requiresConfirmation: true,
      action: async (ids) => {
        // Delete logic here
        console.log('Deleting environments:', ids);
      }
    }
  ];

  return (
    <BulkActions
      selectedIds={selectedIds}
      onClearSelection={onClearSelection}
      totalItems={totalItems}
      actions={bulkActions}
    />
  );
}