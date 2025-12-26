import { motion } from 'framer-motion';
import { Flame, Trophy, Gift, AlertTriangle, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface StreakTrackerProps {
  currentStreak: number;
  longestStreak: number;
  lastPostDate: string;
  streakPoints: number;
  isAtRisk?: boolean;
  compact?: boolean;
  onClick?: () => void;
}

export function StreakTracker({
  currentStreak,
  longestStreak,
  lastPostDate,
  streakPoints,
  isAtRisk = false,
  compact = false,
  onClick
}: StreakTrackerProps) {
  const streakLevel = currentStreak >= 30 ? 'legendary' : currentStreak >= 14 ? 'fire' : currentStreak >= 7 ? 'hot' : 'warming';
  
  const streakColors = {
    legendary: 'from-amber via-orange to-coral',
    fire: 'from-coral to-orange',
    hot: 'from-orange to-amber',
    warming: 'from-amber to-yellow'
  };

  if (compact) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="w-full"
      >
        <Card className={cn(
          "border-2 transition-all cursor-pointer",
          isAtRisk ? "border-coral/50 bg-coral/5" : "border-border hover:border-primary/30"
        )}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                streakColors[streakLevel]
              )}>
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">{currentStreak}</span>
                  <span className="text-sm text-muted-foreground">day streak</span>
                  {isAtRisk && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      At Risk!
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">+{streakPoints} bonus points</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </CardContent>
        </Card>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={onClick ? "cursor-pointer" : ""}
    >
      <Card className={cn(
        "border-2 overflow-hidden",
        isAtRisk ? "border-coral/50" : "border-transparent"
      )}>
        <div className={cn(
          "h-2 bg-gradient-to-r",
          streakColors[streakLevel]
        )} />
        <CardContent className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg",
                  streakColors[streakLevel]
                )}
              >
                <Flame className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Streak Tracker</h3>
                {isAtRisk && (
                  <Badge variant="destructive" className="mt-1">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Post today to keep streak!
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-foreground">{currentStreak}</p>
              <p className="text-xs text-muted-foreground">days</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 bg-muted/50 rounded-xl">
              <Trophy className="w-5 h-5 text-amber mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">{longestStreak}</p>
              <p className="text-xs text-muted-foreground">Best</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-xl">
              <Gift className="w-5 h-5 text-coral mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground">+{streakPoints}</p>
              <p className="text-xs text-muted-foreground">Points</p>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-xl">
              <Flame className="w-5 h-5 text-orange mx-auto mb-1" />
              <p className="text-lg font-bold text-foreground capitalize">{streakLevel}</p>
              <p className="text-xs text-muted-foreground">Level</p>
            </div>
          </div>

          {/* Next Milestone */}
          <div className="bg-muted/30 rounded-xl p-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Next milestone</span>
              <span className="font-medium text-foreground">
                {currentStreak < 7 ? '7 days' : currentStreak < 14 ? '14 days' : currentStreak < 30 ? '30 days' : '🎉 Legendary!'}
              </span>
            </div>
            <Progress 
              value={
                currentStreak < 7 ? (currentStreak / 7) * 100 :
                currentStreak < 14 ? ((currentStreak - 7) / 7) * 100 :
                currentStreak < 30 ? ((currentStreak - 14) / 16) * 100 :
                100
              } 
              className="h-2"
            />
          </div>

          <p className="text-xs text-muted-foreground text-center mt-3">
            Last post: {lastPostDate}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
