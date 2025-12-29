import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, MapPin, Users, Building } from "lucide-react";
const cities = [
  { name: "New York", restaurants: 156, users: 12400, status: "active", launched: "Jan 2023" },
  { name: "Los Angeles", restaurants: 98, users: 8900, status: "active", launched: "Mar 2023" },
  { name: "Chicago", restaurants: 67, users: 5600, status: "active", launched: "Jun 2023" },
  { name: "Miami", restaurants: 12, users: 890, status: "launching", launched: "Feb 2024" }
];
export default function CityLaunchManager() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">City Launch Manager</h1><Button><Plus className="h-4 w-4 mr-2" />Add City</Button></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">4</p><p className="text-sm text-muted-foreground">Active Cities</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">333</p><p className="text-sm text-muted-foreground">Total Restaurants</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">27,790</p><p className="text-sm text-muted-foreground">Total Users</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">1</p><p className="text-sm text-muted-foreground">Launching Soon</p></CardContent></Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{cities.map((city) => (
          <Card key={city.name}><CardContent className="pt-6"><div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /><h3 className="text-lg font-semibold">{city.name}</h3></div><Badge variant={city.status === "active" ? "default" : "secondary"}>{city.status}</Badge></div><div className="grid grid-cols-2 gap-4 text-sm"><div className="flex items-center gap-2"><Building className="h-4 w-4 text-muted-foreground" /><span>{city.restaurants} restaurants</span></div><div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /><span>{city.users.toLocaleString()} users</span></div></div><p className="text-sm text-muted-foreground mt-2">Launched: {city.launched}</p></CardContent></Card>
        ))}</div>
      </div>
    </AdminLayout>
  );
}
