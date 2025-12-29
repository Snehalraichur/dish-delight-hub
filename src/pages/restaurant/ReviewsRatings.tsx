import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Star, MessageCircle, ThumbsUp, Flag, TrendingUp } from "lucide-react";

const reviews = [
  { id: "1", user: "Jane F.", rating: 5, comment: "Amazing food and great atmosphere! Will definitely come back.", date: "2 days ago", helpful: 12, replied: true },
  { id: "2", user: "Mike J.", rating: 4, comment: "Good food, slightly slow service but overall a nice experience.", date: "5 days ago", helpful: 8, replied: false },
  { id: "3", user: "Sarah W.", rating: 5, comment: "Best butter chicken in town! The naan was perfectly fluffy.", date: "1 week ago", helpful: 24, replied: true },
  { id: "4", user: "Chris B.", rating: 3, comment: "Food was decent but the portion sizes could be bigger for the price.", date: "2 weeks ago", helpful: 5, replied: true }
];

const ratingDistribution = [
  { stars: 5, count: 156, percentage: 62 },
  { stars: 4, count: 67, percentage: 27 },
  { stars: 3, count: 18, percentage: 7 },
  { stars: 2, count: 7, percentage: 3 },
  { stars: 1, count: 3, percentage: 1 }
];

export default function ReviewsRatings() {
  return (
    <RestaurantLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Reviews & Ratings</h1>
            <p className="text-muted-foreground">Manage customer feedback</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
                <span className="text-3xl font-bold">4.6</span>
              </div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+0.2 this month</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">251</p>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">92%</p>
              <p className="text-sm text-muted-foreground">Response Rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-3xl font-bold">4h</p>
              <p className="text-sm text-muted-foreground">Avg Response Time</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rating Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{item.stars}</span>
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  </div>
                  <Progress value={item.percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-12">{item.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Reviews */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="p-4 rounded-lg border border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{review.user[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-2">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    {review.replied && <Badge variant="secondary">Replied</Badge>}
                  </div>
                  <p className="text-sm mb-3">{review.comment}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {review.helpful} Helpful
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <Flag className="h-4 w-4 mr-1" />
                      Report
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </RestaurantLayout>
  );
}
