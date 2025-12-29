import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, MapPin, Play } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AutoDealTag } from '@/components/gamification/AutoDealTag';
import { DealCounter } from '@/components/gamification/DealCounter';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  id: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnailUrl?: string;
  };
  caption: string;
  hashtags?: string[];
  restaurant?: {
    id: string;
    name: string;
    location?: string;
  };
  deal?: {
    id: string;
    discount: string;
    claimCount?: number;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    isLiked?: boolean;
    isSaved?: boolean;
  };
  friendsClaimed?: { id: string; name: string; avatar?: string }[];
  createdAt: Date;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  onClaimDeal?: () => void;
  onUserClick?: () => void;
  onRestaurantClick?: () => void;
  onPostClick?: () => void;
  className?: string;
}

export function PostCard({
  id,
  user,
  media,
  caption,
  hashtags = [],
  restaurant,
  deal,
  engagement,
  friendsClaimed = [],
  createdAt,
  onLike,
  onComment,
  onShare,
  onSave,
  onClaimDeal,
  onUserClick,
  onRestaurantClick,
  onPostClick,
  className
}: PostCardProps) {
  const [isLiked, setIsLiked] = useState(engagement.isLiked);
  const [isSaved, setIsSaved] = useState(engagement.isSaved);
  const [likeCount, setLikeCount] = useState(engagement.likes);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onLike?.();
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.();
  };

  const handleDoubleTap = () => {
    if (!isLiked) {
      handleLike();
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-card rounded-2xl border border-border overflow-hidden shadow-sm",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onUserClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <Avatar className="w-10 h-10 ring-2 ring-primary/20">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-left">
            <p className="font-semibold text-sm text-foreground">{user.name}</p>
            {restaurant && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRestaurantClick?.();
                }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <MapPin className="w-3 h-3" />
                {restaurant.name}
              </button>
            )}
          </div>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover">
            <DropdownMenuItem>Report</DropdownMenuItem>
            <DropdownMenuItem>Copy Link</DropdownMenuItem>
            <DropdownMenuItem>Share to...</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Media */}
      <div
        className="relative aspect-square bg-muted cursor-pointer"
        onDoubleClick={handleDoubleTap}
        onClick={onPostClick}
      >
        {media.type === 'image' ? (
          <img
            src={media.url}
            alt={caption}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="relative w-full h-full">
            <video
              src={media.url}
              poster={media.thumbnailUrl}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              onClick={(e) => {
                e.stopPropagation();
                const video = e.currentTarget;
                if (video.paused) {
                  video.play();
                  setIsVideoPlaying(true);
                } else {
                  video.pause();
                  setIsVideoPlaying(false);
                }
              }}
            />
            {!isVideoPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-8 h-8 text-foreground ml-1" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Deal Tag Overlay */}
        {deal && (
          <AutoDealTag
            dealId={deal.id}
            discount={deal.discount}
            restaurantName={restaurant?.name || ''}
            claimCount={deal.claimCount}
            onClick={onClaimDeal}
          />
        )}

        {/* Double-tap heart animation placeholder */}
      </div>

      {/* Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1.5 transition-colors",
                isLiked ? "text-red-500" : "text-foreground hover:text-red-500"
              )}
            >
              <Heart className={cn("w-6 h-6", isLiked && "fill-current")} />
              <span className="text-sm font-medium">{likeCount}</span>
            </motion.button>

            <button
              onClick={onComment}
              className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm font-medium">{engagement.comments}</span>
            </button>

            <button
              onClick={onShare}
              className="flex items-center gap-1.5 text-foreground hover:text-primary transition-colors"
            >
              <Send className="w-6 h-6" />
              <span className="text-sm font-medium">{engagement.shares}</span>
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className={cn(
              "transition-colors",
              isSaved ? "text-primary" : "text-foreground hover:text-primary"
            )}
          >
            <Bookmark className={cn("w-6 h-6", isSaved && "fill-current")} />
          </motion.button>
        </div>

        {/* Caption */}
        <div className="space-y-1">
          <p className="text-sm">
            <button onClick={onUserClick} className="font-semibold hover:underline mr-2">
              {user.name}
            </button>
            <span className="text-foreground">{caption}</span>
          </p>

          {/* Hashtags */}
          {hashtags.length > 0 && (
            <p className="text-sm text-primary">
              {hashtags.map(tag => `#${tag}`).join(' ')}
            </p>
          )}
        </div>

        {/* Friend Engagement / Deal Counter */}
        {deal && friendsClaimed.length > 0 && (
          <DealCounter
            dealId={deal.id}
            totalClaims={deal.claimCount || 0}
            friendsClaimed={friendsClaimed}
            onClick={onClaimDeal}
          />
        )}

        {/* View Comments */}
        {engagement.comments > 0 && (
          <button
            onClick={onComment}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View all {engagement.comments} comments
          </button>
        )}

        {/* Timestamp */}
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(createdAt, { addSuffix: true })}
        </p>
      </div>
    </motion.article>
  );
}
