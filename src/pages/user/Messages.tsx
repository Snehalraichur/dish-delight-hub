import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Send, ArrowLeft, MoreVertical, Phone, Video, Image } from 'lucide-react';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const conversations = [
  {
    id: '1',
    name: 'The Golden Fork',
    avatar: 'TGF',
    lastMessage: 'Your reservation is confirmed!',
    time: '2m ago',
    unread: 2,
    isRestaurant: true,
  },
  {
    id: '2',
    name: 'Sakura Sushi',
    avatar: 'SS',
    lastMessage: 'Thank you for your review!',
    time: '1h ago',
    unread: 0,
    isRestaurant: true,
  },
  {
    id: '3',
    name: 'Sarah Miller',
    avatar: 'SM',
    lastMessage: 'Have you tried the new pizza place?',
    time: '3h ago',
    unread: 1,
    isRestaurant: false,
  },
  {
    id: '4',
    name: 'SnapDish Support',
    avatar: 'SD',
    lastMessage: 'Your issue has been resolved.',
    time: 'Yesterday',
    unread: 0,
    isRestaurant: false,
  },
];

const messages = [
  {
    id: '1',
    sender: 'restaurant',
    text: 'Hi! Thank you for your interest in The Golden Fork.',
    time: '10:30 AM',
  },
  {
    id: '2',
    sender: 'user',
    text: 'Hi! I wanted to make a reservation for Friday night.',
    time: '10:32 AM',
  },
  {
    id: '3',
    sender: 'restaurant',
    text: 'Of course! How many guests and what time would work best for you?',
    time: '10:33 AM',
  },
  {
    id: '4',
    sender: 'user',
    text: 'Party of 4, around 7:30 PM if possible.',
    time: '10:35 AM',
  },
  {
    id: '5',
    sender: 'restaurant',
    text: 'Perfect! I have a table available at 7:30 PM for 4 guests. Shall I confirm this reservation?',
    time: '10:36 AM',
  },
  {
    id: '6',
    sender: 'user',
    text: 'Yes, please! That would be great.',
    time: '10:38 AM',
  },
  {
    id: '7',
    sender: 'restaurant',
    text: 'Your reservation is confirmed! 🎉 See you Friday at 7:30 PM. Don\'t forget to mention your SnapDish deal for 25% off!',
    time: '10:40 AM',
  },
];

export default function Messages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeConversation = conversations.find(c => c.id === selectedConversation);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    // Handle send message
    setNewMessage('');
  };

  return (
    <UserLayout>
      <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)] flex">
        {/* Conversations List */}
        <div
          className={cn(
            "w-full md:w-80 lg:w-96 border-r border-border bg-card flex flex-col",
            selectedConversation && "hidden md:flex"
          )}
        >
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h1 className="text-xl font-bold font-display text-foreground mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-xl"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={cn(
                  "w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors border-b border-border",
                  selectedConversation === conversation.id && "bg-muted"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm",
                  conversation.isRestaurant ? "gradient-primary" : "bg-muted-foreground"
                )}>
                  {conversation.avatar}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground truncate">{conversation.name}</h3>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-xs text-primary-foreground font-medium">{conversation.unread}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div
          className={cn(
            "flex-1 flex flex-col bg-background",
            !selectedConversation && "hidden md:flex"
          )}
        >
          {selectedConversation && activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-card flex items-center gap-3">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="md:hidden p-2 hover:bg-muted rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm",
                  activeConversation.isRestaurant ? "gradient-primary" : "bg-muted-foreground"
                )}>
                  {activeConversation.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{activeConversation.name}</h3>
                  <p className="text-xs text-fresh">Online</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex",
                      message.sender === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[75%] rounded-2xl px-4 py-2.5",
                        message.sender === 'user'
                          ? "gradient-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      )}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={cn(
                        "text-[10px] mt-1",
                        message.sender === 'user' ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {message.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground">
                    <Image className="w-5 h-5" />
                  </button>
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 h-11 rounded-xl"
                  />
                  <Button
                    onClick={handleSend}
                    variant="gradient"
                    size="icon"
                    className="h-11 w-11 rounded-xl"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">Choose from your existing conversations or start a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
