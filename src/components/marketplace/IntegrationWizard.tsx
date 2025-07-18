import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  CheckCircle, 
  Settings, 
  Key, 
  TestTube, 
  ArrowRight,
  Shield,
  AlertCircle 
} from "lucide-react";
import { Integration } from "./IntegrationCard";
import { useToast } from "@/hooks/use-toast";

interface IntegrationWizardProps {
  integration: Integration | null;
  open: boolean;
  onClose: () => void;
}

export const IntegrationWizard: React.FC<IntegrationWizardProps> = ({
  integration,
  open,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isInstalling, setIsInstalling] = useState(false);
  const [config, setConfig] = useState({
    apiKey: "",
    webhookUrl: "",
    enableNotifications: true,
    syncFrequency: "realtime"
  });
  const { toast } = useToast();

  const steps = [
    { id: "overview", label: "Overview", icon: Settings },
    { id: "auth", label: "Authentication", icon: Key },
    { id: "config", label: "Configuration", icon: Settings },
    { id: "test", label: "Test", icon: TestTube },
    { id: "complete", label: "Complete", icon: CheckCircle }
  ];

  const handleInstall = async () => {
    setIsInstalling(true);
    
    // Simulate installation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Integration installed successfully!",
      description: `${integration?.name} has been configured and is ready to use.`,
    });
    
    setIsInstalling(false);
    setCurrentStep(4);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!integration) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-2xl">{integration.icon}</span>
            Install {integration.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Steps Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : isCompleted 
                        ? "bg-muted text-foreground" 
                        : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {currentStep === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Integration Overview</CardTitle>
                  <CardDescription>
                    Review the details before installing {integration.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                      {integration.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{integration.name}</h3>
                      <p className="text-muted-foreground">by {integration.provider}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {integration.verified && (
                          <Badge variant="secondary" className="gap-1">
                            <Shield className="h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                        <Badge variant="outline">{integration.price}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm">{integration.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Features:</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Real-time environment synchronization</li>
                      <li>• Secure credential management</li>
                      <li>• Webhook notifications</li>
                      <li>• Automated rollback support</li>
                    </ul>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-amber-800">
                      This integration will require access to your environment variables
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Authentication Setup</CardTitle>
                  <CardDescription>
                    Configure authentication for {integration.name}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input
                      id="apiKey"
                      type="password"
                      placeholder="Enter your API key"
                      value={config.apiKey}
                      onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Get your API key from the {integration.provider} dashboard
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL (Optional)</Label>
                    <Input
                      id="webhookUrl"
                      placeholder="https://your-app.com/webhook"
                      value={config.webhookUrl}
                      onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Receive notifications about sync events
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Configuration</CardTitle>
                  <CardDescription>
                    Customize how {integration.name} behaves
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Notifications</Label>
                      <p className="text-xs text-muted-foreground">
                        Get notified about sync status and errors
                      </p>
                    </div>
                    <Switch
                      checked={config.enableNotifications}
                      onCheckedChange={(checked) => 
                        setConfig({ ...config, enableNotifications: checked })
                      }
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Sync Frequency</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={config.syncFrequency}
                      onChange={(e) => setConfig({ ...config, syncFrequency: e.target.value })}
                    >
                      <option value="realtime">Real-time</option>
                      <option value="5min">Every 5 minutes</option>
                      <option value="15min">Every 15 minutes</option>
                      <option value="1hour">Every hour</option>
                      <option value="manual">Manual only</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Test Connection</CardTitle>
                  <CardDescription>
                    Verify that the integration is configured correctly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    Test Connection
                  </Button>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Authentication successful</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">API endpoints accessible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Permissions verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    Installation Complete
                  </CardTitle>
                  <CardDescription>
                    {integration.name} has been successfully installed and configured
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      Your integration is now active and syncing in the background.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Next Steps:</h4>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Monitor sync status in the dashboard</li>
                      <li>• Configure additional environments</li>
                      <li>• Set up team permissions</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0 || currentStep === 4}
              >
                Previous
              </Button>
              
              <div className="flex gap-2">
                {currentStep < 3 && (
                  <Button onClick={handleNext} className="gap-2">
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
                
                {currentStep === 3 && (
                  <Button 
                    onClick={handleInstall} 
                    disabled={isInstalling}
                    className="gap-2"
                  >
                    {isInstalling ? "Installing..." : "Install"}
                  </Button>
                )}
                
                {currentStep === 4 && (
                  <Button onClick={onClose}>
                    Done
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};