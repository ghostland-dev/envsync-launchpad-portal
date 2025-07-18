import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Cpu, 
  Database, 
  Shield, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  BarChart3,
  Target
} from 'lucide-react';

interface OptimizationSuggestion {
  id: string;
  category: 'performance' | 'cost' | 'security' | 'reliability';
  title: string;
  description: string;
  currentValue: number;
  suggestedValue: number;
  unit: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  potentialSavings?: string;
  riskLevel: 'low' | 'medium' | 'high';
  confidence: number;
}

export const SmartOptimization: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const suggestions: OptimizationSuggestion[] = [
    {
      id: '1',
      category: 'performance',
      title: 'CPU Allocation Optimization',
      description: 'Reduce CPU allocation based on historical usage patterns. Your environments typically use 65% of allocated resources.',
      currentValue: 4,
      suggestedValue: 2.5,
      unit: 'vCPUs',
      impact: 'medium',
      effort: 'low',
      potentialSavings: '$240/month',
      riskLevel: 'low',
      confidence: 87
    },
    {
      id: '2',
      category: 'cost',
      title: 'Instance Right-sizing',
      description: 'Switch from m5.large to m5.medium instances. Analysis shows no performance degradation expected.',
      currentValue: 8,
      suggestedValue: 4,
      unit: 'GB RAM',
      impact: 'high',
      effort: 'low',
      potentialSavings: '$480/month',
      riskLevel: 'low',
      confidence: 92
    },
    {
      id: '3',
      category: 'security',
      title: 'Database Connection Encryption',
      description: 'Enable TLS 1.3 for database connections to improve security without significant performance impact.',
      currentValue: 0,
      suggestedValue: 1,
      unit: 'enabled',
      impact: 'high',
      effort: 'medium',
      riskLevel: 'low',
      confidence: 95
    },
    {
      id: '4',
      category: 'reliability',
      title: 'Auto-scaling Configuration',
      description: 'Implement predictive auto-scaling based on ML models to prevent resource exhaustion during traffic spikes.',
      currentValue: 50,
      suggestedValue: 80,
      unit: '% threshold',
      impact: 'high',
      effort: 'medium',
      riskLevel: 'medium',
      confidence: 83
    },
    {
      id: '5',
      category: 'performance',
      title: 'Cache Hit Rate Optimization',
      description: 'Increase Redis cache size and optimize cache keys to improve response times by 35%.',
      currentValue: 72,
      suggestedValue: 90,
      unit: '% hit rate',
      impact: 'medium',
      effort: 'low',
      potentialSavings: '$120/month',
      riskLevel: 'low',
      confidence: 89
    }
  ];

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const filteredSuggestions = selectedCategory === 'all' 
    ? suggestions 
    : suggestions.filter(s => s.category === selectedCategory);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-success';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'performance': return <Zap className="h-4 w-4" />;
      case 'cost': return <DollarSign className="h-4 w-4" />;
      case 'security': return <Shield className="h-4 w-4" />;
      case 'reliability': return <CheckCircle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const totalSavings = suggestions
    .filter(s => s.potentialSavings)
    .reduce((acc, s) => {
      const savings = parseInt(s.potentialSavings?.replace(/[^\d]/g, '') || '0');
      return acc + savings;
    }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Smart Optimization</h1>
          <p className="text-muted-foreground">AI-powered recommendations to optimize your environments</p>
        </div>
        <Button onClick={runAnalysis} disabled={isAnalyzing}>
          <Brain className="h-4 w-4 mr-2" />
          {isAnalyzing ? 'Analyzing...' : 'Run AI Analysis'}
        </Button>
      </div>

      {/* Analysis Progress */}
      {isAnalyzing && (
        <Card className="glass">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary animate-pulse" />
                <span className="font-medium">AI Analysis in Progress</span>
              </div>
              <Progress value={66} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Analyzing resource usage patterns, performance metrics, and cost optimization opportunities...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{suggestions.length}</p>
                <p className="text-xs text-muted-foreground">Recommendations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-bold">${totalSavings}</p>
                <p className="text-xs text-muted-foreground">Potential Monthly Savings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-warning" />
              <div>
                <p className="text-2xl font-bold">
                  {Math.round(suggestions.reduce((acc, s) => acc + s.confidence, 0) / suggestions.length)}%
                </p>
                <p className="text-xs text-muted-foreground">Avg Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <p className="text-2xl font-bold">
                  {suggestions.filter(s => s.riskLevel === 'low').length}
                </p>
                <p className="text-xs text-muted-foreground">Low Risk Changes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Optimization Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="cost">Cost</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="reliability">Reliability</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          {filteredSuggestions.map((suggestion) => (
            <Card key={suggestion.id} className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {getCategoryIcon(suggestion.category)}
                    {suggestion.title}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getImpactColor(suggestion.impact)}>
                      {suggestion.impact} impact
                    </Badge>
                    <Badge variant="secondary">
                      {suggestion.effort} effort
                    </Badge>
                    <Badge variant="outline" className={getRiskColor(suggestion.riskLevel)}>
                      {suggestion.riskLevel} risk
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{suggestion.description}</p>
                
                {/* Current vs Suggested */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Current</p>
                    <p className="text-xl font-bold">
                      {suggestion.currentValue} {suggestion.unit}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Suggested</p>
                    <p className="text-xl font-bold text-primary">
                      {suggestion.suggestedValue} {suggestion.unit}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <p className="text-xl font-bold">{suggestion.confidence}%</p>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AI Confidence</span>
                    <span>{suggestion.confidence}%</span>
                  </div>
                  <Progress value={suggestion.confidence} className="h-2" />
                </div>

                {/* Potential Savings */}
                {suggestion.potentialSavings && (
                  <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-success" />
                      <span className="font-medium text-success">
                        Potential Savings: {suggestion.potentialSavings}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    Apply Recommendation
                  </Button>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                  <Button size="sm" variant="outline">
                    Simulate Impact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};