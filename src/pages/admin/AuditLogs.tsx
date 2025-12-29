import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
const logs = [
  { id: "1", action: "User suspended", admin: "admin@snapdish.com", target: "john_doe", time: "2 mins ago", ip: "192.168.1.1" },
  { id: "2", action: "Deal approved", admin: "moderator@snapdish.com", target: "Deal #D-4521", time: "15 mins ago", ip: "192.168.1.2" },
  { id: "3", action: "Payout processed", admin: "finance@snapdish.com", target: "The Spice Garden", time: "1 hour ago", ip: "192.168.1.3" },
  { id: "4", action: "Feature flag toggled", admin: "admin@snapdish.com", target: "new_search_ui", time: "2 hours ago", ip: "192.168.1.1" },
  { id: "5", action: "Commission rule updated", admin: "admin@snapdish.com", target: "Standard Rate", time: "3 hours ago", ip: "192.168.1.1" }
];
export default function AuditLogs() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Audit Logs</h1><Button variant="outline"><FileText className="h-4 w-4 mr-2" />Export</Button></div>
        <Card><CardContent className="pt-6"><div className="flex gap-4"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input placeholder="Search logs..." className="pl-9" /></div><Button variant="outline"><Filter className="h-4 w-4 mr-2" />Filter</Button></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Recent Actions</CardTitle></CardHeader><CardContent><Table><TableHeader><TableRow><TableHead>Action</TableHead><TableHead>Admin</TableHead><TableHead>Target</TableHead><TableHead>Time</TableHead><TableHead>IP Address</TableHead></TableRow></TableHeader><TableBody>{logs.map((log) => (<TableRow key={log.id}><TableCell className="font-medium">{log.action}</TableCell><TableCell>{log.admin}</TableCell><TableCell>{log.target}</TableCell><TableCell className="text-muted-foreground">{log.time}</TableCell><TableCell className="font-mono text-sm">{log.ip}</TableCell></TableRow>))}</TableBody></Table></CardContent></Card>
      </div>
    </AdminLayout>
  );
}
