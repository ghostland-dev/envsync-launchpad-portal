import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings as SettingsIcon, 
  Shield, 
  Users, 
  Database, 
  Globe, 
  Zap, 
  Save, 
  AlertTriangle,
  Download,
  Upload,
  Trash2,
  Plus,
  Key,
  Monitor,
  Bell,
  Lock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);

  // Organization settings
  const [orgSettings, setOrgSettings] = useState({
    name: 'TechCorp Inc.',
    domain: 'techcorp.com',
    logo: '/logos/techcorp.png',
    timezone: 'America/Los_Angeles',
    language: 'en',
    maxEnvironments: 100,
    maxTeamMembers: 50,
    allowPublicEnvironments: false,
    requireApproval: true,
    enableAuditLogs: true
  });

  // Security policies
  const [securitySettings, setSecuritySettings] = useState({
    enforceSSO: false,
    require2FA: true,
    sessionTimeout: '8h',
    passwordPolicy: 'strong',
    allowedDomains: ['techcorp.com', 'contractor.com'],
    ipWhitelist: [],
    apiRateLimit: 1000,
    enableWebhooks: true
  });

  // Integration settings
  const [integrations, setIntegrations] = useState([
    {
      id: '1',
      name: 'GitHub',
      type: 'git',
      status: 'connected',
      config: {
        organization: 'techcorp',
        webhook_url: 'https://api.envsync.dev/webhooks/github'
      }
    },
    {
      id: '2',
      name: 'Slack',
      type: 'communication',
      status: 'connected',
      config: {
        workspace: 'techcorp',
        channel: '#dev-notifications'
      }
    },
    {
      id: '3',
      name: 'Docker Hub',
      type: 'registry',
      status: 'disconnected',
      config: {}
    }
  ]);

  // Backup settings
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    frequency: 'daily',
    retention: '30d',
    location: 's3://envsync-backups',
    encryption: true,
    lastBackup: '2024-01-18T10:30:00Z'
  });

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Settings updated",
      description: "Your organization settings have been successfully updated.",
    });
  };

  const exportData = () => {
    toast({
      title: "Export started",
      description: "Your data export will be available in a few minutes.",
    });
  };

  const testIntegration = (integrationId: string) => {
    toast({
      title: "Testing integration",
      description: "Checking connection status...",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Organization Settings</h1>
          <p className="text-muted-foreground">
            Configure your organization's EnvSync settings and policies
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Team
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Backup
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Organization Information</CardTitle>
                <CardDescription>
                  Basic information about your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input
                      id="org-name"
                      value={orgSettings.name}
                      onChange={(e) => setOrgSettings({ ...orgSettings, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="org-domain">Domain</Label>
                    <Input
                      id="org-domain"
                      value={orgSettings.domain}
                      onChange={(e) => setOrgSettings({ ...orgSettings, domain: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select value={orgSettings.timezone} onValueChange={(value) => 
                      setOrgSettings({ ...orgSettings, timezone: value })
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <Select value={orgSettings.language} onValueChange={(value) => 
                      setOrgSettings({ ...orgSettings, language: value })
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Limits</CardTitle>
                <CardDescription>
                  Configure resource limits for your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-envs">Maximum Environments</Label>
                    <Input
                      id="max-envs"
                      type="number"
                      value={orgSettings.maxEnvironments}
                      onChange={(e) => setOrgSettings({ ...orgSettings, maxEnvironments: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-members">Maximum Team Members</Label>
                    <Input
                      id="max-members"
                      type="number"
                      value={orgSettings.maxTeamMembers}
                      onChange={(e) => setOrgSettings({ ...orgSettings, maxTeamMembers: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Allow Public Environments</Label>
                      <p className="text-xs text-muted-foreground">
                        Members can create publicly accessible environments
                      </p>
                    </div>
                    <Switch
                      checked={orgSettings.allowPublicEnvironments}
                      onCheckedChange={(checked) => 
                        setOrgSettings({ ...orgSettings, allowPublicEnvironments: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Require Approval</Label>
                      <p className="text-xs text-muted-foreground">
                        New environments require admin approval
                      </p>
                    </div>
                    <Switch
                      checked={orgSettings.requireApproval}
                      onCheckedChange={(checked) => 
                        setOrgSettings({ ...orgSettings, requireApproval: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Enable Audit Logs</Label>
                      <p className="text-xs text-muted-foreground">
                        Track all actions for compliance and security
                      </p>
                    </div>
                    <Switch
                      checked={orgSettings.enableAuditLogs}
                      onCheckedChange={(checked) => 
                        setOrgSettings({ ...orgSettings, enableAuditLogs: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Authentication & Access
                </CardTitle>
                <CardDescription>
                  Configure authentication and access control policies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Enforce Single Sign-On (SSO)</Label>
                    <p className="text-xs text-muted-foreground">
                      Require SSO for all organization members
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.enforceSSO}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({ ...securitySettings, enforceSSO: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Require Two-Factor Authentication</Label>
                    <p className="text-xs text-muted-foreground">
                      Mandate 2FA for all users
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.require2FA}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({ ...securitySettings, require2FA: checked })
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <Select value={securitySettings.sessionTimeout} onValueChange={(value) => 
                      setSecuritySettings({ ...securitySettings, sessionTimeout: value })
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="8h">8 hours</SelectItem>
                        <SelectItem value="24h">24 hours</SelectItem>
                        <SelectItem value="7d">7 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password-policy">Password Policy</Label>
                    <Select value={securitySettings.passwordPolicy} onValueChange={(value) => 
                      setSecuritySettings({ ...securitySettings, passwordPolicy: value })
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                        <SelectItem value="strong">Strong (12+ chars, mixed case, numbers)</SelectItem>
                        <SelectItem value="strict">Strict (16+ chars, symbols required)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allowed-domains">Allowed Email Domains</Label>
                  <Textarea
                    id="allowed-domains"
                    placeholder="techcorp.com, contractor.com"
                    value={securitySettings.allowedDomains.join(', ')}
                    onChange={(e) => 
                      setSecuritySettings({ 
                        ...securitySettings, 
                        allowedDomains: e.target.value.split(',').map(d => d.trim()) 
                      })
                    }
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground">
                    Comma-separated list of allowed email domains
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Security</CardTitle>
                <CardDescription>
                  Configure API access and rate limiting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rate-limit">API Rate Limit (requests/hour)</Label>
                  <Input
                    id="rate-limit"
                    type="number"
                    value={securitySettings.apiRateLimit}
                    onChange={(e) => 
                      setSecuritySettings({ ...securitySettings, apiRateLimit: parseInt(e.target.value) })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Enable Webhooks</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow external webhook integrations
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.enableWebhooks}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({ ...securitySettings, enableWebhooks: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Connected Services</CardTitle>
                  <CardDescription>
                    Manage your third-party integrations
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Integration
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.map((integration) => (
                    <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Zap className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium">{integration.name}</div>
                          <div className="text-sm text-muted-foreground capitalize">
                            {integration.type} • {integration.status}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={integration.status === 'connected' ? 'default' : 'secondary'}
                        >
                          {integration.status}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => testIntegration(integration.id)}
                        >
                          Test
                        </Button>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup Tab */}
          <TabsContent value="backup" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Backup Configuration
                </CardTitle>
                <CardDescription>
                  Configure automated backups and data retention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Automatic Backups</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically backup your data
                    </p>
                  </div>
                  <Switch
                    checked={backupSettings.autoBackup}
                    onCheckedChange={(checked) => 
                      setBackupSettings({ ...backupSettings, autoBackup: checked })
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select value={backupSettings.frequency} onValueChange={(value) => 
                      setBackupSettings({ ...backupSettings, frequency: value })
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retention">Retention Period</Label>
                    <Select value={backupSettings.retention} onValueChange={(value) => 
                      setBackupSettings({ ...backupSettings, retention: value })
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">7 days</SelectItem>
                        <SelectItem value="30d">30 days</SelectItem>
                        <SelectItem value="90d">90 days</SelectItem>
                        <SelectItem value="1y">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="backup-location">Backup Location</Label>
                  <Input
                    id="backup-location"
                    value={backupSettings.location}
                    onChange={(e) => 
                      setBackupSettings({ ...backupSettings, location: e.target.value })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Encrypt Backups</Label>
                    <p className="text-xs text-muted-foreground">
                      Encrypt backup files for security
                    </p>
                  </div>
                  <Switch
                    checked={backupSettings.encryption}
                    onCheckedChange={(checked) => 
                      setBackupSettings({ ...backupSettings, encryption: checked })
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Last Backup</div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(backupSettings.lastBackup).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm">
                      Backup Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Export</CardTitle>
                <CardDescription>
                  Export your organization data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Complete Data Export</div>
                    <div className="text-sm text-muted-foreground">
                      Export all environments, variables, and settings
                    </div>
                  </div>
                  <Button onClick={exportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Team Plan</div>
                    <div className="text-sm text-muted-foreground">
                      $15 per user/month • Next billing: Jan 25, 2024
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>Active</Badge>
                    <Button variant="outline" size="sm">
                      Change Plan
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">15</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">42</div>
                    <div className="text-sm text-muted-foreground">Environments</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold">$225</div>
                    <div className="text-sm text-muted-foreground">Monthly Cost</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">
                    View Invoices
                  </Button>
                  <Button variant="outline">
                    Update Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;