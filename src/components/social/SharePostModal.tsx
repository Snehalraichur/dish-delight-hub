import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface Friend {
  id: string;
  name: string;
  avatar?: string;
  username?: string;
}

interface SharePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: string;
  friends: Friend[];
}

export function SharePostModal({ isOpen, onClose, postId, friends }: SharePostModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFriend = (friendId: string) => {
    setSelectedFriends(prev =>
      prev.includes(friendId)
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    );
  };

  const handleSend = () => {
    if (selectedFriends.length === 0) {
      toast.error('Select at least one friend to share');
      return;
    }
    toast.success(`Post shared with ${selectedFriends.length} friend${selectedFriends.length > 1 ? 's' : ''}`);
    setSelectedFriends([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-primary" />
            Share Post
          </DialogTitle>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search friends..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Friends List */}
        <div className="overflow-y-auto max-h-[40vh] space-y-1">
          {filteredFriends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => toggleFriend(friend.id)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={friend.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {friend.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{friend.name}</p>
                  {friend.username && (
                    <p className="text-xs text-muted-foreground">{friend.username}</p>
                  )}
                </div>
              </div>
              <Checkbox checked={selectedFriends.includes(friend.id)} />
            </motion.div>
          ))}
          {filteredFriends.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No friends found
            </div>
          )}
        </div>

        {/* Send Button */}
        <Button
          variant="gradient"
          className="w-full"
          onClick={handleSend}
          disabled={selectedFriends.length === 0}
        >
          <Send className="w-4 h-4 mr-2" />
          Send to {selectedFriends.length > 0 ? `${selectedFriends.length} friend${selectedFriends.length > 1 ? 's' : ''}` : 'friends'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
