import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Search, Filter, AlertTriangle, Eye, Shield, TrendingUp } from "lucide-react";

const fraudCases = [
  { id: "FR-001", type: "Multi-Account Redemption", user: "john_doe", severity: "high", status: "investigating", date: "2024-01-15", amount: "$245" },
  { id: "FR-002", type: "Fake Reviews", user: "review_bot_123", severity: "critical", status: "confirmed", date: "2024-01-14", amount: "N/A" },
  { id: "FR-003", type: "Promo Abuse", user: "deal_hunter", severity: "medium", status: "investigating", date: "2024-01-13", amount: "$89" },
  { id: "FR-004", type: "Chargeback Pattern", user: "suspicious_user", severity: "high", status: "pending", date: "2024-01-12", amount: "$156" },
  { id: "FR-005", type: "Location Spoofing", user: "geo_spoofer", severity: "medium", status: "resolved", date: "2024-01-10", amount: "$45" }
];

export default function FraudDetection() {
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Fraud Detection</h1>
            <p className="text-muted-foreground">Monitor and investigate suspicious activities</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-red-500/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Active Cases</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-muted-foreground">Under Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">$4,250</p>
                  <p className="text-sm text-muted-foreground">Prevented Loss</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">-23%</p>
                  <p className="text-sm text-muted-foreground">vs Last Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search cases..." className="pl-9" />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cases Table */}
        <Card>
          <CardHeader>
            <CardTitle>Fraud Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fraudCases.map((case_) => (
                  <TableRow key={case_.id}>
                    <TableCell className="font-mono">{case_.id}</TableCell>
                    <TableCell>{case_.type}</TableCell>
                    <TableCell>@{case_.user}</TableCell>
                    <TableCell>
                      <Badge variant={
                        case_.severity === "critical" ? "destructive" :
                        case_.severity === "high" ? "default" : "secondary"
                      }>
                        {case_.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{case_.status}</Badge>
                    </TableCell>
                    <TableCell>{case_.amount}</TableCell>
                    <TableCell className="text-muted-foreground">{case_.date}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => navigate(`/admin/fraud/${case_.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
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
