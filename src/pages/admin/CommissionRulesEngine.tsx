import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Percent, Plus, Edit2, Trash2, Calculator } from "lucide-react";

const commissionRules = [
  { id: "1", name: "Standard Deal Redemption", type: "deal", rate: 8, active: true, conditions: "All deals" },
  { id: "2", name: "Premium Restaurant Discount", type: "deal", rate: 5, active: true, conditions: "Pro+ plans" },
  { id: "3", name: "Catering Orders", type: "catering", rate: 5, active: true, conditions: "Orders > $200" },
  { id: "4", name: "Event Tickets", type: "event", rate: 10, active: true, conditions: "All ticket sales" },
  { id: "5", name: "First Month Bonus", type: "promotional", rate: 0, active: false, conditions: "New restaurants" }
];

export default function CommissionRulesEngine() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Commission Rules Engine</h1>
            <p className="text-muted-foreground">Configure platform commission rates</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">This Month</p>
              <p className="text-2xl font-bold">$24,580</p>
              <p className="text-sm text-green-600">+12% vs last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Avg Commission Rate</p>
              <p className="text-2xl font-bold">7.2%</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Active Rules</p>
              <p className="text-2xl font-bold">4</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Transactions</p>
              <p className="text-2xl font-bold">12,456</p>
            </CardContent>
          </Card>
        </div>

        {/* Commission Calculator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Commission Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4">
              <div className="flex-1 space-y-2">
                <label className="text-sm">Transaction Amount</label>
                <Input type="number" placeholder="100.00" />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-sm">Transaction Type</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                  <option>Deal Redemption</option>
                  <option>Catering Order</option>
                  <option>Event Ticket</option>
                </select>
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-sm">Restaurant Plan</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                  <option>Basic</option>
                  <option>Pro</option>
                  <option>Enterprise</option>
                </select>
              </div>
              <Button>Calculate</Button>
              <div className="text-center p-4 bg-primary/10 rounded-lg min-w-[120px]">
                <p className="text-sm text-muted-foreground">Commission</p>
                <p className="text-xl font-bold text-primary">$8.00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rules Table */}
        <Card>
          <CardHeader>
            <CardTitle>Commission Rules</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rule Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Conditions</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissionRules.map((rule) => (
                  <TableRow key={rule.id}>
                    <TableCell className="font-medium">{rule.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{rule.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Percent className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">{rule.rate}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{rule.conditions}</TableCell>
                    <TableCell>
                      <Switch defaultChecked={rule.active} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Default Rate Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Default Rate Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span>Deal Redemption Base Rate</span>
                <span className="font-semibold">8%</span>
              </div>
              <Slider defaultValue={[8]} max={20} step={0.5} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Catering Base Rate</span>
                <span className="font-semibold">5%</span>
              </div>
              <Slider defaultValue={[5]} max={20} step={0.5} />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span>Event Ticket Base Rate</span>
                <span className="font-semibold">10%</span>
              </div>
              <Slider defaultValue={[10]} max={20} step={0.5} />
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
