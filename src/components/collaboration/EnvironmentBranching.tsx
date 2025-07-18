import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  GitBranch, 
  GitMerge, 
  GitCommit,
  Plus,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  Users
} from 'lucide-react';

interface Branch {
  id: string;
  name: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  created: Date;
  lastCommit: Date;
  commits: number;
  status: 'active' | 'merged' | 'abandoned';
  baseBranch: string;
  conflicts?: number;
}

interface MergeRequest {
  id: string;
  title: string;
  description: string;
  sourceBranch: string;
  targetBranch: string;
  author: {
    name: string;
    avatar: string;
  };
  created: Date;
  status: 'open' | 'approved' | 'rejected' | 'merged';
  reviewers: Array<{
    name: string;
    avatar: string;
    status: 'pending' | 'approved' | 'requested_changes';
  }>;
  changes: number;
  comments: number;
  conflicts: boolean;
}

export const EnvironmentBranching: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: '1',
      name: 'main',
      description: 'Production environment configuration',
      author: { name: 'System', avatar: '/api/placeholder/32/32' },
      created: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      lastCommit: new Date(Date.now() - 2 * 60 * 60 * 1000),
      commits: 245,
      status: 'active',
      baseBranch: '-'
    },
    {
      id: '2',
      name: 'feature/database-optimization',
      description: 'Optimize database connection settings for production',
      author: { name: 'Sarah Chen', avatar: '/api/placeholder/32/32' },
      created: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      lastCommit: new Date(Date.now() - 1 * 60 * 60 * 1000),
      commits: 7,
      status: 'active',
      baseBranch: 'main'
    },
    {
      id: '3',
      name: 'hotfix/redis-config',
      description: 'Fix Redis configuration for high-traffic periods',
      author: { name: 'Mike Johnson', avatar: '/api/placeholder/32/32' },
      created: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      lastCommit: new Date(Date.now() - 30 * 60 * 1000),
      commits: 3,
      status: 'active',
      baseBranch: 'main',
      conflicts: 1
    }
  ]);

  const [mergeRequests, setMergeRequests] = useState<MergeRequest[]>([
    {
      id: '1',
      title: 'Database optimization for production environment',
      description: 'This MR includes optimized connection pool settings, improved query timeouts, and better resource allocation for our production database.',
      sourceBranch: 'feature/database-optimization',
      targetBranch: 'main',
      author: { name: 'Sarah Chen', avatar: '/api/placeholder/32/32' },
      created: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'open',
      reviewers: [
        { name: 'Mike Johnson', avatar: '/api/placeholder/32/32', status: 'approved' },
        { name: 'Alex Rivera', avatar: '/api/placeholder/32/32', status: 'pending' }
      ],
      changes: 12,
      comments: 3,
      conflicts: false
    },
    {
      id: '2',
      title: 'Redis configuration hotfix',
      description: 'Critical fix for Redis memory management during peak traffic hours.',
      sourceBranch: 'hotfix/redis-config',
      targetBranch: 'main',
      author: { name: 'Mike Johnson', avatar: '/api/placeholder/32/32' },
      created: new Date(Date.now() - 30 * 60 * 1000),
      status: 'open',
      reviewers: [
        { name: 'Sarah Chen', avatar: '/api/placeholder/32/32', status: 'requested_changes' }
      ],
      changes: 5,
      comments: 8,
      conflicts: true
    }
  ]);

  const [isCreatingBranch, setIsCreatingBranch] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchDescription, setNewBranchDescription] = useState('');

  const createBranch = () => {
    if (!newBranchName.trim()) return;

    const newBranch: Branch = {
      id: Date.now().toString(),
      name: newBranchName,
      description: newBranchDescription,
      author: { name: 'You', avatar: '/api/placeholder/32/32' },
      created: new Date(),
      lastCommit: new Date(),
      commits: 0,
      status: 'active',
      baseBranch: 'main'
    };

    setBranches(prev => [...prev, newBranch]);
    setNewBranchName('');
    setNewBranchDescription('');
    setIsCreatingBranch(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-primary';
      case 'merged': return 'text-success';
      case 'abandoned': return 'text-muted-foreground';
      case 'open': return 'text-warning';
      case 'approved': return 'text-success';
      case 'rejected': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'pending': 
      case 'open': return <Clock className="h-4 w-4" />;
      case 'merged': return <GitMerge className="h-4 w-4" />;
      default: return <GitBranch className="h-4 w-4" />;
    }
  };

  const getReviewerStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'border-success text-success';
      case 'requested_changes': return 'border-destructive text-destructive';
      case 'pending': return 'border-warning text-warning';
      default: return 'border-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Environment Branching</h1>
          <p className="text-muted-foreground">Manage environment configurations with Git-like branching and merging</p>
        </div>
        <Button onClick={() => setIsCreatingBranch(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Branch
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branches */}
        <div className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Environment Branches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {branches.map((branch) => (
                    <div key={branch.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <GitBranch className="h-4 w-4 text-primary" />
                          <span className="font-medium">{branch.name}</span>
                          {branch.name === 'main' && (
                            <Badge variant="outline" className="text-xs">
                              Protected
                            </Badge>
                          )}
                          {branch.conflicts && (
                            <Badge variant="destructive" className="text-xs">
                              {branch.conflicts} conflicts
                            </Badge>
                          )}
                        </div>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(branch.status)}`}>
                          {branch.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">{branch.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Avatar className="w-4 h-4">
                              <AvatarImage src={branch.author.avatar} />
                              <AvatarFallback className="text-xs">{branch.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <span>{branch.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitCommit className="h-3 w-3" />
                            <span>{branch.commits} commits</span>
                          </div>
                        </div>
                        <span>
                          Updated {Math.round((Date.now() - branch.lastCommit.getTime()) / (60 * 60 * 1000))}h ago
                        </span>
                      </div>

                      {branch.name !== 'main' && (
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="flex-1 h-7 text-xs">
                            <GitMerge className="h-3 w-3 mr-1" />
                            Create MR
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 text-xs">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Create Branch Modal */}
          {isCreatingBranch && (
            <Card className="glass border-primary">
              <CardHeader>
                <CardTitle className="text-lg">Create New Branch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Branch Name</label>
                  <Input
                    placeholder="feature/new-feature"
                    value={newBranchName}
                    onChange={(e) => setNewBranchName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe what this branch is for..."
                    value={newBranchDescription}
                    onChange={(e) => setNewBranchDescription(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={createBranch} className="flex-1">
                    Create Branch
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreatingBranch(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Merge Requests */}
        <div className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitMerge className="h-5 w-5" />
                Merge Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {mergeRequests.map((mr) => (
                    <div key={mr.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(mr.status)}
                            <span className="font-medium">{mr.title}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <span>{mr.sourceBranch}</span>
                            <ArrowRight className="h-3 w-3" />
                            <span>{mr.targetBranch}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={`text-xs ${getStatusColor(mr.status)}`}>
                          {mr.status}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground">{mr.description}</p>

                      {mr.conflicts && (
                        <div className="p-2 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
                          ⚠️ This merge request has conflicts that need to be resolved
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Avatar className="w-4 h-4">
                              <AvatarImage src={mr.author.avatar} />
                              <AvatarFallback className="text-xs">{mr.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs">{mr.author.name}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{mr.changes} changes</span>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{mr.comments}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Math.round((Date.now() - mr.created.getTime()) / (60 * 60 * 1000))}h ago
                        </div>
                      </div>

                      {/* Reviewers */}
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        <div className="flex -space-x-1">
                          {mr.reviewers.map((reviewer, index) => (
                            <Avatar 
                              key={index} 
                              className={`w-6 h-6 border-2 ${getReviewerStatusColor(reviewer.status)}`}
                            >
                              <AvatarImage src={reviewer.avatar} />
                              <AvatarFallback className="text-xs">{reviewer.name[0]}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 h-7 text-xs">
                          <Eye className="h-3 w-3 mr-1" />
                          Review
                        </Button>
                        {mr.status === 'open' && !mr.conflicts && (
                          <Button size="sm" className="h-7 text-xs">
                            <GitMerge className="h-3 w-3 mr-1" />
                            Merge
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};