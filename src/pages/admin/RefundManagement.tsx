import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, RotateCcw, DollarSign, Clock, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const refunds = [
  { id: "RF-001", user: "john_doe", amount: 45.00, reason: "Deal not honored", status: "pending", date: "Jan 15, 2024" },
  { id: "RF-002", user: "jane_smith", amount: 89.00, reason: "Event cancelled", status: "approved", date: "Jan 14, 2024" },
  { id: "RF-003", user: "mike_j", amount: 25.00, reason: "Duplicate charge", status: "pending", date: "Jan 13, 2024" },
  { id: "RF-004", user: "sarah_w", amount: 120.00, reason: "Service issue", status: "rejected", date: "Jan 12, 2024" }
];

export default function RefundManagement() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div><h1 className="text-2xl font-bold">Refund Management</h1></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">8</p><p className="text-sm text-muted-foreground">Pending</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">$456</p><p className="text-sm text-muted-foreground">Pending Amount</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">45</p><p className="text-sm text-muted-foreground">Approved (Month)</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">$2,340</p><p className="text-sm text-muted-foreground">Refunded (Month)</p></CardContent></Card>
        </div>
        <Card>
          <CardHeader><CardTitle>Refund Requests</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>ID</TableHead><TableHead>User</TableHead><TableHead>Amount</TableHead><TableHead>Reason</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>
                {refunds.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono">{r.id}</TableCell>
                    <TableCell>@{r.user}</TableCell>
                    <TableCell>${r.amount}</TableCell>
                    <TableCell>{r.reason}</TableCell>
                    <TableCell><Badge variant={r.status === "approved" ? "default" : r.status === "rejected" ? "destructive" : "secondary"}>{r.status}</Badge></TableCell>
                    <TableCell>{r.date}</TableCell>
                    <TableCell><Button size="sm" variant="outline">Review</Button></TableCell>
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
