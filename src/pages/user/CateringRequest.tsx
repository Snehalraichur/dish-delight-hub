import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Users, MapPin, MessageSquare, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import UserLayout from "@/components/layouts/UserLayout";

const CateringRequest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const catererId = searchParams.get("caterer");

  const [formData, setFormData] = useState({
    eventType: "",
    date: "",
    time: "",
    guestCount: "",
    location: "",
    budget: "",
    dietary: [] as string[],
    details: ""
  });

  const eventTypes = [
    "Wedding",
    "Corporate Event",
    "Birthday Party",
    "Private Dinner",
    "Office Lunch",
    "Festival",
    "Other"
  ];

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Halal",
    "Kosher",
    "Nut-Free",
    "Dairy-Free"
  ];

  const handleSubmit = () => {
    if (!formData.eventType || !formData.date || !formData.guestCount) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Catering request submitted!");
    navigate("/catering-status");
  };

  const toggleDietary = (option: string) => {
    setFormData(prev => ({
      ...prev,
      dietary: prev.dietary.includes(option)
        ? prev.dietary.filter(d => d !== option)
        : [...prev.dietary, option]
    }));
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Request Catering</h1>
            <p className="text-sm text-muted-foreground">Fill out the details for your event</p>
          </div>
        </div>

        {/* Selected Caterer */}
        {catererId && (
          <Card className="bg-primary/5">
            <CardContent className="p-4 flex items-center gap-4">
              <ChefHat className="h-10 w-10 text-primary" />
              <div>
                <p className="font-semibold">Bella Italia Catering</p>
                <p className="text-sm text-muted-foreground">Italian Cuisine • $$</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Event Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Event Type *</Label>
              <Select
                value={formData.eventType}
                onValueChange={(value) => setFormData({ ...formData, eventType: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-10"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    className="pl-10"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Number of Guests *</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="Enter guest count"
                  className="pl-10"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Event Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Enter venue address"
                  className="pl-10"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Budget Range</Label>
              <RadioGroup
                value={formData.budget}
                onValueChange={(value) => setFormData({ ...formData, budget: value })}
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="500-1000" id="b1" />
                    <Label htmlFor="b1">$500 - $1,000</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="1000-2500" id="b2" />
                    <Label htmlFor="b2">$1,000 - $2,500</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="2500-5000" id="b3" />
                    <Label htmlFor="b3">$2,500 - $5,000</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value="5000+" id="b4" />
                    <Label htmlFor="b4">$5,000+</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Dietary Requirements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dietary Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {dietaryOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={option}
                    checked={formData.dietary.includes(option)}
                    onCheckedChange={() => toggleDietary(option)}
                  />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Additional Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Tell us more about your event, any specific dishes you'd like, or special requests..."
              className="min-h-[120px]"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button className="w-full h-12 text-lg" onClick={handleSubmit}>
          Submit Request
        </Button>
      </div>
    </UserLayout>
  );
};

export default CateringRequest;
