import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AnalyticsRequest {
  type: 'admin_dashboard' | 'restaurant_dashboard' | 'revenue_report' | 'user_engagement';
  restaurant_id?: string;
  date_from?: string;
  date_to?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { type, restaurant_id, date_from, date_to }: AnalyticsRequest = await req.json();

    console.log(`[Analytics] Processing ${type} request`);

    const fromDate = date_from || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const toDate = date_to || new Date().toISOString();

    let result: any;

    switch (type) {
      case 'admin_dashboard':
        result = await getAdminDashboardStats(supabase, fromDate, toDate);
        break;
      case 'restaurant_dashboard':
        if (!restaurant_id) {
          throw new Error('restaurant_id is required for restaurant dashboard');
        }
        result = await getRestaurantDashboardStats(supabase, restaurant_id, fromDate, toDate);
        break;
      case 'revenue_report':
        result = await getRevenueReport(supabase, fromDate, toDate, restaurant_id);
        break;
      case 'user_engagement':
        result = await getUserEngagementStats(supabase, fromDate, toDate);
        break;
      default:
        throw new Error(`Unknown analytics type: ${type}`);
    }

    console.log(`[Analytics] Successfully processed ${type}`);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Analytics] Error:', error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function getAdminDashboardStats(supabase: any, fromDate: string, toDate: string) {
  // Parallel queries for efficiency
  const [
    usersResult,
    restaurantsResult,
    postsResult,
    redemptionsResult,
    eventsResult,
    ticketsResult,
    flaggedResult
  ] = await Promise.all([
    // Total users
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
    // Total restaurants
    supabase.from('restaurants').select('id', { count: 'exact', head: true }),
    // Posts in period
    supabase.from('posts')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', fromDate)
      .lte('created_at', toDate),
    // Redemptions in period
    supabase.from('deal_redemptions')
      .select('id, status', { count: 'exact' })
      .gte('claimed_at', fromDate)
      .lte('claimed_at', toDate),
    // Events
    supabase.from('events')
      .select('id', { count: 'exact', head: true })
      .gte('start_datetime', fromDate),
    // Ticket sales
    supabase.from('ticket_sales')
      .select('total_amount')
      .gte('created_at', fromDate)
      .lte('created_at', toDate),
    // Flagged content pending
    supabase.from('flagged_content')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'pending')
  ]);

  // Calculate redemption stats
  const redemptions = redemptionsResult.data || [];
  const totalRedemptions = redemptions.length;
  const completedRedemptions = redemptions.filter((r: any) => r.status === 'redeemed').length;
  const redemptionRate = totalRedemptions > 0 
    ? Math.round((completedRedemptions / totalRedemptions) * 100) 
    : 0;

  // Calculate revenue
  const ticketRevenue = (ticketsResult.data || []).reduce(
    (sum: number, t: any) => sum + (parseFloat(t.total_amount) || 0), 0
  );

  // Get new users this period
  const { count: newUsersCount } = await supabase
    .from('profiles')
    .select('id', { count: 'exact', head: true })
    .gte('created_at', fromDate)
    .lte('created_at', toDate);

  // Get daily activity for chart
  const { data: dailyPosts } = await supabase
    .from('posts')
    .select('created_at')
    .gte('created_at', fromDate)
    .lte('created_at', toDate);

  const dailyActivity = aggregateByDay(dailyPosts || [], 'created_at');

  return {
    overview: {
      total_users: usersResult.count || 0,
      new_users: newUsersCount || 0,
      total_restaurants: restaurantsResult.count || 0,
      posts_this_period: postsResult.count || 0,
      total_redemptions: totalRedemptions,
      redemption_rate: redemptionRate,
      upcoming_events: eventsResult.count || 0,
      ticket_revenue: ticketRevenue,
      pending_flags: flaggedResult.count || 0
    },
    charts: {
      daily_activity: dailyActivity
    },
    period: { from: fromDate, to: toDate }
  };
}

