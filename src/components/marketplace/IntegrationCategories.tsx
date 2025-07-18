import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GitBranch, 
  Zap, 
  Cloud, 
  Database, 
  BarChart3, 
  MessageCircle,
  Grid3X3,
  Star
} from "lucide-react";
import { IntegrationCard, Integration } from "./IntegrationCard";

const categories = [
  {
    id: "version-control",
    name: "Version Control",
    icon: GitBranch,
    description: "Git, GitHub, GitLab, Bitbucket",
    count: 12
  },
  {
    id: "cicd",
    name: "CI/CD",
    icon: Zap,
    description: "Jenkins, GitHub Actions, GitLab CI",
    count: 18
  },
  {
    id: "cloud",
    name: "Cloud Providers",
    icon: Cloud,
    description: "AWS, Azure, GCP, DigitalOcean",
    count: 25
  },
  {
    id: "databases",
    name: "Databases",
    icon: Database,
    description: "PostgreSQL, MySQL, MongoDB",
    count: 15
  },
  {
    id: "monitoring",
    name: "Monitoring",
    icon: BarChart3,
    description: "Datadog, New Relic, Sentry",
    count: 10
  },
  {
    id: "communication",
    name: "Communication",
    icon: MessageCircle,
    description: "Slack, Discord, Teams",
    count: 8
  }
];

const mockIntegrations: Integration[] = [
  {
    id: "github",
    name: "GitHub",
    description: "Sync environment variables with GitHub Actions and repository settings",
    category: "version-control",
    provider: "GitHub Inc.",
    rating: 4.9,
    downloads: 15420,
    verified: true,
    price: "free",
    tags: ["git", "repositories", "actions"],
    icon: "🐙",
    screenshots: [],
    documentation: "https://docs.github.com"
  },
  {
    id: "aws",
    name: "AWS Parameter Store",
    description: "Securely manage and sync environment variables with AWS Systems Manager",
    category: "cloud",
    provider: "Amazon Web Services",
    rating: 4.7,
    downloads: 8930,
    verified: true,
    price: "free",
    tags: ["aws", "secrets", "cloud"],
    icon: "☁️",
    screenshots: [],
    documentation: "https://aws.amazon.com/systems-manager"
  },
  {
    id: "docker",
    name: "Docker",
    description: "Manage environment variables in Docker containers and Compose files",
    category: "cicd",
    provider: "Docker Inc.",
    rating: 4.8,
    downloads: 12750,
    verified: true,
    price: "free",
    tags: ["docker", "containers", "compose"],
    icon: "🐳",
    screenshots: [],
    documentation: "https://docs.docker.com"
  },
  {
    id: "slack",
    name: "Slack",
    description: "Get notifications about environment changes and sync status",
    category: "communication",
    provider: "Slack Technologies",
    rating: 4.6,
    downloads: 5430,
    verified: true,
    price: "free",
    tags: ["notifications", "team", "alerts"],
    icon: "💬",
    screenshots: [],
    documentation: "https://api.slack.com"
  }
];

interface IntegrationCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onInstall: (integration: Integration) => void;
}

export const IntegrationCategories: React.FC<IntegrationCategoriesProps> = ({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onInstall,
}) => {
  const filteredIntegrations = mockIntegrations.filter((integration) => {
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Category Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            className="h-auto p-4 justify-start"
            onClick={() => onCategoryChange("all")}
          >
            <div className="flex items-center gap-3">
              <Grid3X3 className="h-6 w-6" />
              <div className="text-left">
                <div className="font-medium">All Categories</div>
                <div className="text-xs text-muted-foreground">
                  {mockIntegrations.length} integrations
                </div>
              </div>
            </div>
          </Button>
          
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className="h-auto p-4 justify-start"
                onClick={() => onCategoryChange(category.id)}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {category.count} integrations
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            {selectedCategory === "all" 
              ? "All Integrations" 
              : categories.find(c => c.id === selectedCategory)?.name || "Integrations"
            }
          </h3>
          <Badge variant="secondary">
            {filteredIntegrations.length} results
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onInstall={onInstall}
              onViewDetails={(integration) => console.log("View details:", integration)}
            />
          ))}
        </div>

        {filteredIntegrations.length === 0 && (
          <div className="text-center py-12">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No integrations found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or browse a different category
            </p>
          </div>
        )}
      </div>
    </div>
  );
};