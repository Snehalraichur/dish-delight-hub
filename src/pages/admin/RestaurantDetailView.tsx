import { AdminLayout } from "@/components/layouts/AdminLayout";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft, MapPin, Phone, Mail, Globe, Star, 
  DollarSign, Gift, Users, Edit2, Ban, CheckCircle 
} from "lucide-react";

export default function RestaurantDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Restaurant Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Restaurant Profile */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200" />
                  <AvatarFallback>SG</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">The Spice Garden</h2>
                <p className="text-muted-foreground">Indian, Asian Fusion</p>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  <Badge variant="secondary">Pro Plan</Badge>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>123 Main Street, Downtown</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>contact@spicegarden.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span>spicegarden.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>4.8 (251 reviews)</span>
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

          {/* Stats and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl font-bold">$18,420</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl font-bold">1,248</p>
                  <p className="text-sm text-muted-foreground">Redemptions</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-muted-foreground">Active Deals</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <p className="text-2xl font-bold">$1,845</p>
                  <p className="text-sm text-muted-foreground">Commission</p>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="deals">Deals</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold">Pro Plan</p>
                        <p className="text-sm text-muted-foreground">$99/month • Renews Feb 1</p>
                      </div>
                      <Badge className="bg-green-500">Active</Badge>
                    </div>
                    <Progress value={75} />
                    <p className="text-sm text-muted-foreground mt-2">75% of deal limit used</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Owner Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span>John Smith</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email</span>
                      <span>john@spicegarden.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone</span>
                      <span>+1 (555) 987-6543</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Joined</span>
                      <span>Jan 15, 2023</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="deals" className="mt-4">
                <Card>
                  <CardContent className="p-4 text-center text-muted-foreground">
                    Active deals and analytics will be displayed here.
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="mt-4">
                <Card>
                  <CardContent className="p-4 text-center text-muted-foreground">
                    Billing history and invoices will be displayed here.
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="support" className="mt-4">
                <Card>
                  <CardContent className="p-4 text-center text-muted-foreground">
                    Support tickets will be displayed here.
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
