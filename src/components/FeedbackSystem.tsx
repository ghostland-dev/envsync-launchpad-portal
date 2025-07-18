import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Bug, 
  Lightbulb, 
  ThumbsUp, 
  TrendingUp,
  Star,
  Users,
  Calendar,
  Gift,
  BarChart3,
  Map,
  Settings
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { FeedbackWidget } from './feedback-system/FeedbackWidget';
import { FeedbackDashboard } from './feedback-system/FeedbackDashboard';
import { NPSSurvey } from './feedback-system/NPSSurvey';
// TODO: Create remaining components
// import { FeatureVoting } from './feedback-system/FeatureVoting';
// import { BetaTesterDashboard } from './feedback-system/BetaTesterDashboard';
// import { PublicRoadmap } from './feedback-system/PublicRoadmap';
// import { FeedbackAnalytics } from './feedback-system/FeedbackAnalytics';
// import { InterviewScheduler } from './feedback-system/InterviewScheduler';
// import { RewardsProgram } from './feedback-system/RewardsProgram';

export interface FeedbackItem {
  id: string;
  type: 'bug' | 'feature' | 'improvement' | 'praise';
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'completed' | 'closed';
  priority: 'low' | 'medium' | 'high';
  votes: number;
  submittedBy: string;
  createdAt: string;
  updatedAt: string;
  screenshot?: string;
  category: string;
  tags: string[];
  anonymous: boolean;
}

export interface NPSResponse {
  id: string;
  score: number;
  comment: string;
  submittedBy: string;
  createdAt: string;
  followUpCompleted: boolean;
}

export interface BetaTester {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  feedbackCount: number;
  points: number;
  badges: string[];
  exclusiveFeatures: string[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'planned' | 'in-development' | 'testing' | 'released';
  quarter: string;
  votes: number;
  complexity: 'low' | 'medium' | 'high';
  category: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    type: 'bug',
    title: 'Sync fails on large files',
    description: 'Environment sync fails when trying to sync files larger than 100MB',
    status: 'in-progress',
    priority: 'high',
    votes: 23,
    submittedBy: 'john.doe@example.com',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T14:20:00Z',
    category: 'Sync',
    tags: ['performance', 'large-files'],
    anonymous: false
  },
  {
    id: '2',
    type: 'feature',
    title: 'Dark mode support',
    description: 'Add dark mode theme option for better user experience',
    status: 'open',
    priority: 'medium',
    votes: 156,
    submittedBy: 'Anonymous',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T09:15:00Z',
    category: 'UI/UX',
    tags: ['theme', 'accessibility'],
    anonymous: true
  },
  {
    id: '3',
    type: 'improvement',
    title: 'Faster environment comparison',
    description: 'The environment comparison tool could be optimized for better performance',
    status: 'open',
    priority: 'medium',
    votes: 45,
    submittedBy: 'sarah.wilson@example.com',
    createdAt: '2024-01-13T16:45:00Z',
    updatedAt: '2024-01-13T16:45:00Z',
    category: 'Performance',
    tags: ['comparison', 'speed'],
    anonymous: false
  }
];

const mockNPSData: NPSResponse[] = [
  {
    id: '1',
    score: 9,
    comment: 'Great tool! Really helps with environment management.',
    submittedBy: 'user1@example.com',
    createdAt: '2024-01-15T12:00:00Z',
    followUpCompleted: false
  },
  {
    id: '2',
    score: 7,
    comment: 'Good but could use more features.',
    submittedBy: 'user2@example.com',
    createdAt: '2024-01-14T14:30:00Z',
    followUpCompleted: true
  }
];

