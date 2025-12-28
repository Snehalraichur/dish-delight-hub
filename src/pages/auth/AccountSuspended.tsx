import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserX, Mail, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const AccountSuspended = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
            <UserX className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Account Suspended</CardTitle>
          <CardDescription className="text-base">
            Your account has been temporarily suspended due to a violation of our 
            community guidelines or terms of service.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-2">What happens next?</p>
            <ul className="list-disc list-inside space-y-1 text-left">
              <li>Our team will review your account</li>
              <li>You'll receive an email with more details</li>
              <li>You can appeal this decision through support</li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-3">
            <Button variant="default" className="w-full">
              <Mail className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button onClick={handleSignOut} variant="outline" className="w-full">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSuspended;
