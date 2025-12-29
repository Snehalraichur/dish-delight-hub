import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Share2, BarChart3, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function DealCreationSuccess() {
  const navigate = useNavigate();

  return (
    <RestaurantLayout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-8 pb-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </motion.div>

            <h1 className="text-2xl font-bold mb-2">Deal Created!</h1>
            <p className="text-muted-foreground mb-6">
              Your deal is now live and visible to users. Track its performance in the analytics dashboard.
            </p>

            <div className="bg-muted rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold mb-2">20% Off Lunch Special</h3>
              <p className="text-sm text-muted-foreground">
                Valid until Jan 31, 2024 • Max 100 redemptions
              </p>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={() => navigate("/restaurant/deals/analytics")}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/restaurant/deals")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Another Deal
              </Button>
              <Button 
                variant="ghost" 
                className="w-full"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Deal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </RestaurantLayout>
  );
}
