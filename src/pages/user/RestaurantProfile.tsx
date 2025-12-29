import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Phone, Globe, Star, Heart, Share2, Tag, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import UserLayout from "@/components/layouts/UserLayout";

const RestaurantProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [saved, setSaved] = useState(false);

  const restaurant = {
    id: id || "1",
    name: "Bella Italia",
    cuisine: "Italian",
    rating: 4.8,
    reviews: 324,
    priceRange: "$$",
    avatar: "/placeholder.svg",
    coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    address: "123 Main Street, Downtown",
    phone: "+1 (555) 123-4567",
    website: "www.bellaitalia.com",
    hours: "11:00 AM - 10:00 PM",
    description: "Authentic Italian cuisine with a modern twist. Our family recipes have been passed down for generations.",
    followers: "2.3K",
    posts: 156,
    deals: [
      { id: 1, title: "20% Off Pasta", description: "Valid on all pasta dishes", expiry: "Dec 31" },
      { id: 2, title: "Free Dessert", description: "With orders over $50", expiry: "Jan 15" },
    ],
    menu: [
      { category: "Appetizers", items: ["Bruschetta", "Caprese Salad", "Calamari"] },
      { category: "Pasta", items: ["Spaghetti Carbonara", "Fettuccine Alfredo", "Lasagna"] },
      { category: "Pizza", items: ["Margherita", "Pepperoni", "Quattro Formaggi"] },
    ],
    photos: [
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    ]
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? "Removed from saved" : "Restaurant saved!");
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64">
          <img
            src={restaurant.coverImage}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 text-white hover:bg-white/20"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={handleSave}
            >
              <Heart className={`h-5 w-5 ${saved ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => toast.success("Link copied!")}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Restaurant Info */}
        <div className="p-4 space-y-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 border-4 border-background -mt-12 relative z-10">
              <AvatarImage src={restaurant.avatar} />
              <AvatarFallback>{restaurant.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 pt-2">
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Badge variant="secondary">{restaurant.cuisine}</Badge>
                <span>•</span>
                <span>{restaurant.priceRange}</span>
                <span>•</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1">{restaurant.rating}</span>
                  <span className="text-sm ml-1">({restaurant.reviews})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-around text-center py-4 border-y">
            <div>
              <p className="text-2xl font-bold">{restaurant.posts}</p>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{restaurant.followers}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{restaurant.deals.length}</p>
              <p className="text-sm text-muted-foreground">Active Deals</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button className="w-full" onClick={() => navigate("/catering-request")}>
              Request Catering
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/messages")}>
              Message
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="about" className="flex-1">About</TabsTrigger>
              <TabsTrigger value="deals" className="flex-1">Deals</TabsTrigger>
              <TabsTrigger value="photos" className="flex-1">Photos</TabsTrigger>
              <TabsTrigger value="menu" className="flex-1">Menu</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-4 mt-4">
              <p className="text-muted-foreground">{restaurant.description}</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span>{restaurant.hours}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>{restaurant.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <span>{restaurant.website}</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="deals" className="space-y-4 mt-4">
              {restaurant.deals.map((deal) => (
                <Card key={deal.id} className="bg-gradient-to-r from-primary/10 to-orange-100">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-primary" />
                          <span className="font-semibold">{deal.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{deal.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">Expires: {deal.expiry}</p>
                      </div>
                      <Button size="sm" onClick={() => navigate(`/deal/${deal.id}`)}>
                        Claim
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="photos" className="mt-4">
              <div className="grid grid-cols-3 gap-1">
                {restaurant.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="aspect-square object-cover cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate(`/post/${index}`)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="menu" className="space-y-4 mt-4">
              {restaurant.menu.map((section) => (
                <Card key={section.category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-center justify-between py-2 border-b last:border-0">
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </UserLayout>
  );
};

export default RestaurantProfile;
