import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Heart, Send, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface Story {
  id: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  duration?: number; // in seconds, default 5 for images
  createdAt: Date;
}

interface StoryGroup {
  userId: string;
  userName: string;
  userAvatar?: string;
  stories: Story[];
}

interface StoryViewerProps {
  storyGroups: StoryGroup[];
  initialGroupIndex?: number;
  initialStoryIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onStoryView?: (storyId: string) => void;
  onReply?: (storyId: string, message: string) => void;
  onLike?: (storyId: string) => void;
}

export function StoryViewer({
  storyGroups,
  initialGroupIndex = 0,
  initialStoryIndex = 0,
  isOpen,
  onClose,
  onStoryView,
  onReply,
  onLike
}: StoryViewerProps) {
  const [currentGroupIndex, setCurrentGroupIndex] = useState(initialGroupIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentGroup = storyGroups[currentGroupIndex];
  const currentStory = currentGroup?.stories[currentStoryIndex];
  const storyDuration = currentStory?.duration || 5; // 5 seconds default

  const clearProgressInterval = useCallback(() => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  }, []);

  const goToNextStory = useCallback(() => {
    if (currentStoryIndex < currentGroup.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
      setIsLiked(false);
    } else if (currentGroupIndex < storyGroups.length - 1) {
      setCurrentGroupIndex(prev => prev + 1);
      setCurrentStoryIndex(0);
      setProgress(0);
      setIsLiked(false);
    } else {
      onClose();
    }
  }, [currentStoryIndex, currentGroup, currentGroupIndex, storyGroups.length, onClose]);

  const goToPrevStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
      setIsLiked(false);
    } else if (currentGroupIndex > 0) {
      setCurrentGroupIndex(prev => prev - 1);
      const prevGroup = storyGroups[currentGroupIndex - 1];
      setCurrentStoryIndex(prevGroup.stories.length - 1);
      setProgress(0);
      setIsLiked(false);
    }
  }, [currentStoryIndex, currentGroupIndex, storyGroups]);

  // Progress timer
  useEffect(() => {
    if (!isOpen || isPaused) return;

    clearProgressInterval();
    
    const increment = 100 / (storyDuration * 10); // Update every 100ms

    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          goToNextStory();
          return 0;
        }
        return prev + increment;
      });
    }, 100);

    return () => clearProgressInterval();
  }, [isOpen, isPaused, storyDuration, goToNextStory, clearProgressInterval]);

  // Track story views
  useEffect(() => {
    if (currentStory && isOpen) {
      onStoryView?.(currentStory.id);
    }
  }, [currentStory, isOpen, onStoryView]);

  // Handle video playback
  useEffect(() => {
    if (currentStory?.mediaType === 'video' && videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isPaused, currentStory]);

  const handleTap = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const third = rect.width / 3;

    if (x < third) {
      goToPrevStory();
    } else if (x > third * 2) {
      goToNextStory();
    } else {
      setIsPaused(prev => !prev);
    }
  };

  const handleReply = () => {
    if (!replyText.trim() || !currentStory) return;
    onReply?.(currentStory.id, replyText.trim());
    setReplyText('');
  };

  const handleLike = () => {
    if (!currentStory) return;
    setIsLiked(true);
    onLike?.(currentStory.id);
  };

  if (!isOpen || !currentGroup || !currentStory) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      >
        {/* Navigation Arrows (Desktop) */}
        <button
          onClick={goToPrevStory}
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center transition-colors z-20"
          disabled={currentGroupIndex === 0 && currentStoryIndex === 0}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={goToNextStory}
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center transition-colors z-20"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Story Container */}
        <div
          className="relative w-full max-w-md h-full md:h-[90vh] md:rounded-2xl overflow-hidden"
          onClick={handleTap}
        >
          {/* Progress Bars */}
          <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-3 pt-4">
            {currentGroup.stories.map((story, index) => (
              <div
                key={story.id}
                className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-white"
                  style={{
                    width: index < currentStoryIndex
                      ? '100%'
                      : index === currentStoryIndex
                        ? `${progress}%`
                        : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-8 left-0 right-0 z-20 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10 ring-2 ring-white">
                <AvatarImage src={currentGroup.userAvatar} />
                <AvatarFallback>{currentGroup.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white font-semibold text-sm">{currentGroup.userName}</p>
                <p className="text-white/70 text-xs">
                  {formatDistanceToNow(currentStory.createdAt, { addSuffix: true })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentStory.mediaType === 'video' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                    if (videoRef.current) {
                      videoRef.current.muted = !isMuted;
                    }
                  }}
                  className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused(!isPaused);
                }}
                className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center"
              >
                {isPaused ? (
                  <Play className="w-5 h-5 text-white" />
                ) : (
                  <Pause className="w-5 h-5 text-white" />
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Media */}
          <div className="w-full h-full">
            {currentStory.mediaType === 'image' ? (
              <img
                src={currentStory.mediaUrl}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                src={currentStory.mediaUrl}
                className="w-full h-full object-cover"
                muted={isMuted}
                playsInline
                loop
              />
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50 pointer-events-none" />

          {/* Bottom Actions */}
          <div
            className="absolute bottom-0 left-0 right-0 z-20 p-4 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <Input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Reply to story..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleReply();
                  }
                }}
              />

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  isLiked ? "bg-red-500" : "bg-white/10 hover:bg-white/20"
                )}
              >
                <Heart className={cn("w-5 h-5 text-white", isLiked && "fill-current")} />
              </motion.button>

              <Button
                size="icon"
                variant="ghost"
                className="w-10 h-10 bg-white/10 hover:bg-white/20"
                onClick={handleReply}
                disabled={!replyText.trim()}
              >
                <Send className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
