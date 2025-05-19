import { create } from 'zustand';
import { Video, Comment } from '@/types';
import { mockVideos } from '@/mocks/videos';

interface VideoState {
  videos: Video[];
  currentVideo: Video | null;
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
  fetchVideos: () => Promise<void>;
  likeVideo: (videoId: string) => Promise<void>;
  addComment: (videoId: string, userId: string, username: string, userPhotoURL: string, text: string) => Promise<void>;
  fetchComments: (videoId: string) => Promise<void>;
}

export const useVideoStore = create<VideoState>((set, get) => ({
  videos: [],
  currentVideo: null,
  comments: [],
  isLoading: false,
  error: null,

  fetchVideos: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, this would fetch from Firebase
      set({ videos: mockVideos, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
    }
  },

  likeVideo: async (videoId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update video likes count
      set(state => ({
        videos: state.videos.map(video =>
          video.id === videoId
            ? { ...video, likes: video.likes + 1 }
            : video
        ),
        currentVideo: state.currentVideo?.id === videoId
          ? { ...state.currentVideo, likes: state.currentVideo.likes + 1 }
          : state.currentVideo
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  },

  addComment: async (videoId, userId, username, userPhotoURL, text) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const newComment: Comment = {
        id: `comment${Date.now()}`,
        videoId,
        userId,
        username,
        userPhotoURL,
        text,
        likes: 0,
        createdAt: Date.now(),
      };

      // Add comment to list
      set(state => ({
        comments: [newComment, ...state.comments],
        videos: state.videos.map(video =>
          video.id === videoId
            ? { ...video, comments: video.comments + 1 }
            : video
        ),
        currentVideo: state.currentVideo?.id === videoId
          ? { ...state.currentVideo, comments: state.currentVideo.comments + 1 }
          : state.currentVideo
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred'
      });
    }
  },

  fetchComments: async (videoId: string) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock comments - in a real app, this would fetch from Firebase
      const mockComments: Comment[] = [
        {
          id: 'comment1',
          videoId,
          userId: 'user2',
          username: 'techguy',
          userPhotoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
          text: 'This is amazing! 🔥',
          likes: 45,
          createdAt: Date.now() - 3600000,
        },
        {
          id: 'comment2',
          videoId,
          userId: 'user3',
          username: 'foodlover',
          userPhotoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
          text: 'Love this content! Keep it up 👏',
          likes: 23,
          createdAt: Date.now() - 7200000,
        },
        {
          id: 'comment3',
          videoId,
          userId: 'user4',
          username: 'travelbug',
          userPhotoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
          text: 'Where was this filmed?',
          likes: 12,
          createdAt: Date.now() - 10800000,
        },
      ];

      set({ comments: mockComments, isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An error occurred',
        isLoading: false
      });
    }
  },
}));