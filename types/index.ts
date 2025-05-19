export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  photoURL: string;
  bio: string;
  followers: number;
  following: number;
  createdAt: number;
}

export interface Video {
  id: string;
  userId: string;
  username: string;
  userPhotoURL: string;
  videoURL: string;
  thumbnailURL: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: number;
  hashtags: string[];
}

export interface Comment {
  id: string;
  videoId: string;
  userId: string;
  username: string;
  userPhotoURL: string;
  text: string;
  likes: number;
  createdAt: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: number;
  read: boolean;
}

export interface Chat {
  id: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'message';
  fromUserId: string;
  fromUsername: string;
  fromUserPhotoURL: string;
  contentId?: string;
  text: string;
  read: boolean;
  createdAt: number;
}