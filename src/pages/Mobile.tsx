import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Server, 
  Users, 
  Settings as SettingsIcon, 
  Plus, 
  Play, 
  Pause, 
  MoreVertical,
  Bell,
  User,
  Lock,
  Globe,
  Smartphone
} from 'lucide-react';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { MobileDashboard } from '@/components/mobile/MobileDashboard';
import { NotificationCenter } from '@/components/mobile/NotificationCenter';
import { QuickActions } from '@/components/mobile/QuickActions';
import { useNotifications } from '@/hooks/useNotifications';
import { useMobile } from '@/hooks/useMobile';

// Mobile Components
const MobileEnvironments = () => (
  <div className="p-4 pb-20 space-y-4">
    {[1, 2, 3].map((env) => (
      <Card key={env} className="glass border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Environment {env}</h3>
            <Badge variant={env === 1 ? "default" : "secondary"}>
              {env === 1 ? "Active" : "Synced"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            React app with Node.js backend
          </p>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <Play className="h-3 w-3 mr-1" />
              Start
            </Button>
            <Button size="sm" variant="ghost">
              <MoreVertical className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const MobileTeam = () => (
  <div className="p-4 pb-20 space-y-4">
    {[
      { name: "Sarah Chen", role: "Lead Developer", status: "online" },
      { name: "Mike Johnson", role: "DevOps Engineer", status: "away" },
      { name: "Lisa Wang", role: "Frontend Developer", status: "offline" }
    ].map((member, index) => (
      <Card key={index} className="glass border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
            <div className={`w-3 h-3 rounded-full ${
              member.status === 'online' ? 'bg-green-500' :
              member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
            }`} />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const MobileSettings = () => (
  <div className="p-4 pb-20 space-y-4">
    <Card className="glass border-0 shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">Account</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Push Notifications</span>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Dark Mode</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Offline Mode</span>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
    
    <Card className="glass border-0 shadow-card">
      <CardHeader>
        <CardTitle className="text-lg">Privacy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm">Share Usage Data</span>
          <Switch />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Biometric Lock</span>
          <Switch defaultChecked />
        </div>
      </CardContent>
    </Card>
  </div>
);

const MobileCreateEnvironment = () => {
  const [envName, setEnvName] = useState('');
  const [envDescription, setEnvDescription] = useState('');
  
  return (
    <div className="p-4 pb-20 space-y-4">
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Quick Setup</CardTitle>
          <CardDescription>Create a new environment on the go</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Environment Name</label>
            <Input 
              placeholder="My Mobile Environment"
              value={envName}
              onChange={(e) => setEnvName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea 
              placeholder="What's this environment for?"
              value={envDescription}
              onChange={(e) => setEnvDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-6">
            <Button variant="outline" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              Template
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Recent Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {['React + Node.js', 'Python Flask', 'Next.js App'].map((template) => (
            <div key={template} className="flex items-center justify-between p-3 border rounded-lg">
              <span className="font-medium">{template}</span>
              <Button size="sm" variant="ghost">Use</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

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
            <MobileEnvironments />
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
            <MobileTeam />
            <MobileNavigation notificationCount={notificationCount} />
          </>
        } />
        
        <Route path="/settings" element={
          <>
            <MobileHeader title="Settings" />
            <MobileSettings />
            <MobileNavigation notificationCount={notificationCount} />
          </>
        } />
        
        <Route path="/create" element={
          <>
            <MobileHeader title="Create Environment" />
            <MobileCreateEnvironment />
            <MobileNavigation notificationCount={notificationCount} />
          </>
        } />
        
        <Route path="*" element={<Navigate to="/mobile" replace />} />
      </Routes>
    </div>
  );
};

export default Mobile;