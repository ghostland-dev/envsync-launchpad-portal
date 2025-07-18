import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  UserPlus, 
  UserMinus,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Clock,
  MousePointer,
  Eye
} from "lucide-react";

export const UserAnalytics = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const userAcquisition = [
    { source: "Organic Search", users: 4234, percentage: 34 },
    { source: "Direct", users: 3456, percentage: 28 },
    { source: "GitHub", users: 2123, percentage: 17 },
    { source: "Social Media", users: 1567, percentage: 13 },
    { source: "Referral", users: 1000, percentage: 8 }
  ];

  const demographics = [
    { region: "North America", users: 5432, percentage: 44 },
    { region: "Europe", users: 3456, percentage: 28 },
    { region: "Asia Pacific", users: 2345, percentage: 19 },
    { region: "South America", users: 789, percentage: 6 },
    { region: "Others", users: 378, percentage: 3 }
  ];

  const deviceBreakdown = [
    { type: "Desktop", icon: Monitor, users: 8945, percentage: 72 },
    { type: "Mobile", icon: Smartphone, users: 2234, percentage: 18 },
    { type: "Tablet", icon: Monitor, users: 1221, percentage: 10 }
  ];

  const behaviorMetrics = [
    {
      metric: "Avg Session Duration",
      value: "12m 34s",
      change: "+8.2%",
      icon: Clock
    },
    {
      metric: "Pages per Session",
      value: "4.7",
      change: "+12.1%",
      icon: Eye
    },
    {
      metric: "Bounce Rate",
      value: "23.4%",
      change: "-5.3%",
      icon: MousePointer
    },
    {
      metric: "Return Visitors",
      value: "67.8%",
      change: "+15.7%",
      icon: Users
    }
  ];

  const topPages = [
    { page: "/dashboard", views: 15432, time: "8m 45s" },
    { page: "/wizard", views: 12345, time: "6m 23s" },
    { page: "/environments", views: 9876, time: "5m 12s" },
    { page: "/settings", views: 7654, time: "3m 45s" },
    { page: "/feedback", views: 5432, time: "4m 18s" }
  ];

  return (
    <div className="space-y-6">
      {/* User Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,453</div>
            <Badge variant="default" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5%
            </Badge>
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Users
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,847</div>
            <Badge variant="default" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              +18.2%
            </Badge>
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Churn Rate
            </CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3%</div>
            <Badge variant="destructive" className="text-xs">
              +0.4%
            </Badge>
          </CardContent>
        </Card>

        <Card className="glass border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Rate
            </CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.9%</div>
            <Badge variant="default" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              +3.1%
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="acquisition" className="space-y-6">
        <TabsList>
          <TabsTrigger value="acquisition">Acquisition</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="heatmaps">Heatmaps</TabsTrigger>
        </TabsList>

        <TabsContent value="acquisition" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* User Acquisition Sources */}
            <Card className="glass border-0 shadow-card">
              <CardHeader>
                <CardTitle>Acquisition Sources</CardTitle>
                <CardDescription>
                  Where your users are coming from
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userAcquisition.map((source) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{source.source}</span>
                      <div className="text-right">
                        <span className="font-bold">{source.users.toLocaleString()}</span>
                        <span className="text-muted-foreground ml-2">({source.percentage}%)</span>
                      </div>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Device Breakdown */}
            <Card className="glass border-0 shadow-card">
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>
                  User device preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {deviceBreakdown.map((device) => (
                  <div key={device.type} className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/50">
                    <div className="flex items-center gap-3">
                      <device.icon className="h-5 w-5 text-primary" />
                      <span className="font-medium">{device.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{device.users.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{device.percentage}%</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {behaviorMetrics.map((metric) => (
              <Card key={metric.metric} className="glass border-0 shadow-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.metric}
                  </CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <Badge variant="default" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {metric.change}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Top Pages */}
          <Card className="glass border-0 shadow-card">
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>
                Most visited pages and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <div key={page.page} className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{page.page}</div>
                        <div className="text-sm text-muted-foreground">Avg. time: {page.time}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{page.views.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">views</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-6">
          <Card className="glass border-0 shadow-card">
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>
                User distribution by region
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {demographics.map((region) => (
                <div key={region.region} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{region.region}</span>
                    <div className="text-right">
                      <span className="font-bold">{region.users.toLocaleString()}</span>
                      <span className="text-muted-foreground ml-2">({region.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={region.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heatmaps" className="space-y-6">
          <Card className="glass border-0 shadow-card">
            <CardHeader>
              <CardTitle>User Interaction Heatmaps</CardTitle>
              <CardDescription>
                Visual representation of user clicks and interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <MousePointer className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Heatmap Analytics</h3>
                <p className="text-muted-foreground mb-4">
                  Interactive heatmaps showing user click patterns, scroll behavior, and attention areas.
                </p>
                <Button>
                  <Eye className="h-4 w-4 mr-2" />
                  View Interactive Heatmaps
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};