import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Search, Calendar, Users, Target, TrendingUp,
  Edit2, Trash2, Play, Pause, Eye, MoreVertical, Filter
} from 'lucide-react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const campaigns = [
  {
    id: 1,
    name: 'New Year Food Festival',
    description: 'Celebrate the new year with amazing food deals',
    type: 'promotional',
    status: 'active',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    budget: 50000,
    spent: 32500,
    impressions: 1250000,
    clicks: 45000,
    conversions: 3200,
    targetAudience: 'All Users',
    restaurants: 156
  },
  {
    id: 2,
    name: 'Valentine\'s Special',
    description: 'Romantic dinner deals for couples',
    type: 'seasonal',
    status: 'scheduled',
    startDate: '2024-02-10',
    endDate: '2024-02-14',
    budget: 25000,
    spent: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    targetAudience: 'Couples, Foodies',
    restaurants: 89
  },
  {
    id: 3,
    name: 'Lunch Rush Hour',
    description: 'Quick lunch deals for office workers',
    type: 'recurring',
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    budget: 30000,
    spent: 12000,
    impressions: 560000,
    clicks: 28000,
    conversions: 1800,
    targetAudience: 'Office Workers',
    restaurants: 234
  },
  {
    id: 4,
    name: 'Winter Warmers',
    description: 'Hot soups and comfort food campaign',
    type: 'seasonal',
    status: 'completed',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    budget: 20000,
    spent: 20000,
    impressions: 890000,
    clicks: 42000,
    conversions: 2900,
    targetAudience: 'All Users',
    restaurants: 178
  },
  {
    id: 5,
    name: 'Premium Dining Week',
    description: 'Exclusive deals at premium restaurants',
    type: 'promotional',
    status: 'paused',
    startDate: '2024-01-20',
    endDate: '2024-02-20',
    budget: 40000,
    spent: 8500,
    impressions: 320000,
    clicks: 15000,
    conversions: 890,
    targetAudience: 'Premium Users',
    restaurants: 45
  },
];

const statusColors: Record<string, string> = {
  active: 'bg-fresh/10 text-fresh border-fresh/20',
  scheduled: 'bg-primary/10 text-primary border-primary/20',
  paused: 'bg-amber/10 text-amber border-amber/20',
  completed: 'bg-muted text-muted-foreground border-border',
};

const typeColors: Record<string, string> = {
  promotional: 'bg-primary/10 text-primary',
  seasonal: 'bg-coral/10 text-coral',
  recurring: 'bg-amber/10 text-amber',
};

export default function CampaignManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalBudget = campaigns.reduce((acc, c) => acc + c.budget, 0);
  const totalSpent = campaigns.reduce((acc, c) => acc + c.spent, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Campaign Management</h1>
            <p className="text-muted-foreground">Create and manage marketing campaigns</p>
          </div>
          <Button variant="gradient" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4" />
            Create Campaign
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{campaigns.length}</p>
              <p className="text-sm text-muted-foreground">Total Campaigns</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">${(totalBudget / 1000).toFixed(0)}K</p>
              <p className="text-sm text-muted-foreground">Total Budget</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-primary">${(totalSpent / 1000).toFixed(0)}K</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-fresh">{totalConversions.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Conversions</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="paused">Paused</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {filteredCampaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground text-lg">{campaign.name}</h3>
                            <Badge variant="secondary" className={typeColors[campaign.type]}>
                              {campaign.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{campaign.description}</p>
                        </div>
                        <Badge variant="outline" className={statusColors[campaign.status]}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{campaign.startDate} - {campaign.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="w-4 h-4 text-muted-foreground" />
                          <span>{campaign.targetAudience}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{campaign.restaurants} restaurants</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-muted-foreground" />
                          <span>{campaign.conversions.toLocaleString()} conversions</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Budget Usage</span>
                          <span className="font-medium">
                            ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedCampaign(campaign)}
                      >
                        <Eye className="w-4 h-4" />
                        Details
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit2 className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          {campaign.status === 'active' ? (
                            <DropdownMenuItem>
                              <Pause className="w-4 h-4 mr-2" />
                              Pause
                            </DropdownMenuItem>
                          ) : campaign.status === 'paused' && (
                            <DropdownMenuItem>
                              <Play className="w-4 h-4 mr-2" />
                              Resume
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Create Campaign Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Campaign Name</label>
                <Input placeholder="e.g., Summer Food Festival" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Describe your campaign..." className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promotional">Promotional</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                      <SelectItem value="recurring">Recurring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Budget</label>
                  <Input type="number" placeholder="10000" className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input type="date" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input type="date" className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Target Audience</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="premium">Premium Users</SelectItem>
                    <SelectItem value="new">New Users</SelectItem>
                    <SelectItem value="foodies">Food Enthusiasts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button variant="gradient" className="flex-1">
                  Create Campaign
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Campaign Details Modal */}
        <Dialog open={!!selectedCampaign} onOpenChange={(open) => !open && setSelectedCampaign(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedCampaign?.name}</DialogTitle>
            </DialogHeader>
            {selectedCampaign && (
              <div className="space-y-6">
                <p className="text-muted-foreground">{selectedCampaign.description}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">{(selectedCampaign.impressions / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-muted-foreground">Impressions</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">{(selectedCampaign.clicks / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-muted-foreground">Clicks</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-fresh">{selectedCampaign.conversions.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Conversions</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold">
                      {((selectedCampaign.conversions / selectedCampaign.clicks) * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-muted-foreground">Conv. Rate</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Budget Utilization</p>
                  <Progress value={(selectedCampaign.spent / selectedCampaign.budget) * 100} className="h-3" />
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">
                      ${selectedCampaign.spent.toLocaleString()} spent
                    </span>
                    <span className="text-muted-foreground">
                      ${(selectedCampaign.budget - selectedCampaign.spent).toLocaleString()} remaining
                    </span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
