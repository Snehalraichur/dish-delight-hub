import { UserLayout } from "@/components/layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Calendar, MapPin, QrCode, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tickets = [
  {
    id: "1",
    eventName: "Food Truck Festival 2024",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    date: "Jan 15, 2024",
    time: "11:00 AM",
    location: "Central Park",
    ticketType: "VIP Pass",
    quantity: 2,
    status: "upcoming"
  },
  {
    id: "2",
    eventName: "Wine & Dine Evening",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400",
    date: "Dec 20, 2023",
    time: "7:00 PM",
    location: "The Grand Ballroom",
    ticketType: "General",
    quantity: 1,
    status: "past"
  }
];

export default function MyTickets() {
  const navigate = useNavigate();

  return (
    <UserLayout>
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold text-lg">My Tickets</h1>
          </div>
        </div>

        <div className="p-4">
          <Tabs defaultValue="upcoming">
            <TabsList className="w-full">
              <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
              <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-4 space-y-4">
              {tickets.filter(t => t.status === "upcoming").map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden">
                  <div className="flex">
                    <img 
                      src={ticket.image} 
                      alt={ticket.eventName}
                      className="w-24 h-full object-cover"
                    />
                    <CardContent className="p-4 flex-1">
                      <Badge variant="secondary" className="mb-2">{ticket.ticketType}</Badge>
                      <h3 className="font-semibold mb-1">{ticket.eventName}</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{ticket.date} • {ticket.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{ticket.location}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {ticket.quantity} ticket(s)
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          <QrCode className="h-4 w-4 mr-1" />
                          View QR
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="past" className="mt-4 space-y-4">
              {tickets.filter(t => t.status === "past").map((ticket) => (
                <Card key={ticket.id} className="overflow-hidden opacity-75">
                  <div className="flex">
                    <img 
                      src={ticket.image} 
                      alt={ticket.eventName}
                      className="w-24 h-full object-cover grayscale"
                    />
                    <CardContent className="p-4 flex-1">
                      <Badge variant="outline" className="mb-2">Attended</Badge>
                      <h3 className="font-semibold mb-1">{ticket.eventName}</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{ticket.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{ticket.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </UserLayout>
  );
}
