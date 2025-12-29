import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface QRValidationRequest {
  qr_code_data: string;
  restaurant_id: string;
  staff_user_id?: string;
}

interface FraudCheckResult {
  is_suspicious: boolean;
  reasons: string[];
  risk_score: number;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { qr_code_data, restaurant_id, staff_user_id }: QRValidationRequest = await req.json();

    console.log(`[QR Validation] Processing QR: ${qr_code_data} for restaurant: ${restaurant_id}`);

    // Step 1: Find the redemption by QR code
    const { data: redemption, error: redemptionError } = await supabase
      .from('deal_redemptions')
      .select(`
        *,
        deal:deals!deal_redemptions_deal_id_fkey (
          id,
          title,
          discount_percent,
          restaurant_id,
          expiry_datetime,
          max_redemptions
        ),
        user:profiles!deal_redemptions_user_id_fkey (
          id,
          name,
          email,
          points,
          streak_count
        )
      `)
      .eq('qr_code_data', qr_code_data)
      .maybeSingle();

    if (redemptionError) {
      console.error('[QR Validation] Error fetching redemption:', redemptionError);
      throw new Error('Failed to fetch redemption data');
    }

    if (!redemption) {
      console.log('[QR Validation] No redemption found for QR code');
      return new Response(JSON.stringify({
        valid: false,
        error: 'Invalid QR code - no redemption found',
        error_code: 'QR_NOT_FOUND'
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Step 2: Validate restaurant match
    if (redemption.deal?.restaurant_id !== restaurant_id) {
      console.log('[QR Validation] Restaurant mismatch');
      return new Response(JSON.stringify({
        valid: false,
        error: 'This deal is not valid at this restaurant',
        error_code: 'RESTAURANT_MISMATCH'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Step 3: Check if already redeemed
    if (redemption.status === 'redeemed') {
      console.log('[QR Validation] Already redeemed at:', redemption.redeemed_at);
      return new Response(JSON.stringify({
        valid: false,
        error: 'This deal has already been redeemed',
        error_code: 'ALREADY_REDEEMED',
        redeemed_at: redemption.redeemed_at
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Step 4: Check if expired
    if (redemption.status === 'expired' || 
        (redemption.deal?.expiry_datetime && new Date(redemption.deal.expiry_datetime) < new Date())) {
      console.log('[QR Validation] Deal expired');
      return new Response(JSON.stringify({
        valid: false,
        error: 'This deal has expired',
        error_code: 'DEAL_EXPIRED'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Step 5: Fraud detection checks
    const fraudCheck = await performFraudCheck(supabase, redemption, restaurant_id);
    
    if (fraudCheck.is_suspicious && fraudCheck.risk_score > 80) {
      console.log('[QR Validation] Fraud detected:', fraudCheck.reasons);
      
      // Log suspicious activity
      await supabase.from('admin_actions').insert({
        admin_id: staff_user_id || '00000000-0000-0000-0000-000000000000',
        action_type: 'fraud_detection',
        target_type: 'deal_redemption',
        target_id: redemption.id,
        details: {
          fraud_reasons: fraudCheck.reasons,
          risk_score: fraudCheck.risk_score,
          qr_code: qr_code_data
        }
      });

      return new Response(JSON.stringify({
        valid: false,
        error: 'Suspicious activity detected. Please verify customer identity.',
        error_code: 'FRAUD_SUSPECTED',
        fraud_details: fraudCheck
      }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Step 6: Process successful redemption
    const now = new Date().toISOString();
    const pointsEarned = Math.floor((redemption.deal?.discount_percent || 10) * 2);

    // Update redemption status
    const { error: updateError } = await supabase
      .from('deal_redemptions')
      .update({
        status: 'redeemed',
        redeemed_at: now
      })
      .eq('id', redemption.id);

    if (updateError) {
      console.error('[QR Validation] Error updating redemption:', updateError);
      throw new Error('Failed to update redemption status');
    }

    // Award points to user
    if (redemption.user) {
      const newPoints = (redemption.user.points || 0) + pointsEarned;
      await supabase
        .from('profiles')
        .update({ points: newPoints })
        .eq('id', redemption.user_id);

      // Award badge for first redemption
      const { data: existingBadge } = await supabase
        .from('user_badges')
        .select('id')
        .eq('user_id', redemption.user_id)
        .eq('badge_name', 'first_redemption')
        .maybeSingle();

      if (!existingBadge) {
        await supabase.from('user_badges').insert({
          user_id: redemption.user_id,
          badge_name: 'first_redemption',
          points: 50
        });
      }
    }

    console.log('[QR Validation] Successfully redeemed deal:', redemption.id);

    return new Response(JSON.stringify({
      valid: true,
      redemption_id: redemption.id,
      deal: {
        title: redemption.deal?.title,
        discount_percent: redemption.deal?.discount_percent
      },
      user: {
        name: redemption.user?.name,
        points_earned: pointsEarned
      },
      redeemed_at: now,
      fraud_check: fraudCheck
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    console.error('[QR Validation] Unexpected error:', error);
    return new Response(JSON.stringify({
      valid: false,
      error: errorMessage,
      error_code: 'INTERNAL_ERROR'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});

async function performFraudCheck(supabase: any, redemption: any, restaurant_id: string): Promise<FraudCheckResult> {
  const reasons: string[] = [];
  let riskScore = 0;

  // Check 1: Multiple redemptions in short time
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { data: recentRedemptions } = await supabase
    .from('deal_redemptions')
    .select('id')
    .eq('user_id', redemption.user_id)
    .gte('redeemed_at', oneHourAgo);

  if (recentRedemptions && recentRedemptions.length >= 3) {
    reasons.push('Multiple redemptions within last hour');
    riskScore += 30;
  }

  // Check 2: Same deal claimed multiple times by same user
  const { data: sameDealClaims } = await supabase
    .from('deal_redemptions')
    .select('id')
    .eq('user_id', redemption.user_id)
    .eq('deal_id', redemption.deal_id);

  if (sameDealClaims && sameDealClaims.length > 1) {
    reasons.push('User claimed same deal multiple times');
    riskScore += 40;
  }

  // Check 3: New account with high-value redemption
  const accountAge = Date.now() - new Date(redemption.user?.created_at || Date.now()).getTime();
  const isNewAccount = accountAge < 24 * 60 * 60 * 1000; // Less than 24 hours
  
  if (isNewAccount && (redemption.deal?.discount_percent || 0) > 30) {
    reasons.push('New account redeeming high-value deal');
    riskScore += 25;
  }

  // Check 4: Rapid claiming pattern across restaurants
  const { data: multiRestaurantClaims } = await supabase
    .from('deal_redemptions')
    .select(`
      id,
      deal:deals!deal_redemptions_deal_id_fkey (restaurant_id)
    `)
    .eq('user_id', redemption.user_id)
    .gte('claimed_at', oneHourAgo);

  if (multiRestaurantClaims) {
    const uniqueRestaurants = new Set(multiRestaurantClaims.map((c: any) => c.deal?.restaurant_id));
    if (uniqueRestaurants.size >= 3) {
      reasons.push('Claims at multiple restaurants in short period');
      riskScore += 20;
    }
  }

  return {
    is_suspicious: riskScore > 40,
    reasons,
    risk_score: Math.min(riskScore, 100)
  };
}
