import { UserLayout } from "@/components/layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ChevronLeft, Search, MessageCircle, Phone, Mail,
  HelpCircle, FileText, ChevronRight
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I redeem a deal?",
    answer: "To redeem a deal, go to your Deal Wallet, select the deal you want to use, and show the QR code to the restaurant staff. They will scan it to apply your discount."
  },
  {
    question: "How do loyalty points work?",
    answer: "You earn points for every action on the app - posting food photos, redeeming deals, inviting friends, and more. Points can be used to unlock exclusive rewards and discounts."
  },
  {
    question: "Can I cancel a catering request?",
    answer: "Yes, you can cancel a catering request up to 48 hours before the scheduled date. Go to your Catering Requests and tap Cancel on the specific request."
  },
  {
    question: "How do I report inappropriate content?",
    answer: "Tap the three dots on any post and select 'Report'. Choose the reason for reporting, and our moderation team will review it within 24 hours."
  }
];

export default function UserSupport() {
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
            <h1 className="font-semibold text-lg">Help & Support</h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for help..." className="pl-9" />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="text-center cursor-pointer hover:bg-muted/50">
              <CardContent className="p-4">
                <MessageCircle className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Chat</p>
              </CardContent>
            </Card>
            <Card className="text-center cursor-pointer hover:bg-muted/50">
              <CardContent className="p-4">
                <Phone className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Call</p>
              </CardContent>
            </Card>
            <Card className="text-center cursor-pointer hover:bg-muted/50">
              <CardContent className="p-4">
                <Mail className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Email</p>
              </CardContent>
            </Card>
          </div>

          {/* FAQs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-sm">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Help Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Help Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {["Getting Started", "Deals & Rewards", "Account & Profile", "Payments", "Privacy & Security"].map((topic, index) => (
                <div 
                  key={topic}
                  className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/50 ${
                    index !== 4 ? 'border-b border-border' : ''
                  }`}
                >
                  <span>{topic}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Still need help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Subject" />
              <Textarea placeholder="Describe your issue..." rows={4} />
              <Button className="w-full">Submit Request</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserLayout>
  );
}
