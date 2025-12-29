import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bookmark, Grid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserLayout } from "@/components/layouts/UserLayout";

const SavedPosts = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const savedPosts = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      restaurant: "Bella Italia",
      caption: "Amazing pizza!"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400",
      restaurant: "Breakfast Club",
      caption: "Perfect pancakes"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400",
      restaurant: "Taco Fiesta",
      caption: "Taco Tuesday!"
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
      restaurant: "Green Garden",
      caption: "Healthy salad"
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400",
      restaurant: "Ocean Grill",
      caption: "Fresh seafood"
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400",
      restaurant: "Steakhouse",
      caption: "Perfect steak"
    }
  ];

  const collections = [
    { id: "1", name: "Italian", count: 12 },
    { id: "2", name: "Mexican", count: 8 },
    { id: "3", name: "Breakfast", count: 15 },
    { id: "4", name: "Desserts", count: 6 },
  ];

  const filteredPosts = savedPosts.filter(p =>
    p.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold">Saved Posts</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search saved posts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Saved</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No saved posts found</p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-3 gap-1">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="aspect-square relative cursor-pointer group"
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-sm text-center px-2">{post.restaurant}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex gap-4 p-4 border rounded-lg cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    <img
                      src={post.image}
                      alt={post.caption}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{post.restaurant}</h3>
                      <p className="text-sm text-muted-foreground">{post.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="collections" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {collections.map((collection) => (
                <div
                  key={collection.id}
                  className="p-6 border rounded-lg cursor-pointer hover:bg-muted/50 text-center"
                >
                  <Bookmark className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-semibold">{collection.name}</h3>
                  <p className="text-sm text-muted-foreground">{collection.count} posts</p>
                </div>
              ))}
              <div className="p-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 text-center">
                <span className="text-2xl">+</span>
                <p className="text-sm text-muted-foreground">Create Collection</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  );
};

export default SavedPosts;
