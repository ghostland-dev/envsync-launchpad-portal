import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  HelpCircle, 
  Plus, 
  X, 
  Package, 
  Search, 
  Download,
  GitBranch,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface Package {
  name: string;
  version: string;
  dev: boolean;
}

interface DependenciesConfig {
  packageManager: string;
  packages: Package[];
}

interface DependenciesTabProps {
  config: DependenciesConfig;
  onChange: (config: DependenciesConfig) => void;
}

const packageManagers = [
  { id: 'npm', name: 'npm', description: 'Node Package Manager' },
  { id: 'yarn', name: 'Yarn', description: 'Fast, reliable package manager' },
  { id: 'pnpm', name: 'pnpm', description: 'Efficient package manager' },
  { id: 'pip', name: 'pip', description: 'Python package installer' },
  { id: 'composer', name: 'Composer', description: 'PHP dependency manager' },
  { id: 'gem', name: 'RubyGems', description: 'Ruby package manager' },
];

const popularPackages = {
  npm: [
    { name: 'react', version: '^18.2.0', description: 'JavaScript library for building user interfaces', dev: false },
    { name: 'express', version: '^4.18.0', description: 'Fast, unopinionated web framework', dev: false },
    { name: 'lodash', version: '^4.17.21', description: 'JavaScript utility library', dev: false },
    { name: 'axios', version: '^1.4.0', description: 'Promise based HTTP client', dev: false },
    { name: 'typescript', version: '^5.0.0', description: 'TypeScript language', dev: true },
    { name: '@types/node', version: '^20.0.0', description: 'TypeScript definitions for Node.js', dev: true },
  ],
  pip: [
    { name: 'django', version: '4.2.0', description: 'High-level Python web framework', dev: false },
    { name: 'flask', version: '2.3.0', description: 'Lightweight WSGI web application framework', dev: false },
    { name: 'requests', version: '2.31.0', description: 'HTTP library for Python', dev: false },
    { name: 'numpy', version: '1.24.0', description: 'Numerical computing library', dev: false },
    { name: 'pandas', version: '2.0.0', description: 'Data manipulation and analysis library', dev: false },
  ]
};

export const DependenciesTab: React.FC<DependenciesTabProps> = ({ config, onChange }) => {
  const [newPackage, setNewPackage] = useState({ name: '', version: '', dev: false });
  const [searchTerm, setSearchTerm] = useState('');

  const handlePackageManagerChange = (manager: string) => {
    onChange({
      ...config,
      packageManager: manager,
      packages: [] // Clear packages when changing manager
    });
  };

  const handleAddPackage = () => {
    if (newPackage.name && newPackage.version) {
      const exists = config.packages.find(pkg => pkg.name === newPackage.name);
      if (!exists) {
        onChange({
          ...config,
          packages: [...config.packages, { ...newPackage }]
        });
        setNewPackage({ name: '', version: '', dev: false });
      }
    }
  };

  const handleRemovePackage = (packageName: string) => {
    onChange({
      ...config,
      packages: config.packages.filter(pkg => pkg.name !== packageName)
    });
  };

  const handleToggleDevDependency = (packageName: string) => {
    onChange({
      ...config,
      packages: config.packages.map(pkg =>
        pkg.name === packageName ? { ...pkg, dev: !pkg.dev } : pkg
      )
    });
  };

  const handleAddPopularPackage = (pkg: any) => {
    const exists = config.packages.find(p => p.name === pkg.name);
    if (!exists) {
      onChange({
        ...config,
        packages: [...config.packages, {
          name: pkg.name,
          version: pkg.version,
          dev: pkg.dev || false
        }]
      });
    }
  };

  const getPopularPackages = () => {
    const packages = popularPackages[config.packageManager as keyof typeof popularPackages] || [];
    return packages.filter(pkg => 
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getDependencyStats = () => {
    const total = config.packages.length;
    const prod = config.packages.filter(pkg => !pkg.dev).length;
    const dev = config.packages.filter(pkg => pkg.dev).length;
    return { total, prod, dev };
  };

  const stats = getDependencyStats();

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Package Manager Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Package Manager
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose the package manager for your project</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>
              Select the package manager that will be used to install dependencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={config.packageManager} onValueChange={handlePackageManagerChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select package manager" />
              </SelectTrigger>
              <SelectContent>
                {packageManagers.map(manager => (
                  <SelectItem key={manager.id} value={manager.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{manager.name}</span>
                      <span className="text-sm text-muted-foreground">{manager.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Dependency Statistics */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <span className="font-medium">Dependencies Overview</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-primary"></div>
                  <span>Production: {stats.prod}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-muted-foreground"></div>
                  <span>Development: {stats.dev}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Total: {stats.total}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add New Package */}
        <Card>
          <CardHeader>
            <CardTitle>Add Package</CardTitle>
            <CardDescription>
              Manually add a package to your dependencies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="package-name">Package Name</Label>
                <Input
                  id="package-name"
                  placeholder="package-name"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="package-version">Version</Label>
                <Input
                  id="package-version"
                  placeholder="^1.0.0"
                  value={newPackage.version}
                  onChange={(e) => setNewPackage({ ...newPackage, version: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Options</Label>
                <div className="flex items-center space-x-2 h-10">
                  <Switch
                    id="dev-dependency"
                    checked={newPackage.dev}
                    onCheckedChange={(checked) => setNewPackage({ ...newPackage, dev: checked })}
                  />
                  <Label htmlFor="dev-dependency" className="text-sm">Development dependency</Label>
                </div>
              </div>
            </div>
            
            <Button onClick={handleAddPackage} className="w-full gap-2">
              <Plus className="h-4 w-4" />
              Add Package
            </Button>
          </CardContent>
        </Card>

        {/* Popular Packages */}
        {config.packageManager && getPopularPackages().length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Popular Packages</CardTitle>
              <CardDescription>
                Commonly used packages for {packageManagers.find(pm => pm.id === config.packageManager)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {getPopularPackages().map(pkg => {
                  const isAdded = config.packages.find(p => p.name === pkg.name);
                  return (
                    <div
                      key={pkg.name}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{pkg.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {pkg.version}
                          </Badge>
                          {pkg.dev && (
                            <Badge variant="secondary" className="text-xs">
                              Dev
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {pkg.description}
                        </p>
                      </div>
                      <Button
                        variant={isAdded ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleAddPopularPackage(pkg)}
                        disabled={!!isAdded}
                        className="gap-1"
                      >
                        {isAdded ? (
                          <>
                            <CheckCircle className="h-3 w-3" />
                            Added
                          </>
                        ) : (
                          <>
                            <Download className="h-3 w-3" />
                            Add
                          </>
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Dependencies */}
        <Card>
          <CardHeader>
            <CardTitle>Current Dependencies</CardTitle>
            <CardDescription>
              Manage your project dependencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            {config.packages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No dependencies added yet</p>
                <p className="text-sm">Add packages using the form above or select from popular packages</p>
              </div>
            ) : (
              <div className="space-y-3">
                {config.packages.map(pkg => (
                  <div
                    key={pkg.name}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{pkg.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {pkg.version}
                          </Badge>
                          {pkg.dev && (
                            <Badge variant="secondary" className="text-xs">
                              Dev
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Tooltip>
                        <TooltipTrigger>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleDevDependency(pkg.name)}
                          >
                            <GitBranch className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Toggle development dependency</p>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemovePackage(pkg.name)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
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