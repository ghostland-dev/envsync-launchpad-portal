import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  HelpCircle, 
  Plus, 
  X, 
  Key,
  Lock,
  Eye,
  EyeOff,
  Copy,
  AlertTriangle,
  Shield,
  Import,
  Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VariablesConfig {
  environment: Record<string, string>;
  secrets: Record<string, string>;
}

interface VariablesTabProps {
  config: VariablesConfig;
  onChange: (config: VariablesConfig) => void;
}

const commonEnvVars = [
  { key: 'NODE_ENV', value: 'production', description: 'Node.js environment mode' },
  { key: 'PORT', value: '3000', description: 'Application port' },
  { key: 'HOST', value: '0.0.0.0', description: 'Application host' },
  { key: 'API_URL', value: 'https://api.example.com', description: 'API base URL' },
  { key: 'DATABASE_URL', value: 'postgres://user:pass@localhost:5432/db', description: 'Database connection string', secret: true },
  { key: 'REDIS_URL', value: 'redis://localhost:6379', description: 'Redis connection string', secret: true },
  { key: 'JWT_SECRET', value: '', description: 'JWT signing secret', secret: true },
  { key: 'API_KEY', value: '', description: 'Third-party API key', secret: true },
];

export const VariablesTab: React.FC<VariablesTabProps> = ({ config, onChange }) => {
  const [newVar, setNewVar] = useState({ key: '', value: '', isSecret: false });
  const [visibleSecrets, setVisibleSecrets] = useState<Record<string, boolean>>({});
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);
  const { toast } = useToast();

  const handleAddVariable = () => {
    if (newVar.key && newVar.value) {
      const targetConfig = newVar.isSecret ? 'secrets' : 'environment';
      
      // Check if key already exists
      if (config.environment[newVar.key] || config.secrets[newVar.key]) {
        toast({
          title: "Variable Exists",
          description: "A variable with this key already exists",
          variant: "destructive"
        });
        return;
      }

      onChange({
        ...config,
        [targetConfig]: {
          ...config[targetConfig],
          [newVar.key]: newVar.value
        }
      });
      
      setNewVar({ key: '', value: '', isSecret: false });
      
      toast({
        title: "Variable Added",
        description: `${newVar.isSecret ? 'Secret' : 'Environment variable'} added successfully`,
      });
    }
  };

  const handleRemoveVariable = (key: string, isSecret: boolean) => {
    const targetConfig = isSecret ? 'secrets' : 'environment';
    const { [key]: _, ...rest } = config[targetConfig];
    
    onChange({
      ...config,
      [targetConfig]: rest
    });

    toast({
      title: "Variable Removed",
      description: `${isSecret ? 'Secret' : 'Environment variable'} removed successfully`,
    });
  };

  const handleUpdateVariable = (key: string, value: string, isSecret: boolean) => {
    const targetConfig = isSecret ? 'secrets' : 'environment';
    
    onChange({
      ...config,
      [targetConfig]: {
        ...config[targetConfig],
        [key]: value
      }
    });
  };

  const toggleSecretVisibility = (key: string) => {
    setVisibleSecrets(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Variable value copied to clipboard",
    });
  };

  const handleAddCommonVar = (envVar: any) => {
    const targetConfig = envVar.secret ? 'secrets' : 'environment';
    
    if (config.environment[envVar.key] || config.secrets[envVar.key]) {
      toast({
        title: "Variable Exists",
        description: "This variable is already configured",
        variant: "destructive"
      });
      return;
    }

    onChange({
      ...config,
      [targetConfig]: {
        ...config[targetConfig],
        [envVar.key]: envVar.value
      }
    });

    toast({
      title: "Variable Added",
      description: `${envVar.key} added successfully`,
    });
  };

  const handleImportVariables = () => {
    try {
      const lines = importText.split('\n').filter(line => line.trim());
      const newEnvVars: Record<string, string> = {};
      
      lines.forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').replace(/^["']|["']$/g, ''); // Remove quotes
          newEnvVars[key.trim()] = value;
        }
      });

      onChange({
        ...config,
        environment: {
          ...config.environment,
          ...newEnvVars
        }
      });

      setImportText('');
      setShowImport(false);
      
      toast({
        title: "Variables Imported",
        description: `${Object.keys(newEnvVars).length} variables imported successfully`,
      });
    } catch (error) {
      toast({
        title: "Import Failed",
        description: "Failed to parse environment variables",
        variant: "destructive"
      });
    }
  };

  const handleExportVariables = () => {
    const envContent = Object.entries(config.environment)
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
    
    const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(envContent);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', '.env');
    linkElement.click();
    
    toast({
      title: "Variables Exported",
      description: "Environment variables exported to .env file",
    });
  };

  const getVariableStats = () => {
    const envCount = Object.keys(config.environment).length;
    const secretCount = Object.keys(config.secrets).length;
    return { envCount, secretCount, total: envCount + secretCount };
  };

  const stats = getVariableStats();

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Variables Overview */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                <span className="font-medium">Variables Overview</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary"></div>
                  <span>Environment: {stats.envCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-red-500"></div>
                  <span>Secrets: {stats.secretCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Total: {stats.total}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-800 dark:text-amber-200">Security Notice</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                  Secrets are encrypted at rest and in transit. Environment variables are stored as plain text. 
                  Never commit secrets to version control.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Import/Export */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Import/Export Variables
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowImport(!showImport)}
                  className="gap-2"
                >
                  <Import className="h-4 w-4" />
                  Import
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportVariables}
                  className="gap-2"
                  disabled={stats.envCount === 0}
                >
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          {showImport && (
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="import-vars">Paste environment variables (KEY=value format)</Label>
                <Textarea
                  id="import-vars"
                  placeholder={`NODE_ENV=production\nPORT=3000\nAPI_URL=https://api.example.com`}
                  rows={6}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleImportVariables} disabled={!importText.trim()}>
                  Import Variables
                </Button>
                <Button variant="outline" onClick={() => setShowImport(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Add New Variable */}
        <Card>
          <CardHeader>
            <CardTitle>Add Variable</CardTitle>
            <CardDescription>
              Add a new environment variable or secret
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="var-key">Variable Key</Label>
                <Input
                  id="var-key"
                  placeholder="API_KEY"
                  value={newVar.key}
                  onChange={(e) => setNewVar({ ...newVar, key: e.target.value.toUpperCase() })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="var-value">Value</Label>
                <Input
                  id="var-value"
                  type={newVar.isSecret ? "password" : "text"}
                  placeholder="variable value"
                  value={newVar.value}
                  onChange={(e) => setNewVar({ ...newVar, value: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Type</Label>
                <Select 
                  value={newVar.isSecret ? "secret" : "environment"} 
                  onValueChange={(value) => setNewVar({ ...newVar, isSecret: value === "secret" })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="environment">Environment Variable</SelectItem>
                    <SelectItem value="secret">Secret</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button onClick={handleAddVariable} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Add Variable
            </Button>
          </CardContent>
        </Card>

        {/* Common Variables */}
        <Card>
          <CardHeader>
            <CardTitle>Common Variables</CardTitle>
            <CardDescription>
              Quickly add commonly used environment variables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commonEnvVars.map(envVar => {
                const isAdded = config.environment[envVar.key] || config.secrets[envVar.key];
                return (
                  <div
                    key={envVar.key}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium font-mono text-sm">{envVar.key}</span>
                        {envVar.secret && (
                          <Badge variant="destructive" className="text-xs">
                            Secret
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {envVar.description}
                      </p>
                    </div>
                    <Button
                      variant={isAdded ? "outline" : "default"}
                      size="sm"
                      onClick={() => handleAddCommonVar(envVar)}
                      disabled={!!isAdded}
                    >
                      {isAdded ? 'Added' : 'Add'}
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Environment Variables */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Environment Variables
            </CardTitle>
            <CardDescription>
              Public configuration variables
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(config.environment).length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Key className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No environment variables configured</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(config.environment).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-mono">{key}</Label>
                      </div>
                      <div className="relative">
                        <Input
                          value={value}
                          onChange={(e) => handleUpdateVariable(key, e.target.value, false)}
                          className="pr-8"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
                          onClick={() => copyToClipboard(value)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveVariable(key, false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Secrets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Secrets
            </CardTitle>
            <CardDescription>
              Sensitive configuration data (encrypted)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(config.secrets).length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Lock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No secrets configured</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(config.secrets).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3 p-3 border rounded-lg bg-red-50/50 dark:bg-red-950/20">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-sm font-mono">{key}</Label>
                      </div>
                      <div className="relative">
                        <Input
                          type={visibleSecrets[key] ? "text" : "password"}
                          value={value}
                          onChange={(e) => handleUpdateVariable(key, e.target.value, true)}
                          className="pr-16"
                        />
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => toggleSecretVisibility(key)}
                          >
                            {visibleSecrets[key] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => copyToClipboard(value)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveVariable(key, true)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};