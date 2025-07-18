import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Database, Server, Zap } from 'lucide-react';

interface ServicesConfig {
  database: { type: string; version: string; config: Record<string, string> };
  redis: { enabled: boolean; version: string; config: Record<string, string> };
  messageQueue: { type: string; config: Record<string, string> };
  externalAPIs: Array<{ name: string; url: string; auth: string }>;
}

interface ServicesTabProps {
  config: ServicesConfig;
  onChange: (config: ServicesConfig) => void;
}

export const ServicesTab: React.FC<ServicesTabProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Database Type</Label>
            <Select 
              value={config.database.type} 
              onValueChange={(value) => onChange({
                ...config,
                database: { ...config.database, type: value }
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="postgresql">PostgreSQL</SelectItem>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="mongodb">MongoDB</SelectItem>
                <SelectItem value="sqlite">SQLite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {config.database.type !== 'none' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Database Name</Label>
                <Input 
                  value={config.database.config.name || ''} 
                  onChange={(e) => onChange({
                    ...config,
                    database: {
                      ...config.database,
                      config: { ...config.database.config, name: e.target.value }
                    }
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label>Port</Label>
                <Input 
                  value={config.database.config.port || ''} 
                  onChange={(e) => onChange({
                    ...config,
                    database: {
                      ...config.database,
                      config: { ...config.database.config, port: e.target.value }
                    }
                  })}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Redis Cache
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Redis</Label>
              <p className="text-sm text-muted-foreground">Add Redis for caching</p>
            </div>
            <Switch
              checked={config.redis.enabled}
              onCheckedChange={(checked) => onChange({
                ...config,
                redis: { ...config.redis, enabled: checked }
              })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};