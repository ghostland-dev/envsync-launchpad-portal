import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Activity,
  Settings,
  GitBranch,
  Users,
  Bell,
  TrendingUp,
  Zap,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { SyncStatusDashboard } from './sync-dashboard/SyncStatusDashboard';
import { EnvironmentComparison } from './sync-dashboard/EnvironmentComparison';
import { SyncHistory } from './sync-dashboard/SyncHistory';
import { ConflictResolution } from './sync-dashboard/ConflictResolution';
import { SyncSettings } from './sync-dashboard/SyncSettings';
import { PerformanceMetrics } from './sync-dashboard/PerformanceMetrics';
import { TroubleshootingWizard } from './sync-dashboard/TroubleshootingWizard';
import { SyncQueue } from './sync-dashboard/SyncQueue';
import { TeamCoordination } from './sync-dashboard/TeamCoordination';
import { SyncAnalytics } from './sync-dashboard/SyncAnalytics';

export interface SyncStatus {
  status: 'synced' | 'syncing' | 'error' | 'offline' | 'conflict';
  lastSync: string;
  progress: number;
  environment: string;
  conflicts: number;
  pendingChanges: number;
}

export interface SyncEvent {
  id: string;
  timestamp: string;
  type: 'sync' | 'conflict' | 'error' | 'rollback';
  environment: string;
  description: string;
  changes: number;
  duration: number;
  status: 'success' | 'failed' | 'cancelled';
}

export interface Environment {
  id: string;
  name: string;
  type: 'local' | 'development' | 'staging' | 'production';
  lastModified: string;
  version: string;
  status: SyncStatus;
}

const mockEnvironments: Environment[] = [
  {
    id: '1',
    name: 'Production',
    type: 'production',
    lastModified: '2024-01-15 14:30:25',
    version: 'v2.1.4',
    status: {
      status: 'synced',
      lastSync: '2024-01-15 14:30:25',
      progress: 100,
      environment: 'production',
      conflicts: 0,
      pendingChanges: 0
    }
  },
  {
    id: '2',
    name: 'Staging',
    type: 'staging',
    lastModified: '2024-01-15 15:45:12',
    version: 'v2.1.5-rc1',
    status: {
      status: 'syncing',
      lastSync: '2024-01-15 15:44:30',
      progress: 65,
      environment: 'staging',
      conflicts: 0,
      pendingChanges: 3
    }
  },
  {
    id: '3',
    name: 'Development',
    type: 'development',
    lastModified: '2024-01-15 16:12:08',
    version: 'v2.2.0-dev',
    status: {
      status: 'conflict',
      lastSync: '2024-01-15 15:30:15',
      progress: 0,
      environment: 'development',
      conflicts: 2,
      pendingChanges: 7
    }
  },
  {
    id: '4',
    name: 'Local',
    type: 'local',
    lastModified: '2024-01-15 16:20:45',
    version: 'v2.2.0-local',
    status: {
      status: 'offline',
      lastSync: '2024-01-15 12:15:30',
      progress: 0,
      environment: 'local',
      conflicts: 0,
      pendingChanges: 12
    }
  }
];

