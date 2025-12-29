import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
const requests = [
  { id: "CR-001", user: "John Corp", restaurant: "The Spice Garden", guests: 50, date: "Feb 15, 2024", status: "pending" },
  { id: "CR-002", user: "Tech Inc", restaurant: "Pizza Palace", guests: 100, date: "Feb 20, 2024", status: "confirmed" },
  { id: "CR-003", user: "Wedding Party", restaurant: "Sushi House", guests: 200, date: "Mar 5, 2024", status: "pending" }
];
export default function CateringOversight() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Catering Oversight</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">24</p><p className="text-sm text-muted-foreground">Active Requests</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">$89,450</p><p className="text-sm text-muted-foreground">Total Value</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">18</p><p className="text-sm text-muted-foreground">Confirmed</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">156</p><p className="text-sm text-muted-foreground">Completed (YTD)</p></CardContent></Card>
        </div>
        <Card><CardHeader><CardTitle>Catering Requests</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Client</TableHead><TableHead>Restaurant</TableHead><TableHead>Guests</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader><TableBody>{requests.map((r) => (<TableRow key={r.id}><TableCell className="font-mono">{r.id}</TableCell><TableCell>{r.user}</TableCell><TableCell>{r.restaurant}</TableCell><TableCell>{r.guests}</TableCell><TableCell>{r.date}</TableCell><TableCell><Badge>{r.status}</Badge></TableCell><TableCell><Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button></TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
      </div>
    </AdminLayout>
  );
}
