import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Ticket, TrendingUp, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const data = [{ name: "Mon", sales: 45 },{ name: "Tue", sales: 67 },{ name: "Wed", sales: 89 },{ name: "Thu", sales: 56 },{ name: "Fri", sales: 120 },{ name: "Sat", sales: 180 },{ name: "Sun", sales: 95 }];
export default function TicketSalesDashboard() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Ticket Sales Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6"><Ticket className="h-8 w-8 text-primary mb-2" /><p className="text-2xl font-bold">3,456</p><p className="text-sm text-muted-foreground">Total Sold</p></CardContent></Card>
          <Card><CardContent className="pt-6"><DollarSign className="h-8 w-8 text-green-500 mb-2" /><p className="text-2xl font-bold">$45,890</p><p className="text-sm text-muted-foreground">Revenue</p></CardContent></Card>
          <Card><CardContent className="pt-6"><TrendingUp className="h-8 w-8 text-blue-500 mb-2" /><p className="text-2xl font-bold">+23%</p><p className="text-sm text-muted-foreground">vs Last Month</p></CardContent></Card>
          <Card><CardContent className="pt-6"><Users className="h-8 w-8 text-purple-500 mb-2" /><p className="text-2xl font-bold">2,890</p><p className="text-sm text-muted-foreground">Unique Buyers</p></CardContent></Card>
        </div>
        <Card><CardHeader><CardTitle>Daily Sales</CardTitle></CardHeader><CardContent><div className="h-[300px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="sales" fill="hsl(var(--primary))" /></BarChart></ResponsiveContainer></div></CardContent></Card>
      </div>
    </AdminLayout>
  );
}
