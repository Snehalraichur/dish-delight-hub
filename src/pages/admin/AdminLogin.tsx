import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
          <CardDescription className="text-slate-400">
            Access the SnapDish administration panel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-slate-300">Email</Label>
            <Input 
              type="email" 
              placeholder="admin@snapdish.com"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-300">Password</Label>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 text-slate-400 hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          
          <Button className="w-full" onClick={() => navigate("/admin")}>
            Login to Admin Panel
          </Button>

          <div className="text-center">
            <Button variant="link" className="text-sm text-slate-400">
              Forgot Password?
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
