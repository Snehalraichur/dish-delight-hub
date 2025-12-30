import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { 
  Story, 
  StoryUser, 
  GroupedStories, 
  StoryView, 
  StoryReaction,
  StoryHighlight,
  StoryArchive
} from '@/types/stories';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

// Helper to create typed supabase calls for new tables
const storyDb = {
  views: () => supabase.from('story_views' as any),
  reactions: () => supabase.from('story_reactions' as any),
  highlights: () => supabase.from('story_highlights' as any),
  highlightStories: () => supabase.from('highlight_stories' as any),
  archives: () => supabase.from('story_archives' as any),
  mentions: () => supabase.from('story_mentions' as any),
};

export function useCurrentUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id || null);
      setLoading(false);
    });
  }, []);

  return { userId, loading };
}

export function useStories() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stories')
        .select(`
          *,
          profiles:user_id (
            id,
            name,
            profile_image_url
          )
        `)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    staleTime: 0, // Always fresh
    gcTime: 1000 * 60 * 5, // 5 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('stories-hook-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'stories' },
        () => queryClient.invalidateQueries({ queryKey: ['stories'] })
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [queryClient]);

  // Transform to grouped stories
  const groupedStories: GroupedStories[] = (() => {
    const stories = query.data || [];
    if (stories.length === 0) return getMockStories();

    const groups: Record<string, GroupedStories> = {};
    stories.forEach((s: any) => {
      const story: Story = {
        id: s.id,
        userId: s.user_id,
        user: {
          id: s.user_id,
          name: s.profiles?.name || 'User',
          avatar: s.profiles?.profile_image_url || '/placeholder.svg',
          isRestaurant: false,
        },
        media: s.media_url,
        timestamp: formatDistanceToNow(new Date(s.created_at || ''), { addSuffix: true }),
      };

      if (!groups[story.userId]) {
        groups[story.userId] = { userId: story.userId, user: story.user, stories: [] };
      }
      groups[story.userId].stories.push(story);
    });

    return Object.values(groups);
  })();

  return { ...query, groupedStories };
}

export function useStoryViews(storyId: string | undefined) {
  const { userId } = useCurrentUser();

  return useQuery({
    queryKey: ['story-views', storyId],
    queryFn: async (): Promise<StoryView[]> => {
      if (!storyId || storyId.includes('-')) return [];
      
      const { data, error } = await storyDb.views()
        .select(`
          id,
          story_id,
          viewer_id,
          viewed_at
        `)
        .eq('story_id', storyId)
        .order('viewed_at', { ascending: false });
      
      if (error) throw error;
      
      // Fetch viewer profiles separately
      const viewerIds = (data || []).map((v: any) => v.viewer_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, profile_image_url')
        .in('id', viewerIds);
      
      const profileMap = new Map((profiles || []).map((p: any) => [p.id, p]));
      
      return (data || []).map((v: any) => ({
        ...v,
        viewer: profileMap.get(v.viewer_id) || null,
      })) as StoryView[];
    },
    enabled: !!storyId && !!userId,
  });
}

export function useStoryViewCount(storyId: string | undefined) {
  return useQuery({
    queryKey: ['story-view-count', storyId],
    queryFn: async () => {
      if (!storyId || storyId.includes('-')) {
        return Math.floor(Math.random() * 100) + 10; // Mock for demo
      }
      
      const { count, error } = await storyDb.views()
        .select('*', { count: 'exact', head: true })
        .eq('story_id', storyId);
      
      if (error) return 0;
      return count || 0;
    },
    enabled: !!storyId,
  });
}

export function useRecordStoryView() {
  const { userId } = useCurrentUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (storyId: string) => {
      if (!userId || storyId.includes('-')) return;
      
      await storyDb.views()
        .upsert({ story_id: storyId, viewer_id: userId }, { onConflict: 'story_id,viewer_id' });
    },
    onSuccess: (_, storyId) => {
      queryClient.invalidateQueries({ queryKey: ['story-view-count', storyId] });
    },
  });
}

