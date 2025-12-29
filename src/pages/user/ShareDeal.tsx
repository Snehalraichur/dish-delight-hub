import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Copy, Share2, MessageCircle, Mail, Facebook, Twitter, Link2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import UserLayout from "@/components/layouts/UserLayout";

const ShareDeal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  const deal = {
    id: id || "1",
    title: "20% Off All Pasta Dishes",
    restaurant: "Bella Italia",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400"
  };

  const shareLink = `https://foodapp.com/deal/${deal.id}?ref=share`;

  const shareOptions = [
    { name: "Copy Link", icon: Copy, color: "bg-gray-100 text-gray-700" },
    { name: "Messages", icon: MessageCircle, color: "bg-green-100 text-green-700" },
    { name: "Email", icon: Mail, color: "bg-blue-100 text-blue-700" },
    { name: "Facebook", icon: Facebook, color: "bg-blue-600 text-white" },
    { name: "Twitter", icon: Twitter, color: "bg-sky-400 text-white" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    if (platform === "Copy Link") {
      handleCopy();
    } else {
      toast.success(`Sharing to ${platform}...`);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Share Deal</h1>
        </div>

        {/* Deal Preview */}
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{deal.title}</h3>
                <p className="text-sm text-muted-foreground">{deal.restaurant}</p>
                <p className="text-xs text-primary mt-2">Share and earn 50 bonus points!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Link */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Link2 className="h-5 w-5" />
              Share Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                value={shareLink}
                readOnly
                className="flex-1 bg-muted"
              />
              <Button onClick={handleCopy} variant={copied ? "default" : "outline"}>
                {copied ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Share Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Share via</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {shareOptions.map((option) => (
                <Button
                  key={option.name}
                  variant="ghost"
                  className={`flex flex-col h-auto py-4 ${option.color}`}
                  onClick={() => handleShare(option.name)}
                >
                  <option.icon className="h-6 w-6 mb-2" />
                  <span className="text-xs">{option.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Referral Info */}
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Share2 className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Earn while you share!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  When a friend uses your link and redeems a deal, you both earn 50 bonus points.
                  You've referred 3 friends so far!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </UserLayout>
  );
};

export default ShareDeal;
