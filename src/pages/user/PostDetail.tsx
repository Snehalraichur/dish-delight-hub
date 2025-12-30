import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Star, Tag, Clock, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';

// Mock ratings data
const mockRatings = [
  { id: 'r1', user: { id: 'u1', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' }, rating: 5, comment: 'Amazing food!' },
  { id: 'r2', user: { id: 'u2', name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike' }, rating: 4, comment: 'Great experience' },
  { id: 'r3', user: { id: 'u3', name: 'Emily Rose', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' }, rating: 5, comment: 'Will come back!' },
];

// Default post data
const defaultPost = {
  id: '1',
  user: { id: 'user1', name: 'The Golden Fork', avatar: 'TGF' },
  restaurant: { id: 'rest1', name: 'The Golden Fork' },
  location: 'Downtown, NYC',
  media: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop',
  mediaType: 'image' as 'image' | 'video',
  dish: 'Truffle Risotto',
  caption: 'Our signature Truffle Risotto is back! Made with the finest Italian arborio rice, finished with aged parmesan and freshly shaved black truffles. A dish that speaks to the soul. 🍝✨',
  rating: 4.8,
  likes: 1234,
  deal: { id: 'deal1', discount: '25% OFF', expires: '2h left', expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), claimCount: 45, remaining: 5, title: '25% Off Dinner' },
  isLiked: false,
  isSaved: false,
  hashtags: ['#TruffleRisotto', '#ItalianFood', '#FoodPorn', '#NYC', '#FineDining'],
};

// Helper to calculate hours left
function getHoursLeft(expiresAt: Date): string {
  const now = new Date();
  const diff = expiresAt.getTime() - now.getTime();
  if (diff <= 0) return 'Expired';
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  if (hours > 0) return `${hours}h ${minutes}m left`;
  return `${minutes}m left`;
}

export default function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const location = useLocation();
  
  // Get post data from navigation state or use default
  const passedPostData = location.state?.postData;
  const postData = passedPostData ? {
    ...defaultPost,
    id: passedPostData.id,
    user: passedPostData.user,
    restaurant: passedPostData.restaurant,
    location: passedPostData.location,
    media: passedPostData.media || passedPostData.image,
    mediaType: passedPostData.mediaType || 'image',
    dish: passedPostData.dish,
    rating: passedPostData.rating,
    likes: passedPostData.likes,
    deal: passedPostData.deal,
    isLiked: passedPostData.isLiked,
    isSaved: passedPostData.isSaved,
  } : defaultPost;
  
  const [post] = useState(postData);
  const [showRatingsModal, setShowRatingsModal] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle video controls visibility
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying && post.mediaType === 'video') {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, post.mediaType]);

  const handleGrabDeal = () => {
    if (post.deal?.remaining === 0) {
      toast.error('Sold out!', { description: 'This deal is no longer available.' });
      return;
    }
    toast.success('Deal added to your wallet!', {
      description: `${post.deal.discount} at ${post.restaurant.name}`,
      action: {
        label: 'View Wallet',
        onClick: () => navigate('/wallet'),
      },
    });
  };

  const handleUserClick = (userId: string) => {
    navigate(`/profile/${userId}`);
  };

  const handleRestaurantClick = () => {
    navigate(`/restaurant/${post.restaurant.id}`);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      setShowControls(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center gap-4 p-4 border-b border-border bg-card sticky top-16 z-10">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold">Post</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-0 md:gap-6 md:p-6">
          {/* Media */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square md:rounded-2xl overflow-hidden"
            onClick={() => setShowControls(true)}
          >
            {post.mediaType === 'video' ? (
              <>
                <video
                  ref={videoRef}
                  src={post.media}
                  className="w-full h-full object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={togglePlayPause}
                />
                
                {/* Video Controls Overlay */}
                <AnimatePresence>
                  {showControls && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/20"
                    >
                      {/* Center play/pause button */}
                      <button
                        onClick={togglePlayPause}
                        className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform hover:scale-110"
                      >
                        {isPlaying ? (
                          <Pause className="w-8 h-8 text-foreground" />
                        ) : (
                          <Play className="w-8 h-8 text-foreground ml-1" />
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mute button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </>
            ) : (
              <>
                <img
                  src={post.media}
                  alt={post.dish}
                  className="w-full h-full object-cover"
                />
                {/* Mute button for image posts with audio */}
                <button
                  onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </>
            )}
            
            {/* Deal Tag matching the feed style */}
            {post.deal && (
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-2 rounded-xl shadow-lg">
                <div className="flex flex-col items-end">
                  <span className="font-bold text-sm">{post.deal.discount}</span>
                  <span className="text-xs opacity-80">{post.deal.claimCount} claimed</span>
                  <span className="text-xs opacity-80">{post.deal.remaining} left</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col bg-card md:rounded-2xl md:border md:border-border"
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <button 
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                onClick={handleRestaurantClick}
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {post.restaurant.name.charAt(0)}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">{post.restaurant.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {post.location}
                  </p>
                </div>
              </button>
              <button 
                onClick={() => setShowRatingsModal(true)}
                className="flex items-center gap-1 text-secondary hover:opacity-80 transition-opacity"
              >
                <Star className="w-4 h-4 fill-current" />
                {post.rating}
              </button>
            </div>

            {/* Caption & Hashtags */}
            <div className="p-4 border-b border-border">
              <h2 className="font-bold text-lg text-foreground mb-2">{post.dish}</h2>
              <p className="text-foreground text-sm leading-relaxed mb-3">{post.caption}</p>
              <div className="flex flex-wrap gap-2">
                {post.hashtags.map((tag) => (
                  <span key={tag} className="text-primary text-sm hover:underline cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Deal CTA */}
            {post.deal && (
              <div className="p-4">
                <Button variant="hero" className="w-full rounded-xl" onClick={handleGrabDeal}>
                  <Tag className="w-5 h-5 mr-2" />
                  Grab this Deal - {post.deal.discount}
                  <span className="ml-2 text-xs opacity-80 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {getHoursLeft(post.deal.expiresAt)}
                  </span>
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Ratings Modal */}
      <Dialog open={showRatingsModal} onOpenChange={setShowRatingsModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-secondary fill-current" />
              Ratings ({mockRatings.length})
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {mockRatings.map((rating) => (
              <div key={rating.id} className="flex items-start gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={rating.user.avatar} />
                  <AvatarFallback>{rating.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => {
                        setShowRatingsModal(false);
                        handleUserClick(rating.user.id);
                      }}
                      className="font-semibold text-foreground hover:underline"
                    >
                      {rating.user.name}
                    </button>
                    <div className="flex items-center gap-1 text-secondary">
                      {[...Array(rating.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{rating.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </UserLayout>
  );
}