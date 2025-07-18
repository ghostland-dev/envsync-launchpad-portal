import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Zap, Users, Monitor, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
}

const WelcomeStep = () => (
  <div className="text-center space-y-6">
    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-float">
      <Zap className="h-10 w-10 text-white" />
    </div>
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Welcome to EnvSync!</h2>
      <p className="text-lg text-muted-foreground max-w-md mx-auto">
        Let's get you set up with your first development environment in just a few steps.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {[
        { icon: Zap, title: "Auto-detection", desc: "Detect your stack" },
        { icon: Users, title: "Team sync", desc: "Share environments" },
        { icon: Monitor, title: "Cross-platform", desc: "Works everywhere" }
      ].map((feature, index) => (
        <div key={feature.title} className="p-4 rounded-lg glass border border-muted animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
          {React.createElement(feature.icon, { className: "h-8 w-8 text-primary mx-auto mb-2" })}
          <h3 className="font-semibold text-sm">{feature.title}</h3>
          <p className="text-xs text-muted-foreground">{feature.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const ProjectSetupStep = () => {
  const [projectType, setProjectType] = useState("");
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Project Setup</h2>
        <p className="text-muted-foreground">Tell us about your project so we can optimize your environment</p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="project-name">Project Name</Label>
          <Input 
            id="project-name" 
            placeholder="my-awesome-project" 
            className="glass border-muted"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Project Type</Label>
          <Select value={projectType} onValueChange={setProjectType}>
            <SelectTrigger className="glass border-muted">
              <SelectValue placeholder="Select your project type" />
            </SelectTrigger>
            <SelectContent className="glass border-muted">
              <SelectItem value="react">React App</SelectItem>
              <SelectItem value="node">Node.js API</SelectItem>
              <SelectItem value="fullstack">Full-stack Application</SelectItem>
              <SelectItem value="mobile">Mobile App</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-3">
          <Label>Additional Tools (optional)</Label>
          <div className="grid grid-cols-2 gap-3">
            {[
              "Docker", "Database", "Redis", "Testing", 
              "CI/CD", "Monitoring", "Analytics", "Auth"
            ].map((tool) => (
              <div key={tool} className="flex items-center space-x-2">
                <Checkbox id={tool} />
                <Label htmlFor={tool} className="text-sm">{tool}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamSetupStep = () => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <h2 className="text-2xl font-bold">Team Collaboration</h2>
      <p className="text-muted-foreground">Set up team access and sharing preferences</p>
    </div>
    
    <div className="space-y-4">
      <div className="p-4 rounded-lg glass border border-muted">
        <div className="flex items-center space-x-3 mb-3">
          <Users className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Invite Team Members</h3>
        </div>
        <Input 
          placeholder="teammate@company.com" 
          className="glass border-muted mb-2"
        />
        <Button size="sm" variant="outline" className="w-full glass border-muted">
          Send Invitation
        </Button>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-semibold">Sharing Preferences</h3>
        <div className="space-y-2">
          {[
            "Auto-sync environment changes",
            "Share dependency updates",
            "Notify on configuration changes"
          ].map((pref) => (
            <div key={pref} className="flex items-center space-x-2">
              <Checkbox id={pref} defaultChecked />
              <Label htmlFor={pref} className="text-sm">{pref}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const CompletionStep = () => (
  <div className="text-center space-y-6">
    <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto animate-scale-in">
      <Check className="h-10 w-10 text-white" />
    </div>
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">You're All Set!</h2>
      <p className="text-lg text-muted-foreground max-w-md mx-auto">
        Your environment is ready. You can now start building with confidence.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
      <Card className="glass border-0 shadow-card">
        <CardContent className="p-4 text-center">
          <Monitor className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold">Environment Ready</h3>
          <p className="text-sm text-muted-foreground">All dependencies configured</p>
        </CardContent>
      </Card>
      <Card className="glass border-0 shadow-card">
        <CardContent className="p-4 text-center">
          <Users className="h-8 w-8 text-primary mx-auto mb-2" />
          <h3 className="font-semibold">Team Synced</h3>
          <p className="text-sm text-muted-foreground">Ready for collaboration</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

export function OnboardingFlow({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Welcome',
      description: 'Get started with EnvSync',
      icon: Zap,
      component: WelcomeStep
    },
    {
      id: 'project',
      title: 'Project Setup',
      description: 'Configure your project',
      icon: Settings,
      component: ProjectSetupStep
    },
    {
      id: 'team',
      title: 'Team Setup',
      description: 'Invite your team',
      icon: Users,
      component: TeamSetupStep
    },
    {
      id: 'complete',
      title: 'Complete',
      description: 'Ready to go!',
      icon: Check,
      component: CompletionStep
    }
  ];

  const progress = ((currentStep + 1) / steps.length) * 100;
  const CurrentStepComponent = steps[currentStep].component;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl glass border-0 shadow-card">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="glass border-primary/20">
              <Zap className="h-3 w-3 mr-1" />
              Step {currentStep + 1} of {steps.length}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onComplete}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip setup
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              {React.createElement(steps[currentStep].icon, { className: "h-6 w-6 text-primary" })}
              <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent />
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="glass border-muted"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={nextStep}
              className="bg-gradient-primary hover:opacity-90"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Complete Setup
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}