async function getRestaurantDashboardStats(
  supabase: any, 
  restaurantId: string, 
  fromDate: string, 
  toDate: string
) {
  const [
    dealsResult,
    redemptionsResult,
    postsResult,
    boostsResult
  ] = await Promise.all([
    // Active deals
    supabase.from('deals')
      .select('id, title, discount_percent, max_redemptions')
      .eq('restaurant_id', restaurantId)
      .or(`expiry_datetime.is.null,expiry_datetime.gte.${new Date().toISOString()}`),
    // Redemptions
    supabase.from('deal_redemptions')
      .select(`
        id, status, claimed_at, redeemed_at,
        deal:deals!deal_redemptions_deal_id_fkey (restaurant_id)
      `)
      .gte('claimed_at', fromDate)
      .lte('claimed_at', toDate),
    // UGC Posts tagging this restaurant
    supabase.from('posts')
      .select('id, created_at, user_id')
      .eq('restaurant_id', restaurantId)
      .gte('created_at', fromDate)
      .lte('created_at', toDate),
    // Ad boosts
    supabase.from('ad_boosts')
      .select('id, budget, metrics, status')
      .eq('restaurant_id', restaurantId)
  ]);

  // Filter redemptions for this restaurant
  const restaurantRedemptions = (redemptionsResult.data || [])
    .filter((r: any) => r.deal?.restaurant_id === restaurantId);

  const totalClaims = restaurantRedemptions.length;
  const completedRedemptions = restaurantRedemptions.filter((r: any) => r.status === 'redeemed').length;

  // Calculate boost spend and metrics
  const boosts = boostsResult.data || [];
  const totalBoostSpend = boosts.reduce((sum: number, b: any) => sum + (parseFloat(b.budget) || 0), 0);
  const totalImpressions = boosts.reduce((sum: number, b: any) => sum + (b.metrics?.impressions || 0), 0);
  const totalClicks = boosts.reduce((sum: number, b: any) => sum + (b.metrics?.clicks || 0), 0);

  // Get unique UGC creators
  const uniqueCreators = new Set((postsResult.data || []).map((p: any) => p.user_id)).size;

  // Daily redemptions for chart
  const dailyRedemptions = aggregateByDay(
    restaurantRedemptions.filter((r: any) => r.redeemed_at),
    'redeemed_at'
  );

  return {
    overview: {
      active_deals: (dealsResult.data || []).length,
      total_claims: totalClaims,
      completed_redemptions: completedRedemptions,
      redemption_rate: totalClaims > 0 ? Math.round((completedRedemptions / totalClaims) * 100) : 0,
      ugc_posts: (postsResult.data || []).length,
      unique_creators: uniqueCreators,
      total_boost_spend: totalBoostSpend,
      total_impressions: totalImpressions,
      total_clicks: totalClicks,
      ctr: totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : 0
    },
    deals: dealsResult.data || [],
    charts: {
      daily_redemptions: dailyRedemptions
    },
    period: { from: fromDate, to: toDate }
  };
}

async function getRevenueReport(
  supabase: any, 
  fromDate: string, 
  toDate: string, 
  restaurantId?: string
) {
  // Ticket sales revenue
  let ticketQuery = supabase
    .from('ticket_sales')
    .select('total_amount, created_at, event_id')
    .gte('created_at', fromDate)
    .lte('created_at', toDate);

  const { data: ticketSales } = await ticketQuery;

  // Boost revenue (platform commission assumed 15%)
  let boostQuery = supabase
    .from('ad_boosts')
    .select('budget, metrics, created_at, restaurant_id')
    .gte('created_at', fromDate)
    .lte('created_at', toDate);

  if (restaurantId) {
    boostQuery = boostQuery.eq('restaurant_id', restaurantId);
  }

  const { data: boosts } = await boostQuery;

  // Subscription revenue (simplified - would need actual payment data)
  const { data: subscriptions } = await supabase
    .from('restaurants')
    .select(`
      id,
      subscription_plan:restaurant_subscription_plans (
        price_per_month
      )
    `)
    .not('subscription_plan_id', 'is', null);

  // Calculate revenues
  const ticketRevenue = (ticketSales || []).reduce(
    (sum: number, t: any) => sum + (parseFloat(t.total_amount) || 0), 0
  );

  const boostRevenue = (boosts || []).reduce(
    (sum: number, b: any) => sum + (parseFloat(b.budget) || 0), 0
  );
  const platformBoostCommission = boostRevenue * 0.15;

  const monthlySubscriptionRevenue = (subscriptions || []).reduce(
    (sum: number, s: any) => sum + (parseFloat(s.subscription_plan?.price_per_month) || 0), 0
  );

  // Daily revenue breakdown
  const dailyTicketRevenue = aggregateRevenueByDay(ticketSales || [], 'created_at', 'total_amount');
  const dailyBoostRevenue = aggregateRevenueByDay(boosts || [], 'created_at', 'budget');

  return {
    summary: {
      ticket_sales_revenue: ticketRevenue,
      boost_spend_total: boostRevenue,
      platform_boost_commission: platformBoostCommission,
      monthly_subscription_revenue: monthlySubscriptionRevenue,
      total_platform_revenue: ticketRevenue * 0.05 + platformBoostCommission + monthlySubscriptionRevenue
    },
    breakdown: {
      tickets: {
        count: (ticketSales || []).length,
        revenue: ticketRevenue
      },
      boosts: {
        count: (boosts || []).length,
        spend: boostRevenue,
        commission: platformBoostCommission
      },
      subscriptions: {
        active_count: (subscriptions || []).length,
        monthly_revenue: monthlySubscriptionRevenue
      }
    },
    charts: {
      daily_ticket_revenue: dailyTicketRevenue,
      daily_boost_revenue: dailyBoostRevenue
    },
    period: { from: fromDate, to: toDate }
  };
}

