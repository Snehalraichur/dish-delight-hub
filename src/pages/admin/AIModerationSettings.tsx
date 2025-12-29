import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Bot, Shield, AlertTriangle, Check, Settings, RefreshCw } from "lucide-react";

const moderationRules = [
  { id: "1", name: "Spam Detection", description: "Automatically detect and flag spam content", enabled: true, sensitivity: 75 },
  { id: "2", name: "Profanity Filter", description: "Filter out inappropriate language", enabled: true, sensitivity: 90 },
  { id: "3", name: "Image Analysis", description: "Scan images for inappropriate content", enabled: true, sensitivity: 80 },
  { id: "4", name: "Fake Review Detection", description: "Identify potentially fake or incentivized reviews", enabled: false, sensitivity: 60 },
  { id: "5", name: "Duplicate Content", description: "Flag duplicate or copied content", enabled: true, sensitivity: 70 }
];

export default function AIModerationSettings() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Moderation Settings</h1>
            <p className="text-muted-foreground">Configure automated content moderation</p>
          </div>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retrain Model
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Check className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">12,456</p>
                  <p className="text-sm text-muted-foreground">Auto-Approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">234</p>
                  <p className="text-sm text-muted-foreground">Flagged</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">89</p>
                  <p className="text-sm text-muted-foreground">Auto-Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">98.2%</p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Moderation Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Moderation Rules</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {moderationRules.map((rule) => (
              <div key={rule.id} className="p-4 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{rule.name}</h3>
                      {rule.enabled && <Badge variant="secondary">Active</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{rule.description}</p>
                  </div>
                  <Switch defaultChecked={rule.enabled} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sensitivity</span>
                    <span>{rule.sensitivity}%</span>
                  </div>
                  <Slider defaultValue={[rule.sensitivity]} max={100} step={5} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Less Strict</span>
                    <span>More Strict</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Global Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Global Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
              <div>
                <p className="font-medium">Auto-approve low-risk content</p>
                <p className="text-sm text-muted-foreground">Content with confidence score above 95% will be auto-approved</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
              <div>
                <p className="font-medium">Notify admins on high-risk flags</p>
                <p className="text-sm text-muted-foreground">Send email alerts for content flagged as high risk</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
              <div>
                <p className="font-medium">Shadow ban repeat offenders</p>
                <p className="text-sm text-muted-foreground">Automatically shadow ban users with 3+ violations</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
