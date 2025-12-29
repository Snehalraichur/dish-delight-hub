import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flag, Plus } from "lucide-react";
const flags = [
  { name: "new_search_ui", description: "New search interface with filters", enabled: true, users: "100%" },
  { name: "ai_recommendations", description: "AI-powered restaurant recommendations", enabled: true, users: "50%" },
  { name: "dark_mode", description: "Dark mode theme option", enabled: true, users: "100%" },
  { name: "video_posts", description: "Allow video uploads in posts", enabled: false, users: "0%" },
  { name: "group_ordering", description: "Group ordering for catering", enabled: false, users: "0%" },
  { name: "new_checkout", description: "Redesigned checkout flow", enabled: true, users: "25%" }
];
export default function FeatureFlags() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Feature Flags</h1><Button><Plus className="h-4 w-4 mr-2" />Add Flag</Button></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold">6</p><p className="text-sm text-muted-foreground">Total Flags</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold text-green-600">4</p><p className="text-sm text-muted-foreground">Enabled</p></CardContent></Card>
          <Card><CardContent className="pt-6"><p className="text-2xl font-bold text-muted-foreground">2</p><p className="text-sm text-muted-foreground">Disabled</p></CardContent></Card>
        </div>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><Flag className="h-5 w-5" />Feature Flags</CardTitle></CardHeader><CardContent className="space-y-4">
          {flags.map((flag) => (<div key={flag.name} className="flex items-center justify-between p-4 rounded-lg border border-border"><div className="flex-1"><div className="flex items-center gap-2 mb-1"><code className="text-sm font-mono bg-muted px-2 py-0.5 rounded">{flag.name}</code><Badge variant={flag.enabled ? "default" : "secondary"}>{flag.users}</Badge></div><p className="text-sm text-muted-foreground">{flag.description}</p></div><Switch defaultChecked={flag.enabled} /></div>))}
        </CardContent></Card>
      </div>
    </AdminLayout>
  );
}
