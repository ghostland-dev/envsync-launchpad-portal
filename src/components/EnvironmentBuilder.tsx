import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Settings, 
  Package, 
  Server, 
  Key, 
  Eye, 
  Download, 
  Upload, 
  Play, 
  Users, 
  History,
  AlertTriangle,
  CheckCircle,
  Cpu,
  HardDrive,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { GeneralTab } from './environment-builder/GeneralTab';
import { DependenciesTab } from './environment-builder/DependenciesTab';
import { ServicesTab } from './environment-builder/ServicesTab';
import { VariablesTab } from './environment-builder/VariablesTab';
import { LivePreview } from './environment-builder/LivePreview';
import { TemplateLibrary } from './environment-builder/TemplateLibrary';
import { DeploymentPanel } from './environment-builder/DeploymentPanel';

export interface EnvironmentConfig {
  general: {
    name: string;
    description: string;
    techStack: string[];
    version: string;
    constraints: Record<string, string>;
  };
  dependencies: {
    packageManager: string;
    packages: Array<{
      name: string;
      version: string;
      dev: boolean;
    }>;
  };
  services: {
    database: {
      type: string;
      version: string;
      config: Record<string, any>;
    };
    redis: {
      enabled: boolean;
      version: string;
      config: Record<string, any>;
    };
    messageQueue: {
      type: string;
      config: Record<string, any>;
    };
    externalAPIs: Array<{
      name: string;
      url: string;
      auth: string;
    }>;
  };
  variables: {
    environment: Record<string, string>;
    secrets: Record<string, string>;
  };
}

const initialConfig: EnvironmentConfig = {
  general: {
    name: '',
    description: '',
    techStack: [],
    version: '1.0.0',
    constraints: {}
  },
  dependencies: {
    packageManager: 'npm',
    packages: []
  },
  services: {
    database: {
      type: 'postgresql',
      version: '15',
      config: {}
    },
    redis: {
      enabled: false,
      version: '7',
      config: {}
    },
    messageQueue: {
      type: 'none',
      config: {}
    },
    externalAPIs: []
  },
  variables: {
    environment: {},
    secrets: {}
  }
};

