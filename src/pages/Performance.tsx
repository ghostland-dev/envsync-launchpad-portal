import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Settings, 
  Bell,
  Target,
  Gauge,
  Clock,
  Monitor
} from 'lucide-react';
import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard';
import { AutoScalingManager } from '@/components/scalability/AutoScalingManager';
import { useToast } from '@/hooks/use-toast';

const OptimizationPanel = () => {
  const { toast } = useToast();
  const [autoOptimize, setAutoOptimize] = useState(true);
  
  const optimizations = [
    {
      title: 'Environment Caching',
      description: 'Reduce sync times by 60%',
      impact: 'High',
      status: 'recommended',
      savings: '2.4s'
    },
    {
      title: 'Variable Compression',
      description: 'Compress large environment variables',
      impact: 'Medium',
      status: 'applied',
      savings: '15% storage'
    },
    {
      title: 'Batch Operations',
      description: 'Group variable updates for efficiency',
      impact: 'High',
      status: 'recommended',
      savings: '45% API calls'
    },
    {
      title: 'Lazy Loading',
      description: 'Load variables on demand',
      impact: 'Medium',
      status: 'available',
      savings: '30% memory'
    }
  ];

  const applyOptimization = (title: string) => {
    toast({
      title: "Optimization Applied",
      description: `${title} has been successfully enabled.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Performance Optimization</h2>
          <p className="text-muted-foreground">Automatically improve your environment performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="auto-optimize" className="text-sm font-medium">Auto-optimize</label>
          <Switch
            id="auto-optimize"
            checked={autoOptimize}
            onCheckedChange={setAutoOptimize}
          />
        </div>
      </div>

      <div className="grid gap-6">
        {optimizations.map((opt, index) => (
          <Card key={index} className="glass border-0 shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold">{opt.title}</h3>
                    <Badge variant={
                      opt.status === 'applied' ? 'default' : 
                      opt.status === 'recommended' ? 'destructive' : 'secondary'
                    }>
                      {opt.status}
                    </Badge>
                    <Badge variant="outline">{opt.impact} Impact</Badge>
                  </div>
                  <p className="text-muted-foreground">{opt.description}</p>
                  <p className="text-sm font-medium text-green-600 mt-1">
                    Potential savings: {opt.savings}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {opt.status === 'applied' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Button 
                      size="sm"
                      onClick={() => applyOptimization(opt.title)}
                    >
                      Apply
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Optimization Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Sync Speed Target</span>
              <span>85% achieved</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Memory Usage</span>
              <span>92% optimized</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>API Efficiency</span>
              <span>78% improved</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const MonitoringPanel = () => {
  const { toast } = useToast();
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  
  const alerts = [
    {
      type: 'warning',
      title: 'High Sync Latency',
      description: 'Environment sync taking longer than usual',
      time: '2 minutes ago',
      severity: 'medium'
    },
    {
      type: 'info',
      title: 'Optimization Available',
      description: 'New performance improvements detected',
      time: '15 minutes ago',
      severity: 'low'
    },
    {
      type: 'error',
      title: 'Memory Threshold Exceeded',
      description: 'Environment using 95% of allocated memory',
      time: '1 hour ago',
      severity: 'high'
    }
  ];

  const metrics = [
    { label: 'Avg Response Time', value: '245ms', change: '-12%', trend: 'down' },
    { label: 'Sync Success Rate', value: '99.2%', change: '+0.8%', trend: 'up' },
    { label: 'Memory Usage', value: '68%', change: '-5%', trend: 'down' },
    { label: 'API Rate Limit', value: '45%', change: '+15%', trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Real-time Monitoring</h2>
          <p className="text-muted-foreground">Monitor performance metrics and alerts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Bell className="h-4 w-4" />
          <label htmlFor="alerts" className="text-sm font-medium">Alerts</label>
          <Switch
            id="alerts"
            checked={alertsEnabled}
            onCheckedChange={setAlertsEnabled}
          />
        </div>
      </div>

      {/* Live Metrics */}
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
                  <Gauge className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>System notifications and performance warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  alert.severity === 'high' ? 'bg-red-500' :
                  alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge variant={
                      alert.severity === 'high' ? 'destructive' :
                      alert.severity === 'medium' ? 'secondary' : 'outline'
                    }>
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Settings */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Monitoring Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Alert Threshold</label>
              <div className="flex items-center space-x-2">
                <span className="text-sm">Response Time:</span>
                <Badge variant="outline">500ms</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notification Channels</label>
              <div className="flex space-x-2">
                <Badge>Email</Badge>
                <Badge>Slack</Badge>
                <Badge variant="outline">SMS</Badge>
              </div>
            </div>
          </div>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure Alerts
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

const Performance: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Performance</TabsTrigger>
          <TabsTrigger value="scaling">Auto Scaling</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <PerformanceDashboard />
        </TabsContent>

        <TabsContent value="scaling">
          <AutoScalingManager />
        </TabsContent>

        <TabsContent value="optimization">
          <OptimizationPanel />
        </TabsContent>

        <TabsContent value="monitoring">
          <MonitoringPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Performance;