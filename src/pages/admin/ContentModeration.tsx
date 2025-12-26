import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Check, X, Flag, Eye, AlertTriangle, 
  MessageSquare, Image as ImageIcon, Video, Filter
} from 'lucide-react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

const flaggedContent = [
  {
    id: 1,
    type: 'image',
    content: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    caption: 'This is fake food! Don\'t believe this restaurant!',
    author: 'angryuser123',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=angry',
    reportReason: 'Misleading content',
    reportCount: 3,
    reportedBy: ['user1', 'user2', 'user3'],
    status: 'pending',
    createdAt: '2 hours ago'
  },
  {
    id: 2,
    type: 'image',
    content: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    caption: 'Call this number for free food: 555-SCAM',
    author: 'spammer99',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=spam',
    reportReason: 'Spam / Advertising',
    reportCount: 8,
    reportedBy: ['user4', 'user5', 'user6', 'user7', 'user8'],
    status: 'pending',
    createdAt: '5 hours ago'
  },
  {
    id: 3,
    type: 'video',
    content: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400',
    caption: 'Restaurant workers doing inappropriate things',
    author: 'troublemaker',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=trouble',
    reportReason: 'Inappropriate content',
    reportCount: 15,
    reportedBy: ['user9', 'user10', 'user11'],
    status: 'pending',
    createdAt: '1 day ago'
  },
  {
    id: 4,
    type: 'image',
    content: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400',
    caption: 'Amazing sushi platter!',
    author: 'foodlover',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=food',
    reportReason: 'Copyright violation',
    reportCount: 1,
    reportedBy: ['photographer1'],
    status: 'reviewed',
    createdAt: '2 days ago'
  },
  {
    id: 5,
    type: 'image',
    content: 'https://images.unsplash.com/photo-1546069901-d5bfeb7f8782?w=400',
    caption: 'Hateful comments about the staff',
    author: 'hater123',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=hater',
    reportReason: 'Harassment / Hate speech',
    reportCount: 12,
    reportedBy: ['staff1', 'staff2', 'manager'],
    status: 'removed',
    createdAt: '3 days ago'
  },
];

const statusColors: Record<string, string> = {
  pending: 'bg-amber/10 text-amber border-amber/20',
  reviewed: 'bg-fresh/10 text-fresh border-fresh/20',
  removed: 'bg-coral/10 text-coral border-coral/20',
};

const reasonColors: Record<string, string> = {
  'Misleading content': 'bg-amber/10 text-amber',
  'Spam / Advertising': 'bg-primary/10 text-primary',
  'Inappropriate content': 'bg-coral/10 text-coral',
  'Copyright violation': 'bg-muted text-muted-foreground',
  'Harassment / Hate speech': 'bg-destructive/10 text-destructive',
};

export default function ContentModeration() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedContent, setSelectedContent] = useState<typeof flaggedContent[0] | null>(null);
  const [moderationNote, setModerationNote] = useState('');

  const filteredContent = flaggedContent.filter(content => {
    const matchesSearch = content.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || content.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: number) => {
    console.log('Approving content:', id);
    setSelectedContent(null);
  };

  const handleRemove = (id: number) => {
    console.log('Removing content:', id);
    setSelectedContent(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Content Moderation</h1>
            <p className="text-muted-foreground">Review and moderate flagged content</p>
          </div>
          <Badge variant="outline" className="bg-amber/10 text-amber border-amber/20 w-fit">
            <AlertTriangle className="w-4 h-4 mr-2" />
            {flaggedContent.filter(c => c.status === 'pending').length} items pending review
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-amber">
                {flaggedContent.filter(c => c.status === 'pending').length}
              </p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-fresh">
                {flaggedContent.filter(c => c.status === 'reviewed').length}
              </p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-coral">
                {flaggedContent.filter(c => c.status === 'removed').length}
              </p>
              <p className="text-sm text-muted-foreground">Removed</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-foreground">
                {flaggedContent.reduce((acc, c) => acc + c.reportCount, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Total Reports</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search flagged content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter}>
            <TabsList>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="reviewed">Approved</TabsTrigger>
              <TabsTrigger value="removed">Removed</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContent.map((content, index) => (
            <motion.div
              key={content.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border-border overflow-hidden">
                <div className="relative aspect-video">
                  <img
                    src={content.content}
                    alt="Flagged content"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {content.type === 'video' ? (
                        <Video className="w-3 h-3 mr-1" />
                      ) : (
                        <ImageIcon className="w-3 h-3 mr-1" />
                      )}
                      {content.type}
                    </Badge>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`absolute top-2 right-2 ${statusColors[content.status]}`}
                  >
                    {content.status}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={content.authorAvatar}
                      alt={content.author}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-sm font-medium text-foreground">@{content.author}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{content.createdAt}</span>
                  </div>
                  <p className="text-sm text-foreground line-clamp-2 mb-3">{content.caption}</p>
                  
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className={reasonColors[content.reportReason]}>
                      {content.reportReason}
                    </Badge>
                    <span className="text-sm text-coral font-medium flex items-center gap-1">
                      <Flag className="w-4 h-4" />
                      {content.reportCount} reports
                    </span>
                  </div>

                  {content.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setSelectedContent(content)}
                      >
                        <Eye className="w-4 h-4" />
                        Review
                      </Button>
                      <Button
                        size="sm"
                        className="bg-fresh hover:bg-fresh/90"
                        onClick={() => handleApprove(content.id)}
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemove(content.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <Check className="w-12 h-12 text-fresh mx-auto mb-4" />
            <p className="text-muted-foreground">No flagged content to review</p>
          </div>
        )}

        {/* Review Modal */}
        <Dialog open={!!selectedContent} onOpenChange={(open) => !open && setSelectedContent(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Review Flagged Content</DialogTitle>
            </DialogHeader>
            {selectedContent && (
              <div className="space-y-4">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={selectedContent.content}
                    alt="Content to review"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <img
                    src={selectedContent.authorAvatar}
                    alt={selectedContent.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">@{selectedContent.author}</p>
                    <p className="text-sm text-muted-foreground">{selectedContent.createdAt}</p>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-foreground">{selectedContent.caption}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Report Reason</p>
                    <Badge variant="secondary" className={reasonColors[selectedContent.reportReason]}>
                      {selectedContent.reportReason}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Report Count</p>
                    <p className="font-medium text-coral">{selectedContent.reportCount} reports</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Moderation Note (Optional)</p>
                  <Textarea
                    placeholder="Add a note about your decision..."
                    value={moderationNote}
                    onChange={(e) => setModerationNote(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setSelectedContent(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-fresh hover:bg-fresh/90"
                    onClick={() => handleApprove(selectedContent.id)}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => handleRemove(selectedContent.id)}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
