import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  GitBranch, 
  Github, 
  GitMerge, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Folder,
  Eye,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GitImportDialogProps {
  open: boolean;
  onClose: () => void;
  onImportComplete: (repoData: any) => void;
}

interface GitRepository {
  id: string;
  name: string;
  fullName: string;
  description: string;
  language: string;
  stars: number;
  private: boolean;
  defaultBranch: string;
  lastUpdated: string;
  size: number;
}

export const GitImportDialog: React.FC<GitImportDialogProps> = ({ open, onClose, onImportComplete }) => {
  const { toast } = useToast();
  const [step, setStep] = useState<'provider' | 'auth' | 'repo' | 'config' | 'importing'>('provider');
  const [provider, setProvider] = useState<'github' | 'gitlab' | 'bitbucket'>('github');
  const [accessToken, setAccessToken] = useState('');
  const [repositories, setRepositories] = useState<GitRepository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<GitRepository | null>(null);
  const [selectedBranch, setBranch] = useState('main');
  const [envName, setEnvName] = useState('');
  const [importProgress, setImportProgress] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  const mockRepositories: GitRepository[] = [
    {
      id: '1',
      name: 'ecommerce-frontend',
      fullName: 'mycompany/ecommerce-frontend',
      description: 'React-based e-commerce storefront with TypeScript',
      language: 'TypeScript',
      stars: 42,
      private: false,
      defaultBranch: 'main',
      lastUpdated: '2 days ago',
      size: 15420
    },
    {
      id: '2',
      name: 'api-gateway',
      fullName: 'mycompany/api-gateway',
      description: 'Node.js microservices API gateway',
      language: 'JavaScript',
      stars: 18,
      private: true,
      defaultBranch: 'develop',
      lastUpdated: '5 hours ago',
      size: 8960
    },
    {
      id: '3',
      name: 'analytics-dashboard',
      fullName: 'mycompany/analytics-dashboard',
      description: 'Python data analytics dashboard with FastAPI',
      language: 'Python',
      stars: 7,
      private: true,
      defaultBranch: 'main',
      lastUpdated: '1 week ago',
      size: 25680
    }
  ];

  const handleConnect = async () => {
    if (!accessToken.trim()) {
      toast({
        title: "Missing access token",
        description: "Please provide a valid access token to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsConnecting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setRepositories(mockRepositories);
    setStep('repo');
    setIsConnecting(false);
    
    toast({
      title: "Connected successfully",
      description: `Connected to ${provider} and loaded ${mockRepositories.length} repositories.`,
    });
  };

  const handleSelectRepo = (repo: GitRepository) => {
    setSelectedRepo(repo);
    setEnvName(repo.name);
    setBranch(repo.defaultBranch);
    setStep('config');
  };

  const handleImport = async () => {
    if (!selectedRepo || !envName.trim()) return;

    setStep('importing');
    setImportProgress(0);

    // Simulate import process
    const steps = [
      'Cloning repository...',
      'Analyzing project structure...',
      'Detecting technology stack...',
      'Configuring services...',
      'Setting up environment variables...',
      'Creating environment...'
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setImportProgress(((i + 1) / steps.length) * 100);
    }

    const importedData = {
      id: Date.now().toString(),
      name: envName,
      description: selectedRepo.description,
      status: 'synced' as const,
      techStack: [selectedRepo.language, 'Docker'],
      lastSync: 'Just now',
      teamMembers: ['You'],
      team: 'Development',
      branch: selectedBranch,
      uptime: '100%',
      isActive: true,
      gitRepo: selectedRepo
    };

    onImportComplete(importedData);
    
    toast({
      title: "Import completed",
      description: `${envName} has been successfully imported and configured.`,
    });

    // Reset and close
    setStep('provider');
    setSelectedRepo(null);
    setAccessToken('');
    setImportProgress(0);
    onClose();
  };

  const getProviderIcon = (providerName: string) => {
    switch (providerName) {
      case 'github': return <Github className="h-5 w-5" />;
      case 'gitlab': return <GitBranch className="h-5 w-5" />;
      case 'bitbucket': return <GitMerge className="h-5 w-5" />;
      default: return <Github className="h-5 w-5" />;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'provider':
        return (
          <div className="space-y-6">
            <div>
              <Label>Select Git Provider</Label>
              <div className="grid grid-cols-3 gap-4 mt-3">
                {['github', 'gitlab', 'bitbucket'].map((p) => (
                  <div
                    key={p}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      provider === p ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onClick={() => setProvider(p as any)}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {getProviderIcon(p)}
                      <span className="font-medium capitalize">{p}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Button onClick={() => setStep('auth')} className="w-full">
              Continue with {provider}
            </Button>
          </div>
        );

      case 'auth':
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="token">Access Token</Label>
              <Input
                id="token"
                type="password"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                className="mt-2"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Create a personal access token in your {provider} settings with repository access.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep('provider')} className="flex-1">
                Back
              </Button>
              <Button onClick={handleConnect} disabled={isConnecting} className="flex-1">
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Connecting...
                  </>
                ) : (
                  'Connect'
                )}
              </Button>
            </div>
          </div>
        );

      case 'repo':
        return (
          <div className="space-y-6">
            <div>
              <Label>Select Repository</Label>
              <p className="text-sm text-muted-foreground">
                Choose a repository to import into EnvSync
              </p>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {repositories.map((repo) => (
                <div
                  key={repo.id}
                  className="p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all"
                  onClick={() => handleSelectRepo(repo)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Folder className="h-4 w-4" />
                        <span className="font-medium">{repo.name}</span>
                        {repo.private && <Badge variant="secondary">Private</Badge>}
                        <Badge variant="outline">{repo.language}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{repo.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>⭐ {repo.stars}</span>
                        <span>📦 {(repo.size / 1024).toFixed(1)} MB</span>
                        <span>🕒 {repo.lastUpdated}</span>
                        <span>🌿 {repo.defaultBranch}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" onClick={() => setStep('auth')} className="w-full">
              Back to Authentication
            </Button>
          </div>
        );

      case 'config':
        return (
          <div className="space-y-6">
            {selectedRepo && (
              <>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Selected Repository</h4>
                  <div className="flex items-center gap-2">
                    <Folder className="h-4 w-4" />
                    <span className="text-sm">{selectedRepo.fullName}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="env-name">Environment Name</Label>
                    <Input
                      id="env-name"
                      value={envName}
                      onChange={(e) => setEnvName(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="branch">Branch</Label>
                    <Select value={selectedBranch} onValueChange={setBranch}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="main">main</SelectItem>
                        <SelectItem value="develop">develop</SelectItem>
                        <SelectItem value="staging">staging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep('repo')} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleImport} className="flex-1">
                    Import Environment
                  </Button>
                </div>
              </>
            )}
          </div>
        );

      case 'importing':
        return (
          <div className="space-y-6 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Download className="h-8 w-8 text-primary animate-bounce" />
              </div>
              <div>
                <h4 className="font-semibold">Importing Repository</h4>
                <p className="text-sm text-muted-foreground">
                  Setting up your environment from {selectedRepo?.name}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Import Progress</span>
                <span>{Math.round(importProgress)}%</span>
              </div>
              <Progress value={importProgress} className="h-3" />
            </div>

            <div className="text-sm text-muted-foreground">
              This may take a few moments while we analyze your repository structure...
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Import from Git Repository
          </DialogTitle>
          <DialogDescription>
            Import an existing Git repository to create a new environment
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {[
            { key: 'provider', label: 'Provider' },
            { key: 'auth', label: 'Auth' },
            { key: 'repo', label: 'Repository' },
            { key: 'config', label: 'Configure' }
          ].map((stepInfo, index) => (
            <div key={stepInfo.key} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                step === stepInfo.key ? 'bg-primary text-primary-foreground' :
                ['provider', 'auth', 'repo', 'config'].indexOf(step) > index ? 'bg-green-500 text-white' :
                'bg-muted text-muted-foreground'
              }`}>
                {['provider', 'auth', 'repo', 'config'].indexOf(step) > index ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="ml-2 text-sm font-medium">{stepInfo.label}</span>
              {index < 3 && <div className="w-8 h-px bg-muted mx-2" />}
            </div>
          ))}
        </div>

        {renderStep()}
      </DialogContent>
    </Dialog>
  );
};