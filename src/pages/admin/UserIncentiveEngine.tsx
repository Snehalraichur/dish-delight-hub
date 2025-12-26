import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gift, Search, Plus, Edit2, Trash2, ToggleLeft, ToggleRight,
  Zap, Heart, MessageSquare, Share2, QrCode, Flame, Users, MapPin
} from 'lucide-react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const rewardRules = [
  { id: 1, name: 'Post Photo', actionType: 'post', points: 50, icon: Zap, isActive: true, multiplier: 1.0, dailyLimit: null },
  { id: 2, name: 'Receive Like', actionType: 'like', points: 5, icon: Heart, isActive: true, multiplier: 1.0, dailyLimit: 100 },
  { id: 3, name: 'Leave Comment', actionType: 'comment', points: 10, icon: MessageSquare, isActive: true, multiplier: 1.0, dailyLimit: 50 },
  { id: 4, name: 'Share Post', actionType: 'share', points: 15, icon: Share2, isActive: true, multiplier: 1.0, dailyLimit: 20 },
  { id: 5, name: 'Redeem Deal', actionType: 'redemption', points: 100, icon: QrCode, isActive: true, multiplier: 1.5, dailyLimit: null },
  { id: 6, name: 'Daily Streak', actionType: 'streak', points: 20, icon: Flame, isActive: true, multiplier: 1.0, dailyLimit: 1 },
  { id: 7, name: 'Referral', actionType: 'referral', points: 200, icon: Users, isActive: true, multiplier: 2.0, dailyLimit: 5 },
  { id: 8, name: 'Restaurant Visit', actionType: 'visit', points: 30, icon: MapPin, isActive: false, multiplier: 1.0, dailyLimit: 3 },
];

const tierData = [
  { id: 1, name: 'Bronze', pointsRequired: 0, color: 'from-amber-600 to-amber-800', benefits: ['5% off first order', 'Birthday reward'] },
  { id: 2, name: 'Silver', pointsRequired: 2500, color: 'from-slate-300 to-slate-500', benefits: ['10% off all orders', 'Priority support', 'Early access to deals'] },
  { id: 3, name: 'Gold', pointsRequired: 5000, color: 'from-yellow-400 to-amber-500', benefits: ['15% off all orders', 'Free delivery', 'Exclusive events', 'VIP support'] },
  { id: 4, name: 'Platinum', pointsRequired: 10000, color: 'from-slate-400 to-slate-600', benefits: ['20% off all orders', 'Unlimited free delivery', 'Personal concierge'] },
];

const badgeData = [
  { id: 'first_post', name: 'First Post', icon: '📸', requirement: 'Post 1 photo', earnedBy: 12450 },
  { id: 'streak_master', name: 'Streak Master', icon: '🔥', requirement: '7-day streak', earnedBy: 3420 },
  { id: 'deal_hunter', name: 'Deal Hunter', icon: '💰', requirement: 'Redeem 10 deals', earnedBy: 5680 },
  { id: 'social_butterfly', name: 'Social Butterfly', icon: '🦋', requirement: '50 comments', earnedBy: 2890 },
  { id: 'influencer', name: 'Influencer', icon: '⭐', requirement: '1000 followers', earnedBy: 890 },
  { id: 'explorer', name: 'Explorer', icon: '🗺️', requirement: 'Visit 20 restaurants', earnedBy: 1250 },
  { id: 'food_critic', name: 'Food Critic', icon: '📝', requirement: '50 reviews', earnedBy: 780 },
  { id: 'early_bird', name: 'Early Bird', icon: '🌅', requirement: 'Beta user', earnedBy: 450 },
];

export default function UserIncentiveEngine() {
  const [activeTab, setActiveTab] = useState('rules');
  const [rules, setRules] = useState(rewardRules);
  const [editingRule, setEditingRule] = useState<typeof rewardRules[0] | null>(null);
  const [editingTier, setEditingTier] = useState<typeof tierData[0] | null>(null);

  const toggleRule = (id: number) => {
    setRules(rules.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r));
  };

  const totalPointsDistributed = 2450000;
  const activeUsers = 45678;
  const avgPointsPerUser = Math.round(totalPointsDistributed / activeUsers);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">User Incentive Engine</h1>
            <p className="text-muted-foreground">Manage reward rules, tiers, and badges</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Rule
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-primary">{(totalPointsDistributed / 1000000).toFixed(1)}M</p>
              <p className="text-sm text-muted-foreground">Points Distributed</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-fresh">{activeUsers.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Active Users</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-amber">{avgPointsPerUser}</p>
              <p className="text-sm text-muted-foreground">Avg Points/User</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{rules.filter(r => r.isActive).length}/{rules.length}</p>
              <p className="text-sm text-muted-foreground">Active Rules</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="rules">Reward Rules</TabsTrigger>
            <TabsTrigger value="tiers">Loyalty Tiers</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
          </TabsList>

          <TabsContent value="rules" className="mt-6 space-y-4">
            {rules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`border-border ${!rule.isActive && 'opacity-60'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          rule.isActive ? 'bg-primary/10' : 'bg-muted'
                        }`}>
                          <rule.icon className={`w-6 h-6 ${rule.isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{rule.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="secondary" className="bg-amber/10 text-amber">
                              +{rule.points} pts
                            </Badge>
                            {rule.multiplier > 1 && (
                              <Badge variant="outline" className="text-fresh border-fresh/20">
                                {rule.multiplier}x multiplier
                              </Badge>
                            )}
                            {rule.dailyLimit && (
                              <span className="text-xs text-muted-foreground">
                                Max {rule.dailyLimit}/day
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={rule.isActive}
                          onCheckedChange={() => toggleRule(rule.id)}
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingRule(rule)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="tiers" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {tierData.map((tier, index) => (
                <motion.div
                  key={tier.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${tier.color}`} />
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg text-foreground">{tier.name}</h3>
                        <Button size="sm" variant="ghost" onClick={() => setEditingTier(tier)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {tier.pointsRequired === 0 ? 'Starting tier' : `${tier.pointsRequired.toLocaleString()} points required`}
                      </p>
                      <div className="space-y-2">
                        {tier.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <Gift className="w-4 h-4 text-fresh" />
                            <span className="text-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {badgeData.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border-border text-center">
                    <CardContent className="p-4">
                      <div className="text-4xl mb-3">{badge.icon}</div>
                      <h3 className="font-semibold text-foreground mb-1">{badge.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3">{badge.requirement}</p>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {badge.earnedBy.toLocaleString()} earned
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Edit Rule Modal */}
        <Dialog open={!!editingRule} onOpenChange={(open) => !open && setEditingRule(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Reward Rule</DialogTitle>
            </DialogHeader>
            {editingRule && (
              <div className="space-y-4">
                <div>
                  <Label>Points Awarded</Label>
                  <Input type="number" defaultValue={editingRule.points} />
                </div>
                <div>
                  <Label>Multiplier: {editingRule.multiplier}x</Label>
                  <Slider
                    defaultValue={[editingRule.multiplier]}
                    min={0.5}
                    max={3}
                    step={0.1}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Daily Limit (leave empty for unlimited)</Label>
                  <Input type="number" defaultValue={editingRule.dailyLimit || ''} placeholder="Unlimited" />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setEditingRule(null)}>
                    Cancel
                  </Button>
                  <Button className="flex-1">Save Changes</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
