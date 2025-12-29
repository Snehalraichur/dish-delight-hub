import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Star, Sparkles, Check, Lock, ChevronRight, Tag, Coffee, Utensils, Percent } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: 'discount' | 'freebie' | 'experience' | 'exclusive';
  icon?: string;
  restaurant?: string;
  expiresIn?: string;
  limited?: boolean;
  stock?: number;
}

interface RewardCatalogProps {
  isOpen: boolean;
  onClose: () => void;
  userPoints: number;
  rewards: Reward[];
  redeemedRewards?: string[];
  onRedeem?: (rewardId: string) => void;
}

const categoryConfig = {
  discount: { label: 'Discounts', icon: Percent, color: 'text-green-500' },
  freebie: { label: 'Freebies', icon: Gift, color: 'text-purple-500' },
  experience: { label: 'Experiences', icon: Utensils, color: 'text-blue-500' },
  exclusive: { label: 'Exclusive', icon: Star, color: 'text-amber-500' },
};

export function RewardCatalog({
  isOpen,
  onClose,
  userPoints,
  rewards,
  redeemedRewards = [],
  onRedeem
}: RewardCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(r => r.category === selectedCategory);

  const handleRedeem = async (reward: Reward) => {
    if (userPoints < reward.pointsCost) return;
    
    setIsRedeeming(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    onRedeem?.(reward.id);
    setIsRedeeming(false);
    setSelectedReward(null);
  };

  const getCategoryIcon = (category: Reward['category']) => {
    const config = categoryConfig[category];
    const Icon = config.icon;
    return <Icon className={cn("w-5 h-5", config.color)} />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Reward Catalog</h2>
                <p className="text-sm text-muted-foreground font-normal">Redeem your points for rewards</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{userPoints.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">points available</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Category Filter */}
        <div className="px-6 py-3 border-b overflow-x-auto">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className="shrink-0"
            >
              All
            </Button>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <Button
                key={key}
                size="sm"
                variant={selectedCategory === key ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(key)}
                className="shrink-0"
              >
                <config.icon className="w-4 h-4 mr-1" />
                {config.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredRewards.map((reward, index) => {
              const isAffordable = userPoints >= reward.pointsCost;
              const isRedeemed = redeemedRewards.includes(reward.id);

              return (
                <motion.button
                  key={reward.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => !isRedeemed && setSelectedReward(reward)}
                  disabled={isRedeemed}
                  className={cn(
                    "relative p-4 rounded-xl border-2 text-left transition-all",
                    isRedeemed && "opacity-50 cursor-not-allowed",
                    isAffordable && !isRedeemed
                      ? "border-primary/30 hover:border-primary hover:shadow-md bg-card"
                      : "border-border bg-muted/30"
                  )}
                >
                  {reward.limited && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500">
                      Limited
                    </Badge>
                  )}

                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      isAffordable ? "bg-primary/10" : "bg-muted"
                    )}>
                      {getCategoryIcon(reward.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm truncate">{reward.name}</h4>
                      {reward.restaurant && (
                        <p className="text-xs text-muted-foreground truncate">{reward.restaurant}</p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className={cn(
                          "text-xs",
                          isAffordable ? "bg-primary/10 text-primary" : ""
                        )}>
                          <Sparkles className="w-3 h-3 mr-1" />
                          {reward.pointsCost.toLocaleString()} pts
                        </Badge>
                        {reward.stock && (
                          <span className="text-xs text-muted-foreground">
                            {reward.stock} left
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isRedeemed && (
                    <div className="absolute inset-0 bg-background/80 rounded-xl flex items-center justify-center">
                      <div className="flex items-center gap-2 text-green-600">
                        <Check className="w-5 h-5" />
                        <span className="font-medium">Redeemed</span>
                      </div>
                    </div>
                  )}

                  {!isAffordable && !isRedeemed && (
                    <div className="absolute bottom-2 right-2">
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Reward Detail Modal */}
        <AnimatePresence>
          {selectedReward && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-sm p-6 flex flex-col"
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4"
                onClick={() => setSelectedReward(null)}
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </Button>

              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-6"
                >
                  {getCategoryIcon(selectedReward.category)}
                </motion.div>

                <h3 className="text-2xl font-bold mb-2">{selectedReward.name}</h3>
                <p className="text-muted-foreground mb-4 max-w-xs">{selectedReward.description}</p>
                
                {selectedReward.restaurant && (
                  <Badge variant="outline" className="mb-4">
                    <Utensils className="w-3 h-3 mr-1" />
                    {selectedReward.restaurant}
                  </Badge>
                )}

                <div className="bg-muted/50 rounded-xl p-4 mb-6 w-full max-w-xs">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Cost</span>
                    <span className="font-bold">{selectedReward.pointsCost.toLocaleString()} points</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-muted-foreground">Your balance</span>
                    <span className={cn(
                      "font-bold",
                      userPoints >= selectedReward.pointsCost ? "text-green-600" : "text-red-500"
                    )}>
                      {userPoints.toLocaleString()} points
                    </span>
                  </div>
                  <Progress 
                    value={Math.min((userPoints / selectedReward.pointsCost) * 100, 100)} 
                    className="h-2"
                  />
                </div>

                {selectedReward.expiresIn && (
                  <p className="text-xs text-muted-foreground mb-4">
                    Expires in {selectedReward.expiresIn}
                  </p>
                )}

                <Button
                  size="lg"
                  className="w-full max-w-xs"
                  disabled={userPoints < selectedReward.pointsCost || isRedeeming}
                  onClick={() => handleRedeem(selectedReward)}
                >
                  {isRedeeming ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      >
                        <Sparkles className="w-4 h-4" />
                      </motion.div>
                      Redeeming...
                    </span>
                  ) : userPoints >= selectedReward.pointsCost ? (
                    <>
                      <Gift className="w-4 h-4 mr-2" />
                      Redeem Reward
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Need {(selectedReward.pointsCost - userPoints).toLocaleString()} more points
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
