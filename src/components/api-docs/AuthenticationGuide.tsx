import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Key, 
  Shield, 
  Copy, 
  Check, 
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AuthenticationGuide: React.FC = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const sampleApiKey = "sk_test_4eC39HqLyjWDarjtT1zdp7dc";

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to clipboard",
        description: "API key has been copied to your clipboard"
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
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Authentication
          </CardTitle>
          <CardDescription>
            Secure your API requests with API keys or OAuth
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="api-keys" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="oauth">OAuth 2.0</TabsTrigger>
          <TabsTrigger value="rate-limits">Rate Limits</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Key Authentication</CardTitle>
              <CardDescription>
                Use API keys for server-to-server authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* API Key Management */}
              <div>
                <h4 className="font-semibold mb-3">Your API Keys</h4>
                <div className="border rounded-lg">
                  <div className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Production Key</span>
                          <Badge variant="secondary">Live</Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type={showApiKey ? "text" : "password"}
                            value={sampleApiKey}
                            readOnly
                            className="font-mono text-sm max-w-xs"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setShowApiKey(!showApiKey)}
                          >
                            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(sampleApiKey)}
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Created on Jan 15, 2024 • Last used 2 hours ago
                    </p>
                  </div>
                </div>
              </div>

              {/* Usage Examples */}
              <div>
                <h4 className="font-semibold mb-3">Usage Examples</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium mb-2">cURL</h5>
                    <div className="border rounded-lg">
                      <div className="p-3 bg-muted/50 border-b">
                        <span className="text-sm font-medium">Request</span>
                      </div>
                      <div className="p-3">
                        <pre className="text-xs overflow-x-auto">
{`curl -H "Authorization: Bearer sk_test_..." \\
     -H "Content-Type: application/json" \\
     https://api.envsync.dev/environments`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-sm font-medium mb-2">JavaScript</h5>
                    <div className="border rounded-lg">
                      <div className="p-3 bg-muted/50 border-b">
                        <span className="text-sm font-medium">Code</span>
                      </div>
                      <div className="p-3">
                        <pre className="text-xs overflow-x-auto">
{`const response = await fetch('https://api.envsync.dev/environments', {
  headers: {
    'Authorization': 'Bearer sk_test_...',
    'Content-Type': 'application/json'
  }
});`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Best Practices */}
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-2">Security Best Practices</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Store API keys securely (environment variables, not in code)</li>
                  <li>• Use different keys for different environments</li>
                  <li>• Rotate keys regularly</li>
                  <li>• Monitor key usage and set up alerts</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="oauth" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>OAuth 2.0 Flow</CardTitle>
              <CardDescription>
                Use OAuth for user-facing applications and integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Authorization Code Flow</h4>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <span className="font-medium">Redirect to Authorization</span>
                    </div>
                    <div className="border rounded bg-muted/50 p-3">
                      <code className="text-xs break-all">
                        https://auth.envsync.dev/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&scope=read%20write&redirect_uri=YOUR_REDIRECT_URI
                      </code>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <span className="font-medium">Exchange Code for Token</span>
                    </div>
                    <div className="border rounded bg-muted/50 p-3">
                      <pre className="text-xs">
{`POST https://auth.envsync.dev/oauth/token
Content-Type: application/json

{
  "grant_type": "authorization_code",
  "client_id": "YOUR_CLIENT_ID",
  "client_secret": "YOUR_CLIENT_SECRET",
  "code": "AUTHORIZATION_CODE",
  "redirect_uri": "YOUR_REDIRECT_URI"
}`}
                      </pre>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                      <span className="font-medium">Use Access Token</span>
                    </div>
                    <div className="border rounded bg-muted/50 p-3">
                      <pre className="text-xs">
{`curl -H "Authorization: Bearer ACCESS_TOKEN" \\
     https://api.envsync.dev/environments`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Available Scopes</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { scope: "read", description: "Read access to environments and variables" },
                    { scope: "write", description: "Create and update environments and variables" },
                    { scope: "admin", description: "Full access including team management" },
                    { scope: "webhooks", description: "Manage webhook subscriptions" }
                  ].map((item) => (
                    <div key={item.scope} className="p-3 border rounded-lg">
                      <code className="text-sm font-medium">{item.scope}</code>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rate-limits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rate Limiting</CardTitle>
              <CardDescription>
                Understand API rate limits and how to handle them
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Rate Limit Tiers</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Free</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Requests per minute</span>
                          <span className="font-bold">100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Monthly requests</span>
                          <span className="font-bold">10,000</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Pro</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Requests per minute</span>
                          <span className="font-bold">1,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Monthly requests</span>
                          <span className="font-bold">100,000</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Enterprise</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Requests per minute</span>
                          <span className="font-bold">10,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Monthly requests</span>
                          <span className="font-bold">Unlimited</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Response Headers</h4>
                <div className="border rounded-lg">
                  <div className="p-3 bg-muted/50 border-b">
                    <span className="text-sm font-medium">Rate Limit Headers</span>
                  </div>
                  <div className="p-3">
                    <pre className="text-xs">
{`X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1642636800
X-RateLimit-Window: 60`}
                    </pre>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Error Response</h4>
                <div className="border rounded-lg">
                  <div className="p-3 bg-muted/50 border-b">
                    <span className="text-sm font-medium">429 Too Many Requests</span>
                  </div>
                  <div className="p-3">
                    <pre className="text-xs">
{`{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded",
    "retry_after": 60
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};