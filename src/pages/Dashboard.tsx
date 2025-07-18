import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Zap, 
  Search,
  Plus,
  GitBranch,
  Users,
  Settings,
  Home,
  Layers,
  FileText,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
  User,
  LogOut,
  MoreHorizontal,
  Play,
  Pause,
  RotateCcw,
  Edit,
  Trash2,
  ExternalLink
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeEnv, setActiveEnv] = useState<string | null>(null);

  // Mock data for environments
  const environments = [
    {
      id: '1',
      name: 'E-commerce Frontend',
      description: 'React + TypeScript storefront',
      status: 'synced' as const,
      techStack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
      lastSync: '2 minutes ago',
      teamMembers: ['Sarah Chen', 'Mike Johnson', 'Alex Rivera'],
      team: 'Frontend Team',
      branch: 'main',
      uptime: '99.8%',
      isActive: true
    },
    {
      id: '2', 
      name: 'API Gateway',
      description: 'Node.js microservices backend',
      status: 'syncing' as const,
      techStack: ['Node.js', 'Express', 'MongoDB', 'Docker'],
      lastSync: 'Syncing now...',
      teamMembers: ['David Park', 'Lisa Wang'],
      team: 'Backend Team',
      branch: 'develop',
      uptime: '99.9%',
      isActive: true
    },
    {
      id: '3',
      name: 'Analytics Dashboard',
      description: 'Python data processing pipeline',
      status: 'error' as const,
      techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'],
      lastSync: '1 hour ago',
      teamMembers: ['Emma Thompson', 'James Wilson'],
      team: 'Data Team',
      branch: 'feature/analytics',
      uptime: '98.5%',
      isActive: false,
      error: 'Database connection failed'
    },
    {
      id: '4',
      name: 'Mobile App Backend',
      description: 'Flutter + Firebase setup',
      status: 'synced' as const,
      techStack: ['Flutter', 'Dart', 'Firebase', 'GCP'],
      lastSync: '15 minutes ago',
      teamMembers: ['Carlos Rodriguez', 'Nina Patel'],
      team: 'Mobile Team',
      branch: 'main',
      uptime: '99.7%',
      isActive: true
    },
    {
      id: '5',
      name: 'DevOps Pipeline',
      description: 'CI/CD infrastructure setup',
      status: 'synced' as const,
      techStack: ['Kubernetes', 'Terraform', 'Jenkins', 'AWS'],
      lastSync: '5 minutes ago',
      teamMembers: ['Tom Anderson', 'Rachel Green', 'Steve Rogers'],
      team: 'DevOps Team',
      branch: 'infrastructure',
      uptime: '100%',
      isActive: true
    },
    {
      id: '6',
      name: 'ML Training Environment',
      description: 'Machine learning model training',
      status: 'inactive' as const,
      techStack: ['Python', 'TensorFlow', 'Jupyter', 'CUDA'],
      lastSync: '2 days ago',
      teamMembers: ['Alice Cooper'],
      team: 'ML Team',
      branch: 'main',
      uptime: '95.2%',
      isActive: false
    }
  ];

  // Mock activity data
  const recentActivity = [
    {
      id: '1',
      action: 'Environment synced',
      environment: 'E-commerce Frontend',
      user: 'Sarah Chen',
      time: '2 minutes ago',
      status: 'success' as const
    },
    {
      id: '2',
      action: 'New team member added',
      environment: 'API Gateway',
      user: 'Mike Johnson',
      time: '15 minutes ago',
      status: 'info' as const
    },
    {
      id: '3',
      action: 'Sync failed',
      environment: 'Analytics Dashboard',
      user: 'System',
      time: '1 hour ago',
      status: 'error' as const
    },
    {
      id: '4',
      action: 'Template created',
      environment: 'Mobile App Backend',
      user: 'Carlos Rodriguez',
      time: '2 hours ago',
      status: 'success' as const
    }
  ];

  const filteredEnvironments = environments.filter(env => {
    const matchesSearch = env.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         env.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || env.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'synced': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'syncing': return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'inactive': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      synced: 'bg-green-500/10 text-green-500 border-green-500/20',
      syncing: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      error: 'bg-red-500/10 text-red-500 border-red-500/20',
      inactive: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
    };
    
    return (
      <Badge variant="outline" className={variants[status as keyof typeof variants]}>
        {getStatusIcon(status)}
        <span className="ml-1 capitalize">{status}</span>
      </Badge>
    );
  };

  const getTechStackIcon = (tech: string) => {
    const iconColor = "h-4 w-4";
    // In a real app, you'd use actual tech stack icons
    return <div className={`${iconColor} bg-gradient-primary rounded-sm flex items-center justify-center text-white text-xs font-bold`}>
      {tech.charAt(0)}
    </div>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Search Bar */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search environments, teams, or templates..."
              className="pl-10 glass border-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Sarah! Here's what's happening with your environments.</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="glass border-muted">
                <GitBranch className="mr-2 h-4 w-4" />
                Import from Git
              </Button>
              <Button variant="outline" className="glass border-muted">
                <Users className="mr-2 h-4 w-4" />
                Join Team
              </Button>
              <Button 
                className="bg-gradient-primary hover:opacity-90"
                onClick={() => navigate('/wizard')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Environment
              </Button>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Environments</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">+1 from last week</p>
              </CardContent>
            </Card>
            
            <Card className="glass border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Synced Today</CardTitle>
                <Loader2 className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+3 from yesterday</p>
              </CardContent>
            </Card>
            
            <Card className="glass border-0 shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Issues</CardTitle>
                <XCircle className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">-2 from last week</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Environments List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] glass border-muted">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="glass border-muted">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="synced">Synced</SelectItem>
                    <SelectItem value="syncing">Syncing</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-sm text-muted-foreground">
                  {filteredEnvironments.length} of {environments.length} environments
                </div>
              </div>

              {/* Environment Cards */}
              <div className="space-y-4">
                {filteredEnvironments.length === 0 ? (
                  <Card className="glass border-0 shadow-card p-8 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gradient-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <Layers className="h-8 w-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">No environments found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or filters</p>
                      </div>
                      <Button 
                        className="bg-gradient-primary hover:opacity-90"
                        onClick={() => navigate('/wizard')}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Environment
                      </Button>
                    </div>
                  </Card>
                ) : (
                  filteredEnvironments.map((env) => (
                    <Card key={env.id} className="glass border-0 shadow-card hover:shadow-glow transition-smooth">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="space-y-1">
                              <CardTitle className="text-lg">{env.name}</CardTitle>
                              <CardDescription>{env.description}</CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(env.status)}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="glass border-muted">
                                <DropdownMenuItem>
                                  <Play className="mr-2 h-4 w-4" />
                                  Start Sync
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Tech Stack */}
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">Tech Stack:</span>
                            <div className="flex items-center space-x-1">
                              {env.techStack.map((tech) => (
                                <div key={tech} className="flex items-center space-x-1">
                                  {getTechStackIcon(tech)}
                                  <span className="text-xs">{tech}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Info Grid */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Last Sync:</span>
                              <div className="font-medium">{env.lastSync}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Team:</span>
                              <div className="font-medium">{env.team}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Branch:</span>
                              <div className="font-medium flex items-center">
                                <GitBranch className="h-3 w-3 mr-1" />
                                {env.branch}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Uptime:</span>
                              <div className="font-medium">{env.uptime}</div>
                            </div>
                          </div>

                          {/* Team Members */}
                          <div>
                            <span className="text-sm text-muted-foreground">Team Members:</span>
                            <div className="flex items-center space-x-2 mt-1">
                              {env.teamMembers.slice(0, 3).map((member, index) => (
                                <Avatar key={member} className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {member.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                              {env.teamMembers.length > 3 && (
                                <div className="text-xs text-muted-foreground">
                                  +{env.teamMembers.length - 3} more
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Error Message */}
                          {env.status === 'error' && env.error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="text-sm text-red-500">{env.error}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card className="glass border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          {activity.status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {activity.status === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
                          {activity.status === 'info' && <AlertCircle className="h-4 w-4 text-blue-500" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.environment}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-muted-foreground">{activity.user}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{activity.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team Collaboration */}
              <Card className="glass border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Team Collaboration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Team Members</span>
                      <span className="text-sm font-medium">8</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {['SC', 'MJ', 'AR', 'DP', 'LW', 'ET', 'JW', 'CR'].map((initials) => (
                        <Avatar key={initials} className="h-8 w-8">
                          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Shared Environments</span>
                        <span className="text-sm font-medium">5</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Team Templates</span>
                        <span className="text-sm font-medium">12</span>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full glass border-muted">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
    </div>
  );
};

export default Dashboard;