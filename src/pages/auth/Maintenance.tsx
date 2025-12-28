import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, RefreshCw, Twitter, Bell } from 'lucide-react';

const Maintenance = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
            <Wrench className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">We'll Be Right Back</CardTitle>
          <CardDescription className="text-base">
            We're performing scheduled maintenance to improve your experience. 
            This shouldn't take long.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated downtime:</span>
              <span className="font-medium text-foreground">~30 minutes</span>
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-2/3 animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={handleRefresh} variant="default" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Page
            </Button>
            <Button variant="outline" className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              Notify Me When Ready
            </Button>
            <Button variant="ghost" className="w-full">
              <Twitter className="h-4 w-4 mr-2" />
              Follow Updates on Twitter
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">
            Need help? Email us at support@foodie.app
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Maintenance;
