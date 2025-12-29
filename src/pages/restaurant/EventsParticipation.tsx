import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, DollarSign, CheckCircle, Clock, Plus } from "lucide-react";

const events = [
  {
    id: "1",
    name: "Food Truck Festival 2024",
    date: "Jan 15, 2024",
    location: "Central Park",
    status: "confirmed",
    expectedAttendance: 5000,
    boothFee: 500,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400"
  },
  {
    id: "2",
    name: "Wine & Dine Evening",
    date: "Feb 20, 2024",
    location: "The Grand Ballroom",
    status: "pending",
    expectedAttendance: 200,
    boothFee: 300,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400"
  },
  {
    id: "3",
    name: "Street Food Championship",
    date: "Mar 5, 2024",
    location: "City Square",
    status: "confirmed",
    expectedAttendance: 10000,
    boothFee: 750,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
  }
];

const availableEvents = [
  {
    id: "4",
    name: "Spring Food Festival",
    date: "Apr 10, 2024",
    location: "Riverside Park",
    expectedAttendance: 8000,
    boothFee: 600,
    deadline: "Feb 28, 2024"
  },
  {
    id: "5",
    name: "Farmers Market Weekend",
    date: "Apr 15-16, 2024",
    location: "Town Center",
    expectedAttendance: 3000,
    boothFee: 250,
    deadline: "Mar 15, 2024"
  }
];

export default function EventsParticipation() {
  return (
    <RestaurantLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Events Participation</h1>
            <p className="text-muted-foreground">Manage your event appearances</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
              <p className="text-2xl font-bold">3</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Reach</p>
              <p className="text-2xl font-bold">15,200</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Booth Fees</p>
              <p className="text-2xl font-bold">$1,550</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Past Events</p>
              <p className="text-2xl font-bold">12</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="registered">
          <TabsList>
            <TabsTrigger value="registered">Registered Events</TabsTrigger>
            <TabsTrigger value="available">Available Events</TabsTrigger>
          </TabsList>

          <TabsContent value="registered" className="mt-4 space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full md:w-48 h-48 md:h-auto object-cover"
                  />
                  <CardContent className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold">{event.name}</h3>
                          <Badge variant={event.status === "confirmed" ? "default" : "secondary"}>
                            {event.status === "confirmed" ? (
                              <><CheckCircle className="h-3 w-3 mr-1" />Confirmed</>
                            ) : (
                              <><Clock className="h-3 w-3 mr-1" />Pending</>
                            )}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{event.expectedAttendance.toLocaleString()} expected</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>${event.boothFee} booth fee</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="available" className="mt-4 space-y-4">
            {availableEvents.map((event) => (
              <Card key={event.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{event.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Application deadline: {event.deadline}
                      </p>
                    </div>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Apply
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{event.expectedAttendance.toLocaleString()} expected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${event.boothFee} booth fee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </RestaurantLayout>
  );
}
