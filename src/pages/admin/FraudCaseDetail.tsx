import { AdminLayout } from "@/components/layouts/AdminLayout";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronLeft, AlertTriangle, User, Calendar, MapPin, 
  DollarSign, Clock, CheckCircle, XCircle, FileText 
} from "lucide-react";

export default function FraudCaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Case #{id || "FR-001"}</h1>
              <p className="text-muted-foreground">Multi-Account Redemption</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-red-600">
              <XCircle className="h-4 w-4 mr-2" />
              Mark as Fraud
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="h-4 w-4 mr-2" />
              Clear Case
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Case Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Case Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className="mt-1">Investigating</Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Severity</p>
                    <Badge variant="destructive" className="mt-1">High</Badge>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Potential Loss</p>
                    <p className="text-xl font-bold text-red-500 mt-1">$245.00</p>
                  </div>
                  <div className="p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">Reported</p>
                    <p className="font-medium mt-1">Jan 15, 2024</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-border">
                  <h4 className="font-semibold mb-2">Detection Details</h4>
                  <p className="text-muted-foreground text-sm">
                    System detected multiple accounts redeeming the same deal within a 15-minute window 
                    from the same device fingerprint. The accounts appear to be linked based on:
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>Same device ID across 3 accounts</li>
                    <li>Overlapping IP addresses</li>
                    <li>Similar registration patterns</li>
                    <li>Sequential email addresses (user1, user2, user3@...)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Evidence Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Evidence Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "2:34 PM", action: "Account 'john_doe' redeemed deal #D-4521", type: "redemption" },
                    { time: "2:36 PM", action: "Account 'john_doe2' redeemed same deal from same device", type: "flag" },
                    { time: "2:38 PM", action: "Account 'johnny_d' attempted redemption - blocked", type: "blocked" },
                    { time: "2:40 PM", action: "Fraud detection system flagged pattern", type: "system" },
                    { time: "3:15 PM", action: "Case assigned to admin team", type: "admin" }
                  ].map((event, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="text-sm text-muted-foreground w-20">{event.time}</div>
                      <div className={`h-3 w-3 rounded-full mt-1.5 ${
                        event.type === "flag" ? "bg-red-500" :
                        event.type === "blocked" ? "bg-yellow-500" :
                        event.type === "system" ? "bg-blue-500" :
                        "bg-muted-foreground"
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm">{event.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Admin Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Admin Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea placeholder="Add investigation notes..." rows={4} />
                <Button>Add Note</Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Info */}
            <Card>
              <CardHeader>
                <CardTitle>Primary Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>john_doe</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined Dec 2023</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>New York, NY</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>$567 total redemptions</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View User Profile
                </Button>
              </CardContent>
            </Card>

            {/* Linked Accounts */}
            <Card>
              <CardHeader>
                <CardTitle>Linked Accounts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {["john_doe2", "johnny_d", "jd_foodie"].map((account) => (
                  <div key={account} className="flex items-center justify-between p-2 rounded-lg bg-muted">
                    <span>@{account}</span>
                    <Badge variant="destructive">Suspended</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Suspend All Linked Accounts
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Reverse Fraudulent Transactions
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Block Device Fingerprint
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Send Warning Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
