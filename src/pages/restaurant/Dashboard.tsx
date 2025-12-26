import { motion } from 'framer-motion';
import { TrendingUp, Users, Tag, Eye, DollarSign, Star, ArrowUpRight, Plus } from 'lucide-react';
import { RestaurantLayout } from '@/components/layouts/RestaurantLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  { label: 'Total Views', value: '12.5K', change: '+12%', icon: Eye, color: 'bg-primary/10 text-primary' },
  { label: 'Active Deals', value: '8', change: '+2', icon: Tag, color: 'bg-amber/10 text-amber' },
  { label: 'New Customers', value: '234', change: '+18%', icon: Users, color: 'bg-fresh/10 text-fresh' },
  { label: 'Revenue', value: '$4,280', change: '+8%', icon: DollarSign, color: 'bg-coral/10 text-coral' },
];

const recentDeals = [
  { name: '25% Off Dinner', redemptions: 45, expires: '2 days left' },
  { name: 'Free Dessert', redemptions: 128, expires: '5 days left' },
  { name: 'Lunch Special', redemptions: 67, expires: '1 week left' },
];

const recentReviews = [
  { customer: 'Sarah M.', rating: 5, comment: 'Amazing food and great service!' },
  { customer: 'John D.', rating: 4, comment: 'Loved the atmosphere, will come back.' },
  { customer: 'Emily R.', rating: 5, comment: 'Best pasta I\'ve ever had!' },
];

export default function RestaurantDashboard() {
  return (
    <RestaurantLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your restaurant.</p>
          </div>
          <Button variant="gradient">
            <Plus className="w-4 h-4" />
            Create Deal
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-fresh flex items-center gap-1">
                      {stat.change}
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Deals */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-border h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Active Deals</CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDeals.map((deal) => (
                    <div
                      key={deal.name}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                          <Tag className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{deal.name}</p>
                          <p className="text-sm text-muted-foreground">{deal.redemptions} redemptions</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-amber bg-amber/10 px-2 py-1 rounded-full">
                        {deal.expires}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-border h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Reviews</CardTitle>
                <Button variant="ghost" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReviews.map((review, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-muted/50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-foreground">{review.customer}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber text-amber" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Performance Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-fresh" />
                Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-xl">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Analytics chart coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </RestaurantLayout>
  );
}
