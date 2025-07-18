import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ChevronLeft,
  ChevronRight,
  FolderOpen,
  Upload,
  GitBranch,
  Loader2,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Eye,
  EyeOff,
  Settings,
  Database,
  Package,
  FileText,
  Terminal,
  Zap,
  Save,
  Play,
  Code,
  Globe,
  Container,
  Workflow,
  Star
} from "lucide-react";

const EnvironmentWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [projectPath, setProjectPath] = useState('');
  const [projectType, setProjectType] = useState<'browse' | 'upload' | 'git' | null>(null);
  const [gitUrl, setGitUrl] = useState('');
  
  // Environment data
  const [envName, setEnvName] = useState('');
  const [envDescription, setEnvDescription] = useState('');
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);

  // Mock detection results
  const [detectionResults, setDetectionResults] = useState({
    languages: [
      { name: 'Node.js', version: '18.17.0', confidence: 95, icon: '🟢' },
      { name: 'TypeScript', version: '5.1.6', confidence: 90, icon: '🔵' },
      { name: 'Python', version: '3.9.0', confidence: 85, icon: '🐍' },
    ],
    packageManagers: [
      { name: 'npm', version: '9.8.1', confidence: 95, configFile: 'package.json' },
      { name: 'pip', version: '23.1.2', confidence: 80, configFile: 'requirements.txt' },
    ],
    databases: [
      { name: 'PostgreSQL', version: '15.3', confidence: 85, configFile: 'docker-compose.yml' },
      { name: 'Redis', version: '7.0', confidence: 70, configFile: 'docker-compose.yml' },
    ],
    envVariables: [
      { name: 'NODE_ENV', value: 'development', required: true },
      { name: 'DATABASE_URL', value: '', required: true },
      { name: 'JWT_SECRET', value: '', required: true },
      { name: 'REDIS_URL', value: 'redis://localhost:6379', required: false },
    ],
    configFiles: [
      { name: 'package.json', path: '/package.json', type: 'npm', detected: true },
      { name: '.env.example', path: '/.env.example', type: 'environment', detected: true },
      { name: 'docker-compose.yml', path: '/docker-compose.yml', type: 'docker', detected: true },
      { name: 'tsconfig.json', path: '/tsconfig.json', type: 'typescript', detected: true },
      { name: 'requirements.txt', path: '/requirements.txt', type: 'python', detected: true },
      { name: '.gitignore', path: '/.gitignore', type: 'git', detected: true },
    ],
    integrations: [
      { name: 'Docker', detected: true, ready: true, icon: '🐳' },
      { name: 'Git', detected: true, ready: true, icon: '📦' },
      { name: 'GitHub Actions', detected: false, ready: false, icon: '⚡' },
      { name: 'ESLint', detected: true, ready: true, icon: '🔍' },
    ]
  });

  const [manualConfig, setManualConfig] = useState({
    languages: [],
    packageManagers: [],
    databases: [],
    envVariables: [],
  });

  const steps = [
    { number: 1, title: 'Project Selection', description: 'Choose your project source' },
    { number: 2, title: 'Auto-Detection', description: 'Analyzing your project' },
    { number: 3, title: 'Configuration', description: 'Review and adjust settings' },
    { number: 4, title: 'Environment Setup', description: 'Name and finalize' },
  ];

  // Simulate scanning process
  const startScanning = async () => {
    setIsScanning(true);
    setScanProgress(0);
    
    // Simulate progress
    const intervals = [10, 25, 45, 65, 80, 95, 100];
    for (let i = 0; i < intervals.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 400));
      setScanProgress(intervals[i]);
    }
    
    setIsScanning(false);
    setCurrentStep(2);
  };

  const addManualItem = (category: string, item: any) => {
    setManualConfig(prev => ({
      ...prev,
      [category]: [...prev[category], item]
    }));
  };

  const removeDetectedItem = (category: string, index: number) => {
    setDetectionResults(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index)
    }));
  };

  const getFileIcon = (type: string) => {
    const icons = {
      npm: <Package className="h-4 w-4 text-red-500" />,
      environment: <Settings className="h-4 w-4 text-yellow-500" />,
      docker: <Container className="h-4 w-4 text-blue-500" />,
      typescript: <Code className="h-4 w-4 text-blue-600" />,
      python: <Terminal className="h-4 w-4 text-green-600" />,
      git: <GitBranch className="h-4 w-4 text-orange-500" />,
    };
    return icons[type] || <FileText className="h-4 w-4 text-muted-foreground" />;
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300
            ${currentStep >= step.number 
              ? 'bg-gradient-primary text-white glow-primary' 
              : 'bg-muted text-muted-foreground'
            }
          `}>
            {currentStep > step.number ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              step.number
            )}
          </div>
          {index < steps.length - 1 && (
            <div className={`
              w-16 h-1 mx-4 transition-all duration-300
              ${currentStep > step.number ? 'bg-gradient-primary' : 'bg-muted'}
            `} />
          )}
        </div>
      ))}
    </div>
  );

  const ProjectSelection = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Select Your Project</h2>
        <p className="text-muted-foreground">Choose how you'd like to import your project for environment detection</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Browse Folder */}
        <Card 
          className={`glass border-0 shadow-card cursor-pointer transition-all hover:shadow-glow
            ${projectType === 'browse' ? 'ring-2 ring-primary glow-primary' : ''}
          `}
          onClick={() => setProjectType('browse')}
        >
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <FolderOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Browse Folder</h3>
              <p className="text-sm text-muted-foreground">Select an existing project folder</p>
            </div>
          </CardContent>
        </Card>

        {/* Drag & Drop */}
        <Card 
          className={`glass border-0 shadow-card cursor-pointer transition-all hover:shadow-glow
            ${projectType === 'upload' ? 'ring-2 ring-primary glow-primary' : ''}
          `}
          onClick={() => setProjectType('upload')}
        >
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Upload Files</h3>
              <p className="text-sm text-muted-foreground">Drag & drop project files</p>
            </div>
          </CardContent>
        </Card>

        {/* Git Clone */}
        <Card 
          className={`glass border-0 shadow-card cursor-pointer transition-all hover:shadow-glow
            ${projectType === 'git' ? 'ring-2 ring-primary glow-primary' : ''}
          `}
          onClick={() => setProjectType('git')}
        >
          <CardContent className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <GitBranch className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">Git Repository</h3>
              <p className="text-sm text-muted-foreground">Clone from Git URL</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {projectType === 'browse' && (
        <Card className="glass border-0 shadow-card animate-fade-in-up">
          <CardContent className="p-6">
            <Label htmlFor="folder-path">Project Folder Path</Label>
            <div className="flex space-x-2 mt-2">
              <Input
                id="folder-path"
                placeholder="/path/to/your/project"
                value={projectPath}
                onChange={(e) => setProjectPath(e.target.value)}
                className="glass border-muted"
              />
              <Button variant="outline" className="glass border-muted">
                <FolderOpen className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {projectType === 'git' && (
        <Card className="glass border-0 shadow-card animate-fade-in-up">
          <CardContent className="p-6">
            <Label htmlFor="git-url">Git Repository URL</Label>
            <Input
              id="git-url"
              placeholder="https://github.com/username/repository.git"
              value={gitUrl}
              onChange={(e) => setGitUrl(e.target.value)}
              className="glass border-muted mt-2"
            />
          </CardContent>
        </Card>
      )}

      {projectType === 'upload' && (
        <Card className="glass border-0 shadow-card animate-fade-in-up">
          <CardContent className="p-12 text-center border-2 border-dashed border-muted-foreground/50">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Drop your project files here</p>
            <p className="text-muted-foreground mb-4">or click to browse</p>
            <Button variant="outline" className="glass border-muted">
              Select Files
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const ScanningAnimation = () => (
    <div className="text-center space-y-6">
      <div className="relative">
        <div className="w-32 h-32 bg-gradient-primary/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <div className="w-24 h-24 bg-gradient-primary/20 rounded-full flex items-center justify-center animate-pulse delay-75">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center animate-float">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Analyzing Your Project</h2>
        <p className="text-muted-foreground">Our AI is detecting languages, dependencies, and configuration files...</p>
        
        <div className="max-w-md mx-auto space-y-2">
          <Progress value={scanProgress} className="h-2" />
          <p className="text-sm text-muted-foreground">{scanProgress}% complete</p>
        </div>

        <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Scanning files...</span>
          </div>
          {scanProgress > 30 && (
            <div className="flex items-center space-x-2 animate-fade-in-up">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Languages detected</span>
            </div>
          )}
          {scanProgress > 60 && (
            <div className="flex items-center space-x-2 animate-fade-in-up">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Dependencies found</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const DetectionResults = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Detection Results</h2>
        <p className="text-muted-foreground">Review what we found in your project</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Languages */}
          <Card className="glass border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <span>Languages & Frameworks</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {detectionResults.languages.map((lang, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.icon}</span>
                    <div>
                      <div className="font-medium">{lang.name}</div>
                      <div className="text-sm text-muted-foreground">v{lang.version}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {lang.confidence}% confidence
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDetectedItem('languages', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full glass border-muted">
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </CardContent>
          </Card>

          {/* Package Managers */}
          <Card className="glass border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Package Managers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {detectionResults.packageManagers.map((pm, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{pm.name}</div>
                    <div className="text-sm text-muted-foreground">{pm.configFile}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      v{pm.version}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDetectedItem('packageManagers', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Databases */}
          <Card className="glass border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Databases</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {detectionResults.databases.map((db, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <div className="font-medium">{db.name}</div>
                    <div className="text-sm text-muted-foreground">Found in {db.configFile}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      v{db.version}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDetectedItem('databases', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full glass border-muted">
                <Plus className="h-4 w-4 mr-2" />
                Add Database
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Configuration Files */}
          <Card className="glass border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Configuration Files</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {detectionResults.configFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded">
                    {getFileIcon(file.type)}
                    <div className="flex-1">
                      <div className="text-sm font-medium">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{file.path}</div>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card className="glass border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Environment Variables</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {detectionResults.envVariables.map((env, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{env.name}</span>
                      {env.required && (
                        <Badge variant="destructive" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeDetectedItem('envVariables', index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Input
                    placeholder={`${env.name} value`}
                    value={env.value}
                    onChange={(e) => {
                      const newEnvVars = [...detectionResults.envVariables];
                      newEnvVars[index].value = e.target.value;
                      setDetectionResults(prev => ({
                        ...prev,
                        envVariables: newEnvVars
                      }));
                    }}
                    className="glass border-muted text-sm"
                  />
                </div>
              ))}
              <Button variant="outline" className="w-full glass border-muted">
                <Plus className="h-4 w-4 mr-2" />
                Add Variable
              </Button>
            </CardContent>
          </Card>

          {/* Integrations */}
          <Card className="glass border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Workflow className="h-5 w-5" />
                <span>Integrations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {detectionResults.integrations.map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{integration.icon}</span>
                    <span className="font-medium">{integration.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {integration.ready ? (
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Ready
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-yellow-500 border-yellow-500/20">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Setup Required
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const EnvironmentSetup = () => (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Environment Setup</h2>
        <p className="text-muted-foreground">Give your environment a name and description</p>
      </div>

      <Card className="glass border-0 shadow-card">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="env-name">Environment Name</Label>
            <Input
              id="env-name"
              placeholder="My Awesome Project"
              value={envName}
              onChange={(e) => setEnvName(e.target.value)}
              className="glass border-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="env-description">Description</Label>
            <Textarea
              id="env-description"
              placeholder="Describe what this environment is for..."
              value={envDescription}
              onChange={(e) => setEnvDescription(e.target.value)}
              className="glass border-muted min-h-[100px]"
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Save as Template</Label>
                <p className="text-sm text-muted-foreground">
                  Make this configuration available for future projects
                </p>
              </div>
              <Switch
                checked={saveAsTemplate}
                onCheckedChange={setSaveAsTemplate}
              />
            </div>

            {saveAsTemplate && (
              <Card className="bg-muted/50 border-0 animate-fade-in-up">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>This environment will be saved as a reusable template</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">Environment Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Languages:</span>
                <div className="font-medium">{detectionResults.languages.length} detected</div>
              </div>
              <div>
                <span className="text-muted-foreground">Databases:</span>
                <div className="font-medium">{detectionResults.databases.length} configured</div>
              </div>
              <div>
                <span className="text-muted-foreground">Config Files:</span>
                <div className="font-medium">{detectionResults.configFiles.length} found</div>
              </div>
              <div>
                <span className="text-muted-foreground">Environment Variables:</span>
                <div className="font-medium">{detectionResults.envVariables.length} defined</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCurrentStep = () => {
    if (isScanning) {
      return <ScanningAnimation />;
    }

    switch (currentStep) {
      case 1:
        return <ProjectSelection />;
      case 2:
        return <DetectionResults />;
      case 3:
        return <DetectionResults />; // Same as step 2 but for manual configuration
      case 4:
        return <EnvironmentSetup />;
      default:
        return <ProjectSelection />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Environment Detection Wizard</h1>
          </div>
          <p className="text-muted-foreground">Let's automatically detect and configure your development environment</p>
        </div>

        {/* Step Indicator */}
        <StepIndicator />

        {/* Current Step Content */}
        <div className="mb-8">
          {renderCurrentStep()}
        </div>

        {/* Navigation */}
        {!isScanning && (
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="glass border-muted"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-3">
              {currentStep === 1 && projectType && (
                <Button
                  onClick={startScanning}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Detection
                </Button>
              )}

              {currentStep > 1 && currentStep < 4 && (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}

              {currentStep === 4 && (
                <Button
                  className="bg-gradient-primary hover:opacity-90"
                  disabled={!envName}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Create Environment
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnvironmentWizard;