import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, 
  Edit3, 
  MessageSquare, 
  Clock, 
  Save,
  GitBranch,
  Eye,
  CheckCircle,
  AlertCircle,
  Zap
} from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'editing';
  cursor?: { x: number; y: number; color: string };
  lastActive: Date;
}

interface EnvironmentChange {
  id: string;
  field: string;
  oldValue: string;
  newValue: string;
  timestamp: Date;
  user: Collaborator;
  status: 'pending' | 'applied' | 'conflicted';
}

interface Comment {
  id: string;
  user: Collaborator;
  content: string;
  timestamp: Date;
  resolved: boolean;
  position?: { field: string; line?: number };
}

export const CollaborativeEditor: React.FC = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: '/api/placeholder/32/32',
      status: 'editing',
      cursor: { x: 120, y: 180, color: '#3B82F6' },
      lastActive: new Date()
    },
    {
      id: '2',
      name: 'Mike Johnson',
      avatar: '/api/placeholder/32/32',
      status: 'online',
      lastActive: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Alex Rivera',
      avatar: '/api/placeholder/32/32',
      status: 'offline',
      lastActive: new Date(Date.now() - 30 * 60 * 1000)
    }
  ]);

  const [changes, setChanges] = useState<EnvironmentChange[]>([
    {
      id: '1',
      field: 'NODE_ENV',
      oldValue: 'development',
      newValue: 'production',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      user: collaborators[0],
      status: 'pending'
    },
    {
      id: '2',
      field: 'DATABASE_URL',
      oldValue: 'postgres://localhost:5432/dev',
      newValue: 'postgres://prod-db:5432/app',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      user: collaborators[1],
      status: 'applied'
    }
  ]);

  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: collaborators[1],
      content: "Should we double-check this production URL before applying?",
      timestamp: new Date(Date.now() - 3 * 60 * 1000),
      resolved: false,
      position: { field: 'DATABASE_URL' }
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [selectedField, setSelectedField] = useState<string | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate cursor movements and status updates
      setCollaborators(prev => prev.map(collab => {
        if (collab.status === 'editing' && collab.cursor) {
          return {
            ...collab,
            cursor: {
              ...collab.cursor,
              x: collab.cursor.x + (Math.random() - 0.5) * 20,
              y: collab.cursor.y + (Math.random() - 0.5) * 20
            }
          };
        }
        return collab;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const addComment = () => {
    if (!newComment.trim() || !selectedField) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: collaborators[0], // Current user
      content: newComment,
      timestamp: new Date(),
      resolved: false,
      position: { field: selectedField }
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const applyChange = (changeId: string) => {
    setChanges(prev => prev.map(change =>
      change.id === changeId ? { ...change, status: 'applied' } : change
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'editing': return 'bg-primary';
      case 'offline': return 'bg-muted-foreground';
      default: return 'bg-muted-foreground';
    }
  };

  const getChangeStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'text-success';
      case 'pending': return 'text-warning';
      case 'conflicted': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Collaborators */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Collaborative Environment Editor</h1>
          <p className="text-muted-foreground">Real-time collaborative editing for production environment</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {collaborators.filter(c => c.status !== 'offline').length} active
            </span>
          </div>
          
          <div className="flex -space-x-2">
            {collaborators.map((collaborator) => (
              <div key={collaborator.id} className="relative">
                <Avatar className="border-2 border-background">
                  <AvatarImage src={collaborator.avatar} />
                  <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div 
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(collaborator.status)}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Environment Editor */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="glass relative">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Environment Configuration
                <Badge variant="outline" className="ml-auto">
                  <Zap className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cursors overlay */}
              {collaborators.map((collab) => 
                collab.cursor && collab.status === 'editing' ? (
                  <div
                    key={collab.id}
                    className="absolute pointer-events-none z-10"
                    style={{
                      left: collab.cursor.x,
                      top: collab.cursor.y,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: collab.cursor.color }}
                    />
                    <div 
                      className="text-xs px-2 py-1 rounded mt-1 text-white font-medium"
                      style={{ backgroundColor: collab.cursor.color }}
                    >
                      {collab.name}
                    </div>
                  </div>
                ) : null
              )}

              {/* Environment Fields */}
              <div className="space-y-3">
                {[
                  { label: 'NODE_ENV', value: 'production' },
                  { label: 'DATABASE_URL', value: 'postgres://prod-db:5432/app' },
                  { label: 'REDIS_URL', value: 'redis://redis:6379' },
                  { label: 'API_KEY', value: '***hidden***' },
                  { label: 'PORT', value: '3000' }
                ].map((field) => (
                  <div 
                    key={field.label}
                    className={`p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors ${
                      selectedField === field.label ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedField(field.label)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{field.label}</span>
                        {comments.some(c => c.position?.field === field.label && !c.resolved) && (
                          <MessageSquare className="h-3 w-3 text-warning" />
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {changes.some(c => c.field === field.label && c.status === 'pending') && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-2 w-2 mr-1" />
                            Pending
                          </Badge>
                        )}
                        <Eye className="h-3 w-3 text-muted-foreground" />
                      </div>
                    </div>
                    <Input 
                      value={field.value} 
                      className="mt-2" 
                      readOnly={field.label === 'API_KEY'}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-4">
                <Button size="sm" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button size="sm" variant="outline">
                  <GitBranch className="h-4 w-4 mr-2" />
                  Create Branch
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Changes */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Recent Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <div className="space-y-3">
                  {changes.map((change) => (
                    <div key={change.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{change.field}</span>
                          <Badge variant="outline" className={`text-xs ${getChangeStatusColor(change.status)}`}>
                            {change.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <span className="line-through">{change.oldValue}</span>
                          <span className="mx-2">→</span>
                          <span className="text-foreground">{change.newValue}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="w-4 h-4">
                            <AvatarImage src={change.user.avatar} />
                            <AvatarFallback className="text-xs">{change.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">
                            {change.user.name} • {Math.round((Date.now() - change.timestamp.getTime()) / 60000)}m ago
                          </span>
                        </div>
                      </div>
                      {change.status === 'pending' && (
                        <Button size="sm" variant="outline" onClick={() => applyChange(change.id)}>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Apply
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Comments & Activity Sidebar */}
        <div className="space-y-4">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-3 border rounded-lg">
                      <div className="flex items-start gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={comment.user.avatar} />
                          <AvatarFallback className="text-xs">{comment.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium">{comment.user.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {Math.round((Date.now() - comment.timestamp.getTime()) / 60000)}m ago
                            </span>
                          </div>
                          {comment.position && (
                            <Badge variant="secondary" className="text-xs mb-2">
                              {comment.position.field}
                            </Badge>
                          )}
                          <p className="text-sm">{comment.content}</p>
                          {!comment.resolved && (
                            <Button size="sm" variant="outline" className="mt-2 h-6 text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {selectedField && (
                <div className="space-y-2 pt-4 border-t">
                  <div className="text-sm font-medium">
                    Add comment to {selectedField}
                  </div>
                  <Textarea
                    placeholder="Leave a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                  />
                  <Button size="sm" onClick={addComment} className="w-full">
                    Add Comment
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Collaborator Activity */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Team Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {collaborators.map((collaborator) => (
                  <div key={collaborator.id} className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={collaborator.avatar} />
                        <AvatarFallback>{collaborator.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div 
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${getStatusColor(collaborator.status)}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{collaborator.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {collaborator.status === 'editing' ? 'Currently editing' :
                         collaborator.status === 'online' ? 'Online' :
                         `Last seen ${Math.round((Date.now() - collaborator.lastActive.getTime()) / 60000)}m ago`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};