-- Add ticket_sales table for events
CREATE TABLE public.ticket_sales (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    ticket_type TEXT DEFAULT 'general',
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'refunded')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add brand_partnerships table
CREATE TABLE public.brand_partnerships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_name TEXT NOT NULL,
    contact_email TEXT,
    contact_phone TEXT,
    logo_url TEXT,
    partnership_type TEXT CHECK (partnership_type IN ('sponsor', 'co-brand', 'affiliate', 'exclusive')),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(12, 2),
    status TEXT DEFAULT 'active' CHECK (status IN ('pending', 'active', 'paused', 'completed', 'cancelled')),
    terms JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add support_tickets table
CREATE TABLE public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    restaurant_id UUID REFERENCES public.restaurants(id) ON DELETE SET NULL,
    subject TEXT NOT NULL,
    description TEXT,
    category TEXT CHECK (category IN ('redemption', 'account', 'payment', 'technical', 'complaint', 'other')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting', 'resolved', 'closed')),
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Add reward_rules table for incentive engine
CREATE TABLE public.reward_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    action_type TEXT NOT NULL CHECK (action_type IN ('post', 'like', 'comment', 'share', 'redemption', 'referral', 'streak', 'visit')),
    points_awarded INTEGER NOT NULL DEFAULT 0,
    conditions JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT true,
    multiplier DECIMAL(3, 2) DEFAULT 1.0,
    max_daily_limit INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on new tables
ALTER TABLE public.ticket_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_rules ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ticket_sales
CREATE POLICY "Users can view own tickets" ON public.ticket_sales FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can purchase tickets" ON public.ticket_sales FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can manage tickets" ON public.ticket_sales FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for brand_partnerships (admin only)
CREATE POLICY "Admins can manage partnerships" ON public.brand_partnerships FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Active partnerships are viewable" ON public.brand_partnerships FOR SELECT USING (status = 'active');

-- RLS Policies for support_tickets
CREATE POLICY "Users can view own tickets" ON public.support_tickets FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create tickets" ON public.support_tickets FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Admins can manage all tickets" ON public.support_tickets FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for reward_rules (admin manage, public view active)
CREATE POLICY "Anyone can view active rules" ON public.reward_rules FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage rules" ON public.reward_rules FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Add triggers for updated_at
CREATE TRIGGER update_brand_partnerships_updated_at BEFORE UPDATE ON public.brand_partnerships FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reward_rules_updated_at BEFORE UPDATE ON public.reward_rules FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default reward rules
INSERT INTO public.reward_rules (name, description, action_type, points_awarded, conditions) VALUES
('Post Photo', 'Earn points for posting food photos', 'post', 50, '{"min_caption_length": 10}'),
('Receive Like', 'Earn points when others like your posts', 'like', 5, '{}'),
('Leave Comment', 'Earn points for engaging with others', 'comment', 10, '{"min_length": 5}'),
('Share Post', 'Earn points for sharing content', 'share', 15, '{}'),
('Redeem Deal', 'Earn points for using deals', 'redemption', 100, '{}'),
('Daily Streak', 'Bonus points for posting daily', 'streak', 20, '{"per_day": true}'),
('Referral', 'Earn points for referring friends', 'referral', 200, '{"per_referral": true}'),
('Restaurant Visit', 'Earn points for visiting restaurants', 'visit', 30, '{}');