import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Brain, 
  MessageSquare, 
  Lightbulb, 
  AlertTriangle, 
  CheckCircle,
  Sparkles,
  Zap,
  Send,
  Bot,
  User
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  actions?: Array<{
    label: string;
    action: string;
    variant?: 'default' | 'outline' | 'destructive';
  }>;
}

interface AIRecommendation {
  id: string;
  type: 'optimization' | 'security' | 'performance' | 'cost';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'high' | 'medium' | 'low';
  savings?: string;
  action: string;
}

export const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your AI assistant for EnvSync. I can help you optimize environments, resolve conflicts, troubleshoot issues, and much more. What would you like to work on today?",
      timestamp: new Date(),
      suggestions: [
        "Optimize my production environment",
        "Check for dependency conflicts",
        "Analyze resource usage patterns",
        "Generate environment documentation"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const recommendations: AIRecommendation[] = [
    {
      id: '1',
      type: 'optimization',
      title: 'Environment Resource Optimization',
      description: 'Your production environment is over-provisioned. You can reduce costs by 35% without impacting performance.',
      impact: 'high',
      effort: 'low',
      savings: '$1,200/month',
      action: 'Apply optimization'
    },
    {
      id: '2',
      type: 'security',
      title: 'Dependency Vulnerability Detected',
      description: 'Found 3 high-risk vulnerabilities in your Node.js dependencies. Updates available.',
      impact: 'high',
      effort: 'medium',
      action: 'Update dependencies'
    },
    {
      id: '3',
      type: 'performance',
      title: 'Database Connection Pool Tuning',
      description: 'Your database connection pool can be optimized for better performance during peak hours.',
      impact: 'medium',
      effort: 'low',
      action: 'Optimize pool settings'
    },
    {
      id: '4',
      type: 'cost',
      title: 'Unused Resources Cleanup',
      description: 'Found 12 unused environment instances consuming $340/month. Safe to terminate.',
      impact: 'medium',
      effort: 'low',
      savings: '$340/month',
      action: 'Clean up resources'
    }
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        actions: [
          { label: 'Apply Recommendation', action: 'apply', variant: 'default' },
          { label: 'Learn More', action: 'learn', variant: 'outline' }
        ]
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('optimize') || lowerInput.includes('performance')) {
      return "I've analyzed your environment and found several optimization opportunities. Your production environment is using 40% more resources than needed. I recommend:\n\n1. Reducing instance size from m5.large to m5.medium\n2. Enabling auto-scaling based on CPU utilization\n3. Implementing connection pooling for your database\n\nThis could save you approximately $1,200/month while maintaining performance.";
    }
    
    if (lowerInput.includes('conflict') || lowerInput.includes('dependency')) {
      return "I've detected potential dependency conflicts in your environment:\n\n⚠️ React 18.2.0 conflicts with react-router-dom 5.3.0\n⚠️ Node.js 18.x may have compatibility issues with bcrypt 3.0.8\n\nI recommend upgrading to:\n- react-router-dom 6.8.0\n- bcrypt 5.1.0\n\nShall I create a migration plan for these updates?";
    }
    
    if (lowerInput.includes('security') || lowerInput.includes('vulnerability')) {
      return "Security scan complete! Found 3 high-priority vulnerabilities:\n\n🔴 Critical: lodash 4.17.15 (CVE-2021-23337)\n🟡 Medium: express 4.17.1 (CVE-2022-24999)\n🟡 Medium: axios 0.21.1 (CVE-2021-3749)\n\nI can automatically update these packages and run compatibility tests. Would you like me to proceed?";
    }
    
    return "I understand you're looking for help with your environment. Based on your request, I recommend running a comprehensive analysis. I can help you with optimization, security scanning, dependency management, and more. What specific area would you like to focus on?";
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'optimization': return <Zap className="h-4 w-4 text-primary" />;
      case 'security': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'performance': return <Sparkles className="h-4 w-4 text-warning" />;
      case 'cost': return <Lightbulb className="h-4 w-4 text-success" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* AI Chat Interface */}
      <div className="lg:col-span-2">
        <Card className="glass h-full flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Assistant
              <Badge variant="outline" className="ml-auto">
                <Sparkles className="h-3 w-3 mr-1" />
                Powered by AI
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${
                      message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                        
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-6"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                        
                        {message.actions && (
                          <div className="flex gap-2 mt-3">
                            {message.actions.map((action, index) => (
                              <Button
                                key={index}
                                variant={action.variant || 'outline'}
                                size="sm"
                                className="text-xs h-6"
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Input */}
            <div className="p-6 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about your environments..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations Sidebar */}
      <div className="space-y-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" />
              Smart Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-start gap-2 mb-2">
                  {getRecommendationIcon(rec.type)}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{rec.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <div className="flex gap-2">
                    <Badge variant="outline" className={`text-xs ${getImpactColor(rec.impact)}`}>
                      {rec.impact} impact
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {rec.effort} effort
                    </Badge>
                  </div>
                  {rec.savings && (
                    <span className="text-xs font-medium text-success">{rec.savings}</span>
                  )}
                </div>
                
                <Button size="sm" className="w-full mt-3 h-7 text-xs">
                  {rec.action}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
              <CheckCircle className="h-3 w-3 mr-2" />
              Run Health Check
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
              <AlertTriangle className="h-3 w-3 mr-2" />
              Scan Vulnerabilities
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
              <Sparkles className="h-3 w-3 mr-2" />
              Optimize Resources
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-xs h-8">
              <MessageSquare className="h-3 w-3 mr-2" />
              Generate Documentation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};