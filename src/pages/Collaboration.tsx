import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CollaborativeEditor } from '@/components/collaboration/CollaborativeEditor';
import { EnvironmentBranching } from '@/components/collaboration/EnvironmentBranching';
import { ApprovalWorkflows } from '@/components/collaboration/ApprovalWorkflows';

const Collaboration: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="editor">Live Editor</TabsTrigger>
          <TabsTrigger value="branching">Branching</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <CollaborativeEditor />
        </TabsContent>

        <TabsContent value="branching">
          <EnvironmentBranching />
        </TabsContent>

        <TabsContent value="approvals">
          <ApprovalWorkflows />
        </TabsContent>

        <TabsContent value="permissions">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Advanced Permissions System</h2>
            <p className="text-muted-foreground">
              Custom roles, time-based access controls, and granular permissions management coming soon...
            </p>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Collaboration Analytics</h2>
            <p className="text-muted-foreground">
              Team productivity metrics, collaboration insights, and governance analytics coming soon...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Collaboration;