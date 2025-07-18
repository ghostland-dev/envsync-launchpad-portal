import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Eye,
  MousePointer,
  CreditCard,
  CheckCircle
} from "lucide-react";

export const ConversionFunnel = () => {
  const funnelSteps = [
    {
      step: "Visitors",
      count: 15432,
      percentage: 100,
      icon: Users,
      description: "Total website visitors"
    },
    {
      step: "Signups",
      count: 3456,
      percentage: 22.4,
      icon: Eye,
      description: "Users who created accounts"
    },
    {
      step: "First Environment",
      count: 2789,
      percentage: 80.7,
      icon: MousePointer,
      description: "Users who created their first environment"
    },
    {
      step: "Team Creation",
      count: 1567,
      percentage: 56.2,
      icon: Users,
      description: "Users who created or joined teams"
    },
    {
      step: "Paid Conversion",
      count: 789,
      percentage: 50.4,
      icon: CreditCard,
      description: "Users who upgraded to paid plans"
    }
  ];

  const conversionMetrics = [
    {
      metric: "Visitor to Signup",
      rate: "22.4%",
      change: "+3.2%",
      trend: "up"
    },
    {
      metric: "Signup to Active",
      rate: "80.7%",
      change: "+5.1%",
      trend: "up"
    },
    {
      metric: "Free to Paid",
      rate: "22.8%",
      change: "+1.8%",
      trend: "up"
    },
    {
      metric: "Trial to Paid",
      rate: "67.3%",
      change: "+4.5%",
      trend: "up"
    }
  ];

  const dropoffAnalysis = [
    {
      stage: "Landing → Signup",
      dropoff: "77.6%",
      reason: "High friction in signup process",
      recommendation: "Simplify registration form"
    },
    {
      stage: "Signup → First Use",
      dropoff: "19.3%",
      reason: "Onboarding complexity",
      recommendation: "Improve initial user experience"
    },
    {
      stage: "Trial → Payment",
      dropoff: "32.7%",
      reason: "Pricing concerns",
      recommendation: "Enhance value proposition"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Conversion Funnel Visualization */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Conversion Funnel
          </CardTitle>
          <CardDescription>
            User journey from visitor to paid customer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {funnelSteps.map((step, index) => (
            <div key={step.step} className="relative">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/10 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{step.step}</div>
                    <div className="text-sm text-muted-foreground">{step.description}</div>
                  </div>
                </div>
                
                <div className="flex-1 mx-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Conversion Rate</span>
                    <span className="text-sm font-bold">{step.percentage}%</span>
                  </div>
                  <Progress value={step.percentage} className="h-3" />
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold">{step.count.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">users</div>
                </div>
              </div>
              
              {index < funnelSteps.length - 1 && (
                <div className="flex justify-center my-2">
                  <div className="w-px h-4 bg-border"></div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Conversion Metrics */}
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle>Conversion Metrics</CardTitle>
            <CardDescription>
              Key conversion rates across the funnel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {conversionMetrics.map((metric) => (
              <div key={metric.metric} className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/50">
                <div>
                  <div className="font-semibold">{metric.metric}</div>
                  <div className="text-2xl font-bold text-primary">{metric.rate}</div>
                </div>
                <Badge variant="default" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {metric.change}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Dropoff Analysis */}
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle>Dropoff Analysis</CardTitle>
            <CardDescription>
              Where users drop off and why
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dropoffAnalysis.map((analysis) => (
              <div key={analysis.stage} className="p-4 rounded-lg bg-muted/10 border border-border/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{analysis.stage}</span>
                  <Badge variant="destructive">{analysis.dropoff}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  <div className="mb-1"><strong>Reason:</strong> {analysis.reason}</div>
                  <div><strong>Recommendation:</strong> {analysis.recommendation}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};