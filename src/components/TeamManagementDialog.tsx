import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Mail, 
  Plus, 
  Shield, 
  Clock, 
  GitBranch,
  Activity,
  Settings,
  UserPlus,
  Crown,
  Trash2,
  Copy,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'owner' | 'admin' | 'developer' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
  joinedAt: string;
  lastActive: string;
  environments: number;
}

interface TeamInvite {
  id: string;
  email: string;
  role: 'admin' | 'developer' | 'viewer';
  invitedBy: string;
  invitedAt: string;
  expiresAt: string;
}

interface TeamManagementDialogProps {
  open: boolean;
  onClose: () => void;
}

export const TeamManagementDialog: React.FC<TeamManagementDialogProps> = ({ open, onClose }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('members');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'admin' | 'developer' | 'viewer'>('developer');
  const [isInviting, setIsInviting] = useState(false);
  const [copied, setCopied] = useState(false);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@techcorp.com',
      avatar: '/api/placeholder/32/32',
      role: 'owner',
      status: 'active',
      joinedAt: '2023-01-15',
      lastActive: '2 minutes ago',
      environments: 12
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike@techcorp.com',
      avatar: '/api/placeholder/32/32',
      role: 'admin',
      status: 'active',
      joinedAt: '2023-02-01',
      lastActive: '1 hour ago',
      environments: 8
    },
    {
      id: '3',
      name: 'Alex Rivera',
      email: 'alex@techcorp.com',
      avatar: '/api/placeholder/32/32',
      role: 'developer',
      status: 'active',
      joinedAt: '2023-03-10',
      lastActive: '3 hours ago',
      environments: 5
    },
    {
      id: '4',
      name: 'Emma Thompson',
      email: 'emma@contractor.com',
      avatar: '/api/placeholder/32/32',
      role: 'developer',
      status: 'pending',
      joinedAt: '2024-01-15',
      lastActive: 'Never',
      environments: 0
    }
  ]);

  const [pendingInvites, setPendingInvites] = useState<TeamInvite[]>([
    {
      id: '1',
      email: 'david@techcorp.com',
      role: 'developer',
      invitedBy: 'Sarah Chen',
      invitedAt: '2024-01-18',
      expiresAt: '2024-01-25'
    },
    {
      id: '2',
      email: 'lisa@techcorp.com',
      role: 'admin',
      invitedBy: 'Mike Johnson',
      invitedAt: '2024-01-17',
      expiresAt: '2024-01-24'
    }
  ]);

  const handleInviteMember = async () => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsInviting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newInvite: TeamInvite = {
      id: Date.now().toString(),
      email: inviteEmail,
      role: inviteRole,
      invitedBy: 'Sarah Chen',
      invitedAt: new Date().toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setPendingInvites(prev => [...prev, newInvite]);
    setInviteEmail('');
    setIsInviting(false);

    toast({
      title: "Invitation sent",
      description: `Invitation sent to ${inviteEmail} as ${inviteRole}.`,
    });
  };

  const handleRemoveMember = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    setTeamMembers(prev => prev.filter(m => m.id !== memberId));
    
    toast({
      title: "Member removed",
      description: `${member?.name} has been removed from the team.`,
    });
  };

  const handleCancelInvite = (inviteId: string) => {
    const invite = pendingInvites.find(i => i.id === inviteId);
    setPendingInvites(prev => prev.filter(i => i.id !== inviteId));
    
    toast({
      title: "Invitation cancelled",
      description: `Invitation to ${invite?.email} has been cancelled.`,
    });
  };

  const copyInviteLink = async () => {
    const inviteLink = `https://app.envsync.dev/invite/abc123xyz789`;
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Link copied",
      description: "Invite link copied to clipboard.",
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner': return <Crown className="h-4 w-4 text-yellow-600" />;
      case 'admin': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'developer': return <GitBranch className="h-4 w-4 text-green-600" />;
      case 'viewer': return <Users className="h-4 w-4 text-gray-600" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'admin': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'developer': return 'bg-green-100 text-green-800 border-green-200';
      case 'viewer': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-muted';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-muted';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Management
          </DialogTitle>
          <DialogDescription>
            Manage your team members, permissions, and invitations
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="invites">Invitations</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            {/* Team Overview */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-muted-foreground">Total Members</span>
                  </div>
                  <div className="text-2xl font-bold">{teamMembers.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-muted-foreground">Active Now</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {teamMembers.filter(m => m.status === 'active').length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-muted-foreground">Pending</span>
                  </div>
                  <div className="text-2xl font-bold">
                    {teamMembers.filter(m => m.status === 'pending').length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Members List */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{member.name}</span>
                            <Badge className={getRoleColor(member.role)}>
                              {getRoleIcon(member.role)}
                              {member.role}
                            </Badge>
                            <Badge className={getStatusColor(member.status)}>
                              {member.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {member.email} • {member.environments} environments • Last active: {member.lastActive}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {member.role !== 'owner' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invitations Tab */}
          <TabsContent value="invites" className="space-y-6">
            {/* Invite New Member */}
            <Card>
              <CardHeader>
                <CardTitle>Invite New Member</CardTitle>
                <CardDescription>
                  Send an invitation to add a new team member
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invite-email">Email Address</Label>
                    <Input
                      id="invite-email"
                      type="email"
                      placeholder="colleague@company.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invite-role">Role</Label>
                    <select 
                      className="w-full px-3 py-2 border rounded-md"
                      value={inviteRole}
                      onChange={(e) => setInviteRole(e.target.value as any)}
                    >
                      <option value="viewer">Viewer</option>
                      <option value="developer">Developer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={handleInviteMember} disabled={isInviting} className="w-full">
                      {isInviting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Invite
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Or share invite link</span>
                  <Button variant="outline" size="sm" onClick={copyInviteLink}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pending Invitations */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Invitations</CardTitle>
                <CardDescription>
                  Invitations that haven't been accepted yet
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingInvites.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No pending invitations</h3>
                    <p className="text-muted-foreground">All invitations have been accepted or expired</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pendingInvites.map((invite) => (
                      <div key={invite.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{invite.email}</span>
                            <Badge className={getRoleColor(invite.role)}>
                              {getRoleIcon(invite.role)}
                              {invite.role}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Invited by {invite.invitedBy} on {invite.invitedAt} • Expires {invite.expiresAt}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelInvite(invite.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Permissions</CardTitle>
                <CardDescription>
                  Understanding what each role can do in your team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      role: 'owner',
                      name: 'Owner',
                      description: 'Full access to everything including billing and team management',
                      permissions: ['All Admin permissions', 'Manage billing', 'Delete organization', 'Transfer ownership']
                    },
                    {
                      role: 'admin',
                      name: 'Admin',
                      description: 'Can manage team members and all environments',
                      permissions: ['Manage team members', 'All Developer permissions', 'Organization settings', 'Access controls']
                    },
                    {
                      role: 'developer',
                      name: 'Developer',
                      description: 'Can create and manage environments they have access to',
                      permissions: ['Create environments', 'Edit assigned environments', 'View team environments', 'Deploy environments']
                    },
                    {
                      role: 'viewer',
                      name: 'Viewer',
                      description: 'Read-only access to environments',
                      permissions: ['View environments', 'View deployment logs', 'Download configurations', 'Comment on environments']
                    }
                  ].map((roleInfo) => (
                    <div key={roleInfo.role} className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        {getRoleIcon(roleInfo.role)}
                        <span className="font-medium">{roleInfo.name}</span>
                        <Badge className={getRoleColor(roleInfo.role)}>{roleInfo.role}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{roleInfo.description}</p>
                      <div className="space-y-1">
                        {roleInfo.permissions.map((permission, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <Check className="h-3 w-3 text-green-600" />
                            {permission}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Team Settings</CardTitle>
                <CardDescription>
                  Configure team-wide settings and policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Require approval for new environments</Label>
                      <p className="text-xs text-muted-foreground">New environments need admin approval before deployment</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Allow environment sharing</Label>
                      <p className="text-xs text-muted-foreground">Team members can share environments with external users</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Audit log retention</Label>
                      <p className="text-xs text-muted-foreground">How long to keep team activity logs</p>
                    </div>
                    <select className="px-3 py-1 border rounded text-sm">
                      <option>30 days</option>
                      <option>90 days</option>
                      <option>1 year</option>
                    </select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium text-destructive">Danger Zone</h4>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Delete Team</span>
                        <p className="text-sm text-muted-foreground">
                          Permanently delete this team and all its environments
                        </p>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete Team
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};