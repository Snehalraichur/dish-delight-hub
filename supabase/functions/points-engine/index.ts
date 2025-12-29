import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PointsRequest {
  action: 'award_points' | 'check_tier' | 'update_streak' | 'redeem_reward';
  user_id: string;
  action_type?: string;
  metadata?: Record<string, any>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, user_id, action_type, metadata }: PointsRequest = await req.json();

    console.log(`[Points Engine] Processing: ${action} for user: ${user_id}`);

    let result: any;

    switch (action) {
      case 'award_points':
        result = await awardPoints(supabase, user_id, action_type!, metadata);
        break;
      case 'check_tier':
        result = await checkAndUpdateTier(supabase, user_id);
        break;
      case 'update_streak':
        result = await updateStreak(supabase, user_id);
        break;
      case 'redeem_reward':
        result = await redeemReward(supabase, user_id, metadata as { reward_id: string; points_cost: number });
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    console.log(`[Points Engine] Successfully processed: ${action}`);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Points Engine] Error:', error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function awardPoints(
  supabase: any, 
  userId: string, 
  actionType: string, 
  metadata?: Record<string, any>
) {
  // Get the reward rule for this action
  const { data: rule } = await supabase
    .from('reward_rules')
    .select('*')
    .eq('action_type', actionType)
    .eq('is_active', true)
    .maybeSingle();

  if (!rule) {
    console.log(`[Points Engine] No active rule for action: ${actionType}`);
    return { points_awarded: 0, message: 'No reward rule found for this action' };
  }

  // Check daily limit
  if (rule.max_daily_limit) {
    const today = new Date().toISOString().split('T')[0];
    const { count } = await supabase
      .from('user_badges')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('badge_name', `daily_${actionType}`)
      .gte('date_awarded', `${today}T00:00:00Z`)
      .lte('date_awarded', `${today}T23:59:59Z`);

    if (count && count >= rule.max_daily_limit) {
      console.log(`[Points Engine] Daily limit reached for: ${actionType}`);
      return { 
        points_awarded: 0, 
        message: 'Daily limit reached for this action',
        daily_limit: rule.max_daily_limit
      };
    }
  }

  // Calculate points with multiplier
  let pointsToAward = rule.points_awarded;
  
  // Apply streak multiplier
  const { data: profile } = await supabase
    .from('profiles')
    .select('streak_count, points')
    .eq('id', userId)
    .single();

  if (profile && profile.streak_count >= 7) {
    const streakMultiplier = Math.min(1 + (profile.streak_count * 0.02), 2); // Max 2x
    pointsToAward = Math.floor(pointsToAward * streakMultiplier);
  }

  // Apply rule multiplier
  if (rule.multiplier && rule.multiplier > 1) {
    pointsToAward = Math.floor(pointsToAward * rule.multiplier);
  }

  // Update user points
  const newPoints = (profile?.points || 0) + pointsToAward;
  await supabase
    .from('profiles')
    .update({ points: newPoints })
    .eq('id', userId);

  // Record the activity (using badges as activity log)
  await supabase.from('user_badges').insert({
    user_id: userId,
    badge_name: `activity_${actionType}`,
    points: pointsToAward
  });

  // Check for new badges
  const newBadges = await checkForNewBadges(supabase, userId, actionType, newPoints);

  // Check tier upgrade
  const tierResult = await checkAndUpdateTier(supabase, userId);

  return {
    points_awarded: pointsToAward,
    total_points: newPoints,
    new_badges: newBadges,
    tier_update: tierResult.upgraded ? tierResult : null
  };
}

async function checkForNewBadges(
  supabase: any, 
  userId: string, 
  actionType: string, 
  totalPoints: number
): Promise<any[]> {
  const newBadges: any[] = [];

  // Get existing badges
  const { data: existingBadges } = await supabase
    .from('user_badges')
    .select('badge_name')
    .eq('user_id', userId);

  const hasBadge = (name: string) => 
    (existingBadges || []).some((b: any) => b.badge_name === name);

  // First post badge
  if (actionType === 'post' && !hasBadge('first_post')) {
    await supabase.from('user_badges').insert({
      user_id: userId,
      badge_name: 'first_post',
      points: 50
    });
    newBadges.push({ name: 'first_post', points: 50 });
  }

  // Deal hunter badge (5 redemptions)
  if (actionType === 'deal_redemption') {
    const { count } = await supabase
      .from('deal_redemptions')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'redeemed');

    if (count && count >= 5 && !hasBadge('deal_hunter')) {
      await supabase.from('user_badges').insert({
        user_id: userId,
        badge_name: 'deal_hunter',
        points: 100
      });
      newBadges.push({ name: 'deal_hunter', points: 100 });
    }
  }

  // Social butterfly (50 likes given)
  if (actionType === 'like') {
    const { count } = await supabase
      .from('likes')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId);

    if (count && count >= 50 && !hasBadge('social_butterfly')) {
      await supabase.from('user_badges').insert({
        user_id: userId,
        badge_name: 'social_butterfly',
        points: 75
      });
      newBadges.push({ name: 'social_butterfly', points: 75 });
    }
  }

  // Points milestones
  const pointsMilestones = [
    { threshold: 500, badge: 'rising_star', points: 50 },
    { threshold: 2000, badge: 'foodie', points: 100 },
    { threshold: 5000, badge: 'influencer', points: 200 },
    { threshold: 10000, badge: 'legend', points: 500 }
  ];

  for (const milestone of pointsMilestones) {
    if (totalPoints >= milestone.threshold && !hasBadge(milestone.badge)) {
      await supabase.from('user_badges').insert({
        user_id: userId,
        badge_name: milestone.badge,
        points: milestone.points
      });
      newBadges.push({ name: milestone.badge, points: milestone.points });
    }
  }

  return newBadges;
}

