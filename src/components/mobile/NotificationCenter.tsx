import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Server,
  Users,
  Settings,
  Trash2
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { useHaptics } from '@/hooks/useHaptics';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'sync' | 'team' | 'system' | 'environment';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  actionUrl?: string;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDeleteNotification?: (id: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications = [
    {
      id: '1',
      type: 'environment',
      title: 'Environment Sync Complete',
      message: 'Production environment has been successfully synced with latest changes.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      priority: 'medium'
    },
    {
      id: '2',
      type: 'team',
      title: 'New Team Member',
      message: 'Sarah Johnson has joined your team workspace.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      priority: 'low'
    },
    {
      id: '3',
      type: 'system',
      title: 'Maintenance Scheduled',
      message: 'System maintenance is scheduled for tonight at 2 AM UTC.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      priority: 'high'
    }
  ],
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification
}) => {
  const { sendLocalNotification, permissionGranted } = useNotifications();
  const { impact, notification } = useHaptics();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'environment': return <Server className="h-4 w-4" />;
      case 'team': return <Users className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      case 'sync': return <CheckCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const handleMarkAsRead = async (id: string) => {
    await impact();
    onMarkAsRead?.(id);
  };

  const handleMarkAllAsRead = async () => {
    await impact();
    await notification();
    onMarkAllAsRead?.();
  };

  const handleDeleteNotification = async (id: string) => {
    await impact();
    onDeleteNotification?.(id);
  };

  const testNotification = async () => {
    await sendLocalNotification({
      title: 'Test Notification',
      body: 'This is a test notification from EnvSync mobile app!',
      data: { test: true }
    });
  };

  return (
    <div className="space-y-4 p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount}</Badge>
          )}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            Mark All Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          All ({notifications.length})
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </Button>
      </div>

      {/* Permission Status */}
      {!permissionGranted && (
        <Card className="glass border-warning/50 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Enable Notifications</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Grant notification permissions to receive real-time updates about your environments.
            </p>
            <Button size="sm" variant="outline" onClick={testNotification}>
              Test Notification
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Notifications List */}
      <ScrollArea className="h-[calc(100vh-280px)]">
        <div className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <Card className="glass">
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">No notifications</h3>
                <p className="text-sm text-muted-foreground">
                  {filter === 'unread' 
                    ? "You're all caught up! No unread notifications."
                    : "You'll see notifications here when they arrive."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notif) => (
              <Card 
                key={notif.id} 
                className={`glass cursor-pointer transition-colors ${
                  !notif.read ? 'border-primary/50 bg-primary/5' : ''
                }`}
                onClick={() => !notif.read && handleMarkAsRead(notif.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${getPriorityColor(notif.priority)}`}>
                      {getNotificationIcon(notif.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`text-sm font-medium ${
                          !notif.read ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {notif.title}
                        </h4>
                        <div className="flex items-center gap-1">
                          {!notif.read && (
                            <div className="h-2 w-2 bg-primary rounded-full" />
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteNotification(notif.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {notif.message}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(notif.timestamp, { addSuffix: true })}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {notif.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};