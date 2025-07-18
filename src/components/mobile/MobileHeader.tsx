import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Menu, 
  Search, 
  Wifi, 
  WifiOff,
  Battery,
  Signal
} from 'lucide-react';
import { useMobile } from '@/hooks/useMobile';
import { useHaptics } from '@/hooks/useHaptics';

interface MobileHeaderProps {
  title?: string;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title = 'EnvSync',
  onMenuClick,
  onSearchClick,
  showBackButton = false,
  onBackClick
}) => {
  const { isOnline, isNativeMobile, deviceInfo } = useMobile();
  const { impact } = useHaptics();

  const handleMenuClick = async () => {
    await impact();
    onMenuClick?.();
  };

  const handleSearchClick = async () => {
    await impact();
    onSearchClick?.();
  };

  const handleBackClick = async () => {
    await impact();
    onBackClick?.();
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 safe-area-pt">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          {showBackButton ? (
            <Button variant="ghost" size="sm" onClick={handleBackClick}>
              <Menu className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>

        {/* Center - Title */}
        <div className="flex items-center gap-2">
          <h1 className="font-semibold text-lg">{title}</h1>
          {!isOnline && (
            <Badge variant="destructive" className="text-xs">
              Offline
            </Badge>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1">
          {/* Connection Status */}
          <div className="flex items-center gap-1">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-success" />
            ) : (
              <WifiOff className="h-4 w-4 text-destructive" />
            )}
            {isNativeMobile && (
              <>
                <Signal className="h-4 w-4 text-muted-foreground" />
                <Battery className="h-4 w-4 text-muted-foreground" />
              </>
            )}
          </div>

          <Button variant="ghost" size="sm" onClick={handleSearchClick}>
            <Search className="h-4 w-4" />
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};