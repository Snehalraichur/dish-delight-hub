-- Create story_reactions table for emoji reactions
CREATE TABLE public.story_reactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  emoji TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(story_id, user_id, emoji)
);

-- Enable RLS
ALTER TABLE public.story_reactions ENABLE ROW LEVEL SECURITY;

-- Story reactions policies
CREATE POLICY "Users can add reactions"
ON public.story_reactions
FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Anyone can view reactions on unexpired stories"
ON public.story_reactions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.stories
    WHERE stories.id = story_reactions.story_id
    AND stories.expires_at > now()
  )
);

CREATE POLICY "Users can delete own reactions"
ON public.story_reactions
FOR DELETE
USING (user_id = auth.uid());

-- Enable realtime for reactions
ALTER PUBLICATION supabase_realtime ADD TABLE public.story_reactions;