import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Network, 
  Zap,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Globe,
  Server,
  Database,
  Timer
} from 'lucide-react';

interface MetricData {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
}

interface RegionStatus {
  region: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  uptime: number;
}

export const PerformanceDashboard: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1h');

  const metrics: MetricData[] = [
    { name: 'CPU Usage', value: 45, unit: '%', trend: 'stable', status: 'good' },
    { name: 'Memory Usage', value: 68, unit: '%', trend: 'up', status: 'warning' },
    { name: 'Disk I/O', value: 23, unit: 'MB/s', trend: 'down', status: 'good' },
    { name: 'Network Throughput', value: 156, unit: 'Mbps', trend: 'up', status: 'good' },
    { name: 'Response Time', value: 142, unit: 'ms', trend: 'stable', status: 'good' },
    { name: 'Error Rate', value: 0.03, unit: '%', trend: 'down', status: 'good' },
  ];

  const regions: RegionStatus[] = [
    { region: 'US East', status: 'healthy', latency: 45, uptime: 99.9 },
    { region: 'US West', status: 'healthy', latency: 38, uptime: 99.8 },
    { region: 'Europe', status: 'degraded', latency: 89, uptime: 98.2 },
    { region: 'Asia Pacific', status: 'healthy', latency: 67, uptime: 99.7 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
      case 'healthy': return 'text-success';
      case 'warning':
      case 'degraded': return 'text-warning';
      case 'critical':
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
      case 'healthy': return <CheckCircle className="h-4 w-4" />;
      case 'warning':
      case 'degraded': return <AlertTriangle className="h-4 w-4" />;
      case 'critical':
      case 'down': return <AlertTriangle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-3 w-3 text-warning" />;
      case 'down': return <TrendingUp className="h-3 w-3 text-success rotate-180" />;
      default: return <div className="h-3 w-3 bg-muted-foreground rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Performance Dashboard</h1>
          <p className="text-muted-foreground">Monitor and optimize your infrastructure performance</p>
        </div>
        <div className="flex gap-2">
          {['15m', '1h', '6h', '24h', '7d'].map((range) => (
            <Button
              key={range}
              variant={selectedTimeRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedTimeRange(range)}
            >
              {range}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="global">Global Status</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.name} className="glass">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-muted-foreground">{metric.name}</h3>
                    {getTrendIcon(metric.trend)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">
                      {metric.value}
                      <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
                    </span>
                    <div className={getStatusColor(metric.status)}>
                      {getStatusIcon(metric.status)}
                    </div>
                  </div>
                  {metric.name.includes('Usage') && (
                    <Progress value={metric.value} className="mt-2 h-2" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance Chart Placeholder */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Performance Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Performance chart visualization would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-6">
          {/* Infrastructure Resources */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Compute Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Instances</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Auto-scaling Groups</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Load Balancers</span>
                    <span className="font-medium">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Database Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Query Response Time</span>
                    <span className="font-medium">23ms</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Connection Pool</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Cache Hit Rate</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resource Utilization */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Cpu className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">45%</div>
                  <div className="text-sm text-muted-foreground">CPU</div>
                </div>
                <div className="text-center">
                  <HardDrive className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">68%</div>
                  <div className="text-sm text-muted-foreground">Memory</div>
                </div>
                <div className="text-center">
                  <Network className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">23%</div>
                  <div className="text-sm text-muted-foreground">Network</div>
                </div>
                <div className="text-center">
                  <Database className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">34%</div>
                  <div className="text-sm text-muted-foreground">Storage</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          {/* Application Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="glass">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium">Response Time</h3>
                </div>
                <div className="text-2xl font-bold">142ms</div>
                <div className="text-xs text-success">-12% from last hour</div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-medium">Throughput</h3>
                </div>
                <div className="text-2xl font-bold">1.2k</div>
                <div className="text-xs text-muted-foreground">requests/min</div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <h3 className="text-sm font-medium">Error Rate</h3>
                </div>
                <div className="text-2xl font-bold">0.03%</div>
                <div className="text-xs text-success">-0.02% from yesterday</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="global" className="space-y-6">
          {/* Global Status */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Global Infrastructure Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {regions.map((region) => (
                  <div key={region.region} className="p-4 border rounded-lg glass">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{region.region}</h3>
                      <div className={`flex items-center gap-1 ${getStatusColor(region.status)}`}>
                        {getStatusIcon(region.status)}
                        <Badge variant={region.status === 'healthy' ? 'default' : region.status === 'degraded' ? 'secondary' : 'destructive'}>
                          {region.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Latency:</span>
                        <span>{region.latency}ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uptime:</span>
                        <span>{region.uptime}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};