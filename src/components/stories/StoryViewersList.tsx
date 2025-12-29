import { X, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStoryViews } from '@/hooks/useStories';
import { formatDistanceToNow } from 'date-fns';

interface StoryViewersListProps {
  isOpen: boolean;
  onClose: () => void;
  storyId: string;
  viewCount: number;
}

export function StoryViewersList({ isOpen, onClose, storyId, viewCount }: StoryViewersListProps) {
  const { data: viewers = [], isLoading } = useStoryViews(storyId);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute inset-0 bg-black/95 backdrop-blur-md z-30 flex flex-col rounded-t-3xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-white" />
              <span className="text-white font-medium">{viewCount} viewers</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Viewers List */}
          <ScrollArea className="flex-1 p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-white" />
              </div>
            ) : viewers.length === 0 ? (
              <div className="text-center text-white/60 py-8">
                <Eye className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>No viewers yet</p>
                <p className="text-sm mt-1">Share your story to get more views!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {viewers.map((viewer) => (
                  <motion.div
                    key={viewer.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <Avatar className="h-12 w-12 border-2 border-white/20">
                      <AvatarImage src={viewer.viewer?.profile_image_url || '/placeholder.svg'} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {viewer.viewer?.name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium truncate">
                        {viewer.viewer?.name || 'Unknown User'}
                      </p>
                      <p className="text-white/50 text-sm">
                        {formatDistanceToNow(new Date(viewer.viewed_at), { addSuffix: true })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
