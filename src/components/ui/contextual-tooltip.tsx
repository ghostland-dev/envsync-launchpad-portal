import React, { useState, useEffect } from "react";
import { HelpCircle, X, CheckCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SmartTooltipProps {
  children: React.ReactNode;
  title: string;
  description: string;
  type?: 'info' | 'tip' | 'warning' | 'success';
  learnMoreUrl?: string;
  dismissible?: boolean;
  showOnHover?: boolean;
  className?: string;
}

const typeConfig = {
  info: {
    icon: HelpCircle,
    className: 'border-blue-500/20 bg-blue-500/10',
    iconClassName: 'text-blue-500'
  },
  tip: {
    icon: Lightbulb,
    className: 'border-yellow-500/20 bg-yellow-500/10',
    iconClassName: 'text-yellow-500'
  },
  warning: {
    icon: HelpCircle,
    className: 'border-orange-500/20 bg-orange-500/10',
    iconClassName: 'text-orange-500'
  },
  success: {
    icon: CheckCircle,
    className: 'border-green-500/20 bg-green-500/10',
    iconClassName: 'text-green-500'
  }
};

export function SmartTooltip({
  children,
  title,
  description,
  type = 'info',
  learnMoreUrl,
  dismissible = false,
  showOnHover = false,
  className = ""
}: SmartTooltipProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(!showOnHover);
  const config = typeConfig[type];
  const IconComponent = config.icon;

  // Check if tooltip was previously dismissed
  useEffect(() => {
    if (dismissible) {
      const dismissedKey = `tooltip-dismissed-${title.replace(/\s+/g, '-').toLowerCase()}`;
      const wasDismissed = localStorage.getItem(dismissedKey) === 'true';
      setIsDismissed(wasDismissed);
    }
  }, [title, dismissible]);

  const handleDismiss = () => {
    if (dismissible) {
      const dismissedKey = `tooltip-dismissed-${title.replace(/\s+/g, '-').toLowerCase()}`;
      localStorage.setItem(dismissedKey, 'true');
      setIsDismissed(true);
    }
  };

  if (isDismissed) {
    return <>{children}</>;
  }

  const tooltipContent = (
    <Card className={`max-w-sm glass border-0 shadow-card ${config.className} ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <IconComponent className={`h-4 w-4 ${config.iconClassName}`} />
            <CardTitle className="text-sm font-semibold">{title}</CardTitle>
          </div>
          {dismissible && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-transparent"
              onClick={handleDismiss}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        {learnMoreUrl && (
          <Button size="sm" variant="outline" className="text-xs h-7">
            Learn More
          </Button>
        )}
      </CardContent>
    </Card>
  );

  if (showOnHover) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative inline-flex items-center">
              {children}
              <HelpCircle className="h-4 w-4 ml-1 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" className="p-0 border-0 bg-transparent shadow-none">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="space-y-2">
      {children}
      {isVisible && tooltipContent}
    </div>
  );
}

interface ContextualHelpProps {
  tips: Array<{
    id: string;
    element: string; // CSS selector
    title: string;
    description: string;
    type?: 'info' | 'tip' | 'warning' | 'success';
    position?: 'top' | 'bottom' | 'left' | 'right';
  }>;
}

export function ContextualHelp({ tips }: ContextualHelpProps) {
  const [activeTip, setActiveTip] = useState<string | null>(null);
  const [visibleTips, setVisibleTips] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const tipId = entry.target.getAttribute('data-tip-id');
          if (tipId) {
            if (entry.isIntersecting) {
              setVisibleTips(prev => [...prev.filter(id => id !== tipId), tipId]);
            } else {
              setVisibleTips(prev => prev.filter(id => id !== tipId));
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    tips.forEach((tip) => {
      const element = document.querySelector(tip.element);
      if (element) {
        element.setAttribute('data-tip-id', tip.id);
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [tips]);

  return (
    <>
      {tips.map((tip) => (
        <div key={tip.id} className="contextual-help-tip">
          {/* Render positioned tooltips based on visible elements */}
        </div>
      ))}
    </>
  );
}