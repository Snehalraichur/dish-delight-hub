import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, Search, Calendar, Users, MapPin, DollarSign,
  Ticket, Edit2, Trash2, Eye, MoreVertical, Filter
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

const events = [
  {
    id: 1,
    name: 'Food & Wine Festival 2024',
    description: 'Annual celebration of local cuisine and fine wines',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300',
    date: '2024-03-15',
    time: '12:00 PM - 10:00 PM',
    location: 'Central Park',
    status: 'upcoming',
    ticketPrice: 45,
    ticketsSold: 1250,
    capacity: 2000,
    restaurants: 35,
    revenue: 56250
  },
  {
    id: 2,
    name: 'Taste of Downtown',
    description: 'Sample dishes from the best downtown restaurants',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300',
    date: '2024-02-28',
    time: '6:00 PM - 11:00 PM',
    location: 'Downtown Plaza',
    status: 'upcoming',
    ticketPrice: 35,
    ticketsSold: 800,
    capacity: 1500,
    restaurants: 25,
    revenue: 28000
  },
  {
    id: 3,
    name: 'Street Food Carnival',
    description: 'The ultimate street food experience',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300',
    date: '2024-01-20',
    time: '11:00 AM - 9:00 PM',
    location: 'Riverside Park',
    status: 'completed',
    ticketPrice: 25,
    ticketsSold: 3200,
    capacity: 3000,
    restaurants: 50,
    revenue: 80000
  },
  {
    id: 4,
    name: 'Vegan Food Fest',
    description: 'Celebrating plant-based cuisine',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300',
    date: '2024-04-22',
    time: '10:00 AM - 6:00 PM',
    location: 'Green Garden Arena',
    status: 'draft',
    ticketPrice: 30,
    ticketsSold: 0,
    capacity: 1000,
    restaurants: 20,
    revenue: 0
  },
];

const cateringRequests = [
  {
    id: 1,
    eventName: 'Tech Conference Lunch',
    client: 'TechCorp Inc.',
    date: '2024-02-20',
    guests: 200,
    budget: 8000,
    status: 'approved',
    restaurant: 'The Golden Fork'
  },
  {
    id: 2,
    eventName: 'Wedding Reception',
    client: 'Smith Family',
    date: '2024-03-15',
    guests: 150,
    budget: 12000,
    status: 'pending',
    restaurant: 'Bella Italia'
  },
  {
    id: 3,
    eventName: 'Corporate Gala',
    client: 'Finance Bros LLC',
    date: '2024-04-01',
    guests: 300,
    budget: 25000,
    status: 'in_progress',
    restaurant: 'Le Grand Chef'
  },
];

const statusColors: Record<string, string> = {
  upcoming: 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-fresh/10 text-fresh border-fresh/20',
  draft: 'bg-muted text-muted-foreground border-border',
  cancelled: 'bg-coral/10 text-coral border-coral/20',
  approved: 'bg-fresh/10 text-fresh border-fresh/20',
  pending: 'bg-amber/10 text-amber border-amber/20',
  in_progress: 'bg-primary/10 text-primary border-primary/20',
};

export default function EventsCatering() {
  const [activeTab, setActiveTab] = useState('events');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  const totalRevenue = events.reduce((acc, e) => acc + e.revenue, 0);
  const totalTickets = events.reduce((acc, e) => acc + e.ticketsSold, 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Events & Catering</h1>
            <p className="text-muted-foreground">Manage platform events and catering requests</p>
          </div>
          <Button variant="gradient" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{events.length}</p>
              <p className="text-sm text-muted-foreground">Total Events</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{totalTickets.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Tickets Sold</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-fresh">${(totalRevenue / 1000).toFixed(0)}K</p>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-amber">{cateringRequests.filter(r => r.status === 'pending').length}</p>
              <p className="text-sm text-muted-foreground">Pending Requests</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="catering">Catering Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="mt-6">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 max-w-md"
              />
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-border overflow-hidden">
                    <div className="relative aspect-video">
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge 
                        variant="outline" 
                        className={`absolute top-3 right-3 ${statusColors[event.status]}`}
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground text-lg mb-1">{event.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{event.description}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{event.date} • {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Ticket className="w-4 h-4 text-muted-foreground" />
                          <span>{event.ticketsSold}/{event.capacity} tickets</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div>
                          <p className="text-lg font-bold text-fresh">${event.revenue.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">Revenue</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedEvent(event)}>
                            <Eye className="w-4 h-4" />
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
          </TabsContent>

          <TabsContent value="catering" className="mt-6">
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium text-muted-foreground">Event</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Client</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Details</th>
                      <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cateringRequests.map((request) => (
                      <tr key={request.id} className="border-t border-border hover:bg-muted/30">
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-foreground">{request.eventName}</p>
                            <p className="text-sm text-muted-foreground">{request.restaurant}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="text-foreground">{request.client}</p>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-4 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              {request.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              {request.guests}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-muted-foreground" />
                              {request.budget.toLocaleString()}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className={statusColors[request.status]}>
                            {request.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end">
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Create Event Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Event Name</label>
                <Input placeholder="e.g., Food Festival 2024" className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea placeholder="Describe the event..." className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Input type="date" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Time</label>
                  <Input type="time" className="mt-1" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input placeholder="Event venue" className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Ticket Price</label>
                  <Input type="number" placeholder="45" className="mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium">Capacity</label>
                  <Input type="number" placeholder="1000" className="mt-1" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button variant="gradient" className="flex-1">
                  Create Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Event Details Modal */}
        <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedEvent?.name}</DialogTitle>
            </DialogHeader>
            {selectedEvent && (
              <div className="space-y-6">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-muted-foreground">{selectedEvent.description}</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-xl font-bold">{selectedEvent.ticketsSold}</p>
                    <p className="text-xs text-muted-foreground">Tickets Sold</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-xl font-bold">{selectedEvent.capacity}</p>
                    <p className="text-xs text-muted-foreground">Capacity</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-xl font-bold">{selectedEvent.restaurants}</p>
                    <p className="text-xs text-muted-foreground">Restaurants</p>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-xl font-bold text-fresh">${selectedEvent.revenue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Revenue</p>
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
