import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, Eye, MousePointer, Users, DollarSign,
  ArrowUpRight, Pause, Play
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { hour: "12AM", impressions: 120, clicks: 8 },
  { hour: "4AM", impressions: 45, clicks: 3 },
  { hour: "8AM", impressions: 230, clicks: 18 },
  { hour: "12PM", impressions: 456, clicks: 34 },
  { hour: "4PM", impressions: 389, clicks: 28 },
  { hour: "8PM", impressions: 512, clicks: 42 },
  { hour: "Now", impressions: 234, clicks: 19 }
];

const activeCampaigns = [
  {
    id: "1",
    name: "20% Off Lunch Special",
    status: "active",
    budget: 150,
    spent: 87,
    impressions: 12340,
    clicks: 456,
    conversions: 34
  },
  {
    id: "2",
    name: "Weekend Brunch Promo",
    status: "paused",
    budget: 200,
    spent: 120,
    impressions: 8900,
    clicks: 312,
    conversions: 28
  }
];

export default function BoostPerformance() {
  return (
    <RestaurantLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Boost Performance</h1>
            <p className="text-muted-foreground">Monitor your ad campaign metrics</p>
          </div>
          <Button>Create New Boost</Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Impressions</p>
                  <p className="text-2xl font-bold">21,240</p>
                </div>
                <Eye className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span>+15% from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-bold">768</p>
                </div>
                <MousePointer className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                <span>+8% from yesterday</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Click Rate</p>
                  <p className="text-2xl font-bold">3.6%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
              <Badge variant="secondary" className="mt-2">Above Average</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">$207</p>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">of $350 budget</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="impressions" stroke="hsl(var(--muted-foreground))" name="Impressions" />
                  <Line type="monotone" dataKey="clicks" stroke="hsl(var(--primary))" strokeWidth={2} name="Clicks" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Active Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{campaign.name}</h3>
                      <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                        {campaign.status}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    {campaign.status === "active" ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Budget Used</span>
                    <span>${campaign.spent} / ${campaign.budget}</span>
                  </div>
                  <Progress value={(campaign.spent / campaign.budget) * 100} />
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold">{campaign.impressions.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Impressions</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{campaign.clicks}</p>
                    <p className="text-xs text-muted-foreground">Clicks</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{campaign.conversions}</p>
                    <p className="text-xs text-muted-foreground">Conversions</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </RestaurantLayout>
  );
}
