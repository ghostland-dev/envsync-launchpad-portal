import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  WifiOff,
  PlayCircle,
  PauseCircle,
  MoreHorizontal
} from 'lucide-react';
import type { Environment } from '../SyncDashboard';

interface SyncStatusDashboardProps {
  environments: Environment[];
  onManualSync: (environmentId: string) => void;
  isOnline: boolean;
}

export const SyncStatusDashboard: React.FC<SyncStatusDashboardProps> = ({
  environments,
  onManualSync,
  isOnline
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'syncing':
        return <RefreshCw className="h-5 w-5 text-blue-600 animate-spin" />;
      case 'conflict':
        return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'offline':
        return <WifiOff className="h-5 w-5 text-gray-600" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'synced':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'syncing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'conflict':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'offline':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Environment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {environments.map((env) => (
          <Card key={env.id} className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(env.status.status)}
                  <CardTitle className="text-lg">{env.name}</CardTitle>
                </div>
                <Badge variant="outline" className="text-xs">
                  {env.type}
                </Badge>
              </div>
              <CardDescription className="flex items-center justify-between">
                <span>{env.version}</span>
                <span className="text-xs">{formatTimeAgo(env.lastModified)}</span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <Badge className={`${getStatusColor(env.status.status)} capitalize`}>
                  {env.status.status}
                </Badge>
                {env.status.status === 'syncing' && (
                  <span className="text-xs text-muted-foreground">
                    {env.status.progress}%
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              {env.status.status === 'syncing' && (
                <div className="space-y-2">
                  <Progress value={env.status.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Synchronizing changes...
                  </p>
                </div>
              )}

              {/* Status Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Sync:</span>
                  <span>{formatTimeAgo(env.status.lastSync)}</span>
                </div>
                
                {env.status.conflicts > 0 && (
                  <div className="flex justify-between text-amber-600">
                    <span>Conflicts:</span>
                    <span>{env.status.conflicts}</span>
                  </div>
                )}
                
                {env.status.pendingChanges > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Pending:</span>
                    <span>{env.status.pendingChanges} changes</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onManualSync(env.id)}
                  disabled={env.status.status === 'syncing' || !isOnline}
                  className="flex-1 gap-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  Sync
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>

            {/* Status Animation Overlay */}
            {env.status.status === 'syncing' && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent animate-pulse pointer-events-none" />
            )}
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>
            Manage synchronization across all environments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="gap-2">
              <PlayCircle className="h-4 w-4" />
              Start All
            </Button>
            <Button variant="outline" className="gap-2">
              <PauseCircle className="h-4 w-4" />
              Pause All
            </Button>
            <Button variant="outline" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Resolve Conflicts
            </Button>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Force Sync
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Live Activity</CardTitle>
          <CardDescription>
            Real-time sync events and status updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Production sync completed</p>
                <p className="text-xs text-muted-foreground">3 files updated, 0 conflicts</p>
              </div>
              <span className="text-xs text-muted-foreground">2m ago</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
              <div className="flex-1">
                <p className="text-sm font-medium">Staging sync in progress</p>
                <p className="text-xs text-muted-foreground">Uploading configuration changes...</p>
              </div>
              <span className="text-xs text-muted-foreground">now</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Development conflicts detected</p>
                <p className="text-xs text-muted-foreground">2 files need manual resolution</p>
              </div>
              <span className="text-xs text-muted-foreground">5m ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};