import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { 
  Play, 
  Pause, 
  Square, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Cloud,
  Server,
  HelpCircle,
  Eye,
  ExternalLink,
  Download,
  History,
  Users,
  Settings
} from 'lucide-react';
import type { EnvironmentConfig } from '../EnvironmentBuilder';

interface DeploymentPanelProps {
  config: EnvironmentConfig;
  onDeploy: () => void;
  isDeploying: boolean;
  progress: number;
}

const deploymentTargets = [
  { id: 'local', name: 'Local Docker', description: 'Deploy locally using Docker Compose' },
  { id: 'aws', name: 'AWS ECS', description: 'Deploy to Amazon ECS' },
  { id: 'gcp', name: 'Google Cloud Run', description: 'Deploy to Google Cloud Run' },
  { id: 'azure', name: 'Azure Container Instances', description: 'Deploy to Azure' },
  { id: 'heroku', name: 'Heroku', description: 'Deploy to Heroku platform' },
  { id: 'vercel', name: 'Vercel', description: 'Deploy to Vercel' },
];

const deploymentHistory = [
  { id: '1', version: 'v1.2.3', status: 'success', timestamp: '2024-01-15 14:30', duration: '2m 34s' },
  { id: '2', version: 'v1.2.2', status: 'success', timestamp: '2024-01-14 10:15', duration: '2m 18s' },
  { id: '3', version: 'v1.2.1', status: 'failed', timestamp: '2024-01-13 16:45', duration: '1m 12s' },
  { id: '4', version: 'v1.2.0', status: 'success', timestamp: '2024-01-12 09:20', duration: '2m 45s' },
];

export const DeploymentPanel: React.FC<DeploymentPanelProps> = ({ 
  config, 
  onDeploy, 
  isDeploying, 
  progress 
}) => {
  const [deploymentTarget, setDeploymentTarget] = useState('local');
  const [showHistory, setShowHistory] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'deploying':
        return <Clock className="h-4 w-4 text-blue-600 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getDeploymentSteps = () => {
    const steps = [
      'Validating configuration',
      'Building container images',
      'Pushing to registry',
      'Deploying to target',
      'Running health checks',
      'Deployment complete'
    ];
    
    const currentStep = Math.floor((progress / 100) * steps.length);
    return steps.map((step, index) => ({
      name: step,
      status: index < currentStep ? 'completed' : index === currentStep ? 'current' : 'pending'
    }));
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Deployment Target */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Cloud className="h-4 w-4" />
              Deployment Target
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={deploymentTarget} onValueChange={setDeploymentTarget}>
              <SelectTrigger>
                <SelectValue placeholder="Select deployment target" />
              </SelectTrigger>
              <SelectContent>
                {deploymentTargets.map(target => (
                  <SelectItem key={target.id} value={target.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{target.name}</span>
                      <span className="text-sm text-muted-foreground">{target.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={onDeploy}
              disabled={isDeploying || !config.general.name}
              className="w-full gap-2"
              size="sm"
            >
              <Play className="h-4 w-4" />
              {isDeploying ? 'Deploying...' : 'Deploy Now'}
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Eye className="h-3 w-3" />
                Preview
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-3 w-3" />
                Export
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => setShowHistory(!showHistory)}
              >
                <History className="h-3 w-3" />
                History
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Users className="h-3 w-3" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Progress */}
        {isDeploying && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Clock className="h-4 w-4 animate-spin" />
                Deployment Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="space-y-2">
                {getDeploymentSteps().map((step, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    {step.status === 'completed' && (
                      <CheckCircle className="h-3 w-3 text-green-600" />
                    )}
                    {step.status === 'current' && (
                      <Clock className="h-3 w-3 text-blue-600 animate-spin" />
                    )}
                    {step.status === 'pending' && (
                      <div className="h-3 w-3 rounded-full border-2 border-muted" />
                    )}
                    <span className={
                      step.status === 'completed' ? 'text-green-600' :
                      step.status === 'current' ? 'text-blue-600' :
                      'text-muted-foreground'
                    }>
                      {step.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Environment Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Server className="h-4 w-4" />
              Environment Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Current Version:</span>
              <Badge variant="outline" className="text-xs">
                v{config.general.version}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <Badge variant="secondary" className="text-xs">
                {isDeploying ? 'Deploying' : 'Ready'}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Deploy:</span>
              <span className="text-xs text-muted-foreground">
                {deploymentHistory[0]?.timestamp || 'Never'}
              </span>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Health:</span>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-xs">Healthy</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Uptime:</span>
                <span className="text-xs">24h 15m</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment History */}
        {showHistory && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <History className="h-4 w-4" />
                  Deployment History
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistory(false)}
                >
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deploymentHistory.map(deployment => (
                  <div key={deployment.id} className="flex items-center justify-between p-2 border rounded text-sm">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(deployment.status)}
                      <span className="font-mono">{deployment.version}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">
                        {deployment.timestamp}
                      </div>
                      <div className="text-xs">
                        {deployment.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Environment URL */}
        {!isDeploying && config.general.name && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Environment URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                  https://{config.general.name}.app.example.com
                </span>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
};