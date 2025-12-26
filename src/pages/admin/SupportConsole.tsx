import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HeadphonesIcon, Search, Send, Filter, User, Store,
  Clock, AlertCircle, CheckCircle, MessageSquare, 
  ChevronRight, Paperclip, MoreHorizontal
} from 'lucide-react';
import { AdminLayout } from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const supportTickets = [
  {
    id: 1,
    subject: 'Deal redemption not working',
    user: 'john_doe',
    userEmail: 'john@email.com',
    userType: 'user',
    category: 'redemption',
    priority: 'high',
    status: 'open',
    createdAt: '2024-12-25 10:30',
    lastMessage: 'I tried to redeem my 25% off deal but the QR code scanner says invalid...',
    messages: [
      { id: 1, sender: 'user', content: 'I tried to redeem my 25% off deal but the QR code scanner says invalid. Please help!', time: '10:30 AM' },
      { id: 2, sender: 'support', content: 'Hi John, sorry to hear about this issue. Can you please share the deal ID and the restaurant name?', time: '10:45 AM' },
      { id: 3, sender: 'user', content: 'Sure, the deal ID is GOLD25 at The Golden Fork restaurant.', time: '10:52 AM' },
    ]
  },
  {
    id: 2,
    subject: 'Payment not received',
    user: 'golden_fork',
    userEmail: 'manager@goldenfork.com',
    userType: 'restaurant',
    category: 'payment',
    priority: 'urgent',
    status: 'in_progress',
    createdAt: '2024-12-25 09:15',
    lastMessage: 'We have not received our weekly payout. It has been 5 days now...',
    messages: [
      { id: 1, sender: 'user', content: 'We have not received our weekly payout. It has been 5 days now. Please check.', time: '9:15 AM' },
      { id: 2, sender: 'support', content: 'I apologize for the delay. Let me check with our finance team.', time: '9:30 AM' },
    ]
  },
  {
    id: 3,
    subject: 'Cannot update profile picture',
    user: 'foodie_sarah',
    userEmail: 'sarah@email.com',
    userType: 'user',
    category: 'technical',
    priority: 'low',
    status: 'waiting',
    createdAt: '2024-12-24 16:45',
    lastMessage: 'Every time I try to upload a new profile picture, it shows an error...',
    messages: [
      { id: 1, sender: 'user', content: 'Every time I try to upload a new profile picture, it shows an error.', time: '4:45 PM' },
      { id: 2, sender: 'support', content: 'What is the file format and size of the image you are trying to upload?', time: '5:00 PM' },
    ]
  },
  {
    id: 4,
    subject: 'Account hacked',
    user: 'mike_pizza',
    userEmail: 'mike@email.com',
    userType: 'user',
    category: 'account',
    priority: 'urgent',
    status: 'open',
    createdAt: '2024-12-25 11:00',
    lastMessage: 'Someone is posting spam from my account! I need help immediately!',
    messages: [
      { id: 1, sender: 'user', content: 'Someone is posting spam from my account! I need help immediately!', time: '11:00 AM' },
    ]
  },
  {
    id: 5,
    subject: 'Wrong order for catering',
    user: 'bella_italia',
    userEmail: 'orders@bellaitalia.com',
    userType: 'restaurant',
    category: 'complaint',
    priority: 'medium',
    status: 'resolved',
    createdAt: '2024-12-23 14:20',
    lastMessage: 'The catering order was for 50 people but we only received food for 30.',
    messages: [
      { id: 1, sender: 'user', content: 'The catering order was for 50 people but we only received food for 30.', time: '2:20 PM' },
      { id: 2, sender: 'support', content: 'I sincerely apologize for this mix-up. Let me investigate and arrange compensation.', time: '2:35 PM' },
      { id: 3, sender: 'support', content: 'We have credited your account with $500 as compensation. Is there anything else we can help with?', time: '3:15 PM' },
      { id: 4, sender: 'user', content: 'Thank you for the quick resolution!', time: '3:30 PM' },
    ]
  },
];

const priorityColors: Record<string, string> = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-amber/10 text-amber',
  high: 'bg-coral/10 text-coral',
  urgent: 'bg-destructive/10 text-destructive',
};

