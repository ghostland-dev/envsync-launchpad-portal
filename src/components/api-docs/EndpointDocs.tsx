import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";

const endpointData = {
  environments: {
    title: "Environments",
    description: "Manage development environments and their configurations",
    endpoints: [
      {
        method: "GET",
        path: "/environments",
        description: "List all environments",
        parameters: [
          { name: "limit", type: "integer", required: false, description: "Number of environments to return (default: 10)" },
          { name: "status", type: "string", required: false, description: "Filter by status (active, inactive, error)" },
          { name: "team_id", type: "string", required: false, description: "Filter by team ID" }
        ],
        response: `{
  "environments": [
    {
      "id": "env_123",
      "name": "production",
      "description": "Production environment",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T11:45:00Z",
      "team_id": "team_456",
      "variable_count": 25
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 42
  }
}`
      },
      {
        method: "POST",
        path: "/environments",
        description: "Create a new environment",
        body: `{
  "name": "staging",
  "description": "Staging environment for testing",
  "template_id": "tpl_789",  // optional
  "team_id": "team_456"
}`,
        response: `{
  "id": "env_124",
  "name": "staging", 
  "description": "Staging environment for testing",
  "status": "active",
  "created_at": "2024-01-15T12:00:00Z",
  "team_id": "team_456",
  "variables": {}
}`
      }
    ]
  },
  variables: {
    title: "Variables",
    description: "Manage environment variables and secrets",
    endpoints: [
      {
        method: "GET",
        path: "/environments/{id}/variables",
        description: "Get environment variables",
        parameters: [
          { name: "id", type: "string", required: true, description: "Environment ID" },
          { name: "include_values", type: "boolean", required: false, description: "Include variable values (requires write permission)" }
        ],
        response: `{
  "variables": {
    "DATABASE_URL": {
      "key": "DATABASE_URL",
      "encrypted": true,
      "last_updated": "2024-01-15T10:30:00Z",
      "updated_by": "user_123"
    },
    "API_KEY": {
      "key": "API_KEY", 
      "encrypted": true,
      "last_updated": "2024-01-14T15:20:00Z",
      "updated_by": "user_456"
    }
  }
}`
      },
      {
        method: "PUT",
        path: "/environments/{id}/variables",
        description: "Update environment variables",
        body: `{
  "variables": {
    "DATABASE_URL": "postgresql://user:pass@host:5432/db",
    "NEW_VARIABLE": "some_value"
  },
  "merge": true  // If false, replaces all variables
}`,
        response: `{
  "updated": ["DATABASE_URL", "NEW_VARIABLE"],
  "removed": [],
  "total_variables": 15
}`
      }
    ]
  }
};

interface EndpointDocsProps {
  activeEndpoint: string;
}

export const EndpointDocs: React.FC<EndpointDocsProps> = ({ activeEndpoint }) => {
  const data = endpointData[activeEndpoint as keyof typeof endpointData];
  
  if (!data) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Select an endpoint to view documentation</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
      </Card>

      {data.endpoints.map((endpoint, index) => (
        <Card key={index}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>
                {endpoint.method}
              </Badge>
              <code className="text-sm bg-muted px-2 py-1 rounded">
                {endpoint.path}
              </code>
            </div>
            <CardDescription>{endpoint.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Parameters */}
            {endpoint.parameters && (
              <div>
                <h4 className="font-semibold mb-3">Parameters</h4>
                <div className="space-y-2">
                  {endpoint.parameters.map((param, paramIndex) => (
                    <div key={paramIndex} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-sm">{param.name}</code>
                          <Badge variant="outline" className="text-xs">
                            {param.type}
                          </Badge>
                          {param.required && (
                            <Badge variant="destructive" className="text-xs">
                              required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {param.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Request Body */}
            {endpoint.body && (
              <div>
                <h4 className="font-semibold mb-3">Request Body</h4>
                <div className="border rounded-lg">
                  <div className="flex items-center justify-between p-3 border-b bg-muted/50">
                    <span className="text-sm font-medium">JSON</span>
                    <Button size="sm" variant="ghost">
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="p-3">
                    <pre className="text-xs overflow-x-auto">
                      {endpoint.body}
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Response */}
            <div>
              <h4 className="font-semibold mb-3">Response</h4>
              <div className="border rounded-lg">
                <div className="flex items-center justify-between p-3 border-b bg-muted/50">
                  <span className="text-sm font-medium">200 OK</span>
                  <Button size="sm" variant="ghost">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="p-3">
                  <pre className="text-xs overflow-x-auto">
                    {endpoint.response}
                  </pre>
                </div>
              </div>
            </div>

            {/* Try it out */}
            <div className="pt-4 border-t">
              <Button className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Try in Playground
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};