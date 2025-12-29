import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import UserLayout from "@/components/layouts/UserLayout";

const SavedRestaurants = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const savedRestaurants = [
    {
      id: "1",
      name: "Bella Italia",
      cuisine: "Italian",
      rating: 4.8,
      reviews: 324,
      priceRange: "$$",
      avatar: "/placeholder.svg",
      location: "Downtown",
      activeDeals: 2,
      distance: "0.5 mi"
    },
    {
      id: "2",
      name: "Taco Fiesta",
      cuisine: "Mexican",
      rating: 4.6,
      reviews: 256,
      priceRange: "$",
      avatar: "/placeholder.svg",
      location: "Midtown",
      activeDeals: 1,
      distance: "1.2 mi"
    },
    {
      id: "3",
      name: "Sushi Palace",
      cuisine: "Japanese",
      rating: 4.9,
      reviews: 512,
      priceRange: "$$$",
      avatar: "/placeholder.svg",
      location: "East Side",
      activeDeals: 3,
      distance: "2.0 mi"
    },
    {
      id: "4",
      name: "Burger Joint",
      cuisine: "American",
      rating: 4.5,
      reviews: 189,
      priceRange: "$",
      avatar: "/placeholder.svg",
      location: "West End",
      activeDeals: 0,
      distance: "0.8 mi"
    }
  ];

  const filteredRestaurants = savedRestaurants.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUnsave = (id: string, name: string) => {
    toast.success(`${name} removed from saved`);
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Saved Restaurants</h1>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search saved restaurants..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Restaurant List */}
        <div className="space-y-4">
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No saved restaurants found</p>
            </div>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar
                      className="h-16 w-16 cursor-pointer"
                      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                    >
                      <AvatarImage src={restaurant.avatar} />
                      <AvatarFallback>{restaurant.name[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3
                            className="font-semibold cursor-pointer hover:text-primary"
                            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                          >
                            {restaurant.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="secondary" className="text-xs">{restaurant.cuisine}</Badge>
                            <span>•</span>
                            <span>{restaurant.priceRange}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleUnsave(restaurant.id, restaurant.name)}
                        >
                          <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="ml-1">{restaurant.rating}</span>
                          <span className="text-muted-foreground ml-1">({restaurant.reviews})</span>
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-1" />
                          {restaurant.distance}
                        </div>
                      </div>

                      {restaurant.activeDeals > 0 && (
                        <Badge className="mt-2 bg-primary/10 text-primary hover:bg-primary/20">
                          {restaurant.activeDeals} active deal{restaurant.activeDeals > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default SavedRestaurants;
