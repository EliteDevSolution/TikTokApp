import { Video } from '@/types';

export const mockVideos: Video[] = [
  {
    id: '1',
    userId: 'user1',
    username: 'dancingqueen',
    userPhotoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    videoURL: 'https://onlinetestcase.com/wp-content/uploads/2023/06/7MB.mp4',
    thumbnailURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    description: 'Summer vibes 🌞 #summer #pool #fun',
    likes: 1245,
    comments: 89,
    shares: 45,
    createdAt: Date.now() - 86400000, // 1 day ago
    hashtags: ['summer', 'pool', 'fun'],
  },
  {
    id: '2',
    userId: 'user2',
    username: 'techguy',
    userPhotoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    videoURL: 'https://onlinetestcase.com/wp-content/uploads/2023/06/7MB.mp4',
    thumbnailURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    description: 'Check out this new app I found! #tech #apps #productivity',
    likes: 876,
    comments: 32,
    shares: 12,
    createdAt: Date.now() - 172800000, // 2 days ago
    hashtags: ['tech', 'apps', 'productivity'],
  },
  {
    id: '3',
    userId: 'user3',
    username: 'foodlover',
    userPhotoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    videoURL: 'https://onlinetestcase.com/wp-content/uploads/2023/06/7MB.mp4',
    thumbnailURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    description: 'Cooking my favorite pasta recipe! #food #cooking #pasta',
    likes: 2345,
    comments: 156,
    shares: 78,
    createdAt: Date.now() - 259200000, // 3 days ago
    hashtags: ['food', 'cooking', 'pasta'],
  },
  {
    id: '4',
    userId: 'user4',
    username: 'travelbug',
    userPhotoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    videoURL: 'https://onlinetestcase.com/wp-content/uploads/2023/06/7MB.mp4',
    thumbnailURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    description: 'Mountain adventures! #travel #mountains #adventure',
    likes: 3456,
    comments: 234,
    shares: 123,
    createdAt: Date.now() - 345600000, // 4 days ago
    hashtags: ['travel', 'mountains', 'adventure'],
  },
  {
    id: '5',
    userId: 'user5',
    username: 'fitnessguru',
    userPhotoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    videoURL: 'https://onlinetestcase.com/wp-content/uploads/2023/06/7MB.mp4',
    thumbnailURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    description: 'Morning workout routine! #fitness #workout #health',
    likes: 5678,
    comments: 345,
    shares: 234,
    createdAt: Date.now() - 432000000, // 5 days ago
    hashtags: ['fitness', 'workout', 'health'],
  },
];