import { useNavigate } from 'react-router-dom';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Star, Gift, TrendingUp, ChevronRight, Crown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const userPoints = {
  total: 2450,
  thisMonth: 380,
  tier: 'Gold',
  nextTier: 'Platinum',
  nextTierPoints: 5000,
};

const pointsHistory = [
  { id: '1', action: 'Posted food photo', points: 50, date: 'Today', type: 'earned' },
  { id: '2', action: 'Redeemed deal at Pasta Paradise', points: -200, date: 'Yesterday', type: 'redeemed' },
  { id: '3', action: 'Weekly streak bonus', points: 100, date: '2 days ago', type: 'bonus' },
  { id: '4', action: '10 likes received', points: 25, date: '3 days ago', type: 'earned' },
  { id: '5', action: 'Referred a friend', points: 500, date: '1 week ago', type: 'bonus' },
];

const availableRewards = [
  { id: '1', title: '10% Off Any Order', points: 500, image: '🎫', category: 'Discount' },
  { id: '2', title: 'Free Appetizer', points: 750, image: '🍟', category: 'Free Item' },
  { id: '3', title: 'VIP Event Access', points: 2000, image: '🎉', category: 'Experience' },
  { id: '4', title: 'Free Dessert', points: 400, image: '🍰', category: 'Free Item' },
];

const RewardsPoints = () => {
  const navigate = useNavigate();
  const tierProgress = (userPoints.total / userPoints.nextTierPoints) * 100;

  return (
    <UserLayout>
      <div className="p-4 pb-20 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Rewards & Points</h1>
        </div>

        {/* Points Balance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm opacity-90">Available Points</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <Star className="h-8 w-8" />
                    <span className="text-4xl font-bold">{userPoints.total.toLocaleString()}</span>
                  </div>
                  <p className="text-sm opacity-90 mt-2">+{userPoints.thisMonth} this month</p>
                </div>
                <Badge className="bg-white/20 text-white border-0">
                  <Crown className="h-3 w-3 mr-1" />
                  {userPoints.tier}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tier Progress */}
        <Card className="cursor-pointer" onClick={() => navigate('/loyalty-tier')}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-medium">Next: {userPoints.nextTier}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
            <Progress value={tierProgress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              {userPoints.nextTierPoints - userPoints.total} points to go
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-auto py-4 flex-col" onClick={() => navigate('/streaks')}>
            <TrendingUp className="h-6 w-6 mb-2" />
            <span>View Streaks</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col" onClick={() => navigate('/invite')}>
            <Gift className="h-6 w-6 mb-2" />
            <span>Invite Friends</span>
          </Button>
        </div>

        {/* Available Rewards */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Redeem Rewards</h2>
          <div className="grid grid-cols-2 gap-3">
            {availableRewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={userPoints.total < reward.points ? 'opacity-50' : 'cursor-pointer hover:shadow-md transition-shadow'}>
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-3">{reward.image}</div>
                    <p className="font-medium text-sm">{reward.title}</p>
                    <Badge variant="secondary" className="mt-2">
                      <Star className="h-3 w-3 mr-1" />
                      {reward.points}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Points History */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Points History</h2>
          <Card>
            <CardContent className="p-0 divide-y">
              {pointsHistory.map(item => (
                <div key={item.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                  <span className={`font-semibold ${item.points > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {item.points > 0 ? '+' : ''}{item.points}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </UserLayout>
  );
};

export default RewardsPoints;
