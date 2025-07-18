import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  Clock, 
  Server, 
  Wifi,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

export const PerformanceMetrics = () => {
  const performanceOverview = [
    {
      title: "Avg Load Time",
      value: "1.2s",
      change: "-15%",
      trend: "up",
      icon: Clock,
      status: "good"
    },
    {
      title: "Sync Speed",
      value: "847ms",
      change: "-23%",
      trend: "up",
      icon: Zap,
      status: "excellent"
    },
    {
      title: "Uptime",
      value: "99.9%",
      change: "+0.1%",
      trend: "up",
      icon: Server,
      status: "excellent"
    },
    {
      title: "API Response",
      value: "245ms",
      change: "+8%",
      trend: "down",
      icon: Activity,
      status: "warning"
    }
  ];

  const syncPerformance = [
    { operation: "Environment Setup", time: "1.2s", success: 99.8, count: 8432 },
    { operation: "Dependency Install", time: "45s", success: 98.5, count: 7234 },
    { operation: "Config Sync", time: "0.8s", success: 99.9, count: 9876 },
    { operation: "Template Apply", time: "2.1s", success: 97.2, count: 5432 },
    { operation: "Team Collaboration", time: "0.5s", success: 99.5, count: 6789 }
  ];

  const systemHealth = [
    { component: "API Gateway", status: "healthy", uptime: "99.9%", response: "120ms" },
    { component: "Database", status: "healthy", uptime: "99.8%", response: "45ms" },
    { component: "Cache Layer", status: "warning", uptime: "98.5%", response: "15ms" },
    { component: "CDN", status: "healthy", uptime: "99.9%", response: "80ms" },
    { component: "Background Jobs", status: "healthy", uptime: "99.7%", response: "2.1s" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceOverview.map((metric) => (
          <Card key={metric.title} className="glass border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(metric.status)}`}></div>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center pt-1">
                <Badge 
                  variant={metric.trend === 'up' ? 'default' : 'destructive'} 
                  className="text-xs"
                >
                  {metric.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Sync Performance */}
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Sync Performance
            </CardTitle>
            <CardDescription>
              Performance metrics for environment sync operations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {syncPerformance.map((sync) => (
              <div key={sync.operation} className="space-y-3 p-4 rounded-lg bg-muted/10 border border-border/50">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{sync.operation}</span>
                  <div className="text-right text-sm">
                    <div className="font-bold">{sync.time}</div>
                    <div className="text-muted-foreground">{sync.count.toLocaleString()} ops</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>Success Rate</span>
                    <span className="font-bold">{sync.success}%</span>
                  </div>
                  <Progress value={sync.success} className="h-2" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>
              Real-time status of core system components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((component) => (
              <div key={component.component} className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/50">
                <div className="flex items-center gap-3">
                  {component.status === 'healthy' ? (
                    <CheckCircle className={`h-5 w-5 ${getHealthColor(component.status)}`} />
                  ) : (
                    <AlertTriangle className={`h-5 w-5 ${getHealthColor(component.status)}`} />
                  )}
                  <div>
                    <div className="font-medium">{component.component}</div>
                    <div className="text-sm text-muted-foreground">
                      Response: {component.response}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={component.status === 'healthy' ? 'default' : 'destructive'}
                    className="text-xs mb-1"
                  >
                    {component.status}
                  </Badge>
                  <div className="text-sm text-muted-foreground">{component.uptime}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Performance Benchmarks */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Performance Benchmarks
          </CardTitle>
          <CardDescription>
            Historical performance trends and comparisons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
              <div className="text-3xl font-bold text-green-600">98.7%</div>
              <div className="text-sm text-muted-foreground mb-2">Target: 95%</div>
              <div className="text-xs font-medium text-green-600">Environment Setup Success</div>
              <Badge variant="secondary" className="mt-2 text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                Above target
              </Badge>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-600">1.2s</div>
              <div className="text-sm text-muted-foreground mb-2">Target: 2.0s</div>
              <div className="text-xs font-medium text-blue-600">Average Load Time</div>
              <Badge variant="secondary" className="mt-2 text-blue-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                Excellent
              </Badge>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-600">99.9%</div>
              <div className="text-sm text-muted-foreground mb-2">Target: 99.5%</div>
              <div className="text-xs font-medium text-purple-600">System Uptime</div>
              <Badge variant="secondary" className="mt-2 text-purple-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Exceeds SLA
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};