import { useNavigate } from "react-router-dom";
import { CheckCircle, Share2, Star, Home, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { UserLayout } from "@/components/layouts/UserLayout";

const RedemptionSuccess = () => {
  const navigate = useNavigate();

  const redemption = {
    deal: "20% Off All Pasta Dishes",
    restaurant: "Bella Italia",
    savedAmount: "$8.50",
    pointsEarned: 85,
    newStreak: 5
  };

  const handleShare = () => {
    toast.success("Share link copied!");
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto p-4 min-h-[80vh] flex flex-col items-center justify-center space-y-8">
        {/* Success Animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping" />
          <div className="relative bg-green-100 rounded-full p-6">
            <CheckCircle className="h-20 w-20 text-green-500" />
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-green-700">Redemption Successful!</h1>
          <p className="text-muted-foreground">Your deal has been applied</p>
        </div>

        {/* Summary Card */}
        <Card className="w-full">
          <CardContent className="p-6 space-y-4">
            <div className="text-center pb-4 border-b">
              <p className="text-sm text-muted-foreground">You saved</p>
              <p className="text-4xl font-bold text-primary">{redemption.savedAmount}</p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deal</span>
                <span className="font-medium">{redemption.deal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Restaurant</span>
                <span className="font-medium">{redemption.restaurant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Points Earned</span>
                <span className="font-medium text-primary">+{redemption.pointsEarned} pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Current Streak</span>
                <span className="font-medium text-orange-500">🔥 {redemption.newStreak} days</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating Prompt */}
        <Card className="w-full bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Rate your experience</p>
                <p className="text-sm text-muted-foreground">How was {redemption.restaurant}?</p>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Button key={star} variant="ghost" size="icon" className="h-8 w-8">
                    <Star className="h-5 w-5 text-muted-foreground hover:text-yellow-400 hover:fill-yellow-400" />
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Button className="w-full" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share with Friends
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => navigate("/wallet")}>
              <Wallet className="h-4 w-4 mr-2" />
              My Wallet
            </Button>
            <Button variant="outline" onClick={() => navigate("/feed")}>
              <Home className="h-4 w-4 mr-2" />
              Home Feed
            </Button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default RedemptionSuccess;
