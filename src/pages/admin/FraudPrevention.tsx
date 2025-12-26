import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, Search, Filter, Check, X, Eye, 
  Clock, DollarSign, User, Store, QrCode, TrendingUp,
  Ban, CheckCircle, AlertCircle
} from 'lucide-react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const fraudCases = [
  {
    id: 1,
    type: 'duplicate_redemption',
    user: 'john_doe',
    userEmail: 'john@email.com',
    restaurant: 'The Golden Fork',
    deal: '25% Off Dinner',
    amount: '$45.00',
    attempts: 3,
    status: 'investigating',
    riskLevel: 'high',
    timestamp: '2024-12-25 14:30',
    evidence: ['Same QR code used 3x in 2 hours', 'Different device IDs', 'IP: 192.168.1.1']
  },
  {
    id: 2,
    type: 'time_fraud',
    user: 'sneaky_pete',
    userEmail: 'pete@email.com',
    restaurant: 'Sakura Sushi',
    deal: 'Free Dessert',
    amount: '$12.00',
    attempts: 1,
    status: 'pending',
    riskLevel: 'medium',
    timestamp: '2024-12-25 12:15',
    evidence: ['Redemption outside restaurant hours', 'GPS mismatch']
  },
  {
    id: 3,
    type: 'fake_account',
    user: 'bot_user_123',
    userEmail: 'bot123@temp.com',
    restaurant: 'Pizza Palace',
    deal: 'Buy 1 Get 1 Free',
    amount: '$28.00',
    attempts: 5,
    status: 'pending',
    riskLevel: 'high',
    timestamp: '2024-12-25 10:00',
    evidence: ['Temporary email domain', 'No profile picture', '5 redemptions in 1 day']
  },
  {
    id: 4,
    type: 'collusion',
    user: 'staff_member',
    userEmail: 'staff@restaurant.com',
    restaurant: 'Burger Joint',
    deal: '50% Off Everything',
    amount: '$156.00',
    attempts: 12,
    status: 'resolved',
    riskLevel: 'critical',
    timestamp: '2024-12-24 18:45',
    evidence: ['Staff account', 'Multiple redemptions daily', 'Same POS terminal']
  },
  {
    id: 5,
    type: 'duplicate_redemption',
    user: 'hungry_hacker',
    userEmail: 'hacker@email.com',
    restaurant: 'Taco Town',
    deal: '30% Off Orders $25+',
    amount: '$35.00',
    attempts: 2,
    status: 'dismissed',
    riskLevel: 'low',
    timestamp: '2024-12-24 16:20',
    evidence: ['Technical glitch confirmed', 'User notified']
  },
];

const fraudStats = {
  totalCases: 156,
  pendingReview: 24,
  resolvedThisWeek: 45,
  totalSaved: '$12,450',
};

const riskColors: Record<string, string> = {
  low: 'bg-fresh/10 text-fresh border-fresh/20',
  medium: 'bg-amber/10 text-amber border-amber/20',
  high: 'bg-coral/10 text-coral border-coral/20',
  critical: 'bg-destructive/10 text-destructive border-destructive/20',
};

const statusColors: Record<string, string> = {
  pending: 'bg-amber/10 text-amber',
  investigating: 'bg-primary/10 text-primary',
  resolved: 'bg-fresh/10 text-fresh',
  dismissed: 'bg-muted text-muted-foreground',
};

const typeLabels: Record<string, string> = {
  duplicate_redemption: 'Duplicate Redemption',
  time_fraud: 'Time Fraud',
  fake_account: 'Fake Account',
  collusion: 'Staff Collusion',
};

export default function FraudPrevention() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCase, setSelectedCase] = useState<typeof fraudCases[0] | null>(null);
  const [resolution, setResolution] = useState('');

  const filteredCases = fraudCases.filter(c => {
    const matchesSearch = c.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.restaurant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleResolve = (caseId: number, action: 'ban' | 'warn' | 'dismiss') => {
    console.log(`Resolving case ${caseId} with action: ${action}`);
    setSelectedCase(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Fraud Prevention</h1>
            <p className="text-muted-foreground">Detect and resolve fraudulent activities</p>
          </div>
          <Badge variant="outline" className="bg-coral/10 text-coral border-coral/20 w-fit">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {fraudStats.pendingReview} cases pending
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-coral/10">
                  <AlertTriangle className="w-5 h-5 text-coral" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{fraudStats.totalCases}</p>
                  <p className="text-sm text-muted-foreground">Total Cases</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber/10">
                  <Clock className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{fraudStats.pendingReview}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-fresh/10">
                  <CheckCircle className="w-5 h-5 text-fresh" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{fraudStats.resolvedThisWeek}</p>
                  <p className="text-sm text-muted-foreground">Resolved This Week</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{fraudStats.totalSaved}</p>
                  <p className="text-sm text-muted-foreground">Fraud Prevented</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by user or restaurant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="dismissed">Dismissed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cases Table/Cards */}
        <div className="space-y-4">
          {filteredCases.map((fraudCase, index) => (
            <motion.div
              key={fraudCase.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Case Info */}
                    <div className="flex-1 grid grid-cols-2 lg:grid-cols-5 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Type</p>
                        <Badge variant="outline" className="text-xs">
                          {typeLabels[fraudCase.type]}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">User</p>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-foreground text-sm">{fraudCase.user}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Restaurant</p>
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-foreground">{fraudCase.restaurant}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Amount</p>
                        <span className="font-bold text-coral">{fraudCase.amount}</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Attempts</p>
                        <span className="font-bold text-foreground">{fraudCase.attempts}x</span>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={riskColors[fraudCase.riskLevel]}>
                        {fraudCase.riskLevel.toUpperCase()}
                      </Badge>
                      <Badge variant="secondary" className={statusColors[fraudCase.status]}>
                        {fraudCase.status}
                      </Badge>
                      {fraudCase.status === 'pending' || fraudCase.status === 'investigating' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedCase(fraudCase)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Case Review Modal */}
        <Dialog open={!!selectedCase} onOpenChange={(open) => !open && setSelectedCase(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-coral" />
                Review Fraud Case
              </DialogTitle>
            </DialogHeader>
            {selectedCase && (
              <div className="space-y-6">
                {/* Case Summary */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">User</p>
                    <p className="font-medium">{selectedCase.user}</p>
                    <p className="text-xs text-muted-foreground">{selectedCase.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Restaurant</p>
                    <p className="font-medium">{selectedCase.restaurant}</p>
                    <p className="text-xs text-muted-foreground">{selectedCase.deal}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount at Risk</p>
                    <p className="font-bold text-coral text-lg">{selectedCase.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Timestamp</p>
                    <p className="font-medium">{selectedCase.timestamp}</p>
                  </div>
                </div>

                {/* Evidence */}
                <div>
                  <h4 className="font-semibold mb-2">Evidence</h4>
                  <ul className="space-y-2">
                    {selectedCase.evidence.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-coral mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resolution Notes */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Resolution Notes</p>
                  <Textarea
                    placeholder="Add notes about your decision..."
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleResolve(selectedCase.id, 'dismiss')}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Dismiss
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-amber text-amber hover:bg-amber/10"
                    onClick={() => handleResolve(selectedCase.id, 'warn')}
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Warn User
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => handleResolve(selectedCase.id, 'ban')}
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Ban User
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
