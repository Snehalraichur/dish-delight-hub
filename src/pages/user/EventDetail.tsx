import { UserLayout } from "@/components/layouts/UserLayout";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, ChevronLeft, Share2, Heart, Users } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <UserLayout>
      <div className="min-h-screen bg-background pb-24">
        {/* Header Image */}
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800" 
            alt="Event"
            className="w-full aspect-video object-cover"
          />
          <div className="absolute top-0 left-0 right-0 p-4 flex justify-between">
            <Button variant="secondary" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              <Button variant="secondary" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="secondary" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <Badge variant="secondary" className="mb-2">Festival</Badge>
            <h1 className="text-2xl font-bold">Food Truck Festival 2024</h1>
          </div>

          {/* Event Info */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">January 15, 2024</p>
                  <p className="text-sm text-muted-foreground">Saturday</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">11:00 AM - 9:00 PM</p>
                  <p className="text-sm text-muted-foreground">10 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Central Park</p>
                  <p className="text-sm text-muted-foreground">123 Main Street, City</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">1,234 attending</p>
                  <p className="text-sm text-muted-foreground">Limited spots available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <div>
            <h2 className="font-semibold text-lg mb-2">About This Event</h2>
            <p className="text-muted-foreground">
              Join us for the biggest food truck festival of the year! Experience a variety of 
              cuisines from over 50 food trucks, live music, cooking demonstrations, and family-friendly 
              activities. Don't miss out on this culinary adventure!
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Highlights</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">50+ Food Trucks</Badge>
              <Badge variant="outline">Live Music</Badge>
              <Badge variant="outline">Cooking Demos</Badge>
              <Badge variant="outline">Kids Zone</Badge>
              <Badge variant="outline">Beer Garden</Badge>
            </div>
          </div>

          {/* Participating Restaurants */}
          <div>
            <h2 className="font-semibold text-lg mb-3">Featured Vendors</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex-shrink-0 text-center">
                  <div className="h-16 w-16 rounded-full bg-muted overflow-hidden mb-1">
                    <img 
                      src={`https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100`}
                      alt="Vendor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs font-medium">Vendor {i}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Bottom CTA */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t border-border">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            <div>
              <p className="text-sm text-muted-foreground">Starting from</p>
              <p className="text-2xl font-bold text-primary">$15</p>
            </div>
            <Button 
              size="lg" 
              className="px-8"
              onClick={() => navigate(`/events/${id}/tickets`)}
            >
              Buy Tickets
            </Button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
