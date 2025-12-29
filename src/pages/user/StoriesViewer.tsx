import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Heart, Send, MoreHorizontal, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const STORY_DURATION = 5000; // 5 seconds per story
const PROGRESS_INTERVAL = 50; // Update every 50ms for smooth animation

const StoriesViewer = () => {
  const navigate = useNavigate();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const stories = [
    {
      id: 1,
      user: { name: "Bella Italia", avatar: "/placeholder.svg", isRestaurant: true },
      media: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800",
      timestamp: "2h ago",
      deal: "20% off all pasta dishes today!"
    },
    {
      id: 2,
      user: { name: "Taco Fiesta", avatar: "/placeholder.svg", isRestaurant: true },
      media: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800",
      timestamp: "4h ago",
      deal: "Buy 2 tacos, get 1 free!"
    },
    {
      id: 3,
      user: { name: "Sarah Chen", avatar: "/placeholder.svg", isRestaurant: false },
      media: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
      timestamp: "6h ago"
    }
  ];

  const currentStory = stories[currentStoryIndex];

  const nextStory = useCallback(() => {
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgress(0);
    } else {
      navigate(-1);
    }
  }, [currentStoryIndex, stories.length, navigate]);

  const prevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  // Auto-progress timer
  useEffect(() => {
    if (isPaused) return;

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
  }, [isPaused, nextStory]);

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0);
  }, [currentStoryIndex]);

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Story Container */}
      <div className="relative w-full max-w-md h-full">
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 z-10 flex gap-1">
          {stories.map((_, index) => (
            <Progress
              key={index}
              value={index < currentStoryIndex ? 100 : index === currentStoryIndex ? progress : 0}
              className="h-1 flex-1 bg-white/30"
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
              onClick={() => navigate(-1)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Story Content */}
        <img
          src={currentStory.media}
          alt="Story"
          className="w-full h-full object-cover"
          onMouseDown={() => setIsPaused(true)}
          onMouseUp={() => setIsPaused(false)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        />

        {/* Navigation Areas */}
        <div
          className="absolute left-0 top-0 w-1/3 h-full cursor-pointer"
          onClick={prevStory}
        />
        <div
          className="absolute right-0 top-0 w-1/3 h-full cursor-pointer"
          onClick={nextStory}
        />

        {/* Navigation Arrows (visible on hover) */}
        {currentStoryIndex > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={prevStory}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
        )}
        {currentStoryIndex < stories.length - 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={nextStory}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        )}

        {/* Deal Banner (if restaurant story) */}
        {currentStory.deal && (
          <div className="absolute bottom-24 left-4 right-4 bg-primary/90 backdrop-blur-sm rounded-lg p-4">
            <p className="text-primary-foreground font-medium text-center">{currentStory.deal}</p>
            <Button className="w-full mt-2 bg-white text-primary hover:bg-white/90">
              Claim Deal
            </Button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="absolute bottom-6 left-4 right-4 flex items-center gap-3">
          <input
            type="text"
            placeholder="Send a message..."
            className="flex-1 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/70 rounded-full px-4 py-2 border border-white/30"
          />
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Heart className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Send className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoriesViewer;
