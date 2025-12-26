import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Check, X, Rocket, Filter, Search, Image as ImageIcon, 
  Video, Heart, MessageCircle, MoreVertical, Eye, Flag
} from 'lucide-react';
import { RestaurantLayout } from '@/components/layouts/RestaurantLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ugcContent = [
  {
    id: 1,
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
    author: 'Sarah M.',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    caption: 'Amazing pasta at this place! 🍝',
    likes: 234,
    comments: 18,
    status: 'pending',
    postedAt: '2 hours ago',
    dish: 'Carbonara Pasta'
  },
  {
    id: 2,
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300',
    author: 'John D.',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    caption: 'Best pizza in town 🍕',
    likes: 456,
    comments: 32,
    status: 'approved',
    postedAt: '5 hours ago',
    dish: 'Margherita Pizza'
  },
  {
    id: 3,
    type: 'video',
    thumbnail: 'https://images.unsplash.com/photo-1482049016gy9c-e1e-7d92?w=300',
    author: 'Emily R.',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    caption: 'The sushi here is incredible!',
    likes: 189,
    comments: 12,
    status: 'pending',
    postedAt: '1 day ago',
    dish: 'Dragon Roll'
  },
  {
    id: 4,
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=300',
    author: 'Mike T.',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
    caption: 'Perfect burger! 🍔',
    likes: 312,
    comments: 24,
    status: 'approved',
    postedAt: '2 days ago',
    dish: 'Classic Burger'
  },
  {
    id: 5,
    type: 'image',
    thumbnail: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300',
    author: 'Lisa K.',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
    caption: 'Spam content here',
    likes: 2,
    comments: 0,
    status: 'rejected',
    postedAt: '3 days ago',
    dish: 'Unknown'
  },
];

const statusColors: Record<string, string> = {
  pending: 'bg-amber/10 text-amber border-amber/20',
  approved: 'bg-fresh/10 text-fresh border-fresh/20',
  rejected: 'bg-coral/10 text-coral border-coral/20',
  boosted: 'bg-primary/10 text-primary border-primary/20',
};

export default function UGCManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredContent = ugcContent.filter(content => {
    const matchesSearch = content.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || content.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  const handleApprove = (id: number) => {
    console.log('Approving content:', id);
  };

  const handleReject = (id: number) => {
    console.log('Rejecting content:', id);
  };

  const handleBoost = (id: number) => {
    console.log('Boosting content:', id);
  };

  return (
    <RestaurantLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">UGC Management</h1>
            <p className="text-muted-foreground">Manage user-generated content featuring your restaurant</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">{ugcContent.length}</p>
              <p className="text-sm text-muted-foreground">Total Posts</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-amber">{ugcContent.filter(c => c.status === 'pending').length}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-fresh">{ugcContent.filter(c => c.status === 'approved').length}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-primary">
                {ugcContent.reduce((acc, c) => acc + c.likes, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Engagement</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full sm:w-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredContent.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-border overflow-hidden group">
                <div className="relative aspect-square">
                  <img
                    src={content.thumbnail}
                    alt={content.caption}
                    className="w-full h-full object-cover"
                  />
                  {content.type === 'video' && (
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        <Video className="w-3 h-3 mr-1" />
                        Video
                      </Badge>
                    </div>
                  )}
                  <Badge 
                    variant="outline" 
                    className={`absolute top-2 right-2 ${statusColors[content.status]}`}
                  >
                    {content.status}
                  </Badge>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    {content.status === 'pending' && (
                      <>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="rounded-full bg-fresh hover:bg-fresh/90 text-white"
                          onClick={() => handleApprove(content.id)}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="rounded-full bg-coral hover:bg-coral/90 text-white"
                          onClick={() => handleReject(content.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                    {content.status === 'approved' && (
                      <Button 
                        size="sm" 
                        variant="secondary" 
                        className="rounded-full bg-primary hover:bg-primary/90"
                        onClick={() => handleBoost(content.id)}
                      >
                        <Rocket className="w-4 h-4 mr-1" />
                        Boost
                      </Button>
                    )}
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="rounded-full"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={content.authorAvatar}
                      alt={content.author}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-foreground">{content.author}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{content.postedAt}</span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2 mb-2">{content.caption}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {content.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {content.comments}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Full
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Rocket className="w-4 h-4 mr-2" />
                          Boost Post
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Flag className="w-4 h-4 mr-2" />
                          Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No content found</p>
          </div>
        )}
      </div>
    </RestaurantLayout>
  );
}
