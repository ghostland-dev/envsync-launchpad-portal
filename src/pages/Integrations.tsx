import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, Download, ExternalLink, Zap } from "lucide-react";
import { IntegrationCard } from "@/components/marketplace/IntegrationCard";
import { IntegrationCategories } from "@/components/marketplace/IntegrationCategories";
import { FeaturedIntegrations } from "@/components/marketplace/FeaturedIntegrations";
import { DeveloperPortal } from "@/components/marketplace/DeveloperPortal";
import { IntegrationWizard } from "@/components/marketplace/IntegrationWizard";

const Integrations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showWizard, setShowWizard] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Integration Marketplace</h1>
          <p className="text-muted-foreground text-lg">
            Connect EnvSync with your favorite development tools and services
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <Tabs defaultValue="marketplace" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            <TabsTrigger value="installed">Installed</TabsTrigger>
            <TabsTrigger value="developer">Developer Portal</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-8">
            <FeaturedIntegrations />
            <IntegrationCategories 
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              searchQuery={searchQuery}
              onInstall={(integration) => {
                setSelectedIntegration(integration);
                setShowWizard(true);
              }}
            />
          </TabsContent>

          <TabsContent value="installed">
            <Card>
              <CardHeader>
                <CardTitle>Installed Integrations</CardTitle>
                <CardDescription>
                  Manage your active integrations and their configurations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Installed integrations will be shown here */}
                  <div className="text-center py-8 text-muted-foreground">
                    No integrations installed yet. Browse the marketplace to get started.
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="developer">
            <DeveloperPortal />
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Integration Analytics</CardTitle>
                <CardDescription>
                  Monitor integration usage, performance, and health
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Active Integrations</p>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                        <Zap className="h-8 w-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Syncs</p>
                          <p className="text-2xl font-bold">1,247</p>
                        </div>
                        <Download className="h-8 w-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Health Score</p>
                          <p className="text-2xl font-bold">98%</p>
                        </div>
                        <Star className="h-8 w-8 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Integration Wizard Dialog */}
        {showWizard && (
          <IntegrationWizard
            integration={selectedIntegration}
            open={showWizard}
            onClose={() => setShowWizard(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Integrations;