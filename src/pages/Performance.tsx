import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PerformanceDashboard } from '@/components/performance/PerformanceDashboard';
import { AutoScalingManager } from '@/components/scalability/AutoScalingManager';

const Performance: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Performance</TabsTrigger>
          <TabsTrigger value="scaling">Auto Scaling</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <PerformanceDashboard />
        </TabsContent>

        <TabsContent value="scaling">
          <AutoScalingManager />
        </TabsContent>

        <TabsContent value="optimization">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Performance Optimization</h2>
            <p className="text-muted-foreground">
              Advanced optimization tools and recommendations coming soon...
            </p>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Advanced Monitoring</h2>
            <p className="text-muted-foreground">
              Real-time monitoring and alerting system coming soon...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Performance;