export function useStoryReactions(storyId: string | undefined) {
  return useQuery({
    queryKey: ['story-reactions', storyId],
    queryFn: async (): Promise<StoryReaction[]> => {
      if (!storyId || storyId.includes('-')) return [];
      
      const { data, error } = await storyDb.reactions()
        .select('id, story_id, user_id, emoji, created_at')
        .eq('story_id', storyId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Fetch user profiles separately
      const userIds = (data || []).map((r: any) => r.user_id);
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, name, profile_image_url')
        .in('id', userIds);
      
      const profileMap = new Map((profiles || []).map((p: any) => [p.id, p]));
      
      return (data || []).map((r: any) => ({
        ...r,
        user: profileMap.get(r.user_id) || null,
      })) as StoryReaction[];
    },
    enabled: !!storyId,
  });
}

export function useSendReaction() {
  const { userId } = useCurrentUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ storyId, emoji }: { storyId: string; emoji: string }) => {
      if (!userId || storyId.includes('-')) return;
      
      await storyDb.reactions()
        .insert({ story_id: storyId, user_id: userId, emoji });
    },
    onSuccess: (_, { storyId }) => {
      queryClient.invalidateQueries({ queryKey: ['story-reactions', storyId] });
    },
  });
}

export function useUserHighlights(userId: string | undefined) {
  return useQuery({
    queryKey: ['story-highlights', userId],
    queryFn: async (): Promise<StoryHighlight[]> => {
      if (!userId) return [];
      
      const { data: highlights, error } = await storyDb.highlights()
        .select('id, user_id, name, cover_image_url, created_at, updated_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Fetch highlight stories separately
      const highlightIds = (highlights || []).map((h: any) => h.id);
      const { data: highlightStories } = await storyDb.highlightStories()
        .select('id, highlight_id, story_id, media_url, added_at')
        .in('highlight_id', highlightIds);
      
      return (highlights || []).map((h: any) => ({
        ...h,
        stories: (highlightStories || []).filter((s: any) => s.highlight_id === h.id),
      })) as StoryHighlight[];
    },
    enabled: !!userId,
  });
}

export function useCreateHighlight() {
  const { userId } = useCurrentUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, coverImageUrl }: { name: string; coverImageUrl?: string }): Promise<{ id: string; name: string }> => {
      if (!userId) throw new Error('Not authenticated');
      
      const { data, error } = await storyDb.highlights()
        .insert({ user_id: userId, name, cover_image_url: coverImageUrl })
        .select('id, name')
        .single();
      
      if (error) throw error;
      return data as unknown as { id: string; name: string };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['story-highlights'] });
    },
  });
}

export function useAddToHighlight() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ highlightId, storyId, mediaUrl }: { highlightId: string; storyId: string; mediaUrl: string }) => {
      const { error } = await storyDb.highlightStories()
        .insert({ highlight_id: highlightId, story_id: storyId, media_url: mediaUrl });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['story-highlights'] });
    },
  });
}

export function useStoryArchives() {
  const { userId } = useCurrentUser();

  return useQuery({
    queryKey: ['story-archives', userId],
    queryFn: async (): Promise<StoryArchive[]> => {
      if (!userId) return [];
      
      const { data, error } = await storyDb.archives()
        .select('id, user_id, original_story_id, media_url, created_at, archived_at')
        .eq('user_id', userId)
        .order('archived_at', { ascending: false });
      
      if (error) throw error;
      return ((data || []) as unknown) as StoryArchive[];
    },
    enabled: !!userId,
  });
}

// Mock data for when no real stories exist
function getMockStories(): GroupedStories[] {
  return [
    {
      userId: 'bella-italia',
      user: { id: 'bella-italia', name: 'Bella Italia', avatar: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop', isRestaurant: true },
      stories: [
        { id: '1', userId: 'bella-italia', user: { id: 'bella-italia', name: 'Bella Italia', avatar: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop', isRestaurant: true }, media: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800', timestamp: '2h ago' },
        { id: '2', userId: 'bella-italia', user: { id: 'bella-italia', name: 'Bella Italia', avatar: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop', isRestaurant: true }, media: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800', timestamp: '2h ago' },
      ],
    },
    {
      userId: 'taco-fiesta',
      user: { id: 'taco-fiesta', name: 'Taco Fiesta', avatar: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop', isRestaurant: true },
      stories: [
        { id: '3', userId: 'taco-fiesta', user: { id: 'taco-fiesta', name: 'Taco Fiesta', avatar: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=100&h=100&fit=crop', isRestaurant: true }, media: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800', timestamp: '4h ago' },
      ],
    },
    {
      userId: 'sarah-chen',
      user: { id: 'sarah-chen', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop', isRestaurant: false },
      stories: [
        { id: '4', userId: 'sarah-chen', user: { id: 'sarah-chen', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop', isRestaurant: false }, media: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800', timestamp: '6h ago' },
        { id: '5', userId: 'sarah-chen', user: { id: 'sarah-chen', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=100&h=100&fit=crop', isRestaurant: false }, media: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800', timestamp: '6h ago' },
      ],
    },
  ];
}
