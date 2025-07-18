import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Square, RotateCcw, CheckCircle, Clock } from 'lucide-react';

interface LivePreviewProps {
  config: any;
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onRestart: () => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  config,
  isRunning,
  onStart,
  onStop,
  onRestart
}) => {
  const [progress, setProgress] = useState(isRunning ? 100 : 0);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Live Preview</CardTitle>
              <CardDescription>Test your environment in real-time</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={isRunning ? "destructive" : "default"}
                size="sm"
                onClick={isRunning ? onStop : onStart}
              >
                {isRunning ? <Square className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isRunning ? 'Stop' : 'Start'}
              </Button>
              <Button variant="outline" size="sm" onClick={onRestart}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Status:</span>
              <Badge variant={isRunning ? "default" : "secondary"}>
                {isRunning ? <CheckCircle className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                {isRunning ? 'Running' : 'Stopped'}
              </Badge>
            </div>
            {isRunning && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Environment Health</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};