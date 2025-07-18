import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Search, 
  Star, 
  Download, 
  X,
  Database,
  Server,
  Code,
  Zap,
  Globe,
  Cpu
} from 'lucide-react';
import type { EnvironmentConfig } from '../EnvironmentBuilder';

interface TemplateLibraryProps {
  onSelect: (template: EnvironmentConfig) => void;
  onClose: () => void;
}

const templates: Array<{
  id: string;
  name: string;
  description: string;
  category: string;
  popularity: number;
  icon: React.ReactNode;
  config: EnvironmentConfig;
}> = [
  {
    id: 'mern-stack',
    name: 'MERN Stack',
    description: 'MongoDB, Express.js, React, Node.js full-stack application',
    category: 'Full Stack',
    popularity: 95,
    icon: <Code className="h-6 w-6 text-green-600" />,
    config: {
      general: {
        name: 'mern-app',
        description: 'Modern MERN stack application with MongoDB, Express, React, and Node.js',
        techStack: ['react', 'node', 'javascript', 'typescript'],
        version: '1.0.0',
        constraints: {
          node: '^18.0.0',
          react: '^18.0.0'
        }
      },
      dependencies: {
        packageManager: 'npm',
        packages: [
          { name: 'express', version: '^4.18.0', dev: false },
          { name: 'react', version: '^18.2.0', dev: false },
          { name: 'mongoose', version: '^7.0.0', dev: false },
          { name: 'cors', version: '^2.8.5', dev: false },
          { name: '@types/node', version: '^20.0.0', dev: true },
          { name: 'nodemon', version: '^3.0.0', dev: true }
        ]
      },
      services: {
        database: {
          type: 'mongodb',
          version: '7.0',
          config: { name: 'mern_db', port: '27017' }
        },
        redis: {
          enabled: true,
          version: '7.2',
          config: { port: '6379' }
        },
        messageQueue: {
          type: 'redis',
          config: {}
        },
        externalAPIs: []
      },
      variables: {
        environment: {
          NODE_ENV: 'development',
          PORT: '3000',
          FRONTEND_URL: 'http://localhost:3000'
        },
        secrets: {
          MONGODB_URI: 'mongodb://localhost:27017/mern_db',
          JWT_SECRET: 'your-jwt-secret-here'
        }
      }
    }
  },
  {
    id: 'django-postgres',
    name: 'Django + PostgreSQL',
    description: 'Python Django web framework with PostgreSQL database',
    category: 'Backend',
    popularity: 88,
    icon: <Database className="h-6 w-6 text-blue-600" />,
    config: {
      general: {
        name: 'django-app',
        description: 'Django web application with PostgreSQL database',
        techStack: ['python'],
        version: '1.0.0',
        constraints: {
          python: '^3.11'
        }
      },
      dependencies: {
        packageManager: 'pip',
        packages: [
          { name: 'django', version: '4.2.0', dev: false },
          { name: 'psycopg2-binary', version: '2.9.0', dev: false },
          { name: 'djangorestframework', version: '3.14.0', dev: false },
          { name: 'django-cors-headers', version: '4.0.0', dev: false },
          { name: 'pytest-django', version: '4.5.0', dev: true }
        ]
      },
      services: {
        database: {
          type: 'postgresql',
          version: '15',
          config: { name: 'django_db', port: '5432' }
        },
        redis: {
          enabled: true,
          version: '7.2',
          config: { port: '6379' }
        },
        messageQueue: {
          type: 'redis',
          config: {}
        },
        externalAPIs: []
      },
      variables: {
        environment: {
          DJANGO_ENV: 'development',
          DEBUG: 'True',
          ALLOWED_HOSTS: 'localhost,127.0.0.1'
        },
        secrets: {
          DATABASE_URL: 'postgres://user:password@localhost:5432/django_db',
          SECRET_KEY: 'your-django-secret-key-here'
        }
      }
    }
  },
  {
    id: 'laravel-mysql',
    name: 'Laravel + MySQL',
    description: 'PHP Laravel framework with MySQL database',
    category: 'Backend',
    popularity: 82,
    icon: <Server className="h-6 w-6 text-red-600" />,
    config: {
      general: {
        name: 'laravel-app',
        description: 'Laravel PHP application with MySQL database',
        techStack: ['php'],
        version: '1.0.0',
        constraints: {
          php: '^8.1'
        }
      },
      dependencies: {
        packageManager: 'composer',
        packages: [
          { name: 'laravel/framework', version: '^10.0', dev: false },
          { name: 'laravel/tinker', version: '^2.8', dev: false },
          { name: 'spatie/laravel-permission', version: '^5.10', dev: false }
        ]
      },
      services: {
        database: {
          type: 'mysql',
          version: '8.0',
          config: { name: 'laravel_db', port: '3306' }
        },
        redis: {
          enabled: true,
          version: '7.2',
          config: { port: '6379' }
        },
        messageQueue: {
          type: 'redis',
          config: {}
        },
        externalAPIs: []
      },
      variables: {
        environment: {
          APP_ENV: 'local',
          APP_DEBUG: 'true',
          APP_URL: 'http://localhost:8000'
        },
        secrets: {
          APP_KEY: 'base64:your-app-key-here',
          DB_CONNECTION: 'mysql',
          DB_HOST: '127.0.0.1',
          DB_PORT: '3306',
          DB_DATABASE: 'laravel_db',
          DB_USERNAME: 'root',
          DB_PASSWORD: 'password'
        }
      }
    }
  },
  {
    id: 'flask-sqlite',
    name: 'Flask + SQLite',
    description: 'Lightweight Python Flask application with SQLite',
    category: 'Backend',
    popularity: 75,
    icon: <Zap className="h-6 w-6 text-yellow-600" />,
    config: {
      general: {
        name: 'flask-app',
        description: 'Lightweight Flask application with SQLite database',
        techStack: ['python'],
        version: '1.0.0',
        constraints: {
          python: '^3.9'
        }
      },
      dependencies: {
        packageManager: 'pip',
        packages: [
          { name: 'flask', version: '2.3.0', dev: false },
          { name: 'flask-sqlalchemy', version: '3.0.0', dev: false },
          { name: 'flask-cors', version: '4.0.0', dev: false },
          { name: 'python-dotenv', version: '1.0.0', dev: false },
          { name: 'pytest', version: '7.4.0', dev: true }
        ]
      },
      services: {
        database: {
          type: 'sqlite',
          version: '3.42',
          config: { name: 'app.db' }
        },
        redis: {
          enabled: false,
          version: '7.2',
          config: {}
        },
        messageQueue: {
          type: 'none',
          config: {}
        },
        externalAPIs: []
      },
      variables: {
        environment: {
          FLASK_ENV: 'development',
          FLASK_DEBUG: '1',
          FLASK_APP: 'app.py'
        },
        secrets: {
          SECRET_KEY: 'your-flask-secret-key-here',
          DATABASE_URL: 'sqlite:///app.db'
        }
      }
    }
  },
  {
    id: 'rails-postgres',
    name: 'Ruby on Rails',
    description: 'Ruby on Rails web application with PostgreSQL',
    category: 'Full Stack',
    popularity: 70,
    icon: <Globe className="h-6 w-6 text-red-700" />,
    config: {
      general: {
        name: 'rails-app',
        description: 'Ruby on Rails application with PostgreSQL database',
        techStack: ['ruby'],
        version: '1.0.0',
        constraints: {
          ruby: '^3.2'
        }
      },
      dependencies: {
        packageManager: 'gem',
        packages: [
          { name: 'rails', version: '~> 7.0', dev: false },
          { name: 'pg', version: '~> 1.1', dev: false },
          { name: 'puma', version: '~> 5.0', dev: false },
          { name: 'bootsnap', version: '>= 1.4.4', dev: false },
          { name: 'rspec-rails', version: '~> 6.0', dev: true }
        ]
      },
      services: {
        database: {
          type: 'postgresql',
          version: '15',
          config: { name: 'rails_db', port: '5432' }
        },
        redis: {
          enabled: true,
          version: '7.2',
          config: { port: '6379' }
        },
        messageQueue: {
          type: 'redis',
          config: {}
        },
        externalAPIs: []
      },
      variables: {
        environment: {
          RAILS_ENV: 'development',
          RAILS_SERVE_STATIC_FILES: 'true'
        },
        secrets: {
          DATABASE_URL: 'postgres://user:password@localhost:5432/rails_db',
          SECRET_KEY_BASE: 'your-rails-secret-key-base-here'
        }
      }
    }
  },
  {
    id: 'microservices-node',
    name: 'Microservices (Node.js)',
    description: 'Microservices architecture with Node.js, PostgreSQL, and Redis',
    category: 'Microservices',
    popularity: 85,
    icon: <Cpu className="h-6 w-6 text-purple-600" />,
    config: {
      general: {
        name: 'microservices-app',
        description: 'Microservices architecture with Node.js services',
        techStack: ['node', 'typescript'],
        version: '1.0.0',
        constraints: {
          node: '^18.0.0',
          typescript: '^5.0.0'
        }
      },
      dependencies: {
        packageManager: 'npm',
        packages: [
          { name: 'express', version: '^4.18.0', dev: false },
          { name: 'typescript', version: '^5.0.0', dev: false },
          { name: 'prisma', version: '^5.0.0', dev: false },
          { name: 'axios', version: '^1.4.0', dev: false },
          { name: '@types/express', version: '^4.17.0', dev: true },
          { name: 'jest', version: '^29.0.0', dev: true }
        ]
      },
      services: {
        database: {
          type: 'postgresql',
          version: '15',
          config: { name: 'microservices_db', port: '5432' }
        },
        redis: {
          enabled: true,
          version: '7.2',
          config: { port: '6379' }
        },
        messageQueue: {
          type: 'rabbitmq',
          config: {}
        },
        externalAPIs: [
          { name: 'API Gateway', url: 'http://localhost:3000', auth: 'bearer' },
          { name: 'Service Discovery', url: 'http://localhost:8500', auth: 'none' }
        ]
      },
      variables: {
        environment: {
          NODE_ENV: 'development',
          SERVICE_NAME: 'user-service',
          SERVICE_PORT: '3001',
          API_GATEWAY_URL: 'http://localhost:3000'
        },
        secrets: {
          DATABASE_URL: 'postgres://user:password@localhost:5432/microservices_db',
          JWT_SECRET: 'your-jwt-secret-here',
          RABBITMQ_URL: 'amqp://localhost:5672'
        }
      }
    }
  }
];

