import { UserLayout } from "@/components/layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  ChevronLeft, ChevronRight, User, Bell, Lock, 
  Globe, Moon, HelpCircle, FileText, LogOut, Trash2 
} from "lucide-react";

const settingsSections = [
  {
    title: "Account",
    items: [
      { icon: User, label: "Edit Profile", link: "/profile/edit" },
      { icon: Lock, label: "Change Password", link: "/settings/password" },
      { icon: Globe, label: "Language", value: "English" }
    ]
  },
  {
    title: "Preferences",
    items: [
      { icon: Bell, label: "Notifications", link: "/settings/notifications" },
      { icon: Moon, label: "Dark Mode", toggle: true }
    ]
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center", link: "/support" },
      { icon: FileText, label: "Terms of Service", link: "/terms" },
      { icon: FileText, label: "Privacy Policy", link: "/privacy" }
    ]
  }
];

export default function UserSettings() {
  const navigate = useNavigate();

  return (
    <UserLayout>
      <div className="min-h-screen bg-background pb-24">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold text-lg">Settings</h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {settingsSections.map((section) => (
            <Card key={section.title}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {section.items.map((item, index) => (
                  <div 
                    key={item.label}
                    className={`flex items-center justify-between px-4 py-3 ${
                      index !== section.items.length - 1 ? 'border-b border-border' : ''
                    } ${item.link ? 'cursor-pointer hover:bg-muted/50' : ''}`}
                    onClick={() => item.link && navigate(item.link)}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-muted-foreground" />
                      <span>{item.label}</span>
                    </div>
                    {item.toggle ? (
                      <Switch />
                    ) : item.value ? (
                      <span className="text-muted-foreground text-sm">{item.value}</span>
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardContent className="p-0">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10">
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 border-t border-border">
                <Trash2 className="h-5 w-5" />
                <span>Delete Account</span>
              </button>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            SnapDish v1.0.0
          </p>
        </div>
      </div>
    </UserLayout>
  );
}
