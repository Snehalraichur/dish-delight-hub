import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Heart, Send, Pause, Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";

const STORY_DURATION = 5000; // 5 seconds per story
const PROGRESS_INTERVAL = 50; // Update every 50ms for smooth animation
const SWIPE_THRESHOLD = 50; // Minimum swipe distance to trigger navigation

interface StoryUser {
  id: string;
  name: string;
  avatar: string;
  isRestaurant: boolean;
}

interface Story {
  id: string;
  userId: string;
  user: StoryUser;
  media: string;
  timestamp: string;
}

interface GroupedStories {
  userId: string;
  user: StoryUser;
  stories: Story[];
}

const StoriesViewer = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userId: initialUserId } = useParams();
  
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [message, setMessage] = useState("");
  
  // Swipe gesture state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Fetch stories from database with profile info
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          *,
          profiles:user_id (
            id,
            name,
            profile_image_url
          )
        `)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
  });

  // Real-time subscription for new stories
  useEffect(() => {
    const channel = supabase
      .channel('stories-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stories'
        },
        (payload) => {
          console.log('Story change:', payload);
          // Invalidate and refetch stories
          queryClient.invalidateQueries({ queryKey: ['stories'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  // Transform and group stories by user
  const groupedStories: GroupedStories[] = (() => {
    const storyList: Story[] = stories.length > 0 ? stories.map((s: any) => ({
      id: s.id,
      userId: s.user_id,
      user: { 
        id: s.user_id,
        name: s.profiles?.name || 'User', 
        avatar: s.profiles?.profile_image_url || "/placeholder.svg", 
        isRestaurant: false 
      },
      media: s.media_url,
      timestamp: formatDistanceToNow(new Date(s.created_at || ''), { addSuffix: true }),
    })) : [
      // Fallback mock data when no stories exist
      {
        id: '1',
        userId: 'bella-italia',
        user: { id: 'bella-italia', name: "Bella Italia", avatar: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop", isRestaurant: true },
        media: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
        timestamp: "2h ago",
      },
      {
        id: '2',
        userId: 'bella-italia',
        user: { id: 'bella-italia', name: "Bella Italia", avatar: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop", isRestaurant: true },
        media: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800",
        timestamp: "2h ago",
      },
      {
        id: '3',
        userId: 'taco-fiesta',
        user: { id: 'taco-fiesta', name: "Taco Fiesta", avatar: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop", isRestaurant: true },
        media: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
        timestamp: "4h ago",
      },
      {
        id: '4',
        userId: 'sarah-chen',
        user: { id: 'sarah-chen', name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop", isRestaurant: false },
        media: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
        timestamp: "6h ago",
      },
      {
        id: '5',
        userId: 'sarah-chen',
        user: { id: 'sarah-chen', name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop", isRestaurant: false },
        media: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800",
        timestamp: "6h ago",
      }
    ];

    // Group by userId
    const groups: Record<string, GroupedStories> = {};
    storyList.forEach(story => {
      if (!groups[story.userId]) {
        groups[story.userId] = {
          userId: story.userId,
          user: story.user,
          stories: []
        };
      }
      groups[story.userId].stories.push(story);
    });

    return Object.values(groups);
  })();

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

  const currentUserStories = groupedStories[currentUserIndex];
  const currentStory = currentUserStories?.stories[currentStoryIndex];
  const totalStoriesForUser = currentUserStories?.stories.length || 0;

  const goToFeed = useCallback(() => {
    navigate('/feed');
  }, [navigate]);

  const nextStory = useCallback(() => {
    // Reset like state for new story
    setIsLiked(false);
    
    if (currentStoryIndex < totalStoriesForUser - 1) {
      // More stories from current user
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else if (currentUserIndex < groupedStories.length - 1) {
      // Move to next user's stories
      setCurrentUserIndex(prev => prev + 1);
      setCurrentStoryIndex(0);
      setProgress(0);
    } else {
      // All stories finished - go back to feed
      setHasEnded(true);
      goToFeed();
    }
  }, [currentStoryIndex, totalStoriesForUser, currentUserIndex, groupedStories.length, goToFeed]);

  const prevStory = useCallback(() => {
    // Reset like state for new story
    setIsLiked(false);
    
    if (currentStoryIndex > 0) {
      // Previous story from current user
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    } else if (currentUserIndex > 0) {
      // Go to previous user's last story
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
        // Swiped left - next story
        nextStory();
      } else {
        // Swiped right - previous story
        prevStory();
      }
    }
    
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Auto-progress timer
  useEffect(() => {
    if (isPaused || hasEnded || isLoading) return;

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
  }, [isPaused, hasEnded, isLoading, nextStory]);

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0);
  }, [currentStoryIndex, currentUserIndex]);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };


  const handleLike = () => {
    setIsLiked(prev => !prev);
    if (!isLiked) {
      toast.success("Story liked!");
    }
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
        {/* Progress Bars - Only for current user's stories */}
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

        {/* User indicators showing all users */}
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
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={currentStory.user.avatar} />
              <AvatarFallback>{currentStory.user.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-medium text-sm">{currentStory.user.name}</p>
              <p className="text-white/70 text-xs">{currentStory.timestamp}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
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

        {/* Navigation Areas (for click/tap) */}
        <div
          className="absolute left-0 top-20 bottom-32 w-1/3 cursor-pointer"
          onClick={prevStory}
        />
        <div
          className="absolute right-0 top-20 bottom-32 w-1/3 cursor-pointer"
          onClick={nextStory}
        />

        {/* Navigation Arrows (visible on desktop) */}
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

        {/* Deal info banner removed - no claim deal in stories */}

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
      </div>
    </div>
  );
};

export default StoriesViewer;
