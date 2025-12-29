import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Calendar, MapPin, Users, Edit2 } from "lucide-react";

const events = [
  { id: "1", name: "Food Truck Festival 2024", date: "Jan 15, 2024", location: "Central Park", status: "active", tickets: 1234 },
  { id: "2", name: "Wine & Dine Evening", date: "Feb 20, 2024", location: "Grand Ballroom", status: "upcoming", tickets: 89 },
  { id: "3", name: "Street Food Championship", date: "Mar 5, 2024", location: "City Square", status: "upcoming", tickets: 456 }
];

export default function EventManagement() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Event Management</h1>
          <Button><Plus className="h-4 w-4 mr-2" />Create Event</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">12</p><p className="text-sm text-muted-foreground">Active Events</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">3,456</p><p className="text-sm text-muted-foreground">Tickets Sold</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">$45,890</p><p className="text-sm text-muted-foreground">Revenue</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">89</p><p className="text-sm text-muted-foreground">Vendors</p></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Events</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>Event</TableHead><TableHead>Date</TableHead><TableHead>Location</TableHead><TableHead>Tickets</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>
                {events.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell>{e.date}</TableCell>
                    <TableCell>{e.location}</TableCell>
                    <TableCell>{e.tickets}</TableCell>
                    <TableCell><Badge>{e.status}</Badge></TableCell>
                    <TableCell><Button variant="ghost" size="icon"><Edit2 className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
