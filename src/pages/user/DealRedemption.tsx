import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Tag, Clock, MapPin, QrCode, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { UserLayout } from "@/components/layouts/UserLayout";

const DealRedemption = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [redeemed, setRedeemed] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const deal = {
    id: id || "1",
    title: "20% Off All Pasta Dishes",
    description: "Get 20% off any pasta dish from our menu. Valid for dine-in and takeout orders.",
    restaurant: {
      name: "Bella Italia",
      address: "123 Main Street, Downtown",
      image: "/placeholder.svg"
    },
    discount: "20%",
    minOrder: "$15",
    expiry: "December 31, 2024",
    terms: [
      "Valid for dine-in and takeout only",
      "Cannot be combined with other offers",
      "One redemption per customer per day",
      "Show QR code before ordering"
    ],
    redemptionsLeft: 45,
    maxRedemptions: 100
  };

  const handleRedeem = () => {
    setShowQR(true);
  };

  const handleConfirmRedemption = () => {
    setRedeemed(true);
    toast.success("Deal redeemed successfully!");
    setTimeout(() => {
      navigate("/redemption-success");
    }, 1500);
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Redeem Deal</h1>
        </div>

        {/* Deal Card */}
        <Card className="bg-gradient-to-br from-primary/20 to-orange-100 border-primary/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className="bg-primary text-primary-foreground">{deal.discount} OFF</Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Expires {deal.expiry}
              </Badge>
            </div>
            <CardTitle className="text-2xl mt-4">{deal.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{deal.description}</p>
            
            {/* Restaurant Info */}
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <img
                src={deal.restaurant.image}
                alt={deal.restaurant.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{deal.restaurant.name}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {deal.restaurant.address}
                </p>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Redemptions remaining</span>
                <span className="font-medium">{deal.redemptionsLeft} left</span>
              </div>
              <Progress value={(deal.redemptionsLeft / deal.maxRedemptions) * 100} />
            </div>

            {/* Min Order */}
            {deal.minOrder && (
              <div className="flex items-center gap-2 text-sm">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span>Minimum order: {deal.minOrder}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Terms */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {deal.terms.map((term, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {term}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* QR Code Modal */}
        {showQR && !redeemed && (
          <Card className="border-2 border-primary">
            <CardContent className="p-6 text-center space-y-4">
              <h3 className="text-lg font-semibold">Show this QR code to the cashier</h3>
              <div className="bg-white p-6 rounded-lg inline-block mx-auto">
                <QrCode className="h-48 w-48 mx-auto" />
              </div>
              <p className="text-sm text-muted-foreground">
                Code: DEAL-{deal.id}-{Date.now().toString(36).toUpperCase()}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setShowQR(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleConfirmRedemption}>
                  Confirm Redemption
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Redeemed State */}
        {redeemed && (
          <Card className="border-2 border-green-500 bg-green-50">
            <CardContent className="p-6 text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h3 className="text-xl font-semibold text-green-700">Deal Redeemed!</h3>
              <p className="text-green-600">Enjoy your 20% discount</p>
            </CardContent>
          </Card>
        )}

        {/* Redeem Button */}
        {!showQR && !redeemed && (
          <Button className="w-full h-12 text-lg" onClick={handleRedeem}>
            <QrCode className="h-5 w-5 mr-2" />
            Generate QR Code
          </Button>
        )}

        {/* Warning */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">
            Make sure you're at the restaurant before generating the QR code. The code expires in 15 minutes.
          </p>
        </div>
      </div>
    </UserLayout>
  );
};

export default DealRedemption;
