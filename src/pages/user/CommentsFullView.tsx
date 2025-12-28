import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Send, Heart, MoreHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const mockComments = [
  { id: '1', user: 'Sarah M.', avatar: '', text: 'This looks absolutely delicious! 😍', likes: 12, time: '2h ago', replies: [] },
  { id: '2', user: 'Mike R.', avatar: '', text: 'Been meaning to try this place. How was the service?', likes: 5, time: '3h ago', replies: [
    { id: '2a', user: 'FoodLover99', avatar: '', text: 'Service was great! Very attentive staff.', likes: 2, time: '2h ago' }
  ]},
  { id: '3', user: 'Emma K.', avatar: '', text: 'The presentation is amazing! What dish is this?', likes: 8, time: '4h ago', replies: [] },
  { id: '4', user: 'Chef Tony', avatar: '', text: 'Great capture! Love seeing our food featured 🙏', likes: 45, time: '5h ago', replies: [] },
  { id: '5', user: 'Alex P.', avatar: '', text: 'Adding this to my must-try list!', likes: 3, time: '6h ago', replies: [] },
];

const CommentsFullView = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<string[]>([]);

  const toggleLike = (commentId: string) => {
    setLikedComments(prev => 
      prev.includes(commentId) 
        ? prev.filter(id => id !== commentId)
        : [...prev, commentId]
    );
  };

  return (
    <UserLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b z-10">
          <div className="flex items-center gap-3 p-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Comments</h1>
            <span className="text-muted-foreground text-sm">({mockComments.length})</span>
          </div>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockComments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="space-y-3"
            >
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <p className="font-medium text-sm">{comment.user}</p>
                    <p className="text-sm mt-1">{comment.text}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-2 px-2">
                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                    <button 
                      className="text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => toggleLike(comment.id)}
                    >
                      <Heart className={`h-3 w-3 inline mr-1 ${likedComments.includes(comment.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      {comment.likes + (likedComments.includes(comment.id) ? 1 : 0)}
                    </button>
                    <button className="text-xs text-muted-foreground hover:text-foreground">Reply</button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 ml-auto">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="ml-12 space-y-3">
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.avatar} />
                        <AvatarFallback>{reply.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted/50 rounded-2xl px-4 py-2">
                          <p className="font-medium text-xs">{reply.user}</p>
                          <p className="text-sm mt-1">{reply.text}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-1 px-2">
                          <span className="text-xs text-muted-foreground">{reply.time}</span>
                          <button className="text-xs text-muted-foreground">
                            <Heart className="h-3 w-3 inline mr-1" />
                            {reply.likes}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Comment Input */}
        <div className="sticky bottom-0 bg-background border-t p-4">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1"
              />
              <Button size="icon" disabled={!newComment.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default CommentsFullView;
