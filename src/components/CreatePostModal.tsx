import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Image, MapPin, Tag, AtSign, Send, Camera, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const restaurants = [
  'The Golden Fork',
  'Sakura Sushi',
  'Bella Italia',
  'Taco Town',
  'Burger Joint',
];

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const [caption, setCaption] = useState('');
  const [location, setLocation] = useState('');
  const [taggedRestaurant, setTaggedRestaurant] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setMediaPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!mediaPreview) {
      toast.error('Please add a photo or video');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Post created successfully!');
    onClose();
    setCaption('');
    setLocation('');
    setTaggedRestaurant('');
    setMediaPreview(null);
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-foreground/50 flex items-end md:items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-card w-full max-w-lg rounded-t-3xl md:rounded-3xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={onClose}>
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
          <h2 className="text-lg font-bold font-display text-foreground">Create Post</h2>
          <Button
            variant="gradient"
            size="sm"
            onClick={handleSubmit}
            disabled={isSubmitting || !mediaPreview}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </div>

        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(90vh-64px)]">
          {/* Media Upload */}
          <div className="space-y-2">
            <Label>Photo / Video</Label>
            {mediaPreview ? (
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img src={mediaPreview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  onClick={() => setMediaPreview(null)}
                  className="absolute top-2 right-2 p-2 bg-foreground/50 rounded-full"
                >
                  <X className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Camera className="w-7 h-7 text-primary" />
                  </div>
                  <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center">
                    <Video className="w-7 h-7 text-secondary" />
                  </div>
                </div>
                <p className="text-sm font-medium text-foreground">Drag & drop or click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">JPG, PNG, GIF or MP4</p>
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleMediaUpload}
                />
              </label>
            )}
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Write a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="min-h-[100px] rounded-xl resize-none"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Add location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 rounded-xl"
              />
            </div>
          </div>

          {/* Tag Restaurant */}
          <div className="space-y-2">
            <Label>Tag Restaurant</Label>
            <div className="flex flex-wrap gap-2">
              {restaurants.map((restaurant) => (
                <button
                  key={restaurant}
                  type="button"
                  onClick={() => setTaggedRestaurant(taggedRestaurant === restaurant ? '' : restaurant)}
                  className={cn(
                    "px-3 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1",
                    taggedRestaurant === restaurant
                      ? "gradient-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  <AtSign className="w-3 h-3" />
                  {restaurant}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
