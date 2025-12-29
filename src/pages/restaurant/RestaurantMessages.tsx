import { RestaurantLayout } from "@/components/layouts/RestaurantLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send } from "lucide-react";
import { useState } from "react";

const conversations = [
  { id: "1", name: "John Doe", lastMessage: "Thanks for the quick response!", time: "2m ago", unread: 2, avatar: "JD" },
  { id: "2", name: "Jane Smith", lastMessage: "Is the catering still available?", time: "1h ago", unread: 0, avatar: "JS" },
  { id: "3", name: "Mike Johnson", lastMessage: "Perfect, see you then!", time: "3h ago", unread: 0, avatar: "MJ" },
  { id: "4", name: "Sarah Williams", lastMessage: "Can you accommodate dietary restrictions?", time: "1d ago", unread: 1, avatar: "SW" }
];

const messages = [
  { id: "1", sender: "customer", content: "Hi! I have a question about your catering services.", time: "10:30 AM" },
  { id: "2", sender: "restaurant", content: "Hello! Of course, I'd be happy to help. What would you like to know?", time: "10:32 AM" },
  { id: "3", sender: "customer", content: "Do you offer vegetarian options for large events?", time: "10:33 AM" },
  { id: "4", sender: "restaurant", content: "Yes! We have a full vegetarian menu available. We can customize packages for events of any size.", time: "10:35 AM" },
  { id: "5", sender: "customer", content: "Thanks for the quick response!", time: "10:36 AM" }
];

export default function RestaurantMessages() {
  const [selectedConversation, setSelectedConversation] = useState("1");
  const [newMessage, setNewMessage] = useState("");

  return (
    <RestaurantLayout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Conversations List */}
        <div className="w-80 border-r border-border flex flex-col">
          <div className="p-4 border-b border-border">
            <h1 className="text-xl font-bold mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                className={`p-4 cursor-pointer hover:bg-muted/50 border-b border-border ${
                  selectedConversation === conv.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedConversation(conv.id)}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{conv.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{conv.name}</p>
                      <span className="text-xs text-muted-foreground">{conv.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      {conv.unread > 0 && (
                        <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex items-center gap-3">
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "restaurant" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.sender === "restaurant"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === "restaurant" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </RestaurantLayout>
  );
}
