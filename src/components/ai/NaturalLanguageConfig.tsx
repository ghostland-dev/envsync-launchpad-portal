import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  MessageSquare, 
  Sparkles, 
  Settings, 
  Play,
  Code,
  FileText,
  Wand2
} from 'lucide-react';

interface ConfigSuggestion {
  field: string;
  value: string;
  reason: string;
  confidence: number;
}

export const NaturalLanguageConfig: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<ConfigSuggestion[]>([]);

  const [samplePrompts] = useState([
    "Create a Node.js environment with Redis cache and PostgreSQL database for a high-traffic web application",
    "Set up a Python environment for machine learning with GPU support and Jupyter notebooks",
    "Configure a React development environment with hot reload and ESLint",
    "Build a microservices environment with Docker containers and load balancing"
  ]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockConfig = generateMockConfig(prompt);
      const mockSuggestions = generateMockSuggestions(prompt);
      
      setGeneratedConfig(mockConfig);
      setSuggestions(mockSuggestions);
      setIsGenerating(false);
    }, 2000);
  };

  const generateMockConfig = (prompt: string): any => {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('node') || lowerPrompt.includes('javascript')) {
      return {
        name: "nodejs-web-app",
        runtime: "Node.js 18.x",
        services: [
          { name: "app", type: "nodejs", port: 3000 },
          { name: "redis", type: "redis", version: "7.0" },
          { name: "postgres", type: "postgresql", version: "15" }
        ],
        environment: {
          NODE_ENV: "production",
          PORT: "3000",
          REDIS_URL: "redis://redis:6379",
          DATABASE_URL: "postgres://user:pass@postgres:5432/app"
        },
        scaling: {
          min_instances: 2,
          max_instances: 10,
          cpu_threshold: 70
        }
      };
    }
    
    if (lowerPrompt.includes('python') || lowerPrompt.includes('ml') || lowerPrompt.includes('machine learning')) {
      return {
        name: "python-ml-environment",
        runtime: "Python 3.11",
        services: [
          { name: "jupyter", type: "jupyter", port: 8888 },
          { name: "ml-api", type: "python", port: 5000 }
        ],
        resources: {
          gpu: "nvidia-tesla-v100",
          memory: "32GB",
          cpu: "8 cores"
        },
        packages: [
          "tensorflow==2.13.0",
          "pytorch==2.0.1",
          "scikit-learn==1.3.0",
          "jupyter==1.0.0"
        ]
      };
    }
    
    return {
      name: "custom-environment",
      runtime: "Multi-language",
      services: [
        { name: "web", type: "web-server", port: 80 },
        { name: "api", type: "api-server", port: 8080 }
      ],
      environment: {
        ENV: "production"
      }
    };
  };

  const generateMockSuggestions = (prompt: string): ConfigSuggestion[] => {
    return [
      {
        field: "scaling.cpu_threshold",
        value: "70%",
        reason: "Optimal for high-traffic applications to maintain responsiveness",
        confidence: 87
      },
      {
        field: "redis.memory",
        value: "2GB",
        reason: "Sufficient for typical web application caching needs",
        confidence: 92
      },
      {
        field: "postgres.connection_pool",
        value: "20",
        reason: "Prevents connection exhaustion under load",
        confidence: 85
      }
    ];
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedConfig, null, 2));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Natural Language Configuration</h1>
        <p className="text-muted-foreground">Describe your environment in plain English and let AI generate the configuration</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Describe Your Environment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe what kind of environment you need. For example: 'I need a Node.js API server with Redis for caching and PostgreSQL for data storage, optimized for high traffic...'"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={6}
                className="resize-none"
              />
              
              <Button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Generating Configuration...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Configuration
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Sample Prompts */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-base">Example Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {samplePrompts.map((samplePrompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-3 text-xs"
                  onClick={() => setPrompt(samplePrompt)}
                >
                  {samplePrompt}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          {suggestions.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Sparkles className="h-4 w-4" />
                  AI Optimization Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        {suggestion.field}
                      </code>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.confidence}% confidence
                      </Badge>
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">Suggested: {suggestion.value}</p>
                      <p className="text-muted-foreground text-xs mt-1">{suggestion.reason}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Generated Configuration */}
        <div className="space-y-6">
          {generatedConfig ? (
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Generated Configuration
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={copyConfig}>
                      <Code className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Deploy
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Environment Overview */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Name</Label>
                      <p className="font-medium">{generatedConfig.name}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Runtime</Label>
                      <p className="font-medium">{generatedConfig.runtime}</p>
                    </div>
                  </div>

                  {/* Services */}
                  {generatedConfig.services && (
                    <div>
                      <Label className="text-sm font-medium">Services</Label>
                      <div className="mt-2 space-y-2">
                        {generatedConfig.services.map((service: any, index: number) => (
                          <div key={index} className="p-2 bg-muted/50 rounded flex items-center justify-between">
                            <div>
                              <span className="font-medium">{service.name}</span>
                              <span className="text-xs text-muted-foreground ml-2">({service.type})</span>
                            </div>
                            {service.port && (
                              <Badge variant="outline" className="text-xs">
                                :{service.port}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Full JSON Configuration */}
                  <div>
                    <Label className="text-sm font-medium">Configuration JSON</Label>
                    <pre className="mt-2 p-3 bg-muted rounded-lg text-xs overflow-auto max-h-64">
                      {JSON.stringify(generatedConfig, null, 2)}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass">
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">No Configuration Generated</h3>
                <p className="text-sm text-muted-foreground">
                  Describe your environment needs and click "Generate Configuration" to see AI-generated settings
                </p>
              </CardContent>
            </Card>
          )}

          {/* Advanced Options */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-base">Advanced Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-optimize" className="text-sm">Auto-optimize for cost</Label>
                <Switch id="auto-optimize" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="security-hardening" className="text-sm">Enable security hardening</Label>
                <Switch id="security-hardening" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="monitoring" className="text-sm">Include monitoring setup</Label>
                <Switch id="monitoring" defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="region" className="text-sm">Preferred Region</Label>
                <Input id="region" placeholder="us-east-1" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};