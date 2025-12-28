import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Search, UserPlus, UserMinus } from 'lucide-react';
import { motion } from 'framer-motion';

const mockFollowers = [
  { id: '1', name: 'Sarah Mitchell', username: '@sarahfoodie', avatar: '', isFollowing: true, followers: 1234 },
  { id: '2', name: 'Mike Rodriguez', username: '@mikeats', avatar: '', isFollowing: false, followers: 892 },
  { id: '3', name: 'Emma Kim', username: '@emmak', avatar: '', isFollowing: true, followers: 2341 },
  { id: '4', name: 'James Chen', username: '@jamescooks', avatar: '', isFollowing: false, followers: 567 },
  { id: '5', name: 'Lisa Park', username: '@lisaeats', avatar: '', isFollowing: true, followers: 3456 },
];

const mockFollowing = [
  { id: '1', name: 'Chef Antonio', username: '@chefantonio', avatar: '', isFollowing: true, followers: 45678 },
  { id: '2', name: 'FoodieQueen', username: '@foodiequeen', avatar: '', isFollowing: true, followers: 12345 },
  { id: '3', name: 'LocalBites', username: '@localbites', avatar: '', isFollowing: true, followers: 8901 },
  { id: '4', name: 'TasteExplorer', username: '@tasteexplorer', avatar: '', isFollowing: true, followers: 6789 },
];

const Followers = () => {
  const { userId, tab } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [following, setFollowing] = useState<Record<string, boolean>>(
    Object.fromEntries([...mockFollowers, ...mockFollowing].map(u => [u.id, u.isFollowing]))
  );

  const toggleFollow = (userId: string) => {
    setFollowing(prev => ({ ...prev, [userId]: !prev[userId] }));
  };

  const UserCard = ({ user }: { user: typeof mockFollowers[0] }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
    >
      <Avatar className="h-12 w-12 cursor-pointer" onClick={() => navigate(`/profile/${user.id}`)}>
        <AvatarImage src={user.avatar} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.username}</p>
        <p className="text-xs text-muted-foreground">{user.followers.toLocaleString()} followers</p>
      </div>
      <Button
        variant={following[user.id] ? 'outline' : 'default'}
        size="sm"
        onClick={() => toggleFollow(user.id)}
      >
        {following[user.id] ? (
          <>
            <UserMinus className="h-4 w-4 mr-1" />
            Following
          </>
        ) : (
          <>
            <UserPlus className="h-4 w-4 mr-1" />
            Follow
          </>
        )}
      </Button>
    </motion.div>
  );

  return (
    <UserLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur border-b z-10">
          <div className="flex items-center gap-3 p-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Connections</h1>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={tab || 'followers'} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
            <TabsTrigger value="followers" className="rounded-none">
              Followers ({mockFollowers.length})
            </TabsTrigger>
            <TabsTrigger value="following" className="rounded-none">
              Following ({mockFollowing.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="followers" className="flex-1 overflow-y-auto m-0">
            <div className="divide-y">
              {mockFollowers
                .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(user => <UserCard key={user.id} user={user} />)
              }
            </div>
          </TabsContent>

          <TabsContent value="following" className="flex-1 overflow-y-auto m-0">
            <div className="divide-y">
              {mockFollowing
                .filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(user => <UserCard key={user.id} user={user} />)
              }
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </UserLayout>
  );
};

export default Followers;
