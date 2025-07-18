import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Zap, 
  Monitor, 
  AlertTriangle,
  Download,
  Calendar,
  Filter,
  RefreshCw
} from "lucide-react";
import { AnalyticsOverview } from "@/components/analytics/AnalyticsOverview";
import { UserAnalytics } from "@/components/analytics/UserAnalytics";
import { PerformanceMetrics } from "@/components/analytics/PerformanceMetrics";
import { ErrorTracking } from "@/components/analytics/ErrorTracking";
import { ConversionFunnel } from "@/components/analytics/ConversionFunnel";
import { CohortAnalysis } from "@/components/analytics/CohortAnalysis";
import { ABTestingDashboard } from "@/components/analytics/ABTestingDashboard";
import { PredictiveAnalytics } from "@/components/analytics/PredictiveAnalytics";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('30d');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Track usage, performance, and user behavior across EnvSync
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 days
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="errors" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Errors
            </TabsTrigger>
            <TabsTrigger value="conversion" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Conversion
            </TabsTrigger>
            <TabsTrigger value="cohorts" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Cohorts
            </TabsTrigger>
            <TabsTrigger value="ab-testing" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              A/B Tests
            </TabsTrigger>
            <TabsTrigger value="predictive" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Predictive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AnalyticsOverview />
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <UserAnalytics />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <PerformanceMetrics />
          </TabsContent>

          <TabsContent value="errors" className="space-y-6">
            <ErrorTracking />
          </TabsContent>

          <TabsContent value="conversion" className="space-y-6">
            <ConversionFunnel />
          </TabsContent>

          <TabsContent value="cohorts" className="space-y-6">
            <CohortAnalysis />
          </TabsContent>

          <TabsContent value="ab-testing" className="space-y-6">
            <ABTestingDashboard />
          </TabsContent>

          <TabsContent value="predictive" className="space-y-6">
            <PredictiveAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;