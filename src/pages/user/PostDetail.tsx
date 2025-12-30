import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, Send, Bookmark, MapPin, Star, Tag, Clock, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { LikesListModal, SharePostModal } from '@/components/social';
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
  image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop',
  mediaType: 'image' as 'image' | 'video',
  dish: 'Truffle Risotto',
  caption: 'Our signature Truffle Risotto is back! Made with the finest Italian arborio rice, finished with aged parmesan and freshly shaved black truffles. A dish that speaks to the soul. 🍝✨',
  rating: 4.8,
  likes: 1234,
  comments: [
    { id: '1', user: 'Sarah M.', avatar: 'SM', text: 'This looks absolutely divine! 😍', time: '2h ago', likes: 24 },
    { id: '2', user: 'John D.', avatar: 'JD', text: 'Had this last week, totally worth it!', time: '1h ago', likes: 12 },
    { id: '3', user: 'Emily R.', avatar: 'ER', text: 'Adding to my must-try list', time: '45m ago', likes: 8 },
  ],
  deal: { id: 'deal1', discount: '25% OFF', expires: '2h left', title: '25% Off Dinner', remaining: 5 },
  isLiked: false,
  isSaved: false,
  hashtags: ['#TruffleRisotto', '#ItalianFood', '#FoodPorn', '#NYC', '#FineDining'],
  likedBy: [
    { id: 'u1', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', username: '@sarahchen' },
    { id: 'u2', name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', username: '@mikej' },
    { id: 'u3', name: 'Emily Rose', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', username: '@emilyrose' },
  ],
};

// Mock friends list for sharing
const mockFriends = [
  { id: 'f1', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', username: '@sarahchen' },
  { id: 'f2', name: 'Mike Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', username: '@mikej' },
  { id: 'f3', name: 'Emily Rose', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', username: '@emilyrose' },
  { id: 'f4', name: 'Tom Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom', username: '@tomw' },
];

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
    image: passedPostData.image,
    dish: passedPostData.dish,
    rating: passedPostData.rating,
    likes: passedPostData.likes,
    deal: passedPostData.deal,
    isLiked: passedPostData.isLiked,
    isSaved: passedPostData.isSaved,
    likedBy: passedPostData.likedBy,
  } : defaultPost;
  
  const [post, setPost] = useState(postData);
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const [likes, setLikes] = useState(post.likes);
  const [newComment, setNewComment] = useState('');
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
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

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success('Post saved to your collection');
    } else {
      toast.info('Post removed from saved');
    }
  };

  const handleComment = () => {
    if (!newComment.trim()) return;
    toast.success('Comment added!');
    setNewComment('');
  };

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
                  src={post.image}
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

                {/* Side Controls */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleLike}
                    className={cn(
                      "w-12 h-12 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm",
                      isLiked ? "text-coral" : "text-white"
                    )}
                  >
                    <Heart className={cn("w-6 h-6", isLiked && "fill-current")} />
                  </motion.button>
                  <button
                    onClick={() => navigate(`/post/${postId}/comments`)}
                    className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center text-white backdrop-blur-sm"
                  >
                    <Send className="w-6 h-6" />
                  </button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleSave}
                    className={cn(
                      "w-12 h-12 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm",
                      isSaved ? "text-amber" : "text-white"
                    )}
                  >
                    <Bookmark className={cn("w-6 h-6", isSaved && "fill-current")} />
                  </motion.button>
                </div>

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
                  src={post.image}
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
            
            {post.deal && (
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                <Tag className="w-4 h-4" />
                <span className="font-bold">{post.deal.discount}</span>
                <span className="text-sm opacity-80 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.deal.expires}
                </span>
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

            {/* Comments */}
            <div className="flex-1 p-4 overflow-y-auto max-h-64 space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground flex-shrink-0">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">{comment.user}</span>{' '}
                      <span className="text-foreground">{comment.text}</span>
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>{comment.time}</span>
                      <button className="hover:text-foreground">{comment.likes} likes</button>
                      <button className="hover:text-foreground">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <button onClick={toggleLike} className="transition-transform active:scale-90">
                    <Heart className={cn("w-7 h-7", isLiked ? "fill-primary text-primary" : "text-foreground")} />
                  </button>
                  <button onClick={() => navigate(`/post/${postId}/comments`)}>
                    <MessageCircle className="w-7 h-7 text-foreground" />
                  </button>
                  <button onClick={() => setShowShareModal(true)}>
                    <Send className="w-7 h-7 text-foreground" />
                  </button>
                </div>
                <button onClick={toggleSave} className="transition-transform active:scale-90">
                  <Bookmark className={cn("w-7 h-7", isSaved ? "fill-secondary text-secondary" : "text-foreground")} />
                </button>
              </div>
              <button 
                className="font-semibold text-foreground text-sm mb-3 hover:underline"
                onClick={() => setShowLikesModal(true)}
              >
                {likes.toLocaleString()} likes
              </button>

              {/* Deal CTA */}
              {post.deal && (
                <Button variant="hero" className="w-full rounded-xl mb-3" onClick={handleGrabDeal}>
                  Grab this Deal - {post.deal.discount}
                </Button>
              )}

              {/* Comment Input */}
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 h-10 rounded-xl"
                />
                <Button
                  variant="gradient"
                  size="icon"
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                  className="h-10 w-10 rounded-xl"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Likes Modal */}
      <LikesListModal
        isOpen={showLikesModal}
        onClose={() => setShowLikesModal(false)}
        users={post.likedBy}
        onUserClick={(userId) => {
          setShowLikesModal(false);
          handleUserClick(userId);
        }}
      />

      {/* Share Modal */}
      <SharePostModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        postId={post.id}
        friends={mockFriends}
      />

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
