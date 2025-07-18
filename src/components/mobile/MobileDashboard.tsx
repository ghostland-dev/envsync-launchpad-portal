import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Server, 
  Users, 
  AlertCircle, 
  Play, 
  Square, 
  RotateCcw,
  Bell,
  Wifi,
  WifiOff
} from 'lucide-react';
import { useMobile } from '@/hooks/useMobile';
import { useHaptics } from '@/hooks/useHaptics';

interface Environment {
  id: string;
  name: string;
  status: 'running' | 'stopped' | 'error' | 'starting';
  cpu: number;
  memory: number;
  uptime: string;
}

interface MobileDashboardProps {
  environments?: Environment[];
  teamMembers?: number;
  notifications?: number;
}

export const MobileDashboard: React.FC<MobileDashboardProps> = ({
  environments = [
    { id: '1', name: 'Production', status: 'running', cpu: 65, memory: 78, uptime: '5d 12h' },
    { id: '2', name: 'Staging', status: 'running', cpu: 32, memory: 45, uptime: '2d 8h' },
    { id: '3', name: 'Development', status: 'stopped', cpu: 0, memory: 0, uptime: '0h' },
  ],
  teamMembers = 12,
  notifications = 3
}) => {
  const { isOnline, isNativeMobile, deviceInfo } = useMobile();
  const { impact, notification } = useHaptics();

  const handleEnvironmentAction = async (action: string, envId: string) => {
    await impact();
    await notification();
    console.log(`${action} environment ${envId}`);
    // Implement actual environment control logic here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-success text-success-foreground';
      case 'stopped': return 'bg-muted text-muted-foreground';
      case 'error': return 'bg-destructive text-destructive-foreground';
      case 'starting': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Activity className="h-3 w-3" />;
      case 'stopped': return <Square className="h-3 w-3" />;
      case 'error': return <AlertCircle className="h-3 w-3" />;
      case 'starting': return <RotateCcw className="h-3 w-3 animate-spin" />;
      default: return <Server className="h-3 w-3" />;
    }
  };

  return (
    <div className="mobile-dashboard space-y-4 p-4 pb-20">
      {/* Connection Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-4 w-4 text-success" />
          ) : (
            <WifiOff className="h-4 w-4 text-destructive" />
          )}
          <span className="text-sm text-muted-foreground">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
        {isNativeMobile && (
          <Badge variant="outline" className="text-xs">
            {deviceInfo?.platform}
          </Badge>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{environments.length}</p>
                <p className="text-xs text-muted-foreground">Environments</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{teamMembers}</p>
                <p className="text-xs text-muted-foreground">Team Members</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Alert */}
      {notifications > 0 && (
        <Card className="glass border-warning/50 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">
                {notifications} new notification{notifications > 1 ? 's' : ''}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Environment Cards */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">Environments</h3>
        {environments.map((env) => (
          <Card key={env.id} className="glass">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  {getStatusIcon(env.status)}
                  {env.name}
                </CardTitle>
                <Badge className={getStatusColor(env.status)}>
                  {env.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Resource Usage */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span>{env.cpu}%</span>
                </div>
                <Progress value={env.cpu} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Memory</span>
                  <span>{env.memory}%</span>
                </div>
                <Progress value={env.memory} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Uptime</span>
                  <span>{env.uptime}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8"
                  onClick={() => handleEnvironmentAction('start', env.id)}
                  disabled={env.status === 'running'}
                >
                  <Play className="h-3 w-3 mr-1" />
                  Start
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8"
                  onClick={() => handleEnvironmentAction('stop', env.id)}
                  disabled={env.status === 'stopped'}
                >
                  <Square className="h-3 w-3 mr-1" />
                  Stop
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 h-8"
                  onClick={() => handleEnvironmentAction('restart', env.id)}
                  disabled={env.status === 'stopped'}
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Restart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};