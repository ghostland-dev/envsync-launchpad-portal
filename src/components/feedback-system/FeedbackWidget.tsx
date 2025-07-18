import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  MessageSquare, 
  Camera, 
  X,
  Send,
  Bug,
  Lightbulb,
  TrendingUp,
  ThumbsUp
} from 'lucide-react';
import type { FeedbackItem } from '../FeedbackSystem';

interface FeedbackWidgetProps {
  onSubmit: (feedback: Omit<FeedbackItem, 'id' | 'votes' | 'createdAt' | 'updatedAt'>) => void;
}

export const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState({
    type: 'bug' as 'bug' | 'feature' | 'improvement' | 'praise',
    title: '',
    description: '',
    category: '',
    anonymous: false,
    email: ''
  });
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleScreenshot = async () => {
    try {
      // Simulate screenshot capture
      // In a real implementation, you'd use a library like html2canvas
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 300;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, 400, 300);
        ctx.fillStyle = '#333';
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Screenshot Preview', 200, 150);
      }
      setScreenshot(canvas.toDataURL());
    } catch (error) {
      console.error('Failed to capture screenshot:', error);
    }
  };

  const handleSubmit = async () => {
    if (!feedback.title || !feedback.description) return;

    setIsSubmitting(true);

    const submissionData: Omit<FeedbackItem, 'id' | 'votes' | 'createdAt' | 'updatedAt'> = {
      type: feedback.type,
      title: feedback.title,
      description: feedback.description,
      status: 'open',
      priority: feedback.type === 'bug' ? 'high' : 'medium',
      submittedBy: feedback.anonymous ? 'Anonymous' : feedback.email || 'current-user@example.com',
      category: feedback.category || 'General',
      tags: [],
      anonymous: feedback.anonymous,
      screenshot: screenshot || undefined
    };

    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    onSubmit(submissionData);
    
    // Reset form
    setFeedback({
      type: 'bug',
      title: '',
      description: '',
      category: '',
      anonymous: false,
      email: ''
    });
    setScreenshot(null);
    setIsSubmitting(false);
    setIsOpen(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return <Bug className="h-4 w-4 text-red-600" />;
      case 'feature':
        return <Lightbulb className="h-4 w-4 text-blue-600" />;
      case 'improvement':
        return <TrendingUp className="h-4 w-4 text-amber-600" />;
      case 'praise':
        return <ThumbsUp className="h-4 w-4 text-green-600" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <>
      {/* Floating Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 animate-bounce"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Share Your Feedback
              </DialogTitle>
              <DialogDescription>
                Help us improve EnvSync by sharing your thoughts, reporting bugs, or suggesting new features.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Feedback Type */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">What type of feedback is this?</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { type: 'bug', label: 'Bug Report', description: 'Something is broken' },
                    { type: 'feature', label: 'Feature Request', description: 'New functionality' },
                    { type: 'improvement', label: 'Improvement', description: 'Make it better' },
                    { type: 'praise', label: 'Praise', description: 'Something great!' }
                  ].map(({ type, label, description }) => (
                    <Card
                      key={type}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        feedback.type === type ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setFeedback(prev => ({ ...prev, type: type as any }))}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          {getTypeIcon(type)}
                          <div>
                            <p className="font-medium text-sm">{label}</p>
                            <p className="text-xs text-muted-foreground">{description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="feedback-title">Title *</Label>
                <Input
                  id="feedback-title"
                  placeholder="Brief description of your feedback"
                  value={feedback.title}
                  onChange={(e) => setFeedback(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="feedback-description">Description *</Label>
                <Textarea
                  id="feedback-description"
                  placeholder="Please provide detailed information about your feedback..."
                  rows={4}
                  value={feedback.description}
                  onChange={(e) => setFeedback(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="feedback-category">Category</Label>
                <Select value={feedback.category} onValueChange={(value) => setFeedback(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sync">Sync & Deployment</SelectItem>
                    <SelectItem value="ui-ux">UI/UX</SelectItem>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="security">Security</SelectItem>
                    <SelectItem value="integration">Integrations</SelectItem>
                    <SelectItem value="documentation">Documentation</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Screenshot */}
              <div className="space-y-3">
                <Label>Screenshot (Optional)</Label>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleScreenshot}
                    className="gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    Capture Screenshot
                  </Button>
                  {screenshot && (
                    <div className="relative">
                      <img
                        src={screenshot}
                        alt="Screenshot"
                        className="h-20 w-20 object-cover rounded border"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => setScreenshot(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Anonymous Option */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="anonymous"
                  checked={feedback.anonymous}
                  onCheckedChange={(checked) => setFeedback(prev => ({ ...prev, anonymous: checked }))}
                />
                <Label htmlFor="anonymous" className="text-sm">
                  Submit anonymously
                </Label>
              </div>

              {/* Email (if not anonymous) */}
              {!feedback.anonymous && (
                <div className="space-y-2">
                  <Label htmlFor="feedback-email">Email (Optional)</Label>
                  <Input
                    id="feedback-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={feedback.email}
                    onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">
                    We'll use this to follow up on your feedback
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSubmit}
                  disabled={!feedback.title || !feedback.description || isSubmitting}
                  className="flex-1 gap-2"
                >
                  <Send className="h-4 w-4" />
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Mobile-optimized styles */}
      <style>{`
        @media (max-width: 768px) {
          .fixed.bottom-6.right-6 {
            bottom: 1rem;
            right: 1rem;
          }
        }
      `}</style>
    </>
  );
};