import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, TrendingUp, Calendar, Download, 
  CheckCircle, Clock, ArrowUpRight, Wallet 
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const earningsData = [
  { month: "Aug", earnings: 2100 },
  { month: "Sep", earnings: 2450 },
  { month: "Oct", earnings: 2890 },
  { month: "Nov", earnings: 3200 },
  { month: "Dec", earnings: 3680 },
  { month: "Jan", earnings: 3120 }
];

const payouts = [
  { id: "PO-001", date: "Jan 12, 2024", amount: "$842.50", status: "completed", method: "Bank Transfer" },
  { id: "PO-002", date: "Jan 5, 2024", amount: "$756.20", status: "completed", method: "Bank Transfer" },
  { id: "PO-003", date: "Dec 29, 2023", amount: "$923.80", status: "completed", method: "Bank Transfer" },
  { id: "PO-004", date: "Dec 22, 2023", amount: "$687.40", status: "completed", method: "Bank Transfer" }
];

export default function PayoutsEarnings() {
  return (
    <RestaurantLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Payouts & Earnings</h1>
            <p className="text-muted-foreground">Track your revenue and payouts</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Available Balance</p>
                  <p className="text-3xl font-bold">$1,248.50</p>
                </div>
                <Wallet className="h-8 w-8 opacity-80" />
              </div>
              <Button variant="secondary" size="sm" className="mt-4 w-full">
                Withdraw
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">$3,120</p>
                </div>
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">$456.20</p>
                </div>
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Clears in 3 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Paid Out</p>
                  <p className="text-2xl font-bold">$18,440</p>
                </div>
                <DollarSign className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">Since Jan 2023</p>
            </CardContent>
          </Card>
        </div>

        {/* Earnings Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Earnings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Earnings Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>This Month's Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Deal Redemptions</span>
                <span className="font-medium">$1,560</span>
              </div>
              <Progress value={50} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Catering Orders</span>
                <span className="font-medium">$890</span>
              </div>
              <Progress value={29} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Event Sales</span>
                <span className="font-medium">$450</span>
              </div>
              <Progress value={14} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Tips</span>
                <span className="font-medium">$220</span>
              </div>
              <Progress value={7} />
            </div>
          </CardContent>
        </Card>

        {/* Recent Payouts */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payout ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-mono">{payout.id}</TableCell>
                    <TableCell>{payout.date}</TableCell>
                    <TableCell className="font-medium">{payout.amount}</TableCell>
                    <TableCell>{payout.method}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    </TableCell>
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
