import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Star, Filter, ChefHat, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserLayout from "@/components/layouts/UserLayout";

const CateringDiscovery = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [eventType, setEventType] = useState("");

  const caterers = [
    {
      id: "1",
      name: "Bella Italia Catering",
      cuisine: "Italian",
      rating: 4.9,
      reviews: 156,
      priceRange: "$$",
      minGuests: 20,
      maxGuests: 200,
      avatar: "/placeholder.svg",
      specialties: ["Weddings", "Corporate", "Private Parties"],
      featured: true
    },
    {
      id: "2",
      name: "Taco Fiesta Events",
      cuisine: "Mexican",
      rating: 4.7,
      reviews: 98,
      priceRange: "$",
      minGuests: 10,
      maxGuests: 150,
      avatar: "/placeholder.svg",
      specialties: ["Birthday Parties", "Office Lunches"]
    },
    {
      id: "3",
      name: "Sushi Master Catering",
      cuisine: "Japanese",
      rating: 4.8,
      reviews: 72,
      priceRange: "$$$",
      minGuests: 15,
      maxGuests: 100,
      avatar: "/placeholder.svg",
      specialties: ["Corporate Events", "Private Dinners"]
    },
    {
      id: "4",
      name: "BBQ Brothers",
      cuisine: "American BBQ",
      rating: 4.6,
      reviews: 203,
      priceRange: "$$",
      minGuests: 30,
      maxGuests: 500,
      avatar: "/placeholder.svg",
      specialties: ["Large Events", "Outdoor Parties", "Festivals"]
    }
  ];

  const eventTypes = [
    "Wedding",
    "Corporate Event",
    "Birthday Party",
    "Private Dinner",
    "Office Lunch",
    "Festival",
    "Other"
  ];

  const filteredCaterers = caterers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Find Catering</h1>
          <p className="text-muted-foreground">Discover the perfect caterer for your event</p>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search caterers, cuisines..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-[150px]">
                <Users className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Guest Count" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10-25">10-25 guests</SelectItem>
                <SelectItem value="25-50">25-50 guests</SelectItem>
                <SelectItem value="50-100">50-100 guests</SelectItem>
                <SelectItem value="100+">100+ guests</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Featured Caterer */}
        {filteredCaterers.filter(c => c.featured).map((caterer) => (
          <Card key={caterer.id} className="bg-gradient-to-r from-primary/10 to-orange-100 border-primary/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <ChefHat className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Featured Caterer</span>
              </div>
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={caterer.avatar} />
                  <AvatarFallback>{caterer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{caterer.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{caterer.cuisine}</Badge>
                    <span className="text-muted-foreground">{caterer.priceRange}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{caterer.rating}</span>
                      <span className="text-muted-foreground ml-1">({caterer.reviews})</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {caterer.specialties.map((s) => (
                      <Badge key={s} variant="outline">{s}</Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {caterer.minGuests}-{caterer.maxGuests} guests
                  </p>
                </div>
                <Button onClick={() => navigate(`/catering-request?caterer=${caterer.id}`)}>
                  Request Quote
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Caterer List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">All Caterers</h2>
          {filteredCaterers.filter(c => !c.featured).map((caterer) => (
            <Card key={caterer.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <Avatar
                    className="h-16 w-16 cursor-pointer"
                    onClick={() => navigate(`/restaurant/${caterer.id}`)}
                  >
                    <AvatarImage src={caterer.avatar} />
                    <AvatarFallback>{caterer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{caterer.name}</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <Badge variant="secondary" className="text-xs">{caterer.cuisine}</Badge>
                          <span className="text-muted-foreground">{caterer.priceRange}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/catering-request?caterer=${caterer.id}`)}
                      >
                        Request
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1">{caterer.rating}</span>
                        <span className="text-muted-foreground ml-1">({caterer.reviews})</span>
                      </div>
                      <span className="text-muted-foreground">
                        {caterer.minGuests}-{caterer.maxGuests} guests
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {caterer.specialties.map((s) => (
                        <Badge key={s} variant="outline" className="text-xs">{s}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default CateringDiscovery;
