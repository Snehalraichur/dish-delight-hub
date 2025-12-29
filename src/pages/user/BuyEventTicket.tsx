import { UserLayout } from "@/components/layouts/UserLayout";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Minus, Plus, Ticket, CreditCard } from "lucide-react";
import { useState } from "react";

const ticketTypes = [
  { id: "general", name: "General Admission", price: 15, description: "Access to all food trucks and activities" },
  { id: "vip", name: "VIP Pass", price: 45, description: "Priority access, VIP lounge, free samples" },
  { id: "family", name: "Family Pack (4)", price: 50, description: "4 general admission tickets, save $10" }
];

export default function BuyEventTicket() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState("general");
  const [quantity, setQuantity] = useState(1);

  const ticket = ticketTypes.find(t => t.id === selectedTicket);
  const total = (ticket?.price || 0) * quantity;

  return (
    <UserLayout>
      <div className="min-h-screen bg-background pb-32">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h1 className="font-semibold text-lg">Buy Tickets</h1>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Event Summary */}
          <Card>
            <CardContent className="p-4 flex gap-4">
              <img 
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=200" 
                alt="Event"
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h2 className="font-semibold">Food Truck Festival 2024</h2>
                <p className="text-sm text-muted-foreground">Jan 15, 2024 • Central Park</p>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Select Ticket Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedTicket} onValueChange={setSelectedTicket}>
                {ticketTypes.map((type) => (
                  <div key={type.id} className="flex items-start space-x-3 p-3 rounded-lg border border-border mb-2">
                    <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                    <Label htmlFor={type.id} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{type.name}</p>
                          <p className="text-sm text-muted-foreground">{type.description}</p>
                        </div>
                        <p className="font-semibold text-primary">${type.price}</p>
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Quantity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quantity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-6">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{ticket?.name} x {quantity}</span>
                <span>${(ticket?.price || 0) * quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Service Fee</span>
                <span>$2.00</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">${total + 2}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Fixed Bottom CTA */}
        <div className="fixed bottom-20 left-0 right-0 p-4 bg-background border-t border-border">
          <Button 
            size="lg" 
            className="w-full"
            onClick={() => navigate("/my-tickets")}
          >
            <CreditCard className="h-5 w-5 mr-2" />
            Pay ${total + 2}
          </Button>
        </div>
      </div>
    </UserLayout>
  );
}
