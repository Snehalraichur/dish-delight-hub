import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ChevronLeft, Calendar, Users, MapPin, Clock, 
  DollarSign, FileText, Send, Plus, Trash2 
} from "lucide-react";
import { useState } from "react";

export default function CateringProposal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([
    { name: "Appetizer Platter", quantity: 3, price: 45 },
    { name: "Main Course - Chicken", quantity: 50, price: 18 },
    { name: "Vegetarian Option", quantity: 15, price: 16 }
  ]);

  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: "", quantity: 1, price: 0 }]);
  };

  const removeMenuItem = (index: number) => {
    setMenuItems(menuItems.filter((_, i) => i !== index));
  };

  const subtotal = menuItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const serviceFee = subtotal * 0.15;
  const total = subtotal + serviceFee;

  return (
    <RestaurantLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create Proposal</h1>
            <p className="text-muted-foreground">Request #CR-2024-0042</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Request Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Request Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">February 15, 2024</p>
                    <p className="text-sm text-muted-foreground">Event Date</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">6:00 PM - 10:00 PM</p>
                    <p className="text-sm text-muted-foreground">Event Time</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">65 guests</p>
                    <p className="text-sm text-muted-foreground">Expected Attendance</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">123 Business Ave</p>
                    <p className="text-sm text-muted-foreground">Downtown, City</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  "We're hosting a corporate networking event. Looking for a mix of appetizers 
                  and main courses. We have 5 vegetarian guests. Budget is around $1,500-2,000."
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Menu Builder */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Menu Items</CardTitle>
                  <Button variant="outline" size="sm" onClick={addMenuItem}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {menuItems.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-3 items-end">
                    <div className="col-span-5">
                      <Label className="text-xs">Item Name</Label>
                      <Input 
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...menuItems];
                          updated[index].name = e.target.value;
                          setMenuItems(updated);
                        }}
                        placeholder="Menu item"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs">Qty</Label>
                      <Input 
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const updated = [...menuItems];
                          updated[index].quantity = parseInt(e.target.value) || 0;
                          setMenuItems(updated);
                        }}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label className="text-xs">Price ($)</Label>
                      <Input 
                        type="number"
                        value={item.price}
                        onChange={(e) => {
                          const updated = [...menuItems];
                          updated[index].price = parseFloat(e.target.value) || 0;
                          setMenuItems(updated);
                        }}
                      />
                    </div>
                    <div className="col-span-2 text-right">
                      <p className="font-medium">${(item.quantity * item.price).toFixed(2)}</p>
                    </div>
                    <div className="col-span-1">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500"
                        onClick={() => removeMenuItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Add any notes about the proposal, special preparations, or terms..."
                  rows={4}
                />
              </CardContent>
            </Card>

            {/* Pricing Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Pricing Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service Fee (15%)</span>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <FileText className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Send Proposal
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
