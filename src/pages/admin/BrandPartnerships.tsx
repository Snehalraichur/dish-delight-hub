import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Handshake, Search, Plus, Edit2, Trash2, Eye,
  Building2, Mail, Phone, DollarSign, Calendar, ExternalLink
} from 'lucide-react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const partnerships = [
  {
    id: 1,
    brandName: 'Coca-Cola',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/200px-Coca-Cola_logo.svg.png',
    contactEmail: 'partnerships@coca-cola.com',
    contactPhone: '+1 800-438-2653',
    partnershipType: 'sponsor',
    budget: 250000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'active',
    campaigns: 12,
    impressions: '2.4M',
  },
  {
    id: 2,
    brandName: 'Red Bull',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e5/Red_Bull.svg/200px-Red_Bull.svg.png',
    contactEmail: 'brand@redbull.com',
    contactPhone: '+1 310-393-4647',
    partnershipType: 'co-brand',
    budget: 180000,
    startDate: '2024-03-01',
    endDate: '2024-09-30',
    status: 'active',
    campaigns: 8,
    impressions: '1.8M',
  },
  {
    id: 3,
    brandName: 'Uber Eats',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Uber_Eats_2020_logo.svg/200px-Uber_Eats_2020_logo.svg.png',
    contactEmail: 'partners@ubereats.com',
    contactPhone: '+1 800-253-6882',
    partnershipType: 'affiliate',
    budget: 120000,
    startDate: '2024-06-01',
    endDate: '2025-05-31',
    status: 'active',
    campaigns: 5,
    impressions: '950K',
  },
  {
    id: 4,
    brandName: 'Heineken',
    logo: null,
    contactEmail: 'marketing@heineken.com',
    contactPhone: '+1 914-681-4100',
    partnershipType: 'sponsor',
    budget: 75000,
    startDate: '2024-11-01',
    endDate: '2025-02-28',
    status: 'pending',
    campaigns: 0,
    impressions: '0',
  },
  {
    id: 5,
    brandName: 'Pepsi',
    logo: null,
    contactEmail: 'brand@pepsi.com',
    contactPhone: '+1 800-433-2652',
    partnershipType: 'exclusive',
    budget: 500000,
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    status: 'completed',
    campaigns: 24,
    impressions: '5.2M',
  },
];

const partnershipTypeConfig: Record<string, { color: string; label: string }> = {
  sponsor: { color: 'bg-amber/10 text-amber', label: 'Sponsor' },
  'co-brand': { color: 'bg-primary/10 text-primary', label: 'Co-Brand' },
  affiliate: { color: 'bg-fresh/10 text-fresh', label: 'Affiliate' },
  exclusive: { color: 'bg-coral/10 text-coral', label: 'Exclusive' },
};

const statusConfig: Record<string, { color: string; label: string }> = {
  active: { color: 'bg-fresh/10 text-fresh border-fresh/20', label: 'Active' },
  pending: { color: 'bg-amber/10 text-amber border-amber/20', label: 'Pending' },
  paused: { color: 'bg-muted text-muted-foreground border-muted', label: 'Paused' },
  completed: { color: 'bg-primary/10 text-primary border-primary/20', label: 'Completed' },
};

export default function BrandPartnerships() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPartner, setSelectedPartner] = useState<typeof partnerships[0] | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const filteredPartnerships = partnerships.filter(p => {
    const matchesSearch = p.brandName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalBudget = partnerships.filter(p => p.status === 'active').reduce((acc, p) => acc + p.budget, 0);
  const totalImpressions = '5.2M';

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Brand Partnerships</h1>
            <p className="text-muted-foreground">Manage brand sponsors and partnerships</p>
          </div>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Partnership
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{partnerships.filter(p => p.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">Active Partners</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-fresh">${(totalBudget / 1000).toFixed(0)}K</p>
              <p className="text-sm text-muted-foreground">Active Budget</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-primary">{partnerships.reduce((acc, p) => acc + p.campaigns, 0)}</p>
              <p className="text-sm text-muted-foreground">Total Campaigns</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-amber">{totalImpressions}</p>
              <p className="text-sm text-muted-foreground">Total Impressions</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Partnerships Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPartnerships.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {partner.logo ? (
                        <img src={partner.logo} alt={partner.brandName} className="w-12 h-12 object-contain" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-foreground">{partner.brandName}</h3>
                        <Badge variant="secondary" className={partnershipTypeConfig[partner.partnershipType].color}>
                          {partnershipTypeConfig[partner.partnershipType].label}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="outline" className={statusConfig[partner.status].color}>
                      {statusConfig[partner.status].label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Budget</p>
                      <p className="font-bold text-foreground">${partner.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Campaigns</p>
                      <p className="font-bold text-foreground">{partner.campaigns}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Impressions</p>
                      <p className="font-bold text-foreground">{partner.impressions}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Period</p>
                      <p className="text-xs text-foreground">{partner.startDate} - {partner.endDate}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => setSelectedPartner(partner)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Partner Details Modal */}
        <Dialog open={!!selectedPartner} onOpenChange={(open) => !open && setSelectedPartner(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Partnership Details</DialogTitle>
            </DialogHeader>
            {selectedPartner && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  {selectedPartner.logo ? (
                    <img src={selectedPartner.logo} alt={selectedPartner.brandName} className="w-16 h-16 object-contain" />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold">{selectedPartner.brandName}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className={partnershipTypeConfig[selectedPartner.partnershipType].color}>
                        {partnershipTypeConfig[selectedPartner.partnershipType].label}
                      </Badge>
                      <Badge variant="outline" className={statusConfig[selectedPartner.status].color}>
                        {statusConfig[selectedPartner.status].label}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedPartner.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedPartner.contactPhone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Budget: ${selectedPartner.budget.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedPartner.startDate} - {selectedPartner.endDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{selectedPartner.campaigns}</p>
                    <p className="text-sm text-muted-foreground">Campaigns</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-fresh">{selectedPartner.impressions}</p>
                    <p className="text-sm text-muted-foreground">Impressions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-amber">
                      ${(selectedPartner.budget / (parseInt(selectedPartner.impressions) || 1)).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">CPM</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedPartner(null)}>
                    Close
                  </Button>
                  <Button className="flex-1">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Partnership
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Create Partnership Modal */}
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add New Partnership</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Brand Name</Label>
                <Input placeholder="Enter brand name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Contact Email</Label>
                  <Input type="email" placeholder="email@brand.com" />
                </div>
                <div>
                  <Label>Contact Phone</Label>
                  <Input placeholder="+1 555-000-0000" />
                </div>
              </div>
              <div>
                <Label>Partnership Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sponsor">Sponsor</SelectItem>
                    <SelectItem value="co-brand">Co-Brand</SelectItem>
                    <SelectItem value="affiliate">Affiliate</SelectItem>
                    <SelectItem value="exclusive">Exclusive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div>
                <Label>Budget</Label>
                <Input type="number" placeholder="Enter budget amount" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
                <Button className="flex-1">Create Partnership</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
