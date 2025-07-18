import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  TrendingUp, 
  TrendingDown, 
  Settings, 
  Play, 
  Pause,
  BarChart3,
  Zap,
  AlertCircle,
  CheckCircle,
  Timer
} from 'lucide-react';

interface ScalingPolicy {
  id: string;
  name: string;
  enabled: boolean;
  metric: string;
  threshold: number;
  action: 'scale_up' | 'scale_down';
  cooldown: number;
  lastTriggered?: string;
}

interface AutoScalingGroup {
  id: string;
  name: string;
  currentInstances: number;
  minInstances: number;
  maxInstances: number;
  desiredInstances: number;
  status: 'active' | 'inactive' | 'scaling';
  policies: ScalingPolicy[];
}

export const AutoScalingManager: React.FC = () => {
  const [autoScalingGroups, setAutoScalingGroups] = useState<AutoScalingGroup[]>([
    {
      id: '1',
      name: 'Web Servers',
      currentInstances: 3,
      minInstances: 2,
      maxInstances: 10,
      desiredInstances: 3,
      status: 'active',
      policies: [
        {
          id: 'p1',
          name: 'Scale Up on High CPU',
          enabled: true,
          metric: 'CPU Utilization',
          threshold: 75,
          action: 'scale_up',
          cooldown: 300,
          lastTriggered: '2 hours ago'
        },
        {
          id: 'p2',
          name: 'Scale Down on Low CPU',
          enabled: true,
          metric: 'CPU Utilization',
          threshold: 25,
          action: 'scale_down',
          cooldown: 600
        }
      ]
    },
    {
      id: '2',
      name: 'Database Cluster',
      currentInstances: 2,
      minInstances: 2,
      maxInstances: 6,
      desiredInstances: 2,
      status: 'active',
      policies: [
        {
          id: 'p3',
          name: 'Scale Up on Memory',
          enabled: true,
          metric: 'Memory Utilization',
          threshold: 80,
          action: 'scale_up',
          cooldown: 600
        }
      ]
    }
  ]);

  const [selectedGroup, setSelectedGroup] = useState<string>('1');
  const [isCreatingPolicy, setIsCreatingPolicy] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'scaling': return 'text-warning';
      case 'inactive': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'scaling': return <Timer className="h-4 w-4" />;
      case 'inactive': return <Pause className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const togglePolicy = (groupId: string, policyId: string) => {
    setAutoScalingGroups(groups =>
      groups.map(group =>
        group.id === groupId
          ? {
              ...group,
              policies: group.policies.map(policy =>
                policy.id === policyId
                  ? { ...policy, enabled: !policy.enabled }
                  : policy
              )
            }
          : group
      )
    );
  };

  const selectedGroupData = autoScalingGroups.find(g => g.id === selectedGroup);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Auto Scaling Manager</h1>
          <p className="text-muted-foreground">Configure automatic scaling policies for your infrastructure</p>
        </div>
        <Button onClick={() => setIsCreatingPolicy(true)}>
          <Settings className="h-4 w-4 mr-2" />
          New Policy
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Auto Scaling Groups List */}
        <div className="lg:col-span-1">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Auto Scaling Groups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {autoScalingGroups.map((group) => (
                <div
                  key={group.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedGroup === group.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedGroup(group.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{group.name}</h3>
                    <div className={`flex items-center gap-1 ${getStatusColor(group.status)}`}>
                      {getStatusIcon(group.status)}
                      <span className="text-xs capitalize">{group.status}</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Instances:</span>
                      <span>{group.currentInstances}/{group.maxInstances}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Policies:</span>
                      <span>{group.policies.length}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Selected Group Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedGroupData && (
            <>
              {/* Group Overview */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    {selectedGroupData.name} - Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedGroupData.currentInstances}</div>
                      <div className="text-sm text-muted-foreground">Current</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedGroupData.desiredInstances}</div>
                      <div className="text-sm text-muted-foreground">Desired</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedGroupData.minInstances}</div>
                      <div className="text-sm text-muted-foreground">Minimum</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{selectedGroupData.maxInstances}</div>
                      <div className="text-sm text-muted-foreground">Maximum</div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <Label>Instance Range</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <Input 
                          type="number" 
                          placeholder="Min" 
                          value={selectedGroupData.minInstances}
                          className="w-20" 
                        />
                        <span>to</span>
                        <Input 
                          type="number" 
                          placeholder="Max" 
                          value={selectedGroupData.maxInstances}
                          className="w-20" 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scaling Policies */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Scaling Policies
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedGroupData.policies.map((policy) => (
                    <div key={policy.id} className="p-4 border rounded-lg glass">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={policy.enabled}
                            onCheckedChange={() => togglePolicy(selectedGroupData.id, policy.id)}
                          />
                          <h3 className="font-medium">{policy.name}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {policy.action === 'scale_up' ? (
                            <TrendingUp className="h-4 w-4 text-success" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-warning" />
                          )}
                          <Badge variant={policy.enabled ? 'default' : 'secondary'}>
                            {policy.enabled ? 'Active' : 'Disabled'}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Metric:</span>
                          <div className="font-medium">{policy.metric}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Threshold:</span>
                          <div className="font-medium">{policy.threshold}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Cooldown:</span>
                          <div className="font-medium">{policy.cooldown}s</div>
                        </div>
                      </div>

                      {policy.lastTriggered && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          Last triggered: {policy.lastTriggered}
                        </div>
                      )}
                    </div>
                  ))}

                  <Button variant="outline" className="w-full" onClick={() => setIsCreatingPolicy(true)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Add New Policy
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};