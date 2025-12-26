import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, Search, Check, X, Eye, Building2, 
  Mail, Phone, MapPin, FileText, Upload, ChevronRight,
  Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
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

const onboardingApplications = [
  {
    id: 1,
    restaurantName: 'Fusion Kitchen',
    ownerName: 'Michael Chen',
    email: 'michael@fusionkitchen.com',
    phone: '+1 555-123-4567',
    address: '456 Main Street, NYC',
    cuisineType: 'Asian Fusion',
    status: 'pending',
    submittedAt: '2024-12-24',
    documents: ['Business License', 'Tax ID', 'Health Permit'],
    kycStatus: 'verified',
    payoutSetup: false,
    step: 2,
    totalSteps: 4,
  },
  {
    id: 2,
    restaurantName: 'Green Garden Cafe',
    ownerName: 'Sarah Williams',
    email: 'sarah@greengarden.com',
    phone: '+1 555-987-6543',
    address: '789 Oak Avenue, Brooklyn',
    cuisineType: 'Vegan',
    status: 'documents_required',
    submittedAt: '2024-12-23',
    documents: ['Business License'],
    kycStatus: 'pending',
    payoutSetup: false,
    step: 1,
    totalSteps: 4,
  },
  {
    id: 3,
    restaurantName: 'Mama Rosa Trattoria',
    ownerName: 'Rosa Colombo',
    email: 'rosa@mamarosa.com',
    phone: '+1 555-456-7890',
    address: '123 Little Italy, Manhattan',
    cuisineType: 'Italian',
    status: 'approved',
    submittedAt: '2024-12-20',
    documents: ['Business License', 'Tax ID', 'Health Permit', 'Insurance'],
    kycStatus: 'verified',
    payoutSetup: true,
    step: 4,
    totalSteps: 4,
  },
  {
    id: 4,
    restaurantName: 'Spice Route',
    ownerName: 'Raj Patel',
    email: 'raj@spiceroute.com',
    phone: '+1 555-321-0987',
    address: '567 Curry Lane, Queens',
    cuisineType: 'Indian',
    status: 'rejected',
    submittedAt: '2024-12-19',
    documents: ['Business License'],
    kycStatus: 'failed',
    payoutSetup: false,
    step: 1,
    totalSteps: 4,
    rejectionReason: 'Incomplete documentation and failed KYC verification',
  },
];

const statusConfig: Record<string, { color: string; label: string }> = {
  pending: { color: 'bg-amber/10 text-amber border-amber/20', label: 'Pending Review' },
  documents_required: { color: 'bg-primary/10 text-primary border-primary/20', label: 'Documents Required' },
  approved: { color: 'bg-fresh/10 text-fresh border-fresh/20', label: 'Approved' },
  rejected: { color: 'bg-coral/10 text-coral border-coral/20', label: 'Rejected' },
};

const stepLabels = ['Application', 'Documents', 'KYC', 'Payout Setup'];

