import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Settings, Globe, Shield, Bell, Database, Palette } from "lucide-react";
export default function PlatformSettings() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Platform Settings</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5" />General</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="space-y-2"><label className="text-sm font-medium">Platform Name</label><Input defaultValue="SnapDish" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Support Email</label><Input defaultValue="support@snapdish.com" /></div>
            <div className="space-y-2"><label className="text-sm font-medium">Default Currency</label><select className="w-full h-10 rounded-md border border-input bg-background px-3"><option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option></select></div>
          </CardContent></Card>
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />Security</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex items-center justify-between"><div><p className="font-medium">Two-Factor Authentication</p><p className="text-sm text-muted-foreground">Require 2FA for admin access</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><p className="font-medium">Session Timeout</p><p className="text-sm text-muted-foreground">Auto-logout after inactivity</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><p className="font-medium">IP Whitelisting</p><p className="text-sm text-muted-foreground">Restrict admin access by IP</p></div><Switch /></div>
          </CardContent></Card>
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" />Notifications</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex items-center justify-between"><div><p className="font-medium">Email Notifications</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><p className="font-medium">Push Notifications</p></div><Switch defaultChecked /></div>
            <div className="flex items-center justify-between"><div><p className="font-medium">SMS Notifications</p></div><Switch /></div>
          </CardContent></Card>
          <Card><CardHeader><CardTitle className="flex items-center gap-2"><Database className="h-5 w-5" />Maintenance</CardTitle></CardHeader><CardContent className="space-y-4">
            <div className="flex items-center justify-between"><div><p className="font-medium">Maintenance Mode</p><p className="text-sm text-muted-foreground">Disable public access</p></div><Switch /></div>
            <Button variant="outline" className="w-full">Clear Cache</Button>
            <Button variant="outline" className="w-full">Backup Database</Button>
          </CardContent></Card>
        </div>
        <Button>Save All Settings</Button>
      </div>
    </AdminLayout>
  );
}
