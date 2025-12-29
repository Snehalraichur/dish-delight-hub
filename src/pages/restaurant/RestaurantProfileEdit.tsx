import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, MapPin, Clock, Phone, Mail, Globe, Instagram, Facebook } from "lucide-react";

export default function RestaurantProfileEdit() {
  return (
    <RestaurantLayout>
      <div className="p-6 space-y-6 max-w-4xl">
        <div>
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <p className="text-muted-foreground">Update your restaurant information</p>
        </div>

        {/* Profile Image */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Image</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200" />
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Button variant="outline">Upload New Image</Button>
                <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF. Max 5MB.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Restaurant Name</Label>
                <Input defaultValue="The Spice Garden" />
              </div>
              <div className="space-y-2">
                <Label>Cuisine Type</Label>
                <Input defaultValue="Indian, Asian Fusion" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                rows={4}
                defaultValue="Authentic Indian cuisine with a modern twist. Our chefs bring decades of experience to create dishes that honor tradition while embracing innovation."
              />
            </div>
            <div className="space-y-2">
              <Label>Tags</Label>
              <Input defaultValue="Indian, Vegetarian-Friendly, Spicy, Family-Style" />
              <p className="text-sm text-muted-foreground">Separate tags with commas</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Location */}
        <Card>
          <CardHeader>
            <CardTitle>Contact & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Address
              </Label>
              <Input defaultValue="123 Main Street, Downtown, City 12345" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Phone
                </Label>
                <Input defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Email
                </Label>
                <Input defaultValue="contact@spicegarden.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe className="h-4 w-4" /> Website
              </Label>
              <Input defaultValue="https://spicegarden.com" />
            </div>
          </CardContent>
        </Card>

        {/* Business Hours */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" /> Business Hours
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <div key={day} className="flex items-center gap-4">
                <span className="w-24 font-medium">{day}</span>
                <Switch defaultChecked={day !== "Sunday"} />
                <Input className="w-28" defaultValue="11:00 AM" />
                <span>to</span>
                <Input className="w-28" defaultValue="10:00 PM" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Instagram className="h-4 w-4" /> Instagram
              </Label>
              <Input defaultValue="@thespicegarden" />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Facebook className="h-4 w-4" /> Facebook
              </Label>
              <Input defaultValue="facebook.com/thespicegarden" />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </RestaurantLayout>
  );
}
