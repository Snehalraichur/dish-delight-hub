import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MoreHorizontal, Heart, Trash2, Edit2, Reply, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: Date;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
  isOwner?: boolean;
}

interface CommentListProps {
  comments: Comment[];
  currentUserId?: string;
  onAddComment: (content: string, parentId?: string) => void;
  onEditComment?: (commentId: string, newContent: string) => void;
  onDeleteComment?: (commentId: string) => void;
  onLikeComment?: (commentId: string) => void;
  placeholder?: string;
  maxRepliesShown?: number;
  className?: string;
}

export function CommentList({
  comments,
  currentUserId,
  onAddComment,
  onEditComment,
  onDeleteComment,
  onLikeComment,
  placeholder = "Add a comment...",
  maxRepliesShown = 2,
  className
}: CommentListProps) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment.trim());
    setNewComment('');
  };

  const handleReplySubmit = (parentId: string) => {
    if (!replyContent.trim()) return;
    onAddComment(replyContent.trim(), parentId);
    setReplyContent('');
    setReplyingTo(null);
  };

  const handleEditSubmit = (commentId: string) => {
    if (!editContent.trim()) return;
    onEditComment?.(commentId, editContent.trim());
    setEditingId(null);
    setEditContent('');
  };

  const toggleReplies = (commentId: string) => {
    const newExpanded = new Set(expandedReplies);
    if (newExpanded.has(commentId)) {
      newExpanded.delete(commentId);
    } else {
      newExpanded.add(commentId);
    }
    setExpandedReplies(newExpanded);
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    const isEditing = editingId === comment.id;
    const isOwner = comment.userId === currentUserId || comment.isOwner;
    const hasReplies = comment.replies && comment.replies.length > 0;
    const isExpanded = expandedReplies.has(comment.id);
    const visibleReplies = isExpanded 
      ? comment.replies 
      : comment.replies?.slice(0, maxRepliesShown);

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={cn("group", isReply && "ml-12 mt-3")}
      >
        <div className="flex gap-3">
          <Avatar className={cn(isReply ? "w-8 h-8" : "w-10 h-10")}>
            <AvatarImage src={comment.userAvatar} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {comment.userName.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm">{comment.userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                  </span>
                </div>

                {isEditing ? (
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="flex-1 h-8 text-sm"
                      autoFocus
                    />
                    <Button size="sm" onClick={() => handleEditSubmit(comment.id)}>
                      Save
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <p className="text-sm text-foreground mt-1">{comment.content}</p>
                )}

                {/* Actions */}
                {!isEditing && (
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => onLikeComment?.(comment.id)}
                      className={cn(
                        "flex items-center gap-1 text-xs transition-colors",
                        comment.isLiked ? "text-red-500" : "text-muted-foreground hover:text-red-500"
                      )}
                    >
                      <Heart className={cn("w-3.5 h-3.5", comment.isLiked && "fill-current")} />
                      {comment.likes > 0 && <span>{comment.likes}</span>}
                    </button>

                    {!isReply && (
                      <button
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Reply className="w-3.5 h-3.5" />
                        Reply
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* More Options */}
              {isOwner && !isEditing && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-popover">
                    <DropdownMenuItem
                      onClick={() => {
                        setEditingId(comment.id);
                        setEditContent(comment.content);
                      }}
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => onDeleteComment?.(comment.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Reply Input */}
            <AnimatePresence>
              {replyingTo === comment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 flex gap-2"
                >
                  <Input
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={`Reply to ${comment.userName}...`}
                    className="flex-1 h-9 text-sm"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleReplySubmit(comment.id);
                      }
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => handleReplySubmit(comment.id)}
                    disabled={!replyContent.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Replies */}
            {hasReplies && (
              <div className="mt-3">
                <AnimatePresence>
                  {visibleReplies?.map((reply) => (
                    <CommentItem key={reply.id} comment={reply} isReply />
                  ))}
                </AnimatePresence>

                {comment.replies && comment.replies.length > maxRepliesShown && (
                  <button
                    onClick={() => toggleReplies(comment.id)}
                    className="flex items-center gap-1 text-xs text-primary mt-2 ml-12 hover:underline"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-3 h-3" />
                        Hide replies
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3" />
                        View {comment.replies.length - maxRepliesShown} more replies
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="flex gap-3">
        <Avatar className="w-10 h-10 shrink-0">
          <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!newComment.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        <AnimatePresence>
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