export const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(templates.map(t => t.category)))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Template Library
          </DialogTitle>
          <DialogDescription>
            Choose from pre-built environment templates to get started quickly
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map(template => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {template.icon}
                      <div>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-muted-foreground">
                              {template.popularity}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {/* Tech Stack Preview */}
                  <div>
                    <span className="text-sm font-medium">Technologies:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.config.general.techStack.slice(0, 4).map(tech => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {template.config.general.techStack.length > 4 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.config.general.techStack.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Services Preview */}
                  <div>
                    <span className="text-sm font-medium">Includes:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {template.config.services.database.type !== 'none' && (
                        <Badge variant="outline" className="text-xs">
                          {template.config.services.database.type}
                        </Badge>
                      )}
                      {template.config.services.redis.enabled && (
                        <Badge variant="outline" className="text-xs">
                          Redis
                        </Badge>
                      )}
                      {template.config.services.messageQueue.type !== 'none' && (
                        <Badge variant="outline" className="text-xs">
                          {template.config.services.messageQueue.type}
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {template.config.dependencies.packages.length} packages
                      </Badge>
                    </div>
                  </div>

                  <Button 
                    onClick={() => onSelect(template.config)}
                    className="w-full gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No templates found matching your criteria</p>
              <p className="text-sm">Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};