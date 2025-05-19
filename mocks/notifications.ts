import { Notification } from '@/types';

export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    userId: 'user1',
    type: 'like',
    fromUserId: 'user2',
    fromUsername: 'techguy',
    fromUserPhotoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    contentId: '1',
    text: 'liked your video',
    read: false,
    createdAt: Date.now() - 3600000, // 1 hour ago
  },
  {
    id: 'notif2',
    userId: 'user1',
    type: 'comment',
    fromUserId: 'user3',
    fromUsername: 'foodlover',
    fromUserPhotoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    contentId: '1',
    text: 'commented: "Amazing video!"',
    read: false,
    createdAt: Date.now() - 7200000, // 2 hours ago
  },
  {
    id: 'notif3',
    userId: 'user1',
    type: 'follow',
    fromUserId: 'user4',
    fromUsername: 'travelbug',
    fromUserPhotoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    text: 'started following you',
    read: true,
    createdAt: Date.now() - 86400000, // 1 day ago
  },
  {
    id: 'notif4',
    userId: 'user1',
    type: 'message',
    fromUserId: 'user5',
    fromUsername: 'fitnessguru',
    fromUserPhotoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    text: 'sent you a message',
    read: true,
    createdAt: Date.now() - 172800000, // 2 days ago
  },
];