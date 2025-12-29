// Story-related types for the application

export interface StoryUser {
  id: string;
  name: string;
  avatar: string;
  isRestaurant: boolean;
}

export interface Story {
  id: string;
  userId: string;
  user: StoryUser;
  media: string;
  timestamp: string;
  viewCount?: number;
}

export interface GroupedStories {
  userId: string;
  user: StoryUser;
  stories: Story[];
}

export interface StoryView {
  id: string;
  story_id: string;
  viewer_id: string;
  viewed_at: string;
  viewer?: {
    id: string;
    name: string;
    profile_image_url: string | null;
  };
}

export interface StoryReaction {
  id: string;
  story_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
  user?: {
    id: string;
    name: string;
    profile_image_url: string | null;
  };
}

export interface StoryHighlight {
  id: string;
  user_id: string;
  name: string;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
  stories?: HighlightStory[];
}

export interface HighlightStory {
  id: string;
  highlight_id: string;
  story_id: string;
  media_url: string;
  added_at: string;
}

export interface StoryArchive {
  id: string;
  user_id: string;
  original_story_id: string | null;
  media_url: string;
  created_at: string;
  archived_at: string;
}

export interface StoryMention {
  id: string;
  story_id: string;
  mentioned_user_id: string;
  position_x: number | null;
  position_y: number | null;
  created_at: string;
  mentioned_user?: {
    id: string;
    name: string;
    profile_image_url: string | null;
  };
}

// Database row types (matching Supabase schema)
export interface StoryViewRow {
  id: string;
  story_id: string;
  viewer_id: string;
  viewed_at: string;
}

export interface StoryReactionRow {
  id: string;
  story_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
}

export interface StoryHighlightRow {
  id: string;
  user_id: string;
  name: string;
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface HighlightStoryRow {
  id: string;
  highlight_id: string;
  story_id: string;
  media_url: string;
  added_at: string;
}

export interface StoryArchiveRow {
  id: string;
  user_id: string;
  original_story_id: string | null;
  media_url: string;
  created_at: string;
  archived_at: string;
}

// Constants
export const EMOJI_OPTIONS = ['❤️', '😍', '🔥', '😂', '😮', '👏', '🎉', '💯'] as const;
export const STORY_DURATION = 5000; // 5 seconds per story
export const PROGRESS_INTERVAL = 50; // Update every 50ms for smooth animation
export const SWIPE_THRESHOLD = 50; // Minimum swipe distance to trigger navigation