const statusColors: Record<string, string> = {
  open: 'bg-coral/10 text-coral border-coral/20',
  in_progress: 'bg-primary/10 text-primary border-primary/20',
  waiting: 'bg-amber/10 text-amber border-amber/20',
  resolved: 'bg-fresh/10 text-fresh border-fresh/20',
  closed: 'bg-muted text-muted-foreground border-muted',
};

const categoryLabels: Record<string, string> = {
  redemption: 'Redemption Issue',
  account: 'Account',
  payment: 'Payment',
  technical: 'Technical',
  complaint: 'Complaint',
  other: 'Other',
};

export default function SupportConsole() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<typeof supportTickets[0] | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const filteredTickets = supportTickets.filter(t => {
    const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.user.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Support Console</h1>
            <p className="text-muted-foreground">Manage customer support tickets</p>
          </div>
          <Badge variant="outline" className="bg-coral/10 text-coral border-coral/20 w-fit">
            <AlertCircle className="w-4 h-4 mr-2" />
            {supportTickets.filter(t => t.status === 'open').length} open tickets
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-coral">{supportTickets.filter(t => t.status === 'open').length}</p>
              <p className="text-sm text-muted-foreground">Open</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-primary">{supportTickets.filter(t => t.status === 'in_progress').length}</p>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-amber">{supportTickets.filter(t => t.status === 'waiting').length}</p>
              <p className="text-sm text-muted-foreground">Waiting</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4">
              <p className="text-2xl font-bold text-fresh">{supportTickets.filter(t => t.status === 'resolved').length}</p>
              <p className="text-sm text-muted-foreground">Resolved Today</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Ticket List */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search & Filter */}
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="waiting">Waiting</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tickets */}
            <ScrollArea className="h-[calc(100vh-400px)]">
              <div className="space-y-2 pr-4">
                {filteredTickets.map((ticket) => (
                  <motion.button
                    key={ticket.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedTicket(ticket)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border transition-all",
                      selectedTicket?.id === ticket.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-card hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {ticket.userType === 'restaurant' ? (
                          <Store className="w-4 h-4 text-amber" />
                        ) : (
                          <User className="w-4 h-4 text-primary" />
                        )}
                        <span className="font-medium text-sm text-foreground">{ticket.user}</span>
                      </div>
                      <Badge variant="secondary" className={priorityColors[ticket.priority]}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-foreground text-sm mb-1 line-clamp-1">{ticket.subject}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{ticket.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className={`text-xs ${statusColors[ticket.status]}`}>
                        {ticket.status.replace('_', ' ')}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{ticket.createdAt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat View */}
          <div className="lg:col-span-2">
            {selectedTicket ? (
              <Card className="border-border h-full flex flex-col">
                {/* Ticket Header */}
                <CardHeader className="border-b border-border">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{selectedTicket.subject}</CardTitle>
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          {selectedTicket.userType === 'restaurant' ? (
                            <Store className="w-4 h-4" />
                          ) : (
                            <User className="w-4 h-4" />
                          )}
                          {selectedTicket.user}
                        </div>
                        <Badge variant="secondary">{categoryLabels[selectedTicket.category]}</Badge>
                        <Badge variant="outline" className={statusColors[selectedTicket.status]}>
                          {selectedTicket.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <Select defaultValue={selectedTicket.status}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="waiting">Waiting</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>

                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {selectedTicket.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          "flex",
                          msg.sender === 'support' ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[70%] rounded-2xl p-3",
                            msg.sender === 'support'
                              ? "bg-primary text-primary-foreground rounded-br-none"
                              : "bg-muted text-foreground rounded-bl-none"
                          )}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <span className={cn(
                            "text-xs mt-1 block",
                            msg.sender === 'support' ? "text-primary-foreground/70" : "text-muted-foreground"
                          )}>
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Textarea
                      placeholder="Type your reply..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[44px] max-h-32 resize-none"
                      rows={1}
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="border-border h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Select a ticket</h3>
                  <p className="text-muted-foreground text-sm">Choose a support ticket from the list to view the conversation</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
