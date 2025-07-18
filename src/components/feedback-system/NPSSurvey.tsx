import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star, StarIcon } from 'lucide-react';
import { useState } from 'react';

interface NPSSurveyProps {
  onSubmit: (score: number, comment: string) => void;
  onClose: () => void;
}

export const NPSSurvey: React.FC<NPSSurveyProps> = ({ onSubmit, onClose }) => {
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [step, setStep] = useState<'score' | 'comment'>('score');

  const handleScoreSelect = (selectedScore: number) => {
    setScore(selectedScore);
    setStep('comment');
  };

  const handleSubmit = () => {
    if (score !== null) {
      onSubmit(score, comment);
    }
  };

  const getScoreColor = (value: number) => {
    if (value <= 6) return 'text-red-600 bg-red-50 border-red-200';
    if (value <= 8) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getScoreLabel = (value: number) => {
    if (value <= 6) return 'Detractor';
    if (value <= 8) return 'Passive';
    return 'Promoter';
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            How likely are you to recommend EnvSync?
          </DialogTitle>
          <DialogDescription>
            Your feedback helps us improve and grow
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 'score' && (
            <>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    On a scale of 0-10, how likely are you to recommend EnvSync to a friend or colleague?
                  </p>
                </div>

                {/* Score Grid */}
                <div className="grid grid-cols-11 gap-2">
                  {Array.from({ length: 11 }, (_, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="h-12 p-0 text-sm hover:scale-105 transition-transform"
                      onClick={() => handleScoreSelect(i)}
                    >
                      {i}
                    </Button>
                  ))}
                </div>

                {/* Labels */}
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Not at all likely</span>
                  <span>Extremely likely</span>
                </div>
              </div>
            </>
          )}

          {step === 'comment' && score !== null && (
            <>
              <div className="text-center space-y-4">
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border ${getScoreColor(score)}`}>
                  <Star className="h-4 w-4" />
                  <span className="font-medium">Score: {score} ({getScoreLabel(score)})</span>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium">
                    {score <= 6 && "What's the main reason for your score?"}
                    {score > 6 && score <= 8 && "What would make you more likely to recommend us?"}
                    {score > 8 && "What do you like most about EnvSync?"}
                  </label>
                  <Textarea
                    placeholder="Your feedback helps us improve..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSubmit} className="flex-1">
                  Submit Feedback
                </Button>
                <Button variant="outline" onClick={() => setStep('score')}>
                  Back
                </Button>
              </div>
            </>
          )}

          {step === 'score' && (
            <div className="flex justify-end">
              <Button variant="ghost" onClick={onClose}>
                Maybe later
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};