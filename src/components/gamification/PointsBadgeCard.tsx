import { motion } from 'framer-motion';
import { Star, Crown, Award, Zap, Gift, ChevronRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Badge {
  id: string;
  name: string;
  icon: string;
  earned: boolean;
  description: string;
}

interface PointsBadgeCardProps {
  totalPoints: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  pointsToNextTier: number;
  nextTierRequirement: number;
  badges: Badge[];
  recentActivity?: { action: string; points: number; timestamp: string }[];
  compact?: boolean;
  onClick?: () => void;
}

const tierConfig = {
  bronze: { color: 'from-amber-600 to-amber-800', icon: Award, label: 'Bronze', minPoints: 0 },
  silver: { color: 'from-slate-300 to-slate-500', icon: Award, label: 'Silver', minPoints: 500 },
  gold: { color: 'from-yellow-400 to-amber-500', icon: Crown, label: 'Gold', minPoints: 2000 },
  platinum: { color: 'from-slate-400 to-slate-600', icon: Crown, label: 'Platinum', minPoints: 5000 },
  diamond: { color: 'from-cyan-300 to-blue-500', icon: Star, label: 'Diamond', minPoints: 10000 },
};

const badgeIcons: Record<string, string> = {
  first_post: '📸',
  food_critic: '⭐',
  deal_hunter: '🎯',
  social_butterfly: '🦋',
  streak_master: '🔥',
  influencer: '👑',
  explorer: '🗺️',
  early_bird: '🌅',
};

export function PointsBadgeCard({
  totalPoints,
  tier,
  pointsToNextTier,
  nextTierRequirement,
  badges,
  recentActivity = [],
  compact = false,
  onClick
}: PointsBadgeCardProps) {
  const config = tierConfig[tier];
  const TierIcon = config.icon;
  const progressPercent = ((nextTierRequirement - pointsToNextTier) / nextTierRequirement) * 100;

  if (compact) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="w-full text-left"
      >
        <Card className="border-border hover:border-primary/30 transition-all cursor-pointer">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br shadow-md",
                config.color
              )}>
                <TierIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground">{totalPoints.toLocaleString()}</span>
                  <Badge variant="secondary" className={cn("text-xs bg-gradient-to-r text-white", config.color)}>
                    {config.label}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{badges.filter(b => b.earned).length} badges earned</p>
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
      <Card className="border-border overflow-hidden">
        {/* Header with Tier */}
        <div className={cn("p-5 bg-gradient-to-r text-white", config.color)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <TierIcon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm opacity-90">Current Tier</p>
                <h3 className="text-2xl font-bold">{config.label}</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{totalPoints.toLocaleString()}</p>
              <p className="text-sm opacity-90">points</p>
            </div>
          </div>
        </div>

        <CardContent className="p-5 space-y-5">
          {/* Progress to Next Tier */}
          {tier !== 'diamond' && (
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress to {tierConfig[
                  tier === 'bronze' ? 'silver' : 
                  tier === 'silver' ? 'gold' : 
                  tier === 'gold' ? 'platinum' : 'diamond'
                ].label}</span>
                <span className="font-medium text-foreground">{pointsToNextTier} pts needed</span>
              </div>
              <Progress value={progressPercent} className="h-2" />
            </div>
          )}

          {/* Badges */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Gift className="w-4 h-4 text-coral" />
              Badges Earned
            </h4>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => (
                <motion.div
                  key={badge.id}
                  whileHover={{ scale: 1.1 }}
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
                    badge.earned 
                      ? "bg-gradient-to-br from-amber/20 to-orange/20 shadow-sm" 
                      : "bg-muted opacity-40 grayscale"
                  )}
                  title={badge.name}
                >
                  {badgeIcons[badge.id] || '🏆'}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          {recentActivity.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-fresh" />
                Recent Activity
              </h4>
              <div className="space-y-2">
                {recentActivity.slice(0, 3).map((activity, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{activity.action}</span>
                    <span className="font-medium text-fresh">+{activity.points}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
