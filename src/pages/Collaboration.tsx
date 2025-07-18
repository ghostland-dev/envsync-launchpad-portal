import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Shield, 
  Clock, 
  TrendingUp, 
  GitBranch, 
  MessageSquare, 
  CheckCircle,
  Settings,
  BarChart3,
  UserCheck,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { CollaborativeEditor } from '@/components/collaboration/CollaborativeEditor';
import { EnvironmentBranching } from '@/components/collaboration/EnvironmentBranching';
import { ApprovalWorkflows } from '@/components/collaboration/ApprovalWorkflows';
import { GitIntegration } from '@/components/collaboration/GitIntegration';
import { useToast } from '@/hooks/use-toast';

const PermissionsPanel = () => {
  const { toast } = useToast();
  const [roles, setRoles] = useState([
    { id: '1', name: 'Admin', users: 2, permissions: ['read', 'write', 'delete', 'admin'], color: 'red' },
    { id: '2', name: 'Developer', users: 8, permissions: ['read', 'write'], color: 'blue' },
    { id: '3', name: 'Viewer', users: 15, permissions: ['read'], color: 'green' },
  ]);

  const users = [
    { id: '1', name: 'Sarah Chen', email: 'sarah@company.com', role: 'Admin', status: 'active' },
    { id: '2', name: 'Mike Johnson', email: 'mike@company.com', role: 'Developer', status: 'active' },
    { id: '3', name: 'Lisa Wang', email: 'lisa@company.com', role: 'Developer', status: 'pending' },
    { id: '4', name: 'Tom Davis', email: 'tom@company.com', role: 'Viewer', status: 'active' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Permissions & Access Control</h2>
          <p className="text-muted-foreground">Manage team roles and environment access</p>
        </div>
        <Button>
          <UserCheck className="h-4 w-4 mr-2" />
          Invite User
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Roles */}
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Role Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {roles.map((role) => (
              <div key={role.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-${role.color}-500`} />
                  <div>
                    <h4 className="font-medium">{role.name}</h4>
                    <p className="text-sm text-muted-foreground">{role.users} users</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Create Custom Role
            </Button>
          </CardContent>
        </Card>

        {/* User Access */}
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Access</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/avatars/${user.id}.jpg`} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <Select defaultValue={user.role.toLowerCase()}>
                    <SelectTrigger className="w-24 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Permission Matrix */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
          <CardDescription>Detailed permissions for each role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Action</th>
                  <th className="text-center p-2">Admin</th>
                  <th className="text-center p-2">Developer</th>
                  <th className="text-center p-2">Viewer</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {[
                  'View Environments',
                  'Create Environments',
                  'Edit Variables',
                  'Delete Environments',
                  'Manage Team',
                  'Access Logs'
                ].map((action, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{action}</td>
                    <td className="text-center p-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center p-2">
                      <CheckCircle className={`h-4 w-4 mx-auto ${
                        ['View Environments', 'Create Environments', 'Edit Variables'].includes(action) 
                          ? 'text-green-500' : 'text-gray-300'
                      }`} />
                    </td>
                    <td className="text-center p-2">
                      <CheckCircle className={`h-4 w-4 mx-auto ${
                        action === 'View Environments' ? 'text-green-500' : 'text-gray-300'
                      }`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CollaborationAnalytics = () => {
  const metrics = [
    { label: 'Active Collaborators', value: '24', change: '+12%', trend: 'up' },
    { label: 'Environments Shared', value: '45', change: '+8%', trend: 'up' },
    { label: 'Sync Conflicts', value: '3', change: '-25%', trend: 'down' },
    { label: 'Approval Time', value: '2.3h', change: '-15%', trend: 'down' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Collaboration Analytics</h2>
        <p className="text-muted-foreground">Team productivity and collaboration insights</p>
      </div>

      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="glass border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className={`flex items-center text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`h-3 w-3 mr-1 ${
                      metric.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    {metric.change}
                  </div>
                </div>
                <div className="w-12 h-12 bg-gradient-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Timeline */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle>Recent Collaboration Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Environment shared', user: 'Sarah Chen', target: 'production-api', time: '2 hours ago', type: 'share' },
              { action: 'Variables updated', user: 'Mike Johnson', target: 'staging-frontend', time: '4 hours ago', type: 'update' },
              { action: 'Branch merged', user: 'Lisa Wang', target: 'development', time: '1 day ago', type: 'merge' },
              { action: 'Access granted', user: 'Tom Davis', target: 'testing-env', time: '2 days ago', type: 'access' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="w-10 h-10 bg-gradient-primary/10 rounded-full flex items-center justify-center">
                  {activity.type === 'share' && <Users className="h-4 w-4 text-primary" />}
                  {activity.type === 'update' && <Edit className="h-4 w-4 text-primary" />}
                  {activity.type === 'merge' && <GitBranch className="h-4 w-4 text-primary" />}
                  {activity.type === 'access' && <Eye className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{activity.user}</span>
                    <span className="text-muted-foreground">{activity.action}</span>
                    <Badge variant="outline">{activity.target}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Performance */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Sarah Chen', contributions: 45, avatar: '1' },
                { name: 'Mike Johnson', contributions: 38, avatar: '2' },
                { name: 'Lisa Wang', contributions: 32, avatar: '3' },
                { name: 'Tom Davis', contributions: 28, avatar: '4' }
              ].map((contributor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`/avatars/${contributor.avatar}.jpg`} />
                      <AvatarFallback>{contributor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{contributor.name}</span>
                  </div>
                  <Badge>{contributor.contributions} changes</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle>Collaboration Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Team Communication</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Excellent</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Conflict Resolution</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-sm">Good</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Knowledge Sharing</span>
                <div className="flex items-center space-x-2">
                  <div className="w-18 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">Great</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Collaboration: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="editor">Live Editor</TabsTrigger>
          <TabsTrigger value="branching">Branching</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="git">Git Integration</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <CollaborativeEditor />
        </TabsContent>

        <TabsContent value="branching">
          <EnvironmentBranching />
        </TabsContent>

        <TabsContent value="approvals">
          <ApprovalWorkflows />
        </TabsContent>

        <TabsContent value="git">
          <GitIntegration />
        </TabsContent>

        <TabsContent value="permissions">
          <PermissionsPanel />
        </TabsContent>

        <TabsContent value="analytics">
          <CollaborationAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Collaboration;