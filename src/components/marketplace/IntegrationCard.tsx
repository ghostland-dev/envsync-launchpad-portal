import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Download, ExternalLink, Shield } from "lucide-react";

export interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  provider: string;
  rating: number;
  downloads: number;
  verified: boolean;
  price: "free" | "paid" | "freemium";
  tags: string[];
  icon: string;
  screenshots: string[];
  documentation: string;
}

interface IntegrationCardProps {
  integration: Integration;
  onInstall: (integration: Integration) => void;
  onViewDetails: (integration: Integration) => void;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  onInstall,
  onViewDetails,
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-xl">{integration.icon}</span>
            </div>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {integration.name}
                {integration.verified && (
                  <Shield className="h-4 w-4 text-primary" />
                )}
              </CardTitle>
              <CardDescription className="text-sm">
                by {integration.provider}
              </CardDescription>
            </div>
          </div>
          <Badge variant={integration.price === "free" ? "secondary" : "default"}>
            {integration.price}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {integration.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{integration.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>{integration.downloads.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {integration.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {integration.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{integration.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onInstall(integration)}
          >
            Install
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => onViewDetails(integration)}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};