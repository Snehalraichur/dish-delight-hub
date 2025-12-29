import { useState } from 'react';
import { X, Plus, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useUserHighlights, useCreateHighlight, useAddToHighlight, useCurrentUser } from '@/hooks/useStories';
import { toast } from 'sonner';

interface StoryHighlightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  storyId: string;
  mediaUrl: string;
}

export function StoryHighlightsModal({ isOpen, onClose, storyId, mediaUrl }: StoryHighlightsModalProps) {
  const { userId } = useCurrentUser();
  const { data: highlights = [] } = useUserHighlights(userId || undefined);
  const createHighlight = useCreateHighlight();
  const addToHighlight = useAddToHighlight();
  
  const [showNewHighlight, setShowNewHighlight] = useState(false);
  const [newHighlightName, setNewHighlightName] = useState('');
  const [addedTo, setAddedTo] = useState<Set<string>>(new Set());

  const handleCreateHighlight = async () => {
    if (!newHighlightName.trim()) {
      toast.error('Please enter a name for your highlight');
      return;
    }
    
    try {
      const result = await createHighlight.mutateAsync({ 
        name: newHighlightName,
        coverImageUrl: mediaUrl 
      });
      
      // Add story to new highlight
      await addToHighlight.mutateAsync({
        highlightId: result.id,
        storyId,
        mediaUrl,
      });
      
      toast.success(`Created "${newHighlightName}" and added story!`);
      setNewHighlightName('');
      setShowNewHighlight(false);
      setAddedTo(prev => new Set(prev).add(result.id));
    } catch (error) {
      toast.error('Failed to create highlight');
    }
  };

  const handleAddToHighlight = async (highlightId: string, highlightName: string) => {
    if (addedTo.has(highlightId)) {
      toast.info('Already added to this highlight');
      return;
    }
    
    try {
      await addToHighlight.mutateAsync({ highlightId, storyId, mediaUrl });
      setAddedTo(prev => new Set(prev).add(highlightId));
      toast.success(`Added to "${highlightName}"`);
    } catch (error) {
      toast.error('Failed to add to highlight');
    }
  };

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
              <Sparkles className="h-5 w-5 text-amber-400" />
              <span className="text-white font-medium">Add to Highlight</span>
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

          <ScrollArea className="flex-1 p-4">
            {/* New Highlight Form */}
            {showNewHighlight ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-4 p-4 bg-white/10 rounded-xl"
              >
                <Input
                  placeholder="Highlight name..."
                  value={newHighlightName}
                  onChange={(e) => setNewHighlightName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mb-3"
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1 text-white/60"
                    onClick={() => setShowNewHighlight(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-primary"
                    onClick={handleCreateHighlight}
                    disabled={createHighlight.isPending}
                  >
                    Create
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center gap-3 p-4 bg-white/10 rounded-xl mb-4 text-white hover:bg-white/15 transition-colors"
                onClick={() => setShowNewHighlight(true)}
              >
                <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center">
                  <Plus className="h-6 w-6" />
                </div>
                <span className="font-medium">New Highlight</span>
              </motion.button>
            )}

            {/* Existing Highlights */}
            <div className="space-y-3">
              {highlights.map((highlight) => (
                <motion.button
                  key={highlight.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors"
                  onClick={() => handleAddToHighlight(highlight.id, highlight.name)}
                  disabled={addedTo.has(highlight.id)}
                >
                  <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white/30">
                    {highlight.cover_image_url ? (
                      <img 
                        src={highlight.cover_image_url} 
                        alt={highlight.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-primary/50" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-white font-medium">{highlight.name}</p>
                    <p className="text-white/50 text-sm">
                      {highlight.stories?.length || 0} stories
                    </p>
                  </div>
                  {addedTo.has(highlight.id) && (
                    <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {highlights.length === 0 && !showNewHighlight && (
              <div className="text-center text-white/60 py-8">
                <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-40" />
                <p>No highlights yet</p>
                <p className="text-sm mt-1">Create your first highlight to save stories!</p>
              </div>
            )}
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
