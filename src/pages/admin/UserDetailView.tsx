import { AdminLayout } from "@/components/layouts/AdminLayout";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  ChevronLeft, Mail, Phone, Calendar, MapPin, Gift, 
  Star, Ban, ShieldCheck, AlertTriangle, Edit2 
} from "lucide-react";

export default function UserDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">User Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">Jane Doe</h2>
                <p className="text-muted-foreground">@jane_foodie</p>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge>Gold Tier</Badge>
                  <Badge variant="secondary">Verified</Badge>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>jane.doe@email.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined Jan 15, 2023</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>New York, NY</span>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button variant="outline" className="flex-1">
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="destructive" className="flex-1">
                  <Ban className="h-4 w-4 mr-1" />
                  Suspend
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl font-bold">2,450</p>
                  <p className="text-sm text-muted-foreground">Points</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-sm text-muted-foreground">Deals Redeemed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl font-bold">123</p>
                  <p className="text-sm text-muted-foreground">Posts</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl font-bold">15</p>
                  <p className="text-sm text-muted-foreground">Streak Days</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="activity">
              <TabsList>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="flags">Flags</TabsTrigger>
              </TabsList>

              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardContent className="p-4 space-y-4">
                    {[
                      { action: "Redeemed deal at The Spice Garden", time: "2 hours ago", icon: Gift },
                      { action: "Posted a photo review", time: "5 hours ago", icon: Star },
                      { action: "Earned 50 points for referral", time: "1 day ago", icon: ShieldCheck },
                      { action: "Flagged for suspicious activity", time: "3 days ago", icon: AlertTriangle }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.action}</p>
                          <p className="text-sm text-muted-foreground">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="redemptions" className="mt-4">
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Deal</TableHead>
                          <TableHead>Restaurant</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[1, 2, 3].map((i) => (
                          <TableRow key={i}>
                            <TableCell>20% Off Lunch</TableCell>
                            <TableCell>The Spice Garden</TableCell>
                            <TableCell>Jan 15, 2024</TableCell>
                            <TableCell><Badge className="bg-green-500">Completed</Badge></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="posts" className="mt-4">
                <Card>
                  <CardContent className="p-4 text-center text-muted-foreground">
                    User posts will be displayed here.
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="flags" className="mt-4">
                <Card>
                  <CardContent className="p-4 text-center text-muted-foreground">
                    No active flags for this user.
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