async function checkAndUpdateTier(supabase: any, userId: string) {
  // Get user's current points and tier
  const { data: profile } = await supabase
    .from('profiles')
    .select(`
      id,
      points,
      tier_id,
      tier:loyalty_tiers!profiles_tier_id_fkey (
        id,
        name,
        points_required
      )
    `)
    .eq('id', userId)
    .single();

  if (!profile) {
    throw new Error('User not found');
  }

  // Get all tiers ordered by points
  const { data: tiers } = await supabase
    .from('loyalty_tiers')
    .select('*')
    .order('points_required', { ascending: false });

  // Find the appropriate tier
  const newTier = (tiers || []).find((t: any) => profile.points >= t.points_required);

  if (!newTier) {
    return { upgraded: false, current_tier: profile.tier };
  }

  // Check if tier changed
  if (newTier.id !== profile.tier_id) {
    await supabase
      .from('profiles')
      .update({ tier_id: newTier.id })
      .eq('id', userId);

    return {
      upgraded: true,
      previous_tier: profile.tier,
      new_tier: newTier,
      message: `Congratulations! You've been promoted to ${newTier.name}!`
    };
  }

  // Calculate progress to next tier
  const nextTier = (tiers || [])
    .filter((t: any) => t.points_required > profile.points)
    .sort((a: any, b: any) => a.points_required - b.points_required)[0];

  return {
    upgraded: false,
    current_tier: newTier,
    next_tier: nextTier || null,
    points_to_next: nextTier ? nextTier.points_required - profile.points : 0
  };
}

async function updateStreak(supabase: any, userId: string) {
  // Get user's profile and last post
  const { data: profile } = await supabase
    .from('profiles')
    .select('streak_count, updated_at')
    .eq('id', userId)
    .single();

  const { data: lastPost } = await supabase
    .from('posts')
    .select('created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!lastPost) {
    return { streak: 0, message: 'No posts found' };
  }

  const lastPostDate = new Date(lastPost.created_at);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastPostDay = lastPostDate.toISOString().split('T')[0];
  const todayStr = today.toISOString().split('T')[0];
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let newStreak = profile?.streak_count || 0;
  let streakStatus = 'maintained';

  if (lastPostDay === todayStr) {
    // Posted today - streak continues or starts
    if (newStreak === 0) {
      newStreak = 1;
      streakStatus = 'started';
    }
  } else if (lastPostDay === yesterdayStr) {
    // Posted yesterday - streak at risk
    streakStatus = 'at_risk';
  } else {
    // More than a day since last post - streak broken
    newStreak = 0;
    streakStatus = 'broken';
  }

  // Update profile
  await supabase
    .from('profiles')
    .update({ 
      streak_count: newStreak,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  // Check for streak badges
  const streakBadges = [
    { days: 7, badge: 'week_warrior', points: 100 },
    { days: 14, badge: 'fortnight_fighter', points: 200 },
    { days: 30, badge: 'streak_master', points: 500 }
  ];

  const { data: existingBadges } = await supabase
    .from('user_badges')
    .select('badge_name')
    .eq('user_id', userId);

  const hasBadge = (name: string) => 
    (existingBadges || []).some((b: any) => b.badge_name === name);

  const newBadges: any[] = [];
  for (const sb of streakBadges) {
    if (newStreak >= sb.days && !hasBadge(sb.badge)) {
      await supabase.from('user_badges').insert({
        user_id: userId,
        badge_name: sb.badge,
        points: sb.points
      });
      newBadges.push(sb);
    }
  }

  return {
    streak: newStreak,
    status: streakStatus,
    new_badges: newBadges,
    bonus_multiplier: newStreak >= 7 ? Math.min(1 + (newStreak * 0.02), 2) : 1
  };
}

async function redeemReward(
  supabase: any, 
  userId: string, 
  metadata: { reward_id: string; points_cost: number }
) {
  const { reward_id, points_cost } = metadata;

  // Get user's current points
  const { data: profile } = await supabase
    .from('profiles')
    .select('points')
    .eq('id', userId)
    .single();

  if (!profile) {
    throw new Error('User not found');
  }

  if (profile.points < points_cost) {
    return {
      success: false,
      message: 'Insufficient points',
      current_points: profile.points,
      required_points: points_cost
    };
  }

  // Deduct points
  const newPoints = profile.points - points_cost;
  await supabase
    .from('profiles')
    .update({ points: newPoints })
    .eq('id', userId);

  // Record the redemption
  await supabase.from('user_badges').insert({
    user_id: userId,
    badge_name: `reward_redeemed_${reward_id}`,
    points: -points_cost
  });

  return {
    success: true,
    points_spent: points_cost,
    remaining_points: newPoints,
    reward_id
  };
}
