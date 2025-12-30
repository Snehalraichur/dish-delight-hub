import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Heart, Send, Pause, Play, Loader2, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  useStories, 
  useStoryViewCount, 
  useRecordStoryView, 
  useSendReaction,
  useCurrentUser
} from "@/hooks/useStories";
import { StoryViewersList, StoryHighlightsModal, StoryReactionsBubbles } from "@/components/stories";
import { EMOJI_OPTIONS, STORY_DURATION, PROGRESS_INTERVAL, SWIPE_THRESHOLD } from "@/types/stories";

const StoriesViewer = () => {
  const navigate = useNavigate();
  const { userId: initialUserId } = useParams();
  const { userId: currentUserId } = useCurrentUser();
  const { groupedStories, isLoading } = useStories();
  
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [sentEmoji, setSentEmoji] = useState<string | null>(null);
  const [showViewers, setShowViewers] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);
  
  // Swipe gesture state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const viewRecorded = useRef<Set<string>>(new Set());

  const currentUserStories = groupedStories[currentUserIndex];
  const currentStory = currentUserStories?.stories[currentStoryIndex];
  const totalStoriesForUser = currentUserStories?.stories.length || 0;
  const isOwnStory = currentStory?.userId === currentUserId;

  // Hooks
  const { data: viewCount = 0 } = useStoryViewCount(currentStory?.id);
  const recordView = useRecordStoryView();
  const sendReaction = useSendReaction();

  // Find initial user index if userId param is provided
  useEffect(() => {
    if (initialUserId && groupedStories.length > 0) {
      const userIdx = groupedStories.findIndex(g => g.userId === initialUserId);
      if (userIdx !== -1) {
        setCurrentUserIndex(userIdx);
        setCurrentStoryIndex(0);
      }
    }
  }, [initialUserId, groupedStories.length]);

  // Record view when story changes
  useEffect(() => {
    if (currentStory && !viewRecorded.current.has(currentStory.id)) {
      viewRecorded.current.add(currentStory.id);
      recordView.mutate(currentStory.id);
    }
  }, [currentStory?.id]);

  const goToFeed = useCallback(() => {
    navigate('/feed');
  }, [navigate]);

  const nextStory = useCallback(() => {
    setIsLiked(false);
    setShowEmojiPicker(false);
    
    if (currentStoryIndex < totalStoriesForUser - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else if (currentUserIndex < groupedStories.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
      setCurrentStoryIndex(0);
      setProgress(0);
    } else {
      setHasEnded(true);
      goToFeed();
    }
  }, [currentStoryIndex, totalStoriesForUser, currentUserIndex, groupedStories.length, goToFeed]);

  const prevStory = useCallback(() => {
    setIsLiked(false);
    setShowEmojiPicker(false);
    
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    } else if (currentUserIndex > 0) {
      setCurrentUserIndex(prev => prev - 1);
      const prevUserStories = groupedStories[currentUserIndex - 1];
      setCurrentStoryIndex(prevUserStories.stories.length - 1);
      setProgress(0);
    }
  }, [currentStoryIndex, currentUserIndex, groupedStories]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    
    if (touchStartX.current === null || touchEndX.current === null) return;
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
      if (swipeDistance > 0) {
        nextStory();
      } else {
        prevStory();
      }
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-progress timer
  useEffect(() => {
    if (isPaused || hasEnded || isLoading || showViewers || showHighlights) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (STORY_DURATION / PROGRESS_INTERVAL));
        if (newProgress >= 100) {
          nextStory();
          return 0;
        }
        return newProgress;
      });
    }, PROGRESS_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, hasEnded, isLoading, showViewers, showHighlights, nextStory]);

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0);
  }, [currentStoryIndex, currentUserIndex]);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleLike = () => {
    setIsLiked(prev => !prev);
    if (!isLiked && currentStory) {
      sendReaction.mutate({ storyId: currentStory.id, emoji: '❤️' });
    }
  };

  const handleEmojiReaction = async (emoji: string) => {
    setSentEmoji(emoji);
    setShowEmojiPicker(false);
    setIsPaused(false);
    
    setTimeout(() => setSentEmoji(null), 1500);
    
    if (currentStory) {
      sendReaction.mutate({ storyId: currentStory.id, emoji });
    }
    toast.success(`Reacted with ${emoji}`);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      toast.success(`Message sent to ${currentUserStories?.user.name}`);
      setMessage("");
    } else {
      toast.info("Type a message first");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleShare = () => {
    if (navigator.share && currentStory) {
      navigator.share({
        title: `Story by ${currentStory.user.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-white animate-spin" />
      </div>
    );
  }

  if (!currentStory) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
        <div className="text-white text-center">
          <p>No stories available</p>
          <Button variant="outline" className="mt-4" onClick={goToFeed}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Story Container */}
      <div 
        className="relative w-full max-w-md h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 z-10 flex gap-1">
          {currentUserStories?.stories.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-75 ease-linear"
                style={{ 
                  width: `${index < currentStoryIndex ? 100 : index === currentStoryIndex ? progress : 0}%` 
                }}
              />
            </div>
          ))}
        </div>

        {/* User indicators */}
        <div className="absolute top-2 left-4 right-4 z-10 flex justify-center gap-1">
          {groupedStories.map((_, index) => (
            <div 
              key={index} 
              className={`w-2 h-2 rounded-full ${index === currentUserIndex ? 'bg-primary' : index < currentUserIndex ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-10 left-4 right-4 z-10 flex items-center justify-between">
          <button 
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            onClick={() => navigate(`/profile/${currentStory.userId}`)}
          >
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={currentStory.user.avatar} />
              <AvatarFallback>{currentStory.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-white font-medium text-sm">{currentStory.user.name}</p>
              <div className="flex items-center gap-2 text-white/70 text-xs">
                <span>{currentStory.timestamp}</span>
                {isOwnStory && (
                  <span 
                    onClick={(e) => { e.stopPropagation(); setShowViewers(true); setIsPaused(true); }}
                    className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                  >
                    <Eye className="h-3 w-3" />
                    {viewCount}
                  </span>
                )}
              </div>
            </div>
          </button>
          <div className="flex items-center gap-1">
            {isOwnStory && (
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => { setShowHighlights(true); setIsPaused(true); }}
              >
                <Sparkles className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={togglePause}
            >
              {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={goToFeed}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Story Content */}
        <img
          src={currentStory.media}
          alt="Story"
          className="w-full h-full object-cover select-none"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
          draggable={false}
        />

        {/* Navigation Areas */}
        <div
          className="absolute left-0 top-20 bottom-32 w-1/3 cursor-pointer"
          onClick={prevStory}
        />
        <div
          className="absolute right-0 top-20 bottom-32 w-1/3 cursor-pointer"
          onClick={nextStory}
        />

        {/* Navigation Arrows (desktop) */}
        {(currentStoryIndex > 0 || currentUserIndex > 0) && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hidden md:flex"
            onClick={prevStory}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}
        {(currentStoryIndex < totalStoriesForUser - 1 || currentUserIndex < groupedStories.length - 1) && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 hidden md:flex"
            onClick={nextStory}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}

        {/* Reactions Bubbles */}
        <StoryReactionsBubbles storyId={currentStory.id} />

        {/* Emoji Reaction Animation */}
        <AnimatePresence>
          {sentEmoji && (
            <motion.div
              initial={{ scale: 0, y: 0 }}
              animate={{ scale: 1.5, y: -100 }}
              exit={{ opacity: 0, scale: 2, y: -200 }}
              className="absolute bottom-32 left-1/2 -translate-x-1/2 text-6xl z-20"
            >
              {sentEmoji}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Emoji Picker */}
        <AnimatePresence>
          {showEmojiPicker && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-20 left-4 right-4 bg-black/80 backdrop-blur-md rounded-2xl p-4 z-20"
            >
              <div className="flex justify-around">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleEmojiReaction(emoji)}
                    className="text-3xl hover:scale-125 transition-transform p-2"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer Actions */}
        <div className="absolute bottom-6 left-4 right-4 flex items-center gap-3">
          <input
            type="text"
            placeholder="Send a message..."
            className="flex-1 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 rounded-full px-4 py-2 border border-white/30"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 text-xl"
            onClick={() => {
              setShowEmojiPicker(!showEmojiPicker);
              setIsPaused(!showEmojiPicker);
            }}
          >
            😊
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`hover:bg-white/20 transition-colors ${isLiked ? 'text-red-500' : 'text-white'}`}
            onClick={handleLike}
          >
            <Heart className={`h-6 w-6 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20"
            onClick={handleSendMessage}
          >
            <Send className="h-6 w-6" />
          </Button>
        </div>

        {/* Story Viewers List Modal (for own stories) */}
        {isOwnStory && (
          <StoryViewersList
            isOpen={showViewers}
            onClose={() => { setShowViewers(false); setIsPaused(false); }}
            storyId={currentStory.id}
            viewCount={viewCount}
          />
        )}

        {/* Highlights Modal (for own stories) */}
        {isOwnStory && (
          <StoryHighlightsModal
            isOpen={showHighlights}
            onClose={() => { setShowHighlights(false); setIsPaused(false); }}
            storyId={currentStory.id}
            mediaUrl={currentStory.media}
          />
        )}
      </div>
    </div>
  );
};

export default StoriesViewer;
