import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Server, 
  Bell, 
  Users, 
  Settings,
  Plus,
  QrCode
} from 'lucide-react';
import { useHaptics } from '@/hooks/useHaptics';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  notificationCount?: number;
  onQuickAction?: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  notificationCount = 0,
  onQuickAction
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { impact } = useHaptics();

  const handleNavigation = async (path: string) => {
    await impact();
    navigate(path);
  };

  const handleQuickAction = async () => {
    await impact();
    onQuickAction?.();
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/mobile' },
    { icon: Server, label: 'Environments', path: '/mobile/environments' },
    { icon: Bell, label: 'Notifications', path: '/mobile/notifications', badge: notificationCount },
    { icon: Users, label: 'Team', path: '/mobile/team' },
    { icon: Settings, label: 'Settings', path: '/mobile/settings' },
  ];

  return (
    <>
      {/* Main Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border z-50">
        <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                className={cn(
                  "flex-1 flex-col h-auto py-2 px-1 relative",
                  isActive && "text-primary"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <div className="relative">
                  <Icon className={cn(
                    "h-5 w-5 mb-1",
                    isActive && "text-primary"
                  )} />
                  {item.badge && item.badge > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs"
                    >
                      {item.badge > 99 ? '99+' : item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs leading-none">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-20 right-4 z-50">
        <div className="flex flex-col gap-2">
          <Button
            size="sm"
            variant="outline"
            className="h-12 w-12 rounded-full shadow-lg glass"
            onClick={handleQuickAction}
          >
            <QrCode className="h-5 w-5" />
          </Button>
          <Button
            size="sm"
            className="h-14 w-14 rounded-full shadow-lg gradient-primary"
            onClick={() => handleNavigation('/mobile/create')}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  );
};