import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Ticket, Filter, ChevronRight, Star, Search, ChevronDown } from 'lucide-react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// State and City data
const states = ['New York', 'California', 'Texas', 'Florida', 'Illinois'];
const citiesByState: Record<string, string[]> = {
  'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany'],
  'California': ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose'],
  'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
  'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
  'Illinois': ['Chicago', 'Aurora', 'Naperville', 'Rockford'],
};

const events = [
  {
    id: '1',
    title: 'NYC Food Festival 2024',
    date: 'Dec 28-30, 2024',
    location: 'Central Park, NYC',
    state: 'New York',
    city: 'New York City',
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
    state: 'New York',
    city: 'New York City',
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
    state: 'New York',
    city: 'New York City',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&h=400&fit=crop',
    price: '$120',
    attendees: 12,
    category: 'Class',
  },
  {
    id: '4',
    title: 'LA Street Food Fair',
    date: 'Jan 10, 2025',
    location: 'Grand Park, Downtown LA',
    state: 'California',
    city: 'Los Angeles',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&h=400&fit=crop',
    price: 'From $15',
    attendees: 3000,
    category: 'Festival',
  },
];

// Catering restaurants
const cateringRestaurants = [
  {
    id: 'cat1',
    name: 'Bella Italia Catering',
    cuisine: 'Italian',
    rating: 4.8,
    minOrder: 20,
    pricePerPlate: '$25-45',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200',
    city: 'New York City',
    state: 'New York',
    menuItems: [
      { id: 'm1', name: 'Pasta Primavera', price: 18, category: 'Main' },
      { id: 'm2', name: 'Chicken Parmesan', price: 24, category: 'Main' },
      { id: 'm3', name: 'Caesar Salad', price: 12, category: 'Starter' },
      { id: 'm4', name: 'Tiramisu', price: 10, category: 'Dessert' },
      { id: 'm5', name: 'Garlic Bread', price: 8, category: 'Side' },
    ],
  },
  {
    id: 'cat2',
    name: 'Dragon Palace Catering',
    cuisine: 'Chinese',
    rating: 4.6,
    minOrder: 15,
    pricePerPlate: '$20-35',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200',
    city: 'New York City',
    state: 'New York',
    menuItems: [
      { id: 'm6', name: 'Dim Sum Platter', price: 22, category: 'Starter' },
      { id: 'm7', name: 'General Tso Chicken', price: 20, category: 'Main' },
      { id: 'm8', name: 'Fried Rice', price: 15, category: 'Side' },
      { id: 'm9', name: 'Spring Rolls', price: 12, category: 'Starter' },
    ],
  },
  {
    id: 'cat3',
    name: 'Taco Fiesta Catering',
    cuisine: 'Mexican',
    rating: 4.7,
    minOrder: 25,
    pricePerPlate: '$18-30',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200',
    city: 'Los Angeles',
    state: 'California',
    menuItems: [
      { id: 'm10', name: 'Taco Bar', price: 18, category: 'Main' },
      { id: 'm11', name: 'Burrito Bowl', price: 16, category: 'Main' },
      { id: 'm12', name: 'Guacamole & Chips', price: 10, category: 'Starter' },
      { id: 'm13', name: 'Churros', price: 8, category: 'Dessert' },
    ],
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
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  // Catering flow states
  const [showCateringFlow, setShowCateringFlow] = useState(false);
  const [cateringStep, setCateringStep] = useState(1);
  const [cateringState, setCateringState] = useState('');
  const [cateringCity, setCateringCity] = useState('');
  const [cateringRange, setCateringRange] = useState([10]);
  const [selectedCateringRestaurant, setSelectedCateringRestaurant] = useState<typeof cateringRestaurants[0] | null>(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState<Record<string, number>>({});
  const [totalPlates, setTotalPlates] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventName, setEventName] = useState('');

  // Filter events by location
  const filteredEvents = events.filter(e => {
    const categoryMatch = activeCategory === 'All' || e.category === activeCategory;
    const stateMatch = !selectedState || e.state === selectedState;
    const cityMatch = !selectedCity || e.city === selectedCity;
    return categoryMatch && stateMatch && cityMatch;
  });

  // Filter catering restaurants
  const filteredCateringRestaurants = cateringRestaurants.filter(r => {
    if (!cateringState || !cateringCity) return false;
    return r.state === cateringState && r.city === cateringCity;
  });

  const handleGetTickets = (eventId: string) => {
    navigate(`/events/${eventId}/tickets`);
  };

  const handleStartCatering = () => {
    setShowCateringFlow(true);
    setCateringStep(1);
  };

  const handleNextCateringStep = () => {
    if (cateringStep === 1 && (!cateringState || !cateringCity)) {
      toast.error('Please select state and city');
      return;
    }
    if (cateringStep === 2 && !selectedCateringRestaurant) {
      toast.error('Please select a restaurant');
      return;
    }
    if (cateringStep === 3 && Object.keys(selectedMenuItems).length === 0) {
      toast.error('Please select at least one menu item');
      return;
    }
    if (cateringStep < 4) {
      setCateringStep(cateringStep + 1);
    }
  };

  const handleSubmitCatering = () => {
    if (!totalPlates || parseInt(totalPlates) < (selectedCateringRestaurant?.minOrder || 0)) {
      toast.error(`Minimum order is ${selectedCateringRestaurant?.minOrder} plates`);
      return;
    }
    if (!eventDate || !eventName) {
      toast.error('Please fill in event details');
      return;
    }
    toast.success('Catering request submitted!', {
      description: `${selectedCateringRestaurant?.name} will review your request.`,
    });
    setShowCateringFlow(false);
    resetCateringForm();
  };

  const resetCateringForm = () => {
    setCateringStep(1);
    setCateringState('');
    setCateringCity('');
    setCateringRange([10]);
    setSelectedCateringRestaurant(null);
    setSelectedMenuItems({});
    setTotalPlates('');
    setEventDate('');
    setEventName('');
  };

  const toggleMenuItem = (itemId: string, itemPrice: number) => {
    setSelectedMenuItems(prev => {
      if (prev[itemId]) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: itemPrice };
    });
  };

  const getTotalEstimate = () => {
    const itemsTotal = Object.values(selectedMenuItems).reduce((a, b) => a + b, 0);
    const plates = parseInt(totalPlates) || 0;
    return itemsTotal * plates;
  };

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
            {/* Location Filters */}
            <div className="flex gap-3 mb-4">
              <Select value={selectedState} onValueChange={(v) => { setSelectedState(v); setSelectedCity(''); }}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All States</SelectItem>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedState}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Cities</SelectItem>
                  {selectedState && citiesByState[selectedState]?.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
              {filteredEvents.length === 0 ? (
                <div className="col-span-2 text-center py-12">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No events found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters</p>
                </div>
              ) : (
                filteredEvents.map((event, index) => (
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
                      <Button 
                        variant="hero" 
                        className="w-full mt-4 rounded-xl"
                        onClick={() => handleGetTickets(event.id)}
                      >
                        Get Tickets
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>

          {/* Catering Tab */}
          <TabsContent value="catering">
            <div className="space-y-4">
              <Button variant="hero" className="w-full rounded-xl" onClick={handleStartCatering}>
                <Users className="w-5 h-5 mr-2" />
                Request Catering
              </Button>

              <h3 className="font-semibold text-foreground mt-6 mb-4">Your Requests</h3>
              {cateringRequests.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No catering requests yet</p>
                </div>
              ) : (
                cateringRequests.map((request) => (
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
                ))
              )}
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

      {/* Catering Request Flow Dialog */}
      <Dialog open={showCateringFlow} onOpenChange={(open) => { if (!open) resetCateringForm(); setShowCateringFlow(open); }}>
        <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {cateringStep === 1 && 'Select Location'}
              {cateringStep === 2 && 'Choose Restaurant'}
              {cateringStep === 3 && 'Select Menu Items'}
              {cateringStep === 4 && 'Event Details'}
            </DialogTitle>
          </DialogHeader>

          {/* Step 1: Location */}
          {cateringStep === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>State</Label>
                <Select value={cateringState} onValueChange={(v) => { setCateringState(v); setCateringCity(''); }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map(state => (
                      <SelectItem key={state} value={state}>{state}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>City</Label>
                <Select value={cateringCity} onValueChange={setCateringCity} disabled={!cateringState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {cateringState && citiesByState[cateringState]?.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Range (miles): {cateringRange[0]}</Label>
                <Slider
                  value={cateringRange}
                  onValueChange={setCateringRange}
                  min={5}
                  max={50}
                  step={5}
                />
              </div>
              <Button className="w-full" onClick={handleNextCateringStep}>
                Find Restaurants
              </Button>
            </div>
          )}

          {/* Step 2: Restaurant Selection */}
          {cateringStep === 2 && (
            <div className="space-y-4">
              {filteredCateringRestaurants.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No catering restaurants found in this area</p>
                  <Button variant="outline" className="mt-4" onClick={() => setCateringStep(1)}>
                    Change Location
                  </Button>
                </div>
              ) : (
                <>
                  {filteredCateringRestaurants.map((restaurant) => (
                    <Card
                      key={restaurant.id}
                      className={cn(
                        "cursor-pointer transition-all",
                        selectedCateringRestaurant?.id === restaurant.id && "ring-2 ring-primary"
                      )}
                      onClick={() => setSelectedCateringRestaurant(restaurant)}
                    >
                      <CardContent className="p-4 flex gap-4">
                        <img src={restaurant.image} alt={restaurant.name} className="w-20 h-20 rounded-lg object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{restaurant.name}</h4>
                          <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-4 h-4 text-amber fill-amber" />
                            <span className="text-sm">{restaurant.rating}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Min {restaurant.minOrder} plates • {restaurant.pricePerPlate}/plate
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => setCateringStep(1)}>
                      Back
                    </Button>
                    <Button className="flex-1" onClick={handleNextCateringStep}>
                      Select Menu
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Step 3: Menu Selection */}
          {cateringStep === 3 && selectedCateringRestaurant && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select items from {selectedCateringRestaurant.name}
              </p>
              {selectedCateringRestaurant.menuItems.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer",
                    selectedMenuItems[item.id] ? "border-primary bg-primary/5" : "border-border"
                  )}
                  onClick={() => toggleMenuItem(item.id, item.price)}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox checked={!!selectedMenuItems[item.id]} />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                  <span className="font-semibold">${item.price}</span>
                </div>
              ))}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setCateringStep(2)}>
                  Back
                </Button>
                <Button className="flex-1" onClick={handleNextCateringStep}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Event Details */}
          {cateringStep === 4 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Event Name</Label>
                <Input
                  placeholder="e.g., Birthday Party"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Event Date</Label>
                <Input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Total Number of Plates</Label>
                <Input
                  type="number"
                  placeholder={`Min ${selectedCateringRestaurant?.minOrder} plates`}
                  value={totalPlates}
                  onChange={(e) => setTotalPlates(e.target.value)}
                  min={selectedCateringRestaurant?.minOrder}
                />
              </div>
              
              {/* Order Summary */}
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Order Summary</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Restaurant</span>
                      <span>{selectedCateringRestaurant?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Items Selected</span>
                      <span>{Object.keys(selectedMenuItems).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Plates</span>
                      <span>{totalPlates || '0'}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2 mt-2">
                      <span>Estimated Total</span>
                      <span>${getTotalEstimate().toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setCateringStep(3)}>
                  Back
                </Button>
                <Button variant="hero" className="flex-1" onClick={handleSubmitCatering}>
                  Submit Request
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </UserLayout>
  );
}