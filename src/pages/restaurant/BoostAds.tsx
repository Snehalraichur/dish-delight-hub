import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, TrendingUp, Eye, Users, DollarSign, Target, 
  Calendar, BarChart3, Check, Plus, Image as ImageIcon
} from 'lucide-react';
import { RestaurantLayout } from '@/components/layouts/RestaurantLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const activeCampaigns = [
  {
    id: 1,
    name: 'Weekend Special Boost',
    post: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100',
    budget: 150,
    spent: 87,
    impressions: 12500,
    clicks: 890,
    conversions: 45,
    status: 'active',
    endDate: '2024-02-01'
  },
  {
    id: 2,
    name: 'New Menu Launch',
    post: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100',
    budget: 300,
    spent: 210,
    impressions: 28000,
    clicks: 1560,
    conversions: 89,
    status: 'active',
    endDate: '2024-02-15'
  },
  {
    id: 3,
    name: 'Valentine\'s Day Special',
    post: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=100',
    budget: 200,
    spent: 200,
    impressions: 35000,
    clicks: 2100,
    conversions: 156,
    status: 'completed',
    endDate: '2024-01-15'
  },
];

const availablePosts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200',
    caption: 'Our signature pasta dish',
    likes: 234,
    engagement: 4.5
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200',
    caption: 'Best pizza in town',
    likes: 456,
    engagement: 6.2
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=200',
    caption: 'Perfect burger combo',
    likes: 312,
    engagement: 5.1
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200',
    caption: 'Fresh sushi platter',
    likes: 289,
    engagement: 4.8
  },
];

export default function BoostAds() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [budget, setBudget] = useState([100]);
  const [duration, setDuration] = useState('7');

  const totalSpent = activeCampaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalImpressions = activeCampaigns.reduce((acc, c) => acc + c.impressions, 0);
  const totalConversions = activeCampaigns.reduce((acc, c) => acc + c.conversions, 0);

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Boost & Ads</h1>
            <p className="text-muted-foreground">Promote your posts and reach more customers</p>
          </div>
          <Button variant="gradient" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4" />
            Create Campaign
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">${totalSpent}</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-amber" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{(totalImpressions / 1000).toFixed(1)}K</p>
              <p className="text-sm text-muted-foreground">Impressions</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-fresh/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-fresh" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{totalConversions}</p>
              <p className="text-sm text-muted-foreground">Conversions</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-coral/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-coral" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {((totalConversions / totalImpressions) * 100).toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* ROI Chart Placeholder */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Campaign Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Performance chart visualization</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Campaigns */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4">Active Campaigns</h2>
          <div className="space-y-4">
            {activeCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-border">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <img
                        src={campaign.post}
                        alt={campaign.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Ends {campaign.endDate}
                            </p>
                          </div>
                          <Badge variant="outline" className={
                            campaign.status === 'active' 
                              ? 'bg-fresh/10 text-fresh border-fresh/20' 
                              : 'bg-muted text-muted-foreground'
                          }>
                            {campaign.status === 'active' ? 'Active' : 'Completed'}
                          </Badge>
                        </div>

                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Budget Used</span>
                            <span className="font-medium">${campaign.spent} / ${campaign.budget}</span>
                          </div>
                          <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-lg font-bold text-foreground">
                              {(campaign.impressions / 1000).toFixed(1)}K
                            </p>
                            <p className="text-xs text-muted-foreground">Impressions</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-lg font-bold text-foreground">
                              {campaign.clicks.toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">Clicks</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded-lg">
                            <p className="text-lg font-bold text-fresh">{campaign.conversions}</p>
                            <p className="text-xs text-muted-foreground">Conversions</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Create Campaign Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Boost Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Post Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Select Post to Boost
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availablePosts.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => setSelectedPost(post.id)}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedPost === post.id 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <img
                        src={post.image}
                        alt={post.caption}
                        className="w-full aspect-square object-cover"
                      />
                      {selectedPost === post.id && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-5 h-5 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-2">
                        <p className="text-xs text-white font-medium">{post.likes} likes</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Slider */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Daily Budget: ${budget[0]}
                </label>
                <Slider
                  value={budget}
                  onValueChange={setBudget}
                  min={10}
                  max={500}
                  step={10}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$10</span>
                  <span>$500</span>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Campaign Duration
                </label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                    <SelectItem value="14">14 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Target Audience */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">
                  Target Audience
                </label>
                <Select defaultValue="local">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local (5 mile radius)</SelectItem>
                    <SelectItem value="city">City-wide</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                    <SelectItem value="foodies">Food Enthusiasts</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Estimated Results */}
              <Card className="border-border bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-3">Estimated Results</h4>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-xl font-bold text-foreground">
                        {(budget[0] * parseInt(duration) * 150).toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Impressions</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">
                        {Math.round(budget[0] * parseInt(duration) * 8)}
                      </p>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold text-fresh">
                        ${budget[0] * parseInt(duration)}
                      </p>
                      <p className="text-xs text-muted-foreground">Total Cost</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button variant="gradient" className="flex-1" disabled={!selectedPost}>
                  <Rocket className="w-4 h-4 mr-2" />
                  Launch Campaign
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </RestaurantLayout>
  );
}
