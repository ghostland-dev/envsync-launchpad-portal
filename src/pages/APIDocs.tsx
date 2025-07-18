import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Code, 
  PlayCircle, 
  Key, 
  Globe,
  FileText,
  Zap,
  Copy,
  Check,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { APIPlayground } from "@/components/api-docs/APIPlayground";
import { EndpointDocs } from "@/components/api-docs/EndpointDocs";
import { SDKExamples } from "@/components/api-docs/SDKExamples";
import { AuthenticationGuide } from "@/components/api-docs/AuthenticationGuide";

const APIDocs = () => {
  const [activeEndpoint, setActiveEndpoint] = useState("environments");

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">API Documentation</h1>
              <p className="text-muted-foreground text-lg">
                Complete guide to integrating with the EnvSync API
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">v2.1.0</Badge>
            <Badge variant="outline">REST</Badge>
            <Badge variant="outline">GraphQL</Badge>
            <Badge variant="outline">WebSockets</Badge>
          </div>
        </div>

        {/* Quick Start */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Quick Start
            </CardTitle>
            <CardDescription>
              Get up and running with the EnvSync API in under 5 minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-semibold">Get API Key</h3>
                <p className="text-sm text-muted-foreground">
                  Sign up and generate your API key from the dashboard
                </p>
                <Button size="sm" variant="outline">
                  Get Started
                </Button>
              </div>
              <div className="space-y-3">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <h3 className="font-semibold">Make Your First Call</h3>
                <p className="text-sm text-muted-foreground">
                  Use our interactive playground to test API endpoints
                </p>
                <Button size="sm" variant="outline">
                  Try API
                </Button>
              </div>
              <div className="space-y-3">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h3 className="font-semibold">Integrate</h3>
                <p className="text-sm text-muted-foreground">
                  Use our SDKs or build custom integrations
                </p>
                <Button size="sm" variant="outline">
                  View SDKs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="endpoints" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
            <TabsTrigger value="playground">Playground</TabsTrigger>
            <TabsTrigger value="authentication">Auth</TabsTrigger>
            <TabsTrigger value="sdks">SDKs</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="graphql">GraphQL</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="mt-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Endpoints Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Endpoints</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {[
                        { id: "environments", label: "Environments", count: 8 },
                        { id: "variables", label: "Variables", count: 12 },
                        { id: "teams", label: "Teams", count: 6 },
                        { id: "sync", label: "Sync", count: 4 },
                        { id: "templates", label: "Templates", count: 5 },
                        { id: "webhooks", label: "Webhooks", count: 3 }
                      ].map((endpoint) => (
                        <Button
                          key={endpoint.id}
                          variant={activeEndpoint === endpoint.id ? "secondary" : "ghost"}
                          className="w-full justify-between"
                          onClick={() => setActiveEndpoint(endpoint.id)}
                        >
                          <span>{endpoint.label}</span>
                          <Badge variant="outline" className="text-xs">
                            {endpoint.count}
                          </Badge>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Endpoint Documentation */}
              <div className="lg:col-span-3">
                <EndpointDocs activeEndpoint={activeEndpoint} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="playground" className="mt-6">
            <APIPlayground />
          </TabsContent>

          <TabsContent value="authentication" className="mt-6">
            <AuthenticationGuide />
          </TabsContent>

          <TabsContent value="sdks" className="mt-6">
            <SDKExamples />
          </TabsContent>

          <TabsContent value="webhooks" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Webhook System</CardTitle>
                <CardDescription>
                  Real-time notifications for environment changes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Event Types</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { event: "environment.created", description: "New environment was created" },
                        { event: "environment.updated", description: "Environment configuration changed" },
                        { event: "sync.completed", description: "Synchronization finished successfully" },
                        { event: "sync.failed", description: "Synchronization encountered an error" },
                        { event: "variable.added", description: "New variable was added" },
                        { event: "variable.removed", description: "Variable was deleted" }
                      ].map((webhook) => (
                        <div key={webhook.event} className="p-4 border rounded-lg">
                          <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                            {webhook.event}
                          </code>
                          <p className="text-sm text-muted-foreground mt-2">
                            {webhook.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Example Payload</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`{
  "event": "environment.updated",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "environment_id": "env_123",
    "name": "production",
    "changes": ["DATABASE_URL", "API_KEY"],
    "triggered_by": "user_456"
  },
  "webhook_id": "wh_789"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="graphql" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>GraphQL API</CardTitle>
                <CardDescription>
                  Flexible queries with our GraphQL endpoint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Endpoint</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <code>https://api.envsync.dev/graphql</code>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-4">Example Query</h3>
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="text-sm overflow-x-auto">
{`query GetEnvironments($limit: Int) {
  environments(limit: $limit) {
    id
    name
    status
    variables {
      key
      encrypted
      lastUpdated
    }
    team {
      name
      members
    }
  }
}`}
                      </pre>
                    </div>
                  </div>

                  <Button className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Open GraphQL Explorer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default APIDocs;