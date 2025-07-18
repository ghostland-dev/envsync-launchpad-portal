import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  QrCode, 
  Mic, 
  Plus, 
  Zap,
  Users,
  Settings,
  Download,
  Share,
  Camera,
  MapPin
} from 'lucide-react';
import { useHaptics } from '@/hooks/useHaptics';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
  color: string;
  action: () => void;
  disabled?: boolean;
}

interface QuickActionsProps {
  onCreateEnvironment?: () => void;
  onScanQR?: () => void;
  onVoiceCommand?: () => void;
  onShareLink?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onCreateEnvironment,
  onScanQR,
  onVoiceCommand,
  onShareLink
}) => {
  const { impact, vibrate } = useHaptics();
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = async (action: () => void) => {
    await impact();
    await vibrate(100);
    action();
    setIsOpen(false);
  };

  const quickActions: QuickAction[] = [
    {
      id: 'create',
      label: 'Create Environment',
      icon: Plus,
      description: 'Set up a new development environment',
      color: 'text-primary',
      action: () => onCreateEnvironment?.()
    },
    {
      id: 'scan',
      label: 'Scan QR Code',
      icon: QrCode,
      description: 'Join environment via QR code',
      color: 'text-blue-500',
      action: () => onScanQR?.()
    },
    {
      id: 'voice',
      label: 'Voice Command',
      icon: Mic,
      description: 'Control environments with voice',
      color: 'text-green-500',
      action: () => onVoiceCommand?.()
    },
    {
      id: 'share',
      label: 'Share Invite',
      icon: Share,
      description: 'Invite team members',
      color: 'text-purple-500',
      action: () => onShareLink?.()
    },
    {
      id: 'quick-deploy',
      label: 'Quick Deploy',
      icon: Zap,
      description: 'Deploy latest changes',
      color: 'text-orange-500',
      action: () => console.log('Quick deploy')
    },
    {
      id: 'team-chat',
      label: 'Team Chat',
      icon: Users,
      description: 'Message your team',
      color: 'text-cyan-500',
      action: () => console.log('Team chat')
    },
    {
      id: 'download',
      label: 'Export Data',
      icon: Download,
      description: 'Download environment config',
      color: 'text-indigo-500',
      action: () => console.log('Export data')
    },
    {
      id: 'location',
      label: 'Nearby Envs',
      icon: MapPin,
      description: 'Find nearby environments',
      color: 'text-red-500',
      action: () => console.log('Location services'),
      disabled: true
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="lg"
          className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg gradient-primary z-50"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="h-[70vh] glass">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Quick Actions
          </SheetTitle>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[calc(70vh-120px)]">
          {quickActions.map((action) => {
            const Icon = action.icon;
            
            return (
              <Card 
                key={action.id} 
                className={`glass cursor-pointer transition-all duration-200 hover:scale-105 ${
                  action.disabled ? 'opacity-50' : ''
                }`}
                onClick={() => !action.disabled && handleAction(action.action)}
              >
                <CardContent className="p-4 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className={`p-3 rounded-full bg-background/50 ${action.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-sm mb-1">
                        {action.label}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {action.description}
                      </p>
                    </div>

                    {action.disabled && (
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Voice Command Hint */}
        <div className="mt-4 p-3 bg-primary/10 rounded-lg">
          <div className="flex items-center gap-2 text-sm">
            <Mic className="h-4 w-4 text-primary" />
            <span className="font-medium">Pro Tip:</span>
            <span className="text-muted-foreground">
              Say "Hey EnvSync" to start voice commands
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};