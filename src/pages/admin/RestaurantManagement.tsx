import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, MoreVertical, Eye, Ban, Mail, Check, X,
  Store, MapPin, Star, TrendingUp, Download
} from 'lucide-react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const restaurants = [
  {
    id: 1,
    name: 'The Golden Fork',
    email: 'contact@goldenfork.com',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100',
    address: '123 Main Street, Downtown',
    status: 'verified',
    plan: 'premium',
    rating: 4.8,
    reviews: 245,
    deals: 12,
    revenue: 12400,
    joinDate: '2023-06-15'
  },
  {
    id: 2,
    name: 'Sakura Sushi',
    email: 'info@sakurasushi.com',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=100',
    address: '456 Oak Avenue, Midtown',
    status: 'verified',
    plan: 'growth',
    rating: 4.6,
    reviews: 189,
    deals: 8,
    revenue: 9800,
    joinDate: '2023-08-20'
  },
  {
    id: 3,
    name: 'Pizza Palace',
    email: 'hello@pizzapalace.com',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100',
    address: '789 Elm Road, Uptown',
    status: 'pending',
    plan: 'starter',
    rating: 0,
    reviews: 0,
    deals: 0,
    revenue: 0,
    joinDate: '2024-01-18'
  },
  {
    id: 4,
    name: 'Burger Joint',
    email: 'team@burgerjoint.com',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=100',
    address: '321 Pine Street, East Side',
    status: 'suspended',
    plan: 'growth',
    rating: 3.9,
    reviews: 67,
    deals: 5,
    revenue: 4200,
    joinDate: '2023-10-05'
  },
  {
    id: 5,
    name: 'Mediterranean Delight',
    email: 'info@meddelight.com',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100',
    address: '654 Cedar Lane, West End',
    status: 'verified',
    plan: 'premium',
    rating: 4.9,
    reviews: 312,
    deals: 15,
    revenue: 18600,
    joinDate: '2023-04-10'
  },
];

const statusColors: Record<string, string> = {
  verified: 'bg-fresh/10 text-fresh border-fresh/20',
  pending: 'bg-amber/10 text-amber border-amber/20',
  suspended: 'bg-coral/10 text-coral border-coral/20',
};

const planColors: Record<string, string> = {
  starter: 'bg-muted text-muted-foreground',
  growth: 'bg-primary/10 text-primary',
  premium: 'bg-amber/10 text-amber',
};

export default function RestaurantManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState<typeof restaurants[0] | null>(null);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || restaurant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Restaurant Management</h1>
            <p className="text-muted-foreground">Manage partner restaurants</p>
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Store className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{restaurants.length}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-fresh/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-fresh" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {restaurants.filter(r => r.status === 'verified').length}
                  </p>
                  <p className="text-sm text-muted-foreground">Verified</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    ${(restaurants.reduce((acc, r) => acc + r.revenue, 0) / 1000).toFixed(1)}K
                  </p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-coral/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-coral" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {(restaurants.filter(r => r.rating > 0).reduce((acc, r) => acc + r.rating, 0) / 
                      restaurants.filter(r => r.rating > 0).length).toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
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
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="suspended">Suspended</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Restaurants Table */}
        <Card className="border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Restaurant</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Plan</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Performance</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRestaurants.map((restaurant) => (
                  <motion.tr
                    key={restaurant.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-t border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-foreground">{restaurant.name}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {restaurant.address}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className={statusColors[restaurant.status]}>
                        {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary" className={planColors[restaurant.plan]}>
                        {restaurant.plan.charAt(0).toUpperCase() + restaurant.plan.slice(1)}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="w-4 h-4 text-amber fill-amber" />
                          <span>{restaurant.rating > 0 ? restaurant.rating : 'N/A'}</span>
                          <span className="text-muted-foreground">({restaurant.reviews})</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {restaurant.deals} deals • ${restaurant.revenue.toLocaleString()} revenue
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedRestaurant(restaurant)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="w-4 h-4 mr-2" />
                              Contact
                            </DropdownMenuItem>
                            {restaurant.status === 'pending' && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-fresh">
                                  <Check className="w-4 h-4 mr-2" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-coral">
                                  <X className="w-4 h-4 mr-2" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            {restaurant.status === 'verified' && (
                              <DropdownMenuItem className="text-coral">
                                <Ban className="w-4 h-4 mr-2" />
                                Suspend
                              </DropdownMenuItem>
                            )}
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

        {/* Restaurant Detail Modal */}
        <Dialog open={!!selectedRestaurant} onOpenChange={(open) => !open && setSelectedRestaurant(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Restaurant Details</DialogTitle>
            </DialogHeader>
            {selectedRestaurant && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedRestaurant.image}
                    alt={selectedRestaurant.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{selectedRestaurant.name}</h3>
                    <p className="text-muted-foreground">{selectedRestaurant.email}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {selectedRestaurant.address}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className={statusColors[selectedRestaurant.status]}>
                      {selectedRestaurant.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Plan</p>
                    <Badge variant="secondary" className={planColors[selectedRestaurant.plan]}>
                      {selectedRestaurant.plan}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joined</p>
                    <p className="font-medium">{selectedRestaurant.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber fill-amber" />
                      <span className="font-medium">{selectedRestaurant.rating || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold">{selectedRestaurant.deals}</p>
                    <p className="text-sm text-muted-foreground">Deals</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{selectedRestaurant.reviews}</p>
                    <p className="text-sm text-muted-foreground">Reviews</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-fresh">${selectedRestaurant.revenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Revenue</p>
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
