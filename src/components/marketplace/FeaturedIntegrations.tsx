import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Award } from "lucide-react";

const featuredIntegrations = [
  {
    id: "github-actions",
    name: "GitHub Actions",
    description: "Automate your workflow with powerful CI/CD integration",
    icon: "⚡",
    category: "CI/CD",
    rating: 4.9,
    trending: true,
    featured: "Editor's Choice"
  },
  {
    id: "aws-secrets",
    name: "AWS Secrets Manager",
    description: "Securely store and manage sensitive configuration data",
    icon: "🔐",
    category: "Cloud",
    rating: 4.8,
    trending: false,
    featured: "Most Popular"
  },
  {
    id: "docker-compose",
    name: "Docker Compose",
    description: "Seamlessly manage multi-container environments",
    icon: "🐳",
    category: "DevOps",
    rating: 4.7,
    trending: true,
    featured: "Developer Favorite"
  }
];

export const FeaturedIntegrations: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Award className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">Featured Integrations</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredIntegrations.map((integration) => (
          <Card key={integration.id} className="relative overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="absolute top-4 right-4">
              {integration.trending && (
                <Badge variant="default" className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Trending
                </Badge>
              )}
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                  {integration.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                  <CardDescription>{integration.category}</CardDescription>
                </div>
              </div>
              
              <Badge variant="outline" className="w-fit">
                {integration.featured}
              </Badge>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {integration.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{integration.rating}</span>
                </div>
                
                <Button size="sm" className="group-hover:shadow-md transition-shadow">
                  Install Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};