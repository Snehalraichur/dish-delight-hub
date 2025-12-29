import { motion, AnimatePresence } from 'framer-motion';
import { useStoryReactions } from '@/hooks/useStories';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StoryReactionsBubblesProps {
  storyId: string;
}

export function StoryReactionsBubbles({ storyId }: StoryReactionsBubblesProps) {
  const { data: reactions = [] } = useStoryReactions(storyId);
  
  // Group reactions by emoji
  const reactionGroups = reactions.reduce((acc, r) => {
    if (!acc[r.emoji]) acc[r.emoji] = [];
    acc[r.emoji].push(r);
    return acc;
  }, {} as Record<string, typeof reactions>);

  const topReactions = Object.entries(reactionGroups)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 3);

  if (topReactions.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute bottom-28 left-4 flex items-center gap-2"
    >
      {topReactions.map(([emoji, users], index) => (
        <motion.div
          key={emoji}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 gap-1"
        >
          <span className="text-lg">{emoji}</span>
          <div className="flex -space-x-2">
            {users.slice(0, 3).map((user, i) => (
              <Avatar key={user.id} className="h-5 w-5 border border-black">
                <AvatarImage src={user.user?.profile_image_url || '/placeholder.svg'} />
                <AvatarFallback className="text-[8px]">
                  {user.user?.name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          {users.length > 3 && (
            <span className="text-white/70 text-xs">+{users.length - 3}</span>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}
