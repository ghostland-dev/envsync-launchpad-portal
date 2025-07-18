import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  PlayCircle, 
  Copy, 
  Check, 
  Send,
  Code,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const endpoints = [
  {
    method: "GET",
    path: "/environments",
    description: "List all environments",
    parameters: [
      { name: "limit", type: "number", description: "Number of environments to return" },
      { name: "status", type: "string", description: "Filter by status (active, inactive)" }
    ]
  },
  {
    method: "POST",
    path: "/environments",
    description: "Create a new environment",
    body: {
      name: "string",
      description: "string",
      template_id: "string (optional)"
    }
  },
  {
    method: "GET",
    path: "/environments/{id}/variables",
    description: "Get environment variables",
    parameters: [
      { name: "id", type: "string", description: "Environment ID" }
    ]
  },
  {
    method: "PUT",
    path: "/environments/{id}/variables",
    description: "Update environment variables",
    body: {
      variables: "object",
      merge: "boolean (optional)"
    }
  }
];

export const APIPlayground: React.FC = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0]);
  const [apiKey, setApiKey] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleSendRequest = async () => {
    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your API key to test the endpoint",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResponse = {
        status: 200,
        data: selectedEndpoint.method === "GET" 
          ? {
              environments: [
                {
                  id: "env_123",
                  name: "production",
                  status: "active",
                  created_at: "2024-01-15T10:30:00Z"
                },
                {
                  id: "env_456", 
                  name: "staging",
                  status: "active",
                  created_at: "2024-01-14T15:20:00Z"
                }
              ]
            }
          : {
              id: "env_789",
              name: "development",
              status: "active",
              created_at: "2024-01-15T11:45:00Z"
            }
      };
      
      setResponse(JSON.stringify(mockResponse, null, 2));
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied to clipboard",
        description: "Code has been copied to your clipboard"
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const generateCurlCommand = () => {
    const baseUrl = "https://api.envsync.dev";
    const method = selectedEndpoint.method;
    const path = selectedEndpoint.path;
    
    let curl = `curl -X ${method} "${baseUrl}${path}" \\
  -H "Authorization: Bearer ${apiKey || 'YOUR_API_KEY'}" \\
  -H "Content-Type: application/json"`;
  
    if (requestBody && (method === "POST" || method === "PUT")) {
      curl += ` \\
  -d '${requestBody}'`;
    }
    
    return curl;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5" />
            API Playground
          </CardTitle>
          <CardDescription>
            Test API endpoints with live requests and see real responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Request Configuration */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Endpoint</label>
                <Select 
                  value={endpoints.indexOf(selectedEndpoint).toString()}
                  onValueChange={(value) => setSelectedEndpoint(endpoints[parseInt(value)])}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {endpoints.map((endpoint, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        <div className="flex items-center gap-2">
                          <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                            {endpoint.method}
                          </Badge>
                          <span className="font-mono text-sm">{endpoint.path}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedEndpoint.description}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">API Key</label>
                <Input
                  type="password"
                  placeholder="sk_test_..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>

              {(selectedEndpoint.method === "POST" || selectedEndpoint.method === "PUT") && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Request Body</label>
                  <Textarea
                    placeholder="{ ... }"
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="font-mono text-sm"
                    rows={6}
                  />
                </div>
              )}

              <Button 
                onClick={handleSendRequest} 
                disabled={isLoading}
                className="w-full gap-2"
              >
                {isLoading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Request
                  </>
                )}
              </Button>
            </div>

            {/* Response */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Response</label>
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between p-3 border-b bg-muted/50">
                    <span className="text-sm font-medium">JSON Response</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(response)}
                      disabled={!response}
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                  <div className="p-3">
                    <pre className="text-xs overflow-x-auto">
                      {response || "Send a request to see the response"}
                    </pre>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">cURL Command</label>
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between p-3 border-b bg-muted/50">
                    <span className="text-sm font-medium">Copy as cURL</span>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyToClipboard(generateCurlCommand())}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="p-3">
                    <pre className="text-xs overflow-x-auto">
                      {generateCurlCommand()}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};