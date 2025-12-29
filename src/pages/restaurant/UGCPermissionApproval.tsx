import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Eye, Clock, Megaphone } from "lucide-react";

const pendingContent = [
  {
    id: "1",
    user: { name: "Jane Foodie", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", handle: "@jane_foodie" },
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400",
    caption: "Amazing butter chicken at your restaurant! 🔥",
    likes: 234,
    submittedAt: "2 hours ago"
  },
  {
    id: "2",
    user: { name: "Mike Eats", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", handle: "@mike_eats" },
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    caption: "Best pizza in town, hands down!",
    likes: 189,
    submittedAt: "5 hours ago"
  },
  {
    id: "3",
    user: { name: "Sarah Tastes", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", handle: "@sarah_tastes" },
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
    caption: "Weekend brunch goals achieved ✨",
    likes: 312,
    submittedAt: "1 day ago"
  }
];

export default function UGCPermissionApproval() {
  return (
    <RestaurantLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Content Permissions</h1>
            <p className="text-muted-foreground">Review and approve user-generated content</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <X className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Megaphone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">23</p>
                <p className="text-sm text-muted-foreground">Boosted</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <Tabs defaultValue="pending">
          <TabsList>
            <TabsTrigger value="pending">Pending (12)</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingContent.map((content) => (
                <Card key={content.id} className="overflow-hidden">
                  <div className="aspect-square">
                    <img 
                      src={content.image} 
                      alt="UGC"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={content.user.avatar} />
                        <AvatarFallback>{content.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{content.user.name}</p>
                        <p className="text-xs text-muted-foreground">{content.user.handle}</p>
                      </div>
                    </div>
                    <p className="text-sm mb-2">{content.caption}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span>{content.likes} likes</span>
                      <span>{content.submittedAt}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-600 hover:bg-red-50">
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-4">
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No approved content to display yet.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected" className="mt-4">
            <Card>
              <CardContent className="p-8 text-center text-muted-foreground">
                No rejected content to display.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RestaurantLayout>
  );
}
