import { AdminLayout } from "@/components/layouts/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, CheckCircle, AlertCircle } from "lucide-react";
const documents = [
  { name: "Terms of Service", version: "2.1", lastUpdated: "Jan 1, 2024", status: "active" },
  { name: "Privacy Policy", version: "3.0", lastUpdated: "Dec 15, 2023", status: "active" },
  { name: "Restaurant Agreement", version: "1.5", lastUpdated: "Nov 20, 2023", status: "active" },
  { name: "User Data Policy", version: "2.0", lastUpdated: "Oct 10, 2023", status: "review" },
  { name: "Cookie Policy", version: "1.2", lastUpdated: "Sep 1, 2023", status: "active" }
];
export default function LegalCompliance() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Legal & Compliance</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card><CardContent className="pt-6"><CheckCircle className="h-8 w-8 text-green-500 mb-2" /><p className="text-2xl font-bold">GDPR</p><p className="text-sm text-muted-foreground">Compliant</p></CardContent></Card>
          <Card><CardContent className="pt-6"><CheckCircle className="h-8 w-8 text-green-500 mb-2" /><p className="text-2xl font-bold">CCPA</p><p className="text-sm text-muted-foreground">Compliant</p></CardContent></Card>
          <Card><CardContent className="pt-6"><CheckCircle className="h-8 w-8 text-green-500 mb-2" /><p className="text-2xl font-bold">PCI DSS</p><p className="text-sm text-muted-foreground">Compliant</p></CardContent></Card>
          <Card><CardContent className="pt-6"><AlertCircle className="h-8 w-8 text-yellow-500 mb-2" /><p className="text-2xl font-bold">1</p><p className="text-sm text-muted-foreground">Pending Review</p></CardContent></Card>
        </div>
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Legal Documents</CardTitle></CardHeader><CardContent className="space-y-3">
          {documents.map((doc) => (<div key={doc.name} className="flex items-center justify-between p-4 rounded-lg border border-border"><div><p className="font-medium">{doc.name}</p><p className="text-sm text-muted-foreground">v{doc.version} • Updated {doc.lastUpdated}</p></div><div className="flex items-center gap-2"><span className={`text-sm ${doc.status === "active" ? "text-green-600" : "text-yellow-600"}`}>{doc.status}</span><Button variant="outline" size="sm"><Download className="h-4 w-4" /></Button></div></div>))}
        </CardContent></Card>
      </div>
    </AdminLayout>
  );
}
