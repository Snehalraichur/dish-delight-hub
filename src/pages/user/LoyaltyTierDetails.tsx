import { useNavigate } from 'react-router-dom';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Crown, Star, Check, Lock, Gift, Percent, Ticket, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const tiers = [
  {
    name: 'Bronze',
    points: 0,
    color: 'from-amber-600 to-amber-700',
    benefits: ['Earn 1x points on posts', 'Access to basic deals', 'Birthday reward'],
    icon: Star,
  },
  {
    name: 'Silver',
    points: 1000,
    color: 'from-gray-400 to-gray-500',
    benefits: ['Earn 1.5x points on posts', 'Early deal access', 'Free appetizer monthly', 'Priority support'],
    icon: Star,
  },
  {
    name: 'Gold',
    points: 2500,
    color: 'from-yellow-500 to-yellow-600',
    benefits: ['Earn 2x points on posts', 'Exclusive deals', 'Free dessert weekly', 'VIP event invites'],
    icon: Crown,
    current: true,
  },
  {
    name: 'Platinum',
    points: 5000,
    color: 'from-purple-500 to-purple-600',
    benefits: ['Earn 3x points on posts', 'Partner discounts', 'Concierge service', 'Free delivery always', 'Premium badges'],
    icon: Zap,
  },
  {
    name: 'Diamond',
    points: 10000,
    color: 'from-cyan-400 to-blue-500',
    benefits: ['Earn 5x points on posts', 'All Platinum benefits', 'Restaurant partner perks', 'Exclusive experiences', 'Personal foodie curator'],
    icon: Crown,
  },
];

const currentUserPoints = 2450;
const currentTierIndex = 2; // Gold

const LoyaltyTierDetails = () => {
  const navigate = useNavigate();

  const getBenefitIcon = (benefit: string) => {
    if (benefit.includes('points')) return Zap;
    if (benefit.includes('deal') || benefit.includes('discount')) return Percent;
    if (benefit.includes('free') || benefit.includes('reward')) return Gift;
    return Ticket;
  };

  return (
    <UserLayout>
      <div className="p-4 pb-20 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Loyalty Tiers</h1>
        </div>

        {/* Current Status */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white overflow-hidden">
            <CardContent className="p-6 relative">
              <Crown className="absolute right-4 top-4 h-24 w-24 opacity-20" />
              <div className="relative z-10">
                <Badge className="bg-white/20 text-white border-0 mb-2">Your Current Tier</Badge>
                <h2 className="text-3xl font-bold">Gold Member</h2>
                <p className="opacity-90 mt-2">{currentUserPoints.toLocaleString()} points</p>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to Platinum</span>
                    <span>{5000 - currentUserPoints} pts to go</span>
                  </div>
                  <Progress value={(currentUserPoints / 5000) * 100} className="h-2 bg-white/30" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* All Tiers */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">All Tiers</h2>
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            const isUnlocked = index <= currentTierIndex;
            const isCurrent = tier.current;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`${isCurrent ? 'ring-2 ring-primary' : ''} ${!isUnlocked ? 'opacity-60' : ''}`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${tier.color} flex items-center justify-center text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {tier.name}
                            {isCurrent && <Badge variant="secondary" className="text-xs">Current</Badge>}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {tier.points.toLocaleString()} points required
                          </p>
                        </div>
                      </div>
                      {isUnlocked ? (
                        <Check className="h-6 w-6 text-green-500" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, i) => {
                        const BenefitIcon = getBenefitIcon(benefit);
                        return (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <BenefitIcon className="h-4 w-4 text-primary" />
                            {benefit}
                          </li>
                        );
                      })}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* How to Earn */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How to Earn Points</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { action: 'Post a food photo', points: 50 },
              { action: 'Receive a like', points: 5 },
              { action: 'Get a follower', points: 10 },
              { action: 'Redeem a deal', points: 25 },
              { action: 'Complete daily challenge', points: 'Varies' },
              { action: 'Refer a friend', points: 500 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.action}</span>
                <Badge variant="outline">+{item.points} pts</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default LoyaltyTierDetails;
