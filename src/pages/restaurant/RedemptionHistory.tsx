import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, CheckCircle, XCircle, Clock } from "lucide-react";

const redemptions = [
  { id: "RD001", customer: "John Doe", deal: "20% Off Lunch", amount: "$24.00", status: "completed", date: "2024-01-15 12:34 PM" },
  { id: "RD002", customer: "Jane Smith", deal: "Free Dessert", amount: "$8.00", status: "completed", date: "2024-01-15 1:22 PM" },
  { id: "RD003", customer: "Mike Johnson", deal: "Buy 1 Get 1", amount: "$32.00", status: "pending", date: "2024-01-15 2:15 PM" },
  { id: "RD004", customer: "Sarah Williams", deal: "20% Off Lunch", amount: "$18.00", status: "failed", date: "2024-01-15 3:45 PM" },
  { id: "RD005", customer: "Chris Brown", deal: "Happy Hour", amount: "$15.00", status: "completed", date: "2024-01-15 5:30 PM" },
  { id: "RD006", customer: "Emily Davis", deal: "Free Dessert", amount: "$10.00", status: "completed", date: "2024-01-15 6:12 PM" },
  { id: "RD007", customer: "David Wilson", deal: "20% Off Lunch", amount: "$28.00", status: "completed", date: "2024-01-15 7:45 PM" }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
    case "pending":
      return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
    case "failed":
      return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function RedemptionHistory() {
  return (
    <RestaurantLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Redemption History</h1>
            <p className="text-muted-foreground">View all deal redemptions</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="text-2xl font-bold">47</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">This Week</p>
              <p className="text-2xl font-bold">312</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">1,248</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">$18,420</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by customer or deal..." className="pl-9" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Redemptions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Deal</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {redemptions.map((redemption) => (
                  <TableRow key={redemption.id}>
                    <TableCell className="font-mono text-sm">{redemption.id}</TableCell>
                    <TableCell>{redemption.customer}</TableCell>
                    <TableCell>{redemption.deal}</TableCell>
                    <TableCell>{redemption.amount}</TableCell>
                    <TableCell>{getStatusBadge(redemption.status)}</TableCell>
                    <TableCell className="text-muted-foreground">{redemption.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </RestaurantLayout>
  );
}
