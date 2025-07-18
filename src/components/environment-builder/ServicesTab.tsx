import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { 
  HelpCircle, 
  Plus, 
  X, 
  Database, 
  Wifi,
  MessageSquare,
  ExternalLink,
  Settings,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface ExternalAPI {
  name: string;
  url: string;
  auth: string;
}

interface ServicesConfig {
  database: {
    type: string;
    version: string;
    config: Record<string, any>;
  };
  redis: {
    enabled: boolean;
    version: string;
    config: Record<string, any>;
  };
  messageQueue: {
    type: string;
    config: Record<string, any>;
  };
  externalAPIs: ExternalAPI[];
}

interface ServicesTabProps {
  config: ServicesConfig;
  onChange: (config: ServicesConfig) => void;
}

const databases = [
  { id: 'postgresql', name: 'PostgreSQL', description: 'Advanced open source database', versions: ['15', '14', '13', '12'] },
  { id: 'mysql', name: 'MySQL', description: 'Popular relational database', versions: ['8.0', '5.7'] },
  { id: 'mongodb', name: 'MongoDB', description: 'Document database', versions: ['7.0', '6.0', '5.0'] },
  { id: 'sqlite', name: 'SQLite', description: 'Lightweight database', versions: ['3.42', '3.41'] },
  { id: 'redis', name: 'Redis', description: 'In-memory data store', versions: ['7.2', '7.0', '6.2'] },
  { id: 'none', name: 'None', description: 'No database', versions: [] },
];

const messageQueues = [
  { id: 'none', name: 'None', description: 'No message queue' },
  { id: 'rabbitmq', name: 'RabbitMQ', description: 'Message broker' },
  { id: 'kafka', name: 'Apache Kafka', description: 'Distributed streaming platform' },
  { id: 'redis', name: 'Redis Pub/Sub', description: 'Redis publish/subscribe' },
  { id: 'sqs', name: 'Amazon SQS', description: 'Managed message queue' },
];

const authMethods = [
  { id: 'none', name: 'None' },
  { id: 'apikey', name: 'API Key' },
  { id: 'bearer', name: 'Bearer Token' },
  { id: 'basic', name: 'Basic Auth' },
  { id: 'oauth2', name: 'OAuth 2.0' },
];

export const ServicesTab: React.FC<ServicesTabProps> = ({ config, onChange }) => {
  const [newAPI, setNewAPI] = useState<ExternalAPI>({ name: '', url: '', auth: 'none' });

  const handleDatabaseChange = (field: string, value: any) => {
    onChange({
      ...config,
      database: {
        ...config.database,
        [field]: value
      }
    });
  };

  const handleRedisChange = (field: string, value: any) => {
    onChange({
      ...config,
      redis: {
        ...config.redis,
        [field]: value
      }
    });
  };

  const handleMessageQueueChange = (value: string) => {
    onChange({
      ...config,
      messageQueue: {
        type: value,
        config: {}
      }
    });
  };

  const handleAddAPI = () => {
    if (newAPI.name && newAPI.url) {
      onChange({
        ...config,
        externalAPIs: [...config.externalAPIs, { ...newAPI }]
      });
      setNewAPI({ name: '', url: '', auth: 'none' });
    }
  };

  const handleRemoveAPI = (index: number) => {
    onChange({
      ...config,
      externalAPIs: config.externalAPIs.filter((_, i) => i !== index)
    });
  };

  const getServiceStatus = () => {
    const services = [];
    if (config.database.type !== 'none') services.push('Database');
    if (config.redis.enabled) services.push('Redis');
    if (config.messageQueue.type !== 'none') services.push('Message Queue');
    if (config.externalAPIs.length > 0) services.push(`${config.externalAPIs.length} External APIs`);
    return services;
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Services Overview */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <span className="font-medium">Services Overview</span>
              </div>
              <div className="flex items-center gap-4">
                {getServiceStatus().length === 0 ? (
                  <span className="text-sm text-muted-foreground">No services configured</span>
                ) : (
                  getServiceStatus().map((service, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Database Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Database Configuration
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Configure your primary database system</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>
              Set up your primary database system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Database Type</Label>
                <Select 
                  value={config.database.type} 
                  onValueChange={(value) => handleDatabaseChange('type', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select database" />
                  </SelectTrigger>
                  <SelectContent>
                    {databases.map(db => (
                      <SelectItem key={db.id} value={db.id}>
                        <div className="flex flex-col">
                          <span className="font-medium">{db.name}</span>
                          <span className="text-sm text-muted-foreground">{db.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {config.database.type !== 'none' && (
                <div className="space-y-2">
                  <Label>Version</Label>
                  <Select 
                    value={config.database.version} 
                    onValueChange={(value) => handleDatabaseChange('version', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      {databases.find(db => db.id === config.database.type)?.versions.map(version => (
                        <SelectItem key={version} value={version}>
                          {version}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {config.database.type !== 'none' && (
              <div className="space-y-4 pt-4 border-t">
                <Label className="text-sm font-medium">Database Configuration</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="db-name" className="text-sm">Database Name</Label>
                    <Input
                      id="db-name"
                      placeholder="myapp_db"
                      value={config.database.config.name || ''}
                      onChange={(e) => handleDatabaseChange('config', { ...config.database.config, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="db-port" className="text-sm">Port</Label>
                    <Input
                      id="db-port"
                      placeholder="5432"
                      value={config.database.config.port || ''}
                      onChange={(e) => handleDatabaseChange('config', { ...config.database.config, port: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Redis Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Redis Configuration
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Configure Redis for caching and sessions</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>
              Set up Redis for caching, sessions, and real-time features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="redis-enabled"
                checked={config.redis.enabled}
                onCheckedChange={(checked) => handleRedisChange('enabled', checked)}
              />
              <Label htmlFor="redis-enabled">Enable Redis</Label>
            </div>

            {config.redis.enabled && (
              <div className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Redis Version</Label>
                    <Select 
                      value={config.redis.version} 
                      onValueChange={(value) => handleRedisChange('version', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select version" />
                      </SelectTrigger>
                      <SelectContent>
                        {['7.2', '7.0', '6.2'].map(version => (
                          <SelectItem key={version} value={version}>
                            {version}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="redis-port">Port</Label>
                    <Input
                      id="redis-port"
                      placeholder="6379"
                      value={config.redis.config.port || ''}
                      onChange={(e) => handleRedisChange('config', { ...config.redis.config, port: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Queue */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message Queue
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Configure message queue for async processing</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>
              Set up message queue for asynchronous processing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Message Queue Type</Label>
              <Select 
                value={config.messageQueue.type} 
                onValueChange={handleMessageQueueChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select message queue" />
                </SelectTrigger>
                <SelectContent>
                  {messageQueues.map(mq => (
                    <SelectItem key={mq.id} value={mq.id}>
                      <div className="flex flex-col">
                        <span className="font-medium">{mq.name}</span>
                        <span className="text-sm text-muted-foreground">{mq.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* External APIs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5" />
              External APIs
              <Tooltip>
                <TooltipTrigger>
                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Configure external API integrations</p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
            <CardDescription>
              Configure external API integrations and services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add New API */}
            <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
              <Label className="text-sm font-medium">Add New API</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="api-name" className="text-sm">API Name</Label>
                  <Input
                    id="api-name"
                    placeholder="Stripe API"
                    value={newAPI.name}
                    onChange={(e) => setNewAPI({ ...newAPI, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-url" className="text-sm">Base URL</Label>
                  <Input
                    id="api-url"
                    placeholder="https://api.stripe.com"
                    value={newAPI.url}
                    onChange={(e) => setNewAPI({ ...newAPI, url: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Authentication</Label>
                  <Select 
                    value={newAPI.auth} 
                    onValueChange={(value) => setNewAPI({ ...newAPI, auth: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {authMethods.map(method => (
                        <SelectItem key={method.id} value={method.id}>
                          {method.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddAPI} className="w-full gap-2">
                <Plus className="h-4 w-4" />
                Add API
              </Button>
            </div>

            {/* Current APIs */}
            <div className="space-y-3">
              {config.externalAPIs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <ExternalLink className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No external APIs configured</p>
                  <p className="text-sm">Add APIs using the form above</p>
                </div>
              ) : (
                config.externalAPIs.map((api, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{api.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {authMethods.find(m => m.id === api.auth)?.name}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{api.url}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAPI(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
};