import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Story {
  id: string;
  restaurant: string;
  avatar: string;
  media: string;
  type: 'image' | 'video';
  caption?: string;
  timestamp: string;
}

const stories: Story[] = [
  { id: '1', restaurant: 'Pizza Palace', avatar: 'PP', media: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=1200&fit=crop', type: 'image', caption: 'Fresh out of the oven! 🍕', timestamp: '2h ago' },
  { id: '2', restaurant: 'Sushi Master', avatar: 'SM', media: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=1200&fit=crop', type: 'image', caption: 'Chef\'s special today', timestamp: '3h ago' },
  { id: '3', restaurant: 'Burger Joint', avatar: 'BJ', media: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=1200&fit=crop', type: 'image', caption: 'Double trouble 🍔🍔', timestamp: '4h ago' },
  { id: '4', restaurant: 'Taco Town', avatar: 'TT', media: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=1200&fit=crop', type: 'image', caption: 'Taco Tuesday!', timestamp: '5h ago' },
];

interface StoriesViewerProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function StoriesViewer({ isOpen, onClose, initialIndex = 0 }: StoriesViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const currentStory = stories[currentIndex];
  const storyDuration = 5000; // 5 seconds per story

  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + (100 / (storyDuration / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPaused, currentIndex]);

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') onClose();
    if (e.key === ' ') setIsPaused(prev => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, currentIndex]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-primary-foreground" />
        </button>

        {/* Navigation Arrows - Web */}
        <button
          onClick={handlePrev}
          className={cn(
            "hidden md:flex absolute left-4 z-50 p-3 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-full transition-colors",
            currentIndex === 0 && "opacity-50 cursor-not-allowed"
          )}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-6 h-6 text-primary-foreground" />
        </button>
        
        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-4 z-50 p-3 bg-primary-foreground/20 hover:bg-primary-foreground/30 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-primary-foreground" />
        </button>

        {/* Story Container */}
        <div className="relative w-full max-w-md h-[85vh] mx-4">
          {/* Progress Bars */}
          <div className="absolute top-0 left-0 right-0 z-40 flex gap-1 p-3">
            {stories.map((_, index) => (
              <div key={index} className="flex-1 h-1 bg-primary-foreground/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-foreground transition-all duration-100"
                  style={{
                    width: index < currentIndex ? '100%' : index === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-6 left-0 right-0 z-40 flex items-center justify-between px-4 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                {currentStory.avatar}
              </div>
              <div>
                <p className="font-semibold text-primary-foreground text-sm">{currentStory.restaurant}</p>
                <p className="text-xs text-primary-foreground/70">{currentStory.timestamp}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="p-2 hover:bg-primary-foreground/20 rounded-full"
              >
                {isPaused ? <Play className="w-5 h-5 text-primary-foreground" /> : <Pause className="w-5 h-5 text-primary-foreground" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-primary-foreground/20 rounded-full"
              >
                {isMuted ? <VolumeX className="w-5 h-5 text-primary-foreground" /> : <Volume2 className="w-5 h-5 text-primary-foreground" />}
              </button>
            </div>
          </div>

          {/* Story Media */}
          <motion.img
            key={currentStory.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            src={currentStory.media}
            alt={currentStory.restaurant}
            className="w-full h-full object-cover rounded-2xl"
          />

          {/* Touch Navigation - Mobile */}
          <div className="absolute inset-0 flex md:hidden">
            <button className="flex-1" onClick={handlePrev} />
            <button className="flex-1" onClick={handleNext} />
          </div>

          {/* Caption */}
          {currentStory.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent rounded-b-2xl">
              <p className="text-primary-foreground text-lg font-medium">{currentStory.caption}</p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
