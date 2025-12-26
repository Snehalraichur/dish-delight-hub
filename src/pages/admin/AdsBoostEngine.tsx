import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, DollarSign, Eye, Target, BarChart3, 
  Rocket, Filter, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const adPerformance = [
  { date: 'Mon', impressions: 45000, clicks: 2800, conversions: 180 },
  { date: 'Tue', impressions: 52000, clicks: 3200, conversions: 220 },
  { date: 'Wed', impressions: 48000, clicks: 2950, conversions: 195 },
  { date: 'Thu', impressions: 61000, clicks: 3800, conversions: 280 },
  { date: 'Fri', impressions: 72000, clicks: 4500, conversions: 340 },
  { date: 'Sat', impressions: 89000, clicks: 5600, conversions: 420 },
  { date: 'Sun', impressions: 78000, clicks: 4900, conversions: 380 },
];

const topPerformingAds = [
  {
    id: 1,
    restaurant: 'The Golden Fork',
    post: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100',
    impressions: 125000,
    clicks: 8900,
    ctr: 7.1,
    spent: 450,
    roi: 340
  },
  {
    id: 2,
    restaurant: 'Sakura Sushi',
    post: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=100',
    impressions: 98000,
    clicks: 6200,
    ctr: 6.3,
    spent: 380,
    roi: 280
  },
  {
    id: 3,
    restaurant: 'Pizza Palace',
    post: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100',
    impressions: 87000,
    clicks: 5100,
    ctr: 5.9,
    spent: 320,
    roi: 245
  },
];

const revenueStats = {
  total: 125000,
  change: 18.5,
  daily: 4500,
  projected: 145000
};

export default function AdsBoostEngine() {
  const [timeRange, setTimeRange] = useState('7d');
  const [platformFee, setPlatformFee] = useState([15]);

  const totalImpressions = adPerformance.reduce((acc, d) => acc + d.impressions, 0);
  const totalClicks = adPerformance.reduce((acc, d) => acc + d.clicks, 0);
  const totalConversions = adPerformance.reduce((acc, d) => acc + d.conversions, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Ads & Boost Engine</h1>
            <p className="text-muted-foreground">Monitor and optimize advertising performance</p>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Revenue Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-fresh/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-fresh" />
                </div>
                <span className="text-sm font-medium text-fresh flex items-center gap-1">
                  +{revenueStats.change}%
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">${(revenueStats.total / 1000).toFixed(0)}K</p>
              <p className="text-sm text-muted-foreground">Total Ad Revenue</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{(totalImpressions / 1000).toFixed(0)}K</p>
              <p className="text-sm text-muted-foreground">Total Impressions</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-amber" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{totalClicks.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Clicks</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-coral/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-coral" />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">
                {((totalClicks / totalImpressions) * 100).toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground">Avg CTR</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Daily Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adPerformance.map((day, index) => (
                  <div key={day.date} className="flex items-center gap-4">
                    <span className="w-8 text-sm text-muted-foreground">{day.date}</span>
                    <div className="flex-1">
                      <div className="h-6 bg-muted/50 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(day.impressions / 100000) * 100}%` }}
                          transition={{ delay: index * 0.1 }}
                          className="h-full gradient-primary rounded-full"
                        />
                      </div>
                    </div>
                    <span className="w-16 text-sm text-right">{(day.impressions / 1000).toFixed(0)}K</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ROI Overview */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-fresh" />
                ROI Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center p-6 bg-fresh/5 rounded-xl border border-fresh/20">
                  <p className="text-4xl font-bold text-fresh">285%</p>
                  <p className="text-muted-foreground">Average Campaign ROI</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-xl font-bold text-foreground">${revenueStats.daily.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Daily Revenue</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-xl font-bold text-foreground">${(revenueStats.projected / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-muted-foreground">Projected Monthly</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Fee Settings */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg">Platform Fee Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-muted-foreground">Platform Fee Percentage</span>
                <span className="text-lg font-bold text-primary">{platformFee[0]}%</span>
              </div>
              <Slider
                value={platformFee}
                onValueChange={setPlatformFee}
                min={5}
                max={30}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>5%</span>
                <span>30%</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                This fee is charged on all boost campaign spend. Current estimated monthly revenue from fees: 
                <span className="font-medium text-fresh"> ${((revenueStats.total * platformFee[0]) / 100).toLocaleString()}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Ads */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Rocket className="w-5 h-5 text-primary" />
              Top Performing Boosted Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformingAds.map((ad, index) => (
                <motion.div
                  key={ad.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl"
                >
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  <img
                    src={ad.post}
                    alt={ad.restaurant}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{ad.restaurant}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{(ad.impressions / 1000).toFixed(0)}K impressions</span>
                      <span>{ad.clicks.toLocaleString()} clicks</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-fresh">{ad.ctr}% CTR</p>
                    <p className="text-sm text-muted-foreground">${ad.spent} spent</p>
                  </div>
                  <Badge variant="outline" className="bg-fresh/10 text-fresh border-fresh/20">
                    {ad.roi}% ROI
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
