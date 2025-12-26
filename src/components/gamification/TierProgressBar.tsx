import { motion } from 'framer-motion';
import { Award, Crown, Star, Gem, ChevronRight, Check, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TierPerk {
  name: string;
  unlocked: boolean;
}

interface TierProgressBarProps {
  currentTier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  currentPoints: number;
  visits: number;
  redemptions: number;
  perks: TierPerk[];
  compact?: boolean;
  onClick?: () => void;
}

const tiers = [
  { id: 'bronze', label: 'Bronze', icon: Award, color: 'bg-amber-600', points: 0, gradient: 'from-amber-600 to-amber-700' },
  { id: 'silver', label: 'Silver', icon: Award, color: 'bg-slate-400', points: 500, gradient: 'from-slate-300 to-slate-500' },
  { id: 'gold', label: 'Gold', icon: Crown, color: 'bg-yellow-500', points: 2000, gradient: 'from-yellow-400 to-amber-500' },
  { id: 'platinum', label: 'Platinum', icon: Crown, color: 'bg-slate-500', points: 5000, gradient: 'from-slate-400 to-slate-600' },
  { id: 'diamond', label: 'Diamond', icon: Gem, color: 'bg-cyan-400', points: 10000, gradient: 'from-cyan-300 to-blue-500' },
];

export function TierProgressBar({
  currentTier,
  currentPoints,
  visits,
  redemptions,
  perks,
  compact = false,
  onClick
}: TierProgressBarProps) {
  const currentTierIndex = tiers.findIndex(t => t.id === currentTier);
  const currentTierConfig = tiers[currentTierIndex];
  const nextTier = tiers[currentTierIndex + 1];
  
  const progressPercent = nextTier 
    ? ((currentPoints - currentTierConfig.points) / (nextTier.points - currentTierConfig.points)) * 100
    : 100;

  if (compact) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="w-full text-left"
      >
        <Card className="border-border hover:border-primary/30 transition-all cursor-pointer overflow-hidden">
          <div className={cn("h-1 bg-gradient-to-r", currentTierConfig.gradient)} />
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br", currentTierConfig.gradient)}>
                  <currentTierConfig.icon className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-foreground">{currentTierConfig.label}</span>
              </div>
              {nextTier && (
                <span className="text-xs text-muted-foreground">
                  {nextTier.points - currentPoints} pts to {nextTier.label}
                </span>
              )}
            </div>
            <Progress value={progressPercent} className="h-2" />
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
        <CardContent className="p-5 space-y-5">
          {/* Tier Journey */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Your Loyalty Journey</h3>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-4 left-4 right-4 h-1 bg-muted rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentTierIndex / (tiers.length - 1)) * 100}%` }}
                  className="h-full bg-gradient-to-r from-coral to-amber rounded-full"
                />
              </div>
              
              {/* Tier Markers */}
              <div className="flex justify-between relative">
                {tiers.map((tier, index) => {
                  const isUnlocked = index <= currentTierIndex;
                  const isCurrent = tier.id === currentTier;
                  const TierIcon = tier.icon;
                  
                  return (
                    <motion.div
                      key={tier.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                        isUnlocked 
                          ? cn("bg-gradient-to-br shadow-md", tier.gradient)
                          : "bg-muted",
                        isCurrent && "ring-2 ring-primary ring-offset-2"
                      )}>
                        {isUnlocked ? (
                          <TierIcon className="w-4 h-4 text-white" />
                        ) : (
                          <Lock className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                      <span className={cn(
                        "text-xs mt-2 font-medium",
                        isUnlocked ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {tier.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Current Progress */}
          {nextTier && (
            <div className="bg-muted/50 rounded-xl p-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Progress to {nextTier.label}</span>
                <span className="font-bold text-foreground">{Math.round(progressPercent)}%</span>
              </div>
              <Progress value={progressPercent} className="h-3 mb-2" />
              <p className="text-xs text-muted-foreground text-center">
                {nextTier.points - currentPoints} more points needed
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-muted/30 rounded-xl">
              <p className="text-2xl font-bold text-foreground">{visits}</p>
              <p className="text-xs text-muted-foreground">Restaurant Visits</p>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-xl">
              <p className="text-2xl font-bold text-foreground">{redemptions}</p>
              <p className="text-xs text-muted-foreground">Deals Redeemed</p>
            </div>
          </div>

          {/* Tier Perks */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Your {currentTierConfig.label} Perks</h4>
            <div className="space-y-2">
              {perks.map((perk, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  {perk.unlocked ? (
                    <Check className="w-4 h-4 text-fresh" />
                  ) : (
                    <Lock className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className={perk.unlocked ? "text-foreground" : "text-muted-foreground"}>
                    {perk.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
