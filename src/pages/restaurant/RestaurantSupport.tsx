import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, MessageCircle, Phone, Mail, FileText, 
  ChevronRight, Clock, CheckCircle, AlertCircle 
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const tickets = [
  { id: "TK-001", subject: "Issue with deal redemption scanner", status: "open", priority: "high", created: "2 hours ago" },
  { id: "TK-002", subject: "Need help updating menu prices", status: "in-progress", priority: "medium", created: "1 day ago" },
  { id: "TK-003", subject: "Payout not received", status: "resolved", priority: "high", created: "3 days ago" }
];

const faqs = [
  { question: "How do I create a new deal?", answer: "Navigate to Deal Management from the sidebar, click 'Create Deal', fill in the details including discount percentage, validity period, and maximum redemptions, then publish." },
  { question: "Why aren't my deals showing to users?", answer: "Check that your deal is set to 'Active', has not expired, and hasn't reached its maximum redemption limit. Also ensure your restaurant profile is complete and verified." },
  { question: "How do I process a deal redemption?", answer: "When a customer presents their QR code, use the 'Scan QR' feature in your dashboard or enter the redemption code manually. The system will validate and mark the deal as redeemed." },
  { question: "When do I receive my payouts?", answer: "Payouts are processed weekly on Fridays for the previous week's earnings. The minimum payout threshold is $50. Check Payouts & Earnings for your balance." }
];

export default function RestaurantSupport() {
  return (
    <RestaurantLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground">Get help with your restaurant dashboard</p>
        </div>

        {/* Quick Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Chat with support team</p>
              <Badge className="mt-2">Online</Badge>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Phone Support</h3>
              <p className="text-sm text-muted-foreground">1-800-SNAPDISH</p>
              <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9AM-6PM</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">partners@snapdish.com</p>
              <p className="text-xs text-muted-foreground mt-1">Response within 24hrs</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tickets">
          <TabsList>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="faq">FAQs</TabsTrigger>
            <TabsTrigger value="new">Submit Ticket</TabsTrigger>
          </TabsList>

          <TabsContent value="tickets" className="mt-4 space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm text-muted-foreground">{ticket.id}</span>
                        <Badge variant={
                          ticket.status === "open" ? "destructive" :
                          ticket.status === "in-progress" ? "default" : "secondary"
                        }>
                          {ticket.status === "open" && <AlertCircle className="h-3 w-3 mr-1" />}
                          {ticket.status === "in-progress" && <Clock className="h-3 w-3 mr-1" />}
                          {ticket.status === "resolved" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {ticket.status}
                        </Badge>
                        <Badge variant="outline">{ticket.priority}</Badge>
                      </div>
                      <h3 className="font-medium">{ticket.subject}</h3>
                      <p className="text-sm text-muted-foreground">Created {ticket.created}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="faq" className="mt-4">
            <Card>
              <CardHeader>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search FAQs..." className="pl-9" />
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="new" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Submit a Support Ticket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input placeholder="Brief description of your issue" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2">
                    <option>Select a category</option>
                    <option>Technical Issue</option>
                    <option>Billing & Payments</option>
                    <option>Deal Management</option>
                    <option>Account Access</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Please describe your issue in detail..." rows={5} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Attachments (optional)</label>
                  <Input type="file" />
                </div>
                <Button>Submit Ticket</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </RestaurantLayout>
  );
}
