import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  MessageSquare,
  AlertTriangle,
  Shield,
  Users,
  Settings,
  Send,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface ApprovalWorkflow {
  id: string;
  environment: string;
  title: string;
  description: string;
  requester: {
    name: string;
    avatar: string;
  };
  created: Date;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  changes: Array<{
    field: string;
    oldValue: string;
    newValue: string;
    risk: 'low' | 'medium' | 'high';
  }>;
  approvers: Array<{
    name: string;
    avatar: string;
    role: string;
    status: 'pending' | 'approved' | 'rejected';
    comment?: string;
    timestamp?: Date;
  }>;
  comments: Array<{
    id: string;
    user: { name: string; avatar: string };
    content: string;
    timestamp: Date;
  }>;
  deadline?: Date;
  complianceChecks: Array<{
    name: string;
    status: 'passed' | 'failed' | 'warning';
    details: string;
  }>;
}

export const ApprovalWorkflows: React.FC = () => {
  const [workflows, setWorkflows] = useState<ApprovalWorkflow[]>([
    {
      id: '1',
      environment: 'Production',
      title: 'Database Connection Pool Update',
      description: 'Update database connection pool settings to handle increased traffic during peak hours.',
      requester: { name: 'Sarah Chen', avatar: '/api/placeholder/32/32' },
      created: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'pending',
      priority: 'high',
      changes: [
        {
          field: 'DB_POOL_SIZE',
          oldValue: '10',
          newValue: '25',
          risk: 'medium'
        },
        {
          field: 'DB_POOL_TIMEOUT',
          oldValue: '30000',
          newValue: '45000',
          risk: 'low'
        }
      ],
      approvers: [
        { name: 'Mike Johnson', avatar: '/api/placeholder/32/32', role: 'DevOps Lead', status: 'approved', comment: 'LGTM, changes look good for handling increased load', timestamp: new Date(Date.now() - 30 * 60 * 1000) },
        { name: 'Alex Rivera', avatar: '/api/placeholder/32/32', role: 'Security Engineer', status: 'pending' },
        { name: 'Lisa Park', avatar: '/api/placeholder/32/32', role: 'Site Reliability Engineer', status: 'pending' }
      ],
      comments: [
        {
          id: '1',
          user: { name: 'Mike Johnson', avatar: '/api/placeholder/32/32' },
          content: 'Have we tested these values in staging?',
          timestamp: new Date(Date.now() - 45 * 60 * 1000)
        }
      ],
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
      complianceChecks: [
        { name: 'Security Impact Assessment', status: 'passed', details: 'No security vulnerabilities detected' },
        { name: 'Performance Impact', status: 'warning', details: 'Monitor memory usage after deployment' },
        { name: 'Rollback Plan', status: 'passed', details: 'Automated rollback available' }
      ]
    },
    {
      id: '2',
      environment: 'Production',
      title: 'API Rate Limit Configuration',
      description: 'Update API rate limiting to prevent abuse while maintaining service quality.',
      requester: { name: 'Tom Wilson', avatar: '/api/placeholder/32/32' },
      created: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'approved',
      priority: 'medium',
      changes: [
        {
          field: 'RATE_LIMIT_PER_HOUR',
          oldValue: '1000',
          newValue: '1500',
          risk: 'low'
        }
      ],
      approvers: [
        { name: 'Mike Johnson', avatar: '/api/placeholder/32/32', role: 'DevOps Lead', status: 'approved', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
        { name: 'Alex Rivera', avatar: '/api/placeholder/32/32', role: 'Security Engineer', status: 'approved', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) }
      ],
      comments: [],
      complianceChecks: [
        { name: 'Security Impact Assessment', status: 'passed', details: 'Low security impact' },
        { name: 'Performance Impact', status: 'passed', details: 'Minimal performance impact expected' }
      ]
    }
  ]);

  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('1');
  const [newComment, setNewComment] = useState('');

  const workflow = workflows.find(w => w.id === selectedWorkflow);

  const approveWorkflow = (workflowId: string, comment?: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId 
        ? {
            ...w,
            approvers: w.approvers.map(approver => 
              approver.name === 'You' // Simulating current user
                ? { ...approver, status: 'approved', comment, timestamp: new Date() }
                : approver
            )
          }
        : w
    ));
  };

  const rejectWorkflow = (workflowId: string, comment: string) => {
    setWorkflows(prev => prev.map(w => 
      w.id === workflowId 
        ? {
            ...w,
            status: 'rejected',
            approvers: w.approvers.map(approver => 
              approver.name === 'You'
                ? { ...approver, status: 'rejected', comment, timestamp: new Date() }
                : approver
            )
          }
        : w
    ));
  };

  const addComment = () => {
    if (!newComment.trim() || !workflow) return;

    const comment = {
      id: Date.now().toString(),
      user: { name: 'You', avatar: '/api/placeholder/32/32' },
      content: newComment,
      timestamp: new Date()
    };

    setWorkflows(prev => prev.map(w => 
      w.id === workflow.id 
        ? { ...w, comments: [...w.comments, comment] }
        : w
    ));
    setNewComment('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-success';
      case 'rejected': return 'text-destructive';
      case 'pending': return 'text-warning';
      case 'cancelled': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getComplianceStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-success';
      case 'failed': return 'text-destructive';
      case 'warning': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Approval Workflows</h1>
          <p className="text-muted-foreground">Manage approval processes for production environment changes</p>
        </div>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Configure Workflows
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow List */}
        <div className="lg:col-span-1">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {workflows.map((workflow) => (
                    <div
                      key={workflow.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedWorkflow === workflow.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedWorkflow(workflow.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getPriorityColor(workflow.priority)}>
                          {workflow.priority}
                        </Badge>
                        <div className={`flex items-center gap-1 ${getStatusColor(workflow.status)}`}>
                          {getStatusIcon(workflow.status)}
                          <span className="text-xs capitalize">{workflow.status}</span>
                        </div>
                      </div>
                      
                      <h3 className="font-medium text-sm mb-1">{workflow.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{workflow.environment}</p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Avatar className="w-3 h-3">
                            <AvatarImage src={workflow.requester.avatar} />
                            <AvatarFallback className="text-xs">{workflow.requester.name[0]}</AvatarFallback>
                          </Avatar>
                          <span>{workflow.requester.name}</span>
                        </div>
                        <span>{Math.round((Date.now() - workflow.created.getTime()) / (60 * 60 * 1000))}h ago</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Details */}
        <div className="lg:col-span-2 space-y-6">
          {workflow && (
            <>
              {/* Workflow Header */}
              <Card className="glass">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(workflow.status)}
                        {workflow.title}
                      </CardTitle>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge className={getPriorityColor(workflow.priority)}>
                          {workflow.priority} priority
                        </Badge>
                        <Badge variant="outline">{workflow.environment}</Badge>
                        {workflow.deadline && (
                          <Badge variant="outline" className="text-warning">
                            <Clock className="h-3 w-3 mr-1" />
                            {Math.round((workflow.deadline.getTime() - Date.now()) / (60 * 60 * 1000))}h left
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{workflow.description}</p>
                </CardContent>
              </Card>

              {/* Changes */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Proposed Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workflow.changes.map((change, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{change.field}</span>
                          <Badge variant="outline" className={getRiskColor(change.risk)}>
                            {change.risk} risk
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">From:</span>
                            <code className="bg-muted px-2 py-1 rounded text-xs">{change.oldValue}</code>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-muted-foreground">To:</span>
                            <code className="bg-primary/10 px-2 py-1 rounded text-xs">{change.newValue}</code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Checks */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Compliance Checks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workflow.complianceChecks.map((check, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{check.name}</span>
                            <div className={`flex items-center gap-1 ${getComplianceStatusColor(check.status)}`}>
                              {check.status === 'passed' && <CheckCircle className="h-4 w-4" />}
                              {check.status === 'failed' && <XCircle className="h-4 w-4" />}
                              {check.status === 'warning' && <AlertTriangle className="h-4 w-4" />}
                              <span className="text-sm capitalize">{check.status}</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{check.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Approvers */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Approvers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workflow.approvers.map((approver, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={approver.avatar} />
                            <AvatarFallback>{approver.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{approver.name}</div>
                            <div className="text-sm text-muted-foreground">{approver.role}</div>
                            {approver.comment && (
                              <div className="text-sm mt-1 p-2 bg-muted rounded">
                                "{approver.comment}"
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`flex items-center gap-1 ${getStatusColor(approver.status)}`}>
                            {getStatusIcon(approver.status)}
                            <span className="text-sm capitalize">{approver.status}</span>
                          </div>
                          {approver.timestamp && (
                            <span className="text-xs text-muted-foreground">
                              {Math.round((Date.now() - approver.timestamp.getTime()) / (60 * 1000))}m ago
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {workflow.status === 'pending' && (
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1" onClick={() => approveWorkflow(workflow.id)}>
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button variant="destructive" className="flex-1" onClick={() => rejectWorkflow(workflow.id, 'Rejected')}>
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Comments */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Discussion
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ScrollArea className="h-48">
                    <div className="space-y-3">
                      {workflow.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={comment.user.avatar} />
                            <AvatarFallback className="text-xs">{comment.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium">{comment.user.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {Math.round((Date.now() - comment.timestamp.getTime()) / (60 * 1000))}m ago
                              </span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={2}
                      className="flex-1"
                    />
                    <Button onClick={addComment} disabled={!newComment.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};