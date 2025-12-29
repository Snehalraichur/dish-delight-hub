import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Gift, Copy, Share2, CheckCircle, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { UserLayout } from "@/components/layouts/UserLayout";

const InviteFriends = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const referralCode = "FOODIE2024";
  const referralLink = `https://foodapp.com/join?ref=${referralCode}`;

  const stats = {
    totalInvited: 12,
    successfulReferrals: 8,
    pointsEarned: 800,
    nextMilestone: 10,
    milestoneReward: "Free Premium Month"
  };

  const recentReferrals = [
    { name: "Sarah M.", status: "Joined", points: 100, date: "2 days ago" },
    { name: "John D.", status: "Pending", points: 0, date: "3 days ago" },
    { name: "Emily W.", status: "Joined", points: 100, date: "1 week ago" },
  ];

  const rewards = [
    { milestone: 5, reward: "500 Bonus Points", achieved: true },
    { milestone: 10, reward: "Free Premium Month", achieved: false },
    { milestone: 25, reward: "VIP Status", achieved: false },
    { milestone: 50, reward: "$50 Restaurant Credit", achieved: false },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Invite Friends</h1>
        </div>

        {/* Hero Card */}
        <Card className="bg-gradient-to-br from-primary to-orange-500 text-white">
          <CardContent className="p-6 text-center space-y-4">
            <Gift className="h-12 w-12 mx-auto" />
            <h2 className="text-2xl font-bold">Give $10, Get $10</h2>
            <p className="text-white/90">
              Invite friends to join and you'll both receive $10 in food credits when they make their first order!
            </p>
          </CardContent>
        </Card>

        {/* Referral Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.totalInvited}</p>
              <p className="text-xs text-muted-foreground">Invited</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.successfulReferrals}</p>
              <p className="text-xs text-muted-foreground">Joined</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-orange-500">{stats.pointsEarned}</p>
              <p className="text-xs text-muted-foreground">Points Earned</p>
            </CardContent>
          </Card>
        </div>

        {/* Referral Code */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Referral Code</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={referralCode}
                readOnly
                className="text-center text-lg font-mono font-bold bg-muted"
              />
              <Button onClick={handleCopy} variant={copied ? "default" : "outline"}>
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button className="w-full" onClick={handleCopy}>
              <Share2 className="h-4 w-4 mr-2" />
              Share Invite Link
            </Button>
          </CardContent>
        </Card>

        {/* Milestone Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              Milestone Rewards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to next reward</span>
                <span className="font-medium">{stats.successfulReferrals}/{stats.nextMilestone}</span>
              </div>
              <Progress value={(stats.successfulReferrals / stats.nextMilestone) * 100} />
              <p className="text-xs text-muted-foreground text-center">
                {stats.nextMilestone - stats.successfulReferrals} more to unlock: {stats.milestoneReward}
              </p>
            </div>

            <div className="space-y-2">
              {rewards.map((reward) => (
                <div
                  key={reward.milestone}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    reward.achieved ? "bg-green-50 border border-green-200" : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      reward.achieved ? "bg-green-500 text-white" : "bg-muted-foreground/20"
                    }`}>
                      {reward.milestone}
                    </div>
                    <span className={reward.achieved ? "line-through text-muted-foreground" : ""}>
                      {reward.reward}
                    </span>
                  </div>
                  {reward.achieved && <CheckCircle className="h-5 w-5 text-green-500" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Referrals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Recent Referrals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReferrals.map((referral, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{referral.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      <p className="text-xs text-muted-foreground">{referral.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      referral.status === "Joined" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {referral.status}
                    </span>
                    {referral.points > 0 && (
                      <p className="text-xs text-primary mt-1">+{referral.points} pts</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default InviteFriends;