export default function RestaurantOnboarding() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<typeof onboardingApplications[0] | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');

  const filteredApplications = onboardingApplications.filter(app => {
    const matchesSearch = app.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: number) => {
    console.log('Approving application:', id);
    setSelectedApplication(null);
  };

  const handleReject = (id: number) => {
    console.log('Rejecting application:', id);
    setSelectedApplication(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Restaurant Onboarding</h1>
            <p className="text-muted-foreground">Manage new restaurant applications and KYC</p>
          </div>
          <Button className="w-fit">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Restaurant Manually
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-amber">
                {onboardingApplications.filter(a => a.status === 'pending').length}
              </p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-primary">
                {onboardingApplications.filter(a => a.status === 'documents_required').length}
              </p>
              <p className="text-sm text-muted-foreground">Documents Required</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-fresh">
                {onboardingApplications.filter(a => a.status === 'approved').length}
              </p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-coral">
                {onboardingApplications.filter(a => a.status === 'rejected').length}
              </p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search restaurants or owners..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="documents_required">Docs Required</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {filteredApplications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Restaurant Info */}
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{app.restaurantName}</h3>
                        <p className="text-sm text-muted-foreground">{app.ownerName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{app.cuisineType}</Badge>
                          <span className="text-xs text-muted-foreground">{app.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="flex-1 max-w-xs">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Step {app.step} of {app.totalSteps}</span>
                        <span className="font-medium">{stepLabels[app.step - 1]}</span>
                      </div>
                      <Progress value={(app.step / app.totalSteps) * 100} className="h-2" />
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={statusConfig[app.status].color}>
                        {statusConfig[app.status].label}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedApplication(app)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Review Modal */}
        <Dialog open={!!selectedApplication} onOpenChange={(open) => !open && setSelectedApplication(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Restaurant Application Review</DialogTitle>
            </DialogHeader>
            {selectedApplication && (
              <div className="space-y-6">
                {/* Restaurant Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Restaurant Name</p>
                      <p className="font-semibold text-lg">{selectedApplication.restaurantName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Owner</p>
                      <p className="font-medium">{selectedApplication.ownerName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedApplication.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedApplication.phone}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                      <span className="text-sm">{selectedApplication.address}</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cuisine Type</p>
                      <Badge variant="secondary">{selectedApplication.cuisineType}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="text-sm">{selectedApplication.submittedAt}</p>
                    </div>
                  </div>
                </div>

                {/* Onboarding Progress */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-4">Onboarding Progress</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {stepLabels.map((label, i) => (
                      <div key={label} className="text-center">
                        <div className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center ${
                          i < selectedApplication.step 
                            ? 'bg-fresh text-white' 
                            : i === selectedApplication.step - 1 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {i < selectedApplication.step ? <Check className="w-5 h-5" /> : i + 1}
                        </div>
                        <span className="text-xs">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <h4 className="font-semibold mb-3">Documents</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedApplication.documents.map((doc) => (
                      <div key={doc} className="flex items-center gap-2 p-3 bg-fresh/10 rounded-lg">
                        <FileText className="w-4 h-4 text-fresh" />
                        <span className="text-sm">{doc}</span>
                        <CheckCircle className="w-4 h-4 text-fresh ml-auto" />
                      </div>
                    ))}
                    {['Business License', 'Tax ID', 'Health Permit', 'Insurance']
                      .filter(d => !selectedApplication.documents.includes(d))
                      .map((doc) => (
                        <div key={doc} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{doc}</span>
                          <Clock className="w-4 h-4 text-muted-foreground ml-auto" />
                        </div>
                      ))}
                  </div>
                </div>

                {/* KYC & Payout Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">KYC Status</p>
                    <Badge variant="outline" className={
                      selectedApplication.kycStatus === 'verified' 
                        ? 'bg-fresh/10 text-fresh' 
                        : selectedApplication.kycStatus === 'failed'
                        ? 'bg-coral/10 text-coral'
                        : 'bg-amber/10 text-amber'
                    }>
                      {selectedApplication.kycStatus.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="p-4 rounded-lg border border-border">
                    <p className="text-sm text-muted-foreground mb-2">Payout Setup</p>
                    <Badge variant="outline" className={
                      selectedApplication.payoutSetup 
                        ? 'bg-fresh/10 text-fresh' 
                        : 'bg-amber/10 text-amber'
                    }>
                      {selectedApplication.payoutSetup ? 'COMPLETE' : 'PENDING'}
                    </Badge>
                  </div>
                </div>

                {/* Review Notes */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Review Notes</p>
                  <Textarea
                    placeholder="Add notes about your decision..."
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                  />
                </div>

                {/* Actions */}
                {selectedApplication.status !== 'approved' && selectedApplication.status !== 'rejected' && (
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setSelectedApplication(null)}
                    >
                      Request Documents
                    </Button>
                    <Button 
                      className="flex-1 bg-fresh hover:bg-fresh/90"
                      onClick={() => handleApprove(selectedApplication.id)}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={() => handleReject(selectedApplication.id)}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
