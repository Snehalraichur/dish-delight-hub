import { motion } from 'framer-motion';
import { Tag, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface Friend {
  id: string;
  name: string;
  avatar?: string;
}

interface FriendsClaimedModalProps {
  isOpen: boolean;
  onClose: () => void;
  friends: Friend[];
  dealTitle?: string;
  onUserClick?: (userId: string) => void;
}

export function FriendsClaimedModal({ isOpen, onClose, friends, dealTitle, onUserClick }: FriendsClaimedModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[70vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Tag className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-lg">Friends who grabbed this deal</p>
              {dealTitle && (
                <p className="text-sm text-muted-foreground font-normal">{dealTitle}</p>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[50vh] space-y-2">
          {friends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onUserClick?.(friend.id)}
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
                  <p className="text-xs text-muted-foreground">Grabbed this deal</p>
                </div>
              </div>
            </motion.div>
          ))}
          {friends.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No friends have grabbed this deal yet</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
