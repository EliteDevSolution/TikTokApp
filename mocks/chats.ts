import { Chat, Message } from '@/types';

export const mockChats: Chat[] = [
  {
    id: 'chat1',
    participants: ['user1', 'user2'],
    lastMessage: 'Hey, did you see my new dance video?',
    lastMessageTime: Date.now() - 3600000, // 1 hour ago
    unreadCount: 2,
  },
  {
    id: 'chat2',
    participants: ['user1', 'user3'],
    lastMessage: 'Your recipe looks amazing!',
    lastMessageTime: Date.now() - 86400000, // 1 day ago
    unreadCount: 0,
  },
  {
    id: 'chat3',
    participants: ['user1', 'user4'],
    lastMessage: 'Where was that mountain video taken?',
    lastMessageTime: Date.now() - 172800000, // 2 days ago
    unreadCount: 1,
  },
  {
    id: 'chat4',
    participants: ['user1', 'user5'],
    lastMessage: 'Can you share that workout routine?',
    lastMessageTime: Date.now() - 259200000, // 3 days ago
    unreadCount: 0,
  },
];

export const mockMessages: Record<string, Message[]> = {
  'chat1': [
    {
      id: 'msg1',
      senderId: 'user2',
      receiverId: 'user1',
      text: 'Hey, how are you?',
      createdAt: Date.now() - 7200000, // 2 hours ago
      read: true,
    },
    {
      id: 'msg2',
      senderId: 'user1',
      receiverId: 'user2',
      text: "I'm good, thanks! Just uploaded a new video.",
      createdAt: Date.now() - 7000000,
      read: true,
    },
    {
      id: 'msg3',
      senderId: 'user2',
      receiverId: 'user1',
      text: "Cool! I'll check it out.",
      createdAt: Date.now() - 6800000,
      read: true,
    },
    {
      id: 'msg4',
      senderId: 'user2',
      receiverId: 'user1',
      text: 'Hey, did you see my new dance video?',
      createdAt: Date.now() - 3600000, // 1 hour ago
      read: false,
    },
  ],
};