export const EnvironmentBuilder: React.FC = () => {
  // Live preview state
  const [isPreviewRunning, setIsPreviewRunning] = useState(false);
  const [config, setConfig] = useState<EnvironmentConfig>(initialConfig);
  const [activeTab, setActiveTab] = useState('general');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const { toast } = useToast();

  // Resource estimation
  const [resourceEstimate, setResourceEstimate] = useState({
    cpu: 0.5,
    ram: 1024,
    storage: 10
  });

  useEffect(() => {
    validateConfiguration();
    calculateResourceEstimate();
  }, [config]);

  const validateConfiguration = () => {
    const errors: string[] = [];
    
    if (!config.general.name.trim()) {
      errors.push('Environment name is required');
    }
    
    if (config.general.techStack.length === 0) {
      errors.push('At least one technology must be selected');
    }

    if (config.services.database.type && !config.services.database.version) {
      errors.push('Database version is required when database is selected');
    }
    
    setValidationErrors(errors);
  };

  const calculateResourceEstimate = () => {
    let cpu = 0.2; // Base CPU
    let ram = 512; // Base RAM in MB
    let storage = 5; // Base storage in GB

    // Tech stack impact
    if (config.general.techStack.includes('react')) {
      cpu += 0.1;
      ram += 256;
      storage += 2;
    }
    if (config.general.techStack.includes('node')) {
      cpu += 0.2;
      ram += 512;
      storage += 3;
    }
    if (config.general.techStack.includes('python')) {
      cpu += 0.15;
      ram += 384;
      storage += 2;
    }

    // Database impact
    if (config.services.database.type !== 'none') {
      cpu += 0.3;
      ram += 512;
      storage += 10;
    }

    // Redis impact
    if (config.services.redis.enabled) {
      cpu += 0.1;
      ram += 256;
      storage += 1;
    }

    // Dependencies impact
    cpu += config.dependencies.packages.length * 0.01;
    ram += config.dependencies.packages.length * 10;

    setResourceEstimate({
      cpu: Number(cpu.toFixed(2)),
      ram: Math.round(ram),
      storage: Math.round(storage)
    });
  };

  const handleDeploy = async () => {
    if (validationErrors.length > 0) {
      toast({
        title: "Validation Failed",
        description: "Please fix all configuration errors before deploying",
        variant: "destructive"
      });
      return;
    }

    setIsDeploying(true);
    setDeploymentProgress(0);

    // Simulate deployment progress
    const progressInterval = setInterval(() => {
      setDeploymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsDeploying(false);
          toast({
            title: "Deployment Successful",
            description: "Your environment has been deployed successfully",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleImport = (importedConfig: EnvironmentConfig) => {
    setConfig(importedConfig);
    toast({
      title: "Configuration Imported",
      description: "Environment configuration has been imported successfully",
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${config.general.name || 'environment'}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Configuration Exported",
      description: "Environment configuration has been exported",
    });
  };

  const handleTemplateSelect = (template: EnvironmentConfig) => {
    setConfig(template);
    setShowTemplates(false);
    toast({
      title: "Template Applied",
      description: "Environment template has been applied successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Environment Builder</h1>
            <p className="text-muted-foreground">
              Create and configure your development environment
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowTemplates(true)}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Templates
            </Button>
            
            <Button
              variant="outline"
              onClick={handleExport}
              className="gap-2"
              disabled={!config.general.name}
            >
              <Upload className="h-4 w-4" />
              Export
            </Button>
            
            <Button
              onClick={handleDeploy}
              disabled={isDeploying || validationErrors.length > 0}
              className="gap-2"
            >
              <Play className="h-4 w-4" />
              {isDeploying ? 'Deploying...' : 'Deploy'}
            </Button>
          </div>
        </div>

        {/* Validation Status */}
        {validationErrors.length > 0 && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                <div>
                  <h4 className="font-medium text-destructive">Configuration Issues</h4>
                  <ul className="mt-2 space-y-1 text-sm text-destructive">
                    {validationErrors.map((error, index) => (
                      <li key={index}>• {error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resource Estimation */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-primary" />
                <span className="font-medium">Resource Estimate</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  <span>{resourceEstimate.cpu} CPU</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  <span>{resourceEstimate.ram}MB RAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  <span>{resourceEstimate.storage}GB Storage</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Progress */}
        {isDeploying && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Deployment Progress</span>
                  <span className="text-sm text-muted-foreground">{deploymentProgress}%</span>
                </div>
                <Progress value={deploymentProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Configuration Tabs */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="general" className="gap-2">
                      <Settings className="h-4 w-4" />
                      General
                    </TabsTrigger>
                    <TabsTrigger value="dependencies" className="gap-2">
                      <Package className="h-4 w-4" />
                      Dependencies
                    </TabsTrigger>
                    <TabsTrigger value="services" className="gap-2">
                      <Server className="h-4 w-4" />
                      Services
                    </TabsTrigger>
                    <TabsTrigger value="variables" className="gap-2">
                      <Key className="h-4 w-4" />
                      Variables
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-6">
                    <TabsContent value="general" className="space-y-6">
                      <GeneralTab 
                        config={config.general} 
                        onChange={(general) => setConfig(prev => ({ ...prev, general }))}
                      />
                    </TabsContent>

                    <TabsContent value="dependencies" className="space-y-6">
                      <DependenciesTab 
                        config={config.dependencies} 
                        onChange={(dependencies) => setConfig(prev => ({ ...prev, dependencies }))}
                      />
                    </TabsContent>

                    <TabsContent value="services" className="space-y-6">
                      <ServicesTab 
                        config={config.services} 
                        onChange={(services) => setConfig(prev => ({ ...prev, services }))}
                      />
                    </TabsContent>

                    <TabsContent value="variables" className="space-y-6">
                      <VariablesTab 
                        config={config.variables} 
                        onChange={(variables) => setConfig(prev => ({ ...prev, variables }))}
                      />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            {showPreview && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-base">Live Preview</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <LivePreview 
                    config={config}
                    isRunning={isPreviewRunning}
                    onStart={() => setIsPreviewRunning(true)}
                    onStop={() => setIsPreviewRunning(false)}
                    onRestart={() => {
                      setIsPreviewRunning(false);
                      setTimeout(() => setIsPreviewRunning(true), 1000);
                    }}
                  />
                </CardContent>
              </Card>
            )}

            <DeploymentPanel 
              config={config}
              onDeploy={handleDeploy}
              isDeploying={isDeploying}
              progress={deploymentProgress}
            />
          </div>
        </div>
      </div>

      {/* Template Library Modal */}
      {showTemplates && (
        <TemplateLibrary
          onSelect={handleTemplateSelect}
          onClose={() => setShowTemplates(false)}
        />
      )}
    </div>
  );
};