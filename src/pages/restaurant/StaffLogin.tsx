import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat, Eye, EyeOff } from "lucide-react";

export default function StaffLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-orange-500/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <ChefHat className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Staff Login</CardTitle>
          <CardDescription>
            Enter your staff credentials to access the POS system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Restaurant Code</Label>
            <Input placeholder="Enter restaurant code" />
          </div>
          <div className="space-y-2">
            <Label>Staff PIN</Label>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"}
                placeholder="Enter your 4-digit PIN" 
                maxLength={4}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <Button className="w-full" onClick={() => navigate("/restaurant")}>
            Login
          </Button>

          <div className="text-center">
            <Button variant="link" className="text-sm text-muted-foreground">
              Forgot PIN? Contact Manager
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Login as Restaurant Owner
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
