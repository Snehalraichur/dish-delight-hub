import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Image, MapPin, Tag, X, AtSign, Sparkles, Search, Music, Crop, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { UserLayout } from "@/components/layouts/UserLayout";
import { CameraCapture } from "@/components/media";
import { StoryEditor } from "@/components/media/StoryEditor";

// Mock restaurant data for search
const allRestaurants = [
  { id: "1", name: "Bella Italia", location: "Downtown", cuisine: "Italian" },
  { id: "2", name: "Taco Fiesta", location: "Midtown", cuisine: "Mexican" },
  { id: "3", name: "Sushi Palace", location: "East Side", cuisine: "Japanese" },
  { id: "4", name: "The Golden Fork", location: "SoHo", cuisine: "American" },
  { id: "5", name: "Sakura Sushi", location: "Upper East", cuisine: "Japanese" },
  { id: "6", name: "Dragon Palace", location: "Chinatown", cuisine: "Chinese" },
  { id: "7", name: "Le Petit Bistro", location: "West Village", cuisine: "French" },
  { id: "8", name: "Burger Joint", location: "Hell's Kitchen", cuisine: "American" },
];

// Mock friends for tagging
const mockFriends = [
  { id: "f1", name: "Sarah Chen", username: "@sarahchen", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { id: "f2", name: "Mike Johnson", username: "@mikej", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
  { id: "f3", name: "Emily Rose", username: "@emilyrose", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
  { id: "f4", name: "Tom Wilson", username: "@tomw", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom" },
  { id: "f5", name: "Lisa Park", username: "@lisap", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa" },
];

const CreatePost = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<typeof allRestaurants[0] | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState("");
  const [taggedFriends, setTaggedFriends] = useState<typeof mockFriends>([]);
  
  // Camera and editor states
  const [showCamera, setShowCamera] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  
  // Search modals
  const [showRestaurantSearch, setShowRestaurantSearch] = useState(false);
  const [restaurantSearchQuery, setRestaurantSearchQuery] = useState("");
  const [showFriendTag, setShowFriendTag] = useState(false);
  const [friendSearchQuery, setFriendSearchQuery] = useState("");

  const suggestedHashtags = ["#foodie", "#delicious", "#instafood", "#yummy", "#foodporn", "#homemade"];

  // Filter restaurants based on search
  const filteredRestaurants = allRestaurants.filter(r => 
    r.name.toLowerCase().includes(restaurantSearchQuery.toLowerCase()) ||
    r.cuisine.toLowerCase().includes(restaurantSearchQuery.toLowerCase()) ||
    r.location.toLowerCase().includes(restaurantSearchQuery.toLowerCase())
  );

  // Filter friends based on search
  const filteredFriends = mockFriends.filter(f =>
    f.name.toLowerCase().includes(friendSearchQuery.toLowerCase()) ||
    f.username.toLowerCase().includes(friendSearchQuery.toLowerCase())
  );

  const handleTakePhoto = () => {
    setShowCamera(true);
  };

  const handleCameraCapture = (imageData: string) => {
    setCapturedImage(imageData);
    setShowCamera(false);
    setShowEditor(true);
  };

  const handleEditorSave = (editedImage: string) => {
    setSelectedImage(editedImage);
    setCapturedImage(null);
    setShowEditor(false);
  };

  const handleGallerySelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setCapturedImage(imageData);
        setShowEditor(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const addHashtag = (tag: string) => {
    const cleanTag = tag.startsWith("#") ? tag : `#${tag}`;
    if (!hashtags.includes(cleanTag)) {
      setHashtags([...hashtags, cleanTag]);
    }
    setHashtagInput("");
  };

  const removeHashtag = (tag: string) => {
    setHashtags(hashtags.filter(h => h !== tag));
  };

  const toggleFriendTag = (friend: typeof mockFriends[0]) => {
    if (taggedFriends.find(f => f.id === friend.id)) {
      setTaggedFriends(taggedFriends.filter(f => f.id !== friend.id));
    } else {
      setTaggedFriends([...taggedFriends, friend]);
      toast.success(`Tagged ${friend.name}`);
    }
  };

  const handlePost = () => {
    if (!selectedImage) {
      toast.error("Please add an image");
      return;
    }
    toast.success("Post created successfully!");
    navigate("/feed");
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <X className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">Create Post</h1>
          <Button onClick={handlePost} disabled={!selectedImage}>
            Share
          </Button>
        </div>

        {/* Hidden file input for gallery */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Image Upload Area */}
        <Card className="border-2 border-dashed border-muted-foreground/30">
          <CardContent className="p-4 sm:p-6">
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => {
                      setCapturedImage(selectedImage);
                      setShowEditor(true);
                    }}
                  >
                    <Crop className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {/* Tagged friends overlay */}
                {taggedFriends.length > 0 && (
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
                    <Users className="h-3 w-3 text-white" />
                    <span className="text-xs text-white">{taggedFriends.length} tagged</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 sm:py-12 space-y-4">
                {/* Placeholder image area */}
                <div className="w-full aspect-square max-w-[280px] bg-muted/50 rounded-lg flex items-center justify-center mb-4">
                  <Camera className="h-16 w-16 text-muted-foreground/30" />
                </div>
                
                {/* Buttons - stacked on mobile, side by side on desktop */}
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={handleTakePhoto}
                    className="w-full sm:w-auto"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Take Photo
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={handleGallerySelect}
                    className="w-full sm:w-auto"
                  >
                    <Image className="h-5 w-5 mr-2" />
                    Gallery
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm text-center">Share your food experience</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Camera Capture Modal */}
        <CameraCapture
          isOpen={showCamera}
          onClose={() => setShowCamera(false)}
          onCapture={handleCameraCapture}
        />

        {/* Story Editor Modal - Enhanced with all features */}
        {capturedImage && (
          <StoryEditor
            isOpen={showEditor}
            mediaData={capturedImage}
            onClose={() => {
              setShowEditor(false);
              setCapturedImage(null);
            }}
            onSave={handleEditorSave}
          />
        )}

        {/* Caption */}
        <div className="space-y-2">
          <Textarea
            placeholder="Write a caption... What did you love about this dish?"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{caption.length}/500</span>
            <Button variant="ghost" size="sm" className="h-6 text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Suggest
            </Button>
          </div>
        </div>

        {/* Tag Friends */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <AtSign className="h-4 w-4 text-primary" />
                Tag Friends
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowFriendTag(true)}>
                <Search className="h-4 w-4 mr-1" />
                Search
              </Button>
            </div>
            {taggedFriends.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {taggedFriends.map((friend) => (
                  <Badge key={friend.id} variant="secondary" className="cursor-pointer" onClick={() => toggleFriendTag(friend)}>
                    <img src={friend.avatar} alt={friend.name} className="w-4 h-4 rounded-full mr-1" />
                    {friend.name} <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tag Restaurant with Search */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="h-4 w-4 text-primary" />
                Tag Restaurant
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowRestaurantSearch(true)}>
                <Search className="h-4 w-4 mr-1" />
                Search
              </Button>
            </div>
            {selectedRestaurant ? (
              <div className="flex items-center justify-between bg-primary/10 rounded-lg p-3">
                <div>
                  <span className="font-medium">{selectedRestaurant.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{selectedRestaurant.location}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedRestaurant(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Search and tag a restaurant</p>
            )}
          </CardContent>
        </Card>

        {/* Hashtags */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Tag className="h-4 w-4 text-primary" />
              Add Hashtags
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a hashtag"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && hashtagInput.trim()) {
                    addHashtag(hashtagInput.trim());
                  }
                }}
              />
              <Button onClick={() => hashtagInput.trim() && addHashtag(hashtagInput.trim())}>
                Add
              </Button>
            </div>
            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeHashtag(tag)}>
                    {tag} <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {suggestedHashtags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => addHashtag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Restaurant Search Dialog */}
      <Dialog open={showRestaurantSearch} onOpenChange={setShowRestaurantSearch}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Search Restaurant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, cuisine, or location..."
                value={restaurantSearchQuery}
                onChange={(e) => setRestaurantSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredRestaurants.map((restaurant) => (
                <button
                  key={restaurant.id}
                  onClick={() => {
                    setSelectedRestaurant(restaurant);
                    setShowRestaurantSearch(false);
                    setRestaurantSearchQuery("");
                    toast.success(`Tagged ${restaurant.name}`);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <div>
                    <p className="font-medium">{restaurant.name}</p>
                    <p className="text-xs text-muted-foreground">{restaurant.cuisine} • {restaurant.location}</p>
                  </div>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
              {filteredRestaurants.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No restaurants found</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Friend Tag Dialog */}
      <Dialog open={showFriendTag} onOpenChange={setShowFriendTag}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Tag Friends</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search friends..."
                value={friendSearchQuery}
                onChange={(e) => setFriendSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {filteredFriends.map((friend) => {
                const isTagged = taggedFriends.find(f => f.id === friend.id);
                return (
                  <button
                    key={friend.id}
                    onClick={() => toggleFriendTag(friend)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors text-left ${
                      isTagged ? 'bg-primary/10' : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-medium">{friend.name}</p>
                        <p className="text-xs text-muted-foreground">{friend.username}</p>
                      </div>
                    </div>
                    {isTagged && <Badge variant="secondary">Tagged</Badge>}
                  </button>
                );
              })}
            </div>
            <Button className="w-full" onClick={() => setShowFriendTag(false)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </UserLayout>
  );
};

export default CreatePost;