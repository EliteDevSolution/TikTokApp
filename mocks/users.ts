import { User } from '@/types';

export const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'dancingqueen',
    email: 'test@test.com',
    displayName: 'Dancing Queen',
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Dancing through life ✨ | Content Creator | Follow for daily dance videos',
    followers: 15600,
    following: 245,
    createdAt: Date.now() - 31536000000, // 1 year ago
  },
  {
    id: 'user2',
    username: 'techguy',
    email: 'techguy@example.com',
    displayName: 'Tech Guy',
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    bio: 'Tech enthusiast | App developer | Sharing tech tips and tricks',
    followers: 8700,
    following: 320,
    createdAt: Date.now() - 15768000000, // 6 months ago
  },
  {
    id: 'user3',
    username: 'foodlover',
    email: 'foodlover@example.com',
    displayName: 'Food Lover',
    photoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    bio: 'Food blogger | Recipe creator | Sharing delicious recipes daily',
    followers: 23400,
    following: 567,
    createdAt: Date.now() - 23652000000, // 9 months ago
  },
  {
    id: 'user4',
    username: 'travelbug',
    email: 'travelbug@example.com',
    displayName: 'Travel Bug',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    bio: 'Travel enthusiast | Exploring the world one country at a time | 25 countries visited',
    followers: 34500,
    following: 876,
    createdAt: Date.now() - 7884000000, // 3 months ago
  },
  {
    id: 'user5',
    username: 'fitnessguru',
    email: 'fitnessguru@example.com',
    displayName: 'Fitness Guru',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    bio: 'Certified fitness trainer | Sharing workout tips and healthy recipes | Join my fitness journey',
    followers: 56700,
    following: 432,
    createdAt: Date.now() - 5256000000, // 2 months ago
  },
];