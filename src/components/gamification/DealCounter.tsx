import { motion } from 'framer-motion';
import { Users, ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Friend {
  id: string;
  name: string;
  avatar?: string;
}

interface DealCounterProps {
  dealId: string;
  totalClaims: number;
  friendsClaimed: Friend[];
  onClick?: () => void;
}

export function DealCounter({ dealId, totalClaims, friendsClaimed, onClick }: DealCounterProps) {
  const displayFriends = friendsClaimed.slice(0, 3);
  const remainingCount = friendsClaimed.length - 3;

  if (friendsClaimed.length === 0 && totalClaims === 0) {
    return null;
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-2 text-sm bg-muted/50 hover:bg-muted px-3 py-2 rounded-full transition-colors"
    >
      {friendsClaimed.length > 0 ? (
        <>
          <div className="flex -space-x-2">
            {displayFriends.map((friend) => (
              <Avatar key={friend.id} className="w-6 h-6 border-2 border-background">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                  {friend.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            {remainingCount > 0 && (
              <div className="w-6 h-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">+{remainingCount}</span>
              </div>
            )}
          </div>
          <span className="text-muted-foreground">
            {friendsClaimed.length === 1 
              ? `${friendsClaimed[0].name} grabbed this`
              : `${friendsClaimed.length} friends grabbed this deal`
            }
          </span>
        </>
      ) : (
        <>
          <Users className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{totalClaims} claimed</span>
        </>
      )}
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </motion.button>
  );
}
