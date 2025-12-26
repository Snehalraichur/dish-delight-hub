import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Heart, MessageCircle, Tag, Star, UserPlus, Settings, Check, Trash2 } from 'lucide-react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const notifications = [
  { id: '1', type: 'like', user: 'Sarah M.', content: 'liked your post', time: '2m ago', read: false, avatar: 'SM' },
  { id: '2', type: 'deal', restaurant: 'The Golden Fork', content: 'New deal: 25% off dinner', time: '15m ago', read: false },
  { id: '3', type: 'comment', user: 'John D.', content: 'commented on your post: "Looks amazing!"', time: '1h ago', read: false, avatar: 'JD' },
  { id: '4', type: 'follow', user: 'Emily R.', content: 'started following you', time: '2h ago', read: true, avatar: 'ER' },
  { id: '5', type: 'deal', restaurant: 'Sakura Sushi', content: 'Your deal expires in 2 hours', time: '3h ago', read: true },
  { id: '6', type: 'like', user: 'Mike T.', content: 'liked your review', time: '5h ago', read: true, avatar: 'MT' },
  { id: '7', type: 'system', content: 'You reached Silver tier! 🎉', time: 'Yesterday', read: true },
];

export default function Notifications() {
  const [notificationList, setNotificationList] = useState(notifications);

  const markAllAsRead = () => {
    setNotificationList(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotificationList(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notificationList.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart className="w-5 h-5 text-primary" />;
      case 'comment': return <MessageCircle className="w-5 h-5 text-secondary" />;
      case 'deal': return <Tag className="w-5 h-5 text-fresh" />;
      case 'follow': return <UserPlus className="w-5 h-5 text-accent" />;
      case 'system': return <Star className="w-5 h-5 text-secondary" />;
      default: return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <UserLayout>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-2" />
                Mark all read
              </Button>
            )}
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full h-12 bg-muted rounded-2xl p-1 mb-6">
            <TabsTrigger value="all" className="flex-1 h-10 rounded-xl data-[state=active]:bg-card">
              All
            </TabsTrigger>
            <TabsTrigger value="deals" className="flex-1 h-10 rounded-xl data-[state=active]:bg-card">
              Deals
            </TabsTrigger>
            <TabsTrigger value="social" className="flex-1 h-10 rounded-xl data-[state=active]:bg-card">
              Social
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-2">
            {notificationList.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-2xl transition-colors group",
                  notification.read ? "bg-card" : "bg-primary/5 border border-primary/20"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
                  notification.avatar ? "gradient-primary text-primary-foreground font-bold" : "bg-muted"
                )}>
                  {notification.avatar || getIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm">
                    {notification.user && <span className="font-semibold">{notification.user} </span>}
                    {notification.restaurant && <span className="font-semibold">{notification.restaurant}: </span>}
                    {notification.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="opacity-0 group-hover:opacity-100 p-2 hover:bg-destructive/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </button>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="deals" className="space-y-2">
            {notificationList.filter(n => n.type === 'deal').map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-2xl",
                  notification.read ? "bg-card" : "bg-primary/5 border border-primary/20"
                )}
              >
                <div className="w-12 h-12 rounded-full bg-fresh/10 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-fresh" />
                </div>
                <div className="flex-1">
                  <p className="text-foreground text-sm">
                    <span className="font-semibold">{notification.restaurant}: </span>
                    {notification.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="social" className="space-y-2">
            {notificationList.filter(n => ['like', 'comment', 'follow'].includes(n.type)).map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-2xl",
                  notification.read ? "bg-card" : "bg-primary/5 border border-primary/20"
                )}
              >
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {notification.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-foreground text-sm">
                    <span className="font-semibold">{notification.user} </span>
                    {notification.content}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  );
}
