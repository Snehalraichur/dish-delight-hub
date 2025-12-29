import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Image, MapPin, Tag, X, AtSign, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import UserLayout from "@/components/layouts/UserLayout";

const CreatePost = () => {
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState("");

  const suggestedRestaurants = [
    { id: "1", name: "Bella Italia", location: "Downtown" },
    { id: "2", name: "Taco Fiesta", location: "Midtown" },
    { id: "3", name: "Sushi Palace", location: "East Side" },
  ];

  const suggestedHashtags = ["#foodie", "#delicious", "#instafood", "#yummy", "#foodporn", "#homemade"];

  const handleImageUpload = () => {
    setSelectedImage("https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800");
    toast.success("Image uploaded!");
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

        {/* Image Upload Area */}
        <Card className="border-2 border-dashed border-muted-foreground/30">
          <CardContent className="p-6">
            {selectedImage ? (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-full aspect-square object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="flex gap-4">
                  <Button variant="outline" size="lg" onClick={handleImageUpload}>
                    <Camera className="h-5 w-5 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="outline" size="lg" onClick={handleImageUpload}>
                    <Image className="h-5 w-5 mr-2" />
                    Gallery
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm">Share your food experience</p>
              </div>
            )}
          </CardContent>
        </Card>

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

        {/* Tag Restaurant */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="h-4 w-4 text-primary" />
              Tag Restaurant
            </div>
            {selectedRestaurant ? (
              <div className="flex items-center justify-between bg-primary/10 rounded-lg p-3">
                <span className="font-medium">{selectedRestaurant}</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedRestaurant(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {suggestedRestaurants.map((restaurant) => (
                  <Button
                    key={restaurant.id}
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRestaurant(restaurant.name)}
                  >
                    {restaurant.name}
                  </Button>
                ))}
              </div>
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
    </UserLayout>
  );
};

export default CreatePost;