export const FeedbackSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNPSSurvey, setShowNPSSurvey] = useState(false);
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>(mockFeedback);
  const [npsResponses, setNPSResponses] = useState<NPSResponse[]>(mockNPSData);
  const [userRole, setUserRole] = useState<'user' | 'beta-tester' | 'admin'>('beta-tester');
  const { toast } = useToast();

  // Simulate NPS survey trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() > 0.7) { // 30% chance to show NPS survey
        setShowNPSSurvey(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleFeedbackSubmit = (feedback: Omit<FeedbackItem, 'id' | 'votes' | 'createdAt' | 'updatedAt'>) => {
    const newFeedback: FeedbackItem = {
      ...feedback,
      id: Date.now().toString(),
      votes: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setFeedbackItems(prev => [newFeedback, ...prev]);

    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We'll review it soon.",
    });

    // Simulate points reward for beta testers
    if (userRole === 'beta-tester') {
      toast({
        title: "Points Earned!",
        description: "+10 points added to your beta tester account",
      });
    }
  };

  const handleNPSSubmit = (score: number, comment: string) => {
    const newResponse: NPSResponse = {
      id: Date.now().toString(),
      score,
      comment,
      submittedBy: 'current-user@example.com',
      createdAt: new Date().toISOString(),
      followUpCompleted: false
    };

    setNPSResponses(prev => [newResponse, ...prev]);
    setShowNPSSurvey(false);

    toast({
      title: "Survey Completed",
      description: "Thank you for rating EnvSync!",
    });
  };

  const handleVote = (feedbackId: string) => {
    setFeedbackItems(prev => prev.map(item => 
      item.id === feedbackId 
        ? { ...item, votes: item.votes + 1 }
        : item
    ));

    toast({
      title: "Vote Recorded",
      description: "Your vote helps us prioritize features!",
    });
  };

  const getFeedbackStats = () => {
    const total = feedbackItems.length;
    const bugs = feedbackItems.filter(item => item.type === 'bug').length;
    const features = feedbackItems.filter(item => item.type === 'feature').length;
    const improvements = feedbackItems.filter(item => item.type === 'improvement').length;
    const praise = feedbackItems.filter(item => item.type === 'praise').length;

    return { total, bugs, features, improvements, praise };
  };

  const stats = getFeedbackStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Feedback & Beta Testing</h1>
            <p className="text-muted-foreground">
              Help shape the future of EnvSync with your feedback
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {userRole === 'beta-tester' && (
              <Badge variant="secondary" className="gap-1">
                <Star className="h-3 w-3" />
                Beta Tester
              </Badge>
            )}
            
            <Button variant="outline" className="gap-2">
              <Gift className="h-4 w-4" />
              Rewards: 250 pts
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Feedback</p>
                </div>
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-red-600">{stats.bugs}</p>
                  <p className="text-sm text-muted-foreground">Bug Reports</p>
                </div>
                <Bug className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.features}</p>
                  <p className="text-sm text-muted-foreground">Feature Requests</p>
                </div>
                <Lightbulb className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-amber-600">{stats.improvements}</p>
                  <p className="text-sm text-muted-foreground">Improvements</p>
                </div>
                <TrendingUp className="h-8 w-8 text-amber-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-green-600">{stats.praise}</p>
                  <p className="text-sm text-muted-foreground">Praise</p>
                </div>
                <ThumbsUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="voting" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Voting
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="gap-2">
              <Map className="h-4 w-4" />
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="beta" className="gap-2">
              <Star className="h-4 w-4" />
              Beta Program
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="interviews" className="gap-2">
              <Calendar className="h-4 w-4" />
              Interviews
            </TabsTrigger>
            <TabsTrigger value="rewards" className="gap-2">
              <Gift className="h-4 w-4" />
              Rewards
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="dashboard" className="space-y-6">
              <FeedbackDashboard 
                feedbackItems={feedbackItems}
                onVote={handleVote}
                userRole={userRole}
              />
            </TabsContent>

            <TabsContent value="voting" className="space-y-6">
              <div className="text-center py-12 text-muted-foreground">
                <p>Feature voting coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="roadmap" className="space-y-6">
              <div className="text-center py-12 text-muted-foreground">
                <p>Public roadmap coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="beta" className="space-y-6">
              {userRole === 'beta-tester' || userRole === 'admin' ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Beta tester dashboard coming soon...</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Join Our Beta Program</h3>
                  <p className="text-muted-foreground mb-4">
                    Get early access to new features and help shape EnvSync
                  </p>
                  <Button>Apply for Beta Access</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              {userRole === 'admin' ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Feedback analytics coming soon...</p>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <p>Analytics available for team members only</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="interviews" className="space-y-6">
              <div className="text-center py-12 text-muted-foreground">
                <p>Interview scheduler coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-6">
              <div className="text-center py-12 text-muted-foreground">
                <p>Rewards program coming soon...</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Floating Feedback Widget */}
      <FeedbackWidget onSubmit={handleFeedbackSubmit} />

      {/* NPS Survey Modal */}
      {showNPSSurvey && (
        <NPSSurvey
          onSubmit={handleNPSSubmit}
          onClose={() => setShowNPSSurvey(false)}
        />
      )}
    </div>
  );
};