export const SyncDashboard: React.FC = () => {
  const [environments, setEnvironments] = useState<Environment[]>(mockEnvironments);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [globalSyncStatus, setGlobalSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle');
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [notifications, setNotifications] = useState<number>(3);
  const { toast } = useToast();

  // Simulate network status
  useEffect(() => {
    const interval = setInterval(() => {
      const wasOnline = isOnline;
      const nowOnline = Math.random() > 0.1; // 90% chance of being online
      
      if (wasOnline !== nowOnline) {
        setIsOnline(nowOnline);
        toast({
          title: nowOnline ? "Network Connected" : "Network Disconnected",
          description: nowOnline ? "Sync functionality restored" : "Operating in offline mode",
          variant: nowOnline ? "default" : "destructive"
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isOnline, toast]);

  // Simulate sync progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEnvironments(prev => prev.map(env => {
        if (env.status.status === 'syncing' && env.status.progress < 100) {
          const newProgress = Math.min(env.status.progress + Math.random() * 15, 100);
          const newStatus = newProgress >= 100 ? 'synced' : 'syncing';
          
          if (newStatus === 'synced' && env.status.status === 'syncing') {
            toast({
              title: "Sync Complete",
              description: `${env.name} environment synchronized successfully`,
            });
          }
          
          return {
            ...env,
            status: {
              ...env.status,
              status: newStatus,
              progress: newProgress,
              lastSync: newStatus === 'synced' ? new Date().toISOString() : env.status.lastSync
            }
          };
        }
        return env;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [toast]);

  const handleManualSync = (environmentId: string) => {
    setEnvironments(prev => prev.map(env => {
      if (env.id === environmentId && env.status.status !== 'syncing') {
        return {
          ...env,
          status: {
            ...env.status,
            status: 'syncing',
            progress: 0
          }
        };
      }
      return env;
    }));

    toast({
      title: "Sync Started",
      description: "Manual synchronization initiated",
    });
  };

  const handleSyncAll = () => {
    setGlobalSyncStatus('syncing');
    setEnvironments(prev => prev.map(env => ({
      ...env,
      status: {
        ...env.status,
        status: env.status.status === 'offline' ? 'offline' : 'syncing',
        progress: env.status.status === 'offline' ? 0 : 0
      }
    })));

    toast({
      title: "Global Sync Started",
      description: "Synchronizing all environments",
    });

    setTimeout(() => setGlobalSyncStatus('idle'), 10000);
  };

  const getOverallStatus = () => {
    const hasConflicts = environments.some(env => env.status.status === 'conflict');
    const isSyncing = environments.some(env => env.status.status === 'syncing');
    const hasErrors = environments.some(env => env.status.status === 'error');
    const isOffline = !isOnline || environments.some(env => env.status.status === 'offline');

    if (hasConflicts) return { status: 'conflict', icon: AlertTriangle, color: 'text-amber-600' };
    if (hasErrors) return { status: 'error', icon: AlertTriangle, color: 'text-red-600' };
    if (isSyncing) return { status: 'syncing', icon: RefreshCw, color: 'text-blue-600' };
    if (isOffline) return { status: 'offline', icon: WifiOff, color: 'text-gray-600' };
    return { status: 'synced', icon: CheckCircle, color: 'text-green-600' };
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sync Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage environment synchronization
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Network Status */}
            <div className="flex items-center gap-2">
              {isOnline ? (
                <Wifi className="h-5 w-5 text-green-600" />
              ) : (
                <WifiOff className="h-5 w-5 text-red-600" />
              )}
              <span className="text-sm">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>

            {/* Notifications */}
            <Button variant="outline" size="sm" className="relative gap-2">
              <Bell className="h-4 w-4" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs"
                >
                  {notifications}
                </Badge>
              )}
            </Button>

            {/* Troubleshooting */}
            <Button
              variant="outline"
              onClick={() => setShowTroubleshooting(true)}
              className="gap-2"
            >
              <Shield className="h-4 w-4" />
              Troubleshoot
            </Button>
            
            {/* Sync All */}
            <Button
              onClick={handleSyncAll}
              disabled={globalSyncStatus === 'syncing' || !isOnline}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${globalSyncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              Sync All
            </Button>
          </div>
        </div>

        {/* Overall Status */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <overallStatus.icon className={`h-6 w-6 ${overallStatus.color} ${overallStatus.status === 'syncing' ? 'animate-spin' : ''}`} />
                <div>
                  <h3 className="font-semibold capitalize">{overallStatus.status}</h3>
                  <p className="text-sm text-muted-foreground">
                    {overallStatus.status === 'synced' && 'All environments synchronized'}
                    {overallStatus.status === 'syncing' && 'Synchronization in progress'}
                    {overallStatus.status === 'conflict' && 'Conflicts require attention'}
                    {overallStatus.status === 'error' && 'Sync errors detected'}
                    {overallStatus.status === 'offline' && 'Some environments offline'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>{environments.filter(e => e.status.status === 'synced').length} Synced</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-blue-600" />
                  <span>{environments.filter(e => e.status.status === 'syncing').length} Syncing</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span>{environments.filter(e => e.status.status === 'conflict').length} Conflicts</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="dashboard" className="gap-2">
              <Activity className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="comparison" className="gap-2">
              <GitBranch className="h-4 w-4" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Clock className="h-4 w-4" />
              History
            </TabsTrigger>
            <TabsTrigger value="conflicts" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Conflicts
            </TabsTrigger>
            <TabsTrigger value="queue" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Queue
            </TabsTrigger>
            <TabsTrigger value="team" className="gap-2">
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="dashboard" className="space-y-6">
              <SyncStatusDashboard 
                environments={environments}
                onManualSync={handleManualSync}
                isOnline={isOnline}
              />
              <PerformanceMetrics environments={environments} />
            </TabsContent>

            <TabsContent value="comparison" className="space-y-6">
              <EnvironmentComparison environments={environments} />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <SyncHistory />
            </TabsContent>

            <TabsContent value="conflicts" className="space-y-6">
              <ConflictResolution 
                environments={environments.filter(env => env.status.status === 'conflict')}
              />
            </TabsContent>

            <TabsContent value="queue" className="space-y-6">
              <SyncQueue environments={environments} />
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <TeamCoordination />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <SyncAnalytics />
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <SyncSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Troubleshooting Wizard */}
      {showTroubleshooting && (
        <TroubleshootingWizard 
          onClose={() => setShowTroubleshooting(false)}
          environments={environments}
        />
      )}
    </div>
  );
};