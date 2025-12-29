-- Create story_highlights table to save stories permanently
CREATE TABLE public.story_highlights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL DEFAULT 'Highlights',
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create highlight_stories junction table
CREATE TABLE public.highlight_stories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  highlight_id UUID NOT NULL REFERENCES public.story_highlights(id) ON DELETE CASCADE,
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(highlight_id, story_id)
);

-- Create story_archives table to auto-save expired stories
CREATE TABLE public.story_archives (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  original_story_id UUID,
  media_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  archived_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create story_mentions table for @mentions
CREATE TABLE public.story_mentions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  mentioned_user_id UUID NOT NULL,
  position_x NUMERIC,
  position_y NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.story_highlights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.highlight_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_archives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_mentions ENABLE ROW LEVEL SECURITY;

-- Story highlights policies
CREATE POLICY "Users can manage own highlights"
ON public.story_highlights FOR ALL
USING (user_id = auth.uid());

CREATE POLICY "Anyone can view highlights"
ON public.story_highlights FOR SELECT
USING (true);

-- Highlight stories policies
CREATE POLICY "Users can add to own highlights"
ON public.highlight_stories FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.story_highlights
    WHERE story_highlights.id = highlight_stories.highlight_id
    AND story_highlights.user_id = auth.uid()
  )
);

CREATE POLICY "Anyone can view highlight stories"
ON public.highlight_stories FOR SELECT
USING (true);

CREATE POLICY "Users can remove from own highlights"
ON public.highlight_stories FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.story_highlights
    WHERE story_highlights.id = highlight_stories.highlight_id
    AND story_highlights.user_id = auth.uid()
  )
);

-- Story archives policies
CREATE POLICY "Users can manage own archives"
ON public.story_archives FOR ALL
USING (user_id = auth.uid());

-- Story mentions policies
CREATE POLICY "Story owners can add mentions"
ON public.story_mentions FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.stories
    WHERE stories.id = story_mentions.story_id
    AND stories.user_id = auth.uid()
  )
);

CREATE POLICY "Anyone can view mentions on unexpired stories"
ON public.story_mentions FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.stories
    WHERE stories.id = story_mentions.story_id
    AND stories.expires_at > now()
  )
);

-- Add trigger for updated_at on highlights
CREATE TRIGGER update_story_highlights_updated_at
BEFORE UPDATE ON public.story_highlights
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for highlights
ALTER PUBLICATION supabase_realtime ADD TABLE public.story_highlights;
ALTER PUBLICATION supabase_realtime ADD TABLE public.highlight_stories;