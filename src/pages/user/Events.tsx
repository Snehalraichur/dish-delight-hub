import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Ticket, Filter, ChevronRight, Star } from 'lucide-react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const events = [
  {
    id: '1',
    title: 'NYC Food Festival 2024',
    date: 'Dec 28-30, 2024',
    location: 'Central Park, NYC',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
    price: 'From $25',
    attendees: 2500,
    category: 'Festival',
  },
  {
    id: '2',
    title: 'Italian Wine & Pasta Night',
    date: 'Dec 29, 2024',
    location: 'Bella Italia, SoHo',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop',
    price: '$75',
    attendees: 45,
    category: 'Tasting',
  },
  {
    id: '3',
    title: 'Sushi Making Masterclass',
    date: 'Jan 5, 2025',
    location: 'Sakura Sushi, Midtown',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&h=400&fit=crop',
    price: '$120',
    attendees: 12,
    category: 'Class',
  },
];

const cateringRequests = [
  { id: '1', event: 'Birthday Party', date: 'Jan 15, 2025', guests: 30, status: 'pending', budget: '$500-800' },
  { id: '2', event: 'Corporate Lunch', date: 'Jan 20, 2025', guests: 50, status: 'confirmed', budget: '$1000-1500' },
];

const myTickets = [
  { id: '1', event: 'NYC Food Festival 2024', date: 'Dec 28, 2024', tickets: 2, code: 'NYC2024-1234' },
];

const categories = ['All', 'Festival', 'Tasting', 'Class', 'Pop-up'];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredEvents = activeCategory === 'All' 
    ? events 
    : events.filter(e => e.category === activeCategory);

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold font-display text-foreground">Events & Catering</h1>
          <p className="text-muted-foreground">Discover food events and request catering services</p>
        </motion.div>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="w-full h-12 bg-muted rounded-2xl p-1 mb-6">
            <TabsTrigger value="events" className="flex-1 h-10 rounded-xl data-[state=active]:bg-card">
              <Calendar className="w-4 h-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="catering" className="flex-1 h-10 rounded-xl data-[state=active]:bg-card">
              <Users className="w-4 h-4 mr-2" />
              Catering
            </TabsTrigger>
            <TabsTrigger value="tickets" className="flex-1 h-10 rounded-xl data-[state=active]:bg-card">
              <Ticket className="w-4 h-4 mr-2" />
              My Tickets
            </TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events">
            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    activeCategory === cat
                      ? "gradient-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:bg-muted"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-2xl border border-border overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group"
                >
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-foreground">
                      {event.price}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-foreground mb-2">{event.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-secondary" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-fresh" />
                        {event.attendees.toLocaleString()} attending
                      </div>
                    </div>
                    <Button variant="hero" className="w-full mt-4 rounded-xl">
                      Get Tickets
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Catering Tab */}
          <TabsContent value="catering">
            <div className="space-y-4">
              <Button variant="hero" className="w-full rounded-xl">
                <Users className="w-5 h-5 mr-2" />
                Request Catering
              </Button>

              <h3 className="font-semibold text-foreground mt-6 mb-4">Your Requests</h3>
              {cateringRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-card rounded-2xl border border-border p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{request.event}</h4>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium",
                      request.status === 'confirmed' 
                        ? "bg-fresh/10 text-fresh" 
                        : "bg-secondary/20 text-secondary-foreground"
                    )}>
                      {request.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                    <div>
                      <p className="text-xs uppercase tracking-wide">Date</p>
                      <p className="font-medium text-foreground">{request.date}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide">Guests</p>
                      <p className="font-medium text-foreground">{request.guests}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide">Budget</p>
                      <p className="font-medium text-foreground">{request.budget}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets">
            {myTickets.length > 0 ? (
              <div className="space-y-4">
                {myTickets.map((ticket) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card rounded-2xl border border-border p-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-foreground">{ticket.event}</h4>
                      <span className="text-sm text-muted-foreground">{ticket.tickets} tickets</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      {ticket.date}
                    </div>
                    <div className="bg-muted rounded-xl p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-1">Ticket Code</p>
                      <p className="font-mono font-bold text-lg text-foreground">{ticket.code}</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4 rounded-xl">
                      View QR Code
                    </Button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No tickets yet</h3>
                <p className="text-muted-foreground mb-6">Your purchased tickets will appear here</p>
                <Button variant="gradient">Browse Events</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  );
}
