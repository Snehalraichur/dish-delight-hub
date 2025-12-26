import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Users, DollarSign, Clock, MapPin, Check, X, 
  Eye, MessageSquare, FileText, Filter, Search, Plus
} from 'lucide-react';
import { RestaurantLayout } from '@/components/layouts/RestaurantLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
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

const cateringRequests = [
  {
    id: 1,
    eventName: 'Corporate Lunch Meeting',
    clientName: 'Tech Solutions Inc.',
    clientEmail: 'events@techsolutions.com',
    date: '2024-02-15',
    time: '12:00 PM',
    guests: 50,
    budget: 2500,
    location: '123 Business Park, Suite 400',
    requirements: 'Vegetarian options required. Setup by 11:30 AM.',
    status: 'pending',
    createdAt: '2 hours ago'
  },
  {
    id: 2,
    eventName: 'Wedding Reception',
    clientName: 'Sarah & John',
    clientEmail: 'sarah.john@email.com',
    date: '2024-03-20',
    time: '6:00 PM',
    guests: 150,
    budget: 8000,
    location: 'Grand Ballroom, Downtown Hotel',
    requirements: 'Full service with wait staff. Multiple courses.',
    status: 'approved',
    createdAt: '1 day ago'
  },
  {
    id: 3,
    eventName: 'Birthday Party',
    clientName: 'Mike Thompson',
    clientEmail: 'mike.t@email.com',
    date: '2024-02-10',
    time: '3:00 PM',
    guests: 30,
    budget: 1200,
    location: '456 Oak Street',
    requirements: 'Kid-friendly menu. Cake delivery included.',
    status: 'in_progress',
    createdAt: '3 days ago'
  },
  {
    id: 4,
    eventName: 'Networking Event',
    clientName: 'Startup Hub',
    clientEmail: 'events@startuphub.co',
    date: '2024-01-28',
    time: '5:00 PM',
    guests: 75,
    budget: 3000,
    location: 'Startup Hub Office',
    requirements: 'Finger foods and appetizers only.',
    status: 'completed',
    createdAt: '1 week ago'
  },
  {
    id: 5,
    eventName: 'Family Reunion',
    clientName: 'The Johnsons',
    clientEmail: 'johnson.family@email.com',
    date: '2024-02-25',
    time: '1:00 PM',
    guests: 40,
    budget: 1800,
    location: 'Central Park Pavilion',
    requirements: 'BBQ style. Outdoor setup.',
    status: 'rejected',
    createdAt: '5 days ago'
  },
];

const statusColors: Record<string, string> = {
  pending: 'bg-amber/10 text-amber border-amber/20',
  approved: 'bg-fresh/10 text-fresh border-fresh/20',
  in_progress: 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-muted text-muted-foreground border-border',
  rejected: 'bg-coral/10 text-coral border-coral/20',
};

const statusLabels: Record<string, string> = {
  pending: 'Pending Review',
  approved: 'Approved',
  in_progress: 'In Progress',
  completed: 'Completed',
  rejected: 'Declined',
};

export default function Catering() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<typeof cateringRequests[0] | null>(null);
  const [showProposalModal, setShowProposalModal] = useState(false);

  const filteredRequests = cateringRequests.filter(request => {
    const matchesSearch = request.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Catering & Events</h1>
            <p className="text-muted-foreground">Manage catering requests and event bookings</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-amber">{cateringRequests.filter(r => r.status === 'pending').length}</p>
              <p className="text-sm text-muted-foreground">Pending Requests</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-primary">{cateringRequests.filter(r => r.status === 'in_progress').length}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-fresh">{cateringRequests.filter(r => r.status === 'completed').length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">
                ${cateringRequests.filter(r => r.status === 'approved' || r.status === 'in_progress').reduce((acc, r) => acc + r.budget, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Upcoming Revenue</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full sm:w-auto">
            <TabsList className="w-full sm:w-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="in_progress">Active</TabsTrigger>
              <TabsTrigger value="completed">Done</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{request.eventName}</h3>
                          <p className="text-sm text-muted-foreground">{request.clientName}</p>
                        </div>
                        <Badge variant="outline" className={statusColors[request.status]}>
                          {statusLabels[request.status]}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{request.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{request.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{request.guests} guests</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span>${request.budget.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 mt-3 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>{request.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap lg:flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                      {request.status === 'pending' && (
                        <>
                          <Button 
                            variant="default" 
                            size="sm"
                            className="bg-fresh hover:bg-fresh/90"
                            onClick={() => {
                              setSelectedRequest(request);
                              setShowProposalModal(true);
                            }}
                          >
                            <Check className="w-4 h-4" />
                            Accept
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-coral hover:bg-coral/10"
                          >
                            <X className="w-4 h-4" />
                            Decline
                          </Button>
                        </>
                      )}
                      {request.status === 'approved' && (
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                          Message
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No catering requests found</p>
          </div>
        )}

        {/* Request Details Modal */}
        <Dialog open={!!selectedRequest && !showProposalModal} onOpenChange={(open) => !open && setSelectedRequest(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedRequest?.eventName}</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Client</p>
                    <p className="font-medium">{selectedRequest.clientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedRequest.clientEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="font-medium">{selectedRequest.date} at {selectedRequest.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Guests</p>
                    <p className="font-medium">{selectedRequest.guests} people</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-medium">${selectedRequest.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className={statusColors[selectedRequest.status]}>
                      {statusLabels[selectedRequest.status]}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedRequest.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Special Requirements</p>
                  <p className="text-foreground">{selectedRequest.requirements}</p>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setSelectedRequest(null)}>
                    Close
                  </Button>
                  <Button variant="default" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Client
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Proposal Modal */}
        <Dialog open={showProposalModal} onOpenChange={setShowProposalModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Send Proposal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Proposed Price</label>
                <Input 
                  type="number" 
                  placeholder="Enter your quote"
                  defaultValue={selectedRequest?.budget}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Menu Selection</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select menu package" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic Package</SelectItem>
                    <SelectItem value="premium">Premium Package</SelectItem>
                    <SelectItem value="deluxe">Deluxe Package</SelectItem>
                    <SelectItem value="custom">Custom Menu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Additional Notes</label>
                <Textarea 
                  placeholder="Add any notes or special arrangements..."
                  className="mt-1"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowProposalModal(false)}>
                  Cancel
                </Button>
                <Button variant="gradient" className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Send Proposal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </RestaurantLayout>
  );
}
