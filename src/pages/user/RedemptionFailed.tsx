import { useNavigate } from "react-router-dom";
import { XCircle, RefreshCw, HelpCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserLayout } from "@/components/layouts/UserLayout";

const RedemptionFailed = () => {
  const navigate = useNavigate();

  const error = {
    code: "DEAL_EXPIRED",
    message: "This deal has expired",
    details: "The deal you're trying to redeem is no longer valid. It expired on December 25, 2024."
  };

  const suggestions = [
    "Check your wallet for other active deals",
    "Browse the restaurant's current offers",
    "Contact support if you believe this is an error"
  ];

  return (
    <UserLayout>
      <div className="max-w-lg mx-auto p-4 min-h-[80vh] flex flex-col items-center justify-center space-y-8">
        {/* Error Animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse" />
          <div className="relative bg-red-100 rounded-full p-6">
            <XCircle className="h-20 w-20 text-red-500" />
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-red-700">Redemption Failed</h1>
          <p className="text-muted-foreground">{error.message}</p>
        </div>

        {/* Error Details */}
        <Card className="w-full border-red-200 bg-red-50">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-700">What happened?</p>
                <p className="text-sm text-red-600 mt-1">{error.details}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card className="w-full">
          <CardContent className="p-6 space-y-4">
            <p className="font-medium">What you can do:</p>
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <Button className="w-full" onClick={() => navigate(-1)}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => navigate("/wallet")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              My Wallet
            </Button>
            <Button variant="outline" onClick={() => navigate("/support")}>
              <HelpCircle className="h-4 w-4 mr-2" />
              Get Help
            </Button>
          </div>
          <Button variant="ghost" className="w-full" onClick={() => navigate("/feed")}>
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </UserLayout>
  );
};

export default RedemptionFailed;
