import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Mail, 
  UserPlus, 
  Settings,
  Crown,
  Shield,
  User,
  Eye,
  Edit,
  Trash2,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Teams = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  // Mock data
  const [teams, setTeams] = useState([
    {
      id: '1',
      name: 'Frontend Team',
      description: 'React and TypeScript development team',
      memberCount: 8,
      environmentCount: 12,
      lead: 'Sarah Chen',
      created: '2024-01-10',
      color: 'bg-blue-500'
    },
    {
      id: '2',
      name: 'Backend Team',
      description: 'Node.js and Python API development',
      memberCount: 6,
      environmentCount: 8,
      lead: 'Mike Johnson',
      created: '2024-01-12',
      color: 'bg-green-500'
    },
    {
      id: '3',
      name: 'DevOps Team',
      description: 'Infrastructure and deployment management',
      memberCount: 4,
      environmentCount: 15,
      lead: 'Alex Rivera',
      created: '2024-01-15',
      color: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'Data Team',
      description: 'Analytics and machine learning',
      memberCount: 5,
      environmentCount: 6,
      lead: 'Emma Thompson',
      created: '2024-01-18',
      color: 'bg-orange-500'
    }
  ]);

  const [members, setMembers] = useState([
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah@techcorp.com',
      role: 'admin',
      teams: ['Frontend Team', 'DevOps Team'],
      lastActive: '2024-01-18T10:30:00Z',
      avatar: '/avatars/sarah.jpg',
      status: 'active'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike@techcorp.com',
      role: 'team_lead',
      teams: ['Backend Team'],
      lastActive: '2024-01-18T09:15:00Z',
      avatar: '/avatars/mike.jpg',
      status: 'active'
    },
    {
      id: '3',
      name: 'Alex Rivera',
      email: 'alex@techcorp.com',
      role: 'team_lead',
      teams: ['DevOps Team'],
      lastActive: '2024-01-17T16:45:00Z',
      avatar: '/avatars/alex.jpg',
      status: 'active'
    },
    {
      id: '4',
      name: 'Emma Thompson',
      email: 'emma@techcorp.com',
      role: 'team_lead',
      teams: ['Data Team'],
      lastActive: '2024-01-18T08:20:00Z',
      avatar: '/avatars/emma.jpg',
      status: 'active'
    },
    {
      id: '5',
      name: 'David Park',
      email: 'david@techcorp.com',
      role: 'member',
      teams: ['Backend Team', 'Data Team'],
      lastActive: '2024-01-18T11:00:00Z',
      avatar: '/avatars/david.jpg',
      status: 'active'
    },
    {
      id: '6',
      name: 'Lisa Wang',
      email: 'lisa@techcorp.com',
      role: 'member',
      teams: ['Frontend Team'],
      lastActive: '2024-01-16T14:30:00Z',
      avatar: '/avatars/lisa.jpg',
      status: 'inactive'
    }
  ]);

  const [newTeam, setNewTeam] = useState({
    name: '',
    description: '',
    color: 'bg-blue-500'
  });

  const [inviteData, setInviteData] = useState({
    email: '',
    role: 'member',
    teams: [],
    message: ''
  });

  const roleIcons = {
    admin: <Crown className="h-4 w-4 text-yellow-500" />,
    team_lead: <Shield className="h-4 w-4 text-blue-500" />,
    member: <User className="h-4 w-4 text-gray-500" />
  };

  const roleBadges = {
    admin: <Badge variant="destructive">Admin</Badge>,
    team_lead: <Badge variant="default">Team Lead</Badge>,
    member: <Badge variant="secondary">Member</Badge>
  };

  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const createTeam = () => {
    if (!newTeam.name.trim()) return;
    
    const team = {
      id: String(Date.now()),
      ...newTeam,
      memberCount: 0,
      environmentCount: 0,
      lead: 'Unassigned',
      created: new Date().toISOString().split('T')[0]
    };
    
    setTeams([...teams, team]);
    setNewTeam({ name: '', description: '', color: 'bg-blue-500' });
    setIsCreateTeamOpen(false);
    
    toast({
      title: "Team created",
      description: `${team.name} has been created successfully.`,
    });
  };

  const inviteUser = () => {
    if (!inviteData.email.trim()) return;
    
    // Simulate sending invitation
    toast({
      title: "Invitation sent",
      description: `Invitation has been sent to ${inviteData.email}.`,
    });
    
    setInviteData({ email: '', role: 'member', teams: [], message: '' });
    setIsInviteOpen(false);
  };

  const removeUserFromTeam = (userId: string, teamName: string) => {
    setMembers(members.map(member => 
      member.id === userId 
        ? { ...member, teams: member.teams.filter(t => t !== teamName) }
        : member
    ));
    
    toast({
      title: "User removed",
      description: "User has been removed from the team.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">
              Manage your teams and organize your organization members
            </p>
          </div>
          <div className="flex gap-3">
            <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite User
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Invite Team Member</DialogTitle>
                  <DialogDescription>
                    Send an invitation to join your organization
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="invite-email">Email Address</Label>
                    <Input
                      id="invite-email"
                      type="email"
                      placeholder="user@company.com"
                      value={inviteData.email}
                      onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="invite-role">Role</Label>
                    <Select value={inviteData.role} onValueChange={(value) => 
                      setInviteData({ ...inviteData, role: value })
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="member">Member</SelectItem>
                        <SelectItem value="team_lead">Team Lead</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invite-message">Personal Message (Optional)</Label>
                    <Textarea
                      id="invite-message"
                      placeholder="Welcome to our team..."
                      value={inviteData.message}
                      onChange={(e) => setInviteData({ ...inviteData, message: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={inviteUser} className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Invitation
                    </Button>
                    <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isCreateTeamOpen} onOpenChange={setIsCreateTeamOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Team
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Team</DialogTitle>
                  <DialogDescription>
                    Set up a new team to organize your members
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="team-name">Team Name</Label>
                    <Input
                      id="team-name"
                      placeholder="Frontend Team"
                      value={newTeam.name}
                      onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="team-description">Description</Label>
                    <Textarea
                      id="team-description"
                      placeholder="Describe what this team does..."
                      value={newTeam.description}
                      onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Team Color</Label>
                    <div className="flex gap-2">
                      {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500', 'bg-pink-500'].map((color) => (
                        <button
                          key={color}
                          className={`w-8 h-8 rounded-full ${color} border-2 ${newTeam.color === color ? 'border-foreground' : 'border-transparent'}`}
                          onClick={() => setNewTeam({ ...newTeam, color })}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={createTeam} className="flex-1">
                      Create Team
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreateTeamOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="teams" className="space-y-6">
          <TabsList>
            <TabsTrigger value="teams" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Teams
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Members
            </TabsTrigger>
          </TabsList>

          {/* Teams Tab */}
          <TabsContent value="teams" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team) => (
                <Card key={team.id} className="hover:shadow-glow transition-smooth">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${team.color} rounded-lg flex items-center justify-center`}>
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{team.name}</CardTitle>
                        <CardDescription className="text-sm">
                          Lead: {team.lead}
                        </CardDescription>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Team
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Team
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {team.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <span>{team.memberCount} members</span>
                        <span>{team.environmentCount} envs</span>
                      </div>
                      <span className="text-muted-foreground">
                        Created {team.created}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search members..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="All Roles" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="team_lead">Team Lead</SelectItem>
                        <SelectItem value="member">Member</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Members List */}
            <Card>
              <CardHeader>
                <CardTitle>Organization Members ({filteredMembers.length})</CardTitle>
                <CardDescription>
                  Manage member roles and team assignments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{member.name}</span>
                            {roleIcons[member.role]}
                            {member.status === 'inactive' && (
                              <Badge variant="outline" className="text-xs">Inactive</Badge>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {member.email}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            {roleBadges[member.role]}
                            <span className="text-xs text-muted-foreground">
                              Teams: {member.teams.join(', ') || 'None'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          Last active: {new Date(member.lastActive).toLocaleDateString()}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Role
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="h-4 w-4 mr-2" />
                              Manage Teams
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Teams;