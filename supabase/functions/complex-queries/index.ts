import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QueryRequest {
  query_type: 
    | 'feed_with_engagement'
    | 'restaurant_search'
    | 'user_wallet'
    | 'leaderboard'
    | 'restaurant_ugc'
    | 'trending_deals'
    | 'nearby_events';
  params: Record<string, any>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { query_type, params }: QueryRequest = await req.json();

    console.log(`[Complex Query] Processing: ${query_type}`);

    let result: any;

    switch (query_type) {
      case 'feed_with_engagement':
        result = await getFeedWithEngagement(supabase, params);
        break;
      case 'restaurant_search':
        result = await searchRestaurants(supabase, params);
        break;
      case 'user_wallet':
        result = await getUserWallet(supabase, params as { user_id: string });
        break;
      case 'leaderboard':
        result = await getLeaderboard(supabase, params as { type: 'streak' | 'points' | 'posts'; limit?: number });
        break;
      case 'restaurant_ugc':
        result = await getRestaurantUGC(supabase, params as { restaurant_id: string; status?: 'pending' | 'approved' | 'rejected'; limit?: number; offset?: number });
        break;
      case 'trending_deals':
        result = await getTrendingDeals(supabase, params as { limit?: number });
        break;
      case 'nearby_events':
        result = await getNearbyEvents(supabase, params);
        break;
      default:
        throw new Error(`Unknown query type: ${query_type}`);
    }

    console.log(`[Complex Query] Successfully processed: ${query_type}`);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Complex Query] Error:', error);
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function getFeedWithEngagement(supabase: any, params: {
  user_id?: string;
  limit?: number;
  offset?: number;
}) {
  const limit = params.limit || 20;
  const offset = params.offset || 0;

  // Get posts with all related data
  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id,
      caption,
      media_url,
      hashtags,
      created_at,
      user:profiles!posts_user_id_fkey (
        id,
        name,
        profile_image_url,
        points
      ),
      restaurant:restaurants!posts_restaurant_id_fkey (
        id,
        name,
        cuisine_type,
        profile_image_url
      ),
      deal:deals!posts_deal_id_fkey (
        id,
        title,
        discount_percent,
        expiry_datetime
      )
    `)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  // Get engagement counts for each post
  const postIds = (posts || []).map((p: any) => p.id);

  const [likesResult, commentsResult, userLikesResult] = await Promise.all([
    // Like counts
    supabase
      .from('likes')
      .select('post_id')
      .in('post_id', postIds),
    // Comment counts
    supabase
      .from('comments')
      .select('post_id')
      .in('post_id', postIds),
    // User's likes (if user_id provided)
    params.user_id
      ? supabase
          .from('likes')
          .select('post_id')
          .eq('user_id', params.user_id)
          .in('post_id', postIds)
      : { data: [] }
  ]);

  // Count likes per post
  const likeCounts: Record<string, number> = {};
  (likesResult.data || []).forEach((l: any) => {
    likeCounts[l.post_id] = (likeCounts[l.post_id] || 0) + 1;
  });

  // Count comments per post
  const commentCounts: Record<string, number> = {};
  (commentsResult.data || []).forEach((c: any) => {
    commentCounts[c.post_id] = (commentCounts[c.post_id] || 0) + 1;
  });

  // User's liked posts
  const userLikedPosts = new Set((userLikesResult.data || []).map((l: any) => l.post_id));

  // Get deal claim counts
  const dealIds = (posts || []).filter((p: any) => p.deal).map((p: any) => p.deal.id);
  const { data: dealClaims } = await supabase
    .from('deal_redemptions')
    .select('deal_id')
    .in('deal_id', dealIds);

  const dealClaimCounts: Record<string, number> = {};
  (dealClaims || []).forEach((c: any) => {
    dealClaimCounts[c.deal_id] = (dealClaimCounts[c.deal_id] || 0) + 1;
  });

  // Combine data
  const enrichedPosts = (posts || []).map((post: any) => ({
    ...post,
    engagement: {
      likes: likeCounts[post.id] || 0,
      comments: commentCounts[post.id] || 0,
      is_liked: userLikedPosts.has(post.id)
    },
    deal: post.deal ? {
      ...post.deal,
      claim_count: dealClaimCounts[post.deal.id] || 0
    } : null
  }));

  return {
    posts: enrichedPosts,
    pagination: {
      limit,
      offset,
      has_more: (posts || []).length === limit
    }
  };
}

async function searchRestaurants(supabase: any, params: {
  query?: string;
  cuisine_type?: string;
  has_active_deals?: boolean;
  limit?: number;
}) {
  let query = supabase
    .from('restaurants')
    .select(`
      id,
      name,
      address,
      cuisine_type,
      profile_image_url,
      status
    `)
    .eq('status', 'active');

  if (params.query) {
    query = query.or(`name.ilike.%${params.query}%,cuisine_type.ilike.%${params.query}%`);
  }

  if (params.cuisine_type) {
    query = query.eq('cuisine_type', params.cuisine_type);
  }

  const { data: restaurants, error } = await query.limit(params.limit || 20);

  if (error) throw error;

  // Get active deals for each restaurant
  const restaurantIds = (restaurants || []).map((r: any) => r.id);
  const { data: deals } = await supabase
    .from('deals')
    .select('id, restaurant_id, title, discount_percent')
    .in('restaurant_id', restaurantIds)
    .or(`expiry_datetime.is.null,expiry_datetime.gte.${new Date().toISOString()}`);

  // Group deals by restaurant
  const dealsByRestaurant: Record<string, any[]> = {};
  (deals || []).forEach((d: any) => {
    if (!dealsByRestaurant[d.restaurant_id]) {
      dealsByRestaurant[d.restaurant_id] = [];
    }
    dealsByRestaurant[d.restaurant_id].push(d);
  });

  // Get post counts (UGC)
  const { data: postCounts } = await supabase
    .from('posts')
    .select('restaurant_id')
    .in('restaurant_id', restaurantIds);

  const ugcCounts: Record<string, number> = {};
  (postCounts || []).forEach((p: any) => {
    ugcCounts[p.restaurant_id] = (ugcCounts[p.restaurant_id] || 0) + 1;
  });

  let enrichedRestaurants = (restaurants || []).map((r: any) => ({
    ...r,
    active_deals: dealsByRestaurant[r.id] || [],
    ugc_count: ugcCounts[r.id] || 0
  }));

  // Filter by active deals if requested
  if (params.has_active_deals) {
    enrichedRestaurants = enrichedRestaurants.filter((r: any) => r.active_deals.length > 0);
  }

  return { restaurants: enrichedRestaurants };
}

async function getUserWallet(supabase: any, params: { user_id: string }) {
  const { user_id } = params;

  // Get all user's deal redemptions with deal details
  const { data: redemptions, error } = await supabase
    .from('deal_redemptions')
    .select(`
      id,
      status,
      claimed_at,
      redeemed_at,
      qr_code_data,
      deal:deals!deal_redemptions_deal_id_fkey (
        id,
        title,
        description,
        discount_percent,
        expiry_datetime,
        restaurant:restaurants!deals_restaurant_id_fkey (
          id,
          name,
          address,
          profile_image_url
        )
      )
    `)
    .eq('user_id', user_id)
    .order('claimed_at', { ascending: false });

  if (error) throw error;

  // Get user profile for points/tier
  const { data: profile } = await supabase
    .from('profiles')
    .select(`
      id,
      name,
      points,
      streak_count,
      tier:loyalty_tiers!profiles_tier_id_fkey (
        id,
        name,
        points_required,
        benefits
      )
    `)
    .eq('id', user_id)
    .single();

  // Get user badges
  const { data: badges } = await supabase
    .from('user_badges')
    .select('*')
    .eq('user_id', user_id)
    .order('date_awarded', { ascending: false });

  // Categorize redemptions
  const now = new Date();
  const categorized = {
    active: [] as any[],
    redeemed: [] as any[],
    expired: [] as any[]
  };

  (redemptions || []).forEach((r: any) => {
    if (r.status === 'redeemed') {
      categorized.redeemed.push(r);
    } else if (r.status === 'expired' || 
               (r.deal?.expiry_datetime && new Date(r.deal.expiry_datetime) < now)) {
      categorized.expired.push(r);
    } else {
      categorized.active.push(r);
    }
  });

  return {
    profile,
    badges: badges || [],
    wallet: {
      active: categorized.active,
      redeemed: categorized.redeemed,
      expired: categorized.expired,
      total_savings: categorized.redeemed.reduce((sum: number, r: any) => 
        sum + (r.deal?.discount_percent || 0), 0)
    }
  };
}

async function getLeaderboard(supabase: any, params: {
  type: 'streak' | 'points' | 'posts';
  limit?: number;
}) {
  const limit = params.limit || 10;
  let orderColumn: string;

  switch (params.type) {
    case 'streak':
      orderColumn = 'streak_count';
      break;
    case 'points':
      orderColumn = 'points';
      break;
    case 'posts':
      // For posts, we need a different approach
      const { data: postCounts } = await supabase
        .from('posts')
        .select('user_id');

      const userPostCounts: Record<string, number> = {};
      (postCounts || []).forEach((p: any) => {
        userPostCounts[p.user_id] = (userPostCounts[p.user_id] || 0) + 1;
      });

      const topPosters = Object.entries(userPostCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);

      const { data: posterProfiles } = await supabase
        .from('profiles')
        .select('id, name, profile_image_url, points, streak_count')
        .in('id', topPosters.map(([id]) => id));

      return {
        type: 'posts',
        leaderboard: topPosters.map(([userId, count], index) => ({
          rank: index + 1,
          post_count: count,
          ...(posterProfiles || []).find((p: any) => p.id === userId)
        }))
      };
    default:
      throw new Error(`Invalid leaderboard type: ${params.type}`);
  }

  const { data: leaders, error } = await supabase
    .from('profiles')
    .select('id, name, profile_image_url, points, streak_count')
    .order(orderColumn, { ascending: false })
    .limit(limit);

  if (error) throw error;

  return {
    type: params.type,
    leaderboard: (leaders || []).map((l: any, index: number) => ({
      rank: index + 1,
      ...l
    }))
  };
}

async function getRestaurantUGC(supabase: any, params: {
  restaurant_id: string;
  status?: 'pending' | 'approved' | 'rejected';
  limit?: number;
  offset?: number;
}) {
  const limit = params.limit || 20;
  const offset = params.offset || 0;

  const { data: posts, error } = await supabase
    .from('posts')
    .select(`
      id,
      caption,
      media_url,
      hashtags,
      created_at,
      user:profiles!posts_user_id_fkey (
        id,
        name,
        profile_image_url,
        points
      )
    `)
    .eq('restaurant_id', params.restaurant_id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;

  // Get engagement for each post
  const postIds = (posts || []).map((p: any) => p.id);
  
  const [likesResult, commentsResult] = await Promise.all([
    supabase.from('likes').select('post_id').in('post_id', postIds),
    supabase.from('comments').select('post_id').in('post_id', postIds)
  ]);

  const likeCounts: Record<string, number> = {};
  (likesResult.data || []).forEach((l: any) => {
    likeCounts[l.post_id] = (likeCounts[l.post_id] || 0) + 1;
  });

  const commentCounts: Record<string, number> = {};
  (commentsResult.data || []).forEach((c: any) => {
    commentCounts[c.post_id] = (commentCounts[c.post_id] || 0) + 1;
  });

  const enrichedPosts = (posts || []).map((post: any) => ({
    ...post,
    engagement: {
      likes: likeCounts[post.id] || 0,
      comments: commentCounts[post.id] || 0
    }
  }));

  return {
    posts: enrichedPosts,
    pagination: {
      limit,
      offset,
      has_more: (posts || []).length === limit
    }
  };
}

async function getTrendingDeals(supabase: any, params: { limit?: number }) {
  const limit = params.limit || 10;
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Get all active deals
  const { data: deals, error } = await supabase
    .from('deals')
    .select(`
      id,
      title,
      description,
      discount_percent,
      expiry_datetime,
      restaurant:restaurants!deals_restaurant_id_fkey (
        id,
        name,
        profile_image_url,
        cuisine_type
      )
    `)
    .or(`expiry_datetime.is.null,expiry_datetime.gte.${new Date().toISOString()}`);

  if (error) throw error;

  // Get claim counts from last 7 days
  const dealIds = (deals || []).map((d: any) => d.id);
  const { data: recentClaims } = await supabase
    .from('deal_redemptions')
    .select('deal_id')
    .in('deal_id', dealIds)
    .gte('claimed_at', sevenDaysAgo);

  const claimCounts: Record<string, number> = {};
  (recentClaims || []).forEach((c: any) => {
    claimCounts[c.deal_id] = (claimCounts[c.deal_id] || 0) + 1;
  });

  // Calculate trending score (claims + discount value)
  const scoredDeals = (deals || []).map((deal: any) => ({
    ...deal,
    claim_count: claimCounts[deal.id] || 0,
    trending_score: (claimCounts[deal.id] || 0) * 10 + (deal.discount_percent || 0)
  }));

  // Sort by trending score
  scoredDeals.sort((a: any, b: any) => b.trending_score - a.trending_score);

  return {
    deals: scoredDeals.slice(0, limit)
  };
}

async function getNearbyEvents(supabase: any, params: {
  limit?: number;
  include_past?: boolean;
}) {
  const limit = params.limit || 10;
  const now = new Date().toISOString();

  let query = supabase
    .from('events')
    .select(`
      id,
      name,
      description,
      location,
      start_datetime,
      end_datetime,
      organizer_type,
      organizer_id
    `)
    .order('start_datetime', { ascending: true })
    .limit(limit);

  if (!params.include_past) {
    query = query.gte('start_datetime', now);
  }

  const { data: events, error } = await query;

  if (error) throw error;

  // Get ticket info for each event
  const eventIds = (events || []).map((e: any) => e.id);
  const { data: tickets } = await supabase
    .from('ticket_sales')
    .select('event_id, quantity')
    .in('event_id', eventIds);

  const ticketCounts: Record<string, number> = {};
  (tickets || []).forEach((t: any) => {
    ticketCounts[t.event_id] = (ticketCounts[t.event_id] || 0) + (t.quantity || 1);
  });

  // Get catering requests
  const { data: cateringRequests } = await supabase
    .from('catering_requests')
    .select('event_id')
    .in('event_id', eventIds);

  const cateringCounts: Record<string, number> = {};
  (cateringRequests || []).forEach((c: any) => {
    cateringCounts[c.event_id] = (cateringCounts[c.event_id] || 0) + 1;
  });

  const enrichedEvents = (events || []).map((event: any) => ({
    ...event,
    tickets_sold: ticketCounts[event.id] || 0,
    catering_requests: cateringCounts[event.id] || 0
  }));

  return { events: enrichedEvents };
}
