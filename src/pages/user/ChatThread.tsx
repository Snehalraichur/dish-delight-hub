import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Send, Image, MoreVertical, Phone, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserLayout from "@/components/layouts/UserLayout";

const ChatThread = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const thread = {
    id: id || "1",
    participant: {
      name: "Bella Italia",
      avatar: "/placeholder.svg",
      isOnline: true,
      isRestaurant: true
    },
    messages: [
      {
        id: 1,
        content: "Hi! Thanks for your interest in our catering services.",
        sender: "other",
        timestamp: "10:30 AM"
      },
      {
        id: 2,
        content: "I wanted to inquire about catering for a birthday party next Saturday.",
        sender: "me",
        timestamp: "10:32 AM"
      },
      {
        id: 3,
        content: "That sounds great! How many guests are you expecting?",
        sender: "other",
        timestamp: "10:33 AM"
      },
      {
        id: 4,
        content: "Around 30 people. We'd love to have your pasta dishes and some appetizers.",
        sender: "me",
        timestamp: "10:35 AM"
      },
      {
        id: 5,
        content: "Perfect! I'd recommend our party package which includes 3 pasta options, bruschetta, and a dessert. It's $25 per person.",
        sender: "other",
        timestamp: "10:38 AM"
      },
      {
        id: 6,
        content: "That sounds perfect! Can you also accommodate vegetarian options?",
        sender: "me",
        timestamp: "10:40 AM"
      },
      {
        id: 7,
        content: "Absolutely! We have several vegetarian pasta options and our bruschetta is vegetarian as well. Would you like me to send you the full menu?",
        sender: "other",
        timestamp: "10:42 AM"
      }
    ]
  };

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage("");
    }
  };

  return (
    <UserLayout>
      <div className="flex flex-col h-[calc(100vh-80px)]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-background">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar className="h-10 w-10">
              <AvatarImage src={thread.participant.avatar} />
              <AvatarFallback>{thread.participant.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{thread.participant.name}</p>
              <p className="text-xs text-muted-foreground">
                {thread.participant.isOnline ? (
                  <span className="text-green-500">● Online</span>
                ) : (
                  "Last seen 2h ago"
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                <DropdownMenuItem>Block</DropdownMenuItem>
                <DropdownMenuItem className="text-red-500">Delete Chat</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {thread.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    msg.sender === "me"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t bg-background">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Image className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!message.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ChatThread;
