import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Monitor,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

export const AnalyticsOverview = () => {
  const keyMetrics = [
    {
      title: "Total Users",
      value: "12,453",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      description: "Active users this month"
    },
    {
      title: "Environment Syncs",
      value: "98,432",
      change: "+23.1%",
      trend: "up",
      icon: Zap,
      description: "Successful syncs this month"
    },
    {
      title: "Success Rate",
      value: "99.2%",
      change: "+0.3%",
      trend: "up",
      icon: CheckCircle,
      description: "Environment setup success rate"
    },
    {
      title: "Avg Setup Time",
      value: "2.3 min",
      change: "-15.2%",
      trend: "up",
      icon: Clock,
      description: "Average environment setup time"
    }
  ];

  const featureAdoption = [
    { name: "Auto-detection", adoption: 87, users: 10832 },
    { name: "Team Collaboration", adoption: 65, users: 8094 },
    { name: "Custom Templates", adoption: 42, users: 5230 },
    { name: "CI/CD Integration", adoption: 38, users: 4732 },
    { name: "Multi-platform Sync", adoption: 56, users: 6974 }
  ];

  const teamMetrics = [
    {
      metric: "Teams Created",
      value: "1,847",
      description: "New teams this month"
    },
    {
      metric: "Avg Team Size",
      value: "6.7",
      description: "Members per team"
    },
    {
      metric: "Collaboration Rate",
      value: "78%",
      description: "Teams actively collaborating"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric) => (
          <Card key={metric.title} className="glass border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
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
                <p className="text-xs text-muted-foreground ml-2">
                  {metric.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Adoption & Team Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Feature Adoption */}
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle>Feature Adoption</CardTitle>
            <CardDescription>
              How users are adopting different EnvSync features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {featureAdoption.map((feature) => (
              <div key={feature.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{feature.name}</span>
                  <div className="text-right">
                    <span className="font-bold">{feature.adoption}%</span>
                    <span className="text-muted-foreground ml-2">
                      ({feature.users.toLocaleString()} users)
                    </span>
                  </div>
                </div>
                <Progress value={feature.adoption} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Team Collaboration Metrics */}
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle>Team Collaboration</CardTitle>
            <CardDescription>
              Insights into team usage and collaboration patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {teamMetrics.map((metric) => (
              <div key={metric.metric} className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/50">
                <div>
                  <div className="font-semibold">{metric.metric}</div>
                  <div className="text-sm text-muted-foreground">{metric.description}</div>
                </div>
                <div className="text-2xl font-bold text-primary">{metric.value}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Real-time Activity */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Real-time Activity
          </CardTitle>
          <CardDescription>
            Live activity across the EnvSync platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="text-3xl font-bold text-primary">847</div>
              <div className="text-sm text-muted-foreground">Active environments</div>
              <Badge variant="secondary" className="mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live
              </Badge>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-600">23</div>
              <div className="text-sm text-muted-foreground">Syncs in progress</div>
              <Badge variant="secondary" className="mt-2">
                <Clock className="h-3 w-3 mr-1" />
                Processing
              </Badge>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-600">12</div>
              <div className="text-sm text-muted-foreground">Teams collaborating</div>
              <Badge variant="secondary" className="mt-2">
                <Users className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};