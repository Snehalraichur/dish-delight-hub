import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Edit2, CreditCard, DollarSign, Users } from "lucide-react";

const plans = [
  { id: "1", name: "Basic", price: 0, restaurants: 245, features: "5 deals, Basic analytics", status: "active" },
  { id: "2", name: "Pro", price: 99, restaurants: 156, features: "Unlimited deals, Advanced analytics, Priority support", status: "active" },
  { id: "3", name: "Enterprise", price: 299, restaurants: 34, features: "All Pro features + Custom integrations, Dedicated manager", status: "active" },
  { id: "4", name: "Starter (Legacy)", price: 49, restaurants: 12, features: "10 deals, Basic analytics", status: "discontinued" }
];

export default function SubscriptionManagement() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Subscription Management</h1>
            <p className="text-muted-foreground">Manage restaurant subscription plans</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Plan
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">447</p>
                  <p className="text-sm text-muted-foreground">Total Subscribers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">$28,450</p>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">$63.67</p>
                  <p className="text-sm text-muted-foreground">Avg. Revenue per User</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-2xl font-bold">4.2%</p>
              <p className="text-sm text-muted-foreground">Monthly Churn Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Plans Table */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Subscribers</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>
                      {plan.price === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        <span>${plan.price}/mo</span>
                      )}
                    </TableCell>
                    <TableCell>{plan.restaurants}</TableCell>
                    <TableCell className="text-muted-foreground max-w-[300px] truncate">
                      {plan.features}
                    </TableCell>
                    <TableCell>
                      <Badge variant={plan.status === "active" ? "default" : "secondary"}>
                        {plan.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Subscription Changes */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { restaurant: "The Spice Garden", action: "Upgraded", from: "Basic", to: "Pro", date: "2 hours ago" },
                { restaurant: "Pizza Palace", action: "Downgraded", from: "Pro", to: "Basic", date: "5 hours ago" },
                { restaurant: "Sushi House", action: "New Subscription", from: "", to: "Pro", date: "1 day ago" },
                { restaurant: "Taco Town", action: "Cancelled", from: "Basic", to: "", date: "2 days ago" }
              ].map((change, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <div>
                    <p className="font-medium">{change.restaurant}</p>
                    <p className="text-sm text-muted-foreground">
                      {change.action} {change.from && `from ${change.from}`} {change.to && `to ${change.to}`}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{change.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
