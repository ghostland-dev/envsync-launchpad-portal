import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Bug,
  Zap,
  Clock,
  TrendingDown,
  TrendingUp,
  ExternalLink,
  Filter,
  RefreshCw
} from "lucide-react";

export const ErrorTracking = () => {
  const errorOverview = [
    {
      title: "Total Errors",
      value: "247",
      change: "-23%",
      trend: "up",
      icon: AlertTriangle,
      severity: "medium"
    },
    {
      title: "Critical Errors",
      value: "12",
      change: "-41%",
      trend: "up",
      icon: Bug,
      severity: "high"
    },
    {
      title: "Error Rate",
      value: "0.8%",
      change: "-15%",
      trend: "up",
      icon: Zap,
      severity: "low"
    },
    {
      title: "MTTR",
      value: "23min",
      change: "-12%",
      trend: "up",
      icon: Clock,
      severity: "medium"
    }
  ];

  const errorsByCategory = [
    { category: "API Errors", count: 89, percentage: 36, trend: "down" },
    { category: "Sync Failures", count: 67, percentage: 27, trend: "down" },
    { category: "Authentication", count: 45, percentage: 18, trend: "stable" },
    { category: "Configuration", count: 28, percentage: 11, trend: "up" },
    { category: "Network", count: 18, percentage: 8, trend: "down" }
  ];

  const recentErrors = [
    {
      id: "E-001",
      title: "Environment sync timeout",
      description: "Timeout while syncing large environment configuration",
      severity: "high",
      timestamp: "2 minutes ago",
      affected: 23,
      status: "investigating"
    },
    {
      id: "E-002", 
      title: "API rate limit exceeded",
      description: "GitHub API rate limit reached during dependency detection",
      severity: "medium",
      timestamp: "15 minutes ago",
      affected: 8,
      status: "resolved"
    },
    {
      id: "E-003",
      title: "Database connection pool exhausted",
      description: "High load causing database connection issues",
      severity: "critical",
      timestamp: "1 hour ago",
      affected: 156,
      status: "monitoring"
    },
    {
      id: "E-004",
      title: "Template validation failed",
      description: "Invalid template configuration causing setup failures",
      severity: "medium",
      timestamp: "2 hours ago",
      affected: 12,
      status: "resolved"
    }
  ];

  const errorTrends = [
    { metric: "24h Error Count", value: 89, change: "-23%" },
    { metric: "7d Average", value: 156, change: "-15%" },
    { metric: "30d Average", value: 234, change: "-8%" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'investigating': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'monitoring': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Error Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {errorOverview.map((metric) => (
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
                  {metric.trend === 'up' ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
                  {metric.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Errors by Category */}
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5" />
              Errors by Category
            </CardTitle>
            <CardDescription>
              Distribution of errors across different categories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errorsByCategory.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{category.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{category.count}</span>
                    <Badge 
                      variant={category.trend === 'down' ? 'default' : category.trend === 'up' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {category.trend === 'down' ? <TrendingDown className="h-3 w-3" /> : 
                       category.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : '→'}
                    </Badge>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${category.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Error Trends */}
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Error Trends
            </CardTitle>
            <CardDescription>
              Error count trends over time
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {errorTrends.map((trend) => (
              <div key={trend.metric} className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/50">
                <div>
                  <div className="font-semibold">{trend.metric}</div>
                  <div className="text-sm text-muted-foreground">errors</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{trend.value}</div>
                  <Badge variant="default" className="text-xs">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    {trend.change}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Errors */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Recent Errors
              </CardTitle>
              <CardDescription>
                Latest errors and incidents requiring attention
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentErrors.map((error) => (
              <div key={error.id} className="border border-border/50 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-muted-foreground">{error.id}</span>
                      <Badge className={getSeverityColor(error.severity)}>
                        {error.severity}
                      </Badge>
                      <Badge className={getStatusColor(error.status)}>
                        {error.status}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-lg mb-1">{error.title}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{error.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{error.timestamp}</span>
                      <span>{error.affected} users affected</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};