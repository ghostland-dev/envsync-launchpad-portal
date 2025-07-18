import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  TrendingUp,
  Calendar,
  BarChart3,
  Download
} from "lucide-react";

export const CohortAnalysis = () => {
  const cohortData = [
    {
      cohort: "Jan 2024",
      users: 1250,
      week1: 85,
      week2: 72,
      week4: 58,
      week8: 45,
      week12: 38
    },
    {
      cohort: "Feb 2024", 
      users: 1456,
      week1: 88,
      week2: 75,
      week4: 62,
      week8: 49,
      week12: 42
    },
    {
      cohort: "Mar 2024",
      users: 1678,
      week1: 91,
      week2: 78,
      week4: 65,
      week8: 52,
      week12: null
    },
    {
      cohort: "Apr 2024",
      users: 1834,
      week1: 89,
      week2: 76,
      week4: 63,
      week8: null,
      week12: null
    },
    {
      cohort: "May 2024",
      users: 1923,
      week1: 87,
      week2: 74,
      week4: null,
      week8: null,
      week12: null
    }
  ];

  const retentionInsights = [
    {
      metric: "Average 1-Week Retention",
      value: "88.0%",
      change: "+2.3%",
      description: "Users who return after first week"
    },
    {
      metric: "Average 4-Week Retention", 
      value: "62.0%",
      change: "+4.1%",
      description: "Users who remain active after a month"
    },
    {
      metric: "Average 12-Week Retention",
      value: "40.0%",
      change: "+5.7%",
      description: "Long-term user retention rate"
    }
  ];

  const churnPrediction = [
    {
      risk: "High Risk",
      count: 234,
      percentage: 15,
      color: "bg-red-500"
    },
    {
      risk: "Medium Risk",
      count: 456,
      percentage: 30,
      color: "bg-yellow-500"
    },
    {
      risk: "Low Risk",
      count: 834,
      percentage: 55,
      color: "bg-green-500"
    }
  ];

  const getRetentionColor = (percentage: number | null) => {
    if (percentage === null) return 'bg-gray-200';
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    if (percentage >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getRetentionOpacity = (percentage: number | null) => {
    if (percentage === null) return '';
    if (percentage >= 80) return 'opacity-100';
    if (percentage >= 60) return 'opacity-75';
    if (percentage >= 40) return 'opacity-50';
    return 'opacity-25';
  };

  return (
    <div className="space-y-6">
      {/* Retention Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {retentionInsights.map((insight) => (
          <Card key={insight.metric} className="glass border-0 shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {insight.metric}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{insight.value}</div>
              <div className="flex items-center gap-2">
                <Badge variant="default" className="text-xs">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {insight.change}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cohort Retention Table */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Cohort Retention Analysis
              </CardTitle>
              <CardDescription>
                User retention rates by registration cohort
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Cohort</th>
                  <th className="text-center p-3 font-semibold">Users</th>
                  <th className="text-center p-3 font-semibold">Week 1</th>
                  <th className="text-center p-3 font-semibold">Week 2</th>
                  <th className="text-center p-3 font-semibold">Week 4</th>
                  <th className="text-center p-3 font-semibold">Week 8</th>
                  <th className="text-center p-3 font-semibold">Week 12</th>
                </tr>
              </thead>
              <tbody>
                {cohortData.map((cohort) => (
                  <tr key={cohort.cohort} className="border-b border-border/50">
                    <td className="p-3 font-medium">{cohort.cohort}</td>
                    <td className="p-3 text-center font-medium">{cohort.users.toLocaleString()}</td>
                    <td className="p-3 text-center">
                      {cohort.week1 !== null && (
                        <div className={`inline-block px-3 py-1 rounded text-white text-sm font-medium ${getRetentionColor(cohort.week1)} ${getRetentionOpacity(cohort.week1)}`}>
                          {cohort.week1}%
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {cohort.week2 !== null && (
                        <div className={`inline-block px-3 py-1 rounded text-white text-sm font-medium ${getRetentionColor(cohort.week2)} ${getRetentionOpacity(cohort.week2)}`}>
                          {cohort.week2}%
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {cohort.week4 !== null && (
                        <div className={`inline-block px-3 py-1 rounded text-white text-sm font-medium ${getRetentionColor(cohort.week4)} ${getRetentionOpacity(cohort.week4)}`}>
                          {cohort.week4}%
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {cohort.week8 !== null && (
                        <div className={`inline-block px-3 py-1 rounded text-white text-sm font-medium ${getRetentionColor(cohort.week8)} ${getRetentionOpacity(cohort.week8)}`}>
                          {cohort.week8}%
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {cohort.week12 !== null && (
                        <div className={`inline-block px-3 py-1 rounded text-white text-sm font-medium ${getRetentionColor(cohort.week12)} ${getRetentionOpacity(cohort.week12)}`}>
                          {cohort.week12}%
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Churn Risk Prediction */}
      <Card className="glass border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Churn Risk Prediction
          </CardTitle>
          <CardDescription>
            ML-powered churn risk assessment for current users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {churnPrediction.map((risk) => (
              <div key={risk.risk} className="text-center p-6 rounded-lg bg-muted/10 border border-border/50">
                <div className={`w-16 h-16 rounded-full ${risk.color} mx-auto mb-4 flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{risk.percentage}%</span>
                </div>
                <div className="text-lg font-semibold mb-1">{risk.risk}</div>
                <div className="text-2xl font-bold text-primary mb-1">{risk.count}</div>
                <div className="text-sm text-muted-foreground">users at risk</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};