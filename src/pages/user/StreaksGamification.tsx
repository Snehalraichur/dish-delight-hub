import { useNavigate } from 'react-router-dom';
import { UserLayout } from '@/components/layouts/UserLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Flame, Star, Trophy, Target, Calendar, Gift, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const streakData = {
  currentStreak: 12,
  longestStreak: 24,
  weeklyActivity: [true, true, true, true, true, false, false],
  monthlyStats: { posts: 15, likes: 234, comments: 45, deals: 8 }
};

const achievements = [
  { id: '1', name: 'First Post', description: 'Share your first food photo', icon: Star, earned: true, date: '2024-01-15' },
  { id: '2', name: 'Week Warrior', description: '7-day posting streak', icon: Flame, earned: true, date: '2024-02-01' },
  { id: '3', name: 'Deal Hunter', description: 'Redeem 5 deals', icon: Gift, earned: true, date: '2024-02-10' },
  { id: '4', name: 'Social Butterfly', description: 'Get 100 followers', icon: Trophy, earned: false, progress: 67 },
  { id: '5', name: 'Streak Master', description: '30-day posting streak', icon: Zap, earned: false, progress: 40 },
  { id: '6', name: 'Top Reviewer', description: 'Write 50 reviews', icon: Target, earned: false, progress: 24 },
];

const dailyChallenges = [
  { id: '1', title: 'Post a food photo', points: 50, completed: true },
  { id: '2', title: 'Like 5 posts', points: 25, completed: true },
  { id: '3', title: 'Comment on 3 posts', points: 30, completed: false, progress: 1, target: 3 },
  { id: '4', title: 'Share a deal', points: 40, completed: false, progress: 0, target: 1 },
];

const StreaksGamification = () => {
  const navigate = useNavigate();
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <UserLayout>
      <div className="p-4 pb-20 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Streaks & Achievements</h1>
        </div>

        {/* Current Streak */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Current Streak</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">{streakData.currentStreak}</span>
                    <span className="text-lg">days</span>
                  </div>
                  <p className="text-sm opacity-90 mt-2">Longest: {streakData.longestStreak} days</p>
                </div>
                <Flame className="h-20 w-20 opacity-50" />
              </div>

              {/* Weekly Activity */}
              <div className="mt-6">
                <p className="text-sm opacity-90 mb-2">This Week</p>
                <div className="flex gap-2">
                  {days.map((day, i) => (
                    <div key={i} className="flex-1 text-center">
                      <div className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center ${
                        streakData.weeklyActivity[i] ? 'bg-white/30' : 'bg-white/10'
                      }`}>
                        {streakData.weeklyActivity[i] && <Flame className="h-4 w-4" />}
                      </div>
                      <span className="text-xs mt-1 block">{day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Challenges */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Daily Challenges</h2>
            <Badge variant="secondary">
              <Calendar className="h-3 w-3 mr-1" />
              Resets in 8h
            </Badge>
          </div>
          <div className="space-y-3">
            {dailyChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={challenge.completed ? 'bg-primary/10 border-primary/30' : ''}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      challenge.completed ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      {challenge.completed ? '✓' : <Target className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{challenge.title}</p>
                      {!challenge.completed && challenge.progress !== undefined && (
                        <Progress value={(challenge.progress / challenge.target!) * 100} className="h-2 mt-2" />
                      )}
                    </div>
                    <Badge variant={challenge.completed ? 'default' : 'outline'}>
                      +{challenge.points} pts
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Achievements</h2>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={!achievement.earned ? 'opacity-60' : ''}>
                    <CardContent className="p-4 text-center">
                      <div className={`h-12 w-12 mx-auto rounded-full flex items-center justify-center mb-3 ${
                        achievement.earned ? 'bg-primary/20' : 'bg-muted'
                      }`}>
                        <Icon className={`h-6 w-6 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                      <p className="font-medium text-sm">{achievement.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{achievement.description}</p>
                      {achievement.earned ? (
                        <Badge variant="secondary" className="mt-2 text-xs">Earned</Badge>
                      ) : (
                        <Progress value={achievement.progress} className="h-1.5 mt-3" />
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default StreaksGamification;
