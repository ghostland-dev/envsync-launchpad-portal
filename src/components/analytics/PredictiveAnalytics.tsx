import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Brain,
  AlertTriangle,
  Target,
  Users,
  DollarSign,
  Activity,
  Zap
} from "lucide-react";

export const PredictiveAnalytics = () => {
  const predictions = [
    {
      metric: "Churn Risk",
      prediction: "12% of users at high risk",
      confidence: 94,
      trend: "increasing",
      impact: "High",
      timeline: "Next 30 days",
      actionable: true
    },
    {
      metric: "Revenue Growth",
      prediction: "+23% growth expected",
      confidence: 87,
      trend: "positive",
      impact: "High",
      timeline: "Next quarter",
      actionable: false
    },
    {
      metric: "Feature Adoption",
      prediction: "CI/CD integration adoption will increase 45%",
      confidence: 78,
      trend: "positive",
      impact: "Medium",
      timeline: "Next 60 days",
      actionable: true
    },
    {
      metric: "Support Load",
      prediction: "Support tickets will increase 18%",
      confidence: 82,
      trend: "increasing",
      impact: "Medium",
      timeline: "Next 2 weeks",
      actionable: true
    }
  ];

  const churnRiskUsers = [
    {
      id: "U-001",
      name: "TechCorp Team",
      riskScore: 89,
      factors: ["Low engagement", "No recent logins", "Support tickets"],
      lastActivity: "5 days ago",
      accountValue: "$2,400/mo"
    },
    {
      id: "U-002",
      name: "DevFlow Solutions",
      riskScore: 76,
      factors: ["Decreased usage", "Feature complaints"],
      lastActivity: "2 days ago",
      accountValue: "$1,800/mo"
    },
    {
      id: "U-003",
      name: "CloudScale Inc",
      riskScore: 72,
      factors: ["Team size reduction", "Budget concerns"],
      lastActivity: "1 day ago",
      accountValue: "$3,200/mo"
    }
  ];

  const mlInsights = [
    {
      insight: "Users who create 3+ environments in their first week are 85% more likely to become paying customers",
      confidence: 92,
      category: "Conversion"
    },
    {
      insight: "Teams with daily sync activity have 67% lower churn rates",
      confidence: 88,
      category: "Retention"
    },
    {
      insight: "Feature requests submitted by users correlate with 45% higher lifetime value",
      confidence: 84,
      category: "Growth"
    },
    {
      insight: "Support response time under 2 hours reduces churn probability by 34%",
      confidence: 91,
      category: "Support"
    }
  ];

  const recommendations = [
    {
      title: "Proactive Churn Prevention",
      description: "Reach out to high-risk users with personalized retention offers",
      priority: "High",
      impact: "Prevent $47k monthly revenue loss",
      effort: "Low"
    },
    {
      title: "Feature Adoption Campaign",
      description: "Create guided tours for CI/CD integration to boost adoption",
      priority: "Medium",
      impact: "Increase feature usage by 45%",
      effort: "Medium"
    },
    {
      title: "Support Team Scaling",
      description: "Add 2 support agents to handle predicted ticket increase",
      priority: "Medium",
      impact: "Maintain <2h response time",
      effort: "High"
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (score: number) => {
    if (score >= 80) return 'bg-red-500';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-yellow-500';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Predictions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {predictions.map((prediction) => (
          <Card key={prediction.metric} className="glass border-0 shadow-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{prediction.metric}</CardTitle>
                <Brain className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-xl font-bold">{prediction.prediction}</div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Confidence Level</span>
                  <span className={`font-bold ${getConfidenceColor(prediction.confidence)}`}>
                    {prediction.confidence}%
                  </span>
                </div>
                <Progress value={prediction.confidence} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Impact</div>
                  <Badge variant={prediction.impact === 'High' ? 'destructive' : 'secondary'}>
                    {prediction.impact}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Timeline</div>
                  <div className="font-medium">{prediction.timeline}</div>
                </div>
              </div>
              
              {prediction.actionable && (
                <Button size="sm" className="w-full">
                  <Target className="h-4 w-4 mr-2" />
                  View Actions
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Churn Risk Users */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            High Churn Risk Users
          </CardTitle>
          <CardDescription>
            Users with highest probability of churning based on ML analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {churnRiskUsers.map((user) => (
              <div key={user.id} className="border border-border/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-muted-foreground">{user.id}</span>
                      <div className={`w-3 h-3 rounded-full ${getRiskColor(user.riskScore)}`}></div>
                      <span className="font-bold text-sm">{user.riskScore}% risk</span>
                    </div>
                    <h4 className="font-semibold text-lg">{user.name}</h4>
                    <div className="text-sm text-muted-foreground">
                      Last activity: {user.lastActivity} • Value: {user.accountValue}
                    </div>
                  </div>
                  <Button size="sm">
                    Contact Now
                  </Button>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm font-medium">Risk Factors:</div>
                  <div className="flex flex-wrap gap-2">
                    {user.factors.map((factor) => (
                      <Badge key={factor} variant="secondary" className="text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ML Insights */}
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              ML Insights
            </CardTitle>
            <CardDescription>
              Data-driven patterns discovered by machine learning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mlInsights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/10 border border-border/50 space-y-3">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {insight.category}
                  </Badge>
                  <span className={`text-sm font-bold ${getConfidenceColor(insight.confidence)}`}>
                    {insight.confidence}% confidence
                  </span>
                </div>
                <p className="text-sm font-medium">{insight.insight}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Recommendations */}
        <Card className="glass border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recommended Actions
            </CardTitle>
            <CardDescription>
              AI-generated recommendations based on predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/10 border border-border/50 space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="font-semibold">{rec.title}</h4>
                  <Badge className={getPriorityColor(rec.priority)}>
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{rec.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-green-600 font-medium">{rec.impact}</span>
                  <span className="text-muted-foreground">Effort: {rec.effort}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Predictive Models Performance */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Model Performance
          </CardTitle>
          <CardDescription>
            Accuracy and performance metrics of predictive models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-600">94%</div>
              <div className="text-sm text-muted-foreground mb-2">Churn Prediction</div>
              <div className="text-xs font-medium text-blue-600">Model Accuracy</div>
              <Badge variant="secondary" className="mt-2 text-blue-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                Excellent
              </Badge>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
              <div className="text-3xl font-bold text-green-600">87%</div>
              <div className="text-sm text-muted-foreground mb-2">Revenue Forecasting</div>
              <div className="text-xs font-medium text-green-600">Model Accuracy</div>
              <Badge variant="secondary" className="mt-2 text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                Good
              </Badge>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-600">91%</div>
              <div className="text-sm text-muted-foreground mb-2">Feature Adoption</div>
              <div className="text-xs font-medium text-purple-600">Model Accuracy</div>
              <Badge variant="secondary" className="mt-2 text-purple-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                Excellent
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};