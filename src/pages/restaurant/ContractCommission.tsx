import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileText, Download, AlertCircle, CheckCircle, Percent, Calendar } from "lucide-react";

export default function ContractCommission() {
  return (
    <RestaurantLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Contract & Commission</h1>
            <p className="text-muted-foreground">View your partnership agreement details</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Contract
          </Button>
        </div>

        {/* Contract Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Contract Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold">Standard Partnership Agreement</h3>
                  <Badge className="bg-green-500">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <p className="text-muted-foreground">Contract ID: CNT-2024-001234</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-muted">
              <div>
                <p className="text-sm text-muted-foreground">Start Date</p>
                <p className="font-medium">January 1, 2024</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">End Date</p>
                <p className="font-medium">December 31, 2024</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Auto-Renewal</p>
                <p className="font-medium text-green-600">Enabled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commission Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Percent className="h-5 w-5" />
              Commission Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Deal Redemptions</h4>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-primary">8%</span>
                  <span className="text-muted-foreground pb-1">per transaction</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Commission on the discounted amount when users redeem deals
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Catering Orders</h4>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-primary">5%</span>
                  <span className="text-muted-foreground pb-1">per order</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Commission on catering orders placed through the platform
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Event Tickets</h4>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-primary">10%</span>
                  <span className="text-muted-foreground pb-1">per ticket</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Commission on event tickets sold through your profile
                </p>
              </div>

              <div className="p-4 rounded-lg border border-border">
                <h4 className="font-semibold mb-2">Ad Spend</h4>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-primary">0%</span>
                  <span className="text-muted-foreground pb-1">no markup</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  No additional commission on advertising spend
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* This Month's Commission */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              This Month's Commission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Deal Redemptions</p>
                <p className="text-xl font-bold">$124.80</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Catering</p>
                <p className="text-xl font-bold">$89.50</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground">Events</p>
                <p className="text-xl font-bold">$45.00</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-primary/10">
                <p className="text-sm text-primary">Total Commission</p>
                <p className="text-xl font-bold text-primary">$259.30</p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800 dark:text-yellow-200">Commission Deducted from Payouts</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Commission fees are automatically deducted from your monthly payouts. View your net earnings in the Payouts section.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Terms Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Key Terms</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Payouts processed weekly on Fridays for the previous week's earnings</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Minimum payout threshold: $50</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>30-day notice required for contract termination</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Commission rates locked for contract duration</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </RestaurantLayout>
  );
}
