import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Code, 
  Database, 
  Server, 
  Key, 
  Package,
  ExternalLink,
  Shield
} from 'lucide-react';
import type { EnvironmentConfig } from '../EnvironmentBuilder';

interface LivePreviewProps {
  config: EnvironmentConfig;
}

export const LivePreview: React.FC<LivePreviewProps> = ({ config }) => {
  const generateDockerfile = () => {
    const { techStack } = config.general;
    
    let dockerfile = '';
    
    if (techStack.includes('node')) {
      dockerfile = `FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]`;
    } else if (techStack.includes('python')) {
      dockerfile = `FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "app.py"]`;
    } else {
      dockerfile = `# Dockerfile will be generated based on your tech stack selection`;
    }
    
    return dockerfile;
  };

  const generateDockerCompose = () => {
    const services: any = {};
    
    // Add main application
    services.app = {
      build: '.',
      ports: ['3000:3000'],
      environment: Object.keys(config.variables.environment),
      depends_on: []
    };

    // Add database
    if (config.services.database.type !== 'none') {
      const dbType = config.services.database.type;
      const dbVersion = config.services.database.version;
      
      if (dbType === 'postgresql') {
        services.postgres = {
          image: `postgres:${dbVersion}`,
          environment: [
            'POSTGRES_DB=myapp',
            'POSTGRES_USER=user',
            'POSTGRES_PASSWORD=password'
          ],
          ports: ['5432:5432'],
          volumes: ['postgres_data:/var/lib/postgresql/data']
        };
        services.app.depends_on.push('postgres');
      } else if (dbType === 'mysql') {
        services.mysql = {
          image: `mysql:${dbVersion}`,
          environment: [
            'MYSQL_DATABASE=myapp',
            'MYSQL_ROOT_PASSWORD=password'
          ],
          ports: ['3306:3306'],
          volumes: ['mysql_data:/var/lib/mysql']
        };
        services.app.depends_on.push('mysql');
      }
    }

    // Add Redis
    if (config.services.redis.enabled) {
      services.redis = {
        image: `redis:${config.services.redis.version}-alpine`,
        ports: ['6379:6379']
      };
      services.app.depends_on.push('redis');
    }

    return {
      version: '3.8',
      services,
      volumes: Object.keys(services).filter(key => key !== 'app').reduce((acc, key) => {
        acc[`${key}_data`] = {};
        return acc;
      }, {} as any)
    };
  };

  return (
    <div className="space-y-4">
      {/* Configuration Summary */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Code className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Configuration Summary</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Name:</span>
            <span>{config.general.name || 'Unnamed'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Version:</span>
            <span>{config.general.version}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tech Stack:</span>
            <span>{config.general.techStack.length} technologies</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Tech Stack */}
      {config.general.techStack.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Technologies</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {config.general.techStack.map(tech => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Services */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Services</span>
        </div>
        
        <div className="space-y-2 text-xs">
          {config.services.database.type !== 'none' && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Database:</span>
              <Badge variant="outline" className="text-xs">
                {config.services.database.type} {config.services.database.version}
              </Badge>
            </div>
          )}
          
          {config.services.redis.enabled && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Cache:</span>
              <Badge variant="outline" className="text-xs">
                Redis {config.services.redis.version}
              </Badge>
            </div>
          )}
          
          {config.services.messageQueue.type !== 'none' && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Queue:</span>
              <Badge variant="outline" className="text-xs">
                {config.services.messageQueue.type}
              </Badge>
            </div>
          )}
          
          {config.services.externalAPIs.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">External APIs:</span>
              <Badge variant="outline" className="text-xs">
                {config.services.externalAPIs.length} configured
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Variables */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Key className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Variables</span>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Environment:</span>
            <Badge variant="outline" className="text-xs">
              {Object.keys(config.variables.environment).length} variables
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Secrets:</span>
            <Badge variant="outline" className="text-xs">
              {Object.keys(config.variables.secrets).length} secrets
            </Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Docker Preview */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Docker Configuration</span>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Dockerfile Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
              {generateDockerfile()}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Docker Compose Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-muted p-3 rounded overflow-x-auto">
              {JSON.stringify(generateDockerCompose(), null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};