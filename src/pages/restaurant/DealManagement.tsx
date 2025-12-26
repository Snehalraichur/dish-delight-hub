import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, Edit2, Trash2, Eye, Pause, Play, 
  Calendar, Users, TrendingUp, MoreVertical, X, Upload
} from 'lucide-react';
import { RestaurantLayout } from '@/components/layouts/RestaurantLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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

const deals = [
  { 
    id: 1, 
    name: '25% Off Dinner', 
    description: 'Get 25% off on all dinner items',
    type: 'percentage',
    value: 25,
    redemptions: 145, 
    maxRedemptions: 200,
    status: 'active',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    views: 1250
  },
  { 
    id: 2, 
    name: 'Free Dessert', 
    description: 'Free dessert with any main course',
    type: 'freebie',
    value: 0,
    redemptions: 89, 
    maxRedemptions: 150,
    status: 'active',
    startDate: '2024-01-10',
    endDate: '2024-01-30',
    views: 890
  },
  { 
    id: 3, 
    name: 'Buy 1 Get 1', 
    description: 'Buy one pizza, get another free',
    type: 'bogo',
    value: 0,
    redemptions: 67, 
    maxRedemptions: 100,
    status: 'paused',
    startDate: '2024-01-01',
    endDate: '2024-01-20',
    views: 560
  },
  { 
    id: 4, 
    name: '$10 Off Orders $50+', 
    description: 'Save $10 on orders over $50',
    type: 'fixed',
    value: 10,
    redemptions: 200, 
    maxRedemptions: 200,
    status: 'expired',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    views: 2100
  },
];

const statusColors: Record<string, string> = {
  active: 'bg-fresh/10 text-fresh border-fresh/20',
  paused: 'bg-amber/10 text-amber border-amber/20',
  expired: 'bg-muted text-muted-foreground border-border',
  draft: 'bg-primary/10 text-primary border-primary/20',
};

export default function DealManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingDeal, setEditingDeal] = useState<typeof deals[0] | null>(null);

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || deal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Deal Management</h1>
            <p className="text-muted-foreground">Create and manage your promotional deals</p>
          </div>
          <Button variant="gradient" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4" />
            Create Deal
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{deals.filter(d => d.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">Active Deals</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{deals.reduce((acc, d) => acc + d.redemptions, 0)}</p>
              <p className="text-sm text-muted-foreground">Total Redemptions</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{deals.reduce((acc, d) => acc + d.views, 0).toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-fresh">
                {Math.round((deals.reduce((acc, d) => acc + d.redemptions, 0) / deals.reduce((acc, d) => acc + d.views, 0)) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Deals Table/Cards */}
        <div className="hidden md:block">
          <Card className="border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Deal</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Redemptions</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Views</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Duration</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeals.map((deal) => (
                    <motion.tr
                      key={deal.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-t border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-foreground">{deal.name}</p>
                          <p className="text-sm text-muted-foreground">{deal.description}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className={statusColors[deal.status]}>
                          {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{deal.redemptions}/{deal.maxRedemptions}</span>
                        </div>
                        <div className="w-24 h-1.5 bg-muted rounded-full mt-1">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(deal.redemptions / deal.maxRedemptions) * 100}%` }}
                          />
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                          <span>{deal.views.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{deal.startDate} - {deal.endDate}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => setEditingDeal(deal)}>
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {deal.status === 'active' ? (
                                  <>
                                    <Pause className="w-4 h-4 mr-2" />
                                    Pause
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <TrendingUp className="w-4 h-4 mr-2" />
                                View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredDeals.map((deal) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-foreground">{deal.name}</h3>
                      <p className="text-sm text-muted-foreground">{deal.description}</p>
                    </div>
                    <Badge variant="outline" className={statusColors[deal.status]}>
                      {deal.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Redemptions</p>
                      <p className="font-medium">{deal.redemptions}/{deal.maxRedemptions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Views</p>
                      <p className="font-medium">{deal.views.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingDeal(deal)}>
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <TrendingUp className="w-4 h-4" />
                      Stats
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Create/Edit Modal */}
        <Dialog open={showCreateModal || !!editingDeal} onOpenChange={(open) => {
          if (!open) {
            setShowCreateModal(false);
            setEditingDeal(null);
          }
        }}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingDeal ? 'Edit Deal' : 'Create New Deal'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Deal Name</label>
                <Input 
                  placeholder="e.g., 25% Off Dinner" 
                  defaultValue={editingDeal?.name}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Description</label>
                <Textarea 
                  placeholder="Describe your deal..."
                  defaultValue={editingDeal?.description}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Deal Type</label>
                  <Select defaultValue={editingDeal?.type || 'percentage'}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage Off</SelectItem>
                      <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                      <SelectItem value="bogo">Buy One Get One</SelectItem>
                      <SelectItem value="freebie">Free Item</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Value</label>
                  <Input 
                    type="number" 
                    placeholder="25"
                    defaultValue={editingDeal?.value}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Start Date</label>
                  <Input 
                    type="date"
                    defaultValue={editingDeal?.startDate}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">End Date</label>
                  <Input 
                    type="date"
                    defaultValue={editingDeal?.endDate}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Max Redemptions</label>
                <Input 
                  type="number" 
                  placeholder="100"
                  defaultValue={editingDeal?.maxRedemptions}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Deal Image</label>
                <div className="mt-1 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Drop image here or click to upload</p>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => {
                  setShowCreateModal(false);
                  setEditingDeal(null);
                }}>
                  Cancel
                </Button>
                <Button variant="gradient" className="flex-1">
                  {editingDeal ? 'Save Changes' : 'Create Deal'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </RestaurantLayout>
  );
}
