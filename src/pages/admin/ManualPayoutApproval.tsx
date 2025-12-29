import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, DollarSign, Clock, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

const payouts = [
  { id: "PO-001", restaurant: "The Spice Garden", amount: 1245.50, status: "pending", requestDate: "Jan 15, 2024", method: "Bank Transfer" },
  { id: "PO-002", restaurant: "Pizza Palace", amount: 892.00, status: "pending", requestDate: "Jan 15, 2024", method: "Bank Transfer" },
  { id: "PO-003", restaurant: "Sushi House", amount: 2156.75, status: "pending", requestDate: "Jan 14, 2024", method: "PayPal" },
  { id: "PO-004", restaurant: "Taco Town", amount: 567.25, status: "flagged", requestDate: "Jan 14, 2024", method: "Bank Transfer" },
  { id: "PO-005", restaurant: "Burger Barn", amount: 1890.00, status: "pending", requestDate: "Jan 13, 2024", method: "Bank Transfer" }
];

export default function ManualPayoutApproval() {
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([]);

  const togglePayout = (id: string) => {
    setSelectedPayouts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selectedPayouts.length === payouts.length) {
      setSelectedPayouts([]);
    } else {
      setSelectedPayouts(payouts.map(p => p.id));
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Manual Payout Approval</h1>
            <p className="text-muted-foreground">Review and approve restaurant payouts</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">$8,751.50</p>
                  <p className="text-sm text-muted-foreground">Total Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-sm text-muted-foreground">Approved This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Flagged</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Actions */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 flex-wrap items-center">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search restaurants..." className="pl-9" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <div className="flex-1" />
              <Button 
                variant="outline" 
                disabled={selectedPayouts.length === 0}
                className="text-red-600"
              >
                Reject Selected ({selectedPayouts.length})
              </Button>
              <Button 
                disabled={selectedPayouts.length === 0}
                className="bg-green-600 hover:bg-green-700"
              >
                Approve Selected ({selectedPayouts.length})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payouts Table */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedPayouts.length === payouts.length}
                      onCheckedChange={toggleAll}
                    />
                  </TableHead>
                  <TableHead>Payout ID</TableHead>
                  <TableHead>Restaurant</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Request Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedPayouts.includes(payout.id)}
                        onCheckedChange={() => togglePayout(payout.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono">{payout.id}</TableCell>
                    <TableCell className="font-medium">{payout.restaurant}</TableCell>
                    <TableCell className="font-semibold">${payout.amount.toFixed(2)}</TableCell>
                    <TableCell>{payout.method}</TableCell>
                    <TableCell className="text-muted-foreground">{payout.requestDate}</TableCell>
                    <TableCell>
                      <Badge variant={payout.status === "flagged" ? "destructive" : "secondary"}>
                        {payout.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600">
                          Reject
                        </Button>
                      </div>
                    </TableCell>
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
