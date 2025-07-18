import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { MobileDashboard } from '@/components/mobile/MobileDashboard';
import { NotificationCenter } from '@/components/mobile/NotificationCenter';
import { QuickActions } from '@/components/mobile/QuickActions';
import { useNotifications } from '@/hooks/useNotifications';
import { useMobile } from '@/hooks/useMobile';

const Mobile: React.FC = () => {
  const [notificationCount, setNotificationCount] = useState(3);
  const { isNativeMobile } = useMobile();
  const { sendLocalNotification } = useNotifications();

  const handleQuickAction = () => {
    console.log('Quick action triggered');
  };

  const handleCreateEnvironment = () => {
    console.log('Create environment');
    sendLocalNotification({
      title: 'Environment Creation Started',
      body: 'Your new environment is being set up...'
    });
  };

  const handleScanQR = () => {
    console.log('Scan QR code');
    // In a real app, this would open the camera for QR scanning
    sendLocalNotification({
      title: 'QR Scanner',
      body: 'Point your camera at a QR code to join an environment'
    });
  };

  const handleVoiceCommand = () => {
    console.log('Voice command');
    // In a real app, this would start voice recognition
    sendLocalNotification({
      title: 'Voice Command Active',
      body: 'Listening for your command...'
    });
  };

  const handleShareLink = () => {
    console.log('Share invite link');
    // In a real app, this would open the share dialog
    if (navigator.share) {
      navigator.share({
        title: 'Join my EnvSync team',
        text: 'Join my development team on EnvSync',
        url: 'https://envsync.app/invite/abc123'
      });
    }
  };

  return (
    <div className="mobile-app min-h-screen bg-background">
      <Routes>
        <Route path="/" element={
          <>
            <MobileHeader 
              title="Dashboard"
              onMenuClick={() => console.log('Menu clicked')}
              onSearchClick={() => console.log('Search clicked')}
            />
            <MobileDashboard />
            <MobileNavigation 
              notificationCount={notificationCount}
              onQuickAction={handleQuickAction}
            />
            <QuickActions
              onCreateEnvironment={handleCreateEnvironment}
              onScanQR={handleScanQR}
              onVoiceCommand={handleVoiceCommand}
              onShareLink={handleShareLink}
            />
          </>
        } />
        
        <Route path="/environments" element={
          <>
            <MobileHeader title="Environments" />
            <div className="p-4 pb-20">
              <p className="text-center text-muted-foreground">
                Environment management view coming soon...
              </p>
            </div>
            <MobileNavigation notificationCount={notificationCount} />
          </>
        } />
        
        <Route path="/notifications" element={
          <>
            <MobileHeader title="Notifications" />
            <NotificationCenter 
              onMarkAsRead={(id) => console.log('Mark as read:', id)}
              onMarkAllAsRead={() => setNotificationCount(0)}
              onDeleteNotification={(id) => console.log('Delete:', id)}
            />
            <MobileNavigation notificationCount={notificationCount} />
          </>
        } />
        
        <Route path="/team" element={
          <>
            <MobileHeader title="Team" />
            <div className="p-4 pb-20">
              <p className="text-center text-muted-foreground">
                Team management view coming soon...
              </p>
            </div>
            <MobileNavigation notificationCount={notificationCount} />
          </>
        } />
        
        <Route path="/settings" element={
          <>
            <MobileHeader title="Settings" />
            <div className="p-4 pb-20">
              <p className="text-center text-muted-foreground">
                Mobile settings coming soon...
              </p>
            </div>
            <MobileNavigation notificationCount={notificationCount} />
          </>
        } />
        
        <Route path="/create" element={
          <>
            <MobileHeader title="Create Environment" />
            <div className="p-4 pb-20">
              <p className="text-center text-muted-foreground">
                Mobile environment creation coming soon...
              </p>
            </div>
            <MobileNavigation notificationCount={notificationCount} />
          </>
        } />
        
        <Route path="*" element={<Navigate to="/mobile" replace />} />
      </Routes>
    </div>
  );
};

export default Mobile;