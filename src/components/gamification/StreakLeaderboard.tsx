import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Trophy, Crown, Medal, X, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  streak: number;
  longestStreak: number;
  rank: number;
  isCurrentUser?: boolean;
}

interface StreakLeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
  users: LeaderboardUser[];
  currentUserRank?: number;
  currentUserStreak?: number;
  unlockedDeals?: { id: string; title: string; discount: string; minStreak: number }[];
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-5 h-5 text-yellow-500" />;
    case 2:
      return <Medal className="w-5 h-5 text-slate-400" />;
    case 3:
      return <Medal className="w-5 h-5 text-amber-600" />;
    default:
      return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
  }
};

const getStreakLevel = (streak: number) => {
  if (streak >= 30) return { label: 'Legendary', color: 'from-amber-400 via-orange-500 to-red-500' };
  if (streak >= 14) return { label: 'Fire', color: 'from-orange-400 to-red-500' };
  if (streak >= 7) return { label: 'Hot', color: 'from-orange-300 to-orange-500' };
  return { label: 'Warming', color: 'from-amber-300 to-amber-500' };
};

export function StreakLeaderboard({
  isOpen,
  onClose,
  users,
  currentUserRank,
  currentUserStreak = 0,
  unlockedDeals = []
}: StreakLeaderboardProps) {
  const [activeTab, setActiveTab] = useState('leaderboard');

  const topThree = users.slice(0, 3);
  const restOfUsers = users.slice(3);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Streak Champions</h2>
              <p className="text-sm text-muted-foreground font-normal">Top performers this week</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="w-full justify-start px-6 bg-transparent border-b rounded-none">
            <TabsTrigger value="leaderboard" className="flex-1">Leaderboard</TabsTrigger>
            <TabsTrigger value="rewards" className="flex-1">Unlockable Deals</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="mt-0 p-6 overflow-y-auto max-h-[60vh]">
            {/* Top 3 Podium */}
            <div className="flex justify-center items-end gap-2 mb-6">
              {/* 2nd Place */}
              {topThree[1] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center"
                >
                  <Avatar className="w-14 h-14 border-2 border-slate-300">
                    <AvatarImage src={topThree[1].avatar} />
                    <AvatarFallback className="bg-slate-200">{topThree[1].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="w-16 h-20 bg-gradient-to-b from-slate-200 to-slate-300 rounded-t-lg mt-2 flex flex-col items-center justify-center">
                    <Medal className="w-5 h-5 text-slate-500" />
                    <span className="text-xs font-bold mt-1">{topThree[1].streak}🔥</span>
                  </div>
                </motion.div>
              )}

              {/* 1st Place */}
              {topThree[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center -mt-4"
                >
                  <div className="relative">
                    <Avatar className="w-18 h-18 border-4 border-yellow-400 w-[72px] h-[72px]">
                      <AvatarImage src={topThree[0].avatar} />
                      <AvatarFallback className="bg-yellow-100 text-lg">{topThree[0].name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Crown className="w-6 h-6 text-yellow-500 absolute -top-3 left-1/2 -translate-x-1/2" />
                  </div>
                  <div className="w-20 h-28 bg-gradient-to-b from-yellow-300 to-amber-400 rounded-t-lg mt-2 flex flex-col items-center justify-center">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    <span className="text-sm font-bold mt-1">{topThree[0].streak}🔥</span>
                  </div>
                </motion.div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center"
                >
                  <Avatar className="w-12 h-12 border-2 border-amber-600">
                    <AvatarImage src={topThree[2].avatar} />
                    <AvatarFallback className="bg-amber-100">{topThree[2].name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="w-14 h-16 bg-gradient-to-b from-amber-200 to-amber-400 rounded-t-lg mt-2 flex flex-col items-center justify-center">
                    <Medal className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-bold mt-1">{topThree[2].streak}🔥</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Current User Position */}
            {currentUserRank && currentUserRank > 3 && (
              <div className="bg-primary/10 rounded-xl p-3 mb-4 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-primary">#{currentUserRank}</span>
                    <span className="text-sm">Your Position</span>
                  </div>
                  <Badge variant="secondary" className="bg-primary/20">
                    <Flame className="w-3 h-3 mr-1" />
                    {currentUserStreak} day streak
                  </Badge>
                </div>
              </div>
            )}

            {/* Rest of Leaderboard */}
            <div className="space-y-2">
              {restOfUsers.map((user, index) => {
                const level = getStreakLevel(user.streak);
                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-xl transition-colors",
                      user.isCurrentUser ? "bg-primary/10 border border-primary/20" : "bg-muted/50 hover:bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 text-center font-bold text-muted-foreground">
                        #{user.rank}
                      </span>
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">Best: {user.longestStreak} days</p>
                      </div>
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r",
                      level.color
                    )}>
                      {user.streak}🔥
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="rewards" className="mt-0 p-6 overflow-y-auto max-h-[60vh]">
            <div className="space-y-3">
              {unlockedDeals.length === 0 ? (
                <div className="text-center py-8">
                  <Flame className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">Keep your streak going to unlock exclusive deals!</p>
                </div>
              ) : (
                unlockedDeals.map((deal, index) => {
                  const isUnlocked = currentUserStreak >= deal.minStreak;
                  return (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all",
                        isUnlocked 
                          ? "border-primary bg-primary/5" 
                          : "border-border bg-muted/30 opacity-60"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={isUnlocked ? "default" : "secondary"}>
                              {deal.discount}
                            </Badge>
                            {isUnlocked && <TrendingUp className="w-4 h-4 text-green-500" />}
                          </div>
                          <p className="font-medium">{deal.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {isUnlocked ? "Unlocked!" : `Requires ${deal.minStreak} day streak`}
                          </p>
                        </div>
                        <div className="text-right">
                          <Flame className={cn(
                            "w-6 h-6",
                            isUnlocked ? "text-orange-500" : "text-muted-foreground"
                          )} />
                          <span className="text-xs text-muted-foreground">{deal.minStreak}+ days</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
