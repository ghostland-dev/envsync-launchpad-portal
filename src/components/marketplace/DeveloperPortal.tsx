import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  BookOpen, 
  Zap, 
  TestTube, 
  Globe, 
  Download,
  Github,
  ExternalLink 
} from "lucide-react";

const developerResources = [
  {
    title: "API Documentation",
    description: "Complete API reference and authentication guides",
    icon: BookOpen,
    href: "/docs/api",
    type: "documentation"
  },
  {
    title: "SDK Downloads",
    description: "Official SDKs for popular programming languages",
    icon: Download,
    href: "/docs/sdks",
    type: "sdk"
  },
  {
    title: "Integration Templates",
    description: "Pre-built templates to kickstart your integration",
    icon: Code,
    href: "/docs/templates",
    type: "template"
  },
  {
    title: "Testing Framework",
    description: "Tools and utilities for testing your integrations",
    icon: TestTube,
    href: "/docs/testing",
    type: "testing"
  },
  {
    title: "Webhook Documentation",
    description: "Learn how to implement custom webhooks",
    icon: Zap,
    href: "/docs/webhooks",
    type: "webhook"
  },
  {
    title: "Sample Projects",
    description: "Example integrations and reference implementations",
    icon: Github,
    href: "https://github.com/envsync/examples",
    type: "example"
  }
];

const sdks = [
  { name: "Node.js", language: "JavaScript", version: "2.1.0", downloads: "15.2k" },
  { name: "Python", language: "Python", version: "1.8.3", downloads: "8.7k" },
  { name: "Go", language: "Go", version: "1.2.1", downloads: "3.4k" },
  { name: "Java", language: "Java", version: "2.0.2", downloads: "5.1k" },
  { name: "PHP", language: "PHP", version: "1.5.0", downloads: "2.8k" },
  { name: "Ruby", language: "Ruby", version: "1.3.1", downloads: "1.9k" }
];

export const DeveloperPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Code className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">Developer Portal</h2>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="sdks">SDKs</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Build Custom Integrations</CardTitle>
              <CardDescription>
                Create powerful integrations that extend EnvSync's capabilities for your specific needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {developerResources.map((resource) => {
                  const Icon = resource.icon;
                  return (
                    <Card key={resource.title} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {resource.description}
                            </p>
                            <Button size="sm" variant="outline" className="gap-2">
                              View
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>
                Get started with building your first integration in minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span className="text-sm">Register your application and get API credentials</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="text-sm">Choose an SDK or use our REST API directly</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="text-sm">Test your integration and submit for review</span>
              </div>
              <Button className="w-full mt-4">
                Start Building
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Comprehensive guides and references for the EnvSync API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Authentication</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Learn how to authenticate with the EnvSync API using OAuth 2.0 or API keys
                  </p>
                  <Button size="sm" variant="outline">View Guide</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Environment Management</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    CRUD operations for managing environment variables and configurations
                  </p>
                  <Button size="sm" variant="outline">View Guide</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Sync Operations</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Trigger and monitor synchronization across different environments
                  </p>
                  <Button size="sm" variant="outline">View Guide</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sdks">
          <Card>
            <CardHeader>
              <CardTitle>Official SDKs</CardTitle>
              <CardDescription>
                Download SDKs for your preferred programming language
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sdks.map((sdk) => (
                  <div key={sdk.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{sdk.name}</h4>
                      <Badge variant="outline">v{sdk.version}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {sdk.downloads} downloads
                    </p>
                    <div className="flex gap-2">
                      <Button size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        Install
                      </Button>
                      <Button size="sm" variant="outline">
                        Docs
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <Card>
            <CardHeader>
              <CardTitle>Example Integrations</CardTitle>
              <CardDescription>
                Reference implementations and sample code
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Github className="h-4 w-4" />
                    <h4 className="font-medium">GitHub Actions Integration</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete example of syncing environment variables with GitHub Actions secrets
                  </p>
                  <Button size="sm" variant="outline">View Code</Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="h-4 w-4" />
                    <h4 className="font-medium">Webhook Listener</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Example webhook endpoint for receiving EnvSync notifications
                  </p>
                  <Button size="sm" variant="outline">View Code</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};