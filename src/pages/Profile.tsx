import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Bell, 
  Shield, 
  Key, 
  Palette, 
  Globe, 
  Save, 
  Camera, 
  Trash2,
  Eye,
  EyeOff,
  Github,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);
  
  // Profile data
  const [profile, setProfile] = useState({
    firstName: 'Sarah',
    lastName: 'Chen',
    email: 'sarah@company.com',
    phone: '+1 (555) 123-4567',
    bio: 'Senior Developer with 8+ years of experience in full-stack development and DevOps.',
    location: 'San Francisco, CA',
    company: 'TechCorp Inc.',
    role: 'Senior Developer',
    website: 'https://sarahchen.dev',
    github: 'sarahchen',
    linkedin: 'sarahchen',
    timezone: 'America/Los_Angeles',
    language: 'en',
    avatar: '/avatars/sarah.jpg'
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: {
      environmentUpdates: true,
      teamInvitations: true,
      syncFailures: true,
      weeklyDigest: false,
      marketing: false
    },
    push: {
      instantNotifications: true,
      syncStatus: true,
      mentions: true,
      emergencyAlerts: true
    },
    inApp: {
      showBadges: true,
      playSound: false,
      desktopNotifications: true
    }
  });

  // Security settings
  const [security, setSecurity] = useState({
    twoFactorEnabled: true,
    sessionTimeout: '24h',
    lastPasswordChange: '2024-01-15',
    activeSessions: 3
  });

  // API Keys
  const [apiKeys, setApiKeys] = useState([
    {
      id: '1',
      name: 'Production API',
      key: 'sk_live_***************',
      created: '2024-01-10',
      lastUsed: '2024-01-18',
      permissions: ['read', 'write']
    },
    {
      id: '2',
      name: 'Development API',
      key: 'sk_test_***************',
      created: '2024-01-15',
      lastUsed: '2024-01-17',
      permissions: ['read']
    }
  ]);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleAvatarUpload = () => {
    // Simulate file upload
    toast({
      title: "Avatar uploaded",
      description: "Your profile picture has been updated.",
    });
  };

  const generateApiKey = () => {
    const newKey = {
      id: String(Date.now()),
      name: 'New API Key',
      key: 'sk_live_' + Math.random().toString(36).substring(2, 15),
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions: ['read']
    };
    setApiKeys([...apiKeys, newKey]);
    
    toast({
      title: "API Key generated",
      description: "New API key has been created successfully.",
    });
  };

  const revokeApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast({
      title: "API Key revoked",
      description: "The API key has been revoked and is no longer valid.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              API Keys
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Profile Picture */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                  <CardDescription>
                    Update your avatar and public profile information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center space-y-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profile.avatar} alt="Profile" />
                      <AvatarFallback className="text-lg">
                        {profile.firstName[0]}{profile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button onClick={handleAvatarUpload} size="sm" className="w-full">
                        <Camera className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        value={profile.company}
                        onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
                <CardDescription>
                  Connect your social media and professional profiles
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        className="pl-10"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="github"
                        className="pl-10"
                        placeholder="username"
                        value={profile.github}
                        onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                      />
                    </div>
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

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Email Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Notifications
                  </CardTitle>
                  <CardDescription>
                    Manage your email notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(notifications.email).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {key === 'environmentUpdates' && 'Get notified when environments are updated'}
                          {key === 'teamInvitations' && 'Receive invitations to join teams'}
                          {key === 'syncFailures' && 'Alert when sync operations fail'}
                          {key === 'weeklyDigest' && 'Weekly summary of your activity'}
                          {key === 'marketing' && 'Product updates and newsletters'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => 
                          setNotifications({
                            ...notifications,
                            email: { ...notifications.email, [key]: checked }
                          })
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Push Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Push Notifications
                  </CardTitle>
                  <CardDescription>
                    Configure push notification settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(notifications.push).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-sm font-medium">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          {key === 'instantNotifications' && 'Real-time notifications'}
                          {key === 'syncStatus' && 'Sync completion status'}
                          {key === 'mentions' && 'When someone mentions you'}
                          {key === 'emergencyAlerts' && 'Critical system alerts'}
                        </p>
                      </div>
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) => 
                          setNotifications({
                            ...notifications,
                            push: { ...notifications.push, [key]: checked }
                          })
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Authentication */}
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                      <p className="text-xs text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={security.twoFactorEnabled ? "default" : "secondary"}>
                        {security.twoFactorEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                      <Switch
                        checked={security.twoFactorEnabled}
                        onCheckedChange={(checked) => 
                          setSecurity({ ...security, twoFactorEnabled: checked })
                        }
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <Select value={security.sessionTimeout} onValueChange={(value) => 
                      setSecurity({ ...security, sessionTimeout: value })
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">1 hour</SelectItem>
                        <SelectItem value="8h">8 hours</SelectItem>
                        <SelectItem value="24h">24 hours</SelectItem>
                        <SelectItem value="7d">7 days</SelectItem>
                        <SelectItem value="30d">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Last changed: {security.lastPasswordChange}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Active Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>
                    Manage your active login sessions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Current Session</div>
                        <div className="text-sm text-muted-foreground">
                          Chrome on macOS • San Francisco, CA
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Active now
                        </div>
                      </div>
                      <Badge variant="outline">Current</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Mobile Session</div>
                        <div className="text-sm text-muted-foreground">
                          Safari on iOS • San Francisco, CA
                        </div>
                        <div className="text-xs text-muted-foreground">
                          2 hours ago
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>

                  <Button variant="destructive" className="w-full">
                    Sign Out All Other Sessions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>
                    Manage your API keys for programmatic access
                  </CardDescription>
                </div>
                <Button onClick={generateApiKey}>
                  <Key className="h-4 w-4 mr-2" />
                  Generate New Key
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {apiKeys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{key.name}</div>
                        <div className="text-sm text-muted-foreground font-mono">
                          {key.key}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Created: {key.created}</span>
                          <span>Last used: {key.lastUsed}</span>
                          <div className="flex gap-1">
                            {key.permissions.map((permission) => (
                              <Badge key={permission} variant="outline" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => revokeApiKey(key.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
                <CardDescription>
                  Customize your EnvSync experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={profile.timezone} onValueChange={(value) => 
                      setProfile({ ...profile, timezone: value })
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="Europe/London">London (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                        <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={profile.language} onValueChange={(value) => 
                      setProfile({ ...profile, language: value })
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                        <SelectItem value="ja">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;