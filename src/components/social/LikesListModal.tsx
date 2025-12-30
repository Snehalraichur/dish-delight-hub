import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface LikeUser {
  id: string;
  name: string;
  avatar?: string;
  username?: string;
}

interface LikesListModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: LikeUser[];
  onUserClick?: (userId: string) => void;
}

export function LikesListModal({ isOpen, onClose, users, onUserClick }: LikesListModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[70vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            Likes ({users.length})
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[50vh] space-y-2">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => onUserClick?.(user.id)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  {user.username && (
                    <p className="text-xs text-muted-foreground">{user.username}</p>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm" className="rounded-full">
                Follow
              </Button>
            </motion.div>
          ))}
          {users.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No likes yet
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
