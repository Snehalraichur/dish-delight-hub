import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Send, Users, Smartphone, Mail } from "lucide-react";
export default function NotificationEngine() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Notification Engine</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6"><Bell className="h-8 w-8 text-primary mb-2" /><p className="text-2xl font-bold">12,456</p><p className="text-sm text-muted-foreground">Sent Today</p></CardContent></Card>
          <Card><CardContent className="pt-6"><Smartphone className="h-8 w-8 text-blue-500 mb-2" /><p className="text-2xl font-bold">89%</p><p className="text-sm text-muted-foreground">Push Open Rate</p></CardContent></Card>
          <Card><CardContent className="pt-6"><Mail className="h-8 w-8 text-green-500 mb-2" /><p className="text-2xl font-bold">45%</p><p className="text-sm text-muted-foreground">Email Open Rate</p></CardContent></Card>
          <Card><CardContent className="pt-6"><Users className="h-8 w-8 text-purple-500 mb-2" /><p className="text-2xl font-bold">27,890</p><p className="text-sm text-muted-foreground">Subscribed Users</p></CardContent></Card>
        </div>
        <Card><CardHeader><CardTitle>Send Notification</CardTitle></CardHeader><CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><label className="text-sm font-medium">Channel</label><select className="w-full h-10 rounded-md border border-input bg-background px-3"><option>Push Notification</option><option>Email</option><option>SMS</option><option>All Channels</option></select></div><div className="space-y-2"><label className="text-sm font-medium">Audience</label><select className="w-full h-10 rounded-md border border-input bg-background px-3"><option>All Users</option><option>Active Users</option><option>Inactive Users</option><option>Premium Users</option></select></div></div>
          <div className="space-y-2"><label className="text-sm font-medium">Title</label><Input placeholder="Notification title" /></div>
          <div className="space-y-2"><label className="text-sm font-medium">Message</label><Textarea placeholder="Notification message..." rows={4} /></div>
          <Button><Send className="h-4 w-4 mr-2" />Send Notification</Button>
        </CardContent></Card>
      </div>
    </AdminLayout>
  );
}
