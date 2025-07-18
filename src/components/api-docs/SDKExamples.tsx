import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, ExternalLink, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sdkLanguages = [
  {
    id: "nodejs",
    name: "Node.js",
    language: "JavaScript",
    version: "2.1.0",
    installation: "npm install @envsync/node-sdk",
    example: `const EnvSync = require('@envsync/node-sdk');

const client = new EnvSync({
  apiKey: 'sk_test_...'
});

// List environments
const environments = await client.environments.list({
  limit: 10,
  status: 'active'
});

// Create environment
const newEnv = await client.environments.create({
  name: 'staging',
  description: 'Staging environment'
});

// Update variables
await client.environments.updateVariables('env_123', {
  variables: {
    'DATABASE_URL': 'postgresql://localhost:5432/mydb',
    'API_KEY': 'secret-key-here'
  },
  merge: true
});`
  },
  {
    id: "python",
    name: "Python",
    language: "Python",
    version: "1.8.3",
    installation: "pip install envsync",
    example: `from envsync import EnvSync

client = EnvSync(api_key='sk_test_...')

# List environments
environments = client.environments.list(
    limit=10,
    status='active'
)

# Create environment
new_env = client.environments.create(
    name='staging',
    description='Staging environment'
)

# Update variables
client.environments.update_variables(
    environment_id='env_123',
    variables={
        'DATABASE_URL': 'postgresql://localhost:5432/mydb',
        'API_KEY': 'secret-key-here'
    },
    merge=True
)`
  },
  {
    id: "go",
    name: "Go",
    language: "Go",
    version: "1.2.1",
    installation: "go get github.com/envsync/go-sdk",
    example: `package main

import (
    "context"
    "github.com/envsync/go-sdk"
)

func main() {
    client := envsync.NewClient("sk_test_...")

    // List environments
    envs, err := client.Environments.List(context.Background(), &envsync.ListOptions{
        Limit:  10,
        Status: "active",
    })

    // Create environment
    newEnv, err := client.Environments.Create(context.Background(), &envsync.Environment{
        Name:        "staging",
        Description: "Staging environment",
    })

    // Update variables
    err = client.Environments.UpdateVariables(context.Background(), "env_123", map[string]string{
        "DATABASE_URL": "postgresql://localhost:5432/mydb",
        "API_KEY":      "secret-key-here",
    })
}`
  },
  {
    id: "ruby",
    name: "Ruby",
    language: "Ruby",
    version: "1.3.1", 
    installation: "gem install envsync",
    example: `require 'envsync'

client = EnvSync::Client.new(api_key: 'sk_test_...')

# List environments
environments = client.environments.list(
  limit: 10,
  status: 'active'
)

# Create environment
new_env = client.environments.create(
  name: 'staging',
  description: 'Staging environment'
)

# Update variables
client.environments.update_variables(
  environment_id: 'env_123',
  variables: {
    'DATABASE_URL' => 'postgresql://localhost:5432/mydb',
    'API_KEY' => 'secret-key-here'
  },
  merge: true
)`
  }
];

export const SDKExamples: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
      toast({
        title: "Copied to clipboard",
        description: `${type} has been copied to your clipboard`
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Official SDKs</CardTitle>
          <CardDescription>
            Use our official SDKs for seamless integration with your favorite programming language
          </CardDescription>
        </CardHeader>
      </Card>

      {/* SDK Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {sdkLanguages.map((sdk) => (
          <Card key={sdk.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{sdk.name}</h3>
                <Badge variant="outline">v{sdk.version}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {sdk.language} SDK for EnvSync
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Download className="h-3 w-3 mr-1" />
                  Install
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Examples */}
      <Tabs defaultValue="nodejs" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {sdkLanguages.map((sdk) => (
            <TabsTrigger key={sdk.id} value={sdk.id}>
              {sdk.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {sdkLanguages.map((sdk) => (
          <TabsContent key={sdk.id} value={sdk.id}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {sdk.name} SDK
                  <Badge variant="outline">v{sdk.version}</Badge>
                </CardTitle>
                <CardDescription>
                  Official {sdk.language} SDK for the EnvSync API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Installation */}
                <div>
                  <h4 className="font-semibold mb-3">Installation</h4>
                  <div className="border rounded-lg">
                    <div className="flex items-center justify-between p-3 border-b bg-muted/50">
                      <span className="text-sm font-medium">Package Manager</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(sdk.installation, "Installation command")}
                      >
                        {copied === "Installation command" ? 
                          <Check className="h-3 w-3" /> : 
                          <Copy className="h-3 w-3" />
                        }
                      </Button>
                    </div>
                    <div className="p-3">
                      <code className="text-sm">{sdk.installation}</code>
                    </div>
                  </div>
                </div>

                {/* Usage Example */}
                <div>
                  <h4 className="font-semibold mb-3">Usage Example</h4>
                  <div className="border rounded-lg">
                    <div className="flex items-center justify-between p-3 border-b bg-muted/50">
                      <span className="text-sm font-medium">{sdk.language}</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => copyToClipboard(sdk.example, "Code example")}
                      >
                        {copied === "Code example" ? 
                          <Check className="h-3 w-3" /> : 
                          <Copy className="h-3 w-3" />
                        }
                      </Button>
                    </div>
                    <div className="p-3">
                      <pre className="text-xs overflow-x-auto">
                        {sdk.example}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Documentation
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    GitHub Repository
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Examples
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};