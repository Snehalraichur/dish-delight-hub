import { motion } from 'framer-motion';
import { Users, Store, AlertTriangle, DollarSign, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const stats = [
  { label: 'Total Users', value: '2.4M', change: '+5.2%', trend: 'up', icon: Users, color: 'bg-primary/10 text-primary' },
  { label: 'Restaurants', value: '12,847', change: '+3.1%', trend: 'up', icon: Store, color: 'bg-amber/10 text-amber' },
  { label: 'Fraud Cases', value: '24', change: '-12%', trend: 'down', icon: AlertTriangle, color: 'bg-coral/10 text-coral' },
  { label: 'Revenue', value: '$1.2M', change: '+18%', trend: 'up', icon: DollarSign, color: 'bg-fresh/10 text-fresh' },
];

const recentActivity = [
  { type: 'user', action: 'New user registered', time: '2 min ago', detail: 'john@email.com' },
  { type: 'restaurant', action: 'Restaurant approved', time: '15 min ago', detail: 'Bella Italia' },
  { type: 'fraud', action: 'Fraud case flagged', time: '1 hour ago', detail: 'Suspicious redemptions' },
  { type: 'payment', action: 'Payout processed', time: '2 hours ago', detail: '$4,500 to The Golden Fork' },
  { type: 'user', action: 'User suspended', time: '3 hours ago', detail: 'Policy violation' },
];

const topRestaurants = [
  { name: 'The Golden Fork', deals: 245, revenue: '$12,400' },
  { name: 'Sakura Sushi', deals: 198, revenue: '$9,800' },
  { name: 'Pizza Palace', deals: 176, revenue: '$8,200' },
  { name: 'Burger Joint', deals: 154, revenue: '$7,600' },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and key metrics</p>
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
                    <span className={`text-sm font-medium flex items-center gap-1 ${
                      stat.trend === 'up' ? 'text-fresh' : 'text-coral'
                    }`}>
                      {stat.change}
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-3 h-3" />
                      ) : (
                        <ArrowDownRight className="w-3 h-3" />
                      )}
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
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-border h-full">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'fraud' ? 'bg-coral' :
                          activity.type === 'restaurant' ? 'bg-amber' :
                          activity.type === 'payment' ? 'bg-fresh' :
                          'bg-primary'
                        }`} />
                        <div>
                          <p className="font-medium text-foreground">{activity.action}</p>
                          <p className="text-sm text-muted-foreground">{activity.detail}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Restaurants */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-border h-full">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-fresh" />
                  Top Restaurants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topRestaurants.map((restaurant, index) => (
                    <div
                      key={restaurant.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-foreground">{restaurant.name}</p>
                          <p className="text-xs text-muted-foreground">{restaurant.deals} deals</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-fresh">
                        {restaurant.revenue}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Platform Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Platform Health</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 rounded-xl bg-fresh/5 border border-fresh/20">
                  <p className="text-3xl font-bold text-fresh">99.9%</p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-3xl font-bold text-primary">45ms</p>
                  <p className="text-sm text-muted-foreground">Avg Response</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-amber/5 border border-amber/20">
                  <p className="text-3xl font-bold text-amber">12.5K</p>
                  <p className="text-sm text-muted-foreground">Active Sessions</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-coral/5 border border-coral/20">
                  <p className="text-3xl font-bold text-coral">0</p>
                  <p className="text-sm text-muted-foreground">Critical Errors</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