async function getUserEngagementStats(supabase: any, fromDate: string, toDate: string) {
  const [
    postsResult,
    likesResult,
    commentsResult,
    storiesResult,
    redemptionsResult
  ] = await Promise.all([
    supabase.from('posts')
      .select('id, user_id, created_at')
      .gte('created_at', fromDate)
      .lte('created_at', toDate),
    supabase.from('likes')
      .select('id, user_id, created_at')
      .gte('created_at', fromDate)
      .lte('created_at', toDate),
    supabase.from('comments')
      .select('id, user_id, created_at')
      .gte('created_at', fromDate)
      .lte('created_at', toDate),
    supabase.from('stories')
      .select('id, user_id, created_at')
      .gte('created_at', fromDate)
      .lte('created_at', toDate),
    supabase.from('deal_redemptions')
      .select('id, user_id, claimed_at')
      .gte('claimed_at', fromDate)
      .lte('claimed_at', toDate)
  ]);

  const posts = postsResult.data || [];
  const likes = likesResult.data || [];
  const comments = commentsResult.data || [];
  const stories = storiesResult.data || [];
  const redemptions = redemptionsResult.data || [];

  // Active users (unique users who performed any action)
  const activeUsers = new Set([
    ...posts.map((p: any) => p.user_id),
    ...likes.map((l: any) => l.user_id),
    ...comments.map((c: any) => c.user_id),
    ...stories.map((s: any) => s.user_id),
    ...redemptions.map((r: any) => r.user_id)
  ]);

  // Top creators
  const creatorPosts: Record<string, number> = {};
  posts.forEach((p: any) => {
    creatorPosts[p.user_id] = (creatorPosts[p.user_id] || 0) + 1;
  });

  const topCreatorIds = Object.entries(creatorPosts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([userId, count]) => ({ user_id: userId, post_count: count }));

  // Fetch creator details
  const { data: topCreatorProfiles } = await supabase
    .from('profiles')
    .select('id, name, profile_image_url, points')
    .in('id', topCreatorIds.map(c => c.user_id));

  const topCreators = topCreatorIds.map(c => ({
    ...c,
    ...(topCreatorProfiles || []).find((p: any) => p.id === c.user_id)
  }));

  return {
    overview: {
      active_users: activeUsers.size,
      total_posts: posts.length,
      total_likes: likes.length,
      total_comments: comments.length,
      total_stories: stories.length,
      total_redemptions: redemptions.length,
      avg_engagement_per_post: posts.length > 0 
        ? ((likes.length + comments.length) / posts.length).toFixed(2) 
        : 0
    },
    top_creators: topCreators,
    charts: {
      daily_posts: aggregateByDay(posts, 'created_at'),
      daily_engagement: aggregateByDay([...likes, ...comments], 'created_at')
    },
    period: { from: fromDate, to: toDate }
  };
}

// Helper functions
function aggregateByDay(items: any[], dateField: string): Record<string, number> {
  const result: Record<string, number> = {};
  items.forEach(item => {
    if (item[dateField]) {
      const day = item[dateField].split('T')[0];
      result[day] = (result[day] || 0) + 1;
    }
  });
  return result;
}

function aggregateRevenueByDay(items: any[], dateField: string, amountField: string): Record<string, number> {
  const result: Record<string, number> = {};
  items.forEach(item => {
    if (item[dateField]) {
      const day = item[dateField].split('T')[0];
      result[day] = (result[day] || 0) + (parseFloat(item[amountField]) || 0);
    }
  });
  return result;
}
