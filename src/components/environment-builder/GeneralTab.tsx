import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle, Plus, X } from 'lucide-react';

interface GeneralConfig {
  name: string;
  description: string;
  techStack: string[];
  version: string;
  constraints: Record<string, string>;
}

interface GeneralTabProps {
  config: GeneralConfig;
  onChange: (config: GeneralConfig) => void;
}

const availableTechnologies = [
  { id: 'react', name: 'React', category: 'Frontend' },
  { id: 'vue', name: 'Vue.js', category: 'Frontend' },
  { id: 'angular', name: 'Angular', category: 'Frontend' },
  { id: 'node', name: 'Node.js', category: 'Backend' },
  { id: 'python', name: 'Python', category: 'Backend' },
  { id: 'java', name: 'Java', category: 'Backend' },
  { id: 'php', name: 'PHP', category: 'Backend' },
  { id: 'ruby', name: 'Ruby', category: 'Backend' },
  { id: 'go', name: 'Go', category: 'Backend' },
  { id: 'rust', name: 'Rust', category: 'Backend' },
  { id: 'typescript', name: 'TypeScript', category: 'Language' },
  { id: 'javascript', name: 'JavaScript', category: 'Language' },
];

export const GeneralTab: React.FC<GeneralTabProps> = ({ config, onChange }) => {
  const handleTechStackAdd = (techId: string) => {
    if (!config.techStack.includes(techId)) {
      onChange({
        ...config,
        techStack: [...config.techStack, techId]
      });
    }
  };

  const handleTechStackRemove = (techId: string) => {
    onChange({
      ...config,
      techStack: config.techStack.filter(id => id !== techId)
    });
  };

  const handleConstraintAdd = (key: string, value: string) => {
    onChange({
      ...config,
      constraints: {
        ...config.constraints,
        [key]: value
      }
    });
  };

  const handleConstraintRemove = (key: string) => {
    const { [key]: _, ...rest } = config.constraints;
    onChange({
      ...config,
      constraints: rest
    });
  };

  const getTechByCategory = (category: string) => {
    return availableTechnologies.filter(tech => tech.category === category);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Basic Information
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Define the basic details of your environment</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>
              Set up the fundamental details of your environment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="env-name">Environment Name *</Label>
                <Input
                  id="env-name"
                  placeholder="my-awesome-project"
                  value={config.name}
                  onChange={(e) => onChange({ ...config, name: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="env-version">Version</Label>
                <Input
                  id="env-version"
                  placeholder="1.0.0"
                  value={config.version}
                  onChange={(e) => onChange({ ...config, version: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="env-description">Description</Label>
              <Textarea
                id="env-description"
                placeholder="Describe your environment and its purpose..."
                rows={3}
                value={config.description}
                onChange={(e) => onChange({ ...config, description: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Technology Stack
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select the technologies your environment will use</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>
              Choose the technologies and frameworks for your environment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Selected Technologies */}
            <div className="space-y-2">
              <Label>Selected Technologies</Label>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-3 border rounded-md bg-muted/30">
                {config.techStack.length === 0 ? (
                  <span className="text-muted-foreground text-sm">No technologies selected</span>
                ) : (
                  config.techStack.map(techId => {
                    const tech = availableTechnologies.find(t => t.id === techId);
                    return tech ? (
                      <Badge key={techId} variant="secondary" className="gap-1">
                        {tech.name}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                          onClick={() => handleTechStackRemove(techId)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ) : null;
                  })
                )}
              </div>
            </div>

            {/* Technology Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Frontend', 'Backend', 'Language'].map(category => (
                <div key={category} className="space-y-2">
                  <Label className="text-sm font-medium">{category}</Label>
                  <div className="space-y-1">
                    {getTechByCategory(category).map(tech => (
                      <Button
                        key={tech.id}
                        variant={config.techStack.includes(tech.id) ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start h-8"
                        onClick={() => config.techStack.includes(tech.id) 
                          ? handleTechStackRemove(tech.id) 
                          : handleTechStackAdd(tech.id)
                        }
                      >
                        {tech.name}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Version Constraints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Version Constraints
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Set specific version requirements for your technologies</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>
              Define specific version requirements for your selected technologies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {config.techStack.map(techId => {
                const tech = availableTechnologies.find(t => t.id === techId);
                return tech ? (
                  <div key={techId} className="flex items-center gap-3">
                    <Label className="w-24 text-sm">{tech.name}</Label>
                    <Input
                      placeholder="^18.0.0"
                      value={config.constraints[techId] || ''}
                      onChange={(e) => handleConstraintAdd(techId, e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleConstraintRemove(techId)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : null;
              })}
              
              {config.techStack.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Select technologies above to set version constraints
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};