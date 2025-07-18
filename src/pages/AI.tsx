import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { SmartOptimization } from '@/components/ai/SmartOptimization';
import { NaturalLanguageConfig } from '@/components/ai/NaturalLanguageConfig';

const AI: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Tabs defaultValue="assistant" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="optimization">Smart Optimization</TabsTrigger>
          <TabsTrigger value="config">Natural Language Config</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="assistant">
          <AIAssistant />
        </TabsContent>

        <TabsContent value="optimization">
          <SmartOptimization />
        </TabsContent>

        <TabsContent value="config">
          <NaturalLanguageConfig />
        </TabsContent>

        <TabsContent value="insights">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">AI Insights & Analytics</h2>
            <p className="text-muted-foreground">
              Advanced AI-powered insights, predictive analytics, and machine learning recommendations coming soon...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AI;