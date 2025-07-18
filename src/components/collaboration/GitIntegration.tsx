import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Github, 
  GitBranch, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  RefreshCw,
  Unlink
} from 'lucide-react';

interface GitPlatform {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  isConnected: boolean;
  repository?: string;
  lastSync?: string;
}

export const GitIntegration: React.FC = () => {
  const { toast } = useToast();
  const [platforms, setPlatforms] = useState<GitPlatform[]>([
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      color: 'bg-gray-900 text-white',
      description: 'Connect to GitHub repositories for seamless collaboration',
      isConnected: false
    },
    {
      id: 'gitlab',
      name: 'GitLab',
      icon: GitBranch,
      color: 'bg-orange-600 text-white',
      description: 'Integrate with GitLab for DevOps workflows',
      isConnected: true,
      repository: 'my-org/project-repo',
      lastSync: '2 minutes ago'
    },
    {
      id: 'bitbucket',
      name: 'Bitbucket',
      icon: GitBranch,
      color: 'bg-blue-600 text-white',
      description: 'Connect to Atlassian Bitbucket repositories',
      isConnected: false
    }
  ]);

  const [newRepoUrl, setNewRepoUrl] = useState('');
  const [isConnecting, setIsConnecting] = useState<string | null>(null);

  const handleConnect = async (platformId: string) => {
    setIsConnecting(platformId);
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { 
            ...platform, 
            isConnected: true, 
            repository: newRepoUrl || 'example/repo',
            lastSync: 'Just now'
          }
        : platform
    ));
    
    setIsConnecting(null);
    setNewRepoUrl('');
    
    toast({
      title: "Connection successful",
      description: `Successfully connected to ${platforms.find(p => p.id === platformId)?.name}`,
    });
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { ...platform, isConnected: false, repository: undefined, lastSync: undefined }
        : platform
    ));
    
    toast({
      title: "Disconnected",
      description: `Disconnected from ${platforms.find(p => p.id === platformId)?.name}`,
      variant: "destructive"
    });
  };

  const handleSync = async (platformId: string) => {
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { ...platform, lastSync: 'Syncing...' }
        : platform
    ));

    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { ...platform, lastSync: 'Just now' }
        : platform
    ));
    
    toast({
      title: "Sync complete",
      description: "Repository synchronized successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Git Platform Integration</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect your favorite Git platforms to enable seamless collaboration, 
          version control, and automated workflows with your development team.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => {
          const IconComponent = platform.icon;
          return (
            <Card key={platform.id} className="relative overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${platform.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                      <Badge 
                        variant={platform.isConnected ? "default" : "secondary"}
                        className="mt-1"
                      >
                        {platform.isConnected ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 mr-1" />
                        )}
                        {platform.isConnected ? 'Connected' : 'Not Connected'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {platform.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {platform.isConnected ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Repository:</span>
                      <div className="flex items-center space-x-1">
                        <span className="font-mono">{platform.repository}</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last sync:</span>
                      <span>{platform.lastSync}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleSync(platform.id)}
                        className="flex-1"
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Sync
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDisconnect(platform.id)}
                      >
                        <Unlink className="h-3 w-3 mr-1" />
                        Disconnect
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor={`repo-${platform.id}`}>Repository URL</Label>
                      <Input
                        id={`repo-${platform.id}`}
                        placeholder={`https://${platform.name.toLowerCase()}.com/user/repo`}
                        value={newRepoUrl}
                        onChange={(e) => setNewRepoUrl(e.target.value)}
                      />
                    </div>
                    
                    <Button 
                      onClick={() => handleConnect(platform.id)}
                      disabled={isConnecting === platform.id}
                      className="w-full"
                    >
                      {isConnecting === platform.id ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <IconComponent className="h-4 w-4 mr-2" />
                          Connect to {platform.name}
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Integration Settings</span>
          </CardTitle>
          <CardDescription>
            Configure how your Git platforms integrate with your workflow
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Auto-sync frequency</Label>
              <select className="w-full p-2 border rounded-md bg-background">
                <option>Every 5 minutes</option>
                <option>Every 15 minutes</option>
                <option>Every hour</option>
                <option>Manual only</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label>Default branch</Label>
              <Input placeholder="main" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="auto-pr" className="rounded" />
            <Label htmlFor="auto-pr">Create pull requests automatically for environment changes</Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="notifications" className="rounded" defaultChecked />
            <Label htmlFor="notifications">Enable sync notifications</Label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};