import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  TrendingUp,
  TrendingDown,
  Play,
  Pause,
  BarChart3,
  Users,
  Target,
  Award
} from "lucide-react";

export const ABTestingDashboard = () => {
  const activeTests = [
    {
      id: "AB-001",
      name: "New Onboarding Flow",
      description: "Testing simplified vs detailed onboarding process",
      status: "running",
      participants: 2456,
      confidence: 95,
      improvement: "+12.3%",
      winner: "Variant B",
      daysLeft: 3
    },
    {
      id: "AB-002", 
      name: "Pricing Page Layout",
      description: "Comparing feature-focused vs benefit-focused pricing presentation",
      status: "running",
      participants: 1834,
      confidence: 87,
      improvement: "+8.7%",
      winner: "Variant A",
      daysLeft: 7
    },
    {
      id: "AB-003",
      name: "Dashboard Widget Order",
      description: "Testing different arrangements of dashboard widgets",
      status: "draft",
      participants: 0,
      confidence: 0,
      improvement: null,
      winner: null,
      daysLeft: null
    }
  ];

  const completedTests = [
    {
      id: "AB-004",
      name: "CTA Button Colors",
      improvement: "+23.1%",
      winner: "Green Button",
      completedDate: "2024-05-15",
      participants: 3456
    },
    {
      id: "AB-005",
      name: "Email Subject Lines",
      improvement: "+15.8%",
      winner: "Personalized Subject",
      completedDate: "2024-05-10",
      participants: 8934
    },
    {
      id: "AB-006",
      name: "Feature Tour Length",
      improvement: "+9.4%",
      winner: "Shorter Tour",
      completedDate: "2024-05-05",
      participants: 2134
    }
  ];

  const testMetrics = [
    {
      metric: "Active Tests",
      value: "2",
      description: "Currently running experiments"
    },
    {
      metric: "Avg Improvement",
      value: "+18.7%",
      description: "Average conversion improvement"
    },
    {
      metric: "Total Participants",
      value: "12.4K",
      description: "Users in active tests"
    },
    {
      metric: "Success Rate",
      value: "78%",
      description: "Tests with positive results"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'draft': return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      case 'completed': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'paused': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Test Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testMetrics.map((metric) => (
          <Card key={metric.metric} className="glass border-0 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.metric}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Tests */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Active A/B Tests
              </CardTitle>
              <CardDescription>
                Currently running experiments and their performance
              </CardDescription>
            </div>
            <Button>
              <Play className="h-4 w-4 mr-2" />
              Create Test
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activeTests.map((test) => (
              <div key={test.id} className="border border-border/50 rounded-lg p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-muted-foreground">{test.id}</span>
                      <Badge className={getStatusColor(test.status)}>
                        {test.status}
                      </Badge>
                      {test.status === 'running' && test.daysLeft && (
                        <Badge variant="secondary">
                          {test.daysLeft} days left
                        </Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{test.name}</h3>
                    <p className="text-muted-foreground text-sm">{test.description}</p>
                  </div>
                  
                  {test.status === 'running' && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  )}
                </div>

                {test.status === 'running' && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-muted/10">
                      <Users className="h-5 w-5 text-primary mx-auto mb-2" />
                      <div className="font-bold">{test.participants.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Participants</div>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-muted/10">
                      <Target className="h-5 w-5 text-primary mx-auto mb-2" />
                      <div className={`font-bold ${getConfidenceColor(test.confidence)}`}>
                        {test.confidence}%
                      </div>
                      <div className="text-xs text-muted-foreground">Confidence</div>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-muted/10">
                      <TrendingUp className="h-5 w-5 text-green-600 mx-auto mb-2" />
                      <div className="font-bold text-green-600">{test.improvement}</div>
                      <div className="text-xs text-muted-foreground">Improvement</div>
                    </div>
                    
                    <div className="text-center p-4 rounded-lg bg-muted/10">
                      <Award className="h-5 w-5 text-primary mx-auto mb-2" />
                      <div className="font-bold">{test.winner}</div>
                      <div className="text-xs text-muted-foreground">Leading</div>
                    </div>
                  </div>
                )}

                {test.status === 'running' && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Statistical Significance</span>
                      <span className={`font-bold ${getConfidenceColor(test.confidence)}`}>
                        {test.confidence}%
                      </span>
                    </div>
                    <Progress value={test.confidence} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Tests */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Completed Tests
          </CardTitle>
          <CardDescription>
            Recent test results and their impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/10 border border-border/50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-sm text-muted-foreground">{test.id}</span>
                    <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                      completed
                    </Badge>
                  </div>
                  <div className="font-semibold">{test.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {test.participants.toLocaleString()} participants • Completed {test.completedDate}
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-green-600">{test.improvement}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Winner: {test.winner}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Recommendations */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Test Recommendations
          </CardTitle>
          <CardDescription>
            AI-powered suggestions for new experiments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Smart Test Suggestions</h3>
            <p className="text-muted-foreground mb-4">
              AI analyzes user behavior patterns to suggest high-impact experiments.
            </p>
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              Get Recommendations
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};